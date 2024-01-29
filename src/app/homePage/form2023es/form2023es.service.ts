import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of,throwError } from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import { URL_BACKEND } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class Form2023esService {
  private url:string=URL_BACKEND+'/api/form-es';
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});


  constructor(private http:HttpClient,
    private router:Router) { }

    getForms():Observable<any>{

      return this.http.get<any>(this.url);
    
    }
    
    
    
    createForm(formSpanish:any):Observable<any>{
    
        return this.http.post<any>(this.url,formSpanish,{headers:this.httpHeaders}).pipe(
          catchError(e=>{
            console.error(e.error.mensaje);
    
            if(e.status==400){
              return throwError(e);
            }
    
            Swal.fire("Error al crear el form",e.error.mensaje, 'error');
            return throwError(e);
    
          })
        )
    
      }
    
      
    updateForm(formSpanish:any):Observable<any>{
    
      return this.http.put<any>(`${this.url}/${formSpanish.id}`,formSpanish,{headers:this.httpHeaders}).pipe(
        catchError(e=>{
          console.error(e.error.mensaje);
    
          if(e.status==400){
            return throwError(e);
          }
    
          Swal.fire("Error al actualizar el form",e.error.mensaje, 'error');
          return throwError(e);
    
        })
      )
    
    }
    
    
    
      getForm(id):Observable<any>{
        return this.http.get<any>(`${this.url}/{id}`).pipe(
          catchError(e=>{
    
            console.log(e.error.mensaje)
            //this.router.navigate(['/homepage/form']);
    
            Swal.fire("Error al encontrar el form",e.error.mensaje, 'error');
    
            return throwError(e);
    
          })
        )
      }
    
      delete(id:number):Observable<any>{
        return this.http.delete<any>(`${this.url}${id}`, {headers:this.httpHeaders}).pipe(
          catchError(e=>{
            console.error(e.error.mensaje);
    
            Swal.fire("Error al eliminar el form",e.error.mensaje, 'error');
            return throwError(e);
    
          })
        )
      }
    
      obtenerDatosPaginados(pagina: number, elementosPorPagina: number): Observable<any> {
        const params = new HttpParams()
          .set('page', pagina.toString())
          .set('pageSize', elementosPorPagina.toString());
    
        return this.http.get<any>(this.url, { params });
      }
    
      transferirYActualizar(id: number): Observable<any> {
    
        return this.http.put<any>(`${this.url}/${id}/transferir`,{headers:this.httpHeaders}).pipe(
          catchError(e=>{
            console.error(e.error.mensaje);
      
            if(e.status==400){
              return throwError(e);
            }
      
            Swal.fire("Error al transferir",e.error.mensaje, 'error');
            return throwError(e);
      
          })
        )
    
    }
    
    obtenerObjetoPorId(id: number): Observable<any> {
      const url = `${this.url}/${id}`;
      return this.http.get<any>(url).pipe(
        catchError((error) => {
          console.error('Error en la solicitud al backend', error);
          throw error; // Puedes ajustar el manejo de errores según tus necesidades
        })
      );
    }

    transferirYActualizarOriginal(id: number): Observable<any> {

      return this.http.put<any>(`${this.url}/${id}/transferirOriginal`,{headers:this.httpHeaders}).pipe(
        catchError(e=>{
          console.error(e.error.mensaje);
    
          if(e.status==400){
            return throwError(e);
          }
    
          Swal.fire("Error al transferir",e.error.mensaje, 'error');
          return throwError(e);
    
        })
      )
    
    }

  
}
