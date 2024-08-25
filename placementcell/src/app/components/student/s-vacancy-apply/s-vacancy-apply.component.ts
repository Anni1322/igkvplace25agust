import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CServiceService } from '../../company/service/c-service.service';
import { AuthService } from 'src/app/services/auth.service';
import { StudentService } from 'src/app/services/student.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-s-vacancy-apply',
  templateUrl: './s-vacancy-apply.component.html',
  styleUrls: ['./s-vacancy-apply.component.scss']
})
export class SVacancyApplyComponent implements OnInit {
  vacancyApplydata!:FormGroup;
  selectedFile: File | null = null;


  Student_ID :any;
  vid:any; usereid:any;

  // dataget through vacancy id 
  vacancydata:any;
  studentdetails:any;

  constructor(
    private fb: FormBuilder, 
    private http: HttpClient,
    private auth: AuthService,
    private companyds:CServiceService,
    private route: ActivatedRoute,
    private studentds: StudentService,
    private router: Router,
    ) {

 
    }
 
  ngOnInit() {
    this.vacancyApplydata = this.fb.group({
      Company_ID: ['', Validators.required],
      Company_Name: [''],
      Student_ID: [''],
      Vacancy_ID: [''],
      Flag: ['N'],
      Application_Submission_Date: [''],
      Full_Name: [''],
      Fathers_Name: [''],
      Job_Title: [''],
      Mobile: [''],
      Email: [''],
      Status: ['pending']
    });



// for id pass 
this.route.params.subscribe(params => {
  this.vid = params['id'];
  
  // is send 
  this.getvacancydata(this.vid)
  // Call your function with the vacancyId
  // this.getvacancydata("vid"+this.vid);
});


// get data from local storage
const userString = localStorage.getItem('currentUser');
if (userString !== null) {
  // Proceed only if userString is not null
  this.usereid = JSON.parse(userString); 
  console.log('student details:', this.usereid);
  // this.getstudentdetails(this.usereid.eid);
  this.vacancyApplydata.patchValue({
    Full_Name: this.usereid.fullname 
 });

}

      // get data form student table
       // get data from already store 
       this.studentds.getBasicDetails(this.usereid.eid).subscribe(
        (response) => {
          this.studentdetails = response;
          console.log('studentdetails details:', this.studentdetails);
          
          this.vacancyApplydata.patchValue({
             Student_ID: this.studentdetails.UE_ID,
             Email: this.studentdetails.Email_Id,
             Mobile: this.studentdetails.Mobile_No ,
             Fathers_Name: this.studentdetails.Father_Name_E ,
             Full_Name: this.studentdetails.Student_First_Name_E + ' ' + this.studentdetails.Student_Middle_Name_E + ' ' + this.studentdetails.Student_Last_Name_E
          });
  
        },
        (error) => {
          console.log('Error: ', error);
        }
      );
  }
    


  







// this for unique student get
// getstudentdetails(eid:any){
//   console.log('eid :', eid)
//   this.studentds.getstudentdetails(eid).subscribe(
//     (response) => {
//       // console.log('Raw Response:', response);
//       this.studentdetails = response;
//       console.log('student details:', this.studentdetails);

//       if (this.vacancydata) {
//         console.log('UE_ID:', this.studentdetails.UE_ID);
//         // console.log('username:', this.profiledata.username);
//       } else {
//         console.log('No eid  data received.');
//       }
//     },
//     (error) => {
//       console.log('Error:', error);
//     }
//   );
//   }



  // this for find vacancy id 
  getvacancydata(vid:any) {
    console.log('Vacancyis:', vid);
    this.companyds.getVacancyedata(vid).subscribe(
      (response) => {
        // console.log('Raw Response:', response);
        this.vacancydata = response;
        console.log('Vacancy Details:', this.vacancydata);
  

        
      // patch 
      this.vacancyApplydata.patchValue({ Company_ID: this.vacancydata.Company_Id });
      this.vacancyApplydata.patchValue({ Company_Name: this.vacancydata.Company_Name });
      this.vacancyApplydata.patchValue({ Vacancy_ID: this.vacancydata.Vacancy_ID });
      this.vacancyApplydata.patchValue({ Job_Title: this.vacancydata.Job_Title });
      // end patch

        if (this.vacancydata) {
          console.log('Vacancy_ID:', this.vacancydata.Vacancy_ID);
          // console.log('username:', this.profiledata.username);
        } else {
          console.log('No Vacancy_ID data received.');
        }
      },
      (error) => {
        console.log('Error:', error);
      }
    );
  }





  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile)
  }

  

  onSubmit() {
    if (this.vacancyApplydata.valid) {
      const formData = new FormData();
      console.log(this.vacancyApplydata.value)
      formData.append('Company_ID', this.vacancyApplydata.get('Company_ID')?.value);
      formData.append('Company_Name', this.vacancyApplydata.get('Company_Name')?.value);
      formData.append('Student_ID', this.vacancyApplydata.get('Student_ID')?.value);
      formData.append('Vacancy_ID', this.vacancyApplydata.get('Vacancy_ID')?.value);
      formData.append('Flag', this.vacancyApplydata.get('Flag')?.value);
      if (this.selectedFile) {
        formData.append('file', this.selectedFile, this.selectedFile.name);
      }
      formData.append('Application_Submission_Date', this.vacancyApplydata.get('Application_Submission_Date')?.value);
      formData.append('Full_Name', this.vacancyApplydata.get('Full_Name')?.value);
      formData.append('Fathers_Name', this.vacancyApplydata.get('Fathers_Name')?.value);
      formData.append('Post_Name', this.vacancyApplydata.get('Job_Title')?.value);
      formData.append('Mobile', this.vacancyApplydata.get('Mobile')?.value);
      formData.append('Email', this.vacancyApplydata.get('Email')?.value);
      formData.append('Status', this.vacancyApplydata.get('Status')?.value);
     

      console.log("this is data ",formData)


      this.http.post('http://localhost:3000/student/VacancyApply', formData)
      .subscribe(
        response => {
          Swal.fire('Form submitted successfully!')
          console.log('Form submitted successfully!', response);
          this.vacancyApplydata.reset(); //reset the page after successfully submitted  
          this.selectedFile = null;
          this.router.navigate(['/student/s-status']); //redirect the page after successfully submitted
        },
        error => {
          // Swal.fire("Allready In this Vacancy Applied")
          Swal.fire({
            icon: "error",
            title: "You are Already Applied Please Check My Application",
            // text: "Something went wrong!",
            // footer: '<a href="#">Why do I have this issue?</a>'
          });
          console.error('Error submitting form', error);
        }
      );

}

}

}



 