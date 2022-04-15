import { LightningElement, track, wire } from 'lwc';
import getProducts from '@salesforce/apex/ProductService.getProducts';
import createCart from '@salesforce/apex/CartService.createCart';

export default class MainPage extends LightningElement {

    @track menuPage;
    @track loginPage;
    @track cartPage;
    @track products = [];
    @track productSets = [];
    @track cart;
    @track totalPrice;
    @track clientId = '0035j00000KEMZTAA5';
    @track mode = 'light';
    @track components = {
        menu: true,
        login: false,
        cart: false
    }

    @wire(getProducts)
    allProducts({data,error}){
        if (data) {
            this.products = data;
            this.filteredProducts = this.products;
            console.log(data);
        } else if (error) {
        console.log(error);
        }
    }

    onNavigate(event) {
        this.changeVisibleComponent(event.detail);
        const navigateEvent = new CustomEvent('navigate', {
            detail: event.target.label
        });
        this.dispatchEvent(navigateEvent);
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

    onContactLogin(event) {
        this.clientId = event.detail;
    }
    
    addToCart(event) {
        if (!this.clientId) alert('please Log in');
        if (!this.cart) this.cart = createCart({clientId : this.clientId}); 

        const product = this.products.find(product => product.Id === event.detail);
        const productSet = {Product__c: product, Count__c: 1, Cart__c: this.cart};
        let isProductSetInCart = false;

        if (this.productSets) {
            this.productSets.forEach(element => {
                if (element.Product__c.Id === event.detail) {
                    element.Count__c += 1;
                    isProductSetInCart = true;
                }
            });
            if (!isProductSetInCart) {
                this.productSets.push(productSet);
            }
            this.totalPrice = 0;
            this.productSets.forEach(element => {
                this.totalPrice += (element.Product__c.Price__c * element.Count__c); 
                this.totalPrice.toFixed(2);   
            });
        } 
    }

    onSavedCart(event) {
        alert('cart was saved');
    }

    onChangeTheme(event) {
        if(event.target.checked) {
            this.mode = 'dark';
        } else {
            this.mode = 'light';
        }

        this.setAttribute('data-color-mode', this.mode);
    }

}