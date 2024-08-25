import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentApplicationDetails } from '../a-s-application/a-s-application.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { JobStatus } from '../a-c-vacancy-list/a-c-vacancy-list.component';
import { CompanyApplicationDetails } from '../a-company-view/a-company-view.component';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  apiurl = 'http://localhost:3000'

   baseurl = 'http://localhost:3000/admin'

  constructor(private http:HttpClient) { }


 
  //add fot get data from basice details
  getBasicDetails(eid: any){
    return this.http.post<any>(`${this.baseurl}/student/getbasicdetails`, { eid });
  }
  // end
  


  getVacancyApply(): Observable<StudentApplicationDetails[]> {
    return this.http.get<StudentApplicationDetails[]>(`${this.baseurl}/VacancyApply`);
  }




  // getVacancyApplybyid(Company_Id: string): Observable<StudentApplicationDetails[]> {
  //   return this.http.get<StudentApplicationDetails[]>(`${this.baseurl}/Student_application_List/${Company_Id}`);
  // }

  getVacancyApplybyid(Company_Id: any){
    return this.http.post<any>(`${this.baseurl}/Student_application_List`, { Company_Id });
  }

  

  getshortlist(): Observable<StudentApplicationDetails[]> {
    return this.http.get<StudentApplicationDetails[]>(`${this.baseurl}/getshortlist`);
  }
  getReject(): Observable<StudentApplicationDetails[]> {
    return this.http.get<StudentApplicationDetails[]>(`${this.baseurl}/getReject`);
  }
  getSelected(): Observable<StudentApplicationDetails[]> {
    return this.http.get<StudentApplicationDetails[]>(`${this.baseurl}/getSelected`);
  }

  getAllApplications(): Observable<StudentApplicationDetails[]> {
    return this.http.get<StudentApplicationDetails[]>(`${this.apiurl}/student/application`);
  }

// start function for pass data on compo. to anthercompo.
// this api for data pass to one component to anathor component

  private rowDataSubject = new BehaviorSubject<any>(null);

  setRowData(rowdata: any): void {
    this.rowDataSubject.next(rowdata);
  }

  getRowData(): Observable<any> {
    return this.rowDataSubject.asObservable();
  }
  // end function for pass data on compo. to anther compo.


// get vacanvy details from db
getVacancies(): Observable<JobStatus[]> {
  return this.http.get<JobStatus[]>(`${this.baseurl}/vacancies`);
}

getAllCompany():Observable<CompanyApplicationDetails[]> {
  return this.http.get<CompanyApplicationDetails[]>(`${this.apiurl}/company`);
}

getAllStudents():Observable<StudentApplicationDetails[]>{
  return this.http.get<StudentApplicationDetails[]>( `${this.baseurl}/student_list`);
}

}
