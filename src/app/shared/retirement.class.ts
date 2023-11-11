export class Retirement {
    
    funds: Map<string, string> = new Map<string, string>()
    fundsBreakdown: string = '';
    accept: boolean = false;
    dateOfAcceptance: string = '';

    // consent
    dateOfConsentProcessOOK: string = ''; // processing data out of kenya
    personConsentingToProcessOOK: string = ''; 

    dateOfConsentProcessChildData: string = ''; 
    personConsentingToProcessChildData: string = ''; 

    dateOfConsentProcessMarketing: string = ''; 
    processMarketingConsentChoice: string = '';
    personConsentingToProcessMarketing: string = ''; 

    nameOfPersonFillingProposal: string = '';
    personMakingDeclaration: string = '';
    dateOfDeclaration: string = ''
    dateOfProposalCompleted: string = ''
    
    constructor() {}

    sourceOfFunds(item: string) {
        if (this.funds.has(item)) {
            this.funds.delete(item);
        } else {
            this.funds.set(item, item);
        }
    }

    sourceOfFundsClear() {
        this.funds.clear()
    }

    getSourceOfFundsMap() {
        return this.funds
    }

  }