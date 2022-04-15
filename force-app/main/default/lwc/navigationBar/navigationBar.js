import { LightningElement } from 'lwc';

export default class NavigationBar extends LightningElement {

    onNavigate(clickEvent) {
        const event = new CustomEvent('navigate', {
            detail: clickEvent.target.name
        });
        this.dispatchEvent(event);
    }
}