import { Directive, ElementRef, EventEmitter, Input, Output, Renderer2, ViewContainerRef } from '@angular/core';
import { PopoverConfig } from './popover.config';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { PopoverContainerComponent } from './popover-container.component';
import { PositioningService } from 'ngx-bootstrap/positioning';
import { timer } from 'rxjs';
import { parseTriggers } from 'ngx-bootstrap/utils';
import * as i0 from "@angular/core";
import * as i1 from "./popover.config";
import * as i2 from "ngx-bootstrap/component-loader";
import * as i3 from "ngx-bootstrap/positioning";
let id = 0;
/**
 * A lightweight, extensible directive for fancy popover creation.
 */
export class PopoverDirective {
    constructor(_config, _elementRef, _renderer, _viewContainerRef, cis, _positionService) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._positionService = _positionService;
        /** unique id popover - use for aria-describedby */
        this.popoverId = id++;
        /** sets disable adaptive position */
        this.adaptivePosition = true;
        /**
         * Placement of a popover. Accepts: "top", "bottom", "left", "right"
         */
        this.placement = 'top';
        /**
         * Close popover on outside click
         */
        this.outsideClick = false;
        /**
         * Specifies events that should trigger. Supports a space separated list of
         * event names.
         */
        this.triggers = 'click';
        /**
         * Css class for popover container
         */
        this.containerClass = '';
        /**
         * Delay before showing the tooltip
         */
        this.delay = 0;
        this._isInited = false;
        this._popover = cis
            .createLoader(_elementRef, _viewContainerRef, _renderer)
            .provide({ provide: PopoverConfig, useValue: _config });
        Object.assign(this, _config);
        this.onShown = this._popover.onShown;
        this.onHidden = this._popover.onHidden;
        // fix: no focus on button on Mac OS #1795
        if (typeof window !== 'undefined') {
            _elementRef.nativeElement.addEventListener('click', function () {
                try {
                    _elementRef.nativeElement.focus();
                }
                catch (err) {
                    return;
                }
            });
        }
    }
    /**
     * Returns whether or not the popover is currently being shown
     */
    get isOpen() {
        return this._popover.isShown;
    }
    set isOpen(value) {
        if (value) {
            this.show();
        }
        else {
            this.hide();
        }
    }
    /**
     * Set attribute aria-describedBy for element directive and
     * set id for the popover
     */
    setAriaDescribedBy() {
        this._ariaDescribedby = this.isOpen ? `ngx-popover-${this.popoverId}` : void 0;
        if (this._ariaDescribedby) {
            if (this._popover.instance) {
                this._popover.instance.popoverId = this._ariaDescribedby;
            }
            this._renderer.setAttribute(this._elementRef.nativeElement, 'aria-describedby', this._ariaDescribedby);
        }
        else {
            this._renderer.removeAttribute(this._elementRef.nativeElement, 'aria-describedby');
        }
    }
    /**
     * Opens an element’s popover. This is considered a “manual” triggering of
     * the popover.
     */
    show() {
        if (this._popover.isShown || !this.popover || this._delayTimeoutId) {
            return;
        }
        this._positionService.setOptions({
            modifiers: {
                flip: {
                    enabled: this.adaptivePosition
                },
                preventOverflow: {
                    enabled: this.adaptivePosition,
                    boundariesElement: this.boundariesElement || 'scrollParent'
                }
            }
        });
        const showPopover = () => {
            if (this._delayTimeoutId) {
                this._delayTimeoutId = undefined;
            }
            this._popover
                .attach(PopoverContainerComponent)
                .to(this.container)
                .position({ attachment: this.placement })
                .show({
                content: this.popover,
                context: this.popoverContext,
                placement: this.placement,
                title: this.popoverTitle,
                containerClass: this.containerClass
            });
            if (!this.adaptivePosition && this._popover._componentRef) {
                this._positionService.calcPosition();
                this._positionService.deletePositionElement(this._popover._componentRef.location);
            }
            this.isOpen = true;
            this.setAriaDescribedBy();
        };
        const cancelDelayedTooltipShowing = () => {
            if (this._popoverCancelShowFn) {
                this._popoverCancelShowFn();
            }
        };
        if (this.delay) {
            const _timer = timer(this.delay).subscribe(() => {
                showPopover();
                cancelDelayedTooltipShowing();
            });
            if (this.triggers) {
                parseTriggers(this.triggers)
                    .forEach((trigger) => {
                    if (!trigger.close) {
                        return;
                    }
                    this._popoverCancelShowFn = this._renderer.listen(this._elementRef.nativeElement, trigger.close, () => {
                        _timer.unsubscribe();
                        cancelDelayedTooltipShowing();
                    });
                });
            }
        }
        else {
            showPopover();
        }
    }
    /**
     * Closes an element’s popover. This is considered a “manual” triggering of
     * the popover.
     */
    hide() {
        if (this._delayTimeoutId) {
            clearTimeout(this._delayTimeoutId);
            this._delayTimeoutId = undefined;
        }
        if (this.isOpen) {
            this._popover.hide();
            this.setAriaDescribedBy();
            this.isOpen = false;
        }
    }
    /**
     * Toggles an element’s popover. This is considered a “manual” triggering of
     * the popover.
     */
    toggle() {
        if (this.isOpen) {
            return this.hide();
        }
        this.show();
    }
    ngOnInit() {
        // fix: seems there are an issue with `routerLinkActive`
        // which result in duplicated call ngOnInit without call to ngOnDestroy
        // read more: https://github.com/valor-software/ngx-bootstrap/issues/1885
        if (this._isInited) {
            return;
        }
        this._isInited = true;
        this._popover.listen({
            triggers: this.triggers,
            outsideClick: this.outsideClick,
            show: () => this.show(),
            hide: () => this.hide()
        });
    }
    ngOnDestroy() {
        this._popover.dispose();
    }
}
PopoverDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: PopoverDirective, deps: [{ token: i1.PopoverConfig }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i2.ComponentLoaderFactory }, { token: i3.PositioningService }], target: i0.ɵɵFactoryTarget.Directive });
PopoverDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.1", type: PopoverDirective, selector: "[popover]", inputs: { adaptivePosition: "adaptivePosition", boundariesElement: "boundariesElement", popover: "popover", popoverContext: "popoverContext", popoverTitle: "popoverTitle", placement: "placement", outsideClick: "outsideClick", triggers: "triggers", container: "container", containerClass: "containerClass", isOpen: "isOpen", delay: "delay" }, outputs: { onShown: "onShown", onHidden: "onHidden" }, exportAs: ["bs-popover"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: PopoverDirective, decorators: [{
            type: Directive,
            args: [{ selector: '[popover]', exportAs: 'bs-popover' }]
        }], ctorParameters: function () { return [{ type: i1.PopoverConfig }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i2.ComponentLoaderFactory }, { type: i3.PositioningService }]; }, propDecorators: { adaptivePosition: [{
                type: Input
            }], boundariesElement: [{
                type: Input
            }], popover: [{
                type: Input
            }], popoverContext: [{
                type: Input
            }], popoverTitle: [{
                type: Input
            }], placement: [{
                type: Input
            }], outsideClick: [{
                type: Input
            }], triggers: [{
                type: Input
            }], container: [{
                type: Input
            }], containerClass: [{
                type: Input
            }], isOpen: [{
                type: Input
            }], delay: [{
                type: Input
            }], onShown: [{
                type: Output
            }], onHidden: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvcG9wb3Zlci9wb3BvdmVyLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQ3JFLFNBQVMsRUFBZSxnQkFBZ0IsRUFDekMsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBbUIsc0JBQXNCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUN6RixPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUMxRSxPQUFPLEVBQUUsa0JBQWtCLEVBQXVCLE1BQU0sMkJBQTJCLENBQUM7QUFDcEYsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM3QixPQUFPLEVBQUUsYUFBYSxFQUFXLE1BQU0scUJBQXFCLENBQUM7Ozs7O0FBRTdELElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztBQUVYOztHQUVHO0FBRUgsTUFBTSxPQUFPLGdCQUFnQjtJQWtGM0IsWUFDRSxPQUFzQixFQUNkLFdBQXVCLEVBQ3ZCLFNBQW9CLEVBQzVCLGlCQUFtQyxFQUNuQyxHQUEyQixFQUNuQixnQkFBb0M7UUFKcEMsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFDdkIsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUdwQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQW9CO1FBdkY5QyxtREFBbUQ7UUFDbkQsY0FBUyxHQUFHLEVBQUUsRUFBRSxDQUFDO1FBQ2pCLHFDQUFxQztRQUM1QixxQkFBZ0IsR0FBRyxJQUFJLENBQUM7UUFpQmpDOztXQUVHO1FBQ00sY0FBUyxHQUF3QixLQUFLLENBQUM7UUFDaEQ7O1dBRUc7UUFDTSxpQkFBWSxHQUFHLEtBQUss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RGlyZWN0aXZlLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0LFxyXG4gIFJlbmRlcmVyMiwgVGVtcGxhdGVSZWYsIFZpZXdDb250YWluZXJSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUG9wb3ZlckNvbmZpZyB9IGZyb20gJy4vcG9wb3Zlci5jb25maWcnO1xyXG5pbXBvcnQgeyBDb21wb25lbnRMb2FkZXIsIENvbXBvbmVudExvYWRlckZhY3RvcnkgfSBmcm9tICduZ3gtYm9vdHN0cmFwL2NvbXBvbmVudC1sb2FkZXInO1xyXG5pbXBvcnQgeyBQb3BvdmVyQ29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi9wb3BvdmVyLWNvbnRhaW5lci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBQb3NpdGlvbmluZ1NlcnZpY2UsIEF2YWlsYmxlQlNQb3NpdGlvbnMgfSBmcm9tICduZ3gtYm9vdHN0cmFwL3Bvc2l0aW9uaW5nJztcclxuaW1wb3J0IHsgdGltZXIgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgcGFyc2VUcmlnZ2VycywgVHJpZ2dlciB9IGZyb20gJ25neC1ib290c3RyYXAvdXRpbHMnO1xyXG5cclxubGV0IGlkID0gMDtcclxuXHJcbi8qKlxyXG4gKiBBIGxpZ2h0d2VpZ2h0LCBleHRlbnNpYmxlIGRpcmVjdGl2ZSBmb3IgZmFuY3kgcG9wb3ZlciBjcmVhdGlvbi5cclxuICovXHJcbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnW3BvcG92ZXJdJywgZXhwb3J0QXM6ICdicy1wb3BvdmVyJ30pXHJcbmV4cG9ydCBjbGFzcyBQb3BvdmVyRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gIC8qKiB1bmlxdWUgaWQgcG9wb3ZlciAtIHVzZSBmb3IgYXJpYS1kZXNjcmliZWRieSAqL1xyXG4gIHBvcG92ZXJJZCA9IGlkKys7XHJcbiAgLyoqIHNldHMgZGlzYWJsZSBhZGFwdGl2ZSBwb3NpdGlvbiAqL1xyXG4gIEBJbnB1dCgpIGFkYXB0aXZlUG9zaXRpb24gPSB0cnVlO1xyXG5cclxuICBASW5wdXQoKSBib3VuZGFyaWVzRWxlbWVudD86ICgndmlld3BvcnQnIHwgJ3Njcm9sbFBhcmVudCcgfCAnd2luZG93Jyk7XHJcbiAgLyoqXHJcbiAgICogQ29udGVudCB0byBiZSBkaXNwbGF5ZWQgYXMgcG9wb3Zlci5cclxuICAgKi9cclxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxyXG4gIEBJbnB1dCgpIHBvcG92ZXI/OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+O1xyXG4gIC8qKlxyXG4gICAqIENvbnRleHQgdG8gYmUgdXNlZCBpZiBwb3BvdmVyIGlzIGEgdGVtcGxhdGUuXHJcbiAgICovXHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuICBASW5wdXQoKSBwb3BvdmVyQ29udGV4dDogYW55O1xyXG4gIC8qKlxyXG4gICAqIFRpdGxlIG9mIGEgcG9wb3Zlci5cclxuICAgKi9cclxuICBASW5wdXQoKSBwb3BvdmVyVGl0bGU/OiBzdHJpbmc7XHJcbiAgLyoqXHJcbiAgICogUGxhY2VtZW50IG9mIGEgcG9wb3Zlci4gQWNjZXB0czogXCJ0b3BcIiwgXCJib3R0b21cIiwgXCJsZWZ0XCIsIFwicmlnaHRcIlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHBsYWNlbWVudDogQXZhaWxibGVCU1Bvc2l0aW9ucyA9ICd0b3AnO1xyXG4gIC8qKlxyXG4gICAqIENsb3NlIHBvcG92ZXIgb24gb3V0c2lkZSBjbGlja1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG91dHNpZGVDbGljayA9IGZhbHNlO1xyXG4gIC8qKlxyXG4gICAqIFNwZWNpZmllcyBldmVudHMgdGhhdCBzaG91bGQgdHJpZ2dlci4gU3VwcG9ydHMgYSBzcGFjZSBzZXBhcmF0ZWQgbGlzdCBvZlxyXG4gICAqIGV2ZW50IG5hbWVzLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHRyaWdnZXJzID0gJ2NsaWNrJztcclxuICAvKipcclxuICAgKiBBIHNlbGVjdG9yIHNwZWNpZnlpbmcgdGhlIGVsZW1lbnQgdGhlIHBvcG92ZXIgc2hvdWxkIGJlIGFwcGVuZGVkIHRvLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGNvbnRhaW5lcj86IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogQ3NzIGNsYXNzIGZvciBwb3BvdmVyIGNvbnRhaW5lclxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGNvbnRhaW5lckNsYXNzID0gJyc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhlIHBvcG92ZXIgaXMgY3VycmVudGx5IGJlaW5nIHNob3duXHJcbiAgICovXHJcbiAgQElucHV0KClcclxuICBnZXQgaXNPcGVuKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX3BvcG92ZXIuaXNTaG93bjtcclxuICB9XHJcblxyXG4gIHNldCBpc09wZW4odmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICB0aGlzLnNob3coKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaGlkZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGVsYXkgYmVmb3JlIHNob3dpbmcgdGhlIHRvb2x0aXBcclxuICAgKi9cclxuICBASW5wdXQoKSBkZWxheSA9IDA7XHJcblxyXG4gIC8qKlxyXG4gICAqIEVtaXRzIGFuIGV2ZW50IHdoZW4gdGhlIHBvcG92ZXIgaXMgc2hvd25cclxuICAgKi9cclxuICBAT3V0cHV0KCkgb25TaG93bjogRXZlbnRFbWl0dGVyPHVua25vd24+O1xyXG4gIC8qKlxyXG4gICAqIEVtaXRzIGFuIGV2ZW50IHdoZW4gdGhlIHBvcG92ZXIgaXMgaGlkZGVuXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIG9uSGlkZGVuOiBFdmVudEVtaXR0ZXI8dW5rbm93bj47XHJcblxyXG4gIHByb3RlY3RlZCBfcG9wb3ZlckNhbmNlbFNob3dGbj86ICgpID0+IHZvaWQ7XHJcblxyXG4gIHByb3RlY3RlZCBfZGVsYXlUaW1lb3V0SWQ/OiBudW1iZXI7XHJcblxyXG4gIHByaXZhdGUgX3BvcG92ZXI6IENvbXBvbmVudExvYWRlcjxQb3BvdmVyQ29udGFpbmVyQ29tcG9uZW50PjtcclxuICBwcml2YXRlIF9pc0luaXRlZCA9IGZhbHNlO1xyXG4gIHByaXZhdGUgX2FyaWFEZXNjcmliZWRieT86IHN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBfY29uZmlnOiBQb3BvdmVyQ29uZmlnLFxyXG4gICAgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZixcclxuICAgIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIsXHJcbiAgICBfdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcclxuICAgIGNpczogQ29tcG9uZW50TG9hZGVyRmFjdG9yeSxcclxuICAgIHByaXZhdGUgX3Bvc2l0aW9uU2VydmljZTogUG9zaXRpb25pbmdTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICB0aGlzLl9wb3BvdmVyID0gY2lzXHJcbiAgICAgIC5jcmVhdGVMb2FkZXI8UG9wb3ZlckNvbnRhaW5lckNvbXBvbmVudD4oXHJcbiAgICAgICAgX2VsZW1lbnRSZWYsXHJcbiAgICAgICAgX3ZpZXdDb250YWluZXJSZWYsXHJcbiAgICAgICAgX3JlbmRlcmVyXHJcbiAgICAgIClcclxuICAgICAgLnByb3ZpZGUoe3Byb3ZpZGU6IFBvcG92ZXJDb25maWcsIHVzZVZhbHVlOiBfY29uZmlnfSk7XHJcblxyXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBfY29uZmlnKTtcclxuXHJcbiAgICB0aGlzLm9uU2hvd24gPSB0aGlzLl9wb3BvdmVyLm9uU2hvd247XHJcbiAgICB0aGlzLm9uSGlkZGVuID0gdGhpcy5fcG9wb3Zlci5vbkhpZGRlbjtcclxuXHJcbiAgICAvLyBmaXg6IG5vIGZvY3VzIG9uIGJ1dHRvbiBvbiBNYWMgT1MgIzE3OTVcclxuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICBfZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICBfZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldCBhdHRyaWJ1dGUgYXJpYS1kZXNjcmliZWRCeSBmb3IgZWxlbWVudCBkaXJlY3RpdmUgYW5kXHJcbiAgICogc2V0IGlkIGZvciB0aGUgcG9wb3ZlclxyXG4gICAqL1xyXG4gIHNldEFyaWFEZXNjcmliZWRCeSgpOiB2b2lkIHtcclxuICAgIHRoaXMuX2FyaWFEZXNjcmliZWRieSA9IHRoaXMuaXNPcGVuID8gYG5neC1wb3BvdmVyLSR7dGhpcy5wb3BvdmVySWR9YCA6IHZvaWQgMDtcclxuICAgIGlmICh0aGlzLl9hcmlhRGVzY3JpYmVkYnkpIHtcclxuICAgICAgaWYgKHRoaXMuX3BvcG92ZXIuaW5zdGFuY2UpIHtcclxuICAgICAgICB0aGlzLl9wb3BvdmVyLmluc3RhbmNlLnBvcG92ZXJJZCA9IHRoaXMuX2FyaWFEZXNjcmliZWRieTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnYXJpYS1kZXNjcmliZWRieScsIHRoaXMuX2FyaWFEZXNjcmliZWRieSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVBdHRyaWJ1dGUodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnYXJpYS1kZXNjcmliZWRieScpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogT3BlbnMgYW4gZWxlbWVudOKAmXMgcG9wb3Zlci4gVGhpcyBpcyBjb25zaWRlcmVkIGEg4oCcbWFudWFs4oCdIHRyaWdnZXJpbmcgb2ZcclxuICAgKiB0aGUgcG9wb3Zlci5cclxuICAgKi9cclxuICBzaG93KCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuX3BvcG92ZXIuaXNTaG93biB8fCAhdGhpcy5wb3BvdmVyIHx8IHRoaXMuX2RlbGF5VGltZW91dElkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9wb3NpdGlvblNlcnZpY2Uuc2V0T3B0aW9ucyh7XHJcbiAgICAgIG1vZGlmaWVyczoge1xyXG4gICAgICAgIGZsaXA6IHtcclxuICAgICAgICAgIGVuYWJsZWQ6IHRoaXMuYWRhcHRpdmVQb3NpdGlvblxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcHJldmVudE92ZXJmbG93OiB7XHJcbiAgICAgICAgICBlbmFibGVkOiB0aGlzLmFkYXB0aXZlUG9zaXRpb24sXHJcbiAgICAgICAgICBib3VuZGFyaWVzRWxlbWVudDogdGhpcy5ib3VuZGFyaWVzRWxlbWVudCB8fCAnc2Nyb2xsUGFyZW50JyBcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHNob3dQb3BvdmVyID0gKCkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5fZGVsYXlUaW1lb3V0SWQpIHtcclxuICAgICAgICB0aGlzLl9kZWxheVRpbWVvdXRJZCA9IHVuZGVmaW5lZDtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5fcG9wb3ZlclxyXG4gICAgICAgIC5hdHRhY2goUG9wb3ZlckNvbnRhaW5lckNvbXBvbmVudClcclxuICAgICAgICAudG8odGhpcy5jb250YWluZXIpXHJcbiAgICAgICAgLnBvc2l0aW9uKHthdHRhY2htZW50OiB0aGlzLnBsYWNlbWVudH0pXHJcbiAgICAgICAgLnNob3coe1xyXG4gICAgICAgICAgY29udGVudDogdGhpcy5wb3BvdmVyLFxyXG4gICAgICAgICAgY29udGV4dDogdGhpcy5wb3BvdmVyQ29udGV4dCxcclxuICAgICAgICAgIHBsYWNlbWVudDogdGhpcy5wbGFjZW1lbnQsXHJcbiAgICAgICAgICB0aXRsZTogdGhpcy5wb3BvdmVyVGl0bGUsXHJcbiAgICAgICAgICBjb250YWluZXJDbGFzczogdGhpcy5jb250YWluZXJDbGFzc1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgaWYgKCF0aGlzLmFkYXB0aXZlUG9zaXRpb24gJiYgdGhpcy5fcG9wb3Zlci5fY29tcG9uZW50UmVmKSB7XHJcbiAgICAgICAgdGhpcy5fcG9zaXRpb25TZXJ2aWNlLmNhbGNQb3NpdGlvbigpO1xyXG4gICAgICAgIHRoaXMuX3Bvc2l0aW9uU2VydmljZS5kZWxldGVQb3NpdGlvbkVsZW1lbnQodGhpcy5fcG9wb3Zlci5fY29tcG9uZW50UmVmLmxvY2F0aW9uKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5pc09wZW4gPSB0cnVlO1xyXG4gICAgICB0aGlzLnNldEFyaWFEZXNjcmliZWRCeSgpO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBjYW5jZWxEZWxheWVkVG9vbHRpcFNob3dpbmcgPSAoKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLl9wb3BvdmVyQ2FuY2VsU2hvd0ZuKSB7XHJcbiAgICAgICAgdGhpcy5fcG9wb3ZlckNhbmNlbFNob3dGbigpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGlmICh0aGlzLmRlbGF5KSB7XHJcbiAgICAgIGNvbnN0IF90aW1lciA9IHRpbWVyKHRoaXMuZGVsYXkpLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgc2hvd1BvcG92ZXIoKTtcclxuICAgICAgICBjYW5jZWxEZWxheWVkVG9vbHRpcFNob3dpbmcoKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpZiAodGhpcy50cmlnZ2Vycykge1xyXG4gICAgICAgIHBhcnNlVHJpZ2dlcnModGhpcy50cmlnZ2VycylcclxuICAgICAgICAgIC5mb3JFYWNoKCh0cmlnZ2VyOiBUcmlnZ2VyKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghdHJpZ2dlci5jbG9zZSkge1xyXG4gICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5fcG9wb3ZlckNhbmNlbFNob3dGbiA9IHRoaXMuX3JlbmRlcmVyLmxpc3RlbihcclxuICAgICAgICAgICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsXHJcbiAgICAgICAgICAgICAgdHJpZ2dlci5jbG9zZSxcclxuICAgICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBfdGltZXIudW5zdWJzY3JpYmUoKTtcclxuICAgICAgICAgICAgICAgIGNhbmNlbERlbGF5ZWRUb29sdGlwU2hvd2luZygpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzaG93UG9wb3ZlcigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2xvc2VzIGFuIGVsZW1lbnTigJlzIHBvcG92ZXIuIFRoaXMgaXMgY29uc2lkZXJlZCBhIOKAnG1hbnVhbOKAnSB0cmlnZ2VyaW5nIG9mXHJcbiAgICogdGhlIHBvcG92ZXIuXHJcbiAgICovXHJcbiAgaGlkZSgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLl9kZWxheVRpbWVvdXRJZCkge1xyXG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5fZGVsYXlUaW1lb3V0SWQpO1xyXG4gICAgICB0aGlzLl9kZWxheVRpbWVvdXRJZCA9IHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5pc09wZW4pIHtcclxuICAgICAgdGhpcy5fcG9wb3Zlci5oaWRlKCk7XHJcbiAgICAgIHRoaXMuc2V0QXJpYURlc2NyaWJlZEJ5KCk7XHJcbiAgICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUb2dnbGVzIGFuIGVsZW1lbnTigJlzIHBvcG92ZXIuIFRoaXMgaXMgY29uc2lkZXJlZCBhIOKAnG1hbnVhbOKAnSB0cmlnZ2VyaW5nIG9mXHJcbiAgICogdGhlIHBvcG92ZXIuXHJcbiAgICovXHJcbiAgdG9nZ2xlKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuaXNPcGVuKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmhpZGUoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNob3coKTtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgLy8gZml4OiBzZWVtcyB0aGVyZSBhcmUgYW4gaXNzdWUgd2l0aCBgcm91dGVyTGlua0FjdGl2ZWBcclxuICAgIC8vIHdoaWNoIHJlc3VsdCBpbiBkdXBsaWNhdGVkIGNhbGwgbmdPbkluaXQgd2l0aG91dCBjYWxsIHRvIG5nT25EZXN0cm95XHJcbiAgICAvLyByZWFkIG1vcmU6IGh0dHBzOi8vZ2l0aHViLmNvbS92YWxvci1zb2Z0d2FyZS9uZ3gtYm9vdHN0cmFwL2lzc3Vlcy8xODg1XHJcbiAgICBpZiAodGhpcy5faXNJbml0ZWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy5faXNJbml0ZWQgPSB0cnVlO1xyXG5cclxuICAgIHRoaXMuX3BvcG92ZXIubGlzdGVuKHtcclxuICAgICAgdHJpZ2dlcnM6IHRoaXMudHJpZ2dlcnMsXHJcbiAgICAgIG91dHNpZGVDbGljazogdGhpcy5vdXRzaWRlQ2xpY2ssXHJcbiAgICAgIHNob3c6ICgpID0+IHRoaXMuc2hvdygpLFxyXG4gICAgICBoaWRlOiAoKSA9PiB0aGlzLmhpZGUoKVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIHRoaXMuX3BvcG92ZXIuZGlzcG9zZSgpO1xyXG4gIH1cclxufVxyXG4iXX0=