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
        <form [formGroup]="postRequestForm" (ngSubmit)="onSubmit()">
            <label for="title">Title :</label>
            <input type="text" name="title" formControlName="title" id="title" required />
            <label for="topicName">Thème :</label>
            <select name="topicName" id="topicName" formControlName="topicName">
                <option *ngFor="let topic of (topics$ | async)" [value]="topic.name">
                    {{ topic.name }}
                </option>
            </select>
            <label for="content">E-mail :</label>
            <input type="text" name="content" formControlName="content" id="content" required />
            <p *ngIf="
                title?.touched || topic?.touched || content?.touched &&
                title?.errors?.['required'] || topic?.errors?.['required'] || content?.errors?.['required']"
                class="error">
                Tous les champs sont nécessaires !</p>
            <input type="submit" [disabled]="postRequestForm.invalid" value="Créer" />
        </form>
    `,
    styles: [
    ]
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

    get title() { return this.postRequestForm.get('title'); }
    get topic() { return this.postRequestForm.get('topic'); }
    get content() { return this.postRequestForm.get('content'); }
}
