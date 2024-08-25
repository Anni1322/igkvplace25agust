import { Component, OnInit } from '@angular/core';
import { CServiceService } from '../service/c-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Route } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-c-fileuploads',
  templateUrl: './c-fileuploads.component.html',
  styleUrls: ['./c-fileuploads.component.scss']
})
export class CFileuploadsComponent implements OnInit {
  companyregistrationForm!: FormGroup;
   
  
  companyid: any;
  companydata: any;

  selectedFile: File | null = null;


  companyLogo!: File;
  companyBroucher!: File;
  companyOtherDoc!: File;

  broucherFile?: File;
  otherDocFile?: File;
  logoFile?:File;


  
  
 
  



  constructor(
    private fb: FormBuilder,
    private CServices: CServiceService,
    private companyds: CServiceService
  ) {}

  ngOnInit(): void {
    this.companyregistrationForm = this.fb.group({
      Company_Id: [null],
      Company_Logo_Url: [''],
      Company_Logo: [''],
      Company_Broucher: [''],
      Company_Other_Doc_Url: ['']

    });

    //get for company category field
   
 

    // for id binding
    const userData = localStorage.getItem('currentUser');
    // Check if user data exists
    if (userData) {
      // Parse user data from JSON and assign it to the user variable
      this.companyid = JSON.parse(userData);
      console.log('Data', this.companyid);

      //patch value
      this.companyregistrationForm.patchValue({
        Company_Id: this.companyid.eid,
        username:this.companyid.username
        //  Company_Name: this.companyid.name,
      });
    }

    this.getCompanydata(this.companyid.eid);
  }







  nopath(){
    Swal.fire("please select a file","","warning")
  }

  baseimageur = 'http://localhost:3000/company';

     // logo file upload 
  selectLogo(event: any) {
      if (event.target.files.length > 0) {
        const file1 = event.target.files[0];            //it is used to get the input file dom property
        this.logoFile = file1
      }
  }
//upload logo
uploadLogo(){                            
    if(!this.logoFile){
      return this.nopath();
    }
    const LogoformData = new FormData();
    LogoformData.append('Company_Logo_Url', this.logoFile);
    console.log(this.logoFile)
    this.CServices.uploadLogo(LogoformData).subscribe((result:any=[])=>{
       console.log(result.body.Company_Logo_Url);
      // console.log(result);
      this.companyLogo = result.body.Company_Logo_Url;
      this.companyregistrationForm.patchValue({
        Company_Logo_Url: this.companyLogo,
      });
      Swal.fire("Logo uploaded successfully")
      //this.iseditmode=false;
    });
    
}





   // broucher file upload 
   selectBroucher(event: any) {
    if (event.target.files.length > 0) {
      const file1 = event.target.files[0];            //it is used to get the input file dom property
      this.broucherFile = file1
    }
  }

//upload broucher
uploadBroucher(){                            //multer will accept form data so we here creating a form data
  if(!this.broucherFile){
    return this.nopath();
  }
  const BroucherformData = new FormData();
  BroucherformData.append('Company_Broucher', this.broucherFile);
  console.log(this.broucherFile)

  this.CServices.uploadbroucher(BroucherformData).subscribe((result:any=[])=>{
     console.log(result.body.Company_Broucher);
    // console.log(result);
    this.companyBroucher =result.body.Company_Broucher;
    this.companyregistrationForm.patchValue({
      Company_Broucher: this.companyBroucher,
    });
    Swal.fire("Broucher uploaded successfully")
    //this.iseditmode=false;
  });
  
  }



  

  // for other doc

  selectOtherDoc(event: any) {
    if (event.target.files.length > 0) {
      const file1 = event.target.files[0];            //it is used to get the input file dom property
      this.otherDocFile = file1
    }
  }

  uploadOtherDoc() {
    if (!this.otherDocFile) {
      Swal.fire("Please select a file", "", "warning");
      return; // Ensure a return statement here
    }
  
    const formData = new FormData();
    formData.append('Company_Other_Doc_Url', this.otherDocFile);
    this.CServices.uploadOtherDoc(formData).subscribe((result: any) => {
      this.companyregistrationForm.patchValue({
        Company_Other_Doc_Url: result.body.Company_Other_Doc_Url,
      });
      Swal.fire("Other Document uploaded successfully");
    }, (error) => {
      Swal.fire("Error uploading document", error.message, "error");
      return; // Ensure a return statement here
    });
  
    return; // Ensure a return statement here
  }



  //for submit the form
  onSubmit(): void {
    if (this.companyregistrationForm.valid) {
      console.log('Form Submitted!', this.companyregistrationForm.value);
      const userData = this.companyregistrationForm.value;
      console.log("now",userData);

      // Post formData to your service
      this.CServices.postCompanyfiles(userData).subscribe(
        () => {
          alert('Form submitted successfully!');
          this.companyregistrationForm.reset();
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
  }
  


  // on clear the form details
  onClear() {
    this.companyregistrationForm.reset();
  }

  getCompanydata(cid: any) {
    console.log('cID:', cid);
    this.companyds.getCompanyfiles(cid).subscribe(
      (response) => {
        console.log('Raw Response:', response);
        this.companydata = response;
        
        console.log('companydata Details:', this.companydata);
        // console.log('companydata Details:', this.companydata.Company_Logo_Url);

        //patch value
        this.companyregistrationForm.patchValue({     
          Company_Logo_Url: this.companydata.Company_Logo_Url,
          Company_Logo: this.companydata.Company_Logo,
          Company_Broucher: this.companydata.Company_Broucher,
          Company_Other_Doc_Url: this.companydata.Company_Other_Doc_Url,
        });
      },
      (error) => {
        console.log('Error:', error);
      }
    );
  }
}
