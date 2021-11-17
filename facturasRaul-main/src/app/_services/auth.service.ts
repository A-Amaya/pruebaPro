import { Injectable } from '@angular/core';
// @ts-ignore
import { auth } from 'firebase/app';
// @ts-ignore
import { User } from 'firebase';
import { AngularFireAuth} from '@angular/fire/auth';
import {first} from 'rxjs/operators';

@Injectable()
export class AuthService {
  public User: User;

  constructor(public afAuth: AngularFireAuth) { }

  // tslint:disable-next-line:typedef
  // @ts-ignore
  // tslint:disable-next-line:typedef
  async login(email: string, password: string){
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(email, password); return result;
    }
    catch (error) {
      console.log(error);
    }
  }    // Metodo inicio

  // tslint:disable-next-line:typedef
  async logout(){
   try {
     await this.afAuth.signOut();
   }
   catch (error) {
     console.log(error);
   }
  } // Metodo salida

  // tslint:disable-next-line:typedef
  getCurrentUser(){
    return this.afAuth.authState.pipe(first()).toPromise();
  } // metodo recuperar usuario
}
// siempre que hay asyn , se usa try cathc
