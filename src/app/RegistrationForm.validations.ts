import { AbstractControl, ValidatorFn } from '@angular/forms';

export function UsernameValidator1(control: AbstractControl): {[key : string]: any} | null {
    const forbidden = /admin/.test(control.value);
    return forbidden? {'forbiddenName': {value: control.value}} : null;
}

export function UsernameValidator(forbiddenName: RegExp): ValidatorFn {
   return (control: AbstractControl): {[key : string]: any} | null =>{
        const forbidden = forbiddenName.test(control.value);
        return forbidden? {'forbiddenName': {value: control.value}} : null;
    }
}

export function PasswordconfirmValidator(control: AbstractControl): {[key:string]: boolean} | null {
    const pass1 = control.get("password");
    const pass2 = control.get("confirmPassword");
    if(pass1.pristine || pass2.pristine){
        return null;
    }
    return pass1 && pass2 && pass1.value !== pass2.value ? {"notMatch": true} : null;
}