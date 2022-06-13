import { Component, HostBinding, Inject, Input, Output, EventEmitter } from '@angular/core';
import { isBs3 } from 'ngx-bootstrap/utils';
import { AccordionComponent } from './accordion.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "ngx-bootstrap/collapse";
import * as i3 from "./accordion.component";
/**
 * ### Accordion heading
 * Instead of using `heading` attribute on the `accordion-group`, you can use
 * an `accordion-heading` attribute on `any` element inside of a group that
 * will be used as group's header template.
 */
export class AccordionPanelComponent {
    constructor(accordion) {
        /** turn on/off animation */
        this.isAnimated = false;
        /** Provides an ability to use Bootstrap's contextual panel classes
         * (`panel-primary`, `panel-success`, `panel-info`, etc...).
         * List of all available classes [available here]
         * (https://getbootstrap.com/docs/3.3/components/#panels-alternatives)
         */
        this.panelClass = 'panel-default';
        /** if <code>true</code> — disables accordion group */
        this.isDisabled = false;
        /** Emits when the opened state changes */
        this.isOpenChange = new EventEmitter();
        this._isOpen = false;
        this.accordion = accordion;
    }
    // Questionable, maybe .panel-open should be on child div.panel element?
    /** Is accordion group open or closed. This property supports two-way binding */
    get isOpen() {
        return this._isOpen;
    }
    set isOpen(value) {
        if (value !== this.isOpen) {
            if (value) {
                this.accordion.closeOtherPanels(this);
            }
            this._isOpen = value;
            Promise.resolve(null)
                .then(() => {
                this.isOpenChange.emit(value);
            });
        }
    }
    get isBs3() {
        return isBs3();
    }
    ngOnInit() {
        this.accordion.addGroup(this);
    }
    ngOnDestroy() {
        this.accordion.removeGroup(this);
    }
    toggleOpen() {
        if (!this.isDisabled) {
            this.isOpen = !this.isOpen;
        }
    }
}
AccordionPanelComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: AccordionPanelComponent, deps: [{ token: AccordionComponent }], target: i0.ɵɵFactoryTarget.Component });
AccordionPanelComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.1", type: AccordionPanelComponent, selector: "accordion-group, accordion-panel", inputs: { heading: "heading", panelClass: "panelClass", isDisabled: "isDisabled", isOpen: "isOpen" }, outputs: { isOpenChange: "isOpenChange" }, host: { properties: { "class.panel-open": "this.isOpen" }, styleAttribute: "display: block", classAttribute: "panel" }, ngImport: i0, template: "<div class=\"panel card\" [ngClass]=\"panelClass\">\r\n  <div\r\n    class=\"panel-heading card-header\"\r\n    role=\"tab\"\r\n    (click)=\"toggleOpen()\"\r\n    [ngClass]=\"isDisabled ? 'panel-disabled' : 'panel-enabled'\"\r\n  >\r\n    <div class=\"panel-title\">\r\n      <div role=\"button\" class=\"accordion-toggle\" [attr.aria-expanded]=\"isOpen\">\r\n        <button class=\"btn btn-link\" *ngIf=\"heading\" [ngClass]=\"{ 'text-muted': isDisabled }\" type=\"button\">\r\n          {{ heading }}\r\n        </button>\r\n        <ng-content select=\"[accordion-heading]\"></ng-content>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"panel-collapse collapse\" role=\"tabpanel\" [collapse]=\"!isOpen\" [isAnimated]=\"isAnimated\">\r\n    <div class=\"panel-body card-block card-body\">\r\n      <ng-content></ng-content>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: [":host .card-header.panel-enabled{cursor:pointer}:host .card-header.panel-disabled .btn.btn-link{cursor:default;text-decoration:none}\n"], directives: [{ type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.CollapseDirective, selector: "[collapse]", inputs: ["display", "isAnimated", "collapse"], outputs: ["collapsed", "collapses", "expanded", "expands"], exportAs: ["bs-collapse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: AccordionPanelComponent, decorators: [{
            type: Component,
            args: [{ selector: 'accordion-group, accordion-panel', host: {
                        class: 'panel',
                        style: 'display: block'
                    }, template: "<div class=\"panel card\" [ngClass]=\"panelClass\">\r\n  <div\r\n    class=\"panel-heading card-header\"\r\n    role=\"tab\"\r\n    (click)=\"toggleOpen()\"\r\n    [ngClass]=\"isDisabled ? 'panel-disabled' : 'panel-enabled'\"\r\n  >\r\n    <div class=\"panel-title\">\r\n      <div role=\"button\" class=\"accordion-toggle\" [attr.aria-expanded]=\"isOpen\">\r\n        <button class=\"btn btn-link\" *ngIf=\"heading\" [ngClass]=\"{ 'text-muted': isDisabled }\" type=\"button\">\r\n          {{ heading }}\r\n        </button>\r\n        <ng-content select=\"[accordion-heading]\"></ng-content>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"panel-collapse collapse\" role=\"tabpanel\" [collapse]=\"!isOpen\" [isAnimated]=\"isAnimated\">\r\n    <div class=\"panel-body card-block card-body\">\r\n      <ng-content></ng-content>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: [":host .card-header.panel-enabled{cursor:pointer}:host .card-header.panel-disabled .btn.btn-link{cursor:default;text-decoration:none}\n"] }]
        }], ctorParameters: function () { return [{ type: i3.AccordionComponent, decorators: [{
                    type: Inject,
                    args: [AccordionComponent]
                }] }]; }, propDecorators: { heading: [{
                type: Input
            }], panelClass: [{
                type: Input
            }], isDisabled: [{
                type: Input
            }], isOpenChange: [{
                type: Output
            }], isOpen: [{
                type: HostBinding,
                args: ['class.panel-open']
            }, {
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3JkaW9uLWdyb3VwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hY2NvcmRpb24vYWNjb3JkaW9uLWdyb3VwLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uL3NyYy9hY2NvcmRpb24vYWNjb3JkaW9uLWdyb3VwLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBRSxZQUFZLEVBQy9FLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUM1QyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7Ozs7QUFFM0Q7Ozs7O0dBS0c7QUFXSCxNQUFNLE9BQU8sdUJBQXVCO0lBNENsQyxZQUF3QyxTQUE2QjtRQTNDckUsNEJBQTRCO1FBQzVCLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFHbkI7Ozs7V0FJRztRQUNNLGVBQVUsR0FBRyxlQUFlLENBQUM7UUFDdEMsc0RBQXNEO1FBQzdDLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFDNUIsMENBQTBDO1FBQ2hDLGlCQUFZLEdBQTBCLElBQUksWUFBWSxFQUFFLENBQUM7UUEyQnpELFlBQU8sR0FBRyxLQUFLLENBQUM7UUFJeEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7SUFDN0IsQ0FBQztJQTlCRCx3RUFBd0U7SUFDeEUsZ0ZBQWdGO0lBQ2hGLElBRUksTUFBTTtRQUNSLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDO0lBRUQsSUFBSSxNQUFNLENBQUMsS0FBYztRQUN2QixJQUFJLEtBQUssS0FBSyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ3pCLElBQUksS0FBSyxFQUFFO2dCQUNULElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDdkM7WUFDRCxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUNyQixPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztpQkFDcEIsSUFBSSxDQUFDLEdBQUcsRUFBRTtnQkFDVCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNoQyxDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQUVELElBQUksS0FBSztRQUNQLE9BQU8sS0FBSyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQVNELFFBQVE7UUFDTixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRCxVQUFVO1FBQ1IsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDcEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7U0FDNUI7SUFDSCxDQUFDOztvSEE1RFUsdUJBQXVCLGtCQTRDZCxrQkFBa0I7d0dBNUMzQix1QkFBdUIsaVZDdEJwQyxpM0JBc0JBOzJGREFhLHVCQUF1QjtrQkFWbkMsU0FBUzsrQkFDRSxrQ0FBa0MsUUFHdEM7d0JBQ0osS0FBSyxFQUFFLE9BQU87d0JBQ2QsS0FBSyxFQUFFLGdCQUFnQjtxQkFDeEI7OzBCQStDWSxNQUFNOzJCQUFDLGtCQUFrQjs0Q0F4QzdCLE9BQU87c0JBQWYsS0FBSztnQkFNRyxVQUFVO3NCQUFsQixLQUFLO2dCQUVHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBRUksWUFBWTtzQkFBckIsTUFBTTtnQkFNSCxNQUFNO3NCQUZULFdBQVc7dUJBQUMsa0JBQWtCOztzQkFDOUIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LCBIb3N0QmluZGluZywgSW5qZWN0LCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IGlzQnMzIH0gZnJvbSAnbmd4LWJvb3RzdHJhcC91dGlscyc7XHJcbmltcG9ydCB7IEFjY29yZGlvbkNvbXBvbmVudCB9IGZyb20gJy4vYWNjb3JkaW9uLmNvbXBvbmVudCc7XHJcblxyXG4vKipcclxuICogIyMjIEFjY29yZGlvbiBoZWFkaW5nXHJcbiAqIEluc3RlYWQgb2YgdXNpbmcgYGhlYWRpbmdgIGF0dHJpYnV0ZSBvbiB0aGUgYGFjY29yZGlvbi1ncm91cGAsIHlvdSBjYW4gdXNlXHJcbiAqIGFuIGBhY2NvcmRpb24taGVhZGluZ2AgYXR0cmlidXRlIG9uIGBhbnlgIGVsZW1lbnQgaW5zaWRlIG9mIGEgZ3JvdXAgdGhhdFxyXG4gKiB3aWxsIGJlIHVzZWQgYXMgZ3JvdXAncyBoZWFkZXIgdGVtcGxhdGUuXHJcbiAqL1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FjY29yZGlvbi1ncm91cCwgYWNjb3JkaW9uLXBhbmVsJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vYWNjb3JkaW9uLWdyb3VwLmNvbXBvbmVudC5odG1sJyxcclxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLWhvc3QtbWV0YWRhdGEtcHJvcGVydHlcclxuICBob3N0OiB7XHJcbiAgICBjbGFzczogJ3BhbmVsJyxcclxuICAgIHN0eWxlOiAnZGlzcGxheTogYmxvY2snXHJcbiAgfSxcclxuICBzdHlsZVVybHM6IFsnLi9hY2NvcmRpb24uc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBY2NvcmRpb25QYW5lbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICAvKiogdHVybiBvbi9vZmYgYW5pbWF0aW9uICovXHJcbiAgaXNBbmltYXRlZCA9IGZhbHNlO1xyXG4gIC8qKiBDbGlja2FibGUgdGV4dCBpbiBhY2NvcmRpb24ncyBncm91cCBoZWFkZXIsIGNoZWNrIGBhY2NvcmRpb24gaGVhZGluZ2AgYmVsb3cgZm9yIHVzaW5nIGh0bWwgaW4gaGVhZGVyICovXHJcbiAgQElucHV0KCkgaGVhZGluZyE6IHN0cmluZztcclxuICAvKiogUHJvdmlkZXMgYW4gYWJpbGl0eSB0byB1c2UgQm9vdHN0cmFwJ3MgY29udGV4dHVhbCBwYW5lbCBjbGFzc2VzXHJcbiAgICogKGBwYW5lbC1wcmltYXJ5YCwgYHBhbmVsLXN1Y2Nlc3NgLCBgcGFuZWwtaW5mb2AsIGV0Yy4uLikuXHJcbiAgICogTGlzdCBvZiBhbGwgYXZhaWxhYmxlIGNsYXNzZXMgW2F2YWlsYWJsZSBoZXJlXVxyXG4gICAqIChodHRwczovL2dldGJvb3RzdHJhcC5jb20vZG9jcy8zLjMvY29tcG9uZW50cy8jcGFuZWxzLWFsdGVybmF0aXZlcylcclxuICAgKi9cclxuICBASW5wdXQoKSBwYW5lbENsYXNzID0gJ3BhbmVsLWRlZmF1bHQnO1xyXG4gIC8qKiBpZiA8Y29kZT50cnVlPC9jb2RlPiDigJQgZGlzYWJsZXMgYWNjb3JkaW9uIGdyb3VwICovXHJcbiAgQElucHV0KCkgaXNEaXNhYmxlZCA9IGZhbHNlO1xyXG4gIC8qKiBFbWl0cyB3aGVuIHRoZSBvcGVuZWQgc3RhdGUgY2hhbmdlcyAqL1xyXG4gIEBPdXRwdXQoKSBpc09wZW5DaGFuZ2U6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgLy8gUXVlc3Rpb25hYmxlLCBtYXliZSAucGFuZWwtb3BlbiBzaG91bGQgYmUgb24gY2hpbGQgZGl2LnBhbmVsIGVsZW1lbnQ/XHJcbiAgLyoqIElzIGFjY29yZGlvbiBncm91cCBvcGVuIG9yIGNsb3NlZC4gVGhpcyBwcm9wZXJ0eSBzdXBwb3J0cyB0d28td2F5IGJpbmRpbmcgKi9cclxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnBhbmVsLW9wZW4nKVxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGlzT3BlbigpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl9pc09wZW47XHJcbiAgfVxyXG5cclxuICBzZXQgaXNPcGVuKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICBpZiAodmFsdWUgIT09IHRoaXMuaXNPcGVuKSB7XHJcbiAgICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMuYWNjb3JkaW9uLmNsb3NlT3RoZXJQYW5lbHModGhpcyk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5faXNPcGVuID0gdmFsdWU7XHJcbiAgICAgIFByb21pc2UucmVzb2x2ZShudWxsKVxyXG4gICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5pc09wZW5DaGFuZ2UuZW1pdCh2YWx1ZSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0IGlzQnMzKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIGlzQnMzKCk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgX2lzT3BlbiA9IGZhbHNlO1xyXG4gIHByb3RlY3RlZCBhY2NvcmRpb246IEFjY29yZGlvbkNvbXBvbmVudDtcclxuXHJcbiAgY29uc3RydWN0b3IoQEluamVjdChBY2NvcmRpb25Db21wb25lbnQpIGFjY29yZGlvbjogQWNjb3JkaW9uQ29tcG9uZW50KSB7XHJcbiAgICB0aGlzLmFjY29yZGlvbiA9IGFjY29yZGlvbjtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5hY2NvcmRpb24uYWRkR3JvdXAodGhpcyk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIHRoaXMuYWNjb3JkaW9uLnJlbW92ZUdyb3VwKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlT3BlbigpOiB2b2lkIHtcclxuICAgIGlmICghdGhpcy5pc0Rpc2FibGVkKSB7XHJcbiAgICAgIHRoaXMuaXNPcGVuID0gIXRoaXMuaXNPcGVuO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCI8ZGl2IGNsYXNzPVwicGFuZWwgY2FyZFwiIFtuZ0NsYXNzXT1cInBhbmVsQ2xhc3NcIj5cclxuICA8ZGl2XHJcbiAgICBjbGFzcz1cInBhbmVsLWhlYWRpbmcgY2FyZC1oZWFkZXJcIlxyXG4gICAgcm9sZT1cInRhYlwiXHJcbiAgICAoY2xpY2spPVwidG9nZ2xlT3BlbigpXCJcclxuICAgIFtuZ0NsYXNzXT1cImlzRGlzYWJsZWQgPyAncGFuZWwtZGlzYWJsZWQnIDogJ3BhbmVsLWVuYWJsZWQnXCJcclxuICA+XHJcbiAgICA8ZGl2IGNsYXNzPVwicGFuZWwtdGl0bGVcIj5cclxuICAgICAgPGRpdiByb2xlPVwiYnV0dG9uXCIgY2xhc3M9XCJhY2NvcmRpb24tdG9nZ2xlXCIgW2F0dHIuYXJpYS1leHBhbmRlZF09XCJpc09wZW5cIj5cclxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1saW5rXCIgKm5nSWY9XCJoZWFkaW5nXCIgW25nQ2xhc3NdPVwieyAndGV4dC1tdXRlZCc6IGlzRGlzYWJsZWQgfVwiIHR5cGU9XCJidXR0b25cIj5cclxuICAgICAgICAgIHt7IGhlYWRpbmcgfX1cclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbYWNjb3JkaW9uLWhlYWRpbmddXCI+PC9uZy1jb250ZW50PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG4gIDxkaXYgY2xhc3M9XCJwYW5lbC1jb2xsYXBzZSBjb2xsYXBzZVwiIHJvbGU9XCJ0YWJwYW5lbFwiIFtjb2xsYXBzZV09XCIhaXNPcGVuXCIgW2lzQW5pbWF0ZWRdPVwiaXNBbmltYXRlZFwiPlxyXG4gICAgPGRpdiBjbGFzcz1cInBhbmVsLWJvZHkgY2FyZC1ibG9jayBjYXJkLWJvZHlcIj5cclxuICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbjwvZGl2PlxyXG4iXX0=