import { Component, OnInit } from '@angular/core';
import { CServiceService } from '../../company/service/c-service.service';


@Component({
  selector: 'app-a-dashboard',
  templateUrl: './a-dashboard.component.html',
  styleUrls: ['./a-dashboard.component.scss']
})
export class ADashboardComponent implements OnInit {

  labeldata = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  realdata = [65, 59, 80, 81, 56, 55, 40];
  colordata = ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'];
  barChart: any;


  totalstudent:any;
  totalcompany:any;


  constructor(private ds: CServiceService) { }

  ngOnInit() {
  
    this.ds.totalstudent().subscribe((data)=>{
      this.totalstudent = data.totalCount
      console.log(data.totalCount);
    })
    this.ds.totalcompany().subscribe((data)=>{
      this.totalcompany = data.totalCount
      console.log(data.totalCount);
    })

  }

 

}
