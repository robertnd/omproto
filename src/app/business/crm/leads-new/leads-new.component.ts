import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { ViewService } from 'src/app/services/view.service';
import { Router } from '@angular/router';
import Stepper from 'bs-stepper';

@Component({
  selector: 'app-leads-new',
  templateUrl: './leads-new.component.html',
  styleUrls: ['./leads-new.component.scss']
})
export class LeadsNewComponent implements AfterViewInit, OnInit {

  currentUser: any;
  canView: any;

  @ViewChild('bsStepper', { static: false }) stepperElement!: ElementRef<any>;
  public  stepper!: Stepper;

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