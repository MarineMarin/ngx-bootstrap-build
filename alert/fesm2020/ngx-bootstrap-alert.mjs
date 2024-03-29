import { __decorate, __metadata } from 'tslib';
import * as i0 from '@angular/core';
import { Injectable, EventEmitter, Component, ChangeDetectionStrategy, Input, Output, NgModule } from '@angular/core';
import { OnChange } from 'ngx-bootstrap/utils';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';

class AlertConfig {
    constructor() {
        /** default alert type */
        this.type = 'warning';
        /** is alerts are dismissible by default */
        this.dismissible = false;
        /** default time before alert will dismiss */
        this.dismissOnTimeout = undefined;
    }
}
AlertConfig.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: AlertConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
AlertConfig.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: AlertConfig, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: AlertConfig, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

class AlertComponent {
    constructor(_config, changeDetection) {
        this.changeDetection = changeDetection;
        /** Alert type.
         * Provides one of four bootstrap supported contextual classes:
         * `success`, `info`, `warning` and `danger`
         */
        this.type = 'warning';
        /** If set, displays an inline "Close" button */
        this.dismissible = false;
        /** Is alert visible */
        this.isOpen = true;
        /** This event fires immediately after close instance method is called,
         * $event is an instance of Alert component.
         */
        this.onClose = new EventEmitter();
        /** This event fires when alert closed, $event is an instance of Alert component */
        this.onClosed = new EventEmitter();
        this.classes = '';
        this.dismissibleChange = new EventEmitter();
        Object.assign(this, _config);
        this.dismissibleChange.subscribe(( /*dismissible: boolean*/) => {
            this.classes = this.dismissible ? 'alert-dismissible' : '';
            this.changeDetection.markForCheck();
        });
    }
    ngOnInit() {
        if (this.dismissOnTimeout) {
            // if dismissOnTimeout used as attr without binding, it will be a string
            setTimeout(() => this.close(), parseInt(this.dismissOnTimeout, 10));
        }
    }
    // todo: animation ` If the .fade and .in classes are present on the element,
    // the alert will fade out before it is removed`
    /**
     * Closes an alert by removing it from the DOM.
     */
    close() {
        if (!this.isOpen) {
            return;
        }
        this.onClose.emit(this);
        this.isOpen = false;
        this.changeDetection.markForCheck();
        this.onClosed.emit(this);
    }
}
AlertComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: AlertComponent, deps: [{ token: AlertConfig }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
AlertComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.1", type: AlertComponent, selector: "alert,bs-alert", inputs: { type: "type", dismissible: "dismissible", dismissOnTimeout: "dismissOnTimeout", isOpen: "isOpen" }, outputs: { onClose: "onClose", onClosed: "onClosed" }, ngImport: i0, template: "<ng-template [ngIf]=\"isOpen\">\r\n  <div [class]=\"'alert alert-' + type\" role=\"alert\" [ngClass]=\"classes\">\r\n    <ng-template [ngIf]=\"dismissible\">\r\n      <button type=\"button\" class=\"close btn-close\" aria-label=\"Close\" (click)=\"close()\">\r\n        <span aria-hidden=\"true\" class=\"visually-hidden\">&times;</span>\r\n        <span class=\"sr-only visually-hidden\">Close</span>\r\n      </button>\r\n    </ng-template>\r\n    <ng-content></ng-content>\r\n  </div>\r\n</ng-template>\r\n", directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
__decorate([
    OnChange(),
    __metadata("design:type", Object)
], AlertComponent.prototype, "dismissible", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: AlertComponent, decorators: [{
            type: Component,
            args: [{ selector: 'alert,bs-alert', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-template [ngIf]=\"isOpen\">\r\n  <div [class]=\"'alert alert-' + type\" role=\"alert\" [ngClass]=\"classes\">\r\n    <ng-template [ngIf]=\"dismissible\">\r\n      <button type=\"button\" class=\"close btn-close\" aria-label=\"Close\" (click)=\"close()\">\r\n        <span aria-hidden=\"true\" class=\"visually-hidden\">&times;</span>\r\n        <span class=\"sr-only visually-hidden\">Close</span>\r\n      </button>\r\n    </ng-template>\r\n    <ng-content></ng-content>\r\n  </div>\r\n</ng-template>\r\n" }]
        }], ctorParameters: function () { return [{ type: AlertConfig }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { type: [{
                type: Input
            }], dismissible: [{
                type: Input
            }], dismissOnTimeout: [{
                type: Input
            }], isOpen: [{
                type: Input
            }], onClose: [{
                type: Output
            }], onClosed: [{
                type: Output
            }] } });

class AlertModule {
    static forRoot() {
        return { ngModule: AlertModule, providers: [] };
    }
}
AlertModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: AlertModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AlertModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: AlertModule, declarations: [AlertComponent], imports: [CommonModule], exports: [AlertComponent] });
AlertModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: AlertModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: AlertModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [AlertComponent],
                    exports: [AlertComponent],
                    entryComponents: [AlertComponent]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { AlertComponent, AlertConfig, AlertModule };
//# sourceMappingURL=ngx-bootstrap-alert.mjs.map
