import { Component } from '@angular/core';
import { BasketListComponent } from '../../shared/components/basket-list/basket-list.component';
import { VSeasonTeamPlayerStats } from '../../shared/types/db/auto/VSeasonTeamPlayerStats';

@Component({
    selector: 'app-stats',
    standalone: true,
    imports: [
        BasketListComponent,
    ],
    templateUrl: './stats.component.html'
})
export class StatsComponent {

    table: VSeasonTeamPlayerStats = new VSeasonTeamPlayerStats();

}
