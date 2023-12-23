import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Form2023en } from './form2023en';


@Injectable({
  providedIn: 'root'
})
export class Form2023enService {

  private url:string='http://localhost:8080/api/form';
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})

  constructor(private http:HttpClient) { }

  public form2023En!:Form2023en;

getForm():Observable<Form2023en>{

  return this.http.get<Form2023en>(this.url)
}

  createForm(formEnglish:any):Observable<any>{

    return this.http.post<any>(this.url,formEnglish,{headers:this.httpHeaders})

  }



}
