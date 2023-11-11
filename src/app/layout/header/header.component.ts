import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  currentUser: any;

  constructor(private authService: AuthService, 
    private storageService: StorageService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        this.storageService.clean();
        //this.router.navigate(['']);
        // window.location.reload();
        window.location.replace('/');
      },
      error: err => {
        //console.log(err);
      }
    });
  }

}
