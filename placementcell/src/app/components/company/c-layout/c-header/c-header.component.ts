import { Component } from '@angular/core';
import { CServiceService } from '../../service/c-service.service';

@Component({
  selector: 'app-c-header',
  templateUrl: './c-header.component.html',
  styleUrls: ['./c-header.component.scss']
})
export class CHeaderComponent {

  constructor(private sidebarService: CServiceService) {}

  toggleSidebar() {
  // Check if the button click event is registered
    this.sidebarService.toggleSidebar();
    // Check if the visibility state is changing
  }
}
