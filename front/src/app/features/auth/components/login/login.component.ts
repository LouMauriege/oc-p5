import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, Validators, FormGroup, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../interfaces/loginRequest.interface';
import { LoginResponse } from '../../interfaces/loginResponse.interface';
import { User } from 'src/app/interfaces/user.interface';
import { SessionService } from 'src/app/services/session.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
],
    template: `
        <a (click)="goHome()" class="return-arrow" >
            <svg width="41" height="24" viewBox="0 0 41 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.939339 10.9393C0.353554 11.5251 0.353554 12.4749 0.939339 13.0607L10.4853 22.6066C11.0711 23.1924 12.0208 23.1924 12.6066 22.6066C13.1924 22.0208 13.1924 21.0711 12.6066 20.4853L4.12132 12L12.6066 3.51472C13.1924 2.92893 13.1924 1.97919 12.6066 1.3934C12.0208 0.807611 11.0711 0.807611 10.4853 1.3934L0.939339 10.9393ZM41 10.5L2 10.5V13.5L41 13.5V10.5Z" fill="black"/>
            </svg>
        </a>
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
            <h2 class="form-title">Se connecter</h2>
            <label for="email">E-mail :</label>
            <input type="text" name="email" formControlName="email" id="email" required />
            <label for="password">Mot de passe :</label>
            <input type="password" name="password" formControlName="password" id="password" required />
            <p *ngIf="email?.errors?.['required'] && email?.touched || password?.errors?.['required'] && password?.touched" class="error">Tous les champs sont nécessaires !</p>
            <p *ngIf="onError" class="error">Erreur lors de la connexion !</p>
            <input type="submit" value="Se connecter" class="button--is-primary" />
        </form>
    `,
    styles: [`
    `]
})
export class LoginComponent implements OnInit {

    public onError = false;

    loginForm = new FormGroup({
        email: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
    });

    constructor(
        private authService: AuthService,
        private router: Router,
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

    public async onSubmit(): Promise<void> {
        const loginRequest = this.loginForm.value as LoginRequest;

        this.onError = false;

        this.authService.login(loginRequest).subscribe(
            (response: LoginResponse) => {
                localStorage.setItem('mdd_jwt', response.jwt);
                this.authService.me().subscribe(
                    (user: User) => {
                        this.sessionService.logIn(user);
                        this.router.navigate(['/posts']);
                    }
                );
            },
            error => this.onError = true
        );
    }

    public goHome(): void {
        this.router.navigate(['/']);
    }

    get email() { return this.loginForm.get('email'); }
    get password() { return this.loginForm.get('password'); }

}
