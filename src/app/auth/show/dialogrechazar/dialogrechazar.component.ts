import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogrechazar',
  templateUrl: './dialogrechazar.component.html',
  styleUrls: ['./dialogrechazar.component.scss']
})
export class DialogrechazarComponent implements OnInit {

  mensaje: string= '';
  formRechazo: FormGroup;
  motivoRechazo: any[] = [
    {
      name: 'Datos personales',
      value: false,
    },
    {
      name: 'Imagen',
      value: false,
    },
    {
      name: 'Documento',
      value: false,
    }
];

  constructor(
    private refdialog: MatDialogRef<DialogrechazarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  cerrar(){
    this.refdialog.close({mensaje: this.formRechazo.get('mensaje').value, v: false});
  }
  
  guardar(){
    this.refdialog.close({mensaje: this.formRechazo.get('mensaje').value, v: true, motivoRechazo: this.motivoRechazo});
    
    
  }

  cambioValor(evento: any){
    
    if(evento.checked){

      this.motivoRechazo.map((valor,index) =>{
        if(valor.name === evento.source.value){
          valor.value = true
        }
      });
    }else{
      this.motivoRechazo.map((valor, index) =>{
        if(valor.name === evento.source.value){
          valor.value = false;
        }
      })
    }

    // 
    
    
  }
  

  crearFormulario(){
    this.formRechazo = this._fb.group({
      check: [false, Validators.required],
      mensaje: ['', Validators.required]
    });
  }

}
