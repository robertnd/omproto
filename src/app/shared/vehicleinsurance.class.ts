export class VehicleInsurance {

    // dateOfConsentProcOOK: string = '' + new Date() + 'hee';
    // dateOfConsentProcChildData: string = new Date() + '';
    // dateOfConsentProcMarketing: string = new Date() + '';
    // consentChoice: string = '';
    
    declOwnsVehicles: string = '';
    otherOwner: string = '';
    otherPartyInterest: string = '';
    otherPartyInterestNameAndAddress: string = '';
    useSocioDomestic: boolean = false;
    useCarryGoodsHire: boolean = false;
    useOther: boolean = false;
    useOtherDetail: string = '' 
    useCarryPeopleHire: boolean = false;
    isLHD: string = '';
    isDutyFullyPaid: boolean = false;
    antiTheftDeviceInstalled: boolean = false;
    isLicensed: string = '';
    licenseClass: string = '';
    licenseYear: string = '';
    beenInAccidentOrLoss: string = '';
    dateOfAccidentOrLoss: string = '';
    natureOfAccident: string = '';
    haveMotoringOffenceConvictions: string = '';
    offenceDetails: string = '';
    vehiclesAlreadyInsured: string = '';
    vehiclesAlreadyInsuredInsurer: string = '';
    coverType: string = '';
    lossEstimate: string = '';

    //additional cover
    extraWindscreenCover: string = '';
    extraRadioCassetteLimit: string = '';
    riotStrikePoliticalViolence: string = '';
    carHire: string = '';
    forcedATMWithdrawal10K: string = '';
    forcedATMWithdrawal7500: string = '';
    lossOfSpareWheel10K: string = '';
    lossOfSpareWheel7500: string = '';
    trackingDevices: string = '';
    excessWaiver: string = '';

    // policy summary
    policyType: string = '';
    product: string = '';
    premium: number = 0;
    sumInsured: number = 0;
    policyPeriodFrom: string = '';
    policyPeriodTo: string = '';

    // formatting considerations ...
    vPremium: string = '';
    vSumInsured: string = '';
    

    // consent
    dateOfConsentProcessOOK: string = ''; // processing data out of kenya
    personConsentingToProcessOOK: string = ''; 

    dateOfConsentProcessChildData: string = ''; 
    personConsentingToProcessChildData: string = ''; 

    dateOfConsentProcessMarketing: string = ''; 
    processMarketingConsentChoice: string = '';
    personConsentingToProcessMarketing: string = ''; 

    nameOfPersonFillingProposal: string = '';
    dateOfDeclaration: string = ''
    dateOfProposalCompleted: string = ''


    constructor() {}
  }