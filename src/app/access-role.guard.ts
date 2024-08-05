import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from './services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AccessRoleGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    const allowedRoles = route.data['roles'] as Array<string>;
    const userRole = this.userService.getRole();
    if (allowedRoles.includes(userRole)) {
      return true;
    } else {
      this.router.navigate(['/error/401']);
      return false;
    }
  }
}
