import { AnimationBuilder } from '@angular/animations';
import { Directive, ElementRef, EventEmitter, HostBinding, Input, Output, Renderer2 } from '@angular/core';
import { collapseAnimation, expandAnimation } from './collapse-animations';
import * as i0 from "@angular/core";
import * as i1 from "@angular/animations";
export class CollapseDirective {
    constructor(_el, _renderer, _builder) {
        this._el = _el;
        this._renderer = _renderer;
        /** This event fires as soon as content collapses */
        this.collapsed = new EventEmitter();
        /** This event fires when collapsing is started */
        this.collapses = new EventEmitter();
        /** This event fires as soon as content becomes visible */
        this.expanded = new EventEmitter();
        /** This event fires when expansion is started */
        this.expands = new EventEmitter();
        // shown
        this.isExpanded = true;
        this.collapseNewValue = true;
        // hidden
        this.isCollapsed = false;
        // stale state
        this.isCollapse = true;
        // animation state
        this.isCollapsing = false;
        /** turn on/off animation */
        this.isAnimated = false;
        this._display = 'block';
        this._stylesLoaded = false;
        this._COLLAPSE_ACTION_NAME = 'collapse';
        this._EXPAND_ACTION_NAME = 'expand';
        this._factoryCollapseAnimation = _builder.build(collapseAnimation);
        this._factoryExpandAnimation = _builder.build(expandAnimation);
    }
    set display(value) {
        this._display = value;
        if (value === 'none') {
            this.hide();
            return;
        }
        this.isAnimated ? this.toggle() : this.show();
    }
    /** A flag indicating visibility of content (shown or hidden) */
    set collapse(value) {
        this.collapseNewValue = value;
        if (!this._player || this._isAnimationDone) {
            this.isExpanded = value;
            this.toggle();
        }
    }
    get collapse() {
        return this.isExpanded;
    }
    ngAfterViewChecked() {
        this._stylesLoaded = true;
        if (!this._player || !this._isAnimationDone) {
            return;
        }
        this._player.reset();
        this._renderer.setStyle(this._el.nativeElement, 'height', '*');
    }
    /** allows to manually toggle content visibility */
    toggle() {
        if (this.isExpanded) {
            this.hide();
        }
        else {
            this.show();
        }
    }
    /** allows to manually hide content */
    hide() {
        this.isCollapsing = true;
        this.isExpanded = false;
        this.isCollapsed = true;
        this.isCollapsing = false;
        this.collapses.emit(this);
        this._isAnimationDone = false;
        this.animationRun(this.isAnimated, this._COLLAPSE_ACTION_NAME)(() => {
            this._isAnimationDone = true;
            if (this.collapseNewValue !== this.isCollapsed && this.isAnimated) {
                this.show();
                return;
            }
            this.collapsed.emit(this);
            this._renderer.setStyle(this._el.nativeElement, 'display', 'none');
        });
    }
    /** allows to manually show collapsed content */
    show() {
        this._renderer.setStyle(this._el.nativeElement, 'display', this._display);
        this.isCollapsing = true;
        this.isExpanded = true;
        this.isCollapsed = false;
        this.isCollapsing = false;
        this.expands.emit(this);
        this._isAnimationDone = false;
        this.animationRun(this.isAnimated, this._EXPAND_ACTION_NAME)(() => {
            this._isAnimationDone = true;
            if (this.collapseNewValue !== this.isCollapsed && this.isAnimated) {
                this.hide();
                return;
            }
            this.expanded.emit(this);
            this._renderer.removeStyle(this._el.nativeElement, 'overflow');
        });
    }
    animationRun(isAnimated, action) {
        if (!isAnimated || !this._stylesLoaded) {
            return (callback) => callback();
        }
        this._renderer.setStyle(this._el.nativeElement, 'overflow', 'hidden');
        this._renderer.addClass(this._el.nativeElement, 'collapse');
        const factoryAnimation = (action === this._EXPAND_ACTION_NAME)
            ? this._factoryExpandAnimation
            : this._factoryCollapseAnimation;
        if (this._player) {
            this._player.destroy();
        }
        this._player = factoryAnimation.create(this._el.nativeElement);
        this._player.play();
        return (callback) => this._player?.onDone(callback);
    }
}
CollapseDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: CollapseDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i1.AnimationBuilder }], target: i0.ɵɵFactoryTarget.Directive });
CollapseDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.1", type: CollapseDirective, selector: "[collapse]", inputs: { display: "display", isAnimated: "isAnimated", collapse: "collapse" }, outputs: { collapsed: "collapsed", collapses: "collapses", expanded: "expanded", expands: "expands" }, host: { properties: { "class.collapse": "this.isCollapse", "class.in": "this.isExpanded", "class.show": "this.isExpanded", "attr.aria-hidden": "this.isCollapsed", "class.collapsing": "this.isCollapsing" } }, exportAs: ["bs-collapse"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: CollapseDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[collapse]',
                    exportAs: 'bs-collapse',
                    // eslint-disable-next-line @angular-eslint/no-host-metadata-property
                    host: {
                        '[class.collapse]': 'true'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i1.AnimationBuilder }]; }, propDecorators: { collapsed: [{
                type: Output
            }], collapses: [{
                type: Output
            }], expanded: [{
                type: Output
            }], expands: [{
                type: Output
            }], isExpanded: [{
                type: HostBinding,
                args: ['class.in']
            }, {
                type: HostBinding,
                args: ['class.show']
            }], isCollapsed: [{
                type: HostBinding,
                args: ['attr.aria-hidden']
            }], isCollapse: [{
                type: HostBinding,
                args: ['class.collapse']
            }], isCollapsing: [{
                type: HostBinding,
                args: ['class.collapsing']
            }], display: [{
                type: Input
            }], isAnimated: [{
                type: Input
            }], collapse: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGFwc2UuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvbGxhcHNlL2NvbGxhcHNlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsZ0JBQWdCLEVBR2pCLE1BQU0scUJBQXFCLENBQUM7QUFFN0IsT0FBTyxFQUVMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFdBQVcsRUFDWCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFNBQVMsRUFDVixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQ0wsaUJBQWlCLEVBQ2pCLGVBQWUsRUFDaEIsTUFBTSx1QkFBdUIsQ0FBQzs7O0FBVS9CLE1BQU0sT0FBTyxpQkFBaUI7SUE0RDVCLFlBQ1UsR0FBZSxFQUNmLFNBQW9CLEVBQzVCLFFBQTBCO1FBRmxCLFFBQUcsR0FBSCxHQUFHLENBQVk7UUFDZixjQUFTLEdBQVQsU0FBUyxDQUFXO1FBN0Q5QixvREFBb0Q7UUFDMUMsY0FBUyxHQUFvQyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzFFLGtEQUFrRDtRQUN4QyxjQUFTLEdBQW9DLElBQUksWUFBWSxFQUFFLENBQUM7UUFDMUUsMERBQTBEO1FBQ2hELGFBQVEsR0FBb0MsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUN6RSxpREFBaUQ7UUFDdkMsWUFBTyxHQUFvQyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3hFLFFBQVE7UUFJUixlQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLHFCQUFnQixHQUFHLElBQUksQ0FBQztRQUN4QixTQUFTO1FBQ3dCLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3JELGNBQWM7UUFDaUIsZUFBVSxHQUFHLElBQUksQ0FBQztRQUNqRCxrQkFBa0I7UUFDZSxpQkFBWSxHQUFHLEtBQUssQ0FBQztRQWF0RCw0QkFBNEI7UUFDbkIsZUFBVSxHQUFHLEtBQUssQ0FBQztRQWVwQixhQUFRLEdBQUcsT0FB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V0FBVzt1QkFBQyxVQUFVOztzQkFDdEIsV0FBVzt1QkFBQyxZQUFZO2dCQUtRLFdBQVc7c0JBQTNDLFdBQVc7dUJBQUMsa0JBQWtCO2dCQUVBLFVBQVU7c0JBQXhDLFdBQVc7dUJBQUMsZ0JBQWdCO2dCQUVJLFlBQVk7c0JBQTVDLFdBQVc7dUJBQUMsa0JBQWtCO2dCQUczQixPQUFPO3NCQURWLEtBQUs7Z0JBWUcsVUFBVTtzQkFBbEIsS0FBSztnQkFHRixRQUFRO3NCQURYLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIEFuaW1hdGlvbkJ1aWxkZXIsXHJcbiAgQW5pbWF0aW9uRmFjdG9yeSxcclxuICBBbmltYXRpb25QbGF5ZXJcclxufSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcclxuXHJcbmltcG9ydCB7XHJcbiAgQWZ0ZXJWaWV3Q2hlY2tlZCxcclxuICBEaXJlY3RpdmUsXHJcbiAgRWxlbWVudFJlZixcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgSG9zdEJpbmRpbmcsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIFJlbmRlcmVyMlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHtcclxuICBjb2xsYXBzZUFuaW1hdGlvbixcclxuICBleHBhbmRBbmltYXRpb25cclxufSBmcm9tICcuL2NvbGxhcHNlLWFuaW1hdGlvbnMnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbY29sbGFwc2VdJyxcclxuICBleHBvcnRBczogJ2JzLWNvbGxhcHNlJyxcclxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLWhvc3QtbWV0YWRhdGEtcHJvcGVydHlcclxuICBob3N0OiB7XHJcbiAgICAnW2NsYXNzLmNvbGxhcHNlXSc6ICd0cnVlJ1xyXG4gIH1cclxufSlcclxuZXhwb3J0IGNsYXNzIENvbGxhcHNlRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3Q2hlY2tlZCB7XHJcbiAgLyoqIFRoaXMgZXZlbnQgZmlyZXMgYXMgc29vbiBhcyBjb250ZW50IGNvbGxhcHNlcyAqL1xyXG4gIEBPdXRwdXQoKSBjb2xsYXBzZWQ6IEV2ZW50RW1pdHRlcjxDb2xsYXBzZURpcmVjdGl2ZT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgLyoqIFRoaXMgZXZlbnQgZmlyZXMgd2hlbiBjb2xsYXBzaW5nIGlzIHN0YXJ0ZWQgKi9cclxuICBAT3V0cHV0KCkgY29sbGFwc2VzOiBFdmVudEVtaXR0ZXI8Q29sbGFwc2VEaXJlY3RpdmU+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIC8qKiBUaGlzIGV2ZW50IGZpcmVzIGFzIHNvb24gYXMgY29udGVudCBiZWNvbWVzIHZpc2libGUgKi9cclxuICBAT3V0cHV0KCkgZXhwYW5kZWQ6IEV2ZW50RW1pdHRlcjxDb2xsYXBzZURpcmVjdGl2ZT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgLyoqIFRoaXMgZXZlbnQgZmlyZXMgd2hlbiBleHBhbnNpb24gaXMgc3RhcnRlZCAqL1xyXG4gIEBPdXRwdXQoKSBleHBhbmRzOiBFdmVudEVtaXR0ZXI8Q29sbGFwc2VEaXJlY3RpdmU+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIC8vIHNob3duXHJcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5pbicpXHJcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5zaG93JylcclxuXHJcbiAgaXNFeHBhbmRlZCA9IHRydWU7XHJcbiAgY29sbGFwc2VOZXdWYWx1ZSA9IHRydWU7XHJcbiAgLy8gaGlkZGVuXHJcbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmFyaWEtaGlkZGVuJykgaXNDb2xsYXBzZWQgPSBmYWxzZTtcclxuICAvLyBzdGFsZSBzdGF0ZVxyXG4gIEBIb3N0QmluZGluZygnY2xhc3MuY29sbGFwc2UnKSBpc0NvbGxhcHNlID0gdHJ1ZTtcclxuICAvLyBhbmltYXRpb24gc3RhdGVcclxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmNvbGxhcHNpbmcnKSBpc0NvbGxhcHNpbmcgPSBmYWxzZTtcclxuXHJcbiAgQElucHV0KClcclxuICBzZXQgZGlzcGxheSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLl9kaXNwbGF5ID0gdmFsdWU7XHJcbiAgICBpZiAodmFsdWUgPT09ICdub25lJykge1xyXG4gICAgICB0aGlzLmhpZGUoKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuaXNBbmltYXRlZCA/IHRoaXMudG9nZ2xlKCkgOiB0aGlzLnNob3coKTtcclxuICB9XHJcblxyXG4gIC8qKiB0dXJuIG9uL29mZiBhbmltYXRpb24gKi9cclxuICBASW5wdXQoKSBpc0FuaW1hdGVkID0gZmFsc2U7XHJcbiAgLyoqIEEgZmxhZyBpbmRpY2F0aW5nIHZpc2liaWxpdHkgb2YgY29udGVudCAoc2hvd24gb3IgaGlkZGVuKSAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IGNvbGxhcHNlKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLmNvbGxhcHNlTmV3VmFsdWUgPSB2YWx1ZTtcclxuICAgIGlmICghdGhpcy5fcGxheWVyIHx8IHRoaXMuX2lzQW5pbWF0aW9uRG9uZSkge1xyXG4gICAgICB0aGlzLmlzRXhwYW5kZWQgPSB2YWx1ZTtcclxuICAgICAgdGhpcy50b2dnbGUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldCBjb2xsYXBzZSgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLmlzRXhwYW5kZWQ7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICBwcml2YXRlIF9pc0FuaW1hdGlvbkRvbmU/OiBib29sZWFuO1xyXG4gIHByaXZhdGUgX3BsYXllcj86IEFuaW1hdGlvblBsYXllcjtcclxuICBwcml2YXRlIF9zdHlsZXNMb2FkZWQgPSBmYWxzZTtcclxuXHJcbiAgcHJpdmF0ZSBfQ09MTEFQU0VfQUNUSU9OX05BTUUgPSAnY29sbGFwc2UnO1xyXG4gIHByaXZhdGUgX0VYUEFORF9BQ1RJT05fTkFNRSA9ICdleHBhbmQnO1xyXG5cclxuICBwcml2YXRlIHJlYWRvbmx5IF9mYWN0b3J5Q29sbGFwc2VBbmltYXRpb246IEFuaW1hdGlvbkZhY3Rvcnk7XHJcbiAgcHJpdmF0ZSByZWFkb25seSBfZmFjdG9yeUV4cGFuZEFuaW1hdGlvbjogQW5pbWF0aW9uRmFjdG9yeTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIF9lbDogRWxlbWVudFJlZixcclxuICAgIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIsXHJcbiAgICBfYnVpbGRlcjogQW5pbWF0aW9uQnVpbGRlclxyXG4gICkge1xyXG4gICAgdGhpcy5fZmFjdG9yeUNvbGxhcHNlQW5pbWF0aW9uID0gX2J1aWxkZXIuYnVpbGQoY29sbGFwc2VBbmltYXRpb24pO1xyXG4gICAgdGhpcy5fZmFjdG9yeUV4cGFuZEFuaW1hdGlvbiA9IF9idWlsZGVyLmJ1aWxkKGV4cGFuZEFuaW1hdGlvbik7XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyVmlld0NoZWNrZWQoKTogdm9pZCB7XHJcbiAgICB0aGlzLl9zdHlsZXNMb2FkZWQgPSB0cnVlO1xyXG5cclxuICAgIGlmICghdGhpcy5fcGxheWVyIHx8ICF0aGlzLl9pc0FuaW1hdGlvbkRvbmUpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX3BsYXllci5yZXNldCgpO1xyXG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fZWwubmF0aXZlRWxlbWVudCwgJ2hlaWdodCcsICcqJyk7XHJcbiAgfVxyXG5cclxuICAvKiogYWxsb3dzIHRvIG1hbnVhbGx5IHRvZ2dsZSBjb250ZW50IHZpc2liaWxpdHkgKi9cclxuICB0b2dnbGUoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5pc0V4cGFuZGVkKSB7XHJcbiAgICAgIHRoaXMuaGlkZSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5zaG93KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiogYWxsb3dzIHRvIG1hbnVhbGx5IGhpZGUgY29udGVudCAqL1xyXG4gIGhpZGUoKTogdm9pZCB7XHJcbiAgICB0aGlzLmlzQ29sbGFwc2luZyA9IHRydWU7XHJcbiAgICB0aGlzLmlzRXhwYW5kZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuaXNDb2xsYXBzZWQgPSB0cnVlO1xyXG4gICAgdGhpcy5pc0NvbGxhcHNpbmcgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLmNvbGxhcHNlcy5lbWl0KHRoaXMpO1xyXG5cclxuICAgIHRoaXMuX2lzQW5pbWF0aW9uRG9uZSA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuYW5pbWF0aW9uUnVuKHRoaXMuaXNBbmltYXRlZCwgdGhpcy5fQ09MTEFQU0VfQUNUSU9OX05BTUUpKCgpID0+IHtcclxuICAgICAgdGhpcy5faXNBbmltYXRpb25Eb25lID0gdHJ1ZTtcclxuICAgICAgaWYgKHRoaXMuY29sbGFwc2VOZXdWYWx1ZSAhPT0gdGhpcy5pc0NvbGxhcHNlZCAmJiB0aGlzLmlzQW5pbWF0ZWQpIHtcclxuICAgICAgICB0aGlzLnNob3coKTtcclxuXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuY29sbGFwc2VkLmVtaXQodGhpcyk7XHJcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQsICdkaXNwbGF5JywgJ25vbmUnKTtcclxuICAgIH0pO1xyXG4gIH1cclxuICAvKiogYWxsb3dzIHRvIG1hbnVhbGx5IHNob3cgY29sbGFwc2VkIGNvbnRlbnQgKi9cclxuICBzaG93KCk6IHZvaWQge1xyXG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fZWwubmF0aXZlRWxlbWVudCwgJ2Rpc3BsYXknLCB0aGlzLl9kaXNwbGF5KTtcclxuXHJcbiAgICB0aGlzLmlzQ29sbGFwc2luZyA9IHRydWU7XHJcbiAgICB0aGlzLmlzRXhwYW5kZWQgPSB0cnVlO1xyXG4gICAgdGhpcy5pc0NvbGxhcHNlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5pc0NvbGxhcHNpbmcgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLmV4cGFuZHMuZW1pdCh0aGlzKTtcclxuXHJcbiAgICB0aGlzLl9pc0FuaW1hdGlvbkRvbmUgPSBmYWxzZTtcclxuICAgIHRoaXMuYW5pbWF0aW9uUnVuKHRoaXMuaXNBbmltYXRlZCwgdGhpcy5fRVhQQU5EX0FDVElPTl9OQU1FKSgoKSA9PiB7XHJcbiAgICAgIHRoaXMuX2lzQW5pbWF0aW9uRG9uZSA9IHRydWU7XHJcbiAgICAgIGlmICh0aGlzLmNvbGxhcHNlTmV3VmFsdWUgIT09IHRoaXMuaXNDb2xsYXBzZWQgJiYgdGhpcy5pc0FuaW1hdGVkKSB7XHJcbiAgICAgICAgdGhpcy5oaWRlKCk7XHJcblxyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmV4cGFuZGVkLmVtaXQodGhpcyk7XHJcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZVN0eWxlKHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQsICdvdmVyZmxvdycpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBhbmltYXRpb25SdW4oaXNBbmltYXRlZDogYm9vbGVhbiwgYWN0aW9uOiBzdHJpbmcpIHtcclxuICAgIGlmICghaXNBbmltYXRlZCB8fCAhdGhpcy5fc3R5bGVzTG9hZGVkKSB7XHJcbiAgICAgIHJldHVybiAoY2FsbGJhY2s6ICgpID0+IHZvaWQpID0+IGNhbGxiYWNrKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fZWwubmF0aXZlRWxlbWVudCwgJ292ZXJmbG93JywgJ2hpZGRlbicpO1xyXG4gICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5fZWwubmF0aXZlRWxlbWVudCwgJ2NvbGxhcHNlJyk7XHJcblxyXG4gICAgY29uc3QgZmFjdG9yeUFuaW1hdGlvbiA9IChhY3Rpb24gPT09IHRoaXMuX0VYUEFORF9BQ1RJT05fTkFNRSlcclxuICAgICAgPyB0aGlzLl9mYWN0b3J5RXhwYW5kQW5pbWF0aW9uXHJcbiAgICAgIDogdGhpcy5fZmFjdG9yeUNvbGxhcHNlQW5pbWF0aW9uO1xyXG5cclxuICAgIGlmICh0aGlzLl9wbGF5ZXIpIHtcclxuICAgICAgdGhpcy5fcGxheWVyLmRlc3Ryb3koKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9wbGF5ZXIgPSBmYWN0b3J5QW5pbWF0aW9uLmNyZWF0ZSh0aGlzLl9lbC5uYXRpdmVFbGVtZW50KTtcclxuICAgIHRoaXMuX3BsYXllci5wbGF5KCk7XHJcblxyXG4gICAgcmV0dXJuIChjYWxsYmFjazogKCkgPT4gdm9pZCkgPT4gdGhpcy5fcGxheWVyPy5vbkRvbmUoY2FsbGJhY2spO1xyXG4gIH1cclxufVxyXG4iXX0=