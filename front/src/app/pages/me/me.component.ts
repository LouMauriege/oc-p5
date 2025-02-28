import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../../features/auth/services/auth.service';
import { SessionService } from '../../services/session.service';
import { TopicService } from '../../features/topics/services/topic.service';
import { User } from '../../interfaces/user.interface';
import { UpdateUserRequest } from '../../features/auth/interfaces/updateUserRequest.interface';
import { passwordValidator } from 'src/app/features/auth/validators/password.validator';

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
        <label for="name">Name :</label>
        <input type="text" name="name" formControlName="name" id="name" required />
        <label for="email">E-mail :</label>
        <input type="text" name="email" formControlName="email" id="email" required />
        <label for="newPassword">Nouveau mot de passe :</label>
        <input type="password" name="newPassword" formControlName="newPassword" id="newPassword" />
        <label for="password">Mot de passe* :</label>
        <input type="password" name="password" formControlName="password" id="password" required />
        <ul *ngIf="newPassword?.invalid && password?.touched">
            <li *ngIf="newPassword?.errors?.['length']">{{ newPassword?.errors?.['length'] }}</li>
            <li *ngIf="newPassword?.errors?.['uppercase']">{{ newPassword?.errors?.['uppercase'] }}</li>
            <li *ngIf="newPassword?.errors?.['lowercase']">{{ newPassword?.errors?.['lowercase'] }}</li>
            <li *ngIf="newPassword?.errors?.['number']">{{ newPassword?.errors?.['number'] }}</li>
            <li *ngIf="newPassword?.errors?.['special']">{{ newPassword?.errors?.['special'] }}</li>
        </ul>
        <p *ngIf="updated" class="info">Informations mises à jour</p>
        <p *ngIf="onLoading">Chargement...</p>
        <p *ngIf="onError" class="error">Mauvais mot de passe !</p>
        <input type="submit" value="Sauvegarder" class="button--is-primary" />
        <button (click)="logout()" class="button--is-secondary" >Se déconnecter</button>
    </form>
        <p>id: {{ user.id }}</p>
        <p>name: {{ user.name }}</p>
        <p>email: {{ user.email }}</p>
        <p>created_at: {{ user.createdAt }}</p>
        <p>updated_at: {{ user.updatedAt }}</p>
        <p>Abonnements :</p>
        <div *ngFor="let topic of user.topics">
            <p>{{ topic }}</p>
            <button (click)="unsubscribe(topic)">Se désabonner</button>
        </div>
    </div>
  `,
  styles: [
  ]
})
export class MeComponent implements OnInit {

    updateUserForm = new FormGroup({
        email: new FormControl(''),
        name: new FormControl(''),
        newPassword: new FormControl('',
            passwordValidator()
        ),
        password: new FormControl('', Validators.required)
    });

    public onError: boolean = false;
    public onLoading: boolean = false;
    public updated: boolean = false;

    public user: User | undefined;

    constructor(
        private authService: AuthService,
        private sessionService: SessionService,
        private topicService: TopicService,
        private router: Router
    ) { }

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    this.authService.me().subscribe(
        (user: User) => {
            console.log(user);
            this.user = user
            this.updateUserForm.setValue({
                email: user.email,
                name: user.name,
                newPassword: '',
                password: ''
            });
        }
    );
  }

  public async onSubmit(): Promise<void> {
    const updateUserRequest = this.updateUserForm.value as UpdateUserRequest;

    this.onLoading = true;
    this.onError = false;
    this.updated = false;

    this.authService.update(updateUserRequest).pipe(
        finalize(() => {
            this.onLoading = false;
        })
    ).subscribe(
        (response: any) => {
            this.loadUserData();
            this.onError = false;
            this.updated = true;
        },
        (error: any) => {
            this.onError = true
        }
    );
  }

  public logout(): void {
    this.sessionService.logOut();
    this.router.navigate(['/']);
  }

  public unsubscribe(topicName: string): void {
    this.topicService.unsubscribe(topicName).subscribe(
        (response: any) => {
            console.log(response);
            this.loadUserData();
        }
    )
  }

    get newPassword() { return this.updateUserForm.get('newPassword'); }
    get password() { return this.updateUserForm.get('password'); }
}
