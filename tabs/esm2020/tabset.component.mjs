import { Component, HostBinding, Input, Renderer2, ElementRef } from '@angular/core';
import { TabsetConfig } from './tabset.config';
import * as i0 from "@angular/core";
import * as i1 from "./tabset.config";
import * as i2 from "@angular/common";
import * as i3 from "./ng-transclude.directive";
// todo: add active event to tab
// todo: fix? mixing static and dynamic tabs position tabs in order of creation
export class TabsetComponent {
    constructor(config, renderer, elementRef) {
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.clazz = true;
        this.tabs = [];
        this.classMap = {};
        /** aria label for tab list */
        this.ariaLabel = 'Tabs';
        this.isDestroyed = false;
        this._vertical = false;
        this._justified = false;
        this._type = 'tabs';
        this._isKeysAllowed = true;
        Object.assign(this, config);
    }
    /** if true tabs will be placed vertically */
    get vertical() {
        return this._vertical;
    }
    set vertical(value) {
        this._vertical = value;
        this.setClassMap();
    }
    /** if true tabs fill the container and have a consistent width */
    get justified() {
        return this._justified;
    }
    set justified(value) {
        this._justified = value;
        this.setClassMap();
    }
    /** navigation context class: 'tabs' or 'pills' */
    get type() {
        return this._type;
    }
    set type(value) {
        this._type = value;
        this.setClassMap();
    }
    get isKeysAllowed() {
        return this._isKeysAllowed;
    }
    set isKeysAllowed(value) {
        this._isKeysAllowed = value;
    }
    ngOnDestroy() {
        this.isDestroyed = true;
    }
    addTab(tab) {
        this.tabs.push(tab);
        tab.active = this.tabs.length === 1 && !tab.active;
    }
    removeTab(tab, options = { reselect: true, emit: true }) {
        const index = this.tabs.indexOf(tab);
        if (index === -1 || this.isDestroyed) {
            return;
        }
        // Select a new tab if the tab to be removed is selected and not destroyed
        if (options.reselect && tab.active && this.hasAvailableTabs(index)) {
            const newActiveIndex = this.getClosestTabIndex(index);
            this.tabs[newActiveIndex].active = true;
        }
        if (options.emit) {
            tab.removed.emit(tab);
        }
        this.tabs.splice(index, 1);
        if (tab.elementRef.nativeElement.parentNode) {
            this.renderer.removeChild(tab.elementRef.nativeElement.parentNode, tab.elementRef.nativeElement);
        }
    }
    keyNavActions(event, index) {
        if (!this.isKeysAllowed) {
            return;
        }
        const list = Array.from(this.elementRef.nativeElement.querySelectorAll('.nav-link'));
        // const activeElList = list.filter((el: HTMLElement) => !el.classList.contains('disabled'));
        if (event.keyCode === 13 || event.key === 'Enter' || event.keyCode === 32 || event.key === 'Space') {
            event.preventDefault();
            const currentTab = list[(index) % list.length];
            currentTab.click();
            return;
        }
        if (event.keyCode === 39 || event.key === 'RightArrow') {
            let nextTab;
            let shift = 1;
            do {
                nextTab = list[(index + shift) % list.length];
                shift++;
            } while (nextTab.classList.contains('disabled'));
            nextTab.focus();
            return;
        }
        if (event.keyCode === 37 || event.key === 'LeftArrow') {
            let previousTab;
            let shift = 1;
            let i = index;
            do {
                if ((i - shift) < 0) {
                    i = list.length - 1;
                    previousTab = list[i];
                    shift = 0;
                }
                else {
                    previousTab = list[i - shift];
                }
                shift++;
            } while (previousTab.classList.contains('disabled'));
            previousTab.focus();
            return;
        }
        if (event.keyCode === 36 || event.key === 'Home') {
            event.preventDefault();
            let firstTab;
            let shift = 0;
            do {
                firstTab = list[shift % list.length];
                shift++;
            } while (firstTab.classList.contains('disabled'));
            firstTab.focus();
            return;
        }
        if (event.keyCode === 35 || event.key === 'End') {
            event.preventDefault();
            let lastTab;
            let shift = 1;
            let i = index;
            do {
                if ((i - shift) < 0) {
                    i = list.length - 1;
                    lastTab = list[i];
                    shift = 0;
                }
                else {
                    lastTab = list[i - shift];
                }
                shift++;
            } while (lastTab.classList.contains('disabled'));
            lastTab.focus();
            return;
        }
        if (event.keyCode === 46 || event.key === 'Delete') {
            if (this.tabs[index].removable) {
                this.removeTab(this.tabs[index]);
                if (list[index + 1]) {
                    list[(index + 1) % list.length].focus();
                    return;
                }
                if (list[list.length - 1]) {
                    list[0].focus();
                }
            }
        }
    }
    getClosestTabIndex(index) {
        const tabsLength = this.tabs.length;
        if (!tabsLength) {
            return -1;
        }
        for (let step = 1; step <= tabsLength; step += 1) {
            const prevIndex = index - step;
            const nextIndex = index + step;
            if (this.tabs[prevIndex] && !this.tabs[prevIndex].disabled) {
                return prevIndex;
            }
            if (this.tabs[nextIndex] && !this.tabs[nextIndex].disabled) {
                return nextIndex;
            }
        }
        return -1;
    }
    hasAvailableTabs(index) {
        const tabsLength = this.tabs.length;
        if (!tabsLength) {
            return false;
        }
        for (let i = 0; i < tabsLength; i += 1) {
            if (!this.tabs[i].disabled && i !== index) {
                return true;
            }
        }
        return false;
    }
    setClassMap() {
        this.classMap = {
            'nav-stacked': this.vertical,
            'flex-column': this.vertical,
            'nav-justified': this.justified,
            [`nav-${this.type}`]: true
        };
    }
}
TabsetComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: TabsetComponent, deps: [{ token: i1.TabsetConfig }, { token: i0.Renderer2 }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
TabsetComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.1", type: TabsetComponent, selector: "tabset", inputs: { vertical: "vertical", justified: "justified", type: "type" }, host: { properties: { "class.tab-container": "this.clazz" } }, ngImport: i0, template: "<ul class=\"nav\" [ngClass]=\"classMap\"\r\n    (click)=\"$event.preventDefault()\"\r\n    [attr.aria-label]=\"ariaLabel\"\r\n    role=\"tablist\">\r\n  <li *ngFor=\"let tabz of tabs; let i = index\" [ngClass]=\"['nav-item', tabz.customClass || '']\"\r\n      [class.active]=\"tabz.active\" [class.disabled]=\"tabz.disabled\" (keydown)=\"keyNavActions($event, i)\">\r\n    <a href=\"javascript:void(0);\" class=\"nav-link\" role=\"tab\"\r\n       [attr.aria-controls]=\"tabz.id ? tabz.id : ''\"\r\n       [attr.aria-selected]=\"!!tabz.active\"\r\n       [attr.id]=\"tabz.id ? tabz.id + '-link' : ''\"\r\n       [class.active]=\"tabz.active\" [class.disabled]=\"tabz.disabled\"\r\n       (click)=\"tabz.active = true\">\r\n      <span [ngTransclude]=\"tabz.headingRef\">{{ tabz.heading }}</span>\r\n      <span *ngIf=\"tabz.removable\" (click)=\"$event.preventDefault(); removeTab(tabz);\" class=\"bs-remove-tab\"> &#10060;</span>\r\n    </a>\r\n  </li>\r\n</ul>\r\n<div class=\"tab-content\">\r\n  <ng-content></ng-content>\r\n</div>\r\n", styles: [":host .nav-tabs .nav-item.disabled a.disabled{cursor:default}\n"], directives: [{ type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i3.NgTranscludeDirective, selector: "[ngTransclude]", inputs: ["ngTransclude"] }, { type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: TabsetComponent, decorators: [{
            type: Component,
            args: [{ selector: 'tabset', template: "<ul class=\"nav\" [ngClass]=\"classMap\"\r\n    (click)=\"$event.preventDefault()\"\r\n    [attr.aria-label]=\"ariaLabel\"\r\n    role=\"tablist\">\r\n  <li *ngFor=\"let tabz of tabs; let i = index\" [ngClass]=\"['nav-item', tabz.customClass || '']\"\r\n      [class.active]=\"tabz.active\" [class.disabled]=\"tabz.disabled\" (keydown)=\"keyNavActions($event, i)\">\r\n    <a href=\"javascript:void(0);\" class=\"nav-link\" role=\"tab\"\r\n       [attr.aria-controls]=\"tabz.id ? tabz.id : ''\"\r\n       [attr.aria-selected]=\"!!tabz.active\"\r\n       [attr.id]=\"tabz.id ? tabz.id + '-link' : ''\"\r\n       [class.active]=\"tabz.active\" [class.disabled]=\"tabz.disabled\"\r\n       (click)=\"tabz.active = true\">\r\n      <span [ngTransclude]=\"tabz.headingRef\">{{ tabz.heading }}</span>\r\n      <span *ngIf=\"tabz.removable\" (click)=\"$event.preventDefault(); removeTab(tabz);\" class=\"bs-remove-tab\"> &#10060;</span>\r\n    </a>\r\n  </li>\r\n</ul>\r\n<div class=\"tab-content\">\r\n  <ng-content></ng-content>\r\n</div>\r\n", styles: [":host .nav-tabs .nav-item.disabled a.disabled{cursor:default}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.TabsetConfig }, { type: i0.Renderer2 }, { type: i0.ElementRef }]; }, propDecorators: { vertical: [{
                type: Input
            }], justified: [{
                type: Input
            }], type: [{
                type: Input
            }], clazz: [{
                type: HostBinding,
                args: ['class.tab-container']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFic2V0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy90YWJzL3RhYnNldC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi9zcmMvdGFicy90YWJzZXQuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFhLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHaEcsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7OztBQUMvQyxnQ0FBZ0M7QUFDaEMsK0VBQStFO0FBTS9FLE1BQU0sT0FBTyxlQUFlO0lBcUQxQixZQUNFLE1BQW9CLEVBQ1osUUFBbUIsRUFDbkIsVUFBc0I7UUFEdEIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBakJJLFVBQUssR0FBRyxJQUFJLENBQUM7UUFFakQsU0FBSSxHQUFtQixFQUFFLENBQUM7UUFDMUIsYUFBUSxHQUErQixFQUFFLENBQUM7UUFFMUMsOEJBQThCO1FBQzlCLGNBQVMsR0FBRyxNQUFNLENBQUM7UUFFVCxnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUNwQixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFDbkIsVUFBSyxHQUFHLE1BQU0sQ0FBQztRQUNmLG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBTzlCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUExREQsNkNBQTZDO0lBQzdDLElBQ0ksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDO0lBQ0QsSUFBSSxRQUFRLENBQUMsS0FBYztRQUN6QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN2QixJQUFJ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QixTQUFTOytCQUNFLFFBQVE7b0pBT2QsUUFBUTtzQkFEWCxLQUFLO2dCQVdGLFNBQVM7c0JBRFosS0FBSztnQkFXRixJQUFJO3NCQURQLEtBQUs7Z0JBaUI4QixLQUFLO3NCQUF4QyxXQUFXO3VCQUFDLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSG9zdEJpbmRpbmcsIElucHV0LCBPbkRlc3Ryb3ksIFJlbmRlcmVyMiwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgVGFiRGlyZWN0aXZlIH0gZnJvbSAnLi90YWIuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgVGFic2V0Q29uZmlnIH0gZnJvbSAnLi90YWJzZXQuY29uZmlnJztcclxuLy8gdG9kbzogYWRkIGFjdGl2ZSBldmVudCB0byB0YWJcclxuLy8gdG9kbzogZml4PyBtaXhpbmcgc3RhdGljIGFuZCBkeW5hbWljIHRhYnMgcG9zaXRpb24gdGFicyBpbiBvcmRlciBvZiBjcmVhdGlvblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ3RhYnNldCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3RhYnNldC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vdGFicy5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIFRhYnNldENvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XHJcbiAgLyoqIGlmIHRydWUgdGFicyB3aWxsIGJlIHBsYWNlZCB2ZXJ0aWNhbGx5ICovXHJcbiAgQElucHV0KClcclxuICBnZXQgdmVydGljYWwoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fdmVydGljYWw7XHJcbiAgfVxyXG4gIHNldCB2ZXJ0aWNhbCh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5fdmVydGljYWwgPSB2YWx1ZTtcclxuICAgIHRoaXMuc2V0Q2xhc3NNYXAoKTtcclxuICB9XHJcblxyXG4gIC8qKiBpZiB0cnVlIHRhYnMgZmlsbCB0aGUgY29udGFpbmVyIGFuZCBoYXZlIGEgY29uc2lzdGVudCB3aWR0aCAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGp1c3RpZmllZCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl9qdXN0aWZpZWQ7XHJcbiAgfVxyXG4gIHNldCBqdXN0aWZpZWQodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX2p1c3RpZmllZCA9IHZhbHVlO1xyXG4gICAgdGhpcy5zZXRDbGFzc01hcCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqIG5hdmlnYXRpb24gY29udGV4dCBjbGFzczogJ3RhYnMnIG9yICdwaWxscycgKi9cclxuICBASW5wdXQoKVxyXG4gIGdldCB0eXBlKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5fdHlwZTtcclxuICB9XHJcbiAgc2V0IHR5cGUodmFsdWU6IHN0cmluZykge1xyXG4gICAgdGhpcy5fdHlwZSA9IHZhbHVlO1xyXG4gICAgdGhpcy5zZXRDbGFzc01hcCgpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGlzS2V5c0FsbG93ZWQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5faXNLZXlzQWxsb3dlZDtcclxuICB9XHJcblxyXG4gIHNldCBpc0tleXNBbGxvd2VkKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl9pc0tleXNBbGxvd2VkID0gdmFsdWU7XHJcbiAgfVxyXG5cclxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnRhYi1jb250YWluZXInKSBjbGF6eiA9IHRydWU7XHJcblxyXG4gIHRhYnM6IFRhYkRpcmVjdGl2ZVtdID0gW107XHJcbiAgY2xhc3NNYXA6IHsgW2tleTogc3RyaW5nXTogYm9vbGVhbiB9ID0ge307XHJcblxyXG4gIC8qKiBhcmlhIGxhYmVsIGZvciB0YWIgbGlzdCAqL1xyXG4gIGFyaWFMYWJlbCA9ICdUYWJzJztcclxuXHJcbiAgcHJvdGVjdGVkIGlzRGVzdHJveWVkID0gZmFsc2U7XHJcbiAgcHJvdGVjdGVkIF92ZXJ0aWNhbCA9IGZhbHNlO1xyXG4gIHByb3RlY3RlZCBfanVzdGlmaWVkID0gZmFsc2U7XHJcbiAgcHJvdGVjdGVkIF90eXBlID0gJ3RhYnMnO1xyXG4gIHByb3RlY3RlZCBfaXNLZXlzQWxsb3dlZCA9IHRydWU7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgY29uZmlnOiBUYWJzZXRDb25maWcsXHJcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXHJcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWZcclxuICApIHtcclxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgY29uZmlnKTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgdGhpcy5pc0Rlc3Ryb3llZCA9IHRydWU7XHJcbiAgfVxyXG5cclxuICBhZGRUYWIodGFiOiBUYWJEaXJlY3RpdmUpOiB2b2lkIHtcclxuICAgIHRoaXMudGFicy5wdXNoKHRhYik7XHJcbiAgICB0YWIuYWN0aXZlID0gdGhpcy50YWJzLmxlbmd0aCA9PT0gMSAmJiAhdGFiLmFjdGl2ZTtcclxuICB9XHJcblxyXG4gIHJlbW92ZVRhYihcclxuICAgIHRhYjogVGFiRGlyZWN0aXZlLFxyXG4gICAgb3B0aW9ucyA9IHsgcmVzZWxlY3Q6IHRydWUsIGVtaXQ6IHRydWUgfVxyXG4gICk6IHZvaWQge1xyXG4gICAgY29uc3QgaW5kZXggPSB0aGlzLnRhYnMuaW5kZXhPZih0YWIpO1xyXG4gICAgaWYgKGluZGV4ID09PSAtMSB8fCB0aGlzLmlzRGVzdHJveWVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIC8vIFNlbGVjdCBhIG5ldyB0YWIgaWYgdGhlIHRhYiB0byBiZSByZW1vdmVkIGlzIHNlbGVjdGVkIGFuZCBub3QgZGVzdHJveWVkXHJcbiAgICBpZiAob3B0aW9ucy5yZXNlbGVjdCAmJiB0YWIuYWN0aXZlICYmIHRoaXMuaGFzQXZhaWxhYmxlVGFicyhpbmRleCkpIHtcclxuICAgICAgY29uc3QgbmV3QWN0aXZlSW5kZXggPSB0aGlzLmdldENsb3Nlc3RUYWJJbmRleChpbmRleCk7XHJcbiAgICAgIHRoaXMudGFic1tuZXdBY3RpdmVJbmRleF0uYWN0aXZlID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGlmIChvcHRpb25zLmVtaXQpIHtcclxuICAgICAgdGFiLnJlbW92ZWQuZW1pdCh0YWIpO1xyXG4gICAgfVxyXG4gICAgdGhpcy50YWJzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICBpZiAodGFiLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5wYXJlbnROb2RlKSB7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2hpbGQoXHJcbiAgICAgICAgdGFiLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5wYXJlbnROb2RlLFxyXG4gICAgICAgIHRhYi5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnRcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gICAga2V5TmF2QWN0aW9ucyhldmVudDogS2V5Ym9hcmRFdmVudCwgaW5kZXg6IG51bWJlcikge1xyXG4gICAgaWYgKCF0aGlzLmlzS2V5c0FsbG93ZWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgY29uc3QgbGlzdDogSFRNTEVsZW1lbnRbXSA9IEFycmF5LmZyb20odGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm5hdi1saW5rJykpO1xyXG4gICAgLy8gY29uc3QgYWN0aXZlRWxMaXN0ID0gbGlzdC5maWx0ZXIoKGVsOiBIVE1MRWxlbWVudCkgPT4gIWVsLmNsYXNzTGlzdC5jb250YWlucygnZGlzYWJsZWQnKSk7XHJcbiAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMTMgfHwgZXZlbnQua2V5ID09PSAnRW50ZXInIHx8IGV2ZW50LmtleUNvZGUgPT09IDMyIHx8IGV2ZW50LmtleSA9PT0gJ1NwYWNlJykge1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBjb25zdCBjdXJyZW50VGFiID0gbGlzdFsoaW5kZXgpICUgbGlzdC5sZW5ndGhdO1xyXG4gICAgICBjdXJyZW50VGFiLmNsaWNrKCk7XHJcblxyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDM5IHx8IGV2ZW50LmtleSA9PT0gJ1JpZ2h0QXJyb3cnKSB7XHJcbiAgICAgIGxldCBuZXh0VGFiOiBIVE1MRWxlbWVudDtcclxuICAgICAgbGV0IHNoaWZ0ID0gMTtcclxuXHJcbiAgICAgIGRvIHtcclxuICAgICAgICBuZXh0VGFiID0gbGlzdFsoaW5kZXggKyBzaGlmdCkgJSBsaXN0Lmxlbmd0aF07XHJcblxyXG4gICAgICAgIHNoaWZ0Kys7XHJcbiAgICAgIH0gd2hpbGUgKG5leHRUYWIuY2xhc3NMaXN0LmNvbnRhaW5zKCdkaXNhYmxlZCcpKTtcclxuXHJcbiAgICAgIG5leHRUYWIuZm9jdXMoKTtcclxuXHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzcgfHwgZXZlbnQua2V5ID09PSAnTGVmdEFycm93Jykge1xyXG4gICAgICBsZXQgcHJldmlvdXNUYWI6IEhUTUxFbGVtZW50O1xyXG4gICAgICBsZXQgc2hpZnQgPSAxO1xyXG4gICAgICBsZXQgaSA9IGluZGV4O1xyXG5cclxuICAgICAgZG8ge1xyXG4gICAgICAgIGlmICgoaSAtIHNoaWZ0KSA8IDApIHtcclxuICAgICAgICAgIGkgPSBsaXN0Lmxlbmd0aCAtIDE7XHJcbiAgICAgICAgICBwcmV2aW91c1RhYiA9IGxpc3RbaV07XHJcbiAgICAgICAgICBzaGlmdCA9IDA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHByZXZpb3VzVGFiID0gbGlzdFtpIC0gc2hpZnRdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2hpZnQrKztcclxuICAgICAgfSB3aGlsZSAocHJldmlvdXNUYWIuY2xhc3NMaXN0LmNvbnRhaW5zKCdkaXNhYmxlZCcpKTtcclxuXHJcbiAgICAgIHByZXZpb3VzVGFiLmZvY3VzKCk7XHJcblxyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDM2IHx8IGV2ZW50LmtleSA9PT0gJ0hvbWUnKSB7XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICBsZXQgZmlyc3RUYWI6IEhUTUxFbGVtZW50O1xyXG4gICAgICBsZXQgc2hpZnQgPSAwO1xyXG5cclxuICAgICAgZG8ge1xyXG4gICAgICAgIGZpcnN0VGFiID0gbGlzdFtzaGlmdCAlIGxpc3QubGVuZ3RoXTtcclxuXHJcbiAgICAgICAgc2hpZnQrKztcclxuICAgICAgfSB3aGlsZSAoZmlyc3RUYWIuY2xhc3NMaXN0LmNvbnRhaW5zKCdkaXNhYmxlZCcpKTtcclxuXHJcbiAgICAgIGZpcnN0VGFiLmZvY3VzKCk7XHJcblxyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDM1IHx8IGV2ZW50LmtleSA9PT0gJ0VuZCcpIHtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgIGxldCBsYXN0VGFiOiBIVE1MRWxlbWVudDtcclxuICAgICAgbGV0IHNoaWZ0ID0gMTtcclxuICAgICAgbGV0IGkgPSBpbmRleDtcclxuXHJcbiAgICAgIGRvIHtcclxuICAgICAgICBpZiAoKGkgLSBzaGlmdCkgPCAwKSB7XHJcbiAgICAgICAgICBpID0gbGlzdC5sZW5ndGggLSAxO1xyXG4gICAgICAgICAgbGFzdFRhYiA9IGxpc3RbaV07XHJcbiAgICAgICAgICBzaGlmdCA9IDA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGxhc3RUYWIgPSBsaXN0W2kgLSBzaGlmdF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzaGlmdCsrO1xyXG4gICAgICB9IHdoaWxlIChsYXN0VGFiLmNsYXNzTGlzdC5jb250YWlucygnZGlzYWJsZWQnKSk7XHJcblxyXG4gICAgICBsYXN0VGFiLmZvY3VzKCk7XHJcblxyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDQ2IHx8IGV2ZW50LmtleSA9PT0gJ0RlbGV0ZScpIHtcclxuICAgICAgaWYgKHRoaXMudGFic1tpbmRleF0ucmVtb3ZhYmxlKSB7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVUYWIodGhpcy50YWJzW2luZGV4XSk7XHJcblxyXG4gICAgICAgIGlmIChsaXN0W2luZGV4ICsgMV0pIHtcclxuICAgICAgICAgIGxpc3RbKGluZGV4ICsgMSkgJSBsaXN0Lmxlbmd0aF0uZm9jdXMoKTtcclxuXHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobGlzdFtsaXN0Lmxlbmd0aCAtIDFdKSB7XHJcbiAgICAgICAgICBsaXN0WzBdLmZvY3VzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgZ2V0Q2xvc2VzdFRhYkluZGV4KGluZGV4OiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgY29uc3QgdGFic0xlbmd0aCA9IHRoaXMudGFicy5sZW5ndGg7XHJcbiAgICBpZiAoIXRhYnNMZW5ndGgpIHtcclxuICAgICAgcmV0dXJuIC0xO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAobGV0IHN0ZXAgPSAxOyBzdGVwIDw9IHRhYnNMZW5ndGg7IHN0ZXAgKz0gMSkge1xyXG4gICAgICBjb25zdCBwcmV2SW5kZXggPSBpbmRleCAtIHN0ZXA7XHJcbiAgICAgIGNvbnN0IG5leHRJbmRleCA9IGluZGV4ICsgc3RlcDtcclxuICAgICAgaWYgKHRoaXMudGFic1twcmV2SW5kZXhdICYmICF0aGlzLnRhYnNbcHJldkluZGV4XS5kaXNhYmxlZCkge1xyXG4gICAgICAgIHJldHVybiBwcmV2SW5kZXg7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRoaXMudGFic1tuZXh0SW5kZXhdICYmICF0aGlzLnRhYnNbbmV4dEluZGV4XS5kaXNhYmxlZCkge1xyXG4gICAgICAgIHJldHVybiBuZXh0SW5kZXg7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gLTE7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgaGFzQXZhaWxhYmxlVGFicyhpbmRleDogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICBjb25zdCB0YWJzTGVuZ3RoID0gdGhpcy50YWJzLmxlbmd0aDtcclxuICAgIGlmICghdGFic0xlbmd0aCkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0YWJzTGVuZ3RoOyBpICs9IDEpIHtcclxuICAgICAgaWYgKCF0aGlzLnRhYnNbaV0uZGlzYWJsZWQgJiYgaSAhPT0gaW5kZXgpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBzZXRDbGFzc01hcCgpOiB2b2lkIHtcclxuICAgIHRoaXMuY2xhc3NNYXAgPSB7XHJcbiAgICAgICduYXYtc3RhY2tlZCc6IHRoaXMudmVydGljYWwsXHJcbiAgICAgICdmbGV4LWNvbHVtbic6IHRoaXMudmVydGljYWwsXHJcbiAgICAgICduYXYtanVzdGlmaWVkJzogdGhpcy5qdXN0aWZpZWQsXHJcbiAgICAgIFtgbmF2LSR7dGhpcy50eXBlfWBdOiB0cnVlXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iLCI8dWwgY2xhc3M9XCJuYXZcIiBbbmdDbGFzc109XCJjbGFzc01hcFwiXHJcbiAgICAoY2xpY2spPVwiJGV2ZW50LnByZXZlbnREZWZhdWx0KClcIlxyXG4gICAgW2F0dHIuYXJpYS1sYWJlbF09XCJhcmlhTGFiZWxcIlxyXG4gICAgcm9sZT1cInRhYmxpc3RcIj5cclxuICA8bGkgKm5nRm9yPVwibGV0IHRhYnogb2YgdGFiczsgbGV0IGkgPSBpbmRleFwiIFtuZ0NsYXNzXT1cIlsnbmF2LWl0ZW0nLCB0YWJ6LmN1c3RvbUNsYXNzIHx8ICcnXVwiXHJcbiAgICAgIFtjbGFzcy5hY3RpdmVdPVwidGFiei5hY3RpdmVcIiBbY2xhc3MuZGlzYWJsZWRdPVwidGFiei5kaXNhYmxlZFwiIChrZXlkb3duKT1cImtleU5hdkFjdGlvbnMoJGV2ZW50LCBpKVwiPlxyXG4gICAgPGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKTtcIiBjbGFzcz1cIm5hdi1saW5rXCIgcm9sZT1cInRhYlwiXHJcbiAgICAgICBbYXR0ci5hcmlhLWNvbnRyb2xzXT1cInRhYnouaWQgPyB0YWJ6LmlkIDogJydcIlxyXG4gICAgICAgW2F0dHIuYXJpYS1zZWxlY3RlZF09XCIhIXRhYnouYWN0aXZlXCJcclxuICAgICAgIFthdHRyLmlkXT1cInRhYnouaWQgPyB0YWJ6LmlkICsgJy1saW5rJyA6ICcnXCJcclxuICAgICAgIFtjbGFzcy5hY3RpdmVdPVwidGFiei5hY3RpdmVcIiBbY2xhc3MuZGlzYWJsZWRdPVwidGFiei5kaXNhYmxlZFwiXHJcbiAgICAgICAoY2xpY2spPVwidGFiei5hY3RpdmUgPSB0cnVlXCI+XHJcbiAgICAgIDxzcGFuIFtuZ1RyYW5zY2x1ZGVdPVwidGFiei5oZWFkaW5nUmVmXCI+e3sgdGFiei5oZWFkaW5nIH19PC9zcGFuPlxyXG4gICAgICA8c3BhbiAqbmdJZj1cInRhYnoucmVtb3ZhYmxlXCIgKGNsaWNrKT1cIiRldmVudC5wcmV2ZW50RGVmYXVsdCgpOyByZW1vdmVUYWIodGFieik7XCIgY2xhc3M9XCJicy1yZW1vdmUtdGFiXCI+ICYjMTAwNjA7PC9zcGFuPlxyXG4gICAgPC9hPlxyXG4gIDwvbGk+XHJcbjwvdWw+XHJcbjxkaXYgY2xhc3M9XCJ0YWItY29udGVudFwiPlxyXG4gIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cclxuPC9kaXY+XHJcbiJdfQ==