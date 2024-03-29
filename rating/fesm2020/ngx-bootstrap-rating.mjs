import * as i0 from '@angular/core';
import { Injectable, forwardRef, EventEmitter, Component, ChangeDetectionStrategy, Input, Output, HostListener, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';

/** Default values provider for rating */
class RatingConfig {
    constructor() {
        /** aria label for rating */
        this.ariaLabel = 'rating';
    }
}
RatingConfig.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: RatingConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RatingConfig.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: RatingConfig, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: RatingConfig, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

const RATING_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RatingComponent),
    multi: true
};
class RatingComponent {
    constructor(changeDetection, config) {
        this.changeDetection = changeDetection;
        /** number of icons */
        this.max = 5;
        /** if true will not react on any user events */
        this.readonly = false;
        /** array of icons titles, default: (["one", "two", "three", "four", "five"]) */
        this.titles = [];
        /** fired when icon selected, $event:number equals to selected rating */
        this.onHover = new EventEmitter();
        /** fired when icon selected, $event:number equals to previous rating value */
        this.onLeave = new EventEmitter();
        this.onChange = Function.prototype;
        this.onTouched = Function.prototype;
        /** aria label for rating */
        this.ariaLabel = 'rating';
        this.range = [];
        this.value = 0;
        Object.assign(this, config);
    }
    onKeydown(event) {
        if ([37, 38, 39, 40].indexOf(event.which) === -1) {
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        const sign = event.which === 38 || event.which === 39 ? 1 : -1;
        this.rate(this.value + sign);
    }
    ngOnInit() {
        this.max = this.max || 5;
        this.titles =
            typeof this.titles !== 'undefined' && this.titles.length > 0
                ? this.titles
                : [];
        this.range = this.buildTemplateObjects(this.max);
    }
    // model -> view
    writeValue(value) {
        if (value % 1 !== value) {
            this.value = Math.round(value);
            this.preValue = value;
            this.changeDetection.markForCheck();
            return;
        }
        this.preValue = value;
        this.value = value;
        this.changeDetection.markForCheck();
    }
    enter(value) {
        if (!this.readonly) {
            this.value = value;
            this.changeDetection.markForCheck();
            this.onHover.emit(value);
        }
    }
    reset() {
        if (typeof this.preValue === 'number') {
            this.value = Math.round(this.preValue);
            this.changeDetection.markForCheck();
            this.onLeave.emit(this.value);
        }
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    rate(value) {
        if (!this.readonly && this.range
            && value >= 0 && value <= this.range.length) {
            this.writeValue(value);
            this.onChange(value);
        }
    }
    buildTemplateObjects(max) {
        const result = [];
        for (let i = 0; i < max; i++) {
            result.push({
                index: i,
                title: this.titles[i] || i + 1
            });
        }
        return result;
    }
}
RatingComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: RatingComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: RatingConfig }], target: i0.ɵɵFactoryTarget.Component });
RatingComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.1", type: RatingComponent, selector: "rating", inputs: { max: "max", readonly: "readonly", titles: "titles", customTemplate: "customTemplate" }, outputs: { onHover: "onHover", onLeave: "onLeave" }, host: { listeners: { "keydown": "onKeydown($event)" } }, providers: [RATING_CONTROL_VALUE_ACCESSOR], ngImport: i0, template: "<span (mouseleave)=\"reset()\" (keydown)=\"onKeydown($event)\" tabindex=\"0\"\r\n      role=\"slider\" aria-valuemin=\"0\"\r\n      [attr.aria-label]=\"ariaLabel\"\r\n      [attr.aria-valuemax]=\"range.length\"\r\n      [attr.aria-valuenow]=\"value\">\r\n  <ng-template #star let-value=\"value\" let-index=\"index\">{{ index < value ? '&#9733;' : '&#9734;' }}</ng-template>\r\n  <ng-template ngFor let-r [ngForOf]=\"range\" let-index=\"index\">\r\n    <span class=\"sr-only visually-hidden\">({{ index < value ? '*' : ' ' }})</span>\r\n    <span class=\"bs-rating-star\"\r\n          (mouseenter)=\"enter(index + 1)\"\r\n          (click)=\"rate(index + 1)\"\r\n          [title]=\"r.title\"\r\n          [style.cursor]=\"readonly ? 'default' : 'pointer'\"\r\n          [class.active]=\"index < value\">\r\n      <ng-template [ngTemplateOutlet]=\"customTemplate || star\"\r\n                   [ngTemplateOutletContext]=\"{index: index, value: value}\">\r\n      </ng-template>\r\n    </span>\r\n  </ng-template>\r\n</span>\r\n", directives: [{ type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: RatingComponent, decorators: [{
            type: Component,
            args: [{ selector: 'rating', providers: [RATING_CONTROL_VALUE_ACCESSOR], changeDetection: ChangeDetectionStrategy.OnPush, template: "<span (mouseleave)=\"reset()\" (keydown)=\"onKeydown($event)\" tabindex=\"0\"\r\n      role=\"slider\" aria-valuemin=\"0\"\r\n      [attr.aria-label]=\"ariaLabel\"\r\n      [attr.aria-valuemax]=\"range.length\"\r\n      [attr.aria-valuenow]=\"value\">\r\n  <ng-template #star let-value=\"value\" let-index=\"index\">{{ index < value ? '&#9733;' : '&#9734;' }}</ng-template>\r\n  <ng-template ngFor let-r [ngForOf]=\"range\" let-index=\"index\">\r\n    <span class=\"sr-only visually-hidden\">({{ index < value ? '*' : ' ' }})</span>\r\n    <span class=\"bs-rating-star\"\r\n          (mouseenter)=\"enter(index + 1)\"\r\n          (click)=\"rate(index + 1)\"\r\n          [title]=\"r.title\"\r\n          [style.cursor]=\"readonly ? 'default' : 'pointer'\"\r\n          [class.active]=\"index < value\">\r\n      <ng-template [ngTemplateOutlet]=\"customTemplate || star\"\r\n                   [ngTemplateOutletContext]=\"{index: index, value: value}\">\r\n      </ng-template>\r\n    </span>\r\n  </ng-template>\r\n</span>\r\n" }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: RatingConfig }]; }, propDecorators: { max: [{
                type: Input
            }], readonly: [{
                type: Input
            }], titles: [{
                type: Input
            }], customTemplate: [{
                type: Input
            }], onHover: [{
                type: Output
            }], onLeave: [{
                type: Output
            }], onKeydown: [{
                type: HostListener,
                args: ['keydown', ['$event']]
            }] } });

class RatingModule {
    static forRoot() {
        return {
            ngModule: RatingModule,
            providers: []
        };
    }
}
RatingModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: RatingModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RatingModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: RatingModule, declarations: [RatingComponent], imports: [CommonModule], exports: [RatingComponent] });
RatingModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: RatingModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: RatingModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [RatingComponent],
                    exports: [RatingComponent]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { RatingComponent, RatingConfig, RatingModule };
//# sourceMappingURL=ngx-bootstrap-rating.mjs.map
