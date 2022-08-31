import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-olvidopass',
  templateUrl: './olvidopass.component.html',
  styleUrls: ['./olvidopass.component.scss']
})
export class OlvidopassComponent implements OnInit {

  correo:string = '';

  constructor(
    private _auth: AuthService,
    private _toast: ToastrService
  ) { }

  ngOnInit(): void {
  }

  reset(correo: any){
    this._auth.passOlvido(correo)
    .then((resp)=>{
      // alert(`${resp} correo enviado`);
      this._toast.success(`Se ha enviado un correo a ${correo} con instrucciones que debe seguir para cambiar su contraseña`,'Cambio de contraseña',{
        closeButton: true,
        easeTime: 700,
        easing: 'ease-in',
        progressAnimation: 'increasing',
        progressBar: true,
      })

      this.correo = '';
      
    })
    .catch((error)=>{
      this._toast.success('No se ha podido enviar el correo, intentelo de nuevo mas tarde','Cambio de contraseña',{
        closeButton: true,
        easeTime: 700,
        easing: 'ease-in',
        progressAnimation: 'increasing',
        progressBar: true,
      })
    })
  }

}
