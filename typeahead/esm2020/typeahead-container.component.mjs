import { ChangeDetectorRef, Component, ElementRef, HostListener, QueryList, Renderer2, ViewChild, ViewChildren, Output, EventEmitter } from '@angular/core';
import { isBs3, Utils } from 'ngx-bootstrap/utils';
import { PositioningService } from 'ngx-bootstrap/positioning';
import { Subscription } from 'rxjs';
import { latinize } from './typeahead-utils';
import { typeaheadAnimation } from './typeahead-animations';
import * as i0 from "@angular/core";
import * as i1 from "ngx-bootstrap/positioning";
import * as i2 from "@angular/common";
let nextWindowId = 0;
export class TypeaheadContainerComponent {
    constructor(positionService, renderer, element, changeDetectorRef) {
        this.positionService = positionService;
        this.renderer = renderer;
        this.element = element;
        this.changeDetectorRef = changeDetectorRef;
        // eslint-disable-next-line @angular-eslint/no-output-rename
        this.activeChangeEvent = new EventEmitter();
        this.isFocused = false;
        this.positionServiceSubscription = new Subscription();
        this.height = 0;
        this.popupId = `ngb-typeahead-${nextWindowId++}`;
        this._matches = [];
        this.renderer.setAttribute(this.element.nativeElement, 'id', this.popupId);
        this.positionServiceSubscription.add(this.positionService.event$?.subscribe(() => {
            if (this.isAnimated) {
                this.animationState = this.isTopPosition ? 'animated-up' : 'animated-down';
                this.changeDetectorRef.detectChanges();
                return;
            }
            this.animationState = 'unanimated';
            this.changeDetectorRef.detectChanges();
        }));
    }
    get isBs4() {
        return !isBs3();
    }
    get typeaheadTemplateMethods() {
        return {
            selectMatch: this.selectMatch.bind(this),
            selectActive: this.selectActive.bind(this),
            isActive: this.isActive.bind(this)
        };
    }
    get active() {
        return this._active;
    }
    set active(active) {
        this._active = active;
        this.activeChanged();
    }
    get matches() {
        return this._matches;
    }
    set matches(value) {
        this.positionService.setOptions({
            modifiers: { flip: { enabled: this.adaptivePosition } },
            allowedPositions: ['top', 'bottom']
        });
        this._matches = value;
        this.needScrollbar = this.typeaheadScrollable && this.typeaheadOptionsInScrollableView < this.matches.length;
        if (this.typeaheadScrollable) {
            setTimeout(() => {
                this.setScrollableMode();
            });
        }
        if (this.typeaheadIsFirstItemActive && this._matches.length > 0) {
            this.setActive(this._matches[0]);
            if (this._active?.isHeader()) {
                this.nextActiveMatch();
            }
        }
        if (this._active && !this.typeaheadIsFirstItemActive) {
            const concurrency = this._matches.find(match => match.value === this._active?.value);
            if (concurrency) {
                this.selectActive(concurrency);
                return;
            }
            this.active = void 0;
        }
    }
    get isTopPosition() {
        return this.element.nativeElement.classList.contains('top');
    }
    get optionsListTemplate() {
        return this.parent ? this.parent.optionsListTemplate : undefined;
    }
    get isAnimated() {
        return this.parent ? this.parent.isAnimated : false;
    }
    get adaptivePosition() {
        return this.parent ? this.parent.adaptivePosition : false;
    }
    get typeaheadScrollable() {
        return this.parent ? this.parent.typeaheadScrollable : false;
    }
    get typeaheadOptionsInScrollableView() {
        return this.parent ? this.parent.typeaheadOptionsInScrollableView : 5;
    }
    get typeaheadIsFirstItemActive() {
        return this.parent ? this.parent.typeaheadIsFirstItemActive : true;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    get itemTemplate() {
        return this.parent ? this.parent.typeaheadItemTemplate : undefined;
    }
    get canSelectItemsOnBlur() {
        return !!this.parent?.selectItemOnBlur;
    }
    selectActiveMatch(isActiveItemChanged) {
        if (this._active && this.parent?.typeaheadSelectFirstItem) {
            this.selectMatch(this._active);
        }
        if (!this.parent?.typeaheadSelectFirstItem && isActiveItemChanged) {
            this.selectMatch(this._active);
        }
    }
    activeChanged() {
        if (!this._active) {
            return;
        }
        const index = this.matches.indexOf(this._active);
        this.activeChangeEvent.emit(`${this.popupId}-${index}`);
    }
    prevActiveMatch() {
        if (!this._active) {
            return;
        }
        const index = this.matches.indexOf(this._active);
        this.setActive(this.matches[index - 1 < 0 ? this.matches.length - 1 : index - 1]);
        if (this._active.isHeader()) {
            this.prevActiveMatch();
        }
        if (this.typeaheadScrollable) {
            this.scrollPrevious(index);
        }
    }
    nextActiveMatch() {
        const index = this._active ? this.matches.indexOf(this._active) : -1;
        this.setActive(this.matches[index + 1 > this.matches.length - 1 ? 0 : index + 1]);
        if (this._active?.isHeader()) {
            this.nextActiveMatch();
        }
        if (this.typeaheadScrollable) {
            this.scrollNext(index);
        }
    }
    selectActive(value) {
        this.isFocused = true;
        this.setActive(value);
    }
    highlight(match, query) {
        let itemStr = match.value;
        let itemStrHelper = (this.parent && this.parent.typeaheadLatinize
            ? latinize(itemStr)
            : itemStr).toLowerCase();
        let startIdx;
        let tokenLen;
        // Replaces the capture string with the same string inside of a "strong" tag
        if (typeof query === 'object') {
            const queryLen = query.length;
            for (let i = 0; i < queryLen; i += 1) {
                // query[i] is already latinized and lower case
                startIdx = itemStrHelper.indexOf(query[i]);
                tokenLen = query[i].length;
                if (startIdx >= 0 && tokenLen > 0) {
                    itemStr =
                        `${itemStr.substring(0, startIdx)}<strong>${itemStr.substring(startIdx, startIdx + tokenLen)}</strong>` +
                            `${itemStr.substring(startIdx + tokenLen)}`;
                    itemStrHelper =
                        `${itemStrHelper.substring(0, startIdx)}        ${' '.repeat(tokenLen)}         ` +
                            `${itemStrHelper.substring(startIdx + tokenLen)}`;
                }
            }
        }
        else if (query) {
            // query is already latinized and lower case
            startIdx = itemStrHelper.indexOf(query);
            tokenLen = query.length;
            if (startIdx >= 0 && tokenLen > 0) {
                itemStr =
                    `${itemStr.substring(0, startIdx)}<strong>${itemStr.substring(startIdx, startIdx + tokenLen)}</strong>` +
                        `${itemStr.substring(startIdx + tokenLen)}`;
            }
        }
        return itemStr;
    }
    focusLost() {
        this.isFocused = false;
        if (!this.canSelectItemsOnBlur) {
            this.setActive(void 0);
        }
    }
    isActive(value) {
        return this.active === value;
    }
    selectMatch(value, event) {
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }
        this.parent?.changeModel(value);
        setTimeout(() => this.parent?.typeaheadOnSelect.emit(value), 0);
        return false;
    }
    setScrollableMode() {
        if (!this.ulElement) {
            this.ulElement = this.element;
        }
        if (this.liElements?.first) {
            const ulStyles = Utils.getStyles(this.ulElement.nativeElement);
            const liStyles = Utils.getStyles(this.liElements.first.nativeElement);
            const ulPaddingBottom = parseFloat((ulStyles['padding-bottom'] ? ulStyles['padding-bottom'] : '')
                .replace('px', ''));
            const ulPaddingTop = parseFloat((ulStyles['padding-top'] ? ulStyles['padding-top'] : '0')
                .replace('px', ''));
            const optionHeight = parseFloat((liStyles.height ? liStyles.height : '0')
                .replace('px', ''));
            const height = this.typeaheadOptionsInScrollableView * optionHeight;
            this.guiHeight = `${height + ulPaddingTop + ulPaddingBottom}px`;
        }
        this.renderer.setStyle(this.element.nativeElement, 'visibility', 'visible');
    }
    scrollPrevious(index) {
        if (index === 0) {
            this.scrollToBottom();
            return;
        }
        if (this.liElements && this.ulElement) {
            const liElement = this.liElements.toArray()[index - 1];
            if (liElement && !this.isScrolledIntoView(liElement.nativeElement)) {
                this.ulElement.nativeElement.scrollTop = liElement.nativeElement.offsetTop;
            }
        }
    }
    scrollNext(index) {
        if (index + 1 > this.matches.length - 1) {
            this.scrollToTop();
            return;
        }
        if (this.liElements && this.ulElement) {
            const liElement = this.liElements.toArray()[index + 1];
            if (liElement && !this.isScrolledIntoView(liElement.nativeElement)) {
                this.ulElement.nativeElement.scrollTop =
                    liElement.nativeElement.offsetTop -
                        Number(this.ulElement.nativeElement.offsetHeight) +
                        Number(liElement.nativeElement.offsetHeight);
            }
        }
    }
    ngOnDestroy() {
        this.positionServiceSubscription.unsubscribe();
    }
    setActive(value) {
        this._active = value;
        let preview;
        if (!(this._active == null || this._active.isHeader())) {
            preview = value;
        }
        this.parent?.typeaheadOnPreview.emit(preview);
    }
    isScrolledIntoView(elem) {
        if (!this.ulElement) {
            return false;
        }
        const containerViewTop = this.ulElement.nativeElement.scrollTop;
        const containerViewBottom = containerViewTop + Number(this.ulElement.nativeElement.offsetHeight);
        const elemTop = elem.offsetTop;
        const elemBottom = elemTop + elem.offsetHeight;
        return ((elemBottom <= containerViewBottom) && (elemTop >= containerViewTop));
    }
    ;
    scrollToBottom() {
        if (!this.ulElement?.nativeElement) {
            return;
        }
        this.ulElement.nativeElement.scrollTop = this.ulElement.nativeElement.scrollHeight;
    }
    scrollToTop() {
        if (!this.ulElement?.nativeElement) {
            return;
        }
        this.ulElement.nativeElement.scrollTop = 0;
    }
}
TypeaheadContainerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: TypeaheadContainerComponent, deps: [{ token: i1.PositioningService }, { token: i0.Renderer2 }, { token: i0.ElementRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
TypeaheadContainerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.1", type: TypeaheadContainerComponent, selector: "typeahead-container", outputs: { activeChangeEvent: "activeChange" }, host: { listeners: { "mouseleave": "focusLost()", "blur": "focusLost()" }, properties: { "class.dropdown-menu": "isBs4", "style.height": "isBs4 && needScrollbar ? guiHeight: 'auto'", "style.visibility": "'inherit'", "class.dropup": "dropup", "attr.role": "isBs4 ? 'listbox' : null " }, styleAttribute: "position: absolute;display: block;", classAttribute: "dropdown open bottom" }, viewQueries: [{ propertyName: "ulElement", first: true, predicate: ["ulElement"], descendants: true }, { propertyName: "liElements", predicate: ["liElements"], descendants: true }], ngImport: i0, template: "<!-- inject options list template -->\r\n<ng-template [ngTemplateOutlet]=\"optionsListTemplate || (isBs4 ? bs4Template : bs3Template)\"\r\n             [ngTemplateOutletContext]=\"{\r\n               matches: matches,\r\n               itemTemplate: itemTemplate || bsItemTemplate,\r\n               query: query,\r\n               $implicit: typeaheadTemplateMethods\r\n             }\">\r\n</ng-template>\r\n\r\n<!-- default options item template -->\r\n<ng-template #bsItemTemplate let-match=\"match\" let-query=\"query\">\r\n  <span [innerHtml]=\"highlight(match, query)\"></span>\r\n</ng-template>\r\n\r\n<!-- Bootstrap 3 options list template -->\r\n<ng-template #bs3Template>\r\n  <ul class=\"dropdown-menu\"\r\n      #ulElement\r\n      role=\"listbox\"\r\n      [style.overflow-y]=\"needScrollbar ? 'scroll': 'auto'\"\r\n      [style.height]=\"needScrollbar ? guiHeight: 'auto'\">\r\n    <ng-template ngFor let-match let-i=\"index\" [ngForOf]=\"matches\">\r\n      <li #liElements *ngIf=\"match.isHeader()\" class=\"dropdown-header\">{{ match }}</li>\r\n      <li #liElements\r\n          *ngIf=\"!match.isHeader()\"\r\n          [id]=\"popupId + '-' + i\"\r\n          role=\"option\"\r\n          [@typeaheadAnimation]=\"animationState\"\r\n          [class.active]=\"isActive(match)\"\r\n          (mouseenter)=\"selectActive(match)\">\r\n\r\n        <a href=\"#\" (click)=\"selectMatch(match, $event)\" tabindex=\"-1\">\r\n          <ng-template [ngTemplateOutlet]=\"itemTemplate || bsItemTemplate\"\r\n                       [ngTemplateOutletContext]=\"{item: match.item, index: i, match: match, query: query}\">\r\n          </ng-template>\r\n        </a>\r\n      </li>\r\n    </ng-template>\r\n  </ul>\r\n</ng-template>\r\n\r\n<!-- Bootstrap 4 options list template -->\r\n<ng-template #bs4Template>\r\n  <ng-template ngFor let-match let-i=\"index\" [ngForOf]=\"matches\">\r\n    <h6 *ngIf=\"match.isHeader()\" class=\"dropdown-header\">{{ match }}</h6>\r\n    <ng-template [ngIf]=\"!match.isHeader()\">\r\n      <button #liElements\r\n              [id]=\"popupId + '-' + i\"\r\n              role=\"option\"\r\n              [@typeaheadAnimation]=\"animationState\"\r\n              class=\"dropdown-item\"\r\n              (click)=\"selectMatch(match, $event)\"\r\n              (mouseenter)=\"selectActive(match)\"\r\n              [class.active]=\"isActive(match)\">\r\n        <ng-template [ngTemplateOutlet]=\"itemTemplate || bsItemTemplate\"\r\n                     [ngTemplateOutletContext]=\"{item: match.item, index: i, match: match, query: query}\">\r\n        </ng-template>\r\n      </button>\r\n    </ng-template>\r\n  </ng-template>\r\n</ng-template>\r\n", styles: [":host.dropdown{z-index:1000}:host.dropdown-menu,.dropdown-menu{overflow-y:auto;height:100px}\n"], directives: [{ type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], animations: [typeaheadAnimation] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: TypeaheadContainerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'typeahead-container', host: {
                        class: 'dropdown open bottom',
                        '[class.dropdown-menu]': 'isBs4',
                        '[style.height]': `isBs4 && needScrollbar ? guiHeight: 'auto'`,
                        '[style.visibility]': `'inherit'`,
                        '[class.dropup]': 'dropup',
                        style: 'position: absolute;display: block;',
                        '[attr.role]': `isBs4 ? 'listbox' : null `
                    }, styles: [
                        `
    :host.dropdown {
      z-index: 1000;
    }

    :host.dropdown-menu, .dropdown-menu {
      overflow-y: auto;
      height: 100px;
    }
  `
                    ], animations: [typeaheadAnimation], template: "<!-- inject options list template -->\r\n<ng-template [ngTemplateOutlet]=\"optionsListTemplate || (isBs4 ? bs4Template : bs3Template)\"\r\n             [ngTemplateOutletContext]=\"{\r\n               matches: matches,\r\n               itemTemplate: itemTemplate || bsItemTemplate,\r\n               query: query,\r\n               $implicit: typeaheadTemplateMethods\r\n             }\">\r\n</ng-template>\r\n\r\n<!-- default options item template -->\r\n<ng-template #bsItemTemplate let-match=\"match\" let-query=\"query\">\r\n  <span [innerHtml]=\"highlight(match, query)\"></span>\r\n</ng-template>\r\n\r\n<!-- Bootstrap 3 options list template -->\r\n<ng-template #bs3Template>\r\n  <ul class=\"dropdown-menu\"\r\n      #ulElement\r\n      role=\"listbox\"\r\n      [style.overflow-y]=\"needScrollbar ? 'scroll': 'auto'\"\r\n      [style.height]=\"needScrollbar ? guiHeight: 'auto'\">\r\n    <ng-template ngFor let-match let-i=\"index\" [ngForOf]=\"matches\">\r\n      <li #liElements *ngIf=\"match.isHeader()\" class=\"dropdown-header\">{{ match }}</li>\r\n      <li #liElements\r\n          *ngIf=\"!match.isHeader()\"\r\n          [id]=\"popupId + '-' + i\"\r\n          role=\"option\"\r\n          [@typeaheadAnimation]=\"animationState\"\r\n          [class.active]=\"isActive(match)\"\r\n          (mouseenter)=\"selectActive(match)\">\r\n\r\n        <a href=\"#\" (click)=\"selectMatch(match, $event)\" tabindex=\"-1\">\r\n          <ng-template [ngTemplateOutlet]=\"itemTemplate || bsItemTemplate\"\r\n                       [ngTemplateOutletContext]=\"{item: match.item, index: i, match: match, query: query}\">\r\n          </ng-template>\r\n        </a>\r\n      </li>\r\n    </ng-template>\r\n  </ul>\r\n</ng-template>\r\n\r\n<!-- Bootstrap 4 options list template -->\r\n<ng-template #bs4Template>\r\n  <ng-template ngFor let-match let-i=\"index\" [ngForOf]=\"matches\">\r\n    <h6 *ngIf=\"match.isHeader()\" class=\"dropdown-header\">{{ match }}</h6>\r\n    <ng-template [ngIf]=\"!match.isHeader()\">\r\n      <button #liElements\r\n              [id]=\"popupId + '-' + i\"\r\n              role=\"option\"\r\n              [@typeaheadAnimation]=\"animationState\"\r\n              class=\"dropdown-item\"\r\n              (click)=\"selectMatch(match, $event)\"\r\n              (mouseenter)=\"selectActive(match)\"\r\n              [class.active]=\"isActive(match)\">\r\n        <ng-template [ngTemplateOutlet]=\"itemTemplate || bsItemTemplate\"\r\n                     [ngTemplateOutletContext]=\"{item: match.item, index: i, match: match, query: query}\">\r\n        </ng-template>\r\n      </button>\r\n    </ng-template>\r\n  </ng-template>\r\n</ng-template>\r\n" }]
        }], ctorParameters: function () { return [{ type: i1.PositioningService }, { type: i0.Renderer2 }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { activeChangeEvent: [{
                type: Output,
                args: ['activeChange']
            }], ulElement: [{
                type: ViewChild,
                args: ['ulElement', { static: false }]
            }], liElements: [{
                type: ViewChildren,
                args: ['liElements']
            }], focusLost: [{
                type: HostListener,
                args: ['mouseleave']
            }, {
                type: HostListener,
                args: ['blur']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZWFoZWFkLWNvbnRhaW5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdHlwZWFoZWFkL3R5cGVhaGVhZC1jb250YWluZXIuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vc3JjL3R5cGVhaGVhZC90eXBlYWhlYWQtY29udGFpbmVyLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBRVosU0FBUyxFQUNULFNBQVMsRUFFVCxTQUFTLEVBQ1QsWUFBWSxFQUNaLE1BQU0sRUFDTixZQUFZLEVBQ2IsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXBDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUc3QyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7OztBQUc1RCxJQUFJLFlBQVksR0FBRyxDQUFDLENBQUM7QUE4QnJCLE1BQU0sT0FBTywyQkFBMkI7SUF3Q3RDLFlBQ1UsZUFBbUMsRUFDbkMsUUFBbUIsRUFDcEIsT0FBbUIsRUFDbEIsaUJBQW9DO1FBSHBDLG9CQUFlLEdBQWYsZUFBZSxDQUFvQjtRQUNuQyxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ3BCLFlBQU8sR0FBUCxPQUFPLENBQVk7UUFDbEIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQTNDOUMsNERBQTREO1FBQ3BDLHNCQUFpQixHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFJL0QsY0FBUyxHQUFHLEtBQUssQ0FBQztRQVNsQixn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RUFBRSwyQkFBMkI7cUJBQzNDLFVBQ087d0JBQ047Ozs7Ozs7OztHQVNEO3FCQUNBLGNBQ1csQ0FBQyxrQkFBa0IsQ0FBQzswTEFLUixpQkFBaUI7c0JBQXhDLE1BQU07dUJBQUMsY0FBYztnQkFpQ2QsU0FBUztzQkFEaEIsU0FBUzt1QkFBQyxXQUFXLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO2dCQUlqQyxVQUFVO3NCQURqQixZQUFZO3VCQUFDLFlBQVk7Z0JBK00xQixTQUFTO3NCQUZSLFlBQVk7dUJBQUMsWUFBWTs7c0JBQ3pCLFlBQVk7dUJBQUMsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgQ29tcG9uZW50LFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgSG9zdExpc3RlbmVyLFxyXG4gIE9uRGVzdHJveSxcclxuICBRdWVyeUxpc3QsXHJcbiAgUmVuZGVyZXIyLFxyXG4gIFRlbXBsYXRlUmVmLFxyXG4gIFZpZXdDaGlsZCxcclxuICBWaWV3Q2hpbGRyZW4sXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlclxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgaXNCczMsIFV0aWxzIH0gZnJvbSAnbmd4LWJvb3RzdHJhcC91dGlscyc7XHJcbmltcG9ydCB7IFBvc2l0aW9uaW5nU2VydmljZSB9IGZyb20gJ25neC1ib290c3RyYXAvcG9zaXRpb25pbmcnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IGxhdGluaXplIH0gZnJvbSAnLi90eXBlYWhlYWQtdXRpbHMnO1xyXG5pbXBvcnQgeyBUeXBlYWhlYWRNYXRjaCB9IGZyb20gJy4vdHlwZWFoZWFkLW1hdGNoLmNsYXNzJztcclxuaW1wb3J0IHsgVHlwZWFoZWFkRGlyZWN0aXZlIH0gZnJvbSAnLi90eXBlYWhlYWQuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgdHlwZWFoZWFkQW5pbWF0aW9uIH0gZnJvbSAnLi90eXBlYWhlYWQtYW5pbWF0aW9ucyc7XHJcbmltcG9ydCB7IFR5cGVhaGVhZE9wdGlvbkl0ZW1Db250ZXh0LCBUeXBlYWhlYWRPcHRpb25MaXN0Q29udGV4dCwgVHlwZWFoZWFkVGVtcGxhdGVNZXRob2RzIH0gZnJvbSAnLi9tb2RlbHMnO1xyXG5cclxubGV0IG5leHRXaW5kb3dJZCA9IDA7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ3R5cGVhaGVhZC1jb250YWluZXInLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi90eXBlYWhlYWQtY29udGFpbmVyLmNvbXBvbmVudC5odG1sJyxcclxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLWhvc3QtbWV0YWRhdGEtcHJvcGVydHlcclxuICBob3N0OiB7XHJcbiAgICBjbGFzczogJ2Ryb3Bkb3duIG9wZW4gYm90dG9tJyxcclxuICAgICdbY2xhc3MuZHJvcGRvd24tbWVudV0nOiAnaXNCczQnLFxyXG4gICAgJ1tzdHlsZS5oZWlnaHRdJzogYGlzQnM0ICYmIG5lZWRTY3JvbGxiYXIgPyBndWlIZWlnaHQ6ICdhdXRvJ2AsXHJcbiAgICAnW3N0eWxlLnZpc2liaWxpdHldJzogYCdpbmhlcml0J2AsXHJcbiAgICAnW2NsYXNzLmRyb3B1cF0nOiAnZHJvcHVwJyxcclxuICAgIHN0eWxlOiAncG9zaXRpb246IGFic29sdXRlO2Rpc3BsYXk6IGJsb2NrOycsXHJcbiAgICAnW2F0dHIucm9sZV0nOiBgaXNCczQgPyAnbGlzdGJveCcgOiBudWxsIGBcclxuICB9LFxyXG4gIHN0eWxlczogW1xyXG4gICAgYFxyXG4gICAgOmhvc3QuZHJvcGRvd24ge1xyXG4gICAgICB6LWluZGV4OiAxMDAwO1xyXG4gICAgfVxyXG5cclxuICAgIDpob3N0LmRyb3Bkb3duLW1lbnUsIC5kcm9wZG93bi1tZW51IHtcclxuICAgICAgb3ZlcmZsb3cteTogYXV0bztcclxuICAgICAgaGVpZ2h0OiAxMDBweDtcclxuICAgIH1cclxuICBgXHJcbiAgXSxcclxuICBhbmltYXRpb25zOiBbdHlwZWFoZWFkQW5pbWF0aW9uXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIFR5cGVhaGVhZENvbnRhaW5lckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9uby1vdXRwdXQtcmVuYW1lXHJcbiAgQE91dHB1dCgnYWN0aXZlQ2hhbmdlJykgYWN0aXZlQ2hhbmdlRXZlbnQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIHBhcmVudD86IFR5cGVhaGVhZERpcmVjdGl2ZTtcclxuICBxdWVyeT86IHN0cmluZ1tdIHwgc3RyaW5nO1xyXG4gIGlzRm9jdXNlZCA9IGZhbHNlO1xyXG4gIHRvcD86IHN0cmluZztcclxuICBsZWZ0Pzogc3RyaW5nO1xyXG4gIGRpc3BsYXk/OiBzdHJpbmc7XHJcbiAgcGxhY2VtZW4/OiBzdHJpbmc7XHJcbiAgZHJvcHVwPzogYm9vbGVhbjtcclxuICBndWlIZWlnaHQ/OiBzdHJpbmc7XHJcbiAgbmVlZFNjcm9sbGJhcj86IGJvb2xlYW47XHJcbiAgYW5pbWF0aW9uU3RhdGU/OiBzdHJpbmc7XHJcbiAgcG9zaXRpb25TZXJ2aWNlU3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xyXG4gIGhlaWdodCA9IDA7XHJcbiAgcG9wdXBJZCA9IGBuZ2ItdHlwZWFoZWFkLSR7bmV4dFdpbmRvd0lkKyt9YDtcclxuXHJcbiAgZ2V0IGlzQnM0KCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuICFpc0JzMygpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHR5cGVhaGVhZFRlbXBsYXRlTWV0aG9kcygpOiBUeXBlYWhlYWRUZW1wbGF0ZU1ldGhvZHMge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc2VsZWN0TWF0Y2g6IHRoaXMuc2VsZWN0TWF0Y2guYmluZCh0aGlzKSxcclxuICAgICAgc2VsZWN0QWN0aXZlOiB0aGlzLnNlbGVjdEFjdGl2ZS5iaW5kKHRoaXMpLFxyXG4gICAgICBpc0FjdGl2ZTogdGhpcy5pc0FjdGl2ZS5iaW5kKHRoaXMpXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIF9hY3RpdmU/OiBUeXBlYWhlYWRNYXRjaDtcclxuICBwcm90ZWN0ZWQgX21hdGNoZXM6IFR5cGVhaGVhZE1hdGNoW10gPSBbXTtcclxuXHJcbiAgQFZpZXdDaGlsZCgndWxFbGVtZW50JywgeyBzdGF0aWM6IGZhbHNlIH0pXHJcbiAgcHJpdmF0ZSB1bEVsZW1lbnQ/OiBFbGVtZW50UmVmO1xyXG5cclxuICBAVmlld0NoaWxkcmVuKCdsaUVsZW1lbnRzJylcclxuICBwcml2YXRlIGxpRWxlbWVudHM/OiBRdWVyeUxpc3Q8RWxlbWVudFJlZj47XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBwb3NpdGlvblNlcnZpY2U6IFBvc2l0aW9uaW5nU2VydmljZSxcclxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcclxuICAgIHB1YmxpYyBlbGVtZW50OiBFbGVtZW50UmVmLFxyXG4gICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWZcclxuICApIHtcclxuICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LCAnaWQnLCB0aGlzLnBvcHVwSWQpO1xyXG4gICAgdGhpcy5wb3NpdGlvblNlcnZpY2VTdWJzY3JpcHRpb24uYWRkKHRoaXMucG9zaXRpb25TZXJ2aWNlLmV2ZW50JD8uc3Vic2NyaWJlKFxyXG4gICAgICAoKSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNBbmltYXRlZCkge1xyXG4gICAgICAgICAgdGhpcy5hbmltYXRpb25TdGF0ZSA9IHRoaXMuaXNUb3BQb3NpdGlvbiA/ICdhbmltYXRlZC11cCcgOiAnYW5pbWF0ZWQtZG93bic7XHJcbiAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcclxuXHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmFuaW1hdGlvblN0YXRlID0gJ3VuYW5pbWF0ZWQnO1xyXG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgICB9XHJcbiAgICApKTtcclxuICB9XHJcblxyXG4gIGdldCBhY3RpdmUoKTogVHlwZWFoZWFkTWF0Y2ggfCB1bmRlZmluZWQge1xyXG4gICAgcmV0dXJuIHRoaXMuX2FjdGl2ZTtcclxuICB9XHJcblxyXG4gIHNldCBhY3RpdmUoYWN0aXZlOiBUeXBlYWhlYWRNYXRjaCB8IHVuZGVmaW5lZCkge1xyXG4gICAgdGhpcy5fYWN0aXZlID0gYWN0aXZlO1xyXG4gICAgdGhpcy5hY3RpdmVDaGFuZ2VkKCk7XHJcbiAgfVxyXG5cclxuICBnZXQgbWF0Y2hlcygpOiBUeXBlYWhlYWRNYXRjaFtdIHtcclxuICAgIHJldHVybiB0aGlzLl9tYXRjaGVzO1xyXG4gIH1cclxuXHJcbiAgc2V0IG1hdGNoZXModmFsdWU6IFR5cGVhaGVhZE1hdGNoW10pIHtcclxuICAgIHRoaXMucG9zaXRpb25TZXJ2aWNlLnNldE9wdGlvbnMoe1xyXG4gICAgICBtb2RpZmllcnM6IHsgZmxpcDogeyBlbmFibGVkOiB0aGlzLmFkYXB0aXZlUG9zaXRpb24gfSB9LFxyXG4gICAgICBhbGxvd2VkUG9zaXRpb25zOiBbJ3RvcCcsICdib3R0b20nXVxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5fbWF0Y2hlcyA9IHZhbHVlO1xyXG5cclxuICAgIHRoaXMubmVlZFNjcm9sbGJhciA9IHRoaXMudHlwZWFoZWFkU2Nyb2xsYWJsZSAmJiB0aGlzLnR5cGVhaGVhZE9wdGlvbnNJblNjcm9sbGFibGVWaWV3IDwgdGhpcy5tYXRjaGVzLmxlbmd0aDtcclxuXHJcbiAgICBpZiAodGhpcy50eXBlYWhlYWRTY3JvbGxhYmxlKSB7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuc2V0U2Nyb2xsYWJsZU1vZGUoKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMudHlwZWFoZWFkSXNGaXJzdEl0ZW1BY3RpdmUgJiYgdGhpcy5fbWF0Y2hlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHRoaXMuc2V0QWN0aXZlKHRoaXMuX21hdGNoZXNbMF0pO1xyXG5cclxuICAgICAgaWYgKHRoaXMuX2FjdGl2ZT8uaXNIZWFkZXIoKSkge1xyXG4gICAgICAgIHRoaXMubmV4dEFjdGl2ZU1hdGNoKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5fYWN0aXZlICYmICF0aGlzLnR5cGVhaGVhZElzRmlyc3RJdGVtQWN0aXZlKSB7XHJcbiAgICAgIGNvbnN0IGNvbmN1cnJlbmN5ID0gdGhpcy5fbWF0Y2hlcy5maW5kKG1hdGNoID0+IG1hdGNoLnZhbHVlID09PSB0aGlzLl9hY3RpdmU/LnZhbHVlKTtcclxuXHJcbiAgICAgIGlmIChjb25jdXJyZW5jeSkge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0QWN0aXZlKGNvbmN1cnJlbmN5KTtcclxuXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLmFjdGl2ZSA9IHZvaWQgMDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldCBpc1RvcFBvc2l0aW9uKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygndG9wJyk7XHJcbiAgfVxyXG5cclxuICBnZXQgb3B0aW9uc0xpc3RUZW1wbGF0ZSgpOiBUZW1wbGF0ZVJlZjxUeXBlYWhlYWRPcHRpb25MaXN0Q29udGV4dD4gfCB1bmRlZmluZWQge1xyXG4gICAgcmV0dXJuIHRoaXMucGFyZW50ID8gdGhpcy5wYXJlbnQub3B0aW9uc0xpc3RUZW1wbGF0ZSA6IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIGdldCBpc0FuaW1hdGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMucGFyZW50ID8gdGhpcy5wYXJlbnQuaXNBbmltYXRlZCA6IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGFkYXB0aXZlUG9zaXRpb24oKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5wYXJlbnQgPyB0aGlzLnBhcmVudC5hZGFwdGl2ZVBvc2l0aW9uIDogZmFsc2U7XHJcbiAgfVxyXG5cclxuICBnZXQgdHlwZWFoZWFkU2Nyb2xsYWJsZSgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLnBhcmVudCA/IHRoaXMucGFyZW50LnR5cGVhaGVhZFNjcm9sbGFibGUgOiBmYWxzZTtcclxuICB9XHJcblxyXG4gIGdldCB0eXBlYWhlYWRPcHRpb25zSW5TY3JvbGxhYmxlVmlldygpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMucGFyZW50ID8gdGhpcy5wYXJlbnQudHlwZWFoZWFkT3B0aW9uc0luU2Nyb2xsYWJsZVZpZXcgOiA1O1xyXG4gIH1cclxuXHJcbiAgZ2V0IHR5cGVhaGVhZElzRmlyc3RJdGVtQWN0aXZlKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMucGFyZW50ID8gdGhpcy5wYXJlbnQudHlwZWFoZWFkSXNGaXJzdEl0ZW1BY3RpdmUgOiB0cnVlO1xyXG4gIH1cclxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxyXG4gIGdldCBpdGVtVGVtcGxhdGUoKTogVGVtcGxhdGVSZWY8VHlwZWFoZWFkT3B0aW9uSXRlbUNvbnRleHQ+IHwgdW5kZWZpbmVkIHtcclxuICAgIHJldHVybiB0aGlzLnBhcmVudCA/IHRoaXMucGFyZW50LnR5cGVhaGVhZEl0ZW1UZW1wbGF0ZSA6IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIGdldCBjYW5TZWxlY3RJdGVtc09uQmx1cigpOiBib29sZWFuIHtcclxuICAgIHJldHVybiAhIXRoaXMucGFyZW50Py5zZWxlY3RJdGVtT25CbHVyO1xyXG4gIH1cclxuXHJcbiAgc2VsZWN0QWN0aXZlTWF0Y2goaXNBY3RpdmVJdGVtQ2hhbmdlZD86IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLl9hY3RpdmUgJiYgdGhpcy5wYXJlbnQ/LnR5cGVhaGVhZFNlbGVjdEZpcnN0SXRlbSkge1xyXG4gICAgICB0aGlzLnNlbGVjdE1hdGNoKHRoaXMuX2FjdGl2ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLnBhcmVudD8udHlwZWFoZWFkU2VsZWN0Rmlyc3RJdGVtICYmIGlzQWN0aXZlSXRlbUNoYW5nZWQpIHtcclxuICAgICAgdGhpcy5zZWxlY3RNYXRjaCh0aGlzLl9hY3RpdmUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYWN0aXZlQ2hhbmdlZCgpOiB2b2lkIHtcclxuICAgIGlmICghdGhpcy5fYWN0aXZlKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5tYXRjaGVzLmluZGV4T2YodGhpcy5fYWN0aXZlKTtcclxuICAgIHRoaXMuYWN0aXZlQ2hhbmdlRXZlbnQuZW1pdChgJHt0aGlzLnBvcHVwSWR9LSR7aW5kZXh9YCk7XHJcbiAgfVxyXG5cclxuICBwcmV2QWN0aXZlTWF0Y2goKTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMuX2FjdGl2ZSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaW5kZXggPSB0aGlzLm1hdGNoZXMuaW5kZXhPZih0aGlzLl9hY3RpdmUpO1xyXG4gICAgdGhpcy5zZXRBY3RpdmUodGhpcy5tYXRjaGVzW1xyXG4gICAgICBpbmRleCAtIDEgPCAwID8gdGhpcy5tYXRjaGVzLmxlbmd0aCAtIDEgOiBpbmRleCAtIDFcclxuICAgICAgXSk7XHJcblxyXG4gICAgaWYgKHRoaXMuX2FjdGl2ZS5pc0hlYWRlcigpKSB7XHJcbiAgICAgIHRoaXMucHJldkFjdGl2ZU1hdGNoKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMudHlwZWFoZWFkU2Nyb2xsYWJsZSkge1xyXG4gICAgICB0aGlzLnNjcm9sbFByZXZpb3VzKGluZGV4KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5leHRBY3RpdmVNYXRjaCgpOiB2b2lkIHtcclxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fYWN0aXZlID8gdGhpcy5tYXRjaGVzLmluZGV4T2YodGhpcy5fYWN0aXZlKSA6IC0xO1xyXG4gICAgdGhpcy5zZXRBY3RpdmUodGhpcy5tYXRjaGVzW1xyXG4gICAgICBpbmRleCArIDEgPiB0aGlzLm1hdGNoZXMubGVuZ3RoIC0gMSA/IDAgOiBpbmRleCArIDFcclxuICAgICAgXSk7XHJcblxyXG4gICAgaWYgKHRoaXMuX2FjdGl2ZT8uaXNIZWFkZXIoKSkge1xyXG4gICAgICB0aGlzLm5leHRBY3RpdmVNYXRjaCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnR5cGVhaGVhZFNjcm9sbGFibGUpIHtcclxuICAgICAgdGhpcy5zY3JvbGxOZXh0KGluZGV4KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNlbGVjdEFjdGl2ZSh2YWx1ZTogVHlwZWFoZWFkTWF0Y2gpOiB2b2lkIHtcclxuICAgIHRoaXMuaXNGb2N1c2VkID0gdHJ1ZTtcclxuICAgIHRoaXMuc2V0QWN0aXZlKHZhbHVlKTtcclxuICB9XHJcblxyXG4gIGhpZ2hsaWdodChtYXRjaDogVHlwZWFoZWFkTWF0Y2gsIHF1ZXJ5OiBzdHJpbmdbXSB8IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICBsZXQgaXRlbVN0cjogc3RyaW5nID0gbWF0Y2gudmFsdWU7XHJcbiAgICBsZXQgaXRlbVN0ckhlbHBlcjogc3RyaW5nID0gKHRoaXMucGFyZW50ICYmIHRoaXMucGFyZW50LnR5cGVhaGVhZExhdGluaXplXHJcbiAgICAgID8gbGF0aW5pemUoaXRlbVN0cilcclxuICAgICAgOiBpdGVtU3RyKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgbGV0IHN0YXJ0SWR4OiBudW1iZXI7XHJcbiAgICBsZXQgdG9rZW5MZW46IG51bWJlcjtcclxuICAgIC8vIFJlcGxhY2VzIHRoZSBjYXB0dXJlIHN0cmluZyB3aXRoIHRoZSBzYW1lIHN0cmluZyBpbnNpZGUgb2YgYSBcInN0cm9uZ1wiIHRhZ1xyXG4gICAgaWYgKHR5cGVvZiBxdWVyeSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgY29uc3QgcXVlcnlMZW46IG51bWJlciA9IHF1ZXJ5Lmxlbmd0aDtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBxdWVyeUxlbjsgaSArPSAxKSB7XHJcbiAgICAgICAgLy8gcXVlcnlbaV0gaXMgYWxyZWFkeSBsYXRpbml6ZWQgYW5kIGxvd2VyIGNhc2VcclxuICAgICAgICBzdGFydElkeCA9IGl0ZW1TdHJIZWxwZXIuaW5kZXhPZihxdWVyeVtpXSk7XHJcbiAgICAgICAgdG9rZW5MZW4gPSBxdWVyeVtpXS5sZW5ndGg7XHJcbiAgICAgICAgaWYgKHN0YXJ0SWR4ID49IDAgJiYgdG9rZW5MZW4gPiAwKSB7XHJcbiAgICAgICAgICBpdGVtU3RyID1cclxuICAgICAgICAgICAgYCR7aXRlbVN0ci5zdWJzdHJpbmcoMCwgc3RhcnRJZHgpfTxzdHJvbmc+JHtpdGVtU3RyLnN1YnN0cmluZyhzdGFydElkeCwgc3RhcnRJZHggKyB0b2tlbkxlbil9PC9zdHJvbmc+YCArXHJcbiAgICAgICAgICAgIGAke2l0ZW1TdHIuc3Vic3RyaW5nKHN0YXJ0SWR4ICsgdG9rZW5MZW4pfWA7XHJcbiAgICAgICAgICBpdGVtU3RySGVscGVyID1cclxuICAgICAgICAgICAgYCR7aXRlbVN0ckhlbHBlci5zdWJzdHJpbmcoMCwgc3RhcnRJZHgpfSAgICAgICAgJHsnICcucmVwZWF0KHRva2VuTGVuKX0gICAgICAgICBgICtcclxuICAgICAgICAgICAgYCR7aXRlbVN0ckhlbHBlci5zdWJzdHJpbmcoc3RhcnRJZHggKyB0b2tlbkxlbil9YDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAocXVlcnkpIHtcclxuICAgICAgLy8gcXVlcnkgaXMgYWxyZWFkeSBsYXRpbml6ZWQgYW5kIGxvd2VyIGNhc2VcclxuICAgICAgc3RhcnRJZHggPSBpdGVtU3RySGVscGVyLmluZGV4T2YocXVlcnkpO1xyXG4gICAgICB0b2tlbkxlbiA9IHF1ZXJ5Lmxlbmd0aDtcclxuICAgICAgaWYgKHN0YXJ0SWR4ID49IDAgJiYgdG9rZW5MZW4gPiAwKSB7XHJcbiAgICAgICAgaXRlbVN0ciA9XHJcbiAgICAgICAgICBgJHtpdGVtU3RyLnN1YnN0cmluZygwLCBzdGFydElkeCl9PHN0cm9uZz4ke2l0ZW1TdHIuc3Vic3RyaW5nKHN0YXJ0SWR4LCBzdGFydElkeCArIHRva2VuTGVuKX08L3N0cm9uZz5gICtcclxuICAgICAgICAgIGAke2l0ZW1TdHIuc3Vic3RyaW5nKHN0YXJ0SWR4ICsgdG9rZW5MZW4pfWA7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gaXRlbVN0cjtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlbGVhdmUnKVxyXG4gIEBIb3N0TGlzdGVuZXIoJ2JsdXInKVxyXG4gIGZvY3VzTG9zdCgpOiB2b2lkIHtcclxuICAgIHRoaXMuaXNGb2N1c2VkID0gZmFsc2U7XHJcbiAgICBpZiAoIXRoaXMuY2FuU2VsZWN0SXRlbXNPbkJsdXIpIHtcclxuICAgICAgdGhpcy5zZXRBY3RpdmUodm9pZCAwKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlzQWN0aXZlKHZhbHVlOiBUeXBlYWhlYWRNYXRjaCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuYWN0aXZlID09PSB2YWx1ZTtcclxuICB9XHJcblxyXG4gIHNlbGVjdE1hdGNoKHZhbHVlPzogVHlwZWFoZWFkTWF0Y2gsIGV2ZW50PzogRXZlbnQpOiBib29sZWFuIHtcclxuICAgIGlmIChldmVudCkge1xyXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIH1cclxuICAgIHRoaXMucGFyZW50Py5jaGFuZ2VNb2RlbCh2YWx1ZSk7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMucGFyZW50Py50eXBlYWhlYWRPblNlbGVjdC5lbWl0KHZhbHVlKSwgMCk7XHJcblxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgc2V0U2Nyb2xsYWJsZU1vZGUoKTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMudWxFbGVtZW50KSB7XHJcbiAgICAgIHRoaXMudWxFbGVtZW50ID0gdGhpcy5lbGVtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmxpRWxlbWVudHM/LmZpcnN0KSB7XHJcbiAgICAgIGNvbnN0IHVsU3R5bGVzID0gVXRpbHMuZ2V0U3R5bGVzKHRoaXMudWxFbGVtZW50Lm5hdGl2ZUVsZW1lbnQpO1xyXG4gICAgICBjb25zdCBsaVN0eWxlcyA9IFV0aWxzLmdldFN0eWxlcyh0aGlzLmxpRWxlbWVudHMuZmlyc3QubmF0aXZlRWxlbWVudCk7XHJcbiAgICAgIGNvbnN0IHVsUGFkZGluZ0JvdHRvbSA9IHBhcnNlRmxvYXQoKHVsU3R5bGVzWydwYWRkaW5nLWJvdHRvbSddID8gdWxTdHlsZXNbJ3BhZGRpbmctYm90dG9tJ10gOiAnJylcclxuICAgICAgICAucmVwbGFjZSgncHgnLCAnJykpO1xyXG4gICAgICBjb25zdCB1bFBhZGRpbmdUb3AgPSBwYXJzZUZsb2F0KCh1bFN0eWxlc1sncGFkZGluZy10b3AnXSA/IHVsU3R5bGVzWydwYWRkaW5nLXRvcCddIDogJzAnKVxyXG4gICAgICAgIC5yZXBsYWNlKCdweCcsICcnKSk7XHJcbiAgICAgIGNvbnN0IG9wdGlvbkhlaWdodCA9IHBhcnNlRmxvYXQoKGxpU3R5bGVzLmhlaWdodCA/IGxpU3R5bGVzLmhlaWdodCA6ICcwJylcclxuICAgICAgICAucmVwbGFjZSgncHgnLCAnJykpO1xyXG4gICAgICBjb25zdCBoZWlnaHQgPSB0aGlzLnR5cGVhaGVhZE9wdGlvbnNJblNjcm9sbGFibGVWaWV3ICogb3B0aW9uSGVpZ2h0O1xyXG4gICAgICB0aGlzLmd1aUhlaWdodCA9IGAke2hlaWdodCArIHVsUGFkZGluZ1RvcCArIHVsUGFkZGluZ0JvdHRvbX1weGA7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpO1xyXG4gIH1cclxuXHJcbiAgc2Nyb2xsUHJldmlvdXMoaW5kZXg6IG51bWJlcik6IHZvaWQge1xyXG4gICAgaWYgKGluZGV4ID09PSAwKSB7XHJcbiAgICAgIHRoaXMuc2Nyb2xsVG9Cb3R0b20oKTtcclxuXHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmxpRWxlbWVudHMgJiYgdGhpcy51bEVsZW1lbnQpIHtcclxuICAgICAgY29uc3QgbGlFbGVtZW50ID0gdGhpcy5saUVsZW1lbnRzLnRvQXJyYXkoKVtpbmRleCAtIDFdO1xyXG4gICAgICBpZiAobGlFbGVtZW50ICYmICF0aGlzLmlzU2Nyb2xsZWRJbnRvVmlldyhsaUVsZW1lbnQubmF0aXZlRWxlbWVudCkpIHtcclxuICAgICAgICB0aGlzLnVsRWxlbWVudC5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcCA9IGxpRWxlbWVudC5uYXRpdmVFbGVtZW50Lm9mZnNldFRvcDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2Nyb2xsTmV4dChpbmRleDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICBpZiAoaW5kZXggKyAxID4gdGhpcy5tYXRjaGVzLmxlbmd0aCAtIDEpIHtcclxuICAgICAgdGhpcy5zY3JvbGxUb1RvcCgpO1xyXG5cclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMubGlFbGVtZW50cyAmJiB0aGlzLnVsRWxlbWVudCkge1xyXG4gICAgICBjb25zdCBsaUVsZW1lbnQgPSB0aGlzLmxpRWxlbWVudHMudG9BcnJheSgpW2luZGV4ICsgMV07XHJcbiAgICAgIGlmIChsaUVsZW1lbnQgJiYgIXRoaXMuaXNTY3JvbGxlZEludG9WaWV3KGxpRWxlbWVudC5uYXRpdmVFbGVtZW50KSkge1xyXG4gICAgICAgIHRoaXMudWxFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG9wID1cclxuICAgICAgICAgIGxpRWxlbWVudC5uYXRpdmVFbGVtZW50Lm9mZnNldFRvcCAtXHJcbiAgICAgICAgICBOdW1iZXIodGhpcy51bEVsZW1lbnQubmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHQpICtcclxuICAgICAgICAgIE51bWJlcihsaUVsZW1lbnQubmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHQpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIHRoaXMucG9zaXRpb25TZXJ2aWNlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgc2V0QWN0aXZlKHZhbHVlPzogVHlwZWFoZWFkTWF0Y2gpOiB2b2lkIHtcclxuICAgIHRoaXMuX2FjdGl2ZSA9IHZhbHVlO1xyXG4gICAgbGV0IHByZXZpZXc7XHJcbiAgICBpZiAoISh0aGlzLl9hY3RpdmUgPT0gbnVsbCB8fCB0aGlzLl9hY3RpdmUuaXNIZWFkZXIoKSkpIHtcclxuICAgICAgcHJldmlldyA9IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgdGhpcy5wYXJlbnQ/LnR5cGVhaGVhZE9uUHJldmlldy5lbWl0KHByZXZpZXcpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpc1Njcm9sbGVkSW50b1ZpZXcoZWxlbTogSFRNTEVsZW1lbnQpOiBib29sZWFuIHtcclxuICAgIGlmICghdGhpcy51bEVsZW1lbnQpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgY29uc3QgY29udGFpbmVyVmlld1RvcDogbnVtYmVyID0gdGhpcy51bEVsZW1lbnQubmF0aXZlRWxlbWVudC5zY3JvbGxUb3A7XHJcbiAgICBjb25zdCBjb250YWluZXJWaWV3Qm90dG9tID0gY29udGFpbmVyVmlld1RvcCArIE51bWJlcih0aGlzLnVsRWxlbWVudC5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodCk7XHJcbiAgICBjb25zdCBlbGVtVG9wID0gZWxlbS5vZmZzZXRUb3A7XHJcbiAgICBjb25zdCBlbGVtQm90dG9tID0gZWxlbVRvcCArIGVsZW0ub2Zmc2V0SGVpZ2h0O1xyXG5cclxuICAgIHJldHVybiAoKGVsZW1Cb3R0b20gPD0gY29udGFpbmVyVmlld0JvdHRvbSkgJiYgKGVsZW1Ub3AgPj0gY29udGFpbmVyVmlld1RvcCkpO1xyXG4gIH07XHJcblxyXG4gIHByaXZhdGUgc2Nyb2xsVG9Cb3R0b20oKTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMudWxFbGVtZW50Py5uYXRpdmVFbGVtZW50KSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMudWxFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG9wID0gdGhpcy51bEVsZW1lbnQubmF0aXZlRWxlbWVudC5zY3JvbGxIZWlnaHQ7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHNjcm9sbFRvVG9wKCk6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzLnVsRWxlbWVudD8ubmF0aXZlRWxlbWVudCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLnVsRWxlbWVudC5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcCA9IDA7XHJcbiAgfVxyXG59XHJcbiIsIjwhLS0gaW5qZWN0IG9wdGlvbnMgbGlzdCB0ZW1wbGF0ZSAtLT5cclxuPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cIm9wdGlvbnNMaXN0VGVtcGxhdGUgfHwgKGlzQnM0ID8gYnM0VGVtcGxhdGUgOiBiczNUZW1wbGF0ZSlcIlxyXG4gICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cIntcclxuICAgICAgICAgICAgICAgbWF0Y2hlczogbWF0Y2hlcyxcclxuICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBpdGVtVGVtcGxhdGUgfHwgYnNJdGVtVGVtcGxhdGUsXHJcbiAgICAgICAgICAgICAgIHF1ZXJ5OiBxdWVyeSxcclxuICAgICAgICAgICAgICAgJGltcGxpY2l0OiB0eXBlYWhlYWRUZW1wbGF0ZU1ldGhvZHNcclxuICAgICAgICAgICAgIH1cIj5cclxuPC9uZy10ZW1wbGF0ZT5cclxuXHJcbjwhLS0gZGVmYXVsdCBvcHRpb25zIGl0ZW0gdGVtcGxhdGUgLS0+XHJcbjxuZy10ZW1wbGF0ZSAjYnNJdGVtVGVtcGxhdGUgbGV0LW1hdGNoPVwibWF0Y2hcIiBsZXQtcXVlcnk9XCJxdWVyeVwiPlxyXG4gIDxzcGFuIFtpbm5lckh0bWxdPVwiaGlnaGxpZ2h0KG1hdGNoLCBxdWVyeSlcIj48L3NwYW4+XHJcbjwvbmctdGVtcGxhdGU+XHJcblxyXG48IS0tIEJvb3RzdHJhcCAzIG9wdGlvbnMgbGlzdCB0ZW1wbGF0ZSAtLT5cclxuPG5nLXRlbXBsYXRlICNiczNUZW1wbGF0ZT5cclxuICA8dWwgY2xhc3M9XCJkcm9wZG93bi1tZW51XCJcclxuICAgICAgI3VsRWxlbWVudFxyXG4gICAgICByb2xlPVwibGlzdGJveFwiXHJcbiAgICAgIFtzdHlsZS5vdmVyZmxvdy15XT1cIm5lZWRTY3JvbGxiYXIgPyAnc2Nyb2xsJzogJ2F1dG8nXCJcclxuICAgICAgW3N0eWxlLmhlaWdodF09XCJuZWVkU2Nyb2xsYmFyID8gZ3VpSGVpZ2h0OiAnYXV0bydcIj5cclxuICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtbWF0Y2ggbGV0LWk9XCJpbmRleFwiIFtuZ0Zvck9mXT1cIm1hdGNoZXNcIj5cclxuICAgICAgPGxpICNsaUVsZW1lbnRzICpuZ0lmPVwibWF0Y2guaXNIZWFkZXIoKVwiIGNsYXNzPVwiZHJvcGRvd24taGVhZGVyXCI+e3sgbWF0Y2ggfX08L2xpPlxyXG4gICAgICA8bGkgI2xpRWxlbWVudHNcclxuICAgICAgICAgICpuZ0lmPVwiIW1hdGNoLmlzSGVhZGVyKClcIlxyXG4gICAgICAgICAgW2lkXT1cInBvcHVwSWQgKyAnLScgKyBpXCJcclxuICAgICAgICAgIHJvbGU9XCJvcHRpb25cIlxyXG4gICAgICAgICAgW0B0eXBlYWhlYWRBbmltYXRpb25dPVwiYW5pbWF0aW9uU3RhdGVcIlxyXG4gICAgICAgICAgW2NsYXNzLmFjdGl2ZV09XCJpc0FjdGl2ZShtYXRjaClcIlxyXG4gICAgICAgICAgKG1vdXNlZW50ZXIpPVwic2VsZWN0QWN0aXZlKG1hdGNoKVwiPlxyXG5cclxuICAgICAgICA8YSBocmVmPVwiI1wiIChjbGljayk9XCJzZWxlY3RNYXRjaChtYXRjaCwgJGV2ZW50KVwiIHRhYmluZGV4PVwiLTFcIj5cclxuICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJpdGVtVGVtcGxhdGUgfHwgYnNJdGVtVGVtcGxhdGVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7aXRlbTogbWF0Y2guaXRlbSwgaW5kZXg6IGksIG1hdGNoOiBtYXRjaCwgcXVlcnk6IHF1ZXJ5fVwiPlxyXG4gICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cclxuICAgICAgICA8L2E+XHJcbiAgICAgIDwvbGk+XHJcbiAgICA8L25nLXRlbXBsYXRlPlxyXG4gIDwvdWw+XHJcbjwvbmctdGVtcGxhdGU+XHJcblxyXG48IS0tIEJvb3RzdHJhcCA0IG9wdGlvbnMgbGlzdCB0ZW1wbGF0ZSAtLT5cclxuPG5nLXRlbXBsYXRlICNiczRUZW1wbGF0ZT5cclxuICA8bmctdGVtcGxhdGUgbmdGb3IgbGV0LW1hdGNoIGxldC1pPVwiaW5kZXhcIiBbbmdGb3JPZl09XCJtYXRjaGVzXCI+XHJcbiAgICA8aDYgKm5nSWY9XCJtYXRjaC5pc0hlYWRlcigpXCIgY2xhc3M9XCJkcm9wZG93bi1oZWFkZXJcIj57eyBtYXRjaCB9fTwvaDY+XHJcbiAgICA8bmctdGVtcGxhdGUgW25nSWZdPVwiIW1hdGNoLmlzSGVhZGVyKClcIj5cclxuICAgICAgPGJ1dHRvbiAjbGlFbGVtZW50c1xyXG4gICAgICAgICAgICAgIFtpZF09XCJwb3B1cElkICsgJy0nICsgaVwiXHJcbiAgICAgICAgICAgICAgcm9sZT1cIm9wdGlvblwiXHJcbiAgICAgICAgICAgICAgW0B0eXBlYWhlYWRBbmltYXRpb25dPVwiYW5pbWF0aW9uU3RhdGVcIlxyXG4gICAgICAgICAgICAgIGNsYXNzPVwiZHJvcGRvd24taXRlbVwiXHJcbiAgICAgICAgICAgICAgKGNsaWNrKT1cInNlbGVjdE1hdGNoKG1hdGNoLCAkZXZlbnQpXCJcclxuICAgICAgICAgICAgICAobW91c2VlbnRlcik9XCJzZWxlY3RBY3RpdmUobWF0Y2gpXCJcclxuICAgICAgICAgICAgICBbY2xhc3MuYWN0aXZlXT1cImlzQWN0aXZlKG1hdGNoKVwiPlxyXG4gICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJpdGVtVGVtcGxhdGUgfHwgYnNJdGVtVGVtcGxhdGVcIlxyXG4gICAgICAgICAgICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie2l0ZW06IG1hdGNoLml0ZW0sIGluZGV4OiBpLCBtYXRjaDogbWF0Y2gsIHF1ZXJ5OiBxdWVyeX1cIj5cclxuICAgICAgICA8L25nLXRlbXBsYXRlPlxyXG4gICAgICA8L2J1dHRvbj5cclxuICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgPC9uZy10ZW1wbGF0ZT5cclxuPC9uZy10ZW1wbGF0ZT5cclxuIl19