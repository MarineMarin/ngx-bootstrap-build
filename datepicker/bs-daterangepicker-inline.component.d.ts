import { ElementRef, EventEmitter, OnChanges, OnDestroy, OnInit, Renderer2, SimpleChanges, ViewContainerRef } from '@angular/core';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { Subscription } from 'rxjs';
import { BsDaterangepickerInlineConfig } from './bs-daterangepicker-inline.config';
import { DatepickerDateCustomClasses } from './models';
import * as i0 from "@angular/core";
export declare class BsDaterangepickerInlineDirective implements OnInit, OnDestroy, OnChanges {
    _config: BsDaterangepickerInlineConfig;
    private _elementRef;
    _bsValue?: (Date | undefined)[] | undefined;
    /**
     * Initial value of datepicker
     */
    set bsValue(value: (Date | undefined)[] | undefined);
    /**
     * Config object for datepicker
     */
    bsConfig?: Partial<BsDaterangepickerInlineConfig>;
    /**
     * Indicates whether datepicker is enabled or not
     */
    isDisabled: boolean;
    /**
     * Minimum date which is available for selection
     */
    minDate?: Date;
    /**
     * Maximum date which is available for selection
     */
    maxDate?: Date;
    /**
     * Date custom classes
     */
    dateCustomClasses?: DatepickerDateCustomClasses[];
    /**
     * Disable specific days, e.g. [0,6] will disable all Saturdays and Sundays
     */
    daysDisabled?: number[];
    /**
     * Disable specific dates
     */
    datesDisabled?: Date[];
    /**
     * Disable specific dates
     */
    datesEnabled?: Date[];
    /**
     * Emits when daterangepicker value has been changed
     */
    bsValueChange: EventEmitter<(Date | undefined)[] | undefined>;
    protected _subs: Subscription[];
    private readonly _datepicker;
    private _datepickerRef?;
    constructor(_config: BsDaterangepickerInlineConfig, _elementRef: ElementRef, _renderer: Renderer2, _viewContainerRef: ViewContainerRef, cis: ComponentLoaderFactory);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    /**
     * Set config for datepicker
     */
    setConfig(): void;
    initSubscribes(): void;
    unsubscribeSubscriptions(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BsDaterangepickerInlineDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<BsDaterangepickerInlineDirective, "bs-daterangepicker-inline", ["bsDaterangepickerInline"], { "bsValue": "bsValue"; "bsConfig": "bsConfig"; "isDisabled": "isDisabled"; "minDate": "minDate"; "maxDate": "maxDate"; "dateCustomClasses": "dateCustomClasses"; "daysDisabled": "daysDisabled"; "datesDisabled": "datesDisabled"; "datesEnabled": "datesEnabled"; }, { "bsValueChange": "bsValueChange"; }, never>;
}
