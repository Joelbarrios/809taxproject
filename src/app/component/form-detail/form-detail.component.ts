import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Form2023enService } from 'src/app/homePage/form2023en/form2023enService';
import Swal from 'sweetalert2';
import { URL_BACKEND } from 'src/app/config/config';

@Component({
  selector: 'app-form-detail',
  templateUrl: './form-detail.component.html',
  styleUrls: ['./form-detail.component.scss']
})
export class FormDetailComponent {

 public form: any = [];
 url:string=URL_BACKEND+'/api/form';
 public nota: string = '';

  constructor(private route: ActivatedRoute, private router: Router,
    private formService:Form2023enService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      const url = `${this.url}/${id}`;
      console.log('URL de la solicitud:', url);
  
      this.formService.obtenerObjetoPorId(id).subscribe(
        (objeto) => {
          this.form = objeto;
        },
        (error) => {
          console.error('Error al obtener los detalles del objeto', error);
        }
      );
    });
  }


  guardarNota(): void {
    if (this.nota.trim() !== '') {
      this.form.nota = this.nota;
      this.formService.updateForm(this.form).subscribe(
        () => {
          // Mostrar SweetAlert de éxito
          Swal.fire({
            icon: 'success',
            title: 'Nota guardada',
            showConfirmButton: false,
            timer: 1500,
          });

          console.log('Nota guardada correctamente');
            // Programar la recarga de la página después de 3 segundos
            setTimeout(() => {
              window.location.reload();
            }, 1500);
        },
        (error) => {
          console.error('Error al guardar la nota', error);
          // Puedes manejar el error según tus necesidades
        }
      );
    }
  }

  regresar(): void {
    // Puedes agregar lógica adicional antes de regresar al componente principal
    this.router.navigate(['admin/component/table']);
  }
  

}
