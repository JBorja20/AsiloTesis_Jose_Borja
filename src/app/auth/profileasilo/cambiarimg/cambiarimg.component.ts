import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { SubirfotosService } from '../../services/subirfotos/subirfotos.service';

@Component({
  selector: 'app-cambiarimg',
  templateUrl: './cambiarimg.component.html',
  styleUrls: ['./cambiarimg.component.scss']
})
export class CambiarimgComponent implements OnInit {

  urlimg: any= '';
  img: any = '';
  guardarImagenAnterior: any;

  constructor(
    private _ref: MatDialogRef<CambiarimgComponent>,
    private _sanitize: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fotos: SubirfotosService,
    private _auth: AuthService,
    private _toastr: ToastrService

  ) { 
    
    
  }

  ngOnInit(): void {
  }

  cerrar(cerrar: boolean){
    this._ref.close(cerrar);
  }

  cambiarIMG(evento: any){
    

    if(evento?.target.files.length > 0){

      this.img = evento.target.files[0];
      const obj = URL.createObjectURL(evento.target.files[0]);
      
      
      this.urlimg = (evento.target.files.length > 0) ? this._sanitize.bypassSecurityTrustUrl(obj): '';
    }else{
      
      this.guardarImagenAnterior = evento.target.files[0];
      
      this._toastr.warning('Se va a guardar la imagen anterior seleccionada', 'Guardar Imagen',{
        closeButton: true,
        easeTime: 1000,
        easing: 'ease',
        progressBar: true,
        progressAnimation: 'increasing',
      });
      
    }
  }

  guardar(){
    this._fotos.insertImages(this.img, this.data.data)
    .then((resp) =>{
      resp.ref.getDownloadURL()
      .then((url) =>{
        this._auth.insertPhoto()
        .subscribe((photo) =>{
          photo.updateProfile({
            photoURL: url
          })
          .then((respPhoto) =>{
            
            this._auth.updatefoto(url, this.data.id);
            
          })
          .catch((err) =>{});
        })
      });
      
      this.cerrar(true);
    })
    .catch((error)=>{});
  }



}
