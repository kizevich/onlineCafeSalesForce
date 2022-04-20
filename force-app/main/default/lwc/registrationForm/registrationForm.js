import { LightningElement, track, api } from 'lwc';
import createContact from '@salesforce/apex/ContactService.createContact';
import getContact from '@salesforce/apex/ContactService.getContact';
import { ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class RegistrationForm extends LightningElement {

    @api isActive = false;
    @track loginError;
    @track success;
    @track message;
    @track contactRecord = {
        Name : '',
        Login__c : '',
        Password__c : ''
    }

    handleNameChange(event) {
        this.contactRecord.Name = event.target.value;
    }

    handleLoginChange(event) {
        this.contactRecord.Login__c = event.target.value;
    }

    handlePasswordChange(event) {
        this.contactRecord.Password__c = event.target.value;
    }

    onRegistration() {
        if(this.titleValue === this.REGISTRATION){
            createContact({ cont : this.contactRecord })
                .then(result => {
                    this.message = result;
                    this.error = undefined;
                    if(this.message !== undefined) {
                        this.dispatchEvent(
                            new ShowToastEvent({
                                title: 'Success',
                                message: 'Contact created',
                                variant: 'success',
                            }),
                        );
                    }
                    
                    console.log(JSON.stringify(result));
                    console.log("result", this.message);
                })
                .catch(error => {
                    this.message = undefined;
                    this.error = error;
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Error creating record',
                            message: error.body.message,
                            variant: 'error',
                        }),
                    );
                    console.log("error", JSON.stringify(this.error));
                });
        } else if(this.titleValue === this.LOG_IN) {
            let contact;
            getContact({ login: this.contactRecord.Login__c })
                .then((result) => {
                    contact = result;
                    this.loginError = undefined;
                    this.success = true;
                })
                .catch((error) => {
                    contact = undefined;
                    this.loginError = error;
                    this.success = false;
                    console.log("error", JSON.stringify(this.error));
                });
            if(contact.Password__c !== this.contactRecord.Password__c) alert('Wrong login or password');
        } 
    }

    onChangeTypeLog() {
        this.dispatchEvent(new CustomEvent('changetypelog', {
            detail : 'login'
        }))
    }
}