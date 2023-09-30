import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/common/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AccountTypeGuard implements CanActivate {
  constructor(
    private authSvc: AuthenticationService
  ) { }

  canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    try {
      const userAccountType = this.authSvc.getAccountType();
      const validType = _route.data.permissions.only;
      if (validType.includes('ALL') || validType.includes(userAccountType)) {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  async canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | Observable<boolean>> {
    return this.canActivate(route, state);
  }
}
