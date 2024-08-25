import { Component, OnInit } from '@angular/core';
import { CServiceService } from '../service/c-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-c-edit-vacancy-details',
  templateUrl: './c-edit-vacancy-details.component.html',
  styleUrls: ['./c-edit-vacancy-details.component.scss']
})
export class CEditVacancyDetailsComponent implements OnInit  {
  formData: any = {};
  companayid: any;
  constructor(
    private ds:CServiceService,
    private route: ActivatedRoute,
    private router: Router,
    ){}
  formdata:any


  // vid
  vid:any
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.vid = params['id'];
      // Call your function with the vacancyId
      // this.getvacancydata("vid"+this.vid);
    });
    this.getvacancydata(this.vid)
    // this.formData.patchValue({
    //   Company_Name: this.companayid.username,
    
    // })
  }




// dataget through vacancy id 
vacancydata:any;
 
getvacancydata(vid:any) {
  console.log('Vacancyis:', vid);
  this.ds.getVacancyedata(vid).subscribe(
    (response) => {
      // console.log('Raw Response:', response);
      this.vacancydata = response;
      console.log('Profile Data:', this.vacancydata);

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


  getvalueFromform(formValue: any) {
    console.log(formValue);
    // Your method logic here
    const formData = formValue; // Get form value
    console.log('Form Data:', formData);

    this.ds.updateVacancy(formData).subscribe(()=>{
      alert('Update(edit) successfully!'); //show the message 
      this.router.navigate(['/company/c-status']); //redirect the page after successfully submitting 
    },(error) => {
      console.error('Error submitting form:', error);
    })
  };

  
 

  
  onSubmit(form: any): void {
    this.formdata = form.value;
    // alert("Form Data: " + JSON.stringify(this.formdata, null, 2));
    console.log('Form Data: ', this.formdata);
    // Handle form submission logic here
    if (form.valid) {
      this.formdata = form.value;
      console.log('Form Data:', this.formdata);
    } else {
      console.log('Form is invalid');
    }
  }

}
