import { Directive, EventEmitter, HostBinding, Input, Output, ElementRef, Renderer2 } from '@angular/core';
import { TabsetComponent } from './tabset.component';
import * as i0 from "@angular/core";
import * as i1 from "./tabset.component";
export class TabDirective {
    constructor(tabset, elementRef, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        /** if true tab can not be activated */
        this.disabled = false;
        /** if true tab can be removable, additional button will appear */
        this.removable = false;
        /** fired when tab became active, $event:Tab equals to selected instance of Tab component */
        this.selectTab = new EventEmitter();
        /** fired when tab became inactive, $event:Tab equals to deselected instance of Tab component */
        this.deselect = new EventEmitter();
        /** fired before tab will be removed, $event:Tab equals to instance of removed tab */
        this.removed = new EventEmitter();
        this.addClass = true;
        this.role = 'tabpanel';
        this._active = false;
        this._customClass = '';
        this.tabset = tabset;
        this.tabset.addTab(this);
    }
    /** if set, will be added to the tab's class attribute. Multiple classes are supported. */
    get customClass() {
        return this._customClass;
    }
    set customClass(customClass) {
        if (this.customClass) {
            this.customClass.split(' ').forEach((cssClass) => {
                this.renderer.removeClass(this.elementRef.nativeElement, cssClass);
            });
        }
        this._customClass = customClass ? customClass.trim() : '';
        if (this.customClass) {
            this.customClass.split(' ').forEach((cssClass) => {
                this.renderer.addClass(this.elementRef.nativeElement, cssClass);
            });
        }
    }
    /** tab active state toggle */
    get active() {
        return this._active;
    }
    set active(active) {
        if (this._active === active) {
            return;
        }
        if ((this.disabled && active) || !active) {
            if (this._active && !active) {
                this.deselect.emit(this);
                this._active = active;
            }
            return;
        }
        this._active = active;
        this.selectTab.emit(this);
        this.tabset.tabs.forEach((tab) => {
            if (tab !== this) {
                tab.active = false;
            }
        });
    }
    get ariaLabelledby() {
        return this.id ? `${this.id}-link` : '';
    }
    ngOnInit() {
        this.removable = !!this.removable;
    }
    ngOnDestroy() {
        this.tabset.removeTab(this, { reselect: false, emit: false });
    }
}
TabDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: TabDirective, deps: [{ token: i1.TabsetComponent }, { token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
TabDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.1", type: TabDirective, selector: "tab, [tab]", inputs: { heading: "heading", id: "id", disabled: "disabled", removable: "removable", customClass: "customClass", active: "active" }, outputs: { selectTab: "selectTab", deselect: "deselect", removed: "removed" }, host: { properties: { "attr.id": "this.id", "class.active": "this.active", "class.tab-pane": "this.addClass", "attr.role": "this.role", "attr.aria-labelledby": "this.ariaLabelledby" } }, exportAs: ["tab"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: TabDirective, decorators: [{
            type: Directive,
            args: [{ selector: 'tab, [tab]', exportAs: 'tab' }]
        }], ctorParameters: function () { return [{ type: i1.TabsetComponent }, { type: i0.ElementRef }, { type: i0.Renderer2 }]; }, propDecorators: { heading: [{
                type: Input
            }], id: [{
                type: HostBinding,
                args: ['attr.id']
            }, {
                type: Input
            }], disabled: [{
                type: Input
            }], removable: [{
                type: Input
            }], customClass: [{
                type: Input
            }], active: [{
                type: HostBinding,
                args: ['class.active']
            }, {
                type: Input
            }], selectTab: [{
                type: Output
            }], deselect: [{
                type: Output
            }], removed: [{
                type: Output
            }], addClass: [{
                type: HostBinding,
                args: ['class.tab-pane']
            }], role: [{
                type: HostBinding,
                args: ['attr.role']
            }], ariaLabelledby: [{
                type: HostBinding,
                args: ['attr.aria-labelledby']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy90YWJzL3RhYi5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxZQUFZLEVBQ1osV0FBVyxFQUNYLEtBQUssRUFDTCxNQUFNLEVBSU4sVUFBVSxFQUNWLFNBQVMsRUFDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7OztBQUdyRCxNQUFNLE9BQU8sWUFBWTtJQWdGdkIsWUFDRSxNQUF1QixFQUNoQixVQUFzQixFQUN0QixRQUFtQjtRQURuQixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGFBQVEsR0FBUixRQUFRLENBQVc7UUE3RTVCLHVDQUF1QztRQUM5QixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQzFCLGtFQUFrRTtRQUN6RCxjQUFTLEdBQUcsS0FBSyxDQUFDO1FBb0QzQiw0RkFBNEY7UUFDbEYsY0FBUyxHQUErQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3JFLGdHQUFnRztRQUN0RixhQUFRLEdBQStCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDcEUscUZBQXFGO1FBQzNFLFlBQU8sR0FBK0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVwQyxhQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLFNBQUksR0FBRyxVQUFVLENBQUM7UUFRbEMsWUFBTyxHQUFJLEtBQUssQ0FBQztRQUNqQixpQkFBWSxHQUFHLEVBQUUsQ0FBQztRQU8xQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBN0VELDBGQUEwRjtJQUMxRixJQUNJLFdBQVc7UUFDYixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDM0IsQ0FBQztJQUVELElB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O3NCQUFsQixNQUFNO2dCQUVHLFFBQVE7c0JBQWpCLE1BQU07Z0JBRUcsT0FBTztzQkFBaEIsTUFBTTtnQkFFd0IsUUFBUTtzQkFBdEMsV0FBVzt1QkFBQyxnQkFBZ0I7Z0JBQ0gsSUFBSTtzQkFBN0IsV0FBVzt1QkFBQyxXQUFXO2dCQUNpQixjQUFjO3NCQUF0RCxXQUFXO3VCQUFDLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgRGlyZWN0aXZlLFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBIb3N0QmluZGluZyxcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgVGVtcGxhdGVSZWYsXHJcbiAgT25Jbml0LFxyXG4gIE9uRGVzdHJveSxcclxuICBFbGVtZW50UmVmLFxyXG4gIFJlbmRlcmVyMlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBUYWJzZXRDb21wb25lbnQgfSBmcm9tICcuL3RhYnNldC5jb21wb25lbnQnO1xyXG5cclxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAndGFiLCBbdGFiXScsIGV4cG9ydEFzOiAndGFiJyB9KVxyXG5leHBvcnQgY2xhc3MgVGFiRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gIC8qKiB0YWIgaGVhZGVyIHRleHQgKi9cclxuICBASW5wdXQoKSBoZWFkaW5nPzogc3RyaW5nO1xyXG4gIC8qKiB0YWIgaWQuIFRoZSBzYW1lIGlkIHdpdGggc3VmZml4ICctbGluaycgd2lsbCBiZSBhZGRlZCB0byB0aGUgY29ycmVzcG9uZGluZyAmbHQ7bGkmZ3Q7IGVsZW1lbnQgICovXHJcbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmlkJylcclxuICBASW5wdXQoKSBpZD86IHN0cmluZztcclxuICAvKiogaWYgdHJ1ZSB0YWIgY2FuIG5vdCBiZSBhY3RpdmF0ZWQgKi9cclxuICBASW5wdXQoKSBkaXNhYmxlZCA9IGZhbHNlO1xyXG4gIC8qKiBpZiB0cnVlIHRhYiBjYW4gYmUgcmVtb3ZhYmxlLCBhZGRpdGlvbmFsIGJ1dHRvbiB3aWxsIGFwcGVhciAqL1xyXG4gIEBJbnB1dCgpIHJlbW92YWJsZSA9IGZhbHNlO1xyXG4gIC8qKiBpZiBzZXQsIHdpbGwgYmUgYWRkZWQgdG8gdGhlIHRhYidzIGNsYXNzIGF0dHJpYnV0ZS4gTXVsdGlwbGUgY2xhc3NlcyBhcmUgc3VwcG9ydGVkLiAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGN1c3RvbUNsYXNzKCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XHJcbiAgICByZXR1cm4gdGhpcy5fY3VzdG9tQ2xhc3M7XHJcbiAgfVxyXG5cclxuICBzZXQgY3VzdG9tQ2xhc3MoY3VzdG9tQ2xhc3M6IHN0cmluZyB8IHVuZGVmaW5lZCkge1xyXG4gICAgICBpZiAodGhpcy5jdXN0b21DbGFzcykge1xyXG4gICAgICAgIHRoaXMuY3VzdG9tQ2xhc3Muc3BsaXQoJyAnKS5mb3JFYWNoKChjc3NDbGFzczogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCBjc3NDbGFzcyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuX2N1c3RvbUNsYXNzID0gY3VzdG9tQ2xhc3MgPyBjdXN0b21DbGFzcy50cmltKCkgOiAnJztcclxuXHJcbiAgICAgIGlmICh0aGlzLmN1c3RvbUNsYXNzKSB7XHJcbiAgICAgICAgdGhpcy5jdXN0b21DbGFzcy5zcGxpdCgnICcpLmZvckVhY2goKGNzc0NsYXNzOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIGNzc0NsYXNzKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIHRhYiBhY3RpdmUgc3RhdGUgdG9nZ2xlICovXHJcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5hY3RpdmUnKVxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGFjdGl2ZSgpOiBib29sZWFuIHwgdW5kZWZpbmVkIHtcclxuICAgIHJldHVybiB0aGlzLl9hY3RpdmU7XHJcbiAgfVxyXG5cclxuICBzZXQgYWN0aXZlKGFjdGl2ZTogYm9vbGVhbiB8IHVuZGVmaW5lZCkge1xyXG4gICAgaWYgKHRoaXMuX2FjdGl2ZSA9PT0gYWN0aXZlKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmICgodGhpcy5kaXNhYmxlZCAmJiBhY3RpdmUpIHx8ICFhY3RpdmUpIHtcclxuICAgICAgaWYgKHRoaXMuX2FjdGl2ZSAmJiAhYWN0aXZlKSB7XHJcbiAgICAgICAgdGhpcy5kZXNlbGVjdC5lbWl0KHRoaXMpO1xyXG4gICAgICAgIHRoaXMuX2FjdGl2ZSA9IGFjdGl2ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX2FjdGl2ZSA9IGFjdGl2ZTtcclxuICAgIHRoaXMuc2VsZWN0VGFiLmVtaXQodGhpcyk7XHJcbiAgICB0aGlzLnRhYnNldC50YWJzLmZvckVhY2goKHRhYjogVGFiRGlyZWN0aXZlKSA9PiB7XHJcbiAgICAgIGlmICh0YWIgIT09IHRoaXMpIHtcclxuICAgICAgICB0YWIuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqIGZpcmVkIHdoZW4gdGFiIGJlY2FtZSBhY3RpdmUsICRldmVudDpUYWIgZXF1YWxzIHRvIHNlbGVjdGVkIGluc3RhbmNlIG9mIFRhYiBjb21wb25lbnQgKi9cclxuICBAT3V0cHV0KCkgc2VsZWN0VGFiOiBFdmVudEVtaXR0ZXI8VGFiRGlyZWN0aXZlPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAvKiogZmlyZWQgd2hlbiB0YWIgYmVjYW1lIGluYWN0aXZlLCAkZXZlbnQ6VGFiIGVxdWFscyB0byBkZXNlbGVjdGVkIGluc3RhbmNlIG9mIFRhYiBjb21wb25lbnQgKi9cclxuICBAT3V0cHV0KCkgZGVzZWxlY3Q6IEV2ZW50RW1pdHRlcjxUYWJEaXJlY3RpdmU+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIC8qKiBmaXJlZCBiZWZvcmUgdGFiIHdpbGwgYmUgcmVtb3ZlZCwgJGV2ZW50OlRhYiBlcXVhbHMgdG8gaW5zdGFuY2Ugb2YgcmVtb3ZlZCB0YWIgKi9cclxuICBAT3V0cHV0KCkgcmVtb3ZlZDogRXZlbnRFbWl0dGVyPFRhYkRpcmVjdGl2ZT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIEBIb3N0QmluZGluZygnY2xhc3MudGFiLXBhbmUnKSBhZGRDbGFzcyA9IHRydWU7XHJcbiAgQEhvc3RCaW5kaW5nKCdhdHRyLnJvbGUnKSByb2xlID0gJ3RhYnBhbmVsJztcclxuICBASG9zdEJpbmRpbmcoJ2F0dHIuYXJpYS1sYWJlbGxlZGJ5JykgZ2V0IGFyaWFMYWJlbGxlZGJ5KCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5pZCA/IGAke3RoaXMuaWR9LWxpbmtgIDogJyc7XHJcbiAgfVxyXG5cclxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxyXG4gIGhlYWRpbmdSZWY/OiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG4gIHRhYnNldDogVGFic2V0Q29tcG9uZW50O1xyXG4gIHByb3RlY3RlZCBfYWN0aXZlPyA9IGZhbHNlO1xyXG4gIHByb3RlY3RlZCBfY3VzdG9tQ2xhc3MgPSAnJztcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICB0YWJzZXQ6IFRhYnNldENvbXBvbmVudCxcclxuICAgIHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxyXG4gICAgcHVibGljIHJlbmRlcmVyOiBSZW5kZXJlcjJcclxuICApIHtcclxuICAgIHRoaXMudGFic2V0ID0gdGFic2V0O1xyXG4gICAgdGhpcy50YWJzZXQuYWRkVGFiKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLnJlbW92YWJsZSA9ICEhdGhpcy5yZW1vdmFibGU7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIHRoaXMudGFic2V0LnJlbW92ZVRhYih0aGlzLCB7IHJlc2VsZWN0OiBmYWxzZSwgZW1pdDogZmFsc2UgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==