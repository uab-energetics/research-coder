import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {UserService} from "./user.service";
import {Observable} from "rxjs/Observable";
import {AuthService} from "./auth.service";

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.userService.isLoggedIn()) return true;

    this.authService.redirectURL = state.url;
    this.authService.sessionExpired = true;

    this.router.navigate(['/auth/login']);
    return false;
  }
}
