import { Player } from './../shared/types/db/auto/Player';
import { DatePipe, JsonPipe } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DbService } from '../shared/services/db.service';
import { Team } from '../shared/types/db/auto/Team';
import { SeasonTeamPlayerStats } from '../shared/types/db/auto/SeasonTeamPlayerStats';
import { forkJoin, timer } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { WsService } from '../shared/services/ws.service';
import { MatDrawer, MatDrawerContainer } from '@angular/material/sidenav';
import * as Plotly from 'plotly.js-dist-min';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    standalone: true,
    imports: [
        FormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatSortModule,
        MatTooltipModule,
        ReactiveFormsModule,
        CommonModule,
        MatSelectModule,
        MatDrawerContainer,
        MatDrawer
      ],
})
export class HomeComponent implements OnInit {

    @Input() routing: boolean = false;

    noImage: string = 'https://www.legabasket.it/_next/static/media/AvatarPlaceholder.64b5f792.svg';
    columns: string[] = [];

    loadingPython: boolean = false;
    giocatoreSelezionato: string | null = null;

    player: Player[] = [];
    teams: any[] = [];
    stat: SeasonTeamPlayerStats[] = [];


    playersTeam1: Player[] = [];
    playersTeam2: Player[] = [];
    players1: (number | null)[] = Array(5).fill(null);
    players2: (number | null)[] = Array(5).fill(null);
    selectedTeam1: number | null = 8;
    selectedTeam2: number | null = 3;
    stagione: number | null = 1;
    filteredStats: SeasonTeamPlayerStats[] = [];

    @ViewChild('tableContainer') tableContainer: ElementRef | undefined;
    @ViewChild(MatSort) sort: MatSort | undefined;
    @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

    constructor(
        private _dbService: DbService,
        private _matDialog: MatDialog,
        private _wsService: WsService,
    ) {

    }

    ngOnInit(): void {
        this.loadRows();
    }

    loadRows(): void {
        forkJoin({
            players: this._dbService.readList(new Player, undefined, this.paginator, this.sort),
            teams: this._dbService.readList(new Team, undefined, this.paginator, this.sort),
            stats: this._dbService.readList(new SeasonTeamPlayerStats, undefined, this.paginator, this.sort),
        }).subscribe({
            next: ({ players, teams, stats }) => {
                this.player = players.rows as Player[];
                this.teams = teams.rows as Team[];
                this.stat = stats.rows as SeasonTeamPlayerStats[];
                this.filteredStats = this.stat.filter(s => s.season_id === this.stagione);
                this.onTeamChange(1);
                this.onTeamChange(2);
            },
            error: (err) => {
                console.error('Errore durante il caricamento dei dati:', err);
                this.player = [];
                this.teams = [];
                this.stat = [];
            },
        });
    }

    onTeamChange(team: number): void {
        if (team === 1 && this.selectedTeam1) {
            const teamStats = this.filteredStats.filter((x) => x.team_id === this.selectedTeam1);
            this.playersTeam1 = this.player.filter((p) => teamStats.some((s) => s.player_id === p.id));
        }

        if (team === 2 && this.selectedTeam2) {
            const teamStats = this.filteredStats.filter((x) => x.team_id === this.selectedTeam2);
            this.playersTeam2 = this.player.filter((p) => teamStats.some((s) => s.player_id === p.id));
        }
    }
    getImage(id: number): string{
        if (id !== -1){
            return this.player.find(x=>x.id === id)?.image || '';
        }
        return '';
    }
    getPlayer(team: number, idP: number | null): Player[]{
        let pl: Player[] = []
        if (team === 1){
            pl = this.playersTeam1.filter(p=> !this.players1.some(x=>x === p.id));
        }
        if (team === 2){
            pl = this.playersTeam2.filter(p=> !this.players2.some(x=>x === p.id));
        }
        const player = this.player.find(x=>x.id === idP);
        if (player){
            pl.push(player);
            return pl;
        }
        return pl;
    }
    getImageTeam(id: number): string{
        if (id !== -1){
            return this.teams.find(x=>x.id === id)?.image || '';
        }
        return '';
    }
    openDrawer(drawer: any, id: number | null) {
        this.giocatoreSelezionato = null;
        if (id && id !== -1){
            this.giocatoreSelezionato = this.player.find(x=>x.id === id)?.name || null;
            this.loadingPython = true
            drawer.open();
            this.testPython(this.giocatoreSelezionato);
        }
        else if (id === -1){
            this.loadingPython = true
            drawer.open();
            const difesa: number = Math.floor(Math.random() * (60 - 10 + 1)) + 20;
    
            this.testPython('Schema1', difesa);
            this.testPython('Schema2', difesa);
            this.testPython('Schema3', difesa);
            this.testPython('Schema4', difesa);
            this.testPython('Schema5', difesa);
        }
    }
    
    closeDrawer(drawer: any) {
        drawer.close();
    }
    disableButton(): boolean{
        const uno = this.players1.filter(x=>x !== null);
        const due = this.players2.filter(x=>x !== null);
        if (uno.length + due.length === 10){
            return false;
        }
        return true;
    }
    testPython(schema: string | null, difesa?: number): void {
        this.loadingPython = true;

        if (difesa){
            // Parametro da inviare al backend
            this._wsService.wsCall('scripts/python/schema', { schemaName: schema }).subscribe({
                next: (response) => {

                    if (response) {
                        // Usa la risposta per generare il grafico con Plotly.js
                        const chartData = response; // JSON del grafico
                        this.renderChart(chartData, schema+'C'); // Metodo per disegnare il grafico
                    } else {
                        console.error('Errore nella risposta:', response);
                    }
                },
                error: (error) => {
                    console.error('Errore nella chiamata al backend:', error);
                }
            });
            this._wsService.wsCall('scripts/python/difesa', { schemaName: schema, difesa: difesa }).subscribe({
                next: (response) => {

                    if (schema === 'Schema5'){
                        this.loadingPython = false;
                    }
                    if (response) {
                        // Usa la risposta per generare il grafico con Plotly.js
                        const chartData = response; // JSON del grafico
                        this.renderChart(chartData, schema+'D'); // Metodo per disegnare il grafico
                    } else {
                        console.error('Errore nella risposta:', response);
                    }
                },
                error: (error) => {
                    console.error('Errore nella chiamata al backend:', error);
                }
            });
        }
        else {
            this._wsService.wsCall('scripts/python/player', { playerName: schema }).subscribe({
                next: (response) => {
                    if (response) {
                        // Usa la risposta per generare il grafico con Plotly.js
                        const chartData = response; // JSON del grafico
                        this.renderChart(chartData, 'partita'); // Metodo per disegnare il grafico
                    } else {
                        console.error('Errore nella risposta:', response);
                    }
                },
                error: (error) => {
                    console.error('Errore nella chiamata al backend:', error);
                }
            });
            this._wsService.wsCall('scripts/python/player24', { playerName: schema }).subscribe({
                next: (response) => {
                    if (response) {
                        // Usa la risposta per generare il grafico con Plotly.js
                        const chartData = response; // JSON del grafico
                        this.renderChart(chartData, 'azione'); // Metodo per disegnare il grafico
                    } else {
                        console.error('Errore nella risposta:', response);
                    }
                },
                error: (error) => {
                    console.error('Errore nella chiamata al backend:', error);
                }
            });
            this._wsService.wsCall('scripts/python/playerDistance', { playerName: schema }).subscribe({
                next: (response) => {
                    this.loadingPython = false;
                    if (response) {
                        // Usa la risposta per generare il grafico con Plotly.js
                        const chartData = response; // JSON del grafico
                        this.renderChart(chartData, 'distance'); // Metodo per disegnare il grafico
                    } else {
                        console.error('Errore nella risposta:', response);
                    }
                },
                error: (error) => {
                    console.error('Errore nella chiamata al backend:', error);
                }
            });
        }
    }
    renderChart(chartData: any, graf: string): void {
        const graphDiv = document.getElementById(graf); // Contenitore del grafico
    
        if (!graphDiv) {
            console.error('Elemento con ID "' + graf + '" non trovato.');
            return;
        }
    
        try {
            // Verifica che i dati siano corretti
            if (!chartData || !chartData.data || !chartData.layout) {
                console.error('Dati del grafico non validi:', chartData);
                return;
            }
    
            console.log('Dati ricevuti per il grafico:', chartData);
    
            // Genera il grafico
            Plotly.newPlot(graphDiv, chartData.data, chartData.layout);
        } catch (error) {
            console.error('Errore durante la generazione del grafico:', error);
        }
    }
      
}
