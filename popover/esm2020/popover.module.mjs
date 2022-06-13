import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { PositioningService } from 'ngx-bootstrap/positioning';
import { PopoverDirective } from './popover.directive';
import { PopoverContainerComponent } from './popover-container.component';
import * as i0 from "@angular/core";
export class PopoverModule {
    static forRoot() {
        return {
            ngModule: PopoverModule,
            providers: [ComponentLoaderFactory, PositioningService]
        };
    }
}
PopoverModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: PopoverModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
PopoverModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: PopoverModule, declarations: [PopoverDirective, PopoverContainerComponent], imports: [CommonModule], exports: [PopoverDirective] });
PopoverModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: PopoverModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: PopoverModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [PopoverDirective, PopoverContainerComponent],
                    exports: [PopoverDirective],
                    entryComponents: [PopoverContainerComponent]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvcG9wb3Zlci9wb3BvdmVyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUF1QixNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDeEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDL0QsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdkQsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sK0JBQStCLENBQUM7O0FBUTFFLE1BQU0sT0FBTyxhQUFhO0lBQ3hCLE1BQU0sQ0FBQyxPQUFPO1FBQ1osT0FBTztZQUNMLFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLFNBQVMsRUFBRSxDQUFDLHNCQUFzQixFQUFFLGtCQUFrQixDQUFDO1NBQ3hELENBQUM7SUFDSixDQUFDOzswR0FOVSxhQUFhOzJHQUFiLGFBQWEsaUJBSlQsZ0JBQWdCLEVBQUUseUJBQXlCLGFBRGhELFlBQVksYUFFWixnQkFBZ0I7MkdBR2YsYUFBYSxZQUxmLENBQUMsWUFBWSxDQUFDOzJGQUtaLGFBQWE7a0JBTnpCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO29CQUN2QixZQUFZLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSx5QkFBeUIsQ0FBQztvQkFDM0QsT0FBTyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7b0JBQzNCLGVBQWUsRUFBRSxDQUFDLHlCQUF5QixDQUFDO2lCQUM3QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBDb21wb25lbnRMb2FkZXJGYWN0b3J5IH0gZnJvbSAnbmd4LWJvb3RzdHJhcC9jb21wb25lbnQtbG9hZGVyJztcclxuaW1wb3J0IHsgUG9zaXRpb25pbmdTZXJ2aWNlIH0gZnJvbSAnbmd4LWJvb3RzdHJhcC9wb3NpdGlvbmluZyc7XHJcbmltcG9ydCB7IFBvcG92ZXJEaXJlY3RpdmUgfSBmcm9tICcuL3BvcG92ZXIuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgUG9wb3ZlckNvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4vcG9wb3Zlci1jb250YWluZXIuY29tcG9uZW50JztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXHJcbiAgZGVjbGFyYXRpb25zOiBbUG9wb3ZlckRpcmVjdGl2ZSwgUG9wb3ZlckNvbnRhaW5lckNvbXBvbmVudF0sXHJcbiAgZXhwb3J0czogW1BvcG92ZXJEaXJlY3RpdmVdLFxyXG4gIGVudHJ5Q29tcG9uZW50czogW1BvcG92ZXJDb250YWluZXJDb21wb25lbnRdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQb3BvdmVyTW9kdWxlIHtcclxuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPFBvcG92ZXJNb2R1bGU+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5nTW9kdWxlOiBQb3BvdmVyTW9kdWxlLFxyXG4gICAgICBwcm92aWRlcnM6IFtDb21wb25lbnRMb2FkZXJGYWN0b3J5LCBQb3NpdGlvbmluZ1NlcnZpY2VdXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXX0=