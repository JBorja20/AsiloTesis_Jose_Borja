import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleasiloRoutingModule } from './moduleasilo-routing.module';
import { ModuleasiloComponent } from './moduleasilo.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AvatarModule } from 'primeng/avatar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ContentModule } from '../../messageasilo/messagecontent/content/content.module';
import { MatButtonModule } from '@angular/material/button';
import { MessageasiloComponent } from '../../messageasilo/messageasilo.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ModuleasiloComponent
  ],
  imports: [
    CommonModule,
    ModuleasiloRoutingModule,
    MatSidenavModule,
    AvatarModule,
    MatToolbarModule,
    MatIconModule,
    ContentModule,
    MatButtonModule,
    MatMenuModule,
    ReactiveFormsModule
  ]
})
export class ModuleasiloModule { }
