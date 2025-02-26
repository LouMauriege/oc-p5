import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth.service';
import { SessionService } from '../../services/session.service';
import { User } from '../../interfaces/user.interface';
import { UpdateUserRequest } from '../../features/auth/interfaces/updateUserRequest.interface';

@Component({
  selector: 'app-me',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
],
  template: `
    <div *ngIf="user">
    <form [formGroup]="updateUserForm" (ngSubmit)="onSubmit()">
        <label for="username">Name :</label>
        <input type="text" name="name" formControlName="name" id="name" required />
        <label for="username">E-mail :</label>
        <input type="text" name="email" formControlName="email" id="email" required />
        <label for="password">Mot de passe :</label>
        <input type="password" name="password" formControlName="password" id="password" required />
        <input type="submit" value="Sauvegarder" />
        <button (click)="logout()">Se déconnecter</button>
    </form>
        <p>id: {{ user.id }}</p>
        <p>name: {{ user.name }}</p>
        <p>email: {{ user.email }}</p>
        <p>created_at: {{ user.createdAt }}</p>
        <p>updated_at: {{ user.updatedAt }}</p>
        <p *ngIf="user.topics.length != 0">sub: {{ user.topics }}</p>
        <p *ngIf="user.topics.length == 0">sub: Vous n'êtes abonné à rien !</p>
    </div>
  `,
  styles: [
  ]
})
export class MeComponent implements OnInit {

    updateUserForm = new FormGroup({
        email: new FormControl(''),
        name: new FormControl(''),
        password: new FormControl('')
    });

    public userName: String | undefined;
    public userEmail: String | undefined;

    public user: User | undefined;

    constructor(
        private authService: AuthService,
        private sessionService: SessionService,
        private router: Router
    ) { }

  ngOnInit(): void {
    this.authService.me().subscribe(
        (user: User) => {
            console.log(user);
            this.user = user
            this.updateUserForm.setValue({
                email: user.email,
                name: user.name,
                password: ''
            });
        }
    );
  }

  public async onSubmit(): Promise<void> {
    const updateUserRequest = this.updateUserForm.value as UpdateUserRequest;

    this.authService.update(updateUserRequest).subscribe(
        (response: any) => window.location.reload()
    );
  }

  public logout(): void {
    this.sessionService.logOut();
    this.router.navigate(['/']);
  }
}
