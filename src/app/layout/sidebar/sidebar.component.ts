import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { ViewService } from 'src/app/services/view.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  currentUser: any;
  // function ref
  canView: any;

  constructor(private storageService: StorageService, 
    private viewService: ViewService,
    private router: Router) { }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
    if (!this.currentUser.authenticated) {
      this.router.navigate(['/'])
    }
    this.canView = this.viewService.canView;
  }

}
