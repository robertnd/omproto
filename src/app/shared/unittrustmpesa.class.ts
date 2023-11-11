export class UnitTrustMpesa {
    id: number
    names: string
    nationalIDNo: string
    registeredMobileNo: string
    
    constructor(
        id: number,
        names: string, 
        nationalIDNo: string, 
        registeredMobileNo: string
        ) {

      this.id = id
      this.names = names;
      this.nationalIDNo = nationalIDNo;
      this.registeredMobileNo = registeredMobileNo;
    }
  }