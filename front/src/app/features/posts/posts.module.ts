import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostRoutingModule } from './post-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { CommentComponent } from '../comments/components/comment/comment.component';

@NgModule({
  declarations: [],
  imports: [
    PostRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // CommentComponent
  ],
//   exports: [CommentComponent]
})
export class PostsModule { }
