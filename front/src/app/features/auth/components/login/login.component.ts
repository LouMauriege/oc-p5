import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, Validators, FormGroup, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../interfaces/loginRequest.interface';
import { LoginResponse } from '../../interfaces/loginResponse.interface';
import { User } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
],
  template: `
    <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
        <label for="username">E-mail :</label>
        <input type="text" name="email" formControlName="email" id="email" required />
        <label for="password">Mot de passe :</label>
        <input type="password" name="password" formControlName="password" id="password" required />
        <input type="submit" value="Se connecter" />
    </form>
  `,
  styles: [
  ]
})
export class LoginComponent implements OnInit {

    loginForm = new FormGroup({
        email: new FormControl(''),
        password: new FormControl('')
    });

    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    ngOnInit(): void {

    }

    public async onSubmit(): Promise<void> {
        const loginRequest = this.loginForm.value as LoginRequest;

        this.authService.login(loginRequest).subscribe(
            (response: LoginResponse) => {
                localStorage.setItem('mdd_jwt', response.jwt);
                this.router.navigate(['/me']);
            }
        );
    }

}
