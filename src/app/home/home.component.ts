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
import { Player } from '../shared/types/db/auto/Player';
import { DbService } from '../shared/services/db.service';
import { Team } from '../shared/types/db/auto/Team';
import { SeasonTeamPlayerStats } from '../shared/types/db/auto/SeasonTeamPlayerStats';
import { forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { WsService } from '../shared/services/ws.service';

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
]
})
export class HomeComponent implements OnInit {

    @Input() routing: boolean = false;

    columns: string[] = [];

    player: Player[] = [];
    teams: any[] = [];
    stat: SeasonTeamPlayerStats[] = [];


    playersTeam1: Player[] = [];
    playersTeam2: Player[] = [];
    players1: (number | null)[] = Array(5).fill(null);
    players2: (number | null)[] = Array(5).fill(null);
    selectedTeam1: number | null = null;
    selectedTeam2: number | null = null;
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
    testPython(): void {
        this._wsService.wsCall('scripts/python/sum', { parametroUno: 5, parametroDue: 7 }).subscribe({
            next: (r) => {
                alert('Python dice: ' + JSON.stringify(r));
            },
                error: (e) => {
            }
        })
    }
}
