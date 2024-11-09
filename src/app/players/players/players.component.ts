import { Component } from '@angular/core';
import { BasketListComponent } from '../../shared/components/basket-list/basket-list.component';
import { Player } from '../../shared/types/db/auto/Player';

@Component({
    selector: 'app-players',
    standalone: true,
    imports: [
        BasketListComponent,
    ],
    templateUrl: './players.component.html'
})
export class PlayersComponent {

    table: Player = new Player();

}
