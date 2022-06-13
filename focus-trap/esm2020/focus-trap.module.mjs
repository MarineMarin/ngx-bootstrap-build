import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FocusTrapManager } from './focus-trap-manager';
import { InteractivityChecker } from './interactivity-checker';
import { FocusTrapDirective } from './focus-trap';
import { Platform } from './platform';
import * as i0 from "@angular/core";
export class FocusTrapModule {
    static forRoot() {
        return {
            ngModule: FocusTrapModule,
            providers: [
                FocusTrapManager,
                Platform,
                InteractivityChecker
            ]
        };
    }
}
FocusTrapModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: FocusTrapModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
FocusTrapModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: FocusTrapModule, declarations: [FocusTrapDirective], imports: [CommonModule], exports: [FocusTrapDirective] });
FocusTrapModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: FocusTrapModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: FocusTrapModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [FocusTrapDirective],
                    exports: [FocusTrapDirective]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9jdXMtdHJhcC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZm9jdXMtdHJhcC9mb2N1cy10cmFwLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQXVCLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDL0QsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ2xELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxZQUFZLENBQUM7O0FBT3RDLE1BQU0sT0FBTyxlQUFlO0lBQzFCLE1BQU0sQ0FBQyxPQUFPO1FBQ1osT0FBTztZQUNMLFFBQVEsRUFBRSxlQUFlO1lBQ3pCLFNBQVMsRUFBRTtnQkFDVCxnQkFBZ0I7Z0JBQ2hCLFFBQVE7Z0JBQ1Isb0JBQW9CO2FBQ3JCO1NBQ0YsQ0FBQztJQUNKLENBQUM7OzRHQVZVLGVBQWU7NkdBQWYsZUFBZSxpQkFIWCxrQkFBa0IsYUFEdkIsWUFBWSxhQUVaLGtCQUFrQjs2R0FFakIsZUFBZSxZQUpqQixDQUFDLFlBQVksQ0FBQzsyRkFJWixlQUFlO2tCQUwzQixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztvQkFDdkIsWUFBWSxFQUFFLENBQUMsa0JBQWtCLENBQUM7b0JBQ2xDLE9BQU8sRUFBRSxDQUFDLGtCQUFrQixDQUFDO2lCQUM5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBGb2N1c1RyYXBNYW5hZ2VyIH0gZnJvbSAnLi9mb2N1cy10cmFwLW1hbmFnZXInO1xyXG5pbXBvcnQgeyBJbnRlcmFjdGl2aXR5Q2hlY2tlciB9IGZyb20gJy4vaW50ZXJhY3Rpdml0eS1jaGVja2VyJztcclxuaW1wb3J0IHsgRm9jdXNUcmFwRGlyZWN0aXZlIH0gZnJvbSAnLi9mb2N1cy10cmFwJztcclxuaW1wb3J0IHsgUGxhdGZvcm0gfSBmcm9tICcuL3BsYXRmb3JtJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXHJcbiAgZGVjbGFyYXRpb25zOiBbRm9jdXNUcmFwRGlyZWN0aXZlXSxcclxuICBleHBvcnRzOiBbRm9jdXNUcmFwRGlyZWN0aXZlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRm9jdXNUcmFwTW9kdWxlIHtcclxuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPEZvY3VzVHJhcE1vZHVsZT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmdNb2R1bGU6IEZvY3VzVHJhcE1vZHVsZSxcclxuICAgICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgRm9jdXNUcmFwTWFuYWdlcixcclxuICAgICAgICBQbGF0Zm9ybSxcclxuICAgICAgICBJbnRlcmFjdGl2aXR5Q2hlY2tlclxyXG4gICAgICBdXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXX0=