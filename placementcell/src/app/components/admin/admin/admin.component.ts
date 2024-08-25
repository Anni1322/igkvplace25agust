import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
 

 


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent  implements OnInit  {
  
  @Input()
  src?: string;
  
  @Input()
  size = 128;
  
  user: any;
  
  notification_detail: any;

  constructor(private auth:AuthService, private router:Router) {
    
  }
ngOnInit(): void {
  // Retrieve data from local storage
  const userString = localStorage.getItem('currentUser');
  if (userString !== null) {
    // Proceed only if userString is not null
    this.user = JSON.parse(userString); 
    console.log('User ID:', userString);
  }

}

 
 


// logout 
logout() {
  const confirmation = confirm("Are you sure you want to logout?");
  if (confirmation) {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
// logout end
}

  
}
