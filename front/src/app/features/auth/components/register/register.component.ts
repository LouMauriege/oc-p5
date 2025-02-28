import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, Validators, FormGroup, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { RegisterRequest } from '../../interfaces/registerRequest.interface';
import { LoginResponse } from '../../interfaces/loginResponse.interface';
import { User } from 'src/app/interfaces/user.interface';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  template: `
        <a (click)="goHome()">Retour</a>
        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
            <label for="name">Name :</label>
            <input type="text" name="name" formControlName="name" id="name" required />
            <label for="email">E-mail :</label>
            <input type="text" name="email" formControlName="email" id="email" required />
            <label for="password">Mot de passe :</label>
            <input type="password" name="password" formControlName="password" id="password" required />
            <input type="submit" value="Se connecter" />
        </form>
  `,
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

    registerForm = new FormGroup({
        name: new FormControl(''),
        email: new FormControl(''),
        password: new FormControl('')
    })

  constructor(
    private authService: AuthService,
    private router: Router,
    private sessionService: SessionService
  ) { }

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
        const registerRequest = this.registerForm.value as RegisterRequest;

        this.authService.register(registerRequest).subscribe(
            (response: LoginResponse) => {
                localStorage.setItem('mdd_jwt', response.jwt);
                this.authService.me().subscribe(
                    (user: User) => {
                        this.sessionService.logIn(user);
                        this.router.navigate(['/topics']);
                    }
                );
            }
        );
    }

    public goHome(): void {
        this.router.navigate(['/']);
    }

}
