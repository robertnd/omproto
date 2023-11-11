import { Component, AfterViewInit, OnInit } from '@angular/core';
import { EventBusService } from 'src/app/shared/event-bus.service';
import { Router } from '@angular/router'
import { Recommendation } from 'src/app/shared/recommendation.class';
import { PersonalInfo } from 'src/app/shared/personalinfo.class';
import { Contacts } from 'src/app/shared/contacts.class';
import { Occupation } from 'src/app/shared/occupation.class';


@Component({
  selector: 'app-recommends-profile',
  templateUrl: './recommends-profile.component.html',
  styleUrls: ['./recommends-profile.component.scss']
})
export class RecommendsProfileComponent implements AfterViewInit, OnInit {

  // preset plans
  journey: Map<string, number> = new Map<string, number>()
  plans: Map<string, string> = new Map<string, string>()
  
  recommendation: Recommendation = new Recommendation(0,0,0,0)
  personalInfo: PersonalInfo = new PersonalInfo();
  contacts: Contacts = new Contacts();
  occupation: Occupation = new Occupation();
  
  productList: Map<string, string> = new Map<string, string>()
  recommList: Map<string, string> = new Map<string, string>()

  loadErrorMsg: string = ''

  constructor(
    private eventBusService: EventBusService,
    private router: Router) { 

      let tRecomm = this.eventBusService.getRecommendaton()
      this.recommendation = { ...tRecomm }

      // get recommendation prefills
      this.personalInfo = { ...this.eventBusService.getPersonalInfo() }
      this.contacts = { ...this.eventBusService.getContacts() }
      this.occupation = { ...this.eventBusService.getOccupation() }

      //create lists
      this.createProductList(this.recommendation)
      this.createRecommsList(this.recommendation)

      // console.log("@Constructor RECOMM", this.recommendation)
      // console.log("@Constructor RLIST", this.recommList)
      // console.log("@Constructor PLIST", this.productList)
      
    }

    createProductList(r: Recommendation) {
      if (r.healthProducts) {
        this.productList.set('health', r.healthProducts)
      }
      if (r.motorProducts) {
        this.productList.set('motor', r.healthProducts)
      }
      if (r.nonMotorProducts) {
        this.productList.set('nonMotor', r.healthProducts)
      }
      if (r.lifeProducts) {
        this.productList.set('life', r.healthProducts)
      }
      if (r.travelProducts) {
        this.productList.set('travel', r.healthProducts)
      }
      if (r.investmentProducts) {
        this.productList.set('invest', r.healthProducts)
      }
    }

    createRecommsList(r: Recommendation) {
      if (r.healthRecommendations) {
        this.recommList.set('health', r.healthRecommendations)
      }
      if (r.motorRecommendations) {
        this.recommList.set('motor', r.motorRecommendations)
      }
      if (r.nonMotorRecommendations) {
        this.recommList.set('nonMotor', r.nonMotorRecommendations)
      }
      if (r.lifeRecommendations) {
        this.recommList.set('life', r.lifeRecommendations)
      }
      if (r.travelRecommendations) {
        this.recommList.set('travel', r.travelRecommendations)
      }
      if (r.investmentRecommendations) {
        this.recommList.set('invest', r.investmentRecommendations)
      }

    }

    ngOnInit(): void {}

    ngAfterViewInit() {}

    convertOne(recommInst: string, recomm: string) {

      this.loadErrorMsg = ""

      // !investmentRecommendations && !motorRecommendations
      if ( recommInst!='motor' && recommInst!='invest'  ) {
        this.loadErrorMsg = `This Recommendation [ ${recomm} ] cannot be actioned currently. No matching plans found`
        return;
      }

      this.fillPersonalInfo(this.recommendation)
      this.fillContacts(this.recommendation)
      this.fillOccupation(this.recommendation)

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

    convert() {

      var investmentRecommendations = this.recommendation?.investmentRecommendations ?? ''
      // var healthRecommendations = this.recommendations.get(customer_pid)?.healthRecommendations ?? ''
      // var travelRecommendations = this.recommendations.get(customer_pid)?.travelRecommendations ?? ''
      // var nonMotorRecommendations = this.recommendations.get(customer_pid)?.nonMotorRecommendations ?? ''
      // var lifeRecommendations = this.recommendations.get(customer_pid)?.lifeRecommendations ?? ''
      var motorRecommendations = this.recommendation?.motorRecommendations ?? ''

      this.fillPersonalInfo(this.recommendation)

      if ( !investmentRecommendations && !motorRecommendations ) {
        this.loadErrorMsg = `Recommendations for [${this.personalInfo.firstName} ${this.personalInfo.middleNames} ${this.personalInfo.surname}] currently can not be actioned. No matching plans found`
        return;
      }

      this.fillContacts(this.recommendation)
      this.fillOccupation(this.recommendation)

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



}
