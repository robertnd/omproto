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
import { PensionInfo } from 'src/app/shared/pensioninfo.class';
import { Retirement } from 'src/app/shared/retirement.class';
import { Maxpac } from 'src/app/shared/maxpac.class';
import { VehicleInsurance } from 'src/app/shared/vehicleinsurance.class';
import { Vehicle } from 'src/app/shared/vehicle.class';
import { Internship } from 'src/app/shared/internship.class';
import { UnitTrust } from 'src/app/shared/unittrust.class';
import { UnitTrustMpesa } from 'src/app/shared/unittrustmpesa.class';
import { BizService } from 'src/app/services/biz.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoadingService } from 'src/app/services/loading.service';

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
  childDetailsErrorMsg: string = ''
  beneficiariesErrorMsg: string = ''
  vehicleErrorMsg: string = ''
  submitErrorMsg: string = ''
  
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
  vehicles: Map<number, Vehicle> = new Map<number, Vehicle>()
  mpesaNumbers: Map<number, UnitTrustMpesa> = new Map<number, UnitTrustMpesa>()
  plans: Map<string, string> = new Map<string, string>()

  onboardData: string = ''

  
  modalWarningOn: boolean = false
  dbgData: string = ""
  // journeys: Map<string, number> = new Map<string, number>()

  cId: number = 0
  cNames: string = ''
  cDS: string = ''
  cDoB: string = ''
  mpNoId: number = 0


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

  pensionInfo: PensionInfo = new PensionInfo()
  retirementInfo: Retirement = new Retirement()
  maxpac: Maxpac = new Maxpac()
  vehicleInsurance:VehicleInsurance = new VehicleInsurance()
  internship: Internship = new Internship()
  unittrust: UnitTrust = new UnitTrust()

  //vehicle vars
  viID: number = 0
  viRegNo: string = '';
  viChassisNo: string = '';
  viEngineNo: string = '';
  viMake: string = '';
  viBodyType: string = '';
  viCC: string = '';
  viYOM: string = '';
  viEstValue: string = '';
  viPurpose: string = '';
  viPurposeOther: string = '';

  //UT mpesa vars
  utMpesaFormName: string = '';
  utMpesaFormNationalID: string = '';
  utMpesaFormMpesaRegNo: string = '';

  // checkbox state management vars
  savings: boolean = false
  employment: boolean = false
  gift: boolean = false
  propertySale: boolean = false
  sourceOfFundsOther: boolean = false
  sourceOfFundsOtherMsg: string = ''

  // panel visibility state
  remitSelfEmployed: boolean = false
  remitEmployed: boolean = false
  remitPanelsNoneShowing: boolean = true

  // show raw JSON or summary
  rawOrSummary: boolean = false

  @ViewChild('bsStepper', { static: false }) stepperElement!: ElementRef<any>
  public  stepper!: Stepper

  constructor(
    private storageService: StorageService, 
    private eventBusService: EventBusService,
    private viewService: ViewService,
    private bizService: BizService,
    private loadingService: LoadingService,
    private router: Router) { 

      // deep copy
      let sjourney = this.eventBusService.getJourney()
      sjourney.forEach((value: number, key: string) => this.journey.set(key, value) )
      
      let splan = this.eventBusService.getPlans()
      splan.forEach((value: string, key: string) => this.plans.set(key, value))

      // get recommendation prefills
      this.personalInfo = { ...this.eventBusService.getPersonalInfo() }
      this.contacts = { ...this.eventBusService.getContacts() }
      this.occupation = { ...this.eventBusService.getOccupation() }
    }

    sourceOfFundsToggle(item: string) {
      this.pensionInfo.sourceOfFundsToggle(item)
      if (item == 'Other') {
        this.savings = false
        this.employment = false
        this.gift = false
        this.propertySale = false
        this.pensionInfo.sourceOfFundsOther = ''
      } else {
        this.sourceOfFundsOther = false
        this.sourceOfFundsOtherMsg = ''
        this.pensionInfo.sourceOfFundsOther = ''
      }
    }

    retSourceOfFunds(item: string) {
      this.retirementInfo.sourceOfFunds(item)
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

    showUTMpesaEntries() {
      return this.mpesaNumbers.size > 0
    }

    addEntry(){
      if (!this.cNames) {
        this.childDetailsErrorMsg = "Child's names required"
        return
      }

      if (!this.cDS) {
        this.childDetailsErrorMsg = 'Please select Daughter or Son'
        return
      }

      if (!this.cDoB) {
        this.childDetailsErrorMsg = "Child's Date of Birth required"
        return
      }
      
      this.childDetailsErrorMsg = ''
      this.cId +=1.
      this.children.set(this.cId, new Dependant(this.cId, this.cNames, this.cDS, this.cDoB, ''))
    }

    addPacEntry(){
      this.pacId +=1.
      this.pacChildren.set(this.pacId, new Dependant(this.pacId, this.pacNames, '', this.cDoB, this.pacCover))
    }

    addBEntry(){

      if (!this.bNames) {
        this.beneficiariesErrorMsg = '"Full Name" required'
        return
      }

      if (!this.bRelationship) {
        this.beneficiariesErrorMsg = '"Relationship" required'
        return
      }

      if (!this.bAddress) {
        this.beneficiariesErrorMsg = '"Postal Address and Area Code" required'
        return
      }

      if (!this.bPhone) {
        this.beneficiariesErrorMsg = '"Telephone No" required'
        return
      }

      if (!this.bShare) {
        this.beneficiariesErrorMsg = '"% of total benefit to be paid to each beneficiary" required'
        return
      }

      this.bId +=1.
      this.beneficiaries.set(this.bId, new Beneficiary(this.bId, this.bNames, this.bRelationship, this.bAddress, this.bPhone, this.bDob, this.bShare))
    }

    addREntry(){
      this.rId +=1
      this.rbeneficiaries.set(this.rId, new Beneficiary(this.rId, this.rNames, this.rRelationship, '', this.rPhone, this.rDob, this.rShare))
    }

    showOptions() {
      this.showOptionsV = !this.showOptionsV
    }

    showOptionsC() {
      this.showOptionsVC = !this.showOptionsVC
    }

    addVehicleEntry(){
      this.viID +=1

      if (!this.viRegNo) {
        this.vehicleErrorMsg = '"Registration Number" required'
        return
      }
      if (!this.viChassisNo) {
        this.vehicleErrorMsg = '"Chassis Number" required'
        return
      }
      if (!this.viEngineNo) {
        this.vehicleErrorMsg = '"Engine Number" required'
        return
      }
      if (!this.viMake) {
        this.vehicleErrorMsg = '"Make of Vehicle" required'
        return
      }
      if (!this.viBodyType) {
        this.vehicleErrorMsg = '"Type of Body" required'
        return
      }
      if (!this.viCC) {
        this.vehicleErrorMsg = '"Cubic Capacity" required'
        return
      }
      if (!this.viYOM) {
        this.vehicleErrorMsg = '"Year of Manufacture" required'
        return
      }
      if (!this.viEstValue) {
        this.vehicleErrorMsg = '"Estimate of present value (incl. duty)" required'
        return
      }
      if (!this.viPurpose) {
        this.vehicleErrorMsg = '"For what purpose will the vehicle be used?" required'
        return
      }
      if ( this.viPurpose == 'For any other purpose - please specify' && !this.viPurposeOther ) {
        this.vehicleErrorMsg = '"Other Purpose (Details)" required'
        return
      }
      
      // check cc
      if (this.viCC) {
        let tCC = this.viCC.replaceAll(',','').replaceAll(' ','')
        if (isNaN(+tCC)) {
          this.vehicleErrorMsg = '"Cubic Capacity" is not valid'
          return
        }
      } 

      // check estimated value
      if (this.viEstValue) {
        let tEV = this.viEstValue.replaceAll(',','').replaceAll(' ','')
        if (isNaN(+tEV)) {
          this.vehicleErrorMsg = '"Estimate of present value (incl. duty)" is not valid'
          return
        }
      } 

      let estValueFormatted = this.commafy(this.viEstValue.replaceAll(',','').replaceAll(' ',''))
      let ccFormatted = this.commafy(this.viCC.replaceAll(',','').replaceAll(' ',''))
      let fEstValue: number = +this.viEstValue.replaceAll(',','').replaceAll(' ','')
      // let fCC: number = +this.viCC.replaceAll(',','').replaceAll(' ','')

      this.vehicles.set(this.viID, 
        new Vehicle(this.viID, 
                    this.viRegNo, 
                    this.viChassisNo, 
                    this.viEngineNo,
                    this.viMake, 
                    '', 
                    this.viBodyType, 
                    ccFormatted,
                    this.viYOM, 
                    this.viPurpose == 'For any other purpose - please specify' ? this.viPurposeOther : this.viPurpose,
                    fEstValue
         ))
    }

    addUTMpesaNo() {
      this.mpNoId +=1
      this.mpesaNumbers.set(
        this.mpNoId,
        new UnitTrustMpesa(this.mpNoId, this.utMpesaFormName, this.utMpesaFormNationalID, this.utMpesaFormMpesaRegNo))
    }

    removeUTMpesaNo(mpNoId: number) {
      if (this.mpesaNumbers.has(mpNoId)) {
        this.mpesaNumbers.delete(mpNoId)
      }
    }


    removeVehicleEntry(vid: number) {
      if (this.vehicles.has(vid)) {
        this.vehicles.delete(vid)
      }
    }

    removeEntry(cId: number) {
      if (this.children.has(cId)) {
        this.children.delete(cId)
      }
    }

    removeBEntry(bId: number) {
      if (this.beneficiaries.has(bId)) {
        this.beneficiaries.delete(bId)
      }
    }

    removeREntry(rId: number) {
      if (this.rbeneficiaries.has(rId)) {
        this.rbeneficiaries.delete(rId)
      }
    }

    removePacEntry(pacId: number) {
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

      // stops moving to the next page until fields are filled ..there are better ways of doing this 

      if (stepName == 'personalInfo') {
        if (![
          this.personalInfo.firstName, this.personalInfo.middleNames,
          this.personalInfo.surname,this.personalInfo.dateOfBirth,  this.personalInfo.idDocumentType, this.personalInfo.idDocumentValue, 
          this.personalInfo.gender, this.personalInfo.maritalStatus, this.personalInfo.title, 
          this.personalInfo.PIN, this.personalInfo.nationality, this.personalInfo.countryOfResidence
        ].every(Boolean) ) {
          this.onNextErrorMsg = 'Please fill in all fields marked with *'
          return
        }

        var height = +this.personalInfo.height
        var weight = +this.personalInfo.weight

        // if (height < 20 || height > 106) {
        //   this.heightErrorMsg = "Height value error"
        //   return
        // }

        // if (weight < 10 || weight > 600) {
        //   this.weightErrorMsg = "Weight value error"
        //   return
        // }
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

      if (stepName == 'pension-remitinfo') {
        if (this.sourceOfFundsOther == true && this.pensionInfo.sourceOfFundsOther.trim().length == 0) {
          this.sourceOfFundsOtherMsg = 'Option "Other" selected: Source of funds narration required'
          return
        }

        if (this.pensionInfo.getSourceOfFundsMap().size == 0 && this.sourceOfFundsOther == false) {
          this.onNextErrorMsg = 'Source of Funds selection required'
          return
        }

      }

      // If dependant (spouse's) section is not filled in, then next of kin must be filled
      if (stepName == 'pension-dependants') {

        let depSection = false
        let nokSection = false

        // if dependant and next of kin 
        if (!this.pensionInfo.depSurname && !this.pensionInfo.kinSurname) {
          this.onNextErrorMsg = 'Either the Dependant Section or the Next of Kin section must be filled'
          return
        }

        // check partial filling ...
        // very confusing toggling of states here
        if (this.pensionInfo.depSurname || this.pensionInfo.depForeNames || this.pensionInfo.depIdDocValue || this.pensionInfo.depMobileNo) {
          //spouse selected, check if other controls have been filled
          if (!this.pensionInfo.depSurname || 
            !this.pensionInfo.depForeNames || 
            !this.pensionInfo.depIdDocType || 
            !this.pensionInfo.depIdDocValue || 
            !this.pensionInfo.depMobileNo) {
              if (nokSection) {
                this.onNextErrorMsg = 'The "Next of Kin" section is filled. Filling both "Dependant" and "Next of Kin" sections is not permitted'
              } else {
                depSection = false
                this.onNextErrorMsg = 'Please fill in "Surname", "Forenames", "Identification Document", "Document Number", "Mobile No" and "Spouse" to complete the Dependant Section'
              }
              return
          } else {
            depSection = true
          }
        }

        if (this.pensionInfo.kinSurname || this.pensionInfo.kinForeNames || this.pensionInfo.kinIdDocValue || this.pensionInfo.kinMobileNo) {

          if (
            !this.pensionInfo.kinSurname ||
            !this.pensionInfo.kinForeNames ||
            !this.pensionInfo.kinIdDocType ||
            !this.pensionInfo.kinIdDocValue ||
            !this.pensionInfo.kinMobileNo ) {
              if (depSection) {
                this.onNextErrorMsg = 'The "Dependant" section is filled. Filling both "Next of Kin" and "Dependant" sections is not permitted'
              }  else {
                this.onNextErrorMsg = 'Please fill in "Surname", "Forenames", "Identification Document", "Document Number" and "Mobile No" to complete the Next of Kin Section'
                nokSection = false
              }
              return
            } else {
              nokSection = true
            }
          }

        if (this.pensionInfo.depSurname && this.pensionInfo.kinSurname) {
          this.onNextErrorMsg = 'The Dependant Section and the Next of Kin should not both be filled'
          return
        }
      }

      if (stepName == 'vehicleInsurance-consent') {

        if (
          !this.vehicleInsurance.personConsentingToProcessOOK || !this.vehicleInsurance.dateOfConsentProcessOOK
          || !this.vehicleInsurance.personConsentingToProcessChildData || !this.vehicleInsurance.dateOfConsentProcessChildData
          || !this.vehicleInsurance.personConsentingToProcessMarketing || !this.vehicleInsurance.dateOfConsentProcessMarketing
          ) {
            this.onNextErrorMsg = 'Please fill in the "Name" and "Date" values for all consent sections'
            return
          }

        if (!this.vehicleInsurance.processMarketingConsentChoice) {
            this.onNextErrorMsg = 'Please make "Consent Choice" '
          return
          }
      }

      if (stepName == 'vehicleInsurance-vehicles') {

        // if (this.vehicles.size == 0) {
        //   this.onNextErrorMsg = 'No vehicle entries'
        //   return;
        // }

        if (!this.vehicleInsurance.declOwnsVehicles) {
          this.onNextErrorMsg = 'Please select a value for "Are you the owner of the above vehicle(s)?" '
          return;
        } else {
          if (this.vehicleInsurance.declOwnsVehicles == 'No' && !this.vehicleInsurance.otherOwner) {
            this.onNextErrorMsg = 'Please fill in "If you are not the owner, state the name of the owner and his/her address. ( ... ):"'
            return;
          }
        }

        if (!this.vehicleInsurance.otherPartyInterest) {
          this.onNextErrorMsg = 'Please select a value for "Is any Financial Institution or any other party financially interested in the vehicle?" '
          return;
        } else {
          if (this.vehicleInsurance.otherPartyInterest == 'Yes' && !this.vehicleInsurance.otherPartyInterestNameAndAddress) {
            this.onNextErrorMsg = 'Please fill in "If "Yes" please state name and address:" '
            return;
          }
        }

        if (!this.vehicleInsurance.isLHD) {
          this.onNextErrorMsg = 'Please select a value for "Is any of the vehicles left-hand drive? ( ... )" '
          return;
        } 

        if (!this.vehicleInsurance.isDutyFullyPaid) {
          this.onNextErrorMsg = 'Please select a value for "Has customs duty been paid in full in respect of the above vehicle? ( ... )" '
          return;
        } 

        if (!this.vehicleInsurance.antiTheftDeviceInstalled) {
          this.onNextErrorMsg = 'Please select a value for "Is/are the vehicle(s) fitted with anti-theft devices? ( ... )" '
          return;
        } 

      }

      if (stepName == 'vehicleInsurance-asserts') {

        if (!this.vehicleInsurance.isLicensed) {
          this.onNextErrorMsg = 'Please select a value for "Do you hold a valid Driving license?" '
          return;
        } else {
          if (this.vehicleInsurance.isLicensed == 'Yes') {
            if (!this.vehicleInsurance.licenseClass) {
              this.onNextErrorMsg = 'Please fill in "Which class of license?" '
              return;
            }
            if (!this.vehicleInsurance.licenseYear) {
              this.onNextErrorMsg = 'Please fill in "Year license was attained" '
              return;
            }
          }
        }

        if (!this.vehicleInsurance.beenInAccidentOrLoss) {
          this.onNextErrorMsg = 'Please fill in "Have you ever had a motor vehicle accident or loss during the past five years?" '
          return;
        } else {
          if (this.vehicleInsurance.beenInAccidentOrLoss == 'Yes') {

            if (!this.vehicleInsurance.dateOfAccidentOrLoss) {
              this.onNextErrorMsg = 'Please fill in "When?" '
              return;
            }

            if (!this.vehicleInsurance.natureOfAccident) {
              this.onNextErrorMsg = 'Please fill in "Nature of Accident" '
              return;
            }

            if (!this.vehicleInsurance.lossEstimate) {
              this.onNextErrorMsg = 'Please fill in "Estimated amount of loss" '
              return;
            } else {
              // check estimated value
              let tmpNumber = this.vehicleInsurance.lossEstimate.replaceAll(',','').replaceAll(' ','')
              if (isNaN(+tmpNumber)) {
                this.onNextErrorMsg = '"Estimated amount of loss" is not valid'
                return
              } 
              this.vehicleInsurance.lossEstimate = this.commafy(this.vehicleInsurance.lossEstimate)
            }
          }
        }

        if (!this.vehicleInsurance.haveMotoringOffenceConvictions) {
          this.onNextErrorMsg = 'Please fill in "Have you ever been convicted of any motoring offence?" '
          return;
        } else {
          if ( this.vehicleInsurance.haveMotoringOffenceConvictions == 'Yes' && !this.vehicleInsurance.offenceDetails ) {
            this.onNextErrorMsg = 'Please fill in "If "yes" provide details" '
            return;
          }
        }

        if (!this.vehicleInsurance.vehiclesAlreadyInsured) {
          this.onNextErrorMsg = 'Please fill in "Have you been insured in respect of the above vehicle(s)?" '
          return;
        } else {
          if ( this.vehicleInsurance.vehiclesAlreadyInsured == 'Yes' && !this.vehicleInsurance.vehiclesAlreadyInsuredInsurer ) {
            this.onNextErrorMsg = 'Please fill in "If so by which company" '
            return;
          }
        }

        if (!this.vehicleInsurance.coverType) {
          this.onNextErrorMsg = 'Please fill in "What type of cover do you require?" '
          return;
        }

        if (!this.vehicleInsurance.dateOfProposalCompleted) {
          this.onNextErrorMsg = 'Please fill in "Date of completion of proposal:" '
          return;
        }

        if (!this.vehicleInsurance.nameOfPersonFillingProposal) {
          this.onNextErrorMsg = 'Please fill in "Name of person completing proposal form:" '
          return;
        }

      }

      if (stepName == 'vehicleInsurance-policy') {

        if (!this.vehicleInsurance.policyType) {
          this.onNextErrorMsg = 'Please select a value for "Policy Type:" '
          return;
        }

        if (!this.vehicleInsurance.product) {
          this.onNextErrorMsg = 'Please select a value for "Product:" '
          return;
        }
        
        if (this.vehicleInsurance.vPremium) {
          let tPremium = this.vehicleInsurance.vPremium.replaceAll(' ','').replaceAll(',','')
          if (isNaN(+tPremium)) {
            this.onNextErrorMsg = '"Premium" is not valid'
            return
          } else {
            this.vehicleInsurance.premium = +tPremium
          }
        } else {
          this.onNextErrorMsg = '"Premium" required'
            return
        }

        if (this.vehicleInsurance.vSumInsured) {
          let tSumInsured = this.vehicleInsurance.vSumInsured.replaceAll(' ','').replaceAll(',','')
          if (isNaN(+this.vehicleInsurance.vSumInsured)) {
            this.onNextErrorMsg = '"Sum Insured" is not valid'
            return
          } else {
            this.vehicleInsurance.sumInsured = +tSumInsured
          }
        } else {
          this.onNextErrorMsg = '"Sum Insured" required'
            return
        }
      }
        
      this.stepper.next()
    }
    
    previous() {
      this.onboardData = ''
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
    }

    onChangeSelection() {
      // reset this form
      this.eventBusService.setJourney(new Map<string, number>())
      let tempy = this.eventBusService.getJourney()
      this.journey = new Map<string, number>()
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
        case 'onNext': this.onNextErrorMsg = ''; break;
        case 'onSourceOfFundsOther': {
          this.sourceOfFundsOtherMsg = ''; 
          this.onNextErrorMsg = ''
          this.sourceOfFundsOther = true;
          this.savings = false;
          this.employment = false;
          this.gift = false;
          this.propertySale = false;
          break;
        }
        default: this.onNextErrorMsg = ''; break;
      }
    }

    commafy(mayBeNum: string) {
      // only validated numbers
      let tmp = mayBeNum.split('.')
      if (tmp[0].length >= 5) {
        tmp[0] = tmp[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
      }
      if (tmp[1] && tmp[1].length >= 5) {
        tmp[1] = tmp[1].replace(/(\d{3})/g, '$1 ');
      }
      return tmp.join('.');
    }

    dataTransform() {

      let journey = {

        "personalInfo": this.personalInfo,
        "contacts": this.contacts,
        "occupation": this.occupation,

        "pensionInfo": {
          "sourceOfFunds": [...this.pensionInfo.sourceOfFunds.values()],
          "otherSourceOfFundsDesc":  this.pensionInfo.sourceOfFundsOther,
          "remittanceSelfEmployed": {
            "contribution": this.pensionInfo.contributionSelf,
            "modeOfRemittance": this.pensionInfo.modeOfRemittanceSelf,
            "frequency": this.pensionInfo.frequencySelf,
            "bank": this.pensionInfo.bankSelf,
            "branch": this.pensionInfo.branchSelf,
            "accountName": this.pensionInfo.accountNameSelf,
            "accountNumber": this.pensionInfo.accountNoSelf
          },
          "remittanceFromEmployment": {
            "contributionByEmployer": this.pensionInfo.contributionEmp,
            "contributionByMember": this.pensionInfo.contributionStaffer,
            "sharePercentOfMemberSalary": this.pensionInfo.contributionShareOfPay,
            "modeOfRemittance": this.pensionInfo.modeOfRemittanceEmp,
            "bank": this.pensionInfo.bankEmp,
            "branch": this.pensionInfo.branchEmp,
            "accountName": this.pensionInfo.accountNameEmp,
            "accountNumber": this.pensionInfo.accountNoEmp,
            "designation": this.pensionInfo.designation,
            "remitDate": this.pensionInfo.remitInfoDate,
          },
          "residentialAddress": {
            "LRNumber": this.pensionInfo.lrNo,
            "estate": this.pensionInfo.estate,
            "houseNumber": this.pensionInfo.houseNo,
            "road": this.pensionInfo.road,
            "townOrArea": this.pensionInfo.townArea
          },
          "spousalDependant": {
            "surname": this.pensionInfo.depSurname,
            "foreNames": this.pensionInfo.depForeNames,
            "idDocumentType": this.pensionInfo.depIdDocType,
            "idDocumentValue": this.pensionInfo.depIdDocValue,
            "mobileNo": this.pensionInfo.depMobileNo,
            "email": this.pensionInfo.depEmail,
            "spouse": this.pensionInfo.depSpouse
          },
          "children": [...this.children.values()],
          "nextOfKin": {
            "surname": this.pensionInfo.kinSurname,
            "foreNames": this.pensionInfo.kinForeNames,
            "dateOfBirth": this.pensionInfo.kinDOB,
            "idDocumentType": this.pensionInfo.kinIdDocType,
            "idDocumentValue": this.pensionInfo.kinIdDocValue,
            "mobileNo": this.pensionInfo.kinMobileNo,
            "email": this.pensionInfo.kinEmail,
          }
        },

        "individualRetirementScheme": {
          "beneficiaries": [...this.rbeneficiaries.values()],
          "sourceOfFunds": [...this.retirementInfo.getSourceOfFundsMap().values()],
          "fundsBreakdown": this.retirementInfo.fundsBreakdown,
          "consentToProcessDataOutsideKenya": {
            "consentGranted": this.retirementInfo.personConsentingToProcessOOK && this.retirementInfo.dateOfConsentProcessOOK ? 'Yes' : 'No',
            "consentGrantedBy": this.retirementInfo.personConsentingToProcessOOK,
            "dateOfConsent": this.retirementInfo.dateOfConsentProcessOOK
          },
          "consentToProcessChildData": {
            "consentGranted": this.retirementInfo.personConsentingToProcessChildData && this.retirementInfo.dateOfConsentProcessChildData ? 'Yes' : 'No',
            "consentGrantedBy": this.retirementInfo.personConsentingToProcessChildData,
            "dateOfConsent": this.retirementInfo.dateOfConsentProcessChildData
          },
          "consentToProcessMarketingData": {
            "consentGranted": this.retirementInfo.personConsentingToProcessMarketing && this.retirementInfo.dateOfConsentProcessMarketing ? 'Yes' : 'No',
            "consentDetails":  this.retirementInfo.processMarketingConsentChoice,
            "consentGrantedBy": this.retirementInfo.personConsentingToProcessMarketing,
            "dateOfConsent": this.retirementInfo.dateOfConsentProcessMarketing
          },
          "declaration": {
            "personMakingDeclaration": this.retirementInfo.personMakingDeclaration,
            "dateOfDeclaration":  this.retirementInfo.dateOfDeclaration
          }
        },

        "maxpacPersonalAccident": {
          "beneficiary": {
            "postalAddress": this.maxpac.beneficiaryPOBox,
            "town": this.maxpac.benTown,
            "telephoneNo": this.maxpac.benTelNo,
            "cellphoneNo": this.maxpac.benMobileNo,
            "idDocumentType": this.maxpac.benIdDocType,
            "idDocumentValue": this.maxpac.benIdDocValue,
            "periodOfInsuranceFrom": this.maxpac.benPeriodFrom,
            "periodOfInsuranceTo": this.maxpac.benPeriodTo,
            "email": this.maxpac.benEmail,
            "accountNo": this.maxpac.benAccountNo,
          },
          "spouse": {
            "idDocumentType": this.maxpac.spouseIdDocType,
            "idDocumentValue": this.maxpac.spouseIdDocValue,
            "PINNo": this.maxpac.spousePINNo,
            "occupation": this.maxpac.spouseOccup,
            "mobileNo": this.maxpac.spouseMobileNo,
            "dateOfBirth": this.maxpac.spouseDOB,
            "selectedCoverForInsured": this.maxpac.insuredCover,
            "insuredPremiumAmount": this.maxpac.insuredPremiumAmount,
            "selectedCoverForSpouse": this.maxpac.spouseCover,
            "spousedPremiumAmount": this.maxpac.spousePremiumAmount,
          },
          "children": [...this.pacChildren.values()],
          "paymentMode": this.maxpac.paymentMode,
          "otherInformation": {
            "have_you_previously_held_a_personal_accident_policy":{
              "answer": this.maxpac.hasHeldAccountPreviously ? 'Yes' : 'No',
              "answerDetails": {
                "nameOfInsurance": this.maxpac.hasHeldInsurer,
                "branch": this.maxpac.hasHeldBranch,
                "address": this.maxpac.hasHeldAddress,
                "policyNumber": this.maxpac.hasHeldPolicyNo
              }
            },
            "has_any_insurer_in_connection_with_the_person_to_be_insured":{
              "deferred_or_declined_a_proposal": this.maxpac.deferredOrDeclined ? 'Yes' : 'No',
              "refused_renewal": this.maxpac.refusedRenewal ? 'Yes' : 'No',
              "terminated_an_insurance": this.maxpac.terminatedInsurance ? 'Yes' : 'No',
              "required_an_increased_premium": this.maxpac.increasedPremium ? 'Yes' : 'No',
              "imposed_special_conditions": this.maxpac.imposedSpecialConditions ? 'Yes' : 'No',
              "answerDetails": this.maxpac.otherInsurerDeclarationDetails
            },
            "will_this_insurance_be_additional_to_any_other_personal_accident_policy": {
              "answer": this.maxpac.isAdditionalPolicy ? 'Yes' : 'No',
              "answerDetails": {
                "numberOfOtherPersonalAccidentPolicies": this.maxpac.noOfOtherPolicies,
                "totalBenefitOfOtherPoliciesKshs": this.maxpac.deathBenefit
              }
            }

          },
          "totalPremium": this.maxpac.totalPremium,
          "are_you_dealing_with_OM": this.maxpac.directOrIntermediaries,
          "consentToProcessMarketingData": {
            "consentDetails":  this.maxpac.processMarketingConsentChoice,
            "dateOfConsent": this.maxpac.dateOfConsentProcessMarketing
          },
          "declaration": {
            "dateOfDeclaration":  this.maxpac.dateOfDeclaration
          }
        
        },

        "privateVehicleInsurance": {
          "vehicles": [...this.vehicles.values()],
          "otherInformation": {
            "are_you_the_owner_of_the_vehicle(s)": {
              "answer": this.vehicleInsurance.declOwnsVehicles,
              "nameAndAddressOfOtherOwner": this.vehicleInsurance.declOwnsVehicles == 'No' ? this.vehicleInsurance.otherOwner : ''
            },
            "does_a_financial_institution_or_other_party_financially_have_any_interest_in_the_vehicle(s)": {
              "answer": this.vehicleInsurance.otherPartyInterest,
              "nameAndAddressOfInterestedParty": this.vehicleInsurance.otherPartyInterest == 'Yes' ? this.vehicleInsurance.otherPartyInterestNameAndAddress : '',
            },
            "is_any_of_the_vehicles_left_hand_drive": this.vehicleInsurance.isLHD,
            "has_customs_duty_been_paid_in_full": this.vehicleInsurance.isDutyFullyPaid,
            "have_anti_theft_devices_been_fitted": this.vehicleInsurance.antiTheftDeviceInstalled,
            "do_you_hold_a_driving_license": {
              "answer": this.vehicleInsurance.isLicensed,
              "classOfLicense": this.vehicleInsurance.isLicensed == 'Yes' ? this.vehicleInsurance.licenseClass : '',
              "yearOfLicense": this.vehicleInsurance.isLicensed == 'Yes' ? this.vehicleInsurance.licenseYear : ''
            },
            "have_you_been_in_vehicle_accident_or_loss_during_in_past_5_years": {
              "answer": this.vehicleInsurance.beenInAccidentOrLoss,
              "when": this.vehicleInsurance.beenInAccidentOrLoss == 'Yes' ? this.vehicleInsurance.dateOfAccidentOrLoss : '',
              "natureOfAccident": this.vehicleInsurance.beenInAccidentOrLoss == 'Yes' ? this.vehicleInsurance.natureOfAccident : '',
              "estimatedLossAmount": this.vehicleInsurance.beenInAccidentOrLoss == 'Yes' ? this.vehicleInsurance.lossEstimate : ''
            },
            "have_you_ever_been_convicted_of_a_motoring_offence": {
              "answer": this.vehicleInsurance.haveMotoringOffenceConvictions,
              "answerDetails": this.vehicleInsurance.haveMotoringOffenceConvictions == 'Yes' ? this.vehicleInsurance.offenceDetails : ''
            },
            "have_you_been_insured_listed_vehicle(s)": {
              "answer": this.vehicleInsurance.vehiclesAlreadyInsured,
              "insurer": this.vehicleInsurance.vehiclesAlreadyInsured == 'Yes' ? this.vehicleInsurance.vehiclesAlreadyInsuredInsurer : ''
            },
            "coverRequested": this.vehicleInsurance.coverType,
            "additionalPremium": this.extraVehicleCover(),
            "consentToProcessDataOutsideKenya": {
              "consentGranted": this.vehicleInsurance.personConsentingToProcessOOK && this.vehicleInsurance.dateOfConsentProcessOOK ? 'Yes' : 'No',
              "consentGrantedBy": this.vehicleInsurance.personConsentingToProcessOOK,
              "dateOfConsent": this.vehicleInsurance.dateOfConsentProcessOOK
            },
            "consentToProcessChildData": {
              "consentGranted": this.vehicleInsurance.personConsentingToProcessChildData && this.vehicleInsurance.dateOfConsentProcessChildData ? 'Yes' : 'No',
              "consentGrantedBy": this.vehicleInsurance.personConsentingToProcessChildData,
              "dateOfConsent": this.vehicleInsurance.dateOfConsentProcessChildData
            },
            "consentToProcessMarketingData": {
              "consentGranted": this.vehicleInsurance.personConsentingToProcessMarketing && this.vehicleInsurance.dateOfConsentProcessMarketing ? 'Yes' : 'No',
              "consentDetails":  this.vehicleInsurance.processMarketingConsentChoice,
              "consentGrantedBy": this.vehicleInsurance.personConsentingToProcessMarketing,
              "dateOfConsent": this.vehicleInsurance.dateOfConsentProcessMarketing
            },
            "declaration": {
              "personMakingDeclaration": this.vehicleInsurance.nameOfPersonFillingProposal,
              "dateOfDeclaration":  this.vehicleInsurance.dateOfProposalCompleted
            }
          },
          "policyDetail": {
            "policyType": this.vehicleInsurance.policyType,
            "product": this.vehicleInsurance.product,
            "premium": this.vehicleInsurance.premium,
            "sumInsured": this.vehicleInsurance.sumInsured,
            "periodFrom": this.vehicleInsurance.policyPeriodFrom,
            "periodTo": this.vehicleInsurance.policyPeriodTo
          }
        },

        "studentInternship": {
          "coverSelected": this.internship.coverSelected,
          "currentInternship": this.internship.currentInternship,
          "periodOfInsuranceFrom": this.internship.insuranceFrom,
          "periodOfInsuranceTo": this.internship.insuranceTo,
          "general": {
            "have_you_previously_held_a_personal_accident_policy": {
              "answer": this.internship.hasHeldPreviousPolicy ? 'Yes' : 'No',
              "insurer": this.internship.nameOfPreviousInsurer
            },

            "are_you_free_from_physical_disability_or_mental_illness": {
              "answer": this.internship.freeOfIllnessOrDisability ? 'Yes' : 'No',
              "details": this.internship.illnessOrDisabilityDetails
            },
            "details_of_accidents_during_last_5_years" : this.internship.accidentDetailsLast5Yrs,
            "are_you_engaged_in_any_excluded_activities": {
              "answer": this.internship.participatesInExcludedActivities ? 'Yes' : 'No',
              "excludedActivities" : this.excludedActivities(),
              "would_you_like_an_extensions": this.internship.additionalCover ? 'Yes' : 'No'
            },
          },

          "consentToProcessDataOutsideKenya": {
            "consentGranted": this.internship.personConsentingToProcessOOK && this.internship.dateOfConsentProcessOOK ? 'Yes' : 'No',
            "consentGrantedBy": this.internship.personConsentingToProcessOOK,
            "dateOfConsent": this.internship.dateOfConsentProcessOOK
          },
          "consentToProcessChildData": {
            "consentGranted": this.internship.personConsentingToProcessChildData && this.internship.dateOfConsentProcessChildData ? 'Yes' : 'No',
            "consentGrantedBy": this.internship.personConsentingToProcessChildData,
            "dateOfConsent": this.internship.dateOfConsentProcessChildData
          },
          "consentToProcessMarketingData": {
            "consentGranted": this.internship.personConsentingToProcessMarketing && this.internship.dateOfConsentProcessMarketing ? 'Yes' : 'No',
            "consentDetails":  this.internship.processMarketingConsentChoice,
            "consentGrantedBy": this.internship.personConsentingToProcessMarketing,
            "dateOfConsent": this.internship.dateOfConsentProcessMarketing
          },
          "declaration": {
            "personMakingDeclaration": this.internship.nameOfPersonFillingProposal,
            "dateOfDeclaration":  this.internship.dateOfDeclaration
          }

        },

        "unitTrust": {
          "jointApplicant": {
            "relationshipBetweenJointHolders": {
              "relationship": this.unittrust.jhRelationship,
              "other": this.unittrust.jhRelationshipDetail
            },
            "in_death_can_the_surving_joint_holder_gain_ownership_of_the_account": this.unittrust.jhCanInheritAccount ? 'Yes' : 'No',
            "transactionSignatories": {
              "signatories": this.unittrust.jhSignatories,
              "other": this.unittrust.jhSignatoriesOther
            },
            "title": this.unittrust.jhTitle,
            "nationality": this.unittrust.jhNationality,
            "firstName": this.unittrust.jhFirstName,
            "surname": this.unittrust.jhSurname,
            "idDocumentType": this.unittrust.jhIdDocType, 
            "idDocumentValue": this.unittrust.jhIdDocValue,
            "dateOfBirth": this.unittrust.jhDateOfBirth,
            "PINNo": this.unittrust.jhPINNo,
            "maritalStatus": this.unittrust.jhMaritalStatus,
            "postalAddress": this.unittrust.jhPostalAddress,
            "postalCode": this.unittrust.jhPostalCode,
            "cityTown": this.unittrust.jhCityTown,
            "occupationOrBusiness": this.unittrust.jhOccupationOrBusiness,
            "placeOfWork": this.unittrust.jhPlaceOfWork,
            "telephoneNoOffice": this.unittrust.jhPlaceOfWorkPhoneNo,
            "mobile": this.unittrust.jhMobileNo,
            "physicalAddress": this.unittrust.jhPhysicalAddress,
            "countryOfResidence": this.unittrust.jhCountryOfResidence,
            "email": this.unittrust.jhEmail
          },
          "emergencyContactOrNextOfKin": {
            "title": this.unittrust.nokTitle,
            "nationality": this.unittrust.nokNationality,
            "firstName": this.unittrust.nokFirstNames,
            "surname": this.unittrust.nokSurname,
            "idDocumentType": this.unittrust.nokIdDocType, 
            "idDocumentValue": this.unittrust.nokIdDocValue,
            "dateOfBirth": this.unittrust.nokDateOfBirth,
            "PINNo": this.unittrust.nokPINNo,
            "maritalStatus": this.unittrust.nokMaritalStatus,
            "postalAddress": this.unittrust.nokPostalAddress,
            "postalCode": this.unittrust.nokPostalCode,
            "cityTown": this.unittrust.nokCityTown,
            "occupationOrBusiness": this.unittrust.nokOccupationOrBusiness,
            "placeOfWork": this.unittrust.nokPlaceOfWork,
            "telephoneNoOffice": this.unittrust.nokPlaceOfWorkPhoneNo,
            "mobile": this.unittrust.nokMobileNo,
            "physicalAddress": this.unittrust.nokPhysicalAddress,
            "countryOfResidence": this.unittrust.nokCountryOfResidence,
            "email": this.unittrust.nokEmail
          },
          "lifeWrapper": {
            "beneficiaryNomination": {
              "firstName": this.unittrust.lwBenFirstNames,
              "surname": this.unittrust.lwBenSurname,
              "idDocumentType": this.unittrust.lwBenIdDocType, 
              "idDocumentValue": this.unittrust.lwBenIdDocValue,
              "relationship": this.unittrust.lwBenRelationship,
              "postalAddress": this.unittrust.lwBenPostalAddress,
              "mobile": this.unittrust.lwBenMobileNo,
              "email": this.unittrust.lwBenEmail
            },
            "guardian": {
              "guardianName": this.unittrust.lwGuardianFirstNames,
              "surname": this.unittrust.lwGuardianSurname,
              "idDocumentType": this.unittrust.lwGuardianIdDocType, 
              "idDocumentValue": this.unittrust.lwGuardianIdDocValue,
              "postalAddress": this.unittrust.lwGuardianPostalAddress,
              "mobile": this.unittrust.lwGuardianMobileNo,
              "email": this.unittrust.lwGuardianEmail
            }
          },
          "sourcesOfFunds": {
            "sources": this.unitTrustSourcesOfFunds(),
            "otherSOurces": this.unittrust.sourceOfFundsOtherDetail
          },
          "bankDetails": {
            "accountHolder": this.unittrust.sourceOfFundsAccountHolder ,
            "accountNo": this.unittrust.sourceOfFundsAccountNo,
            "accountType": this.unittrust.sourceOfFundsAccountType,
            "bank": this.unittrust.sourceOfFundsBank ,
            "branch": this.unittrust.sourceOfFundsBranch
          },
          "mpesaPaymentActivation": [...this.mpesaNumbers.values()],
          "incomeDistribution": this.incomeDistOptions(),
          "fundCharges": this.fundCharges(),
          "paymentMethods": this.paymentMethod(),
          "consentToProcessDataOutsideKenya": {
            "consentGranted": this.unittrust.personConsentingToProcessOOK && this.unittrust.dateOfConsentProcessOOK ? 'Yes' : 'No',
            "consentGrantedBy": this.unittrust.personConsentingToProcessOOK,
            "dateOfConsent": this.unittrust.dateOfConsentProcessOOK
          },
          "consentToProcessChildData": {
            "consentGranted": this.unittrust.personConsentingToProcessChildData && this.unittrust.dateOfConsentProcessChildData ? 'Yes' : 'No',
            "consentGrantedBy": this.unittrust.personConsentingToProcessChildData,
            "dateOfConsent": this.unittrust.dateOfConsentProcessChildData
          },
          "consentToProcessMarketingData": {
            "consentGranted": this.unittrust.personConsentingToProcessMarketing && this.unittrust.dateOfConsentProcessMarketing ? 'Yes' : 'No',
            "consentDetails":  this.unittrust.processMarketingConsentChoice,
            "consentGrantedBy": this.unittrust.personConsentingToProcessMarketing,
            "dateOfConsent": this.unittrust.dateOfConsentProcessMarketing
          },
          "declaration": {
            "personMakingDeclaration": this.unittrust.nameOfPersonFillingProposal,
            "dateOfDeclaration":  this.unittrust.dateOfDeclaration
          },
          "riskAssessment": {
            "what_is_your_current_age": this.unittrust.riskCurrentAge,
            "have_you_ever_invested_in_any_of_the_following___shares_treasurybills_bonds_offshores_property___": this.unittrust.riskInvestmentCategories,
            "what_type_of_savings_or_investments_do_you_currently_hold___unittrust_businessshares_offshore_property___": this.unittrust.riskInvestmentTypes,
            "what_do_you_expect_of_your_income_in_the_next_3_to_5_years": this.unittrust.riskIncomeExpectations,
            "approximately_what_portion_of_your_total_investment_portfolio_will_this_investment_represent_excluding_your_permanent_residence": this.unittrust.riskInvestmentRatio,
            "how_familiar_are_you_with_the_investment_markets_and_the_concept_of_risk_vs_return": this.unittrust.riskLevelOfKnowledge,
            "what_returns_would_you_reasonably_expect_to_achieve_from_your_investment_compared_to_the_current_returns_from_the_bank_deposits": this.unittrust.riskExpectedReturns,
            "if_you_took_a_loss_of_25percent_or_above_from_your_investment_how_would_you_handle_it": this.unittrust.riskExpectedReactionToLoss,
            "what_attracts_me_to_an_investment": this.unittrust.riskRationaleToInvest,
            "do_you_have_savings_set_aside_to_provide_for_an_unexpected_emergency": this.unittrust.riskCurrentSavings,
            "when_do_you_expect_to_need_most_of_your_money_from_this_investment": this.unittrust.riskExpectedDurationToRealisation,
            "what_is_your_monthly_range_of_income": this.unittrust.riskMonthlyIncomeAmount,
            "what_are_your_monthly_sources_of_income": this.unittrust.riskMonthlySourcesOfIncome,
            "declaration": {
              "personMakingDeclaration": this.unittrust.nameOfPersonFillingProposal,
              "dateOfDeclaration":  this.unittrust.dateOfDeclaration
            }
          }
        }
      }

      interface OnboardingData {
        currentUser: any;
      }

      // HACk, add intermediary partner number
      this.currentUser.intermediaryPartnerNumber = "1002004353"

      let obj: OnboardingData = { currentUser: this.currentUser }
      let extendedObj = obj as any;

      extendedObj.personalInfo = journey.personalInfo
      extendedObj.contacts = journey.contacts
      extendedObj.occupation = journey.occupation

      // progressive addition:
      if ( this.plans.has('personalPensionPlan') ) {
        extendedObj.pensionInfo = journey.pensionInfo
      }

      if ( this.plans.has('retirementScheme') ) {
        extendedObj.individualRetirementScheme = journey.individualRetirementScheme
      }

      if ( this.plans.has('personalAccident')) {
        extendedObj.maxpacPersonalAccident = journey.maxpacPersonalAccident
      }

      if ( this.plans.has('vehicleInsurance')) {
        extendedObj.privateVehicleInsurance = journey.privateVehicleInsurance
      }

      if ( this.plans.has('internship')) {
        extendedObj.studentInternship = journey.studentInternship
      }

      if ( this.plans.has('unitTrust')) {
        extendedObj.unitTrust = journey.unitTrust
      }

      return extendedObj
    }

    joinChoices() {

      var v1 = this.vehicleInsurance.useSocioDomestic ? ['Social, domestic, pleasure & own business']  : []
      var v2 = this.vehicleInsurance.useCarryGoodsHire ? ['For carriage of goods for hire & reward'] : []
      var v3 = this.vehicleInsurance.useCarryPeopleHire ? ['For carriage of passengers for hire & reward'] : []

      return v1.concat(v2, v3)

    }

    extraVehicleCover() {

      var v1 = this.vehicleInsurance.extraWindscreenCover ? ['Extra Windscreen Cover above Kshs. 30 000 - Limit 10% of the extra limit']  : []
      var v2 = this.vehicleInsurance.extraRadioCassetteLimit ? ['Extra Radio Cassette Limit above Kshs. 30 000 - Limit 10% of the extra limit'] : []
      var v3 = this.vehicleInsurance.riotStrikePoliticalViolence ? ['Riot, Strike & Political violence - Additional premium of 0.25% of vehicle value'] : []
      var v4 = this.vehicleInsurance.carHire ? ['Car Hire - Cash Benefit up to Kshs. 30 000 - Additional premium of Kshs. 3 000 per vehicle'] : []
      var v5 = this.vehicleInsurance.forcedATMWithdrawal10K ? ['Forced ATM withdrawal Up to Kshs. 10000 - Additional premium of Kshs. 1000 per vehicle'] : []
      var v6 = this.vehicleInsurance.forcedATMWithdrawal7500 ? ['Forced ATM withdrawal Up to Kshs. 7500 - Additional premium of Kshs. 750 per vehicle'] : []
      var v7 = this.vehicleInsurance.lossOfSpareWheel10K ? ['Loss of spare wheel Up to Kshs. 10000 - Additional premium of Kshs. 1000 per vehicle'] : []
      var v8 = this.vehicleInsurance.lossOfSpareWheel7500 ? ['Loss of spare wheel Up to Kshs. 7500 - Additional premium of Kshs. 750 per vehicle'] : []
      var v9 = this.vehicleInsurance.trackingDevices ? ['Tracking Devices - Additional premium of Kshs. 25000 per vehicle'] : []
      var v10 = this.vehicleInsurance.excessWaiver ? ['Excess Waiver - Additional premium of 0.25% of vehicle value'] : []

      return v1.concat(v2, v3, v4, v5, v6, v7, v8, v9, v10)

    }

    excludedActivities() {

      var v1 = this.internship.fireworksExplosives ? ['Manufacture of fire works or explosives']  : []
      var v2 = this.internship.sinkingWells ? ['Sinking of air, water, or gas wells'] : []
      var v3 = this.internship.dams ? ['Construction and maintenance of dams'] : []
      var v4 = this.internship.airOrBoatCrew ? ['Airline crew & ship or boat crew'] : []
      var v5 = this.internship.uniformedForces ? ['Racing, Rallies and speed testing'] : []
      var v6 = this.internship.proSport ? ['Naval, military, police or Airforce operations'] : []
      var v7 = this.internship.diving ? ['Professional sports'] : []
      var v8 = this.internship.mining ? ['Diving'] : []
      var v9 = this.internship.racing ? ['Mining'] : []

      return v1.concat(v2, v3, v4, v5, v6, v7, v8, v9)

    }

    unitTrustSourcesOfFunds() {

      var v1 = this.unittrust.sourceOfFundsSalary ? ['Salary']  : []
      var v2 = this.unittrust.sourceOfFundsBusinessIncome ? ['Business Income']  : []
      var v3 = this.unittrust.sourceOfFundsGift ? ['Gifts']  : []
      var v4 = this.unittrust.sourceOfFundsSaleOfProperty ? ['Sale of property']  : []
      var v5 = this.unittrust.sourceOfFundsSavings ? ['Savings']  : []
      
      return v1.concat(v2, v3, v4, v5)
    }

    incomeDistOptions() {

      var v1 = this.unittrust.incDistMMFund ? ['Old Mutual Money Market (Monthly)']  : []
      var v2 = this.unittrust.incDistEquityFund ? ['Old Mutual Equity Fund (Semi Annually)']  : []
      var v3 = this.unittrust.incDistBalancedFund ? ['Old Mutual Balanced Fund (Quarterly)']  : []
      var v4 = this.unittrust.incDistBondFund ? ['Old Mutual Bond Fund (Quarterly)']  : []

      return v1.concat(v2, v3, v4)
    }

    fundCharges() {

      var v1 = this.unittrust.fdChMMFund ? ['Old Mutual Money Market Fund']  : []
      var v2 = this.unittrust.fdChEquityFund ? ['Old Mutual Equity Fund']  : []
      var v3 = this.unittrust.fdChBalancedFund ? ['Old Mutual Balanced Fund / Toboa Investment Plan']  : []
      var v4 = this.unittrust.fdChMBondFund ? ['Old Mutual Bond Fund']  : []
      var v4 = this.unittrust.fdChTotalInvested ? ['Total Amount invested']  : []
      var v4 = this.unittrust.fdChTotalInvestedInWords ? ['Total Amount invested in words']  : []

      return v1.concat(v2, v3, v4)
    }

    paymentMethod() {
      
      var v1 = this.unittrust.paymentMethodCheque ? ['Cheque']  : []
      var v2 = this.unittrust.paymentMethodDirectCashDeposit ? ['Direct Cash Deposit (Max Kshs 250,000']  : []
      var v3 = this.unittrust.paymentMethodEFTorRTGS ? ['EFT / RTGS']  : []
      var v4 = this.unittrust.paymentMethodInternationalTransfer ? ['International Transfer']  : []
      var v5 = this.unittrust.paymentMethodPostaPayMpesa ? ['Postapay Mpesa (Paybill No 600500)']  : []

      return v1.concat(v2, v3, v4)
    }

    summaryShow(plan: string) {
      return this.plans.has(plan)
    }

    toggleRaw() {
      if (!this.onboardData) {
        // regenerate
        let extendedObj = this.dataTransform()
        this.onboardData = JSON.stringify(extendedObj)
      }
      this.rawOrSummary = !this.rawOrSummary
    }

    upload() {
      let extendedObj = this.dataTransform()
      // Send Request upstream
      this.bizService.mvRequest(extendedObj).subscribe({
        next: data => {
          this.submitErrorMsg = JSON.stringify(data)
          if (data.statusCode == "200") {
            // success scenario
          } else {
            //this.reloadPage();
          }
        },
        error: err => {
          this.submitErrorMsg = JSON.stringify(err)
        }
      });
      
    }

    showHeightAndWeight() {
      return this.plans.has('personalAccident')
    }

    prefillOnID() {

      let idNum = this.personalInfo.idDocumentValue.trim()
      let idType =  this.personalInfo.idDocumentType.trim()

      if (!idNum) {
        return;
      }
      // No id, presume normal Kenian!
      if (!idType) {
        idType = 'National ID'
      }

      this.loadingService.prefillOnID(this.currentUser, idType, idNum).subscribe({
        next: data => {
          let dataMap = data.data
          this.personalInfo = dataMap["personalInfo"]
          this.contacts = dataMap["contacts"]
          this.occupation = dataMap["occupation"]
        },
        error: err => {
          this.onNextErrorMsg = JSON.stringify(err)
        }
      });
    }

  }