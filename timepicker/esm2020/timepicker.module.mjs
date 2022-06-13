import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimepickerComponent } from './timepicker.component';
import { TimepickerActions } from './reducer/timepicker.actions';
import { TimepickerStore } from './reducer/timepicker.store';
import * as i0 from "@angular/core";
export class TimepickerModule {
    static forRoot() {
        return {
            ngModule: TimepickerModule,
            providers: [TimepickerActions, TimepickerStore]
        };
    }
}
TimepickerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: TimepickerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
TimepickerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: TimepickerModule, declarations: [TimepickerComponent], imports: [CommonModule], exports: [TimepickerComponent] });
TimepickerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: TimepickerModule, providers: [TimepickerStore], imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: TimepickerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [TimepickerComponent],
                    exports: [TimepickerComponent],
                    providers: [TimepickerStore]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXBpY2tlci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdGltZXBpY2tlci90aW1lcGlja2VyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQXVCLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDN0QsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDakUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDRCQUE0QixDQUFDOztBQVE3RCxNQUFNLE9BQU8sZ0JBQWdCO0lBQzNCLE1BQU0sQ0FBQyxPQUFPO1FBQ1osT0FBTztZQUNMLFFBQVEsRUFBRSxnQkFBZ0I7WUFDMUIsU0FBUyxFQUFFLENBQUMsaUJBQWlCLEVBQUUsZUFBZSxDQUFDO1NBQ2hELENBQUM7SUFDSixDQUFDOzs2R0FOVSxnQkFBZ0I7OEdBQWhCLGdCQUFnQixpQkFKWixtQkFBbUIsYUFEeEIsWUFBWSxhQUVaLG1CQUFtQjs4R0FHbEIsZ0JBQWdCLGFBRmpCLENBQUMsZUFBZSxDQUFDLFlBSGxCLENBQUMsWUFBWSxDQUFDOzJGQUtaLGdCQUFnQjtrQkFONUIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7b0JBQ3ZCLFlBQVksRUFBRSxDQUFDLG1CQUFtQixDQUFDO29CQUNuQyxPQUFPLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztvQkFDOUIsU0FBUyxFQUFDLENBQUMsZUFBZSxDQUFDO2lCQUM1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBUaW1lcGlja2VyQ29tcG9uZW50IH0gZnJvbSAnLi90aW1lcGlja2VyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFRpbWVwaWNrZXJBY3Rpb25zIH0gZnJvbSAnLi9yZWR1Y2VyL3RpbWVwaWNrZXIuYWN0aW9ucyc7XHJcbmltcG9ydCB7IFRpbWVwaWNrZXJTdG9yZSB9IGZyb20gJy4vcmVkdWNlci90aW1lcGlja2VyLnN0b3JlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXHJcbiAgZGVjbGFyYXRpb25zOiBbVGltZXBpY2tlckNvbXBvbmVudF0sXHJcbiAgZXhwb3J0czogW1RpbWVwaWNrZXJDb21wb25lbnRdLFxyXG4gIHByb3ZpZGVyczpbVGltZXBpY2tlclN0b3JlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgVGltZXBpY2tlck1vZHVsZSB7XHJcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVyczxUaW1lcGlja2VyTW9kdWxlPiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuZ01vZHVsZTogVGltZXBpY2tlck1vZHVsZSxcclxuICAgICAgcHJvdmlkZXJzOiBbVGltZXBpY2tlckFjdGlvbnMsIFRpbWVwaWNrZXJTdG9yZV1cclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==