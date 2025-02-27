import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms'
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
            <input type="submit" value="Créer" />
        </form>
    `,
    styles: [
    ]
})
export class CreateComponent implements OnInit {

    public topics$ = this.topicService.all();

    postRequestForm = new FormGroup({
        title: new FormControl(''),
        topicName: new FormControl(''),
        content: new FormControl('')
    })

    constructor(
        private topicService: TopicService,
        private postService: PostService
    ) { }

    ngOnInit(): void {
    }

    public onSubmit() {
        const postRequest = this.postRequestForm.value as PostRequest;

        console.log(postRequest);
        this.postService.createPost(postRequest).subscribe(
            (response: any) => console.log(response)
        );
    }

}
