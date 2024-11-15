import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';

export interface NavigationGroup {
    title: string;
    items: NavigationItem[];
}

export interface NavigationItem {
    title: string;
    icon: string;
    url: string;
}

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        MatButtonModule,
        MatIconModule,
        MatSidenavModule,
        RouterModule,
    ],
    templateUrl: './app.component.html'
})
export class AppComponent {

    navigation: NavigationGroup[] = [
        {
            title: 'Apps',
            items: [
                {
                    title: 'Home',
                    icon: 'home',
                    url: 'home'
                },
                {
                    title: 'Games',
                    icon: 'sports_basketball',
                    url: 'games'
                },
                {
                    title: 'Teams',
                    icon: 'groups',
                    url: 'teams'
                },
                {
                    title: 'Players',
                    icon: 'person',
                    url: 'players'
                },
                {
                    title: 'Stats',
                    icon: 'query_stats',
                    url: 'stats'
                }
            ]
        },
        {
            title: 'Other',
            items: [
                {
                    title: 'Settings',
                    icon: 'settings',
                    url: 'settings'
                },
                {
                    title: 'Info',
                    icon: 'info',
                    url: 'info'
                }
            ]
        }
    ];

}
