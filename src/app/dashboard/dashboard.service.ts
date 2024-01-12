import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private url = 'http://localhost:8080/api/form'; 

  constructor(private http:HttpClient,
    private router:Router) { }

    getTotalRegister(): Observable<number> {
      return this.http.get<number>(`${this.url}/totalRegister`);
    }

    getTotalRegistros(): Observable<number> {
      return this.http.get<number>(`${this.url}/totalRegistros`);
    }

    
}
