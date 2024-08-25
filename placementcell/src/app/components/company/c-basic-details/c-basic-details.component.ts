import { Component, OnInit } from '@angular/core';
import { CServiceService } from '../service/c-service.service';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Route, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-c-basic-details',
  templateUrl: './c-basic-details.component.html',
  styleUrls: ['./c-basic-details.component.scss'],
})
export class CBasicDetailsComponent implements OnInit {
  companyregistrationForm!: FormGroup;
  companytype: any;
  companycategory: any;
  state: any;
  district: any;
  block: any;
  companyid: any;
  companydata: any;

  selectedFile: File | null = null;


  companyLogo!: File;
  companyBroucher!: File;
  companyOtherDoc!: File;

  broucherFile?: File;
  otherFile?: File;
  logoFile?:File;

  
  
 
  



  constructor(
    private fb: FormBuilder,
    private CServices: CServiceService,
    private companyds: CServiceService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.companyregistrationForm = this.fb.group({
      Company_Id: ['', Validators.required],
      Company_Registration_No: ['', Validators.required],
      Tnp_Registration_No: ['', Validators.required],
      Company_Name: ['', Validators.required],
      Company_Type: ['', Validators.required],
      Company_Category: ['', Validators.required],
      Company_Email: ['', [Validators.required, Validators.email]],
      Company_Phone_Number: ['', [Validators.required, this.phoneNumberValidator]],
      Hr_Name: ['', Validators.required],
      Hr_Contact_No: ['', [Validators.required, this.phoneNumberValidator]],
      Hr_Email: ['', [Validators.required, Validators.email]],
      Contact_Person: ['', Validators.required],
      Contact_Person_Email: ['', [Validators.required, Validators.email]],
      Contact_Person_Phone: ['', [Validators.required, this.phoneNumberValidator]],
      Company_Short_Name: ['', Validators.required],

     // username: [null],


      Address: ['', [Validators.required] ],
      State: ['', Validators.required],
      District: ['', Validators.required],
      Block: ['', Validators.required],
      Website: ['', Validators.required],
      Company_Logo_Url: [''],
      Company_Logo: [''],
      Company_Broucher: [''],
      Company_Other_Doc_Url: [''],

      Created_By: [new Date()],
      Created_Date: [new Date()],
      Modified_By: [null],
      Modified_Date: [null],
      Delete_Flag: [null],
      Public_IP_Address: [null],
      Private_IP_Address: [null],
    });

    //get for company category field
    this.companyds.getcompany_category().subscribe(
      (response) => {
        //console.log('Raw response: ', response);
        this.companycategory = response;
        console.log('Company category details: ', this.companycategory);
      },
      (error) => {
        console.log('Error: ', error);
      }
    );

    //get for company type field
    this.companyds.getcompany_type().subscribe(
      (response) => {
        //console.log('Raw response: ', response);
        this.companytype = response;
        console.log('Company type details: ', this.companytype);
      },
      (error) => {
        console.log('Error: ', error);
      }
    );

    //get for state field
    this.companyds.getstate().subscribe(
      (response) => {
        //console.log('Raw Response: ', response);
        this.state = response;
        console.log('state details: ', this.state);
      },
      (error) => {
        console.log('Error: ', error);
      }
    );

    //get for district field
    this.companyds.getdistrict().subscribe(
      (response) => {
        //console.log('Raw Response: ;, response);
        this.district = response;
        console.log('district details: ', this.district);
      },
      (error) => {
        console.log('Error: ', error);
      }
    );

    //get for block field
    this.companyds.getblock().subscribe(
      (response) => {
        //console.log('Raw responsse: ', response);
        this.block = response;
        console.log('block details: ', this.block);
      },
      (error) => {
        console.log('Error: ', error);
      }
    );

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



  phoneNumberValidator(control: AbstractControl): ValidationErrors | null {
    const phoneNumber = control.value;
    const isValid = phoneNumber && phoneNumber.toString().length === 10 && /^[9876]\d{9}$/.test(phoneNumber);
    return isValid ? null : { invalidPhoneNumber: true };
  }

  get email() {
    return this.companyregistrationForm.get('Company_Email');
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



  // broucher file upload 

  
  // selectOther(event: any) {
  //   if (event.target.files.length > 0) {
  //     this.otherFile = event.target.files[0]; 
  //   }
  // }


//upload broucher

// uploadOther(){                             
//   if(!this.otherFile){
//     return this.nopath();
//   }
//   const OtherformData = new FormData();
//   OtherformData.append('Company_Other_Doc_Url', this.otherFile);
//   console.log(this.otherFile)

//   this.CServices.uploadotherdoc(OtherformData).subscribe((result:any=[])=>{
//      console.log(result.body.Company_Other_Doc_Url);
//     // console.log(result);
//     this.companyOtherDoc = result.body.Company_Other_Doc_Url;
//     this.companyregistrationForm.patchValue({
//       Company_Other_Doc_Url: this.companyOtherDoc,
//     });
//     Swal.fire("Document uploaded successfully")
//     //this.iseditmode=false;
//   });
  
//   }

  




  
  


  //for submit the form
  onSubmit(): void {
    if (this.companyregistrationForm.valid) {
      console.log('Form Submitted!', this.companyregistrationForm.value);
  
      
      
      // console.log('Company Logo:', this.companyLogo);
      // console.log('Company Broucher:', this.companyBroucher);
      // console.log('Company Other Doc:', this.companyOtherDoc);

      // this.companyregistrationForm.patchValue({
      //   Company_Logo: this.companyLogo,
      //   Company_Broucher: this.companyBroucher,
      //   Company_Other_Doc_Url: this.companyBroucher
      // });

       


      const userData = this.companyregistrationForm.value;

      console.log("now",userData);

      // const formData = new FormData();
      // formData.append('companyLogo', this.companyLogo);
      // formData.append('companyBroucher', this.companyBroucher);
      // formData.append('companyOtherDoc', this.companyOtherDoc);
      // console.log('companyOtherDoc', userData.companyLogo);





    
      // Post formData to your service
      this.CServices.postCompanyDetails(userData).subscribe(
        () => {
          alert('Form submitted successfully!');
          this.companyregistrationForm.reset(); //reset the page after successfully submitted 
          this.router.navigate(['/company/c-profile']); //redirect the page after successfully submitted 
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
  

  getCompanydata(cid: any) {
    console.log('cID:', cid);
    this.companyds.getCompanyDetails(cid).subscribe(
      (response) => {
        console.log('Raw Response:', response);
        this.companydata = response;
        
        console.log('companydata Details:', this.companydata);
        // console.log('companydata Details:', this.companydata.Company_Logo_Url);

        //patch value
        this.companyregistrationForm.patchValue({
          // Company_Id: this.companydata.Company_Id,
          Company_Registration_No: this.companydata.Company_Registration_No,
          Tnp_Registration_No: this.companydata.Tnp_Registration_No,
          Company_Name: this.companydata.Company_Name,
          Company_Type: this.companydata.Company_Type,
          Company_Category: this.companydata.Company_Category,
          Company_Email: this.companydata.Company_Email,
          Company_Phone_Number: this.companydata.Company_Phone_Number,
          Hr_Name: this.companydata.Hr_Name,
          Hr_Contact_No: this.companydata.Hr_Contact_No,
          Hr_Email: this.companydata.Hr_Email,
          Contact_Person: this.companydata.Contact_Person,
          Contact_Person_Email: this.companydata.Contact_Person_Email,
          Contact_Person_Phone: this.companydata.Contact_Person_Phone,
          Company_Short_Name: this.companydata.Company_Short_Name,
          Address: this.companydata.Address,
          State: this.companydata.State,
          District: this.companydata.District,
          Block: this.companydata.Block,
          Website: this.companydata.Website,
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
