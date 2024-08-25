import { Router } from '@angular/router'; // Import Router from '@angular/router'
import { ServiceService } from 'src/app/services/service.service';
import { SignupService } from 'src/app/services/signup.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
//import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  captchaImage!: string;
  captchaValue:any;

  constructor(
    private fb: FormBuilder,
    private ds: ServiceService, 
    private router: Router,
    private signup: SignupService,
    private auth: AuthService,
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rePassword: ['', [Validators.required, Validators.minLength(6)]],
      role: ['1', Validators.required],
      captcha: ['', Validators.required]

    }, { validators: this.passwordMatchValidator });

    this.loadCaptcha();
  }

  // encryptPassword(password: string): string {
  //   const secretKey = 'your-256-bit-secret';
  //   return CryptoJS.AES.encrypt(password, secretKey).toString();
  // }

  loadCaptcha() {
    this.auth.getcaptcha().subscribe(
      (data: any) => {
        this.captchaImage = `data:image/svg+xml;base64,${btoa(data.image)}`;
        // console.log(this.captchaImage);
        // Assuming you want to store captcha value in a variable
        this.captchaValue = data.capvalue;
        // console.log(this.captchaValue); // Log captcha value
      },
      (error) => {
        console.error('Error loading CAPTCHA:', error);
      }
    );
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const rePassword = control.get('rePassword');
    if (password && rePassword && password.value !== rePassword.value) {
      return { 'passwordMismatch': true };
    }
    return null;
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      const formValue = this.signupForm.value;

      // console.log(formValue.captcha);

     // Check if CAPTCHA matches
     if (formValue.captcha !== this.captchaValue) {
      alert('CAPTCHA does not match. Please try again.');
      return;
    }



      // const encryptedPassword = this.encryptPassword(formValue.password);
      // const encryptedRePassword = this.encryptPassword(formValue.rePassword);

      // const encryptedFormValue = {
      //   name:formValue.name,
      //   username:formValue.username,
      //   role:formValue.role,
      //   password: encryptedPassword,
      //   // rePassword: encryptedRePassword
      // };

      this.signup.postsignup(formValue).subscribe(
        () => {
          alert('Form submitted successfully!');
          this.router.navigate(['/login']);
        },
        (error) => {
          alert('Username already exists');
          console.error('Error submitting form:', error);
        }
      );
    }
  }
}



  

  // user: any = {};

  // onSubmit() {
  //   console.log('User submitted:', this.user);
  //   const userData = this.user; 
  //   this.singup.postsignup(userData).subscribe( () => {
  //     alert('Form submitted successfully!');
  //     this.formclear();  
  //     this.router.navigate(['/login']);
  //   }, (error) => {
  //     console.error('Error submitting form:', error);
  //   })
  // }
  
  // formclear(){
  //   this.user.username = "";
  //   this.user.password = "";
  //   this.user.re_password = "";
  // }  







