import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TooltipConfig } from './tooltip.config';
import { getBsVer } from 'ngx-bootstrap/utils';
import { PlacementForBs5 } from 'ngx-bootstrap/positioning';
import * as i0 from "@angular/core";
import * as i1 from "./tooltip.config";
export class TooltipContainerComponent {
    constructor(config) {
        Object.assign(this, config);
    }
    get _bsVersions() {
        return getBsVer();
    }
    ngAfterViewInit() {
        this.classMap = { in: false, fade: false };
        if (this.placement) {
            if (this._bsVersions.isBs5) {
                this.placement = PlacementForBs5[this.placement];
            }
            this.classMap[this.placement] = true;
        }
        this.classMap[`tooltip-${this.placement}`] = true;
        this.classMap["in"] = true;
        if (this.animation) {
            this.classMap["fade"] = true;
        }
        if (this.containerClass) {
            this.classMap[this.containerClass] = true;
        }
    }
}
TooltipContainerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: TooltipContainerComponent, deps: [{ token: i1.TooltipConfig }], target: i0.ɵɵFactoryTarget.Component });
TooltipContainerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.1", type: TooltipContainerComponent, selector: "bs-tooltip-container", host: { attributes: { "role": "tooltip" }, properties: { "class": "\"tooltip in tooltip-\" + placement + \" \" + \"bs-tooltip-\" + placement + \" \" + placement + \" \" + containerClass", "class.show": "!_bsVersions.isBs3", "class.bs3": "_bsVersions.isBs3", "attr.id": "this.id" } }, ngImport: i0, template: `
    <div class="tooltip-arrow arrow"></div>
    <div class="tooltip-inner"><ng-content></ng-content></div>
    `, isInline: true, styles: [":host.tooltip{display:block;pointer-events:none}:host.bs3.tooltip.top>.arrow{margin-left:-2px}:host.bs3.tooltip.bottom{margin-top:0}:host.bs3.bs-tooltip-left,:host.bs3.bs-tooltip-right{margin:0}:host.bs3.bs-tooltip-right .arrow,:host.bs3.bs-tooltip-left .arrow{margin:.3rem 0}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: TooltipContainerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'bs-tooltip-container',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    // eslint-disable-next-line @angular-eslint/no-host-metadata-property
                    host: {
                        '[class]': '"tooltip in tooltip-" + placement + " " + "bs-tooltip-" + placement + " " + placement + " " + containerClass',
                        '[class.show]': '!_bsVersions.isBs3',
                        '[class.bs3]': '_bsVersions.isBs3',
                        '[attr.id]': 'this.id',
                        role: 'tooltip'
                    },
                    styles: [
                        `
    :host.tooltip {
      display: block;
      pointer-events: none;
    }
    :host.bs3.tooltip.top>.arrow {
      margin-left: -2px;
    }
    :host.bs3.tooltip.bottom {
      margin-top: 0px;
    }
    :host.bs3.bs-tooltip-left, :host.bs3.bs-tooltip-right{
      margin: 0px;
    }
    :host.bs3.bs-tooltip-right .arrow, :host.bs3.bs-tooltip-left .arrow {
      margin: .3rem 0;
    }
  `
                    ],
                    template: `
    <div class="tooltip-arrow arrow"></div>
    <div class="tooltip-inner"><ng-content></ng-content></div>
    `
                }]
        }], ctorParameters: function () { return [{ type: i1.TooltipConfig }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC1jb250YWluZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3Rvb2x0aXAvdG9vbHRpcC1jb250YWluZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFFTCxTQUFTLEVBQ1QsdUJBQXVCLEVBQ3hCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsUUFBUSxFQUFjLE1BQU0scUJBQXFCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDJCQUEyQixDQUFDOzs7QUF1QzVELE1BQU0sT0FBTyx5QkFBeUI7SUFXcEMsWUFBWSxNQUFxQjtRQUMvQixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBTkQsSUFBSSxXQUFXO1FBQ2IsT0FBTyxRQUFRLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBTUQsZUFBZTtRQUNiLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQztRQUMzQyxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbEIsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRTtnQkFDMUIsSUFBSSxDQUFDLFNBQVMsR0FBSSxlQUFlLENBQUMsSUFBSSxDQUFDLFNBQXlDLENBQUMsQ0FBQzthQUNuRjtZQUVELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQztTQUN0QztRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUM7UUFFbEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDM0IsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2xCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDO1NBQzlCO1FBRUQsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLElBQUksQ0FBQztTQUMzQztJQUNILENBQUM7O3NIQWxDVSx5QkFBeUI7MEdBQXpCLHlCQUF5Qix3VkFMMUI7OztLQUdQOzJGQUVRLHlCQUF5QjtrQkFyQ3JDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjtvQkFDaEMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLHFFQUFxRTtvQkFDckUsSUFBSSxFQUFFO3dCQUNKLFNBQVMsRUFDUCw4R0FBOEc7d0JBQ2hILGNBQWMsRUFBRSxvQkFBb0I7d0JBQ3BDLGFBQWEsRUFBRSxtQkFBbUI7d0JBQ2xDLFdBQVcsRUFBRSxTQUFTO3dCQUN0QixJQUFJLEVBQUUsU0FBUztxQkFDaEI7b0JBQ0QsTUFBTSxFQUFFO3dCQUNOOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRDtxQkFDQTtvQkFDRCxRQUFRLEVBQUU7OztLQUdQO2lCQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBBZnRlclZpZXdJbml0LFxyXG4gIENvbXBvbmVudCxcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneVxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBUb29sdGlwQ29uZmlnIH0gZnJvbSAnLi90b29sdGlwLmNvbmZpZyc7XHJcbmltcG9ydCB7IGdldEJzVmVyLCBJQnNWZXJzaW9uIH0gZnJvbSAnbmd4LWJvb3RzdHJhcC91dGlscyc7XHJcbmltcG9ydCB7IFBsYWNlbWVudEZvckJzNSB9IGZyb20gJ25neC1ib290c3RyYXAvcG9zaXRpb25pbmcnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdicy10b29sdGlwLWNvbnRhaW5lcicsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9uby1ob3N0LW1ldGFkYXRhLXByb3BlcnR5XHJcbiAgaG9zdDoge1xyXG4gICAgJ1tjbGFzc10nOlxyXG4gICAgICAnXCJ0b29sdGlwIGluIHRvb2x0aXAtXCIgKyBwbGFjZW1lbnQgKyBcIiBcIiArIFwiYnMtdG9vbHRpcC1cIiArIHBsYWNlbWVudCArIFwiIFwiICsgcGxhY2VtZW50ICsgXCIgXCIgKyBjb250YWluZXJDbGFzcycsXHJcbiAgICAnW2NsYXNzLnNob3ddJzogJyFfYnNWZXJzaW9ucy5pc0JzMycsXHJcbiAgICAnW2NsYXNzLmJzM10nOiAnX2JzVmVyc2lvbnMuaXNCczMnLFxyXG4gICAgJ1thdHRyLmlkXSc6ICd0aGlzLmlkJyxcclxuICAgIHJvbGU6ICd0b29sdGlwJ1xyXG4gIH0sXHJcbiAgc3R5bGVzOiBbXHJcbiAgICBgXHJcbiAgICA6aG9zdC50b29sdGlwIHtcclxuICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xyXG4gICAgfVxyXG4gICAgOmhvc3QuYnMzLnRvb2x0aXAudG9wPi5hcnJvdyB7XHJcbiAgICAgIG1hcmdpbi1sZWZ0OiAtMnB4O1xyXG4gICAgfVxyXG4gICAgOmhvc3QuYnMzLnRvb2x0aXAuYm90dG9tIHtcclxuICAgICAgbWFyZ2luLXRvcDogMHB4O1xyXG4gICAgfVxyXG4gICAgOmhvc3QuYnMzLmJzLXRvb2x0aXAtbGVmdCwgOmhvc3QuYnMzLmJzLXRvb2x0aXAtcmlnaHR7XHJcbiAgICAgIG1hcmdpbjogMHB4O1xyXG4gICAgfVxyXG4gICAgOmhvc3QuYnMzLmJzLXRvb2x0aXAtcmlnaHQgLmFycm93LCA6aG9zdC5iczMuYnMtdG9vbHRpcC1sZWZ0IC5hcnJvdyB7XHJcbiAgICAgIG1hcmdpbjogLjNyZW0gMDtcclxuICAgIH1cclxuICBgXHJcbiAgXSxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPGRpdiBjbGFzcz1cInRvb2x0aXAtYXJyb3cgYXJyb3dcIj48L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJ0b29sdGlwLWlubmVyXCI+PG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PjwvZGl2PlxyXG4gICAgYFxyXG59KVxyXG5leHBvcnQgY2xhc3MgVG9vbHRpcENvbnRhaW5lckNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xyXG4gIGNsYXNzTWFwPzogeyBba2V5OiBzdHJpbmddOiBib29sZWFuIH07XHJcbiAgcGxhY2VtZW50Pzogc3RyaW5nO1xyXG4gIGNvbnRhaW5lckNsYXNzPzogc3RyaW5nO1xyXG4gIGFuaW1hdGlvbj86IGJvb2xlYW47XHJcbiAgaWQ/OiBzdHJpbmc7XHJcblxyXG4gIGdldCBfYnNWZXJzaW9ucygpOiBJQnNWZXJzaW9uIHtcclxuICAgIHJldHVybiBnZXRCc1ZlcigpO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoY29uZmlnOiBUb29sdGlwQ29uZmlnKSB7XHJcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGNvbmZpZyk7XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLmNsYXNzTWFwID0geyBpbjogZmFsc2UsIGZhZGU6IGZhbHNlIH07XHJcbiAgICBpZiAodGhpcy5wbGFjZW1lbnQpIHtcclxuICAgICAgaWYgKHRoaXMuX2JzVmVyc2lvbnMuaXNCczUpIHtcclxuICAgICAgICB0aGlzLnBsYWNlbWVudCA9ICBQbGFjZW1lbnRGb3JCczVbdGhpcy5wbGFjZW1lbnQgYXMga2V5b2YgdHlwZW9mIFBsYWNlbWVudEZvckJzNV07XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuY2xhc3NNYXBbdGhpcy5wbGFjZW1lbnRdID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIHRoaXMuY2xhc3NNYXBbYHRvb2x0aXAtJHt0aGlzLnBsYWNlbWVudH1gXSA9IHRydWU7XHJcblxyXG4gICAgdGhpcy5jbGFzc01hcFtcImluXCJdID0gdHJ1ZTtcclxuICAgIGlmICh0aGlzLmFuaW1hdGlvbikge1xyXG4gICAgICB0aGlzLmNsYXNzTWFwW1wiZmFkZVwiXSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuY29udGFpbmVyQ2xhc3MpIHtcclxuICAgICAgdGhpcy5jbGFzc01hcFt0aGlzLmNvbnRhaW5lckNsYXNzXSA9IHRydWU7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==