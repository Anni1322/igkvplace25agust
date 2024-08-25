import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2'; // Ensure Swal is imported correctly

interface ProjectFormValue {
  Project_ID?: number;
  Project_name: string | null;
  Project_Type_ID: number | null;
  Project_Short_name: string | null;
  Project_Discription: string | null;
}

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent implements OnInit {

  displayedColumns = ['Project_ID', 'Project_name', 'Project_Type_Name', 'Project_Short_name', 'Project_Discription', 'Action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  projectDetailForm: FormGroup;

   
  // projectDetailForm = this.fb.group({
  //   Project_name: [null, Validators.required],
  //   Project_Type_ID: [null, Validators.required],
  //   Project_Short_name: [null, Validators.required],
  //   Project_Discription: [null, Validators.required],
  // });

  deptType: any = [
    { Dept_ID: 1, Dept_Name: 'Department 1' },
    { Dept_ID: 2, Dept_Name: 'Department 2' },
  ];

  projectType: any = [
    { Project_Type_ID: 1, Project_Type_Name: 'Type 1' },
    { Project_Type_ID: 2, Project_Type_Name: 'Type 2' },
  ];

  allProjectDetail: any = [
    {
      Project_ID: 1,
      Project_name: 'Project A',
      Project_Type_Name: 'Type 1',
      Project_Short_name: 'PA',
      Project_Discription: 'Description A',
      Project_Type_ID: 1,
      Dept_ID: 1,
    },
    {
      Project_ID: 2,
      Project_name: 'Project B',
      Project_Type_Name: 'Type 2',
      Project_Short_name: 'PB',
      Project_Discription: 'Description B',
      Project_Type_ID: 2,
      Dept_ID: 2,
    },
  ];

  data: any;
  iseditmode: boolean = false;
  data_id: any;
  projectDataByid: any;


  
  constructor(
    private fb: FormBuilder,
    private elementRef: ElementRef) {
  
    
  this.projectDetailForm = this.fb.group({
      Project_name: [''],
      Project_Short_name: [''],
      Project_Type_ID: [''],
      Project_Discription: ['']
    });
    this.dataSource = new MatTableDataSource(this.allProjectDetail);
    }

  ngOnInit(): void {
    this.getTable();
  }

  // Scroll function
  scrollToBottom(): void {
    const element = this.elementRef.nativeElement.querySelector('#endOfPage');
    element.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }

  // Post Project Detail
  onSubmit() {
    const newProject = this.projectDetailForm.value as ProjectFormValue;
    newProject.Project_ID = this.allProjectDetail.length + 1;
    newProject.Project_name = this.projectType.find((type: any) => type.Project_Type_ID === newProject.Project_Type_ID)?.Project_Type_Name;
    this.allProjectDetail.push(newProject);
    this.getTable();
    Swal.fire("Data Saved successfully");
    this.onClear();
  }

  onClear() {
    this.projectDetailForm.reset();
    this.iseditmode = false;
  }

  // Show data in Mat Table
  getTable() {
    this.dataSource = new MatTableDataSource(this.allProjectDetail);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.matSort;
  }

  // Get single data into form for update
  onedit(Project_ID: any) {
    this.projectDataByid = this.allProjectDetail.find((f: any) => f.Project_ID === parseInt(Project_ID));
    console.log(this.projectDataByid);
    this.iseditmode = true;
    this.data_id = Project_ID;
    document.getElementById("addnews")?.scrollIntoView();
    this.projectDetailForm.patchValue({
      Project_name: this.projectDataByid.Project_name,
      Project_Type_ID: this.projectDataByid.Project_Type_ID,
      Project_Short_name: this.projectDataByid.Project_Short_name,
      Project_Discription: this.projectDataByid.Project_Discription,
    });
  }

  // Update Project data
  onupdate() {
    const updatedProject = this.projectDetailForm.value as ProjectFormValue;
    updatedProject.Project_ID = this.data_id;
    updatedProject.Project_name = this.projectType.find((type: any) => type.Project_Type_ID === updatedProject.Project_Type_ID)?.Project_Type_Name;
    const index = this.allProjectDetail.findIndex((project: any) => project.Project_ID === this.data_id);
    this.allProjectDetail[index] = updatedProject;
    this.getTable();
    Swal.fire("Data updated successfully");
    this.onClear();
    this.iseditmode = false;
  }

  // Delete Project detail
  ondelete(Project_ID: any) {
    this.allProjectDetail = this.allProjectDetail.filter((project: any) => project.Project_ID !== Project_ID);
    this.getTable();
    Swal.fire('Data Deleted...');
  }

  // Mat Table filter
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }




 




}
