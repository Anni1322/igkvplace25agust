import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { CServiceService } from '../../service/c-service.service';

@Component({
  selector: 'app-c-sidebar',
  templateUrl: './c-sidebar.component.html',
  styleUrls: ['./c-sidebar.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition(':enter, :leave', [
        animate(300, style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class CSidebarComponent implements OnInit {

  isSidebarVisible = true;
  isSubmenuOpen = false;
  isDashboardSelected = false;


  constructor(
    private sidebarService: CServiceService,
    private auth:AuthService,
    private router:Router
    ) { }

  user : any
  ngOnInit() {
  // Retrieve data from local storage
  const userString = localStorage.getItem('currentUser');
  if (userString !== null) {
    // Proceed only if userString is not null
    this.user = JSON.parse(userString); 
    console.log('User ID:', userString);
  }



// for sidebar start
    this.sidebarService.sidebarVisibility$.subscribe((isVisible) => {
      console.log(isVisible)
      this.isSidebarVisible = isVisible;
    });
  }
  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
    this.sidebarService.toggleSidebar(); // Toggle sidebar state
  }
  toggleSubmenu() {
    this.isSubmenuOpen = !this.isSubmenuOpen;
  }
  selectDashboard() {
    this.isDashboardSelected = true;
  }
// for sidebar end


// logout 
logout() {
  const confirmation = confirm("Are you sure you want to logout?");
  if (confirmation) {
  this.auth.logout();
  this.router.navigate(['/login']);
}
}
// logout end
}
