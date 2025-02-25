import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, Validators, FormGroup, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../services/auth.service';
import { RegisterRequest } from '../../interfaces/registerRequest.interface';
import { LoginResponse } from '../../interfaces/loginResponse.interface';
import { User } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  template: `
    <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
        <label for="username">Name :</label>
        <input type="text" name="name" formControlName="name" id="name" required />
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
export class RegisterComponent implements OnInit {

    registerForm = new FormGroup({
        name: new FormControl(''),
        email: new FormControl(''),
        password: new FormControl('')
    })

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  public async onSubmit(): Promise<void> {
        const registerRequest = this.registerForm.value as RegisterRequest;

        console.log(registerRequest);

        localStorage.removeItem('mdd_jwt');

        this.authService.register(registerRequest).subscribe(
            (response: LoginResponse) => {
                localStorage.setItem('mdd_jwt', response.jwt);
                this.authService.me().subscribe((user: User) => {
                    console.log(user);
                })
            }
        );
  }

}
