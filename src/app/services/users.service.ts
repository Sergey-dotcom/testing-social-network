import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { User } from 'src/app/models/user.model';

const baseUrl = `${environment.apiRoot}/users`;

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    constructor(private http: HttpClient) { }

    getAll(): Observable<User[]> {
        return this.http.get<User[]>(baseUrl);
    }

    getById(id: string): Observable<User> {
        return this.http.get(`${baseUrl}/${id}`);
    }

    create(data: any): Observable<any> {
        return this.http.post(baseUrl, data);
    }

    update(id: string, data: any): Observable<any> {
        return this.http.put(`${baseUrl}/${id}`, data);
    }

    patch(id: string, data: any): Observable<any> {
        return this.http.patch(`${baseUrl}/${id}`, data);
    }

    delete(id: string): Observable<any> {
        return this.http.delete(`${baseUrl}/${id}`);
    }

    findByName(name: string): Observable<User[]> {
        return this.http.get<User[]>(`${baseUrl}?first_name_like=${name}`);
    }
}