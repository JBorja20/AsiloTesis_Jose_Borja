import { AfterContentInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { MensajesService } from 'src/app/auth/services/mensajes/mensajes.service';

// import { of } from 'rxjs';
import { ContentComponent } from '../../messageasilo/messagecontent/content/content.component';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-moduleasilo',
  templateUrl: './moduleasilo.component.html',
  styleUrls: ['./moduleasilo.component.scss']
})
export class ModuleasiloComponent implements OnInit, AfterContentInit, OnDestroy {

  uid: string= '';

  @ViewChild('mensajesContent') mensajesC: ContentComponent;
  public dataMensajes: any[]= [];

  mostrarMensajes: boolean = false;

  id: string = '';

  subscription: Subscription[] = [];
  aprobado: boolean = false;
  mostrarImagen: string = '';
  nombre: string ='';


  constructor(
    private _cookie: CookieService,
    private _msj: MensajesService,
    private _auth: AuthService,
    private router: Router
  ) {
    // this.dataMensajes = [];
   }

  ngOnInit(): void {
    this.uid = this._cookie.get('uid');
  }
  ngAfterContentInit(): void {
    this.ocultar();
    this.cargarDatos();
    this.getAllMessagesById();
    
  }

  cargarDatos(){
    this.mostrarImagen = this._auth.insertCorreoAuth().currentUser?.photoURL != null ? this._auth.insertCorreoAuth().currentUser?.photoURL: 'assets/img/no-photo.png';
    this.subscription.push(

      this._auth.insertName()
      .subscribe((resp) =>{
        this.nombre = resp.displayName;
        // this.mostrarImagen = (resp?.photoURL != '' || resp.photoURL != null) ? resp.photoURL : '' ;
      })
      );
    }
    
    
    ocultar(){
      this._auth.getPost(this.uid)
      .subscribe((respData: any) =>{
        
        if(respData.docs.length > 0){
          for(let f of respData.docs){
          
          this.aprobado = f.data().aprobado;
          
        }
        
      }
    });
  }

  


  getAllMessagesById(){
    this.subscription.push(
      this._msj.getMessagesByIdAsilo(this.uid)
      .subscribe((msj)=>{
        this.dataMensajes = [];
        this.dataMensajes = msj;
        
        for(let i=0; i < this.dataMensajes.length; i++){
          
          
          
          
          this.dataMensajes[i] = ({...this.dataMensajes[i], foto: '/assets/img/user_message.png'});
        }
        
      })
    );
  }

  abrirMensajes(id: string){
    if(!this.mostrarMensajes){
      
      this.mostrarMensajes = true;
      this.id = id;
    }else{
      
      this.mostrarMensajes = false;
      this.mensajesC.ngOnDestroy();
      this.id='';
    }

  }
  cambiarValorMostrar(evento: any){
    this.mostrarMensajes = evento;
  }

  async cerrar(){
    this._cookie.deleteAll();
    await  this._auth.logout();
    this.router.navigateByUrl('/login', {replaceUrl: true, skipLocationChange: false});
  }

  ngOnDestroy(): void {
    this.subscription.forEach((v) =>{
      v.unsubscribe();
    });
    if(this.mostrarMensajes){
      this.mensajesC.ngOnDestroy();
    }

  }

}
