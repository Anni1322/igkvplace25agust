import { Component, OnInit } from '@angular/core';
 
import { ActivatedRoute, Router } from '@angular/router';
import { CServiceService } from '../../company/service/c-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-a-c-vacancy-list-action',
  templateUrl: './a-c-vacancy-list-action.component.html',
  styleUrls: ['./a-c-vacancy-list-action.component.scss']
})
export class ACVacancyListActionComponent implements OnInit {
  vacancyForm!: FormGroup;
  vid: any;
  vacancydata: any;

  constructor(
    private fb: FormBuilder,
    private ds: CServiceService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // Initialize form with default values
    this.vacancyForm = this.fb.group({
      Vacancy_ID: ['', Validators.required],
      Company_Id: ['', Validators.required],
      Company_Name: [''],
      Company_Registration_No: [''],
      Job_Title: [''],
      Job_Description: [''],
      Job_Selection: [''],
      Job_Location: [''],
      No_Of_Post: [''],
      Salary: [''],
      Last_Date_for_apply: [''],
      Min_Experience_in_Year: [''],
      Maximum_Age: [''],
      Preferred_Gender: [''],
      Prefered_Language: [''],
      Status: ['Pending']
    });

    // Get the route parameter
    this.route.params.subscribe(params => {
      this.vid = params['id'];
      this.getvacancydata(this.vid);
    });
  }

  // Fetch data through vacancy id and populate the form
  getvacancydata(vid: any) {
    console.log('Vacancy ID:', vid);
    this.ds.getVacancyedata(vid).subscribe(
      (response) => {
        console.log('Profile Data:', response);
        this.vacancydata = response;

        if (this.vacancydata) {
          // Populate the form with the fetched data
          this.vacancyForm.patchValue(this.vacancydata);
        } else {
          console.log('No Vacancy data received.');
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  // Handle form submission
  getvalueFromform(formValue: any) {
    console.log('Form Data:', formValue);

    if (this.vacancyForm.valid) {
      this.ds.updateVacancy(formValue).subscribe(
        () => {
          alert('Update (edit) successful!');
          this.router.navigate(['/admin/a-dashboard']); //redirect the page after successfully updated
        },
        (error) => {
          console.error('Error submitting form:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }




// Method to get the CSS class based on the status value
 getStatusClass() {
  const status = this.vacancyForm.get('Status')?.value;
  switch (status) {
    case 'Approved':
      return 'status-approved';
    case 'Rejected':
      return 'status-rejected';
    case 'Pending':
      return 'status-pending';
    default:
      return '';
  }
}

}



























// implements OnInit {
//   formData: any = {};
//   constructor(
//     private ds:CServiceService,
//     private route: ActivatedRoute
//     ){}
//   formdata:any


//   // vid
//   vid:any
//   ngOnInit(): void {
//     this.route.params.subscribe(params => {
//       this.vid = params['id'];
//       // Call your function with the vacancyId
//       // this.getvacancydata("vid"+this.vid);
//     });
//     this.getvacancydata(this.vid)
//   }




// // dataget through vacancy id 
// vacancydata:any;
 
// getvacancydata(vid:any)  {
//   console.log('Vacancyis:', vid);
//   this.ds.getVacancyedata(vid).subscribe(
//     (response) => {
//       // console.log('Raw Response:', response);
//       this.vacancydata = response;
//       console.log('Profile Data:', this.vacancydata);

//       if (this.vacancydata) {
//         console.log('Vacancy_ID:', this.vacancydata.Vacancy_ID);
//         // console.log('username:', this.profiledata.username);
//       } else {
//         console.log('No Vacancy_ID data received.');
//       }
//     },
//     (error) => {
//       console.log('Error:', error);
//     }
//   );
// }


//   getvalueFromform(formValue: any) {
//     console.log(formValue);
//     // Your method logic here
//     const formData = formValue; // Get form value
//     console.log('Form Data:', formData);

//     this.ds.updateVacancy(formData).subscribe(()=>{
//       alert('Update(edit) successfully!');
//     },(error) => {
//       console.error('Error submitting form:', error);
//     })
//   };

  
 

  
//   onSubmit(form: any): void {
//     this.formdata = form.value;
//     // alert("Form Data: " + JSON.stringify(this.formdata, null, 2));
//     console.log('Form Data: ', this.formdata);
//     // Handle form submission logic here
//     if (form.valid) {
//       this.formdata = form.value;
//       console.log('Form Data:', this.formdata);
//     } else {
//       console.log('Form is invalid');
//     }
//   }

// }
