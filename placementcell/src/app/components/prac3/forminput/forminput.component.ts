import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../../admin/service/admin.service';
import { StudentApplicationDetails } from '../../admin/a-s-application/a-s-application.component';


@Component({
  selector: 'app-forminput',
  templateUrl: './forminput.component.html',
  styleUrls: ['./forminput.component.scss']
})
export class ForminputComponent implements OnInit {
  displayedColumns: string[] = [
    'index', 'Student_Application_ID', 'Vacancy_ID', 'Company_ID', 
    'Student_ID', 'Application_Submission_Date', 'Full_Name', 
    'Post_Name', 'Fathers_Name', 'Email', 'Mobile', 'Status', 
    'Flag', 'Action'
  ];

  dataSource = new MatTableDataSource<StudentApplicationDetails>;
  filterValue: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  
  constructor(private applicationService: AdminService) {
    this.dataSource = new MatTableDataSource<StudentApplicationDetails>([]);    
    this.applicationService.getVacancyApply().subscribe((data:StudentApplicationDetails[]) => {
      this.dataSource.data = data;
      console.log("Student List", this.dataSource.data);
    });
  }

  
  ngOnInit() {
 
  }

  

  // Apply filter to the table
  applyFilter(event: Event): void {
    this.filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = this.filterValue;
  }

  // Edit logic
  onedit(data: any) {
    console.log("Received data: " + JSON.stringify(data));
  }

  // Delete logic
  ondelete(id: number): void {
    // Your delete logic here
  }

  // Scroll to bottom
  scrollToBottom(): void {
    window.scrollTo(0, document.body.scrollHeight);
  }


}



 

