import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileasiloRoutingModule } from './profileasilo-routing.module';
import { ProfileasiloComponent } from './profileasilo.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AvatarModule } from 'primeng/avatar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    ProfileasiloComponent
  ],
  imports: [
    CommonModule,
    ProfileasiloRoutingModule,
    MatSidenavModule,
    AvatarModule,
    MatToolbarModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule
  ]
})
export class ProfileasiloModule { }
