import { Component, OnInit, VERSION } from '@angular/core';
import { NgFor, formatDate } from '@angular/common';
import {
  NgbDropdownModule,
  NgbModule,
  NgbCollapseModule,
} from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination'; // At the top of your module
import { NgIf } from '@angular/common';
import { Form2023enService } from 'src/app/homePage/form2023en/form2023enService';
import {Router, ActivatedRoute} from '@angular/router';
import { FormGroup,FormBuilder, Validators, FormControl} from '@angular/forms';
import { NgModel,FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';


const FILTER_PAG_REGEX = /[^0-9]/g;

@Component({
  selector: 'app-table',
  standalone: true,
  imports:[NgFor,NgbDropdownModule,NgbModule,NgbCollapseModule,NgxPaginationModule,NgIf,FormsModule],
  templateUrl: 'table.component.html'
})
export class TableComponent {

  version = VERSION.full;
  
  formData: any = [];
  now:any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [3, 6, 9, 12];
  filteredData: any[] = [];
  registerFalse:any[]=[];

  formatsDateTest: string[] = [
    'dd/MM/yyyy',
    'dd/MM/yyyy hh:mm:ss',
    'dd-MM-yyyy',
    'dd-MM-yyyy HH:mm:ss',
    'MM/dd/yyyy',
    'MM/dd/yyyy hh:mm:ss',
    'yyyy/MM/dd',
    'yyyy/MM/dd HH:mm:ss',
    'dd/MM/yy',
    'dd/MM/yy hh:mm:ss',
    'hh:mm:ss',
    'short',
    'medium',
    'long',
    'full',
    'shortDate',
    'mediumDate',
    'longDate',
    'fullDate',
    'shortTime',
    'mediumTime',
    'longTime',
    'fullTime',
  ];

    // Variable para almacenar el término de búsqueda
    terminoBusqueda: string = '';

    RegistroTransferido = [
      // ... registros completos se agregarán aquí
    ];


  
  
  constructor(private fb:FormBuilder,private formService:Form2023enService
    , private router:Router) {

    this.now= new Date();
  }
  

    // This is for the collapse example
    public isCollapsed = false;
    public isCollapsed2 = false;
  
    collapsed = true;

    //pagination
    page2 = 1;
    currentPage = 1;
    page3 = 4;
  
    //   disabled
    page4 = 3;
    isDisabled = true;

    ngOnInit(){
      this.getAllForms();
  
  }

 // Método para filtrar la lista
 filtrarFormData() {
  return this.formData.filter(data =>
    data.name.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
    data.spouse_name.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
    data.mail.toLowerCase().includes(this.terminoBusqueda.toLowerCase())
  );
}

    getAllForms(): void {
      this.formService.getForms().subscribe(
        (response) => {
          this.formData = response;
          this.formatearFechas();
       
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
    }

    formatearFechas() {
      this.formData.forEach(registro => {
        const createAtValor = registro.createAt;
        const fecha = new Date(createAtValor);
        registro.createAtFormateado = formatDate(fecha, 'dd/MM/yyyy HH:mm:ss', 'en-US');
      });
    }
   
    onTableDataChange(event: any) {
      this.page = event;
      this.getAllForms();
    }
    onTableSizeChange(event: any): void {
      this.tableSize = event.target.value;
      this.page = 1;
      this.getAllForms();
    }

  
    toggleDisabled() {
      this.isDisabled = !this.isDisabled;
    }
  
    //   custom links
    page5 = 4;
  
    getPageSymbol(current: number) {
      return ['A', 'B', 'C', 'D', 'E', 'F', 'G'][current - 1];
    }
  
    selectPage(page: string) {
      this.page5 = parseInt(page, 10) || 1;
    }
  
    formatInput(input: HTMLInputElement) {
      input.value = input.value.replace(FILTER_PAG_REGEX, '');
    }

 // Método para transferir un objeto de una tabla a otra y actualizar el campo transferido
 transferirObjeto(objeto: any) {
  Swal.fire({
    title: '¿Estás seguro?',
    text: '¿Quieres transferir este objeto?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, transferirlo'
  }).then((result) => {
    if (result.isConfirmed) {
      this.realizarTransferencia(objeto);
    }
  });
}

realizarTransferencia(objeto: any) {
  this.formService.transferirYActualizar(objeto.id).subscribe(
    response => {
      if (response && response.mensaje) {
        // Mostrar SweetAlert de mensaje exitoso
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: response.mensaje
        }).then(() => {
          // Recargar la página después de cerrar el alert
          location.reload();
        });
      }
    },
    error => {
      // Manejar el error aquí
      console.error('Error en la transferencia y marcado:', error);
    }
  );
}

realizarTransferenciaOriginal(objeto: any) {
  this.formService.transferirYActualizarOriginal(objeto.id).subscribe(
    response => {
      if (response && response.mensaje) {
        // Mostrar SweetAlert de mensaje exitoso
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: response.mensaje
        }).then(() => {
          // Recargar la página después de cerrar el alert
          location.reload();
        });
      }
    },
    error => {
      // Manejar el error aquí
      console.error('Error en la transferencia y marcado:', error);
    }
  );
}

private actualizarCampoTransferido(objeto: any) {
  // Encuentra el índice del objeto en la tabla original
  const index = this.formData.findIndex(item => item.id === objeto.id);

  // Actualiza el campo transferido
  if (index !== -1) {
    this.formData[index].transferido = true;
  }
}

verDetalle(id: number): void {
  this.router.navigate(['admin/component/form/', id]);
}




}
