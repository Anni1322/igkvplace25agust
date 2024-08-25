import { Component } from '@angular/core';
import { CServiceService } from '../../company/service/c-service.service';

@Component({
  selector: 'app-s-vacancy-details',
  templateUrl: './s-vacancy-details.component.html',
  styleUrls: ['./s-vacancy-details.component.scss']
})
export class SVacancyDetailsComponent {
  data:any;
  constructor(private vacancyService:CServiceService){}

  ngOnInit() {
    this.vacancyService.getVacancies().subscribe(data => {
      this.data = data;
      console.log(data)
      if (data.length > 0) {
        console.log(data[0].Company_Id); 
      }
    });
    };
  }
  
//add company name in the table and remove description field 