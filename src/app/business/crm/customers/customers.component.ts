import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { ViewService } from 'src/app/services/view.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent {

  currentUser: any;
  canView: any;

  constructor(private storageService: StorageService, 
    private viewService: ViewService,
    private router: Router) { }
    

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
    this.canView = this.viewService.canView;

    if (!this.currentUser.authenticated) {
      this.router.navigate(['/'])
    }
  }

  login(): void {
    window.location.replace('/');
  }
}
