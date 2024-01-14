import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_BACKEND } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url:string=URL_BACKEND+'/login';
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});
  private username = 'root';
  private password = 'root123$$$';
  private isAuthenticated = false;
  private readonly storageKey = 'userCredentials';

  constructor(private http: HttpClient) {}

  login(user: string, pass: string): boolean {
    if (user === 'root' && pass === 'root123$$$') {
      // Almacenar credenciales en localStorage
      const credentials = { username: user, password: pass };
      localStorage.setItem(this.storageKey, JSON.stringify(credentials));
      return true;
    } else {
      return false;
    }
  }

  isLoggedIn(): boolean {
    // Verificar si hay credenciales en localStorage
    const storedCredentials = localStorage.getItem(this.storageKey);
    return !!storedCredentials;
  }

  getStoredUsername(): string | null {
    const storedCredentials = localStorage.getItem(this.storageKey);
    return storedCredentials ? JSON.parse(storedCredentials).username : null;
  }

  logout(): void {
    // Eliminar credenciales de localStorage al cerrar sesión
    localStorage.removeItem(this.storageKey);
  }

}
