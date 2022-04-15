import { LightningElement, api, track } from 'lwc';
import updateCart from '@salesforce/apex/CartService.updateCart';
import saveProductSets from '@salesforce/apex/PsoductSetService.saveProductSets';

export default class ShoppingCart extends LightningElement {

    @api isActive;
    @api productSets;
    @api cart;
    @api totalPrice;
    @track productSetsToSave = [];
    @track updateError;
    @track saveError;
    @track success;

    saveOrder() {
        if(this.cart){
            this.cart.Status__c = 'Closed';
            this.cart.Creation_Date__c = Date.now;
            this.cart.Full_Price__c = this.totalPrice;

            updateCart({ cart: this.cart })
                .then((result) => {
                    this.cart = result;
                    this.updateError = undefined;
                    this.success = true;
                })
                .catch((error) => {
                    this.success = false;
                    this.cart = undefined;
                    this.updateError = error;
                })
            
        }

        if(!this.productSetsToSave) return;
        
        this.productSets.forEach(element => {
            let productSet = {Product__c: element.Product__c.Id, Count__c: element.Count__c, Cart__c: element.Cart__c.Id };
            this.productSetsToSave.push(productSet);
        });
        console.log(this.productSets[0]);
        saveProductSets({ productSets: this.productSetsToSave})
            .then((result) => {
                this.productSetsToSave = result;
                this.saveError = undefined;
                this.success = true;
            })
            .catch((error) => {
                this.productSetsToSave = undefined;
                this.saveError = error;
                this.success = false;
            });
        console.log(this.success);
        console.log(this.saveError);
        if (this.success) {
            const cartEvent = new CustomEvent('cartsaved', {
                detail: this.cart
            });
            this.dispatchEvent(cartEvent);
        }
    }

}