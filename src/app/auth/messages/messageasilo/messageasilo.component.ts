import { AfterContentInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { MensajesService } from '../../services/mensajes/mensajes.service';

@Component({
  selector: 'app-messageasilo',
  templateUrl: './messageasilo.component.html',
  styleUrls: ['./messageasilo.component.scss']
})
export class MessageasiloComponent implements OnInit, AfterContentInit, OnDestroy {
  @ViewChild('msj-id') id__msj: ElementRef;
  @Input() dataAsilo:any = {};
  @Output() invitadoEvent: EventEmitter<any> = new EventEmitter(); 
  @Output() idDocString: EventEmitter<String> = new EventEmitter(); 
  // @Input() urlImg: string = '';
  beforeClose:boolean = false;
  elemento: any;
  iniciarChatBoolean: boolean = false;
  mensajeGroup: FormGroup;
  subscription: Subscription[] = [];
  mensaje: number = 0;
  display: boolean = false;
  invitado: boolean = false;
  finalizarChat: boolean = false;
  idDocumento: string = '';
  uidUser: string = '';
  hora = new Date();
  dataMensajes: any= {};
  minutos = (this.hora.getMinutes() < 10) ? '0'+this.hora.getMinutes() : this.hora.getMinutes();
  ocultarChat: boolean =false;
  mostrarBox: boolean = false;


  constructor(
    private msj: MensajesService,
    private _auth: AuthService,
    private _fb: FormBuilder
  ) { }

  ngOnInit(){
    // 
    // this.getMensajes();
    this.crearFormulario();
   
    
     
  }
  ngAfterContentInit(): void {
    
  }

  

  
  

  scrollMensajes(){
    this.elemento = document.getElementById('msj-id');
    
    this.elemento.scrollTop = this.elemento.scrollHeight;
  }
  

  
  crearFormulario(){
    this.mensajeGroup = this._fb.group({
      mensaje: ['']
    })
  }

  enviarMensaje( mensajegroup: FormGroup ){
    
    // this._auth.anonimoUser()
    // .onAuthStateChanged((user) =>{
    //   this.msj.getDocsid(this.dataAsilo.uid, user.uid)
    //   .subscribe((resp) =>{
    //     
    //     for(let f of resp.docs){

    //       this.msj.eliminarDocs(f.id)
    //       .then(() =>{
    //         
            
    //       })
    //     }
    //   });
    // })
        
        
    
    
    if(this.mensajeGroup.invalid){
      return;
    }
    this.mensaje = this.mensajeGroup.get('mensaje').value.length;
    if(this.invitado){
      // let mensajes: any = {};
      // this._auth.anonimoUser()
      // .onAuthStateChanged((user) =>{
      //   // if(user?.uid){
      //     // this.uidUser = user?.uid ? user.uid : ''
      //   // }
      // })
      if(this.uidUser.length > 0){
        if(this.idDocumento.length > 0){
          this.msj.updateMensajes(mensajegroup.value.mensaje, this.uidUser, this.idDocumento, this.generarId())
          .then(() =>{
            
            this.subscription.push(
              
              this.msj.getMensajesId(this.dataAsilo.uid, this.uidUser)
              .subscribe((resp) =>{
                for(let f of resp){
                  
                  this.dataMensajes = f;
                  this.mensajeGroup.reset();
                  
                  
                }
              })
            )
            
            setTimeout(() => {
              this.scrollMensajes()
                  
                }, 300);
            
          } )
          .catch((error) =>{
            
            
          })

        }else{
          if(this.mensajeGroup.invalid){
            return;
          }
          let guardarMensajes = {
            uid: this.uidUser,
            id: this.generarId(),
            mensaje: mensajegroup.value.mensaje, 
            time: this.hora.getTime(),
            hora: `${this.hora.getHours()}:${this.hora.getMinutes() < 10 ? '0'+this.hora.getMinutes() : this.hora.getMinutes()}:${ this.hora.getSeconds() < 10 ? '0'+this.hora.getSeconds() : this.hora.getSeconds()}`
          }
          this.msj.guardarMensajes(guardarMensajes, this.dataAsilo.uid, this.uidUser, this.generarId())
          .then((ref) =>{
            this.idDocumento = ref.id;
            this.idDocString.emit(this.idDocumento);
            
            this.subscription.push(

              this.msj.getMensajesId(this.dataAsilo.uid, this.uidUser)
              .subscribe((resp) =>{
                for(let f of resp){
                  
                  this.dataMensajes = f;
                  this.mensajeGroup.reset();
                }
              })
            )
            
            
            setTimeout(() => {
              this.scrollMensajes()
                  
                }, 300);
          })
          .catch((error) =>{
            
            
          })
        }
      }
    }
  }

  getMensajes(){
    this.subscription.push(
      this.msj.getMensajes()
      .subscribe((resp) =>{
        
        for(let f of resp.docs){
          
          
        }
        
      })
    )
  }

  generarId(){
    let d = new Date().getTime();
    
    
    let uuid = 'xxxxxyfxxxxxx'.replace(/[xy]/g, (c) => {
        var r = (d + Math.random() * 16 ) % 16 | 0;
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }

  iniciarChat(){
    this.display = true;
  }

  cerrar(){
    this.display = false;
  }

  iniciarInvitado(){
    this.iniciarChatBoolean = true;
    this._auth.anonimo()
    .then((resp) =>{
      this.beforeClose = true;
      this.invitado = true;
      this.invitadoEvent.emit(this.invitado);
      this.mostrarBox = false;
      // this.ocultarChat = true;
      this.uidUser = resp?.user?.uid ? resp.user.uid : '';
      
      this.iniciarChatBoolean = false;
      
    })
    .catch((error) =>{
      
      this.iniciarChatBoolean = false;
      
    })
  }
  finalizarChatFun(){
    this.finalizarChat = true;
  }

  cancelar(){
    this.finalizarChat = false;
  }

  confirmar(){
    if(this.idDocumento.length > 0 || this.idDocumento != ''){
      
      
      this.msj.eliminarDocs(this.idDocumento);
      this.idDocumento = '';
      this.dataMensajes = {};
      this._auth.eliminarUsuarioActual();
      this.msj.eliminarDocs(this.idDocumento);
      
    }else if(this.uidUser.length > 0){
      if(this.idDocumento.length > 0){

        
        this.msj.eliminarDocs(this.idDocumento);
        this.idDocumento = '';
        this.dataMensajes = {};
        this._auth.eliminarUsuarioActual();
      }else{
        this.idDocumento = '';
        this.dataMensajes = {};
        this._auth.eliminarUsuarioActual();

      }
      
    }else{
      

      this.idDocumento = '';
      this.dataMensajes = {}
    }
    this.invitado = false;
    this.mostrarBox = false;
    this.display = false;
    this.finalizarChat = false;
    this.ocultarChat = false;
    this.subscription.forEach((valor) =>{
      valor.unsubscribe();
    });
    
  }

  minimizar(){
    if(this.invitado && !this.mostrarBox){
      this.invitado = false;
    }
  }

  botonMostrarBox(){
    if(this.invitado && !this.mostrarBox){
      // this.mostrarBox = false;
      this.invitado = false;
      this.ocultarChat = true;
    }else if(this.ocultarChat){
      this.invitado = true;
    }else{
      this.mostrarBox = !this.mostrarBox;
    }
    // if(this.invitado && !this.mostrarBox){
    //   this.invitado = false;
    // }else{
    //   if(!this.invitado && !this.mostrarBox){
    //     this.invitado = true;
    //   }else{
        
        
        
    //   }
    // }
    
  }

  ngOnDestroy(): void {
    this.confirmar();
  }

}
