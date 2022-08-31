import { Component, OnDestroy, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { CambiarimgComponent } from '../profileasilo/cambiarimg/cambiarimg.component';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ChangemailComponent } from '../profileasilo/changemail/changemail.component';

@Component({
  selector: 'app-profileadmin',
  templateUrl: './profileadmin.component.html',
  styleUrls: ['./profileadmin.component.scss']
})
export class ProfileadminComponent implements OnInit, OnDestroy {

  subscription: Subscription[] = [];
  promises: Promise<void>[] = [];
  patternCorreo: boolean = false;

  token: string = '';
  verpass: boolean = false;
  data: any = {};
  dataUser: any = {};
  nombre: string = '';
  telefono: string = '';
  direccion: string = '';
  correo: string = '';
  idDoc: string = '';
  passw: string = '';
  imagen: string= '';
  aprobado:boolean = false;
  mostrarFormulario:boolean = false;
  profileAdmin: FormGroup;
  
  constructor(
    private _auth: AuthService,
    private _cookie: CookieService,
    private _id: MatDialog,
    private _dialog: MatDialog,
    public router: Router,
    private _token: CookieService,
    private toastr: ToastrService,
    private _fb: FormBuilder
  ) { }


  ngOnInit(): void {
    this.token = this._cookie.get('uid');
    this.crearFormulario();
    this.getData();
    this.getDataFirebase();
    
  }

  crearFormulario(){
    this.profileAdmin = this._fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+'), Validators.maxLength(20)]],
      telefono: ['', [Validators.pattern('[0-9]{7,}')]],
      direccion: ['', [Validators.maxLength(60)]],
      email: ['', [Validators.pattern('^[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}(?:[a-z0-9-]*[a-z0-9])?$')]],
      passw: ['', [Validators.minLength(6)]]
    })
  }

  getDataFirebase(){
    // 
    
    this._auth.getPost(this.token)
    .subscribe((respData: any) =>{
      
      if(respData.docs.length > 0){
        for(let f of respData.docs){
          this.aprobado = f.data().aprobado;
          
          this.mostrarFormulario = f.data().mostrarRegistroAsilo;
        }
        
      }
    });
  }


  getData() {
    this.subscription.push(

      this._auth.traerDataFirebase(this.token)
        .subscribe((resp: any) => {
          
  
          for (let f of resp.docs) {
            // this.data = f.data()
            this.idDoc = f.id;
            
            
            this.data = f.data();
            
            this.dataUser = this._auth.insertCorreoAuth().currentUser;
            this.nombre = this.dataUser.displayName;
            
            
            this.profileAdmin.setValue({
              nombre: this.dataUser.displayName,
              telefono: f.data().phone,
              direccion: f.data().direccion,
              email: '',
              passw: ''
            });
          }
        })
    );
  }
  verContrasenia(){
    this.verpass = !this.verpass;
  }




  guardar() {

    
    
    let nombre = (!this.errorNombre && !this.errorNombreMin && !this.errorNombrePattern) ? this.profileAdmin.get('nombre').value.trim() : this.dataUser.displayName;
    let dir = (this.profileAdmin.get('direccion').value.length > 0) ? this.profileAdmin.get('direccion').value.trim() : this.data.direccion;
    let phone = (!this.errorPhone) ? this.profileAdmin.get('telefono').value.trim() : this.data.phone;
    
    
    
    this.promises.push(

      this._auth.insertNameCurrent()
      .then((respName) =>{
        respName.updateProfile({
          displayName: nombre
        }).then((r) =>{
          this._auth.updateDireccion(dir, phone, this.idDoc)
          .then((resp) =>{
            
            
          })
          .catch((error) =>{
            
            
          })
          
          
        })
      })
    )
  }

  actualizarCorreo(){
    let correo = (!this.errorCorreo && this.errorCorreoVacio) ? this.profileAdmin.get('email').value : this.dataUser.email;
    
    
    
    
    if(correo != this.dataUser.email){
      this.subscription.push(

        this._auth.insertCorreo()
        .subscribe((respCorreo) =>{
          
          
          
          respCorreo.updateEmail(correo)
          .then((rCorreo) =>{
            
            this.guardar();
            this.toastSuccess('Datos actualizados correctamente', 'Datos personales');
            this.cerrar(true);
            // this.getData();
          })
          .catch((error) =>{
            
            if(error.code === 'auth/email-already-in-use'){

              this.toastWarning(`El correo ${ this.profileAdmin.get('email').value } ingresado ya se encuentra registrado, ingrese otro.`, 'Error  correo electronico');
            }
            
          })
        })
      )

    }else{
      this.toastWarning(`No puede ingresar el mismo correo. Ingrese otro porfavor`, 'Error  correo electronico');

    }
    // this.subscription.push(correoUserFirebase);
  }
  actualizarPassword(){
    let password = (!this.errorPassw && this.errorPasswVacio) ? this.profileAdmin.get('passw').value : '';
    this.subscription.push(

      this._auth.insertPass()
      .subscribe((respPassword) =>{
        respPassword.updatePassword(password)
        .then((rPassw) =>{
          
          this.guardar();
          this.toastSuccess('Datos actualizados correctamente', 'Datos personales');
          this.cerrar(true);
          // this.getData();
          
        })
        .catch((error) =>{
          
          
        })
      })
    )
    // this.subscription.push(passwordUserFirbase);
  }

  actualizarCorreoAndPassw(){
    let password = (!this.errorPassw && this.errorPasswVacio) ? this.profileAdmin.get('passw').value.trim() : '';
    let correo = (!this.errorCorreo && this.errorCorreoVacio) ? this.profileAdmin.get('email').value.trim() : this.dataUser.email;

    this.subscription.push(

      this._auth.insertCorreo()
      .subscribe((respCorreo) =>{
        respCorreo.updateEmail(correo)
        .then((rCorreo) =>{
          
          
        })
        .catch((error) =>{
          if(error.code === 'auth/email-already-in-use'){

            this.toastWarning(`El correo ${ this.profileAdmin.get('email').value } ingresado ya se encuentra registrado, ingrese otro.`, 'Error  correo electronico');
          }
        })
      })
    );
    this.subscription.push(
      this._auth.insertPass()
      .subscribe((respPassword) =>{
        
        
        respPassword.updatePassword(password)
        .then((rPassw) =>{
          
          this.guardar();
          this.toastSuccess('Datos actualizados correctamente', 'Datos personales');
          // this.getData();
          this.cerrar(true);
          
        })
        .catch((error) =>{
          
          
        })
      })
    )
    
  }

  cambioNombre(evento: any) {
    this.nombre = evento;
  }

  cambioTelefono(evento: any) {
    this.telefono = evento;
  }

  cambioDireccion(evento: any) {
    this.direccion = evento;
  }


  cambiarImg(evento: any) {

    const dialog = this._dialog.open(CambiarimgComponent, {
      disableClose: false,
      data: {
        data: this.dataUser.displayName,
        id: this.idDoc
      }

    });

    dialog.afterClosed()
      .subscribe((resp) => {
        if (resp) {
          this.getData();
        }
      })

  }
  async cerrar(cambios: boolean = false){
    if(!cambios){
      this._cookie.deleteAll();
      await  this._auth.logout();
      this.router.navigateByUrl('/login', {replaceUrl: true});
  }else{
      this._cookie.deleteAll();
      await  this._auth.logout();
      this.router.navigateByUrl('/login', {replaceUrl: true});
      this.toastr.info('Por seguridad ingrese sus credenciales de nuevo. Gracias!', 'Cambio de credenciales',{
        progressAnimation: 'increasing',
        progressBar: true
      })

    }
  }


  toastSuccess(message: string, title: string){
    this.toastr.success(message, title, {
      progressAnimation: 'increasing',
      progressBar: true,
      closeButton: true,
      timeOut: 6500
    })
  }

  toastWarning(message: string, title: string){
    this.toastr.warning(message, title, {
      progressAnimation: 'increasing',
      progressBar: true,
      closeButton: true,
      timeOut: 6500
    })
  }

  cambiarcor(){

    if((this.patternCorreo && this.profileAdmin.get('email').value.length > 0) && (this.profileAdmin.get('email').value.length > 6 && !this.errorPassw)){
      
      
      const dialog = this._dialog.open(ChangemailComponent, {
        disableClose: true,
      });
      dialog.afterClosed()
        .subscribe((resp) => {
          
          
          if (resp) {
            this.actualizarCorreoAndPassw();
            // this.actualizarPassword();
            this.passw = '';
            // this._auth.logout();
            
          }
        });
    }else if((this.patternCorreo && this.profileAdmin.get('email').value.length > 2)){
      
      const dialog = this._dialog.open(ChangemailComponent, {
        disableClose: true,
      });
      dialog.afterClosed()
        .subscribe((resp) => {
          
          
          
          if (resp) {
            this.actualizarCorreo();
            
            this.passw = '';
            // this._auth.logout();
            
          }
        });
      
    }else if(this.profileAdmin.get('passw').value.length > 6 && !this.errorPassw){
      
      
      const dialog = this._dialog.open(ChangemailComponent, {
        disableClose: true,
      });
      dialog.afterClosed()
        .subscribe((resp) => {
          
          
          if (resp) {
            this.actualizarPassword();
            
            this.passw = '';
            // this._auth.logout();
            
          }
        });
    }else{
      // this.getData();
      this.guardar();
      this.toastSuccess('Datos actualizados correctamente', 'Datos personales');
      // this.getData();
    }


  }

  cambioCorreo(evento: any) {
    this.correo = evento.value;
    // 
    
    if(this.correo.match('^[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9]{2,}(?:[a-z0-9-]*[a-z0-9])?$')){
      this.patternCorreo = true;
    }else{
      this.patternCorreo = false;
    }
  }
  cambioPass(evento: any) {
    
    
    
    this.passw = evento.value;
  }

  get errorNombre(){
    return this.profileAdmin.get('nombre').hasError('required') && (this.profileAdmin.get('nombre').touched || this.profileAdmin.get('nombre').dirty);
  }
  get errorNombreMin(){
    return this.profileAdmin.get('nombre').hasError('minlength') && (this.profileAdmin.get('nombre').touched || this.profileAdmin.get('nombre').dirty);
  }
  get errorNombrePattern(){
    return this.profileAdmin.get('nombre').hasError('pattern') && (this.profileAdmin.get('nombre').touched || this.profileAdmin.get('nombre').dirty);
  }

  get errorCorreo(){
    return this.profileAdmin.get('email').hasError('pattern') && (this.profileAdmin.get('email').touched || this.profileAdmin.get('email').dirty);
  }
  get errorCorreoVacio(){
    return this.profileAdmin.get('email').value.length > 0 && (this.profileAdmin.get('email').touched || this.profileAdmin.get('email').dirty);
  }


  get errorPhone(){
    return this.profileAdmin.get('telefono').hasError('pattern') && (this.profileAdmin.get('telefono').touched || this.profileAdmin.get('telefono').dirty);
  }

  get errorPassw(){
    return this.profileAdmin.get('passw').hasError('minlength') && (this.profileAdmin.get('passw').touched || this.profileAdmin.get('passw').dirty);
  }
  get errorPasswVacio(){
    return this.profileAdmin.get('passw').value.length > 0 && (this.profileAdmin.get('passw').touched || this.profileAdmin.get('passw').dirty);
  }

  get errorNombreMax(){
    return this.profileAdmin.get('nombre').hasError('maxlength') && (this.profileAdmin.get('nombre').touched || this.profileAdmin.get('nombre').dirty);
  }

  get errorDireccionMax(){
    return this.profileAdmin.get('direccion').hasError('maxlength') && (this.profileAdmin.get('direccion').touched || this.profileAdmin.get('direccion').dirty);
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }
}
