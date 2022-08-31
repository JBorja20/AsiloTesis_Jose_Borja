import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileasiloComponent } from './profileasilo.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileasiloComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileasiloRoutingModule { }
