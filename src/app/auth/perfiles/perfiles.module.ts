import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilesComponent } from './perfiles.component';
import { NavbarModule } from 'src/app/shared/navbar/navbar.module';
import { RouterModule } from '@angular/router';
import { PerfilesRoutingModule } from './perfiles-routing.module';



@NgModule({
  declarations: [
    PerfilesComponent
  ],
  imports: [
    CommonModule,
    NavbarModule,
    RouterModule,
    PerfilesRoutingModule
  ]
})
export class PerfilesModule { }
