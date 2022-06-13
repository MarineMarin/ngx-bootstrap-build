// todo: should we support enforce focus in?
// todo: in original bs there are was a way to prevent modal from showing
// todo: original modal had resize events
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2, ViewContainerRef, Optional, Inject } from '@angular/core';
import { document, window, isBs3, Utils } from 'ngx-bootstrap/utils';
import { ModalBackdropComponent } from './modal-backdrop.component';
import { CLASS_NAME, DISMISS_REASONS, modalConfigDefaults, ModalOptions, MODAL_CONFIG_DEFAULT_OVERRIDE } from './modal-options.class';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import * as i0 from "@angular/core";
import * as i1 from "ngx-bootstrap/component-loader";
import * as i2 from "./modal-options.class";
const TRANSITION_DURATION = 300;
const BACKDROP_TRANSITION_DURATION = 150;
/** Mark any code with directive to show it's content in modal */
export class ModalDirective {
    constructor(_element, _viewContainerRef, _renderer, clf, modalDefaultOption) {
        this._element = _element;
        this._renderer = _renderer;
        /** This event fires immediately when the `show` instance method is called. */
        this.onShow = new EventEmitter();
        /** This event is fired when the modal has been made visible to the user
         * (will wait for CSS transitions to complete)
         */
        this.onShown = new EventEmitter();
        /** This event is fired immediately when
         * the hide instance method has been called.
         */
        this.onHide = new EventEmitter();
        /** This event is fired when the modal has finished being
         * hidden from the user (will wait for CSS transitions to complete).
         */
        this.onHidden = new EventEmitter();
        this._isShown = false;
        this.isBodyOverflowing = false;
        this.originalBodyPadding = 0;
        this.scrollbarWidth = 0;
        this.timerHideModal = 0;
        this.timerRmBackDrop = 0;
        this.isNested = false;
        this.clickStartedInContent = false;
        this._backdrop = clf.createLoader(_element, _viewContainerRef, _renderer);
        this._config = modalDefaultOption || modalConfigDefaults;
    }
    /** allows to set modal configuration via element property */
    set config(conf) {
        this._config = this.getConfig(conf);
    }
    get config() {
        return this._config;
    }
    get isShown() {
        return this._isShown;
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
        this.dismissReason = DISMISS_REASONS.BACKRDOP;
        this.hide(event);
    }
    // todo: consider preventing default and stopping propagation
    onEsc(event) {
        if (!this._isShown) {
            return;
        }
        if (event.keyCode === 27 || event.key === 'Escape') {
            event.preventDefault();
        }
        if (this.config.keyboard) {
            this.dismissReason = DISMISS_REASONS.ESC;
            this.hide();
        }
    }
    ngOnDestroy() {
        if (this._isShown) {
            this._isShown = false;
            this.hideModal();
            this._backdrop.dispose();
        }
    }
    ngOnInit() {
        this._config = this._config || this.getConfig();
        setTimeout(() => {
            if (this._config.show) {
                this.show();
            }
        }, 0);
    }
    /* Public methods */
    /** Allows to manually toggle modal visibility */
    toggle() {
        return this._isShown ? this.hide() : this.show();
    }
    /** Allows to manually open modal */
    show() {
        this.dismissReason = void 0;
        this.onShow.emit(this);
        if (this._isShown) {
            return;
        }
        clearTimeout(this.timerHideModal);
        clearTimeout(this.timerRmBackDrop);
        this._isShown = true;
        this.checkScrollbar();
        this.setScrollbar();
        if (document && document.body) {
            if (document.body.classList.contains(CLASS_NAME.OPEN)) {
                this.isNested = true;
            }
            else {
                this._renderer.addClass(document.body, CLASS_NAME.OPEN);
                this._renderer.setStyle(document.body, 'overflow-y', 'hidden');
            }
        }
        this.showBackdrop(() => {
            this.showElement();
        });
    }
    /** Check if we can close the modal */
    hide(event) {
        if (!this._isShown) {
            return;
        }
        if (event) {
            event.preventDefault();
        }
        if (this.config.closeInterceptor) {
            this.config.closeInterceptor().then(() => this._hide(), () => undefined);
            return;
        }
        this._hide();
    }
    /** Private methods @internal */
    /**
     *  Manually close modal
     *  @internal
     */
    _hide() {
        this.onHide.emit(this);
        window.clearTimeout(this.timerHideModal);
        window.clearTimeout(this.timerRmBackDrop);
        this._isShown = false;
        this._renderer.removeClass(this._element.nativeElement, CLASS_NAME.IN);
        if (!isBs3()) {
            this._renderer.removeClass(this._element.nativeElement, CLASS_NAME.SHOW);
        }
        // this._addClassIn = false;
        if (this._config.animated) {
            this.timerHideModal = window.setTimeout(() => this.hideModal(), TRANSITION_DURATION);
        }
        else {
            this.hideModal();
        }
    }
    getConfig(config) {
        return Object.assign({}, this._config, config);
    }
    /**
     *  Show dialog
     *  @internal
     */
    showElement() {
        // todo: replace this with component loader usage
        if (!this._element.nativeElement.parentNode ||
            this._element.nativeElement.parentNode.nodeType !== Node.ELEMENT_NODE) {
            // don't move modals dom position
            if (document && document.body) {
                document.body.appendChild(this._element.nativeElement);
            }
        }
        this._renderer.setAttribute(this._element.nativeElement, 'aria-hidden', 'false');
        this._renderer.setAttribute(this._element.nativeElement, 'aria-modal', 'true');
        this._renderer.setStyle(this._element.nativeElement, 'display', 'block');
        this._renderer.setProperty(this._element.nativeElement, 'scrollTop', 0);
        if (this._config.animated) {
            Utils.reflow(this._element.nativeElement);
        }
        // this._addClassIn = true;
        this._renderer.addClass(this._element.nativeElement, CLASS_NAME.IN);
        if (!isBs3()) {
            this._renderer.addClass(this._element.nativeElement, CLASS_NAME.SHOW);
        }
        const transitionComplete = () => {
            if (this._config.focus) {
                this._element.nativeElement.focus();
            }
            this.onShown.emit(this);
        };
        if (this._config.animated) {
            setTimeout(transitionComplete, TRANSITION_DURATION);
        }
        else {
            transitionComplete();
        }
    }
    /** @internal */
    hideModal() {
        this._renderer.setAttribute(this._element.nativeElement, 'aria-hidden', 'true');
        this._renderer.setStyle(this._element.nativeElement, 'display', 'none');
        this.showBackdrop(() => {
            if (!this.isNested) {
                if (document && document.body) {
                    this._renderer.removeClass(document.body, CLASS_NAME.OPEN);
                    this._renderer.setStyle(document.body, 'overflow-y', '');
                }
                this.resetScrollbar();
            }
            this.resetAdjustments();
            this.focusOtherModal();
            this.onHidden.emit(this);
        });
    }
    // todo: original show was calling a callback when done, but we can use
    // promise
    /** @internal */
    showBackdrop(callback) {
        if (this._isShown &&
            this.config.backdrop &&
            (!this.backdrop || !this.backdrop.instance.isShown)) {
            this.removeBackdrop();
            this._backdrop
                .attach(ModalBackdropComponent)
                .to('body')
                .show({ isAnimated: this._config.animated });
            this.backdrop = this._backdrop._componentRef;
            if (!callback) {
                return;
            }
            if (!this._config.animated) {
                callback();
                return;
            }
            setTimeout(callback, BACKDROP_TRANSITION_DURATION);
        }
        else if (!this._isShown && this.backdrop) {
            this.backdrop.instance.isShown = false;
            const callbackRemove = () => {
                this.removeBackdrop();
                if (callback) {
                    callback();
                }
            };
            if (this.backdrop.instance.isAnimated) {
                this.timerRmBackDrop = window.setTimeout(callbackRemove, BACKDROP_TRANSITION_DURATION);
            }
            else {
                callbackRemove();
            }
        }
        else if (callback) {
            callback();
        }
    }
    /** @internal */
    removeBackdrop() {
        this._backdrop.hide();
    }
    /** Events tricks */
    // no need for it
    // protected setEscapeEvent():void {
    //   if (this._isShown && this._config.keyboard) {
    //     $(this._element).on(Event.KEYDOWN_DISMISS, (event) => {
    //       if (event.which === 27) {
    //         this.hide()
    //       }
    //     })
    //
    //   } else if (!this._isShown) {
    //     $(this._element).off(Event.KEYDOWN_DISMISS)
    //   }
    // }
    // protected setResizeEvent():void {
    // console.log(this.renderer.listenGlobal('', Event.RESIZE));
    // if (this._isShown) {
    //   $(window).on(Event.RESIZE, $.proxy(this._handleUpdate, this))
    // } else {
    //   $(window).off(Event.RESIZE)
    // }
    // }
    focusOtherModal() {
        if (this._element.nativeElement.parentElement == null) {
            return;
        }
        const otherOpenedModals = this._element.nativeElement.parentElement.querySelectorAll('.in[bsModal]');
        if (!otherOpenedModals.length) {
            return;
        }
        otherOpenedModals[otherOpenedModals.length - 1].focus();
    }
    /** @internal */
    resetAdjustments() {
        this._renderer.setStyle(this._element.nativeElement, 'paddingLeft', '');
        this._renderer.setStyle(this._element.nativeElement, 'paddingRight', '');
    }
    /** Scroll bar tricks */
    /** @internal */
    checkScrollbar() {
        this.isBodyOverflowing = document.body.clientWidth < window.innerWidth;
        this.scrollbarWidth = this.getScrollbarWidth();
    }
    setScrollbar() {
        if (!document) {
            return;
        }
        this.originalBodyPadding = parseInt(window
            .getComputedStyle(document.body)
            .getPropertyValue('padding-right') || 0, 10);
        if (this.isBodyOverflowing) {
            document.body.style.paddingRight = `${this.originalBodyPadding +
                this.scrollbarWidth}px`;
        }
    }
    resetScrollbar() {
        document.body.style.paddingRight = `${this.originalBodyPadding}px`;
    }
    // thx d.walsh
    getScrollbarWidth() {
        const scrollDiv = this._renderer.createElement('div');
        this._renderer.addClass(scrollDiv, CLASS_NAME.SCROLLBAR_MEASURER);
        this._renderer.appendChild(document.body, scrollDiv);
        const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        this._renderer.removeChild(document.body, scrollDiv);
        return scrollbarWidth;
    }
}
ModalDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: ModalDirective, deps: [{ token: i0.ElementRef }, { token: i0.ViewContainerRef }, { token: i0.Renderer2 }, { token: i1.ComponentLoaderFactory }, { token: MODAL_CONFIG_DEFAULT_OVERRIDE, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
ModalDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.1", type: ModalDirective, selector: "[bsModal]", inputs: { config: "config", closeInterceptor: "closeInterceptor" }, outputs: { onShow: "onShow", onShown: "onShown", onHide: "onHide", onHidden: "onHidden" }, host: { listeners: { "mousedown": "onClickStarted($event)", "mouseup": "onClickStop($event)", "keydown.esc": "onEsc($event)" } }, exportAs: ["bs-modal"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: ModalDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[bsModal]',
                    exportAs: 'bs-modal'
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ViewContainerRef }, { type: i0.Renderer2 }, { type: i1.ComponentLoaderFactory }, { type: i2.ModalOptions, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [MODAL_CONFIG_DEFAULT_OVERRIDE]
                }] }]; }, propDecorators: { config: [{
                type: Input
            }], closeInterceptor: [{
                type: Input
            }], onShow: [{
                type: Output
            }], onShown: [{
                type: Output
            }], onHide: [{
                type: Output
            }], onHidden: [{
                type: Output
            }], onClickStarted: [{
                type: HostListener,
                args: ['mousedown', ['$event']]
            }], onClickStop: [{
                type: HostListener,
                args: ['mouseup', ['$event']]
            }], onEsc: [{
                type: HostListener,
                args: ['keydown.esc', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZGFsL21vZGFsLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSw0Q0FBNEM7QUFDNUMseUVBQXlFO0FBQ3pFLHlDQUF5QztBQUV6QyxPQUFPLEVBQ1MsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFDbkQsTUFBTSxFQUFFLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUN6RSxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDckUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDcEUsT0FBTyxFQUNMLFVBQVUsRUFBRSxlQUFlLEVBQUUsbUJBQW1CLEVBQUUsWUFBWSxFQUFFLDZCQUE2QixFQUM5RixNQUFNLHVCQUF1QixDQUFDO0FBQy9CLE9BQU8sRUFBbUIsc0JBQXNCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQzs7OztBQUd6RixNQUFNLG1CQUFtQixHQUFHLEdBQUcsQ0FBQztBQUNoQyxNQUFNLDRCQUE0QixHQUFHLEdBQUcsQ0FBQztBQUV6QyxpRUFBaUU7QUFLakUsTUFBTSxPQUFPLGNBQWM7SUE0RHpCLFlBQ1UsUUFBb0IsRUFDNUIsaUJBQW1DLEVBQzNCLFNBQW9CLEVBQzVCLEdBQTJCLEVBQ3dCLGtCQUFnQztRQUozRSxhQUFRLEdBQVIsUUFBUSxDQUFZO1FBRXBCLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFqRDlCLDhFQUE4RTtRQUU5RSxXQUFNLEdBQWlDLElBQUksWUFBWSxFQUFrQixDQUFDO1FBQzFFOztXQUVHO1FBRUgsWUFBTyxHQUFpQyxJQUFJLFlBQVksRUFBa0IsQ0FBQztRQUMzRTs7V0FFRztRQUVI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OzswQkFBSSxNQUFNOzJCQUFDLDZCQUE2Qjs0Q0E5RC9DLE1BQU07c0JBRFQsS0FBSztnQkFVRyxnQkFBZ0I7c0JBQXhCLEtBQUs7Z0JBSU4sTUFBTTtzQkFETCxNQUFNO2dCQU1QLE9BQU87c0JBRE4sTUFBTTtnQkFNUCxNQUFNO3NCQURMLE1BQU07Z0JBTVAsUUFBUTtzQkFEUCxNQUFNO2dCQTZDUCxjQUFjO3NCQURiLFlBQVk7dUJBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDO2dCQU1yQyxXQUFXO3NCQURWLFlBQVk7dUJBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxDQUFDO2dCQWtCbkMsS0FBSztzQkFESixZQUFZO3VCQUFDLGFBQWEsRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHRvZG86IHNob3VsZCB3ZSBzdXBwb3J0IGVuZm9yY2UgZm9jdXMgaW4/XHJcbi8vIHRvZG86IGluIG9yaWdpbmFsIGJzIHRoZXJlIGFyZSB3YXMgYSB3YXkgdG8gcHJldmVudCBtb2RhbCBmcm9tIHNob3dpbmdcclxuLy8gdG9kbzogb3JpZ2luYWwgbW9kYWwgaGFkIHJlc2l6ZSBldmVudHNcclxuXHJcbmltcG9ydCB7XHJcbiAgQ29tcG9uZW50UmVmLCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSG9zdExpc3RlbmVyLCBJbnB1dCxcclxuICBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0LCBSZW5kZXJlcjIsIFZpZXdDb250YWluZXJSZWYsIE9wdGlvbmFsLCBJbmplY3RcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IGRvY3VtZW50LCB3aW5kb3csIGlzQnMzLCBVdGlscyB9IGZyb20gJ25neC1ib290c3RyYXAvdXRpbHMnO1xyXG5pbXBvcnQgeyBNb2RhbEJhY2tkcm9wQ29tcG9uZW50IH0gZnJvbSAnLi9tb2RhbC1iYWNrZHJvcC5jb21wb25lbnQnO1xyXG5pbXBvcnQge1xyXG4gIENMQVNTX05BTUUsIERJU01JU1NfUkVBU09OUywgbW9kYWxDb25maWdEZWZhdWx0cywgTW9kYWxPcHRpb25zLCBNT0RBTF9DT05GSUdfREVGQVVMVF9PVkVSUklERVxyXG59IGZyb20gJy4vbW9kYWwtb3B0aW9ucy5jbGFzcyc7XHJcbmltcG9ydCB7IENvbXBvbmVudExvYWRlciwgQ29tcG9uZW50TG9hZGVyRmFjdG9yeSB9IGZyb20gJ25neC1ib290c3RyYXAvY29tcG9uZW50LWxvYWRlcic7XHJcbmltcG9ydCB7IENsb3NlSW50ZXJjZXB0b3JGbiB9IGZyb20gJy4vbW9kZWxzJztcclxuXHJcbmNvbnN0IFRSQU5TSVRJT05fRFVSQVRJT04gPSAzMDA7XHJcbmNvbnN0IEJBQ0tEUk9QX1RSQU5TSVRJT05fRFVSQVRJT04gPSAxNTA7XHJcblxyXG4vKiogTWFyayBhbnkgY29kZSB3aXRoIGRpcmVjdGl2ZSB0byBzaG93IGl0J3MgY29udGVudCBpbiBtb2RhbCAqL1xyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1tic01vZGFsXScsXHJcbiAgZXhwb3J0QXM6ICdicy1tb2RhbCdcclxufSlcclxuZXhwb3J0IGNsYXNzIE1vZGFsRGlyZWN0aXZlIGltcGxlbWVudHMgT25EZXN0cm95LCBPbkluaXQge1xyXG4gIC8qKiBhbGxvd3MgdG8gc2V0IG1vZGFsIGNvbmZpZ3VyYXRpb24gdmlhIGVsZW1lbnQgcHJvcGVydHkgKi9cclxuICBASW5wdXQoKVxyXG4gIHNldCBjb25maWcoY29uZjogTW9kYWxPcHRpb25zKSB7XHJcbiAgICB0aGlzLl9jb25maWcgPSB0aGlzLmdldENvbmZpZyhjb25mKTtcclxuICB9XHJcblxyXG4gIGdldCBjb25maWcoKTogTW9kYWxPcHRpb25zIHtcclxuICAgIHJldHVybiB0aGlzLl9jb25maWc7XHJcbiAgfVxyXG5cclxuICAvKiogYWxsb3dzIHRvIHByb3ZpZGUgYSBjYWxsYmFjayB0byBpbnRlcmNlcHQgdGhlIGNsb3N1cmUgb2YgdGhlIG1vZGFsICovXHJcbiAgQElucHV0KCkgY2xvc2VJbnRlcmNlcHRvcj86IENsb3NlSW50ZXJjZXB0b3JGbjtcclxuXHJcbiAgLyoqIFRoaXMgZXZlbnQgZmlyZXMgaW1tZWRpYXRlbHkgd2hlbiB0aGUgYHNob3dgIGluc3RhbmNlIG1ldGhvZCBpcyBjYWxsZWQuICovXHJcbiAgQE91dHB1dCgpXHJcbiAgb25TaG93OiBFdmVudEVtaXR0ZXI8TW9kYWxEaXJlY3RpdmU+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb2RhbERpcmVjdGl2ZT4oKTtcclxuICAvKiogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSBtb2RhbCBoYXMgYmVlbiBtYWRlIHZpc2libGUgdG8gdGhlIHVzZXJcclxuICAgKiAod2lsbCB3YWl0IGZvciBDU1MgdHJhbnNpdGlvbnMgdG8gY29tcGxldGUpXHJcbiAgICovXHJcbiAgQE91dHB1dCgpXHJcbiAgb25TaG93bjogRXZlbnRFbWl0dGVyPE1vZGFsRGlyZWN0aXZlPiA9IG5ldyBFdmVudEVtaXR0ZXI8TW9kYWxEaXJlY3RpdmU+KCk7XHJcbiAgLyoqIFRoaXMgZXZlbnQgaXMgZmlyZWQgaW1tZWRpYXRlbHkgd2hlblxyXG4gICAqIHRoZSBoaWRlIGluc3RhbmNlIG1ldGhvZCBoYXMgYmVlbiBjYWxsZWQuXHJcbiAgICovXHJcbiAgQE91dHB1dCgpXHJcbiAgb25IaWRlOiBFdmVudEVtaXR0ZXI8TW9kYWxEaXJlY3RpdmU+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb2RhbERpcmVjdGl2ZT4oKTtcclxuICAvKiogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSBtb2RhbCBoYXMgZmluaXNoZWQgYmVpbmdcclxuICAgKiBoaWRkZW4gZnJvbSB0aGUgdXNlciAod2lsbCB3YWl0IGZvciBDU1MgdHJhbnNpdGlvbnMgdG8gY29tcGxldGUpLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKVxyXG4gIG9uSGlkZGVuOiBFdmVudEVtaXR0ZXI8TW9kYWxEaXJlY3RpdmU+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb2RhbERpcmVjdGl2ZT4oKTtcclxuXHJcbiAgLyoqIFRoaXMgZmllbGQgY29udGFpbnMgbGFzdCBkaXNtaXNzIHJlYXNvbi5cclxuICAgKiBQb3NzaWJsZSB2YWx1ZXM6IGBiYWNrZHJvcC1jbGlja2AsIGBlc2NgIGFuZCBgaWQ6IG51bWJlcmBcclxuICAgKiAoaWYgbW9kYWwgd2FzIGNsb3NlZCBieSBkaXJlY3QgY2FsbCBvZiBgLmhpZGUoKWApLlxyXG4gICAqL1xyXG4gIGRpc21pc3NSZWFzb24/OiBzdHJpbmc7XHJcblxyXG4gIGdldCBpc1Nob3duKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2lzU2hvd247XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgX2NvbmZpZzogTW9kYWxPcHRpb25zO1xyXG4gIHByb3RlY3RlZCBfaXNTaG93biA9IGZhbHNlO1xyXG5cclxuICBwcm90ZWN0ZWQgaXNCb2R5T3ZlcmZsb3dpbmcgPSBmYWxzZTtcclxuICBwcm90ZWN0ZWQgb3JpZ2luYWxCb2R5UGFkZGluZyA9IDA7XHJcbiAgcHJvdGVjdGVkIHNjcm9sbGJhcldpZHRoID0gMDtcclxuXHJcbiAgcHJvdGVjdGVkIHRpbWVySGlkZU1vZGFsID0gMDtcclxuICBwcm90ZWN0ZWQgdGltZXJSbUJhY2tEcm9wID0gMDtcclxuXHJcbiAgLy8gcmVmZXJlbmNlIHRvIGJhY2tkcm9wIGNvbXBvbmVudFxyXG4gIHByb3RlY3RlZCBiYWNrZHJvcD86IENvbXBvbmVudFJlZjxNb2RhbEJhY2tkcm9wQ29tcG9uZW50PjtcclxuICBwcml2YXRlIF9iYWNrZHJvcDogQ29tcG9uZW50TG9hZGVyPE1vZGFsQmFja2Ryb3BDb21wb25lbnQ+O1xyXG5cclxuICBwcml2YXRlIGlzTmVzdGVkID0gZmFsc2U7XHJcbiAgcHJpdmF0ZSBjbGlja1N0YXJ0ZWRJbkNvbnRlbnQgPSBmYWxzZTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIF9lbGVtZW50OiBFbGVtZW50UmVmLFxyXG4gICAgX3ZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXHJcbiAgICBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyLFxyXG4gICAgY2xmOiBDb21wb25lbnRMb2FkZXJGYWN0b3J5LFxyXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChNT0RBTF9DT05GSUdfREVGQVVMVF9PVkVSUklERSkgbW9kYWxEZWZhdWx0T3B0aW9uOiBNb2RhbE9wdGlvbnMpIHtcclxuICAgIHRoaXMuX2JhY2tkcm9wID0gY2xmLmNyZWF0ZUxvYWRlcjxNb2RhbEJhY2tkcm9wQ29tcG9uZW50PihcclxuICAgICAgX2VsZW1lbnQsXHJcbiAgICAgIF92aWV3Q29udGFpbmVyUmVmLFxyXG4gICAgICBfcmVuZGVyZXJcclxuICAgICk7XHJcbiAgICB0aGlzLl9jb25maWcgPSBtb2RhbERlZmF1bHRPcHRpb24gfHwgbW9kYWxDb25maWdEZWZhdWx0cztcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlZG93bicsIFsnJGV2ZW50J10pXHJcbiAgb25DbGlja1N0YXJ0ZWQoZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcclxuICAgIHRoaXMuY2xpY2tTdGFydGVkSW5Db250ZW50ID0gZXZlbnQudGFyZ2V0ICE9PSB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdtb3VzZXVwJywgWyckZXZlbnQnXSlcclxuICBvbkNsaWNrU3RvcChldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xyXG4gICAgY29uc3QgY2xpY2tlZEluQmFja2Ryb3AgPSBldmVudC50YXJnZXQgPT09IHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCAmJiAhdGhpcy5jbGlja1N0YXJ0ZWRJbkNvbnRlbnQ7XHJcbiAgICBpZiAoXHJcbiAgICAgIHRoaXMuY29uZmlnLmlnbm9yZUJhY2tkcm9wQ2xpY2sgfHxcclxuICAgICAgdGhpcy5jb25maWcuYmFja2Ryb3AgPT09ICdzdGF0aWMnIHx8XHJcbiAgICAgICFjbGlja2VkSW5CYWNrZHJvcFxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMuY2xpY2tTdGFydGVkSW5Db250ZW50ID0gZmFsc2U7XHJcblxyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLmRpc21pc3NSZWFzb24gPSBESVNNSVNTX1JFQVNPTlMuQkFDS1JET1A7XHJcbiAgICB0aGlzLmhpZGUoZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgLy8gdG9kbzogY29uc2lkZXIgcHJldmVudGluZyBkZWZhdWx0IGFuZCBzdG9wcGluZyBwcm9wYWdhdGlvblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24uZXNjJywgWyckZXZlbnQnXSlcclxuICBvbkVzYyhldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzLl9pc1Nob3duKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmIChldmVudC5rZXlDb2RlID09PSAyNyB8fCBldmVudC5rZXkgPT09ICdFc2NhcGUnKSB7XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuY29uZmlnLmtleWJvYXJkKSB7XHJcbiAgICAgIHRoaXMuZGlzbWlzc1JlYXNvbiA9IERJU01JU1NfUkVBU09OUy5FU0M7XHJcbiAgICAgIHRoaXMuaGlkZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICBpZiAodGhpcy5faXNTaG93bikge1xyXG4gICAgICB0aGlzLl9pc1Nob3duID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuaGlkZU1vZGFsKCk7XHJcbiAgICAgIHRoaXMuX2JhY2tkcm9wLmRpc3Bvc2UoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5fY29uZmlnID0gdGhpcy5fY29uZmlnIHx8IHRoaXMuZ2V0Q29uZmlnKCk7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgaWYgKHRoaXMuX2NvbmZpZy5zaG93KSB7XHJcbiAgICAgICAgdGhpcy5zaG93KCk7XHJcbiAgICAgIH1cclxuICAgIH0sIDApO1xyXG4gIH1cclxuXHJcbiAgLyogUHVibGljIG1ldGhvZHMgKi9cclxuXHJcbiAgLyoqIEFsbG93cyB0byBtYW51YWxseSB0b2dnbGUgbW9kYWwgdmlzaWJpbGl0eSAqL1xyXG4gIHRvZ2dsZSgpOiB2b2lkIHtcclxuICAgIHJldHVybiB0aGlzLl9pc1Nob3duID8gdGhpcy5oaWRlKCkgOiB0aGlzLnNob3coKTtcclxuICB9XHJcblxyXG4gIC8qKiBBbGxvd3MgdG8gbWFudWFsbHkgb3BlbiBtb2RhbCAqL1xyXG4gIHNob3coKTogdm9pZCB7XHJcbiAgICB0aGlzLmRpc21pc3NSZWFzb24gPSB2b2lkIDA7XHJcbiAgICB0aGlzLm9uU2hvdy5lbWl0KHRoaXMpO1xyXG4gICAgaWYgKHRoaXMuX2lzU2hvd24pIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZXJIaWRlTW9kYWwpO1xyXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZXJSbUJhY2tEcm9wKTtcclxuXHJcbiAgICB0aGlzLl9pc1Nob3duID0gdHJ1ZTtcclxuXHJcbiAgICB0aGlzLmNoZWNrU2Nyb2xsYmFyKCk7XHJcbiAgICB0aGlzLnNldFNjcm9sbGJhcigpO1xyXG5cclxuICAgIGlmIChkb2N1bWVudCAmJiBkb2N1bWVudC5ib2R5KSB7XHJcbiAgICAgIGlmIChkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5jb250YWlucyhDTEFTU19OQU1FLk9QRU4pKSB7XHJcbiAgICAgICAgdGhpcy5pc05lc3RlZCA9IHRydWU7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3MoZG9jdW1lbnQuYm9keSwgQ0xBU1NfTkFNRS5PUEVOKTtcclxuICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShkb2N1bWVudC5ib2R5LCAnb3ZlcmZsb3cteScsICdoaWRkZW4nKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc2hvd0JhY2tkcm9wKCgpID0+IHtcclxuICAgICAgdGhpcy5zaG93RWxlbWVudCgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKiogQ2hlY2sgaWYgd2UgY2FuIGNsb3NlIHRoZSBtb2RhbCAqL1xyXG4gIGhpZGUoZXZlbnQ/OiBFdmVudCk6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzLl9pc1Nob3duKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZXZlbnQpIHtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5jb25maWcuY2xvc2VJbnRlcmNlcHRvcikge1xyXG4gICAgICB0aGlzLmNvbmZpZy5jbG9zZUludGVyY2VwdG9yKCkudGhlbihcclxuICAgICAgICAoKSA9PiB0aGlzLl9oaWRlKCksXHJcbiAgICAgICAgKCkgPT4gdW5kZWZpbmVkKTtcclxuXHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9oaWRlKCk7XHJcbiAgfVxyXG5cclxuICAvKiogUHJpdmF0ZSBtZXRob2RzIEBpbnRlcm5hbCAqL1xyXG5cclxuICAvKipcclxuICAgKiAgTWFudWFsbHkgY2xvc2UgbW9kYWxcclxuICAgKiAgQGludGVybmFsXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIF9oaWRlKCk6IHZvaWQge1xyXG4gICAgdGhpcy5vbkhpZGUuZW1pdCh0aGlzKTtcclxuXHJcbiAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHRoaXMudGltZXJIaWRlTW9kYWwpO1xyXG4gICAgd2luZG93LmNsZWFyVGltZW91dCh0aGlzLnRpbWVyUm1CYWNrRHJvcCk7XHJcblxyXG4gICAgdGhpcy5faXNTaG93biA9IGZhbHNlO1xyXG4gICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LCBDTEFTU19OQU1FLklOKTtcclxuICAgIGlmICghaXNCczMoKSkge1xyXG4gICAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsIENMQVNTX05BTUUuU0hPVyk7XHJcbiAgICB9XHJcbiAgICAvLyB0aGlzLl9hZGRDbGFzc0luID0gZmFsc2U7XHJcblxyXG4gICAgaWYgKHRoaXMuX2NvbmZpZy5hbmltYXRlZCkge1xyXG4gICAgICB0aGlzLnRpbWVySGlkZU1vZGFsID0gd2luZG93LnNldFRpbWVvdXQoXHJcbiAgICAgICAgKCkgPT4gdGhpcy5oaWRlTW9kYWwoKSxcclxuICAgICAgICBUUkFOU0lUSU9OX0RVUkFUSU9OXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmhpZGVNb2RhbCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGdldENvbmZpZyhjb25maWc/OiBNb2RhbE9wdGlvbnMpOiBNb2RhbE9wdGlvbnMge1xyXG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHRoaXMuX2NvbmZpZywgY29uZmlnKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqICBTaG93IGRpYWxvZ1xyXG4gICAqICBAaW50ZXJuYWxcclxuICAgKi9cclxuICBwcm90ZWN0ZWQgc2hvd0VsZW1lbnQoKTogdm9pZCB7XHJcbiAgICAvLyB0b2RvOiByZXBsYWNlIHRoaXMgd2l0aCBjb21wb25lbnQgbG9hZGVyIHVzYWdlXHJcbiAgICBpZiAoXHJcbiAgICAgICF0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucGFyZW50Tm9kZSB8fFxyXG4gICAgICB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucGFyZW50Tm9kZS5ub2RlVHlwZSAhPT0gTm9kZS5FTEVNRU5UX05PREVcclxuICAgICkge1xyXG4gICAgICAvLyBkb24ndCBtb3ZlIG1vZGFscyBkb20gcG9zaXRpb25cclxuICAgICAgaWYgKGRvY3VtZW50ICYmIGRvY3VtZW50LmJvZHkpIHtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRBdHRyaWJ1dGUoXHJcbiAgICAgIHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCxcclxuICAgICAgJ2FyaWEtaGlkZGVuJyxcclxuICAgICAgJ2ZhbHNlJ1xyXG4gICAgKTtcclxuICAgIHRoaXMuX3JlbmRlcmVyLnNldEF0dHJpYnV0ZShcclxuICAgICAgdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LFxyXG4gICAgICAnYXJpYS1tb2RhbCcsXHJcbiAgICAgICd0cnVlJ1xyXG4gICAgKTtcclxuICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKFxyXG4gICAgICB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsXHJcbiAgICAgICdkaXNwbGF5JyxcclxuICAgICAgJ2Jsb2NrJ1xyXG4gICAgKTtcclxuICAgIHRoaXMuX3JlbmRlcmVyLnNldFByb3BlcnR5KFxyXG4gICAgICB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsXHJcbiAgICAgICdzY3JvbGxUb3AnLFxyXG4gICAgICAwXHJcbiAgICApO1xyXG5cclxuICAgIGlmICh0aGlzLl9jb25maWcuYW5pbWF0ZWQpIHtcclxuICAgICAgVXRpbHMucmVmbG93KHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdGhpcy5fYWRkQ2xhc3NJbiA9IHRydWU7XHJcbiAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyh0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsIENMQVNTX05BTUUuSU4pO1xyXG4gICAgaWYgKCFpc0JzMygpKSB7XHJcbiAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCwgQ0xBU1NfTkFNRS5TSE9XKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB0cmFuc2l0aW9uQ29tcGxldGUgPSAoKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLl9jb25maWcuZm9jdXMpIHtcclxuICAgICAgICB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLm9uU2hvd24uZW1pdCh0aGlzKTtcclxuICAgIH07XHJcblxyXG4gICAgaWYgKHRoaXMuX2NvbmZpZy5hbmltYXRlZCkge1xyXG4gICAgICBzZXRUaW1lb3V0KHRyYW5zaXRpb25Db21wbGV0ZSwgVFJBTlNJVElPTl9EVVJBVElPTik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0cmFuc2l0aW9uQ29tcGxldGUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBAaW50ZXJuYWwgKi9cclxuICBwcm90ZWN0ZWQgaGlkZU1vZGFsKCk6IHZvaWQge1xyXG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0QXR0cmlidXRlKFxyXG4gICAgICB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsXHJcbiAgICAgICdhcmlhLWhpZGRlbicsXHJcbiAgICAgICd0cnVlJ1xyXG4gICAgKTtcclxuICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKFxyXG4gICAgICB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsXHJcbiAgICAgICdkaXNwbGF5JyxcclxuICAgICAgJ25vbmUnXHJcbiAgICApO1xyXG4gICAgdGhpcy5zaG93QmFja2Ryb3AoKCkgPT4ge1xyXG4gICAgICBpZiAoIXRoaXMuaXNOZXN0ZWQpIHtcclxuICAgICAgICBpZiAoZG9jdW1lbnQgJiYgZG9jdW1lbnQuYm9keSkge1xyXG4gICAgICAgICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlQ2xhc3MoZG9jdW1lbnQuYm9keSwgQ0xBU1NfTkFNRS5PUEVOKTtcclxuICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKGRvY3VtZW50LmJvZHksICdvdmVyZmxvdy15JywgJycpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJlc2V0U2Nyb2xsYmFyKCk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5yZXNldEFkanVzdG1lbnRzKCk7XHJcbiAgICAgIHRoaXMuZm9jdXNPdGhlck1vZGFsKCk7XHJcbiAgICAgIHRoaXMub25IaWRkZW4uZW1pdCh0aGlzKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLy8gdG9kbzogb3JpZ2luYWwgc2hvdyB3YXMgY2FsbGluZyBhIGNhbGxiYWNrIHdoZW4gZG9uZSwgYnV0IHdlIGNhbiB1c2VcclxuICAvLyBwcm9taXNlXHJcbiAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gIHByb3RlY3RlZCBzaG93QmFja2Ryb3AoY2FsbGJhY2s/OiAoKSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICBpZiAoXHJcbiAgICAgIHRoaXMuX2lzU2hvd24gJiZcclxuICAgICAgdGhpcy5jb25maWcuYmFja2Ryb3AgJiZcclxuICAgICAgKCF0aGlzLmJhY2tkcm9wIHx8ICF0aGlzLmJhY2tkcm9wLmluc3RhbmNlLmlzU2hvd24pXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5yZW1vdmVCYWNrZHJvcCgpO1xyXG4gICAgICB0aGlzLl9iYWNrZHJvcFxyXG4gICAgICAgIC5hdHRhY2goTW9kYWxCYWNrZHJvcENvbXBvbmVudClcclxuICAgICAgICAudG8oJ2JvZHknKVxyXG4gICAgICAgIC5zaG93KHsgaXNBbmltYXRlZDogdGhpcy5fY29uZmlnLmFuaW1hdGVkIH0pO1xyXG4gICAgICB0aGlzLmJhY2tkcm9wID0gdGhpcy5fYmFja2Ryb3AuX2NvbXBvbmVudFJlZjtcclxuXHJcbiAgICAgIGlmICghY2FsbGJhY2spIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICghdGhpcy5fY29uZmlnLmFuaW1hdGVkKSB7XHJcbiAgICAgICAgY2FsbGJhY2soKTtcclxuXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzZXRUaW1lb3V0KGNhbGxiYWNrLCBCQUNLRFJPUF9UUkFOU0lUSU9OX0RVUkFUSU9OKTtcclxuICAgIH0gZWxzZSBpZiAoIXRoaXMuX2lzU2hvd24gJiYgdGhpcy5iYWNrZHJvcCkge1xyXG4gICAgICB0aGlzLmJhY2tkcm9wLmluc3RhbmNlLmlzU2hvd24gPSBmYWxzZTtcclxuXHJcbiAgICAgIGNvbnN0IGNhbGxiYWNrUmVtb3ZlID0gKCkgPT4ge1xyXG4gICAgICAgIHRoaXMucmVtb3ZlQmFja2Ryb3AoKTtcclxuICAgICAgICBpZiAoY2FsbGJhY2spIHtcclxuICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG5cclxuICAgICAgaWYgKHRoaXMuYmFja2Ryb3AuaW5zdGFuY2UuaXNBbmltYXRlZCkge1xyXG4gICAgICAgIHRoaXMudGltZXJSbUJhY2tEcm9wID0gd2luZG93LnNldFRpbWVvdXQoXHJcbiAgICAgICAgICBjYWxsYmFja1JlbW92ZSxcclxuICAgICAgICAgIEJBQ0tEUk9QX1RSQU5TSVRJT05fRFVSQVRJT05cclxuICAgICAgICApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNhbGxiYWNrUmVtb3ZlKCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoY2FsbGJhY2spIHtcclxuICAgICAgY2FsbGJhY2soKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBAaW50ZXJuYWwgKi9cclxuICBwcm90ZWN0ZWQgcmVtb3ZlQmFja2Ryb3AoKTogdm9pZCB7XHJcbiAgICB0aGlzLl9iYWNrZHJvcC5oaWRlKCk7XHJcbiAgfVxyXG5cclxuICAvKiogRXZlbnRzIHRyaWNrcyAqL1xyXG5cclxuICAvLyBubyBuZWVkIGZvciBpdFxyXG4gIC8vIHByb3RlY3RlZCBzZXRFc2NhcGVFdmVudCgpOnZvaWQge1xyXG4gIC8vICAgaWYgKHRoaXMuX2lzU2hvd24gJiYgdGhpcy5fY29uZmlnLmtleWJvYXJkKSB7XHJcbiAgLy8gICAgICQodGhpcy5fZWxlbWVudCkub24oRXZlbnQuS0VZRE9XTl9ESVNNSVNTLCAoZXZlbnQpID0+IHtcclxuICAvLyAgICAgICBpZiAoZXZlbnQud2hpY2ggPT09IDI3KSB7XHJcbiAgLy8gICAgICAgICB0aGlzLmhpZGUoKVxyXG4gIC8vICAgICAgIH1cclxuICAvLyAgICAgfSlcclxuICAvL1xyXG4gIC8vICAgfSBlbHNlIGlmICghdGhpcy5faXNTaG93bikge1xyXG4gIC8vICAgICAkKHRoaXMuX2VsZW1lbnQpLm9mZihFdmVudC5LRVlET1dOX0RJU01JU1MpXHJcbiAgLy8gICB9XHJcbiAgLy8gfVxyXG5cclxuICAvLyBwcm90ZWN0ZWQgc2V0UmVzaXplRXZlbnQoKTp2b2lkIHtcclxuICAvLyBjb25zb2xlLmxvZyh0aGlzLnJlbmRlcmVyLmxpc3Rlbkdsb2JhbCgnJywgRXZlbnQuUkVTSVpFKSk7XHJcbiAgLy8gaWYgKHRoaXMuX2lzU2hvd24pIHtcclxuICAvLyAgICQod2luZG93KS5vbihFdmVudC5SRVNJWkUsICQucHJveHkodGhpcy5faGFuZGxlVXBkYXRlLCB0aGlzKSlcclxuICAvLyB9IGVsc2Uge1xyXG4gIC8vICAgJCh3aW5kb3cpLm9mZihFdmVudC5SRVNJWkUpXHJcbiAgLy8gfVxyXG4gIC8vIH1cclxuXHJcbiAgcHJvdGVjdGVkIGZvY3VzT3RoZXJNb2RhbCgpIHtcclxuICAgIGlmICh0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudCA9PSBudWxsKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnN0IG90aGVyT3BlbmVkTW9kYWxzID0gdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmluW2JzTW9kYWxdJyk7XHJcbiAgICBpZiAoIW90aGVyT3BlbmVkTW9kYWxzLmxlbmd0aCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBvdGhlck9wZW5lZE1vZGFsc1tvdGhlck9wZW5lZE1vZGFscy5sZW5ndGggLSAxXS5mb2N1cygpO1xyXG4gIH1cclxuXHJcbiAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gIHByb3RlY3RlZCByZXNldEFkanVzdG1lbnRzKCk6IHZvaWQge1xyXG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoXHJcbiAgICAgIHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCxcclxuICAgICAgJ3BhZGRpbmdMZWZ0JyxcclxuICAgICAgJydcclxuICAgICk7XHJcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShcclxuICAgICAgdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LFxyXG4gICAgICAncGFkZGluZ1JpZ2h0JyxcclxuICAgICAgJydcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKiogU2Nyb2xsIGJhciB0cmlja3MgKi9cclxuICAvKiogQGludGVybmFsICovXHJcbiAgcHJvdGVjdGVkIGNoZWNrU2Nyb2xsYmFyKCk6IHZvaWQge1xyXG4gICAgdGhpcy5pc0JvZHlPdmVyZmxvd2luZyA9IGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGggPCB3aW5kb3cuaW5uZXJXaWR0aDtcclxuICAgIHRoaXMuc2Nyb2xsYmFyV2lkdGggPSB0aGlzLmdldFNjcm9sbGJhcldpZHRoKCk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgc2V0U2Nyb2xsYmFyKCk6IHZvaWQge1xyXG4gICAgaWYgKCFkb2N1bWVudCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5vcmlnaW5hbEJvZHlQYWRkaW5nID0gcGFyc2VJbnQoXHJcbiAgICAgIHdpbmRvd1xyXG4gICAgICAgIC5nZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LmJvZHkpXHJcbiAgICAgICAgLmdldFByb3BlcnR5VmFsdWUoJ3BhZGRpbmctcmlnaHQnKSB8fCAwLFxyXG4gICAgICAxMFxyXG4gICAgKTtcclxuXHJcbiAgICBpZiAodGhpcy5pc0JvZHlPdmVyZmxvd2luZykge1xyXG4gICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLnBhZGRpbmdSaWdodCA9IGAke3RoaXMub3JpZ2luYWxCb2R5UGFkZGluZyArXHJcbiAgICAgICAgdGhpcy5zY3JvbGxiYXJXaWR0aH1weGA7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgcmVzZXRTY3JvbGxiYXIoKTogdm9pZCB7XHJcbiAgICBkb2N1bWVudC5ib2R5LnN0eWxlLnBhZGRpbmdSaWdodCA9IGAke3RoaXMub3JpZ2luYWxCb2R5UGFkZGluZ31weGA7XHJcbiAgfVxyXG5cclxuICAvLyB0aHggZC53YWxzaFxyXG4gIHByb3RlY3RlZCBnZXRTY3JvbGxiYXJXaWR0aCgpOiBudW1iZXIge1xyXG4gICAgY29uc3Qgc2Nyb2xsRGl2ID0gdGhpcy5fcmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyhzY3JvbGxEaXYsIENMQVNTX05BTUUuU0NST0xMQkFSX01FQVNVUkVSKTtcclxuICAgIHRoaXMuX3JlbmRlcmVyLmFwcGVuZENoaWxkKGRvY3VtZW50LmJvZHksIHNjcm9sbERpdik7XHJcbiAgICBjb25zdCBzY3JvbGxiYXJXaWR0aCA9IHNjcm9sbERpdi5vZmZzZXRXaWR0aCAtIHNjcm9sbERpdi5jbGllbnRXaWR0aDtcclxuICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNoaWxkKGRvY3VtZW50LmJvZHksIHNjcm9sbERpdik7XHJcblxyXG4gICAgcmV0dXJuIHNjcm9sbGJhcldpZHRoO1xyXG4gIH1cclxufVxyXG4iXX0=