export class Vehicle {
    id: number
    regNo: string
    chassisNo: string
    engineNo: string
    make: string
    model: string
    bodyType: string
    cc: string
    yom: string
    purpose: string
    estValue: number
    
    constructor(
        id: number,
        regNo: string, 
        chassisNo: string, 
        engineNo: string,
        make: string,
        model: string,
        bodyType: string,
        cc: string,
        yom: string,
        purpose: string,
        estValue: number
        
        ) {
      this.id = id
      this.regNo = regNo;
      this.chassisNo = chassisNo;
      this.engineNo = engineNo;
      this.make = make;
      this.model = model;
      this.bodyType = bodyType;
      this.cc = cc;
      this.yom = yom;
      this.purpose = purpose;
      this.estValue = estValue;
    }
  }