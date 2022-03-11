import { Injectable } from '@angular/core';
import {
    Router,
    CanActivate,
    ActivatedRouteSnapshot
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        const expectedRoles: string[] = route.data['expectedRoles'];
        const isAvailableForRole = this.isAvailableForRoles(expectedRoles);

        if(!isAvailableForRole) {
            this.router.navigate(['login']);
        }

        return isAvailableForRole;
    }

    isAvailableForRoles(expectedRoles: string[]) {
        if (this.authService.isAuthenticated()) {
            const { role } = this.authService.userValue;

            if (role && expectedRoles.includes(role)) {
                return true;
            }
        }

        return false;
    }
}
