import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentService } from '../../services/comment.service';
import { Comment } from '../../interfaces/comment.interface';

@Component({
    selector: 'comment-component',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div *ngFor="let comment of comments">
            <p>{{ comment.userName }}</p>
            <p>{{ comment.content }}</p>
            <p>{{ comment.createdAt }}</p>
            <p>{{ comment.updatedAt }}</p>
        </div>
    `,
    styles: [
    ]
})
export class CommentComponent implements OnInit {

    @Input() postId: number | undefined;

    public comments: Comment[] | undefined;

    constructor(private commentService: CommentService) { }

    ngOnInit(): void {
        this.loadComments();
    }

    public loadComments(): void {
        this.commentService.getCommentsByPostId(this.postId!).subscribe(
            (comments: Comment[]) => {
                this.comments = comments;
            }
        );
    }

}
