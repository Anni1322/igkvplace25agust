import { Component, EventEmitter, Output } from '@angular/core';
import { navbarData } from './nav-data';
import { AuthService } from 'src/app/services/auth.service';

interface SideNavToggle{
  screenWidth : number;
  collapsed: boolean;
}

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss']
})
export class AdminSidebarComponent {

  constructor(private auth:AuthService ){
    
  }











  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed =false;
  screenWidth= 0;
  navData = navbarData;


  toggLeCollapse(): void{
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed,screenWidth:this.screenWidth });

  }

  closeSidenav(): void{
    this.collapsed = false;
    this.onToggleSideNav.emit({collapsed: this.collapsed,screenWidth:this.screenWidth });
  }

}
