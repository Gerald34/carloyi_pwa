import { NgModule } from '@angular/core';
import {
  MatDatepickerModule,
  MatNativeDateModule,
  MatCheckboxModule,
} from '@angular/material';
@NgModule({
  imports: [
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
  ],

  exports: [
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
  ],
})
export class MaterialModule {}
