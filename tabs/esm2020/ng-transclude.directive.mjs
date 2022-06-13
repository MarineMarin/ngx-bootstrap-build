import { Directive, Input, ViewContainerRef } from '@angular/core';
import * as i0 from "@angular/core";
export class NgTranscludeDirective {
    constructor(viewRef) {
        this.viewRef = viewRef;
    }
    set ngTransclude(templateRef) {
        this._ngTransclude = templateRef;
        if (templateRef) {
            this.viewRef.createEmbeddedView(templateRef);
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    get ngTransclude() {
        return this._ngTransclude;
    }
}
NgTranscludeDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: NgTranscludeDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
NgTranscludeDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.1", type: NgTranscludeDirective, selector: "[ngTransclude]", inputs: { ngTransclude: "ngTransclude" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: NgTranscludeDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngTransclude]'
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; }, propDecorators: { ngTransclude: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctdHJhbnNjbHVkZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdGFicy9uZy10cmFuc2NsdWRlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBZSxnQkFBZ0IsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFLaEYsTUFBTSxPQUFPLHFCQUFxQjtJQW9CaEMsWUFBWSxPQUF5QjtRQUNuQyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUN6QixDQUFDO0lBaEJELElBRUksWUFBWSxDQUFDLFdBQXlDO1FBQ3hELElBQUksQ0FBQyxhQUFhLEdBQUcsV0FBVyxDQUFDO1FBQ2pDLElBQUksV0FBVyxFQUFFO1lBQ2YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUM5QztJQUNILENBQUM7SUFFRCw4REFBOEQ7SUFDOUQsSUFBSSxZQUFZO1FBQ2QsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzVCLENBQUM7O2tIQWxCVSxxQkFBcUI7c0dBQXJCLHFCQUFxQjsyRkFBckIscUJBQXFCO2tCQUhqQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxnQkFBZ0I7aUJBQzNCO3VHQVNLLFlBQVk7c0JBRmYsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIFRlbXBsYXRlUmVmLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1tuZ1RyYW5zY2x1ZGVdJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTmdUcmFuc2NsdWRlRGlyZWN0aXZlIHtcclxuICB2aWV3UmVmOiBWaWV3Q29udGFpbmVyUmVmO1xyXG5cclxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxyXG4gIHByb3RlY3RlZCBfbmdUcmFuc2NsdWRlPzogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgQElucHV0KClcclxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxyXG4gIHNldCBuZ1RyYW5zY2x1ZGUodGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT4gfCB1bmRlZmluZWQpIHtcclxuICAgIHRoaXMuX25nVHJhbnNjbHVkZSA9IHRlbXBsYXRlUmVmO1xyXG4gICAgaWYgKHRlbXBsYXRlUmVmKSB7XHJcbiAgICAgIHRoaXMudmlld1JlZi5jcmVhdGVFbWJlZGRlZFZpZXcodGVtcGxhdGVSZWYpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuICBnZXQgbmdUcmFuc2NsdWRlKCk6IFRlbXBsYXRlUmVmPGFueT4gfCB1bmRlZmluZWQge1xyXG4gICAgcmV0dXJuIHRoaXMuX25nVHJhbnNjbHVkZTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKHZpZXdSZWY6IFZpZXdDb250YWluZXJSZWYpIHtcclxuICAgIHRoaXMudmlld1JlZiA9IHZpZXdSZWY7XHJcbiAgfVxyXG59XHJcbiJdfQ==