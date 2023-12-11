import { Component } from '@angular/core';
import { FormGroup,FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-form2023en',
  templateUrl: './form2023en.component.html',
  styleUrls: ['./form2023en.component.scss']
})
export class Form2023enComponent {

  public formSummited=false;

  public formEnglish= this.fb.group({
    name:[null,[Validators.required,Validators.minLength(3)]],
    spouse_name:['',[Validators.required,Validators.minLength(4)]],
    phone:['',[Validators.required]],
    phone2:['',[Validators.required]],
    mail:['',[Validators.required, Validators.email]],
    mail2:['',[Validators.required, Validators.email]],
    description:['',[Validators.required]],
    address:['',[Validators.required]],
    single:['',[Validators.required]],
    married_filing_joint:['',[Validators.required]],
    head_of_household:['',[Validators.required]],
    married_filing_separate:['',[Validators.required]],
    opcionSeleccionada:['',[Validators.required]],
    option1:['',[Validators.required]],
    option2:['',[Validators.required]],
    option3:['',[Validators.required]],
    option4:['',[Validators.required]],
    option5:['',[Validators.required]],
    option6:['',[Validators.required]],
    option7:['',[Validators.required]],
    option8:['',[Validators.required]],
    option9:['',[Validators.required]],
    option10:['',[Validators.required]],
    option11:['',[Validators.required]],
    option12:['',[Validators.required]],
    option13:['',[Validators.required]],
    option14:['',[Validators.required]],
    option15:['',[Validators.required]],
    option16:['',[Validators.required]],
    option17:['',[Validators.required]],
    option18:['',[Validators.required]],
    option19:['',[Validators.required]],
    option20:['',[Validators.required]],
    option21:['',[Validators.required]],
    option22:['',[Validators.required]],
    option23:['',[Validators.required]],
    option24:['',[Validators.required]],
    option25:[''],
    option26:[''],
    option27:[''],
    option28:[''],
    option29:['',[Validators.required]],
    option30:['',[Validators.required]],
    bankRouting:['',[Validators.required]],
    bankAccount:['',[Validators.required]],
    seccionActual:[''],
    terms:['',[Validators.required]]
    
  });



  constructor(private fb:FormBuilder){

  }

  currentSection: number  = 1;
  formData: any = {};

 name: string = '';
 spouse_name: string = '';
 phone: string = '';
 phone2: string = '';
 mail: string = '';
 mail2:string= '';
 address:string='';
 single: boolean = false;
 married_filing_joint: boolean = false;
 head_of_household: boolean = false;
 married_filing_separate: boolean = false;
 opcionSeleccionada: string = '';
 option1:string='';
 option2:string='';
 option3:string='';
 option4:string='';
 option5:string='';
 option6:string='';
 option7:string='';
 option8:string='';
 option9:string='';
 option10:string='';
 option11:string='';
 option12:string='';
 option13:string='';
 option14:string='';
 option15:string='';
 option16:string='';
 option17:string='';
 option18:string='';
 option19:string='';
 option20:string='';
 option21:string='';
 option22:string='';
 option23:string='';
 option24:string='';
 option25:string='';
 option26:string='';
 option27:string='';
 option28:string='';
 option29:string='';
 option30:string='';
 bankRouting:string='';
 bankAccount:string='';
 description:string='';
 terms:boolean=false;


 //CreateFormEnglish
 createFormEn(){
  this.formSummited=true;
  console.log(this.formEnglish.value);

if(this.formEnglish.valid){
  console.log('posting form');
}else{
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


 enviarFormulario() {
   // Aquí puedes implementar la lógica para enviar el formulario
   console.log('Formulario enviado:', {
     name: this.name,
     spouse_name: this.spouse_name,
     phone: this.phone,
     phone2:this.phone2,
     mail: this.mail,
     mail2:this.mail2,
     single: this.single,
     married_filing_joint: this.married_filing_joint,
     head_of_household:this.head_of_household,
     married_filing_separate:this.married_filing_separate,
     option1:this.option1,
     option2:this.option2,
     option3:this.option3,
     option4:this.option4,
     option5:this.option5,
     option6:this.option6,
     option7:this.option7,
     option8:this.option8,
     option9:this.option9,
     option10:this.option10,
     option11:this.option11,
     option12:this.option12,
     option13:this.option13,
     option14:this.option14,
     option15:this.option15,
     option16:this.option16,
     option17:this.option17,
     option18:this.option18,
     option19:this.option19,
     option20:this.option20,
     option21:this.option21,
     option22:this.option22,
     option23:this.option23,
     option24:this.option24,
     option25:this.option25,
     option26:this.option26,
     option27:this.option27,
     option28:this.option28,
     option29:this.option29,
     option30:this.option30,
     bankRouting:this.bankRouting,
     bankAccount:this.bankAccount,
     opcionSeleccionada: this.opcionSeleccionada,
     description:this.description

   });
 }


}
