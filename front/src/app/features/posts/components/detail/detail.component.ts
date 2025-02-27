import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../interfaces/post.interface';
import { PostService } from '../../services/post.service';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../../interfaces/user.interface';
import { CommentComponent } from '../../../comments/components/comment/comment.component';
import { CreateCommentComponent } from '../../../comments/components/create-comment/create-comment.component';

@Component({
    selector: 'app-detail',
    standalone: true,
    imports: [
        CommonModule,
        CommentComponent,
        CreateCommentComponent
    ],
    template: `
        <div *ngIf="post">
            <p>{{ post.id }}</p>
            <p *ngIf="postAuthor">{{ postAuthor }}</p>
            <p>{{ post.title }}</p>
            <p>{{ post.topicName }}</p>
            <p>{{ post.content }}</p>
            <p>{{ post.createdAt }}</p>
            <p>{{ post.updatedAt }}</p>
            <comment-component [postId]="post.id"></comment-component>
            <app-create-comment [postId]="post.id"></app-create-comment>
        </div>
    `,
    styles: [
    ]
})
export class DetailComponent implements OnInit {

    public post: Post | undefined;
    public postAuthor: string | undefined;

    constructor(
        private route: ActivatedRoute,
        private postService: PostService,
        private authService: AuthService
    ) { }

    ngOnInit(): void {
        const postId: number = Number(this.route.snapshot.paramMap.get('id')!);

        this.postService.getPostById(postId).subscribe(
            (post: Post) => {
                this.post = post;
                this.authService.getUserById(post.userId).subscribe(
                    (user: User) => {
                        this.postAuthor = user.name;
                    }
                );
            }
        );
    }

}
