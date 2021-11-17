import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacturaRoutingModule } from './factura-routing.module';
import { FacturaComponent } from './factura.component';

import { ScannerComponent } from './scanner/scanner.component';
import {ZXingScannerModule} from '@zxing/ngx-scanner';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { DataTableComponent } from './data-table/data-table.component';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import { ScannerTComponent } from './scanner-t/scanner-t.component';
import {MatTableExporterModule} from 'mat-table-exporter';


@NgModule({
  declarations: [
    FacturaComponent,
    ScannerComponent,
    DataTableComponent,
    ScannerTComponent
  ],
    imports: [
        CommonModule,
        FacturaRoutingModule,
        ZXingScannerModule,
        MatButtonModule,
        MatCardModule,
        MatListModule,
        MatTableModule,
        MatFormFieldModule,
        MatPaginatorModule,
        MatSortModule,
        MatSnackBarModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatTableExporterModule
    ],
  entryComponents: [
    ScannerTComponent
  ]
})
export class FacturaModule { }
