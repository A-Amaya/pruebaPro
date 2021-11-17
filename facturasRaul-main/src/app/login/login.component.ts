import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../_services/auth.service';
import {Router} from '@angular/router';


var usuario: string ;

// @ts-ignore
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService]
})

export class LoginComponent implements OnInit {

  loginForm = new FormGroup ({
  email: new FormControl(''),
  password: new FormControl(''), });
  // @ts-ignore
  constructor(private authSvc: AuthService, private router: Router) {}

  ngOnInit(): void {}

  // tslint:disable-next-line:typedef
  async onLogin(){
    // console.log( this.loginForm.value); //aqui verificamos errores en la consola
     const {email, password} = this.loginForm.value;

     try {
    const user = await this.authSvc.login(email, password);
    if (user){
      //Usuarios mientras
      if (email == "raulleal4@gmail.com"){
        usuario = "Raúl Leal";
      }
      else if (email== "gaudielutj@gmail.com"){
        usuario = "Gaudiel Garcia";
      }
      else if (email== "siglo2@veloci.com"){
        usuario = "Siglo 2";
      }
      else if (email== "motos@veloci.com"){
        usuario = "Salida motos";
      }
      else if (email== "pgonzalez@grupoveloci.com"){
        usuario = "Pedro Cuahutemoc";
      }
      else if (email== "mngonzalez@grupoveloci.com"){
        usuario = "Mariana Gonzalez";
      }
      else if (email== "jctorres@grupoveloci.com"){
        usuario = "Juan Carlos Torres";
      }
      else if (email== "clujan@grupoveloci.com"){
        usuario = "Candelario Lujan";
      }
      //termina usuario

      // redireccionar metodo
      this.router.navigate(['/escaner']);
      alert("Bienvenido" + " \n " + usuario)
    }
    else {
      alert("Usuario o contraseña equivocado");
    }
    }
    catch (error) {
      console.log(error);
    }
  }
}
