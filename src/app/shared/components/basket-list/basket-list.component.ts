import { DatePipe, JsonPipe } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { DbService } from '../../../shared/services/db.service';
import { Table } from '../../types/db/Table';

@Component({
    selector: 'app-basket-list',
    templateUrl: './basket-list.component.html',
    standalone: true,
    imports: [
        DatePipe,
        FormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatSortModule,
        MatTooltipModule,
        ReactiveFormsModule,
        RouterLink,
        JsonPipe,
    ]
})
export class BasketListComponent implements OnInit {

    @Input({required: true}) table!: Table;

    columns: string[] = [];

    rows: Table[] = [];
    rowsCount: number | undefined;
    rowsLoading: boolean = false;

    @ViewChild('tableContainer') tableContainer: ElementRef | undefined;
    @ViewChild(MatSort) sort: MatSort | undefined;
    @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
    searchControl = new FormControl();

    constructor(
        private _dbService: DbService,
        private _matDialog: MatDialog,
    ) {

    }

    ngOnInit(): void {
        this.loadColumns();
        this.loadRows();

        this.searchControl.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe(value => {
            if (this.paginator) {
                this.paginator.pageIndex = 0;
            }
            this.loadRows();
        });
    }

    //#region Table
    loadColumns(): void {
        this.columns = this.table.getFields();
    }

    loadRows(): void {
        this.rowsLoading = true;
        const where = this.searchControl.value ? { name: { contains: this.searchControl.value } } : undefined;
        this._dbService.readList(this.table, where, this.paginator, this.sort).subscribe({
            next: response => {
                this.rows = response.rows;
                this.rowsCount = response.count;
                this.scrollTop();
                this.rowsLoading = false;
            },
            error: error => {
                this.rows = [];
                this.rowsLoading = false;
            }
        });
    }

    handleSortChange(): void {
        if (this.paginator) {
            this.paginator.pageIndex = 0;
        }
        this.loadRows();
    }

    handlePageChange(): void {
        this.loadRows();
    }

    scrollTop(): void {
        if (this.tableContainer) {
            this.tableContainer.nativeElement.scrollTop = 0;
        }
    }
    //#endregion

}
