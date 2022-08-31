import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MostrarPipe } from './mostrar.pipe';



@NgModule({
  declarations: [
    MostrarPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MostrarPipe
  ]
})
export class PipesModule { }
