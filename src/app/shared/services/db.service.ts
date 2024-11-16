import { Injectable } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { Table } from '../types/db/Table';
import { WsService } from './ws.service';

@Injectable({
    providedIn: 'root',
})
export class DbService {

    constructor(private _wsService: WsService) {
    }

    readList(table: Table, where?: any, paginator?: MatPaginator, sort?: MatSort): Observable<{ rows: Table[], count: number }> {
        return new Observable((observer) => {
            this._wsService.wsCall('db/' + table.getName() + '/read', {
                skip: (paginator?.pageIndex || 0) * (paginator?.pageSize || 25),
                take: (paginator?.pageSize || 25),
                where: where,
                orderBy: (sort?.active && sort.direction ? { [sort.active]: sort.direction } : undefined),
            }).subscribe({
                next: response => {
                    observer.next({
                        rows: response.rows.map((x: any) => table.fromDbValues(x)),
                        count: response.count,
                    });
                    observer.complete();
                },
                error: error => {
                    observer.error(error);
                }
            });
        });
    }

    readFromId(table: Table, id: number): Observable<any> {
        return new Observable((observer) => {
            this._wsService.wsCall('db/' + table.getName() + '/read', { take: 1, where: { id: id } }).subscribe({
                next: response => {
                    if (response.rows.length > 0) {
                        observer.next(table.fromDbValues(response.rows[0]));
                    } else {
                        observer.next(undefined);
                    }
                    observer.complete();
                },
                error: error => {
                    observer.error(error);
                }
            });
        });
    }

}
