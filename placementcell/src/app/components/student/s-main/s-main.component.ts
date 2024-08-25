import { Component } from '@angular/core';
import { SidebarService } from '../service/sidebar.service';

@Component({
  selector: 'app-s-main',
  templateUrl: './s-main.component.html',
  styleUrls: ['./s-main.component.scss']
})
export class SMainComponent {

  isSidebarVisible = true;
  constructor(private sidebarService: SidebarService) {}


  ngOnInit() {
    this.sidebarService.sidebarVisibility$.subscribe((isVisible) => {
      console.log(isVisible)
      this.isSidebarVisible = isVisible;
    });
  }

}
