import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GivepassRoutingModule } from './givepass-routing.module';
import { GivepassComponent } from './givepass.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AvatarModule } from 'primeng/avatar';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatStepperModule } from '@angular/material/stepper';
import { TreeModule } from 'primeng/tree';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTreeModule } from '@angular/material/tree';
import { MatSelectModule } from '@angular/material/select';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    GivepassComponent
  ],
  imports: [
    CommonModule,
    GivepassRoutingModule,
    MatSidenavModule,
    AvatarModule,
    MatToolbarModule,
    MatIconModule,
    MatStepperModule,
    TreeModule,
    ReactiveFormsModule,
    FormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatTreeModule,
    MatSelectModule,
    MatCheckboxModule,
    NgbPopoverModule,
    MatButtonModule

  ]
})
export class GivepassModule { }
