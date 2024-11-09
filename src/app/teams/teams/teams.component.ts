import { Component } from '@angular/core';
import { BasketListComponent } from '../../shared/components/basket-list/basket-list.component';
import { Team } from '../../shared/types/db/auto/Team';

@Component({
    selector: 'app-teams',
    standalone: true,
    imports: [
        BasketListComponent,
    ],
    templateUrl: './teams.component.html'
})
export class TeamsComponent {

    table: Team = new Team();

}
