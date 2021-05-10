import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private authService: AuthService,
    private router: Router) { }


  canActivate(): Observable<boolean> {



    return this.authService.UserType$.pipe(
      take(1),
      map(user => !!user), // <-- map to boolean
      tap(loggedIn => {
        if (!loggedIn) {
          this.router.navigate(['/Login']);
        }
      })
    )
  }

  canActivateChild(): Observable<boolean> {


    return this.authService.UserType$.pipe(
      take(1),
      map(user => !!user), // <-- map to boolean
      tap(loggedIn => {
        if (!loggedIn) {
          this.router.navigate(['/Login']);
        }

      })
    )
  }

}
