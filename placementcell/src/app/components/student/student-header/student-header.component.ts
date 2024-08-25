import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router'; 


@Component({
  selector: 'app-student-header',
  templateUrl: './student-header.component.html',
  styleUrls: ['./student-header.component.scss']
})
export class StudentHeaderComponent  implements OnInit{

  user: any; // Variable to store user data retrieved from localStorage
  @Input()
  src?: string;
  
  @Input()
  size = 128;

  
  notification_detail: any;

  constructor(private authService: AuthService,private router: Router) {}

  ngOnInit(): void {
    // Retrieve user data from localStorage
    const userData = localStorage.getItem('currentUser');
    // Check if user data exists
    if (userData) {
      // Parse user data from JSON and assign it to the user variable
      this.user = JSON.parse(userData);
    }
  }
logout(){
  this.authService.logout();
  this.router.navigate(['/login']);
}

}