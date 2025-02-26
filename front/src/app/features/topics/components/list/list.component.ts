import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopicService } from '../../services/topic.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngFor="let topic of (topics$ | async)">
        <p>{{ topic.id }}</p>
        <p>{{ topic.name }}</p>
        <p>{{ topic.description }}</p>
        <button (click)="subscribe(topic.name)">S'abonner</button>
    </div>
  `,
  styles: [
  ]
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
