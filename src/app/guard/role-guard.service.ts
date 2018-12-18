import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authGuard: AuthGuard, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.authGuard.canActivate(route, state).then((auth: boolean) => {
      if(!auth) {
        return Promise.resolve(false);
      }
      //... your role guard check code goes here
    });
  }
}
