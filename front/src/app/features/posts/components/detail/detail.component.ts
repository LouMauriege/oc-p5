import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../interfaces/post.interface';
import { PostService } from '../../services/post.service';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../../interfaces/user.interface';
import { CommentComponent } from '../../../comments/components/comment/comment.component';
import { CreateCommentComponent } from '../../../comments/components/create-comment/create-comment.component';
import { CustomDatePipe } from 'src/app/shared/pipe/custom-date.pipe';
import { Router } from '@angular/router';

@Component({
    selector: 'app-detail',
    standalone: true,
    imports: [
        CommonModule,
        CommentComponent,
        CreateCommentComponent,
        CustomDatePipe
    ],
    template: `
        <a (click)="goHome()" class="return-arrow" >
            <svg width="41" height="24" viewBox="0 0 41 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.939339 10.9393C0.353554 11.5251 0.353554 12.4749 0.939339 13.0607L10.4853 22.6066C11.0711 23.1924 12.0208 23.1924 12.6066 22.6066C13.1924 22.0208 13.1924 21.0711 12.6066 20.4853L4.12132 12L12.6066 3.51472C13.1924 2.92893 13.1924 1.97919 12.6066 1.3934C12.0208 0.807611 11.0711 0.807611 10.4853 1.3934L0.939339 10.9393ZM41 10.5L2 10.5V13.5L41 13.5V10.5Z" fill="black"/>
            </svg>
        </a>
        <div class="component-wrapper">
            <div *ngIf="post">
                <h2 class="from-title">{{ post.title }}</h2>
                <div class="infos-wrapper">
                    <p *ngIf="postAuthor">{{ postAuthor }}</p>
                    <p>{{ post.topicName }}</p>
                    <p>{{ post.createdAt | customDate }}</p>
                </div>
                <p>{{ post.content }}</p>
                <hr />
                <h2 class="from-title">Commentaires</h2>
                <comment-component [postId]="post.id"></comment-component>
                <app-create-comment [postId]="post.id" (reloadComments)="loadComments()"></app-create-comment>
            </div>
        </div>
    `,
    styles: [`
        .component-wrapper {
            padding: 64px;
            max-width: 1000px;
            margin: auto;
        }
        .infos-wrapper {
            display: flex;
            column-gap: 8px;
        }
    `]
})
export class DetailComponent implements OnInit, AfterViewInit {

    @ViewChild(CommentComponent) commentComponent!: CommentComponent;

    public post: Post | undefined;
    public postAuthor: string | undefined;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
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

    ngAfterViewInit() {
    }

    public loadComments() {
        if (this.commentComponent) {
            this.commentComponent.loadComments();
        }
    }

    public goHome(): void {
        this.router.navigate(['/posts']);
    }

}
