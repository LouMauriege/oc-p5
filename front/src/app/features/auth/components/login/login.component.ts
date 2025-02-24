import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, Validators, FormGroup, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../interfaces/loginRequest.interface';
import { LoginResponse } from '../../interfaces/loginResponse.interface';

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
        private authService: AuthService
    ) { }

    ngOnInit(): void {

    }

    public async onSubmit(): Promise<void> {
        const loginRequest = this.loginForm.value as LoginRequest;

        this.authService.login(loginRequest).subscribe(
            (response: LoginResponse) => {
                console.log(response);
            }
        );

        // console.log(loginRequest);
        // console.log(JSON.stringify(loginRequest));
        // const response = await fetch("api/test/test", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(loginRequest)
        // });
        // console.log(response);

        // fetch("/api/test/test")
        //     .then((data) => {
        //         console.log("POST request successful. Response:", data);
        //     });

        //  fetch("/api/test/test")
        // .then(response => {
        //     console.log("POST request successful. Response object:", response);
        //     return response.json(); // Convert the response to JSON
        // })
        // .then(data => {
        //     console.log("Response body:", data); // Now logs the response body
        // })
        // .catch(error => {
        //     // console.error("Error:", error);
        // });

    // try {
    //     const response = await fetch("api/test/test");
    //     console.log("Response object:", response);

    //     const data = await response.json();
    //     console.log("Response body:", data);
    // } catch (error) {
    //     console.error("Error:", error);
    // }

    // try {
    //     const response = await fetch("api/auth/login");
    //     console.log("Response object:", response);

    //     const data = await response.json();
    //     console.log("Response body:", data);
    // } catch (error) {
    //     console.error("Error:", error);
    // }

    // try {
    //     const response = await fetch("/api/test/test");

    //     // Log raw response details
    //     console.log("Response Headers:", response.headers);
    //     console.log("Response Type:", response.headers.get("content-type"));

    //     const text = await response.text(); // Read as plain text first
    //     console.log("Raw Response Body:", text);

    //     // Try parsing only if it's JSON
    //     const data = JSON.parse(text);
    //     console.log("Parsed JSON Data:", data);

    // } catch (error) {
    //     console.error("Error:", error);
    // }
    }

}
