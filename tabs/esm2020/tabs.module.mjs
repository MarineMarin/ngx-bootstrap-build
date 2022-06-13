import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgTranscludeDirective } from './ng-transclude.directive';
import { TabHeadingDirective } from './tab-heading.directive';
import { TabDirective } from './tab.directive';
import { TabsetComponent } from './tabset.component';
import * as i0 from "@angular/core";
export class TabsModule {
    static forRoot() {
        return {
            ngModule: TabsModule,
            providers: []
        };
    }
}
TabsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: TabsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
TabsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: TabsModule, declarations: [NgTranscludeDirective,
        TabDirective,
        TabsetComponent,
        TabHeadingDirective], imports: [CommonModule], exports: [TabDirective,
        TabsetComponent,
        TabHeadingDirective,
        NgTranscludeDirective] });
TabsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: TabsModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: TabsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [
                        NgTranscludeDirective,
                        TabDirective,
                        TabsetComponent,
                        TabHeadingDirective
                    ],
                    exports: [
                        TabDirective,
                        TabsetComponent,
                        TabHeadingDirective,
                        NgTranscludeDirective
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdGFicy90YWJzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFFOUQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDbEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7QUFpQnJELE1BQU0sT0FBTyxVQUFVO0lBQ3JCLE1BQU0sQ0FBQyxPQUFPO1FBQ1osT0FBTztZQUNMLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFNBQVMsRUFBRSxFQUFFO1NBQ2QsQ0FBQztJQUNKLENBQUM7O3VHQU5VLFVBQVU7d0dBQVYsVUFBVSxpQkFabkIscUJBQXFCO1FBQ3JCLFlBQVk7UUFDWixlQUFlO1FBQ2YsbUJBQW1CLGFBTFgsWUFBWSxhQVFwQixZQUFZO1FBQ1osZUFBZTtRQUNmLG1CQUFtQjtRQUNuQixxQkFBcUI7d0dBR1osVUFBVSxZQWRaLENBQUMsWUFBWSxDQUFDOzJGQWNaLFVBQVU7a0JBZnRCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO29CQUN2QixZQUFZLEVBQUU7d0JBQ1oscUJBQXFCO3dCQUNyQixZQUFZO3dCQUNaLGVBQWU7d0JBQ2YsbUJBQW1CO3FCQUNwQjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixlQUFlO3dCQUNmLG1CQUFtQjt3QkFDbkIscUJBQXFCO3FCQUN0QjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBOZ1RyYW5zY2x1ZGVEaXJlY3RpdmUgfSBmcm9tICcuL25nLXRyYW5zY2x1ZGUuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgVGFiSGVhZGluZ0RpcmVjdGl2ZSB9IGZyb20gJy4vdGFiLWhlYWRpbmcuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgVGFiRGlyZWN0aXZlIH0gZnJvbSAnLi90YWIuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgVGFic2V0Q29tcG9uZW50IH0gZnJvbSAnLi90YWJzZXQuY29tcG9uZW50JztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBOZ1RyYW5zY2x1ZGVEaXJlY3RpdmUsXHJcbiAgICBUYWJEaXJlY3RpdmUsXHJcbiAgICBUYWJzZXRDb21wb25lbnQsXHJcbiAgICBUYWJIZWFkaW5nRGlyZWN0aXZlXHJcbiAgXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBUYWJEaXJlY3RpdmUsXHJcbiAgICBUYWJzZXRDb21wb25lbnQsXHJcbiAgICBUYWJIZWFkaW5nRGlyZWN0aXZlLFxyXG4gICAgTmdUcmFuc2NsdWRlRGlyZWN0aXZlXHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgVGFic01vZHVsZSB7XHJcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVyczxUYWJzTW9kdWxlPiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuZ01vZHVsZTogVGFic01vZHVsZSxcclxuICAgICAgcHJvdmlkZXJzOiBbXVxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19