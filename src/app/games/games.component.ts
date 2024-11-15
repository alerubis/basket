import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-games',
    templateUrl: './games.component.html',
    standalone: true,
    imports: [
        MatButton,
        RouterLink,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatTabsModule,
        FormsModule,
        NgClass,
    ]
})
export class GamesComponent {

    actions = [
        {
            description: 'Shot by Tizio Caio',
            time: '01:22:33',
            icon: 'sports_basketball'
        },
        {
            description: 'Pass by Sempronio',
            time: '01:27:33',
            icon: 'sports_handball'
        },
        {
            description: 'Pass by Sempronio',
            time: '01:29:33',
            icon: 'sports_handball'
        },
        {
            description: 'Block by Augusto',
            time: '01:33:33',
            icon: 'sports_kabaddi'
        },
        {
            description: 'Pass by Sempronio',
            time: '01:29:33',
            icon: 'sports_handball'
        },
        {
            description: 'Block by Augusto',
            time: '01:33:33',
            icon: 'sports_kabaddi'
        },
        {
            description: 'Pass by Sempronio',
            time: '01:29:33',
            icon: 'sports_handball'
        },
        {
            description: 'Block by Augusto',
            time: '01:33:33',
            icon: 'sports_kabaddi'
        },
        {
            description: 'Pass by Sempronio',
            time: '01:29:33',
            icon: 'sports_handball'
        },
        {
            description: 'Block by Augusto',
            time: '01:33:33',
            icon: 'sports_kabaddi'
        }
    ]

    constructor(
    ) {

    }

}
