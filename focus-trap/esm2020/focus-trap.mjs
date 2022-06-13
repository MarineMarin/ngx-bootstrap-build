/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/* eslint-disable */
import { coerceBooleanProperty } from './boolean-property';
import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, Inject, Injectable, Input, NgZone } from '@angular/core';
import { take } from 'rxjs/operators';
import { InteractivityChecker } from './interactivity-checker';
import * as i0 from "@angular/core";
import * as i1 from "./interactivity-checker";
/**
 * Class that allows for trapping focus within a DOM element.
 *
 * This class currently uses a relatively simple approach to focus trapping.
 * It assumes that the tab order is the same as DOM order, which is not necessarily true.
 * Things like `tabIndex > 0`, flex `order`, and shadow roots can cause the two to misalign.
 *
 * @deprecated Use `ConfigurableFocusTrap` instead.
 * @breaking-change for 11.0.0 Remove this class.
 */
export class FocusTrap {
    constructor(_element, _checker, _ngZone, _document, deferAnchors = false) {
        this._element = _element;
        this._checker = _checker;
        this._ngZone = _ngZone;
        this._document = _document;
        this._hasAttached = false;
        // Event listeners for the anchors. Need to be regular functions so that we can unbind them later.
        this.startAnchorListener = () => this.focusLastTabbableElement();
        this.endAnchorListener = () => this.focusFirstTabbableElement();
        this._enabled = true;
        if (!deferAnchors) {
            this.attachAnchors();
        }
    }
    /** Whether the focus trap is active. */
    get enabled() {
        return this._enabled;
    }
    set enabled(value) {
        this._enabled = value;
        if (this._startAnchor && this._endAnchor) {
            this._toggleAnchorTabIndex(value, this._startAnchor);
            this._toggleAnchorTabIndex(value, this._endAnchor);
        }
    }
    /** Destroys the focus trap by cleaning up the anchors. */
    destroy() {
        const startAnchor = this._startAnchor;
        const endAnchor = this._endAnchor;
        if (startAnchor) {
            startAnchor.removeEventListener('focus', this.startAnchorListener);
            if (startAnchor.parentNode) {
                startAnchor.parentNode.removeChild(startAnchor);
            }
        }
        if (endAnchor) {
            endAnchor.removeEventListener('focus', this.endAnchorListener);
            if (endAnchor.parentNode) {
                endAnchor.parentNode.removeChild(endAnchor);
            }
        }
        this._startAnchor = this._endAnchor = null;
        this._hasAttached = false;
    }
    /**
     * Inserts the anchors into the DOM. This is usually done automatically
     * in the constructor, but can be deferred for cases like directives with `*ngIf`.
     * @returns Whether the focus trap managed to attach successfuly. This may not be the case
     * if the target element isn't currently in the DOM.
     */
    attachAnchors() {
        // If we're not on the browser, there can be no focus to trap.
        if (this._hasAttached) {
            return true;
        }
        this._ngZone.runOutsideAngular(() => {
            if (!this._startAnchor) {
                this._startAnchor = this._createAnchor();
                this._startAnchor.addEventListener('focus', this.startAnchorListener);
            }
            if (!this._endAnchor) {
                this._endAnchor = this._createAnchor();
                this._endAnchor.addEventListener('focus', this.endAnchorListener);
            }
        });
        if (this._element.parentNode) {
            this._element.parentNode.insertBefore(this._startAnchor, this._element);
            this._element.parentNode.insertBefore(this._endAnchor, this._element.nextSibling);
            this._hasAttached = true;
        }
        return this._hasAttached;
    }
    /**
     * Waits for the zone to stabilize, then either focuses the first element that the
     * user specified, or the first tabbable element.
     * @returns Returns a promise that resolves with a boolean, depending
     * on whether focus was moved successfully.
     */
    focusInitialElementWhenReady() {
        return new Promise(resolve => {
            this._executeOnStable(() => resolve(this.focusInitialElement()));
        });
    }
    /**
     * Waits for the zone to stabilize, then focuses
     * the first tabbable element within the focus trap region.
     * @returns Returns a promise that resolves with a boolean, depending
     * on whether focus was moved successfully.
     */
    focusFirstTabbableElementWhenReady() {
        return new Promise(resolve => {
            this._executeOnStable(() => resolve(this.focusFirstTabbableElement()));
        });
    }
    /**
     * Waits for the zone to stabilize, then focuses
     * the last tabbable element within the focus trap region.
     * @returns Returns a promise that resolves with a boolean, depending
     * on whether focus was moved successfully.
     */
    focusLastTabbableElementWhenReady() {
        return new Promise(resolve => {
            this._executeOnStable(() => resolve(this.focusLastTabbableElement()));
        });
    }
    /**
     * Get the specified boundary element of the trapped region.
     * @param bound The boundary to get (start or end of trapped region).
     * @returns The boundary element.
     */
    _getRegionBoundary(bound) {
        // Contains the deprecated version of selector, for temporary backwards comparability.
        let markers = this._element.querySelectorAll(`[cdk-focus-region-${bound}], ` +
            `[cdkFocusRegion${bound}], ` +
            `[cdk-focus-${bound}]`);
        for (let i = 0; i < markers.length; i++) {
            // @breaking-change 8.0.0
            if (markers[i].hasAttribute(`cdk-focus-${bound}`)) {
                console.warn(`Found use of deprecated attribute 'cdk-focus-${bound}', ` +
                    `use 'cdkFocusRegion${bound}' instead. The deprecated ` +
                    `attribute will be removed in 8.0.0.`, markers[i]);
            }
            else if (markers[i].hasAttribute(`cdk-focus-region-${bound}`)) {
                console.warn(`Found use of deprecated attribute 'cdk-focus-region-${bound}', ` +
                    `use 'cdkFocusRegion${bound}' instead. The deprecated attribute ` +
                    `will be removed in 8.0.0.`, markers[i]);
            }
        }
        if (bound == 'start') {
            return markers.length ? markers[0] : this._getFirstTabbableElement(this._element);
        }
        return markers.length ?
            markers[markers.length - 1] : this._getLastTabbableElement(this._element);
    }
    /**
     * Focuses the element that should be focused when the focus trap is initialized.
     * @returns Whether focus was moved successfully.
     */
    focusInitialElement() {
        // Contains the deprecated version of selector, for temporary backwards comparability.
        const redirectToElement = this._element.querySelector(`[cdk-focus-initial], ` +
            `[cdkFocusInitial]`);
        if (redirectToElement) {
            // @breaking-change 8.0.0
            if (redirectToElement.hasAttribute(`cdk-focus-initial`)) {
                console.warn(`Found use of deprecated attribute 'cdk-focus-initial', ` +
                    `use 'cdkFocusInitial' instead. The deprecated attribute ` +
                    `will be removed in 8.0.0`, redirectToElement);
            }
            // Warn the consumer if the element they've pointed to
            // isn't focusable, when not in production mode.
            if (!this._checker.isFocusable(redirectToElement)) {
                const focusableChild = this._getFirstTabbableElement(redirectToElement);
                focusableChild?.focus();
                return !!focusableChild;
            }
            redirectToElement.focus();
            return true;
        }
        return this.focusFirstTabbableElement();
    }
    /**
     * Focuses the first tabbable element within the focus trap region.
     * @returns Whether focus was moved successfully.
     */
    focusFirstTabbableElement() {
        const redirectToElement = this._getRegionBoundary('start');
        if (redirectToElement) {
            redirectToElement.focus();
        }
        return !!redirectToElement;
    }
    /**
     * Focuses the last tabbable element within the focus trap region.
     * @returns Whether focus was moved successfully.
     */
    focusLastTabbableElement() {
        const redirectToElement = this._getRegionBoundary('end');
        if (redirectToElement) {
            redirectToElement.focus();
        }
        return !!redirectToElement;
    }
    /**
     * Checks whether the focus trap has successfully been attached.
     */
    hasAttached() {
        return this._hasAttached;
    }
    /** Get the first tabbable element from a DOM subtree (inclusive). */
    _getFirstTabbableElement(root) {
        if (this._checker.isFocusable(root) && this._checker.isTabbable(root)) {
            return root;
        }
        // Iterate in DOM order. Note that IE doesn't have `children` for SVG so we fall
        // back to `childNodes` which includes text nodes, comments etc.
        let children = root.children || root.childNodes;
        for (let i = 0; i < children.length; i++) {
            let tabbableChild = children[i].nodeType === this._document.ELEMENT_NODE ?
                this._getFirstTabbableElement(children[i]) :
                null;
            if (tabbableChild) {
                return tabbableChild;
            }
        }
        return null;
    }
    /** Get the last tabbable element from a DOM subtree (inclusive). */
    _getLastTabbableElement(root) {
        if (this._checker.isFocusable(root) && this._checker.isTabbable(root)) {
            return root;
        }
        // Iterate in reverse DOM order.
        let children = root.children || root.childNodes;
        for (let i = children.length - 1; i >= 0; i--) {
            let tabbableChild = children[i].nodeType === this._document.ELEMENT_NODE ?
                this._getLastTabbableElement(children[i]) :
                null;
            if (tabbableChild) {
                return tabbableChild;
            }
        }
        return null;
    }
    /** Creates an anchor element. */
    _createAnchor() {
        const anchor = this._document.createElement('div');
        this._toggleAnchorTabIndex(this._enabled, anchor);
        anchor.classList.add('cdk-visually-hidden');
        anchor.classList.add('cdk-focus-trap-anchor');
        anchor.setAttribute('aria-hidden', 'true');
        return anchor;
    }
    /**
     * Toggles the `tabindex` of an anchor, based on the enabled state of the focus trap.
     * @param isEnabled Whether the focus trap is enabled.
     * @param anchor Anchor on which to toggle the tabindex.
     */
    _toggleAnchorTabIndex(isEnabled, anchor) {
        // Remove the tabindex completely, rather than setting it to -1, because if the
        // element has a tabindex, the user might still hit it when navigating with the arrow keys.
        isEnabled ? anchor.setAttribute('tabindex', '0') : anchor.removeAttribute('tabindex');
    }
    /**
     * Toggles the`tabindex` of both anchors to either trap Tab focus or allow it to escape.
     * @param enabled: Whether the anchors should trap Tab.
     */
    toggleAnchors(enabled) {
        if (this._startAnchor && this._endAnchor) {
            this._toggleAnchorTabIndex(enabled, this._startAnchor);
            this._toggleAnchorTabIndex(enabled, this._endAnchor);
        }
    }
    /** Executes a function when the zone is stable. */
    _executeOnStable(fn) {
        if (this._ngZone.isStable) {
            fn();
        }
        else {
            this._ngZone.onStable.pipe(take(1)).subscribe(fn);
        }
    }
}
/**
 * Factory that allows easy instantiation of focus traps.
 * @deprecated Use `ConfigurableFocusTrapFactory` instead.
 * @breaking-change for 11.0.0 Remove this class.
 */
export class FocusTrapFactory {
    constructor(_checker, _ngZone, _document) {
        this._checker = _checker;
        this._ngZone = _ngZone;
        this._document = _document;
    }
    /**
     * Creates a focus-trapped region around the given element.
     * @param element The element around which focus will be trapped.
     * @param deferCaptureElements Defers the creation of focus-capturing elements to be done
     *     manually by the user.
     * @returns The created focus trap instance.
     */
    create(element, deferCaptureElements = false) {
        return new FocusTrap(element, this._checker, this._ngZone, this._document, deferCaptureElements);
    }
}
FocusTrapFactory.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: FocusTrapFactory, deps: [{ token: i1.InteractivityChecker }, { token: i0.NgZone }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Injectable });
FocusTrapFactory.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: FocusTrapFactory, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: FocusTrapFactory, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.InteractivityChecker }, { type: i0.NgZone }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; } });
/** Directive for trapping focus within a region. */
export class FocusTrapDirective {
    constructor(_elementRef, _focusTrapFactory, _document) {
        this._elementRef = _elementRef;
        this._focusTrapFactory = _focusTrapFactory;
        /** Previously focused element to restore focus to upon destroy when using autoCapture. */
        this._previouslyFocusedElement = null;
        this._autoCapture = false;
        this._document = _document;
        this.focusTrap = this._focusTrapFactory.create(this._elementRef.nativeElement, true);
    }
    /** Whether the focus trap is active. */
    get enabled() {
        return this.focusTrap.enabled;
    }
    set enabled(value) {
        this.focusTrap.enabled = coerceBooleanProperty(value);
    }
    /**
     * Whether the directive should automatically move focus into the trapped region upon
     * initialization and return focus to the previous activeElement upon destruction.
     */
    get autoCapture() {
        return this._autoCapture;
    }
    set autoCapture(value) {
        this._autoCapture = coerceBooleanProperty(value);
    }
    ngOnDestroy() {
        this.focusTrap.destroy();
        // If we stored a previously focused element when using autoCapture, return focus to that
        // element now that the trapped region is being destroyed.
        if (this._previouslyFocusedElement) {
            this._previouslyFocusedElement.focus();
            this._previouslyFocusedElement = null;
        }
    }
    ngAfterContentInit() {
        this.focusTrap.attachAnchors();
        if (this.autoCapture) {
            this._captureFocus();
        }
    }
    ngDoCheck() {
        if (!this.focusTrap.hasAttached()) {
            this.focusTrap.attachAnchors();
        }
    }
    ngOnChanges(changes) {
        const autoCaptureChange = changes['autoCapture'];
        if (autoCaptureChange && !autoCaptureChange.firstChange && this.autoCapture &&
            this.focusTrap.hasAttached()) {
            this._captureFocus();
        }
    }
    _captureFocus() {
        this._previouslyFocusedElement = this._document.activeElement;
        this.focusTrap.focusInitialElementWhenReady();
    }
}
FocusTrapDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: FocusTrapDirective, deps: [{ token: i0.ElementRef }, { token: FocusTrapFactory }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Directive });
FocusTrapDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.1", type: FocusTrapDirective, selector: "[focusTrap]", inputs: { enabled: ["cdkTrapFocus", "enabled"], autoCapture: ["cdkTrapFocusAutoCapture", "autoCapture"] }, exportAs: ["focusTrap"], usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: FocusTrapDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[focusTrap]',
                    exportAs: 'focusTrap'
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: FocusTrapFactory }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; }, propDecorators: { enabled: [{
                type: Input,
                args: ['cdkTrapFocus']
            }], autoCapture: [{
                type: Input,
                args: ['cdkTrapFocusAutoCapture']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9jdXMtdHJhcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9mb2N1cy10cmFwL2ZvY3VzLXRyYXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsb0JBQW9CO0FBRXBCLE9BQU8sRUFBRSxxQkFBcUIsRUFBZ0IsTUFBTSxvQkFBb0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUVMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsTUFBTSxFQUNOLFVBQVUsRUFDVixLQUFLLEVBQ0wsTUFBTSxFQUtQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0QyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7O0FBRy9EOzs7Ozs7Ozs7R0FTRztBQUNILE1BQU0sT0FBTyxTQUFTO0lBeUJwQixZQUNXLFFBQXFCLEVBQ3RCLFFBQThCLEVBQzdCLE9BQWUsRUFDZixTQUFtQixFQUM1QixZQUFZLEdBQUcsS0FBSztRQUpYLGFBQVEsR0FBUixRQUFRLENBQWE7UUFDdEIsYUFBUSxHQUFSLFFBQVEsQ0FBc0I7UUFDN0IsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUNmLGNBQVMsR0FBVCxTQUFTLENBQVU7UUExQnRCLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBRTdCLGtHQUFrRztRQUN4Rix3QkFBbUIsR0FBRyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztRQUM1RCxzQkFBaUIsR0FBRyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMseUJBQXlCLEVBQUUsQ0FBQztRQWdCM0QsYUFBUSxHQUFZLElBQUksQ0FBQztRQVNqQyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUN0QjtJQUNILENB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QUNILENBQUM7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsTUFBTSxpQkFBaUIsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFakQsSUFBSSxpQkFBaUIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsV0FBVztZQUN6RSxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxFQUFFO1lBQzlCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUN0QjtJQUNILENBQUM7SUFFTyxhQUFhO1FBQ25CLElBQUksQ0FBQyx5QkFBeUIsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQTRCLENBQUM7UUFDN0UsSUFBSSxDQUFDLFNBQVMsQ0FBQyw0QkFBNEIsRUFBRSxDQUFDO0lBQ2hELENBQUM7OytHQWhGVSxrQkFBa0IsNENBb0NBLGdCQUFnQixhQUNuQyxRQUFRO21HQXJDUCxrQkFBa0I7MkZBQWxCLGtCQUFrQjtrQkFKOUIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsYUFBYTtvQkFDdkIsUUFBUSxFQUFFLFdBQVc7aUJBQ3RCO21GQXFDOEIsZ0JBQWdCOzBCQUMxQyxNQUFNOzJCQUFDLFFBQVE7NENBMUJkLE9BQU87c0JBRFYsS0FBSzt1QkFBQyxjQUFjO2dCQWNqQixXQUFXO3NCQURkLEtBQUs7dUJBQUMseUJBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBsaWNlbnNlXHJcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbiAqXHJcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXHJcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcclxuICovXHJcblxyXG4vKiBlc2xpbnQtZGlzYWJsZSAqL1xyXG5cclxuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5LCBCb29sZWFuSW5wdXQgfSBmcm9tICcuL2Jvb2xlYW4tcHJvcGVydHknO1xyXG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7XHJcbiAgQWZ0ZXJDb250ZW50SW5pdCxcclxuICBEaXJlY3RpdmUsXHJcbiAgRWxlbWVudFJlZixcclxuICBJbmplY3QsXHJcbiAgSW5qZWN0YWJsZSxcclxuICBJbnB1dCxcclxuICBOZ1pvbmUsXHJcbiAgT25EZXN0cm95LFxyXG4gIERvQ2hlY2ssXHJcbiAgU2ltcGxlQ2hhbmdlcyxcclxuICBPbkNoYW5nZXNcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgSW50ZXJhY3Rpdml0eUNoZWNrZXIgfSBmcm9tICcuL2ludGVyYWN0aXZpdHktY2hlY2tlcic7XHJcblxyXG5cclxuLyoqXHJcbiAqIENsYXNzIHRoYXQgYWxsb3dzIGZvciB0cmFwcGluZyBmb2N1cyB3aXRoaW4gYSBET00gZWxlbWVudC5cclxuICpcclxuICogVGhpcyBjbGFzcyBjdXJyZW50bHkgdXNlcyBhIHJlbGF0aXZlbHkgc2ltcGxlIGFwcHJvYWNoIHRvIGZvY3VzIHRyYXBwaW5nLlxyXG4gKiBJdCBhc3N1bWVzIHRoYXQgdGhlIHRhYiBvcmRlciBpcyB0aGUgc2FtZSBhcyBET00gb3JkZXIsIHdoaWNoIGlzIG5vdCBuZWNlc3NhcmlseSB0cnVlLlxyXG4gKiBUaGluZ3MgbGlrZSBgdGFiSW5kZXggPiAwYCwgZmxleCBgb3JkZXJgLCBhbmQgc2hhZG93IHJvb3RzIGNhbiBjYXVzZSB0aGUgdHdvIHRvIG1pc2FsaWduLlxyXG4gKlxyXG4gKiBAZGVwcmVjYXRlZCBVc2UgYENvbmZpZ3VyYWJsZUZvY3VzVHJhcGAgaW5zdGVhZC5cclxuICogQGJyZWFraW5nLWNoYW5nZSBmb3IgMTEuMC4wIFJlbW92ZSB0aGlzIGNsYXNzLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEZvY3VzVHJhcCB7XHJcbiAgcHJpdmF0ZSBfc3RhcnRBbmNob3I/OiBIVE1MRWxlbWVudCB8IG51bGw7XHJcbiAgcHJpdmF0ZSBfZW5kQW5jaG9yPzogSFRNTEVsZW1lbnQgfCBudWxsO1xyXG4gIHByaXZhdGUgX2hhc0F0dGFjaGVkID0gZmFsc2U7XHJcblxyXG4gIC8vIEV2ZW50IGxpc3RlbmVycyBmb3IgdGhlIGFuY2hvcnMuIE5lZWQgdG8gYmUgcmVndWxhciBmdW5jdGlvbnMgc28gdGhhdCB3ZSBjYW4gdW5iaW5kIHRoZW0gbGF0ZXIuXHJcbiAgcHJvdGVjdGVkIHN0YXJ0QW5jaG9yTGlzdGVuZXIgPSAoKSA9PiB0aGlzLmZvY3VzTGFzdFRhYmJhYmxlRWxlbWVudCgpO1xyXG4gIHByb3RlY3RlZCBlbmRBbmNob3JMaXN0ZW5lciA9ICgpID0+IHRoaXMuZm9jdXNGaXJzdFRhYmJhYmxlRWxlbWVudCgpO1xyXG5cclxuICAvKiogV2hldGhlciB0aGUgZm9jdXMgdHJhcCBpcyBhY3RpdmUuICovXHJcbiAgZ2V0IGVuYWJsZWQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fZW5hYmxlZDtcclxuICB9XHJcblxyXG4gIHNldCBlbmFibGVkKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl9lbmFibGVkID0gdmFsdWU7XHJcblxyXG4gICAgaWYgKHRoaXMuX3N0YXJ0QW5jaG9yICYmIHRoaXMuX2VuZEFuY2hvcikge1xyXG4gICAgICB0aGlzLl90b2dnbGVBbmNob3JUYWJJbmRleCh2YWx1ZSwgdGhpcy5fc3RhcnRBbmNob3IpO1xyXG4gICAgICB0aGlzLl90b2dnbGVBbmNob3JUYWJJbmRleCh2YWx1ZSwgdGhpcy5fZW5kQW5jaG9yKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBfZW5hYmxlZDogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcmVhZG9ubHkgX2VsZW1lbnQ6IEhUTUxFbGVtZW50LFxyXG4gICAgcHJpdmF0ZSBfY2hlY2tlcjogSW50ZXJhY3Rpdml0eUNoZWNrZXIsXHJcbiAgICByZWFkb25seSBfbmdab25lOiBOZ1pvbmUsXHJcbiAgICByZWFkb25seSBfZG9jdW1lbnQ6IERvY3VtZW50LFxyXG4gICAgZGVmZXJBbmNob3JzID0gZmFsc2UpIHtcclxuXHJcbiAgICBpZiAoIWRlZmVyQW5jaG9ycykge1xyXG4gICAgICB0aGlzLmF0dGFjaEFuY2hvcnMoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBEZXN0cm95cyB0aGUgZm9jdXMgdHJhcCBieSBjbGVhbmluZyB1cCB0aGUgYW5jaG9ycy4gKi9cclxuICBkZXN0cm95KCkge1xyXG4gICAgY29uc3Qgc3RhcnRBbmNob3IgPSB0aGlzLl9zdGFydEFuY2hvcjtcclxuICAgIGNvbnN0IGVuZEFuY2hvciA9IHRoaXMuX2VuZEFuY2hvcjtcclxuXHJcbiAgICBpZiAoc3RhcnRBbmNob3IpIHtcclxuICAgICAgc3RhcnRBbmNob3IucmVtb3ZlRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzLnN0YXJ0QW5jaG9yTGlzdGVuZXIpO1xyXG5cclxuICAgICAgaWYgKHN0YXJ0QW5jaG9yLnBhcmVudE5vZGUpIHtcclxuICAgICAgICBzdGFydEFuY2hvci5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0YXJ0QW5jaG9yKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChlbmRBbmNob3IpIHtcclxuICAgICAgZW5kQW5jaG9yLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgdGhpcy5lbmRBbmNob3JMaXN0ZW5lcik7XHJcblxyXG4gICAgICBpZiAoZW5kQW5jaG9yLnBhcmVudE5vZGUpIHtcclxuICAgICAgICBlbmRBbmNob3IucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbmRBbmNob3IpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fc3RhcnRBbmNob3IgPSB0aGlzLl9lbmRBbmNob3IgPSBudWxsO1xyXG4gICAgdGhpcy5faGFzQXR0YWNoZWQgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEluc2VydHMgdGhlIGFuY2hvcnMgaW50byB0aGUgRE9NLiBUaGlzIGlzIHVzdWFsbHkgZG9uZSBhdXRvbWF0aWNhbGx5XHJcbiAgICogaW4gdGhlIGNvbnN0cnVjdG9yLCBidXQgY2FuIGJlIGRlZmVycmVkIGZvciBjYXNlcyBsaWtlIGRpcmVjdGl2ZXMgd2l0aCBgKm5nSWZgLlxyXG4gICAqIEByZXR1cm5zIFdoZXRoZXIgdGhlIGZvY3VzIHRyYXAgbWFuYWdlZCB0byBhdHRhY2ggc3VjY2Vzc2Z1bHkuIFRoaXMgbWF5IG5vdCBiZSB0aGUgY2FzZVxyXG4gICAqIGlmIHRoZSB0YXJnZXQgZWxlbWVudCBpc24ndCBjdXJyZW50bHkgaW4gdGhlIERPTS5cclxuICAgKi9cclxuICBhdHRhY2hBbmNob3JzKCk6IGJvb2xlYW4ge1xyXG4gICAgLy8gSWYgd2UncmUgbm90IG9uIHRoZSBicm93c2VyLCB0aGVyZSBjYW4gYmUgbm8gZm9jdXMgdG8gdHJhcC5cclxuICAgIGlmICh0aGlzLl9oYXNBdHRhY2hlZCkge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG4gICAgICBpZiAoIXRoaXMuX3N0YXJ0QW5jaG9yKSB7XHJcbiAgICAgICAgdGhpcy5fc3RhcnRBbmNob3IgPSB0aGlzLl9jcmVhdGVBbmNob3IoKTtcclxuICAgICAgICB0aGlzLl9zdGFydEFuY2hvciEuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzLnN0YXJ0QW5jaG9yTGlzdGVuZXIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIXRoaXMuX2VuZEFuY2hvcikge1xyXG4gICAgICAgIHRoaXMuX2VuZEFuY2hvciA9IHRoaXMuX2NyZWF0ZUFuY2hvcigpO1xyXG4gICAgICAgIHRoaXMuX2VuZEFuY2hvciEuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzLmVuZEFuY2hvckxpc3RlbmVyKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKHRoaXMuX2VsZW1lbnQucGFyZW50Tm9kZSkge1xyXG4gICAgICB0aGlzLl9lbGVtZW50LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHRoaXMuX3N0YXJ0QW5jaG9yISwgdGhpcy5fZWxlbWVudCk7XHJcbiAgICAgIHRoaXMuX2VsZW1lbnQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUodGhpcy5fZW5kQW5jaG9yISwgdGhpcy5fZWxlbWVudC5uZXh0U2libGluZyk7XHJcbiAgICAgIHRoaXMuX2hhc0F0dGFjaGVkID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5faGFzQXR0YWNoZWQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXYWl0cyBmb3IgdGhlIHpvbmUgdG8gc3RhYmlsaXplLCB0aGVuIGVpdGhlciBmb2N1c2VzIHRoZSBmaXJzdCBlbGVtZW50IHRoYXQgdGhlXHJcbiAgICogdXNlciBzcGVjaWZpZWQsIG9yIHRoZSBmaXJzdCB0YWJiYWJsZSBlbGVtZW50LlxyXG4gICAqIEByZXR1cm5zIFJldHVybnMgYSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCBhIGJvb2xlYW4sIGRlcGVuZGluZ1xyXG4gICAqIG9uIHdoZXRoZXIgZm9jdXMgd2FzIG1vdmVkIHN1Y2Nlc3NmdWxseS5cclxuICAgKi9cclxuICBmb2N1c0luaXRpYWxFbGVtZW50V2hlblJlYWR5KCk6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPGJvb2xlYW4+KHJlc29sdmUgPT4ge1xyXG4gICAgICB0aGlzLl9leGVjdXRlT25TdGFibGUoKCkgPT4gcmVzb2x2ZSh0aGlzLmZvY3VzSW5pdGlhbEVsZW1lbnQoKSkpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXYWl0cyBmb3IgdGhlIHpvbmUgdG8gc3RhYmlsaXplLCB0aGVuIGZvY3VzZXNcclxuICAgKiB0aGUgZmlyc3QgdGFiYmFibGUgZWxlbWVudCB3aXRoaW4gdGhlIGZvY3VzIHRyYXAgcmVnaW9uLlxyXG4gICAqIEByZXR1cm5zIFJldHVybnMgYSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCBhIGJvb2xlYW4sIGRlcGVuZGluZ1xyXG4gICAqIG9uIHdoZXRoZXIgZm9jdXMgd2FzIG1vdmVkIHN1Y2Nlc3NmdWxseS5cclxuICAgKi9cclxuICBmb2N1c0ZpcnN0VGFiYmFibGVFbGVtZW50V2hlblJlYWR5KCk6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPGJvb2xlYW4+KHJlc29sdmUgPT4ge1xyXG4gICAgICB0aGlzLl9leGVjdXRlT25TdGFibGUoKCkgPT4gcmVzb2x2ZSh0aGlzLmZvY3VzRmlyc3RUYWJiYWJsZUVsZW1lbnQoKSkpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXYWl0cyBmb3IgdGhlIHpvbmUgdG8gc3RhYmlsaXplLCB0aGVuIGZvY3VzZXNcclxuICAgKiB0aGUgbGFzdCB0YWJiYWJsZSBlbGVtZW50IHdpdGhpbiB0aGUgZm9jdXMgdHJhcCByZWdpb24uXHJcbiAgICogQHJldHVybnMgUmV0dXJucyBhIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIGEgYm9vbGVhbiwgZGVwZW5kaW5nXHJcbiAgICogb24gd2hldGhlciBmb2N1cyB3YXMgbW92ZWQgc3VjY2Vzc2Z1bGx5LlxyXG4gICAqL1xyXG4gIGZvY3VzTGFzdFRhYmJhYmxlRWxlbWVudFdoZW5SZWFkeSgpOiBQcm9taXNlPGJvb2xlYW4+IHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxib29sZWFuPihyZXNvbHZlID0+IHtcclxuICAgICAgdGhpcy5fZXhlY3V0ZU9uU3RhYmxlKCgpID0+IHJlc29sdmUodGhpcy5mb2N1c0xhc3RUYWJiYWJsZUVsZW1lbnQoKSkpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIHNwZWNpZmllZCBib3VuZGFyeSBlbGVtZW50IG9mIHRoZSB0cmFwcGVkIHJlZ2lvbi5cclxuICAgKiBAcGFyYW0gYm91bmQgVGhlIGJvdW5kYXJ5IHRvIGdldCAoc3RhcnQgb3IgZW5kIG9mIHRyYXBwZWQgcmVnaW9uKS5cclxuICAgKiBAcmV0dXJucyBUaGUgYm91bmRhcnkgZWxlbWVudC5cclxuICAgKi9cclxuICBwcml2YXRlIF9nZXRSZWdpb25Cb3VuZGFyeShib3VuZDogJ3N0YXJ0JyB8ICdlbmQnKTogSFRNTEVsZW1lbnQgfCBudWxsIHtcclxuICAgIC8vIENvbnRhaW5zIHRoZSBkZXByZWNhdGVkIHZlcnNpb24gb2Ygc2VsZWN0b3IsIGZvciB0ZW1wb3JhcnkgYmFja3dhcmRzIGNvbXBhcmFiaWxpdHkuXHJcbiAgICBsZXQgbWFya2VycyA9IHRoaXMuX2VsZW1lbnQucXVlcnlTZWxlY3RvckFsbChgW2Nkay1mb2N1cy1yZWdpb24tJHtib3VuZH1dLCBgICtcclxuICAgICAgYFtjZGtGb2N1c1JlZ2lvbiR7Ym91bmR9XSwgYCArXHJcbiAgICAgIGBbY2RrLWZvY3VzLSR7Ym91bmR9XWApIGFzIE5vZGVMaXN0T2Y8SFRNTEVsZW1lbnQ+O1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWFya2Vycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAvLyBAYnJlYWtpbmctY2hhbmdlIDguMC4wXHJcbiAgICAgIGlmIChtYXJrZXJzW2ldLmhhc0F0dHJpYnV0ZShgY2RrLWZvY3VzLSR7Ym91bmR9YCkpIHtcclxuICAgICAgICBjb25zb2xlLndhcm4oYEZvdW5kIHVzZSBvZiBkZXByZWNhdGVkIGF0dHJpYnV0ZSAnY2RrLWZvY3VzLSR7Ym91bmR9JywgYCArXHJcbiAgICAgICAgICBgdXNlICdjZGtGb2N1c1JlZ2lvbiR7Ym91bmR9JyBpbnN0ZWFkLiBUaGUgZGVwcmVjYXRlZCBgICtcclxuICAgICAgICAgIGBhdHRyaWJ1dGUgd2lsbCBiZSByZW1vdmVkIGluIDguMC4wLmAsIG1hcmtlcnNbaV0pO1xyXG4gICAgICB9IGVsc2UgaWYgKG1hcmtlcnNbaV0uaGFzQXR0cmlidXRlKGBjZGstZm9jdXMtcmVnaW9uLSR7Ym91bmR9YCkpIHtcclxuICAgICAgICBjb25zb2xlLndhcm4oYEZvdW5kIHVzZSBvZiBkZXByZWNhdGVkIGF0dHJpYnV0ZSAnY2RrLWZvY3VzLXJlZ2lvbi0ke2JvdW5kfScsIGAgK1xyXG4gICAgICAgICAgYHVzZSAnY2RrRm9jdXNSZWdpb24ke2JvdW5kfScgaW5zdGVhZC4gVGhlIGRlcHJlY2F0ZWQgYXR0cmlidXRlIGAgK1xyXG4gICAgICAgICAgYHdpbGwgYmUgcmVtb3ZlZCBpbiA4LjAuMC5gLCBtYXJrZXJzW2ldKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChib3VuZCA9PSAnc3RhcnQnKSB7XHJcbiAgICAgIHJldHVybiBtYXJrZXJzLmxlbmd0aCA/IG1hcmtlcnNbMF0gOiB0aGlzLl9nZXRGaXJzdFRhYmJhYmxlRWxlbWVudCh0aGlzLl9lbGVtZW50KTtcclxuICAgIH1cclxuICAgIHJldHVybiBtYXJrZXJzLmxlbmd0aCA/XHJcbiAgICAgIG1hcmtlcnNbbWFya2Vycy5sZW5ndGggLSAxXSA6IHRoaXMuX2dldExhc3RUYWJiYWJsZUVsZW1lbnQodGhpcy5fZWxlbWVudCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBGb2N1c2VzIHRoZSBlbGVtZW50IHRoYXQgc2hvdWxkIGJlIGZvY3VzZWQgd2hlbiB0aGUgZm9jdXMgdHJhcCBpcyBpbml0aWFsaXplZC5cclxuICAgKiBAcmV0dXJucyBXaGV0aGVyIGZvY3VzIHdhcyBtb3ZlZCBzdWNjZXNzZnVsbHkuXHJcbiAgICovXHJcbiAgZm9jdXNJbml0aWFsRWxlbWVudCgpOiBib29sZWFuIHtcclxuICAgIC8vIENvbnRhaW5zIHRoZSBkZXByZWNhdGVkIHZlcnNpb24gb2Ygc2VsZWN0b3IsIGZvciB0ZW1wb3JhcnkgYmFja3dhcmRzIGNvbXBhcmFiaWxpdHkuXHJcbiAgICBjb25zdCByZWRpcmVjdFRvRWxlbWVudCA9IHRoaXMuX2VsZW1lbnQucXVlcnlTZWxlY3RvcihgW2Nkay1mb2N1cy1pbml0aWFsXSwgYCArXHJcbiAgICAgIGBbY2RrRm9jdXNJbml0aWFsXWApIGFzIEhUTUxFbGVtZW50O1xyXG5cclxuICAgIGlmIChyZWRpcmVjdFRvRWxlbWVudCkge1xyXG4gICAgICAvLyBAYnJlYWtpbmctY2hhbmdlIDguMC4wXHJcbiAgICAgIGlmIChyZWRpcmVjdFRvRWxlbWVudC5oYXNBdHRyaWJ1dGUoYGNkay1mb2N1cy1pbml0aWFsYCkpIHtcclxuICAgICAgICBjb25zb2xlLndhcm4oYEZvdW5kIHVzZSBvZiBkZXByZWNhdGVkIGF0dHJpYnV0ZSAnY2RrLWZvY3VzLWluaXRpYWwnLCBgICtcclxuICAgICAgICAgIGB1c2UgJ2Nka0ZvY3VzSW5pdGlhbCcgaW5zdGVhZC4gVGhlIGRlcHJlY2F0ZWQgYXR0cmlidXRlIGAgK1xyXG4gICAgICAgICAgYHdpbGwgYmUgcmVtb3ZlZCBpbiA4LjAuMGAsIHJlZGlyZWN0VG9FbGVtZW50KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gV2FybiB0aGUgY29uc3VtZXIgaWYgdGhlIGVsZW1lbnQgdGhleSd2ZSBwb2ludGVkIHRvXHJcbiAgICAgIC8vIGlzbid0IGZvY3VzYWJsZSwgd2hlbiBub3QgaW4gcHJvZHVjdGlvbiBtb2RlLlxyXG5cclxuICAgICAgaWYgKCF0aGlzLl9jaGVja2VyLmlzRm9jdXNhYmxlKHJlZGlyZWN0VG9FbGVtZW50KSkge1xyXG4gICAgICAgIGNvbnN0IGZvY3VzYWJsZUNoaWxkID0gdGhpcy5fZ2V0Rmlyc3RUYWJiYWJsZUVsZW1lbnQocmVkaXJlY3RUb0VsZW1lbnQpIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICAgIGZvY3VzYWJsZUNoaWxkPy5mb2N1cygpO1xyXG4gICAgICAgIHJldHVybiAhIWZvY3VzYWJsZUNoaWxkO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZWRpcmVjdFRvRWxlbWVudC5mb2N1cygpO1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5mb2N1c0ZpcnN0VGFiYmFibGVFbGVtZW50KCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBGb2N1c2VzIHRoZSBmaXJzdCB0YWJiYWJsZSBlbGVtZW50IHdpdGhpbiB0aGUgZm9jdXMgdHJhcCByZWdpb24uXHJcbiAgICogQHJldHVybnMgV2hldGhlciBmb2N1cyB3YXMgbW92ZWQgc3VjY2Vzc2Z1bGx5LlxyXG4gICAqL1xyXG4gIGZvY3VzRmlyc3RUYWJiYWJsZUVsZW1lbnQoKTogYm9vbGVhbiB7XHJcbiAgICBjb25zdCByZWRpcmVjdFRvRWxlbWVudCA9IHRoaXMuX2dldFJlZ2lvbkJvdW5kYXJ5KCdzdGFydCcpO1xyXG5cclxuICAgIGlmIChyZWRpcmVjdFRvRWxlbWVudCkge1xyXG4gICAgICByZWRpcmVjdFRvRWxlbWVudC5mb2N1cygpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAhIXJlZGlyZWN0VG9FbGVtZW50O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRm9jdXNlcyB0aGUgbGFzdCB0YWJiYWJsZSBlbGVtZW50IHdpdGhpbiB0aGUgZm9jdXMgdHJhcCByZWdpb24uXHJcbiAgICogQHJldHVybnMgV2hldGhlciBmb2N1cyB3YXMgbW92ZWQgc3VjY2Vzc2Z1bGx5LlxyXG4gICAqL1xyXG4gIGZvY3VzTGFzdFRhYmJhYmxlRWxlbWVudCgpOiBib29sZWFuIHtcclxuICAgIGNvbnN0IHJlZGlyZWN0VG9FbGVtZW50ID0gdGhpcy5fZ2V0UmVnaW9uQm91bmRhcnkoJ2VuZCcpO1xyXG5cclxuICAgIGlmIChyZWRpcmVjdFRvRWxlbWVudCkge1xyXG4gICAgICByZWRpcmVjdFRvRWxlbWVudC5mb2N1cygpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAhIXJlZGlyZWN0VG9FbGVtZW50O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hlY2tzIHdoZXRoZXIgdGhlIGZvY3VzIHRyYXAgaGFzIHN1Y2Nlc3NmdWxseSBiZWVuIGF0dGFjaGVkLlxyXG4gICAqL1xyXG4gIGhhc0F0dGFjaGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2hhc0F0dGFjaGVkO1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldCB0aGUgZmlyc3QgdGFiYmFibGUgZWxlbWVudCBmcm9tIGEgRE9NIHN1YnRyZWUgKGluY2x1c2l2ZSkuICovXHJcbiAgcHJpdmF0ZSBfZ2V0Rmlyc3RUYWJiYWJsZUVsZW1lbnQocm9vdDogSFRNTEVsZW1lbnQpOiBIVE1MRWxlbWVudCB8IG51bGwge1xyXG4gICAgaWYgKHRoaXMuX2NoZWNrZXIuaXNGb2N1c2FibGUocm9vdCkgJiYgdGhpcy5fY2hlY2tlci5pc1RhYmJhYmxlKHJvb3QpKSB7XHJcbiAgICAgIHJldHVybiByb290O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEl0ZXJhdGUgaW4gRE9NIG9yZGVyLiBOb3RlIHRoYXQgSUUgZG9lc24ndCBoYXZlIGBjaGlsZHJlbmAgZm9yIFNWRyBzbyB3ZSBmYWxsXHJcbiAgICAvLyBiYWNrIHRvIGBjaGlsZE5vZGVzYCB3aGljaCBpbmNsdWRlcyB0ZXh0IG5vZGVzLCBjb21tZW50cyBldGMuXHJcbiAgICBsZXQgY2hpbGRyZW4gPSByb290LmNoaWxkcmVuIHx8IHJvb3QuY2hpbGROb2RlcztcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGxldCB0YWJiYWJsZUNoaWxkID0gY2hpbGRyZW5baV0ubm9kZVR5cGUgPT09IHRoaXMuX2RvY3VtZW50LkVMRU1FTlRfTk9ERSA/XHJcbiAgICAgICAgdGhpcy5fZ2V0Rmlyc3RUYWJiYWJsZUVsZW1lbnQoY2hpbGRyZW5baV0gYXMgSFRNTEVsZW1lbnQpIDpcclxuICAgICAgICBudWxsO1xyXG5cclxuICAgICAgaWYgKHRhYmJhYmxlQ2hpbGQpIHtcclxuICAgICAgICByZXR1cm4gdGFiYmFibGVDaGlsZDtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldCB0aGUgbGFzdCB0YWJiYWJsZSBlbGVtZW50IGZyb20gYSBET00gc3VidHJlZSAoaW5jbHVzaXZlKS4gKi9cclxuICBwcml2YXRlIF9nZXRMYXN0VGFiYmFibGVFbGVtZW50KHJvb3Q6IEhUTUxFbGVtZW50KTogSFRNTEVsZW1lbnQgfCBudWxsIHtcclxuICAgIGlmICh0aGlzLl9jaGVja2VyLmlzRm9jdXNhYmxlKHJvb3QpICYmIHRoaXMuX2NoZWNrZXIuaXNUYWJiYWJsZShyb290KSkge1xyXG4gICAgICByZXR1cm4gcm9vdDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBJdGVyYXRlIGluIHJldmVyc2UgRE9NIG9yZGVyLlxyXG4gICAgbGV0IGNoaWxkcmVuID0gcm9vdC5jaGlsZHJlbiB8fCByb290LmNoaWxkTm9kZXM7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IGNoaWxkcmVuLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgIGxldCB0YWJiYWJsZUNoaWxkID0gY2hpbGRyZW5baV0ubm9kZVR5cGUgPT09IHRoaXMuX2RvY3VtZW50LkVMRU1FTlRfTk9ERSA/XHJcbiAgICAgICAgdGhpcy5fZ2V0TGFzdFRhYmJhYmxlRWxlbWVudChjaGlsZHJlbltpXSBhcyBIVE1MRWxlbWVudCkgOlxyXG4gICAgICAgIG51bGw7XHJcblxyXG4gICAgICBpZiAodGFiYmFibGVDaGlsZCkge1xyXG4gICAgICAgIHJldHVybiB0YWJiYWJsZUNoaWxkO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICAvKiogQ3JlYXRlcyBhbiBhbmNob3IgZWxlbWVudC4gKi9cclxuICBwcml2YXRlIF9jcmVhdGVBbmNob3IoKTogSFRNTEVsZW1lbnQge1xyXG4gICAgY29uc3QgYW5jaG9yID0gdGhpcy5fZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0aGlzLl90b2dnbGVBbmNob3JUYWJJbmRleCh0aGlzLl9lbmFibGVkLCBhbmNob3IpO1xyXG4gICAgYW5jaG9yLmNsYXNzTGlzdC5hZGQoJ2Nkay12aXN1YWxseS1oaWRkZW4nKTtcclxuICAgIGFuY2hvci5jbGFzc0xpc3QuYWRkKCdjZGstZm9jdXMtdHJhcC1hbmNob3InKTtcclxuICAgIGFuY2hvci5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcclxuICAgIHJldHVybiBhbmNob3I7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUb2dnbGVzIHRoZSBgdGFiaW5kZXhgIG9mIGFuIGFuY2hvciwgYmFzZWQgb24gdGhlIGVuYWJsZWQgc3RhdGUgb2YgdGhlIGZvY3VzIHRyYXAuXHJcbiAgICogQHBhcmFtIGlzRW5hYmxlZCBXaGV0aGVyIHRoZSBmb2N1cyB0cmFwIGlzIGVuYWJsZWQuXHJcbiAgICogQHBhcmFtIGFuY2hvciBBbmNob3Igb24gd2hpY2ggdG8gdG9nZ2xlIHRoZSB0YWJpbmRleC5cclxuICAgKi9cclxuICBwcml2YXRlIF90b2dnbGVBbmNob3JUYWJJbmRleChpc0VuYWJsZWQ6IGJvb2xlYW4sIGFuY2hvcjogSFRNTEVsZW1lbnQpIHtcclxuICAgIC8vIFJlbW92ZSB0aGUgdGFiaW5kZXggY29tcGxldGVseSwgcmF0aGVyIHRoYW4gc2V0dGluZyBpdCB0byAtMSwgYmVjYXVzZSBpZiB0aGVcclxuICAgIC8vIGVsZW1lbnQgaGFzIGEgdGFiaW5kZXgsIHRoZSB1c2VyIG1pZ2h0IHN0aWxsIGhpdCBpdCB3aGVuIG5hdmlnYXRpbmcgd2l0aCB0aGUgYXJyb3cga2V5cy5cclxuICAgIGlzRW5hYmxlZCA/IGFuY2hvci5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgJzAnKSA6IGFuY2hvci5yZW1vdmVBdHRyaWJ1dGUoJ3RhYmluZGV4Jyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUb2dnbGVzIHRoZWB0YWJpbmRleGAgb2YgYm90aCBhbmNob3JzIHRvIGVpdGhlciB0cmFwIFRhYiBmb2N1cyBvciBhbGxvdyBpdCB0byBlc2NhcGUuXHJcbiAgICogQHBhcmFtIGVuYWJsZWQ6IFdoZXRoZXIgdGhlIGFuY2hvcnMgc2hvdWxkIHRyYXAgVGFiLlxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCB0b2dnbGVBbmNob3JzKGVuYWJsZWQ6IGJvb2xlYW4pIHtcclxuICAgIGlmICh0aGlzLl9zdGFydEFuY2hvciAmJiB0aGlzLl9lbmRBbmNob3IpIHtcclxuICAgICAgdGhpcy5fdG9nZ2xlQW5jaG9yVGFiSW5kZXgoZW5hYmxlZCwgdGhpcy5fc3RhcnRBbmNob3IpO1xyXG4gICAgICB0aGlzLl90b2dnbGVBbmNob3JUYWJJbmRleChlbmFibGVkLCB0aGlzLl9lbmRBbmNob3IpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIEV4ZWN1dGVzIGEgZnVuY3Rpb24gd2hlbiB0aGUgem9uZSBpcyBzdGFibGUuICovXHJcbiAgcHJpdmF0ZSBfZXhlY3V0ZU9uU3RhYmxlKGZuOiAoKSA9PiBhbnkpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLl9uZ1pvbmUuaXNTdGFibGUpIHtcclxuICAgICAgZm4oKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuX25nWm9uZS5vblN0YWJsZS5waXBlKHRha2UoMSkpLnN1YnNjcmliZShmbik7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogRmFjdG9yeSB0aGF0IGFsbG93cyBlYXN5IGluc3RhbnRpYXRpb24gb2YgZm9jdXMgdHJhcHMuXHJcbiAqIEBkZXByZWNhdGVkIFVzZSBgQ29uZmlndXJhYmxlRm9jdXNUcmFwRmFjdG9yeWAgaW5zdGVhZC5cclxuICogQGJyZWFraW5nLWNoYW5nZSBmb3IgMTEuMC4wIFJlbW92ZSB0aGlzIGNsYXNzLlxyXG4gKi9cclxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcclxuZXhwb3J0IGNsYXNzIEZvY3VzVHJhcEZhY3Rvcnkge1xyXG4gIHByaXZhdGUgX2RvY3VtZW50OiBEb2N1bWVudDtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIF9jaGVja2VyOiBJbnRlcmFjdGl2aXR5Q2hlY2tlcixcclxuICAgIHByaXZhdGUgX25nWm9uZTogTmdab25lLFxyXG4gICAgQEluamVjdChET0NVTUVOVCkgX2RvY3VtZW50OiBhbnkpIHtcclxuXHJcbiAgICB0aGlzLl9kb2N1bWVudCA9IF9kb2N1bWVudDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZXMgYSBmb2N1cy10cmFwcGVkIHJlZ2lvbiBhcm91bmQgdGhlIGdpdmVuIGVsZW1lbnQuXHJcbiAgICogQHBhcmFtIGVsZW1lbnQgVGhlIGVsZW1lbnQgYXJvdW5kIHdoaWNoIGZvY3VzIHdpbGwgYmUgdHJhcHBlZC5cclxuICAgKiBAcGFyYW0gZGVmZXJDYXB0dXJlRWxlbWVudHMgRGVmZXJzIHRoZSBjcmVhdGlvbiBvZiBmb2N1cy1jYXB0dXJpbmcgZWxlbWVudHMgdG8gYmUgZG9uZVxyXG4gICAqICAgICBtYW51YWxseSBieSB0aGUgdXNlci5cclxuICAgKiBAcmV0dXJucyBUaGUgY3JlYXRlZCBmb2N1cyB0cmFwIGluc3RhbmNlLlxyXG4gICAqL1xyXG4gIGNyZWF0ZShlbGVtZW50OiBIVE1MRWxlbWVudCwgZGVmZXJDYXB0dXJlRWxlbWVudHM6IGJvb2xlYW4gPSBmYWxzZSk6IEZvY3VzVHJhcCB7XHJcbiAgICByZXR1cm4gbmV3IEZvY3VzVHJhcChcclxuICAgICAgZWxlbWVudCwgdGhpcy5fY2hlY2tlciwgdGhpcy5fbmdab25lLCB0aGlzLl9kb2N1bWVudCwgZGVmZXJDYXB0dXJlRWxlbWVudHMpO1xyXG4gIH1cclxufVxyXG5cclxuLyoqIERpcmVjdGl2ZSBmb3IgdHJhcHBpbmcgZm9jdXMgd2l0aGluIGEgcmVnaW9uLiAqL1xyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1tmb2N1c1RyYXBdJyxcclxuICBleHBvcnRBczogJ2ZvY3VzVHJhcCdcclxufSlcclxuZXhwb3J0IGNsYXNzIEZvY3VzVHJhcERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uRGVzdHJveSwgQWZ0ZXJDb250ZW50SW5pdCwgT25DaGFuZ2VzLCBEb0NoZWNrIHtcclxuICBwcml2YXRlIF9kb2N1bWVudDogRG9jdW1lbnQ7XHJcblxyXG4gIC8qKiBVbmRlcmx5aW5nIEZvY3VzVHJhcCBpbnN0YW5jZS4gKi9cclxuICBmb2N1c1RyYXA6IEZvY3VzVHJhcDtcclxuXHJcbiAgLyoqIFByZXZpb3VzbHkgZm9jdXNlZCBlbGVtZW50IHRvIHJlc3RvcmUgZm9jdXMgdG8gdXBvbiBkZXN0cm95IHdoZW4gdXNpbmcgYXV0b0NhcHR1cmUuICovXHJcbiAgcHJpdmF0ZSBfcHJldmlvdXNseUZvY3VzZWRFbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGwgPSBudWxsO1xyXG5cclxuICAvKiogV2hldGhlciB0aGUgZm9jdXMgdHJhcCBpcyBhY3RpdmUuICovXHJcbiAgQElucHV0KCdjZGtUcmFwRm9jdXMnKVxyXG4gIGdldCBlbmFibGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZm9jdXNUcmFwLmVuYWJsZWQ7XHJcbiAgfVxyXG5cclxuICBzZXQgZW5hYmxlZCh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5mb2N1c1RyYXAuZW5hYmxlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIHRoZSBkaXJlY3RpdmUgc2hvdWxkIGF1dG9tYXRpY2FsbHkgbW92ZSBmb2N1cyBpbnRvIHRoZSB0cmFwcGVkIHJlZ2lvbiB1cG9uXHJcbiAgICogaW5pdGlhbGl6YXRpb24gYW5kIHJldHVybiBmb2N1cyB0byB0aGUgcHJldmlvdXMgYWN0aXZlRWxlbWVudCB1cG9uIGRlc3RydWN0aW9uLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgnY2RrVHJhcEZvY3VzQXV0b0NhcHR1cmUnKVxyXG4gIGdldCBhdXRvQ2FwdHVyZSgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl9hdXRvQ2FwdHVyZTtcclxuICB9XHJcblxyXG4gIHNldCBhdXRvQ2FwdHVyZSh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5fYXV0b0NhcHR1cmUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfYXV0b0NhcHR1cmUgPSBmYWxzZTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcclxuICAgIHByaXZhdGUgX2ZvY3VzVHJhcEZhY3Rvcnk6IEZvY3VzVHJhcEZhY3RvcnksXHJcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBfZG9jdW1lbnQ6IGFueSkge1xyXG5cclxuICAgIHRoaXMuX2RvY3VtZW50ID0gX2RvY3VtZW50O1xyXG4gICAgdGhpcy5mb2N1c1RyYXAgPSB0aGlzLl9mb2N1c1RyYXBGYWN0b3J5LmNyZWF0ZSh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIHRydWUpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmZvY3VzVHJhcC5kZXN0cm95KCk7XHJcblxyXG4gICAgLy8gSWYgd2Ugc3RvcmVkIGEgcHJldmlvdXNseSBmb2N1c2VkIGVsZW1lbnQgd2hlbiB1c2luZyBhdXRvQ2FwdHVyZSwgcmV0dXJuIGZvY3VzIHRvIHRoYXRcclxuICAgIC8vIGVsZW1lbnQgbm93IHRoYXQgdGhlIHRyYXBwZWQgcmVnaW9uIGlzIGJlaW5nIGRlc3Ryb3llZC5cclxuICAgIGlmICh0aGlzLl9wcmV2aW91c2x5Rm9jdXNlZEVsZW1lbnQpIHtcclxuICAgICAgdGhpcy5fcHJldmlvdXNseUZvY3VzZWRFbGVtZW50LmZvY3VzKCk7XHJcbiAgICAgIHRoaXMuX3ByZXZpb3VzbHlGb2N1c2VkRWxlbWVudCA9IG51bGw7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XHJcbiAgICB0aGlzLmZvY3VzVHJhcC5hdHRhY2hBbmNob3JzKCk7XHJcblxyXG4gICAgaWYgKHRoaXMuYXV0b0NhcHR1cmUpIHtcclxuICAgICAgdGhpcy5fY2FwdHVyZUZvY3VzKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ0RvQ2hlY2soKSB7XHJcbiAgICBpZiAoIXRoaXMuZm9jdXNUcmFwLmhhc0F0dGFjaGVkKCkpIHtcclxuICAgICAgdGhpcy5mb2N1c1RyYXAuYXR0YWNoQW5jaG9ycygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xyXG4gICAgY29uc3QgYXV0b0NhcHR1cmVDaGFuZ2UgPSBjaGFuZ2VzWydhdXRvQ2FwdHVyZSddO1xyXG5cclxuICAgIGlmIChhdXRvQ2FwdHVyZUNoYW5nZSAmJiAhYXV0b0NhcHR1cmVDaGFuZ2UuZmlyc3RDaGFuZ2UgJiYgdGhpcy5hdXRvQ2FwdHVyZSAmJlxyXG4gICAgICB0aGlzLmZvY3VzVHJhcC5oYXNBdHRhY2hlZCgpKSB7XHJcbiAgICAgIHRoaXMuX2NhcHR1cmVGb2N1cygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfY2FwdHVyZUZvY3VzKCkge1xyXG4gICAgdGhpcy5fcHJldmlvdXNseUZvY3VzZWRFbGVtZW50ID0gdGhpcy5fZG9jdW1lbnQuYWN0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudDtcclxuICAgIHRoaXMuZm9jdXNUcmFwLmZvY3VzSW5pdGlhbEVsZW1lbnRXaGVuUmVhZHkoKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9lbmFibGVkOiBCb29sZWFuSW5wdXQ7XHJcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2F1dG9DYXB0dXJlOiBCb29sZWFuSW5wdXQ7XHJcbn1cclxuIl19