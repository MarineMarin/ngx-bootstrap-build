import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { PositioningService } from 'ngx-bootstrap/positioning';
import { BsDropdownContainerComponent } from './bs-dropdown-container.component';
import { BsDropdownMenuDirective } from './bs-dropdown-menu.directive';
import { BsDropdownToggleDirective } from './bs-dropdown-toggle.directive';
import { BsDropdownDirective } from './bs-dropdown.directive';
import { BsDropdownState } from './bs-dropdown.state';
import * as i0 from "@angular/core";
export class BsDropdownModule {
    static forRoot() {
        return {
            ngModule: BsDropdownModule,
            providers: [
                ComponentLoaderFactory,
                PositioningService,
                BsDropdownState
            ]
        };
    }
}
BsDropdownModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: BsDropdownModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
BsDropdownModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: BsDropdownModule, declarations: [BsDropdownMenuDirective,
        BsDropdownToggleDirective,
        BsDropdownContainerComponent,
        BsDropdownDirective], imports: [CommonModule], exports: [BsDropdownMenuDirective,
        BsDropdownToggleDirective,
        BsDropdownDirective] });
BsDropdownModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: BsDropdownModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: BsDropdownModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [
                        BsDropdownMenuDirective,
                        BsDropdownToggleDirective,
                        BsDropdownContainerComponent,
                        BsDropdownDirective
                    ],
                    exports: [
                        BsDropdownMenuDirective,
                        BsDropdownToggleDirective,
                        BsDropdownDirective
                    ],
                    entryComponents: [BsDropdownContainerComponent]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnMtZHJvcGRvd24ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Ryb3Bkb3duL2JzLWRyb3Bkb3duLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUF1QixRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFFeEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDL0QsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDakYsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDdkUsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFFM0UsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDOztBQWlCdEQsTUFBTSxPQUFPLGdCQUFnQjtJQUMzQixNQUFNLENBQUMsT0FBTztRQUNaLE9BQU87WUFDTCxRQUFRLEVBQUUsZ0JBQWdCO1lBQzFCLFNBQVMsRUFBRTtnQkFDVCxzQkFBc0I7Z0JBQ3RCLGtCQUFrQjtnQkFDbEIsZUFBZTthQUNoQjtTQUNGLENBQUM7SUFDSixDQUFDOzs2R0FWVSxnQkFBZ0I7OEdBQWhCLGdCQUFnQixpQkFaekIsdUJBQXVCO1FBQ3ZCLHlCQUF5QjtRQUN6Qiw0QkFBNEI7UUFDNUIsbUJBQW1CLGFBTFgsWUFBWSxhQVFwQix1QkFBdUI7UUFDdkIseUJBQXlCO1FBQ3pCLG1CQUFtQjs4R0FJVixnQkFBZ0IsWUFkbEIsQ0FBQyxZQUFZLENBQUM7MkZBY1osZ0JBQWdCO2tCQWY1QixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztvQkFDdkIsWUFBWSxFQUFFO3dCQUNaLHVCQUF1Qjt3QkFDdkIseUJBQXlCO3dCQUN6Qiw0QkFBNEI7d0JBQzVCLG1CQUFtQjtxQkFDcEI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLHVCQUF1Qjt3QkFDdkIseUJBQXlCO3dCQUN6QixtQkFBbUI7cUJBQ3BCO29CQUNELGVBQWUsRUFBRSxDQUFDLDRCQUE0QixDQUFDO2lCQUNoRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbXBvbmVudExvYWRlckZhY3RvcnkgfSBmcm9tICduZ3gtYm9vdHN0cmFwL2NvbXBvbmVudC1sb2FkZXInO1xyXG5cclxuaW1wb3J0IHsgUG9zaXRpb25pbmdTZXJ2aWNlIH0gZnJvbSAnbmd4LWJvb3RzdHJhcC9wb3NpdGlvbmluZyc7XHJcbmltcG9ydCB7IEJzRHJvcGRvd25Db250YWluZXJDb21wb25lbnQgfSBmcm9tICcuL2JzLWRyb3Bkb3duLWNvbnRhaW5lci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBCc0Ryb3Bkb3duTWVudURpcmVjdGl2ZSB9IGZyb20gJy4vYnMtZHJvcGRvd24tbWVudS5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBCc0Ryb3Bkb3duVG9nZ2xlRGlyZWN0aXZlIH0gZnJvbSAnLi9icy1kcm9wZG93bi10b2dnbGUuZGlyZWN0aXZlJztcclxuXHJcbmltcG9ydCB7IEJzRHJvcGRvd25EaXJlY3RpdmUgfSBmcm9tICcuL2JzLWRyb3Bkb3duLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IEJzRHJvcGRvd25TdGF0ZSB9IGZyb20gJy4vYnMtZHJvcGRvd24uc3RhdGUnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIEJzRHJvcGRvd25NZW51RGlyZWN0aXZlLFxyXG4gICAgQnNEcm9wZG93blRvZ2dsZURpcmVjdGl2ZSxcclxuICAgIEJzRHJvcGRvd25Db250YWluZXJDb21wb25lbnQsXHJcbiAgICBCc0Ryb3Bkb3duRGlyZWN0aXZlXHJcbiAgXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBCc0Ryb3Bkb3duTWVudURpcmVjdGl2ZSxcclxuICAgIEJzRHJvcGRvd25Ub2dnbGVEaXJlY3RpdmUsXHJcbiAgICBCc0Ryb3Bkb3duRGlyZWN0aXZlXHJcbiAgXSxcclxuICBlbnRyeUNvbXBvbmVudHM6IFtCc0Ryb3Bkb3duQ29udGFpbmVyQ29tcG9uZW50XVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQnNEcm9wZG93bk1vZHVsZSB7XHJcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVyczxCc0Ryb3Bkb3duTW9kdWxlPiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuZ01vZHVsZTogQnNEcm9wZG93bk1vZHVsZSxcclxuICAgICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgQ29tcG9uZW50TG9hZGVyRmFjdG9yeSxcclxuICAgICAgICBQb3NpdGlvbmluZ1NlcnZpY2UsXHJcbiAgICAgICAgQnNEcm9wZG93blN0YXRlXHJcbiAgICAgIF1cclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==