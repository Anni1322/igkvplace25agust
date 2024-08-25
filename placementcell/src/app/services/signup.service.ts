import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignupService {



  constructor(private http:HttpClient) { }

// post_url = 'http://localhost:3000/signup'
post_url = 'http://localhost:3000/student/signup'

 

  postsignup(userData: any){
    return  this.http.post(this.post_url, userData);
  }







}
