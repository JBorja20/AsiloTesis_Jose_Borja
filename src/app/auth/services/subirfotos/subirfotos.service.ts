import { Injectable } from '@angular/core';

import { AngularFireStorage } from '@angular/fire/compat/storage';





@Injectable({
  providedIn: 'root'
})
export class SubirfotosService {

  constructor(
    private _storage: AngularFireStorage
  ) { }
  async insertImages(file: any, nombreUser: string){
    
    
    let dividir = file.name.split('.');
    
    
   const ref = this._storage.ref(`img/${nombreUser}/` + nombreUser + "." + dividir[dividir.length - 1]);
   const upload = ref.put(file);
   
   
  return upload;
   
    
  }

  insertarPDF(archivo: File){
    const refDoc = this._storage.ref('doc/' + archivo.name);
    const upload = refDoc.put(archivo);
    

    return upload;
    
  }

  getImages(){
    const refIMG = this._storage.ref('img');
    
    return refIMG;
    
  }
}
