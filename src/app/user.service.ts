import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserForm } from './interfaces/user-form.interface';
import { User } from './interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Array<User>> {
    return this.httpClient.get<Array<User>>('https://632a089e4c626ff832d01ee0.mockapi.io/api/user');
  }

  save(payload: UserForm): Observable<Response> {
    return this.httpClient.post<Response>('https://632a089e4c626ff832d01ee0.mockapi.io/api/user', payload);
  }
}
