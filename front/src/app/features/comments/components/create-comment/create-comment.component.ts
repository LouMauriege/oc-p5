import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentService } from '../../services/comment.service';
import { CreateCommentRequest } from '../../interfaces/create-comment-request.interface';
import { Comment } from '../../interfaces/comment.interface';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

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
            <input type="submit" value="Envoyer" />
        </form>
    `,
    styles: [
    ]
})
export class CreateCommentComponent implements OnInit {

    @Input() postId: number | undefined;

    commentRequest = new FormGroup({
        content: new FormControl('')
    })

    constructor(private commentService: CommentService) { }

    ngOnInit(): void {
    }

    onSubmit(): void {
        const request = this.commentRequest.value as CreateCommentRequest;

        this.commentService.createComment(this.postId!, request).subscribe(
            (response: any) => {
                console.log(response);
                window.location.reload();
            }
        );
    }

}
