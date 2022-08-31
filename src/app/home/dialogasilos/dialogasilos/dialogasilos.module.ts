import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogasilosComponent } from './dialogasilos.component';
import { MostrarPipe } from 'src/app/pipes/mostrar.pipe';
import { MessageasiloModule } from 'src/app/auth/messages/messageasilo/messageasilo.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { MatButtonModule } from '@angular/material/button';
import { MessageasiloComponent } from 'src/app/auth/messages/messageasilo/messageasilo.component';
import { RouterModule } from '@angular/router';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';




@NgModule({
  declarations: [
    DialogasilosComponent,
    MessageasiloComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AvatarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    PipesModule,
    MatMenuModule,
    ButtonModule
  ],
  exports: [
    DialogasilosComponent

  ]
})
export class DialogasilosModule { }
