import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GivepassComponent } from './givepass.component';

const routes: Routes = [
  {
    path: '',
    component: GivepassComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GivepassRoutingModule { }
