import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,FormBuilder,Validators } from '@angular/forms';
import { UsernameValidator, PasswordconfirmValidator } from './RegistrationForm.validations'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit  {
  title = 'reactive-forms';
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder){}
  ngOnInit(){
    this.registrationForm = this.fb.group({
      userName: ['tony rong', [Validators.required, Validators.minLength(3), UsernameValidator(/tonyrong/)]],
      email:[''],
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
    this.registrationForm.setValue({
//  this.registrationForm.patchValue({
      userName: "tony rong",
      password: "1234",
      confirmPassword: "1234",
      address: {
        city: "bedford",
        state: "NS",
        postCode: "B3B4T0"
      }
    });
  }
}
