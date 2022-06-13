import { Directive, ElementRef, EventEmitter, Input, Output, Renderer2, ViewContainerRef } from '@angular/core';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { BsDatepickerInlineConfig } from './bs-datepicker-inline.config';
import { BsDatepickerConfig } from './bs-datepicker.config';
import { BsDatepickerInlineContainerComponent } from './themes/bs/bs-datepicker-inline-container.component';
import { copyTime } from './utils/copy-time-utils';
import { checkBsValue, setCurrentTimeOnDateSelect } from './utils/bs-calendar-utils';
import * as i0 from "@angular/core";
import * as i1 from "./bs-datepicker-inline.config";
import * as i2 from "ngx-bootstrap/component-loader";
export class BsDatepickerInlineDirective {
    constructor(_config, _elementRef, _renderer, _viewContainerRef, cis) {
        this._config = _config;
        this._elementRef = _elementRef;
        /**
         * Indicates whether datepicker is enabled or not
         */
        this.isDisabled = false;
        /**
         * Emits when datepicker value has been changed
         */
        this.bsValueChange = new EventEmitter();
        this._subs = [];
        // todo: assign only subset of fields
        Object.assign(this, this._config);
        this._datepicker = cis.createLoader(_elementRef, _viewContainerRef, _renderer);
    }
    /**
     * Initial value of datepicker
     */
    set bsValue(value) {
        if (this._bsValue === value) {
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
    ngOnInit() {
        this.setConfig();
        this.initSubscribes();
    }
    initSubscribes() {
        this.unsubscribeSubscriptions();
        this._subs.push(this.bsValueChange.subscribe((value) => {
            if (this._datepickerRef) {
                this._datepickerRef.instance.value = value;
            }
        }));
        if (this._datepickerRef) {
            this._subs.push(this._datepickerRef.instance.valueChange.subscribe((value) => {
                this.bsValue = value;
            }));
        }
    }
    unsubscribeSubscriptions() {
        if (this._subs?.length) {
            this._subs.map(sub => sub.unsubscribe());
            this._subs.length = 0;
        }
    }
    ngOnChanges(changes) {
        if (changes["bsConfig"]) {
            if (changes["bsConfig"].currentValue?.initCurrentTime && changes["bsConfig"].currentValue?.initCurrentTime !== changes["bsConfig"].previousValue?.initCurrentTime && this._bsValue) {
                this._bsValue = setCurrentTimeOnDateSelect(this._bsValue);
                this.bsValueChange.emit(this._bsValue);
            }
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
        if (changes["datesDisabled"]) {
            this._datepickerRef.instance.datesDisabled = this.datesDisabled;
        }
        if (changes["datesEnabled"]) {
            this._datepickerRef.instance.datesEnabled = this.datesEnabled;
            this._datepickerRef.instance.value = this._bsValue;
        }
        if (changes["isDisabled"]) {
            this._datepickerRef.instance.isDisabled = this.isDisabled;
        }
        if (changes["dateCustomClasses"]) {
            this._datepickerRef.instance.dateCustomClasses = this.dateCustomClasses;
        }
        if (changes["dateTooltipTexts"]) {
            this._datepickerRef.instance.dateTooltipTexts = this.dateTooltipTexts;
        }
        this.setConfig();
    }
    /**
     * Set config for datepicker
     */
    setConfig() {
        if (this._datepicker) {
            this._datepicker.hide();
        }
        this._config = Object.assign({}, this._config, this.bsConfig, {
            value: checkBsValue(this._bsValue, this.maxDate || this.bsConfig && this.bsConfig.maxDate),
            isDisabled: this.isDisabled,
            minDate: this.minDate || this.bsConfig && this.bsConfig.minDate,
            maxDate: this.maxDate || this.bsConfig && this.bsConfig.maxDate,
            dateCustomClasses: this.dateCustomClasses || this.bsConfig && this.bsConfig.dateCustomClasses,
            dateTooltipTexts: this.dateTooltipTexts || this.bsConfig && this.bsConfig.dateTooltipTexts,
            datesDisabled: this.datesDisabled || this.bsConfig && this.bsConfig.datesDisabled,
            datesEnabled: this.datesEnabled || this.bsConfig && this.bsConfig.datesEnabled,
            initCurrentTime: this.bsConfig?.initCurrentTime
        });
        this._datepickerRef = this._datepicker
            .provide({ provide: BsDatepickerConfig, useValue: this._config })
            .attach(BsDatepickerInlineContainerComponent)
            .to(this._elementRef)
            .show();
        this.initSubscribes();
    }
    ngOnDestroy() {
        this._datepicker.dispose();
        this.unsubscribeSubscriptions();
    }
}
BsDatepickerInlineDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: BsDatepickerInlineDirective, deps: [{ token: i1.BsDatepickerInlineConfig }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i2.ComponentLoaderFactory }], target: i0.ɵɵFactoryTarget.Directive });
BsDatepickerInlineDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.1", type: BsDatepickerInlineDirective, selector: "bs-datepicker-inline", inputs: { bsConfig: "bsConfig", isDisabled: "isDisabled", minDate: "minDate", maxDate: "maxDate", dateCustomClasses: "dateCustomClasses", dateTooltipTexts: "dateTooltipTexts", datesEnabled: "datesEnabled", datesDisabled: "datesDisabled", bsValue: "bsValue" }, outputs: { bsValueChange: "bsValueChange" }, exportAs: ["bsDatepickerInline"], usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: BsDatepickerInlineDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'bs-datepicker-inline',
                    exportAs: 'bsDatepickerInline'
                }]
        }], ctorParameters: function () { return [{ type: i1.BsDatepickerInlineConfig }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i2.ComponentLoaderFactory }]; }, propDecorators: { bsConfig: [{
                type: Input
            }], isDisabled: [{
                type: Input
            }], minDate: [{
                type: Input
            }], maxDate: [{
                type: Input
            }], dateCustomClasses: [{
                type: Input
            }], dateTooltipTexts: [{
                type: Input
            }], datesEnabled: [{
                type: Input
            }], datesDisabled: [{
                type: Input
            }], bsValueChange: [{
                type: Output
            }], bsValue: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnMtZGF0ZXBpY2tlci1pbmxpbmUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2RhdGVwaWNrZXIvYnMtZGF0ZXBpY2tlci1pbmxpbmUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFFTCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixLQUFLLEVBSUwsTUFBTSxFQUNOLFNBQVMsRUFFVCxnQkFBZ0IsRUFDakIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFtQixzQkFBc0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBR3pGLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBRXpFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRTVELE9BQU8sRUFBRSxvQ0FBb0MsRUFBRSxNQUFNLHNEQUFzRCxDQUFDO0FBQzVHLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsWUFBWSxFQUFFLDBCQUEwQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7Ozs7QUFNckYsTUFBTSxPQUFPLDJCQUEyQjtJQXlDdEMsWUFDUyxPQUFpQyxFQUNoQyxXQUF1QixFQUMvQixTQUFvQixFQUNwQixpQkFBbUMsRUFDbkMsR0FBMkI7UUFKcEIsWUFBTyxHQUFQLE9BQU8sQ0FBMEI7UUFDaEMsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUF0Q2pDOztXQUVHO1FBQ00sZUFBVSxHQUFHLEtBQUssQ0FBQztRQXlCNUI7O1dBRUc7UUFDTyxrQkFBYSxHQUF1QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3ZELFVBQUssR0FBbUIsRUFBRSxDQUFDO1FBV25DLHFDQUFxQztRQUNyQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUMsWUFBWSxDQUNqQyxXQUFXLEVBQ1gsaUJBQWlCLEVBQ2pCLFNBQVMsQ0FDVixDQUFDO0lBQ0osQ0FBQztJQUlEOztPQUVHO0lBQ0gsSUFDSSxPQUFPLENBQUMsS0FBdUI7UUFDakMsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLEtBQUssRUFBRTtZQUMzQixPQUFPO1NBQ1I7UUFFQSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRTtZQUMzRCxNQUFNLEdBQUcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1lBQ3ZCLFFBQVEsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDdEI7UUFFRixJQUFJLEtBQUssSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLGVBQWUsRUFBRTtZQUMzQyxLQUFLLEdBQUcsMEJBQTBCLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDMUM7UUFFRixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN0QixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVELGNBQWM7UUFDWixJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztRQUNoQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FDYixJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQVcsRUFBRSxFQUFFO1lBQzNDLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRTtnQkFDdkIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQzthQUM1QztRQUNILENBQUMsQ0FBQyxDQUNILENBQUM7UUFFRixJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDdkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQ2IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQVcsRUFBRSxFQUFFO2dCQUNqRSxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUN2QixDQUFDLENBQUMsQ0FDSCxDQUFDO1NBQ0g7SUFDSCxDQUFDO0lBRUQsd0JBQXdCO1FBQ3RCLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUU7WUFDdEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztZQUN6QyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7U0FDdkI7SUFDSCxDQUFDO0lBRUQsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3ZCLElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLFlBQVksRUFBRSxlQUFlLElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLFlBQVksRUFBRSxlQUFlLEtBQUssT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLGFBQWEsRUFBRSxlQUFlLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDbEwsSUFBSSxDQUFDLFFBQVEsR0FBRywwQkFBMEIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQzFELElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUN4QztTQUNGO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRTtZQUN6RCxPQUFPO1NBQ1I7UUFFRCxJQUFJLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUN0QixJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztTQUNyRDtRQUVELElBQUksT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ3RCLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1NBQ3JEO1FBRUQsSUFBSSxPQUFPLENBQUMsZUFBZSxDQUFDLEVBQUU7WUFDNUIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7U0FDakU7UUFFRCxJQUFJLE9BQU8sQ0FBQyxjQUFjLENBQUMsRUFBRTtZQUMzQixJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUM5RCxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztTQUNwRDtRQUVELElBQUksT0FBTyxDQUFDLFlBQVksQ0FBQyxFQUFFO1lBQ3pCLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1NBQzNEO1FBRUQsSUFBSSxPQUFPLENBQUMsbUJBQW1CLENBQUMsRUFBRTtZQUNoQyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUM7U0FDekU7UUFFRCxJQUFJLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFO1lBQy9CLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztTQUN2RTtRQUVELElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBRUQ7O09BRUc7SUFDSCxTQUFTO1FBQ1AsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDekI7UUFFRCxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUM1RCxLQUFLLEVBQUUsWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDO1lBQzFGLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVTtZQUMzQixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTztZQUMvRCxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTztZQUMvRCxpQkFBaUIsRUFBRSxJQUFJLENBQUMsaUJBQWlCLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQjtZQUM3RixnQkFBZ0IsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQjtZQUMxRixhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYTtZQUNqRixZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWTtZQUM5RSxlQUFlLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxlQUFlO1NBQ2hELENBQUMsQ0FBQztRQUdILElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFdBQVc7YUFDbkMsT0FBTyxDQUFDLEVBQUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDaEUsTUFBTSxDQUFDLG9DQUFvQyxDQUFDO2FBQzVDLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO2FBQ3BCLElBQUksRUFBRSxDQUFDO1FBRVYsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztJQUNsQyxDQUFDOzt3SEE3TFUsMkJBQTJCOzRHQUEzQiwyQkFBMkI7MkZBQTNCLDJCQUEyQjtrQkFKdkMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsc0JBQXNCO29CQUNoQyxRQUFRLEVBQUUsb0JBQW9CO2lCQUMvQjtvT0FLVSxRQUFRO3NCQUFoQixLQUFLO2dCQUlHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBSUcsT0FBTztzQkFBZixLQUFLO2dCQUlHLE9BQU87c0JBQWYsS0FBSztnQkFJRyxpQkFBaUI7c0JBQXpCLEtBQUs7Z0JBSUcsZ0JBQWdCO3NCQUF4QixLQUFLO2dCQUlHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBSUcsYUFBYTtzQkFBckIsS0FBSztnQkFJSSxhQUFhO3NCQUF0QixNQUFNO2dCQTJCSCxPQUFPO3NCQURWLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudFJlZixcclxuICBEaXJlY3RpdmUsXHJcbiAgRWxlbWVudFJlZixcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgSW5wdXQsXHJcbiAgT25DaGFuZ2VzLFxyXG4gIE9uRGVzdHJveSxcclxuICBPbkluaXQsXHJcbiAgT3V0cHV0LFxyXG4gIFJlbmRlcmVyMixcclxuICBTaW1wbGVDaGFuZ2VzLFxyXG4gIFZpZXdDb250YWluZXJSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IENvbXBvbmVudExvYWRlciwgQ29tcG9uZW50TG9hZGVyRmFjdG9yeSB9IGZyb20gJ25neC1ib290c3RyYXAvY29tcG9uZW50LWxvYWRlcic7XHJcblxyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgQnNEYXRlcGlja2VySW5saW5lQ29uZmlnIH0gZnJvbSAnLi9icy1kYXRlcGlja2VyLWlubGluZS5jb25maWcnO1xyXG5cclxuaW1wb3J0IHsgQnNEYXRlcGlja2VyQ29uZmlnIH0gZnJvbSAnLi9icy1kYXRlcGlja2VyLmNvbmZpZyc7XHJcbmltcG9ydCB7IERhdGVwaWNrZXJEYXRlQ3VzdG9tQ2xhc3NlcywgRGF0ZXBpY2tlckRhdGVUb29sdGlwVGV4dCB9IGZyb20gJy4vbW9kZWxzJztcclxuaW1wb3J0IHsgQnNEYXRlcGlja2VySW5saW5lQ29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi90aGVtZXMvYnMvYnMtZGF0ZXBpY2tlci1pbmxpbmUtY29udGFpbmVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IGNvcHlUaW1lIH0gZnJvbSAnLi91dGlscy9jb3B5LXRpbWUtdXRpbHMnO1xyXG5pbXBvcnQgeyBjaGVja0JzVmFsdWUsIHNldEN1cnJlbnRUaW1lT25EYXRlU2VsZWN0IH0gZnJvbSAnLi91dGlscy9icy1jYWxlbmRhci11dGlscyc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ2JzLWRhdGVwaWNrZXItaW5saW5lJyxcclxuICBleHBvcnRBczogJ2JzRGF0ZXBpY2tlcklubGluZSdcclxufSlcclxuZXhwb3J0IGNsYXNzIEJzRGF0ZXBpY2tlcklubGluZURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMge1xyXG4gIC8qKlxyXG4gICAqIENvbmZpZyBvYmplY3QgZm9yIGRhdGVwaWNrZXJcclxuICAgKi9cclxuICBASW5wdXQoKSBic0NvbmZpZz86IFBhcnRpYWw8QnNEYXRlcGlja2VySW5saW5lQ29uZmlnPjtcclxuICAvKipcclxuICAgKiBJbmRpY2F0ZXMgd2hldGhlciBkYXRlcGlja2VyIGlzIGVuYWJsZWQgb3Igbm90XHJcbiAgICovXHJcbiAgQElucHV0KCkgaXNEaXNhYmxlZCA9IGZhbHNlO1xyXG4gIC8qKlxyXG4gICAqIE1pbmltdW0gZGF0ZSB3aGljaCBpcyBhdmFpbGFibGUgZm9yIHNlbGVjdGlvblxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG1pbkRhdGU/OiBEYXRlO1xyXG4gIC8qKlxyXG4gICAqIE1heGltdW0gZGF0ZSB3aGljaCBpcyBhdmFpbGFibGUgZm9yIHNlbGVjdGlvblxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG1heERhdGU/OiBEYXRlO1xyXG4gIC8qKlxyXG4gICAqIERhdGUgY3VzdG9tIGNsYXNzZXNcclxuICAgKi9cclxuICBASW5wdXQoKSBkYXRlQ3VzdG9tQ2xhc3Nlcz86IERhdGVwaWNrZXJEYXRlQ3VzdG9tQ2xhc3Nlc1tdO1xyXG4gIC8qKlxyXG4gICAqIERhdGUgdG9vbHRpcCB0ZXh0XHJcbiAgICovXHJcbiAgQElucHV0KCkgZGF0ZVRvb2x0aXBUZXh0cz86IERhdGVwaWNrZXJEYXRlVG9vbHRpcFRleHRbXTtcclxuICAvKipcclxuICAgKiBEaXNhYmxlIHNwZWNpZmljIGRhdGVzXHJcbiAgICovXHJcbiAgQElucHV0KCkgZGF0ZXNFbmFibGVkPzogRGF0ZVtdO1xyXG4gIC8qKlxyXG4gICAqIEVuYWJsZSBzcGVjaWZpYyBkYXRlc1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGRhdGVzRGlzYWJsZWQ/OiBEYXRlW107XHJcbiAgLyoqXHJcbiAgICogRW1pdHMgd2hlbiBkYXRlcGlja2VyIHZhbHVlIGhhcyBiZWVuIGNoYW5nZWRcclxuICAgKi9cclxuICBAT3V0cHV0KCkgYnNWYWx1ZUNoYW5nZTogRXZlbnRFbWl0dGVyPERhdGU+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIHByb3RlY3RlZCBfc3ViczogU3Vic2NyaXB0aW9uW10gPSBbXTtcclxuICBwcml2YXRlIHJlYWRvbmx5IF9kYXRlcGlja2VyOiBDb21wb25lbnRMb2FkZXI8QnNEYXRlcGlja2VySW5saW5lQ29udGFpbmVyQ29tcG9uZW50PjtcclxuICBwcml2YXRlIF9kYXRlcGlja2VyUmVmPzogQ29tcG9uZW50UmVmPEJzRGF0ZXBpY2tlcklubGluZUNvbnRhaW5lckNvbXBvbmVudD47XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHVibGljIF9jb25maWc6IEJzRGF0ZXBpY2tlcklubGluZUNvbmZpZyxcclxuICAgIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXHJcbiAgICBfcmVuZGVyZXI6IFJlbmRlcmVyMixcclxuICAgIF92aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxyXG4gICAgY2lzOiBDb21wb25lbnRMb2FkZXJGYWN0b3J5XHJcbiAgKSB7XHJcbiAgICAvLyB0b2RvOiBhc3NpZ24gb25seSBzdWJzZXQgb2YgZmllbGRzXHJcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIHRoaXMuX2NvbmZpZyk7XHJcbiAgICB0aGlzLl9kYXRlcGlja2VyID0gY2lzLmNyZWF0ZUxvYWRlcjxCc0RhdGVwaWNrZXJJbmxpbmVDb250YWluZXJDb21wb25lbnQ+KFxyXG4gICAgICBfZWxlbWVudFJlZixcclxuICAgICAgX3ZpZXdDb250YWluZXJSZWYsXHJcbiAgICAgIF9yZW5kZXJlclxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIF9ic1ZhbHVlPzogRGF0ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogSW5pdGlhbCB2YWx1ZSBvZiBkYXRlcGlja2VyXHJcbiAgICovXHJcbiAgQElucHV0KClcclxuICBzZXQgYnNWYWx1ZSh2YWx1ZTogRGF0ZSB8IHVuZGVmaW5lZCkge1xyXG4gICAgaWYgKHRoaXMuX2JzVmFsdWUgPT09IHZhbHVlKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAgaWYgKCF0aGlzLl9ic1ZhbHVlICYmIHZhbHVlICYmICF0aGlzLl9jb25maWcud2l0aFRpbWVwaWNrZXIpIHtcclxuICAgICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICBjb3B5VGltZSh2YWx1ZSwgbm93KTtcclxuICAgICB9XHJcblxyXG4gICAgaWYgKHZhbHVlICYmIHRoaXMuYnNDb25maWc/LmluaXRDdXJyZW50VGltZSkge1xyXG4gICAgICB2YWx1ZSA9IHNldEN1cnJlbnRUaW1lT25EYXRlU2VsZWN0KHZhbHVlKTtcclxuICAgICB9XHJcblxyXG4gICAgdGhpcy5fYnNWYWx1ZSA9IHZhbHVlO1xyXG4gICAgdGhpcy5ic1ZhbHVlQ2hhbmdlLmVtaXQodmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLnNldENvbmZpZygpO1xyXG4gICAgdGhpcy5pbml0U3Vic2NyaWJlcygpO1xyXG4gIH1cclxuXHJcbiAgaW5pdFN1YnNjcmliZXMoKSB7XHJcbiAgICB0aGlzLnVuc3Vic2NyaWJlU3Vic2NyaXB0aW9ucygpO1xyXG4gICAgdGhpcy5fc3Vicy5wdXNoKFxyXG4gICAgICB0aGlzLmJzVmFsdWVDaGFuZ2Uuc3Vic2NyaWJlKCh2YWx1ZTogRGF0ZSkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLl9kYXRlcGlja2VyUmVmKSB7XHJcbiAgICAgICAgICB0aGlzLl9kYXRlcGlja2VyUmVmLmluc3RhbmNlLnZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgKTtcclxuXHJcbiAgICBpZiAodGhpcy5fZGF0ZXBpY2tlclJlZikge1xyXG4gICAgICB0aGlzLl9zdWJzLnB1c2goXHJcbiAgICAgICAgdGhpcy5fZGF0ZXBpY2tlclJlZi5pbnN0YW5jZS52YWx1ZUNoYW5nZS5zdWJzY3JpYmUoKHZhbHVlOiBEYXRlKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmJzVmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICB9KVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdW5zdWJzY3JpYmVTdWJzY3JpcHRpb25zKCkge1xyXG4gICAgaWYgKHRoaXMuX3N1YnM/Lmxlbmd0aCkge1xyXG4gICAgICB0aGlzLl9zdWJzLm1hcChzdWIgPT4gc3ViLnVuc3Vic2NyaWJlKCkpO1xyXG4gICAgICB0aGlzLl9zdWJzLmxlbmd0aCA9IDA7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XHJcbiAgICBpZiAoY2hhbmdlc1tcImJzQ29uZmlnXCJdKSB7XHJcbiAgICAgIGlmIChjaGFuZ2VzW1wiYnNDb25maWdcIl0uY3VycmVudFZhbHVlPy5pbml0Q3VycmVudFRpbWUgJiYgY2hhbmdlc1tcImJzQ29uZmlnXCJdLmN1cnJlbnRWYWx1ZT8uaW5pdEN1cnJlbnRUaW1lICE9PSBjaGFuZ2VzW1wiYnNDb25maWdcIl0ucHJldmlvdXNWYWx1ZT8uaW5pdEN1cnJlbnRUaW1lICYmIHRoaXMuX2JzVmFsdWUpIHtcclxuICAgICAgICB0aGlzLl9ic1ZhbHVlID0gc2V0Q3VycmVudFRpbWVPbkRhdGVTZWxlY3QodGhpcy5fYnNWYWx1ZSk7XHJcbiAgICAgICAgdGhpcy5ic1ZhbHVlQ2hhbmdlLmVtaXQodGhpcy5fYnNWYWx1ZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXRoaXMuX2RhdGVwaWNrZXJSZWYgfHwgIXRoaXMuX2RhdGVwaWNrZXJSZWYuaW5zdGFuY2UpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChjaGFuZ2VzW1wibWluRGF0ZVwiXSkge1xyXG4gICAgICB0aGlzLl9kYXRlcGlja2VyUmVmLmluc3RhbmNlLm1pbkRhdGUgPSB0aGlzLm1pbkRhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNoYW5nZXNbXCJtYXhEYXRlXCJdKSB7XHJcbiAgICAgIHRoaXMuX2RhdGVwaWNrZXJSZWYuaW5zdGFuY2UubWF4RGF0ZSA9IHRoaXMubWF4RGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY2hhbmdlc1tcImRhdGVzRGlzYWJsZWRcIl0pIHtcclxuICAgICAgdGhpcy5fZGF0ZXBpY2tlclJlZi5pbnN0YW5jZS5kYXRlc0Rpc2FibGVkID0gdGhpcy5kYXRlc0Rpc2FibGVkO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChjaGFuZ2VzW1wiZGF0ZXNFbmFibGVkXCJdKSB7XHJcbiAgICAgIHRoaXMuX2RhdGVwaWNrZXJSZWYuaW5zdGFuY2UuZGF0ZXNFbmFibGVkID0gdGhpcy5kYXRlc0VuYWJsZWQ7XHJcbiAgICAgIHRoaXMuX2RhdGVwaWNrZXJSZWYuaW5zdGFuY2UudmFsdWUgPSB0aGlzLl9ic1ZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChjaGFuZ2VzW1wiaXNEaXNhYmxlZFwiXSkge1xyXG4gICAgICB0aGlzLl9kYXRlcGlja2VyUmVmLmluc3RhbmNlLmlzRGlzYWJsZWQgPSB0aGlzLmlzRGlzYWJsZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNoYW5nZXNbXCJkYXRlQ3VzdG9tQ2xhc3Nlc1wiXSkge1xyXG4gICAgICB0aGlzLl9kYXRlcGlja2VyUmVmLmluc3RhbmNlLmRhdGVDdXN0b21DbGFzc2VzID0gdGhpcy5kYXRlQ3VzdG9tQ2xhc3NlcztcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY2hhbmdlc1tcImRhdGVUb29sdGlwVGV4dHNcIl0pIHtcclxuICAgICAgdGhpcy5fZGF0ZXBpY2tlclJlZi5pbnN0YW5jZS5kYXRlVG9vbHRpcFRleHRzID0gdGhpcy5kYXRlVG9vbHRpcFRleHRzO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc2V0Q29uZmlnKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXQgY29uZmlnIGZvciBkYXRlcGlja2VyXHJcbiAgICovXHJcbiAgc2V0Q29uZmlnKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuX2RhdGVwaWNrZXIpIHtcclxuICAgICAgdGhpcy5fZGF0ZXBpY2tlci5oaWRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fY29uZmlnID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5fY29uZmlnLCB0aGlzLmJzQ29uZmlnLCB7XHJcbiAgICAgIHZhbHVlOiBjaGVja0JzVmFsdWUodGhpcy5fYnNWYWx1ZSwgdGhpcy5tYXhEYXRlIHx8IHRoaXMuYnNDb25maWcgJiYgdGhpcy5ic0NvbmZpZy5tYXhEYXRlKSxcclxuICAgICAgaXNEaXNhYmxlZDogdGhpcy5pc0Rpc2FibGVkLFxyXG4gICAgICBtaW5EYXRlOiB0aGlzLm1pbkRhdGUgfHwgdGhpcy5ic0NvbmZpZyAmJiB0aGlzLmJzQ29uZmlnLm1pbkRhdGUsXHJcbiAgICAgIG1heERhdGU6IHRoaXMubWF4RGF0ZSB8fCB0aGlzLmJzQ29uZmlnICYmIHRoaXMuYnNDb25maWcubWF4RGF0ZSxcclxuICAgICAgZGF0ZUN1c3RvbUNsYXNzZXM6IHRoaXMuZGF0ZUN1c3RvbUNsYXNzZXMgfHwgdGhpcy5ic0NvbmZpZyAmJiB0aGlzLmJzQ29uZmlnLmRhdGVDdXN0b21DbGFzc2VzLFxyXG4gICAgICBkYXRlVG9vbHRpcFRleHRzOiB0aGlzLmRhdGVUb29sdGlwVGV4dHMgfHwgdGhpcy5ic0NvbmZpZyAmJiB0aGlzLmJzQ29uZmlnLmRhdGVUb29sdGlwVGV4dHMsXHJcbiAgICAgIGRhdGVzRGlzYWJsZWQ6IHRoaXMuZGF0ZXNEaXNhYmxlZCB8fCB0aGlzLmJzQ29uZmlnICYmIHRoaXMuYnNDb25maWcuZGF0ZXNEaXNhYmxlZCxcclxuICAgICAgZGF0ZXNFbmFibGVkOiB0aGlzLmRhdGVzRW5hYmxlZCB8fCB0aGlzLmJzQ29uZmlnICYmIHRoaXMuYnNDb25maWcuZGF0ZXNFbmFibGVkLFxyXG4gICAgICBpbml0Q3VycmVudFRpbWU6IHRoaXMuYnNDb25maWc/LmluaXRDdXJyZW50VGltZVxyXG4gICAgfSk7XHJcblxyXG5cclxuICAgIHRoaXMuX2RhdGVwaWNrZXJSZWYgPSB0aGlzLl9kYXRlcGlja2VyXHJcbiAgICAgIC5wcm92aWRlKHsgcHJvdmlkZTogQnNEYXRlcGlja2VyQ29uZmlnLCB1c2VWYWx1ZTogdGhpcy5fY29uZmlnIH0pXHJcbiAgICAgIC5hdHRhY2goQnNEYXRlcGlja2VySW5saW5lQ29udGFpbmVyQ29tcG9uZW50KVxyXG4gICAgICAudG8odGhpcy5fZWxlbWVudFJlZilcclxuICAgICAgLnNob3coKTtcclxuXHJcbiAgICB0aGlzLmluaXRTdWJzY3JpYmVzKCk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuX2RhdGVwaWNrZXIuZGlzcG9zZSgpO1xyXG4gICAgdGhpcy51bnN1YnNjcmliZVN1YnNjcmlwdGlvbnMoKTtcclxuICB9XHJcbn1cclxuIl19