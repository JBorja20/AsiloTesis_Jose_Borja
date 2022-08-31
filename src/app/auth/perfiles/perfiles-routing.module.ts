import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilesComponent } from './perfiles.component';

const routes: Routes = [
  { 
    path: '', 
    component: PerfilesComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilesRoutingModule { }
