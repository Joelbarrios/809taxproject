import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { URL_BACKEND } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private url = URL_BACKEND+'/api/form'; 

  constructor(private http:HttpClient,
    private router:Router) { }

    getTotalRegister(): Observable<number> {
      return this.http.get<number>(`${this.url}/totalRegister`);
    }

    getTotalRegistros(): Observable<number> {
      return this.http.get<number>(`${this.url}/totalRegistros`);
    }

    //english
    getTotalRegisterArchived():Observable<any>{
      return this.http.get<number>(`${this.url}/contador-uno`);
    }

    getTotalRegisterNotArchived():Observable<any>{
      return this.http.get<number>(`${this.url}/contador-cero`);
    }


    // espanol
    getTotalRegistrosArchivados():Observable<any>{
      return this.http.get<number>(`${this.url}/contador-uno-espanol`);
    }

    getTotalRegistrosNoArchivados():Observable<any>{
      return this.http.get<number>(`${this.url}/contador-cero-espanol`);
    }

    
}
