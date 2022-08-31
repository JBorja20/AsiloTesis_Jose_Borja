import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileadminComponent } from './profileadmin.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileadminComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileadminRoutingModule { }
