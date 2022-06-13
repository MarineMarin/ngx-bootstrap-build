import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2, ViewContainerRef } from '@angular/core';
import { filter } from 'rxjs/operators';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { BsDropdownConfig } from './bs-dropdown.config';
import { BsDropdownContainerComponent } from './bs-dropdown-container.component';
import { BsDropdownState } from './bs-dropdown.state';
import { isBs3 } from 'ngx-bootstrap/utils';
import { AnimationBuilder } from '@angular/animations';
import { dropdownAnimation } from './dropdown-animations';
import * as i0 from "@angular/core";
import * as i1 from "ngx-bootstrap/component-loader";
import * as i2 from "./bs-dropdown.state";
import * as i3 from "./bs-dropdown.config";
import * as i4 from "@angular/animations";
export class BsDropdownDirective {
    constructor(_elementRef, _renderer, _viewContainerRef, _cis, _state, _config, _builder) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._viewContainerRef = _viewContainerRef;
        this._cis = _cis;
        this._state = _state;
        this._config = _config;
        /**
         * This attribute indicates that the dropdown should be opened upwards
         */
        this.dropup = false;
        // todo: move to component loader
        this._isInlineOpen = false;
        this._isDisabled = false;
        this._subscriptions = [];
        this._isInited = false;
        // set initial dropdown state from config
        this._state.autoClose = this._config.autoClose;
        this._state.insideClick = this._config.insideClick;
        this._state.isAnimated = this._config.isAnimated;
        this._state.stopOnClickPropagation = this._config.stopOnClickPropagation;
        this._factoryDropDownAnimation = _builder.build(dropdownAnimation);
        // create dropdown component loader
        this._dropdown = this._cis
            .createLoader(this._elementRef, this._viewContainerRef, this._renderer)
            .provide({ provide: BsDropdownState, useValue: this._state });
        this.onShown = this._dropdown.onShown;
        this.onHidden = this._dropdown.onHidden;
        this.isOpenChange = this._state.isOpenChange;
    }
    /**
     * Indicates that dropdown will be closed on item or document click,
     * and after pressing ESC
     */
    set autoClose(value) {
        this._state.autoClose = value;
    }
    get autoClose() {
        return this._state.autoClose;
    }
    /**
     * Indicates that dropdown will be animated
     */
    set isAnimated(value) {
        this._state.isAnimated = value;
    }
    get isAnimated() {
        return this._state.isAnimated;
    }
    /**
     * This attribute indicates that the dropdown shouldn't close on inside click when autoClose is set to true
     */
    set insideClick(value) {
        this._state.insideClick = value;
    }
    get insideClick() {
        return this._state.insideClick;
    }
    /**
     * Disables dropdown toggle and hides dropdown menu if opened
     */
    set isDisabled(value) {
        this._isDisabled = value;
        this._state.isDisabledChange.emit(value);
        if (value) {
            this.hide();
        }
    }
    get isDisabled() {
        return this._isDisabled;
    }
    /**
     * Returns whether or not the popover is currently being shown
     */
    get isOpen() {
        if (this._showInline) {
            return this._isInlineOpen;
        }
        return this._dropdown.isShown;
    }
    set isOpen(value) {
        if (value) {
            this.show();
        }
        else {
            this.hide();
        }
    }
    get isBs4() {
        return !isBs3();
    }
    get _showInline() {
        return !this.container;
    }
    ngOnInit() {
        // fix: seems there are an issue with `routerLinkActive`
        // which result in duplicated call ngOnInit without call to ngOnDestroy
        // read more: https://github.com/valor-software/ngx-bootstrap/issues/1885
        if (this._isInited) {
            return;
        }
        this._isInited = true;
        // attach DOM listeners
        this._dropdown.listen({
            // because of dropdown inline mode
            outsideClick: false,
            triggers: this.triggers,
            show: () => this.show()
        });
        // toggle visibility on toggle element click
        this._subscriptions.push(this._state.toggleClick.subscribe((value) => this.toggle(value)));
        // hide dropdown if set disabled while opened
        this._subscriptions.push(this._state.isDisabledChange
            .pipe(filter((value) => value))
            .subscribe(( /*value: boolean*/) => this.hide()));
    }
    /**
     * Opens an element’s popover. This is considered a “manual” triggering of
     * the popover.
     */
    show() {
        if (this.isOpen || this.isDisabled) {
            return;
        }
        if (this._showInline) {
            if (!this._inlinedMenu) {
                this._state.dropdownMenu.then((dropdownMenu) => {
                    this._dropdown.attachInline(dropdownMenu.viewContainer, dropdownMenu.templateRef);
                    this._inlinedMenu = this._dropdown._inlineViewRef;
                    this.addBs4Polyfills();
                    if (this._inlinedMenu) {
                        this._renderer.addClass(this._inlinedMenu.rootNodes[0].parentNode, 'open');
                    }
                    this.playAnimation();
                })
                    // swallow errors
                    .catch();
            }
            this.addBs4Polyfills();
            this._isInlineOpen = true;
            this.onShown.emit(true);
            this._state.isOpenChange.emit(true);
            this.playAnimation();
            return;
        }
        this._state.dropdownMenu.then(dropdownMenu => {
            // check direction in which dropdown should be opened
            const _dropup = this.dropup ||
                (typeof this.dropup !== 'undefined' && this.dropup);
            this._state.direction = _dropup ? 'up' : 'down';
            const _placement = this.placement || (_dropup ? 'top start' : 'bottom start');
            // show dropdown
            this._dropdown
                .attach(BsDropdownContainerComponent)
                .to(this.container)
                .position({ attachment: _placement })
                .show({
                content: dropdownMenu.templateRef,
                placement: _placement
            });
            this._state.isOpenChange.emit(true);
        })
            // swallow error
            .catch();
    }
    /**
     * Closes an element’s popover. This is considered a “manual” triggering of
     * the popover.
     */
    hide() {
        if (!this.isOpen) {
            return;
        }
        if (this._showInline) {
            this.removeShowClass();
            this.removeDropupStyles();
            this._isInlineOpen = false;
            this.onHidden.emit(true);
        }
        else {
            this._dropdown.hide();
        }
        this._state.isOpenChange.emit(false);
    }
    /**
     * Toggles an element’s popover. This is considered a “manual” triggering of
     * the popover. With parameter <code>true</code> allows toggling, with parameter <code>false</code>
     * only hides opened dropdown. Parameter usage will be removed in ngx-bootstrap v3
     */
    toggle(value) {
        if (this.isOpen || !value) {
            return this.hide();
        }
        return this.show();
    }
    /** @internal */
    _contains(event) {
        // todo: valorkin fix typings
        return this._elementRef.nativeElement.contains(event.target) ||
            (this._dropdown.instance && this._dropdown.instance._contains(event.target));
    }
    navigationClick(event) {
        const ref = this._elementRef.nativeElement.querySelector('.dropdown-menu');
        if (!ref) {
            return;
        }
        const firstActive = this._elementRef.nativeElement.ownerDocument.activeElement;
        const allRef = ref.querySelectorAll('.dropdown-item');
        switch (event.keyCode) {
            case 38:
                if (this._state.counts > 0) {
                    allRef[--this._state.counts].focus();
                }
                break;
            case 40:
                if (this._state.counts + 1 < allRef.length) {
                    if (firstActive.classList !== allRef[this._state.counts].classList) {
                        allRef[this._state.counts].focus();
                    }
                    else {
                        allRef[++this._state.counts].focus();
                    }
                }
                break;
            default:
        }
        event.preventDefault();
    }
    ngOnDestroy() {
        // clean up subscriptions and destroy dropdown
        for (const sub of this._subscriptions) {
            sub.unsubscribe();
        }
        this._dropdown.dispose();
    }
    addBs4Polyfills() {
        if (!isBs3()) {
            this.addShowClass();
            this.checkRightAlignment();
            this.addDropupStyles();
        }
    }
    playAnimation() {
        if (this._state.isAnimated && this._inlinedMenu) {
            setTimeout(() => {
                if (this._inlinedMenu) {
                    this._factoryDropDownAnimation.create(this._inlinedMenu.rootNodes[0]).play();
                }
            });
        }
    }
    addShowClass() {
        if (this._inlinedMenu && this._inlinedMenu.rootNodes[0]) {
            this._renderer.addClass(this._inlinedMenu.rootNodes[0], 'show');
        }
    }
    removeShowClass() {
        if (this._inlinedMenu && this._inlinedMenu.rootNodes[0]) {
            this._renderer.removeClass(this._inlinedMenu.rootNodes[0], 'show');
        }
    }
    checkRightAlignment() {
        if (this._inlinedMenu && this._inlinedMenu.rootNodes[0]) {
            const isRightAligned = this._inlinedMenu.rootNodes[0].classList.contains('dropdown-menu-right') || this._inlinedMenu.rootNodes[0].classList.contains('dropdown-menu-end');
            this._renderer.setStyle(this._inlinedMenu.rootNodes[0], 'left', isRightAligned ? 'auto' : '0');
            this._renderer.setStyle(this._inlinedMenu.rootNodes[0], 'right', isRightAligned ? '0' : 'auto');
        }
    }
    addDropupStyles() {
        if (this._inlinedMenu && this._inlinedMenu.rootNodes[0]) {
            // a little hack to not break support of bootstrap 4 beta
            this._renderer.setStyle(this._inlinedMenu.rootNodes[0], 'top', this.dropup ? 'auto' : '100%');
            this._renderer.setStyle(this._inlinedMenu.rootNodes[0], 'transform', this.dropup ? 'translateY(-101%)' : 'translateY(0)');
            this._renderer.setStyle(this._inlinedMenu.rootNodes[0], 'bottom', 'auto');
        }
    }
    removeDropupStyles() {
        if (this._inlinedMenu && this._inlinedMenu.rootNodes[0]) {
            this._renderer.removeStyle(this._inlinedMenu.rootNodes[0], 'top');
            this._renderer.removeStyle(this._inlinedMenu.rootNodes[0], 'transform');
            this._renderer.removeStyle(this._inlinedMenu.rootNodes[0], 'bottom');
        }
    }
}
BsDropdownDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: BsDropdownDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i1.ComponentLoaderFactory }, { token: i2.BsDropdownState }, { token: i3.BsDropdownConfig }, { token: i4.AnimationBuilder }], target: i0.ɵɵFactoryTarget.Directive });
BsDropdownDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.1", type: BsDropdownDirective, selector: "[bsDropdown], [dropdown]", inputs: { placement: "placement", triggers: "triggers", container: "container", dropup: "dropup", autoClose: "autoClose", isAnimated: "isAnimated", insideClick: "insideClick", isDisabled: "isDisabled", isOpen: "isOpen" }, outputs: { isOpenChange: "isOpenChange", onShown: "onShown", onHidden: "onHidden" }, host: { listeners: { "keydown.arrowDown": "navigationClick($event)", "keydown.arrowUp": "navigationClick($event)" }, properties: { "class.dropup": "dropup", "class.open": "isOpen", "class.show": "isOpen && isBs4" } }, providers: [BsDropdownState], exportAs: ["bs-dropdown"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: BsDropdownDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[bsDropdown], [dropdown]',
                    exportAs: 'bs-dropdown',
                    providers: [BsDropdownState],
                    // eslint-disable-next-line @angular-eslint/no-host-metadata-property
                    host: {
                        '[class.dropup]': 'dropup',
                        '[class.open]': 'isOpen',
                        '[class.show]': 'isOpen && isBs4'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i1.ComponentLoaderFactory }, { type: i2.BsDropdownState }, { type: i3.BsDropdownConfig }, { type: i4.AnimationBuilder }]; }, propDecorators: { placement: [{
                type: Input
            }], triggers: [{
                type: Input
            }], container: [{
                type: Input
            }], dropup: [{
                type: Input
            }], autoClose: [{
                type: Input
            }], isAnimated: [{
                type: Input
            }], insideClick: [{
                type: Input
            }], isDisabled: [{
                type: Input
            }], isOpen: [{
                type: Input
            }], isOpenChange: [{
                type: Output
            }], onShown: [{
                type: Output
            }], onHidden: [{
                type: Output
            }], navigationClick: [{
                type: HostListener,
                args: ['keydown.arrowDown', ['$event']]
            }, {
                type: HostListener,
                args: ['keydown.arrowUp', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnMtZHJvcGRvd24uZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Ryb3Bkb3duL2JzLWRyb3Bkb3duLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFVBQVUsRUFFVixZQUFZLEVBQ1osWUFBWSxFQUNaLEtBQUssRUFHTCxNQUFNLEVBQ04sU0FBUyxFQUNULGdCQUFnQixFQUNoQixNQUFNLGVBQWUsQ0FBQztBQUN4QixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFeEMsT0FBTyxFQUFtQixzQkFBc0IsRUFBa0IsTUFBTSxnQ0FBZ0MsQ0FBQztBQUV6RyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNqRixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFdEQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzVDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBb0IsTUFBTSxxQkFBcUIsQ0FBQztBQUN6RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7Ozs7O0FBYTFELE1BQU0sT0FBTyxtQkFBbUI7SUErSDlCLFlBQ1UsV0FBdUIsRUFDdkIsU0FBb0IsRUFDcEIsaUJBQW1DLEVBQ25DLElBQTRCLEVBQzVCLE1BQXVCLEVBQ3ZCLE9BQXlCLEVBQ2pDLFFBQTBCO1FBTmxCLGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBQ3ZCLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDcEIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUNuQyxTQUFJLEdBQUosSUFBSSxDQUF3QjtRQUM1QixXQUFNLEdBQU4sTUFBTSxDQUFpQjtRQUN2QixZQUFPLEdBQVAsT0FBTyxD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TTtnQkFnTVAsZUFBZTtzQkFGZCxZQUFZO3VCQUFDLG1CQUFtQixFQUFFLENBQUMsUUFBUSxDQUFDOztzQkFDNUMsWUFBWTt1QkFBQyxpQkFBaUIsRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgRGlyZWN0aXZlLFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgRW1iZWRkZWRWaWV3UmVmLFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBIb3N0TGlzdGVuZXIsXHJcbiAgSW5wdXQsXHJcbiAgT25EZXN0cm95LFxyXG4gIE9uSW5pdCxcclxuICBPdXRwdXQsXHJcbiAgUmVuZGVyZXIyLFxyXG4gIFZpZXdDb250YWluZXJSZWZcclxuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IENvbXBvbmVudExvYWRlciwgQ29tcG9uZW50TG9hZGVyRmFjdG9yeSwgQnNDb21wb25lbnRSZWYgfSBmcm9tICduZ3gtYm9vdHN0cmFwL2NvbXBvbmVudC1sb2FkZXInO1xyXG5cclxuaW1wb3J0IHsgQnNEcm9wZG93bkNvbmZpZyB9IGZyb20gJy4vYnMtZHJvcGRvd24uY29uZmlnJztcclxuaW1wb3J0IHsgQnNEcm9wZG93bkNvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4vYnMtZHJvcGRvd24tY29udGFpbmVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEJzRHJvcGRvd25TdGF0ZSB9IGZyb20gJy4vYnMtZHJvcGRvd24uc3RhdGUnO1xyXG5pbXBvcnQgeyBCc0Ryb3Bkb3duTWVudURpcmVjdGl2ZSB9IGZyb20gJy4vaW5kZXgnO1xyXG5pbXBvcnQgeyBpc0JzMyB9IGZyb20gJ25neC1ib290c3RyYXAvdXRpbHMnO1xyXG5pbXBvcnQgeyBBbmltYXRpb25CdWlsZGVyLCBBbmltYXRpb25GYWN0b3J5IH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XHJcbmltcG9ydCB7IGRyb3Bkb3duQW5pbWF0aW9uIH0gZnJvbSAnLi9kcm9wZG93bi1hbmltYXRpb25zJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW2JzRHJvcGRvd25dLCBbZHJvcGRvd25dJyxcclxuICBleHBvcnRBczogJ2JzLWRyb3Bkb3duJyxcclxuICBwcm92aWRlcnM6IFtCc0Ryb3Bkb3duU3RhdGVdLFxyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvbm8taG9zdC1tZXRhZGF0YS1wcm9wZXJ0eVxyXG4gIGhvc3Q6IHtcclxuICAgICdbY2xhc3MuZHJvcHVwXSc6ICdkcm9wdXAnLFxyXG4gICAgJ1tjbGFzcy5vcGVuXSc6ICdpc09wZW4nLFxyXG4gICAgJ1tjbGFzcy5zaG93XSc6ICdpc09wZW4gJiYgaXNCczQnXHJcbiAgfVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQnNEcm9wZG93bkRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICAvKipcclxuICAgKiBQbGFjZW1lbnQgb2YgYSBwb3BvdmVyLiBBY2NlcHRzOiBcInRvcFwiLCBcImJvdHRvbVwiLCBcImxlZnRcIiwgXCJyaWdodFwiXHJcbiAgICovXHJcbiAgQElucHV0KCkgcGxhY2VtZW50Pzogc3RyaW5nO1xyXG4gIC8qKlxyXG4gICAqIFNwZWNpZmllcyBldmVudHMgdGhhdCBzaG91bGQgdHJpZ2dlci4gU3VwcG9ydHMgYSBzcGFjZSBzZXBhcmF0ZWQgbGlzdCBvZlxyXG4gICAqIGV2ZW50IG5hbWVzLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHRyaWdnZXJzPzogc3RyaW5nO1xyXG4gIC8qKlxyXG4gICAqIEEgc2VsZWN0b3Igc3BlY2lmeWluZyB0aGUgZWxlbWVudCB0aGUgcG9wb3ZlciBzaG91bGQgYmUgYXBwZW5kZWQgdG8uXHJcbiAgICovXHJcbiAgQElucHV0KCkgY29udGFpbmVyPzogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGF0dHJpYnV0ZSBpbmRpY2F0ZXMgdGhhdCB0aGUgZHJvcGRvd24gc2hvdWxkIGJlIG9wZW5lZCB1cHdhcmRzXHJcbiAgICovXHJcbiAgQElucHV0KCkgZHJvcHVwID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIEluZGljYXRlcyB0aGF0IGRyb3Bkb3duIHdpbGwgYmUgY2xvc2VkIG9uIGl0ZW0gb3IgZG9jdW1lbnQgY2xpY2ssXHJcbiAgICogYW5kIGFmdGVyIHByZXNzaW5nIEVTQ1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IGF1dG9DbG9zZSh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5fc3RhdGUuYXV0b0Nsb3NlID0gdmFsdWU7XHJcbiAgfVxyXG5cclxuICBnZXQgYXV0b0Nsb3NlKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX3N0YXRlLmF1dG9DbG9zZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEluZGljYXRlcyB0aGF0IGRyb3Bkb3duIHdpbGwgYmUgYW5pbWF0ZWRcclxuICAgKi9cclxuICBASW5wdXQoKVxyXG4gIHNldCBpc0FuaW1hdGVkKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl9zdGF0ZS5pc0FuaW1hdGVkID0gdmFsdWU7XHJcbiAgfVxyXG5cclxuICBnZXQgaXNBbmltYXRlZCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl9zdGF0ZS5pc0FuaW1hdGVkO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBhdHRyaWJ1dGUgaW5kaWNhdGVzIHRoYXQgdGhlIGRyb3Bkb3duIHNob3VsZG4ndCBjbG9zZSBvbiBpbnNpZGUgY2xpY2sgd2hlbiBhdXRvQ2xvc2UgaXMgc2V0IHRvIHRydWVcclxuICAgKi9cclxuICBASW5wdXQoKVxyXG4gIHNldCBpbnNpZGVDbGljayh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5fc3RhdGUuaW5zaWRlQ2xpY2sgPSB2YWx1ZTtcclxuICB9XHJcblxyXG4gIGdldCBpbnNpZGVDbGljaygpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl9zdGF0ZS5pbnNpZGVDbGljaztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERpc2FibGVzIGRyb3Bkb3duIHRvZ2dsZSBhbmQgaGlkZXMgZHJvcGRvd24gbWVudSBpZiBvcGVuZWRcclxuICAgKi9cclxuICBASW5wdXQoKVxyXG4gIHNldCBpc0Rpc2FibGVkKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl9pc0Rpc2FibGVkID0gdmFsdWU7XHJcbiAgICB0aGlzLl9zdGF0ZS5pc0Rpc2FibGVkQ2hhbmdlLmVtaXQodmFsdWUpO1xyXG4gICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgIHRoaXMuaGlkZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0IGlzRGlzYWJsZWQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5faXNEaXNhYmxlZDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhlIHBvcG92ZXIgaXMgY3VycmVudGx5IGJlaW5nIHNob3duXHJcbiAgICovXHJcbiAgQElucHV0KClcclxuICBnZXQgaXNPcGVuKCk6IGJvb2xlYW4ge1xyXG4gICAgaWYgKHRoaXMuX3Nob3dJbmxpbmUpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX2lzSW5saW5lT3BlbjtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5fZHJvcGRvd24uaXNTaG93bjtcclxuICB9XHJcblxyXG4gIHNldCBpc09wZW4odmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICB0aGlzLnNob3coKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaGlkZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRW1pdHMgYW4gZXZlbnQgd2hlbiBpc09wZW4gY2hhbmdlXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIGlzT3BlbkNoYW5nZTogRXZlbnRFbWl0dGVyPGJvb2xlYW4+O1xyXG5cclxuICAvKipcclxuICAgKiBFbWl0cyBhbiBldmVudCB3aGVuIHRoZSBwb3BvdmVyIGlzIHNob3duXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIG9uU2hvd246IEV2ZW50RW1pdHRlcjxib29sZWFuPjtcclxuXHJcbiAgLyoqXHJcbiAgICogRW1pdHMgYW4gZXZlbnQgd2hlbiB0aGUgcG9wb3ZlciBpcyBoaWRkZW5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgb25IaWRkZW46IEV2ZW50RW1pdHRlcjxib29sZWFuPjtcclxuXHJcbiAgZ2V0IGlzQnM0KCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuICFpc0JzMygpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfZHJvcGRvd246IENvbXBvbmVudExvYWRlcjxCc0Ryb3Bkb3duQ29udGFpbmVyQ29tcG9uZW50PjtcclxuXHJcbiAgcHJpdmF0ZSBnZXQgX3Nob3dJbmxpbmUoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gIXRoaXMuY29udGFpbmVyO1xyXG4gIH1cclxuXHJcbiAgLy8gdG9kbzogbW92ZSB0byBjb21wb25lbnQgbG9hZGVyXHJcbiAgcHJpdmF0ZSBfaXNJbmxpbmVPcGVuID0gZmFsc2U7XHJcblxyXG4gIHByaXZhdGUgX2lubGluZWRNZW51PzogRW1iZWRkZWRWaWV3UmVmPEJzRHJvcGRvd25NZW51RGlyZWN0aXZlPjtcclxuICBwcml2YXRlIF9pc0Rpc2FibGVkID0gZmFsc2U7XHJcbiAgcHJpdmF0ZSBfc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcclxuICBwcml2YXRlIF9pc0luaXRlZCA9IGZhbHNlO1xyXG4gIHByaXZhdGUgX2ZhY3RvcnlEcm9wRG93bkFuaW1hdGlvbjogQW5pbWF0aW9uRmFjdG9yeTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmLFxyXG4gICAgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMixcclxuICAgIHByaXZhdGUgX3ZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXHJcbiAgICBwcml2YXRlIF9jaXM6IENvbXBvbmVudExvYWRlckZhY3RvcnksXHJcbiAgICBwcml2YXRlIF9zdGF0ZTogQnNEcm9wZG93blN0YXRlLFxyXG4gICAgcHJpdmF0ZSBfY29uZmlnOiBCc0Ryb3Bkb3duQ29uZmlnLFxyXG4gICAgX2J1aWxkZXI6IEFuaW1hdGlvbkJ1aWxkZXJcclxuICApIHtcclxuICAgIC8vIHNldCBpbml0aWFsIGRyb3Bkb3duIHN0YXRlIGZyb20gY29uZmlnXHJcbiAgICB0aGlzLl9zdGF0ZS5hdXRvQ2xvc2UgPSB0aGlzLl9jb25maWcuYXV0b0Nsb3NlO1xyXG4gICAgdGhpcy5fc3RhdGUuaW5zaWRlQ2xpY2sgPSB0aGlzLl9jb25maWcuaW5zaWRlQ2xpY2s7XHJcbiAgICB0aGlzLl9zdGF0ZS5pc0FuaW1hdGVkID0gdGhpcy5fY29uZmlnLmlzQW5pbWF0ZWQ7XHJcbiAgICB0aGlzLl9zdGF0ZS5zdG9wT25DbGlja1Byb3BhZ2F0aW9uID0gdGhpcy5fY29uZmlnLnN0b3BPbkNsaWNrUHJvcGFnYXRpb247XHJcblxyXG4gICAgdGhpcy5fZmFjdG9yeURyb3BEb3duQW5pbWF0aW9uID0gX2J1aWxkZXIuYnVpbGQoZHJvcGRvd25BbmltYXRpb24pO1xyXG5cclxuICAgIC8vIGNyZWF0ZSBkcm9wZG93biBjb21wb25lbnQgbG9hZGVyXHJcbiAgICB0aGlzLl9kcm9wZG93biA9IHRoaXMuX2Npc1xyXG4gICAgICAuY3JlYXRlTG9hZGVyPEJzRHJvcGRvd25Db250YWluZXJDb21wb25lbnQ+KFxyXG4gICAgICAgIHRoaXMuX2VsZW1lbnRSZWYsXHJcbiAgICAgICAgdGhpcy5fdmlld0NvbnRhaW5lclJlZixcclxuICAgICAgICB0aGlzLl9yZW5kZXJlclxyXG4gICAgICApXHJcbiAgICAgIC5wcm92aWRlKHtwcm92aWRlOiBCc0Ryb3Bkb3duU3RhdGUsIHVzZVZhbHVlOiB0aGlzLl9zdGF0ZX0pO1xyXG5cclxuICAgIHRoaXMub25TaG93biA9IHRoaXMuX2Ryb3Bkb3duLm9uU2hvd247XHJcbiAgICB0aGlzLm9uSGlkZGVuID0gdGhpcy5fZHJvcGRvd24ub25IaWRkZW47XHJcbiAgICB0aGlzLmlzT3BlbkNoYW5nZSA9IHRoaXMuX3N0YXRlLmlzT3BlbkNoYW5nZTtcclxuXHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIC8vIGZpeDogc2VlbXMgdGhlcmUgYXJlIGFuIGlzc3VlIHdpdGggYHJvdXRlckxpbmtBY3RpdmVgXHJcbiAgICAvLyB3aGljaCByZXN1bHQgaW4gZHVwbGljYXRlZCBjYWxsIG5nT25Jbml0IHdpdGhvdXQgY2FsbCB0byBuZ09uRGVzdHJveVxyXG4gICAgLy8gcmVhZCBtb3JlOiBodHRwczovL2dpdGh1Yi5jb20vdmFsb3Itc29mdHdhcmUvbmd4LWJvb3RzdHJhcC9pc3N1ZXMvMTg4NVxyXG4gICAgaWYgKHRoaXMuX2lzSW5pdGVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMuX2lzSW5pdGVkID0gdHJ1ZTtcclxuXHJcbiAgICAvLyBhdHRhY2ggRE9NIGxpc3RlbmVyc1xyXG4gICAgdGhpcy5fZHJvcGRvd24ubGlzdGVuKHtcclxuICAgICAgLy8gYmVjYXVzZSBvZiBkcm9wZG93biBpbmxpbmUgbW9kZVxyXG4gICAgICBvdXRzaWRlQ2xpY2s6IGZhbHNlLFxyXG4gICAgICB0cmlnZ2VyczogdGhpcy50cmlnZ2VycyxcclxuICAgICAgc2hvdzogKCkgPT4gdGhpcy5zaG93KClcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIHRvZ2dsZSB2aXNpYmlsaXR5IG9uIHRvZ2dsZSBlbGVtZW50IGNsaWNrXHJcbiAgICB0aGlzLl9zdWJzY3JpcHRpb25zLnB1c2goXHJcbiAgICAgIHRoaXMuX3N0YXRlLnRvZ2dsZUNsaWNrLnN1YnNjcmliZSgodmFsdWU6IGJvb2xlYW4pID0+IHRoaXMudG9nZ2xlKHZhbHVlKSlcclxuICAgICk7XHJcblxyXG4gICAgLy8gaGlkZSBkcm9wZG93biBpZiBzZXQgZGlzYWJsZWQgd2hpbGUgb3BlbmVkXHJcbiAgICB0aGlzLl9zdWJzY3JpcHRpb25zLnB1c2goXHJcbiAgICAgIHRoaXMuX3N0YXRlLmlzRGlzYWJsZWRDaGFuZ2VcclxuICAgICAgICAucGlwZShcclxuICAgICAgICAgIGZpbHRlcigodmFsdWU6IGJvb2xlYW4pID0+IHZhbHVlKVxyXG4gICAgICAgIClcclxuICAgICAgICAuc3Vic2NyaWJlKCgvKnZhbHVlOiBib29sZWFuKi8pID0+IHRoaXMuaGlkZSgpKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE9wZW5zIGFuIGVsZW1lbnTigJlzIHBvcG92ZXIuIFRoaXMgaXMgY29uc2lkZXJlZCBhIOKAnG1hbnVhbOKAnSB0cmlnZ2VyaW5nIG9mXHJcbiAgICogdGhlIHBvcG92ZXIuXHJcbiAgICovXHJcbiAgc2hvdygpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmlzT3BlbiB8fCB0aGlzLmlzRGlzYWJsZWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLl9zaG93SW5saW5lKSB7XHJcbiAgICAgIGlmICghdGhpcy5faW5saW5lZE1lbnUpIHtcclxuICAgICAgICB0aGlzLl9zdGF0ZS5kcm9wZG93bk1lbnUudGhlbihcclxuICAgICAgICAgIChkcm9wZG93bk1lbnU6IEJzQ29tcG9uZW50UmVmPEJzRHJvcGRvd25NZW51RGlyZWN0aXZlPikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9kcm9wZG93bi5hdHRhY2hJbmxpbmUoXHJcbiAgICAgICAgICAgICAgZHJvcGRvd25NZW51LnZpZXdDb250YWluZXIsXHJcbiAgICAgICAgICAgICAgZHJvcGRvd25NZW51LnRlbXBsYXRlUmVmXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIHRoaXMuX2lubGluZWRNZW51ID0gdGhpcy5fZHJvcGRvd24uX2lubGluZVZpZXdSZWY7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFkZEJzNFBvbHlmaWxscygpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5faW5saW5lZE1lbnUpIHtcclxuICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyh0aGlzLl9pbmxpbmVkTWVudS5yb290Tm9kZXNbMF0ucGFyZW50Tm9kZSwgJ29wZW4nKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5wbGF5QW5pbWF0aW9uKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgICAgIC8vIHN3YWxsb3cgZXJyb3JzXHJcbiAgICAgICAgICAuY2F0Y2goKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmFkZEJzNFBvbHlmaWxscygpO1xyXG5cclxuICAgICAgdGhpcy5faXNJbmxpbmVPcGVuID0gdHJ1ZTtcclxuICAgICAgdGhpcy5vblNob3duLmVtaXQodHJ1ZSk7XHJcbiAgICAgIHRoaXMuX3N0YXRlLmlzT3BlbkNoYW5nZS5lbWl0KHRydWUpO1xyXG5cclxuICAgICAgdGhpcy5wbGF5QW5pbWF0aW9uKCk7XHJcblxyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLl9zdGF0ZS5kcm9wZG93bk1lbnUudGhlbihkcm9wZG93bk1lbnUgPT4ge1xyXG4gICAgICAvLyBjaGVjayBkaXJlY3Rpb24gaW4gd2hpY2ggZHJvcGRvd24gc2hvdWxkIGJlIG9wZW5lZFxyXG4gICAgICBjb25zdCBfZHJvcHVwID1cclxuICAgICAgICB0aGlzLmRyb3B1cCB8fFxyXG4gICAgICAgICh0eXBlb2YgdGhpcy5kcm9wdXAgIT09ICd1bmRlZmluZWQnICYmIHRoaXMuZHJvcHVwKTtcclxuICAgICAgdGhpcy5fc3RhdGUuZGlyZWN0aW9uID0gX2Ryb3B1cCA/ICd1cCcgOiAnZG93bic7XHJcbiAgICAgIGNvbnN0IF9wbGFjZW1lbnQgPSB0aGlzLnBsYWNlbWVudCB8fCAoX2Ryb3B1cCA/ICd0b3Agc3RhcnQnIDogJ2JvdHRvbSBzdGFydCcpO1xyXG5cclxuICAgICAgLy8gc2hvdyBkcm9wZG93blxyXG4gICAgICB0aGlzLl9kcm9wZG93blxyXG4gICAgICAgIC5hdHRhY2goQnNEcm9wZG93bkNvbnRhaW5lckNvbXBvbmVudClcclxuICAgICAgICAudG8odGhpcy5jb250YWluZXIpXHJcbiAgICAgICAgLnBvc2l0aW9uKHthdHRhY2htZW50OiBfcGxhY2VtZW50fSlcclxuICAgICAgICAuc2hvdyh7XHJcbiAgICAgICAgICBjb250ZW50OiBkcm9wZG93bk1lbnUudGVtcGxhdGVSZWYsXHJcbiAgICAgICAgICBwbGFjZW1lbnQ6IF9wbGFjZW1lbnRcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgIHRoaXMuX3N0YXRlLmlzT3BlbkNoYW5nZS5lbWl0KHRydWUpO1xyXG4gICAgfSlcclxuICAgIC8vIHN3YWxsb3cgZXJyb3JcclxuICAgICAgLmNhdGNoKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDbG9zZXMgYW4gZWxlbWVudOKAmXMgcG9wb3Zlci4gVGhpcyBpcyBjb25zaWRlcmVkIGEg4oCcbWFudWFs4oCdIHRyaWdnZXJpbmcgb2ZcclxuICAgKiB0aGUgcG9wb3Zlci5cclxuICAgKi9cclxuICBoaWRlKCk6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzLmlzT3Blbikge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuX3Nob3dJbmxpbmUpIHtcclxuICAgICAgdGhpcy5yZW1vdmVTaG93Q2xhc3MoKTtcclxuICAgICAgdGhpcy5yZW1vdmVEcm9wdXBTdHlsZXMoKTtcclxuICAgICAgdGhpcy5faXNJbmxpbmVPcGVuID0gZmFsc2U7XHJcbiAgICAgIHRoaXMub25IaWRkZW4uZW1pdCh0cnVlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuX2Ryb3Bkb3duLmhpZGUoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9zdGF0ZS5pc09wZW5DaGFuZ2UuZW1pdChmYWxzZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUb2dnbGVzIGFuIGVsZW1lbnTigJlzIHBvcG92ZXIuIFRoaXMgaXMgY29uc2lkZXJlZCBhIOKAnG1hbnVhbOKAnSB0cmlnZ2VyaW5nIG9mXHJcbiAgICogdGhlIHBvcG92ZXIuIFdpdGggcGFyYW1ldGVyIDxjb2RlPnRydWU8L2NvZGU+IGFsbG93cyB0b2dnbGluZywgd2l0aCBwYXJhbWV0ZXIgPGNvZGU+ZmFsc2U8L2NvZGU+XHJcbiAgICogb25seSBoaWRlcyBvcGVuZWQgZHJvcGRvd24uIFBhcmFtZXRlciB1c2FnZSB3aWxsIGJlIHJlbW92ZWQgaW4gbmd4LWJvb3RzdHJhcCB2M1xyXG4gICAqL1xyXG4gIHRvZ2dsZSh2YWx1ZT86IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmlzT3BlbiB8fCAhdmFsdWUpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuaGlkZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLnNob3coKTtcclxuICB9XHJcblxyXG4gIC8qKiBAaW50ZXJuYWwgKi9cclxuICBfY29udGFpbnMoZXZlbnQ6IE1vdXNlRXZlbnQpOiBib29sZWFuIHtcclxuICAgIC8vIHRvZG86IHZhbG9ya2luIGZpeCB0eXBpbmdzXHJcbiAgICByZXR1cm4gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkgfHxcclxuICAgICAgKHRoaXMuX2Ryb3Bkb3duLmluc3RhbmNlICYmIHRoaXMuX2Ryb3Bkb3duLmluc3RhbmNlLl9jb250YWlucyhldmVudC50YXJnZXQgYXMgdW5rbm93biBhcyBIVE1MRWxlbWVudCkpO1xyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bi5hcnJvd0Rvd24nLCBbJyRldmVudCddKVxyXG4gIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24uYXJyb3dVcCcsIFsnJGV2ZW50J10pXHJcbiAgbmF2aWdhdGlvbkNsaWNrKGV2ZW50OiBhbnkpOiB2b2lkIHtcclxuICAgIGNvbnN0IHJlZiA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuZHJvcGRvd24tbWVudScpO1xyXG5cclxuICAgIGlmICghcmVmKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBmaXJzdEFjdGl2ZSA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vd25lckRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XHJcbiAgICBjb25zdCBhbGxSZWYgPSByZWYucXVlcnlTZWxlY3RvckFsbCgnLmRyb3Bkb3duLWl0ZW0nKTtcclxuICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xyXG4gICAgICBjYXNlIDM4OlxyXG4gICAgICAgIGlmICh0aGlzLl9zdGF0ZS5jb3VudHMgPiAwKSB7XHJcbiAgICAgICAgICBhbGxSZWZbLS10aGlzLl9zdGF0ZS5jb3VudHNdLmZvY3VzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIDQwOlxyXG4gICAgICAgIGlmICh0aGlzLl9zdGF0ZS5jb3VudHMgKyAxIDwgYWxsUmVmLmxlbmd0aCkge1xyXG4gICAgICAgICAgaWYgKGZpcnN0QWN0aXZlLmNsYXNzTGlzdCAhPT0gYWxsUmVmW3RoaXMuX3N0YXRlLmNvdW50c10uY2xhc3NMaXN0KSB7XHJcbiAgICAgICAgICAgIGFsbFJlZlt0aGlzLl9zdGF0ZS5jb3VudHNdLmZvY3VzKCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhbGxSZWZbKyt0aGlzLl9zdGF0ZS5jb3VudHNdLmZvY3VzKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgfVxyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgLy8gY2xlYW4gdXAgc3Vic2NyaXB0aW9ucyBhbmQgZGVzdHJveSBkcm9wZG93blxyXG4gICAgZm9yIChjb25zdCBzdWIgb2YgdGhpcy5fc3Vic2NyaXB0aW9ucykge1xyXG4gICAgICBzdWIudW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuICAgIHRoaXMuX2Ryb3Bkb3duLmRpc3Bvc2UoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYWRkQnM0UG9seWZpbGxzKCk6IHZvaWQge1xyXG4gICAgaWYgKCFpc0JzMygpKSB7XHJcbiAgICAgIHRoaXMuYWRkU2hvd0NsYXNzKCk7XHJcbiAgICAgIHRoaXMuY2hlY2tSaWdodEFsaWdubWVudCgpO1xyXG4gICAgICB0aGlzLmFkZERyb3B1cFN0eWxlcygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBwbGF5QW5pbWF0aW9uKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuX3N0YXRlLmlzQW5pbWF0ZWQgJiYgdGhpcy5faW5saW5lZE1lbnUpIHtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2lubGluZWRNZW51KSB7XHJcbiAgICAgICAgICB0aGlzLl9mYWN0b3J5RHJvcERvd25BbmltYXRpb24uY3JlYXRlKHRoaXMuX2lubGluZWRNZW51LnJvb3ROb2Rlc1swXSkucGxheSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFkZFNob3dDbGFzcygpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLl9pbmxpbmVkTWVudSAmJiB0aGlzLl9pbmxpbmVkTWVudS5yb290Tm9kZXNbMF0pIHtcclxuICAgICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5faW5saW5lZE1lbnUucm9vdE5vZGVzWzBdLCAnc2hvdycpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSByZW1vdmVTaG93Q2xhc3MoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5faW5saW5lZE1lbnUgJiYgdGhpcy5faW5saW5lZE1lbnUucm9vdE5vZGVzWzBdKSB7XHJcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuX2lubGluZWRNZW51LnJvb3ROb2Rlc1swXSwgJ3Nob3cnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgY2hlY2tSaWdodEFsaWdubWVudCgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLl9pbmxpbmVkTWVudSAmJiB0aGlzLl9pbmxpbmVkTWVudS5yb290Tm9kZXNbMF0pIHtcclxuICAgICAgY29uc3QgaXNSaWdodEFsaWduZWQgPSB0aGlzLl9pbmxpbmVkTWVudS5yb290Tm9kZXNbMF0uY2xhc3NMaXN0LmNvbnRhaW5zKFxyXG4gICAgICAgICdkcm9wZG93bi1tZW51LXJpZ2h0J1xyXG4gICAgICApIHx8IHRoaXMuX2lubGluZWRNZW51LnJvb3ROb2Rlc1swXS5jbGFzc0xpc3QuY29udGFpbnMoXHJcbiAgICAgICAgJ2Ryb3Bkb3duLW1lbnUtZW5kJ1xyXG4gICAgICApO1xyXG5cclxuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoXHJcbiAgICAgICAgdGhpcy5faW5saW5lZE1lbnUucm9vdE5vZGVzWzBdLFxyXG4gICAgICAgICdsZWZ0JyxcclxuICAgICAgICBpc1JpZ2h0QWxpZ25lZCA/ICdhdXRvJyA6ICcwJ1xyXG4gICAgICApO1xyXG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShcclxuICAgICAgICB0aGlzLl9pbmxpbmVkTWVudS5yb290Tm9kZXNbMF0sXHJcbiAgICAgICAgJ3JpZ2h0JyxcclxuICAgICAgICBpc1JpZ2h0QWxpZ25lZCA/ICcwJyA6ICdhdXRvJ1xyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhZGREcm9wdXBTdHlsZXMoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5faW5saW5lZE1lbnUgJiYgdGhpcy5faW5saW5lZE1lbnUucm9vdE5vZGVzWzBdKSB7XHJcbiAgICAgIC8vIGEgbGl0dGxlIGhhY2sgdG8gbm90IGJyZWFrIHN1cHBvcnQgb2YgYm9vdHN0cmFwIDQgYmV0YVxyXG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShcclxuICAgICAgICB0aGlzLl9pbmxpbmVkTWVudS5yb290Tm9kZXNbMF0sXHJcbiAgICAgICAgJ3RvcCcsXHJcbiAgICAgICAgdGhpcy5kcm9wdXAgPyAnYXV0bycgOiAnMTAwJSdcclxuICAgICAgKTtcclxuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoXHJcbiAgICAgICAgdGhpcy5faW5saW5lZE1lbnUucm9vdE5vZGVzWzBdLFxyXG4gICAgICAgICd0cmFuc2Zvcm0nLFxyXG4gICAgICAgIHRoaXMuZHJvcHVwID8gJ3RyYW5zbGF0ZVkoLTEwMSUpJyA6ICd0cmFuc2xhdGVZKDApJ1xyXG4gICAgICApO1xyXG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShcclxuICAgICAgICB0aGlzLl9pbmxpbmVkTWVudS5yb290Tm9kZXNbMF0sXHJcbiAgICAgICAgJ2JvdHRvbScsXHJcbiAgICAgICAgJ2F1dG8nXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHJlbW92ZURyb3B1cFN0eWxlcygpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLl9pbmxpbmVkTWVudSAmJiB0aGlzLl9pbmxpbmVkTWVudS5yb290Tm9kZXNbMF0pIHtcclxuICAgICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlU3R5bGUodGhpcy5faW5saW5lZE1lbnUucm9vdE5vZGVzWzBdLCAndG9wJyk7XHJcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZVN0eWxlKHRoaXMuX2lubGluZWRNZW51LnJvb3ROb2Rlc1swXSwgJ3RyYW5zZm9ybScpO1xyXG4gICAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVTdHlsZSh0aGlzLl9pbmxpbmVkTWVudS5yb290Tm9kZXNbMF0sICdib3R0b20nKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19