import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoverproformaComponent } from './coverproforma.component';

const routes: Routes = [
  {
    path: '',
    component: CoverproformaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoverproformaRoutingModule { }
