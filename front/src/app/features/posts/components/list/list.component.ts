import { Component, OnInit, AfterViewInit } from '@angular/core';
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
            <div class="top-page-button-wrapper">
                <button class="button--is-primary" (click)="goToCreatePost()">Créer un article</button>
                <a (click)="reverseOrder()" class="button--trier-par">
                    <p>Trier par</p>
                    <svg id="button--trier-par" width="8" height="17" viewBox="0 0 8 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.64645 16.3536C3.84171 16.5488 4.15829 16.5488 4.35355 16.3536L7.53553 13.1716C7.7308 12.9763 7.7308 12.6597 7.53553 12.4645C7.34027 12.2692 7.02369 12.2692 6.82843 12.4645L4 15.2929L1.17157 12.4645C0.976311 12.2692 0.659728 12.2692 0.464466 12.4645C0.269204 12.6597 0.269204 12.9763 0.464466 13.1716L3.64645 16.3536ZM3.5 0L3.5 16H4.5L4.5 0L3.5 0Z" fill="black"/>
                    </svg>
                </a>
            </div>
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
        .button--trier-par {
            display: flex;
            gap: 8px;
            border-radius: 8px;
            padding: 8px 16px;
            max-width: fit-content;
            align-self: center;
        }
        .button--trier-par:hover {
            background: #fafafa;
        }
        .button--trier-par p {
            margin: 0;
        }
        .top-page-button-wrapper {
            display: flex;
            justify-content: space-between;
            margin-bottom: 24px;
        }
        .button--is-primary {
            margin-bottom: 0;
        }
        @media (max-width: 700px) {
            .top-page-button-wrapper {
                flex-direction: column;
                gap: 16px;
            }
        }
    `]
})
export class ListComponent implements OnInit, AfterViewInit {

    constructor(
        private postService: PostService,
        private authService: AuthService,
        private router: Router
    ) { }

    public posts: Post[] | undefined;

    public postsAuthor: any = {};

    public orderArrow: HTMLElement | null = null;

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

    ngAfterViewInit(): void {
        this.orderArrow = document.getElementById("button--trier-par");
    }

    public seeDetail(postId: number): void {
        this.router.navigate(['/posts/detail', postId]);
    }

    public goToCreatePost(): void {
        this.router.navigate(['/posts/create']);
    }

    public reverseOrder(): void {
        this.posts = this.posts?.reverse();

        if (this.orderArrow) {
            let currentRotation = this.orderArrow.style.transform || "rotate(0deg)";
            let newRotation = currentRotation === "rotate(180deg)" ? "rotate(0deg)" : "rotate(180deg)";
            this.orderArrow.style.transform = newRotation;
        }
    }

}
