import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms'
import { TopicService } from '../../../topics/services/topic.service';
import { PostService } from '../../../posts/services/post.service';
import { PostRequest } from '../../interfaces/postRequest.interface';

@Component({
    selector: 'app-create',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    template: `
        <a (click)="goHome()" class="return-arrow" >
            <svg width="41" height="24" viewBox="0 0 41 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.939339 10.9393C0.353554 11.5251 0.353554 12.4749 0.939339 13.0607L10.4853 22.6066C11.0711 23.1924 12.0208 23.1924 12.6066 22.6066C13.1924 22.0208 13.1924 21.0711 12.6066 20.4853L4.12132 12L12.6066 3.51472C13.1924 2.92893 13.1924 1.97919 12.6066 1.3934C12.0208 0.807611 11.0711 0.807611 10.4853 1.3934L0.939339 10.9393ZM41 10.5L2 10.5V13.5L41 13.5V10.5Z" fill="black"/>
            </svg>
        </a>
        <form [formGroup]="postRequestForm" (ngSubmit)="onSubmit()">
            <h2 class="form-title">Créer un nouvel article</h2>
            <select name="topicName" id="topicName" formControlName="topicName">
                <option *ngFor="let topic of (topics$ | async)" [value]="topic.name">
                    {{ topic.name }}
                </option>
            </select>
            <input type="text" name="title" formControlName="title" id="title" placeholder="Titre de l'article" required />
            <textarea name="content" formControlName="content" id="content" placeholder="Contenu de l'article"required ></textarea>
            <p *ngIf="
                title?.touched || topic?.touched || content?.touched &&
                title?.errors?.['required'] || topic?.errors?.['required'] || content?.errors?.['required']"
                class="error">
                Tous les champs sont nécessaires !</p>
            <input type="submit" [disabled]="postRequestForm.invalid" value="Créer" />
        </form>
    `,
    styles: [`
    `]
})
export class CreateComponent implements OnInit {

    public topics$ = this.topicService.all();

    postRequestForm = new FormGroup({
        title: new FormControl('', Validators.required),
        topicName: new FormControl('', Validators.required),
        content: new FormControl('', Validators.required)
    })

    constructor(
        private topicService: TopicService,
        private postService: PostService,
        private router: Router
    ) { }

    ngOnInit(): void {
    }

    public onSubmit() {
        const postRequest = this.postRequestForm.value as PostRequest;

        console.log(postRequest);
        this.postService.createPost(postRequest).subscribe(
            (response: any) => {
                console.log(response)
                this.router.navigate(['/posts']);
            }
        );
    }

    public goHome(): void {
        this.router.navigate(['/posts']);
    }

    get title() { return this.postRequestForm.get('title'); }
    get topic() { return this.postRequestForm.get('topic'); }
    get content() { return this.postRequestForm.get('content'); }
}
