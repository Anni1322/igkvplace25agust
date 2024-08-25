import { Component } from '@angular/core';
import { CServiceService } from '../service/c-service.service';

@Component({
  selector: 'app-c-main',
  templateUrl: './c-main.component.html',
  styleUrls: ['./c-main.component.scss']
})
export class CMainComponent {

  isSidebarVisible = true;
  constructor(private sidebarService: CServiceService) {}


  ngOnInit() {
    this.sidebarService.sidebarVisibility$.subscribe((isVisible) => {
      console.log(isVisible)
      this.isSidebarVisible = isVisible;
    });
  }
}
