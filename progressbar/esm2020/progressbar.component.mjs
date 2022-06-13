import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ProgressbarConfig } from './progressbar.config';
import * as i0 from "@angular/core";
import * as i1 from "./progressbar.config";
import * as i2 from "./bar.component";
import * as i3 from "@angular/common";
export class ProgressbarComponent {
    constructor(config) {
        /** maximum total value of progress element */
        this.max = 100;
        /** if `true` changing value of progress bar will be animated */
        this.animate = false;
        /** If `true`, striped classes are applied */
        this.striped = false;
        this.isStacked = false;
        this._value = 0;
        Object.assign(this, config);
    }
    /** current value of progress bar. Could be a number or array of objects
     * like {"value":15,"type":"info","label":"15 %"}
     */
    set value(value) {
        this.isStacked = Array.isArray(value);
        if (typeof value === 'number') {
            this._value = value;
            this._values = void 0;
        }
        else {
            this._value = void 0;
            this._values = value;
        }
    }
}
ProgressbarComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: ProgressbarComponent, deps: [{ token: i1.ProgressbarConfig }], target: i0.ɵɵFactoryTarget.Component });
ProgressbarComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.1", type: ProgressbarComponent, selector: "progressbar", inputs: { max: "max", animate: "animate", striped: "striped", type: "type", value: "value" }, host: { properties: { "class.progress": "true", "attr.max": "max" } }, ngImport: i0, template: "<ng-container *ngIf=\"!isStacked then NotStacked else Stacked\"></ng-container>\r\n\r\n<ng-template #NotStacked>\r\n  <bar [type]=\"type\" [value]=\"_value\" [max]=\"max\" [animate]=\"animate\" [striped]=\"striped\">\r\n    <ng-content></ng-content>\r\n  </bar>\r\n</ng-template>\r\n\r\n<ng-template #Stacked>\r\n  <bar *ngFor=\"let item of _values\"\r\n       [type]=\"item.type\" [value]=\"item.value\" [max]=\"item.max || max\" [animate]=\"animate\" [striped]=\"striped\">{{ item.label }}</bar>\r\n</ng-template>\r\n", styles: [":host{width:100%;display:flex}\n"], components: [{ type: i2.BarComponent, selector: "bar", inputs: ["max", "value", "animate", "striped", "type"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: ProgressbarComponent, decorators: [{
            type: Component,
            args: [{ selector: 'progressbar', changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '[class.progress]': 'true',
                        '[attr.max]': 'max'
                    }, styles: [`
    :host {
      width: 100%;
      display: flex;
    } `], template: "<ng-container *ngIf=\"!isStacked then NotStacked else Stacked\"></ng-container>\r\n\r\n<ng-template #NotStacked>\r\n  <bar [type]=\"type\" [value]=\"_value\" [max]=\"max\" [animate]=\"animate\" [striped]=\"striped\">\r\n    <ng-content></ng-content>\r\n  </bar>\r\n</ng-template>\r\n\r\n<ng-template #Stacked>\r\n  <bar *ngFor=\"let item of _values\"\r\n       [type]=\"item.type\" [value]=\"item.value\" [max]=\"item.max || max\" [animate]=\"animate\" [striped]=\"striped\">{{ item.label }}</bar>\r\n</ng-template>\r\n" }]
        }], ctorParameters: function () { return [{ type: i1.ProgressbarConfig }]; }, propDecorators: { max: [{
                type: Input
            }], animate: [{
                type: Input
            }], striped: [{
                type: Input
            }], type: [{
                type: Input
            }], value: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3NiYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3Byb2dyZXNzYmFyL3Byb2dyZXNzYmFyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uL3NyYy9wcm9ncmVzc2Jhci9wcm9ncmVzc2Jhci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUxRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7Ozs7QUFpQnpELE1BQU0sT0FBTyxvQkFBb0I7SUFnQy9CLFlBQVksTUFBeUI7UUEvQnJDLDhDQUE4QztRQUNyQyxRQUFHLEdBQUcsR0FBRyxDQUFDO1FBRW5CLGdFQUFnRTtRQUN2RCxZQUFPLEdBQUcsS0FBSyxDQUFDO1FBRXpCLDZDQUE2QztRQUNwQyxZQUFPLEdBQUcsS0FBSyxDQUFDO1FBb0J6QixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLFdBQU0sR0FBSSxDQUFDLENBQUM7UUFJVixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBckJEOztPQUVHO0lBQ0gsSUFDSSxLQUFLLENBQUMsS0FBMEI7UUFDbEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3RDLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1lBQzdCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLENBQUM7U0FDdkI7YUFBTTtZQUNMLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7U0FDdEI7SUFDSCxDQUFDOztpSEExQlUsb0JBQW9CO3FHQUFwQixvQkFBb0Isd05DbkJqQyx5Z0JBWUE7MkZET2Esb0JBQW9CO2tCQWZoQyxTQUFTOytCQUNFLGFBQWEsbUJBRU4sdUJBQXVCLENBQUMsTUFBTSxRQUV6Qzt3QkFDSixrQkFBa0IsRUFBRSxNQUFNO3dCQUMxQixZQUFZLEVBQUUsS0FBSztxQkFDcEIsVUFDTyxDQUFDOzs7O09BSUosQ0FBQzt3R0FJRyxHQUFHO3NCQUFYLEtBQUs7Z0JBR0csT0FBTztzQkFBZixLQUFLO2dCQUdHLE9BQU87c0JBQWYsS0FBSztnQkFHRyxJQUFJO3NCQUFaLEtBQUs7Z0JBTUYsS0FBSztzQkFEUixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQmFyVmFsdWUsIFByb2dyZXNzYmFyVHlwZSB9IGZyb20gJy4vcHJvZ3Jlc3NiYXItdHlwZS5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBQcm9ncmVzc2JhckNvbmZpZyB9IGZyb20gJy4vcHJvZ3Jlc3NiYXIuY29uZmlnJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAncHJvZ3Jlc3NiYXInLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9wcm9ncmVzc2Jhci5jb21wb25lbnQuaHRtbCcsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9uby1ob3N0LW1ldGFkYXRhLXByb3BlcnR5XHJcbiAgaG9zdDoge1xyXG4gICAgJ1tjbGFzcy5wcm9ncmVzc10nOiAndHJ1ZScsXHJcbiAgICAnW2F0dHIubWF4XSc6ICdtYXgnXHJcbiAgfSxcclxuICBzdHlsZXM6IFtgXHJcbiAgICA6aG9zdCB7XHJcbiAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgfSBgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgUHJvZ3Jlc3NiYXJDb21wb25lbnQge1xyXG4gIC8qKiBtYXhpbXVtIHRvdGFsIHZhbHVlIG9mIHByb2dyZXNzIGVsZW1lbnQgKi9cclxuICBASW5wdXQoKSBtYXggPSAxMDA7XHJcblxyXG4gIC8qKiBpZiBgdHJ1ZWAgY2hhbmdpbmcgdmFsdWUgb2YgcHJvZ3Jlc3MgYmFyIHdpbGwgYmUgYW5pbWF0ZWQgKi9cclxuICBASW5wdXQoKSBhbmltYXRlID0gZmFsc2U7XHJcblxyXG4gIC8qKiBJZiBgdHJ1ZWAsIHN0cmlwZWQgY2xhc3NlcyBhcmUgYXBwbGllZCAqL1xyXG4gIEBJbnB1dCgpIHN0cmlwZWQgPSBmYWxzZTtcclxuXHJcbiAgLyoqIHByb3ZpZGUgb25lIG9mIHRoZSBmb3VyIHN1cHBvcnRlZCBjb250ZXh0dWFsIGNsYXNzZXM6IGBzdWNjZXNzYCwgYGluZm9gLCBgd2FybmluZ2AsIGBkYW5nZXJgICovXHJcbiAgQElucHV0KCkgdHlwZT86IFByb2dyZXNzYmFyVHlwZTtcclxuXHJcbiAgLyoqIGN1cnJlbnQgdmFsdWUgb2YgcHJvZ3Jlc3MgYmFyLiBDb3VsZCBiZSBhIG51bWJlciBvciBhcnJheSBvZiBvYmplY3RzXHJcbiAgICogbGlrZSB7XCJ2YWx1ZVwiOjE1LFwidHlwZVwiOlwiaW5mb1wiLFwibGFiZWxcIjpcIjE1ICVcIn1cclxuICAgKi9cclxuICBASW5wdXQoKVxyXG4gIHNldCB2YWx1ZSh2YWx1ZTogbnVtYmVyIHwgQmFyVmFsdWVbXSkge1xyXG4gICAgdGhpcy5pc1N0YWNrZWQgPSBBcnJheS5pc0FycmF5KHZhbHVlKTtcclxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XHJcbiAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XHJcbiAgICAgIHRoaXMuX3ZhbHVlcyA9IHZvaWQgMDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuX3ZhbHVlID0gdm9pZCAwO1xyXG4gICAgICB0aGlzLl92YWx1ZXMgPSB2YWx1ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlzU3RhY2tlZCA9IGZhbHNlO1xyXG4gIF92YWx1ZT8gPSAwO1xyXG4gIF92YWx1ZXM/OiBCYXJWYWx1ZVtdO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihjb25maWc6IFByb2dyZXNzYmFyQ29uZmlnKSB7XHJcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGNvbmZpZyk7XHJcbiAgfVxyXG59XHJcbiIsIjxuZy1jb250YWluZXIgKm5nSWY9XCIhaXNTdGFja2VkIHRoZW4gTm90U3RhY2tlZCBlbHNlIFN0YWNrZWRcIj48L25nLWNvbnRhaW5lcj5cclxuXHJcbjxuZy10ZW1wbGF0ZSAjTm90U3RhY2tlZD5cclxuICA8YmFyIFt0eXBlXT1cInR5cGVcIiBbdmFsdWVdPVwiX3ZhbHVlXCIgW21heF09XCJtYXhcIiBbYW5pbWF0ZV09XCJhbmltYXRlXCIgW3N0cmlwZWRdPVwic3RyaXBlZFwiPlxyXG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxyXG4gIDwvYmFyPlxyXG48L25nLXRlbXBsYXRlPlxyXG5cclxuPG5nLXRlbXBsYXRlICNTdGFja2VkPlxyXG4gIDxiYXIgKm5nRm9yPVwibGV0IGl0ZW0gb2YgX3ZhbHVlc1wiXHJcbiAgICAgICBbdHlwZV09XCJpdGVtLnR5cGVcIiBbdmFsdWVdPVwiaXRlbS52YWx1ZVwiIFttYXhdPVwiaXRlbS5tYXggfHwgbWF4XCIgW2FuaW1hdGVdPVwiYW5pbWF0ZVwiIFtzdHJpcGVkXT1cInN0cmlwZWRcIj57eyBpdGVtLmxhYmVsIH19PC9iYXI+XHJcbjwvbmctdGVtcGxhdGU+XHJcbiJdfQ==