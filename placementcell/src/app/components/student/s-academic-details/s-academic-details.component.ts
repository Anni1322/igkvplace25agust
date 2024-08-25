import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-s-academic-details',
  templateUrl: './s-academic-details.component.html',
  styleUrls: ['./s-academic-details.component.scss']
})
export class SAcademicDetailsComponent implements OnInit {
  academicDetailsForm!: FormGroup;
  admissionyear: any;
  user: any;
  college: any;
  DegreeType: any;
  DegreeProgram: any;
  Subject: any;
  AdmissionSession: any;
  PassingYear: any;
  marksheet: any;
  Stuedentservice: any;
  Marksheet1!: File;

  constructor(private fb: FormBuilder, private studentds: StudentService, private router: Router) { }

  ngOnInit(): void {
    this.academicDetailsForm = this.fb.group({
      Registration_No: ['', [Validators.required, Validators.maxLength(6)] ],
      Student_Enroll_Id: ['', Validators.required],
      Student_ID: ['', Validators.required],
      Degree_Programme_Type_Id: ['', Validators.required],
      Degree_Programme_Id: ['', Validators.required],
      College_Name: ['', Validators.required],
      Subject_Id: ['', Validators.required],
      OGPA: ['', Validators.required],
      Admission_Year_Id: ['', Validators.required],
      Passingout_Year_Id: ['', Validators.required],
      Marksheet_Url: ['']
    //  Created_Date: ['']
    });

    const userData = localStorage.getItem('currentUser');
    console.log("profiledata" + userData)

    // Check if user data exists
    if (userData) {
      // Parse user data from JSON and assign it to the user variable
      this.user = JSON.parse(userData);
      this.academicDetailsForm.patchValue({
        Student_ID: this.user.eid
      })
      console.log("id" + this.user.eid)


    }




    // //for college name
    this.studentds.getcollege().subscribe(
      (response) => {
        //console.log('Raw response: ', response);
        this.college = response;
        console.log('college details:', this.college);
      },
      (error) => {
        console.log('Error: ', error);
      }
    );

    //for degree type 
    this.studentds.getDegree_type().subscribe(
      (response) => {
        this.DegreeType = response;
        console.log('Degree type details: ', this.DegreeType);
      },
      (error) => {
        console.log('Error: ', error);
      }
    );

    //for degree program id 
    this.studentds.getDegreeProgram().subscribe(
      (response) => {
        this.DegreeProgram = response;
        console.log('Degree program details: ', this.DegreeProgram);
      },
      (error) => {
        console.log('Error: ', error);
      }
    );

    //for subject id 
    this.studentds.getSubject().subscribe(
      (response) => {
        this.Subject = response;
        console.log('Subject details: ', this.Subject);
      },
      (error) => {
        console.log('Error: ', error);
      }
    );

    //for admission year id 
    this.studentds.getAdmissionyear().subscribe(
      (response) => {
        this.AdmissionSession = response;
        console.log('Admission year details: ', this.AdmissionSession);
      },
      (error) => {
        console.log('Error: ', error);
      }
    );

    //for passing out year 
    this.studentds.getPassingOutYear().subscribe(
      (response) => {
        this.PassingYear = response;
        console.log('Passing out year details: ', this.PassingYear);
      },
      (error) => {
        console.log('Error: ', error);
      }
    );

  }

  //submit form
  // onSubmit(): void {
  //   console.log(this.academicDetailsForm.value);
  //   const formdata = this.academicDetailsForm.value
  //   this.studentds.postAcademicDetails(formdata).subscribe(() => {
  //     alert('Form submitted successfully!');
  //     // form.reset(); // Reset the form after successful submission
  //   }, (error) => {
  //     console.error('Error submitting form:', error);
  //   }
  //   );

  // }

  onSubmit(): void {
    if (this.academicDetailsForm.valid) {
      console.log('Form Submitted!', this.academicDetailsForm.value);
      // form submission here
      const userData = this.academicDetailsForm.value
      this.studentds.postAcademicDetails(userData).subscribe(
        () => {
          alert('Form submitted successfully!');
          this.academicDetailsForm.reset();
          this.router.navigate(['/student/s-profile/id:']);//redirect the page after successfully submitted 
        },
        (error) => {
          console.error('Error submitting form:', error);
          // Display a more user-friendly message
          // alert('.');
          // Optionally, handle specific error scenarios based on status code
          if (error.status === 500) {
            console.error('Internal Server Error: Please contact support.');
          } else {
            console.error(`Error: ${error.message}`);
          }
        }
      );
    }
  }

  nopath() {
    Swal.fire("please select a file", "", "warning")
  }

  selectMarksheet(event: any) {
    if (event.target.files.length > 0) {
      const file1 = event.target.files[0];            //it is used to get the input file dom property
      this.marksheet = file1
    }
  }

  uploadmarksheet() {
    if (!this.marksheet) {
      return this.nopath();
    }
    const MarksheetformData = new FormData();
    MarksheetformData.append('Marksheet_Url', this.marksheet); // Make sure the key matches what the server expects
    console.log(this.marksheet);

    this.studentds.UploadMarksheet(MarksheetformData).subscribe((result: any) => {
      console.log(result.body.Marksheet_Url); // Correct property name in the response
      this.Marksheet1 = result.body.Marksheet_Url; // Correct property name in the response
      this.academicDetailsForm.patchValue({
        Marksheet_Url: this.Marksheet1,
      });
      Swal.fire("Marksheet uploaded successfully");
    });
  }


}

//student_Enroll_Id and Degree_Programme_Id pass the null value 