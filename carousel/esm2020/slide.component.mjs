import { Component, HostBinding, Input } from '@angular/core';
import { CarouselComponent } from './carousel.component';
import * as i0 from "@angular/core";
import * as i1 from "./carousel.component";
export class SlideComponent {
    constructor(carousel) {
        /** Is current slide active */
        this.active = false;
        this.itemWidth = '100%';
        this.order = 0;
        this.isAnimated = false;
        /** Wraps element by appropriate CSS classes */
        this.addClass = true;
        this.multilist = false;
        this.carousel = carousel;
    }
    /** Fires changes in container collection after adding a new slide instance */
    ngOnInit() {
        this.carousel.addSlide(this);
        this.itemWidth = `${100 / this.carousel.itemsPerSlide}%`;
        this.multilist = this.carousel?.itemsPerSlide > 1;
    }
    /** Fires changes in container collection after removing of this slide instance */
    ngOnDestroy() {
        this.carousel.removeSlide(this);
    }
}
SlideComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: SlideComponent, deps: [{ token: i1.CarouselComponent }], target: i0.ɵɵFactoryTarget.Component });
SlideComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.1", type: SlideComponent, selector: "slide", inputs: { active: "active" }, host: { properties: { "attr.aria-hidden": "!active", "class.multilist-margin": "multilist", "class.active": "this.active", "style.width": "this.itemWidth", "style.order": "this.order", "class.carousel-animation": "this.isAnimated", "class.item": "this.addClass", "class.carousel-item": "this.addClass" } }, ngImport: i0, template: `
    <div [class.active]="active" class="item">
      <ng-content></ng-content>
    </div>
  `, isInline: true, styles: [":host.carousel-animation{transition:opacity .6s ease,visibility .6s ease;float:left}:host.carousel-animation.active{opacity:1;visibility:visible}:host.carousel-animation:not(.active){display:block;position:absolute;opacity:0;visibility:hidden}:host.multilist-margin{margin-right:auto}:host.carousel-item{perspective:1000px}\n"] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: SlideComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'slide',
                    template: `
    <div [class.active]="active" class="item">
      <ng-content></ng-content>
    </div>
  `,
                    // eslint-disable-next-line @angular-eslint/no-host-metadata-property
                    host: {
                        '[attr.aria-hidden]': '!active',
                        '[class.multilist-margin]': 'multilist'
                    },
                    styles: [`
    :host.carousel-animation {
       transition: opacity 0.6s ease, visibility 0.6s ease;
       float: left;
    }
    :host.carousel-animation.active {
      opacity: 1;
      visibility: visible;
    }
    :host.carousel-animation:not(.active) {
      display: block;
      position: absolute;
      opacity: 0;
      visibility: hidden;
    }
    :host.multilist-margin {
      margin-right: auto;
    }
    :host.carousel-item {
      perspective: 1000px;
    }
  `]
                }]
        }], ctorParameters: function () { return [{ type: i1.CarouselComponent }]; }, propDecorators: { active: [{
                type: HostBinding,
                args: ['class.active']
            }, {
                type: Input
            }], itemWidth: [{
                type: HostBinding,
                args: ['style.width']
            }], order: [{
                type: HostBinding,
                args: ['style.order']
            }], isAnimated: [{
                type: HostBinding,
                args: ['class.carousel-animation']
            }], addClass: [{
                type: HostBinding,
                args: ['class.item']
            }, {
                type: HostBinding,
                args: ['class.carousel-item']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Nhcm91c2VsL3NsaWRlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFdBQVcsRUFFWCxLQUFLLEVBRU4sTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7OztBQXFDekQsTUFBTSxPQUFPLGNBQWM7SUFrQnpCLFlBQVksUUFBMkI7UUFqQnZDLDhCQUE4QjtRQUc5QixXQUFNLEdBQUcsS0FBSyxDQUFDO1FBRWEsY0FBUyxHQUFHLE1BQU0sQ0FBQztRQUNuQixVQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ0csZUFBVSxHQUFHLEtBQUssQ0FBQztRQUU1RCwrQ0FBK0M7UUFHL0MsYUFBUSxHQUFHLElBQUksQ0FBQztRQUloQixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBRWhCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQzNCLENBQUM7SUFFRCw4RUFBOEU7SUFDOUUsUUFBUTtRQUNOLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEdBQUcsQ0FBQztRQUN6RCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsYUFBYSxHQUFHLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRUQsa0ZBQWtGO0lBQ2xGLFdBQVc7UUFDVCxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQyxDQUFDOzsyR0FoQ1UsY0FBYzsrRkFBZCxjQUFjLDhYQWpDZjs7OztHQUlUOzJGQTZCVSxjQUFjO2tCQW5DMUIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsT0FBTztvQkFDakIsUUFBUSxFQUFFOzs7O0dBSVQ7b0JBQ0QscUVBQXFFO29CQUNyRSxJQUFJLEVBQUU7d0JBQ0osb0JBQW9CLEVBQUUsU0FBUzt3QkFDL0IsMEJBQTBCLEVBQUUsV0FBVztxQkFDeEM7b0JBQ0QsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCUixDQUFDO2lCQUNIO3dHQUtDLE1BQU07c0JBRkwsV0FBVzt1QkFBQyxjQUFjOztzQkFDMUIsS0FBSztnQkFHc0IsU0FBUztzQkFBcEMsV0FBVzt1QkFBQyxhQUFhO2dCQUNFLEtBQUs7c0JBQWhDLFdBQVc7dUJBQUMsYUFBYTtnQkFDZSxVQUFVO3NCQUFsRCxXQUFXO3VCQUFDLDBCQUEwQjtnQkFLdkMsUUFBUTtzQkFGUCxXQUFXO3VCQUFDLFlBQVk7O3NCQUN4QixXQUFXO3VCQUFDLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIEhvc3RCaW5kaW5nLFxyXG4gIE9uRGVzdHJveSxcclxuICBJbnB1dCxcclxuICBPbkluaXRcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IENhcm91c2VsQ29tcG9uZW50IH0gZnJvbSAnLi9jYXJvdXNlbC5jb21wb25lbnQnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdzbGlkZScsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxkaXYgW2NsYXNzLmFjdGl2ZV09XCJhY3RpdmVcIiBjbGFzcz1cIml0ZW1cIj5cclxuICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxyXG4gICAgPC9kaXY+XHJcbiAgYCxcclxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLWhvc3QtbWV0YWRhdGEtcHJvcGVydHlcclxuICBob3N0OiB7XHJcbiAgICAnW2F0dHIuYXJpYS1oaWRkZW5dJzogJyFhY3RpdmUnLFxyXG4gICAgJ1tjbGFzcy5tdWx0aWxpc3QtbWFyZ2luXSc6ICdtdWx0aWxpc3QnXHJcbiAgfSxcclxuICBzdHlsZXM6IFtgXHJcbiAgICA6aG9zdC5jYXJvdXNlbC1hbmltYXRpb24ge1xyXG4gICAgICAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjZzIGVhc2UsIHZpc2liaWxpdHkgMC42cyBlYXNlO1xyXG4gICAgICAgZmxvYXQ6IGxlZnQ7XHJcbiAgICB9XHJcbiAgICA6aG9zdC5jYXJvdXNlbC1hbmltYXRpb24uYWN0aXZlIHtcclxuICAgICAgb3BhY2l0eTogMTtcclxuICAgICAgdmlzaWJpbGl0eTogdmlzaWJsZTtcclxuICAgIH1cclxuICAgIDpob3N0LmNhcm91c2VsLWFuaW1hdGlvbjpub3QoLmFjdGl2ZSkge1xyXG4gICAgICBkaXNwbGF5OiBibG9jaztcclxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICBvcGFjaXR5OiAwO1xyXG4gICAgICB2aXNpYmlsaXR5OiBoaWRkZW47XHJcbiAgICB9XHJcbiAgICA6aG9zdC5tdWx0aWxpc3QtbWFyZ2luIHtcclxuICAgICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xyXG4gICAgfVxyXG4gICAgOmhvc3QuY2Fyb3VzZWwtaXRlbSB7XHJcbiAgICAgIHBlcnNwZWN0aXZlOiAxMDAwcHg7XHJcbiAgICB9XHJcbiAgYF1cclxufSlcclxuZXhwb3J0IGNsYXNzIFNsaWRlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gIC8qKiBJcyBjdXJyZW50IHNsaWRlIGFjdGl2ZSAqL1xyXG4gIEBIb3N0QmluZGluZygnY2xhc3MuYWN0aXZlJylcclxuICBASW5wdXQoKVxyXG4gIGFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLndpZHRoJykgaXRlbVdpZHRoID0gJzEwMCUnO1xyXG4gIEBIb3N0QmluZGluZygnc3R5bGUub3JkZXInKSBvcmRlciA9IDA7XHJcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5jYXJvdXNlbC1hbmltYXRpb24nKSBpc0FuaW1hdGVkID0gZmFsc2U7XHJcblxyXG4gIC8qKiBXcmFwcyBlbGVtZW50IGJ5IGFwcHJvcHJpYXRlIENTUyBjbGFzc2VzICovXHJcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5pdGVtJylcclxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmNhcm91c2VsLWl0ZW0nKVxyXG4gIGFkZENsYXNzID0gdHJ1ZTtcclxuXHJcbiAgLyoqIExpbmsgdG8gUGFyZW50KGNvbnRhaW5lci1jb2xsZWN0aW9uKSBjb21wb25lbnQgKi9cclxuICBwcm90ZWN0ZWQgY2Fyb3VzZWw6IENhcm91c2VsQ29tcG9uZW50O1xyXG4gIG11bHRpbGlzdCA9IGZhbHNlO1xyXG4gIGNvbnN0cnVjdG9yKGNhcm91c2VsOiBDYXJvdXNlbENvbXBvbmVudCkge1xyXG4gICAgdGhpcy5jYXJvdXNlbCA9IGNhcm91c2VsO1xyXG4gIH1cclxuXHJcbiAgLyoqIEZpcmVzIGNoYW5nZXMgaW4gY29udGFpbmVyIGNvbGxlY3Rpb24gYWZ0ZXIgYWRkaW5nIGEgbmV3IHNsaWRlIGluc3RhbmNlICovXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLmNhcm91c2VsLmFkZFNsaWRlKHRoaXMpO1xyXG4gICAgdGhpcy5pdGVtV2lkdGggPSBgJHsxMDAgLyB0aGlzLmNhcm91c2VsLml0ZW1zUGVyU2xpZGV9JWA7XHJcbiAgICB0aGlzLm11bHRpbGlzdCA9IHRoaXMuY2Fyb3VzZWw/Lml0ZW1zUGVyU2xpZGUgPiAxO1xyXG4gIH1cclxuXHJcbiAgLyoqIEZpcmVzIGNoYW5nZXMgaW4gY29udGFpbmVyIGNvbGxlY3Rpb24gYWZ0ZXIgcmVtb3Zpbmcgb2YgdGhpcyBzbGlkZSBpbnN0YW5jZSAqL1xyXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgdGhpcy5jYXJvdXNlbC5yZW1vdmVTbGlkZSh0aGlzKTtcclxuICB9XHJcbn1cclxuIl19