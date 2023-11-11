export class UnitTrust {

    // joint holder
    jhRelationship: string = '';
    jhRelationshipDetail: string = '';
    jhCanInheritAccount: boolean = false;
    jhSignatories: string = '';
    jhSignatoriesOther: string = '';
    jhTitle: string = '';
    jhTitleOther: string = '';
    jhNationality: string = '';
    jhFirstName: string = '';
    jhSurname: string = '';
    jhIdDocType: string = '';
    jhIdDocValue: string = '';
    jhDateOfBirth: string = '';
    jhPINNo: string = '';
    jhMaritalStatus: string = '';
    jhPostalAddress: string = '';
    jhPostalCode: string = '';
    jhCityTown: string = '';
    jhOccupationOrBusiness: string = '';
    jhPlaceOfWork: string = '';
    jhPlaceOfWorkPhoneNo: string = '';
    jhMobileNo: string = '';
    jhPhysicalAddress: string = '';
    jhCountryOfResidence: string = '';
    jhEmail: string = '';
    

    // next of kin (emergency contact)
    nokTitle: string = '';
    nokTitleOther: string = '';
    nokNationality: string = '';
    nokFirstNames: string = '';
    nokSurname: string = '';
    nokIdDocType: string = '';
    nokIdDocValue: string = '';
    nokDateOfBirth: string = '';
    nokPINNo: string = '';
    nokMaritalStatus: string = '';
    nokPostalAddress: string = '';
    nokPostalCode: string = '';
    nokCityTown: string = '';
    nokOccupationOrBusiness: string = '';
    nokPlaceOfWork: string = '';
    nokPlaceOfWorkPhoneNo: string = '';
    nokMobileNo: string = '';
    nokPhysicalAddress: string = '';
    nokCountryOfResidence: string = '';
    nokEmail: string = '';

    //life wrapper beneficiary
    lwBenFirstNames: string = '';
    lwBenSurname: string = '';
    lwBenIdDocType: string = '';
    lwBenIdDocValue: string = '';
    lwBenRelationship: string = '';
    lwBenPostalAddress: string = '';
    lwBenMobileNo: string = '';
    lwBenEmail: string = '';

    // life wrapper (guardian)
    lwGuardianFirstNames: string = '';
    lwGuardianSurname: string = '';
    lwGuardianIdDocType: string = '';
    lwGuardianIdDocValue: string = '';
    lwGuardianRelationship: string = '';
    lwGuardianPostalAddress: string = '';
    lwGuardianMobileNo: string = '';
    lwGuardianEmail: string = '';

    // source of Funds
    sourceOfFundsSalary: string = '';
    sourceOfFundsBusinessIncome: string = '';
    sourceOfFundsGift: string = '';
    sourceOfFundsSaleOfProperty: string = '';
    sourceOfFundsSavings: string = '';
    sourceOfFundsOther: string = '';
    sourceOfFundsOtherDetail: string = '';
    sourceOfFundsAccountHolder: string = '';
    sourceOfFundsAccountNo: string = '';
    sourceOfFundsBank: string = '';
    sourceOfFundsBranch: string = '';
    sourceOfFundsAccountType: string = '';

    //mpesa activation
    // Map

    // income distribution
    incDistMMFund: string = ''; //money market fund
    incDistEquityFund: string = ''; //money equity fund
    incDistBalancedFund: string = ''; //balanced fund
    incDistBondFund: string = ''; //bond fund

    // fund charges
    fdChMMFund: string = ''; 
    fdChEquityFund: string = ''; 
    fdChBalancedFund: string = ''; 
    fdChMBondFund: string = ''; 
    fdChTotalInvested: string = ''; 
    fdChTotalInvestedInWords: string = ''; 
    
    // fund details
    fdMMFund: string = ''; //money market fund
    fdEquityFund: string = ''; //money equity fund
    fdBalancedFund: string = ''; //balanced toboa  fund
    fdMBondFund: string = ''; //bond fund
    fdTotalInvested: string = ''; //bond fund
    fdTotalInvestedInWords: string = ''; //bond fund

    paymentMethods: string = ''; //multiple (cheque, EFT ...)
    paymentMethodCheque: string = ''; 
    paymentMethodDirectCashDeposit: string = ''; 
    paymentMethodEFTorRTGS: string = ''; 
    paymentMethodInternationalTransfer: string = ''; 
    paymentMethodPostaPayMpesa: string = ''; 

    // risk assessment
    riskCurrentAge: string = '';
    riskInvestmentCategories: string = '';
    riskInvestmentTypes: string = '';
    riskIncomeExpectations: string = '';
    riskInvestmentRatio: string = '';
    riskLevelOfKnowledge: string = '';
    riskExpectedReturns: string = '';
    riskExpectedReactionToLoss: string = '';
    riskRationaleToInvest: string = '';
    riskCurrentSavings: string = '';
    riskExpectedDurationToRealisation: string = '';
    riskMonthlyIncomeAmount: string = '';
    riskMonthlySourcesOfIncome: string = '';

    riskNameOfPersonFillingRiskForm: string = '';
    riskDateOfDeclaration: string = '';

    //declaration 
    declTitle: string = '';
    declTitleOther: string = '';
    declFirstNames: string = '';
    declInitials: string = '';
    declSurname: string = '';
    declIdDocType: string = '';
    declIdDocValue: string = '';
    declNationality: string = '';
    declTaxResidentKenya: string = '';
    declTaxResidentUS: string = '';
    declTaxResidentUSRefNo: string = '';
    declTaxResidentOtherCountry: string = '';
    declTaxResidentOtherCountryName: string = '';
    declLRNo: string = '';
    declEstate: string = '';
    declHouseNo: string = '';
    declRoad: string = '';
    declTownArea: string = '';
    declCountry: string = '';
    declNameOfAdvisor: string = '';

     //source of funds declaration 
    sofDeclFirstName: string = '';
    sofDeclOtherNames: string = '';
    sofDeclNationality: string = '';
    sofDeclIdDocType: string = '';
    sofDeclIdDocValue: string = '';
    sofDeclPINNo: string = '';
    sofDeclPostalAddress: string = '';
    sofDeclPostalCode: string = '';
    sofDeclTown: string = '';
    sofDeclPhysicalAddress: string = '';
    sofDeclMobileNo: string = '';
    sofDeclOtherPhone: string = '';
    sofDeclEmail: string = '';
    sofDeclOccupation: string = '';
    sofDeclStudent: string = '';
    sofDeclEmployer: string = '';
    sofDeclSourcesOfIncome: string = ''; //multiple
    sofDeclSourcesOfIncomeOther: string = ''; //multiple
     
    // consent
    dateOfConsentProcessOOK: string = ''; // processing data out of kenya
    personConsentingToProcessOOK: string = ''; 

    dateOfConsentProcessChildData: string = ''; 
    personConsentingToProcessChildData: string = ''; 

    dateOfConsentProcessMarketing: string = ''; 
    processMarketingConsentChoice: string = '';
    personConsentingToProcessMarketing: string = ''; 

    dateOfConsent3rdPartyContact: string = ''; // processing data out of kenya
    personConsentingTo3rdPartyContact: string = ''; // person consenting

    nameOfPersonFillingProposal: string = '';
    dateOfDeclaration: string = ''
    dateOfProposalCompleted: string = ''
    
    constructor() {}
  }