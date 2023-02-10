import { Component, OnInit } from '@angular/core';
import Stepper from 'bs-stepper';

@Component({
  selector: 'app-leads-new',
  templateUrl: './leads-new.component.html',
  styleUrls: ['./leads-new.component.css']
})
export class LeadsNewComponent implements OnInit {
  private stepper!: Stepper;

  next() {
    this.stepper.next();
  }

  previous() {
    this.stepper.previous();
  }

  ngOnInit() {
    const stepEl = document.querySelector('.bs-stepper');
    this.stepper = new Stepper(stepEl!)
  }
}
