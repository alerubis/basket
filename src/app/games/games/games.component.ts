import { Component } from '@angular/core';
import { BasketListComponent } from '../../shared/components/basket-list/basket-list.component';
import { Game } from '../../shared/types/db/auto/Game';

@Component({
    selector: 'app-games',
    standalone: true,
    imports: [
        BasketListComponent,
    ],
    templateUrl: './games.component.html'
})
export class GamesComponent {

    table: Game = new Game();

}
