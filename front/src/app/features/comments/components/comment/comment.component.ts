import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentService } from '../../services/comment.service';
import { Comment } from '../../interfaces/comment.interface';
import { CustomDatePipe } from 'src/app/shared/pipe/custom-date.pipe';

@Component({
    selector: 'comment-component',
    standalone: true,
    imports: [
        CommonModule,
        CustomDatePipe
    ],
    template: `
        <div *ngFor="let comment of comments">
            <p>{{ comment.userName }} - {{ comment.createdAt | customDate }}<p>
            <p>{{ comment.content }}</p>
        </div>
    `,
    styles: [`
        div {
            background-color: var(--light-bg);
            padding: 24px;
            border-radius: 16px;
            margin-bottom: 8px;
        }
        p {
            margin: 0;
        }
    `]
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
