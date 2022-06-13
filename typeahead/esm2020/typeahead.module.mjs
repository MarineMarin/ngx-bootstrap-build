import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TypeaheadContainerComponent } from './typeahead-container.component';
import { TypeaheadDirective } from './typeahead.directive';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { PositioningService } from 'ngx-bootstrap/positioning';
import * as i0 from "@angular/core";
export class TypeaheadModule {
    static forRoot() {
        return {
            ngModule: TypeaheadModule,
            providers: [ComponentLoaderFactory, PositioningService]
        };
    }
}
TypeaheadModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: TypeaheadModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
TypeaheadModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: TypeaheadModule, declarations: [TypeaheadContainerComponent, TypeaheadDirective], imports: [CommonModule], exports: [TypeaheadContainerComponent, TypeaheadDirective] });
TypeaheadModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: TypeaheadModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: TypeaheadModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [TypeaheadContainerComponent, TypeaheadDirective],
                    exports: [TypeaheadContainerComponent, TypeaheadDirective],
                    entryComponents: [TypeaheadContainerComponent]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZWFoZWFkLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy90eXBlYWhlYWQvdHlwZWFoZWFkLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFFOUQsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDOUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDM0QsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDeEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7O0FBUS9ELE1BQU0sT0FBTyxlQUFlO0lBQzFCLE1BQU0sQ0FBQyxPQUFPO1FBQ1osT0FBTztZQUNMLFFBQVEsRUFBRSxlQUFlO1lBQ3pCLFNBQVMsRUFBRSxDQUFDLHNCQUFzQixFQUFFLGtCQUFrQixDQUFDO1NBQ3hELENBQUM7SUFDSixDQUFDOzs0R0FOVSxlQUFlOzZHQUFmLGVBQWUsaUJBSlgsMkJBQTJCLEVBQUUsa0JBQWtCLGFBRHBELFlBQVksYUFFWiwyQkFBMkIsRUFBRSxrQkFBa0I7NkdBRzlDLGVBQWUsWUFMakIsQ0FBQyxZQUFZLENBQUM7MkZBS1osZUFBZTtrQkFOM0IsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7b0JBQ3ZCLFlBQVksRUFBRSxDQUFDLDJCQUEyQixFQUFFLGtCQUFrQixDQUFDO29CQUMvRCxPQUFPLEVBQUUsQ0FBQywyQkFBMkIsRUFBRSxrQkFBa0IsQ0FBQztvQkFDMUQsZUFBZSxFQUFFLENBQUMsMkJBQTJCLENBQUM7aUJBQy9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IFR5cGVhaGVhZENvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4vdHlwZWFoZWFkLWNvbnRhaW5lci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBUeXBlYWhlYWREaXJlY3RpdmUgfSBmcm9tICcuL3R5cGVhaGVhZC5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBDb21wb25lbnRMb2FkZXJGYWN0b3J5IH0gZnJvbSAnbmd4LWJvb3RzdHJhcC9jb21wb25lbnQtbG9hZGVyJztcclxuaW1wb3J0IHsgUG9zaXRpb25pbmdTZXJ2aWNlIH0gZnJvbSAnbmd4LWJvb3RzdHJhcC9wb3NpdGlvbmluZyc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxyXG4gIGRlY2xhcmF0aW9uczogW1R5cGVhaGVhZENvbnRhaW5lckNvbXBvbmVudCwgVHlwZWFoZWFkRGlyZWN0aXZlXSxcclxuICBleHBvcnRzOiBbVHlwZWFoZWFkQ29udGFpbmVyQ29tcG9uZW50LCBUeXBlYWhlYWREaXJlY3RpdmVdLFxyXG4gIGVudHJ5Q29tcG9uZW50czogW1R5cGVhaGVhZENvbnRhaW5lckNvbXBvbmVudF1cclxufSlcclxuZXhwb3J0IGNsYXNzIFR5cGVhaGVhZE1vZHVsZSB7XHJcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVyczxUeXBlYWhlYWRNb2R1bGU+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5nTW9kdWxlOiBUeXBlYWhlYWRNb2R1bGUsXHJcbiAgICAgIHByb3ZpZGVyczogW0NvbXBvbmVudExvYWRlckZhY3RvcnksIFBvc2l0aW9uaW5nU2VydmljZV1cclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==