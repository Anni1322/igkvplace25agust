import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss']
})
export class StudentProfileComponent implements OnInit  {

  user: any;
  constructor(private authService: AuthService, private ds: ServiceService) {}

  ngOnInit(): void {
    // Retrieve user data from localStorage
    const userData = localStorage.getItem('currentUser');
    // Check if user data exists
    if (userData) {
      // Parse user data from JSON and assign it to the user variable
      this.user = JSON.parse(userData);
    }

    this.getData()
  }

  data : any;

  getData(): void {
    this.ds.getdata().subscribe(
      (res) => {
        // Handle the response here
        this.data = res;
        console.log('Response:', res);
      },
      (error) => {
        // Handle errors here
        console.error('Error:', error);
      }
    );
  }


}
