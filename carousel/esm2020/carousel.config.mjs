import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class CarouselConfig {
    constructor() {
        /* Default interval of auto changing of slides */
        this.interval = 5000;
        /* Is loop of auto changing of slides can be paused */
        this.noPause = false;
        /* Is slides can wrap from the last to the first slide */
        this.noWrap = false;
        /* Show carousel-indicators */
        this.showIndicators = true;
        /* Slides can be paused on focus */
        this.pauseOnFocus = false;
        /* If `true` - carousel indicators indicate slides chunks works ONLY if singleSlideOffset = FALSE */
        this.indicatorsByChunk = false;
        /* If value more then 1 — carousel works in multilist mode */
        this.itemsPerSlide = 1;
        /* If `true` — carousel shifts by one element. By default carousel shifts by number
          of visible elements (itemsPerSlide field) */
        this.singleSlideOffset = false;
    }
}
CarouselConfig.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: CarouselConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
CarouselConfig.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: CarouselConfig, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: CarouselConfig, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Nhcm91c2VsL2Nhcm91c2VsLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUszQyxNQUFNLE9BQU8sY0FBYztJQUgzQjtRQUlFLGlEQUFpRDtRQUNqRCxhQUFRLEdBQUcsSUFBSSxDQUFDO1FBRWhCLHNEQUFzRDtRQUN0RCxZQUFPLEdBQUcsS0FBSyxDQUFDO1FBRWhCLHlEQUF5RDtRQUN6RCxXQUFNLEdBQUcsS0FBSyxDQUFDO1FBRWYsOEJBQThCO1FBQzlCLG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBRXRCLG1DQUFtQztRQUNuQyxpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUVyQixvR0FBb0c7UUFDcEcsc0JBQWlCLEdBQUcsS0FBSyxDQUFDO1FBRTFCLDZEQUE2RDtRQUM3RCxrQkFBYSxHQUFHLENBQUMsQ0FBQztRQUVsQjtzREFDOEM7UUFDOUMsc0JBQWlCLEdBQUcsS0FBSyxDQUFDO0tBQzNCOzsyR0F6QlksY0FBYzsrR0FBZCxjQUFjLGNBRmIsTUFBTTsyRkFFUCxjQUFjO2tCQUgxQixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIENhcm91c2VsQ29uZmlnIHtcclxuICAvKiBEZWZhdWx0IGludGVydmFsIG9mIGF1dG8gY2hhbmdpbmcgb2Ygc2xpZGVzICovXHJcbiAgaW50ZXJ2YWwgPSA1MDAwO1xyXG5cclxuICAvKiBJcyBsb29wIG9mIGF1dG8gY2hhbmdpbmcgb2Ygc2xpZGVzIGNhbiBiZSBwYXVzZWQgKi9cclxuICBub1BhdXNlID0gZmFsc2U7XHJcblxyXG4gIC8qIElzIHNsaWRlcyBjYW4gd3JhcCBmcm9tIHRoZSBsYXN0IHRvIHRoZSBmaXJzdCBzbGlkZSAqL1xyXG4gIG5vV3JhcCA9IGZhbHNlO1xyXG5cclxuICAvKiBTaG93IGNhcm91c2VsLWluZGljYXRvcnMgKi9cclxuICBzaG93SW5kaWNhdG9ycyA9IHRydWU7XHJcblxyXG4gIC8qIFNsaWRlcyBjYW4gYmUgcGF1c2VkIG9uIGZvY3VzICovXHJcbiAgcGF1c2VPbkZvY3VzID0gZmFsc2U7XHJcblxyXG4gIC8qIElmIGB0cnVlYCAtIGNhcm91c2VsIGluZGljYXRvcnMgaW5kaWNhdGUgc2xpZGVzIGNodW5rcyB3b3JrcyBPTkxZIGlmIHNpbmdsZVNsaWRlT2Zmc2V0ID0gRkFMU0UgKi9cclxuICBpbmRpY2F0b3JzQnlDaHVuayA9IGZhbHNlO1xyXG5cclxuICAvKiBJZiB2YWx1ZSBtb3JlIHRoZW4gMSDigJQgY2Fyb3VzZWwgd29ya3MgaW4gbXVsdGlsaXN0IG1vZGUgKi9cclxuICBpdGVtc1BlclNsaWRlID0gMTtcclxuXHJcbiAgLyogSWYgYHRydWVgIOKAlCBjYXJvdXNlbCBzaGlmdHMgYnkgb25lIGVsZW1lbnQuIEJ5IGRlZmF1bHQgY2Fyb3VzZWwgc2hpZnRzIGJ5IG51bWJlclxyXG4gICAgb2YgdmlzaWJsZSBlbGVtZW50cyAoaXRlbXNQZXJTbGlkZSBmaWVsZCkgKi9cclxuICBzaW5nbGVTbGlkZU9mZnNldCA9IGZhbHNlO1xyXG59XHJcbiJdfQ==