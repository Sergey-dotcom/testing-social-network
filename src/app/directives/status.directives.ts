import { Directive, ElementRef, Renderer2, Input } from '@angular/core';

@Directive({
    selector: '[appUserStatusColor]',
})
export class StatusDirective {
    @Input() status: string | undefined;

    constructor(private elRef: ElementRef, private r: Renderer2) {}

    ngOnInit() {
        this.elRef.nativeElement.style.color = this.status === 'online' ? 'green' : 'red';
    }
}
