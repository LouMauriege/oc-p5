import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest } from '../interfaces/loginRequest.interface';
import { RegisterRequest } from '../interfaces/registerRequest.interface';
import { UpdateUserRequest } from '../interfaces/updateUserRequest.interface';
import { LoginResponse } from '../interfaces/loginResponse.interface';
import { User } from 'src/app/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private pathService = 'api/auth';

  constructor(private httpClient: HttpClient) { }

  public login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`${this.pathService}/login`, loginRequest);
  }

  public register(registerRequest: RegisterRequest): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`${this.pathService}/register`, registerRequest);
  }

  public me(): Observable<User> {
    return this.httpClient.get<User>(`api/user/me`);
  }

  public update(updateUserRequest: UpdateUserRequest): any {
    return this.httpClient.post<UpdateUserRequest>(`api/user/update`, updateUserRequest);
  }
}
