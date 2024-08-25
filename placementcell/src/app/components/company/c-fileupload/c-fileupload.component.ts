import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { CServiceService } from '../service/c-service.service';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-c-fileupload',
  templateUrl: './c-fileupload.component.html',
  styleUrls: ['./c-fileupload.component.scss']
})
export class CFileuploadComponent implements OnInit {
  filesuploadsform!:FormGroup;
  selectedFile: File | null = null;
   
 
  vid:any; usereid:any;

   
  filedata:any;
 

  companyLogo!: File;
  companyBroucher!: File;
  companyOtherDoc!: File;

  broucherFile?: File;
  otherFile?: File;
  



  constructor(
    private fb: FormBuilder, 
    private http: HttpClient,
    private auth: AuthService,
    private companyds:CServiceService,
    private route: ActivatedRoute,
    private studentds: StudentService,
    private CServices: CServiceService,
    ) {

 
    }
 
  ngOnInit() {
    this.filesuploadsform = this.fb.group({
      Company_ID: ['', Validators.required],
      Application_Submission_Date: [''],
      Company_Logo_Url: [''],
      Company_Broucher: ['']
     
    });





// for id pass 
this.route.params.subscribe(params => {
  this.vid = params['id'];
  // is send 
 
 
});


// get data from local storage
const userString = localStorage.getItem('currentUser');
if (userString !== null) {
  // Proceed only if userString is not null
  this.usereid = JSON.parse(userString); 
  console.log('student details:', this.usereid);
 }


//  fetch file 
  this.companyds.getFiles().subscribe(
    (data) => {
      this.filedata = data;
      console.log("this files",this.filedata)
    },
    (error) => {
      console.error('Error fetching files:', error);
    }
  );


}
 
   // Define the isImage method
   isImage(path: string): boolean {
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    const extension = path.split('.').pop()?.toLowerCase();
    return imageExtensions.includes(extension || '');
  }




//upload logo
  logoFile:any;
  nopath(){
    Swal.fire("please select a file","","warning")
  }
    
 

// date 25-07-2024
private uploadUrl = 'http://localhost:3000/';
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
    console.log("file name",this.logoFile)
    this.CServices.uploadLogos(LogoformData).subscribe(
      (result:any=[])=>{
       console.log("file name from path",result);
      // console.log(result);
      this.companyLogo = result;
      this.filesuploadsform.patchValue({
        Company_Logo_Url: this.companyLogo,
      });

      
      console.log("full name", this.uploadUrl + this.companyLogo);
      Swal.fire("Logo uploaded successfully")
      //this.iseditmode=false;
    });
    
}

// for binding image 

getImageUrl() {
  return 'assets/icons/signup.png';
}

dynamicImageUrl = 'https://cdn.prod.website-files.com/6411daab15c8848a5e4e0153/6476e21bb4ed1af908ebeba5_6a154ad1-a2cf-4434-9448-61c9ec930f3a.png';
imageur = 'http://localhost:3000/company/getLogo/1721928994703.jpeg';
baseimageur = 'http://localhost:3000/company';

 // for binding image 




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

  this.filesuploadsform.patchValue({
    Company_Broucher: this.companyBroucher,
  });
  
  Swal.fire("Broucher uploaded successfully")
  //this.iseditmode=false;
});

}
// date 25-07-2024



}

 



 