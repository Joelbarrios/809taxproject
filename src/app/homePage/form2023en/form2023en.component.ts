import { Component } from '@angular/core';
import { FormGroup,FormBuilder, Validators} from '@angular/forms';
import Swal from 'sweetalert2'

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
    address:['',[Validators.required]],
    filing_status:['',[Validators.required]],
    question2:['',[Validators.required]],
    question3:['',[Validators.required]],
    extraData_question3:[''],
    description:['',[Validators.required]],
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
    Identity_Protection_PIN:[''],
    Solar_panels:[''],
    Unemployment:[''],
    Daycare_dependent_care:[''],
    question13:['',[Validators.required]],
    Bank_Routing:[''],
    Bank_Account:[''],
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
 filing_status:string='';
 opcionSeleccionada: string = '';
 question2:string='';
 question3:string='';
 extraData_question3:string='';
 description:string='';
 question4:string='';
 question5:string='';
 extraData_question5:string='';
 question6:string='';
 question7:string='';
 question8:string='';
 question9:string='';
 question10:string='';
 question11:string='';
 question12:string='';
 Identity_Protection_PIN:string='';
 Solar_panels:string='';
 Unemployment:string='';
 Daycare_dependent_care:string='';
 question13:string='';
 bankRouting:string='';
 bankAccount:string='';
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

   console.log('Formulario enviado:', {
     name: this.name,
     spouse_name: this.spouse_name,
     phone: this.phone,
     phone2:this.phone2,
     mail: this.mail,
     mail2:this.mail2,
     description:this.description,
     address:this.address,
     question2:this.question2,
     question3:this.question3,
     extraData_question3:this.extraData_question3,
     question4:this.question4,
     question5:this.question5,
     extraData_question5:this.extraData_question5,
     question6:this.question6,
     question7:this.question7,
     question8:this.question8,
     question9:this.question9,
     question10:this.question10,
     question11:this.question11,
     question12:this.question12,
     Identity_Protection_PIN:this.Identity_Protection_PIN,
     Solar_panels:this.Solar_panels,
     Unemployment:this.Unemployment,
     Daycare_dependent_care:this.Daycare_dependent_care,
     question13:this.question13,
     bankRouting:this.bankRouting,
     bankAccount:this.bankAccount,
     terms:this.terms

   });
 }


}
