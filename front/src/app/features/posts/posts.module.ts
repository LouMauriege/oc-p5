import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostRoutingModule } from './post-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
  ],
  imports: [
    PostRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
  ]
})
export class PostsModule { }
