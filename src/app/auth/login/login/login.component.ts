import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  error: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    if (this.authService.login(this.username, this.password)) {
      // Redirige al usuario al dashboard
      this.router.navigate(['/admin/dashboard']);
    } else {
      Swal.fire("Error al logearse");
    }
  }

  
  

  // Método de ejemplo para hashear con SHA-256 (puedes usar una librería de hashing)
  private sha256(input: string): string {
    // Implementa tu lógica de hashing aquí
    return input;
  }

}
