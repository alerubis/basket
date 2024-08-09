import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscriber } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ErrorDialogComponent } from '../dialogs/error-dialog/error-dialog.component';

@Injectable({
    providedIn: 'root',
})
export class WsService {

    constructor(
        private _httpClient: HttpClient,
        private _matDialog: MatDialog,
    ) {
    }

    wsCall(url: string, body?: any): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
        return new Observable((observer) => {
            this._httpClient.post<any>(environment.wsUrl + url, body, httpOptions).subscribe({
                next: response => {
                    if (!response || !response.status || response.status === 'error' || response.status === 'fail') {
                        this.handleError(response, observer);
                    } else {
                        observer.next(response.data);
                        observer.complete();
                    }
                },
                error: error => {
                    this.handleError(error, observer);
                }
            });
        });
    }

    handleError(error: any, observer: Subscriber<any>) {
        console.error(error);
        const betterErrorMessage = error?.error?.message || error?.message || error;
        const dialogRef = this._matDialog.open(ErrorDialogComponent, {
            width: '100%',
            maxWidth: '640px',
            data: {
                message: betterErrorMessage,
                error: error,
            },
        });
        observer.error(error);
    }
    //#endregion

}
