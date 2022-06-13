import { Component, Input, Output, EventEmitter, forwardRef, TemplateRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DraggableItemService } from './draggable-item.service';
import * as i0 from "@angular/core";
import * as i1 from "./draggable-item.service";
import * as i2 from "@angular/common";
export class SortableComponent {
    constructor(transfer) {
        /** class name for items wrapper */
        this.wrapperClass = '';
        /** style object for items wrapper */
        this.wrapperStyle = {};
        /** class name for item */
        this.itemClass = '';
        /** style object for item */
        this.itemStyle = {};
        /** class name for active item */
        this.itemActiveClass = '';
        /** style object for active item */
        this.itemActiveStyle = {};
        /** class name for placeholder */
        this.placeholderClass = '';
        /** style object for placeholder */
        this.placeholderStyle = {};
        /** placeholder item which will be shown if collection is empty */
        this.placeholderItem = '';
        /** fired on array change (reordering, insert, remove), same as <code>ngModelChange</code>.
         *  Returns new items collection as a payload.
         */
        this.onChange = new EventEmitter();
        this.showPlaceholder = false;
        this.activeItem = -1;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.onTouched = Function.prototype;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.onChanged = Function.prototype;
        this._items = [];
        this.transfer = transfer;
        this.currentZoneIndex = SortableComponent.globalZoneIndex++;
        this.transfer
            .onCaptureItem()
            .subscribe((item) => this.onDrop(item));
    }
    get items() {
        return this._items;
    }
    set items(value) {
        this._items = value;
        const out = this.items.map((x) => x.initData);
        this.onChanged(out);
        this.onChange.emit(out);
    }
    onItemDragstart(event, item, i) {
        this.initDragstartEvent(event);
        this.onTouched();
        this.transfer.dragStart({
            event,
            item,
            i,
            initialIndex: i,
            lastZoneIndex: this.currentZoneIndex,
            overZoneIndex: this.currentZoneIndex
        });
    }
    onItemDragover(event, i) {
        if (!this.transfer.getItem()) {
            return;
        }
        event.preventDefault();
        const dragItem = this.transfer.captureItem(this.currentZoneIndex, this.items.length);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let newArray = [];
        if (!dragItem) {
            return;
        }
        if (!this.items.length) {
            newArray = [dragItem.item];
        }
        else if (dragItem.i > i) {
            newArray = [
                ...this.items.slice(0, i),
                dragItem.item,
                ...this.items.slice(i, dragItem.i),
                ...this.items.slice(dragItem.i + 1)
            ];
        }
        else {
            // this.draggedItem.i < i
            newArray = [
                ...this.items.slice(0, dragItem.i),
                ...this.items.slice(dragItem.i + 1, i + 1),
                dragItem.item,
                ...this.items.slice(i + 1)
            ];
        }
        this.items = newArray;
        dragItem.i = i;
        this.activeItem = i;
        this.updatePlaceholderState();
    }
    cancelEvent(event) {
        if (!this.transfer.getItem() || !event) {
            return;
        }
        event.preventDefault();
    }
    onDrop(item) {
        if (item &&
            item.overZoneIndex !== this.currentZoneIndex &&
            item.lastZoneIndex === this.currentZoneIndex) {
            this.items = this.items.filter((x, i) => i !== item.i);
            this.updatePlaceholderState();
        }
        this.resetActiveItem();
    }
    resetActiveItem(event) {
        this.cancelEvent(event);
        this.activeItem = -1;
    }
    registerOnChange(callback) {
        this.onChanged = callback;
    }
    registerOnTouched(callback) {
        this.onTouched = callback;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    writeValue(value) {
        if (value) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.items = value.map((x, i) => ({
                id: i,
                initData: x,
                value: this.fieldName ? x[this.fieldName] : x
            }));
        }
        else {
            this.items = [];
        }
        this.updatePlaceholderState();
    }
    updatePlaceholderState() {
        this.showPlaceholder = !this._items.length;
    }
    getItemStyle(isActive) {
        return isActive
            ? Object.assign({}, this.itemStyle, this.itemActiveStyle)
            : this.itemStyle;
    }
    initDragstartEvent(event) {
        // it is necessary for mozilla
        // data type should be 'Text' instead of 'text/plain' to keep compatibility
        // with IE
        event.dataTransfer?.setData('Text', 'placeholder');
    }
}
SortableComponent.globalZoneIndex = 0;
SortableComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: SortableComponent, deps: [{ token: i1.DraggableItemService }], target: i0.ɵɵFactoryTarget.Component });
SortableComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.1", type: SortableComponent, selector: "bs-sortable", inputs: { fieldName: "fieldName", wrapperClass: "wrapperClass", wrapperStyle: "wrapperStyle", itemClass: "itemClass", itemStyle: "itemStyle", itemActiveClass: "itemActiveClass", itemActiveStyle: "itemActiveStyle", placeholderClass: "placeholderClass", placeholderStyle: "placeholderStyle", placeholderItem: "placeholderItem", itemTemplate: "itemTemplate" }, outputs: { onChange: "onChange" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SortableComponent),
            multi: true
        }
    ], exportAs: ["bs-sortable"], ngImport: i0, template: `
<div
    [ngClass]="wrapperClass"
    [ngStyle]="wrapperStyle"
    (dragover)="cancelEvent($event)"
    (dragenter)="cancelEvent($event)"
    (drop)="resetActiveItem($event)"
    (mouseleave)="resetActiveItem($event)">
  <div
        *ngIf="showPlaceholder"
        [ngClass]="placeholderClass"
        [ngStyle]="placeholderStyle"
        (dragover)="onItemDragover($event, 0)"
        (dragenter)="cancelEvent($event)"
    >{{placeholderItem}}</div>
    <div
        *ngFor="let item of items; let i=index;"
        [ngClass]="[ itemClass, i === activeItem ? itemActiveClass : '' ]"
        [ngStyle]="getItemStyle(i === activeItem)"
        draggable="true"
        (dragstart)="onItemDragstart($event, item, i)"
        (dragend)="resetActiveItem($event)"
        (dragover)="onItemDragover($event, i)"
        (dragenter)="cancelEvent($event)"
        aria-dropeffect="move"
        [attr.aria-grabbed]="i === activeItem"
    ><ng-template [ngTemplateOutlet]="itemTemplate || defItemTemplate"
  [ngTemplateOutletContext]="{item:item, index: i}"></ng-template></div>
</div>

<ng-template #defItemTemplate let-item="item">{{item.value}}</ng-template>
`, isInline: true, directives: [{ type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: SortableComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'bs-sortable',
                    exportAs: 'bs-sortable',
                    template: `
<div
    [ngClass]="wrapperClass"
    [ngStyle]="wrapperStyle"
    (dragover)="cancelEvent($event)"
    (dragenter)="cancelEvent($event)"
    (drop)="resetActiveItem($event)"
    (mouseleave)="resetActiveItem($event)">
  <div
        *ngIf="showPlaceholder"
        [ngClass]="placeholderClass"
        [ngStyle]="placeholderStyle"
        (dragover)="onItemDragover($event, 0)"
        (dragenter)="cancelEvent($event)"
    >{{placeholderItem}}</div>
    <div
        *ngFor="let item of items; let i=index;"
        [ngClass]="[ itemClass, i === activeItem ? itemActiveClass : '' ]"
        [ngStyle]="getItemStyle(i === activeItem)"
        draggable="true"
        (dragstart)="onItemDragstart($event, item, i)"
        (dragend)="resetActiveItem($event)"
        (dragover)="onItemDragover($event, i)"
        (dragenter)="cancelEvent($event)"
        aria-dropeffect="move"
        [attr.aria-grabbed]="i === activeItem"
    ><ng-template [ngTemplateOutlet]="itemTemplate || defItemTemplate"
  [ngTemplateOutletContext]="{item:item, index: i}"></ng-template></div>
</div>

<ng-template #defItemTemplate let-item="item">{{item.value}}</ng-template>
`,
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => SortableComponent),
                            multi: true
                        }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i1.DraggableItemService }]; }, propDecorators: { fieldName: [{
                type: Input
            }], wrapperClass: [{
                type: Input
            }], wrapperStyle: [{
                type: Input
            }], itemClass: [{
                type: Input
            }], itemStyle: [{
                type: Input
            }], itemActiveClass: [{
                type: Input
            }], itemActiveStyle: [{
                type: Input
            }], placeholderClass: [{
                type: Input
            }], placeholderStyle: [{
                type: Input
            }], placeholderItem: [{
                type: Input
            }], itemTemplate: [{
                type: Input
            }], onChange: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydGFibGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3NvcnRhYmxlL3NvcnRhYmxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUNaLFVBQVUsRUFDVixXQUFXLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGlCQUFpQixFQUF3QixNQUFNLGdCQUFnQixDQUFDO0FBRXpFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDOzs7O0FBNkNoRSxNQUFNLE9BQU8saUJBQWlCO0lBK0Q1QixZQUFZLFFBQThCO1FBMUQxQyxtQ0FBbUM7UUFDMUIsaUJBQVksR0FBRyxFQUFFLENBQUM7UUFFM0IscUNBQXFDO1FBQzVCLGlCQUFZLEdBQTJCLEVBQUUsQ0FBQztRQUVuRCwwQkFBMEI7UUFDakIsY0FBUyxHQUFHLEVBQUUsQ0FBQztRQUV4Qiw0QkFBNEI7UUFDbkIsY0FBUyxHQUEyQixFQUFFLENBQUM7UUFFaEQsaUNBQWlDO1FBQ3hCLG9CQUFlLEdBQUcsRUFBRSxDQUFDO1FBRTlCLG1DQUFtQztRQUMxQixvQkFBZSxHQUEyQixFQUFFLENBQUM7UUFFdEQsaUNBQWlDO1FBQ3hCLHFCQUFnQixHQUFHLEVBQUUsQ0FBQztRQUUvQixtQ0FBbUM7UUFDMUIscUJBQWdCLEdBQTJCLEVBQUUsQ0FBQztRQUV2RCxrRUFBa0U7UUFDekQsb0JBQWUsR0FBRyxFQUFFLENBQUM7UUFLOUI7O1dBRUc7UUFDTyxhQUFRLEdBQTRCLElBQUksWUFBWSxFQUFhLENBQUM7UUFFNUUsb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFDeEIsZUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBYWhCLDhEQUE4RDtRQUM5RCxjQUFTLEdBQVEsUUFBUSxDQUFDLFNBQVMsQ0FBQztRQUNwQyw4REFB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ZSxHQUFHLENBQUUsQ0FBQTs4R0FEeEIsaUJBQWlCO2tHQUFqQixpQkFBaUIsK2FBUmpCO1FBQ1Q7WUFDRSxPQUFPLEVBQUUsaUJBQWlCO1lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsaUJBQWlCLENBQUM7WUFDaEQsS0FBSyxFQUFFLElBQUk7U0FDWjtLQUNGLHFEQXRDUzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQStCWDsyRkFTWSxpQkFBaUI7a0JBM0M3QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxhQUFhO29CQUN2QixRQUFRLEVBQUUsYUFBYTtvQkFDdkIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBK0JYO29CQUNDLFNBQVMsRUFBRTt3QkFDVDs0QkFDRSxPQUFPLEVBQUUsaUJBQWlCOzRCQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxrQkFBa0IsQ0FBQzs0QkFDaEQsS0FBSyxFQUFFLElBQUk7eUJBQ1o7cUJBQ0Y7aUJBQ0Y7MkdBSVUsU0FBUztzQkFBakIsS0FBSztnQkFHRyxZQUFZO3NCQUFwQixLQUFLO2dCQUdHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBR0csU0FBUztzQkFBakIsS0FBSztnQkFHRyxTQUFTO3NCQUFqQixLQUFLO2dCQUdHLGVBQWU7c0JBQXZCLEtBQUs7Z0JBR0csZUFBZTtzQkFBdkIsS0FBSztnQkFHRyxnQkFBZ0I7c0JBQXhCLEtBQUs7Z0JBR0csZ0JBQWdCO3NCQUF4QixLQUFLO2dCQUdHLGVBQWU7c0JBQXZCLEtBQUs7Z0JBR0csWUFBWTtzQkFBcEIsS0FBSztnQkFLSSxRQUFRO3NCQUFqQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBmb3J3YXJkUmVmLFxyXG4gIFRlbXBsYXRlUmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3NvciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgRHJhZ2dhYmxlSXRlbSB9IGZyb20gJy4vZHJhZ2dhYmxlLWl0ZW0nO1xyXG5pbXBvcnQgeyBEcmFnZ2FibGVJdGVtU2VydmljZSB9IGZyb20gJy4vZHJhZ2dhYmxlLWl0ZW0uc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2JzLXNvcnRhYmxlJyxcclxuICBleHBvcnRBczogJ2JzLXNvcnRhYmxlJyxcclxuICB0ZW1wbGF0ZTogYFxyXG48ZGl2XHJcbiAgICBbbmdDbGFzc109XCJ3cmFwcGVyQ2xhc3NcIlxyXG4gICAgW25nU3R5bGVdPVwid3JhcHBlclN0eWxlXCJcclxuICAgIChkcmFnb3Zlcik9XCJjYW5jZWxFdmVudCgkZXZlbnQpXCJcclxuICAgIChkcmFnZW50ZXIpPVwiY2FuY2VsRXZlbnQoJGV2ZW50KVwiXHJcbiAgICAoZHJvcCk9XCJyZXNldEFjdGl2ZUl0ZW0oJGV2ZW50KVwiXHJcbiAgICAobW91c2VsZWF2ZSk9XCJyZXNldEFjdGl2ZUl0ZW0oJGV2ZW50KVwiPlxyXG4gIDxkaXZcclxuICAgICAgICAqbmdJZj1cInNob3dQbGFjZWhvbGRlclwiXHJcbiAgICAgICAgW25nQ2xhc3NdPVwicGxhY2Vob2xkZXJDbGFzc1wiXHJcbiAgICAgICAgW25nU3R5bGVdPVwicGxhY2Vob2xkZXJTdHlsZVwiXHJcbiAgICAgICAgKGRyYWdvdmVyKT1cIm9uSXRlbURyYWdvdmVyKCRldmVudCwgMClcIlxyXG4gICAgICAgIChkcmFnZW50ZXIpPVwiY2FuY2VsRXZlbnQoJGV2ZW50KVwiXHJcbiAgICA+e3twbGFjZWhvbGRlckl0ZW19fTwvZGl2PlxyXG4gICAgPGRpdlxyXG4gICAgICAgICpuZ0Zvcj1cImxldCBpdGVtIG9mIGl0ZW1zOyBsZXQgaT1pbmRleDtcIlxyXG4gICAgICAgIFtuZ0NsYXNzXT1cIlsgaXRlbUNsYXNzLCBpID09PSBhY3RpdmVJdGVtID8gaXRlbUFjdGl2ZUNsYXNzIDogJycgXVwiXHJcbiAgICAgICAgW25nU3R5bGVdPVwiZ2V0SXRlbVN0eWxlKGkgPT09IGFjdGl2ZUl0ZW0pXCJcclxuICAgICAgICBkcmFnZ2FibGU9XCJ0cnVlXCJcclxuICAgICAgICAoZHJhZ3N0YXJ0KT1cIm9uSXRlbURyYWdzdGFydCgkZXZlbnQsIGl0ZW0sIGkpXCJcclxuICAgICAgICAoZHJhZ2VuZCk9XCJyZXNldEFjdGl2ZUl0ZW0oJGV2ZW50KVwiXHJcbiAgICAgICAgKGRyYWdvdmVyKT1cIm9uSXRlbURyYWdvdmVyKCRldmVudCwgaSlcIlxyXG4gICAgICAgIChkcmFnZW50ZXIpPVwiY2FuY2VsRXZlbnQoJGV2ZW50KVwiXHJcbiAgICAgICAgYXJpYS1kcm9wZWZmZWN0PVwibW92ZVwiXHJcbiAgICAgICAgW2F0dHIuYXJpYS1ncmFiYmVkXT1cImkgPT09IGFjdGl2ZUl0ZW1cIlxyXG4gICAgPjxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJpdGVtVGVtcGxhdGUgfHwgZGVmSXRlbVRlbXBsYXRlXCJcclxuICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie2l0ZW06aXRlbSwgaW5kZXg6IGl9XCI+PC9uZy10ZW1wbGF0ZT48L2Rpdj5cclxuPC9kaXY+XHJcblxyXG48bmctdGVtcGxhdGUgI2RlZkl0ZW1UZW1wbGF0ZSBsZXQtaXRlbT1cIml0ZW1cIj57e2l0ZW0udmFsdWV9fTwvbmctdGVtcGxhdGU+XHJcbmAsXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICB7XHJcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxyXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBTb3J0YWJsZUNvbXBvbmVudCksXHJcbiAgICAgIG11bHRpOiB0cnVlXHJcbiAgICB9XHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgU29ydGFibGVDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgZ2xvYmFsWm9uZUluZGV4ID0gMDtcclxuICAvKiogZmllbGQgbmFtZSBpZiBpbnB1dCBhcnJheSBjb25zaXN0cyBvZiBvYmplY3RzICovXHJcbiAgQElucHV0KCkgZmllbGROYW1lPzogc3RyaW5nO1xyXG5cclxuICAvKiogY2xhc3MgbmFtZSBmb3IgaXRlbXMgd3JhcHBlciAqL1xyXG4gIEBJbnB1dCgpIHdyYXBwZXJDbGFzcyA9ICcnO1xyXG5cclxuICAvKiogc3R5bGUgb2JqZWN0IGZvciBpdGVtcyB3cmFwcGVyICovXHJcbiAgQElucHV0KCkgd3JhcHBlclN0eWxlOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge307XHJcblxyXG4gIC8qKiBjbGFzcyBuYW1lIGZvciBpdGVtICovXHJcbiAgQElucHV0KCkgaXRlbUNsYXNzID0gJyc7XHJcblxyXG4gIC8qKiBzdHlsZSBvYmplY3QgZm9yIGl0ZW0gKi9cclxuICBASW5wdXQoKSBpdGVtU3R5bGU6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7fTtcclxuXHJcbiAgLyoqIGNsYXNzIG5hbWUgZm9yIGFjdGl2ZSBpdGVtICovXHJcbiAgQElucHV0KCkgaXRlbUFjdGl2ZUNsYXNzID0gJyc7XHJcblxyXG4gIC8qKiBzdHlsZSBvYmplY3QgZm9yIGFjdGl2ZSBpdGVtICovXHJcbiAgQElucHV0KCkgaXRlbUFjdGl2ZVN0eWxlOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge307XHJcblxyXG4gIC8qKiBjbGFzcyBuYW1lIGZvciBwbGFjZWhvbGRlciAqL1xyXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyQ2xhc3MgPSAnJztcclxuXHJcbiAgLyoqIHN0eWxlIG9iamVjdCBmb3IgcGxhY2Vob2xkZXIgKi9cclxuICBASW5wdXQoKSBwbGFjZWhvbGRlclN0eWxlOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge307XHJcblxyXG4gIC8qKiBwbGFjZWhvbGRlciBpdGVtIHdoaWNoIHdpbGwgYmUgc2hvd24gaWYgY29sbGVjdGlvbiBpcyBlbXB0eSAqL1xyXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVySXRlbSA9ICcnO1xyXG5cclxuICAvKiogdXNlZCB0byBzcGVjaWZ5IGEgY3VzdG9tIGl0ZW0gdGVtcGxhdGUuIFRlbXBsYXRlIHZhcmlhYmxlczogaXRlbSBhbmQgaW5kZXg7ICovXHJcbiAgQElucHV0KCkgaXRlbVRlbXBsYXRlPzogVGVtcGxhdGVSZWY8dW5rbm93bj47XHJcblxyXG4gIC8qKiBmaXJlZCBvbiBhcnJheSBjaGFuZ2UgKHJlb3JkZXJpbmcsIGluc2VydCwgcmVtb3ZlKSwgc2FtZSBhcyA8Y29kZT5uZ01vZGVsQ2hhbmdlPC9jb2RlPi5cclxuICAgKiAgUmV0dXJucyBuZXcgaXRlbXMgY29sbGVjdGlvbiBhcyBhIHBheWxvYWQuXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIG9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8dW5rbm93bltdPiA9IG5ldyBFdmVudEVtaXR0ZXI8dW5rbm93bltdPigpO1xyXG5cclxuICBzaG93UGxhY2Vob2xkZXIgPSBmYWxzZTtcclxuICBhY3RpdmVJdGVtID0gLTE7XHJcblxyXG4gIGdldCBpdGVtcygpOiBTb3J0YWJsZUl0ZW1bXSB7XHJcbiAgICByZXR1cm4gdGhpcy5faXRlbXM7XHJcbiAgfVxyXG5cclxuICBzZXQgaXRlbXModmFsdWU6IFNvcnRhYmxlSXRlbVtdKSB7XHJcbiAgICB0aGlzLl9pdGVtcyA9IHZhbHVlO1xyXG4gICAgY29uc3Qgb3V0ID0gdGhpcy5pdGVtcy5tYXAoKHg6IFNvcnRhYmxlSXRlbSkgPT4geC5pbml0RGF0YSk7XHJcbiAgICB0aGlzLm9uQ2hhbmdlZChvdXQpO1xyXG4gICAgdGhpcy5vbkNoYW5nZS5lbWl0KG91dCk7XHJcbiAgfVxyXG5cclxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxyXG4gIG9uVG91Y2hlZDogYW55ID0gRnVuY3Rpb24ucHJvdG90eXBlO1xyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XHJcbiAgb25DaGFuZ2VkOiBhbnkgPSBGdW5jdGlvbi5wcm90b3R5cGU7XHJcblxyXG4gIHByaXZhdGUgdHJhbnNmZXI6IERyYWdnYWJsZUl0ZW1TZXJ2aWNlO1xyXG4gIHByaXZhdGUgY3VycmVudFpvbmVJbmRleDogbnVtYmVyO1xyXG4gIHByaXZhdGUgX2l0ZW1zOiBTb3J0YWJsZUl0ZW1bXSA9IFtdO1xyXG5cclxuICBjb25zdHJ1Y3Rvcih0cmFuc2ZlcjogRHJhZ2dhYmxlSXRlbVNlcnZpY2UpIHtcclxuICAgIHRoaXMudHJhbnNmZXIgPSB0cmFuc2ZlcjtcclxuICAgIHRoaXMuY3VycmVudFpvbmVJbmRleCA9IFNvcnRhYmxlQ29tcG9uZW50Lmdsb2JhbFpvbmVJbmRleCsrO1xyXG4gICAgdGhpcy50cmFuc2ZlclxyXG4gICAgICAub25DYXB0dXJlSXRlbSgpXHJcbiAgICAgIC5zdWJzY3JpYmUoKGl0ZW06IERyYWdnYWJsZUl0ZW0pID0+IHRoaXMub25Ecm9wKGl0ZW0pKTtcclxuICB9XHJcblxyXG4gIG9uSXRlbURyYWdzdGFydChcclxuICAgIGV2ZW50OiBEcmFnRXZlbnQsXHJcbiAgICBpdGVtOiBTb3J0YWJsZUl0ZW0sXHJcbiAgICBpOiBudW1iZXJcclxuICApOiB2b2lkIHtcclxuICAgIHRoaXMuaW5pdERyYWdzdGFydEV2ZW50KGV2ZW50KTtcclxuICAgIHRoaXMub25Ub3VjaGVkKCk7XHJcbiAgICB0aGlzLnRyYW5zZmVyLmRyYWdTdGFydCh7XHJcbiAgICAgIGV2ZW50LFxyXG4gICAgICBpdGVtLFxyXG4gICAgICBpLFxyXG4gICAgICBpbml0aWFsSW5kZXg6IGksXHJcbiAgICAgIGxhc3Rab25lSW5kZXg6IHRoaXMuY3VycmVudFpvbmVJbmRleCxcclxuICAgICAgb3ZlclpvbmVJbmRleDogdGhpcy5jdXJyZW50Wm9uZUluZGV4XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG9uSXRlbURyYWdvdmVyKGV2ZW50OiBEcmFnRXZlbnQsIGk6IG51bWJlcik6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzLnRyYW5zZmVyLmdldEl0ZW0oKSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgY29uc3QgZHJhZ0l0ZW0gPSB0aGlzLnRyYW5zZmVyLmNhcHR1cmVJdGVtKFxyXG4gICAgICB0aGlzLmN1cnJlbnRab25lSW5kZXgsXHJcbiAgICAgIHRoaXMuaXRlbXMubGVuZ3RoXHJcbiAgICApO1xyXG5cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XHJcbiAgICBsZXQgbmV3QXJyYXk6IGFueVtdID0gW107XHJcblxyXG4gICAgaWYgKCFkcmFnSXRlbSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLml0ZW1zLmxlbmd0aCkge1xyXG4gICAgICBuZXdBcnJheSA9IFtkcmFnSXRlbS5pdGVtXTtcclxuICAgIH0gZWxzZSBpZiAoZHJhZ0l0ZW0uaSA+IGkpIHtcclxuICAgICAgbmV3QXJyYXkgPSBbXHJcbiAgICAgICAgLi4udGhpcy5pdGVtcy5zbGljZSgwLCBpKSxcclxuICAgICAgICBkcmFnSXRlbS5pdGVtLFxyXG4gICAgICAgIC4uLnRoaXMuaXRlbXMuc2xpY2UoaSwgZHJhZ0l0ZW0uaSksXHJcbiAgICAgICAgLi4udGhpcy5pdGVtcy5zbGljZShkcmFnSXRlbS5pICsgMSlcclxuICAgICAgXTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIHRoaXMuZHJhZ2dlZEl0ZW0uaSA8IGlcclxuICAgICAgbmV3QXJyYXkgPSBbXHJcbiAgICAgICAgLi4udGhpcy5pdGVtcy5zbGljZSgwLCBkcmFnSXRlbS5pKSxcclxuICAgICAgICAuLi50aGlzLml0ZW1zLnNsaWNlKGRyYWdJdGVtLmkgKyAxLCBpICsgMSksXHJcbiAgICAgICAgZHJhZ0l0ZW0uaXRlbSxcclxuICAgICAgICAuLi50aGlzLml0ZW1zLnNsaWNlKGkgKyAxKVxyXG4gICAgICBdO1xyXG4gICAgfVxyXG4gICAgdGhpcy5pdGVtcyA9IG5ld0FycmF5O1xyXG4gICAgZHJhZ0l0ZW0uaSA9IGk7XHJcbiAgICB0aGlzLmFjdGl2ZUl0ZW0gPSBpO1xyXG4gICAgdGhpcy51cGRhdGVQbGFjZWhvbGRlclN0YXRlKCk7XHJcbiAgfVxyXG5cclxuICBjYW5jZWxFdmVudChldmVudD86IERyYWdFdmVudHxNb3VzZUV2ZW50KTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMudHJhbnNmZXIuZ2V0SXRlbSgpIHx8ICFldmVudCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIH1cclxuXHJcbiAgb25Ecm9wKGl0ZW06IERyYWdnYWJsZUl0ZW0pOiB2b2lkIHtcclxuICAgIGlmIChcclxuICAgICAgaXRlbSAmJlxyXG4gICAgICBpdGVtLm92ZXJab25lSW5kZXggIT09IHRoaXMuY3VycmVudFpvbmVJbmRleCAmJlxyXG4gICAgICBpdGVtLmxhc3Rab25lSW5kZXggPT09IHRoaXMuY3VycmVudFpvbmVJbmRleFxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMuaXRlbXMgPSB0aGlzLml0ZW1zLmZpbHRlcihcclxuICAgICAgICAoeDogU29ydGFibGVJdGVtLCBpOiBudW1iZXIpID0+IGkgIT09IGl0ZW0uaVxyXG4gICAgICApO1xyXG4gICAgICB0aGlzLnVwZGF0ZVBsYWNlaG9sZGVyU3RhdGUoKTtcclxuICAgIH1cclxuICAgIHRoaXMucmVzZXRBY3RpdmVJdGVtKCk7XHJcbiAgfVxyXG5cclxuICByZXNldEFjdGl2ZUl0ZW0oZXZlbnQ/OiBEcmFnRXZlbnR8TW91c2VFdmVudCk6IHZvaWQge1xyXG4gICAgdGhpcy5jYW5jZWxFdmVudChldmVudCk7XHJcbiAgICB0aGlzLmFjdGl2ZUl0ZW0gPSAtMTtcclxuICB9XHJcblxyXG4gIHJlZ2lzdGVyT25DaGFuZ2UoY2FsbGJhY2s6ICgpID0+IHZvaWQpOiB2b2lkIHtcclxuICAgIHRoaXMub25DaGFuZ2VkID0gY2FsbGJhY2s7XHJcbiAgfVxyXG5cclxuICByZWdpc3Rlck9uVG91Y2hlZChjYWxsYmFjazogKCkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgdGhpcy5vblRvdWNoZWQgPSBjYWxsYmFjaztcclxuICB9XHJcblxyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XHJcbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55W10pOiB2b2lkIHtcclxuICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxyXG4gICAgICB0aGlzLml0ZW1zID0gdmFsdWUubWFwKCh4OiBhbnksIGk6IG51bWJlcikgPT4gKHtcclxuICAgICAgICBpZDogaSxcclxuICAgICAgICBpbml0RGF0YTogeCxcclxuICAgICAgICB2YWx1ZTogdGhpcy5maWVsZE5hbWUgPyB4W3RoaXMuZmllbGROYW1lXSA6IHhcclxuICAgICAgfSkpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5pdGVtcyA9IFtdO1xyXG4gICAgfVxyXG4gICAgdGhpcy51cGRhdGVQbGFjZWhvbGRlclN0YXRlKCk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVQbGFjZWhvbGRlclN0YXRlKCk6IHZvaWQge1xyXG4gICAgdGhpcy5zaG93UGxhY2Vob2xkZXIgPSAhdGhpcy5faXRlbXMubGVuZ3RoO1xyXG4gIH1cclxuXHJcbiAgZ2V0SXRlbVN0eWxlKGlzQWN0aXZlOiBib29sZWFuKSB7XHJcbiAgICByZXR1cm4gaXNBY3RpdmVcclxuICAgICAgPyBPYmplY3QuYXNzaWduKHt9LCB0aGlzLml0ZW1TdHlsZSwgdGhpcy5pdGVtQWN0aXZlU3R5bGUpXHJcbiAgICAgIDogdGhpcy5pdGVtU3R5bGU7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGluaXREcmFnc3RhcnRFdmVudChldmVudDogRHJhZ0V2ZW50KTogdm9pZCB7XHJcbiAgICAvLyBpdCBpcyBuZWNlc3NhcnkgZm9yIG1vemlsbGFcclxuICAgIC8vIGRhdGEgdHlwZSBzaG91bGQgYmUgJ1RleHQnIGluc3RlYWQgb2YgJ3RleHQvcGxhaW4nIHRvIGtlZXAgY29tcGF0aWJpbGl0eVxyXG4gICAgLy8gd2l0aCBJRVxyXG4gICAgZXZlbnQuZGF0YVRyYW5zZmVyPy5zZXREYXRhKCdUZXh0JywgJ3BsYWNlaG9sZGVyJyk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgU29ydGFibGVJdGVtIHtcclxuICBpZDogbnVtYmVyO1xyXG4gIHZhbHVlOiBzdHJpbmc7XHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuICBpbml0RGF0YTogYW55O1xyXG59XHJcbiJdfQ==