import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from "../services/session.service";

@Injectable({
  providedIn: 'root'
})
export class UnauthGuard implements CanActivate {

    constructor(
        private router: Router,
        private sessionService: SessionService,
    ) {}

//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//     return true;
//   }

    public canActivate(): boolean {
        if (this.sessionService.isLogged) {
            this.router.navigate(['posts']);
            return false;
        }
        return true;
    }

}
