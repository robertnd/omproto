import { Component, AfterViewInit, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service'
import { ViewService } from 'src/app/services/view.service'
import { Router } from '@angular/router'
import { EventBusService } from 'src/app/shared/event-bus.service';
import { EventData } from 'src/app/shared/event.class';

@Component({
  selector: 'app-plan-selection',
  templateUrl: './plan-selection.component.html',
  styleUrls: ['./plan-selection.component.scss']
})
export class PlanSelectionComponent implements AfterViewInit, OnInit {

  currentUser: any
  canView: any
  alreadyRun: Map<string, number> = new Map<string, number>()
  journey: Map<string, number> = new Map<string, number>()
  // journeys: string[] = []

  personalPensionPlanPath: boolean = false
  individualRetirementPath: boolean = false
  personalAccidentPath: boolean = false
  privateVehicleInsurancePath: boolean = false
  internshipPath: boolean = false
  unitTrustPath: boolean = false

  constructor(
    private storageService: StorageService,
    private eventBusService: EventBusService,
    public viewService: ViewService,
    private router: Router) { 
      this.journey.clear()
    }
  
  ngAfterViewInit() {}

  ngOnInit() {
    this.currentUser = this.storageService.getUser()
    if (!this.currentUser.authenticated) {
      this.router.navigate(['/'])
    }
    this.canView = this.viewService.canView
  }

  toggleDisplay() { }

  addRemovePath(pathname: string) {
    if (this.journey.has(pathname)) {
      this.journey.delete(pathname);
    } else {
      this.journey.set(pathname, 1);
      //console.log(this.journey)
    }
    // this.eventBusService.emit(new EventData("journey", this.journeys))
  }

  canSubmit() {
    if (this.journey.size > 0) {
      return true;
    } else {
      return false;
    }
  }

  onSubmit() {
    this.eventBusService.setJourney(this.journey)
    this.router.navigate(['/business/crm/testfunc'])
  }

}
