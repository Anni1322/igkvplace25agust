import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CServiceService } from '../../company/service/c-service.service';
import { StudentService } from 'src/app/services/student.service';
import Swal from 'sweetalert2';
import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-a-s-application-edit',
  templateUrl: './a-s-application-edit.component.html',
  styleUrls: ['./a-s-application-edit.component.scss']
})
export class ASApplicationEditComponent implements OnInit {
  vacancyApplydata!:FormGroup;
  selectedFile: File | null = null;


  Student_ID :any;
  vid:any; user:any;

  // dataget through vacancy id 
  vacancydata:any;
  studentdetails:any;
  rowData:any;
  constructor(
    private fb: FormBuilder, 
    private http: HttpClient,
    private auth: AuthService,
    private companyds:CServiceService,
    private route: ActivatedRoute,
    private studentds: StudentService,
    private adminService:AdminService,
    private router: Router,
    ) {
      this.vacancyApplydata = this.fb.group({
        Student_Application_ID: [''],
        Vacancy_ID: ['', Validators.required],
        Company_ID: ['', Validators.required],
        Company_Name: ['', Validators.required],
        Student_ID: ['', Validators.required],
        Full_Name: ['', Validators.required],
        Post_Name: ['', Validators.required],
        Fathers_Name: ['', Validators.required],
        Email: ['', Validators.required],
        Mobile: [''],
        Flag: [''],
        Application_Submission_Date: [''],
        Status: ['pending'],
        Resume_Path: [''],
      });


    }
 
  ngOnInit() {
    // this.vacancyApplydata = this.fb.group({
    //   Student_Application_ID: ['', Validators.required],
    //   Company_ID: ['', Validators.required],
    //   Student_ID: [''],
    //   Vacancy_ID: [''],
    //   Flag: ['N'],
    //   Application_Submission_Date: [''],
    //   Full_Name: [''],
    //   Fathers_Name: [''],
    //   Job_Title: [''],
    //   Mobile: [''],
    //   Email: [''],
    //   Status: ['pending']
    // });

// rowdata get 
this.adminService.getRowData().subscribe(data => {
  this.rowData = data;
  console.log("Row data in AnotherComponent:", this.rowData);
  
// get sid from row for search unique
  console.log("ths is application id",data.Student_ID);
  this.vacancyApplydata.patchValue({Student_Application_ID:data.Student_Application_ID})
  this.vacancyApplydata.patchValue({Company_ID:data.Company_ID})
  this.vacancyApplydata.patchValue({Company_Name:data.Company_Name})
  this.vacancyApplydata.patchValue({Student_ID:data.Student_ID})
  this.vacancyApplydata.patchValue({Vacancy_ID:data.Vacancy_ID})
 // this.vacancyApplydata.patchValue({Flag:data.Flag})
  this.vacancyApplydata.patchValue({Application_Submission_Date:data.Application_Submission_Date})
  this.vacancyApplydata.patchValue({Full_Name:data.Full_Name})
  this.vacancyApplydata.patchValue({Fathers_Name:data.Fathers_Name})
  this.vacancyApplydata.patchValue({Post_Name:data.Post_Name})
  this.vacancyApplydata.patchValue({Mobile:data.Mobile})
  this.vacancyApplydata.patchValue({Email:data.Email})
  this.vacancyApplydata.patchValue({Status:data.Status})
  this.vacancyApplydata.patchValue({Resume_Path:data.Resume_Path})
  

  // You can handle the data here if needed
});





}



  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  
  onSubmit() {
    if (this.vacancyApplydata.valid) {
        const formData = new FormData();
        console.log(this.vacancyApplydata.value);
    
        formData.append('Student_Application_ID', this.vacancyApplydata.get('Student_Application_ID')?.value);
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
        formData.append('Post_Name', this.vacancyApplydata.get('Post_Name')?.value);
        formData.append('Mobile', this.vacancyApplydata.get('Mobile')?.value);
        formData.append('Email', this.vacancyApplydata.get('Email')?.value);
        formData.append('Status', this.vacancyApplydata.get('Status')?.value);

        console.log("this is data ", formData);

        this.http.post('http://localhost:3000/admin/update_by_adminVacancyApply', this.vacancyApplydata.value)
        .subscribe(
            response => {
                Swal.fire('Form submitted successfully!');
                console.log('Form submitted successfully!', response);
                this.vacancyApplydata.reset(); //reset the page after successfully submitted
                this.selectedFile = null;
                this.router.navigate(['/admin/a-dashboard']); //redirect the page after successfully submitted 
            },
            error => {
                console.error('Error submitting form', error);
            }
        );
    }
}



}
