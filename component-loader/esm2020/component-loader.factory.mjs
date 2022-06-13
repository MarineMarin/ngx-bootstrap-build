import { ApplicationRef, ComponentFactoryResolver, Injectable, Injector, NgZone } from '@angular/core';
import { ComponentLoader } from './component-loader.class';
import { PositioningService } from 'ngx-bootstrap/positioning';
import * as i0 from "@angular/core";
import * as i1 from "ngx-bootstrap/positioning";
export class ComponentLoaderFactory {
    constructor(_componentFactoryResolver, _ngZone, _injector, _posService, _applicationRef) {
        this._componentFactoryResolver = _componentFactoryResolver;
        this._ngZone = _ngZone;
        this._injector = _injector;
        this._posService = _posService;
        this._applicationRef = _applicationRef;
    }
    /**
     *
     * @param _elementRef
     * @param _viewContainerRef
     * @param _renderer
     */
    createLoader(_elementRef, _viewContainerRef, _renderer) {
        return new ComponentLoader(_viewContainerRef, _renderer, _elementRef, this._injector, this._componentFactoryResolver, this._ngZone, this._applicationRef, this._posService);
    }
}
ComponentLoaderFactory.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: ComponentLoaderFactory, deps: [{ token: i0.ComponentFactoryResolver }, { token: i0.NgZone }, { token: i0.Injector }, { token: i1.PositioningService }, { token: i0.ApplicationRef }], target: i0.ɵɵFactoryTarget.Injectable });
ComponentLoaderFactory.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: ComponentLoaderFactory, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: ComponentLoaderFactory, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i0.NgZone }, { type: i0.Injector }, { type: i1.PositioningService }, { type: i0.ApplicationRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LWxvYWRlci5mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudC1sb2FkZXIvY29tcG9uZW50LWxvYWRlci5mYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxjQUFjLEVBQUUsd0JBQXdCLEVBQWMsVUFBVSxFQUFFLFFBQVEsRUFDMUUsTUFBTSxFQUNQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQzs7O0FBRy9ELE1BQU0sT0FBTyxzQkFBc0I7SUFDakMsWUFBb0IseUJBQW1ELEVBQ25ELE9BQWUsRUFDZixTQUFtQixFQUNuQixXQUErQixFQUMvQixlQUErQjtRQUovQiw4QkFBeUIsR0FBekIseUJBQXlCLENBQTBCO1FBQ25ELFlBQU8sR0FBUCxPQUFPLENBQVE7UUFDZixjQUFTLEdBQVQsU0FBUyxDQUFVO1FBQ25CLGdCQUFXLEdBQVgsV0FBVyxDQUFvQjtRQUMvQixvQkFBZSxHQUFmLGVBQWUsQ0FBZ0I7SUFBRyxDQUFDO0lBRXZEOzs7OztPQUtHO0lBQ0gsWUFBWSxDQUFJLFdBQXdCLEVBQ3hCLGlCQUFvQyxFQUNwQyxTQUFxQjtRQUNuQyxPQUFPLElBQUksZUFBZSxDQUN4QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFdBQVcsRUFDWCxJQUFJLENBQUMsU0FBUyxFQUNkLElBQUksQ0FBQyx5QkFBeUIsRUFDOUIsSUFBSSxDQUFDLE9BQU8sRUFDWixJQUFJLENBQUMsZUFBZSxFQUNwQixJQUFJLENBQUMsV0FBVyxDQUNqQixDQUFDO0lBQ0osQ0FBQzs7bUhBMUJVLHNCQUFzQjt1SEFBdEIsc0JBQXNCLGNBRFYsTUFBTTsyRkFDbEIsc0JBQXNCO2tCQURsQyxVQUFVO21CQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQXBwbGljYXRpb25SZWYsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgRWxlbWVudFJlZiwgSW5qZWN0YWJsZSwgSW5qZWN0b3IsXHJcbiAgTmdab25lLCBSZW5kZXJlcjIsIFZpZXdDb250YWluZXJSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tcG9uZW50TG9hZGVyIH0gZnJvbSAnLi9jb21wb25lbnQtbG9hZGVyLmNsYXNzJztcclxuaW1wb3J0IHsgUG9zaXRpb25pbmdTZXJ2aWNlIH0gZnJvbSAnbmd4LWJvb3RzdHJhcC9wb3NpdGlvbmluZyc7XHJcblxyXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnfSlcclxuZXhwb3J0IGNsYXNzIENvbXBvbmVudExvYWRlckZhY3Rvcnkge1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2NvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxyXG4gICAgICAgICAgICAgIHByaXZhdGUgX25nWm9uZTogTmdab25lLFxyXG4gICAgICAgICAgICAgIHByaXZhdGUgX2luamVjdG9yOiBJbmplY3RvcixcclxuICAgICAgICAgICAgICBwcml2YXRlIF9wb3NTZXJ2aWNlOiBQb3NpdGlvbmluZ1NlcnZpY2UsXHJcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfYXBwbGljYXRpb25SZWY6IEFwcGxpY2F0aW9uUmVmKSB7fVxyXG5cclxuICAvKipcclxuICAgKlxyXG4gICAqIEBwYXJhbSBfZWxlbWVudFJlZlxyXG4gICAqIEBwYXJhbSBfdmlld0NvbnRhaW5lclJlZlxyXG4gICAqIEBwYXJhbSBfcmVuZGVyZXJcclxuICAgKi9cclxuICBjcmVhdGVMb2FkZXI8VD4oX2VsZW1lbnRSZWY/OiBFbGVtZW50UmVmLFxyXG4gICAgICAgICAgICAgICAgICBfdmlld0NvbnRhaW5lclJlZj86IFZpZXdDb250YWluZXJSZWYsXHJcbiAgICAgICAgICAgICAgICAgIF9yZW5kZXJlcj86IFJlbmRlcmVyMik6IENvbXBvbmVudExvYWRlcjxUPiB7XHJcbiAgICByZXR1cm4gbmV3IENvbXBvbmVudExvYWRlcjxUPihcclxuICAgICAgX3ZpZXdDb250YWluZXJSZWYsXHJcbiAgICAgIF9yZW5kZXJlcixcclxuICAgICAgX2VsZW1lbnRSZWYsXHJcbiAgICAgIHRoaXMuX2luamVjdG9yLFxyXG4gICAgICB0aGlzLl9jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXHJcbiAgICAgIHRoaXMuX25nWm9uZSxcclxuICAgICAgdGhpcy5fYXBwbGljYXRpb25SZWYsXHJcbiAgICAgIHRoaXMuX3Bvc1NlcnZpY2VcclxuICAgICk7XHJcbiAgfVxyXG59XHJcbiJdfQ==