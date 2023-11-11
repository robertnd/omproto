export class PensionInfo {
    // remittance information - self
    sourceOfFunds: Map<string, string> = new Map<string, string>()
    sourceOfFundsOther: string = '';
    contributionSelf: string = '';
    modeOfRemittanceSelf: string = '';
    frequencySelf: string = '';
    bankSelf: string = '';
    branchSelf: string = '';
    accountNameSelf: string = '';
    accountNoSelf: string = '';
    
    // remittance information - employer
    contributionEmp: string = '';
    contributionStaffer: string = '';
    contributionShareOfPay: string = '';
    modeOfRemittanceEmp: string = '';
    frequencyEmp: string = '';
    bankEmp: string = '';
    branchEmp: string = '';
    accountNameEmp: string = '';
    accountNoEmp: string = '';

    designation: string = '';
    remitInfoDate: string = '';

    // residential address inquiry
    lrNo: string = '';
    estate: string = '';
    houseNo: string = '';
    road: string = '';
    townArea: string = '';

    //dependants info
    depSurname: string = '';
    depForeNames: string = '';
    depIdDocType: string = '';
    depIdDocValue: string = '';
    depMobileNo: string = '';
    depEmail: string = '';
    depSpouse: string = ''
    
    //next of kin info
    kinSurname: string = '';
    kinForeNames: string = '';
    kinDOB: string = '';
    kinIdDocType: string = '';
    kinIdDocValue: string = '';
    kinMobileNo: string = '';
    kinEmail: string = '';

    constructor() {}

    sourceOfFundsToggle(item: string) {
        if (item == 'Other') {
            this.sourceOfFunds.clear()
        } else {
            if (this.sourceOfFunds.has(item)) {
                this.sourceOfFunds.delete(item);
            } else {
                this.sourceOfFunds.set(item, item);
            }
        }
    }

    sourceOfFundsClear() {
        this.sourceOfFunds.clear()
    }

    getSourceOfFundsMap() {
        return this.sourceOfFunds
    }
  }