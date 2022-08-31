import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CarouselModule } from 'primeng/carousel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarModule } from '../shared/navbar/navbar.module';
import { RouterModule } from '@angular/router';
import { DialogasilosComponent } from './dialogasilos/dialogasilos/dialogasilos.component';
import { ModuleasiloModule } from '../auth/messages/moduleasilo/moduleasilo/moduleasilo.module';
import { MostrarPipe } from '../pipes/mostrar.pipe';
import { PipesModule } from '../pipes/pipes.module';


@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    CarouselModule,
    HomeRoutingModule,
    FormsModule,
    NavbarModule,
    RouterModule,
    ReactiveFormsModule,
    PipesModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
