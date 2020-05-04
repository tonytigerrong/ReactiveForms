import { Component } from '@angular/core';
import { FormGroup, FormControl,FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'reactive-forms';
  constructor(private fb: FormBuilder){}
  registrationForm = this.fb.group({
    userName: ['Vishwas'],
    password: [''],
    confirmPassword: [''],
    address: this.fb.group({
      city: [''],
      state: [''],
      postCode: ['']
    })
  });
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
