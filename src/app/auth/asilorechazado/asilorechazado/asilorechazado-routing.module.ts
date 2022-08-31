import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsilorechazadoComponent } from './asilorechazado.component';

const routes: Routes = [
  {
    path: '',
    component: AsilorechazadoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AsilorechazadoRoutingModule { }
