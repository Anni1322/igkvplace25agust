import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
//import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  captchaImage!: string;
  captchaValue:any;

  constructor(
    private router: Router,
    private auth: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      captcha: ['', Validators.required]
    });
    this.loadCaptcha();
  }

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
  
  // encryptPassword(password: string): string {
  //   const secretKey = 'anil';
  //   return CryptoJS.AES.encrypt(password.trim(), secretKey).toString();
  // }

  onSubmit() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
  
      // Check if CAPTCHA matches
      if (formData.captcha !== this.captchaValue) {
        alert('CAPTCHA does not match. Please try again.');
        return;
      }
  
      this.auth.login(formData).subscribe(
        (response: any) => {
          if (response) {
            const id = response.id;
            const username = response.username;
            const role = response.role;
  
            console.log('Login successful. User ID:', id, 'Username:', username);
  
            if (role === 2) {
              Swal.fire("Welcome on this portal");
              this.router.navigate(['/company/c-dashboard']);
            } else if (role === 3) {
              Swal.fire("Welcome on this portal");
              this.router.navigate(['/admin/a-dashboard']);
            } else {
              Swal.fire("Welcome on this portal");
              this.router.navigate(['/student/s-dashboard']);
            }
          } else {
            alert("Wrong username or password or CAPTCHA.");
            console.log('Login failed. Invalid credentials or CAPTCHA.');
          }
        },
        (error) => {
          console.error('Login error:', error);
          alert("Error logging in. Please try again.");
        }
      );
    } else {
      alert('Please fill in all required fields.');
    }
  }
  
  

}
