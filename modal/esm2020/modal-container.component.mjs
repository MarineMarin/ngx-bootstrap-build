import { Component, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { CLASS_NAME, DISMISS_REASONS, ModalOptions, TRANSITION_DURATIONS } from './modal-options.class';
import { isBs3 } from 'ngx-bootstrap/utils';
import * as i0 from "@angular/core";
import * as i1 from "./modal-options.class";
import * as i2 from "ngx-bootstrap/focus-trap";
export class ModalContainerComponent {
    constructor(options, _element, _renderer) {
        this._element = _element;
        this._renderer = _renderer;
        this.isShown = false;
        this.isAnimated = false;
        this.isModalHiding = false;
        this.clickStartedInContent = false;
        this.config = Object.assign({}, options);
    }
    ngOnInit() {
        if (this.isAnimated) {
            this._renderer.addClass(this._element.nativeElement, CLASS_NAME.FADE);
        }
        this._renderer.setStyle(this._element.nativeElement, 'display', 'block');
        setTimeout(() => {
            this.isShown = true;
            this._renderer.addClass(this._element.nativeElement, isBs3() ? CLASS_NAME.IN : CLASS_NAME.SHOW);
        }, this.isAnimated ? TRANSITION_DURATIONS.BACKDROP : 0);
        if (document && document.body) {
            if (this.bsModalService && this.bsModalService.getModalsCount() === 1) {
                this.bsModalService.checkScrollbar();
                this.bsModalService.setScrollbar();
            }
            this._renderer.addClass(document.body, CLASS_NAME.OPEN);
            this._renderer.setStyle(document.body, 'overflow-y', 'hidden');
        }
        if (this._element.nativeElement) {
            this._element.nativeElement.focus();
        }
    }
    onClickStarted(event) {
        this.clickStartedInContent = event.target !== this._element.nativeElement;
    }
    onClickStop(event) {
        const clickedInBackdrop = event.target === this._element.nativeElement && !this.clickStartedInContent;
        if (this.config.ignoreBackdropClick ||
            this.config.backdrop === 'static' ||
            !clickedInBackdrop) {
            this.clickStartedInContent = false;
            return;
        }
        this.bsModalService?.setDismissReason(DISMISS_REASONS.BACKRDOP);
        this.hide();
    }
    onPopState() {
        this.bsModalService?.setDismissReason(DISMISS_REASONS.BACK);
        this.hide();
    }
    onEsc(event) {
        if (!this.isShown) {
            return;
        }
        if (event.keyCode === 27 || event.key === 'Escape') {
            event.preventDefault();
        }
        if (this.config.keyboard &&
            this.level === this.bsModalService?.getModalsCount()) {
            this.bsModalService?.setDismissReason(DISMISS_REASONS.ESC);
            this.hide();
        }
    }
    ngOnDestroy() {
        if (this.isShown) {
            this._hide();
        }
    }
    hide() {
        if (this.isModalHiding || !this.isShown) {
            return;
        }
        if (this.config.closeInterceptor) {
            this.config.closeInterceptor().then(() => this._hide(), () => undefined);
            return;
        }
        this._hide();
    }
    _hide() {
        this.isModalHiding = true;
        this._renderer.removeClass(this._element.nativeElement, isBs3() ? CLASS_NAME.IN : CLASS_NAME.SHOW);
        setTimeout(() => {
            this.isShown = false;
            if (document &&
                document.body &&
                this.bsModalService?.getModalsCount() === 1) {
                this._renderer.removeClass(document.body, CLASS_NAME.OPEN);
                this._renderer.setStyle(document.body, 'overflow-y', '');
            }
            this.bsModalService?.hide(this.config.id);
            this.isModalHiding = false;
        }, this.isAnimated ? TRANSITION_DURATIONS.MODAL : 0);
    }
}
ModalContainerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: ModalContainerComponent, deps: [{ token: i1.ModalOptions }, { token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
ModalContainerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.1", type: ModalContainerComponent, selector: "modal-container", host: { attributes: { "role": "dialog", "tabindex": "-1" }, listeners: { "mousedown": "onClickStarted($event)", "click": "onClickStop($event)", "window:popstate": "onPopState()", "window:keydown.esc": "onEsc($event)" }, properties: { "attr.aria-modal": "true", "attr.aria-labelledby": "config.ariaLabelledBy", "attr.aria-describedby": "config.ariaDescribedby" }, classAttribute: "modal" }, ngImport: i0, template: `
    <div [class]="'modal-dialog' + (config.class ? ' ' + config.class : '')"
         role="document"
         focusTrap>
      <div class="modal-content">
        <ng-content></ng-content>
      </div>
    </div>
  `, isInline: true, directives: [{ type: i2.FocusTrapDirective, selector: "[focusTrap]", inputs: ["cdkTrapFocus", "cdkTrapFocusAutoCapture"], exportAs: ["focusTrap"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: ModalContainerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'modal-container',
                    template: `
    <div [class]="'modal-dialog' + (config.class ? ' ' + config.class : '')"
         role="document"
         focusTrap>
      <div class="modal-content">
        <ng-content></ng-content>
      </div>
    </div>
  `,
                    // eslint-disable-next-line @angular-eslint/no-host-metadata-property
                    host: {
                        class: 'modal',
                        role: 'dialog',
                        tabindex: '-1',
                        '[attr.aria-modal]': 'true',
                        '[attr.aria-labelledby]': 'config.ariaLabelledBy',
                        '[attr.aria-describedby]': 'config.ariaDescribedby'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i1.ModalOptions }, { type: i0.ElementRef }, { type: i0.Renderer2 }]; }, propDecorators: { onClickStarted: [{
                type: HostListener,
                args: ['mousedown', ['$event']]
            }], onClickStop: [{
                type: HostListener,
                args: ['click', ['$event']]
            }], onPopState: [{
                type: HostListener,
                args: ['window:popstate']
            }], onEsc: [{
                type: HostListener,
                args: ['window:keydown.esc', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtY29udGFpbmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2RhbC9tb2RhbC1jb250YWluZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFHWixTQUFTLEVBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUNMLFVBQVUsRUFDVixlQUFlLEVBQ2YsWUFBWSxFQUNaLG9CQUFvQixFQUNyQixNQUFNLHVCQUF1QixDQUFDO0FBRS9CLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7OztBQXVCNUMsTUFBTSxPQUFPLHVCQUF1QjtJQVNsQyxZQUFZLE9BQXFCLEVBQ1gsUUFBb0IsRUFDdEIsU0FBb0I7UUFEbEIsYUFBUSxHQUFSLFFBQVEsQ0FBWTtRQUN0QixjQUFTLEdBQVQsU0FBUyxDQUFXO1FBVHhDLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFFaEIsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUVYLGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLDBCQUFxQixHQUFHLEtBQUssQ0FBQztRQUtwQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFDM0IsVUFBVSxDQUFDLElBQUksQ0FDaEIsQ0FBQztTQUNIO1FBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUMzQixTQUFTLEVBQ1QsT0FBTyxDQUNSLENBQUM7UUFDRixVQUFVLENBQUMsR0FB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QUFNLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDMUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFDN0IsQ0FBQyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdkQsQ0FBQzs7b0hBdElVLHVCQUF1Qjt3R0FBdkIsdUJBQXVCLDZiQW5CeEI7Ozs7Ozs7O0dBUVQ7MkZBV1UsdUJBQXVCO2tCQXJCbkMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsaUJBQWlCO29CQUMzQixRQUFRLEVBQUU7Ozs7Ozs7O0dBUVQ7b0JBQ0QscUVBQXFFO29CQUNyRSxJQUFJLEVBQUU7d0JBQ0osS0FBSyxFQUFFLE9BQU87d0JBQ2QsSUFBSSxFQUFFLFFBQVE7d0JBQ2QsUUFBUSxFQUFFLElBQUk7d0JBQ2QsbUJBQW1CLEVBQUUsTUFBTTt3QkFDM0Isd0JBQXdCLEVBQUUsdUJBQXVCO3dCQUNqRCx5QkFBeUIsRUFBRSx3QkFBd0I7cUJBQ3BEO2lCQUNGO29KQWlEQyxjQUFjO3NCQURiLFlBQVk7dUJBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDO2dCQU1yQyxXQUFXO3NCQURWLFlBQVk7dUJBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDO2dCQWlCakMsVUFBVTtzQkFEVCxZQUFZO3VCQUFDLGlCQUFpQjtnQkFPL0IsS0FBSztzQkFESixZQUFZO3VCQUFDLG9CQUFvQixFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgRWxlbWVudFJlZixcclxuICBIb3N0TGlzdGVuZXIsXHJcbiAgT25EZXN0cm95LFxyXG4gIE9uSW5pdCxcclxuICBSZW5kZXJlcjJcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtcclxuICBDTEFTU19OQU1FLFxyXG4gIERJU01JU1NfUkVBU09OUyxcclxuICBNb2RhbE9wdGlvbnMsXHJcbiAgVFJBTlNJVElPTl9EVVJBVElPTlNcclxufSBmcm9tICcuL21vZGFsLW9wdGlvbnMuY2xhc3MnO1xyXG5pbXBvcnQgeyBCc01vZGFsU2VydmljZSB9IGZyb20gJy4vYnMtbW9kYWwuc2VydmljZSc7XHJcbmltcG9ydCB7IGlzQnMzIH0gZnJvbSAnbmd4LWJvb3RzdHJhcC91dGlscyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ21vZGFsLWNvbnRhaW5lcicsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxkaXYgW2NsYXNzXT1cIidtb2RhbC1kaWFsb2cnICsgKGNvbmZpZy5jbGFzcyA/ICcgJyArIGNvbmZpZy5jbGFzcyA6ICcnKVwiXHJcbiAgICAgICAgIHJvbGU9XCJkb2N1bWVudFwiXHJcbiAgICAgICAgIGZvY3VzVHJhcD5cclxuICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWNvbnRlbnRcIj5cclxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgYCxcclxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLWhvc3QtbWV0YWRhdGEtcHJvcGVydHlcclxuICBob3N0OiB7XHJcbiAgICBjbGFzczogJ21vZGFsJyxcclxuICAgIHJvbGU6ICdkaWFsb2cnLFxyXG4gICAgdGFiaW5kZXg6ICctMScsXHJcbiAgICAnW2F0dHIuYXJpYS1tb2RhbF0nOiAndHJ1ZScsXHJcbiAgICAnW2F0dHIuYXJpYS1sYWJlbGxlZGJ5XSc6ICdjb25maWcuYXJpYUxhYmVsbGVkQnknLFxyXG4gICAgJ1thdHRyLmFyaWEtZGVzY3JpYmVkYnldJzogJ2NvbmZpZy5hcmlhRGVzY3JpYmVkYnknXHJcbiAgfVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTW9kYWxDb250YWluZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgY29uZmlnOiBNb2RhbE9wdGlvbnM7XHJcbiAgaXNTaG93biA9IGZhbHNlO1xyXG4gIGxldmVsPzogbnVtYmVyO1xyXG4gIGlzQW5pbWF0ZWQgPSBmYWxzZTtcclxuICBic01vZGFsU2VydmljZT86IEJzTW9kYWxTZXJ2aWNlO1xyXG4gIHByaXZhdGUgaXNNb2RhbEhpZGluZyA9IGZhbHNlO1xyXG4gIHByaXZhdGUgY2xpY2tTdGFydGVkSW5Db250ZW50ID0gZmFsc2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IE1vZGFsT3B0aW9ucyxcclxuICAgICAgICAgICAgICBwcm90ZWN0ZWQgX2VsZW1lbnQ6IEVsZW1lbnRSZWYsXHJcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMikge1xyXG4gICAgdGhpcy5jb25maWcgPSBPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zKTtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuaXNBbmltYXRlZCkge1xyXG4gICAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyhcclxuICAgICAgICB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsXHJcbiAgICAgICAgQ0xBU1NfTkFNRS5GQURFXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShcclxuICAgICAgdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LFxyXG4gICAgICAnZGlzcGxheScsXHJcbiAgICAgICdibG9jaydcclxuICAgICk7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGhpcy5pc1Nob3duID0gdHJ1ZTtcclxuICAgICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3MoXHJcbiAgICAgICAgdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LFxyXG4gICAgICAgIGlzQnMzKCkgPyBDTEFTU19OQU1FLklOIDogQ0xBU1NfTkFNRS5TSE9XXHJcbiAgICAgICk7XHJcbiAgICB9LCB0aGlzLmlzQW5pbWF0ZWQgPyBUUkFOU0lUSU9OX0RVUkFUSU9OUy5CQUNLRFJPUCA6IDApO1xyXG4gICAgaWYgKGRvY3VtZW50ICYmIGRvY3VtZW50LmJvZHkpIHtcclxuICAgICAgaWYgKHRoaXMuYnNNb2RhbFNlcnZpY2UgJiYgdGhpcy5ic01vZGFsU2VydmljZS5nZXRNb2RhbHNDb3VudCgpID09PSAxKSB7XHJcbiAgICAgICAgdGhpcy5ic01vZGFsU2VydmljZS5jaGVja1Njcm9sbGJhcigpO1xyXG4gICAgICAgIHRoaXMuYnNNb2RhbFNlcnZpY2Uuc2V0U2Nyb2xsYmFyKCk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3MoZG9jdW1lbnQuYm9keSwgQ0xBU1NfTkFNRS5PUEVOKTtcclxuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoZG9jdW1lbnQuYm9keSwgJ292ZXJmbG93LXknLCAnaGlkZGVuJyk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50KSB7XHJcbiAgICAgIHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignbW91c2Vkb3duJywgWyckZXZlbnQnXSlcclxuICBvbkNsaWNrU3RhcnRlZChldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xyXG4gICAgdGhpcy5jbGlja1N0YXJ0ZWRJbkNvbnRlbnQgPSBldmVudC50YXJnZXQgIT09IHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudDtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcclxuICBvbkNsaWNrU3RvcChldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xyXG4gICAgY29uc3QgY2xpY2tlZEluQmFja2Ryb3AgPSBldmVudC50YXJnZXQgPT09IHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCAmJiAhdGhpcy5jbGlja1N0YXJ0ZWRJbkNvbnRlbnQ7XHJcbiAgICBpZiAoXHJcbiAgICAgIHRoaXMuY29uZmlnLmlnbm9yZUJhY2tkcm9wQ2xpY2sgfHxcclxuICAgICAgdGhpcy5jb25maWcuYmFja2Ryb3AgPT09ICdzdGF0aWMnIHx8XHJcbiAgICAgICFjbGlja2VkSW5CYWNrZHJvcFxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMuY2xpY2tTdGFydGVkSW5Db250ZW50ID0gZmFsc2U7XHJcblxyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLmJzTW9kYWxTZXJ2aWNlPy5zZXREaXNtaXNzUmVhc29uKERJU01JU1NfUkVBU09OUy5CQUNLUkRPUCk7XHJcbiAgICB0aGlzLmhpZGUoKTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpwb3BzdGF0ZScpXHJcbiAgb25Qb3BTdGF0ZSgpOiB2b2lkIHtcclxuICAgIHRoaXMuYnNNb2RhbFNlcnZpY2U/LnNldERpc21pc3NSZWFzb24oRElTTUlTU19SRUFTT05TLkJBQ0spO1xyXG4gICAgdGhpcy5oaWRlKCk7XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCd3aW5kb3c6a2V5ZG93bi5lc2MnLCBbJyRldmVudCddKVxyXG4gIG9uRXNjKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMuaXNTaG93bikge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDI3IHx8IGV2ZW50LmtleSA9PT0gJ0VzY2FwZScpIHtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoXHJcbiAgICAgIHRoaXMuY29uZmlnLmtleWJvYXJkICYmXHJcbiAgICAgIHRoaXMubGV2ZWwgPT09IHRoaXMuYnNNb2RhbFNlcnZpY2U/LmdldE1vZGFsc0NvdW50KClcclxuICAgICkge1xyXG4gICAgICB0aGlzLmJzTW9kYWxTZXJ2aWNlPy5zZXREaXNtaXNzUmVhc29uKERJU01JU1NfUkVBU09OUy5FU0MpO1xyXG4gICAgICB0aGlzLmhpZGUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuaXNTaG93bikge1xyXG4gICAgICB0aGlzLl9oaWRlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBoaWRlKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuaXNNb2RhbEhpZGluZyB8fCAhdGhpcy5pc1Nob3duKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5jb25maWcuY2xvc2VJbnRlcmNlcHRvcikge1xyXG4gICAgICB0aGlzLmNvbmZpZy5jbG9zZUludGVyY2VwdG9yKCkudGhlbihcclxuICAgICAgICAoKSA9PiB0aGlzLl9oaWRlKCksXHJcbiAgICAgICAgKCkgPT4gdW5kZWZpbmVkKTtcclxuXHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9oaWRlKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9oaWRlKCk6IHZvaWQge1xyXG4gICAgdGhpcy5pc01vZGFsSGlkaW5nID0gdHJ1ZTtcclxuICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKFxyXG4gICAgICB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsXHJcbiAgICAgIGlzQnMzKCkgPyBDTEFTU19OQU1FLklOIDogQ0xBU1NfTkFNRS5TSE9XXHJcbiAgICApO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHRoaXMuaXNTaG93biA9IGZhbHNlO1xyXG4gICAgICBpZiAoXHJcbiAgICAgICAgZG9jdW1lbnQgJiZcclxuICAgICAgICBkb2N1bWVudC5ib2R5ICYmXHJcbiAgICAgICAgdGhpcy5ic01vZGFsU2VydmljZT8uZ2V0TW9kYWxzQ291bnQoKSA9PT0gMVxyXG4gICAgICApIHtcclxuICAgICAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVDbGFzcyhkb2N1bWVudC5ib2R5LCBDTEFTU19OQU1FLk9QRU4pO1xyXG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKGRvY3VtZW50LmJvZHksICdvdmVyZmxvdy15JywgJycpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuYnNNb2RhbFNlcnZpY2U/LmhpZGUodGhpcy5jb25maWcuaWQpO1xyXG4gICAgICB0aGlzLmlzTW9kYWxIaWRpbmcgPSBmYWxzZTtcclxuICAgIH0sIHRoaXMuaXNBbmltYXRlZCA/IFRSQU5TSVRJT05fRFVSQVRJT05TLk1PREFMIDogMCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==