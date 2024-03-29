import { AfterViewInit, ElementRef, EventEmitter, OnChanges, OnDestroy, OnInit, Renderer2, SimpleChanges, ViewContainerRef } from '@angular/core';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { BsDatepickerConfig } from './bs-datepicker.config';
import { BsDatepickerViewMode, DatepickerDateCustomClasses, DatepickerDateTooltipText } from './models';
import * as i0 from "@angular/core";
export declare class BsDatepickerDirective implements OnInit, OnDestroy, OnChanges, AfterViewInit {
    _config: BsDatepickerConfig;
    private _elementRef;
    private _renderer;
    /**
     * Placement of a datepicker. Accepts: "top", "bottom", "left", "right"
     */
    placement: 'top' | 'bottom' | 'left' | 'right';
    /**
     * Specifies events that should trigger. Supports a space separated list of
     * event names.
     */
    triggers: string;
    /**
     * Close datepicker on outside click
     */
    outsideClick: boolean;
    /**
     * A selector specifying the element the datepicker should be appended to.
     */
    container: string;
    outsideEsc: boolean;
    /**
     * Emits an event when the datepicker is shown
     */
    onShown: EventEmitter<unknown>;
    /**
     * Emits an event when the datepicker is hidden
     */
    onHidden: EventEmitter<unknown>;
    isOpen$: BehaviorSubject<boolean>;
    isDestroy$: Subject<unknown>;
    /**
     * Indicates whether datepicker's content is enabled or not
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
     * Minimum view mode : day, month, or year
     */
    minMode?: BsDatepickerViewMode;
    /**
     * Disable Certain days in the week
     */
    daysDisabled?: number[];
    /**
     * Disable specific dates
     */
    datesDisabled?: Date[];
    /**
     * Enable specific dates
     */
    datesEnabled?: Date[];
    /**
     * Date custom classes
     */
    dateCustomClasses?: DatepickerDateCustomClasses[];
    /**
     * Date tooltip text
     */
    dateTooltipTexts?: DatepickerDateTooltipText[];
    /**
     * Emits when datepicker value has been changed
     */
    bsValueChange: EventEmitter<Date>;
    protected _subs: Subscription[];
    private _datepicker;
    private _datepickerRef?;
    private readonly _dateInputFormat$;
    constructor(_config: BsDatepickerConfig, _elementRef: ElementRef, _renderer: Renderer2, _viewContainerRef: ViewContainerRef, cis: ComponentLoaderFactory);
    /**
     * Returns whether or not the datepicker is currently being shown
     */
    get isOpen(): boolean;
    set isOpen(value: boolean);
    _bsValue?: Date;
    /**
     * Initial value of datepicker
     */
    set bsValue(value: Date | undefined);
    get dateInputFormat$(): Observable<string | undefined>;
    /**
     * Config object for datepicker
     */
    bsConfig?: Partial<BsDatepickerConfig>;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    initSubscribes(): void;
    ngAfterViewInit(): void;
    /**
     * Opens an element’s datepicker. This is considered a “manual” triggering of
     * the datepicker.
     */
    show(): void;
    /**
     * Closes an element’s datepicker. This is considered a “manual” triggering of
     * the datepicker.
     */
    hide(): void;
    /**
     * Toggles an element’s datepicker. This is considered a “manual” triggering
     * of the datepicker.
     */
    toggle(): void;
    /**
     * Set config for datepicker
     */
    setConfig(): void;
    unsubscribeSubscriptions(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BsDatepickerDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<BsDatepickerDirective, "[bsDatepicker]", ["bsDatepicker"], { "placement": "placement"; "triggers": "triggers"; "outsideClick": "outsideClick"; "container": "container"; "outsideEsc": "outsideEsc"; "isDisabled": "isDisabled"; "minDate": "minDate"; "maxDate": "maxDate"; "minMode": "minMode"; "daysDisabled": "daysDisabled"; "datesDisabled": "datesDisabled"; "datesEnabled": "datesEnabled"; "dateCustomClasses": "dateCustomClasses"; "dateTooltipTexts": "dateTooltipTexts"; "isOpen": "isOpen"; "bsValue": "bsValue"; "bsConfig": "bsConfig"; }, { "onShown": "onShown"; "onHidden": "onHidden"; "bsValueChange": "bsValueChange"; }, never>;
}
