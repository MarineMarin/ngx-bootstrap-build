import { ChangeDetectionStrategy, Input, Component } from '@angular/core';
import { PopoverConfig } from './popover.config';
import { getBsVer } from 'ngx-bootstrap/utils';
import { PlacementForBs5, checkMargins } from 'ngx-bootstrap/positioning';
import * as i0 from "@angular/core";
import * as i1 from "./popover.config";
import * as i2 from "@angular/common";
export class PopoverContainerComponent {
    constructor(config) {
        this._placement = 'top';
        Object.assign(this, config);
    }
    set placement(value) {
        if (!this._bsVersions.isBs5) {
            this._placement = value;
        }
        else {
            this._placement = PlacementForBs5[value];
        }
    }
    ;
    get _bsVersions() {
        return getBsVer();
    }
    checkMarginNecessity() {
        return checkMargins(this._placement);
    }
}
PopoverContainerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: PopoverContainerComponent, deps: [{ token: i1.PopoverConfig }], target: i0.ɵɵFactoryTarget.Component });
PopoverContainerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.1", type: PopoverContainerComponent, selector: "popover-container", inputs: { placement: "placement", title: "title" }, host: { attributes: { "role": "tooltip" }, properties: { "attr.id": "popoverId", "class": "\"popover in popover-\" + _placement + \" \" + \"bs-popover-\" + _placement + \" \" + _placement + \" \" + containerClass + \" \" + checkMarginNecessity()", "class.show": "!_bsVersions.isBs3", "class.bs3": "_bsVersions.isBs3" }, styleAttribute: "display:block;" }, ngImport: i0, template: "<div class=\"popover-arrow arrow\"></div>\r\n<h3 class=\"popover-title popover-header\" *ngIf=\"title\">{{ title }}</h3>\r\n<div class=\"popover-content popover-body\">\r\n  <ng-content></ng-content>\r\n</div>\r\n", styles: [":host.bs3.popover-top{margin-bottom:10px}:host.bs3.popover.top>.arrow{margin-left:-2px}:host.bs3.popover.top{margin-bottom:10px}:host.popover.bottom>.arrow{margin-left:-4px}:host.bs3.bs-popover-left{margin-right:.5rem}:host.bs3.bs-popover-right .arrow,:host.bs3.bs-popover-left .arrow{margin:.3rem 0}\n"], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: PopoverContainerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'popover-container', changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '[attr.id]': 'popoverId',
                        '[class]': '"popover in popover-" + _placement + " " + "bs-popover-" + _placement + " " + _placement + " " + containerClass + " " + checkMarginNecessity()',
                        '[class.show]': '!_bsVersions.isBs3',
                        '[class.bs3]': '_bsVersions.isBs3',
                        role: 'tooltip',
                        style: 'display:block;'
                    }, styles: [
                        `
    :host.bs3.popover-top {
      margin-bottom: 10px;
    }
    :host.bs3.popover.top>.arrow {
      margin-left: -2px;
    }
    :host.bs3.popover.top {
      margin-bottom: 10px;
    }
    :host.popover.bottom>.arrow {
      margin-left: -4px;
    }
    :host.bs3.bs-popover-left {
      margin-right: .5rem;
    }
    :host.bs3.bs-popover-right .arrow, :host.bs3.bs-popover-left .arrow{
      margin: .3rem 0;
    }
    `
                    ], template: "<div class=\"popover-arrow arrow\"></div>\r\n<h3 class=\"popover-title popover-header\" *ngIf=\"title\">{{ title }}</h3>\r\n<div class=\"popover-content popover-body\">\r\n  <ng-content></ng-content>\r\n</div>\r\n" }]
        }], ctorParameters: function () { return [{ type: i1.PopoverConfig }]; }, propDecorators: { placement: [{
                type: Input
            }], title: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci1jb250YWluZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3BvcG92ZXIvcG9wb3Zlci1jb250YWluZXIuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vc3JjL3BvcG92ZXIvcG9wb3Zlci1jb250YWluZXIuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxRQUFRLEVBQWMsTUFBTSxxQkFBcUIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsZUFBZSxFQUFFLFlBQVksRUFBdUIsTUFBTSwyQkFBMkIsQ0FBQzs7OztBQXVDL0YsTUFBTSxPQUFPLHlCQUF5QjtJQW1CcEMsWUFBWSxNQUFxQjtRQU5qQyxlQUFVLEdBQUcsS0FBSyxDQUFDO1FBT2pCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFwQkQsSUFBYSxTQUFTLENBQUMsS0FBMEI7UUFDL0MsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFO1lBQzNCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1NBQ3pCO2FBQU07WUFDTCxJQUFJLENBQUMsVUFBVSxHQUFJLGVBQWUsQ0FBQyxLQUFxQyxDQUFDLENBQUM7U0FDM0U7SUFDSCxDQUFDO0lBQUEsQ0FBQztJQVFGLElBQUksV0FBVztRQUNiLE9BQU8sUUFBUSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQU1ELG9CQUFvQjtRQUNsQixPQUFPLFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDdkMsQ0FBQzs7c0hBekJVLHlCQUF5QjswR0FBekIseUJBQXlCLGlkQzFDdEMsdU5BS0E7MkZEcUNhLHlCQUF5QjtrQkFyQ3JDLFNBQVM7K0JBQ0UsbUJBQW1CLG1CQUNaLHVCQUF1QixDQUFDLE1BQU0sUUFFekM7d0JBQ0osV0FBVyxFQUFFLFdBQVc7d0JBQ3hCLFNBQVMsRUFDUCxnSkFBZ0o7d0JBQ2xKLGNBQWMsRUFBRSxvQkFBb0I7d0JBQ3BDLGFBQWEsRUFBRSxtQkFBbUI7d0JBQ2xDLElBQUksRUFBRSxTQUFTO3dCQUNmLEtBQUssRUFBRSxnQkFBZ0I7cUJBQ3hCLFVBQ087d0JBQ047Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FtQkM7cUJBQ0Y7b0dBSVksU0FBUztzQkFBckIsS0FBSztnQkFRRyxLQUFLO3NCQUFiLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgSW5wdXQsIENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBQb3BvdmVyQ29uZmlnIH0gZnJvbSAnLi9wb3BvdmVyLmNvbmZpZyc7XHJcbmltcG9ydCB7IGdldEJzVmVyLCBJQnNWZXJzaW9uIH0gZnJvbSAnbmd4LWJvb3RzdHJhcC91dGlscyc7XHJcbmltcG9ydCB7IFBsYWNlbWVudEZvckJzNSwgY2hlY2tNYXJnaW5zLCBBdmFpbGJsZUJTUG9zaXRpb25zIH0gZnJvbSAnbmd4LWJvb3RzdHJhcC9wb3NpdGlvbmluZyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ3BvcG92ZXItY29udGFpbmVyJyxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLWhvc3QtbWV0YWRhdGEtcHJvcGVydHlcclxuICBob3N0OiB7XHJcbiAgICAnW2F0dHIuaWRdJzogJ3BvcG92ZXJJZCcsXHJcbiAgICAnW2NsYXNzXSc6XHJcbiAgICAgICdcInBvcG92ZXIgaW4gcG9wb3Zlci1cIiArIF9wbGFjZW1lbnQgKyBcIiBcIiArIFwiYnMtcG9wb3Zlci1cIiArIF9wbGFjZW1lbnQgKyBcIiBcIiArIF9wbGFjZW1lbnQgKyBcIiBcIiArIGNvbnRhaW5lckNsYXNzICsgXCIgXCIgKyBjaGVja01hcmdpbk5lY2Vzc2l0eSgpJyxcclxuICAgICdbY2xhc3Muc2hvd10nOiAnIV9ic1ZlcnNpb25zLmlzQnMzJyxcclxuICAgICdbY2xhc3MuYnMzXSc6ICdfYnNWZXJzaW9ucy5pc0JzMycsXHJcbiAgICByb2xlOiAndG9vbHRpcCcsXHJcbiAgICBzdHlsZTogJ2Rpc3BsYXk6YmxvY2s7J1xyXG4gIH0sXHJcbiAgc3R5bGVzOiBbXHJcbiAgICBgXHJcbiAgICA6aG9zdC5iczMucG9wb3Zlci10b3Age1xyXG4gICAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xyXG4gICAgfVxyXG4gICAgOmhvc3QuYnMzLnBvcG92ZXIudG9wPi5hcnJvdyB7XHJcbiAgICAgIG1hcmdpbi1sZWZ0OiAtMnB4O1xyXG4gICAgfVxyXG4gICAgOmhvc3QuYnMzLnBvcG92ZXIudG9wIHtcclxuICAgICAgbWFyZ2luLWJvdHRvbTogMTBweDtcclxuICAgIH1cclxuICAgIDpob3N0LnBvcG92ZXIuYm90dG9tPi5hcnJvdyB7XHJcbiAgICAgIG1hcmdpbi1sZWZ0OiAtNHB4O1xyXG4gICAgfVxyXG4gICAgOmhvc3QuYnMzLmJzLXBvcG92ZXItbGVmdCB7XHJcbiAgICAgIG1hcmdpbi1yaWdodDogLjVyZW07XHJcbiAgICB9XHJcbiAgICA6aG9zdC5iczMuYnMtcG9wb3Zlci1yaWdodCAuYXJyb3csIDpob3N0LmJzMy5icy1wb3BvdmVyLWxlZnQgLmFycm93e1xyXG4gICAgICBtYXJnaW46IC4zcmVtIDA7XHJcbiAgICB9XHJcbiAgICBgXHJcbiAgXSxcclxuICB0ZW1wbGF0ZVVybDogJy4vcG9wb3Zlci1jb250YWluZXIuY29tcG9uZW50Lmh0bWwnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQb3BvdmVyQ29udGFpbmVyQ29tcG9uZW50IHtcclxuICBASW5wdXQoKSBzZXQgcGxhY2VtZW50KHZhbHVlOiBBdmFpbGJsZUJTUG9zaXRpb25zKSB7XHJcbiAgICBpZiAoIXRoaXMuX2JzVmVyc2lvbnMuaXNCczUpIHtcclxuICAgICAgdGhpcy5fcGxhY2VtZW50ID0gdmFsdWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLl9wbGFjZW1lbnQgPSAgUGxhY2VtZW50Rm9yQnM1W3ZhbHVlIGFzIGtleW9mIHR5cGVvZiBQbGFjZW1lbnRGb3JCczVdO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIEBJbnB1dCgpIHRpdGxlPzogc3RyaW5nO1xyXG5cclxuICBjb250YWluZXJDbGFzcz86IHN0cmluZztcclxuICBwb3BvdmVySWQ/OiBzdHJpbmc7XHJcbiAgX3BsYWNlbWVudCA9ICd0b3AnO1xyXG5cclxuICBnZXQgX2JzVmVyc2lvbnMoKTogSUJzVmVyc2lvbiB7XHJcbiAgICByZXR1cm4gZ2V0QnNWZXIoKTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKGNvbmZpZzogUG9wb3ZlckNvbmZpZykge1xyXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBjb25maWcpO1xyXG4gIH1cclxuXHJcbiAgY2hlY2tNYXJnaW5OZWNlc3NpdHkoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBjaGVja01hcmdpbnModGhpcy5fcGxhY2VtZW50KTtcclxuICB9XHJcbn1cclxuIiwiPGRpdiBjbGFzcz1cInBvcG92ZXItYXJyb3cgYXJyb3dcIj48L2Rpdj5cclxuPGgzIGNsYXNzPVwicG9wb3Zlci10aXRsZSBwb3BvdmVyLWhlYWRlclwiICpuZ0lmPVwidGl0bGVcIj57eyB0aXRsZSB9fTwvaDM+XHJcbjxkaXYgY2xhc3M9XCJwb3BvdmVyLWNvbnRlbnQgcG9wb3Zlci1ib2R5XCI+XHJcbiAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxyXG48L2Rpdj5cclxuIl19