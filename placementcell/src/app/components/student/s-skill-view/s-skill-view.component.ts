import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-s-skill-view',
  templateUrl: './s-skill-view.component.html',
  styleUrls: ['./s-skill-view.component.scss']
})
export class SSkillViewComponent {
  displayedColumns: string[] = ['S.no', 'Registration_No', 'Skill_Id', 'Student_ID', 'Skill_Certificate_Url'];
  dataSource: any;

  constructor(private studentservice: StudentService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.studentservice.getskill().subscribe(
      (data:[]) => {
        this.dataSource.data = data;
      },
      (error) => {
        console.error('Error fetching skills', error);
      }
    );
  }

}
