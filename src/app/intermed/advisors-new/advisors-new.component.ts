import { Component, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { ViewService } from 'src/app/services/view.service';
import Stepper from 'bs-stepper';
import { Router } from '@angular/router';

@Component({
  selector: 'app-advisors-new',
  templateUrl: './advisors-new.component.html',
  styleUrls: ['./advisors-new.component.scss']
})
export class AdvisorsNewComponent implements AfterViewInit, OnInit {

  currentUser: any;
  canView: any;

  @ViewChild('bsStepper', { static: false }) stepperElement!: ElementRef<any>;
  private stepper!: Stepper;

  constructor(private storageService: StorageService, 
    private viewService: ViewService,
    private router: Router) { }

  next() {
    this.stepper.next();
  }

  previous() {
    this.stepper.previous();
  }

  ngAfterViewInit() {
    const stepEl = document.querySelector('.bs-stepper');
    this.stepper = new Stepper(stepEl!)
  }

  ngOnInit() {
    this.currentUser = this.storageService.getUser();
    if (!this.currentUser.authenticated) {
      this.router.navigate(['/'])
    }
   this.canView = this.viewService.canView;
  }

}
