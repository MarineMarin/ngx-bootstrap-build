import { NgModule } from '@angular/core';
import { PositioningService } from 'ngx-bootstrap/positioning';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { FocusTrapModule } from 'ngx-bootstrap/focus-trap';
import { ModalBackdropComponent } from './modal-backdrop.component';
import { ModalDirective } from './modal.directive';
import { ModalContainerComponent } from './modal-container.component';
import { BsModalService } from './bs-modal.service';
import * as i0 from "@angular/core";
export const focusTrapModule = FocusTrapModule.forRoot();
export class ModalModule {
    static forRoot() {
        return {
            ngModule: ModalModule,
            providers: [BsModalService, ComponentLoaderFactory, PositioningService]
        };
    }
    static forChild() {
        return {
            ngModule: ModalModule,
            providers: [BsModalService, ComponentLoaderFactory, PositioningService]
        };
    }
}
ModalModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: ModalModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ModalModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: ModalModule, declarations: [ModalBackdropComponent,
        ModalDirective,
        ModalContainerComponent], imports: [FocusTrapModule], exports: [ModalBackdropComponent, ModalDirective] });
ModalModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: ModalModule, imports: [[FocusTrapModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: ModalModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [FocusTrapModule],
                    declarations: [
                        ModalBackdropComponent,
                        ModalDirective,
                        ModalContainerComponent
                    ],
                    exports: [ModalBackdropComponent, ModalDirective],
                    entryComponents: [ModalBackdropComponent, ModalContainerComponent]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZGFsL21vZGFsLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUF1QixNQUFNLGVBQWUsQ0FBQztBQUU5RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUN4RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFM0QsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDcEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3RFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7QUFFcEQsTUFBTSxDQUFDLE1BQU0sZUFBZSxHQUFHLGVBQWUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQVl6RCxNQUFNLE9BQU8sV0FBVztJQUN0QixNQUFNLENBQUMsT0FBTztRQUNaLE9BQU87WUFDTCxRQUFRLEVBQUUsV0FBVztZQUNyQixTQUFTLEVBQUUsQ0FBQyxjQUFjLEVBQUUsc0JBQXNCLEVBQUUsa0JBQWtCLENBQUM7U0FDeEUsQ0FBQztJQUNKLENBQUM7SUFDRCxNQUFNLENBQUMsUUFBUTtRQUNiLE9BQU87WUFDTCxRQUFRLEVBQUUsV0FBVztZQUNyQixTQUFTLEVBQUUsQ0FBQyxjQUFjLEVBQUUsc0JBQXNCLEVBQUUsa0JBQWtCLENBQUM7U0FDeEUsQ0FBQztJQUNKLENBQUM7O3dHQVpVLFdBQVc7eUdBQVgsV0FBVyxpQkFQcEIsc0JBQXNCO1FBQ3RCLGNBQWM7UUFDZCx1QkFBdUIsYUFKZixlQUFlLGFBTWYsc0JBQXNCLEVBQUUsY0FBYzt5R0FHckMsV0FBVyxZQVRiLENBQUMsZUFBZSxDQUFDOzJGQVNmLFdBQVc7a0JBVnZCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsZUFBZSxDQUFDO29CQUMxQixZQUFZLEVBQUU7d0JBQ1osc0JBQXNCO3dCQUN0QixjQUFjO3dCQUNkLHVCQUF1QjtxQkFDeEI7b0JBQ0QsT0FBTyxFQUFFLENBQUMsc0JBQXNCLEVBQUUsY0FBYyxDQUFDO29CQUNqRCxlQUFlLEVBQUUsQ0FBQyxzQkFBc0IsRUFBRSx1QkFBdUIsQ0FBQztpQkFDbkUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgUG9zaXRpb25pbmdTZXJ2aWNlIH0gZnJvbSAnbmd4LWJvb3RzdHJhcC9wb3NpdGlvbmluZyc7XHJcbmltcG9ydCB7IENvbXBvbmVudExvYWRlckZhY3RvcnkgfSBmcm9tICduZ3gtYm9vdHN0cmFwL2NvbXBvbmVudC1sb2FkZXInO1xyXG5pbXBvcnQgeyBGb2N1c1RyYXBNb2R1bGUgfSBmcm9tICduZ3gtYm9vdHN0cmFwL2ZvY3VzLXRyYXAnO1xyXG5cclxuaW1wb3J0IHsgTW9kYWxCYWNrZHJvcENvbXBvbmVudCB9IGZyb20gJy4vbW9kYWwtYmFja2Ryb3AuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTW9kYWxEaXJlY3RpdmUgfSBmcm9tICcuL21vZGFsLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IE1vZGFsQ29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi9tb2RhbC1jb250YWluZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQnNNb2RhbFNlcnZpY2UgfSBmcm9tICcuL2JzLW1vZGFsLnNlcnZpY2UnO1xyXG5cclxuZXhwb3J0IGNvbnN0IGZvY3VzVHJhcE1vZHVsZSA9IEZvY3VzVHJhcE1vZHVsZS5mb3JSb290KCk7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtGb2N1c1RyYXBNb2R1bGVdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgTW9kYWxCYWNrZHJvcENvbXBvbmVudCxcclxuICAgIE1vZGFsRGlyZWN0aXZlLFxyXG4gICAgTW9kYWxDb250YWluZXJDb21wb25lbnRcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtNb2RhbEJhY2tkcm9wQ29tcG9uZW50LCBNb2RhbERpcmVjdGl2ZV0sXHJcbiAgZW50cnlDb21wb25lbnRzOiBbTW9kYWxCYWNrZHJvcENvbXBvbmVudCwgTW9kYWxDb250YWluZXJDb21wb25lbnRdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNb2RhbE1vZHVsZSB7XHJcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVyczxNb2RhbE1vZHVsZT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmdNb2R1bGU6IE1vZGFsTW9kdWxlLFxyXG4gICAgICBwcm92aWRlcnM6IFtCc01vZGFsU2VydmljZSwgQ29tcG9uZW50TG9hZGVyRmFjdG9yeSwgUG9zaXRpb25pbmdTZXJ2aWNlXVxyXG4gICAgfTtcclxuICB9XHJcbiAgc3RhdGljIGZvckNoaWxkKCk6IE1vZHVsZVdpdGhQcm92aWRlcnM8TW9kYWxNb2R1bGU+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5nTW9kdWxlOiBNb2RhbE1vZHVsZSxcclxuICAgICAgcHJvdmlkZXJzOiBbQnNNb2RhbFNlcnZpY2UsIENvbXBvbmVudExvYWRlckZhY3RvcnksIFBvc2l0aW9uaW5nU2VydmljZV1cclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==