import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { User } from '../../interfaces/user.interface';
import { SessionService } from '../../services/session.service';
import { AuthService } from '../../features/auth/services/auth.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    constructor(
        private router: Router,
        private authService: AuthService,
        private sessionService: SessionService
    ) {}

    ngOnInit(): void {
        this.authService.me().subscribe(
            (user: User) => {
                this.sessionService.logIn(user);
                this.router.navigate(['/posts']);
            },
            (error) => {
                this.sessionService.logOut();
            }
        );
    }

}
