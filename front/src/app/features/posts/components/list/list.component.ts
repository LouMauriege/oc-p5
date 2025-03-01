import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Post } from '../../interfaces/post.interface';
import { PostService } from '../../services/post.service';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../../interfaces/user.interface';
import { CustomDatePipe } from 'src/app/shared/pipe/custom-date.pipe';

@Component({
    selector: 'app-list',
    standalone: true,
    imports: [
        CommonModule,
        CustomDatePipe
    ],
    template: `
        <div class="component-wrapper">
            <button class="button--is-primary" (click)="goToCreatePost()">Créer un article</button>
            <div class="card-grid">
                <div class="card" *ngFor="let post of posts">
                    <p class="card__title">{{ post.title }} - {{ post.topicName }}</p>
                    <div class="card__infos-wrapper">
                        <p>{{ postsAuthor[post.id] }}</p>
                        <p>-</p>
                        <p>{{ post.createdAt | customDate }}</p>
                    </div>
                    <p class="card__content">{{ post.content }}</p>
                    <button (click)="seeDetail(post.id)">Voir plus ></button>
                </div>
            </div>
            <div *ngIf="!posts || posts.length == 0">
                <p>Vous ne suivez aucun thème...</p>
            </div>
        </div>
    `,
    styles: [`
        .component-wrapper {
            padding: 64px;
            max-width: 1000px;
            margin: auto;
        }
    `]
})
export class ListComponent implements OnInit {

    constructor(
        private postService: PostService,
        private authService: AuthService,
        private router: Router
    ) { }

    public posts: Post[] | undefined;

    public postsAuthor: any = {};

    ngOnInit(): void {
        this.postService.getSubscribedPosts().subscribe(
            (posts: Post[]) => {
                console.log("fetched posts : ", posts);
                this.posts = posts;
                for(let i = 0; i < posts.length; i++) {
                    this.authService.getUserById(posts[i].userId).subscribe(
                        (user: User) => {
                            console.log("post data used to fetch : ", posts[i], "/ response from user fetch : ", user);
                            this.postsAuthor[posts[i].id] = user.name;
                            console.log("result : ", this.postsAuthor);
                        }
                    );
                }
            }
        )
    }

    public seeDetail(postId: number): void {
        this.router.navigate(['/posts/detail', postId]);
    }

    public goToCreatePost(): void {
        this.router.navigate(['/posts/create']);
    }

}
