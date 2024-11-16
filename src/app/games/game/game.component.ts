import { DatePipe, DecimalPipe, NgClass } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSort } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, ParamMap, RouterLink } from '@angular/router';
import { YouTubePlayer } from '@angular/youtube-player';
import { MessageBoxComponent } from '../../shared/components/message-box/message-box.component';
import { DbService } from '../../shared/services/db.service';
import { Game } from '../../shared/types/db/auto/Game';
import { GameEventHelper } from '../../shared/types/db/helper/GameEventHelper';
import { GameEventType } from '../../shared/types/db/auto/GameEventType';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    standalone: true,
    imports: [
        MatButton,
        RouterLink,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatTabsModule,
        MatTooltipModule,
        FormsModule,
        NgClass,
        YouTubePlayer,
        MatProgressBarModule,
        MessageBoxComponent,
        DatePipe,
        DecimalPipe,
    ]
})
export class GameComponent {

    // Data
    gameId: number | undefined;
    game: Game | undefined;
    gameEvents: GameEventHelper[] = [];
    gameEventTypes: GameEventType[] = [];
    gameLoading: boolean = false;

    // Player
    @ViewChild('youtubePlayer', { static: false }) youtubePlayer!: YouTubePlayer;
    @ViewChild('timelineContainer', { static: false }) timelineContainer!: ElementRef<HTMLDivElement>;;
    playerTrackingTimer: any;
    currentTime: number = 0;
    autoScroll: boolean = true;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _dbService: DbService,
    ) {

    }

    ngOnInit(): void {
        this._activatedRoute.paramMap.subscribe((params: ParamMap) => {
            const idFromParams = params.get('id');
            if (idFromParams) {
                this.gameId = +idFromParams;
            }
            this.loadGame();
            this.loadGameEvents();
            this.loadGameEventTypes();
        });
    }

    //#region Data
    loadGame(): void {
        if (this.gameId) {
            this.gameLoading = true;
            this._dbService.readFromId(new Game(), this.gameId).subscribe({
                next: response => {
                    this.game = response;
                    this.gameLoading = false;
                },
                error: error => {
                    this.game = undefined;
                    this.gameLoading = false;
                }
            });
        }
    }

    loadGameEvents(): void {
        if (this.gameId) {
            const sort = new MatSort();
            sort.active = 'from_time';
            sort.direction = 'asc';
            this._dbService.readList(new GameEventHelper(), { game_id: this.gameId }, undefined, sort).subscribe({
                next: response => {
                    this.gameEvents = response.rows as GameEventHelper[];
                },
                error: error => {
                    this.gameEvents = [];
                }
            });
        }
    }

    loadGameEventTypes(): void {
        this._dbService.readList(new GameEventType()).subscribe(r => {
            this.gameEventTypes = r.rows as GameEventType[];
        });
    }

    getGameEventTypeIcon(id: number | undefined): string | undefined {
        const eventType = this.gameEventTypes.find(x => x.id === id);
        return eventType?.icon;
    }
    //#endregion

    //#region Player
    onPlayerStateChange(event: YT.OnStateChangeEvent) {
        if (event.data === YT.PlayerState.PLAYING) {
            this.startTrackingTime();
        } else {
            this.stopTrackingTime();
        }
    }

    startTrackingTime() {
        this.stopTrackingTime();
        this.playerTrackingTimer = setInterval(() => {
            if (this.youtubePlayer) {
                this.handlePlayerTimeChange(this.youtubePlayer.getCurrentTime());
            }
        }, 100);
    }

    stopTrackingTime() {
        if (this.playerTrackingTimer) {
            clearInterval(this.playerTrackingTimer);
            this.playerTrackingTimer = null;
        }
    }

    handlePlayerTimeChange(time: number): void {
        this.currentTime = time;
        if (this.autoScroll) {
            if (this.timelineContainer) {
                const target = this.timelineContainer.nativeElement.querySelector('.current-event') as HTMLElement;
                if (target) {
                    this.timelineContainer.nativeElement.scrollTo({ top: target.offsetTop - 64, behavior: 'smooth' })
                    // target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        }
    }

    isCurrentGameEvent(gameEvent: GameEventHelper): boolean {
        const isCurrent = this.currentTime > gameEvent.getFromTime() && this.currentTime < gameEvent.getToTime();
        return isCurrent;
    }

    isPreviousGameEvent(gameEvent: GameEventHelper): boolean {
        const isPrevious = this.currentTime > gameEvent.getToTime();
        return isPrevious;
    }

    isNextGameEvent(gameEvent: GameEventHelper): boolean {
        const isNext = this.currentTime < gameEvent.getFromTime();
        return isNext;
    }

    handleGameEventClick(gameEvent: GameEventHelper): void {
        if (this.youtubePlayer) {
            this.youtubePlayer.seekTo(gameEvent.getFromTime(), true);
        }
    }
    //#endregion

}
