import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentService } from '../../services/comment.service';
import { CreateCommentRequest } from '../../interfaces/create-comment-request.interface';
import { Comment } from '../../interfaces/comment.interface';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-create-comment',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    template: `
        <form [formGroup]="commentRequest" (ngSubmit)="onSubmit()">
            <label for="content">Message :</label>
            <input type="text" name="content" formControlName="content" id="content" required />
            <input [disabled]="content?.errors?.['required']" type="submit" value="Envoyer" />
        </form>
    `,
    styles: [
    ]
})
export class CreateCommentComponent implements OnInit {
    @Output() reloadComments = new EventEmitter<void>();

    @Input() postId: number | undefined;

    commentRequest = new FormGroup({
        content: new FormControl('', Validators.required)
    })

    constructor(private commentService: CommentService) { }

    ngOnInit(): void {
    }

    onSubmit(): void {
        const request = this.commentRequest.value as CreateCommentRequest;

        this.commentService.createComment(this.postId!, request).subscribe(
            (response: any) => {
                console.log(response);
                this.reloadComments.emit();
                this.commentRequest.setValue({
                    content: ''
                });
                // window.location.reload();
            }
        );
    }

    get content() { return this.commentRequest.get('content'); }

}
