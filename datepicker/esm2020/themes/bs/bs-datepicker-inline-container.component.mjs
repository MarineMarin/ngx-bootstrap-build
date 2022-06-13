import { Component, ElementRef, Renderer2 } from '@angular/core';
import { BsDatepickerContainerComponent } from './bs-datepicker-container.component';
import { BsDatepickerActions } from '../../reducer/bs-datepicker.actions';
import { BsDatepickerConfig } from '../../bs-datepicker.config';
import { BsDatepickerEffects } from '../../reducer/bs-datepicker.effects';
import { BsDatepickerStore } from '../../reducer/bs-datepicker.store';
import { PositioningService } from 'ngx-bootstrap/positioning';
import { datepickerAnimation } from '../../datepicker-animations';
import * as i0 from "@angular/core";
import * as i1 from "../../bs-datepicker.config";
import * as i2 from "../../reducer/bs-datepicker.store";
import * as i3 from "../../reducer/bs-datepicker.actions";
import * as i4 from "../../reducer/bs-datepicker.effects";
import * as i5 from "ngx-bootstrap/positioning";
import * as i6 from "./bs-days-calendar-view.component";
import * as i7 from "ngx-bootstrap/timepicker";
import * as i8 from "./bs-months-calendar-view.component";
import * as i9 from "./bs-years-calendar-view.component";
import * as i10 from "./bs-custom-dates-view.component";
import * as i11 from "@angular/common";
export class BsDatepickerInlineContainerComponent extends BsDatepickerContainerComponent {
    constructor(_renderer, _config, _store, _element, _actions, _effects, _positioningService) {
        super(_renderer, _config, _store, _element, _actions, _effects, _positioningService);
        _renderer.setStyle(_element.nativeElement, 'display', 'inline-block');
        _renderer.setStyle(_element.nativeElement, 'position', 'static');
    }
}
BsDatepickerInlineContainerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: BsDatepickerInlineContainerComponent, deps: [{ token: i0.Renderer2 }, { token: i1.BsDatepickerConfig }, { token: i2.BsDatepickerStore }, { token: i0.ElementRef }, { token: i3.BsDatepickerActions }, { token: i4.BsDatepickerEffects }, { token: i5.PositioningService }], target: i0.ɵɵFactoryTarget.Component });
BsDatepickerInlineContainerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.1", type: BsDatepickerInlineContainerComponent, selector: "bs-datepicker-inline-container", host: { listeners: { "click": "_stopPropagation($event)" } }, providers: [BsDatepickerStore, BsDatepickerEffects], usesInheritance: true, ngImport: i0, template: "<!-- days calendar view mode -->\r\n<div class=\"bs-datepicker\" [ngClass]=\"containerClass\" *ngIf=\"viewMode | async\">\r\n  <div class=\"bs-datepicker-container\"\r\n    [@datepickerAnimation]=\"animationState\"\r\n    (@datepickerAnimation.done)=\"positionServiceEnable()\">\r\n    <!--calendars-->\r\n    <div class=\"bs-calendar-container\" [ngSwitch]=\"viewMode | async\" role=\"application\">\r\n      <!--days calendar-->\r\n      <ng-container *ngSwitchCase=\"'day'\">\r\n        <div class=\"bs-media-container\">\r\n          <bs-days-calendar-view\r\n            *ngFor=\"let calendar of daysCalendar$ | async\"\r\n            [class.bs-datepicker-multiple]=\"multipleCalendars\"\r\n            [calendar]=\"calendar\"\r\n            [options]=\"options$ | async\"\r\n            (onNavigate)=\"navigateTo($event)\"\r\n            (onViewMode)=\"setViewMode($event)\"\r\n            (onHover)=\"dayHoverHandler($event)\"\r\n            (onHoverWeek)=\"weekHoverHandler($event)\"\r\n            (onSelect)=\"daySelectHandler($event)\">\r\n          </bs-days-calendar-view>\r\n        </div>\r\n        <div *ngIf=\"withTimepicker\" class=\"bs-timepicker-in-datepicker-container\">\r\n          <timepicker #startTP></timepicker>\r\n          <timepicker #endTP *ngIf=\"isRangePicker\"></timepicker>\r\n        </div>\r\n      </ng-container>\r\n\r\n      <!--months calendar-->\r\n      <div *ngSwitchCase=\"'month'\" class=\"bs-media-container\">\r\n        <bs-month-calendar-view\r\n          *ngFor=\"let calendar of monthsCalendar | async\"\r\n          [class.bs-datepicker-multiple]=\"multipleCalendars\"\r\n          [calendar]=\"calendar\"\r\n          (onNavigate)=\"navigateTo($event)\"\r\n          (onViewMode)=\"setViewMode($event)\"\r\n          (onHover)=\"monthHoverHandler($event)\"\r\n          (onSelect)=\"monthSelectHandler($event)\">\r\n        </bs-month-calendar-view>\r\n      </div>\r\n\r\n      <!--years calendar-->\r\n      <div *ngSwitchCase=\"'year'\" class=\"bs-media-container\">\r\n        <bs-years-calendar-view\r\n          *ngFor=\"let calendar of yearsCalendar | async\"\r\n          [class.bs-datepicker-multiple]=\"multipleCalendars\"\r\n          [calendar]=\"calendar\"\r\n          (onNavigate)=\"navigateTo($event)\"\r\n          (onViewMode)=\"setViewMode($event)\"\r\n          (onHover)=\"yearHoverHandler($event)\"\r\n          (onSelect)=\"yearSelectHandler($event)\">\r\n        </bs-years-calendar-view>\r\n      </div>\r\n    </div>\r\n\r\n    <!--applycancel buttons-->\r\n    <div class=\"bs-datepicker-buttons\" *ngIf=\"false\">\r\n      <button class=\"btn btn-success\" type=\"button\">Apply</button>\r\n      <button class=\"btn btn-default\" type=\"button\">Cancel</button>\r\n    </div>\r\n\r\n    <div class=\"bs-datepicker-buttons\" *ngIf=\"showTodayBtn || showClearBtn\">\r\n      <div class=\"btn-today-wrapper\"\r\n           [class.today-left]=\"todayPos === 'left'\"\r\n           [class.today-right]=\"todayPos === 'right'\"\r\n           [class.today-center]=\"todayPos === 'center'\"\r\n           *ngIf=\"showTodayBtn\">\r\n        <button class=\"btn btn-success\" (click)=\"setToday()\">{{todayBtnLbl}}</button>\r\n      </div>\r\n\r\n        <div class=\"btn-clear-wrapper\"\r\n        [class.clear-left]=\"clearPos === 'left'\"\r\n        [class.clear-right]=\"clearPos === 'right'\"\r\n        [class.clear-center]=\"clearPos === 'center'\"\r\n        *ngIf=\"showClearBtn\">\r\n          <button class=\"btn btn-success\" (click)=\"clearDate()\">{{clearBtnLbl}}</button>\r\n        </div>\r\n    </div>\r\n\r\n  </div>\r\n\r\n  <!--custom dates or date ranges picker-->\r\n  <div class=\"bs-datepicker-custom-range\" *ngIf=\"customRanges && customRanges.length > 0\">\r\n    <bs-custom-date-view\r\n      [selectedRange]=\"chosenRange\"\r\n      [ranges]=\"customRanges\"\r\n      [customRangeLabel]=\"customRangeBtnLbl\"\r\n      (onSelect)=\"setRangeOnCalendar($event)\">\r\n    </bs-custom-date-view>\r\n  </div>\r\n</div>\r\n", components: [{ type: i6.BsDaysCalendarViewComponent, selector: "bs-days-calendar-view", inputs: ["calendar", "options"], outputs: ["onNavigate", "onViewMode", "onSelect", "onHover", "onHoverWeek"] }, { type: i7.TimepickerComponent, selector: "timepicker", inputs: ["hourStep", "minuteStep", "secondsStep", "readonlyInput", "disabled", "mousewheel", "arrowkeys", "showSpinners", "showMeridian", "showMinutes", "showSeconds", "meridians", "min", "max", "hoursPlaceholder", "minutesPlaceholder", "secondsPlaceholder"], outputs: ["isValid", "meridianChange"] }, { type: i8.BsMonthCalendarViewComponent, selector: "bs-month-calendar-view", inputs: ["calendar"], outputs: ["onNavigate", "onViewMode", "onSelect", "onHover"] }, { type: i9.BsYearsCalendarViewComponent, selector: "bs-years-calendar-view", inputs: ["calendar"], outputs: ["onNavigate", "onViewMode", "onSelect", "onHover"] }, { type: i10.BsCustomDatesViewComponent, selector: "bs-custom-date-view", inputs: ["ranges", "selectedRange", "customRangeLabel"], outputs: ["onSelect"] }], directives: [{ type: i11.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i11.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i11.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i11.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { type: i11.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], pipes: { "async": i11.AsyncPipe }, animations: [datepickerAnimation] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: BsDatepickerInlineContainerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bs-datepicker-inline-container', providers: [BsDatepickerStore, BsDatepickerEffects], host: {
                        '(click)': '_stopPropagation($event)'
                    }, animations: [datepickerAnimation], template: "<!-- days calendar view mode -->\r\n<div class=\"bs-datepicker\" [ngClass]=\"containerClass\" *ngIf=\"viewMode | async\">\r\n  <div class=\"bs-datepicker-container\"\r\n    [@datepickerAnimation]=\"animationState\"\r\n    (@datepickerAnimation.done)=\"positionServiceEnable()\">\r\n    <!--calendars-->\r\n    <div class=\"bs-calendar-container\" [ngSwitch]=\"viewMode | async\" role=\"application\">\r\n      <!--days calendar-->\r\n      <ng-container *ngSwitchCase=\"'day'\">\r\n        <div class=\"bs-media-container\">\r\n          <bs-days-calendar-view\r\n            *ngFor=\"let calendar of daysCalendar$ | async\"\r\n            [class.bs-datepicker-multiple]=\"multipleCalendars\"\r\n            [calendar]=\"calendar\"\r\n            [options]=\"options$ | async\"\r\n            (onNavigate)=\"navigateTo($event)\"\r\n            (onViewMode)=\"setViewMode($event)\"\r\n            (onHover)=\"dayHoverHandler($event)\"\r\n            (onHoverWeek)=\"weekHoverHandler($event)\"\r\n            (onSelect)=\"daySelectHandler($event)\">\r\n          </bs-days-calendar-view>\r\n        </div>\r\n        <div *ngIf=\"withTimepicker\" class=\"bs-timepicker-in-datepicker-container\">\r\n          <timepicker #startTP></timepicker>\r\n          <timepicker #endTP *ngIf=\"isRangePicker\"></timepicker>\r\n        </div>\r\n      </ng-container>\r\n\r\n      <!--months calendar-->\r\n      <div *ngSwitchCase=\"'month'\" class=\"bs-media-container\">\r\n        <bs-month-calendar-view\r\n          *ngFor=\"let calendar of monthsCalendar | async\"\r\n          [class.bs-datepicker-multiple]=\"multipleCalendars\"\r\n          [calendar]=\"calendar\"\r\n          (onNavigate)=\"navigateTo($event)\"\r\n          (onViewMode)=\"setViewMode($event)\"\r\n          (onHover)=\"monthHoverHandler($event)\"\r\n          (onSelect)=\"monthSelectHandler($event)\">\r\n        </bs-month-calendar-view>\r\n      </div>\r\n\r\n      <!--years calendar-->\r\n      <div *ngSwitchCase=\"'year'\" class=\"bs-media-container\">\r\n        <bs-years-calendar-view\r\n          *ngFor=\"let calendar of yearsCalendar | async\"\r\n          [class.bs-datepicker-multiple]=\"multipleCalendars\"\r\n          [calendar]=\"calendar\"\r\n          (onNavigate)=\"navigateTo($event)\"\r\n          (onViewMode)=\"setViewMode($event)\"\r\n          (onHover)=\"yearHoverHandler($event)\"\r\n          (onSelect)=\"yearSelectHandler($event)\">\r\n        </bs-years-calendar-view>\r\n      </div>\r\n    </div>\r\n\r\n    <!--applycancel buttons-->\r\n    <div class=\"bs-datepicker-buttons\" *ngIf=\"false\">\r\n      <button class=\"btn btn-success\" type=\"button\">Apply</button>\r\n      <button class=\"btn btn-default\" type=\"button\">Cancel</button>\r\n    </div>\r\n\r\n    <div class=\"bs-datepicker-buttons\" *ngIf=\"showTodayBtn || showClearBtn\">\r\n      <div class=\"btn-today-wrapper\"\r\n           [class.today-left]=\"todayPos === 'left'\"\r\n           [class.today-right]=\"todayPos === 'right'\"\r\n           [class.today-center]=\"todayPos === 'center'\"\r\n           *ngIf=\"showTodayBtn\">\r\n        <button class=\"btn btn-success\" (click)=\"setToday()\">{{todayBtnLbl}}</button>\r\n      </div>\r\n\r\n        <div class=\"btn-clear-wrapper\"\r\n        [class.clear-left]=\"clearPos === 'left'\"\r\n        [class.clear-right]=\"clearPos === 'right'\"\r\n        [class.clear-center]=\"clearPos === 'center'\"\r\n        *ngIf=\"showClearBtn\">\r\n          <button class=\"btn btn-success\" (click)=\"clearDate()\">{{clearBtnLbl}}</button>\r\n        </div>\r\n    </div>\r\n\r\n  </div>\r\n\r\n  <!--custom dates or date ranges picker-->\r\n  <div class=\"bs-datepicker-custom-range\" *ngIf=\"customRanges && customRanges.length > 0\">\r\n    <bs-custom-date-view\r\n      [selectedRange]=\"chosenRange\"\r\n      [ranges]=\"customRanges\"\r\n      [customRangeLabel]=\"customRangeBtnLbl\"\r\n      (onSelect)=\"setRangeOnCalendar($event)\">\r\n    </bs-custom-date-view>\r\n  </div>\r\n</div>\r\n" }]
        }], ctorParameters: function () { return [{ type: i0.Renderer2 }, { type: i1.BsDatepickerConfig }, { type: i2.BsDatepickerStore }, { type: i0.ElementRef }, { type: i3.BsDatepickerActions }, { type: i4.BsDatepickerEffects }, { type: i5.PositioningService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnMtZGF0ZXBpY2tlci1pbmxpbmUtY29udGFpbmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9kYXRlcGlja2VyL3RoZW1lcy9icy9icy1kYXRlcGlja2VyLWlubGluZS1jb250YWluZXIuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2RhdGVwaWNrZXIvdGhlbWVzL2JzL2JzLWRhdGVwaWNrZXItdmlldy5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFxQixTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDcEYsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFFckYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDMUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDaEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDMUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFFdEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDL0QsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7Ozs7Ozs7Ozs7Ozs7QUFXbEUsTUFBTSxPQUFPLG9DQUFxQyxTQUFRLDhCQUE4QjtJQUd0RixZQUNFLFNBQW9CLEVBQ3BCLE9BQTJCLEVBQzNCLE1BQXlCLEVBQ3pCLFFBQW9CLEVBQ3BCLFFBQTZCLEVBQzdCLFFBQTZCLEVBQzdCLG1CQUF1QztRQUV2QyxLQUFLLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztRQUVyRixTQUFTLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsU0FBUyxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQ3RFLFNBQVMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDbkUsQ0FBQzs7aUlBaEJVLG9DQUFvQztxSEFBcEMsb0NBQW9DLHVIQVBwQyxDQUFDLGlCQUFpQixFQUFFLG1CQUFtQixDQUFDLGlEQ2JyRCx1N0hBMkZBLGcvQ0R6RWMsQ0FBQyxtQkFBbUIsQ0FBQzsyRkFFdEIsb0NBQW9DO2tCQVRoRCxTQUFTOytCQUNFLGdDQUFnQyxhQUMvQixDQUFDLGlCQUFpQixFQUFFLG1CQUFtQixDQUFDLFFBRTdDO3dCQUNKLFNBQVMsRUFBRSwwQkFBMEI7cUJBQ3RDLGNBQ1csQ0FBQyxtQkFBbUIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgT25EZXN0cm95LCBPbkluaXQsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBCc0RhdGVwaWNrZXJDb250YWluZXJDb21wb25lbnQgfSBmcm9tICcuL2JzLWRhdGVwaWNrZXItY29udGFpbmVyLmNvbXBvbmVudCc7XHJcblxyXG5pbXBvcnQgeyBCc0RhdGVwaWNrZXJBY3Rpb25zIH0gZnJvbSAnLi4vLi4vcmVkdWNlci9icy1kYXRlcGlja2VyLmFjdGlvbnMnO1xyXG5pbXBvcnQgeyBCc0RhdGVwaWNrZXJDb25maWcgfSBmcm9tICcuLi8uLi9icy1kYXRlcGlja2VyLmNvbmZpZyc7XHJcbmltcG9ydCB7IEJzRGF0ZXBpY2tlckVmZmVjdHMgfSBmcm9tICcuLi8uLi9yZWR1Y2VyL2JzLWRhdGVwaWNrZXIuZWZmZWN0cyc7XHJcbmltcG9ydCB7IEJzRGF0ZXBpY2tlclN0b3JlIH0gZnJvbSAnLi4vLi4vcmVkdWNlci9icy1kYXRlcGlja2VyLnN0b3JlJztcclxuXHJcbmltcG9ydCB7IFBvc2l0aW9uaW5nU2VydmljZSB9IGZyb20gJ25neC1ib290c3RyYXAvcG9zaXRpb25pbmcnO1xyXG5pbXBvcnQgeyBkYXRlcGlja2VyQW5pbWF0aW9uIH0gZnJvbSAnLi4vLi4vZGF0ZXBpY2tlci1hbmltYXRpb25zJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYnMtZGF0ZXBpY2tlci1pbmxpbmUtY29udGFpbmVyJyxcclxuICBwcm92aWRlcnM6IFtCc0RhdGVwaWNrZXJTdG9yZSwgQnNEYXRlcGlja2VyRWZmZWN0c10sXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2JzLWRhdGVwaWNrZXItdmlldy5odG1sJyxcclxuICBob3N0OiB7XHJcbiAgICAnKGNsaWNrKSc6ICdfc3RvcFByb3BhZ2F0aW9uKCRldmVudCknXHJcbiAgfSxcclxuICBhbmltYXRpb25zOiBbZGF0ZXBpY2tlckFuaW1hdGlvbl1cclxufSlcclxuZXhwb3J0IGNsYXNzIEJzRGF0ZXBpY2tlcklubGluZUNvbnRhaW5lckNvbXBvbmVudCBleHRlbmRzIEJzRGF0ZXBpY2tlckNvbnRhaW5lckNvbXBvbmVudFxyXG4gIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIF9yZW5kZXJlcjogUmVuZGVyZXIyLFxyXG4gICAgX2NvbmZpZzogQnNEYXRlcGlja2VyQ29uZmlnLFxyXG4gICAgX3N0b3JlOiBCc0RhdGVwaWNrZXJTdG9yZSxcclxuICAgIF9lbGVtZW50OiBFbGVtZW50UmVmLFxyXG4gICAgX2FjdGlvbnM6IEJzRGF0ZXBpY2tlckFjdGlvbnMsXHJcbiAgICBfZWZmZWN0czogQnNEYXRlcGlja2VyRWZmZWN0cyxcclxuICAgIF9wb3NpdGlvbmluZ1NlcnZpY2U6IFBvc2l0aW9uaW5nU2VydmljZVxyXG4gICkge1xyXG4gICAgc3VwZXIoX3JlbmRlcmVyLCBfY29uZmlnLCBfc3RvcmUsIF9lbGVtZW50LCBfYWN0aW9ucywgX2VmZmVjdHMsIF9wb3NpdGlvbmluZ1NlcnZpY2UpO1xyXG5cclxuICAgIF9yZW5kZXJlci5zZXRTdHlsZShfZWxlbWVudC5uYXRpdmVFbGVtZW50LCAnZGlzcGxheScsICdpbmxpbmUtYmxvY2snKTtcclxuICAgIF9yZW5kZXJlci5zZXRTdHlsZShfZWxlbWVudC5uYXRpdmVFbGVtZW50LCAncG9zaXRpb24nLCAnc3RhdGljJyk7XHJcbiAgfVxyXG59XHJcbiIsIjwhLS0gZGF5cyBjYWxlbmRhciB2aWV3IG1vZGUgLS0+XHJcbjxkaXYgY2xhc3M9XCJicy1kYXRlcGlja2VyXCIgW25nQ2xhc3NdPVwiY29udGFpbmVyQ2xhc3NcIiAqbmdJZj1cInZpZXdNb2RlIHwgYXN5bmNcIj5cclxuICA8ZGl2IGNsYXNzPVwiYnMtZGF0ZXBpY2tlci1jb250YWluZXJcIlxyXG4gICAgW0BkYXRlcGlja2VyQW5pbWF0aW9uXT1cImFuaW1hdGlvblN0YXRlXCJcclxuICAgIChAZGF0ZXBpY2tlckFuaW1hdGlvbi5kb25lKT1cInBvc2l0aW9uU2VydmljZUVuYWJsZSgpXCI+XHJcbiAgICA8IS0tY2FsZW5kYXJzLS0+XHJcbiAgICA8ZGl2IGNsYXNzPVwiYnMtY2FsZW5kYXItY29udGFpbmVyXCIgW25nU3dpdGNoXT1cInZpZXdNb2RlIHwgYXN5bmNcIiByb2xlPVwiYXBwbGljYXRpb25cIj5cclxuICAgICAgPCEtLWRheXMgY2FsZW5kYXItLT5cclxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hDYXNlPVwiJ2RheSdcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiYnMtbWVkaWEtY29udGFpbmVyXCI+XHJcbiAgICAgICAgICA8YnMtZGF5cy1jYWxlbmRhci12aWV3XHJcbiAgICAgICAgICAgICpuZ0Zvcj1cImxldCBjYWxlbmRhciBvZiBkYXlzQ2FsZW5kYXIkIHwgYXN5bmNcIlxyXG4gICAgICAgICAgICBbY2xhc3MuYnMtZGF0ZXBpY2tlci1tdWx0aXBsZV09XCJtdWx0aXBsZUNhbGVuZGFyc1wiXHJcbiAgICAgICAgICAgIFtjYWxlbmRhcl09XCJjYWxlbmRhclwiXHJcbiAgICAgICAgICAgIFtvcHRpb25zXT1cIm9wdGlvbnMkIHwgYXN5bmNcIlxyXG4gICAgICAgICAgICAob25OYXZpZ2F0ZSk9XCJuYXZpZ2F0ZVRvKCRldmVudClcIlxyXG4gICAgICAgICAgICAob25WaWV3TW9kZSk9XCJzZXRWaWV3TW9kZSgkZXZlbnQpXCJcclxuICAgICAgICAgICAgKG9uSG92ZXIpPVwiZGF5SG92ZXJIYW5kbGVyKCRldmVudClcIlxyXG4gICAgICAgICAgICAob25Ib3ZlcldlZWspPVwid2Vla0hvdmVySGFuZGxlcigkZXZlbnQpXCJcclxuICAgICAgICAgICAgKG9uU2VsZWN0KT1cImRheVNlbGVjdEhhbmRsZXIoJGV2ZW50KVwiPlxyXG4gICAgICAgICAgPC9icy1kYXlzLWNhbGVuZGFyLXZpZXc+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiAqbmdJZj1cIndpdGhUaW1lcGlja2VyXCIgY2xhc3M9XCJicy10aW1lcGlja2VyLWluLWRhdGVwaWNrZXItY29udGFpbmVyXCI+XHJcbiAgICAgICAgICA8dGltZXBpY2tlciAjc3RhcnRUUD48L3RpbWVwaWNrZXI+XHJcbiAgICAgICAgICA8dGltZXBpY2tlciAjZW5kVFAgKm5nSWY9XCJpc1JhbmdlUGlja2VyXCI+PC90aW1lcGlja2VyPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L25nLWNvbnRhaW5lcj5cclxuXHJcbiAgICAgIDwhLS1tb250aHMgY2FsZW5kYXItLT5cclxuICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiJ21vbnRoJ1wiIGNsYXNzPVwiYnMtbWVkaWEtY29udGFpbmVyXCI+XHJcbiAgICAgICAgPGJzLW1vbnRoLWNhbGVuZGFyLXZpZXdcclxuICAgICAgICAgICpuZ0Zvcj1cImxldCBjYWxlbmRhciBvZiBtb250aHNDYWxlbmRhciB8IGFzeW5jXCJcclxuICAgICAgICAgIFtjbGFzcy5icy1kYXRlcGlja2VyLW11bHRpcGxlXT1cIm11bHRpcGxlQ2FsZW5kYXJzXCJcclxuICAgICAgICAgIFtjYWxlbmRhcl09XCJjYWxlbmRhclwiXHJcbiAgICAgICAgICAob25OYXZpZ2F0ZSk9XCJuYXZpZ2F0ZVRvKCRldmVudClcIlxyXG4gICAgICAgICAgKG9uVmlld01vZGUpPVwic2V0Vmlld01vZGUoJGV2ZW50KVwiXHJcbiAgICAgICAgICAob25Ib3Zlcik9XCJtb250aEhvdmVySGFuZGxlcigkZXZlbnQpXCJcclxuICAgICAgICAgIChvblNlbGVjdCk9XCJtb250aFNlbGVjdEhhbmRsZXIoJGV2ZW50KVwiPlxyXG4gICAgICAgIDwvYnMtbW9udGgtY2FsZW5kYXItdmlldz5cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICA8IS0teWVhcnMgY2FsZW5kYXItLT5cclxuICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiJ3llYXInXCIgY2xhc3M9XCJicy1tZWRpYS1jb250YWluZXJcIj5cclxuICAgICAgICA8YnMteWVhcnMtY2FsZW5kYXItdmlld1xyXG4gICAgICAgICAgKm5nRm9yPVwibGV0IGNhbGVuZGFyIG9mIHllYXJzQ2FsZW5kYXIgfCBhc3luY1wiXHJcbiAgICAgICAgICBbY2xhc3MuYnMtZGF0ZXBpY2tlci1tdWx0aXBsZV09XCJtdWx0aXBsZUNhbGVuZGFyc1wiXHJcbiAgICAgICAgICBbY2FsZW5kYXJdPVwiY2FsZW5kYXJcIlxyXG4gICAgICAgICAgKG9uTmF2aWdhdGUpPVwibmF2aWdhdGVUbygkZXZlbnQpXCJcclxuICAgICAgICAgIChvblZpZXdNb2RlKT1cInNldFZpZXdNb2RlKCRldmVudClcIlxyXG4gICAgICAgICAgKG9uSG92ZXIpPVwieWVhckhvdmVySGFuZGxlcigkZXZlbnQpXCJcclxuICAgICAgICAgIChvblNlbGVjdCk9XCJ5ZWFyU2VsZWN0SGFuZGxlcigkZXZlbnQpXCI+XHJcbiAgICAgICAgPC9icy15ZWFycy1jYWxlbmRhci12aWV3PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDwhLS1hcHBseWNhbmNlbCBidXR0b25zLS0+XHJcbiAgICA8ZGl2IGNsYXNzPVwiYnMtZGF0ZXBpY2tlci1idXR0b25zXCIgKm5nSWY9XCJmYWxzZVwiPlxyXG4gICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1zdWNjZXNzXCIgdHlwZT1cImJ1dHRvblwiPkFwcGx5PC9idXR0b24+XHJcbiAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIiB0eXBlPVwiYnV0dG9uXCI+Q2FuY2VsPC9idXR0b24+XHJcbiAgICA8L2Rpdj5cclxuXHJcbiAgICA8ZGl2IGNsYXNzPVwiYnMtZGF0ZXBpY2tlci1idXR0b25zXCIgKm5nSWY9XCJzaG93VG9kYXlCdG4gfHwgc2hvd0NsZWFyQnRuXCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJidG4tdG9kYXktd3JhcHBlclwiXHJcbiAgICAgICAgICAgW2NsYXNzLnRvZGF5LWxlZnRdPVwidG9kYXlQb3MgPT09ICdsZWZ0J1wiXHJcbiAgICAgICAgICAgW2NsYXNzLnRvZGF5LXJpZ2h0XT1cInRvZGF5UG9zID09PSAncmlnaHQnXCJcclxuICAgICAgICAgICBbY2xhc3MudG9kYXktY2VudGVyXT1cInRvZGF5UG9zID09PSAnY2VudGVyJ1wiXHJcbiAgICAgICAgICAgKm5nSWY9XCJzaG93VG9kYXlCdG5cIj5cclxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1zdWNjZXNzXCIgKGNsaWNrKT1cInNldFRvZGF5KClcIj57e3RvZGF5QnRuTGJsfX08L2J1dHRvbj5cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJidG4tY2xlYXItd3JhcHBlclwiXHJcbiAgICAgICAgW2NsYXNzLmNsZWFyLWxlZnRdPVwiY2xlYXJQb3MgPT09ICdsZWZ0J1wiXHJcbiAgICAgICAgW2NsYXNzLmNsZWFyLXJpZ2h0XT1cImNsZWFyUG9zID09PSAncmlnaHQnXCJcclxuICAgICAgICBbY2xhc3MuY2xlYXItY2VudGVyXT1cImNsZWFyUG9zID09PSAnY2VudGVyJ1wiXHJcbiAgICAgICAgKm5nSWY9XCJzaG93Q2xlYXJCdG5cIj5cclxuICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXN1Y2Nlc3NcIiAoY2xpY2spPVwiY2xlYXJEYXRlKClcIj57e2NsZWFyQnRuTGJsfX08L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG5cclxuICA8L2Rpdj5cclxuXHJcbiAgPCEtLWN1c3RvbSBkYXRlcyBvciBkYXRlIHJhbmdlcyBwaWNrZXItLT5cclxuICA8ZGl2IGNsYXNzPVwiYnMtZGF0ZXBpY2tlci1jdXN0b20tcmFuZ2VcIiAqbmdJZj1cImN1c3RvbVJhbmdlcyAmJiBjdXN0b21SYW5nZXMubGVuZ3RoID4gMFwiPlxyXG4gICAgPGJzLWN1c3RvbS1kYXRlLXZpZXdcclxuICAgICAgW3NlbGVjdGVkUmFuZ2VdPVwiY2hvc2VuUmFuZ2VcIlxyXG4gICAgICBbcmFuZ2VzXT1cImN1c3RvbVJhbmdlc1wiXHJcbiAgICAgIFtjdXN0b21SYW5nZUxhYmVsXT1cImN1c3RvbVJhbmdlQnRuTGJsXCJcclxuICAgICAgKG9uU2VsZWN0KT1cInNldFJhbmdlT25DYWxlbmRhcigkZXZlbnQpXCI+XHJcbiAgICA8L2JzLWN1c3RvbS1kYXRlLXZpZXc+XHJcbiAgPC9kaXY+XHJcbjwvZGl2PlxyXG4iXX0=