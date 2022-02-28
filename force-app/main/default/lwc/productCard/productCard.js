import { LightningElement, api } from 'lwc';

export default class ProductCard extends LightningElement {

    @api product;

    cardClick() {
        const event = new CustomEvent('clickcard', {
            detail: this.product.Id
        });
        this.dispatchEvent(event);
    }
}