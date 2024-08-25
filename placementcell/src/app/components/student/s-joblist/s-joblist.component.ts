import { Component } from '@angular/core';
import { CServiceService } from '../../company/service/c-service.service';

@Component({
  selector: 'app-s-joblist',
  templateUrl: './s-joblist.component.html',
  styleUrls: ['./s-joblist.component.scss']
})
export class SJoblistComponent {

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
