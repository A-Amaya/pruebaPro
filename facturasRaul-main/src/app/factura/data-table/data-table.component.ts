import {Component, OnInit, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef} from '@angular/core';
import {Culpa, Facturas} from '../../common.interfaces';
import {MatPaginator, MatPaginatorIntl} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl, FormGroup} from '@angular/forms';
import {DataService} from '../../_services/data.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {fromEvent, Observable, observable, pipe} from 'rxjs';
import {Event} from '@angular/router';
import firebase from 'firebase';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ScannerTComponent} from '../scanner-t/scanner-t.component';
import {AuthService} from '../../_services/auth.service';
import {ExportType} from 'mat-table-exporter';
import {animate, query, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AuthService],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DataTableComponent implements OnInit {

  // @ts-ignore
  displayedColumns: string[] = ['empresa', 'ordenDeVenta', 'remision1', 'remision2', 'factura', 'cantidad', 'guias', 'fechaHora','acto'];
  dataSource = new MatTableDataSource<Facturas>([]);



  @ViewChild(MatPaginator) paginator: MatPaginator | null ;
  @ViewChild(MatSort) sort: MatSort | null;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  guia = new FormControl();
  input = new FormControl();
  public user: Observable<any> = this.authSvc.afAuth.user;

  constructor(
    private authSvc: AuthService,
    private data: DataService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private db: AngularFirestore
  ) {
    this.paginator = this.dataSource.paginator;
    this.sort = this.dataSource.sort;
  }
  durationInSeconds = 100;

  ngOnInit(): void {
    this.data.facturas$.subscribe(x => {
      this.dataSource.data = x;
      this.paginator = this.dataSource.paginator;
      this.sort = this.dataSource.sort;
    });
    this.db.collection('facturas').valueChanges().subscribe (resp => {console.log(resp);})

  }

  // tslint:disable-next-line:typedef

  dia: string = new Date().toLocaleDateString()





  applyFilter(event: KeyboardEvent) {
    // @ts-ignore
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();


  }


  async asignarFactura(id: string, guias: string) {
    console.log('id', id);
    console.log('guias', guias);

    await this.data.agregarGuia(id, guias);
  }

  async deleteData(id: string) {
    console.log('id', id);
    await this.data.borrarDato(id);

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 120000,
    });
  }

  validarGuias(id: string) {
    const dialogRef = this.dialog.open(ScannerTComponent, {
      data: {id}
    });


    dialogRef.afterClosed().subscribe(result => {
      // this.openSnackBar(result, '✓');
      if (result instanceof Error) {
        this.openSnackBar(result.message, 'Error');
      }
      if (typeof result === 'string') {
        this.openSnackBar(result, '✓')
      }
    })
  }

  verDetalles(id:string , detalles: string) {
    this.db.collection('facturas').valueChanges().subscribe(async resp => {
        // @ts-ignore


      let detallestod = detalles.split('|').join(':' +'\n');
      let detallestodos = detallestod.split('+').join('\n');
      this.openSnackBar(detallestodos, '✓')
            //alert(detallestodos);

      //console.log(resp)

    })
  }


  downloadExcel() {
// @ts-ignore
    this.openSnackBar('Descargando...');
  }

  fechaahora(a:string) {
    return this.dia;
  }
}
