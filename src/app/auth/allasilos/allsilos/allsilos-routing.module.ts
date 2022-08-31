import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllsilosComponent } from './allsilos.component';

const routes: Routes = [
  {
    path: '',
    component: AllsilosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllsilosRoutingModule { }
