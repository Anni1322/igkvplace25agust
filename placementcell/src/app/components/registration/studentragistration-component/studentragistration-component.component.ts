import { Component } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { NgForm } from '@angular/forms'; 

@Component({
  selector: 'app-studentragistration-component',
  templateUrl: './studentragistration-component.component.html',
  styleUrls: ['./studentragistration-component.component.scss']
})
export class StudentragistrationComponentComponent {

  formData: any = {}; // Object to hold form data

  constructor(private ds: StudentService){}

  // Method to handle form submission
  getvalueFromform(formData: any) {
    const formDatas = formData; // Get form value

    console.log('Form Data:', formData);
    this.ds.postStudentDetails(formDatas).subscribe(() => {
      alert('Form submitted successfully!');
      // form.reset(); // Reset the form after successful submission
    }, (error) => {
      console.error('Error submitting form:', error);
    });
}


}