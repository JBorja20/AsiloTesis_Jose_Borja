import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisAsiComponent } from './regis-asi.component';

const routes: Routes = [
  {
    path: '',
    component: RegisAsiComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisAsiRoutingModule { }
