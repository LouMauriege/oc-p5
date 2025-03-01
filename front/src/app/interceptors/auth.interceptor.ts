import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router) {}

    public intercept(request: HttpRequest<any>, next: HttpHandler) {
        const mdd_jwt = localStorage.getItem('mdd_jwt');
        if (mdd_jwt) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${mdd_jwt}`,
                }
            });
        }
        // return next.handle(request);
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 403 && error.error?.message === 'Jwt authentication failed') {
                    this.router.navigate(['/']);
                }
                return throwError(error);
            })
        );
    }
}
