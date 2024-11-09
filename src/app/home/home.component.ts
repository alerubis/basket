import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { WsService } from '../shared/services/ws.service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    standalone: true,
    imports: [
        MatButton,
        RouterLink,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        FormsModule,
    ]
})
export class HomeComponent {

    parametroUno: number = 3;
    parametroDue: number = 4;

    constructor(
        private _wsService: WsService,
    ) { }

    testPython(): void {
        this._wsService.wsCall('scripts/python/sum', { parametroUno: this.parametroUno, parametroDue: this.parametroDue }).subscribe({
            next: (r) => {
                alert('Python dice: ' + JSON.stringify(r));
            },
            error: (e) => {

            }
        });
    }

}
