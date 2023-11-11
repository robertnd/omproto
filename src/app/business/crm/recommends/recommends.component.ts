import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';
import { StorageService } from 'src/app/services/storage.service';
import { ViewService } from 'src/app/services/view.service';
import { Recommendation } from 'src/app/shared/recommendation.class';
import { EventBusService } from 'src/app/shared/event-bus.service';
import { PersonalInfo } from 'src/app/shared/personalinfo.class';
import { Contacts } from 'src/app/shared/contacts.class';
import { Occupation } from 'src/app/shared/occupation.class';


@Component({
  selector: 'app-recommends',
  templateUrl: './recommends.component.html',
  styleUrls: ['./recommends.component.scss']
})
export class RecommendsComponent implements AfterViewInit, OnInit {

  currentUser: any;
  canView: any;
  recommendations: Map<string, Recommendation> = new Map<string, Recommendation>()
  loadErrorMsg: string = ''

  // personal info preload
  personalInfo: PersonalInfo = new PersonalInfo();
  contacts: Contacts = new Contacts();
  occupation: Occupation = new Occupation();
  
  // preset plans
  journey: Map<string, number> = new Map<string, number>()
  plans: Map<string, string> = new Map<string, string>()
  
  constructor(
    private storageService: StorageService, 
    private eventBusService: EventBusService,
    private viewService: ViewService,
    private loadingService: LoadingService,
    private router: Router) { }

    ngOnInit(): void {
      this.currentUser = this.storageService.getUser();
      if (!this.currentUser.authenticated) {
        this.router.navigate(['/'])
      }
      this.canView = this.viewService.canView;
    }

    ngAfterViewInit() {
      this.getAllRecommendations()
    }

    getAllRecommendations() {
      
      // load recommendations
      this.loadingService.getRecommendations(this.currentUser).subscribe({
        next: data => {
          let dataMap = data.data
          // Argggggghhhhhh!!!!!
          // Please note: Assigning data.data directly to a map makes it lose typing
          Object.keys(dataMap).forEach(
            (key: string) => this.recommendations.set(key, dataMap[key]) 
          )
          
          // this.recommendations = data.data
          if (data.statusCode == "200") {
            // success scenario
          } else {
            //this.reloadPage();
          }
        },
        error: err => {
          this.loadErrorMsg = JSON.stringify(err)
        }
      });
    }

    fillPersonalInfo(r?: Recommendation) {
      this.personalInfo.PIN = r?.PIN ?? ''
      this.personalInfo.countryOfResidence = r?.countryOfResidence ?? ''
      this.personalInfo.dateOfBirth = r?.dateOfBirth ?? ''
      this.personalInfo.firstName = r?.firstName ?? ''
      this.personalInfo.middleNames = r?.otherNames ?? ''
      this.personalInfo.title = r?.title ?? ''
      this.personalInfo.surname = r?.surname ?? ''
      this.personalInfo.idDocumentType = r?.idType ?? ''
      this.personalInfo.idDocumentValue = r?.idNumber ?? ''
      this.personalInfo.maritalStatus = r?.maritalStatus ?? ''
      this.personalInfo.nationality = r?.nationality ?? ''
      this.personalInfo.gender = r?.gender ?? ''
      this.personalInfo.height = r?.height ?? ''
      this.personalInfo.weight = r?.weight ?? ''
    }

    fillContacts(r?: Recommendation) {
      this.contacts.email = r?.email ?? ''
      this.contacts.homeNo = r?.homeNumber ?? ''
      this.contacts.mobileNo = r?.mobileNumber ?? ''
      this.contacts.physicalAddress = r?.postalAddress ?? ''
      this.contacts.postalAddress = r?.postalAddress ?? ''
      this.contacts.postalCode = r?.postalCode ?? ''
      this.contacts.townCity = r?.townCity ?? ''
    }

    fillOccupation(r?: Recommendation) {
      this.occupation.jobTitle = r?.jobTitle ?? ''
      this.occupation.occupationNarration = r?.occupationDetails ?? ''
      this.occupation.occupationType = r?.occupationType ?? ''
      this.occupation.workEmail = r?.emailWork ?? ''
      this.occupation.workPhoneNo = r?.workNumber ?? ''
      this.occupation.workPhysicalAddress = r?.physicalAddressWork ?? ''
      this.occupation.workPostalAddress = r?.postalAddressWork ?? ''
      this.occupation.workPostalCode = r?.postalCodeWork ?? ''
      this.occupation.workTownCity = r?.townCityWork ?? ''
      this.occupation.workplaceName = r?.workplaceName ?? ''
    }

    setRecommendProfile(r: Recommendation) {
      this.fillPersonalInfo(r)
      this.fillContacts(r)
      this.fillOccupation(r)

      this.eventBusService.setPersonalInfo(this.personalInfo)
      this.eventBusService.setContacts(this.contacts)
      this.eventBusService.setOccupation(this.occupation)

      this.eventBusService.setRecommendaton(r)
      this.router.navigate(['/business/crm/recommends-profile'])
    }

    convertOne(customer_pid: string, recommInst: string, recomm: string) {

      this.loadErrorMsg = ""
      console.log("??", recommInst, recomm)

      // !investmentRecommendations && !motorRecommendations
      if ( recommInst!='motor' && recommInst!='invest'  ) {
        this.loadErrorMsg = `This Recommendation [ ${recomm} ] cannot be actioned currently. No matching plans found`
        return;
      }

      this.fillPersonalInfo(this.recommendations.get(customer_pid))
      this.fillContacts(this.recommendations.get(customer_pid))
      this.fillOccupation(this.recommendations.get(customer_pid))

      if (recommInst == 'invest') {
        this.addPlan('unitTrust')
        this.addPath('unitTrust-ja')
        this.addPath('unitTrust-nok')
        this.addPath('unitTrust-lw')
        this.addPath('unitTrust-lw-consent')
        this.addPath('unitTrust-sources')
        this.addPath('unitTrust-mpesa')
        this.addPath('unitTrust-incomedist')
        this.addPath('unitTrust-privacy')
        this.addPath('unitTrust-risk')
      } else {
        this.addPlan('vehicleInsurance')
        this.addPath('vehicleInsurance-privacy')
        this.addPath('vehicleInsurance-consent')
        this.addPath('vehicleInsurance-vehicles')
        this.addPath('vehicleInsurance-asserts')
        this.addPath('vehicleInsurance-policy')
      }

      this.eventBusService.setJourney(this.journey)
      this.eventBusService.setPlans(this.plans)
      this.eventBusService.setPersonalInfo(this.personalInfo)
      this.eventBusService.setContacts(this.contacts)
      this.eventBusService.setOccupation(this.occupation)
      this.router.navigate(['/business/crm/testfunc'])
    }

    convert(customer_pid: string) {

      var investmentRecommendations = this.recommendations.get(customer_pid)?.investmentRecommendations ?? ''
      // var healthRecommendations = this.recommendations.get(customer_pid)?.healthRecommendations ?? ''
      // var travelRecommendations = this.recommendations.get(customer_pid)?.travelRecommendations ?? ''
      // var nonMotorRecommendations = this.recommendations.get(customer_pid)?.nonMotorRecommendations ?? ''
      // var lifeRecommendations = this.recommendations.get(customer_pid)?.lifeRecommendations ?? ''
      var motorRecommendations = this.recommendations.get(customer_pid)?.motorRecommendations ?? ''

      this.fillPersonalInfo(this.recommendations.get(customer_pid))

      if ( !investmentRecommendations && !motorRecommendations ) {
        this.loadErrorMsg = `Recommendations for [${this.personalInfo.firstName} ${this.personalInfo.middleNames} ${this.personalInfo.surname}] currently can not be actioned. No matching plans found`
        return;
      }

      this.fillContacts(this.recommendations.get(customer_pid))
      this.fillOccupation(this.recommendations.get(customer_pid))

      if (investmentRecommendations) {
        this.addPlan('unitTrust')
        this.addPath('unitTrust-ja')
        this.addPath('unitTrust-nok')
        this.addPath('unitTrust-lw')
        this.addPath('unitTrust-lw-consent')
        this.addPath('unitTrust-sources')
        this.addPath('unitTrust-mpesa')
        this.addPath('unitTrust-incomedist')
        this.addPath('unitTrust-privacy')
        this.addPath('unitTrust-risk')
      }
      if (motorRecommendations) {
        
        this.addPlan('vehicleInsurance')
        this.addPath('vehicleInsurance-privacy')
        this.addPath('vehicleInsurance-consent')
        this.addPath('vehicleInsurance-vehicles')
        this.addPath('vehicleInsurance-asserts')
        this.addPath('vehicleInsurance-policy')
      }
      
      this.eventBusService.setJourney(this.journey)
      this.eventBusService.setPlans(this.plans)
      this.eventBusService.setPersonalInfo(this.personalInfo)
      this.eventBusService.setContacts(this.contacts)
      this.eventBusService.setOccupation(this.occupation)
      this.router.navigate(['/business/crm/testfunc'])
    }

    addPath(pathname: string) {
      this.journey.set(pathname, 1);
    }
  
    addPlan(planName: string) {
      this.plans.set(planName, planName);
    }

    smartFormat(r: Recommendation) {

      var allProducts = ""
      if (r.lifeProducts) {
        allProducts = allProducts +  ` (+) ${r.lifeProducts}<br>`
      }
      if (r.motorProducts) {
        allProducts = allProducts +  ` (+)  ${r.motorProducts}<br>`
      }
      if (r.nonMotorProducts) {
        allProducts = allProducts +  ` (+) ${r.nonMotorProducts}<br>`
      }
      if (r.travelProducts) {
        allProducts = allProducts +  ` (+) ${r.travelProducts}<br>`
      }
      if (r.healthProducts) {
        allProducts = allProducts +  ` (+) ${r.healthProducts}<br>`
      }
      if (r.investmentProducts) {
        allProducts = allProducts +  ` (+) ${r.investmentProducts}<br>`
      }
      return `<small>${allProducts}</small>`
    }

}
