import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopicService } from '../../services/topic.service';

@Component({
    selector: 'app-list',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="component-wrapper">
            <div class="card-grid">
                <div *ngFor="let topic of (topics$ | async)" class="card">
                    <p>{{ topic.name }}</p>
                    <p>{{ topic.description }}</p>
                    <button (click)="subscribe(topic.name)" class="button--is-primary">S'abonner</button>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .component-wrapper {
            padding: 64px;
            max-width: 1000px;
            margin: auto;
        }
        .button--is-primary {
            margin: auto;
        }
    `]
})
export class ListComponent implements OnInit {

    public topics$ = this.topicService.all();

  constructor(
    private topicService: TopicService
  ) { }

  ngOnInit(): void {
  }

  public subscribe(topicName: string): void {
    this.topicService.subscribe(topicName).subscribe(
        (response: any) => {
            console.log(response);
        }
    );
  }

}
