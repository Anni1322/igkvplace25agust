import { Component } from '@angular/core';
import { CServiceService } from '../components/company/service/c-service.service';
 

declare var AOS: any;
declare var PureCounter: any;
declare var GLightbox: any;
declare var Swiper: any;



interface SideNavToggle{
  screenWidth : number;
  collapsed: boolean;
}

interface Notification {
  Notification_ID: number;
  Vacancy_Id: string;
  Notification_Title: string;
  Notification_Description: string;
  Notification_Date: Date;
  view: String;
}


@Component({
  selector: 'app-homem',
  templateUrl: './homem.component.html',
  styleUrls: ['./homem.component.scss']
})
export class HomemComponent {



  baseimageur = 'http://localhost:3000/company';
  showFiller = false;
  slider :any;

  isSideNavCollapsed = false;
  screenWidth = 0;

  ComapnyCont:any;
  StudentCont:any;
  Student:any;
  Company:any;
  top5Students:any;
  top5company:any;


  onToggleSideNav(data: SideNavToggle):void{
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed
  }

  user:any;
  data:any;
  constructor(
    private vacancyService:CServiceService,
    private companyds:CServiceService
    ){}

  ngOnInit() {

    // for templete

    const userString = localStorage.getItem('currentUser');
    if (userString !== null) {
      // Proceed only if userString is not null
      this.user = JSON.parse(userString); 
      console.log('User ID:', userString);
    }
  
    // forcontor
    this.vacancyService.getVacancies().subscribe(data => {
      this.data = data;
      console.log(data)
      if (data.length > 0) {
        console.log(data[0].Company_Id); 
      }
    });



       // for cout company 
       this.vacancyService.totalcompany().subscribe(data =>{
        this.ComapnyCont = data.totalCount;
        this.Company = data;
        console.log("cout company",this.data.totalCount)
        console.log("all company ",this.Company)
        // Get the top 5 company
        if (data && Array.isArray(data.data)) {
          this.top5company = data.data.slice(0, 5);
          console.log('Top 5 top5company:', this.top5company);
        } else {
          console.error('Data is not in the expected format:', data);
        }
      })

       // for cout student 
       this.vacancyService.totalstudent().subscribe(data =>{
        this.StudentCont = data.totalCount;
        this.Student = data;
        // console.log("cout student ",this.data.totalCount)
        console.log("all student ",this.Student)
        // Get the top 5 students
        if (data && Array.isArray(data.data)) {
          this.top5Students = data.data.slice(0, 5);
          console.log('Top 5 students:', this.top5Students);
        } else {
          console.error('Data is not in the expected format:', data);
        }
      })



      // for slider borochur
      this.companyds.getFiles().subscribe((data)=>{
        this.slider = data;
        console.log("all files",data)
      })
      // for slider borochur


// for templete
// Initialize AOS animations
   AOS.init();

   // Initialize PureCounter
   new PureCounter();

   // Initialize GLightbox
   const lightbox = GLightbox({
     // Your GLightbox options here
   });

   // Initialize Swiper
   const swiper = new Swiper('.swiper-container', {
     // Your Swiper options here
   });
      // for templete
    
};












  notifications: Notification[] = [
    {
      Notification_ID: 1,
      Vacancy_Id: 'VAC001',
      Notification_Title: 'Job Opening',
      Notification_Description: 'We have an exciting job opening for a software developer.',
      Notification_Date: new Date('2024-05-30'),
      view: 'pdf'
    },
    // Add more notifications here
  ];




  
}
