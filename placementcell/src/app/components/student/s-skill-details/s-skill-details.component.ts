import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StudentService } from 'src/app/services/student.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-s-skill-details',
  templateUrl: './s-skill-details.component.html',
  styleUrls: ['./s-skill-details.component.scss']
})
export class SSkillDetailsComponent implements OnInit {

  user: any = {};
  skilldetailsform: any;


  selectedFile: File | null = null;
  SkillFile?: File;
  SkillCertificate?: File;




  constructor(private fb: FormBuilder,
    private StudentService: StudentService,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.skilldetailsform = this.fb.group({
      Student_ID: ['', Validators.required],
      Registration_No: ['', [Validators.required, Validators.maxLength(6)] ],
      Skill_Id: ['', [Validators.required, Validators.minLength(3)] ],
      Skill_Certificate_Url: ['']
      //Created_Date: [null],

    });

    const userData = localStorage.getItem('currentUser');
    console.log("profiledata" + userData)

    // Check if user data exists
    if (userData) {
      // Parse user data from JSON and assign it to the user variable
      this.user = JSON.parse(userData);
      this.skilldetailsform.patchValue({
        Student_ID: this.user.eid
      })
      console.log("idddd" + this.user.eid)
      // id pass 
      // this.getdata(this.user.eid);
    }

  }

  //form submission 
  getvalueFromform(value: any) {
    const formValue = this.skilldetailsform.value;
    console.log('Form Data:', formValue);

    this.StudentService.postaddskill(formValue).subscribe(
      () => {
        alert('Form submitted successfully!');
        this.skilldetailsform.reset(); // Reset the form after successful submission
        this.router.navigate(['/student/s-profile/id:']); // redirect the page after successfully submitted
      },
      (error) => {
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
    if (this.skilldetailsform.valid) {
      this.getvalueFromform(this.skilldetailsform.value);
    } else {
      console.log('Form is not valid');
    }
  }

  nopath() {
    Swal.fire("please select a file", "", "warning")
  }

  //for select file 
  selectCertificate(event: any) {
    if (event.target.files.length > 0) {
      const file1 = event.target.files[0]; //it is used to get the input file dom property
      this.SkillFile = file1
    }
  }
  //for upload certificate 
  uploadCertificate() {
    if (!this.SkillFile) {
      return this.nopath();
    }
    const CertificateformData = new FormData();
    CertificateformData.append('Skill_Certificate_Url', this.SkillFile); // Make sure the key matches what the server expects
    console.log('skill data url',this.SkillFile); 

    this.StudentService.UploadCertificate(CertificateformData).subscribe((event: any) => {
    if (event.type === HttpEventType.Response) {
      const fileUrl = event.body.Skill_Certificate_Url;
      console.log(fileUrl);
      console.log("url path name ",fileUrl);

      this.skilldetailsform.patchValue({
        Skill_Certificate_Url: fileUrl
      })
    }
  });
  }


}


//file can not show the upload folder
//