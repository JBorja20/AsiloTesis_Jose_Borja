import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-changemail',
  templateUrl: './changemail.component.html',
  styleUrls: ['./changemail.component.scss']
})
export class ChangemailComponent implements OnInit {

  contrasenia:string = '';
  verpass: boolean = false;

  constructor(
    private _auth: AuthService,
    private _dialog: MatDialogRef<ChangemailComponent>,
    private _toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }


  verificar(){
    if(this.contrasenia.length == 0){
      return ;
    }
    this._auth.reautenticar(this.contrasenia)
    .then((resp) =>{
      
      if(resp.user.uid.length > 0){
        this.cerrarDialog(true);
      }
    })
    .catch((err) =>{
      this._toastr.warning('Credenciales incorrecta', 'Error Contraseña', {
        progressAnimation: 'increasing',
        progressBar: true,
        closeButton: true
      })
    });

  }

  cerrarDialog(cerrar: boolean){
    this._dialog.close(cerrar);
  }

  cerrar(){
    this.cerrarDialog(false);
  }

  cambioPass(evento: any){
    this.contrasenia = evento;
  }

  verContrasenia(){
    this.verpass = !this.verpass;
  }

}
