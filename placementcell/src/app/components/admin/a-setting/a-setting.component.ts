import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CServiceService } from '../../company/service/c-service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-a-setting',
  templateUrl: './a-setting.component.html',
  styleUrls: ['./a-setting.component.scss']
})
export class ASettingComponent {
  userForm: FormGroup;
  selectedFile: File | null = null;
  uploadedPhotoUrl: string | null = null;




  
// file upload variables
fileName = '';
 
broucherFile?: File;
otherFile?: File;
logoFile?:File;

Company_Broucher:any;
Company_Other_Doc_Url:any;
Company_Logo_Url:any;

//doc_url:any;
selectedFiles?: FileList;
message = '';
CompanyId: any;



  constructor(private fb: FormBuilder, private cs :CServiceService , private http: HttpClient) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (this.userForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('name', this.userForm.get('name')?.value);
      formData.append('email', this.userForm.get('email')?.value);
      formData.append('photo', this.selectedFile, this.selectedFile.name);

      const headers = new HttpHeaders({
        // 'Accept': 'text/plain' ,
        'Accept': 'application/json' 
      });

      this.http.post('http://localhost:3000/student/upload', formData, { headers, responseType: 'text' })
        .subscribe(response => {
          Swal.fire("Upload Successfully")
          console.log('Upload response:', response);
          if (response) {
            this.uploadedPhotoUrl = response;
          }
        }, error => {
          console.error('Upload error:', error);
        });
    }
  }










// data on 11-07-2024







// data on 11-07-2024
nopath(){
  Swal.fire("please select a file","","warning")
}







   // logo file upload 
selectLogo(event: any) {
    if (event.target.files.length > 0) {
      const file1 = event.target.files[0];            
      this.logoFile = file1
    }
  }
   
uploadLogo(){                         
  if(!this.logoFile){
    return this.nopath();
  }
  const LogoformData = new FormData();
  LogoformData.append('Company_Logo_Url', this.logoFile);
  console.log(this.logoFile)


  this.cs.uploadLogo(LogoformData).subscribe((result:any=[])=>{
     console.log(result.body.Company_Logo_Url);
    // console.log(result);
    this.Company_Logo_Url = result.body.Company_Logo_Url;
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

  // this.cs.uploadbroucher(BroucherformData).subscribe((result:any=[])=>{
  //    console.log(result.body.Company_Broucher);
  //   // console.log(result);
  //   this.Company_Broucher=result.body.Company_Broucher;
  //   Swal.fire("Broucher uploaded successfully")
  //   //this.iseditmode=false;
  // });
  
  }



  // broucher file upload 
  selectOther(event: any) {
    if (event.target.files.length > 0) {
      this.otherFile = event.target.files[0]; 
                //it is used to get the input file dom property
    }
  }
//upload broucher
uploadOther(){                             
  if(!this.otherFile){
    return this.nopath();
  }
  const OtherformData = new FormData();
  OtherformData.append('Company_Other_Doc_Url', this.otherFile);
  console.log(this.otherFile)

  // this.cs.uploadotherdoc(OtherformData).subscribe((result:any=[])=>{
  //    console.log(result.body.Company_Other_Doc_Url);
  //   // console.log(result);
  //   this.Company_Other_Doc_Url = result.body.Company_Other_Doc_Url;
  //   Swal.fire("Document uploaded successfully")
  //   //this.iseditmode=false;
  // });
  
  }





}
