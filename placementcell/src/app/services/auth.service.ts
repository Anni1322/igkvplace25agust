import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/student';  

  constructor(
    private http: HttpClient
    ) {}


    getcaptcha(){
      return this.http.get(`${this.apiUrl}/captcha`);
    }
// add by anil this api for master table
 


  login(loginData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, loginData).pipe(
      map(response => {
        // Store user details and token in local storage
        localStorage.setItem('currentUser', JSON.stringify(response));
        if (response && response.userId) {
          localStorage.setItem('userId', response.userId);
        }
        return response;
      }),
      catchError(error => {
        // Handle login errors (e.g., display error message)
        console.error('Login error:', error);
        return of(null);
      })
    );
  }

  logout(): void {
    // Remove user from local storage or cookie
    localStorage.removeItem('currentUser');
    
  }



  // Method to get the token
  getToken(): string | null {
    return localStorage.getItem('Token');
  }



  // for auth 
  isAuthenticated(){
    const userData = localStorage.getItem('currentUser');
    console.log("profiledata"+ userData)
    return true
  }
  // for auth 


  

  // Implement other authentication-related methods such as registration, logout, etc.
}
