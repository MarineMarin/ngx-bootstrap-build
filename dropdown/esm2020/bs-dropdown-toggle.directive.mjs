import { ChangeDetectorRef, Directive, ElementRef, HostBinding, HostListener, Renderer2 } from '@angular/core';
import { BsDropdownState } from './bs-dropdown.state';
import { BsDropdownDirective } from './bs-dropdown.directive';
import * as i0 from "@angular/core";
import * as i1 from "./bs-dropdown.directive";
import * as i2 from "./bs-dropdown.state";
export class BsDropdownToggleDirective {
    constructor(_changeDetectorRef, _dropdown, _element, _renderer, _state) {
        this._changeDetectorRef = _changeDetectorRef;
        this._dropdown = _dropdown;
        this._element = _element;
        this._renderer = _renderer;
        this._state = _state;
        this.isOpen = false;
        this._subscriptions = [];
        // sync is open value with state
        this._subscriptions.push(this._state.isOpenChange.subscribe((value) => {
            this.isOpen = value;
            if (value) {
                this._documentClickListener = this._renderer.listen('document', 'click', (event) => {
                    if (this._state.autoClose && event.button !== 2 &&
                        !this._element.nativeElement.contains(event.target) &&
                        !(this._state.insideClick && this._dropdown._contains(event))) {
                        this._state.toggleClick.emit(false);
                        this._changeDetectorRef.detectChanges();
                    }
                });
                this._escKeyUpListener = this._renderer.listen(this._element.nativeElement, 'keyup.esc', () => {
                    if (this._state.autoClose) {
                        this._state.toggleClick.emit(false);
                        this._changeDetectorRef.detectChanges();
                    }
                });
            }
            else {
                this._documentClickListener && this._documentClickListener();
                this._escKeyUpListener && this._escKeyUpListener();
            }
        }));
        // populate disabled state
        this._subscriptions.push(this._state.isDisabledChange
            .subscribe((value) => this.isDisabled = value || void 0));
    }
    onClick(event) {
        if (this._state.stopOnClickPropagation) {
            event.stopPropagation();
        }
        if (this.isDisabled) {
            return;
        }
        this._state.toggleClick.emit(true);
    }
    ngOnDestroy() {
        if (this._documentClickListener) {
            this._documentClickListener();
        }
        if (this._escKeyUpListener) {
            this._escKeyUpListener();
        }
        for (const sub of this._subscriptions) {
            sub.unsubscribe();
        }
    }
}
BsDropdownToggleDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: BsDropdownToggleDirective, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.BsDropdownDirective }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i2.BsDropdownState }], target: i0.ɵɵFactoryTarget.Directive });
BsDropdownToggleDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.1", type: BsDropdownToggleDirective, selector: "[bsDropdownToggle],[dropdownToggle]", host: { listeners: { "click": "onClick($event)" }, properties: { "attr.aria-haspopup": "true", "attr.disabled": "this.isDisabled", "attr.aria-expanded": "this.isOpen" } }, exportAs: ["bs-dropdown-toggle"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: BsDropdownToggleDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[bsDropdownToggle],[dropdownToggle]',
                    exportAs: 'bs-dropdown-toggle',
                    // eslint-disable-next-line @angular-eslint/no-host-metadata-property
                    host: {
                        '[attr.aria-haspopup]': 'true'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i1.BsDropdownDirective }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i2.BsDropdownState }]; }, propDecorators: { isDisabled: [{
                type: HostBinding,
                args: ['attr.disabled']
            }], isOpen: [{
                type: HostBinding,
                args: ['attr.aria-expanded']
            }], onClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnMtZHJvcGRvd24tdG9nZ2xlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kcm9wZG93bi9icy1kcm9wZG93bi10b2dnbGUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixXQUFXLEVBQ1gsWUFBWSxFQUVaLFNBQVMsRUFDVixNQUFNLGVBQWUsQ0FBQztBQUd2QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7Ozs7QUFVOUQsTUFBTSxPQUFPLHlCQUF5QjtJQVFwQyxZQUNVLGtCQUFxQyxFQUNyQyxTQUE4QixFQUM5QixRQUFvQixFQUNwQixTQUFvQixFQUNwQixNQUF1QjtRQUp2Qix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW1CO1FBQ3JDLGNBQVMsR0FBVCxTQUFTLENBQXFCO1FBQzlCLGFBQVEsR0FBUixRQUFRLENBQVk7UUFDcEIsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUNwQixXQUFNLEdBQU4sTUFBTSxDQUFpQjtRQVhFLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFFMUMsbUJBQWMsR0FBbUIsRUFBRSxDQUFDO1FBVzFDLGdDQUFnQztRQUNoQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUNoQyxDQUFDLEtBQWMsRUFBRSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBRXBCLElBQUksS0FBSyxFQUFFO2dCQUNULElBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsT0FBTyxFQUFFLENBQUMsS0FBaUIsRUFBRSxFQUFFO29CQUM3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XHJcbiAgRGlyZWN0aXZlLFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgSG9zdEJpbmRpbmcsXHJcbiAgSG9zdExpc3RlbmVyLFxyXG4gIE9uRGVzdHJveSxcclxuICBSZW5kZXJlcjJcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBCc0Ryb3Bkb3duU3RhdGUgfSBmcm9tICcuL2JzLWRyb3Bkb3duLnN0YXRlJztcclxuaW1wb3J0IHsgQnNEcm9wZG93bkRpcmVjdGl2ZSB9IGZyb20gJy4vYnMtZHJvcGRvd24uZGlyZWN0aXZlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW2JzRHJvcGRvd25Ub2dnbGVdLFtkcm9wZG93blRvZ2dsZV0nLFxyXG4gIGV4cG9ydEFzOiAnYnMtZHJvcGRvd24tdG9nZ2xlJyxcclxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLWhvc3QtbWV0YWRhdGEtcHJvcGVydHlcclxuICBob3N0OiB7XHJcbiAgICAnW2F0dHIuYXJpYS1oYXNwb3B1cF0nOiAndHJ1ZSdcclxuICB9XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBCc0Ryb3Bkb3duVG9nZ2xlRGlyZWN0aXZlIGltcGxlbWVudHMgT25EZXN0cm95IHtcclxuICBASG9zdEJpbmRpbmcoJ2F0dHIuZGlzYWJsZWQnKSBpc0Rpc2FibGVkOiB1bmRlZmluZWQgfCB0cnVlO1xyXG4gIEBIb3N0QmluZGluZygnYXR0ci5hcmlhLWV4cGFuZGVkJykgaXNPcGVuID0gZmFsc2U7XHJcblxyXG4gIHByaXZhdGUgX3N1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XHJcbiAgcHJpdmF0ZSBfZG9jdW1lbnRDbGlja0xpc3RlbmVyPzogKCkgPT4gdm9pZDtcclxuICBwcml2YXRlIF9lc2NLZXlVcExpc3RlbmVyPzogKCkgPT4gdm9pZDtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIF9jaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICBwcml2YXRlIF9kcm9wZG93bjogQnNEcm9wZG93bkRpcmVjdGl2ZSxcclxuICAgIHByaXZhdGUgX2VsZW1lbnQ6IEVsZW1lbnRSZWYsXHJcbiAgICBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyLFxyXG4gICAgcHJpdmF0ZSBfc3RhdGU6IEJzRHJvcGRvd25TdGF0ZVxyXG4gICkge1xyXG4gICAgLy8gc3luYyBpcyBvcGVuIHZhbHVlIHdpdGggc3RhdGVcclxuICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMucHVzaChcclxuICAgICAgdGhpcy5fc3RhdGUuaXNPcGVuQ2hhbmdlLnN1YnNjcmliZShcclxuICAgICAgICAodmFsdWU6IGJvb2xlYW4pID0+IHtcclxuICAgICAgICAgIHRoaXMuaXNPcGVuID0gdmFsdWU7XHJcblxyXG4gICAgICAgICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2RvY3VtZW50Q2xpY2tMaXN0ZW5lciA9IHRoaXMuX3JlbmRlcmVyLmxpc3RlbignZG9jdW1lbnQnLCAnY2xpY2snLCAoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICBpZiAodGhpcy5fc3RhdGUuYXV0b0Nsb3NlICYmIGV2ZW50LmJ1dHRvbiAhPT0gMiAmJlxyXG4gICAgICAgICAgICAgICAgIXRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudC5jb250YWlucyhldmVudC50YXJnZXQpICYmXHJcbiAgICAgICAgICAgICAgICAhKHRoaXMuX3N0YXRlLmluc2lkZUNsaWNrICYmIHRoaXMuX2Ryb3Bkb3duLl9jb250YWlucyhldmVudCkpXHJcbiAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zdGF0ZS50b2dnbGVDbGljay5lbWl0KGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fZXNjS2V5VXBMaXN0ZW5lciA9IHRoaXMuX3JlbmRlcmVyLmxpc3Rlbih0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdrZXl1cC5lc2MnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgaWYgKHRoaXMuX3N0YXRlLmF1dG9DbG9zZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3RhdGUudG9nZ2xlQ2xpY2suZW1pdChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2RvY3VtZW50Q2xpY2tMaXN0ZW5lciAmJiB0aGlzLl9kb2N1bWVudENsaWNrTGlzdGVuZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5fZXNjS2V5VXBMaXN0ZW5lciAmJiB0aGlzLl9lc2NLZXlVcExpc3RlbmVyKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICApXHJcbiAgICApO1xyXG5cclxuICAgIC8vIHBvcHVsYXRlIGRpc2FibGVkIHN0YXRlXHJcbiAgICB0aGlzLl9zdWJzY3JpcHRpb25zLnB1c2goXHJcbiAgICAgIHRoaXMuX3N0YXRlLmlzRGlzYWJsZWRDaGFuZ2VcclxuICAgICAgICAuc3Vic2NyaWJlKCh2YWx1ZTogYm9vbGVhbikgPT4gdGhpcy5pc0Rpc2FibGVkID0gdmFsdWUgfHwgdm9pZCAwKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcclxuICBvbkNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5fc3RhdGUuc3RvcE9uQ2xpY2tQcm9wYWdhdGlvbikge1xyXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5pc0Rpc2FibGVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMuX3N0YXRlLnRvZ2dsZUNsaWNrLmVtaXQodHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLl9kb2N1bWVudENsaWNrTGlzdGVuZXIpIHtcclxuICAgICAgdGhpcy5fZG9jdW1lbnRDbGlja0xpc3RlbmVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuX2VzY0tleVVwTGlzdGVuZXIpIHtcclxuICAgICAgdGhpcy5fZXNjS2V5VXBMaXN0ZW5lcigpO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAoY29uc3Qgc3ViIG9mIHRoaXMuX3N1YnNjcmlwdGlvbnMpIHtcclxuICAgICAgc3ViLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==