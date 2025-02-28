import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Post } from '../../interfaces/post.interface';
import { PostService } from '../../services/post.service';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../../interfaces/user.interface';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngFor="let post of posts">
        <p>{{ post.id }}</p>
        <p>{{ postsAuthor[post.id] }}</p>
        <p>{{ post.title }}</p>
        <p>{{ post.topicName }}</p>
        <p>{{ post.content }}</p>
        <p>{{ post.createdAt }}</p>
        <p>{{ post.updatedAt }}</p>
        <button (click)="seeDetail(post.id)">Voir plus ></button>
    </div>
    <div *ngIf="!posts || posts.length == 0">
        <p>Vous ne suivez aucun thème...</p>
    </div>
  `,
  styles: [
  ]
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

}
