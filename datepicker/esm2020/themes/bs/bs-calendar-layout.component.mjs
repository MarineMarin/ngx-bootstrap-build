import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./bs-current-date-view.component";
import * as i2 from "./bs-timepicker-view.component";
import * as i3 from "@angular/common";
export class BsCalendarLayoutComponent {
}
BsCalendarLayoutComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: BsCalendarLayoutComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
BsCalendarLayoutComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.1", type: BsCalendarLayoutComponent, selector: "bs-calendar-layout", ngImport: i0, template: `
    <!-- current date, will be added in nearest releases -->
    <bs-current-date title="hey there" *ngIf="false"></bs-current-date>

    <!--navigation-->
    <div class="bs-datepicker-head">
      <ng-content select="bs-datepicker-navigation-view"></ng-content>
    </div>

    <div class="bs-datepicker-body">
      <ng-content></ng-content>
    </div>

    <!--timepicker-->
    <bs-timepicker *ngIf="false"></bs-timepicker>
  `, isInline: true, components: [{ type: i1.BsCurrentDateViewComponent, selector: "bs-current-date", inputs: ["title"] }, { type: i2.BsTimepickerViewComponent, selector: "bs-timepicker" }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: BsCalendarLayoutComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'bs-calendar-layout',
                    template: `
    <!-- current date, will be added in nearest releases -->
    <bs-current-date title="hey there" *ngIf="false"></bs-current-date>

    <!--navigation-->
    <div class="bs-datepicker-head">
      <ng-content select="bs-datepicker-navigation-view"></ng-content>
    </div>

    <div class="bs-datepicker-body">
      <ng-content></ng-content>
    </div>

    <!--timepicker-->
    <bs-timepicker *ngIf="false"></bs-timepicker>
  `
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnMtY2FsZW5kYXItbGF5b3V0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9kYXRlcGlja2VyL3RoZW1lcy9icy9icy1jYWxlbmRhci1sYXlvdXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7O0FBcUIxQyxNQUFNLE9BQU8seUJBQXlCOztzSEFBekIseUJBQXlCOzBHQUF6Qix5QkFBeUIsMERBakIxQjs7Ozs7Ozs7Ozs7Ozs7O0dBZVQ7MkZBRVUseUJBQXlCO2tCQW5CckMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsb0JBQW9CO29CQUM5QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7OztHQWVUO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2JzLWNhbGVuZGFyLWxheW91dCcsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDwhLS0gY3VycmVudCBkYXRlLCB3aWxsIGJlIGFkZGVkIGluIG5lYXJlc3QgcmVsZWFzZXMgLS0+XHJcbiAgICA8YnMtY3VycmVudC1kYXRlIHRpdGxlPVwiaGV5IHRoZXJlXCIgKm5nSWY9XCJmYWxzZVwiPjwvYnMtY3VycmVudC1kYXRlPlxyXG5cclxuICAgIDwhLS1uYXZpZ2F0aW9uLS0+XHJcbiAgICA8ZGl2IGNsYXNzPVwiYnMtZGF0ZXBpY2tlci1oZWFkXCI+XHJcbiAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImJzLWRhdGVwaWNrZXItbmF2aWdhdGlvbi12aWV3XCI+PC9uZy1jb250ZW50PlxyXG4gICAgPC9kaXY+XHJcblxyXG4gICAgPGRpdiBjbGFzcz1cImJzLWRhdGVwaWNrZXItYm9keVwiPlxyXG4gICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XHJcbiAgICA8L2Rpdj5cclxuXHJcbiAgICA8IS0tdGltZXBpY2tlci0tPlxyXG4gICAgPGJzLXRpbWVwaWNrZXIgKm5nSWY9XCJmYWxzZVwiPjwvYnMtdGltZXBpY2tlcj5cclxuICBgXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBCc0NhbGVuZGFyTGF5b3V0Q29tcG9uZW50IHt9XHJcbiJdfQ==