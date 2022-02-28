import { LightningElement, api } from 'lwc';

export default class DetailProductCard extends LightningElement {
    
    @api product;

    addToCart() {
        const event = new CustomEvent('selectproduct', {
            detail: this.product.Id
        });
        this.dispatchEvent(event);
        console.log('detail' + this.product.Id);
    }
}