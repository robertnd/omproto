export class Recommendation {
    customerId: number
    customerPid: string = ''
    firstName: string = ''
    otherNames: string = ''
    surname: string = ''
    title: string = ''
    dateOfBirth: string = ''
    gender: string = ''
    maritalStatus: string = ''
    idType: string = ''
    idNumber: string = ''
    PIN: string = ''
    height: string = ''
    weight: string = ''
    dataSource: string = ''
    status: string = ''
    nationality: string = ''
    countryOfResidence: string = ''
    contactsId: number
    mobileNumber: string = ''
    homeNumber: string = ''
    postalAddress: string = ''
    postalCode: string = ''
    townCity: string = ''
    physicalAddress: string = ''
    email: string = ''
    occupationId: number
    occupationType: string = ''
    occupationDetails: string = ''
    jobTitle: string = ''
    workplaceName: string = ''
    postalAddressWork: string = ''
    postalCodeWork: string = ''
    townCityWork: string = ''
    physicalAddressWork: string = ''
    workNumber: string = ''
    emailWork: string = ''
    recommendationId: number
    totProducts: string = ''
    needsMet: string = ''
    lifeProducts: string = ''
    lifeRecommendations: string = ''
    motorProducts: string = ''
    motorRecommendations: string = ''
    nonMotorProducts: string = ''
    nonMotorRecommendations: string = ''
    travelProducts: string = ''
    travelRecommendations: string = ''
    healthProducts: string = ''
    healthRecommendations: string = ''
    investmentProducts: string = ''
    investmentRecommendations: string = ''
    
    constructor(
        customerId: number,
        contactsId: number,
        occupationId: number,
        recommendationId: number
        ) {
            this.customerId = customerId
            this.contactsId = contactsId
            this.occupationId = occupationId
            this.recommendationId = recommendationId
        }
  }






  
