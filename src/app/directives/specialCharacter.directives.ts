import { Directive, HostListener, ElementRef, Input } from '@angular/core';
@Directive({
    selector: '[specialIsAlphaNumeric]'
})
export class SpecialCharacterDirective {
    @Input() isAlphaNumeric: boolean;

    constructor(private el: ElementRef) { }

    @HostListener('keypress', ['$event'])
    onKeyPress(event: any) {
        return new RegExp('^[a-zA-Z0-9_]*$').test(event.key);
    }

    @HostListener('paste', ['$event'])
    blockPaste(event: KeyboardEvent) {
        this.validateFields(event);
    }

    validateFields(event: any) {
        event.preventDefault();
        this.el.nativeElement.value = this.el.nativeElement.value.replace(/[^A-Za-z ]/g,'').replace(/\s/g, '');
    }

}