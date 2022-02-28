import { LightningElement } from 'lwc';

export default class NavigationBar extends LightningElement {

    onClickMenu(clickEvent) {
        const event = new CustomEvent('navigate', {
            detail: 'menu'
        });
        this.dispatchEvent(event);
    }

    onClickLogin(clickEvent) {
        const event = new CustomEvent('navigate', {
            detail: 'login'
        });
        this.dispatchEvent(event);
    }

    onClickCart(clickEvent) {
        const event = new CustomEvent('navigate', {
            detail: 'cart'
        });
        this.dispatchEvent(event);
    }
}