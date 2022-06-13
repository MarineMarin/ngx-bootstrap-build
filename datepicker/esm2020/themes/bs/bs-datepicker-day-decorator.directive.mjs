import { ChangeDetectionStrategy, Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { BsDatepickerConfig } from '../../bs-datepicker.config';
import * as i0 from "@angular/core";
import * as i1 from "../../bs-datepicker.config";
export class BsDatepickerDayDecoratorComponent {
    constructor(_config, _elRef, _renderer) {
        this._config = _config;
        this._elRef = _elRef;
        this._renderer = _renderer;
        this.day = { date: new Date(), label: '' };
    }
    ngOnInit() {
        if (this.day?.isToday && this._config && this._config.customTodayClass) {
            this._renderer.addClass(this._elRef.nativeElement, this._config.customTodayClass);
        }
        if (typeof this.day?.customClasses === 'string') {
            this.day?.customClasses.split(' ')
                .filter((className) => className)
                .forEach((className) => {
                this._renderer.addClass(this._elRef.nativeElement, className);
            });
        }
    }
}
BsDatepickerDayDecoratorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: BsDatepickerDayDecoratorComponent, deps: [{ token: i1.BsDatepickerConfig }, { token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
BsDatepickerDayDecoratorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.1", type: BsDatepickerDayDecoratorComponent, selector: "[bsDatepickerDayDecorator]", inputs: { day: "day" }, host: { properties: { "class.disabled": "day.isDisabled", "class.is-highlighted": "day.isHovered", "class.is-other-month": "day.isOtherMonth", "class.is-active-other-month": "day.isOtherMonthHovered", "class.in-range": "day.isInRange", "class.select-start": "day.isSelectionStart", "class.select-end": "day.isSelectionEnd", "class.selected": "day.isSelected" } }, ngImport: i0, template: `{{ day && day.label || '' }}`, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: BsDatepickerDayDecoratorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: '[bsDatepickerDayDecorator]',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    host: {
                        '[class.disabled]': 'day.isDisabled',
                        '[class.is-highlighted]': 'day.isHovered',
                        '[class.is-other-month]': 'day.isOtherMonth',
                        '[class.is-active-other-month]': 'day.isOtherMonthHovered',
                        '[class.in-range]': 'day.isInRange',
                        '[class.select-start]': 'day.isSelectionStart',
                        '[class.select-end]': 'day.isSelectionEnd',
                        '[class.selected]': 'day.isSelected'
                    },
                    template: `{{ day && day.label || '' }}`
                }]
        }], ctorParameters: function () { return [{ type: i1.BsDatepickerConfig }, { type: i0.ElementRef }, { type: i0.Renderer2 }]; }, propDecorators: { day: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnMtZGF0ZXBpY2tlci1kYXktZGVjb3JhdG9yLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9kYXRlcGlja2VyL3RoZW1lcy9icy9icy1kYXRlcGlja2VyLWRheS1kZWNvcmF0b3IuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFVBQVUsRUFDVixLQUFLLEVBRUwsU0FBUyxFQUNWLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDOzs7QUFrQmhFLE1BQU0sT0FBTyxpQ0FBaUM7SUFHNUMsWUFDVSxPQUEyQixFQUMzQixNQUFrQixFQUNsQixTQUFvQjtRQUZwQixZQUFPLEdBQVAsT0FBTyxDQUFvQjtRQUMzQixXQUFNLEdBQU4sTUFBTSxDQUFZO1FBQ2xCLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFMckIsUUFBRyxHQUFpQixFQUFFLElBQUksRUFBRSxJQUFJLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsQ0FBQztJQU16RCxDQUFDO0lBRUwsUUFBUTtRQUVOLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRSxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFO1lBQ3RFLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztTQUNuRjtRQUVELElBQUksT0FBTyxJQUFJLENBQUMsR0FBRyxFQUFFLGFBQWEsS0FBSyxRQUFRLEVBQUU7WUFDL0MsSUFBSSxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztpQkFDL0IsTUFBTSxDQUFDLENBQUMsU0FBaUIsRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDO2lCQUN4QyxPQUFPLENBQUMsQ0FBQyxTQUFpQixFQUFFLEVBQUU7Z0JBQzdCLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQ2hFLENBQUMsQ0FBQyxDQUFDO1NBQ047SUFDSCxDQUFDOzs4SEF0QlUsaUNBQWlDO2tIQUFqQyxpQ0FBaUMsc2NBRmxDLDhCQUE4QjsyRkFFN0IsaUNBQWlDO2tCQWY3QyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSw0QkFBNEI7b0JBQ3RDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxJQUFJLEVBQUU7d0JBQ0osa0JBQWtCLEVBQUUsZ0JBQWdCO3dCQUNwQyx3QkFBd0IsRUFBRSxlQUFlO3dCQUN6Qyx3QkFBd0IsRUFBRSxrQkFBa0I7d0JBQzVDLCtCQUErQixFQUFFLHlCQUF5Qjt3QkFDMUQsa0JBQWtCLEVBQUUsZUFBZTt3QkFDbkMsc0JBQXNCLEVBQUUsc0JBQXNCO3dCQUM5QyxvQkFBb0IsRUFBRSxvQkFBb0I7d0JBQzFDLGtCQUFrQixFQUFFLGdCQUFnQjtxQkFDckM7b0JBQ0QsUUFBUSxFQUFFLDhCQUE4QjtpQkFDekM7MEpBRVUsR0FBRztzQkFBWCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBDb21wb25lbnQsXHJcbiAgRWxlbWVudFJlZixcclxuICBJbnB1dCxcclxuICBPbkluaXQsXHJcbiAgUmVuZGVyZXIyXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBCc0RhdGVwaWNrZXJDb25maWcgfSBmcm9tICcuLi8uLi9icy1kYXRlcGlja2VyLmNvbmZpZyc7XHJcbmltcG9ydCB7IERheVZpZXdNb2RlbCB9IGZyb20gJy4uLy4uL21vZGVscyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ1tic0RhdGVwaWNrZXJEYXlEZWNvcmF0b3JdJyxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICBob3N0OiB7XHJcbiAgICAnW2NsYXNzLmRpc2FibGVkXSc6ICdkYXkuaXNEaXNhYmxlZCcsXHJcbiAgICAnW2NsYXNzLmlzLWhpZ2hsaWdodGVkXSc6ICdkYXkuaXNIb3ZlcmVkJyxcclxuICAgICdbY2xhc3MuaXMtb3RoZXItbW9udGhdJzogJ2RheS5pc090aGVyTW9udGgnLFxyXG4gICAgJ1tjbGFzcy5pcy1hY3RpdmUtb3RoZXItbW9udGhdJzogJ2RheS5pc090aGVyTW9udGhIb3ZlcmVkJyxcclxuICAgICdbY2xhc3MuaW4tcmFuZ2VdJzogJ2RheS5pc0luUmFuZ2UnLFxyXG4gICAgJ1tjbGFzcy5zZWxlY3Qtc3RhcnRdJzogJ2RheS5pc1NlbGVjdGlvblN0YXJ0JyxcclxuICAgICdbY2xhc3Muc2VsZWN0LWVuZF0nOiAnZGF5LmlzU2VsZWN0aW9uRW5kJyxcclxuICAgICdbY2xhc3Muc2VsZWN0ZWRdJzogJ2RheS5pc1NlbGVjdGVkJ1xyXG4gIH0sXHJcbiAgdGVtcGxhdGU6IGB7eyBkYXkgJiYgZGF5LmxhYmVsIHx8ICcnIH19YFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQnNEYXRlcGlja2VyRGF5RGVjb3JhdG9yQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBASW5wdXQoKSBkYXk6IERheVZpZXdNb2RlbCA9IHsgZGF0ZTogbmV3IERhdGUoKSwgbGFiZWw6ICcnIH07XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBfY29uZmlnOiBCc0RhdGVwaWNrZXJDb25maWcsXHJcbiAgICBwcml2YXRlIF9lbFJlZjogRWxlbWVudFJlZixcclxuICAgIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjJcclxuICApIHsgfVxyXG5cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuXHJcbiAgICBpZiAodGhpcy5kYXk/LmlzVG9kYXkgJiYgdGhpcy5fY29uZmlnICYmIHRoaXMuX2NvbmZpZy5jdXN0b21Ub2RheUNsYXNzKSB7XHJcbiAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuX2VsUmVmLm5hdGl2ZUVsZW1lbnQsIHRoaXMuX2NvbmZpZy5jdXN0b21Ub2RheUNsYXNzKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodHlwZW9mIHRoaXMuZGF5Py5jdXN0b21DbGFzc2VzID09PSAnc3RyaW5nJykge1xyXG4gICAgICB0aGlzLmRheT8uY3VzdG9tQ2xhc3Nlcy5zcGxpdCgnICcpXHJcbiAgICAgICAgLmZpbHRlcigoY2xhc3NOYW1lOiBzdHJpbmcpID0+IGNsYXNzTmFtZSlcclxuICAgICAgICAuZm9yRWFjaCgoY2xhc3NOYW1lOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuX2VsUmVmLm5hdGl2ZUVsZW1lbnQsIGNsYXNzTmFtZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==