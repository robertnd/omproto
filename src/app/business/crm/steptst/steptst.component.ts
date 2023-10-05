import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service'
import { ViewService } from 'src/app/services/view.service'
import { Router } from '@angular/router'
import Stepper from 'bs-stepper'
import { EventBusService } from 'src/app/shared/event-bus.service';
import { Dependant } from 'src/app/shared/dependant.class';
import { Beneficiary } from 'src/app/shared/beneficiary.class';
import { PersonalInfo } from 'src/app/shared/personalinfo.class';
import { Contacts } from 'src/app/shared/contacts.class';
import { Occupation } from 'src/app/shared/occupation.class';

@Component({
  selector: 'app-steptst',
  templateUrl: './steptst.component.html',
  styleUrls: ['./steptst.component.scss']
})
export class SteptstComponent implements AfterViewInit, OnInit {

  // Error messages
  onNextErrorMsg: string = ''
  heightErrorMsg: string = ''
  weightErrorMsg: string = ''
  
  personalInfo: PersonalInfo = new PersonalInfo();
  contacts: Contacts = new Contacts();
  occupation: Occupation = new Occupation();
  
  currentUser: any
  canView: any
  alreadyRun: Map<string, number> = new Map<string, number>()
  journey: Map<string, number> = new Map<string, number>()
  currentStep = 0
  isFocused: boolean = false
  someValue: string = ""
  children: Map<number, Dependant> = new Map<number, Dependant>()
  beneficiaries: Map<number, Beneficiary> = new Map<number, Beneficiary>()
  rbeneficiaries: Map<number, Beneficiary> = new Map<number, Beneficiary>()
  pacChildren: Map<number, Dependant> = new Map<number, Dependant>()
  
  modalWarningOn: boolean = false
  dbgData: string = ""
  // journeys: Map<string, number> = new Map<string, number>()

  cId: number = 0
  cNames: string = ''
  cDS: string = ''
  cDoB: string = ''

  bId: number = 0
  bNames: string = ''
  bRelationship: string = '' 
  bAddress: string = ''
  bPhone: string = ''
  bDob: string = ''
  bShare: string = ''

  rId: number = 0
  rNames: string = ''
  rRelationship: string = '' 
  rPhone: string = ''
  rDob: string = ''
  rShare: string = ''

  pacId: number = 0
  pacNames: string = ''
  pacDob: string = ''
  pacCover: string = ''

  showOptionsV: boolean = true
  showOptionsVC: boolean = true
  
  @ViewChild('bsStepper', { static: false }) stepperElement!: ElementRef<any>
  public  stepper!: Stepper

  constructor(
    private storageService: StorageService, 
    private eventBusService: EventBusService,
    private viewService: ViewService,
    private router: Router) { 
      // deep copy
      let sjourney = this.eventBusService.getJourney()
      sjourney.forEach((value: number, key: string) => this.journey.set(key, value) )
    }

    showEntries() {
      return this.children.size > 0
    }

    showBEntries() {
      return this.beneficiaries.size > 0
    }

    showREntries() {
      return this.rbeneficiaries.size > 0
    }

    showPacEntries() {
      return this.pacChildren.size > 0
    }

    addEntry(){
      this.cId +=1.
      this.children.set(this.cId, new Dependant(this.cId, this.cNames, this.cDS, this.cDoB, ''))
    }

    addPacEntry(){
      this.pacId +=1.
      this.pacChildren.set(this.pacId, new Dependant(this.pacId, this.pacNames, '', this.cDoB, this.pacCover))
    }

    addBEntry(){
      this.bId +=1.
      this.beneficiaries.set(this.bId, new Beneficiary(this.bId, this.bNames, this.bRelationship, this.bAddress, this.bPhone, this.bDob, this.bShare))
      console.log("@beneficiaries", this.beneficiaries)
    }

    addREntry(){
      this.rId +=1.
      this.rbeneficiaries.set(this.rId, new Beneficiary(this.rId, this.rNames, this.rRelationship, '', this.rPhone, this.rDob, this.rShare))
      console.log("@rbeneficiaries", this.rbeneficiaries)

    }

    showOptions() {
      this.showOptionsV = !this.showOptionsV
    }

    showOptionsC() {
      this.showOptionsVC = !this.showOptionsVC
    }

    removeEntry(cId: number) {
      //console.log("@removeEntry", this.children.get(cId))
      if (this.children.has(cId)) {
        this.children.delete(cId)
      }
    }

    removeBEntry(bId: number) {
      //console.log("@removeEntry", this.children.get(cId))
      if (this.beneficiaries.has(bId)) {
        this.beneficiaries.delete(bId)
      }
    }

    removeREntry(rId: number) {
      //console.log("@removeEntry", this.children.get(cId))
      if (this.rbeneficiaries.has(rId)) {
        this.rbeneficiaries.delete(rId)
      }
    }

    removePacEntry(pacId: number) {
      //console.log("@removeEntry", this.children.get(cId))
      if (this.pacChildren.has(pacId)) {
        this.pacChildren.delete(pacId)
      }
    }
    
    stepIndexIncrAndGet(stepName: string) {
      if (this.alreadyRun.has(stepName)) {
        return this.alreadyRun.get(stepName)
      } else {
        this.currentStep = this.currentStep + 1
        this.alreadyRun.set(stepName, this.currentStep)
      }
      return this.alreadyRun.get(stepName)
    }
    
    next(stepName: string) {
      console.log("@data:", this.personalInfo)

      // stops moving to the next page until fields are filled ..there are better ways of doing this 

      if (stepName == 'personalInfo') {
        if (![
          this.personalInfo.firstName, this.personalInfo.middleNames,
          this.personalInfo.surname,this.personalInfo.dob,  this.personalInfo.idDocType, this.personalInfo.idDocValue, 
          this.personalInfo.gender, this.personalInfo.maritalStatus, this.personalInfo.title, 
          this.personalInfo.PIN, this.personalInfo.nationality, this.personalInfo.countryOfResidence
        ].every(Boolean) ) {
          this.onNextErrorMsg = 'Please fill in all fields marked with *'
          return
        }

        if (this.personalInfo.height < 20 || this.personalInfo.height > 106 ) {
          this.heightErrorMsg = "Height value error"
          return
        }

        if (this.personalInfo.weight < 1 || this.personalInfo.weight > 600 ) {
          this.weightErrorMsg = "Weight value error"
          return
        }
      }

      if (stepName == 'contacts') {
        if (![
          this.contacts.postalAddress, this.contacts.postalCode, this.contacts.townCity,
          this.contacts.physicalAddress,  this.contacts.mobileNo
        ].every(Boolean) ) {
          this.onNextErrorMsg = 'Please fill in all fields marked with *'
          return
        }

      }

      if (stepName == 'occupation') {
        if (![
          this.occupation.occupationType, this.occupation.occupationNarration, this.occupation.workplaceName,
          this.occupation.workPostalAddress,  this.occupation.workPostalCode, this.occupation.workTownCity,
          this.occupation.workPhysicalAddress,  this.occupation.workPhoneNo, this.occupation.workEmail
        ].every(Boolean) ) {
          this.onNextErrorMsg = 'Please fill in all fields marked with *'
          return
        }

      }
      
      console.log("@validation-bonoko-OK", "OK")
      this.stepper.next()
    }
    
    previous() {
      this.stepper.previous()
    }
    
    ngAfterViewInit() {
      const stepEl = document.querySelector('.bs-stepper')
      this.stepper = new Stepper(stepEl!)
    }
    
    ngOnInit() {
      // if there are no choices redirect to choices page
      if (this.journey.size == 0) {
        this.router.navigate(['business/crm/planselect'])
      }
      this.currentUser = this.storageService.getUser()
      if (!this.currentUser.authenticated) {
        this.router.navigate(['/'])
      }
      this.canView = this.viewService.canView
    }

    journeyView(panelName: string) {
      //console.log("@journalView", panelName, this.journey)
      if (this.journey.has(panelName) || panelName == 'summary') {
        return true
      } else {
        return false
      }
    }

    showModal() {
      this.modalWarningOn = !this.modalWarningOn
    }

    debugg() {
      //console.log("@debugg", this.journey)
    }

    onChangeSelection() {
      // reset this form
      //console.log("@onChangeSelection before SET", this.journey)
      this.eventBusService.setJourney(new Map<string, number>())
      let tempy = this.eventBusService.getJourney()
      //console.log("@onChangeSelection: SHARED", tempy)
      this.journey = new Map<string, number>()
      //console.log("@onChangeSelection after SET", this.journey)
      this.router.navigate(['/business/crm/planselect'])
    }

    numberOnly(event: any): boolean {
      const charCode = (event.which) ? event.which : event.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
      }
      return true;
  
    }

    clear(sel: string) {
      switch(sel) {
        case 'height': this.heightErrorMsg = ''; break;
        case 'weight': this.weightErrorMsg = ''; break;
        default: this.onNextErrorMsg = ''; break;
      }

    }
 }