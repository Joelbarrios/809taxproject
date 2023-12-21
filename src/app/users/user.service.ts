import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';
import {of} from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
private url:string='http://localhost:8080/api/clientes';


  constructor(private http:HttpClient) { }

  getUsers():Observable<User[]>{
    return this.http.get<User[]>(this.url);
  }
}
