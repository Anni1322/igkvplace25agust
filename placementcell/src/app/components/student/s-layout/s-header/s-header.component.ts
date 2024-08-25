import { Component } from '@angular/core';
import { SidebarService } from '../../service/sidebar.service';

@Component({
  selector: 'app-s-header',
  templateUrl: './s-header.component.html',
  styleUrls: ['./s-header.component.scss']
})
export class SHeaderComponent {

  constructor(private sidebarService: SidebarService) {}

  toggleSidebar() {
  // Check if the button click event is registered
    this.sidebarService.toggleSidebar();
    // Check if the visibility state is changing
  }
}
