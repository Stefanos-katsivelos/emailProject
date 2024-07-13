import { CanMatchFn, CanActivateFn, Route, Router, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, mapToCanMatch } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import {take, skipWhile, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard {
  constructor(
    private authService: AuthService,
    private router: Router  
    ) {}

  canMatch(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean | null> | Promise<boolean> | boolean {
    return this.authService.signedin$.pipe(
      skipWhile(value => value === null),
      take(1),
      tap((authenticated) =>{
        if (!authenticated) {
          this.router.navigateByUrl('/');
        }
      })
    );
  }
}
