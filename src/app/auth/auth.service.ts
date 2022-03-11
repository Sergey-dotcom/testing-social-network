import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, first} from 'rxjs/operators';
import { UsersService } from 'src/app/services/users.service';

import { environment } from 'src/environments/environment';

import { User } from 'src/app/models/user.model';

const baseUrl = `${environment.apiRoot}/users`;

const defaultRouteForRole = {
    user: 'users',
    admin: 'admin',
};

@Injectable({ providedIn: 'root' })
export class AuthService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    constructor(
        private router: Router,
        private http: HttpClient,
        private usersService: UsersService,

    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')!));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    isAuthenticated(): boolean {
        return !!this.userValue;
    }

    redirectToDefault(): void {
        if(!this.isAuthenticated()) {
            return;
        }

        const { role } = this.userValue;

        if (role && defaultRouteForRole[role]) {
            this.router.navigate([defaultRouteForRole[role]]);
        }
    }

    login(login: string, password: string): Observable<User> {
        // TODO: rewrite as soon as possible
        return this.http.get<User[]>(`${baseUrl}?login=${login}&password=${password}`)
        .pipe(
            map((data: User[]) => {
                    if(data.length) {
                        const [user] = data;
                        if(user.id) {
                            this.usersService.patch(user.id, { status: 'online' }).pipe(first()).subscribe();
                        }
                        
                        localStorage.setItem('user', JSON.stringify(user));
                        this.userSubject.next(user);
                        return user;
                    } else {
                        return data[0];
                    }
            }));
    }

    logout() {
        const user = this.userValue;
        if(user.id) {
            this.usersService.patch(user.id, { status: 'offline' }).pipe(first()).subscribe();
        }
        localStorage.removeItem('user');
        this.userSubject.next({});
        this.router.navigate(['login']);
    }
}
