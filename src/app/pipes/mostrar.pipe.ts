import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mostrar'
})
export class MostrarPipe implements PipeTransform {

  transform(value: any) {
    if(value !== undefined){
      
      // console.log(value);
      
      return value[0].children;
    }
    // return null;
  }

}
