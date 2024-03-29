import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class BsCustomDatesViewComponent {
    constructor() {
        this.onSelect = new EventEmitter();
    }
    selectFromRanges(range) {
        this.onSelect.emit(range);
    }
}
BsCustomDatesViewComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: BsCustomDatesViewComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
BsCustomDatesViewComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.1", type: BsCustomDatesViewComponent, selector: "bs-custom-date-view", inputs: { ranges: "ranges", selectedRange: "selectedRange", customRangeLabel: "customRangeLabel" }, outputs: { onSelect: "onSelect" }, ngImport: i0, template: `
    <div class="bs-datepicker-predefined-btns">
      <button *ngFor="let range of ranges"
        type="button"
        class="btn"
        (click)="selectFromRanges(range)"
        [class.selected]="range.value === selectedRange">
        {{ range.label }}
      </button>
    </div>
  `, isInline: true, directives: [{ type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: BsCustomDatesViewComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'bs-custom-date-view',
                    template: `
    <div class="bs-datepicker-predefined-btns">
      <button *ngFor="let range of ranges"
        type="button"
        class="btn"
        (click)="selectFromRanges(range)"
        [class.selected]="range.value === selectedRange">
        {{ range.label }}
      </button>
    </div>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], propDecorators: { ranges: [{
                type: Input
            }], selectedRange: [{
                type: Input
            }], customRangeLabel: [{
                type: Input
            }], onSelect: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnMtY3VzdG9tLWRhdGVzLXZpZXcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2RhdGVwaWNrZXIvdGhlbWVzL2JzL2JzLWN1c3RvbS1kYXRlcy12aWV3LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLHVCQUF1QixFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFzQmhHLE1BQU0sT0FBTywwQkFBMEI7SUFmdkM7UUFtQlksYUFBUSxHQUFHLElBQUksWUFBWSxFQUFpQixDQUFDO0tBS3hEO0lBSEMsZ0JBQWdCLENBQUMsS0FBcUI7UUFDcEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUIsQ0FBQzs7dUhBUlUsMEJBQTBCOzJHQUExQiwwQkFBMEIsa01BYjNCOzs7Ozs7Ozs7O0dBVVQ7MkZBR1UsMEJBQTBCO2tCQWZ0QyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxxQkFBcUI7b0JBQy9CLFFBQVEsRUFBRTs7Ozs7Ozs7OztHQVVUO29CQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2lCQUNoRDs4QkFFVSxNQUFNO3NCQUFkLEtBQUs7Z0JBQ0csYUFBYTtzQkFBckIsS0FBSztnQkFDRyxnQkFBZ0I7c0JBQXhCLEtBQUs7Z0JBQ0ksUUFBUTtzQkFBakIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBCc0N1c3RvbURhdGVzIHtcclxuICBsYWJlbDogc3RyaW5nO1xyXG4gIHZhbHVlOiBEYXRlIHwgRGF0ZVtdO1xyXG59XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2JzLWN1c3RvbS1kYXRlLXZpZXcnLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8ZGl2IGNsYXNzPVwiYnMtZGF0ZXBpY2tlci1wcmVkZWZpbmVkLWJ0bnNcIj5cclxuICAgICAgPGJ1dHRvbiAqbmdGb3I9XCJsZXQgcmFuZ2Ugb2YgcmFuZ2VzXCJcclxuICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICBjbGFzcz1cImJ0blwiXHJcbiAgICAgICAgKGNsaWNrKT1cInNlbGVjdEZyb21SYW5nZXMocmFuZ2UpXCJcclxuICAgICAgICBbY2xhc3Muc2VsZWN0ZWRdPVwicmFuZ2UudmFsdWUgPT09IHNlbGVjdGVkUmFuZ2VcIj5cclxuICAgICAgICB7eyByYW5nZS5sYWJlbCB9fVxyXG4gICAgICA8L2J1dHRvbj5cclxuICAgIDwvZGl2PlxyXG4gIGAsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIEJzQ3VzdG9tRGF0ZXNWaWV3Q29tcG9uZW50IHtcclxuICBASW5wdXQoKSByYW5nZXM/OiBCc0N1c3RvbURhdGVzW107XHJcbiAgQElucHV0KCkgc2VsZWN0ZWRSYW5nZT86IERhdGVbXTtcclxuICBASW5wdXQoKSBjdXN0b21SYW5nZUxhYmVsPzogc3RyaW5nO1xyXG4gIEBPdXRwdXQoKSBvblNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXI8QnNDdXN0b21EYXRlcz4oKTtcclxuXHJcbiAgc2VsZWN0RnJvbVJhbmdlcyhyYW5nZT86IEJzQ3VzdG9tRGF0ZXMpIHtcclxuICAgIHRoaXMub25TZWxlY3QuZW1pdChyYW5nZSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==