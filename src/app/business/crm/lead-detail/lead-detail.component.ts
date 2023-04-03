import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { ViewService } from 'src/app/services/view.service';

@Component({
  selector: 'app-lead-detail',
  templateUrl: './lead-detail.component.html',
  styleUrls: ['./lead-detail.component.scss']
})
export class LeadDetailComponent {

  currentUser: any;
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
