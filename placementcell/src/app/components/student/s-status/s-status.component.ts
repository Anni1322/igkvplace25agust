import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';
import { SVacancyNextroundApplyComponent } from '../s-vacancy-nextround-apply/s-vacancy-nextround-apply.component';
import { MatDialog } from '@angular/material/dialog';


// for dialog box
export interface DialogData {
  name: string;
}



@Component({
  selector: 'app-s-status',
  templateUrl: './s-status.component.html',
  styleUrls: ['./s-status.component.scss']
})
export class SStatusComponent implements OnInit{
  vacancyApplications: any;
 
  studentId:any;
  name:any; 

  constructor(
    private applyVacancy:StudentService,
    private studentds:StudentService,
    private route:ActivatedRoute,
    public dialog: MatDialog
    ){}

  ngOnInit(): void {
       // get id form param
      this.studentId = this.route.snapshot.paramMap.get('id')!;
      console.log("from routerid ",this.studentId);
      this.sendstudentid(this.studentId);
}


sendstudentid(eid:any){
  this.applyVacancy.VacancyApplicationStudentDetail(eid).subscribe(
    (response) => {
      // console.log('Raw Response:', response);
      this.vacancyApplications = response;
      console.log('student application details:', this.vacancyApplications);
      if (this.vacancyApplications) {
        console.log('Vacancy_ID:', this.vacancyApplications.Vacancy_ID);
      } else {
        console.log('No eid  data received.');
      }
    },
    (error) => {
      console.log('Error:', error);
    })
  }



  // for second roud
  formNext(rowdata: any): void {
    console.log("rowid", rowdata);
        // Set row data in the service
        this.studentds.setRowData(rowdata);

        // Log the row data
        this.studentds.getRowData().subscribe(data => {
         console.log("data received form ss serivce", data);
         // You can handle the data here if needed
       }, error => {
         console.error("Error fetching row data", error);
       });
    const dialogRef = this.dialog.open(SVacancyNextroundApplyComponent, {
      width: '490px',
      height: '460px',
      data: { name: rowdata }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.name = result;
    });
  }
  
  
  
}


//remove student id and add company id and company name 
