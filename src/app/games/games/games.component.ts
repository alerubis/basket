import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { WsService } from '../../shared/services/ws.service';

@Component({
    selector: 'app-games',
    standalone: true,
    imports: [
        MatButtonModule,
        MatIconModule,
        MatProgressBarModule,
        RouterModule,
    ],
    templateUrl: './games.component.html'
})
export class GamesComponent implements OnInit {

    games: any[] = [];
    loading: boolean = false;

    constructor(
        private _wsService: WsService,
    ) {

    }

    ngOnInit(): void {
        this.loadDipendenti();
    }

    loadDipendenti(): void {
        this.loading = true;
        this._wsService.wsCall('games').subscribe({
            next: (r) => {
                this.games = r;
                this.loading = false;
            },
            error: (e) => {
                this.games = [];
                this.loading = false;
            }
        });
    }

}
