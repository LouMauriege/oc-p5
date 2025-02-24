import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor() {}

    public intercept(request: HttpRequest<any>, next: HttpHandler) {
        const mdd_jwt = localStorage.getItem('mdd_jwt');
        if (mdd_jwt) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${mdd_jwt}`,
                }
            });
        }
        return next.handle(request);
    }
}
