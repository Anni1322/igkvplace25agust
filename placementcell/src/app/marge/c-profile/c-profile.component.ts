import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CServiceService } from '../service/c-service.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-c-profile',
  templateUrl: './c-profile.component.html',
  styleUrls: ['./c-profile.component.scss']
})
export class CProfileComponent implements OnInit {
   
  form!: FormGroup;

  companydata : any;
  userid: any;

  baseimageur = 'http://localhost:3000/company';
  
  constructor(
     private companyds:CServiceService,
     private fb: FormBuilder
  ){  }
  ngOnInit(): void {
    this.form = this.fb.group({
      logo: [null]
    });

     // Retrieve user data from localStorage
     const userData = localStorage.getItem('currentUser');
     // Check if user data exists
     if (userData) {
       // Parse user data from JSON and assign it to the user variable
       this.userid = JSON.parse(userData);
      //  console.log("Data",this.userid)
      this.getCompanydata(this.userid.eid);
     }

}



onFileChange(event: any): void {
  const file = event.target.files[0];
  this.form.patchValue({
    logo: file
  });
}

 


onSubmit(): void {
  if (this.form.valid) {
    // Submit the form data to your server
    console.log('Form Submitted', this.form.value);
  } else {
    console.log('Form is invalid');
  }
}



//for get the data to the company
getCompanydata(cid:any) {
  console.log('cID:', cid);
  this.companyds.getCompanyDetails(cid).subscribe(
    (response) => {
      // console.log('Raw Response:', response);
      this.companydata = response;
      console.log('companydata Details:', this.companydata);


      if (this.companydata) {
        console.log('id:', this.companydata.Vacancy_ID);
     
      } else {
        console.log('No id data received.');
      }
    },
    (error) => {
      console.log('Error:', error);
    }
  );
}



}
