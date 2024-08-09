import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, ParamMap, RouterModule } from '@angular/router';
import { WsService } from '../../shared/services/ws.service';
import { GameStatisticsComponent } from './statistics/statistics.component';

@Component({
    selector: 'app-game',
    standalone: true,
    imports: [
        GameStatisticsComponent,
        MatButtonModule,
        MatIconModule,
        MatTabsModule,
        MatTooltipModule,
        MatProgressBarModule,
        RouterModule,
    ],
    templateUrl: './game.component.html'
})
export class GameComponent implements OnInit {

    gameId: string | null = null;
    game: any;
    loading: boolean = false;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _wsService: WsService,
    ) {

    }

    ngOnInit(): void {
        this._activatedRoute.paramMap.subscribe((params: ParamMap) => {
            const idFromParams = params.get('id');
            this.gameId = idFromParams;
            this.loadGame();
        });
    }

    loadGame(): void {
        this.loading = true;
        this._wsService.wsCall('games/detail', { id: this.gameId }).subscribe({
            next: (r) => {
                this.game = r;
                this.loading = false;
            },
            error: (e) => {
                this.game = null;
                this.loading = false;
            }
        });
    }

}
