import { Injectable, ElementRef, RendererFactory2, Inject, PLATFORM_ID, NgZone } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { positionElements } from './ng-positioning';
import { fromEvent, merge, of, animationFrameScheduler, Subject } from 'rxjs';
import * as i0 from "@angular/core";
export class PositioningService {
    constructor(ngZone, rendererFactory, platformId) {
        this.update$$ = new Subject();
        this.positionElements = new Map();
        this.isDisabled = false;
        if (isPlatformBrowser(platformId)) {
            ngZone.runOutsideAngular(() => {
                this.triggerEvent$ = merge(fromEvent(window, 'scroll', { passive: true }), fromEvent(window, 'resize', { passive: true }), of(0, animationFrameScheduler), this.update$$);
                this.triggerEvent$.subscribe(() => {
                    if (this.isDisabled) {
                        return;
                    }
                    this.positionElements
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        .forEach((positionElement) => {
                        positionElements(_getHtmlElement(positionElement.target), _getHtmlElement(positionElement.element), positionElement.attachment, positionElement.appendToBody, this.options, rendererFactory.createRenderer(null, null));
                    });
                });
            });
        }
    }
    position(options) {
        this.addPositionElement(options);
    }
    get event$() {
        return this.triggerEvent$;
    }
    disable() {
        this.isDisabled = true;
    }
    enable() {
        this.isDisabled = false;
    }
    addPositionElement(options) {
        this.positionElements.set(_getHtmlElement(options.element), options);
    }
    calcPosition() {
        this.update$$.next(null);
    }
    deletePositionElement(elRef) {
        this.positionElements.delete(_getHtmlElement(elRef));
    }
    setOptions(options) {
        this.options = options;
    }
}
PositioningService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: PositioningService, deps: [{ token: i0.NgZone }, { token: i0.RendererFactory2 }, { token: PLATFORM_ID }], target: i0.ɵɵFactoryTarget.Injectable });
PositioningService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: PositioningService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: PositioningService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i0.NgZone }, { type: i0.RendererFactory2 }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }]; } });
function _getHtmlElement(element) {
    // it means that we got a selector
    if (typeof element === 'string') {
        return document.querySelector(element);
    }
    if (element instanceof ElementRef) {
        return element.nativeElement;
    }
    return element ?? null;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zaXRpb25pbmcuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9wb3NpdGlvbmluZy9wb3NpdGlvbmluZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3RHLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRXBELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRXBELE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSx1QkFBdUIsRUFBRSxPQUFPLEVBQWMsTUFBTSxNQUFNLENBQUM7O0FBdUMxRixNQUFNLE9BQU8sa0JBQWtCO0lBTzdCLFlBQ0UsTUFBYyxFQUNkLGVBQWlDLEVBQ1osVUFBa0I7UUFSakMsYUFBUSxHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7UUFDL0IscUJBQWdCLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUU3QixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBUXpCLElBQUksaUJBQWlCLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDakMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRTtnQkFDNUIsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQ3hCLFNBQVMsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQzlDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQ3BDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsdUJBQXVCLENBQUMsRUFDeEMsSUFBSSxDQUFDLFFBQVEsQ0FDZCxDQUFDO2dCQUVGLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtvQkFDaEMsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO3dCQUNuQixPQUFPO3FCQUNSO29CQUVELElBQUksQ0FBQyxnQkFBZ0I7d0JBQ3JCLDhEQUE4RDt5QkFDM0QsT0FBTyxDQUFDLENBQUMsZUFBb0IsRUFBRSxFQUFFO3dCQUNoQyxnQkFBZ0IsQ0FDZCxlQUFlLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxFQUN2QyxlQUFlLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxFQUN4QyxlQUFlLENBQUMsVUFBVSxFQUMxQixlQUFlLENBQUMsWUFBWSxFQUM1QixJQUFJLENBQUMsT0FBTyxFQUNaLGVBQWUsQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUMzQyxDQUFDO29CQUNKLENBQUMsQ0FBQyxDQUFDO2dCQUNQLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7SUFFRCxRQUFRLENBQUMsT0FBMkI7UUFDbEMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRCxJQUFJLE1BQU07UUFDUixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7SUFDNUIsQ0FBQztJQUVELE9BQU87UUFDTCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztJQUN6QixDQUFDO0lBRUQsTUFBTTtRQUNKLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO0lBQzFCLENBQUM7SUFFRCxrQkFBa0IsQ0FBQyxPQUEyQjtRQUM1QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUVELFlBQVk7UUFDVixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRUQscUJBQXFCLENBQUMsS0FBaUI7UUFDckMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRUQsVUFBVSxDQUFDLE9BQWdCO1FBQ3pCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQ3pCLENBQUM7OytHQTFFVSxrQkFBa0Isd0VBVW5CLFdBQVc7bUhBVlYsa0JBQWtCLGNBRE4sTUFBTTsyRkFDbEIsa0JBQWtCO2tCQUQ5QixVQUFVO21CQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQzs7MEJBVzNCLE1BQU07MkJBQUMsV0FBVzs7QUFtRXZCLFNBQVMsZUFBZSxDQUFDLE9BQTJDO0lBQ2xFLGtDQUFrQztJQUNsQyxJQUFJLE9BQU8sT0FBTyxLQUFLLFFBQVEsRUFBRTtRQUMvQixPQUFPLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDeEM7SUFFRCxJQUFJLE9BQU8sWUFBWSxVQUFVLEVBQUU7UUFDakMsT0FBTyxPQUFPLENBQUMsYUFBYSxDQUFDO0tBQzlCO0lBRUQsT0FBTyxPQUFPLElBQUksSUFBSSxDQUFDO0FBQ3pCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBFbGVtZW50UmVmLCBSZW5kZXJlckZhY3RvcnkyLCBJbmplY3QsIFBMQVRGT1JNX0lELCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuaW1wb3J0IHsgcG9zaXRpb25FbGVtZW50cyB9IGZyb20gJy4vbmctcG9zaXRpb25pbmcnO1xyXG5cclxuaW1wb3J0IHsgZnJvbUV2ZW50LCBtZXJnZSwgb2YsIGFuaW1hdGlvbkZyYW1lU2NoZWR1bGVyLCBTdWJqZWN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IE9wdGlvbnMgfSBmcm9tICcuL21vZGVscyc7XHJcblxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBQb3NpdGlvbmluZ09wdGlvbnMge1xyXG4gIC8qKiBUaGUgRE9NIGVsZW1lbnQsIEVsZW1lbnRSZWYsIG9yIGEgc2VsZWN0b3Igc3RyaW5nIG9mIGFuIGVsZW1lbnQgd2hpY2ggd2lsbCBiZSBtb3ZlZCAqL1xyXG4gIGVsZW1lbnQ/OiBIVE1MRWxlbWVudCB8IEVsZW1lbnRSZWYgfCBzdHJpbmc7XHJcblxyXG4gIC8qKiBUaGUgRE9NIGVsZW1lbnQsIEVsZW1lbnRSZWYsIG9yIGEgc2VsZWN0b3Igc3RyaW5nIG9mIGFuIGVsZW1lbnQgd2hpY2ggdGhlIGVsZW1lbnQgd2lsbCBiZSBhdHRhY2hlZCB0byAgKi9cclxuICB0YXJnZXQ/OiBIVE1MRWxlbWVudCB8IEVsZW1lbnRSZWYgfCBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgc3RyaW5nIG9mIHRoZSBmb3JtICd2ZXJ0LWF0dGFjaG1lbnQgaG9yaXotYXR0YWNobWVudCcgb3IgJ3BsYWNlbWVudCdcclxuICAgKiAtIHBsYWNlbWVudCBjYW4gYmUgXCJ0b3BcIiwgXCJib3R0b21cIiwgXCJsZWZ0XCIsIFwicmlnaHRcIlxyXG4gICAqIG5vdCB5ZXQgc3VwcG9ydGVkOlxyXG4gICAqIC0gdmVydC1hdHRhY2htZW50IGNhbiBiZSBhbnkgb2YgJ3RvcCcsICdtaWRkbGUnLCAnYm90dG9tJ1xyXG4gICAqIC0gaG9yaXotYXR0YWNobWVudCBjYW4gYmUgYW55IG9mICdsZWZ0JywgJ2NlbnRlcicsICdyaWdodCdcclxuICAgKi9cclxuICBhdHRhY2htZW50Pzogc3RyaW5nO1xyXG5cclxuICAvKiogQSBzdHJpbmcgc2ltaWxhciB0byBgYXR0YWNobWVudGAuIFRoZSBvbmUgZGlmZmVyZW5jZSBpcyB0aGF0LCBpZiBpdCdzIG5vdCBwcm92aWRlZCxcclxuICAgKiBgdGFyZ2V0QXR0YWNobWVudGAgd2lsbCBhc3N1bWUgdGhlIG1pcnJvciBpbWFnZSBvZiBgYXR0YWNobWVudGAuXHJcbiAgICovXHJcbiAgdGFyZ2V0QXR0YWNobWVudD86IHN0cmluZztcclxuXHJcbiAgLyoqIEEgc3RyaW5nIG9mIHRoZSBmb3JtICd2ZXJ0LW9mZnNldCBob3Jpei1vZmZzZXQnXHJcbiAgICogLSB2ZXJ0LW9mZnNldCBhbmQgaG9yaXotb2Zmc2V0IGNhbiBiZSBvZiB0aGUgZm9ybSBcIjIwcHhcIiBvciBcIjU1JVwiXHJcbiAgICovXHJcbiAgb2Zmc2V0Pzogc3RyaW5nO1xyXG5cclxuICAvKiogQSBzdHJpbmcgc2ltaWxhciB0byBgb2Zmc2V0YCwgYnV0IHJlZmVycmluZyB0byB0aGUgb2Zmc2V0IG9mIHRoZSB0YXJnZXQgKi9cclxuICB0YXJnZXRPZmZzZXQ/OiBzdHJpbmc7XHJcblxyXG4gIC8qKiBJZiB0cnVlIGNvbXBvbmVudCB3aWxsIGJlIGF0dGFjaGVkIHRvIGJvZHkgKi9cclxuICBhcHBlbmRUb0JvZHk/OiBib29sZWFuO1xyXG59XHJcblxyXG5cclxuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXHJcbmV4cG9ydCBjbGFzcyBQb3NpdGlvbmluZ1NlcnZpY2Uge1xyXG4gIHByaXZhdGUgb3B0aW9ucz86IE9wdGlvbnM7XHJcbiAgcHJpdmF0ZSB1cGRhdGUkJCA9IG5ldyBTdWJqZWN0PG51bGw+KCk7XHJcbiAgcHJpdmF0ZSBwb3NpdGlvbkVsZW1lbnRzID0gbmV3IE1hcCgpO1xyXG4gIHByaXZhdGUgdHJpZ2dlckV2ZW50JD86IE9ic2VydmFibGU8bnVtYmVyfEV2ZW50fG51bGw+O1xyXG4gIHByaXZhdGUgaXNEaXNhYmxlZCA9IGZhbHNlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIG5nWm9uZTogTmdab25lLFxyXG4gICAgcmVuZGVyZXJGYWN0b3J5OiBSZW5kZXJlckZhY3RvcnkyLFxyXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcGxhdGZvcm1JZDogbnVtYmVyXHJcbiAgKSB7XHJcblxyXG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHBsYXRmb3JtSWQpKSB7XHJcbiAgICAgIG5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XHJcbiAgICAgICAgdGhpcy50cmlnZ2VyRXZlbnQkID0gbWVyZ2UoXHJcbiAgICAgICAgICBmcm9tRXZlbnQod2luZG93LCAnc2Nyb2xsJywgeyBwYXNzaXZlOiB0cnVlIH0pLFxyXG4gICAgICAgICAgZnJvbUV2ZW50KHdpbmRvdywgJ3Jlc2l6ZScsIHsgcGFzc2l2ZTogdHJ1ZSB9KSxcclxuICAgICAgICAgICAgICAgICAgICBvZigwLCBhbmltYXRpb25GcmFtZVNjaGVkdWxlciksXHJcbiAgICAgICAgICB0aGlzLnVwZGF0ZSQkXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgdGhpcy50cmlnZ2VyRXZlbnQkLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgICBpZiAodGhpcy5pc0Rpc2FibGVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB0aGlzLnBvc2l0aW9uRWxlbWVudHNcclxuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XHJcbiAgICAgICAgICAgIC5mb3JFYWNoKChwb3NpdGlvbkVsZW1lbnQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgIHBvc2l0aW9uRWxlbWVudHMoXHJcbiAgICAgICAgICAgICAgICBfZ2V0SHRtbEVsZW1lbnQocG9zaXRpb25FbGVtZW50LnRhcmdldCksXHJcbiAgICAgICAgICAgICAgICBfZ2V0SHRtbEVsZW1lbnQocG9zaXRpb25FbGVtZW50LmVsZW1lbnQpLFxyXG4gICAgICAgICAgICAgICAgcG9zaXRpb25FbGVtZW50LmF0dGFjaG1lbnQsXHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbkVsZW1lbnQuYXBwZW5kVG9Cb2R5LFxyXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLFxyXG4gICAgICAgICAgICAgICAgcmVuZGVyZXJGYWN0b3J5LmNyZWF0ZVJlbmRlcmVyKG51bGwsIG51bGwpXHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcG9zaXRpb24ob3B0aW9uczogUG9zaXRpb25pbmdPcHRpb25zKTogdm9pZCB7XHJcbiAgICB0aGlzLmFkZFBvc2l0aW9uRWxlbWVudChvcHRpb25zKTtcclxuICB9XHJcblxyXG4gIGdldCBldmVudCQoKTogT2JzZXJ2YWJsZTxudW1iZXJ8RXZlbnR8bnVsbD58dW5kZWZpbmVkIHtcclxuICAgIHJldHVybiB0aGlzLnRyaWdnZXJFdmVudCQ7XHJcbiAgfVxyXG5cclxuICBkaXNhYmxlKCk6IHZvaWQge1xyXG4gICAgdGhpcy5pc0Rpc2FibGVkID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIGVuYWJsZSgpOiB2b2lkIHtcclxuICAgIHRoaXMuaXNEaXNhYmxlZCA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgYWRkUG9zaXRpb25FbGVtZW50KG9wdGlvbnM6IFBvc2l0aW9uaW5nT3B0aW9ucyk6IHZvaWQge1xyXG4gICAgdGhpcy5wb3NpdGlvbkVsZW1lbnRzLnNldChfZ2V0SHRtbEVsZW1lbnQob3B0aW9ucy5lbGVtZW50KSwgb3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICBjYWxjUG9zaXRpb24oKTogdm9pZCB7XHJcbiAgICB0aGlzLnVwZGF0ZSQkLm5leHQobnVsbCk7XHJcbiAgfVxyXG5cclxuICBkZWxldGVQb3NpdGlvbkVsZW1lbnQoZWxSZWY6IEVsZW1lbnRSZWYpOiB2b2lkIHtcclxuICAgIHRoaXMucG9zaXRpb25FbGVtZW50cy5kZWxldGUoX2dldEh0bWxFbGVtZW50KGVsUmVmKSk7XHJcbiAgfVxyXG5cclxuICBzZXRPcHRpb25zKG9wdGlvbnM6IE9wdGlvbnMpIHtcclxuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBfZ2V0SHRtbEVsZW1lbnQoZWxlbWVudD86IEhUTUxFbGVtZW50IHwgRWxlbWVudFJlZiB8IHN0cmluZyk6IEhUTUxFbGVtZW50IHwgbnVsbCB7XHJcbiAgLy8gaXQgbWVhbnMgdGhhdCB3ZSBnb3QgYSBzZWxlY3RvclxyXG4gIGlmICh0eXBlb2YgZWxlbWVudCA9PT0gJ3N0cmluZycpIHtcclxuICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsZW1lbnQpO1xyXG4gIH1cclxuXHJcbiAgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBFbGVtZW50UmVmKSB7XHJcbiAgICByZXR1cm4gZWxlbWVudC5uYXRpdmVFbGVtZW50O1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGVsZW1lbnQgPz8gbnVsbDtcclxufVxyXG4iXX0=