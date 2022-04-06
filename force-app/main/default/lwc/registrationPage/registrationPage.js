import { LightningElement, api } from 'lwc';
import NAME_FIELD from '@salesforce/schema/Contact.Name';
import PASSWORD from '@salesforce/schema/Contact.Password__c';

export default class RegistrationPage extends LightningElement {
    fields = [NAME_FIELD, PASSWORD];

    isActive;
    @api recordId;
    @api objectApiName;

    constructor() {
        super();
        this.template.addEventListener('navigate', event => { this.navigate(event) });
    }

    navigate(event) {
        if (event.detail === 'login') this.isActive = true;
        console.log(event.detail);
    }

    handleSuccess(event) {
        const evt = new ShowToastEvent({
            title: 'Contact created',
            message: 'Record Id: ' + event.detail.id,
            variant: 'success'
        });
        this.dispatchEvent(evt);
    }

    contactLogin(event) {
        const contactEvent = new CustomEvent('contactlogin', {
            detail: event.detail
        });
        this.dispatchEvent(event);
    }
}