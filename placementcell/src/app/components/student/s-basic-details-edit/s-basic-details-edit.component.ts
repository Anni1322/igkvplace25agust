import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-s-basic-details-edit',
  templateUrl: './s-basic-details-edit.component.html',
  styleUrls: ['./s-basic-details-edit.component.scss']
})
export class SBasicDetailsEditComponent implements OnInit {
  user: any = {}; // Initialize user object here
  formData!: FormGroup; // Initialize formData object here

  constructor(private ds: StudentService,private fb: FormBuilder, private router: Router) {}









  ngOnInit(): void {

    this.basicdata = this.fb.group({
      gender: [''],
      
    });

    // Retrieve user data from localStorage
    const userData = localStorage.getItem('currentUser');
    // Check if user data exists
    if (userData) {
        // Parse user data from JSON and assign it to the user variable
        this.user = JSON.parse(userData);

        console.log("oninit id: "+this.user.eid);





        // Initialize formData object after user data is retrieved
        // this.formData = {
        //   // user_id: this.user.eid || '', // Assign user id if available, otherwise empty string
        //   // RegistrationType: this.user.RegistrationType || '' 
        //   // user_id: this.user.eid || '' 
        //   // user_id: this.user.eid || '' 
        //   // user_id: this.user.eid || '' 
        //   // user_id: this.user.eid || '' 
        // };
        // console.log("oninit id: "+this.formData.user_id); // Log user_id here
        // this.getBasicDetails(this.formData.user_id);
    }

    this.getGender()
  }

  getvalueBasicDetails(formValue: any) {
    console.log(formValue);
    // Your method logic here
    const formData = formValue; // Get form value
    console.log('Form Data:', formData);
    this.ds.postBasicDetails(formData).subscribe(() => {
      alert('Form Update successfully!');
      this.router.navigate(['/student/s-profile/id:']); //redirect the page after successfully submitted
      // form.reset(); // Reset the form after successful submission
    }, (error) => {
      console.error('Error submitting form:', error);
    });
  }



  // dataget through vacancy id 
basicdata:any;
gender:any;
 
getBasicDetails(eid:any) {
  console.log('basicdata:', eid);
  this.ds.getBasicDetails(eid).subscribe(
    (response) => {
      // console.log('Raw Response:', response);
      this.basicdata = response;
      console.log('basic detials:', this.basicdata);

      if (this.basicdata) {
        console.log('eid:', this.basicdata.UE_ID);
       
      } else {
        console.log('No eid data received.');
      }
    },
    (error) => {
      console.log('Error:', error);
    }
  );
}


getGender(){
 this.ds.getGender().subscribe(
  (response) => {
    // console.log('Raw Response:', response);
    this.gender = response;

    console.log('gender detials:', this.gender);
  },
  (error) => {
    console.log('Error:', error);
  }
  );
}




}
