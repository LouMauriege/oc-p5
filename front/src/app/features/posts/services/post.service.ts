import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../interfaces/post.interface';
import { PostRequest } from '../interfaces/postRequest.interface';

@Injectable({
  providedIn: 'root'
})
export class PostService {

    private pathService = 'api/post';

    constructor(private httpClient: HttpClient) { }

    public getSubscribedPosts(): Observable<Post[]> {
        return this.httpClient.get<Post[]>(this.pathService);
    }

    public getPostById(postId: number) {
        return this.httpClient.get<Post>(`${this.pathService}/${postId}`);
    }

    public createPost(postRequest: PostRequest) {
        return this.httpClient.post<PostRequest>(`${this.pathService}`, postRequest);
    }
}
