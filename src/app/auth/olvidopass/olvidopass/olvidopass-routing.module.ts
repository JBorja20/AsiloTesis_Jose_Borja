import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OlvidopassComponent } from './olvidopass.component';

const routes: Routes = [
  {
    path: '',
    component: OlvidopassComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OlvidopassRoutingModule { }
