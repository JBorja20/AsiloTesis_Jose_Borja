import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisAsiRoutingModule } from './regis-asi-routing.module';
import { RegisAsiComponent } from './regis-asi.component';
import { AvatarModule } from 'primeng/avatar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import { TreeModule } from 'primeng/tree';
import { AsilorechazadoModule } from '../asilorechazado/asilorechazado/asilorechazado.module';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    RegisAsiComponent
  ],
  imports: [
    CommonModule,
    RegisAsiRoutingModule,
    AvatarModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatStepperModule,
    ReactiveFormsModule,
    TreeModule,
    AsilorechazadoModule,
    MatButtonModule
    
  ]
})
export class RegisAsiModule { }
