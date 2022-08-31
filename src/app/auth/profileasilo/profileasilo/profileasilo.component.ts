import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../services/auth.service';
import { CambiarimgComponent } from '../cambiarimg/cambiarimg.component';
import { ChangemailComponent } from '../changemail/changemail.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-profileasilo',
  templateUrl: './profileasilo.component.html',
  styleUrls: ['./profileasilo.component.scss']
})
export class ProfileasiloComponent implements OnInit , OnDestroy {

  subscription: Subscription[] = [];


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
  mostrarFormulario: boolean = true;
  aprobado: boolean = false;
  patternCorreo: boolean = false;

  profileAsilo: FormGroup;
  foto: string= '';
  constructor(
    private _auth: AuthService,
    private _cookie: CookieService,
    private _dialog: MatDialog,
    public router: Router,
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
    this.profileAsilo = this._fb.group({
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
          // this.foto = f.data().foto;
          this.mostrarFormulario = f.data().mostrarRegistroAsilo;
        }
        
      }
    });
  }

  verContrasenia(){
    this.verpass = !this.verpass;
  }


  getData() {
    this.subscription.push(

      this._auth.traerDataFirebase(this.token)
        .subscribe((resp: any) => {
          
  
          for (let f of resp.docs) {
            // this.data = f.data()
            this.idDoc = f.id;
            
            
            this.data = resp;
            
            this.dataUser = this._auth.insertCorreoAuth().currentUser;
            this.nombre = this.dataUser.displayName;
            
            
            this.profileAsilo.setValue({
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
  async cerrarProfile(){
    this._cookie.deleteAll();
    this.router.navigateByUrl('/login', {replaceUrl: true});
    const logout = await  this._auth.logout();    
    this.toastr.success('Informacion modificar con exito', 'Actualizacion', {
      progressAnimation: 'decreasing',
      progressBar: true
    })

    
  }

  guardar() {
    
    
    let nombre = (!this.errorNombre && !this.errorNombreMin && !this.errorNombrePattern) ? this.profileAsilo.get('nombre').value.trim() : this.dataUser.displayName;
    let dir = (this.profileAsilo.get('direccion').value.length > 0) ? this.profileAsilo.get('direccion').value.trim() : this.data.direccion;
    let phone = (!this.errorPhone) ? this.profileAsilo.get('telefono').value.trim() : this.data.phone;
    
    
    
    
    const nombreUserFirebase = this._auth.insertNameCurrent()
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
    });

    // this.subscription.push(nombreUserFirebase);
      
    
      
  }

  traer(){
    this.token = this._cookie.get('uid');
    this._auth.traerDataFirebase(this.token)
      .subscribe((resp: any) => {
          this.data = {};

          
          
          
          this.profileAsilo.reset();
  
          for (let f of resp.docs) {
            // this.data = f.data()
            this.idDoc = f.id;
            
            
            this.data = f.data();
            
            this.dataUser = this._auth.insertCorreoAuth().currentUser;
            this.foto = this._auth.insertCorreoAuth().currentUser?.photoURL != null ? this._auth.insertCorreoAuth().currentUser?.photoURL : 'assets/img/no-photo.png';
            
            
            this.profileAsilo.setValue({
              nombre: this.dataUser.displayName,
              telefono: this.data.phone,
              direccion: this.data.direccion,
              email: '',
              passw: ''
            })
            // .subscribe((respAPI) =>{
            //   
              
            //   this.dataUser = respAPI;
            // });
          }
          
  
  
          
  
          

  
        })
  }

  actualizarCorreo(){
    let correo = (!this.errorCorreo && this.errorCorreoVacio) ? this.profileAsilo.get('email').value.trim() : this.dataUser.email;
    
    
    
    
    if(correo != this.dataUser.email){
      this.subscription.push(

        this._auth.insertCorreo()
        .subscribe((respCorreo) =>{
          
          
          
          respCorreo.updateEmail(correo)
          .then((rCorreo) =>{
            
            this.traer();
            this.toastSuccess('Datos actualizados correctamente', 'Datos personales');
            this.cerrar(true);
            // this.getData();
          })
          .catch((error) =>{
            
            this.toastWarning(`El correo ${ this.profileAsilo.get('email').value } ingresado ya se encuentra registrado, ingrese otro.`, 'Error  correo electronico');
            
          })
        })
      )

    }else{
      this.toastWarning(`No puede ingresar el mismo correo. Ingrese otro porfavor`, 'Error  correo electronico');

    }
    // this.subscription.push(correoUserFirebase);
  }
  actualizarPassword(){
    let password = (!this.errorPassw && this.errorPasswVacio) ? this.profileAsilo.get('passw').value.trim() : '';
    this.subscription.push(

      this._auth.insertCorreo()
      .subscribe((respPassword) =>{
        respPassword.updatePassword(password)
        .then((rPassw) =>{
          
          this.traer();
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
    let password = (!this.errorPassw && this.errorPasswVacio) ? this.profileAsilo.get('passw').value.trim() : '';
    let correo = (!this.errorCorreo && this.errorCorreoVacio) ? this.profileAsilo.get('email').value.trim() : this.dataUser.email;

    this.subscription.push(

      this._auth.insertCorreo()
      .subscribe((respCorreo) =>{
        respCorreo.updateEmail(correo)
        .then((rCorreo) =>{
          
          const passwordUserFirbase = this._auth.insertCorreo()
          .subscribe((respPassword) =>{
            respPassword.updatePassword(password)
            .then((rPassw) =>{
              
              this.traer();
              this.toastSuccess('Datos actualizados correctamente', 'Datos personales');
              // this.getData();
              this.cerrar(true);
              
            })
            .catch((error) =>{
              
              
            })
          })
        })
        .catch((error) =>{
          
          this.toastWarning(`El correo ${ this.profileAsilo.get('email').value.trim() } ingresado ya se encuentra registrado.`, 'Error  correo electronico');
          
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
  cambioCorreo(evento: any) {
    this.correo = evento.value.trim();
    // 
    
    if(this.correo.match('^[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9]{2,}(?:[a-z0-9-]*[a-z0-9])?$')){
      this.patternCorreo = true;
    }else{
      this.patternCorreo = false;
    }
  }
  cambioPass(evento: any) {
    
    
    
    this.passw = evento.value.trim();
  }

  cambiarcor() {
    
    if((this.patternCorreo && this.correo.length > 0) && this.passw.length > 6 && !this.errorPassw){
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
    }else if((this.patternCorreo && this.profileAsilo.get('email').value.length > 2)){
      
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
      
    }else if(this.profileAsilo.get('passw').value.length > 6 && !this.errorPassw){
      
      
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
      this.guardar()
      this.toastSuccess('Datos actualizados correctamente', 'Datos personales');
      // this.traer();
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


  /* Errores */

  get errorNombre(){
    return this.profileAsilo.get('nombre').hasError('required') && (this.profileAsilo.get('nombre').touched || this.profileAsilo.get('nombre').dirty);
  }
  get errorNombreMin(){
    return this.profileAsilo.get('nombre').hasError('minlength') && (this.profileAsilo.get('nombre').touched || this.profileAsilo.get('nombre').dirty);
  }
  get errorNombrePattern(){
    return this.profileAsilo.get('nombre').hasError('pattern') && (this.profileAsilo.get('nombre').touched || this.profileAsilo.get('nombre').dirty);
  }

  get errorCorreo(){
    return this.profileAsilo.get('email').hasError('pattern') && (this.profileAsilo.get('email').touched || this.profileAsilo.get('email').dirty);
  }
  get errorCorreoVacio(){
    return this.profileAsilo.get('email').value.length > 0 && (this.profileAsilo.get('email').touched || this.profileAsilo.get('email').dirty);
  }


  get errorPhone(){
    return this.profileAsilo.get('telefono').hasError('pattern') && (this.profileAsilo.get('telefono').touched || this.profileAsilo.get('telefono').dirty);
  }

  get errorPassw(){
    return this.profileAsilo.get('passw').hasError('minlength') && (this.profileAsilo.get('passw').touched || this.profileAsilo.get('passw').dirty);
  }
  get errorPasswVacio(){
    return this.profileAsilo.get('passw').value.length > 0 && (this.profileAsilo.get('passw').touched || this.profileAsilo.get('passw').dirty);
  }
  get errorDireccionMax(){
    return this.profileAsilo.get('direccion').hasError('maxlength') && (this.profileAsilo.get('direccion').touched || this.profileAsilo.get('direccion').dirty);
  }

  get errorNombreMax(){
    return this.profileAsilo.get('nombre').hasError('maxlength') && (this.profileAsilo.get('nombre').touched || this.profileAsilo.get('nombre').dirty);
  }


  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }
  




}
