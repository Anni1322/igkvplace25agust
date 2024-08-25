import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { CServiceService } from '../../company/service/c-service.service';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-s-vacancy-nextround-apply',
  templateUrl: './s-vacancy-nextround-apply.component.html',
  styleUrls: ['./s-vacancy-nextround-apply.component.scss']
})
export class SVacancyNextroundApplyComponent implements OnInit {
  vacancyApplydata!: FormGroup;
  selectedFile: File | null = null;


  Student_ID: any;
  vid: any; usereid: any;
  rowData: any;

  // dataget through vacancy id 
  vacancydata: any;
  studentdetails: any;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private auth: AuthService,
    private companyds: CServiceService,
    private route: ActivatedRoute,
    private studentds: StudentService,
  ) {


  }

  ngOnInit() {
    this.vacancyApplydata = this.fb.group({
      Company_ID: ['', Validators.required],
      Company_Name: ['', Validators.required],
      Student_ID: ['', Validators.required],
      Vacancy_ID: ['', Validators.required],
      Application_Submission_Date: ['', Validators.required],
      Full_Name: ['', Validators.required],
      Fathers_Name: [''],
      Job_Title: ['', Validators.required],
      Mobile: ['', Validators.required],
      Email: ['', Validators.required],
      Status: ['pending']
    });




    // get data from next roud form
    // rowdata get 
    this.studentds.getRowData().subscribe(data => {
      this.rowData = data;
      console.log("Row data in AnotherComponent:", this.rowData);

      // get sid from row for search unique
      console.log("ths is application id", data.Student_ID);
      this.vacancyApplydata.patchValue({ Student_Application_ID: data.Student_Application_ID })
      this.vacancyApplydata.patchValue({ Company_ID: data.Company_ID })
      this.vacancyApplydata.patchValue({ Company_Name: data.Company_Name })
      this.vacancyApplydata.patchValue({ Student_ID: data.Student_ID })
      this.vacancyApplydata.patchValue({ Vacancy_ID: data.Vacancy_ID })
      this.vacancyApplydata.patchValue({ Flag: data.Flag })
      this.vacancyApplydata.patchValue({ Application_Submission_Date: data.Application_Submission_Date })
      this.vacancyApplydata.patchValue({ Full_Name: data.Full_Name })
      this.vacancyApplydata.patchValue({ Fathers_Name: data.Fathers_Name })
      this.vacancyApplydata.patchValue({ Job_Title: data.Post_Name })
      this.vacancyApplydata.patchValue({ Mobile: data.Mobile })
      this.vacancyApplydata.patchValue({ Email: data.Email })
      this.vacancyApplydata.patchValue({ Status: data.Status })
      // You can handle the data here if needed
    });
    // get data from next round form


  }


  onSubmit() {
    if (this.vacancyApplydata.valid) {
      console.log("this data come from next roud form ", this.vacancyApplydata.value);

      this.studentds.PostNextRoutdDetails(this.vacancyApplydata.value).subscribe(
        (data) => {
          console.log("sucessfull", data);
          Swal.fire("Successfully Applied ")
        },
        (error) => {
          Swal.fire("Already")
          console.log(error)
        }
      );


    }
  }
  //redirect the page 

}

//job title field can not patch the value 