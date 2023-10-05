export class Vehicle {
    id: number
    reg_no: string
    chassis_no: string
    engine_no: string
    make: string
    model: string
    body_type: string
    cc: string
    yom: string
    proposer_value: string
    
    
    constructor(
        id: number,
        reg_no: string, 
        chassis_no: string, 
        engine_no: string,
        make: string,
        model: string,
        body_type: string,
        cc: string,
        yom: string,
        proposer_value: string
        
        
        ) {

      this.id = id
      this.reg_no = reg_no;
      this.chassis_no = chassis_no;
      this.engine_no = engine_no;
      this.make = make;
      this.model = model;
      this.body_type = body_type;
      this.cc = cc;
      this.yom = yom;
      this.proposer_value = proposer_value;
    }
  }