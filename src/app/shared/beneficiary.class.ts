export class Beneficiary {
    id: number
    names: string
    relationship: string
    address: string
    phone: string
    dob: string
    share: string
    
    constructor(
        id: number,
        names: string, 
        relationship: string, 
        address: string,
        phone: string,
        dob: string,
        share: string
        ) {

      this.id = id
      this.names = names;
      this.relationship = relationship;
      this.address = address;
      this.phone = phone;
      this.dob = dob;
      this.share = share;
    }
  }