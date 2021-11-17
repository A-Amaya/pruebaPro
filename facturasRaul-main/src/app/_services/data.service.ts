// @ts-ignore

import {Injectable} from '@angular/core';
import {Culpa, Facturas} from '../common.interfaces';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import firebase from 'firebase/app';

const user = firebase.auth().currentUser;


// @ts-ignore
@Injectable({
  providedIn: 'root'
})
export class DataService {

  public facturas$: Observable<Facturas[]>;
  public facturasCollection: AngularFirestoreCollection<Facturas>;


  constructor(private firestore: AngularFirestore) {
    this.facturas$ = this.firestore.collection<Facturas>('facturas').valueChanges({idField: 'id'});
    this.facturasCollection = this.firestore.collection<Facturas>('facturas');
  }

  async newFactura(evt: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
      const factura = evt.split('/');
      const guias = factura[3].split('|') ;
      const detalles = factura[7].split(',').join('|');
      const factura$ = this.firestore.collection<Facturas>('facturas', ref => ref
        .where('remision2', '==', factura[4])
        .where('empresa', '==', factura[0])
        .where('ordenDeVenta', '==', factura[1]) // Buscar si ya existe alguna de las guías registradas en el documento
        .limit(1)
      ).get();
      factura$.subscribe({
        next: async (f) => {
          if (f.docs.length > 0) {
            // tslint:disable-next-line:max-line-length
            // @ts-ignore
            await this.firestore.collection<Culpa>('culpa').add({usuario: user?.email, remision: evt, Fecha_de_escaneo: new Date()});
            resolve(new Error(`Factura ${evt} ya existe`));
          } else {
            await this.firestore.collection('facturas').add({
              empresa: factura[0],
              ordenDeVenta: factura[1],
              remision1: factura[2],
              guias,
              remision2: factura[4],
              factura: factura[5],
              cantidad: factura[6],
              fechaHora: new Date().toLocaleDateString() + ' || ' + new Date().toLocaleTimeString(),
              usuario: user?.email,
              detalles
            });
            resolve(`Factura ${evt} registrada con éxito`);
            alert('datos de bicicletas \n' + detalles.toString().split(',').join('|'));
          }
        }, error: error => reject(error)
      });
    });
  }
  async validarFactura(id: string, guias: String[]): Promise<unknown> {
    return new Promise((resolve, reject) => {
      const factura$ = this.firestore.collection<Facturas>('facturas', ref => ref
        .where(firebase.firestore.FieldPath.documentId(), '==', id)
        .where('guias', 'array-contains-any', guias) // Buscar si ya existe alguna de las guías registradas en el documento
        .limit(1)
      ).get();
      factura$.subscribe({ next: async (factura) => {
          if (factura.docs.length > 0) {
            resolve(`La factura contiene las guías escaneadas`);
          } else {
            resolve(new Error(`La factura no tiene las guías escaneadas`));
          }
        }, error: error => reject(error) });
    });
  }

  async agregarGuia(id: string, guía: string) {
    return this.firestore.collection('facturas').doc(id).update({ guias: firebase.firestore.FieldValue.arrayUnion(guía) });
  }

  async borrarDato(id: string) {
 // console.log(id + " consola metodo");
return this.firestore.collection('facturas').doc(id).delete().then (() => {
  alert('Se borro el registro' + '\n' + 'puedes volver a iniciar');
}).catch((error) => {
  console.error('Error removiendo el dato:  ', error);
});
  }

  


}
