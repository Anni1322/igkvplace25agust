import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { AdminService } from '../service/admin.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ASApplicationEditComponent } from '../a-s-application-edit/a-s-application-edit.component';
import { ExcelExportService } from '../service/excel-export.service';






// for dialog box
export interface DialogData {
  name: string;
}


@Component({
  selector: 'app-a-s-application',
  templateUrl: './a-s-application.component.html',
  styleUrls: ['./a-s-application.component.scss']
})

export class ASApplicationComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [
    'S.No.', 
    'Student_Application_ID', 
    'Vacancy_ID', 
    'Company_ID', 
    'Company_Name',
    'Student_ID', 
    'Application_Submission_Date', 
    'Full_Name', 
    'Post_Name', 
   // 'Fathers_Name', 
    'Email', 
    'Mobile', 
    'Status', 
    // 'Resume_Path', 
    // 'Created_By', 
    // 'Created_Date', 
    // 'Modified_By', 
    // 'Modified_Date', 
    // 'Delete_Flag', 
   // 'Flag', 
    // 'Public_IP_Address', 
    // 'Private_IP_Address',
    'edit'
  ];
  
  dataSource = new MatTableDataSource<StudentApplicationDetails>();
  p: number = 1; // for pagination

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private applicationService: AdminService,
    public dialog: MatDialog,
    private excelExportService: ExcelExportService
    ) {}

 
    

  ngOnInit() {
    this.applicationService.getVacancyApply().subscribe(data => {
      this.dataSource.data = data;
      console.log("response",this.dataSource.data);
    });

 
  }

 
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  filterValue: string = '';


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

  name!: String;

  onedit(rowdata: any): void {
    console.log("rowid", rowdata);
    
    // data send on service
    // Set row data in the service
    this.applicationService.setRowData(rowdata);

     // Log the row data
     this.applicationService.getRowData().subscribe(data => {
      console.log("data received", data);
      // You can handle the data here if needed
    }, error => {
      console.error("Error fetching row data", error);
    });
  
    // Assuming Vacancy_ID contains the data you want to pass to the dialog
    const dialogRef = this.dialog.open(ASApplicationEditComponent, {
      width: '650px',
      data: { name: rowdata }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.name = result;
    });
  }
  

  onedelete(rowid:any){
    Swal.fire("delete successfully");
    console.log(rowid);
  }

  scrollToBottom(){
    
  }
  editApplication(element: StudentApplicationDetails) {
    // Implement the edit logic here
    console.log('Edit application:', element);
  }




  enableEditing(row: any) {
    row.editing = true;
  }

  saveEditing(row: any) {
    row.editing = false;
 
  }

  // excel

  exportTableToExcel(): void {
    this.excelExportService.exportAsExcelFile(this.dataSource.data, 'applications');
  }

}
 

// Interface for Student Application Details
export interface StudentApplicationDetails {
  Student_Application_ID?: number;  // Optional since it's auto-incremented
  Vacancy_ID: string;
  Company_ID?: string;
  Company_Name?: string;
  Student_ID?: string;
  Application_Submission_Date?: Date;  // Optional with default value
  Full_Name?: string;
  Post_Name?: string;
 // Fathers_Name?: string;
  Email?: string;
  Mobile?: string;
  Status?: string;  // Optional with default value
  // Resume_Path?: string;
  // Created_By?: string;
  // Created_Date?: Date;  // Optional with default value
  // Modified_By?: string;
  // Modified_Date?: Date;
  // Delete_Flag?: string;
 // Flag?: string;
  // Public_IP_Address?: string;
  // Private_IP_Address?: string;
}