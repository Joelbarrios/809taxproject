import { Component } from '@angular/core';
import { FormGroup,FormBuilder, Validators} from '@angular/forms';
import Swal from 'sweetalert2'
import { Form2023enService } from './form2023enService';
import {Router, ActivatedRoute} from '@angular/router'

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




   formEnglish: FormGroup= this.fb.group({
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
      Identity_Protection_PIN:[''],
      Solar_panels:[''],
      Unemployment:[''],
      Daycare_dependent_care:[''],
      question13:['',[Validators.required]],
      bank_routing:['',[Validators.required]],
      bank_account:['',[Validators.required]],
      terms:[false,[Validators.required]]
    }),
  });



  constructor(private fb:FormBuilder,private formService:Form2023enService
    , private router:Router){

  }



 //CreateFormEnglish
 createFormEn(){

  const datosSeccion1 = this.formEnglish.get('section1').value;
  const datosSeccion2 = this.formEnglish.get('section2').value;
  const datosSeccion3 = this.formEnglish.get('section3').value;


    const datosCompletos = {
      ...datosSeccion1,
      ...datosSeccion2,
      ...datosSeccion3
    };
    console.log(datosSeccion3);

    //corregir lógica
  if(this.formEnglish.invalid && this.currentSection==3 ){
    this.formSummited=false;
//     Swal.fire({
//   icon: "error",
//   title: "Oops...",
//   text: "Please, you should accept the terms",
//   footer: '<a href="#">Why do I have this issue?</a>'
// });

  }else{

    if(this.currentSection===3){

      this.formSummited=true;
      this.envioEnProgreso = true;
    // this.router.navigateByUrl('/dashboard')
      this.formService.createForm(datosCompletos)
      .subscribe(resp=>{
        //this.router.navigateByUrl('/dashboard');
      },(err)=>{
      //  Swal.fire('Error',err.error.msg,'error')
      console.log('tranqui');
      });

    }else{
      console.log('tranqui');
    }
  

 

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
