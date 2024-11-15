import { Routes } from '@angular/router';

export const initialRoute: string = 'home';

export const routes: Routes = [
    {
        path: 'home',
        loadChildren: () => import('./home/home.routes').then(m => m.routes),
    },
    {
        path: 'games',
        loadChildren: () => import('./games/games.routes').then(m => m.routes),
    },
    {
        path: 'teams',
        loadChildren: () => import('./teams/teams.routes').then(m => m.routes),
    },
    {
        path: 'players',
        loadChildren: () => import('./players/players.routes').then(m => m.routes),
    },
    {
        path: 'stats',
        loadChildren: () => import('./stats/stats.routes').then(m => m.routes),
    },
    {
        path: '',
        redirectTo: initialRoute,
        pathMatch: 'full'
    },
    {
        path: '**',
        loadChildren: () => import('./404/404.routes').then(m => m.routes),
    },
];
