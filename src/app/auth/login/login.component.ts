//import { User } from '@angular/fire';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService],
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  verpass: boolean =true;

  //   =new FormGroup({
  //     email: new FormControl(''),
  //     password: new FormControl(''),
  // });
  constructor(
    private authSvc: AuthService,
    private router: Router,
    private _fb: FormBuilder,
    private _cookie: CookieService,
    private _auth: AuthService,) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  crearFormulario() {
    // Validators.pattern
    this.loginForm = this._fb.group({
      email: ['', [Validators.email, Validators.required, Validators.pattern('^[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9]{2,}(?:[a-z0-9-]*[a-z0-9])?$')]],
      password: ['', [Validators.minLength(6), Validators.required]]
    });
  }
/* errores email */
  get errorCorreo(){
    return this.loginForm.get('email').hasError('required') && (this.loginForm.get('email').touched || this.loginForm.get('email').dirty);
  }

  get errorPattern(){
    return this.loginForm.get('email').hasError('pattern') && (this.loginForm.get('email').touched || this.loginForm.get('email').dirty);
  }

  /* errores passw */
  get errorPass(){
    return this.loginForm.get('password').hasError('required') && (this.loginForm.get('password').touched || this.loginForm.get('password').dirty);
  }
  get errorPassMin(){
    return this.loginForm.get('password').hasError('minlength') && (this.loginForm.get('password').touched || this.loginForm.get('password').dirty);
  }


  async onLogin() {
    const { email, password } = this.loginForm.value;
    this.authSvc.login(email, password)
      .then((resp) => {
        console.log(resp);
        
        Swal.fire({
          title: 'Validando credenciales',
          titleText: 'Comprobando credenciales, Espere por favor.......',
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false,
          icon: 'info',
          didOpen: () => {
            Swal.showLoading();
          }
        });
        

        this.authSvc.traerDataFirebase(resp.user.uid)
          .subscribe((respData: any) => {
            

            for (let d of respData.docs) {
              if (d.data().tipo === 'admin') {
                this.authSvc.guardarCookie('admin', resp.user.uid);
                Swal.close();
                this.router.navigateByUrl('/gerente/show');
                // localStorage.setItem('tipo', f.tipo);
              } else {
                

                this.authSvc.traerDataPost(d.data().uid)
                  .subscribe((respPost: any) => {
                    
                    if (!respPost.empty) {
                      for (let f of respPost.docs) {
                        
                        if (f.data()?.aprobado == true) {
                          this.authSvc.guardarCookie('asilos', resp.user.uid);
                          Swal.close();
                          this.router.navigateByUrl('/asilo/info');

                        } else {
                          this.authSvc.guardarCookie('asilos', resp.user.uid);
                          Swal.close();
                          this.router.navigateByUrl('/asilo/regis-asi');
                        }
                      }

                    } else {

                      setTimeout(() => (alert('Hello')), 1000);
                      this.authSvc.guardarCookie('asilos', resp.user.uid);
                      Swal.close();
                      this.router.navigateByUrl('/asilo/regis-asi');

                    }
                  })

              }

            }





          });

      })
      .catch((erro) => {
        
        
        if(erro.code == 'auth/wrong-password' || erro.code == 'auth/user-not-found'){

          this.errorCredenciales('Validando credenciales', 'Usuario y contraseña son incorrectos, revise por favor');
        }else{
          this.errorCredenciales('Validando credenciales', 'Su cuenta ha sido temporalmente bloqueada debido a varios intentos, por favor intente mas tarde. Si el error persiste comuniquese con nombre@gmail.com')
        }

      });

  }

  errorCredenciales(title: string, text: string){
    Swal.fire({
      title,
      text,
      allowOutsideClick: true,
      allowEscapeKey: true,
      allowEnterKey: true,
      icon: 'error',
      confirmButtonText: 'Aceptar',
    });
  }

  verContrasenia(){
    this.verpass = !this.verpass;
  }
  async cerrar() {
    this._cookie.deleteAll();
    await this._auth.logout();
    this.router.navigateByUrl('/login', { replaceUrl: true, skipLocationChange: false });
  }
}
