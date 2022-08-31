import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoverproformaRoutingModule } from './coverproforma-routing.module';
import { CoverproformaComponent } from './coverproforma.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    CoverproformaComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CoverproformaRoutingModule
  ],
  exports: [
    CoverproformaComponent
  ]
})
export class CoverproformaModule { }
