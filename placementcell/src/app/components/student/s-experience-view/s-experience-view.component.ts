import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-s-experience-view',
  templateUrl: './s-experience-view.component.html',
  styleUrls: ['./s-experience-view.component.scss']
})
export class SExperienceViewComponent implements OnInit{
  displayedColumns: string[] = [
    'S.no', 'Registration_No', 'Organization_Name', 'Post_Name', 'WorkPlace_Address',
    'WorkPlace_District_Id', 'WorkPlace_State_Id', 'WorkPlace_Country_Id', 'City_Name',
    'Description', 'Period_From', 'Period_To', 'Is_Currently_working_YN', 'Salary'
  ];
  dataSource = new MatTableDataSource();

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.studentService.getexperience().subscribe(
      data => {
        console.log(data); // Log the data to verify it
        this.dataSource.data = data;
      },
      error => {
        console.error('Error fetching experience data:', error); // Handle error
      }
    );
  }
}
