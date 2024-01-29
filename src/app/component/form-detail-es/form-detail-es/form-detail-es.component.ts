import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Form2023esComponent } from 'src/app/homePage/form2023es/form2023es.component';
import { Form2023esService } from 'src/app/homePage/form2023es/form2023es.service';
import Swal from 'sweetalert2';
import { URL_BACKEND } from 'src/app/config/config';

@Component({
  selector: 'app-form-detail-es',
  templateUrl: './form-detail-es.component.html',
  styleUrls: ['./form-detail-es.component.scss']
})
export class FormDetailEsComponent {

  public form: any = [];
  url:string=URL_BACKEND+'/api/form-es';
  public nota: string = '';
  public objetoClonado:any=[];

  constructor(private route: ActivatedRoute, private router: Router,
    private formService:Form2023esService) {}

    ngOnInit(): void {
      this.route.params.subscribe(params => {
        const id = +params['id'];
        const url = `${this.url}/${id}`;
        console.log('URL de la solicitud:', url);
    
        this.formService.obtenerObjetoPorId(id).subscribe(
          (objeto) => {
            this.form = objeto;
            this.objetoClonado={ ...this.form };

            
          },
          (error) => {
            console.error('Error al obtener los detalles del objeto', error);
          }
        );
      });
    }
  
  
    guardarNota(): void {
      if (this.nota.trim() !== '') {
        // Obtiene la fecha actual en formato "AAAA-MM-DD HH-MM-SS"
        const fechaActual = new Date().toISOString().replace('T', ' ').split('.')[0];

        this.form.nota = this.nota;
        this.objetoClonado.nota = this.objetoClonado.nota +"\n"+" on" +" " + fechaActual +" " +this.form.nota;
        this.formService.updateForm(this.objetoClonado).subscribe(
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
      this.router.navigate(['admin/component/table-es']);
    }

    
     
    }
  




    
