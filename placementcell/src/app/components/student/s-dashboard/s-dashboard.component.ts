import { Component } from '@angular/core';
import { CServiceService } from '../../company/service/c-service.service';

@Component({
  selector: 'app-s-dashboard',
  templateUrl: './s-dashboard.component.html',
  styleUrls: ['./s-dashboard.component.scss']
})
export class SDashboardComponent {
  user:any;
  data:any;
  constructor(private vacancyService:CServiceService){}

  ngOnInit() {

    const userString = localStorage.getItem('currentUser');
    if (userString !== null) {
      // Proceed only if userString is not null
      this.user = JSON.parse(userString); 
      console.log('User ID:', userString);
    }


    this.vacancyService.getVacancies().subscribe(data => {
      this.data = data;
      console.log(data)
      if (data.length > 0) {
        console.log(data[0].Company_Id); 
      }
    });
    };
  
}
