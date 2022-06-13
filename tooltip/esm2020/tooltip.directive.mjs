import { __decorate, __metadata } from "tslib";
import { Directive, ElementRef, EventEmitter, Input, Output, Renderer2, ViewContainerRef } from '@angular/core';
import { TooltipContainerComponent } from './tooltip-container.component';
import { TooltipConfig } from './tooltip.config';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { OnChange, warnOnce, parseTriggers } from 'ngx-bootstrap/utils';
import { PositioningService } from 'ngx-bootstrap/positioning';
import { timer } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "ngx-bootstrap/component-loader";
import * as i2 from "./tooltip.config";
import * as i3 from "ngx-bootstrap/positioning";
let id = 0;
export class TooltipDirective {
    constructor(_viewContainerRef, cis, config, _elementRef, _renderer, _positionService) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._positionService = _positionService;
        this.tooltipId = id++;
        /** sets disable adaptive position */
        this.adaptivePosition = true;
        /** Fired when tooltip content changes */
        this.tooltipChange = new EventEmitter();
        /**
         * Placement of a tooltip. Accepts: "top", "bottom", "left", "right"
         */
        this.placement = 'top';
        /**
         * Specifies events that should trigger. Supports a space separated list of
         * event names.
         */
        this.triggers = 'hover focus';
        /**
         * Css class for tooltip container
         */
        this.containerClass = '';
        /**
         * Allows to disable tooltip
         */
        this.isDisabled = false;
        /**
         * Delay before showing the tooltip
         */
        this.delay = 0;
        /** @deprecated - removed, will be added to configuration */
        this.tooltipAnimation = true;
        /** @deprecated */
        this.tooltipFadeDuration = 150;
        /** @deprecated */
        this.tooltipStateChanged = new EventEmitter();
        this._tooltip = cis
            .createLoader(this._elementRef, _viewContainerRef, this._renderer)
            .provide({ provide: TooltipConfig, useValue: config });
        Object.assign(this, config);
        this.onShown = this._tooltip.onShown;
        this.onHidden = this._tooltip.onHidden;
    }
    /**
     * Returns whether or not the tooltip is currently being shown
     */
    get isOpen() {
        return this._tooltip.isShown;
    }
    set isOpen(value) {
        if (value) {
            this.show();
        }
        else {
            this.hide();
        }
    }
    /** @deprecated - please use `tooltip` instead */
    set htmlContent(value) {
        warnOnce('tooltipHtml was deprecated, please use `tooltip` instead');
        this.tooltip = value;
    }
    /** @deprecated - please use `placement` instead */
    // eslint-disable-next-line @angular-eslint/no-input-rename
    set _placement(value) {
        warnOnce('tooltipPlacement was deprecated, please use `placement` instead');
        this.placement = value;
    }
    /** @deprecated - please use `isOpen` instead */
    // eslint-disable-next-line @angular-eslint/no-input-rename
    set _isOpen(value) {
        warnOnce('tooltipIsOpen was deprecated, please use `isOpen` instead');
        this.isOpen = value;
    }
    get _isOpen() {
        warnOnce('tooltipIsOpen was deprecated, please use `isOpen` instead');
        return this.isOpen;
    }
    /** @deprecated - please use `isDisabled` instead */
    // eslint-disable-next-line @angular-eslint/no-input-rename
    set _enable(value) {
        warnOnce('tooltipEnable was deprecated, please use `isDisabled` instead');
        this.isDisabled = !value;
    }
    get _enable() {
        warnOnce('tooltipEnable was deprecated, please use `isDisabled` instead');
        return this.isDisabled;
    }
    /** @deprecated - please use `container="body"` instead */
    // eslint-disable-next-line @angular-eslint/no-input-rename
    set _appendToBody(value) {
        warnOnce('tooltipAppendToBody was deprecated, please use `container="body"` instead');
        this.container = value ? 'body' : this.container;
    }
    get _appendToBody() {
        warnOnce('tooltipAppendToBody was deprecated, please use `container="body"` instead');
        return this.container === 'body';
    }
    /** @deprecated - will replaced with customClass */
    // eslint-disable-next-line @angular-eslint/no-input-rename
    set _popupClass(value) {
        warnOnce('tooltipClass deprecated');
    }
    /** @deprecated - removed */
    // eslint-disable-next-line @angular-eslint/no-input-rename
    set _tooltipContext(value) {
        warnOnce('tooltipContext deprecated');
    }
    /** @deprecated */
    // eslint-disable-next-line @angular-eslint/no-input-rename
    set _tooltipPopupDelay(value) {
        warnOnce('tooltipPopupDelay is deprecated, use `delay` instead');
        this.delay = value;
    }
    /** @deprecated -  please use `triggers` instead */
    get _tooltipTrigger() {
        warnOnce('tooltipTrigger was deprecated, please use `triggers` instead');
        return this.triggers;
    }
    set _tooltipTrigger(value) {
        warnOnce('tooltipTrigger was deprecated, please use `triggers` instead');
        this.triggers = (value || '').toString();
    }
    ngOnInit() {
        this._tooltip.listen({
            triggers: this.triggers,
            show: () => this.show()
        });
        this.tooltipChange.subscribe((value) => {
            if (!value) {
                this._tooltip.hide();
            }
        });
        this.onShown.subscribe(() => {
            this.setAriaDescribedBy();
        });
        this.onHidden.subscribe(() => {
            this.setAriaDescribedBy();
        });
    }
    setAriaDescribedBy() {
        this._ariaDescribedby = this.isOpen ? `tooltip-${this.tooltipId}` : void 0;
        if (this._ariaDescribedby) {
            this._renderer.setAttribute(this._elementRef.nativeElement, 'aria-describedby', this._ariaDescribedby);
        }
        else {
            this._renderer.removeAttribute(this._elementRef.nativeElement, 'aria-describedby');
        }
    }
    /**
     * Toggles an element’s tooltip. This is considered a “manual” triggering of
     * the tooltip.
     */
    toggle() {
        if (this.isOpen) {
            return this.hide();
        }
        this.show();
    }
    /**
     * Opens an element’s tooltip. This is considered a “manual” triggering of
     * the tooltip.
     */
    show() {
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
        if (this.isOpen ||
            this.isDisabled ||
            this._delayTimeoutId ||
            !this.tooltip) {
            return;
        }
        const showTooltip = () => {
            if (this._delayTimeoutId) {
                this._delayTimeoutId = undefined;
            }
            this._tooltip
                .attach(TooltipContainerComponent)
                .to(this.container)
                .position({ attachment: this.placement })
                .show({
                content: this.tooltip,
                placement: this.placement,
                containerClass: this.containerClass,
                id: `tooltip-${this.tooltipId}`
            });
        };
        const cancelDelayedTooltipShowing = () => {
            if (this._tooltipCancelShowFn) {
                this._tooltipCancelShowFn();
            }
        };
        if (this.delay) {
            if (this._delaySubscription) {
                this._delaySubscription.unsubscribe();
            }
            this._delaySubscription = timer(this.delay).subscribe(() => {
                showTooltip();
                cancelDelayedTooltipShowing();
            });
            if (this.triggers) {
                parseTriggers(this.triggers)
                    .forEach((trigger) => {
                    if (!trigger.close) {
                        return;
                    }
                    this._tooltipCancelShowFn = this._renderer.listen(this._elementRef.nativeElement, trigger.close, () => {
                        this._delaySubscription?.unsubscribe();
                        cancelDelayedTooltipShowing();
                    });
                });
            }
        }
        else {
            showTooltip();
        }
    }
    /**
     * Closes an element’s tooltip. This is considered a “manual” triggering of
     * the tooltip.
     */
    hide() {
        if (this._delayTimeoutId) {
            clearTimeout(this._delayTimeoutId);
            this._delayTimeoutId = undefined;
        }
        if (!this._tooltip.isShown) {
            return;
        }
        if (this._tooltip.instance?.classMap) {
            this._tooltip.instance.classMap["in"] = false;
        }
        setTimeout(() => {
            this._tooltip.hide();
        }, this.tooltipFadeDuration);
    }
    ngOnDestroy() {
        this._tooltip.dispose();
        this.tooltipChange.unsubscribe();
        if (this._delaySubscription) {
            this._delaySubscription.unsubscribe();
        }
        this.onShown.unsubscribe();
        this.onHidden.unsubscribe();
    }
}
TooltipDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: TooltipDirective, deps: [{ token: i0.ViewContainerRef }, { token: i1.ComponentLoaderFactory }, { token: i2.TooltipConfig }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i3.PositioningService }], target: i0.ɵɵFactoryTarget.Directive });
TooltipDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.1", type: TooltipDirective, selector: "[tooltip], [tooltipHtml]", inputs: { adaptivePosition: "adaptivePosition", tooltip: "tooltip", placement: "placement", triggers: "triggers", container: "container", containerClass: "containerClass", boundariesElement: "boundariesElement", isOpen: "isOpen", isDisabled: "isDisabled", delay: "delay", htmlContent: ["tooltipHtml", "htmlContent"], _placement: ["tooltipPlacement", "_placement"], _isOpen: ["tooltipIsOpen", "_isOpen"], _enable: ["tooltipEnable", "_enable"], _appendToBody: ["tooltipAppendToBody", "_appendToBody"], tooltipAnimation: "tooltipAnimation", _popupClass: ["tooltipClass", "_popupClass"], _tooltipContext: ["tooltipContext", "_tooltipContext"], _tooltipPopupDelay: ["tooltipPopupDelay", "_tooltipPopupDelay"], tooltipFadeDuration: "tooltipFadeDuration", _tooltipTrigger: ["tooltipTrigger", "_tooltipTrigger"] }, outputs: { tooltipChange: "tooltipChange", onShown: "onShown", onHidden: "onHidden", tooltipStateChanged: "tooltipStateChanged" }, exportAs: ["bs-tooltip"], ngImport: i0 });
__decorate([
    OnChange(),
    __metadata("design:type", Object)
], TooltipDirective.prototype, "tooltip", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: TooltipDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[tooltip], [tooltipHtml]',
                    exportAs: 'bs-tooltip'
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }, { type: i1.ComponentLoaderFactory }, { type: i2.TooltipConfig }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i3.PositioningService }]; }, propDecorators: { adaptivePosition: [{
                type: Input
            }], tooltip: [{
                type: Input
            }], tooltipChange: [{
                type: Output
            }], placement: [{
                type: Input
            }], triggers: [{
                type: Input
            }], container: [{
                type: Input
            }], containerClass: [{
                type: Input
            }], boundariesElement: [{
                type: Input
            }], isOpen: [{
                type: Input
            }], isDisabled: [{
                type: Input
            }], delay: [{
                type: Input
            }], onShown: [{
                type: Output
            }], onHidden: [{
                type: Output
            }], htmlContent: [{
                type: Input,
                args: ['tooltipHtml']
            }], _placement: [{
                type: Input,
                args: ['tooltipPlacement']
            }], _isOpen: [{
                type: Input,
                args: ['tooltipIsOpen']
            }], _enable: [{
                type: Input,
                args: ['tooltipEnable']
            }], _appendToBody: [{
                type: Input,
                args: ['tooltipAppendToBody']
            }], tooltipAnimation: [{
                type: Input
            }], _popupClass: [{
                type: Input,
                args: ['tooltipClass']
            }], _tooltipContext: [{
                type: Input,
                args: ['tooltipContext']
            }], _tooltipPopupDelay: [{
                type: Input,
                args: ['tooltipPopupDelay']
            }], tooltipFadeDuration: [{
                type: Input
            }], _tooltipTrigger: [{
                type: Input,
                args: ['tooltipTrigger']
            }], tooltipStateChanged: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdG9vbHRpcC90b29sdGlwLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLEtBQUssRUFHTCxNQUFNLEVBQ04sU0FBUyxFQUVULGdCQUFnQixFQUNqQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUMxRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFakQsT0FBTyxFQUFtQixzQkFBc0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3pGLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBVyxNQUFNLHFCQUFxQixDQUFDO0FBQ2pGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRS9ELE9BQU8sRUFBRSxLQUFLLEVBQWdCLE1BQU0sTUFBTSxDQUFDOzs7OztBQUczQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFNWCxNQUFNLE9BQU8sZ0JBQWdCO0lBbUwzQixZQUNFLGlCQUFtQyxFQUNuQyxHQUEyQixFQUMzQixNQUFxQixFQUNiLFdBQXVCLEVBQ3ZCLFNBQW9CLEVBQ3BCLGdCQUFvQztRQUZwQyxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUN2QixjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQ3BCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBb0I7UUF4TDlDLGNBQVMsR0FBRyxFQUFFLEVBQUUsQ0FBQztRQUNqQixxQ0FBcUM7UUFDNUIscUJBQWdCLEdBQUcsSUFBSSxDQUFDO1FBT2pDLHlDQUF5QztRQUV6QyxrQkFBYSxHQUFnRCxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWhGOztXQUVHO1FBQ00sY0FBUyxHQUF3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ZUFBZTtnQkFlbEIsYUFBYTtzQkFEaEIsS0FBSzt1QkFBQyxxQkFBcUI7Z0JBaUJuQixnQkFBZ0I7c0JBQXhCLEtBQUs7Z0JBS0YsV0FBVztzQkFEZCxLQUFLO3VCQUFDLGNBQWM7Z0JBUWpCLGVBQWU7c0JBRGxCLEtBQUs7dUJBQUMsZ0JBQWdCO2dCQVFuQixrQkFBa0I7c0JBRHJCLEtBQUs7dUJBQUMsbUJBQW1CO2dCQU9qQixtQkFBbUI7c0JBQTNCLEtBQUs7Z0JBSUYsZUFBZTtzQkFEbEIsS0FBSzt1QkFBQyxnQkFBZ0I7Z0JBY3ZCLG1CQUFtQjtzQkFEbEIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgRGlyZWN0aXZlLFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIElucHV0LFxyXG4gIE9uRGVzdHJveSxcclxuICBPbkluaXQsXHJcbiAgT3V0cHV0LFxyXG4gIFJlbmRlcmVyMixcclxuICBUZW1wbGF0ZVJlZixcclxuICBWaWV3Q29udGFpbmVyUmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBUb29sdGlwQ29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi90b29sdGlwLWNvbnRhaW5lci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBUb29sdGlwQ29uZmlnIH0gZnJvbSAnLi90b29sdGlwLmNvbmZpZyc7XHJcblxyXG5pbXBvcnQgeyBDb21wb25lbnRMb2FkZXIsIENvbXBvbmVudExvYWRlckZhY3RvcnkgfSBmcm9tICduZ3gtYm9vdHN0cmFwL2NvbXBvbmVudC1sb2FkZXInO1xyXG5pbXBvcnQgeyBPbkNoYW5nZSwgd2Fybk9uY2UsIHBhcnNlVHJpZ2dlcnMsIFRyaWdnZXIgfSBmcm9tICduZ3gtYm9vdHN0cmFwL3V0aWxzJztcclxuaW1wb3J0IHsgUG9zaXRpb25pbmdTZXJ2aWNlIH0gZnJvbSAnbmd4LWJvb3RzdHJhcC9wb3NpdGlvbmluZyc7XHJcblxyXG5pbXBvcnQgeyB0aW1lciwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IEF2YWlsYmxlQlNQb3NpdGlvbnMgfSBmcm9tICduZ3gtYm9vdHN0cmFwL3Bvc2l0aW9uaW5nJztcclxuXHJcbmxldCBpZCA9IDA7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1t0b29sdGlwXSwgW3Rvb2x0aXBIdG1sXScsXHJcbiAgZXhwb3J0QXM6ICdicy10b29sdGlwJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgVG9vbHRpcERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICB0b29sdGlwSWQgPSBpZCsrO1xyXG4gIC8qKiBzZXRzIGRpc2FibGUgYWRhcHRpdmUgcG9zaXRpb24gKi9cclxuICBASW5wdXQoKSBhZGFwdGl2ZVBvc2l0aW9uID0gdHJ1ZTtcclxuICAvKipcclxuICAgKiBDb250ZW50IHRvIGJlIGRpc3BsYXllZCBhcyB0b29sdGlwLlxyXG4gICAqL1xyXG4gIEBPbkNoYW5nZSgpXHJcbiAgQElucHV0KClcclxuICB0b29sdGlwPzogc3RyaW5nIHwgVGVtcGxhdGVSZWY8dW5rbm93bj47XHJcbiAgLyoqIEZpcmVkIHdoZW4gdG9vbHRpcCBjb250ZW50IGNoYW5nZXMgKi9cclxuICBAT3V0cHV0KClcclxuICB0b29sdGlwQ2hhbmdlOiBFdmVudEVtaXR0ZXI8c3RyaW5nIHwgVGVtcGxhdGVSZWY8dW5rbm93bj4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAvKipcclxuICAgKiBQbGFjZW1lbnQgb2YgYSB0b29sdGlwLiBBY2NlcHRzOiBcInRvcFwiLCBcImJvdHRvbVwiLCBcImxlZnRcIiwgXCJyaWdodFwiXHJcbiAgICovXHJcbiAgQElucHV0KCkgcGxhY2VtZW50OiBBdmFpbGJsZUJTUG9zaXRpb25zID0gJ3RvcCc7XHJcbiAgLyoqXHJcbiAgICogU3BlY2lmaWVzIGV2ZW50cyB0aGF0IHNob3VsZCB0cmlnZ2VyLiBTdXBwb3J0cyBhIHNwYWNlIHNlcGFyYXRlZCBsaXN0IG9mXHJcbiAgICogZXZlbnQgbmFtZXMuXHJcbiAgICovXHJcbiAgQElucHV0KCkgdHJpZ2dlcnMgPSAnaG92ZXIgZm9jdXMnO1xyXG4gIC8qKlxyXG4gICAqIEEgc2VsZWN0b3Igc3BlY2lmeWluZyB0aGUgZWxlbWVudCB0aGUgdG9vbHRpcCBzaG91bGQgYmUgYXBwZW5kZWQgdG8uXHJcbiAgICovXHJcbiAgQElucHV0KCkgY29udGFpbmVyPzogc3RyaW5nO1xyXG4gIC8qKlxyXG4gICAqIENzcyBjbGFzcyBmb3IgdG9vbHRpcCBjb250YWluZXJcclxuICAgKi9cclxuICBASW5wdXQoKSBjb250YWluZXJDbGFzcyA9ICcnO1xyXG4gIEBJbnB1dCgpIGJvdW5kYXJpZXNFbGVtZW50PzogKCd2aWV3cG9ydCcgfCAnc2Nyb2xsUGFyZW50JyB8ICd3aW5kb3cnKTtcclxuICAvKipcclxuICAgKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSB0b29sdGlwIGlzIGN1cnJlbnRseSBiZWluZyBzaG93blxyXG4gICAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGlzT3BlbigpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl90b29sdGlwLmlzU2hvd247XHJcbiAgfVxyXG5cclxuICBzZXQgaXNPcGVuKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICBpZiAodmFsdWUpIHtcclxuICAgICAgdGhpcy5zaG93KCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmhpZGUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFsbG93cyB0byBkaXNhYmxlIHRvb2x0aXBcclxuICAgKi9cclxuICBASW5wdXQoKSBpc0Rpc2FibGVkID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIERlbGF5IGJlZm9yZSBzaG93aW5nIHRoZSB0b29sdGlwXHJcbiAgICovXHJcbiAgQElucHV0KCkgZGVsYXkgPSAwO1xyXG5cclxuICAvKipcclxuICAgKiBFbWl0cyBhbiBldmVudCB3aGVuIHRoZSB0b29sdGlwIGlzIHNob3duXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIG9uU2hvd246IEV2ZW50RW1pdHRlcjx1bmtub3duPjtcclxuICAvKipcclxuICAgKiBFbWl0cyBhbiBldmVudCB3aGVuIHRoZSB0b29sdGlwIGlzIGhpZGRlblxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBvbkhpZGRlbjogRXZlbnRFbWl0dGVyPHVua25vd24+O1xyXG5cclxuICAvKiogQGRlcHJlY2F0ZWQgLSBwbGVhc2UgdXNlIGB0b29sdGlwYCBpbnN0ZWFkICovXHJcbiAgQElucHV0KCd0b29sdGlwSHRtbCcpXHJcbiAgICBzZXQgaHRtbENvbnRlbnQodmFsdWU6IHN0cmluZyB8IFRlbXBsYXRlUmVmPHVua25vd24+KSB7XHJcbiAgICB3YXJuT25jZSgndG9vbHRpcEh0bWwgd2FzIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2UgYHRvb2x0aXBgIGluc3RlYWQnKTtcclxuICAgIHRoaXMudG9vbHRpcCA9IHZhbHVlO1xyXG4gIH1cclxuXHJcbiAgLyoqIEBkZXByZWNhdGVkIC0gcGxlYXNlIHVzZSBgcGxhY2VtZW50YCBpbnN0ZWFkICovXHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9uby1pbnB1dC1yZW5hbWVcclxuICBASW5wdXQoJ3Rvb2x0aXBQbGFjZW1lbnQnKVxyXG4gIHNldCBfcGxhY2VtZW50KHZhbHVlOiBBdmFpbGJsZUJTUG9zaXRpb25zKSB7XHJcbiAgICB3YXJuT25jZSgndG9vbHRpcFBsYWNlbWVudCB3YXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSBgcGxhY2VtZW50YCBpbnN0ZWFkJyk7XHJcbiAgICB0aGlzLnBsYWNlbWVudCA9IHZhbHVlO1xyXG4gIH1cclxuXHJcbiAgLyoqIEBkZXByZWNhdGVkIC0gcGxlYXNlIHVzZSBgaXNPcGVuYCBpbnN0ZWFkICovXHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9uby1pbnB1dC1yZW5hbWVcclxuICBASW5wdXQoJ3Rvb2x0aXBJc09wZW4nKVxyXG4gIHNldCBfaXNPcGVuKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB3YXJuT25jZSgndG9vbHRpcElzT3BlbiB3YXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSBgaXNPcGVuYCBpbnN0ZWFkJyk7XHJcbiAgICB0aGlzLmlzT3BlbiA9IHZhbHVlO1xyXG4gIH1cclxuXHJcbiAgZ2V0IF9pc09wZW4oKTogYm9vbGVhbiB7XHJcbiAgICB3YXJuT25jZSgndG9vbHRpcElzT3BlbiB3YXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSBgaXNPcGVuYCBpbnN0ZWFkJyk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuaXNPcGVuO1xyXG4gIH1cclxuXHJcbiAgLyoqIEBkZXByZWNhdGVkIC0gcGxlYXNlIHVzZSBgaXNEaXNhYmxlZGAgaW5zdGVhZCAqL1xyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvbm8taW5wdXQtcmVuYW1lXHJcbiAgQElucHV0KCd0b29sdGlwRW5hYmxlJylcclxuICBzZXQgX2VuYWJsZSh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgd2Fybk9uY2UoJ3Rvb2x0aXBFbmFibGUgd2FzIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2UgYGlzRGlzYWJsZWRgIGluc3RlYWQnKTtcclxuICAgIHRoaXMuaXNEaXNhYmxlZCA9ICF2YWx1ZTtcclxuICB9XHJcblxyXG4gIGdldCBfZW5hYmxlKCk6IGJvb2xlYW4ge1xyXG4gICAgd2Fybk9uY2UoJ3Rvb2x0aXBFbmFibGUgd2FzIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2UgYGlzRGlzYWJsZWRgIGluc3RlYWQnKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5pc0Rpc2FibGVkO1xyXG4gIH1cclxuXHJcbiAgLyoqIEBkZXByZWNhdGVkIC0gcGxlYXNlIHVzZSBgY29udGFpbmVyPVwiYm9keVwiYCBpbnN0ZWFkICovXHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9uby1pbnB1dC1yZW5hbWVcclxuICBASW5wdXQoJ3Rvb2x0aXBBcHBlbmRUb0JvZHknKVxyXG4gIHNldCBfYXBwZW5kVG9Cb2R5KHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB3YXJuT25jZShcclxuICAgICAgJ3Rvb2x0aXBBcHBlbmRUb0JvZHkgd2FzIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2UgYGNvbnRhaW5lcj1cImJvZHlcImAgaW5zdGVhZCdcclxuICAgICk7XHJcbiAgICB0aGlzLmNvbnRhaW5lciA9IHZhbHVlID8gJ2JvZHknIDogdGhpcy5jb250YWluZXI7XHJcbiAgfVxyXG5cclxuICBnZXQgX2FwcGVuZFRvQm9keSgpOiBib29sZWFuIHtcclxuICAgIHdhcm5PbmNlKFxyXG4gICAgICAndG9vbHRpcEFwcGVuZFRvQm9keSB3YXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSBgY29udGFpbmVyPVwiYm9keVwiYCBpbnN0ZWFkJ1xyXG4gICAgKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5jb250YWluZXIgPT09ICdib2R5JztcclxuICB9XHJcblxyXG4gIC8qKiBAZGVwcmVjYXRlZCAtIHJlbW92ZWQsIHdpbGwgYmUgYWRkZWQgdG8gY29uZmlndXJhdGlvbiAqL1xyXG4gIEBJbnB1dCgpIHRvb2x0aXBBbmltYXRpb24gPSB0cnVlO1xyXG5cclxuICAvKiogQGRlcHJlY2F0ZWQgLSB3aWxsIHJlcGxhY2VkIHdpdGggY3VzdG9tQ2xhc3MgKi9cclxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLWlucHV0LXJlbmFtZVxyXG4gIEBJbnB1dCgndG9vbHRpcENsYXNzJylcclxuICBzZXQgX3BvcHVwQ2xhc3ModmFsdWU6IHN0cmluZykge1xyXG4gICAgd2Fybk9uY2UoJ3Rvb2x0aXBDbGFzcyBkZXByZWNhdGVkJyk7XHJcbiAgfVxyXG5cclxuICAvKiogQGRlcHJlY2F0ZWQgLSByZW1vdmVkICovXHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9uby1pbnB1dC1yZW5hbWVcclxuICBASW5wdXQoJ3Rvb2x0aXBDb250ZXh0JylcclxuICBzZXQgX3Rvb2x0aXBDb250ZXh0KHZhbHVlOiB1bmRlZmluZWQpIHtcclxuICAgIHdhcm5PbmNlKCd0b29sdGlwQ29udGV4dCBkZXByZWNhdGVkJyk7XHJcbiAgfVxyXG5cclxuICAvKiogQGRlcHJlY2F0ZWQgKi9cclxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLWlucHV0LXJlbmFtZVxyXG4gIEBJbnB1dCgndG9vbHRpcFBvcHVwRGVsYXknKVxyXG4gIHNldCBfdG9vbHRpcFBvcHVwRGVsYXkodmFsdWU6IG51bWJlcikge1xyXG4gICAgd2Fybk9uY2UoJ3Rvb2x0aXBQb3B1cERlbGF5IGlzIGRlcHJlY2F0ZWQsIHVzZSBgZGVsYXlgIGluc3RlYWQnKTtcclxuICAgIHRoaXMuZGVsYXkgPSB2YWx1ZTtcclxuICB9XHJcblxyXG4gIC8qKiBAZGVwcmVjYXRlZCAqL1xyXG4gIEBJbnB1dCgpIHRvb2x0aXBGYWRlRHVyYXRpb24gPSAxNTA7XHJcblxyXG4gIC8qKiBAZGVwcmVjYXRlZCAtICBwbGVhc2UgdXNlIGB0cmlnZ2Vyc2AgaW5zdGVhZCAqL1xyXG4gIEBJbnB1dCgndG9vbHRpcFRyaWdnZXInKVxyXG4gIGdldCBfdG9vbHRpcFRyaWdnZXIoKTogc3RyaW5nIHwgc3RyaW5nW10ge1xyXG4gICAgd2Fybk9uY2UoJ3Rvb2x0aXBUcmlnZ2VyIHdhcyBkZXByZWNhdGVkLCBwbGVhc2UgdXNlIGB0cmlnZ2Vyc2AgaW5zdGVhZCcpO1xyXG5cclxuICAgIHJldHVybiB0aGlzLnRyaWdnZXJzO1xyXG4gIH1cclxuXHJcbiAgc2V0IF90b29sdGlwVHJpZ2dlcih2YWx1ZTogc3RyaW5nIHwgc3RyaW5nW10pIHtcclxuICAgIHdhcm5PbmNlKCd0b29sdGlwVHJpZ2dlciB3YXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSBgdHJpZ2dlcnNgIGluc3RlYWQnKTtcclxuICAgIHRoaXMudHJpZ2dlcnMgPSAodmFsdWUgfHwgJycpLnRvU3RyaW5nKCk7XHJcbiAgfVxyXG5cclxuICAvKiogQGRlcHJlY2F0ZWQgKi9cclxuICBAT3V0cHV0KClcclxuICB0b29sdGlwU3RhdGVDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XHJcblxyXG4gIHByb3RlY3RlZCBfZGVsYXlUaW1lb3V0SWQ/OiBudW1iZXI7XHJcbiAgcHJvdGVjdGVkIF90b29sdGlwQ2FuY2VsU2hvd0ZuPzogKCkgPT4gdm9pZDtcclxuXHJcbiAgcHJpdmF0ZSBfdG9vbHRpcDogQ29tcG9uZW50TG9hZGVyPFRvb2x0aXBDb250YWluZXJDb21wb25lbnQ+O1xyXG4gIHByaXZhdGUgX2RlbGF5U3Vic2NyaXB0aW9uPzogU3Vic2NyaXB0aW9uO1xyXG4gIHByaXZhdGUgX2FyaWFEZXNjcmliZWRieT86IHN0cmluZztcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIF92aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxyXG4gICAgY2lzOiBDb21wb25lbnRMb2FkZXJGYWN0b3J5LFxyXG4gICAgY29uZmlnOiBUb29sdGlwQ29uZmlnLFxyXG4gICAgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZixcclxuICAgIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIsXHJcbiAgICBwcml2YXRlIF9wb3NpdGlvblNlcnZpY2U6IFBvc2l0aW9uaW5nU2VydmljZVxyXG4gICkge1xyXG5cclxuICAgIHRoaXMuX3Rvb2x0aXAgPSBjaXNcclxuICAgICAgLmNyZWF0ZUxvYWRlcjxUb29sdGlwQ29udGFpbmVyQ29tcG9uZW50PihcclxuICAgICAgICB0aGlzLl9lbGVtZW50UmVmLFxyXG4gICAgICAgIF92aWV3Q29udGFpbmVyUmVmLFxyXG4gICAgICAgIHRoaXMuX3JlbmRlcmVyXHJcbiAgICAgIClcclxuICAgICAgLnByb3ZpZGUoe3Byb3ZpZGU6IFRvb2x0aXBDb25maWcsIHVzZVZhbHVlOiBjb25maWd9KTtcclxuXHJcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGNvbmZpZyk7XHJcbiAgICB0aGlzLm9uU2hvd24gPSB0aGlzLl90b29sdGlwLm9uU2hvd247XHJcbiAgICB0aGlzLm9uSGlkZGVuID0gdGhpcy5fdG9vbHRpcC5vbkhpZGRlbjtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5fdG9vbHRpcC5saXN0ZW4oe1xyXG4gICAgICB0cmlnZ2VyczogdGhpcy50cmlnZ2VycyxcclxuICAgICAgc2hvdzogKCkgPT4gdGhpcy5zaG93KClcclxuICAgIH0pO1xyXG4gICAgdGhpcy50b29sdGlwQ2hhbmdlLnN1YnNjcmliZSgodmFsdWUpID0+IHtcclxuICAgICAgaWYgKCF2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMuX3Rvb2x0aXAuaGlkZSgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLm9uU2hvd24uc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgdGhpcy5zZXRBcmlhRGVzY3JpYmVkQnkoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMub25IaWRkZW4uc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgdGhpcy5zZXRBcmlhRGVzY3JpYmVkQnkoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc2V0QXJpYURlc2NyaWJlZEJ5KCk6IHZvaWQge1xyXG4gICAgdGhpcy5fYXJpYURlc2NyaWJlZGJ5ID0gdGhpcy5pc09wZW4gPyBgdG9vbHRpcC0ke3RoaXMudG9vbHRpcElkfWAgOiB2b2lkIDA7XHJcblxyXG4gICAgaWYgKHRoaXMuX2FyaWFEZXNjcmliZWRieSkge1xyXG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnYXJpYS1kZXNjcmliZWRieScsIHRoaXMuX2FyaWFEZXNjcmliZWRieSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVBdHRyaWJ1dGUodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnYXJpYS1kZXNjcmliZWRieScpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVG9nZ2xlcyBhbiBlbGVtZW504oCZcyB0b29sdGlwLiBUaGlzIGlzIGNvbnNpZGVyZWQgYSDigJxtYW51YWzigJ0gdHJpZ2dlcmluZyBvZlxyXG4gICAqIHRoZSB0b29sdGlwLlxyXG4gICAqL1xyXG4gIHRvZ2dsZSgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmlzT3Blbikge1xyXG4gICAgICByZXR1cm4gdGhpcy5oaWRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zaG93KCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBPcGVucyBhbiBlbGVtZW504oCZcyB0b29sdGlwLiBUaGlzIGlzIGNvbnNpZGVyZWQgYSDigJxtYW51YWzigJ0gdHJpZ2dlcmluZyBvZlxyXG4gICAqIHRoZSB0b29sdGlwLlxyXG4gICAqL1xyXG4gIHNob3coKTogdm9pZCB7XHJcbiAgICB0aGlzLl9wb3NpdGlvblNlcnZpY2Uuc2V0T3B0aW9ucyh7XHJcbiAgICAgIG1vZGlmaWVyczoge1xyXG4gICAgICAgIGZsaXA6IHtcclxuICAgICAgICAgIGVuYWJsZWQ6IHRoaXMuYWRhcHRpdmVQb3NpdGlvblxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcHJldmVudE92ZXJmbG93OiB7XHJcbiAgICAgICAgICBlbmFibGVkOiB0aGlzLmFkYXB0aXZlUG9zaXRpb24sXHJcbiAgICAgICAgICBib3VuZGFyaWVzRWxlbWVudDogdGhpcy5ib3VuZGFyaWVzRWxlbWVudCB8fCAnc2Nyb2xsUGFyZW50J1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKFxyXG4gICAgICB0aGlzLmlzT3BlbiB8fFxyXG4gICAgICB0aGlzLmlzRGlzYWJsZWQgfHxcclxuICAgICAgdGhpcy5fZGVsYXlUaW1lb3V0SWQgfHxcclxuICAgICAgIXRoaXMudG9vbHRpcFxyXG4gICAgKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzaG93VG9vbHRpcCA9ICgpID0+IHtcclxuICAgICAgaWYgKHRoaXMuX2RlbGF5VGltZW91dElkKSB7XHJcbiAgICAgICAgdGhpcy5fZGVsYXlUaW1lb3V0SWQgPSB1bmRlZmluZWQ7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuX3Rvb2x0aXBcclxuICAgICAgICAuYXR0YWNoKFRvb2x0aXBDb250YWluZXJDb21wb25lbnQpXHJcbiAgICAgICAgLnRvKHRoaXMuY29udGFpbmVyKVxyXG4gICAgICAgIC5wb3NpdGlvbih7YXR0YWNobWVudDogdGhpcy5wbGFjZW1lbnR9KVxyXG4gICAgICAgIC5zaG93KHtcclxuICAgICAgICAgIGNvbnRlbnQ6IHRoaXMudG9vbHRpcCxcclxuICAgICAgICAgIHBsYWNlbWVudDogdGhpcy5wbGFjZW1lbnQsXHJcbiAgICAgICAgICBjb250YWluZXJDbGFzczogdGhpcy5jb250YWluZXJDbGFzcyxcclxuICAgICAgICAgIGlkOiBgdG9vbHRpcC0ke3RoaXMudG9vbHRpcElkfWBcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBjb25zdCBjYW5jZWxEZWxheWVkVG9vbHRpcFNob3dpbmcgPSAoKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLl90b29sdGlwQ2FuY2VsU2hvd0ZuKSB7XHJcbiAgICAgICAgdGhpcy5fdG9vbHRpcENhbmNlbFNob3dGbigpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGlmICh0aGlzLmRlbGF5KSB7XHJcbiAgICAgIGlmICh0aGlzLl9kZWxheVN1YnNjcmlwdGlvbikge1xyXG4gICAgICAgIHRoaXMuX2RlbGF5U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuX2RlbGF5U3Vic2NyaXB0aW9uID0gdGltZXIodGhpcy5kZWxheSkuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICBzaG93VG9vbHRpcCgpO1xyXG4gICAgICAgIGNhbmNlbERlbGF5ZWRUb29sdGlwU2hvd2luZygpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmICh0aGlzLnRyaWdnZXJzKSB7XHJcbiAgICAgICAgcGFyc2VUcmlnZ2Vycyh0aGlzLnRyaWdnZXJzKVxyXG4gICAgICAgICAgLmZvckVhY2goKHRyaWdnZXI6IFRyaWdnZXIpID0+IHtcclxuICAgICAgICAgICAgaWYgKCF0cmlnZ2VyLmNsb3NlKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXBDYW5jZWxTaG93Rm4gPSB0aGlzLl9yZW5kZXJlci5saXN0ZW4oXHJcbiAgICAgICAgICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LFxyXG4gICAgICAgICAgICAgIHRyaWdnZXIuY2xvc2UsXHJcbiAgICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZGVsYXlTdWJzY3JpcHRpb24/LnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgICAgICAgICAgICBjYW5jZWxEZWxheWVkVG9vbHRpcFNob3dpbmcoKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc2hvd1Rvb2x0aXAoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENsb3NlcyBhbiBlbGVtZW504oCZcyB0b29sdGlwLiBUaGlzIGlzIGNvbnNpZGVyZWQgYSDigJxtYW51YWzigJ0gdHJpZ2dlcmluZyBvZlxyXG4gICAqIHRoZSB0b29sdGlwLlxyXG4gICAqL1xyXG4gIGhpZGUoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5fZGVsYXlUaW1lb3V0SWQpIHtcclxuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX2RlbGF5VGltZW91dElkKTtcclxuICAgICAgdGhpcy5fZGVsYXlUaW1lb3V0SWQgPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLl90b29sdGlwLmlzU2hvd24pIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLl90b29sdGlwLmluc3RhbmNlPy5jbGFzc01hcCkge1xyXG4gICAgICB0aGlzLl90b29sdGlwLmluc3RhbmNlLmNsYXNzTWFwW1wiaW5cIl0gPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGhpcy5fdG9vbHRpcC5oaWRlKCk7XHJcbiAgICB9LCB0aGlzLnRvb2x0aXBGYWRlRHVyYXRpb24pO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICB0aGlzLl90b29sdGlwLmRpc3Bvc2UoKTtcclxuICAgIHRoaXMudG9vbHRpcENoYW5nZS51bnN1YnNjcmliZSgpO1xyXG4gICAgaWYgKHRoaXMuX2RlbGF5U3Vic2NyaXB0aW9uKSB7XHJcbiAgICAgIHRoaXMuX2RlbGF5U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLm9uU2hvd24udW5zdWJzY3JpYmUoKTtcclxuICAgIHRoaXMub25IaWRkZW4udW5zdWJzY3JpYmUoKTtcclxuICB9XHJcbn1cclxuIl19