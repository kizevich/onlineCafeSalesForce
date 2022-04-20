import { LightningElement, track, api } from 'lwc';
import getContact from '@salesforce/apex/ContactService.getContact';

export default class LoginForm extends LightningElement {

    @api isActive = false;
    @track loginError;
    @track success;
    @track message;
    @track contactRecord = {
        Name : '',
        Login__c : '',
        Password__c : ''
    }

    handleLoginChange(event) {
        this.contactRecord.Login__c = event.target.value;
    }

    handlePasswordChange(event) {
        this.contactRecord.Password__c = event.target.value;
    }

    onLogin() {
        let contact = getContact({ login: this.contactRecord.Login__c})
            .then(result =>{
                contact = result;
            });
        if (contact.Password__c === this.contactRecord.Password__c) {
            const event = new CustomEvent('login', {
                detail: contact.Id
            });
            this.dispatchEvent(event);
        } else {
            const event = new CustomEvent('login', {
                detail: 'wrong login or password'
            });
            this.dispatchEvent(event);
        }
    }

    onChangeTypeLog() {
        this.dispatchEvent(new CustomEvent('changetypelog', {
            detail : 'registration'
        }))
    }
}