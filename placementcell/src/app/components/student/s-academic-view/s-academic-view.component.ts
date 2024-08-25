import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-s-academic-view',
  templateUrl: './s-academic-view.component.html',
  styleUrls: ['./s-academic-view.component.scss']
})
export class SAcademicViewComponent {
  displayedColumns: string[] = [
    'S.no', 'Registration_No', 'Student_Enroll_Id', 'Student_Id', 
    'Degree_Programme_Type_Id', 'Degree_Programme_Id', 'College_Name', 
    'Subject_Id', 'OGPA', 'Admission_Year_Id', 'Passingout_Year_Id', 'Marksheet_Url'
  ];
  dataSource = new MatTableDataSource<any>();

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.studentService.getacademic().subscribe(
      (data:[]) => {
        this.dataSource.data = data;
      },
      (error) => {
        console.error('Error fetching skills', error);
      }
    );
}


}


