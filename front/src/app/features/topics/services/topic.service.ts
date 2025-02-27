import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Topic } from '../interfaces/topic.interface';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  private pathService = 'api/topic';

  constructor(private httpClient: HttpClient) { }

  public all(): Observable<Topic[]> {
    return this.httpClient.get<Topic[]>(this.pathService);
  }

  public subscribe(topicName: string): any {
    return this.httpClient.patch<any>(`${this.pathService}/subscribe/${topicName}`, null);
  }

  public unsubscribe(topicName: string): any {
    return this.httpClient.patch<any>(`${this.pathService}/unsubscribe/${topicName}`, null);
  }
}
