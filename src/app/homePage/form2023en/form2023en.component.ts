import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators, FormControl} from '@angular/forms';
import Swal from 'sweetalert2';
import { Form2023enService } from './form2023enService';
import {Router, ActivatedRoute} from '@angular/router';
import { formatDate } from '@angular/common' 

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
    { id: 'identity_protection_pin', label: 'Identity protection_pin' },
    { id: 'solar_panels', label: 'Solar Panels' },
    { id: 'unemployment', label: 'Unemployment' },
    { id: 'daycare_dependent_care', label: 'Daycare/dependent care' }
  ];

  // Variable para almacenar los IDs seleccionados
  idsSeleccionados: string[] = [];
  
  

  ngOnInit(){

    
    
    this.formEnglish= this.fb.group({
      createAt:[null],
      section1: this.fb.group({
        name:['',[Validators.required,Validators.minLength(3)]],
        spouse_name:['',[Validators.required,Validators.minLength(4)]],
        phone:['',[Validators.required]],
        phone2:['',[Validators.required]],
        mail:['',[Validators.required, Validators.email]],
        mail2:['',[Validators.required, Validators.email]],
        address:['',[Validators.required]],
        filing_status:['',[Validators.required]],
        question2:['',[Validators.required]],
        question3:['',[Validators.required]],
        extraData_question3:[''],
        description:['',[Validators.required]],

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
        question13:['',[Validators.required]],
        bank_routing:['',[Validators.required]],
        bank_account:['',[Validators.required]],
        terms:[false, [Validators.requiredTrue]]
      })
    });
  
    
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

// isValidField(field:string):boolean | null{
//   return this.formEnglish.get[field].errors
//   && this.formEnglish.get[field].touched;
// }

// getFieldError(field:string):string | null {

//   if(!this.formEnglish.get[field]) return null;

//   const error= this.formEnglish.get[field].hasError || {};

//   for (const key of Object.keys(error)){

//     switch(key){
//       case 'required':
//         return ' this camp is required';

//         case 'minlength':
//           return `At least ${error['minlength'].requiredLength} characters.`
//     }

//   }

//   return null;

// }


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


    if(this.formEnglish.valid && this.currentSection===3){

      this.formSummited=true;
      this.envioEnProgreso = true;
        

     // this.router.navigateByUrl('/dashboard')
     console.log(datosCompletos);
        this.formService.createForm(datosCompletos)
        .subscribe(resp=>{
  
          Swal.fire({
            title: "Form summitted successfully",
            text: "Thanks for sending the form `Mr/Mrs. ${datosSeccion1.name}`",
            icon: "success"
          });
          this.formEnglish.reset();
        //  this.router.navigateByUrl('/dashboard');
        },(err)=>{
        
          return;
        });

    }else{
      //this.formEnglish.markAllAsTouched();
      console.log('error')

    }

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

  if(this.formEnglish.get(campo)?.invalid && this.formSummited ){
    return true
  }else{
    return false;
  }
  
}

aceptaTerminos(){
  return !this.formEnglish.get('terms')?.value && this.formSummited;
}


}
