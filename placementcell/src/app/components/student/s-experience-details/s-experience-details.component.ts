import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-s-experience-details',
  templateUrl: './s-experience-details.component.html',
  styleUrls: ['./s-experience-details.component.scss']
})
export class SExperienceDetailsComponent implements OnInit {
  user: any = {};
  experiencedetailsform: any;
  marksheet: any;

  constructor(private fb: FormBuilder, private Stuedentservice: StudentService, private studentds: StudentService, private router: Router) { }
  ngOnInit(): void {
    this.experiencedetailsform = this.fb.group({
      Student_ID: ['', Validators.required],
      Registration_No: ['', Validators.required],
      Organization_Name: ['', Validators.required],
      Post_Name: ['', Validators.required],
      WorkPlace_Address: ['', Validators.required],
      WorkPlace_District_Id: ['', Validators.required],
      WorkPlace_State_Id: ['', Validators.required],
      WorkPlace_Country_Id: ['', Validators.required],
      City_Name: ['', Validators.required],
      Description: ['', Validators.required],
      Period_From: ['', Validators.required],
      Period_To: ['', Validators.required],
      Is_Currently_working_YN: ['', Validators.required],
      Salary: ['', Validators.required]
     // Created_Date: [null]

    });

    //for master table 
    const userData = localStorage.getItem('currentUser');
    console.log("profiledata" + userData)

    // Check if user data exists
    if (userData) {
      // Parse user data from JSON and assign it to the user variable
      this.user = JSON.parse(userData);
      this.experiencedetailsform.patchValue({
        Student_ID: this.user.eid
      })
      console.log("idddd" + this.user.eid)
      // id pass 
      // this.getdata(this.user.eid);
    }


  }

  validateInput(event: KeyboardEvent): void {
    const inputChar = String.fromCharCode(event.charCode);
    if (!/^[a-zA-Z ]*$/.test(inputChar)) {
      event.preventDefault();
    }
  }

  getvalueFromform(value: any) {
    const formValue = this.experiencedetailsform.value;
    console.log('Form Data:', formValue);

    this.Stuedentservice.postAddExperience(formValue).subscribe(
      () => {
        alert('Form submitted successfully!');
        this.experiencedetailsform.reset(); // Reset the form after successful submission
        this.router.navigate(['/student/s-profile/id:']); // Navigate to the previous page
      },
      (error: { status: number; message: any; }) => {
        console.error('Error submitting form:', error);
        alert('An error occurred while submitting the form. Please try again later.');
        if (error.status === 500) {
          console.error('Internal Server Error: Please contact support.');
        } else {
          console.error(`Error: ${error.message}`);
        }
      }
    );
  }

  onSubmit() {
    if (this.experiencedetailsform.valid) {
      this.getvalueFromform(this.experiencedetailsform.value);
    } else {
      console.log('Form is not valid');
    }
  }
  //experience details form submission exeperince 
  // getvalueFromform(value: any) {
  //   const formValue = this.experiencedetailsform.value;
  //   console.log('Form Data:', formValue);

  //   this.Stuedentservice.postAddExperience(formValue).subscribe(
  //     () => {
  //       alert('Form submitted successfully!');
  //       this.experiencedetailsform.reset(); // Reset the form after successful submission
  //     },
  //     (error: { status: number; message: any; }) => {
  //       console.error('Error submitting form:', error);
  //       alert('An error occurred while submitting the form. Please try again later.');
  //       if (error.status === 500) {
  //         console.error('Internal Server Error: Please contact support.');
  //       } else {
  //         console.error(`Error: ${error.message}`);
  //       }
  //     }
  //   );
  // }


  // onSubmit() {
  //   if (this.experiencedetailsform.valid) {
  //     this.getvalueFromform(this.experiencedetailsform.value);
  //   } else {
  //     console.log('Form is not valid');
  //   }
  // }


}

//pending work- after submitting the form page can redirect to the s-profile page
//navigation not working the experience page 

//state Id, District Id, Country Id can bind the data with the api's