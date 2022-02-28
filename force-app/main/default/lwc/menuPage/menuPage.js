import { LightningElement, track, api } from 'lwc';

export default class MenuPage extends LightningElement {

    @api isActive;
    @api products;
    @api filteredProducts;
    @track searchValue;
    @track searchingProducts;
    @track selectedProduct;

    onSearch(event) {
        this.searchValue = event.detail.value;

        this.searchingProducts = [];

        if(this.searchValue && this.products) {
            this.products.forEach(product => {
                if(product.Name.toLowerCase().includes(this.searchValue)) this.searchingProducts.push(product);
            });

            if(this.searchingProducts) this.filteredProducts = this.searchingProducts;
            
        } else {
            this.filteredProducts = this.products;
        }
    }

    onClickCard(event) {
        this.selectedProduct = this.products.find(product => product.Id === event.detail);
    }

    addToCart(event) {
        const cartEvent = new CustomEvent('selectproduct', {
            detail: event.detail
        });
        this.dispatchEvent(cartEvent);
        console.log('menuPage' + event.detail);
    }
}