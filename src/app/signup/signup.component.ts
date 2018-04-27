import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable }  from 'rxjs/Observable';
// import { Validator } from '@angular/forms/src/directives/validators';
// import { Validators } from '@angular/forms/src/validators';
import { ReactiveFormsModule, FormGroup, FormBuilder, FormControl, Validators , FormsModule ,FormGroupDirective} from '@angular/forms';
import { AuthServiceService } from '../service/auth-service.service';
import { User } from './user';
import {ErrorStateMatcher} from '@angular/material/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  hide = true;
  userList: User[] = [];

  userForm: FormGroup;

  // user: Observable<firebase.User>;
  // inputUsername: string;
  // inputPassword: string;
  // inputName: string;
  // inputLastname: string;
  // inputEmail: string;
  // inputGender: string;
  // inputTel: string;



  email = new FormControl('', [Validators.required, Validators.email]);
  inputPassword = new FormControl('',[
  Validators.minLength(6),
  Validators.maxLength(25)])
  getErrorMessage() {
    return this.email.hasError('required') ? 'กรุณากรอกอีเมล์ของท่าน' :
        this.email.hasError('email') ? 'กรุณากรอกอีเมล์ให้ถูกต้อง' :
        this.inputPassword.hasError('minLength') ? 'รหัสผ่านไม่ควรน้อยกว่า 6 ตัวอักษร' :
        this.inputPassword.hasError('maxLength') ? 'รหัสผ่านไม่ควรเกิน 25 ตัวอักษร':
            '';
  }

  constructor(private fireaseAuth: AngularFireAuth ,private fb: FormBuilder , private auth: AuthServiceService) {
    
   }

  ngOnInit() {
    this.buildForm();
 
  }

  buildForm(): void {
    this.userForm = new FormGroup({
    inputEmail: new FormControl('', [
    Validators.required,
    Validators.email
    ]),
    inputPassword: new FormControl('', [
    Validators.minLength(6),
    Validators.maxLength(25)
    ]),
    inputName : new FormControl(''),
    inputLastname : new FormControl(''),
    inputGender : new FormControl (''),
    inputTel : new FormControl(''),
    inputUsername : new FormControl('')
    });
 }

 signup(form): void {
  this.auth.emailSignUp(this.userForm.value.inputEmail, this.userForm.value.inputPassword)
  }

  // signup() {
  //   const authC = this;
  //   this.fireaseAuth.auth
  //   .createUserWithEmailAndPassword(this.inputEmail,this.inputPassword)
  //   .then(value => {
  //     console.log("success!!!!",value);
  //     authC.userData.uid = value.uid;
  //     authC.userData.userName = value.inputUsername;
  //     authC.userData.password = value.inputPassword;
  //     authC.userData.email = value.inputEmail;
  //     authC.userData.name = value.inputName;
  //     authC.userData.lastname = value.inputLastname;
  //     authC.userData.gender = value.inputGender;
  //     authC.userData.telnumber = value.inputTel;

  //     value.updateProfile({
  //       userName: this.inputUsername,
  //     }).then(()=> {
  //       console.log('Update username success!!');
  //       authC.userData.userName = value.userName;

  //     }, err2 => {
  //       console.log('Update display name failed:',err2.messege);
  //       console.log(err2);
  //     });
  //   })
  //   .catch(err => {
  //     console.log('Something went wrong:', err);
  //     console.log(err);
  //   });
  // }

     // Updates validation state on form changes.
     onValueChanged(data?: any) {
      if (!this.userForm) { return; }
      const form = this.userForm;
      for (const field in this.formErrors) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            this.formErrors[field] += messages[key] + ' ';
          }
        }
      }
    }
   formErrors = {
      'inputEmail': '',
      'inputPassword': ''
    };
    validationMessages = {
      'inputEmail': {
        'required':      'Email is required.',
        'email':         'Email must be a valid email'
      },
      'inputPassword': {
        'required':      'Password is required.',
        'pattern':       'Password must be include at one letter and one number.',
        'minlength':     'Password must be at least 4 characters long.',
        'maxlength':     'Password cannot be more than 40 characters long.',
      }
    };
  

}
