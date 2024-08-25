import { Component } from '@angular/core';
import { ImageService } from 'src/app/serviceimage/image.service';

@Component({
  selector: 'app-top-company-slider',
  templateUrl: './top-company-slider.component.html',
  styleUrls: ['./top-company-slider.component.scss']
})
export class TopCompanySliderComponent {
  selectedFile!: File;
  images: any[] = [];

  constructor(private imageService: ImageService) {
    this.imageService.getImages().subscribe(
      data => {
        this.images = data;
      },
      err => {
        console.error(err);
      }
    );
   }




  // onFileSelected(event:any) {
  //   this.selectedFile = event.target.files[0];
  // }


  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file1 = event.target.files[0];            //it is used to get the input file dom property
      this.selectedFile = file1
      console.log(this.selectedFile)
    }
  }



  onUpload() {
    this.imageService.uploadImage(this.selectedFile).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.error(err);
      }
    );
  }

















}