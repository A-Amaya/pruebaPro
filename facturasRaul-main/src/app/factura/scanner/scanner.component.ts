import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DataService} from '../../_services/data.service';
import {AuthService} from '../../_services/auth.service';
import firebase from 'firebase';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';


// @ts-ignore
@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AuthService]
})
export class ScannerComponent implements OnInit {
  constructor(
    private data: DataService,
    // tslint:disable-next-line:variable-name
    private _snackbar: MatSnackBar,
    private authSvc: AuthService,
    private route: Router
  ) {
  }
  // public clics = 0;
  public scannedString = '';
  public scannerEnable = false;
public isLogged = false;
// public user1: any;
public user$: Observable<any> = this.authSvc.afAuth.user;

  // tslint:disable-next-line:typedef
  boton(evt: MouseEvent) {
    this.scannerEnable = true;
  }

  // tslint:disable-next-line:typedef
  openSnackBar(message: string, action: string) {
    this._snackbar.open(message, action, {
      duration: 10000, // aqui ponemos el tiempo de ejecucion del snackbar
    });
  }

// tslint:disable-next-line:typedef
  async handleScan(evt: string) {
    this.scannerEnable = false;
    let uploaded;
    try {
       uploaded = await this.data.newFactura(evt);
    }
     catch (error){console.log(error); }
    if (uploaded instanceof Error) {
      this.openSnackBar(uploaded.message, 'Error');
      alert('Esta factura ya fue registrada anteriormente');
    }
    if (typeof uploaded === 'string') {
      this.openSnackBar(uploaded, '✓');
    }
    this.scannedString = evt;
  }
  // tslint:disable-next-line:typedef
  async ngOnInit() {
    console.log('Usuario aqui en el perrito ');
    // this.user1 = await this.authSvc.getCurrentUser();
    // if (this.user1) {
    //   this.isLogged = true;
    //   console.log('User->', this.user1);
    // }
  }
  // tslint:disable-next-line:typedef
  async logout(){
    try {
     await this.authSvc.logout();
     this.route.navigate(['/']);
    }
    catch (error){console.log(error); }

  }

  entrar() {
    // @ts-ignore
    let ocultar = document.querySelector('.mat-card-header-text').textContent;
    // @ts-ignore
    let ocultar2 = ocultar.split("@", 1)
    //console.log(ocultar2);


    let scaner = document.querySelector('#primercuadro');
    //console.log(scaner)

    // @ts-ignore
    if (ocultar2 == 'raulleal4' || ocultar2 == 'gaudielutj' || ocultar2 == 'araceli' ||ocultar2 == 'clujan' ||ocultar2 == 'pgonzalez' ||ocultar2 == 'erika' ) {
      // @ts-ignore
      scaner.style.display = 'none';
    }
  }
}
