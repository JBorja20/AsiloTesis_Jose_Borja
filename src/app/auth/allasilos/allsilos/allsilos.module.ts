import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllsilosRoutingModule } from './allsilos-routing.module';
import { RouterModule } from '@angular/router';
import { AllsilosComponent } from './allsilos.component';
import { NavbarModule } from 'src/app/shared/navbar/navbar.module';


@NgModule({
  declarations: [
    AllsilosComponent
  ],
  imports: [
    CommonModule,
    AllsilosRoutingModule,
    RouterModule,
    NavbarModule
  ]
})
export class AllsilosModule { }
