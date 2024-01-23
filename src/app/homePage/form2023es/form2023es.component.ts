import { Component } from '@angular/core';
import { FormGroup,FormBuilder, Validators, FormControl, AbstractControl} from '@angular/forms';
import Swal from 'sweetalert2';
import { Form2023esService } from './form2023es.service';
import {Router, ActivatedRoute} from '@angular/router';
import { formatDate } from '@angular/common' ;
import {ValidationErrors, ValidatorFn } from '@angular/forms';


@Component({
  selector: 'app-form2023es',
  templateUrl: './form2023es.component.html',
  styleUrls: ['./form2023es.component.scss']
})
export class Form2023esComponent {
  public formSummited=false;
  currentSection: number  = 1;
  formData: any = {};
  envioEnProgreso:boolean=false;
  activated:boolean=false;
  public formSpanish: FormGroup;
  submissionDate: string='';
  public createAt!:Date;
  opciones = [
    { id: 'pin_de_Proteccion_de_Identidad', label: 'PIN de Protección de Identidad' },
    { id: 'paneles_Solares', label: 'Paneles Solares' },
    { id: 'desempleo', label: 'Desempleo' },
    { id: 'guarderia_cuidado_de_dependiente', label: 'Daycare/dependent care' }
  ];
  private errores:string[];
// Variable para almacenar los IDs seleccionados
idsSeleccionados: string[] = [];
  
  

ngOnInit(){

  this.getAllForms();
  
  this.formSpanish= this.fb.group({
    createAt:[null],
    section1: this.fb.group({
      nombre:['',[Validators.required,Validators.minLength(3)]],
      nombre_del_esposo:['',[Validators.minLength(4)]],
      telefono:['',[Validators.required, Validators.minLength(10), Validators.maxLength(11)]],
      telefono2:['',[Validators.minLength(10), Validators.maxLength(11)]],
      mail:['',[Validators.required, Validators.email]],
      mail2:['',[Validators.email]],
      direccion:['',[Validators.required]],
      estado_civil_tributario:['',[Validators.required]],
      pregunta2:['',[Validators.required]],
      pregunta3:['',[Validators.required]],
      extraInfo_pregunta3:[''],
      descripcion:[''],

    }),
    section2:this.fb.group({
      pregunta4:['',[Validators.required]],
      pregunta5:['',[Validators.required]],
      extraInfo_pregunta5:[''],
      pregunta6:['',[Validators.required]],
      pregunta7:['',[Validators.required]],
      pregunta8:['',[Validators.required]],
      pregunta9:['',[Validators.required]],
      pregunta10:['',[Validators.required]],
      pregunta11:['',[Validators.required]],
      pregunta12:['',[Validators.required]],
    }),
    section3:this.fb.group({
      opciones: this.inicializarOpciones(),
      pregunta13:[''],
      ruta_bancaria:[''],
      cuenta_bancaria:[''],
      terminos:[false, [Validators.requiredTrue]]
    })
  });

  // , this.validarNumeroFijo()
  // , this.validarNumeroUnico9()
}

constructor(private fb:FormBuilder,private formService:Form2023esService
  , private router:Router){

}

private inicializarOpciones() {
  const formControls = {};
  this.opciones.forEach(opcion => {
    formControls[opcion.id] = new FormControl(false);
  });
  return this.fb.group(formControls);
}



//CreateformSpanish
createFormEn(){

const opcionesSeleccionadas = this.opciones.filter(opcion =>
  this.formSpanish.get('section3.opciones').get(opcion.id).value === true
);
 // Obtener solo los valores de 'id'
// Obtener solo los valores de 'id'
this.idsSeleccionados = opcionesSeleccionadas.map(opcion => opcion.id);
// Asignar cada ID a una variable independiente
const [identity_protection_pin, solar_panels,
  unemployment, daycare_dependent_care] = this.idsSeleccionados;
console.log('Opciones seleccionadas:', identity_protection_pin,solar_panels,unemployment,daycare_dependent_care);

const datosSeccion1 = this.formSpanish.get('section1').value;
const datosSeccion2 = this.formSpanish.get('section2').value;
const datosSeccion3 = this.formSpanish.get('section3').value;

const createAt = new Date();
this.formSpanish.patchValue({
  createAt: createAt  // Reemplaza 'fecha' con el nombre de tu campo de fecha
});


  const datosCompletos = {
    identity_protection_pin,
    solar_panels,
    unemployment,
    daycare_dependent_care,
    createAt,
    ...datosSeccion1,
    ...datosSeccion2,
    ...datosSeccion3,
  

  };


  if(!this.formSpanish.invalid && this.currentSection===3){

    this.formSummited=true;
    this.envioEnProgreso = true;

   // this.router.navigateByUrl('/dashboard')
   console.log(datosCompletos);
      this.formService.createForm(datosCompletos)
      .subscribe(resp=>{

        Swal.fire("Gracias por enviar el formulario",'success');

        this.formSpanish.reset();
        this.router.navigateByUrl('/');
      },(err)=>{
      
        this.errores=err.error.errors as string[];
        console.error(err.error.errors);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error. `${this.errores}`",
      
        });
      });

  }else{
    //this.formSpanish.markAllAsTouched();
     //this.formEnglish.markAllAsTouched();
     if(this.currentSection === 3 && this.formSpanish.invalid)
     this.Erroralert();


  }

}

getAllForms(){

this.formData = this.formService.getForms()
.subscribe((resp)=>{
  this.formData = resp;
  console.log(this.formData);
},error=>{
  console.log('error')
})

}



// nextSection() {
// if (this.currentSection < 3) {
//   this.currentSection++;
// }
// }

prevSection() {
if (this.currentSection > 1) {
  this.currentSection--;
}
}


// Erroralert(){
//   Swal.fire({
//     icon: "error",
//     title: "Error",
//     text: "Por favor, complete el formulario completamente",

//   });
//  }



campoNoValido(campo:string):boolean{

if(this.formSpanish.get(campo)?.invalid && this.formSummited ){
  return true
}else{
  return false;
}

}

aceptaTerminos(){
return !this.formSpanish.get('terms')?.value && this.formSummited;
}

showInvalidFormAlert() {
  Swal.fire({
    icon: 'error',
    title: 'Error',
    text: 'Por favor, completa el formulario correctamente.',
    confirmButtonText: 'Ok'
  });
}

Erroralert(){
  Swal.fire({
    icon: "error",
    title: "Error",
    text: "Por favor, completa el formulario correctamente",

  });
 }

 get currentSectionName(): string {
  return `section${this.currentSection}`;
}

get currentSectionValid(): boolean {
  const currentSection = this.formSpanish.get(this.currentSectionName);
  return currentSection.valid && (currentSection.dirty || currentSection.touched);
}

showAlert(message: string): void {
  Swal.fire({
    icon: 'warning',
    title: 'Advertencia',
    text: message,
  });
}

// nextSection(): void {
//   this.formEnglish.get(this.currentSectionName).markAllAsTouched();

//     this.currentSection++;

//     console.log(`Avanzando a la sección ${this.currentSectionName}`);
  
// }

nextSection(): void {
  this.formSpanish.get(this.currentSectionName).markAllAsTouched();

  // Validar campos requeridos en la sección actual
  const currentSection = this.formSpanish.get(this.currentSectionName);

  if (currentSection.invalid) {
    // Verificar campos individualmente y mostrar alerta si está vacío
    if (currentSection.get('nombre').hasError('required')) {
      this.showAlert('El nombre es requerido');
      return;
    }
    // Puedes agregar más verificaciones para otros campos si es necesario
    if (currentSection.get('telefono').hasError('required')) {
      this.showAlert('El telefono es requerido');
      return;
    }
    if (currentSection.get('mail').hasError('required')) {
      this.showAlert('El mail es requerido');
      return;
    }
    if (currentSection.get('direccion').hasError('required')) {
      this.showAlert('La direccion es requerida');
      return;
    }
    if (currentSection.get('estado_civil_tributario').hasError('required')) {
      this.showAlert('Estado civil tributario es requerido');
      return;
    }
    if (currentSection.get('pregunta2').hasError('required')) {
      this.showAlert('La pregunta2 es requerida');
      return;
    }
    if (currentSection.get('pregunta3').hasError('required')) {
      this.showAlert('La pregunta3 es requerida');
      return;
    }

    if (currentSection.get('pregunta4').hasError('required')) {
      this.showAlert('La pregunta4 es requerida');
      return;
    }
    if (currentSection.get('pregunta5').hasError('required')) {
      this.showAlert('La pregunta5 es requerida');
      return;
    }

    if (currentSection.get('pregunta6').hasError('required')) {
      this.showAlert('La pregunta6 es requerida');
      return;
    }

    if (currentSection.get('pregunta7').hasError('required')) {
      this.showAlert('La pregunta7 es requerida');
      return;
    }

    if (currentSection.get('pregunta8').hasError('required')) {
      this.showAlert('La pregunta8 es requerida');
      return;
    }

    if (currentSection.get('pregunta9').hasError('required')) {
      this.showAlert('La pregunta9 es requerida');
      return;
    }
    if (currentSection.get('pregunta10').hasError('required')) {
      this.showAlert('La pregunta10 es requerida');
      return;
    }
    if (currentSection.get('pregunta11').hasError('required')) {
      this.showAlert('La pregunta11 es requerida');
      return;
    }
    if (currentSection.get('pregunta12').hasError('required')) {
      this.showAlert('pregunta12 es requerida');
      return;
    }

    if (currentSection.get('opciones').hasError('required')) {
      this.showAlert('opciones es requerida');
      return;
    }


    // Si no hay alerta específica, mostrar un mensaje genérico
    this.showAlert('Please complete all the fields');
    return;
  }

  // Resto de la lógica para avanzar a la siguiente sección
  this.currentSection++;

  console.log(`Avanzando a la sección ${this.currentSectionName}`);
}

validatePhoneLength(): void {
  const phoneControl = this.formSpanish.get('section1.telefono');

  if (phoneControl.invalid && (phoneControl.dirty || phoneControl.touched)) {
    if (phoneControl.hasError('required')) {
      this.showAlert('El telefono es requerido');
    } 
    else {
      this.showAlert('Se requiere de al menos 10 digitos');
    }
  }
}

validatePhone2Length(): void {
  const phone2Control = this.formSpanish.get('section1.telefono2');

  if (phone2Control.value && (phone2Control.value.length !== 10)) {
    this.showAlert('Se requiere de al menos 10 digitos');
  }
}

validateBankRoutingLength(): void {
  const bankRoutingControl = this.formSpanish.get('section3.ruta_bancaria');

  if (bankRoutingControl.value && (bankRoutingControl.value.length !== 9)) {
    this.showAlert('Se requiere de al menos 9 digitos');
  }
}

}
