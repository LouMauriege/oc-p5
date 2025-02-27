import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateCommentRequest } from '../interfaces/create-comment-request.interface';
import { Comment } from '../interfaces/comment.interface';

@Injectable({
    providedIn: 'root'
})
export class CommentService {

    private pathService = 'api/comment';

    constructor(private httpClient: HttpClient) { }

    public getCommentsByPostId(postId: number): Observable<Comment[]> {
        return this.httpClient.get<Comment[]>(`${this.pathService}/${postId}`);
    }

    public createComment(postId: number, createCommentRequest: CreateCommentRequest) {
        return this.httpClient.post<CreateCommentRequest>(`${this.pathService}/${postId}`, createCommentRequest);
    }
}
