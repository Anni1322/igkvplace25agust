import { Component, OnInit, AfterViewInit, ViewChild  } from '@angular/core';
import { AdminService } from '../service/admin.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { CServiceService } from '../../company/service/c-service.service';

 

@Component({
  selector: 'app-a-student-view',
  templateUrl: './a-student-view.component.html',
  styleUrls: ['./a-student-view.component.scss']
})
export class AStudentViewComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'S.No.',
    'TnP_Student_Master_Id',
    'UE_ID',
    'Student_First_Name_E',
    'Student_Middle_Name_E',
    'Student_Last_Name_E',
    'DOB',
    'Mobile_No',
    'Email_Id',
    'Father_Name_E',
    // 'status',
    // 'edit'
];


  // dataSource = new MatTableDataSource<JobStatus>(JOB_DATA);
  dataSource = new MatTableDataSource<StudentApplicationDetails>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private vacancyService: AdminService) {}
 
  ngOnInit() {
    // this.vacancyService.getVacancies().subscribe(data => {
    //   this.dataSource.data = data;
    //   console.log(this.dataSource.data);
    // });


    // for student list fetch
    this.vacancyService.getAllStudents().subscribe(data => {
      this.dataSource.data = data;
      console.log("this student name list", data);
      console.log("this student name", data);
    //   console.log("this student name list", this.dataSource.data);
      });
    // for student list fetch
  }



  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


//apply filter 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }






  printTable() {
    const printContent = document.getElementById('print-section');
    const WindowPrt = window.open('', '', 'width=900,height=650');
    WindowPrt!.document.write(printContent!.outerHTML);
    WindowPrt!.document.close();
    WindowPrt!.focus();
    WindowPrt!.print();
    WindowPrt!.close();
  }







  // Method to get the CSS class based on the status value
  getStatusClass(status: string) {
    switch (status) {
      case 'Approved':
        return 'status-approved';
      case 'Rejected':
        return 'status-rejected';
      case 'Pending':
        return 'status-pending';
      default:
        return '';
    }
  }

}

 



// Interface for Student Application Details
export interface StudentApplicationDetails {
  Student_Application_ID?: number;  
  Vacancy_ID: string;
  Company_ID?: string;
  Student_ID?: string;
  Application_Submission_Date?: Date;   
  Full_Name?: string;
  Post_Name?: string;
  Fathers_Name?: string;
  Email?: string;
  Mobile?: string;
  Status?: string;  
  Flag?: string;
}
