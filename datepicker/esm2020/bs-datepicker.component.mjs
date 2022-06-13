import { Directive, ElementRef, EventEmitter, Input, Output, Renderer2, ViewContainerRef } from '@angular/core';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { BehaviorSubject, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { BsDatepickerConfig } from './bs-datepicker.config';
import { BsDatepickerContainerComponent } from './themes/bs/bs-datepicker-container.component';
import { copyTime } from './utils/copy-time-utils';
import { checkBsValue, setCurrentTimeOnDateSelect } from './utils/bs-calendar-utils';
import * as i0 from "@angular/core";
import * as i1 from "./bs-datepicker.config";
import * as i2 from "ngx-bootstrap/component-loader";
export class BsDatepickerDirective {
    constructor(_config, _elementRef, _renderer, _viewContainerRef, cis) {
        this._config = _config;
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        /**
         * Placement of a datepicker. Accepts: "top", "bottom", "left", "right"
         */
        this.placement = 'bottom';
        /**
         * Specifies events that should trigger. Supports a space separated list of
         * event names.
         */
        this.triggers = 'click';
        /**
         * Close datepicker on outside click
         */
        this.outsideClick = true;
        /**
         * A selector specifying the element the datepicker should be appended to.
         */
        this.container = 'body';
        this.outsideEsc = true;
        this.isDestroy$ = new Subject();
        /**
         * Indicates whether datepicker's content is enabled or not
         */
        this.isDisabled = false;
        /**
         * Emits when datepicker value has been changed
         */
        this.bsValueChange = new EventEmitter();
        this._subs = [];
        this._dateInputFormat$ = new Subject();
        // todo: assign only subset of fields
        Object.assign(this, this._config);
        this._datepicker = cis.createLoader(_elementRef, _viewContainerRef, _renderer);
        this.onShown = this._datepicker.onShown;
        this.onHidden = this._datepicker.onHidden;
        this.isOpen$ = new BehaviorSubject(this.isOpen);
    }
    /**
     * Returns whether or not the datepicker is currently being shown
     */
    get isOpen() {
        return this._datepicker.isShown;
    }
    set isOpen(value) {
        this.isOpen$.next(value);
    }
    /**
     * Initial value of datepicker
     */
    set bsValue(value) {
        if (this._bsValue && value && this._bsValue.getTime() === value.getTime()) {
            return;
        }
        if (!this._bsValue && value && !this._config.withTimepicker) {
            const now = new Date();
            copyTime(value, now);
        }
        if (value && this.bsConfig?.initCurrentTime) {
            value = setCurrentTimeOnDateSelect(value);
        }
        this._bsValue = value;
        this.bsValueChange.emit(value);
    }
    get dateInputFormat$() {
        return this._dateInputFormat$;
    }
    ngOnInit() {
        this._datepicker.listen({
            outsideClick: this.outsideClick,
            outsideEsc: this.outsideEsc,
            triggers: this.triggers,
            show: () => this.show()
        });
        this.setConfig();
    }
    ngOnChanges(changes) {
        if (changes["bsConfig"]) {
            if (changes["bsConfig"].currentValue?.initCurrentTime && changes["bsConfig"].currentValue?.initCurrentTime !== changes["bsConfig"].previousValue?.initCurrentTime && this._bsValue) {
                this._bsValue = setCurrentTimeOnDateSelect(this._bsValue);
                this.bsValueChange.emit(this._bsValue);
            }
            this.setConfig();
            this._dateInputFormat$.next(this.bsConfig && this.bsConfig.dateInputFormat);
        }
        if (!this._datepickerRef || !this._datepickerRef.instance) {
            return;
        }
        if (changes["minDate"]) {
            this._datepickerRef.instance.minDate = this.minDate;
        }
        if (changes["maxDate"]) {
            this._datepickerRef.instance.maxDate = this.maxDate;
        }
        if (changes["daysDisabled"]) {
            this._datepickerRef.instance.daysDisabled = this.daysDisabled;
        }
        if (changes["datesDisabled"]) {
            this._datepickerRef.instance.datesDisabled = this.datesDisabled;
        }
        if (changes["datesEnabled"]) {
            this._datepickerRef.instance.datesEnabled = this.datesEnabled;
        }
        if (changes["isDisabled"]) {
            if (this._elementRef?.nativeElement) {
                this._elementRef.nativeElement.setAttribute('readonly', this.isDisabled);
            }
            this._datepickerRef.instance.isDisabled = this.isDisabled;
        }
        if (changes["dateCustomClasses"]) {
            this._datepickerRef.instance.dateCustomClasses = this.dateCustomClasses;
        }
        if (changes["dateTooltipTexts"]) {
            this._datepickerRef.instance.dateTooltipTexts = this.dateTooltipTexts;
        }
    }
    initSubscribes() {
        // if date changes from external source (model -> view)
        this._subs.push(this.bsValueChange.subscribe((value) => {
            if (this._datepickerRef) {
                this._datepickerRef.instance.value = value;
            }
        }));
        // if date changes from picker (view -> model)
        if (this._datepickerRef) {
            this._subs.push(this._datepickerRef.instance.valueChange.subscribe((value) => {
                this.bsValue = value;
                this.hide();
            }));
        }
    }
    ngAfterViewInit() {
        this.isOpen$.pipe(filter(isOpen => isOpen !== this.isOpen), takeUntil(this.isDestroy$))
            .subscribe(() => this.toggle());
    }
    /**
     * Opens an element’s datepicker. This is considered a “manual” triggering of
     * the datepicker.
     */
    show() {
        if (this._datepicker.isShown) {
            return;
        }
        this.setConfig();
        this._datepickerRef = this._datepicker
            .provide({ provide: BsDatepickerConfig, useValue: this._config })
            .attach(BsDatepickerContainerComponent)
            .to(this.container)
            .position({ attachment: this.placement })
            .show({ placement: this.placement });
        this.initSubscribes();
    }
    /**
     * Closes an element’s datepicker. This is considered a “manual” triggering of
     * the datepicker.
     */
    hide() {
        if (this.isOpen) {
            this._datepicker.hide();
        }
        for (const sub of this._subs) {
            sub.unsubscribe();
        }
        if (this._config.returnFocusToInput) {
            this._renderer.selectRootElement(this._elementRef.nativeElement).focus();
        }
    }
    /**
     * Toggles an element’s datepicker. This is considered a “manual” triggering
     * of the datepicker.
     */
    toggle() {
        if (this.isOpen) {
            return this.hide();
        }
        this.show();
    }
    /**
     * Set config for datepicker
     */
    setConfig() {
        this._config = Object.assign({}, this._config, this.bsConfig, {
            value: checkBsValue(this._bsValue, this.maxDate || this.bsConfig && this.bsConfig.maxDate),
            isDisabled: this.isDisabled,
            minDate: this.minDate || this.bsConfig && this.bsConfig.minDate,
            maxDate: this.maxDate || this.bsConfig && this.bsConfig.maxDate,
            daysDisabled: this.daysDisabled || this.bsConfig && this.bsConfig.daysDisabled,
            dateCustomClasses: this.dateCustomClasses || this.bsConfig && this.bsConfig.dateCustomClasses,
            dateTooltipTexts: this.dateTooltipTexts || this.bsConfig && this.bsConfig.dateTooltipTexts,
            datesDisabled: this.datesDisabled || this.bsConfig && this.bsConfig.datesDisabled,
            datesEnabled: this.datesEnabled || this.bsConfig && this.bsConfig.datesEnabled,
            minMode: this.minMode || this.bsConfig && this.bsConfig.minMode,
            initCurrentTime: this.bsConfig?.initCurrentTime
        });
    }
    unsubscribeSubscriptions() {
        if (this._subs?.length) {
            this._subs.map(sub => sub.unsubscribe());
            this._subs.length = 0;
        }
    }
    ngOnDestroy() {
        this._datepicker.dispose();
        this.isOpen$.next(false);
        if (this.isDestroy$) {
            this.isDestroy$.next(null);
            this.isDestroy$.complete();
        }
        this.unsubscribeSubscriptions();
    }
}
BsDatepickerDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: BsDatepickerDirective, deps: [{ token: i1.BsDatepickerConfig }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i2.ComponentLoaderFactory }], target: i0.ɵɵFactoryTarget.Directive });
BsDatepickerDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.1", type: BsDatepickerDirective, selector: "[bsDatepicker]", inputs: { placement: "placement", triggers: "triggers", outsideClick: "outsideClick", container: "container", outsideEsc: "outsideEsc", isDisabled: "isDisabled", minDate: "minDate", maxDate: "maxDate", minMode: "minMode", daysDisabled: "daysDisabled", datesDisabled: "datesDisabled", datesEnabled: "datesEnabled", dateCustomClasses: "dateCustomClasses", dateTooltipTexts: "dateTooltipTexts", isOpen: "isOpen", bsValue: "bsValue", bsConfig: "bsConfig" }, outputs: { onShown: "onShown", onHidden: "onHidden", bsValueChange: "bsValueChange" }, exportAs: ["bsDatepicker"], usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: BsDatepickerDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[bsDatepicker]',
                    exportAs: 'bsDatepicker'
                }]
        }], ctorParameters: function () { return [{ type: i1.BsDatepickerConfig }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i2.ComponentLoaderFactory }]; }, propDecorators: { placement: [{
                type: Input
            }], triggers: [{
                type: Input
            }], outsideClick: [{
                type: Input
            }], container: [{
                type: Input
            }], outsideEsc: [{
                type: Input
            }], onShown: [{
                type: Output
            }], onHidden: [{
                type: Output
            }], isDisabled: [{
                type: Input
            }], minDate: [{
                type: Input
            }], maxDate: [{
                type: Input
            }], minMode: [{
                type: Input
            }], daysDisabled: [{
                type: Input
            }], datesDisabled: [{
                type: Input
            }], datesEnabled: [{
                type: Input
            }], dateCustomClasses: [{
                type: Input
            }], dateTooltipTexts: [{
                type: Input
            }], bsValueChange: [{
                type: Output
            }], isOpen: [{
                type: Input
            }], bsValue: [{
                type: Input
            }], bsConfig: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnMtZGF0ZXBpY2tlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZGF0ZXBpY2tlci9icy1kYXRlcGlja2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBR0wsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUlMLE1BQU0sRUFDTixTQUFTLEVBRVQsZ0JBQWdCLEVBQ2pCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBbUIsc0JBQXNCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUN6RixPQUFPLEVBQUUsZUFBZSxFQUFjLE9BQU8sRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDMUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUU1RCxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUMvRixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDbkQsT0FBTyxFQUFFLFlBQVksRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDJCQUEyQixDQUFDOzs7O0FBTXJGLE1BQU0sT0FBTyxxQkFBcUI7SUEyRWhDLFlBQW1CLE9BQTJCLEVBQ3pCLFdBQXVCLEVBQ3ZCLFNBQW9CLEVBQzdCLGlCQUFtQyxFQUNuQyxHQUEyQjtRQUpwQixZQUFPLEdBQVAsT0FBTyxDQUFvQjtRQUN6QixnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUN2QixjQUFTLEdBQVQsU0FBUyxDQUFXO1FBNUV6Qzs7V0FFRztRQUNNLGNBQVMsR0FBd0MsUUFBUSxDQUFDO1FBQ25FOzs7V0FHRztRQUNNLGFBQVEsR0FBRyxPQUFPLENBQUM7UUFDNUI7O1dBRUc7UUFDTSxpQkFBWSxHQUFHLElBQUksQ0FBQztRQUM3Qjs7V0FFRztR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QUFFLGdCQUFnQjtvQkFDMUIsUUFBUSxFQUFFLGNBQWM7aUJBQ3pCOzhOQUtVLFNBQVM7c0JBQWpCLEtBQUs7Z0JBS0csUUFBUTtzQkFBaEIsS0FBSztnQkFJRyxZQUFZO3NCQUFwQixLQUFLO2dCQUlHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBRUcsVUFBVTtzQkFBbEIsS0FBSztnQkFJSSxPQUFPO3NCQUFoQixNQUFNO2dCQUlHLFFBQVE7c0JBQWpCLE1BQU07Z0JBTUUsVUFBVTtzQkFBbEIsS0FBSztnQkFJRyxPQUFPO3NCQUFmLEtBQUs7Z0JBSUcsT0FBTztzQkFBZixLQUFLO2dCQUlHLE9BQU87c0JBQWYsS0FBSztnQkFJRyxZQUFZO3NCQUFwQixLQUFLO2dCQUlHLGFBQWE7c0JBQXJCLEtBQUs7Z0JBSUcsWUFBWTtzQkFBcEIsS0FBSztnQkFJRyxpQkFBaUI7c0JBQXpCLEtBQUs7Z0JBSUcsZ0JBQWdCO3NCQUF4QixLQUFLO2dCQUlJLGFBQWE7c0JBQXRCLE1BQU07Z0JBMkJILE1BQU07c0JBRFQsS0FBSztnQkFlRixPQUFPO3NCQURWLEtBQUs7Z0JBMEJHLFFBQVE7c0JBQWhCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIEFmdGVyVmlld0luaXQsXHJcbiAgQ29tcG9uZW50UmVmLFxyXG4gIERpcmVjdGl2ZSxcclxuICBFbGVtZW50UmVmLFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBJbnB1dCxcclxuICBPbkNoYW5nZXMsXHJcbiAgT25EZXN0cm95LFxyXG4gIE9uSW5pdCxcclxuICBPdXRwdXQsXHJcbiAgUmVuZGVyZXIyLFxyXG4gIFNpbXBsZUNoYW5nZXMsXHJcbiAgVmlld0NvbnRhaW5lclJlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21wb25lbnRMb2FkZXIsIENvbXBvbmVudExvYWRlckZhY3RvcnkgfSBmcm9tICduZ3gtYm9vdHN0cmFwL2NvbXBvbmVudC1sb2FkZXInO1xyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUsIFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBmaWx0ZXIsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgQnNEYXRlcGlja2VyQ29uZmlnIH0gZnJvbSAnLi9icy1kYXRlcGlja2VyLmNvbmZpZyc7XHJcbmltcG9ydCB7IEJzRGF0ZXBpY2tlclZpZXdNb2RlLCBEYXRlcGlja2VyRGF0ZUN1c3RvbUNsYXNzZXMsIERhdGVwaWNrZXJEYXRlVG9vbHRpcFRleHQgfSBmcm9tICcuL21vZGVscyc7XHJcbmltcG9ydCB7IEJzRGF0ZXBpY2tlckNvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4vdGhlbWVzL2JzL2JzLWRhdGVwaWNrZXItY29udGFpbmVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IGNvcHlUaW1lIH0gZnJvbSAnLi91dGlscy9jb3B5LXRpbWUtdXRpbHMnO1xyXG5pbXBvcnQgeyBjaGVja0JzVmFsdWUsIHNldEN1cnJlbnRUaW1lT25EYXRlU2VsZWN0IH0gZnJvbSAnLi91dGlscy9icy1jYWxlbmRhci11dGlscyc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1tic0RhdGVwaWNrZXJdJyxcclxuICBleHBvcnRBczogJ2JzRGF0ZXBpY2tlcidcclxufSlcclxuZXhwb3J0IGNsYXNzIEJzRGF0ZXBpY2tlckRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMsIEFmdGVyVmlld0luaXQge1xyXG4gIC8qKlxyXG4gICAqIFBsYWNlbWVudCBvZiBhIGRhdGVwaWNrZXIuIEFjY2VwdHM6IFwidG9wXCIsIFwiYm90dG9tXCIsIFwibGVmdFwiLCBcInJpZ2h0XCJcclxuICAgKi9cclxuICBASW5wdXQoKSBwbGFjZW1lbnQ6ICd0b3AnIHwgJ2JvdHRvbScgfCAnbGVmdCcgfCAncmlnaHQnID0gJ2JvdHRvbSc7XHJcbiAgLyoqXHJcbiAgICogU3BlY2lmaWVzIGV2ZW50cyB0aGF0IHNob3VsZCB0cmlnZ2VyLiBTdXBwb3J0cyBhIHNwYWNlIHNlcGFyYXRlZCBsaXN0IG9mXHJcbiAgICogZXZlbnQgbmFtZXMuXHJcbiAgICovXHJcbiAgQElucHV0KCkgdHJpZ2dlcnMgPSAnY2xpY2snO1xyXG4gIC8qKlxyXG4gICAqIENsb3NlIGRhdGVwaWNrZXIgb24gb3V0c2lkZSBjbGlja1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG91dHNpZGVDbGljayA9IHRydWU7XHJcbiAgLyoqXHJcbiAgICogQSBzZWxlY3RvciBzcGVjaWZ5aW5nIHRoZSBlbGVtZW50IHRoZSBkYXRlcGlja2VyIHNob3VsZCBiZSBhcHBlbmRlZCB0by5cclxuICAgKi9cclxuICBASW5wdXQoKSBjb250YWluZXIgPSAnYm9keSc7XHJcblxyXG4gIEBJbnB1dCgpIG91dHNpZGVFc2MgPSB0cnVlO1xyXG4gIC8qKlxyXG4gICAqIEVtaXRzIGFuIGV2ZW50IHdoZW4gdGhlIGRhdGVwaWNrZXIgaXMgc2hvd25cclxuICAgKi9cclxuICBAT3V0cHV0KCkgb25TaG93bjogRXZlbnRFbWl0dGVyPHVua25vd24+O1xyXG4gIC8qKlxyXG4gICAqIEVtaXRzIGFuIGV2ZW50IHdoZW4gdGhlIGRhdGVwaWNrZXIgaXMgaGlkZGVuXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIG9uSGlkZGVuOiBFdmVudEVtaXR0ZXI8dW5rbm93bj47XHJcbiAgaXNPcGVuJDogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+O1xyXG4gIGlzRGVzdHJveSQgPSBuZXcgU3ViamVjdCgpO1xyXG4gIC8qKlxyXG4gICAqIEluZGljYXRlcyB3aGV0aGVyIGRhdGVwaWNrZXIncyBjb250ZW50IGlzIGVuYWJsZWQgb3Igbm90XHJcbiAgICovXHJcbiAgQElucHV0KCkgaXNEaXNhYmxlZCA9IGZhbHNlO1xyXG4gIC8qKlxyXG4gICAqIE1pbmltdW0gZGF0ZSB3aGljaCBpcyBhdmFpbGFibGUgZm9yIHNlbGVjdGlvblxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG1pbkRhdGU/OiBEYXRlO1xyXG4gIC8qKlxyXG4gICAqIE1heGltdW0gZGF0ZSB3aGljaCBpcyBhdmFpbGFibGUgZm9yIHNlbGVjdGlvblxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG1heERhdGU/OiBEYXRlO1xyXG4gIC8qKlxyXG4gICAqIE1pbmltdW0gdmlldyBtb2RlIDogZGF5LCBtb250aCwgb3IgeWVhclxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG1pbk1vZGU/OiBCc0RhdGVwaWNrZXJWaWV3TW9kZTtcclxuICAvKipcclxuICAgKiBEaXNhYmxlIENlcnRhaW4gZGF5cyBpbiB0aGUgd2Vla1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGRheXNEaXNhYmxlZD86IG51bWJlcltdO1xyXG4gIC8qKlxyXG4gICAqIERpc2FibGUgc3BlY2lmaWMgZGF0ZXNcclxuICAgKi9cclxuICBASW5wdXQoKSBkYXRlc0Rpc2FibGVkPzogRGF0ZVtdO1xyXG4gIC8qKlxyXG4gICAqIEVuYWJsZSBzcGVjaWZpYyBkYXRlc1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGRhdGVzRW5hYmxlZD86IERhdGVbXTtcclxuICAvKipcclxuICAgKiBEYXRlIGN1c3RvbSBjbGFzc2VzXHJcbiAgICovXHJcbiAgQElucHV0KCkgZGF0ZUN1c3RvbUNsYXNzZXM/OiBEYXRlcGlja2VyRGF0ZUN1c3RvbUNsYXNzZXNbXTtcclxuICAvKipcclxuICAgKiBEYXRlIHRvb2x0aXAgdGV4dFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGRhdGVUb29sdGlwVGV4dHM/OiBEYXRlcGlja2VyRGF0ZVRvb2x0aXBUZXh0W107XHJcbiAgLyoqXHJcbiAgICogRW1pdHMgd2hlbiBkYXRlcGlja2VyIHZhbHVlIGhhcyBiZWVuIGNoYW5nZWRcclxuICAgKi9cclxuICBAT3V0cHV0KCkgYnNWYWx1ZUNoYW5nZTogRXZlbnRFbWl0dGVyPERhdGU+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIHByb3RlY3RlZCBfc3ViczogU3Vic2NyaXB0aW9uW10gPSBbXTtcclxuICBwcml2YXRlIF9kYXRlcGlja2VyOiBDb21wb25lbnRMb2FkZXI8QnNEYXRlcGlja2VyQ29udGFpbmVyQ29tcG9uZW50PjtcclxuICBwcml2YXRlIF9kYXRlcGlja2VyUmVmPzogQ29tcG9uZW50UmVmPEJzRGF0ZXBpY2tlckNvbnRhaW5lckNvbXBvbmVudD47XHJcbiAgcHJpdmF0ZSByZWFkb25seSBfZGF0ZUlucHV0Rm9ybWF0JCA9IG5ldyBTdWJqZWN0PHN0cmluZyB8IHVuZGVmaW5lZD4oKTtcclxuXHJcbiAgY29uc3RydWN0b3IocHVibGljIF9jb25maWc6IEJzRGF0ZXBpY2tlckNvbmZpZyxcclxuICAgICAgICAgICAgICBwcml2YXRlICBfZWxlbWVudFJlZjogRWxlbWVudFJlZixcclxuICAgICAgICAgICAgICBwcml2YXRlICBfcmVuZGVyZXI6IFJlbmRlcmVyMixcclxuICAgICAgICAgICAgICBfdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcclxuICAgICAgICAgICAgICBjaXM6IENvbXBvbmVudExvYWRlckZhY3RvcnkpIHtcclxuICAgIC8vIHRvZG86IGFzc2lnbiBvbmx5IHN1YnNldCBvZiBmaWVsZHNcclxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgdGhpcy5fY29uZmlnKTtcclxuICAgIHRoaXMuX2RhdGVwaWNrZXIgPSBjaXMuY3JlYXRlTG9hZGVyPEJzRGF0ZXBpY2tlckNvbnRhaW5lckNvbXBvbmVudD4oXHJcbiAgICAgIF9lbGVtZW50UmVmLFxyXG4gICAgICBfdmlld0NvbnRhaW5lclJlZixcclxuICAgICAgX3JlbmRlcmVyXHJcbiAgICApO1xyXG4gICAgdGhpcy5vblNob3duID0gdGhpcy5fZGF0ZXBpY2tlci5vblNob3duO1xyXG4gICAgdGhpcy5vbkhpZGRlbiA9IHRoaXMuX2RhdGVwaWNrZXIub25IaWRkZW47XHJcbiAgICB0aGlzLmlzT3BlbiQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KHRoaXMuaXNPcGVuKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhlIGRhdGVwaWNrZXIgaXMgY3VycmVudGx5IGJlaW5nIHNob3duXHJcbiAgICovXHJcbiAgQElucHV0KClcclxuICBnZXQgaXNPcGVuKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2RhdGVwaWNrZXIuaXNTaG93bjtcclxuICB9XHJcblxyXG4gIHNldCBpc09wZW4odmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuaXNPcGVuJC5uZXh0KHZhbHVlKTtcclxuICB9XHJcblxyXG4gIF9ic1ZhbHVlPzogRGF0ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogSW5pdGlhbCB2YWx1ZSBvZiBkYXRlcGlja2VyXHJcbiAgICovXHJcbiAgQElucHV0KClcclxuICBzZXQgYnNWYWx1ZSh2YWx1ZTogRGF0ZSB8IHVuZGVmaW5lZCkge1xyXG4gICAgaWYgKHRoaXMuX2JzVmFsdWUgJiYgdmFsdWUgJiYgdGhpcy5fYnNWYWx1ZS5nZXRUaW1lKCkgPT09IHZhbHVlLmdldFRpbWUoKSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLl9ic1ZhbHVlICYmIHZhbHVlICYmICF0aGlzLl9jb25maWcud2l0aFRpbWVwaWNrZXIpIHtcclxuICAgICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcclxuICAgICAgY29weVRpbWUodmFsdWUsIG5vdyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHZhbHVlICYmIHRoaXMuYnNDb25maWc/LmluaXRDdXJyZW50VGltZSkge1xyXG4gICAgICB2YWx1ZSA9IHNldEN1cnJlbnRUaW1lT25EYXRlU2VsZWN0KHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9ic1ZhbHVlID0gdmFsdWU7XHJcbiAgICB0aGlzLmJzVmFsdWVDaGFuZ2UuZW1pdCh2YWx1ZSk7XHJcbiAgfVxyXG5cclxuICBnZXQgZGF0ZUlucHV0Rm9ybWF0JCgpOiBPYnNlcnZhYmxlPHN0cmluZyB8IHVuZGVmaW5lZD4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2RhdGVJbnB1dEZvcm1hdCQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDb25maWcgb2JqZWN0IGZvciBkYXRlcGlja2VyXHJcbiAgICovXHJcbiAgQElucHV0KCkgYnNDb25maWc/OiBQYXJ0aWFsPEJzRGF0ZXBpY2tlckNvbmZpZz47XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5fZGF0ZXBpY2tlci5saXN0ZW4oe1xyXG4gICAgICBvdXRzaWRlQ2xpY2s6IHRoaXMub3V0c2lkZUNsaWNrLFxyXG4gICAgICBvdXRzaWRlRXNjOiB0aGlzLm91dHNpZGVFc2MsXHJcbiAgICAgIHRyaWdnZXJzOiB0aGlzLnRyaWdnZXJzLFxyXG4gICAgICBzaG93OiAoKSA9PiB0aGlzLnNob3coKVxyXG4gICAgfSk7XHJcbiAgICB0aGlzLnNldENvbmZpZygpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xyXG4gICAgaWYgKGNoYW5nZXNbXCJic0NvbmZpZ1wiXSkge1xyXG4gICAgICBpZiAoY2hhbmdlc1tcImJzQ29uZmlnXCJdLmN1cnJlbnRWYWx1ZT8uaW5pdEN1cnJlbnRUaW1lICYmIGNoYW5nZXNbXCJic0NvbmZpZ1wiXS5jdXJyZW50VmFsdWU/LmluaXRDdXJyZW50VGltZSAhPT0gY2hhbmdlc1tcImJzQ29uZmlnXCJdLnByZXZpb3VzVmFsdWU/LmluaXRDdXJyZW50VGltZSAmJiB0aGlzLl9ic1ZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5fYnNWYWx1ZSA9IHNldEN1cnJlbnRUaW1lT25EYXRlU2VsZWN0KHRoaXMuX2JzVmFsdWUpO1xyXG4gICAgICAgIHRoaXMuYnNWYWx1ZUNoYW5nZS5lbWl0KHRoaXMuX2JzVmFsdWUpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLnNldENvbmZpZygpO1xyXG4gICAgICB0aGlzLl9kYXRlSW5wdXRGb3JtYXQkLm5leHQodGhpcy5ic0NvbmZpZyAmJiB0aGlzLmJzQ29uZmlnLmRhdGVJbnB1dEZvcm1hdCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLl9kYXRlcGlja2VyUmVmIHx8ICF0aGlzLl9kYXRlcGlja2VyUmVmLmluc3RhbmNlKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY2hhbmdlc1tcIm1pbkRhdGVcIl0pIHtcclxuICAgICAgdGhpcy5fZGF0ZXBpY2tlclJlZi5pbnN0YW5jZS5taW5EYXRlID0gdGhpcy5taW5EYXRlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChjaGFuZ2VzW1wibWF4RGF0ZVwiXSkge1xyXG4gICAgICB0aGlzLl9kYXRlcGlja2VyUmVmLmluc3RhbmNlLm1heERhdGUgPSB0aGlzLm1heERhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNoYW5nZXNbXCJkYXlzRGlzYWJsZWRcIl0pIHtcclxuICAgICAgdGhpcy5fZGF0ZXBpY2tlclJlZi5pbnN0YW5jZS5kYXlzRGlzYWJsZWQgPSB0aGlzLmRheXNEaXNhYmxlZDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY2hhbmdlc1tcImRhdGVzRGlzYWJsZWRcIl0pIHtcclxuICAgICAgdGhpcy5fZGF0ZXBpY2tlclJlZi5pbnN0YW5jZS5kYXRlc0Rpc2FibGVkID0gdGhpcy5kYXRlc0Rpc2FibGVkO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChjaGFuZ2VzW1wiZGF0ZXNFbmFibGVkXCJdKSB7XHJcbiAgICAgIHRoaXMuX2RhdGVwaWNrZXJSZWYuaW5zdGFuY2UuZGF0ZXNFbmFibGVkID0gdGhpcy5kYXRlc0VuYWJsZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNoYW5nZXNbXCJpc0Rpc2FibGVkXCJdKSB7XHJcbiAgICAgIGlmICh0aGlzLl9lbGVtZW50UmVmPy5uYXRpdmVFbGVtZW50KSB7XHJcbiAgICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZSgncmVhZG9ubHknLCB0aGlzLmlzRGlzYWJsZWQpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuX2RhdGVwaWNrZXJSZWYuaW5zdGFuY2UuaXNEaXNhYmxlZCA9IHRoaXMuaXNEaXNhYmxlZDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY2hhbmdlc1tcImRhdGVDdXN0b21DbGFzc2VzXCJdKSB7XHJcbiAgICAgIHRoaXMuX2RhdGVwaWNrZXJSZWYuaW5zdGFuY2UuZGF0ZUN1c3RvbUNsYXNzZXMgPSB0aGlzLmRhdGVDdXN0b21DbGFzc2VzO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChjaGFuZ2VzW1wiZGF0ZVRvb2x0aXBUZXh0c1wiXSkge1xyXG4gICAgICB0aGlzLl9kYXRlcGlja2VyUmVmLmluc3RhbmNlLmRhdGVUb29sdGlwVGV4dHMgPSB0aGlzLmRhdGVUb29sdGlwVGV4dHM7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpbml0U3Vic2NyaWJlcygpIHtcclxuICAgIC8vIGlmIGRhdGUgY2hhbmdlcyBmcm9tIGV4dGVybmFsIHNvdXJjZSAobW9kZWwgLT4gdmlldylcclxuICAgIHRoaXMuX3N1YnMucHVzaChcclxuICAgICAgdGhpcy5ic1ZhbHVlQ2hhbmdlLnN1YnNjcmliZSgodmFsdWU6IERhdGUpID0+IHtcclxuICAgICAgICBpZiAodGhpcy5fZGF0ZXBpY2tlclJlZikge1xyXG4gICAgICAgICAgdGhpcy5fZGF0ZXBpY2tlclJlZi5pbnN0YW5jZS52YWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICk7XHJcblxyXG4gICAgLy8gaWYgZGF0ZSBjaGFuZ2VzIGZyb20gcGlja2VyICh2aWV3IC0+IG1vZGVsKVxyXG4gICAgaWYgKHRoaXMuX2RhdGVwaWNrZXJSZWYpIHtcclxuICAgICAgdGhpcy5fc3Vicy5wdXNoKFxyXG4gICAgICAgIHRoaXMuX2RhdGVwaWNrZXJSZWYuaW5zdGFuY2UudmFsdWVDaGFuZ2Uuc3Vic2NyaWJlKCh2YWx1ZTogRGF0ZSkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5ic1ZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgICB0aGlzLmhpZGUoKTtcclxuICAgICAgICB9KVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5pc09wZW4kLnBpcGUoXHJcbiAgICAgIGZpbHRlcihpc09wZW4gPT4gaXNPcGVuICE9PSB0aGlzLmlzT3BlbiksXHJcbiAgICAgIHRha2VVbnRpbCh0aGlzLmlzRGVzdHJveSQpXHJcbiAgICApXHJcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy50b2dnbGUoKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBPcGVucyBhbiBlbGVtZW504oCZcyBkYXRlcGlja2VyLiBUaGlzIGlzIGNvbnNpZGVyZWQgYSDigJxtYW51YWzigJ0gdHJpZ2dlcmluZyBvZlxyXG4gICAqIHRoZSBkYXRlcGlja2VyLlxyXG4gICAqL1xyXG4gIHNob3coKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5fZGF0ZXBpY2tlci5pc1Nob3duKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNldENvbmZpZygpO1xyXG5cclxuICAgIHRoaXMuX2RhdGVwaWNrZXJSZWYgPSB0aGlzLl9kYXRlcGlja2VyXHJcbiAgICAgIC5wcm92aWRlKHsgcHJvdmlkZTogQnNEYXRlcGlja2VyQ29uZmlnLCB1c2VWYWx1ZTogdGhpcy5fY29uZmlnIH0pXHJcbiAgICAgIC5hdHRhY2goQnNEYXRlcGlja2VyQ29udGFpbmVyQ29tcG9uZW50KVxyXG4gICAgICAudG8odGhpcy5jb250YWluZXIpXHJcbiAgICAgIC5wb3NpdGlvbih7IGF0dGFjaG1lbnQ6IHRoaXMucGxhY2VtZW50IH0pXHJcbiAgICAgIC5zaG93KHsgcGxhY2VtZW50OiB0aGlzLnBsYWNlbWVudCB9KTtcclxuXHJcbiAgICB0aGlzLmluaXRTdWJzY3JpYmVzKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDbG9zZXMgYW4gZWxlbWVudOKAmXMgZGF0ZXBpY2tlci4gVGhpcyBpcyBjb25zaWRlcmVkIGEg4oCcbWFudWFs4oCdIHRyaWdnZXJpbmcgb2ZcclxuICAgKiB0aGUgZGF0ZXBpY2tlci5cclxuICAgKi9cclxuICBoaWRlKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuaXNPcGVuKSB7XHJcbiAgICAgIHRoaXMuX2RhdGVwaWNrZXIuaGlkZSgpO1xyXG4gICAgfVxyXG4gICAgZm9yIChjb25zdCBzdWIgb2YgdGhpcy5fc3Vicykge1xyXG4gICAgICBzdWIudW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5fY29uZmlnLnJldHVybkZvY3VzVG9JbnB1dCkge1xyXG4gICAgICB0aGlzLl9yZW5kZXJlci5zZWxlY3RSb290RWxlbWVudCh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpLmZvY3VzKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUb2dnbGVzIGFuIGVsZW1lbnTigJlzIGRhdGVwaWNrZXIuIFRoaXMgaXMgY29uc2lkZXJlZCBhIOKAnG1hbnVhbOKAnSB0cmlnZ2VyaW5nXHJcbiAgICogb2YgdGhlIGRhdGVwaWNrZXIuXHJcbiAgICovXHJcbiAgdG9nZ2xlKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuaXNPcGVuKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmhpZGUoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNob3coKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldCBjb25maWcgZm9yIGRhdGVwaWNrZXJcclxuICAgKi9cclxuICBzZXRDb25maWcoKTogdm9pZCB7XHJcbiAgICB0aGlzLl9jb25maWcgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLl9jb25maWcsIHRoaXMuYnNDb25maWcsIHtcclxuICAgICAgdmFsdWU6IGNoZWNrQnNWYWx1ZSh0aGlzLl9ic1ZhbHVlLCB0aGlzLm1heERhdGUgfHwgdGhpcy5ic0NvbmZpZyAmJiB0aGlzLmJzQ29uZmlnLm1heERhdGUpLFxyXG4gICAgICBpc0Rpc2FibGVkOiB0aGlzLmlzRGlzYWJsZWQsXHJcbiAgICAgIG1pbkRhdGU6IHRoaXMubWluRGF0ZSB8fCB0aGlzLmJzQ29uZmlnICYmIHRoaXMuYnNDb25maWcubWluRGF0ZSxcclxuICAgICAgbWF4RGF0ZTogdGhpcy5tYXhEYXRlIHx8IHRoaXMuYnNDb25maWcgJiYgdGhpcy5ic0NvbmZpZy5tYXhEYXRlLFxyXG4gICAgICBkYXlzRGlzYWJsZWQ6IHRoaXMuZGF5c0Rpc2FibGVkIHx8IHRoaXMuYnNDb25maWcgJiYgdGhpcy5ic0NvbmZpZy5kYXlzRGlzYWJsZWQsXHJcbiAgICAgIGRhdGVDdXN0b21DbGFzc2VzOiB0aGlzLmRhdGVDdXN0b21DbGFzc2VzIHx8IHRoaXMuYnNDb25maWcgJiYgdGhpcy5ic0NvbmZpZy5kYXRlQ3VzdG9tQ2xhc3NlcyxcclxuICAgICAgZGF0ZVRvb2x0aXBUZXh0czogdGhpcy5kYXRlVG9vbHRpcFRleHRzIHx8IHRoaXMuYnNDb25maWcgJiYgdGhpcy5ic0NvbmZpZy5kYXRlVG9vbHRpcFRleHRzLFxyXG4gICAgICBkYXRlc0Rpc2FibGVkOiB0aGlzLmRhdGVzRGlzYWJsZWQgfHwgdGhpcy5ic0NvbmZpZyAmJiB0aGlzLmJzQ29uZmlnLmRhdGVzRGlzYWJsZWQsXHJcbiAgICAgIGRhdGVzRW5hYmxlZDogdGhpcy5kYXRlc0VuYWJsZWQgfHwgdGhpcy5ic0NvbmZpZyAmJiB0aGlzLmJzQ29uZmlnLmRhdGVzRW5hYmxlZCxcclxuICAgICAgbWluTW9kZTogdGhpcy5taW5Nb2RlIHx8IHRoaXMuYnNDb25maWcgJiYgdGhpcy5ic0NvbmZpZy5taW5Nb2RlLFxyXG4gICAgICBpbml0Q3VycmVudFRpbWU6IHRoaXMuYnNDb25maWc/LmluaXRDdXJyZW50VGltZVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICB1bnN1YnNjcmliZVN1YnNjcmlwdGlvbnMoKSB7XHJcbiAgICBpZiAodGhpcy5fc3Vicz8ubGVuZ3RoKSB7XHJcbiAgICAgIHRoaXMuX3N1YnMubWFwKHN1YiA9PiBzdWIudW5zdWJzY3JpYmUoKSk7XHJcbiAgICAgIHRoaXMuX3N1YnMubGVuZ3RoID0gMDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgdGhpcy5fZGF0ZXBpY2tlci5kaXNwb3NlKCk7XHJcbiAgICB0aGlzLmlzT3BlbiQubmV4dChmYWxzZSk7XHJcbiAgICBpZiAodGhpcy5pc0Rlc3Ryb3kkKSB7XHJcbiAgICAgIHRoaXMuaXNEZXN0cm95JC5uZXh0KG51bGwpO1xyXG4gICAgICB0aGlzLmlzRGVzdHJveSQuY29tcGxldGUoKTtcclxuICAgIH1cclxuICAgIHRoaXMudW5zdWJzY3JpYmVTdWJzY3JpcHRpb25zKCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==