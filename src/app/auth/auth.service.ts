import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface usernameAvailableResponse {
  available: boolean;
}

export interface SigninCredentials {
  username: string;
  password: string;
}

interface SignedinResponse {
  username: string;
}

export interface SighupCredentials {
  username: string;
  password: string;
  passwordConfirmation: string;
}

interface SignupResponse {
  username: string;

}

interface SignedinResponse {
  authenticated: boolean;
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  rootUrl = 'https://api.angular-email.com';
  signedin$ = new BehaviorSubject<boolean | null>(null);
  username = ''; 


  constructor(private http: HttpClient) { }


  usernameAvailable(username: string) {
    return this.http.post<usernameAvailableResponse>
      (this.rootUrl + '/auth/username', {
        username
      });
  }

  signup(credentials: SighupCredentials) {
    return this.http.post<SignupResponse>(this.rootUrl + '/auth/signup',
      credentials)
      .pipe(
        tap(({ username }) => {
          this.signedin$.next(true);
          this.username = username;
        })
      );
  }

  checkAuth() {
    return this.http.get<SignedinResponse>(this.rootUrl + '/auth/signedin')
      .pipe(
        tap(({ authenticated, username }) => {
          this.signedin$.next(authenticated);
          this.username = username;
        })
      );
  }

  signout() {
    return this.http.post(this.rootUrl + '/auth/signout', {})
    .pipe(
      tap(() =>{
        this.signedin$.next(false);
      })
    );
  }

  signin(credentials: SigninCredentials) {
    return this.http.post<SignedinResponse>(this.rootUrl + '/auth/signin', credentials)
    .pipe(
      tap(( { username }) => {
        this.signedin$.next(true);
        this.username = username;
      })
    )

  }
}


