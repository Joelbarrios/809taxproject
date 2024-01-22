import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators, FormControl, AbstractControl} from '@angular/forms';
import Swal from 'sweetalert2';
import { Form2023enService } from './form2023enService';
import {Router, ActivatedRoute} from '@angular/router';
import { formatDate } from '@angular/common' ;
import {ValidationErrors, ValidatorFn } from '@angular/forms';


@Component({
  selector: 'app-form2023en',
  templateUrl: './form2023en.component.html',
  styleUrls: ['./form2023en.component.scss']
})
export class Form2023enComponent {

  public formSummited=false;
  currentSection: number  = 1;
  formData: any = {};
  envioEnProgreso:boolean=false;
  activated:boolean=false;
  public formEnglish: FormGroup;
  submissionDate: string='';
  public createAt!:Date;
  opciones = [
    { id: 'identity_protection_pin', label: 'Identity Protection Pin' },
    { id: 'solar_panels', label: 'Solar Panels' },
    { id: 'unemployment', label: 'Unemployment' },
    { id: 'daycare_dependent_care', label: 'Daycare/dependent care' }
  ];
  private errores:string[];


  // Variable para almacenar los IDs seleccionados
  idsSeleccionados: string[] = [];
  
  

  ngOnInit(){

    this.getAllForms();
    
    this.formEnglish= this.fb.group({
      createAt:[null],
      section1: this.fb.group({
        name:['',[Validators.required,Validators.minLength(3)]],
        spouse_name:['',[Validators.minLength(4)]],
        phone:['',[Validators.required, , Validators.minLength(10), Validators.maxLength(11)]],
        phone2:['',[Validators.minLength(10), Validators.maxLength(11)]],
        mail:['',[Validators.required, Validators.email]],
        mail2:['',[ Validators.email]],
        address:['',[Validators.required]],
        filing_status:['',[Validators.required]],
        question2:['',[Validators.required]],
        question3:['',[Validators.required]],
        extraData_question3:[''],
        description:[''],

      }),
      section2:this.fb.group({
        question4:['',[Validators.required]],
        question5:['',[Validators.required]],
        extraData_question5:[''],
        question6:['',[Validators.required]],
        question7:['',[Validators.required]],
        question8:['',[Validators.required]],
        question9:['',[Validators.required]],
        question10:['',[Validators.required]],
        question11:['',[Validators.required]],
        question12:['',[Validators.required]],
      }),
      section3:this.fb.group({
        opciones: this.inicializarOpciones(),
        question13:[''],
        bank_routing:[''],
        bank_account:[''],
        terms:[false, [Validators.requiredTrue]]
      })
    });
  
    // , this.validarNumeroFijo()
    // , this.validarNumeroUnico9()

  }

  constructor(private fb:FormBuilder,private formService:Form2023enService
    , private router:Router){

  }

  private inicializarOpciones() {
    const formControls = {};
    this.opciones.forEach(opcion => {
      formControls[opcion.id] = new FormControl(false);
    });
    return this.fb.group(formControls);
  }


 //CreateFormEnglish
 createFormEn(){

  const opcionesSeleccionadas = this.opciones.filter(opcion =>
    this.formEnglish.get('section3.opciones').get(opcion.id).value === true
  );
   // Obtener solo los valores de 'id'
 // Obtener solo los valores de 'id'
 this.idsSeleccionados = opcionesSeleccionadas.map(opcion => opcion.id);
  // Asignar cada ID a una variable independiente
  const [identity_protection_pin, solar_panels,
    unemployment, daycare_dependent_care] = this.idsSeleccionados;
  console.log('Opciones seleccionadas:', identity_protection_pin,solar_panels,unemployment,daycare_dependent_care);

  const datosSeccion1 = this.formEnglish.get('section1').value;
  const datosSeccion2 = this.formEnglish.get('section2').value;
  const datosSeccion3 = this.formEnglish.get('section3').value;

  const createAt = new Date();
  this.formEnglish.patchValue({
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


    if(!this.formEnglish.invalid && this.currentSection===3){

      this.formSummited=true;
      this.envioEnProgreso = true;
        

     // this.router.navigateByUrl('/dashboard')
     console.log(datosCompletos);
        this.formService.createForm(datosCompletos)
        .subscribe(resp=>{
  
          Swal.fire("Thanks for sending the form",'success');

          this.formEnglish.reset();
        this.router.navigateByUrl('/');
        },(err)=>{
        
          this.errores=err.error.errors as string[];
          console.error(err.error.errors);
        });

    }else{
      //this.formEnglish.markAllAsTouched();
      if(this.currentSection === 3 && this.formEnglish.invalid)
      this.Erroralert();
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




//  nextSection() {
//   if (this.currentSection < 3) {
//     this.currentSection++;
//   }

// }

prevSection() {
  if (this.currentSection > 1) {
    this.currentSection--;
  }
}


campoNoValido(campo:string):boolean{

  if(this.formEnglish.get(campo)?.invalid && this.formSummited ){
    return true
  }else{
    return false;
  }
  
}

aceptaTerminos(){
  return !this.formEnglish.get('terms')?.value && this.formSummited;
}

showInvalidFormAlert() {
  Swal.fire({
    icon: 'error',
    title: 'Error',
    text: 'Please complete the form correctly',
    confirmButtonText: 'Ok'
  });
}


 Erroralert(){
  Swal.fire({
    icon: "error",
    title: "Error",
    text: "Please, complete the form correctly",

  });
 }

 get currentSectionName(): string {
  return `section${this.currentSection}`;
}

get currentSectionValid(): boolean {
  const currentSection = this.formEnglish.get(this.currentSectionName);
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
  this.formEnglish.get(this.currentSectionName).markAllAsTouched();

  // Validar campos requeridos en la sección actual
  const currentSection = this.formEnglish.get(this.currentSectionName);

  if (currentSection.invalid) {
    // Verificar campos individualmente y mostrar alerta si está vacío
    if (currentSection.get('name').hasError('required')) {
      this.showAlert('Name is required');
      return;
    }
    // Puedes agregar más verificaciones para otros campos si es necesario
    if (currentSection.get('phone').hasError('required')) {
      this.showAlert('Phone is required');
      return;
    }
    if (currentSection.get('mail').hasError('required')) {
      this.showAlert('Email is required');
      return;
    }
    if (currentSection.get('address').hasError('required')) {
      this.showAlert('Address is required');
      return;
    }
    if (currentSection.get('filing_status').hasError('required')) {
      this.showAlert('filing_status is required');
      return;
    }
    if (currentSection.get('question2').hasError('required')) {
      this.showAlert('question2 is required');
      return;
    }
    if (currentSection.get('question3').hasError('required')) {
      this.showAlert('question3 is required');
      return;
    }

    if (currentSection.get('question4').hasError('required')) {
      this.showAlert('question4 is required');
      return;
    }
    if (currentSection.get('question4').hasError('required')) {
      this.showAlert('question4 is required');
      return;
    }

    if (currentSection.get('question5').hasError('required')) {
      this.showAlert('question5 is required');
      return;
    }

    if (currentSection.get('question6').hasError('required')) {
      this.showAlert('question6 is required');
      return;
    }

    if (currentSection.get('question7').hasError('required')) {
      this.showAlert('question7 is required');
      return;
    }

    if (currentSection.get('question8').hasError('required')) {
      this.showAlert('question8 is required');
      return;
    }
    if (currentSection.get('question9').hasError('required')) {
      this.showAlert('question9 is required');
      return;
    }
    if (currentSection.get('question10').hasError('required')) {
      this.showAlert('question10 is required');
      return;
    }
    if (currentSection.get('question11').hasError('required')) {
      this.showAlert('question11 is required');
      return;
    }
    if (currentSection.get('question12').hasError('required')) {
      this.showAlert('question12 is required');
      return;
    }
    if (currentSection.get('opciones').hasError('required')) {
      this.showAlert('opciones is required');
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
  const phoneControl = this.formEnglish.get('section1.phone');

  if (phoneControl.invalid && (phoneControl.dirty || phoneControl.touched)) {
    if (phoneControl.hasError('required')) {
      this.showAlert('Phone number is required');
    } else {
      this.showAlert('At least 10 digits are required');
    }
  }
}

validatePhone2Length(): void {
  const phone2Control = this.formEnglish.get('section1.phone2');

  if (phone2Control.value && (phone2Control.value.length !== 10)) {
    this.showAlert('At least 10 digits are required');
  }
}

validateBankRoutingLength(): void {
  const bankRoutingControl = this.formEnglish.get('section3.bank_routing');

  if (bankRoutingControl.value && (bankRoutingControl.value.length !== 9)) {
    this.showAlert('At least 9 digits are required');
  }
}

// nextSection(): void {
//   this.formEnglish.get(this.currentSectionName).markAllAsTouched();

//   if (this.formEnglish.valid) {
//     this.currentSection++;

//     console.log(`Avanzando a la sección ${this.currentSectionName}`);
//   }


// }


}
