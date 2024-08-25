import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../service/admin.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-a-company-view',
  templateUrl: './a-company-view.component.html',
  styleUrls: ['./a-company-view.component.scss']
})
export class ACompanyViewComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'S.No.',
    'Company_Id',
    'Company_Registration_No',
    'Company_Name',
   // 'Company_Type',
    'Company_Email',
    'Company_Phone_Number',
    'Address',
    'Website'
  ];

  dataSource = new MatTableDataSource<CompanyApplicationDetails>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private vacancyService: AdminService, private cdr:ChangeDetectorRef) {}

  ngOnInit() {
    // this.vacancyService.getAllCompany().subscribe(
    //   data => {
    //     console.log("Fetched data:", data); // Debug log
    //     this.dataSource.data = data;

    //     console.log("DataSource data:", this.dataSource.data); // Debug log
    //   },
    //   error => {
    //     console.error("Error fetching data:", error); // Debug log for errors
    //   }
    // );

    // for student list fetch
    this.vacancyService.getAllCompany().subscribe((result:any) => {

      this.dataSource = new MatTableDataSource(result.data);

      // this.dataSource.data = data;
      // console.log("Company List", data);
     
       console.log("Company list", this.dataSource.data);
      });
  }
  
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log("Filter value:", filterValue); // Debug log
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

// Interface for total Company Details
export interface CompanyApplicationDetails {
  Company_Id: string;
  Company_Registration_No: string;
  Tnp_Registration_No: string;
  Company_Name: string;
  Company_Type: string;
  Company_Category: string;
  Company_Email: string;
  Company_Phone_Number: number;
  Hr_Name: string;
  Hr_Contact_No: number;
  Hr_Email: string;
  Contact_Person: string;
  Contact_Person_Email: string;
  Contact_Person_Phone: number;
  Company_Short_Name: string;
  Address: string;
  State: string;
  District: string;
  Block: string;
  Company_Profile: string;
  Website: string;
  Created_Date: Date;
  Company_Logo_Url: string;
  Company_Logo: string;
  Company_Broucher: string;
  Company_Other_Doc_Url: string;
}



