import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AsilorechazadoRoutingModule } from './asilorechazado-routing.module';
import { AsilorechazadoComponent } from './asilorechazado.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AvatarModule } from 'primeng/avatar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [
    AsilorechazadoComponent
  ],
  imports: [
    CommonModule,
    AsilorechazadoRoutingModule,
    MatSidenavModule,
    AvatarModule,
    MatToolbarModule,
    MatIconModule,
    MatStepperModule,
    ReactiveFormsModule,
    MessagesModule,
    MatCheckboxModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    
  ],
  exports: [
    AsilorechazadoComponent
  ]
})
export class AsilorechazadoModule { }
