import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Renderer2 } from '@angular/core';
import { BsDropdownState } from './bs-dropdown.state';
import { isBs3 } from 'ngx-bootstrap/utils';
import { dropdownAnimation } from './dropdown-animations';
import { AnimationBuilder } from '@angular/animations';
import * as i0 from "@angular/core";
import * as i1 from "./bs-dropdown.state";
import * as i2 from "@angular/animations";
import * as i3 from "@angular/common";
// todo: revert ngClass to [class] when false positive angular-cli issue is fixed
//          [class.dropdown]="direction === 'down'"-->
export class BsDropdownContainerComponent {
    constructor(_state, cd, _renderer, _element, _builder) {
        this._state = _state;
        this.cd = cd;
        this._renderer = _renderer;
        this._element = _element;
        this.isOpen = false;
        this._factoryDropDownAnimation = _builder.build(dropdownAnimation);
        this._subscription = _state.isOpenChange.subscribe((value) => {
            this.isOpen = value;
            const dropdown = this._element.nativeElement.querySelector('.dropdown-menu');
            this._renderer.addClass(this._element.nativeElement.querySelector('div'), 'open');
            if (dropdown && !isBs3()) {
                this._renderer.addClass(dropdown, 'show');
                if (dropdown.classList.contains('dropdown-menu-right') || dropdown.classList.contains('dropdown-menu-end')) {
                    this._renderer.setStyle(dropdown, 'left', 'auto');
                    this._renderer.setStyle(dropdown, 'right', '0');
                }
                if (this.direction === 'up') {
                    this._renderer.setStyle(dropdown, 'top', 'auto');
                    this._renderer.setStyle(dropdown, 'transform', 'translateY(-101%)');
                }
            }
            if (dropdown && this._state.isAnimated) {
                this._factoryDropDownAnimation.create(dropdown)
                    .play();
            }
            this.cd.markForCheck();
            this.cd.detectChanges();
        });
    }
    get direction() {
        return this._state.direction;
    }
    /** @internal */
    _contains(el) {
        return this._element.nativeElement.contains(el);
    }
    ngOnDestroy() {
        this._subscription.unsubscribe();
    }
}
BsDropdownContainerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: BsDropdownContainerComponent, deps: [{ token: i1.BsDropdownState }, { token: i0.ChangeDetectorRef }, { token: i0.Renderer2 }, { token: i0.ElementRef }, { token: i2.AnimationBuilder }], target: i0.ɵɵFactoryTarget.Component });
BsDropdownContainerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.1", type: BsDropdownContainerComponent, selector: "bs-dropdown-container", host: { styleAttribute: "display:block;position: absolute;z-index: 1040" }, ngImport: i0, template: `
    <div [class.dropup]="direction === 'up'"
         [ngClass]="{dropdown: direction === 'down'}"
         [class.show]="isOpen"
         [class.open]="isOpen"><ng-content></ng-content>
    </div>
  `, isInline: true, directives: [{ type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: BsDropdownContainerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'bs-dropdown-container',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    // eslint-disable-next-line @angular-eslint/no-host-metadata-property
                    host: {
                        style: 'display:block;position: absolute;z-index: 1040'
                    },
                    template: `
    <div [class.dropup]="direction === 'up'"
         [ngClass]="{dropdown: direction === 'down'}"
         [class.show]="isOpen"
         [class.open]="isOpen"><ng-content></ng-content>
    </div>
  `
                }]
        }], ctorParameters: function () { return [{ type: i1.BsDropdownState }, { type: i0.ChangeDetectorRef }, { type: i0.Renderer2 }, { type: i0.ElementRef }, { type: i2.AnimationBuilder }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnMtZHJvcGRvd24tY29udGFpbmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kcm9wZG93bi9icy1kcm9wZG93bi1jb250YWluZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBRVYsU0FBUyxFQUNWLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFNUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGdCQUFnQixFQUFvQixNQUFNLHFCQUFxQixDQUFDOzs7OztBQUd6RSxpRkFBaUY7QUFDakYsc0RBQXNEO0FBZ0J0RCxNQUFNLE9BQU8sNEJBQTRCO0lBV3ZDLFlBQ1UsTUFBdUIsRUFDdkIsRUFBcUIsRUFDckIsU0FBb0IsRUFDcEIsUUFBb0IsRUFDNUIsUUFBMEI7UUFKbEIsV0FBTSxHQUFOLE1BQU0sQ0FBaUI7UUFDdkIsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUFDckIsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUNwQixhQUFRLEdBQVIsUUFBUSxDQUFZO1FBZDlCLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFpQmIsSUFBSSxDQUFDLHlCQUF5QixHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUVuRSxJQUFJLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBYyxFQUFFLEVBQUU7WUFDcEUsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDcEIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFFN0UsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBRWxGLElBQUksUUFBUSxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUU7Z0JBQ3hCLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFFMUMsSUFBSSxRQUFRLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLEVBQUU7b0JBQzFHLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7b0JBQ2xELElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7aUJBQ2pEO2dCQUNELElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxJQUFJLEVBQUU7b0JBQzNCLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7b0JBQ2pELElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUNyQixRQUFRLEVBQ1IsV0FBVyxFQUNYLG1CQUFtQixDQUNwQixDQUFDO2lCQUNIO2FBQ0Y7WUFFRCxJQUFJLFFBQVEsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRTtnQkFDdEMsSUFBSSxDQUFDLHlCQUF5QixDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7cUJBQzVDLElBQUksRUFBRSxDQUFDO2FBQ1g7WUFFRCxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDMUIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBOUNELElBQUksU0FBUztRQUNYLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7SUFDL0IsQ0FBQztJQThDRCxnQkFBZ0I7SUFDaEIsU0FBUyxDQUFDLEVBQVc7UUFDbkIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ25DLENBQUM7O3lIQTVEVSw0QkFBNEI7NkdBQTVCLDRCQUE0Qix5SUFSN0I7Ozs7OztHQU1UOzJGQUVVLDRCQUE0QjtrQkFmeEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsdUJBQXVCO29CQUNqQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MscUVBQXFFO29CQUNyRSxJQUFJLEVBQUU7d0JBQ0osS0FBSyxFQUFFLGdEQUFnRDtxQkFDeEQ7b0JBQ0QsUUFBUSxFQUFFOzs7Ozs7R0FNVDtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgQ29tcG9uZW50LFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgT25EZXN0cm95LFxyXG4gIFJlbmRlcmVyMlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgQnNEcm9wZG93blN0YXRlIH0gZnJvbSAnLi9icy1kcm9wZG93bi5zdGF0ZSc7XHJcbmltcG9ydCB7IGlzQnMzIH0gZnJvbSAnbmd4LWJvb3RzdHJhcC91dGlscyc7XHJcblxyXG5pbXBvcnQgeyBkcm9wZG93bkFuaW1hdGlvbiB9IGZyb20gJy4vZHJvcGRvd24tYW5pbWF0aW9ucyc7XHJcbmltcG9ydCB7IEFuaW1hdGlvbkJ1aWxkZXIsIEFuaW1hdGlvbkZhY3RvcnkgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcblxyXG4vLyB0b2RvOiByZXZlcnQgbmdDbGFzcyB0byBbY2xhc3NdIHdoZW4gZmFsc2UgcG9zaXRpdmUgYW5ndWxhci1jbGkgaXNzdWUgaXMgZml4ZWRcclxuLy8gICAgICAgICAgW2NsYXNzLmRyb3Bkb3duXT1cImRpcmVjdGlvbiA9PT0gJ2Rvd24nXCItLT5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdicy1kcm9wZG93bi1jb250YWluZXInLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvbm8taG9zdC1tZXRhZGF0YS1wcm9wZXJ0eVxyXG4gIGhvc3Q6IHtcclxuICAgIHN0eWxlOiAnZGlzcGxheTpibG9jaztwb3NpdGlvbjogYWJzb2x1dGU7ei1pbmRleDogMTA0MCdcclxuICB9LFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8ZGl2IFtjbGFzcy5kcm9wdXBdPVwiZGlyZWN0aW9uID09PSAndXAnXCJcclxuICAgICAgICAgW25nQ2xhc3NdPVwie2Ryb3Bkb3duOiBkaXJlY3Rpb24gPT09ICdkb3duJ31cIlxyXG4gICAgICAgICBbY2xhc3Muc2hvd109XCJpc09wZW5cIlxyXG4gICAgICAgICBbY2xhc3Mub3Blbl09XCJpc09wZW5cIj48bmctY29udGVudD48L25nLWNvbnRlbnQ+XHJcbiAgICA8L2Rpdj5cclxuICBgXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBCc0Ryb3Bkb3duQ29udGFpbmVyQ29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95IHtcclxuICBpc09wZW4gPSBmYWxzZTtcclxuXHJcbiAgcHJpdmF0ZSBfZmFjdG9yeURyb3BEb3duQW5pbWF0aW9uOiBBbmltYXRpb25GYWN0b3J5O1xyXG5cclxuICBnZXQgZGlyZWN0aW9uKCk6ICdkb3duJyB8ICd1cCcge1xyXG4gICAgcmV0dXJuIHRoaXMuX3N0YXRlLmRpcmVjdGlvbjtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgX3N0YXRlOiBCc0Ryb3Bkb3duU3RhdGUsXHJcbiAgICBwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIsXHJcbiAgICBwcml2YXRlIF9lbGVtZW50OiBFbGVtZW50UmVmLFxyXG4gICAgX2J1aWxkZXI6IEFuaW1hdGlvbkJ1aWxkZXJcclxuICApIHtcclxuICAgIHRoaXMuX2ZhY3RvcnlEcm9wRG93bkFuaW1hdGlvbiA9IF9idWlsZGVyLmJ1aWxkKGRyb3Bkb3duQW5pbWF0aW9uKTtcclxuXHJcbiAgICB0aGlzLl9zdWJzY3JpcHRpb24gPSBfc3RhdGUuaXNPcGVuQ2hhbmdlLnN1YnNjcmliZSgodmFsdWU6IGJvb2xlYW4pID0+IHtcclxuICAgICAgdGhpcy5pc09wZW4gPSB2YWx1ZTtcclxuICAgICAgY29uc3QgZHJvcGRvd24gPSB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLmRyb3Bkb3duLW1lbnUnKTtcclxuXHJcbiAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCdkaXYnKSwgJ29wZW4nKTtcclxuXHJcbiAgICAgIGlmIChkcm9wZG93biAmJiAhaXNCczMoKSkge1xyXG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKGRyb3Bkb3duLCAnc2hvdycpO1xyXG5cclxuICAgICAgICBpZiAoZHJvcGRvd24uY2xhc3NMaXN0LmNvbnRhaW5zKCdkcm9wZG93bi1tZW51LXJpZ2h0JykgfHwgZHJvcGRvd24uY2xhc3NMaXN0LmNvbnRhaW5zKCdkcm9wZG93bi1tZW51LWVuZCcpKSB7XHJcbiAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShkcm9wZG93biwgJ2xlZnQnLCAnYXV0bycpO1xyXG4gICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoZHJvcGRvd24sICdyaWdodCcsICcwJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmRpcmVjdGlvbiA9PT0gJ3VwJykge1xyXG4gICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoZHJvcGRvd24sICd0b3AnLCAnYXV0bycpO1xyXG4gICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoXHJcbiAgICAgICAgICAgIGRyb3Bkb3duLFxyXG4gICAgICAgICAgICAndHJhbnNmb3JtJyxcclxuICAgICAgICAgICAgJ3RyYW5zbGF0ZVkoLTEwMSUpJ1xyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChkcm9wZG93biAmJiB0aGlzLl9zdGF0ZS5pc0FuaW1hdGVkKSB7XHJcbiAgICAgICAgdGhpcy5fZmFjdG9yeURyb3BEb3duQW5pbWF0aW9uLmNyZWF0ZShkcm9wZG93bilcclxuICAgICAgICAgIC5wbGF5KCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XHJcbiAgICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKiogQGludGVybmFsICovXHJcbiAgX2NvbnRhaW5zKGVsOiBFbGVtZW50KTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGVsKTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgdGhpcy5fc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==