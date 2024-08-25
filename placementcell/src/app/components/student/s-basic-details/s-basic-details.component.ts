import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-s-basic-details',
  templateUrl: './s-basic-details.component.html',
  styleUrls: ['./s-basic-details.component.scss']
})
export class SBasicDetailsComponent implements OnInit  {
  user: any = {}; // Initialize user object here
  formData: any = {}; // Initialize formData object here

  constructor(private ds: StudentService, private router: Router) {}

  ngOnInit(): void {
    // Retrieve user data from localStorage
    const userData = localStorage.getItem('currentUser');
    // Check if user data exists
    if (userData) {
        // Parse user data from JSON and assign it to the user variable
        this.user = JSON.parse(userData);
        // Initialize formData object after user data is retrieved
        this.formData = {
          user_id: this.user.eid || '', // Assign user id if available, otherwise empty string
          username: this.user.username || '', // Assign user id if available, otherwise empty string
          RegistrationType: this.user.RegistrationType || '' 
          // user_id: this.user.eid || '' 
          // user_id: this.user.eid || '' 
          // user_id: this.user.eid || '' 
          // user_id: this.user.eid || '' 
        };
        console.log(this.formData.user_id); // Log user_id here
    }
  }

  getvalueFromform(formValue: any) {
    console.log(formValue);
    // Your method logic here
    const formData = formValue; // Get form value
    console.log('Form Data:', formData);
    this.ds.postStudentDetails(formData).subscribe(() => {
      alert('Form submitted successfully!');
      this.router.navigate(['/student/s-profile/id:']);//redirect the page after successffully submitted 
      // form.reset(); // Reset the form after successful submission
    }, (error) => {
      console.error('Error submitting form:', error);
    });
  }
}
