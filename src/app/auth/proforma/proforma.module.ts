import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProformaComponent } from './proforma.component';
import { NavbarModule } from 'src/app/shared/navbar/navbar.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { ProformaRoutingModule } from './proforma-routing.module';



@NgModule({
  declarations: [
    ProformaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatRadioModule,
    MatStepperModule,
    MatCheckboxModule,
    MatTreeModule,
    MatIconModule,
    MatSelectModule,
    NavbarModule,
    ReactiveFormsModule,
    ProformaRoutingModule
  ],
  exports: [
    ProformaComponent

  ]
})
export class ProformaModule { }
