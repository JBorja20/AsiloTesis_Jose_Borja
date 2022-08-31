import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShowRoutingModule } from './show-routing.module';
import { ShowComponent } from './show.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AvatarModule } from 'primeng/avatar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RechazadosComponent } from './rechazados/rechazados.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DialogrechazarComponent } from './dialogrechazar/dialogrechazar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    ShowComponent,
    RechazadosComponent,
    DialogrechazarComponent
  ],
  imports: [
    CommonModule,
    ShowRoutingModule,
    MatSidenavModule,
    AvatarModule,
    MatToolbarModule,
    MatIconModule,
    MatTabsModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class ShowModule { }
