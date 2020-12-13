import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/Operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {


  constructor(private authService: AuthService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    return this.authService.user$.pipe(
      take(1),
      map(user => !!user), // <-- map to boolean
      tap(loggedIn => {
        if (!loggedIn) {
          console.log('access denied')
          this.router.navigate(['/Login']);
        }
      })
    )
  }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {


    return this.authService.user$.pipe(
      take(1),
      map(user => !!user), // <-- map to boolean
      tap(loggedIn => {
        if (!loggedIn) {
          console.log('access denied')
          this.router.navigate(['/Login']);
        }
      })
    )
  }


}
