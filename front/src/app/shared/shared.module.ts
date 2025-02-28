import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomDatePipePipe } from './pipe/custom-date-pipe.pipe';



@NgModule({
  declarations: [
    CustomDatePipePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CustomDatePipePipe
  ]
})
export class SharedModule { }
