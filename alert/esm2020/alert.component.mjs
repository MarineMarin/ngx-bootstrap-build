import { __decorate, __metadata } from "tslib";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { AlertConfig } from './alert.config';
import { OnChange } from 'ngx-bootstrap/utils';
import * as i0 from "@angular/core";
import * as i1 from "./alert.config";
import * as i2 from "@angular/common";
export class AlertComponent {
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
AlertComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: AlertComponent, deps: [{ token: i1.AlertConfig }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
AlertComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.1", type: AlertComponent, selector: "alert,bs-alert", inputs: { type: "type", dismissible: "dismissible", dismissOnTimeout: "dismissOnTimeout", isOpen: "isOpen" }, outputs: { onClose: "onClose", onClosed: "onClosed" }, ngImport: i0, template: "<ng-template [ngIf]=\"isOpen\">\r\n  <div [class]=\"'alert alert-' + type\" role=\"alert\" [ngClass]=\"classes\">\r\n    <ng-template [ngIf]=\"dismissible\">\r\n      <button type=\"button\" class=\"close btn-close\" aria-label=\"Close\" (click)=\"close()\">\r\n        <span aria-hidden=\"true\" class=\"visually-hidden\">&times;</span>\r\n        <span class=\"sr-only visually-hidden\">Close</span>\r\n      </button>\r\n    </ng-template>\r\n    <ng-content></ng-content>\r\n  </div>\r\n</ng-template>\r\n", directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
__decorate([
    OnChange(),
    __metadata("design:type", Object)
], AlertComponent.prototype, "dismissible", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: AlertComponent, decorators: [{
            type: Component,
            args: [{ selector: 'alert,bs-alert', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-template [ngIf]=\"isOpen\">\r\n  <div [class]=\"'alert alert-' + type\" role=\"alert\" [ngClass]=\"classes\">\r\n    <ng-template [ngIf]=\"dismissible\">\r\n      <button type=\"button\" class=\"close btn-close\" aria-label=\"Close\" (click)=\"close()\">\r\n        <span aria-hidden=\"true\" class=\"visually-hidden\">&times;</span>\r\n        <span class=\"sr-only visually-hidden\">Close</span>\r\n      </button>\r\n    </ng-template>\r\n    <ng-content></ng-content>\r\n  </div>\r\n</ng-template>\r\n" }]
        }], ctorParameters: function () { return [{ type: i1.AlertConfig }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { type: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FsZXJ0L2FsZXJ0LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uL3NyYy9hbGVydC9hbGVydC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBRUwsTUFBTSxFQUNQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0scUJBQXFCLENBQUM7Ozs7QUFPL0MsTUFBTSxPQUFPLGNBQWM7SUF5QnpCLFlBQVksT0FBb0IsRUFBVSxlQUFrQztRQUFsQyxvQkFBZSxHQUFmLGVBQWUsQ0FBbUI7UUF4QjVFOzs7V0FHRztRQUNNLFNBQUksR0FBRyxTQUFTLENBQUM7UUFDMUIsZ0RBQWdEO1FBQ3ZCLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBSTdDLHVCQUF1QjtRQUNkLFdBQU0sR0FBRyxJQUFJLENBQUM7UUFFdkI7O1dBRUc7UUFDTyxZQUFPLEdBQUcsSUFBSSxZQUFZLEVBQWtCLENBQUM7UUFDdkQsbUZBQW1GO1FBQ3pFLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBa0IsQ0FBQztRQUd4RCxZQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2Isc0JBQWlCLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQUc5QyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLEVBQUMsd0JBQXdCLEVBQUUsRUFBRTtZQUM1RCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDM0QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN0QyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDekIsd0VBQXdFO1lBQ3hFLFVBQVUsQ0FDUixHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQ2xCLFFBQVEsQ0FBQyxJQUFJLENBQUMsZ0JBQTBCLEVBQUUsRUFBRSxDQUFDLENBQzlDLENBQUM7U0FDSDtJQUNILENBQUM7SUFFRCw2RUFBNkU7SUFDN0UsZ0RBQWdEO0lBQ2hEOztPQUVHO0lBQ0gsS0FBSztRQUNILElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2hCLE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDcEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0IsQ0FBQzs7MkdBekRVLGNBQWM7K0ZBQWQsY0FBYywyTkNqQjNCLCtmQVdBO0FEYTJCO0lBQXhCLFFBQVEsRUFBRTs7bURBQWtDOzJGQVBsQyxjQUFjO2tCQUwxQixTQUFTOytCQUNFLGdCQUFnQixtQkFFVCx1QkFBdUIsQ0FBQyxNQUFNO2tJQU90QyxJQUFJO3NCQUFaLEtBQUs7Z0JBRW1CLFdBQVc7c0JBQXJCLEtBQUs7Z0JBRVgsZ0JBQWdCO3NCQUF4QixLQUFLO2dCQUdHLE1BQU07c0JBQWQsS0FBSztnQkFLSSxPQUFPO3NCQUFoQixNQUFNO2dCQUVHLFFBQVE7c0JBQWpCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIENoYW5nZURldGVjdG9yUmVmLFxyXG4gIENvbXBvbmVudCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgSW5wdXQsXHJcbiAgT25Jbml0LFxyXG4gIE91dHB1dFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBBbGVydENvbmZpZyB9IGZyb20gJy4vYWxlcnQuY29uZmlnJztcclxuaW1wb3J0IHsgT25DaGFuZ2UgfSBmcm9tICduZ3gtYm9vdHN0cmFwL3V0aWxzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYWxlcnQsYnMtYWxlcnQnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9hbGVydC5jb21wb25lbnQuaHRtbCcsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIEFsZXJ0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAvKiogQWxlcnQgdHlwZS5cclxuICAgKiBQcm92aWRlcyBvbmUgb2YgZm91ciBib290c3RyYXAgc3VwcG9ydGVkIGNvbnRleHR1YWwgY2xhc3NlczpcclxuICAgKiBgc3VjY2Vzc2AsIGBpbmZvYCwgYHdhcm5pbmdgIGFuZCBgZGFuZ2VyYFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHR5cGUgPSAnd2FybmluZyc7XHJcbiAgLyoqIElmIHNldCwgZGlzcGxheXMgYW4gaW5saW5lIFwiQ2xvc2VcIiBidXR0b24gKi9cclxuICBAT25DaGFuZ2UoKSAgIEBJbnB1dCgpICAgZGlzbWlzc2libGUgPSBmYWxzZTtcclxuICAvKiogTnVtYmVyIGluIG1pbGxpc2Vjb25kcywgYWZ0ZXIgd2hpY2ggYWxlcnQgd2lsbCBiZSBjbG9zZWQgKi9cclxuICBASW5wdXQoKSBkaXNtaXNzT25UaW1lb3V0PzogbnVtYmVyIHwgc3RyaW5nO1xyXG5cclxuICAvKiogSXMgYWxlcnQgdmlzaWJsZSAqL1xyXG4gIEBJbnB1dCgpIGlzT3BlbiA9IHRydWU7XHJcblxyXG4gIC8qKiBUaGlzIGV2ZW50IGZpcmVzIGltbWVkaWF0ZWx5IGFmdGVyIGNsb3NlIGluc3RhbmNlIG1ldGhvZCBpcyBjYWxsZWQsXHJcbiAgICogJGV2ZW50IGlzIGFuIGluc3RhbmNlIG9mIEFsZXJ0IGNvbXBvbmVudC5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgb25DbG9zZSA9IG5ldyBFdmVudEVtaXR0ZXI8QWxlcnRDb21wb25lbnQ+KCk7XHJcbiAgLyoqIFRoaXMgZXZlbnQgZmlyZXMgd2hlbiBhbGVydCBjbG9zZWQsICRldmVudCBpcyBhbiBpbnN0YW5jZSBvZiBBbGVydCBjb21wb25lbnQgKi9cclxuICBAT3V0cHV0KCkgb25DbG9zZWQgPSBuZXcgRXZlbnRFbWl0dGVyPEFsZXJ0Q29tcG9uZW50PigpO1xyXG5cclxuXHJcbiAgY2xhc3NlcyA9ICcnO1xyXG4gIGRpc21pc3NpYmxlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xyXG5cclxuICBjb25zdHJ1Y3RvcihfY29uZmlnOiBBbGVydENvbmZpZywgcHJpdmF0ZSBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdG9yUmVmKSB7XHJcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIF9jb25maWcpO1xyXG4gICAgdGhpcy5kaXNtaXNzaWJsZUNoYW5nZS5zdWJzY3JpYmUoKC8qZGlzbWlzc2libGU6IGJvb2xlYW4qLykgPT4ge1xyXG4gICAgICB0aGlzLmNsYXNzZXMgPSB0aGlzLmRpc21pc3NpYmxlID8gJ2FsZXJ0LWRpc21pc3NpYmxlJyA6ICcnO1xyXG4gICAgICB0aGlzLmNoYW5nZURldGVjdGlvbi5tYXJrRm9yQ2hlY2soKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5kaXNtaXNzT25UaW1lb3V0KSB7XHJcbiAgICAgIC8vIGlmIGRpc21pc3NPblRpbWVvdXQgdXNlZCBhcyBhdHRyIHdpdGhvdXQgYmluZGluZywgaXQgd2lsbCBiZSBhIHN0cmluZ1xyXG4gICAgICBzZXRUaW1lb3V0KFxyXG4gICAgICAgICgpID0+IHRoaXMuY2xvc2UoKSxcclxuICAgICAgICBwYXJzZUludCh0aGlzLmRpc21pc3NPblRpbWVvdXQgYXMgc3RyaW5nLCAxMClcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIHRvZG86IGFuaW1hdGlvbiBgIElmIHRoZSAuZmFkZSBhbmQgLmluIGNsYXNzZXMgYXJlIHByZXNlbnQgb24gdGhlIGVsZW1lbnQsXHJcbiAgLy8gdGhlIGFsZXJ0IHdpbGwgZmFkZSBvdXQgYmVmb3JlIGl0IGlzIHJlbW92ZWRgXHJcbiAgLyoqXHJcbiAgICogQ2xvc2VzIGFuIGFsZXJ0IGJ5IHJlbW92aW5nIGl0IGZyb20gdGhlIERPTS5cclxuICAgKi9cclxuICBjbG9zZSgpOiB2b2lkIHtcclxuICAgIGlmICghdGhpcy5pc09wZW4pIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMub25DbG9zZS5lbWl0KHRoaXMpO1xyXG4gICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcclxuICAgIHRoaXMuY2hhbmdlRGV0ZWN0aW9uLm1hcmtGb3JDaGVjaygpO1xyXG4gICAgdGhpcy5vbkNsb3NlZC5lbWl0KHRoaXMpO1xyXG4gIH1cclxufVxyXG4iLCI8bmctdGVtcGxhdGUgW25nSWZdPVwiaXNPcGVuXCI+XHJcbiAgPGRpdiBbY2xhc3NdPVwiJ2FsZXJ0IGFsZXJ0LScgKyB0eXBlXCIgcm9sZT1cImFsZXJ0XCIgW25nQ2xhc3NdPVwiY2xhc3Nlc1wiPlxyXG4gICAgPG5nLXRlbXBsYXRlIFtuZ0lmXT1cImRpc21pc3NpYmxlXCI+XHJcbiAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xvc2UgYnRuLWNsb3NlXCIgYXJpYS1sYWJlbD1cIkNsb3NlXCIgKGNsaWNrKT1cImNsb3NlKClcIj5cclxuICAgICAgICA8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIiBjbGFzcz1cInZpc3VhbGx5LWhpZGRlblwiPiZ0aW1lczs8L3NwYW4+XHJcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJzci1vbmx5IHZpc3VhbGx5LWhpZGRlblwiPkNsb3NlPC9zcGFuPlxyXG4gICAgICA8L2J1dHRvbj5cclxuICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XHJcbiAgPC9kaXY+XHJcbjwvbmctdGVtcGxhdGU+XHJcbiJdfQ==