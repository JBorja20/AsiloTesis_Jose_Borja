import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModuleasiloComponent } from './moduleasilo.component';

const routes: Routes = [
  {
    path: '',
    component: ModuleasiloComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleasiloRoutingModule { }
