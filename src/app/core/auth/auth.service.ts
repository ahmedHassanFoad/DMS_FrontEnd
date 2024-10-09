import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { UserDto } from './models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public loggedInSubject$ = new BehaviorSubject<boolean>(false);
  private isAdminSubject$ = new BehaviorSubject<boolean>(false);
  public isAdmin$ = this.isAdminSubject$.asObservable();

  constructor(private httpCient: HttpClient) {
    this.loggedInSubject$.next(this.isLoggedIn() ?? false);
    this.isAdminSubject$.next(localStorage.getItem('role') == 'Admin');
  }

  handelLogin(loginData: any): Observable<any> {
    return this.httpCient
      .post('https://localhost:7227/api/Accounts/Login', loginData)
      .pipe(
        tap((result: any) => {
          localStorage.setItem('token', result.token);
          localStorage.setItem('role', result.role);
          console.log(localStorage.getItem('token'));
          localStorage.setItem('workSpace', result.workSpaceID.toString());
          this.loggedInSubject$.next(true);
          this.isAdminSubject$.next(result.role === 'Admin');
        })
      );
  }

  public isLoggedIn(): boolean {
    const jwtHelper = new JwtHelperService();
    let token = localStorage.getItem('token');
    return !!(
      token && !jwtHelper.isTokenExpired(localStorage.getItem('token'))
    );
  }
}

interface DecodedToken {
  exp: number;
  [key: string]: any;
}
