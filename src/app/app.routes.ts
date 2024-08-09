import { Routes } from '@angular/router';

export const initialRoute: string = 'games';

export const routes: Routes = [
    {
        path: 'games',
        loadChildren: () => import('./games/games.routes').then(m => m.routes),
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
