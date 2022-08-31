import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MensajesService } from 'src/app/auth/services/mensajes/mensajes.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit, OnDestroy {

  // @Input() dataMensajes: any;
  @Input() public uid: string = '';
  @Input() id: string = '';
  // @Input() idDoc: string = '';
  @Output() nomostrar: EventEmitter<boolean> = new EventEmitter();
  dataMensajes: any[] = [];
  subscription: Subscription[] = [];
  idDoc: string= '';
  mensajesGroup: FormGroup

  elemento: any;
  mensaje: string= '';

  constructor(
    private _msj: MensajesService,
    private _fb: FormBuilder
  ) { }

  ngOnInit(): void {
    
    this.getIdDocumento();
    this.crearFomulario();
    this.getAllMessagesById();

  }
  getIdDocumento(){
    this.subscription.push(
      this._msj.getChatByIdChat(this.id)
      .subscribe((resp) =>{
        for(let f of resp.docs ){
          this.idDoc = f.id;
        }
      })

    )
  }

  crearFomulario() {
    this.mensajesGroup = this._fb.group({
      mensaje: ['']
    });
  }

  getAllMessagesById() {

    this.subscription.push(
      this._msj.getMessagesByIdChat(this.id)
        .subscribe((msj) => {
          if (msj.length > 0) {
            this.dataMensajes = [];
            this.dataMensajes = msj;
            for (let i = 0; i < this.dataMensajes.length; i++) {
              

              

              this.dataMensajes[i] = ({ ...this.dataMensajes[i], foto: '/assets/img/user_message.png' });
            }
          } else {
            this.nomostrar.emit(false);
          }


        })
    );
  }

  enviarMensaje(mensajesGroup: FormGroup) {
    if (this.mensajesGroup.invalid) {
      return;
    }

    this.mensaje = this.mensajesGroup.get('mensaje').value.length;

    this._msj.updateMensajes(this.mensajesGroup.value.mensaje, this.uid, this.idDoc, this.generarId())
      .then(() => {
        
        this.subscription.push(

          this._msj.getMessagesByIdChat(this.id)
            .subscribe((resp: any) => {
              if (resp.length > 0) {
                this.dataMensajes = [];
                this.dataMensajes = resp;
                for (let i = 0; i < this.dataMensajes.length; i++) {
                  
    
                  
    
                  this.dataMensajes[i] = ({ ...this.dataMensajes[i], foto: '/assets/img/user_message.png' });
                  this.mensajesGroup.reset();
                }
              } else {
                this.nomostrar.emit(false);
              }
            })
        )

        setTimeout(() => {
          this.scrollMensajes()

        }, 300);

      })
      .catch((error) => {
        

      })

  }


  scrollMensajes(){
    this.elemento = document.getElementById('msj-id');
    // 
    this.elemento.scrollTop = this.elemento.scrollHeight;
  }
  generarId(){
    let d = new Date().getTime();
    
    
    let uuid = 'xxxxxyfxxxxxx'.replace(/[xy]/g, (c) => {
        var r = (d + Math.random() * 16 ) % 16 | 0;
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }

  ngOnDestroy(): void {
    this.subscription.forEach((valor) => {
      valor.unsubscribe();
    })
    this.uid = '';
    this.id = '';
    this.dataMensajes = [];

    

  }

}
