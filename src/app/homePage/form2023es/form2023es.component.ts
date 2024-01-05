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
    { id: 'pin_de_Proteccion_de_Identidad', label: 'pin de Proteccion de Identidad protection pin' },
    { id: 'paneles_Solares', label: 'paneles_Solares' },
    { id: 'desempleo', label: 'desempleo' },
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
      nombre_del_esposo:['',[Validators.required,Validators.minLength(4)]],
      telefono:['',[Validators.required]],
      telefono2:['',[Validators.required]],
      mail:['',[Validators.required, Validators.email]],
      mail2:['',[Validators.required, Validators.email]],
      direccion:['',[Validators.required]],
      estado_civil_tributario:['',[Validators.required]],
      pregunta2:['',[Validators.required]],
      pregunta3:['',[Validators.required]],
      extraInfo_pregunta3:[''],
      descripcion:['',[Validators.required]],

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
      pregunta13:['',[Validators.required]],
      ruta_bancaria:['',[Validators.required]],
      cuenta_bancaria:['',[Validators.required]],
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

        Swal.fire("Thanks for sending de form",'success');

        this.formSpanish.reset();
      //  this.router.navigateByUrl('/dashboard');
      },(err)=>{
      
        this.errores=err.error.errors as string[];
        console.error(err.error.errors);
      });

  }else{
    //this.formSpanish.markAllAsTouched();
    console.log('error')

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



validarNumeroFijo(): ValidatorFn {
return (control: AbstractControl): ValidationErrors | null => {
  const value = control.value;

  console.log('Valor del campo:', value);

  // Verificar si el valor tiene exactamente 10 dígitos
  if (value && /^\d{10}$/.test(value)) {
    console.log('Validación pasa');
    return null; // La validación pasa
  } else {
    console.log('Validación falla');
    return { numeroInvalido: true }; // La validación falla
  }
};
}

validarNumeroUnico9() {
return (control: AbstractControl): ValidationErrors | null => {
  const value = control.value;

  // Verificar si el valor tiene exactamente 9 dígitos
  if (value && /^\d{9}$/.test(value)) {
    // Verificar si todos los dígitos son únicos
    const digitosUnicos = new Set(value.toString().split(''));
    if (digitosUnicos.size === 9) {
      return null; // La validación pasa
    } else {
      control.setErrors({ numeroNoUnico: true }); // Asignar error al control
      return { numeroNoUnico: true }; // La validación falla
    }
  } else {
    control.setErrors({ numeroInvalido: true }); // Asignar error al control
    return { numeroInvalido: true }; // La validación falla
  }
};
}


nextSection() {
if (this.currentSection < 3) {
  this.currentSection++;
}
}

prevSection() {
if (this.currentSection > 1) {
  this.currentSection--;
}
}


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


}
