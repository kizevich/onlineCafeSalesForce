import { LightningElement, api, track } from 'lwc';
import NAME_FIELD from '@salesforce/schema/Contact.Name';
import PASSWORD from '@salesforce/schema/Contact.Password__c';

export default class RegistrationPage extends LightningElement {
    fields = [NAME_FIELD, PASSWORD];

    @api isActive;
    @api recordId;
    @api objectApiName;
    @track components = {
        login : true,
        registration : false
    }

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

    onchangeTypeLog(event) {
        this.changeVisibleComponent(event.detail);
    }

    changeVisibleComponent(componentName) {
        Object.keys(this.components).forEach(key => {
            if (key === componentName) {
                this.components[key] = true;
            } else {
                this.components[key] = false;
            }
        });
    }

    oncontactLogin(event) {
        const contactEvent = new CustomEvent('contactlogin', {
            detail: event.detail
        });
        this.dispatchEvent(contactEvent);
    }
}