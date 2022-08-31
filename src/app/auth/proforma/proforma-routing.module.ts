import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProformaComponent } from './proforma.component';

const routes: Routes = [
  { 
    path: '', 
    component: ProformaComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProformaRoutingModule { }
