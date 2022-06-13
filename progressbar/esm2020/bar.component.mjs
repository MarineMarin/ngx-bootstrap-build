import { ChangeDetectionStrategy, Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { isBs3 } from 'ngx-bootstrap/utils';
import * as i0 from "@angular/core";
export class BarComponent {
    constructor(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        /** maximum total value of progress element */
        this.max = 100;
        /** current value of progress bar */
        this.value = 0;
        /** if `true` changing value of progress bar will be animated */
        this.animate = false;
        /** If `true`, striped classes are applied */
        this.striped = false;
        /** provide one of the four supported contextual classes: `success`, `info`, `warning`, `danger` */
        this.type = 'info';
        this.percent = 100;
    }
    get isBs3() {
        return isBs3();
    }
    ngOnChanges(changes) {
        if (changes["value"] || changes["max"]) {
            this.percent = 100 * (Number(changes["value"]?.currentValue || this.value)
                / Number((changes["max"]?.currentValue || this.max) || 100));
        }
        if (changes["type"]) {
            this.applyTypeClasses();
        }
    }
    applyTypeClasses() {
        if (this._prevType) {
            const barTypeClass = `progress-bar-${this._prevType}`;
            const bgClass = `bg-${this._prevType}`;
            this.renderer.removeClass(this.el.nativeElement, barTypeClass);
            this.renderer.removeClass(this.el.nativeElement, bgClass);
            this._prevType = void 0;
        }
        if (this.type) {
            const barTypeClass = `progress-bar-${this.type}`;
            const bgClass = `bg-${this.type}`;
            this.renderer.addClass(this.el.nativeElement, barTypeClass);
            this.renderer.addClass(this.el.nativeElement, bgClass);
            this._prevType = this.type;
        }
    }
}
BarComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: BarComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
BarComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.1", type: BarComponent, selector: "bar", inputs: { max: "max", value: "value", animate: "animate", striped: "striped", type: "type" }, host: { attributes: { "role": "progressbar", "aria-valuemin": "0" }, properties: { "class.progress-bar": "true", "class.progress-bar-animated": "!isBs3 && animate", "class.progress-bar-striped": "striped", "class.active": "isBs3 && animate", "attr.aria-valuenow": "value", "attr.aria-valuetext": "percent ? percent.toFixed(0) + \"%\" : \"\"", "attr.aria-valuemax": "max", "style.height.%": "\"100\"", "style.width.%": "percent" } }, usesOnChanges: true, ngImport: i0, template: "<ng-content></ng-content>\r\n", changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: BarComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bar', changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        role: 'progressbar',
                        'aria-valuemin': '0',
                        '[class.progress-bar]': 'true',
                        '[class.progress-bar-animated]': '!isBs3 && animate',
                        '[class.progress-bar-striped]': 'striped',
                        '[class.active]': 'isBs3 && animate',
                        '[attr.aria-valuenow]': 'value',
                        '[attr.aria-valuetext]': 'percent ? percent.toFixed(0) + "%" : ""',
                        '[attr.aria-valuemax]': 'max',
                        '[style.height.%]': '"100"',
                        '[style.width.%]': 'percent'
                    }, template: "<ng-content></ng-content>\r\n" }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }]; }, propDecorators: { max: [{
                type: Input
            }], value: [{
                type: Input
            }], animate: [{
                type: Input
            }], striped: [{
                type: Input
            }], type: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9wcm9ncmVzc2Jhci9iYXIuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vc3JjL3Byb2dyZXNzYmFyL2Jhci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsS0FBSyxFQUVMLFNBQVMsRUFFVixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0scUJBQXFCLENBQUM7O0FBc0I1QyxNQUFNLE9BQU8sWUFBWTtJQXdCdkIsWUFDVSxFQUFjLEVBQ2QsUUFBbUI7UUFEbkIsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUNkLGFBQVEsR0FBUixRQUFRLENBQVc7UUF6QjdCLDhDQUE4QztRQUNyQyxRQUFHLEdBQUcsR0FBRyxDQUFDO1FBRW5CLG9DQUFvQztRQUMzQixVQUFLLEdBQUksQ0FBQyxDQUFDO1FBRXBCLGdFQUFnRTtRQUN2RCxZQUFPLEdBQUksS0FBSyxDQUFDO1FBRTFCLDZDQUE2QztRQUNwQyxZQUFPLEdBQUksS0FBSyxDQUFDO1FBRTFCLG1HQUFtRztRQUMxRixTQUFJLEdBQXFCLE1BQU0sQ0FBQztRQUV6QyxZQUFPLEdBQUcsR0FBRyxDQUFDO0lBV1gsQ0FBQztJQVRKLElBQUksS0FBSztRQUNQLE9BQU8sS0FBSyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQVNELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDdEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLFlBQVksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDO2tCQUN0RSxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsWUFBWSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ2hFO1FBRUQsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDbkIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7U0FDekI7SUFDSCxDQUFDO0lBRU8sZ0JBQWdCO1FBQ3RCLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNsQixNQUFNLFlBQVksR0FBRyxnQkFBZ0IsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ3RELE1BQU0sT0FBTyxHQUFHLE1BQU0sSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLFlBQVksQ0FBQyxDQUFDO1lBQy9ELElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQzFELElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLENBQUM7U0FDekI7UUFFRCxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDYixNQUFNLFlBQVksR0FBRyxnQkFBZ0IsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2pELE1BQU0sT0FBTyxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2xDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLFlBQVksQ0FBQyxDQUFDO1lBQzVELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ3ZELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztTQUM1QjtJQUNILENBQUM7O3lHQXhEVSxZQUFZOzZGQUFaLFlBQVksK2tCQ2hDekIsK0JBQ0E7MkZEK0JhLFlBQVk7a0JBbkJ4QixTQUFTOytCQUNFLEtBQUssbUJBRUUsdUJBQXVCLENBQUMsTUFBTSxRQUV6Qzt3QkFDSixJQUFJLEVBQUUsYUFBYTt3QkFDbkIsZUFBZSxFQUFFLEdBQUc7d0JBQ3BCLHNCQUFzQixFQUFFLE1BQU07d0JBQzlCLCtCQUErQixFQUFFLG1CQUFtQjt3QkFDcEQsOEJBQThCLEVBQUUsU0FBUzt3QkFDekMsZ0JBQWdCLEVBQUUsa0JBQWtCO3dCQUNwQyxzQkFBc0IsRUFBRSxPQUFPO3dCQUMvQix1QkFBdUIsRUFBRSx5Q0FBeUM7d0JBQ2xFLHNCQUFzQixFQUFFLEtBQUs7d0JBQzdCLGtCQUFrQixFQUFFLE9BQU87d0JBQzNCLGlCQUFpQixFQUFFLFNBQVM7cUJBQzdCO3lIQUlRLEdBQUc7c0JBQVgsS0FBSztnQkFHRyxLQUFLO3NCQUFiLEtBQUs7Z0JBR0csT0FBTztzQkFBZixLQUFLO2dCQUdHLE9BQU87c0JBQWYsS0FBSztnQkFHRyxJQUFJO3NCQUFaLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIENvbXBvbmVudCxcclxuICBFbGVtZW50UmVmLFxyXG4gIElucHV0LFxyXG4gIE9uQ2hhbmdlcyxcclxuICBSZW5kZXJlcjIsXHJcbiAgU2ltcGxlQ2hhbmdlc1xyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgaXNCczMgfSBmcm9tICduZ3gtYm9vdHN0cmFwL3V0aWxzJztcclxuaW1wb3J0IHsgUHJvZ3Jlc3NiYXJUeXBlIH0gZnJvbSAnLi9wcm9ncmVzc2Jhci10eXBlLmludGVyZmFjZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2JhcicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2Jhci5jb21wb25lbnQuaHRtbCcsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9uby1ob3N0LW1ldGFkYXRhLXByb3BlcnR5XHJcbiAgaG9zdDoge1xyXG4gICAgcm9sZTogJ3Byb2dyZXNzYmFyJyxcclxuICAgICdhcmlhLXZhbHVlbWluJzogJzAnLFxyXG4gICAgJ1tjbGFzcy5wcm9ncmVzcy1iYXJdJzogJ3RydWUnLFxyXG4gICAgJ1tjbGFzcy5wcm9ncmVzcy1iYXItYW5pbWF0ZWRdJzogJyFpc0JzMyAmJiBhbmltYXRlJyxcclxuICAgICdbY2xhc3MucHJvZ3Jlc3MtYmFyLXN0cmlwZWRdJzogJ3N0cmlwZWQnLFxyXG4gICAgJ1tjbGFzcy5hY3RpdmVdJzogJ2lzQnMzICYmIGFuaW1hdGUnLFxyXG4gICAgJ1thdHRyLmFyaWEtdmFsdWVub3ddJzogJ3ZhbHVlJyxcclxuICAgICdbYXR0ci5hcmlhLXZhbHVldGV4dF0nOiAncGVyY2VudCA/IHBlcmNlbnQudG9GaXhlZCgwKSArIFwiJVwiIDogXCJcIicsXHJcbiAgICAnW2F0dHIuYXJpYS12YWx1ZW1heF0nOiAnbWF4JyxcclxuICAgICdbc3R5bGUuaGVpZ2h0LiVdJzogJ1wiMTAwXCInLFxyXG4gICAgJ1tzdHlsZS53aWR0aC4lXSc6ICdwZXJjZW50J1xyXG4gIH1cclxufSlcclxuZXhwb3J0IGNsYXNzIEJhckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XHJcbiAgLyoqIG1heGltdW0gdG90YWwgdmFsdWUgb2YgcHJvZ3Jlc3MgZWxlbWVudCAqL1xyXG4gIEBJbnB1dCgpIG1heCA9IDEwMDtcclxuXHJcbiAgLyoqIGN1cnJlbnQgdmFsdWUgb2YgcHJvZ3Jlc3MgYmFyICovXHJcbiAgQElucHV0KCkgdmFsdWU/ID0gMDtcclxuXHJcbiAgLyoqIGlmIGB0cnVlYCBjaGFuZ2luZyB2YWx1ZSBvZiBwcm9ncmVzcyBiYXIgd2lsbCBiZSBhbmltYXRlZCAqL1xyXG4gIEBJbnB1dCgpIGFuaW1hdGU/ID0gZmFsc2U7XHJcblxyXG4gIC8qKiBJZiBgdHJ1ZWAsIHN0cmlwZWQgY2xhc3NlcyBhcmUgYXBwbGllZCAqL1xyXG4gIEBJbnB1dCgpIHN0cmlwZWQ/ID0gZmFsc2U7XHJcblxyXG4gIC8qKiBwcm92aWRlIG9uZSBvZiB0aGUgZm91ciBzdXBwb3J0ZWQgY29udGV4dHVhbCBjbGFzc2VzOiBgc3VjY2Vzc2AsIGBpbmZvYCwgYHdhcm5pbmdgLCBgZGFuZ2VyYCAqL1xyXG4gIEBJbnB1dCgpIHR5cGU/OiBQcm9ncmVzc2JhclR5cGUgPSAnaW5mbyc7XHJcblxyXG4gIHBlcmNlbnQgPSAxMDA7XHJcblxyXG4gIGdldCBpc0JzMygpOiBib29sZWFuIHtcclxuICAgIHJldHVybiBpc0JzMygpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfcHJldlR5cGU/OiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBlbDogRWxlbWVudFJlZixcclxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMlxyXG4gICkge31cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xyXG4gICAgaWYgKGNoYW5nZXNbXCJ2YWx1ZVwiXSB8fCBjaGFuZ2VzW1wibWF4XCJdKSB7XHJcbiAgICAgIHRoaXMucGVyY2VudCA9IDEwMCAqIChOdW1iZXIoY2hhbmdlc1tcInZhbHVlXCJdPy5jdXJyZW50VmFsdWUgfHwgdGhpcy52YWx1ZSlcclxuICAgICAgICAvIE51bWJlcigoY2hhbmdlc1tcIm1heFwiXT8uY3VycmVudFZhbHVlIHx8IHRoaXMubWF4KSB8fCAxMDApKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY2hhbmdlc1tcInR5cGVcIl0pIHtcclxuICAgICAgdGhpcy5hcHBseVR5cGVDbGFzc2VzKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFwcGx5VHlwZUNsYXNzZXMoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5fcHJldlR5cGUpIHtcclxuICAgICAgY29uc3QgYmFyVHlwZUNsYXNzID0gYHByb2dyZXNzLWJhci0ke3RoaXMuX3ByZXZUeXBlfWA7XHJcbiAgICAgIGNvbnN0IGJnQ2xhc3MgPSBgYmctJHt0aGlzLl9wcmV2VHlwZX1gO1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgYmFyVHlwZUNsYXNzKTtcclxuICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsIGJnQ2xhc3MpO1xyXG4gICAgICB0aGlzLl9wcmV2VHlwZSA9IHZvaWQgMDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy50eXBlKSB7XHJcbiAgICAgIGNvbnN0IGJhclR5cGVDbGFzcyA9IGBwcm9ncmVzcy1iYXItJHt0aGlzLnR5cGV9YDtcclxuICAgICAgY29uc3QgYmdDbGFzcyA9IGBiZy0ke3RoaXMudHlwZX1gO1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgYmFyVHlwZUNsYXNzKTtcclxuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsIGJnQ2xhc3MpO1xyXG4gICAgICB0aGlzLl9wcmV2VHlwZSA9IHRoaXMudHlwZTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxyXG4iXX0=