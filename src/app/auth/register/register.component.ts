
import  emailjs  from '@emailjs/browser';
import { AuthService } from './../services/auth.service';
/*import { auth } from 'firebase/app';*/
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers:[AuthService],
})
export class RegisterComponent implements OnInit {
  verpass: boolean =true;
      registerForm=new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9]{2,}(?:[a-z0-9-]*[a-z0-9])?$')]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      nombre: new FormControl('', [Validators.required, Validators.minLength(2), Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+'), Validators.maxLength(20)]),
      direccion: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(60)])
  });

  enviarFirebase: any = {};
  constructor(private authSvc:AuthService, private router:Router,    private _cookie: CookieService,
    private _auth: AuthService) { }

  ngOnInit(): void {
  }

  enviarcorreo(){
    let templateParams = {
      from_name:'casa esperanza',
      email_to:this.registerForm.get('email').value.trim(),
      reply_to:'noreply@gmail.com',
      to_name: 'Jose borja'
    }
    const emailen=emailjs.send(environment.servicecorreo, environment.templatecorreo, templateParams, environment.publicKey)
    return emailen;
  }
  async onRegister(){

    if(this.registerForm.invalid){
      return Object.values(this.registerForm.controls ).forEach(validator => {
        validator.markAllAsTouched();
      })
    }

    const{email, password ,nombre}=this.registerForm.value;
     this.authSvc.register(email.trim(), password.trim())
     .then((user) =>{
      if(user){
        //  this.enviarcorreo()
        //  .then((ok) =>{
        //   
          

           
           Swal.fire({
            title: 'Validando Campos...',
            text: 'Registro Existoso, gracias por formar parte de mejor sitio web, se ha enviado un correo de registro',
            confirmButtonText: 'Aceptar',
            icon: 'success',
            timer: 2000 
          });
          Swal.showLoading();
          
            this.enviarFirebase = {
              direccion: this.registerForm.get('direccion').value.trim(),
              tipo: 'asilo',
              uid: user.user.uid,
              phone: '',
              password: this.registerForm.get('password').value.trim(),
              foto: ''
            }
      
            this.authSvc.insertName()
            .subscribe((resp) =>{
              resp.updateProfile({
                displayName: nombre
              }).then((resp) =>{
                
                
              })
      
              
            });
      
          this.authSvc.guardarInfoRegistro(this.enviarFirebase)
          .then(async(respFirebase: any)=>{
            
            
              if(user && respFirebase.id.length > 2){
                // 
                Swal.close();
                this.authSvc.guardarCookie('asilos', user.user.uid);
      
                this.router.navigateByUrl('asilo/regis-asi');
                
              }else{
                
                Swal.close();
                
                
              }
          } )
          .catch((erroResp) =>{
            
            Swal.fire({
              title: 'Error de registro',
              text: 'No se pudo registrar por un error desconocido',
              confirmButtonText: 'Aceptar',
              icon: 'error',
              confirmButtonAriaLabel: 'Aceptar'
            });
          });
        //  }).catch((ah)=>{
        //   Swal.close();
        //   Swal.fire({
        //     title: 'Error de registro',
        //     text: 'No se ha podido enviar el correo del registro intentelo de nuevo',
        //     confirmButtonText: 'Aceptar',
        //     icon: 'error',
        //     confirmButtonAriaLabel: 'Aceptar'
        //   });
         
        //  })
      }

     })
     .catch((error) =>{
       Swal.close();
       Swal.fire({
         title: 'Error de registro',
         text: 'No puede utilizar el correo electronico ' + this.registerForm.get('email').value.trim() + ' debido a que ya se encuentra registrado.',
         confirmButtonText: 'Aceptar',
         icon: 'error',
         confirmButtonAriaLabel: 'Aceptar'
       });
       
      // 
     })


  }
  verContrasenia(){
    this.verpass = !this.verpass;
  }
  async cerrar() {
    this._cookie.deleteAll();
    await this._auth.logout();
    this.router.navigateByUrl('/login', { replaceUrl: true, skipLocationChange: false });
  }

  /* error nombre */

  get errorNombre(){
    return this.registerForm.get('nombre').hasError('required') && (this.registerForm.get('nombre').touched || this.registerForm.get('nombre').dirty);
  }
  get errorNombreMin(){
    return this.registerForm.get('nombre').hasError('minlength') && (this.registerForm.get('nombre').touched || this.registerForm.get('nombre').dirty);
  }

  get errorDireccion(){
    return this.registerForm.get('direccion').hasError('required') && (this.registerForm.get('direccion').touched || this.registerForm.get('direccion').dirty);
  }
  get errorDireccionMin(){
    return this.registerForm.get('direccion').hasError('minlength') && (this.registerForm.get('direccion').touched || this.registerForm.get('direccion').dirty);
  }
  get errorDireccionMax(){
    return this.registerForm.get('direccion').hasError('maxlength') && (this.registerForm.get('direccion').touched || this.registerForm.get('direccion').dirty);
  }


  get errorCorreo(){
    return this.registerForm.get('email').hasError('required') && (this.registerForm.get('email').touched || this.registerForm.get('email').dirty);
  }
  get errorCorreoPattern(){
    return this.registerForm.get('email').hasError('pattern') && (this.registerForm.get('email').touched || this.registerForm.get('email').dirty);
  }

  get errorPassword(){
    return this.registerForm.get('password').hasError('required') && (this.registerForm.get('password').touched || this.registerForm.get('password').dirty);
  }
  get errorPasswordMin(){
    return this.registerForm.get('password').hasError('minlength') && (this.registerForm.get('password').touched || this.registerForm.get('password').dirty);
  }

  get errorNombrePattern(){
    return this.registerForm.get('nombre').hasError('pattern') && (this.registerForm.get('nombre').touched || this.registerForm.get('nombre').dirty);
  }
  get errorNombreMax(){
    return this.registerForm.get('nombre').hasError('maxlength') && (this.registerForm.get('nombre').touched || this.registerForm.get('nombre').dirty);
  }
}
