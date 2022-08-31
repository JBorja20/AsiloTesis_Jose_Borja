import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileadminRoutingModule } from './profileadmin-routing.module';
import { ProfileadminComponent } from './profileadmin.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AvatarModule } from 'primeng/avatar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    ProfileadminComponent
  ],
  imports: [
    CommonModule,
    ProfileadminRoutingModule,
    MatSidenavModule,
    AvatarModule,
    MatToolbarModule,
    MatIconModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class ProfileadminModule { }
