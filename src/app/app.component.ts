import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,FormBuilder,Validators, FormArray } from '@angular/forms';
import { UsernameValidator, PasswordconfirmValidator } from './RegistrationForm.validations'
import { EnrollmentServiceService } from './enrollment-service.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit  {
  title = 'reactive-forms';
  registrationForm: FormGroup;
  isSubmit = false;
  constructor(private fb: FormBuilder,private _enroll: EnrollmentServiceService){}
  ngOnInit(){
    this.registrationForm = this.fb.group({
      userName: ['tony rong', [Validators.required, Validators.minLength(3), UsernameValidator(/tonyrong/)]],
      email:[''],
      alternateEmails: this.fb.array([]),
      subscribe:[false],
      password: [''],
      confirmPassword: [''],
      address: this.fb.group({
        city: [''],
        state: [''],
        postCode: ['']
      })
    },{validator:PasswordconfirmValidator});

    this.registrationForm.get("subscribe").valueChanges.subscribe(
      value =>{
        const  email = this.registrationForm.get("email");
        if(value){
          email.setValidators(Validators.required);
        }else{
          email.clearValidators();
        }
        email.updateValueAndValidity();
      }
    );
  }
  get userName(){
    return this.registrationForm.get("userName");
  }
  get email(){
    return this.registrationForm.get("email");
  }
  get alternativeEmails(){
    return this.registrationForm.get("alternateEmails") as FormArray;
  }

  addEmail(){
    this.alternativeEmails.push(this.fb.control(''));
  }
  // registrationForm = new FormGroup({
  //   userName: new FormControl(''),
  //   password: new FormControl(''),
  //   confirmPassword: new FormControl(''),
  //   address: new FormGroup({
  //     city: new FormControl(''),
  //     state: new FormControl(''),
  //     postCode: new FormControl('')
  //   })
  // });

  loadData(){
    // this.registrationForm.setValue({
 this.registrationForm.patchValue({
      userName: "tony.tiger.rong",
      password: "1234",
      confirmPassword: "1234",
      address: {
        city: "bedford",
        state: "NS",
        postCode: "B3B4T0"
      }
    });
  }

  onSubmit(userForm){
    console.log("userForm:",userForm);
    this._enroll.enrollment(userForm.value).subscribe(
      data=>{
        this.isSubmit = true;
        console.log("Success:",data.message);
      },
      err=>{
        console.log("Error:",err.status);
      }
    );
  }
}
