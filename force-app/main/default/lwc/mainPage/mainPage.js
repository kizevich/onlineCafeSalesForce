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
        if(event.detail === 'menu') {
            this.menuPage = true;
            this.loginPage = false;
            this.cartPage = false;
        }
        if(event.detail === 'login') {
            this.menuPage = false;
            this.loginPage = true;
            this.cartPage = false;
        }
        if(event.detail === 'cart') {
            this.menuPage = false;
            this.loginPage = false;
            this.cartPage = true;
        }
    }

    contactLogin(event) {
        this.clientId = event.detail;
    }
    
    addToCart(event) {
        console.log('mainPage' + event.detail);
        if(!this.clientId) alert('please Log in');
        if(!this.cart) this.cart = createCart({clientId : this.clientId}); 
        console.log(this.clientId);
        console.log(this.cart);

        let product = this.products.find(product => product.Id === event.detail);
        let productSet = {Product__c: product, Count__c: 1, Cart__c: this.cart};
        let isProductSetInCart = false;

        if(this.productSets){
            this.productSets.forEach(element => {
                if(element.Product__c.Id === event.detail) {
                    element.Count__c += 1;
                    isProductSetInCart = true;
                }
            });
            if(!isProductSetInCart) {
                this.productSets.push(productSet);
            }
            this.totalPrice = 0;
            this.productSets.forEach(element => {
                this.totalPrice += (element.Product__c.Price__c * element.Count__c); 
                this.totalPrice.toFixed(2);   
            });
        } 
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