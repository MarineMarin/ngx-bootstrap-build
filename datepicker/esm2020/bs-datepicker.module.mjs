import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { PositioningService } from 'ngx-bootstrap/positioning';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TimepickerModule, TimepickerActions } from 'ngx-bootstrap/timepicker';
import { BsDatepickerInputDirective } from './bs-datepicker-input.directive';
import { BsDatepickerDirective } from './bs-datepicker.component';
import { BsDaterangepickerInputDirective } from './bs-daterangepicker-input.directive';
import { BsDaterangepickerDirective } from './bs-daterangepicker.component';
import { BsDatepickerInlineDirective } from './bs-datepicker-inline.component';
import { BsLocaleService } from './bs-locale.service';
import { BsDatepickerActions } from './reducer/bs-datepicker.actions';
import { BsDatepickerEffects } from './reducer/bs-datepicker.effects';
import { BsDatepickerStore } from './reducer/bs-datepicker.store';
import { BsDatepickerContainerComponent } from './themes/bs/bs-datepicker-container.component';
import { BsDaterangepickerContainerComponent } from './themes/bs/bs-daterangepicker-container.component';
import { BsDatepickerInlineContainerComponent } from './themes/bs/bs-datepicker-inline-container.component';
import { BsDaterangepickerInlineContainerComponent } from './themes/bs/bs-daterangepicker-inline-container.component';
import { BsDaterangepickerInlineDirective } from './bs-daterangepicker-inline.component';
import { BsCalendarLayoutComponent } from './themes/bs/bs-calendar-layout.component';
import { BsCurrentDateViewComponent } from './themes/bs/bs-current-date-view.component';
import { BsCustomDatesViewComponent } from './themes/bs/bs-custom-dates-view.component';
import { BsDatepickerDayDecoratorComponent } from './themes/bs/bs-datepicker-day-decorator.directive';
import { BsDatepickerNavigationViewComponent } from './themes/bs/bs-datepicker-navigation-view.component';
import { BsDaysCalendarViewComponent } from './themes/bs/bs-days-calendar-view.component';
import { BsMonthCalendarViewComponent } from './themes/bs/bs-months-calendar-view.component';
import { BsTimepickerViewComponent } from './themes/bs/bs-timepicker-view.component';
import { BsYearsCalendarViewComponent } from './themes/bs/bs-years-calendar-view.component';
import * as i0 from "@angular/core";
export class BsDatepickerModule {
    static forRoot() {
        return {
            ngModule: BsDatepickerModule,
            providers: [
                ComponentLoaderFactory,
                PositioningService,
                BsDatepickerStore,
                BsDatepickerActions,
                BsDatepickerEffects,
                BsLocaleService,
                TimepickerActions
            ]
        };
    }
}
BsDatepickerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: BsDatepickerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
BsDatepickerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: BsDatepickerModule, declarations: [BsCalendarLayoutComponent,
        BsCurrentDateViewComponent,
        BsCustomDatesViewComponent,
        BsDatepickerDayDecoratorComponent,
        BsDatepickerNavigationViewComponent,
        BsDaysCalendarViewComponent,
        BsMonthCalendarViewComponent,
        BsTimepickerViewComponent,
        BsYearsCalendarViewComponent,
        BsDatepickerContainerComponent,
        BsDatepickerDirective,
        BsDatepickerInlineContainerComponent,
        BsDatepickerInlineDirective,
        BsDatepickerInputDirective,
        BsDaterangepickerContainerComponent,
        BsDaterangepickerDirective,
        BsDaterangepickerInlineContainerComponent,
        BsDaterangepickerInlineDirective,
        BsDaterangepickerInputDirective], imports: [CommonModule, TooltipModule, TimepickerModule], exports: [BsDatepickerContainerComponent,
        BsDatepickerDirective,
        BsDatepickerInlineContainerComponent,
        BsDatepickerInlineDirective,
        BsDatepickerInputDirective,
        BsDaterangepickerContainerComponent,
        BsDaterangepickerDirective,
        BsDaterangepickerInlineContainerComponent,
        BsDaterangepickerInlineDirective,
        BsDaterangepickerInputDirective] });
BsDatepickerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: BsDatepickerModule, imports: [[CommonModule, TooltipModule, TimepickerModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: BsDatepickerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, TooltipModule, TimepickerModule],
                    declarations: [
                        BsCalendarLayoutComponent,
                        BsCurrentDateViewComponent,
                        BsCustomDatesViewComponent,
                        BsDatepickerDayDecoratorComponent,
                        BsDatepickerNavigationViewComponent,
                        BsDaysCalendarViewComponent,
                        BsMonthCalendarViewComponent,
                        BsTimepickerViewComponent,
                        BsYearsCalendarViewComponent,
                        BsDatepickerContainerComponent,
                        BsDatepickerDirective,
                        BsDatepickerInlineContainerComponent,
                        BsDatepickerInlineDirective,
                        BsDatepickerInputDirective,
                        BsDaterangepickerContainerComponent,
                        BsDaterangepickerDirective,
                        BsDaterangepickerInlineContainerComponent,
                        BsDaterangepickerInlineDirective,
                        BsDaterangepickerInputDirective
                    ],
                    entryComponents: [
                        BsDatepickerContainerComponent,
                        BsDaterangepickerContainerComponent,
                        BsDatepickerInlineContainerComponent,
                        BsDaterangepickerInlineContainerComponent
                    ],
                    exports: [
                        BsDatepickerContainerComponent,
                        BsDatepickerDirective,
                        BsDatepickerInlineContainerComponent,
                        BsDatepickerInlineDirective,
                        BsDatepickerInputDirective,
                        BsDaterangepickerContainerComponent,
                        BsDaterangepickerDirective,
                        BsDaterangepickerInlineContainerComponent,
                        BsDaterangepickerInlineDirective,
                        BsDaterangepickerInputDirective
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnMtZGF0ZXBpY2tlci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZGF0ZXBpY2tlci9icy1kYXRlcGlja2VyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUF1QixRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDeEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFL0QsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3RELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRS9FLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ3ZGLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBRTVFLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBRS9FLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUN0RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUN0RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNsRSxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUMvRixPQUFPLEVBQUUsbUNBQW1DLEVBQUUs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M0IsMEJBQTBCO3dCQUMxQixtQ0FBbUM7d0JBQ25DLDBCQUEwQjt3QkFDMUIseUNBQXlDO3dCQUN6QyxnQ0FBZ0M7d0JBQ2hDLCtCQUErQjtxQkFDaEM7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21wb25lbnRMb2FkZXJGYWN0b3J5IH0gZnJvbSAnbmd4LWJvb3RzdHJhcC9jb21wb25lbnQtbG9hZGVyJztcclxuaW1wb3J0IHsgUG9zaXRpb25pbmdTZXJ2aWNlIH0gZnJvbSAnbmd4LWJvb3RzdHJhcC9wb3NpdGlvbmluZyc7XHJcblxyXG5pbXBvcnQgeyBUb29sdGlwTW9kdWxlIH0gZnJvbSAnbmd4LWJvb3RzdHJhcC90b29sdGlwJztcclxuaW1wb3J0IHsgVGltZXBpY2tlck1vZHVsZSwgVGltZXBpY2tlckFjdGlvbnMgfSBmcm9tICduZ3gtYm9vdHN0cmFwL3RpbWVwaWNrZXInO1xyXG5cclxuaW1wb3J0IHsgQnNEYXRlcGlja2VySW5wdXREaXJlY3RpdmUgfSBmcm9tICcuL2JzLWRhdGVwaWNrZXItaW5wdXQuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgQnNEYXRlcGlja2VyRGlyZWN0aXZlIH0gZnJvbSAnLi9icy1kYXRlcGlja2VyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEJzRGF0ZXJhbmdlcGlja2VySW5wdXREaXJlY3RpdmUgfSBmcm9tICcuL2JzLWRhdGVyYW5nZXBpY2tlci1pbnB1dC5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBCc0RhdGVyYW5nZXBpY2tlckRpcmVjdGl2ZSB9IGZyb20gJy4vYnMtZGF0ZXJhbmdlcGlja2VyLmNvbXBvbmVudCc7XHJcblxyXG5pbXBvcnQgeyBCc0RhdGVwaWNrZXJJbmxpbmVEaXJlY3RpdmUgfSBmcm9tICcuL2JzLWRhdGVwaWNrZXItaW5saW5lLmNvbXBvbmVudCc7XHJcblxyXG5pbXBvcnQgeyBCc0xvY2FsZVNlcnZpY2UgfSBmcm9tICcuL2JzLWxvY2FsZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQnNEYXRlcGlja2VyQWN0aW9ucyB9IGZyb20gJy4vcmVkdWNlci9icy1kYXRlcGlja2VyLmFjdGlvbnMnO1xyXG5pbXBvcnQgeyBCc0RhdGVwaWNrZXJFZmZlY3RzIH0gZnJvbSAnLi9yZWR1Y2VyL2JzLWRhdGVwaWNrZXIuZWZmZWN0cyc7XHJcbmltcG9ydCB7IEJzRGF0ZXBpY2tlclN0b3JlIH0gZnJvbSAnLi9yZWR1Y2VyL2JzLWRhdGVwaWNrZXIuc3RvcmUnO1xyXG5pbXBvcnQgeyBCc0RhdGVwaWNrZXJDb250YWluZXJDb21wb25lbnQgfSBmcm9tICcuL3RoZW1lcy9icy9icy1kYXRlcGlja2VyLWNvbnRhaW5lci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBCc0RhdGVyYW5nZXBpY2tlckNvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4vdGhlbWVzL2JzL2JzLWRhdGVyYW5nZXBpY2tlci1jb250YWluZXIuY29tcG9uZW50JztcclxuXHJcbmltcG9ydCB7IEJzRGF0ZXBpY2tlcklubGluZUNvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4vdGhlbWVzL2JzL2JzLWRhdGVwaWNrZXItaW5saW5lLWNvbnRhaW5lci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBCc0RhdGVyYW5nZXBpY2tlcklubGluZUNvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4vdGhlbWVzL2JzL2JzLWRhdGVyYW5nZXBpY2tlci1pbmxpbmUtY29udGFpbmVyLmNvbXBvbmVudCc7XHJcblxyXG5pbXBvcnQgeyBCc0RhdGVyYW5nZXBpY2tlcklubGluZURpcmVjdGl2ZSB9IGZyb20gJy4vYnMtZGF0ZXJhbmdlcGlja2VyLWlubGluZS5jb21wb25lbnQnO1xyXG5cclxuaW1wb3J0IHsgQnNDYWxlbmRhckxheW91dENvbXBvbmVudCB9IGZyb20gJy4vdGhlbWVzL2JzL2JzLWNhbGVuZGFyLWxheW91dC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBCc0N1cnJlbnREYXRlVmlld0NvbXBvbmVudCB9IGZyb20gJy4vdGhlbWVzL2JzL2JzLWN1cnJlbnQtZGF0ZS12aWV3LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEJzQ3VzdG9tRGF0ZXNWaWV3Q29tcG9uZW50IH0gZnJvbSAnLi90aGVtZXMvYnMvYnMtY3VzdG9tLWRhdGVzLXZpZXcuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQnNEYXRlcGlja2VyRGF5RGVjb3JhdG9yQ29tcG9uZW50IH0gZnJvbSAnLi90aGVtZXMvYnMvYnMtZGF0ZXBpY2tlci1kYXktZGVjb3JhdG9yLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IEJzRGF0ZXBpY2tlck5hdmlnYXRpb25WaWV3Q29tcG9uZW50IH0gZnJvbSAnLi90aGVtZXMvYnMvYnMtZGF0ZXBpY2tlci1uYXZpZ2F0aW9uLXZpZXcuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQnNEYXlzQ2FsZW5kYXJWaWV3Q29tcG9uZW50IH0gZnJvbSAnLi90aGVtZXMvYnMvYnMtZGF5cy1jYWxlbmRhci12aWV3LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEJzTW9udGhDYWxlbmRhclZpZXdDb21wb25lbnQgfSBmcm9tICcuL3RoZW1lcy9icy9icy1tb250aHMtY2FsZW5kYXItdmlldy5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBCc1RpbWVwaWNrZXJWaWV3Q29tcG9uZW50IH0gZnJvbSAnLi90aGVtZXMvYnMvYnMtdGltZXBpY2tlci12aWV3LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEJzWWVhcnNDYWxlbmRhclZpZXdDb21wb25lbnQgfSBmcm9tICcuL3RoZW1lcy9icy9icy15ZWFycy1jYWxlbmRhci12aWV3LmNvbXBvbmVudCc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIFRvb2x0aXBNb2R1bGUsIFRpbWVwaWNrZXJNb2R1bGVdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgQnNDYWxlbmRhckxheW91dENvbXBvbmVudCxcclxuICAgIEJzQ3VycmVudERhdGVWaWV3Q29tcG9uZW50LFxyXG4gICAgQnNDdXN0b21EYXRlc1ZpZXdDb21wb25lbnQsXHJcbiAgICBCc0RhdGVwaWNrZXJEYXlEZWNvcmF0b3JDb21wb25lbnQsXHJcbiAgICBCc0RhdGVwaWNrZXJOYXZpZ2F0aW9uVmlld0NvbXBvbmVudCxcclxuICAgIEJzRGF5c0NhbGVuZGFyVmlld0NvbXBvbmVudCxcclxuICAgIEJzTW9udGhDYWxlbmRhclZpZXdDb21wb25lbnQsXHJcbiAgICBCc1RpbWVwaWNrZXJWaWV3Q29tcG9uZW50LFxyXG4gICAgQnNZZWFyc0NhbGVuZGFyVmlld0NvbXBvbmVudCxcclxuICAgIEJzRGF0ZXBpY2tlckNvbnRhaW5lckNvbXBvbmVudCxcclxuICAgIEJzRGF0ZXBpY2tlckRpcmVjdGl2ZSxcclxuICAgIEJzRGF0ZXBpY2tlcklubGluZUNvbnRhaW5lckNvbXBvbmVudCxcclxuICAgIEJzRGF0ZXBpY2tlcklubGluZURpcmVjdGl2ZSxcclxuICAgIEJzRGF0ZXBpY2tlcklucHV0RGlyZWN0aXZlLFxyXG4gICAgQnNEYXRlcmFuZ2VwaWNrZXJDb250YWluZXJDb21wb25lbnQsXHJcbiAgICBCc0RhdGVyYW5nZXBpY2tlckRpcmVjdGl2ZSxcclxuICAgIEJzRGF0ZXJhbmdlcGlja2VySW5saW5lQ29udGFpbmVyQ29tcG9uZW50LFxyXG4gICAgQnNEYXRlcmFuZ2VwaWNrZXJJbmxpbmVEaXJlY3RpdmUsXHJcbiAgICBCc0RhdGVyYW5nZXBpY2tlcklucHV0RGlyZWN0aXZlXHJcbiAgXSxcclxuICBlbnRyeUNvbXBvbmVudHM6IFtcclxuICAgIEJzRGF0ZXBpY2tlckNvbnRhaW5lckNvbXBvbmVudCxcclxuICAgIEJzRGF0ZXJhbmdlcGlja2VyQ29udGFpbmVyQ29tcG9uZW50LFxyXG4gICAgQnNEYXRlcGlja2VySW5saW5lQ29udGFpbmVyQ29tcG9uZW50LFxyXG4gICAgQnNEYXRlcmFuZ2VwaWNrZXJJbmxpbmVDb250YWluZXJDb21wb25lbnRcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIEJzRGF0ZXBpY2tlckNvbnRhaW5lckNvbXBvbmVudCxcclxuICAgIEJzRGF0ZXBpY2tlckRpcmVjdGl2ZSxcclxuICAgIEJzRGF0ZXBpY2tlcklubGluZUNvbnRhaW5lckNvbXBvbmVudCxcclxuICAgIEJzRGF0ZXBpY2tlcklubGluZURpcmVjdGl2ZSxcclxuICAgIEJzRGF0ZXBpY2tlcklucHV0RGlyZWN0aXZlLFxyXG4gICAgQnNEYXRlcmFuZ2VwaWNrZXJDb250YWluZXJDb21wb25lbnQsXHJcbiAgICBCc0RhdGVyYW5nZXBpY2tlckRpcmVjdGl2ZSxcclxuICAgIEJzRGF0ZXJhbmdlcGlja2VySW5saW5lQ29udGFpbmVyQ29tcG9uZW50LFxyXG4gICAgQnNEYXRlcmFuZ2VwaWNrZXJJbmxpbmVEaXJlY3RpdmUsXHJcbiAgICBCc0RhdGVyYW5nZXBpY2tlcklucHV0RGlyZWN0aXZlXHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQnNEYXRlcGlja2VyTW9kdWxlIHtcclxuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPEJzRGF0ZXBpY2tlck1vZHVsZT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmdNb2R1bGU6IEJzRGF0ZXBpY2tlck1vZHVsZSxcclxuICAgICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgQ29tcG9uZW50TG9hZGVyRmFjdG9yeSxcclxuICAgICAgICBQb3NpdGlvbmluZ1NlcnZpY2UsXHJcbiAgICAgICAgQnNEYXRlcGlja2VyU3RvcmUsXHJcbiAgICAgICAgQnNEYXRlcGlja2VyQWN0aW9ucyxcclxuICAgICAgICBCc0RhdGVwaWNrZXJFZmZlY3RzLFxyXG4gICAgICAgIEJzTG9jYWxlU2VydmljZSxcclxuICAgICAgICBUaW1lcGlja2VyQWN0aW9uc1xyXG4gICAgICBdXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXX0=