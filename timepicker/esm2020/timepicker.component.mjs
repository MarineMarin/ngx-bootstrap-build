import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, Output, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TimepickerActions } from './reducer/timepicker.actions';
import { TimepickerStore } from './reducer/timepicker.store';
import { getControlsValue } from './timepicker-controls.util';
import { TimepickerConfig } from './timepicker.config';
import { isHourInputValid, isInputLimitValid, isInputValid, isMinuteInputValid, isOneOfDatesEmpty, isSecondInputValid, isValidDate, padNumber, parseTime } from './timepicker.utils';
import * as i0 from "@angular/core";
import * as i1 from "./timepicker.config";
import * as i2 from "./reducer/timepicker.store";
import * as i3 from "./reducer/timepicker.actions";
import * as i4 from "@angular/common";
export const TIMEPICKER_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TimepickerComponent),
    multi: true
};
export class TimepickerComponent {
    constructor(_config, _cd, _store, _timepickerActions) {
        this._cd = _cd;
        this._store = _store;
        this._timepickerActions = _timepickerActions;
        /** hours change step */
        this.hourStep = 1;
        /** minutes change step */
        this.minuteStep = 5;
        /** seconds change step */
        this.secondsStep = 10;
        /** if true hours and minutes fields will be readonly */
        this.readonlyInput = false;
        /** if true hours and minutes fields will be disabled */
        this.disabled = false;
        /** if true scroll inside hours and minutes inputs will change time */
        this.mousewheel = true;
        /** if true the values of hours and minutes can be changed using the up/down arrow keys on the keyboard */
        this.arrowkeys = true;
        /** if true spinner arrows above and below the inputs will be shown */
        this.showSpinners = true;
        /** if true meridian button will be shown */
        this.showMeridian = true;
        /** show minutes in timepicker */
        this.showMinutes = true;
        /** show seconds in timepicker */
        this.showSeconds = false;
        /** meridian labels based on locale */
        this.meridians = ['AM', 'PM'];
        /** placeholder for hours field in timepicker */
        this.hoursPlaceholder = 'HH';
        /** placeholder for minutes field in timepicker */
        this.minutesPlaceholder = 'MM';
        /** placeholder for seconds field in timepicker */
        this.secondsPlaceholder = 'SS';
        /** emits true if value is a valid date */
        this.isValid = new EventEmitter();
        /** emits value of meridian*/
        this.meridianChange = new EventEmitter();
        // ui variables
        this.hours = '';
        this.minutes = '';
        this.seconds = '';
        this.meridian = '';
        // min\max validation for input fields
        this.invalidHours = false;
        this.invalidMinutes = false;
        this.invalidSeconds = false;
        // aria-label variables
        this.labelHours = 'hours';
        this.labelMinutes = 'minutes';
        this.labelSeconds = 'seconds';
        // time picker controls state
        this.canIncrementHours = true;
        this.canIncrementMinutes = true;
        this.canIncrementSeconds = true;
        this.canDecrementHours = true;
        this.canDecrementMinutes = true;
        this.canDecrementSeconds = true;
        this.canToggleMeridian = true;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.onChange = Function.prototype;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.onTouched = Function.prototype;
        this.config = _config;
        Object.assign(this, this.config);
        this.timepickerSub = _store.select(state => state.value)
            .subscribe((value) => {
            // update UI values if date changed
            this._renderTime(value);
            this.onChange(value);
            this._store.dispatch(this._timepickerActions.updateControls(getControlsValue(this)));
        });
        _store.select(state => state.controls)
            .subscribe((controlsState) => {
            const isTimepickerInputValid = isInputValid(this.hours, this.minutes, this.seconds, this.isPM());
            const isValid = this.config.allowEmptyTime ?
                this.isOneOfDatesIsEmpty() || isTimepickerInputValid
                : isTimepickerInputValid;
            this.isValid.emit(isValid);
            Object.assign(this, controlsState);
            _cd.markForCheck();
        });
    }
    /** @deprecated - please use `isEditable` instead */
    get isSpinnersVisible() {
        return this.showSpinners && !this.readonlyInput;
    }
    get isEditable() {
        return !(this.readonlyInput || this.disabled);
    }
    resetValidation() {
        this.invalidHours = false;
        this.invalidMinutes = false;
        this.invalidSeconds = false;
    }
    isPM() {
        return this.showMeridian && this.meridian === this.meridians[1];
    }
    prevDef($event) {
        $event.preventDefault();
    }
    wheelSign($event) {
        return Math.sign($event.deltaY || 0) * -1;
    }
    ngOnChanges() {
        this._store.dispatch(this._timepickerActions.updateControls(getControlsValue(this)));
    }
    changeHours(step, source = '') {
        this.resetValidation();
        this._store.dispatch(this._timepickerActions.changeHours({ step, source }));
    }
    changeMinutes(step, source = '') {
        this.resetValidation();
        this._store.dispatch(this._timepickerActions.changeMinutes({ step, source }));
    }
    changeSeconds(step, source = '') {
        this.resetValidation();
        this._store.dispatch(this._timepickerActions.changeSeconds({ step, source }));
    }
    updateHours(target) {
        this.resetValidation();
        this.hours = target.value;
        const isTimepickerInputValid = isHourInputValid(this.hours, this.isPM()) && this.isValidLimit();
        const isValid = this.config.allowEmptyTime ?
            this.isOneOfDatesIsEmpty() || isTimepickerInputValid
            : isTimepickerInputValid;
        if (!isValid) {
            this.invalidHours = true;
            this.isValid.emit(false);
            this.onChange(null);
            return;
        }
        this._updateTime();
    }
    updateMinutes(target) {
        this.resetValidation();
        this.minutes = target.value;
        const isTimepickerInputValid = isMinuteInputValid(this.minutes) && this.isValidLimit();
        const isValid = this.config.allowEmptyTime ?
            this.isOneOfDatesIsEmpty() || isTimepickerInputValid
            : isTimepickerInputValid;
        if (!isValid) {
            this.invalidMinutes = true;
            this.isValid.emit(false);
            this.onChange(null);
            return;
        }
        this._updateTime();
    }
    updateSeconds(target) {
        this.resetValidation();
        this.seconds = target.value;
        const isTimepickerInputValid = isSecondInputValid(this.seconds) && this.isValidLimit();
        const isValid = this.config.allowEmptyTime ?
            this.isOneOfDatesIsEmpty() || isTimepickerInputValid
            : isTimepickerInputValid;
        if (!isValid) {
            this.invalidSeconds = true;
            this.isValid.emit(false);
            this.onChange(null);
            return;
        }
        this._updateTime();
    }
    isValidLimit() {
        return isInputLimitValid({
            hour: this.hours,
            minute: this.minutes,
            seconds: this.seconds,
            isPM: this.isPM()
        }, this.max, this.min);
    }
    isOneOfDatesIsEmpty() {
        return isOneOfDatesEmpty(this.hours, this.minutes, this.seconds);
    }
    _updateTime() {
        const _seconds = this.showSeconds ? this.seconds : void 0;
        const _minutes = this.showMinutes ? this.minutes : void 0;
        const isTimepickerInputValid = isInputValid(this.hours, _minutes, _seconds, this.isPM());
        const isValid = this.config.allowEmptyTime ?
            this.isOneOfDatesIsEmpty() || isTimepickerInputValid
            : isTimepickerInputValid;
        if (!isValid) {
            this.isValid.emit(false);
            this.onChange(null);
            return;
        }
        this._store.dispatch(this._timepickerActions.setTime({
            hour: this.hours,
            minute: this.minutes,
            seconds: this.seconds,
            isPM: this.isPM()
        }));
    }
    toggleMeridian() {
        if (!this.showMeridian || !this.isEditable) {
            return;
        }
        const _hoursPerDayHalf = 12;
        this._store.dispatch(this._timepickerActions.changeHours({
            step: _hoursPerDayHalf,
            source: ''
        }));
    }
    /**
     * Write a new value to the element.
     */
    writeValue(obj) {
        if (isValidDate(obj)) {
            this.resetValidation();
            this._store.dispatch(this._timepickerActions.writeValue(parseTime(obj)));
        }
        else if (obj == null) {
            this._store.dispatch(this._timepickerActions.writeValue());
        }
    }
    /**
     * Set the function to be called when the control receives a change event.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    registerOnChange(fn) {
        this.onChange = fn;
    }
    /**
     * Set the function to be called when the control receives a touch event.
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    /**
     * This function is called when the control status changes to or from "disabled".
     * Depending on the value, it will enable or disable the appropriate DOM element.
     *
     * @param isDisabled
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
        this._cd.markForCheck();
    }
    ngOnDestroy() {
        this.timepickerSub?.unsubscribe();
    }
    _renderTime(value) {
        if (!value || !isValidDate(value)) {
            this.hours = '';
            this.minutes = '';
            this.seconds = '';
            this.meridian = this.meridians[0];
            this.meridianChange.emit(this.meridian);
            return;
        }
        const _value = parseTime(value);
        if (!_value) {
            return;
        }
        const _hoursPerDayHalf = 12;
        let _hours = _value.getHours();
        if (this.showMeridian) {
            this.meridian = this.meridians[_hours >= _hoursPerDayHalf ? 1 : 0];
            this.meridianChange.emit(this.meridian);
            _hours = _hours % _hoursPerDayHalf;
            // should be 12 PM, not 00 PM
            if (_hours === 0) {
                _hours = _hoursPerDayHalf;
            }
        }
        this.hours = padNumber(_hours);
        this.minutes = padNumber(_value.getMinutes());
        this.seconds = padNumber(_value.getUTCSeconds());
    }
}
TimepickerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: TimepickerComponent, deps: [{ token: i1.TimepickerConfig }, { token: i0.ChangeDetectorRef }, { token: i2.TimepickerStore }, { token: i3.TimepickerActions }], target: i0.ɵɵFactoryTarget.Component });
TimepickerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.1", type: TimepickerComponent, selector: "timepicker", inputs: { hourStep: "hourStep", minuteStep: "minuteStep", secondsStep: "secondsStep", readonlyInput: "readonlyInput", disabled: "disabled", mousewheel: "mousewheel", arrowkeys: "arrowkeys", showSpinners: "showSpinners", showMeridian: "showMeridian", showMinutes: "showMinutes", showSeconds: "showSeconds", meridians: "meridians", min: "min", max: "max", hoursPlaceholder: "hoursPlaceholder", minutesPlaceholder: "minutesPlaceholder", secondsPlaceholder: "secondsPlaceholder" }, outputs: { isValid: "isValid", meridianChange: "meridianChange" }, providers: [TIMEPICKER_CONTROL_VALUE_ACCESSOR, TimepickerStore], usesOnChanges: true, ngImport: i0, template: "<table>\r\n  <tbody>\r\n  <tr class=\"text-center\" [hidden]=\"!showSpinners\">\r\n    <!-- increment hours button-->\r\n    <td>\r\n      <a class=\"btn btn-link\" [class.disabled]=\"!canIncrementHours || !isEditable\"\r\n         (click)=\"changeHours(hourStep)\"\r\n      ><span class=\"bs-chevron bs-chevron-up\"></span></a>\r\n    </td>\r\n    <!-- divider -->\r\n    <td *ngIf=\"showMinutes\">&nbsp;&nbsp;&nbsp;</td>\r\n    <!-- increment minutes button -->\r\n    <td *ngIf=\"showMinutes\">\r\n      <a class=\"btn btn-link\" [class.disabled]=\"!canIncrementMinutes || !isEditable\"\r\n         (click)=\"changeMinutes(minuteStep)\"\r\n      ><span class=\"bs-chevron bs-chevron-up\"></span></a>\r\n    </td>\r\n    <!-- divider -->\r\n    <td *ngIf=\"showSeconds\">&nbsp;</td>\r\n    <!-- increment seconds button -->\r\n    <td *ngIf=\"showSeconds\">\r\n      <a class=\"btn btn-link\" [class.disabled]=\"!canIncrementSeconds || !isEditable\"\r\n         (click)=\"changeSeconds(secondsStep)\">\r\n        <span class=\"bs-chevron bs-chevron-up\"></span>\r\n      </a>\r\n    </td>\r\n    <!-- space between -->\r\n    <td *ngIf=\"showMeridian\">&nbsp;&nbsp;&nbsp;</td>\r\n    <!-- meridian placeholder-->\r\n    <td *ngIf=\"showMeridian\"></td>\r\n  </tr>\r\n  <tr>\r\n    <!-- hours -->\r\n    <td class=\"form-group mb-3\" [class.has-error]=\"invalidHours\">\r\n      <input type=\"text\" [class.is-invalid]=\"invalidHours\"\r\n             class=\"form-control text-center bs-timepicker-field\"\r\n             [placeholder]=\"hoursPlaceholder\"\r\n             maxlength=\"2\"\r\n             [readonly]=\"readonlyInput\"\r\n             [disabled]=\"disabled\"\r\n             [value]=\"hours\"\r\n             (wheel)=\"prevDef($event);changeHours(hourStep * wheelSign($event), 'wheel')\"\r\n             (keydown.ArrowUp)=\"changeHours(hourStep, 'key')\"\r\n             (keydown.ArrowDown)=\"changeHours(-hourStep, 'key')\"\r\n             (change)=\"updateHours($event.target)\" [attr.aria-label]=\"labelHours\"></td>\r\n    <!-- divider -->\r\n    <td *ngIf=\"showMinutes\">&nbsp;:&nbsp;</td>\r\n    <!-- minutes -->\r\n    <td class=\"form-group mb-3\" *ngIf=\"showMinutes\" [class.has-error]=\"invalidMinutes\">\r\n      <input type=\"text\" [class.is-invalid]=\"invalidMinutes\"\r\n             class=\"form-control text-center bs-timepicker-field\"\r\n             [placeholder]=\"minutesPlaceholder\"\r\n             maxlength=\"2\"\r\n             [readonly]=\"readonlyInput\"\r\n             [disabled]=\"disabled\"\r\n             [value]=\"minutes\"\r\n             (wheel)=\"prevDef($event);changeMinutes(minuteStep * wheelSign($event), 'wheel')\"\r\n             (keydown.ArrowUp)=\"changeMinutes(minuteStep, 'key')\"\r\n             (keydown.ArrowDown)=\"changeMinutes(-minuteStep, 'key')\"\r\n             (change)=\"updateMinutes($event.target)\" [attr.aria-label]=\"labelMinutes\">\r\n    </td>\r\n    <!-- divider -->\r\n    <td *ngIf=\"showSeconds\">&nbsp;:&nbsp;</td>\r\n    <!-- seconds -->\r\n    <td class=\"form-group mb-3\" *ngIf=\"showSeconds\" [class.has-error]=\"invalidSeconds\">\r\n      <input type=\"text\" [class.is-invalid]=\"invalidSeconds\"\r\n             class=\"form-control text-center bs-timepicker-field\"\r\n             [placeholder]=\"secondsPlaceholder\"\r\n             maxlength=\"2\"\r\n             [readonly]=\"readonlyInput\"\r\n             [disabled]=\"disabled\"\r\n             [value]=\"seconds\"\r\n             (wheel)=\"prevDef($event);changeSeconds(secondsStep * wheelSign($event), 'wheel')\"\r\n             (keydown.ArrowUp)=\"changeSeconds(secondsStep, 'key')\"\r\n             (keydown.ArrowDown)=\"changeSeconds(-secondsStep, 'key')\"\r\n             (change)=\"updateSeconds($event.target)\" [attr.aria-label]=\"labelSeconds\">\r\n    </td>\r\n    <!-- space between -->\r\n    <td *ngIf=\"showMeridian\">&nbsp;&nbsp;&nbsp;</td>\r\n    <!-- meridian -->\r\n    <td *ngIf=\"showMeridian\">\r\n      <button type=\"button\" class=\"btn btn-default text-center\"\r\n              [disabled]=\"!isEditable || !canToggleMeridian\"\r\n              [class.disabled]=\"!isEditable || !canToggleMeridian\"\r\n              (click)=\"toggleMeridian()\"\r\n      >{{ meridian }}\r\n      </button>\r\n    </td>\r\n  </tr>\r\n  <tr class=\"text-center\" [hidden]=\"!showSpinners\">\r\n    <!-- decrement hours button-->\r\n    <td>\r\n      <a class=\"btn btn-link\" [class.disabled]=\"!canDecrementHours || !isEditable\"\r\n         (click)=\"changeHours(-hourStep)\">\r\n        <span class=\"bs-chevron bs-chevron-down\"></span>\r\n      </a>\r\n    </td>\r\n    <!-- divider -->\r\n    <td *ngIf=\"showMinutes\">&nbsp;&nbsp;&nbsp;</td>\r\n    <!-- decrement minutes button-->\r\n    <td *ngIf=\"showMinutes\">\r\n      <a class=\"btn btn-link\" [class.disabled]=\"!canDecrementMinutes || !isEditable\"\r\n         (click)=\"changeMinutes(-minuteStep)\">\r\n        <span class=\"bs-chevron bs-chevron-down\"></span>\r\n      </a>\r\n    </td>\r\n    <!-- divider -->\r\n    <td *ngIf=\"showSeconds\">&nbsp;</td>\r\n    <!-- decrement seconds button-->\r\n    <td *ngIf=\"showSeconds\">\r\n      <a class=\"btn btn-link\" [class.disabled]=\"!canDecrementSeconds || !isEditable\"\r\n         (click)=\"changeSeconds(-secondsStep)\">\r\n        <span class=\"bs-chevron bs-chevron-down\"></span>\r\n      </a>\r\n    </td>\r\n    <!-- space between -->\r\n    <td *ngIf=\"showMeridian\">&nbsp;&nbsp;&nbsp;</td>\r\n    <!-- meridian placeholder-->\r\n    <td *ngIf=\"showMeridian\"></td>\r\n  </tr>\r\n  </tbody>\r\n</table>\r\n", styles: [".bs-chevron{border-style:solid;display:block;width:9px;height:9px;position:relative;border-width:3px 0px 0 3px}.bs-chevron-up{transform:rotate(45deg);top:2px}.bs-chevron-down{transform:rotate(-135deg);top:-2px}.bs-timepicker-field{width:65px;padding:.375rem .55rem}\n"], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: TimepickerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'timepicker', changeDetection: ChangeDetectionStrategy.OnPush, providers: [TIMEPICKER_CONTROL_VALUE_ACCESSOR, TimepickerStore], styles: [`
    .bs-chevron {
      border-style: solid;
      display: block;
      width: 9px;
      height: 9px;
      position: relative;
      border-width: 3px 0px 0 3px;
    }

    .bs-chevron-up {
      -webkit-transform: rotate(45deg);
      transform: rotate(45deg);
      top: 2px;
    }

    .bs-chevron-down {
      -webkit-transform: rotate(-135deg);
      transform: rotate(-135deg);
      top: -2px;
    }

    .bs-timepicker-field {
      width: 65px;
      padding: .375rem .55rem;
    }
  `], encapsulation: ViewEncapsulation.None, template: "<table>\r\n  <tbody>\r\n  <tr class=\"text-center\" [hidden]=\"!showSpinners\">\r\n    <!-- increment hours button-->\r\n    <td>\r\n      <a class=\"btn btn-link\" [class.disabled]=\"!canIncrementHours || !isEditable\"\r\n         (click)=\"changeHours(hourStep)\"\r\n      ><span class=\"bs-chevron bs-chevron-up\"></span></a>\r\n    </td>\r\n    <!-- divider -->\r\n    <td *ngIf=\"showMinutes\">&nbsp;&nbsp;&nbsp;</td>\r\n    <!-- increment minutes button -->\r\n    <td *ngIf=\"showMinutes\">\r\n      <a class=\"btn btn-link\" [class.disabled]=\"!canIncrementMinutes || !isEditable\"\r\n         (click)=\"changeMinutes(minuteStep)\"\r\n      ><span class=\"bs-chevron bs-chevron-up\"></span></a>\r\n    </td>\r\n    <!-- divider -->\r\n    <td *ngIf=\"showSeconds\">&nbsp;</td>\r\n    <!-- increment seconds button -->\r\n    <td *ngIf=\"showSeconds\">\r\n      <a class=\"btn btn-link\" [class.disabled]=\"!canIncrementSeconds || !isEditable\"\r\n         (click)=\"changeSeconds(secondsStep)\">\r\n        <span class=\"bs-chevron bs-chevron-up\"></span>\r\n      </a>\r\n    </td>\r\n    <!-- space between -->\r\n    <td *ngIf=\"showMeridian\">&nbsp;&nbsp;&nbsp;</td>\r\n    <!-- meridian placeholder-->\r\n    <td *ngIf=\"showMeridian\"></td>\r\n  </tr>\r\n  <tr>\r\n    <!-- hours -->\r\n    <td class=\"form-group mb-3\" [class.has-error]=\"invalidHours\">\r\n      <input type=\"text\" [class.is-invalid]=\"invalidHours\"\r\n             class=\"form-control text-center bs-timepicker-field\"\r\n             [placeholder]=\"hoursPlaceholder\"\r\n             maxlength=\"2\"\r\n             [readonly]=\"readonlyInput\"\r\n             [disabled]=\"disabled\"\r\n             [value]=\"hours\"\r\n             (wheel)=\"prevDef($event);changeHours(hourStep * wheelSign($event), 'wheel')\"\r\n             (keydown.ArrowUp)=\"changeHours(hourStep, 'key')\"\r\n             (keydown.ArrowDown)=\"changeHours(-hourStep, 'key')\"\r\n             (change)=\"updateHours($event.target)\" [attr.aria-label]=\"labelHours\"></td>\r\n    <!-- divider -->\r\n    <td *ngIf=\"showMinutes\">&nbsp;:&nbsp;</td>\r\n    <!-- minutes -->\r\n    <td class=\"form-group mb-3\" *ngIf=\"showMinutes\" [class.has-error]=\"invalidMinutes\">\r\n      <input type=\"text\" [class.is-invalid]=\"invalidMinutes\"\r\n             class=\"form-control text-center bs-timepicker-field\"\r\n             [placeholder]=\"minutesPlaceholder\"\r\n             maxlength=\"2\"\r\n             [readonly]=\"readonlyInput\"\r\n             [disabled]=\"disabled\"\r\n             [value]=\"minutes\"\r\n             (wheel)=\"prevDef($event);changeMinutes(minuteStep * wheelSign($event), 'wheel')\"\r\n             (keydown.ArrowUp)=\"changeMinutes(minuteStep, 'key')\"\r\n             (keydown.ArrowDown)=\"changeMinutes(-minuteStep, 'key')\"\r\n             (change)=\"updateMinutes($event.target)\" [attr.aria-label]=\"labelMinutes\">\r\n    </td>\r\n    <!-- divider -->\r\n    <td *ngIf=\"showSeconds\">&nbsp;:&nbsp;</td>\r\n    <!-- seconds -->\r\n    <td class=\"form-group mb-3\" *ngIf=\"showSeconds\" [class.has-error]=\"invalidSeconds\">\r\n      <input type=\"text\" [class.is-invalid]=\"invalidSeconds\"\r\n             class=\"form-control text-center bs-timepicker-field\"\r\n             [placeholder]=\"secondsPlaceholder\"\r\n             maxlength=\"2\"\r\n             [readonly]=\"readonlyInput\"\r\n             [disabled]=\"disabled\"\r\n             [value]=\"seconds\"\r\n             (wheel)=\"prevDef($event);changeSeconds(secondsStep * wheelSign($event), 'wheel')\"\r\n             (keydown.ArrowUp)=\"changeSeconds(secondsStep, 'key')\"\r\n             (keydown.ArrowDown)=\"changeSeconds(-secondsStep, 'key')\"\r\n             (change)=\"updateSeconds($event.target)\" [attr.aria-label]=\"labelSeconds\">\r\n    </td>\r\n    <!-- space between -->\r\n    <td *ngIf=\"showMeridian\">&nbsp;&nbsp;&nbsp;</td>\r\n    <!-- meridian -->\r\n    <td *ngIf=\"showMeridian\">\r\n      <button type=\"button\" class=\"btn btn-default text-center\"\r\n              [disabled]=\"!isEditable || !canToggleMeridian\"\r\n              [class.disabled]=\"!isEditable || !canToggleMeridian\"\r\n              (click)=\"toggleMeridian()\"\r\n      >{{ meridian }}\r\n      </button>\r\n    </td>\r\n  </tr>\r\n  <tr class=\"text-center\" [hidden]=\"!showSpinners\">\r\n    <!-- decrement hours button-->\r\n    <td>\r\n      <a class=\"btn btn-link\" [class.disabled]=\"!canDecrementHours || !isEditable\"\r\n         (click)=\"changeHours(-hourStep)\">\r\n        <span class=\"bs-chevron bs-chevron-down\"></span>\r\n      </a>\r\n    </td>\r\n    <!-- divider -->\r\n    <td *ngIf=\"showMinutes\">&nbsp;&nbsp;&nbsp;</td>\r\n    <!-- decrement minutes button-->\r\n    <td *ngIf=\"showMinutes\">\r\n      <a class=\"btn btn-link\" [class.disabled]=\"!canDecrementMinutes || !isEditable\"\r\n         (click)=\"changeMinutes(-minuteStep)\">\r\n        <span class=\"bs-chevron bs-chevron-down\"></span>\r\n      </a>\r\n    </td>\r\n    <!-- divider -->\r\n    <td *ngIf=\"showSeconds\">&nbsp;</td>\r\n    <!-- decrement seconds button-->\r\n    <td *ngIf=\"showSeconds\">\r\n      <a class=\"btn btn-link\" [class.disabled]=\"!canDecrementSeconds || !isEditable\"\r\n         (click)=\"changeSeconds(-secondsStep)\">\r\n        <span class=\"bs-chevron bs-chevron-down\"></span>\r\n      </a>\r\n    </td>\r\n    <!-- space between -->\r\n    <td *ngIf=\"showMeridian\">&nbsp;&nbsp;&nbsp;</td>\r\n    <!-- meridian placeholder-->\r\n    <td *ngIf=\"showMeridian\"></td>\r\n  </tr>\r\n  </tbody>\r\n</table>\r\n" }]
        }], ctorParameters: function () { return [{ type: i1.TimepickerConfig }, { type: i0.ChangeDetectorRef }, { type: i2.TimepickerStore }, { type: i3.TimepickerActions }]; }, propDecorators: { hourStep: [{
                type: Input
            }], minuteStep: [{
                type: Input
            }], secondsStep: [{
                type: Input
            }], readonlyInput: [{
                type: Input
            }], disabled: [{
                type: Input
            }], mousewheel: [{
                type: Input
            }], arrowkeys: [{
                type: Input
            }], showSpinners: [{
                type: Input
            }], showMeridian: [{
                type: Input
            }], showMinutes: [{
                type: Input
            }], showSeconds: [{
                type: Input
            }], meridians: [{
                type: Input
            }], min: [{
                type: Input
            }], max: [{
                type: Input
            }], hoursPlaceholder: [{
                type: Input
            }], minutesPlaceholder: [{
                type: Input
            }], secondsPlaceholder: [{
                type: Input
            }], isValid: [{
                type: Output
            }], meridianChange: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXBpY2tlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdGltZXBpY2tlci90aW1lcGlja2VyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uL3NyYy90aW1lcGlja2VyL3RpbWVwaWNrZXIuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixVQUFVLEVBQ1YsS0FBSyxFQUdMLE1BQU0sRUFDTixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBTXpFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUl2RCxPQUFPLEVBQ0wsZ0JBQWdCLEVBQ2hCLGlCQUFpQixFQUNqQixZQUFZLEVBQ1osa0JBQWtCLEVBQ2xCLGlCQUFpQixFQUNqQixrQkFBa0IsRUFDbEIsV0FBVyxFQUNYLFNBQVMsRUFDVCxTQUFTLEVBQ1YsTUFBTSxvQkFBb0IsQ0FBQzs7Ozs7O0FBRTVCLE1BQU0sQ0FBQyxNQUFNLGlDQUFpQyxHQUE4QjtJQUMxRSxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsbUJBQW1CLENBQUM7SUFDbEQsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBb0NGLE1BQU0sT0FBTyxtQkFBbUI7SUEwRTlCLFlBQ0UsT0FBeUIsRUFDakIsR0FBc0IsRUFDdEIsTUFBdUIsRUFD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QkFBdkIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgQ29tcG9uZW50LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBmb3J3YXJkUmVmLFxyXG4gIElucHV0LFxyXG4gIE9uQ2hhbmdlcyxcclxuICBPbkRlc3Ryb3ksXHJcbiAgT3V0cHV0LFxyXG4gIFZpZXdFbmNhcHN1bGF0aW9uXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yTW9kZWwgfSBmcm9tICcuL21vZGVscyc7XHJcblxyXG5pbXBvcnQgeyBUaW1lcGlja2VyQWN0aW9ucyB9IGZyb20gJy4vcmVkdWNlci90aW1lcGlja2VyLmFjdGlvbnMnO1xyXG5pbXBvcnQgeyBUaW1lcGlja2VyU3RvcmUgfSBmcm9tICcuL3JlZHVjZXIvdGltZXBpY2tlci5zdG9yZSc7XHJcbmltcG9ydCB7IGdldENvbnRyb2xzVmFsdWUgfSBmcm9tICcuL3RpbWVwaWNrZXItY29udHJvbHMudXRpbCc7XHJcbmltcG9ydCB7IFRpbWVwaWNrZXJDb25maWcgfSBmcm9tICcuL3RpbWVwaWNrZXIuY29uZmlnJztcclxuXHJcbmltcG9ydCB7IFRpbWVDaGFuZ2VTb3VyY2UsIFRpbWVwaWNrZXJDb21wb25lbnRTdGF0ZSwgVGltZXBpY2tlckNvbnRyb2xzIH0gZnJvbSAnLi90aW1lcGlja2VyLm1vZGVscyc7XHJcblxyXG5pbXBvcnQge1xyXG4gIGlzSG91cklucHV0VmFsaWQsXHJcbiAgaXNJbnB1dExpbWl0VmFsaWQsXHJcbiAgaXNJbnB1dFZhbGlkLFxyXG4gIGlzTWludXRlSW5wdXRWYWxpZCxcclxuICBpc09uZU9mRGF0ZXNFbXB0eSxcclxuICBpc1NlY29uZElucHV0VmFsaWQsXHJcbiAgaXNWYWxpZERhdGUsXHJcbiAgcGFkTnVtYmVyLFxyXG4gIHBhcnNlVGltZVxyXG59IGZyb20gJy4vdGltZXBpY2tlci51dGlscyc7XHJcblxyXG5leHBvcnQgY29uc3QgVElNRVBJQ0tFUl9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBDb250cm9sVmFsdWVBY2Nlc3Nvck1vZGVsID0ge1xyXG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxyXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFRpbWVwaWNrZXJDb21wb25lbnQpLFxyXG4gIG11bHRpOiB0cnVlXHJcbn07XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ3RpbWVwaWNrZXInLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG4gIHByb3ZpZGVyczogW1RJTUVQSUNLRVJfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUiwgVGltZXBpY2tlclN0b3JlXSxcclxuICB0ZW1wbGF0ZVVybDogJy4vdGltZXBpY2tlci5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVzOiBbYFxyXG4gICAgLmJzLWNoZXZyb24ge1xyXG4gICAgICBib3JkZXItc3R5bGU6IHNvbGlkO1xyXG4gICAgICBkaXNwbGF5OiBibG9jaztcclxuICAgICAgd2lkdGg6IDlweDtcclxuICAgICAgaGVpZ2h0OiA5cHg7XHJcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgICAgYm9yZGVyLXdpZHRoOiAzcHggMHB4IDAgM3B4O1xyXG4gICAgfVxyXG5cclxuICAgIC5icy1jaGV2cm9uLXVwIHtcclxuICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSg0NWRlZyk7XHJcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKDQ1ZGVnKTtcclxuICAgICAgdG9wOiAycHg7XHJcbiAgICB9XHJcblxyXG4gICAgLmJzLWNoZXZyb24tZG93biB7XHJcbiAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoLTEzNWRlZyk7XHJcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKC0xMzVkZWcpO1xyXG4gICAgICB0b3A6IC0ycHg7XHJcbiAgICB9XHJcblxyXG4gICAgLmJzLXRpbWVwaWNrZXItZmllbGQge1xyXG4gICAgICB3aWR0aDogNjVweDtcclxuICAgICAgcGFkZGluZzogLjM3NXJlbSAuNTVyZW07XHJcbiAgICB9XHJcbiAgYF0sXHJcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxyXG59KVxyXG5leHBvcnQgY2xhc3MgVGltZXBpY2tlckNvbXBvbmVudFxyXG4gIGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsXHJcbiAgICBUaW1lcGlja2VyQ29tcG9uZW50U3RhdGUsXHJcbiAgICBUaW1lcGlja2VyQ29udHJvbHMsXHJcbiAgICBPbkNoYW5nZXMsXHJcbiAgICBPbkRlc3Ryb3kge1xyXG4gIC8qKiBob3VycyBjaGFuZ2Ugc3RlcCAqL1xyXG4gIEBJbnB1dCgpIGhvdXJTdGVwID0gMTtcclxuICAvKiogbWludXRlcyBjaGFuZ2Ugc3RlcCAqL1xyXG4gIEBJbnB1dCgpIG1pbnV0ZVN0ZXAgPSA1O1xyXG4gIC8qKiBzZWNvbmRzIGNoYW5nZSBzdGVwICovXHJcbiAgQElucHV0KCkgc2Vjb25kc1N0ZXAgPSAxMDtcclxuICAvKiogaWYgdHJ1ZSBob3VycyBhbmQgbWludXRlcyBmaWVsZHMgd2lsbCBiZSByZWFkb25seSAqL1xyXG4gIEBJbnB1dCgpIHJlYWRvbmx5SW5wdXQgPSBmYWxzZTtcclxuICAvKiogaWYgdHJ1ZSBob3VycyBhbmQgbWludXRlcyBmaWVsZHMgd2lsbCBiZSBkaXNhYmxlZCAqL1xyXG4gIEBJbnB1dCgpIGRpc2FibGVkID0gZmFsc2U7XHJcbiAgLyoqIGlmIHRydWUgc2Nyb2xsIGluc2lkZSBob3VycyBhbmQgbWludXRlcyBpbnB1dHMgd2lsbCBjaGFuZ2UgdGltZSAqL1xyXG4gIEBJbnB1dCgpIG1vdXNld2hlZWwgPSB0cnVlO1xyXG4gIC8qKiBpZiB0cnVlIHRoZSB2YWx1ZXMgb2YgaG91cnMgYW5kIG1pbnV0ZXMgY2FuIGJlIGNoYW5nZWQgdXNpbmcgdGhlIHVwL2Rvd24gYXJyb3cga2V5cyBvbiB0aGUga2V5Ym9hcmQgKi9cclxuICBASW5wdXQoKSBhcnJvd2tleXMgPSB0cnVlO1xyXG4gIC8qKiBpZiB0cnVlIHNwaW5uZXIgYXJyb3dzIGFib3ZlIGFuZCBiZWxvdyB0aGUgaW5wdXRzIHdpbGwgYmUgc2hvd24gKi9cclxuICBASW5wdXQoKSBzaG93U3Bpbm5lcnMgPSB0cnVlO1xyXG4gIC8qKiBpZiB0cnVlIG1lcmlkaWFuIGJ1dHRvbiB3aWxsIGJlIHNob3duICovXHJcbiAgQElucHV0KCkgc2hvd01lcmlkaWFuID0gdHJ1ZTtcclxuICAvKiogc2hvdyBtaW51dGVzIGluIHRpbWVwaWNrZXIgKi9cclxuICBASW5wdXQoKSBzaG93TWludXRlcyA9IHRydWU7XHJcbiAgLyoqIHNob3cgc2Vjb25kcyBpbiB0aW1lcGlja2VyICovXHJcbiAgQElucHV0KCkgc2hvd1NlY29uZHMgPSBmYWxzZTtcclxuICAvKiogbWVyaWRpYW4gbGFiZWxzIGJhc2VkIG9uIGxvY2FsZSAqL1xyXG4gIEBJbnB1dCgpIG1lcmlkaWFuczogc3RyaW5nW10gPSBbJ0FNJywgJ1BNJ107XHJcbiAgLyoqIG1pbmltdW0gdGltZSB1c2VyIGNhbiBzZWxlY3QgKi9cclxuICBASW5wdXQoKSBtaW4/OiBEYXRlO1xyXG4gIC8qKiBtYXhpbXVtIHRpbWUgdXNlciBjYW4gc2VsZWN0ICovXHJcbiAgQElucHV0KCkgbWF4PzogRGF0ZTtcclxuICAvKiogcGxhY2Vob2xkZXIgZm9yIGhvdXJzIGZpZWxkIGluIHRpbWVwaWNrZXIgKi9cclxuICBASW5wdXQoKSBob3Vyc1BsYWNlaG9sZGVyID0gJ0hIJztcclxuICAvKiogcGxhY2Vob2xkZXIgZm9yIG1pbnV0ZXMgZmllbGQgaW4gdGltZXBpY2tlciAqL1xyXG4gIEBJbnB1dCgpIG1pbnV0ZXNQbGFjZWhvbGRlciA9ICdNTSc7XHJcbiAgLyoqIHBsYWNlaG9sZGVyIGZvciBzZWNvbmRzIGZpZWxkIGluIHRpbWVwaWNrZXIgKi9cclxuICBASW5wdXQoKSBzZWNvbmRzUGxhY2Vob2xkZXIgPSAnU1MnO1xyXG4gIC8qKiBlbWl0cyB0cnVlIGlmIHZhbHVlIGlzIGEgdmFsaWQgZGF0ZSAqL1xyXG4gIEBPdXRwdXQoKSBpc1ZhbGlkID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xyXG4gIC8qKiBlbWl0cyB2YWx1ZSBvZiBtZXJpZGlhbiovXHJcbiAgQE91dHB1dCgpIG1lcmlkaWFuQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XHJcbiAgLy8gdWkgdmFyaWFibGVzXHJcbiAgaG91cnMgPSAnJztcclxuICBtaW51dGVzID0gJyc7XHJcbiAgc2Vjb25kcyA9ICcnO1xyXG4gIG1lcmlkaWFuID0gJyc7XHJcbiAgLy8gbWluXFxtYXggdmFsaWRhdGlvbiBmb3IgaW5wdXQgZmllbGRzXHJcbiAgaW52YWxpZEhvdXJzID0gZmFsc2U7XHJcbiAgaW52YWxpZE1pbnV0ZXMgPSBmYWxzZTtcclxuICBpbnZhbGlkU2Vjb25kcyA9IGZhbHNlO1xyXG4gIC8vIGFyaWEtbGFiZWwgdmFyaWFibGVzXHJcbiAgbGFiZWxIb3VycyA9ICdob3Vycyc7XHJcbiAgbGFiZWxNaW51dGVzID0gJ21pbnV0ZXMnO1xyXG4gIGxhYmVsU2Vjb25kcyA9ICdzZWNvbmRzJztcclxuICAvLyB0aW1lIHBpY2tlciBjb250cm9scyBzdGF0ZVxyXG4gIGNhbkluY3JlbWVudEhvdXJzID0gdHJ1ZTtcclxuICBjYW5JbmNyZW1lbnRNaW51dGVzID0gdHJ1ZTtcclxuICBjYW5JbmNyZW1lbnRTZWNvbmRzID0gdHJ1ZTtcclxuICBjYW5EZWNyZW1lbnRIb3VycyA9IHRydWU7XHJcbiAgY2FuRGVjcmVtZW50TWludXRlcyA9IHRydWU7XHJcbiAgY2FuRGVjcmVtZW50U2Vjb25kcyA9IHRydWU7XHJcbiAgY2FuVG9nZ2xlTWVyaWRpYW4gPSB0cnVlO1xyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XHJcbiAgb25DaGFuZ2UgPSBGdW5jdGlvbi5wcm90b3R5cGU7XHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuICBvblRvdWNoZWQgPSBGdW5jdGlvbi5wcm90b3R5cGU7XHJcblxyXG4gIGNvbmZpZzogVGltZXBpY2tlckNvbmZpZztcclxuXHJcbiAgLy8gY29udHJvbCB2YWx1ZSBhY2Nlc3NvciBtZXRob2RzXHJcbiAgdGltZXBpY2tlclN1Yj86IFN1YnNjcmlwdGlvbjtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIF9jb25maWc6IFRpbWVwaWNrZXJDb25maWcsXHJcbiAgICBwcml2YXRlIF9jZDogQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICBwcml2YXRlIF9zdG9yZTogVGltZXBpY2tlclN0b3JlLFxyXG4gICAgcHJpdmF0ZSBfdGltZXBpY2tlckFjdGlvbnM6IFRpbWVwaWNrZXJBY3Rpb25zXHJcbiAgKSB7XHJcbiAgICB0aGlzLmNvbmZpZyA9IF9jb25maWc7XHJcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIHRoaXMuY29uZmlnKTtcclxuICAgIHRoaXMudGltZXBpY2tlclN1YiA9IF9zdG9yZS5zZWxlY3Qoc3RhdGUgPT4gc3RhdGUudmFsdWUpXHJcbiAgICAgIC5zdWJzY3JpYmUoKHZhbHVlOiBEYXRlIHwgdW5kZWZpbmVkKSA9PiB7XHJcbiAgICAgICAgLy8gdXBkYXRlIFVJIHZhbHVlcyBpZiBkYXRlIGNoYW5nZWRcclxuICAgICAgICB0aGlzLl9yZW5kZXJUaW1lKHZhbHVlKTtcclxuICAgICAgICB0aGlzLm9uQ2hhbmdlKHZhbHVlKTtcclxuXHJcbiAgICAgICAgdGhpcy5fc3RvcmUuZGlzcGF0Y2goXHJcbiAgICAgICAgICB0aGlzLl90aW1lcGlja2VyQWN0aW9ucy51cGRhdGVDb250cm9scyhnZXRDb250cm9sc1ZhbHVlKHRoaXMpKVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIF9zdG9yZS5zZWxlY3Qoc3RhdGUgPT4gc3RhdGUuY29udHJvbHMpXHJcbiAgICAgIC5zdWJzY3JpYmUoKGNvbnRyb2xzU3RhdGU6IFRpbWVwaWNrZXJDb250cm9scykgPT4ge1xyXG4gICAgICAgIGNvbnN0IGlzVGltZXBpY2tlcklucHV0VmFsaWQgPSBpc0lucHV0VmFsaWQodGhpcy5ob3VycywgdGhpcy5taW51dGVzLCB0aGlzLnNlY29uZHMsIHRoaXMuaXNQTSgpKTtcclxuICAgICAgICBjb25zdCBpc1ZhbGlkID0gdGhpcy5jb25maWcuYWxsb3dFbXB0eVRpbWU/XHJcbiAgICAgICAgICB0aGlzLmlzT25lT2ZEYXRlc0lzRW1wdHkoKSB8fCBpc1RpbWVwaWNrZXJJbnB1dFZhbGlkXHJcbiAgICAgICAgICA6IGlzVGltZXBpY2tlcklucHV0VmFsaWQ7XHJcbiAgICAgICAgdGhpcy5pc1ZhbGlkLmVtaXQoaXNWYWxpZCk7XHJcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBjb250cm9sc1N0YXRlKTtcclxuICAgICAgICBfY2QubWFya0ZvckNoZWNrKCk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqIEBkZXByZWNhdGVkIC0gcGxlYXNlIHVzZSBgaXNFZGl0YWJsZWAgaW5zdGVhZCAqL1xyXG4gIGdldCBpc1NwaW5uZXJzVmlzaWJsZSgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLnNob3dTcGlubmVycyAmJiAhdGhpcy5yZWFkb25seUlucHV0O1xyXG4gIH1cclxuXHJcbiAgZ2V0IGlzRWRpdGFibGUoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gISh0aGlzLnJlYWRvbmx5SW5wdXQgfHwgdGhpcy5kaXNhYmxlZCk7XHJcbiAgfVxyXG5cclxuICByZXNldFZhbGlkYXRpb24oKTogdm9pZCB7XHJcbiAgICB0aGlzLmludmFsaWRIb3VycyA9IGZhbHNlO1xyXG4gICAgdGhpcy5pbnZhbGlkTWludXRlcyA9IGZhbHNlO1xyXG4gICAgdGhpcy5pbnZhbGlkU2Vjb25kcyA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgaXNQTSgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLnNob3dNZXJpZGlhbiAmJiB0aGlzLm1lcmlkaWFuID09PSB0aGlzLm1lcmlkaWFuc1sxXTtcclxuICB9XHJcblxyXG4gIHByZXZEZWYoJGV2ZW50OiBFdmVudCkge1xyXG4gICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgfVxyXG5cclxuICB3aGVlbFNpZ24oJGV2ZW50OiBXaGVlbEV2ZW50SW5pdCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gTWF0aC5zaWduKCRldmVudC5kZWx0YVkgfHwgMCkgKiAtMTtcclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKCk6IHZvaWQge1xyXG4gICAgdGhpcy5fc3RvcmUuZGlzcGF0Y2goXHJcbiAgICAgIHRoaXMuX3RpbWVwaWNrZXJBY3Rpb25zLnVwZGF0ZUNvbnRyb2xzKGdldENvbnRyb2xzVmFsdWUodGhpcykpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgY2hhbmdlSG91cnMoc3RlcDogbnVtYmVyLCBzb3VyY2U6IFRpbWVDaGFuZ2VTb3VyY2UgPSAnJyk6IHZvaWQge1xyXG4gICAgdGhpcy5yZXNldFZhbGlkYXRpb24oKTtcclxuICAgIHRoaXMuX3N0b3JlLmRpc3BhdGNoKHRoaXMuX3RpbWVwaWNrZXJBY3Rpb25zLmNoYW5nZUhvdXJzKHsgc3RlcCwgc291cmNlIH0pKTtcclxuICB9XHJcblxyXG4gIGNoYW5nZU1pbnV0ZXMoc3RlcDogbnVtYmVyLCBzb3VyY2U6IFRpbWVDaGFuZ2VTb3VyY2UgPSAnJyk6IHZvaWQge1xyXG4gICAgdGhpcy5yZXNldFZhbGlkYXRpb24oKTtcclxuICAgIHRoaXMuX3N0b3JlLmRpc3BhdGNoKFxyXG4gICAgICB0aGlzLl90aW1lcGlja2VyQWN0aW9ucy5jaGFuZ2VNaW51dGVzKHsgc3RlcCwgc291cmNlIH0pXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgY2hhbmdlU2Vjb25kcyhzdGVwOiBudW1iZXIsIHNvdXJjZTogVGltZUNoYW5nZVNvdXJjZSA9ICcnKTogdm9pZCB7XHJcbiAgICB0aGlzLnJlc2V0VmFsaWRhdGlvbigpO1xyXG4gICAgdGhpcy5fc3RvcmUuZGlzcGF0Y2goXHJcbiAgICAgIHRoaXMuX3RpbWVwaWNrZXJBY3Rpb25zLmNoYW5nZVNlY29uZHMoeyBzdGVwLCBzb3VyY2UgfSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVIb3Vycyh0YXJnZXQ/OiBQYXJ0aWFsPEV2ZW50VGFyZ2V0PiB8IG51bGwpOiB2b2lkIHtcclxuICAgIHRoaXMucmVzZXRWYWxpZGF0aW9uKCk7XHJcbiAgICB0aGlzLmhvdXJzID0gKHRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZTtcclxuXHJcbiAgICBjb25zdCBpc1RpbWVwaWNrZXJJbnB1dFZhbGlkID0gaXNIb3VySW5wdXRWYWxpZCh0aGlzLmhvdXJzLCB0aGlzLmlzUE0oKSkgJiYgdGhpcy5pc1ZhbGlkTGltaXQoKTtcclxuICAgIGNvbnN0IGlzVmFsaWQgPSB0aGlzLmNvbmZpZy5hbGxvd0VtcHR5VGltZSA/XHJcbiAgICAgIHRoaXMuaXNPbmVPZkRhdGVzSXNFbXB0eSgpIHx8IGlzVGltZXBpY2tlcklucHV0VmFsaWRcclxuICAgICAgOiBpc1RpbWVwaWNrZXJJbnB1dFZhbGlkO1xyXG5cclxuICAgIGlmICghaXNWYWxpZCkge1xyXG4gICAgICB0aGlzLmludmFsaWRIb3VycyA9IHRydWU7XHJcbiAgICAgIHRoaXMuaXNWYWxpZC5lbWl0KGZhbHNlKTtcclxuICAgICAgdGhpcy5vbkNoYW5nZShudWxsKTtcclxuXHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl91cGRhdGVUaW1lKCk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVNaW51dGVzKHRhcmdldDogUGFydGlhbDxFdmVudFRhcmdldD4gfCBudWxsKSB7XHJcbiAgICB0aGlzLnJlc2V0VmFsaWRhdGlvbigpO1xyXG4gICAgdGhpcy5taW51dGVzID0gKHRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZTtcclxuXHJcbiAgICBjb25zdCBpc1RpbWVwaWNrZXJJbnB1dFZhbGlkID0gaXNNaW51dGVJbnB1dFZhbGlkKHRoaXMubWludXRlcykgJiYgdGhpcy5pc1ZhbGlkTGltaXQoKTtcclxuICAgIGNvbnN0IGlzVmFsaWQgPSB0aGlzLmNvbmZpZy5hbGxvd0VtcHR5VGltZSA/XHJcbiAgICAgIHRoaXMuaXNPbmVPZkRhdGVzSXNFbXB0eSgpIHx8IGlzVGltZXBpY2tlcklucHV0VmFsaWRcclxuICAgICAgOiBpc1RpbWVwaWNrZXJJbnB1dFZhbGlkO1xyXG5cclxuICAgIGlmICghaXNWYWxpZCkge1xyXG4gICAgICB0aGlzLmludmFsaWRNaW51dGVzID0gdHJ1ZTtcclxuICAgICAgdGhpcy5pc1ZhbGlkLmVtaXQoZmFsc2UpO1xyXG4gICAgICB0aGlzLm9uQ2hhbmdlKG51bGwpO1xyXG5cclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX3VwZGF0ZVRpbWUoKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZVNlY29uZHModGFyZ2V0OiBQYXJ0aWFsPEV2ZW50VGFyZ2V0PiB8IG51bGwpIHtcclxuICAgIHRoaXMucmVzZXRWYWxpZGF0aW9uKCk7XHJcbiAgICB0aGlzLnNlY29uZHMgPSAodGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlO1xyXG5cclxuICAgIGNvbnN0IGlzVGltZXBpY2tlcklucHV0VmFsaWQgPSBpc1NlY29uZElucHV0VmFsaWQodGhpcy5zZWNvbmRzKSAmJiB0aGlzLmlzVmFsaWRMaW1pdCgpO1xyXG4gICAgY29uc3QgaXNWYWxpZCA9IHRoaXMuY29uZmlnLmFsbG93RW1wdHlUaW1lID9cclxuICAgICAgdGhpcy5pc09uZU9mRGF0ZXNJc0VtcHR5KCkgfHwgaXNUaW1lcGlja2VySW5wdXRWYWxpZFxyXG4gICAgICA6IGlzVGltZXBpY2tlcklucHV0VmFsaWQ7XHJcblxyXG4gICAgaWYgKCFpc1ZhbGlkKSB7XHJcbiAgICAgIHRoaXMuaW52YWxpZFNlY29uZHMgPSB0cnVlO1xyXG4gICAgICB0aGlzLmlzVmFsaWQuZW1pdChmYWxzZSk7XHJcbiAgICAgIHRoaXMub25DaGFuZ2UobnVsbCk7XHJcblxyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fdXBkYXRlVGltZSgpO1xyXG4gIH1cclxuXHJcbiAgaXNWYWxpZExpbWl0KCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIGlzSW5wdXRMaW1pdFZhbGlkKHtcclxuICAgICAgaG91cjogdGhpcy5ob3VycyxcclxuICAgICAgbWludXRlOiB0aGlzLm1pbnV0ZXMsXHJcbiAgICAgIHNlY29uZHM6IHRoaXMuc2Vjb25kcyxcclxuICAgICAgaXNQTTogdGhpcy5pc1BNKClcclxuICAgIH0sIHRoaXMubWF4LCB0aGlzLm1pbik7XHJcbiAgfVxyXG5cclxuICBpc09uZU9mRGF0ZXNJc0VtcHR5KCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIGlzT25lT2ZEYXRlc0VtcHR5KFxyXG4gICAgICB0aGlzLmhvdXJzLFxyXG4gICAgICB0aGlzLm1pbnV0ZXMsXHJcbiAgICAgIHRoaXMuc2Vjb25kcyk7XHJcbiAgfVxyXG5cclxuICBfdXBkYXRlVGltZSgpIHtcclxuICAgIGNvbnN0IF9zZWNvbmRzID0gdGhpcy5zaG93U2Vjb25kcyA/IHRoaXMuc2Vjb25kcyA6IHZvaWQgMDtcclxuICAgIGNvbnN0IF9taW51dGVzID0gdGhpcy5zaG93TWludXRlcyA/IHRoaXMubWludXRlcyA6IHZvaWQgMDtcclxuICAgIGNvbnN0IGlzVGltZXBpY2tlcklucHV0VmFsaWQgPSBpc0lucHV0VmFsaWQodGhpcy5ob3VycywgX21pbnV0ZXMsIF9zZWNvbmRzLCB0aGlzLmlzUE0oKSk7XHJcbiAgICBjb25zdCBpc1ZhbGlkID0gdGhpcy5jb25maWcuYWxsb3dFbXB0eVRpbWUgP1xyXG4gICAgICB0aGlzLmlzT25lT2ZEYXRlc0lzRW1wdHkoKSB8fCBpc1RpbWVwaWNrZXJJbnB1dFZhbGlkXHJcbiAgICAgIDogaXNUaW1lcGlja2VySW5wdXRWYWxpZDtcclxuICAgIGlmICghaXNWYWxpZCkge1xyXG4gICAgICB0aGlzLmlzVmFsaWQuZW1pdChmYWxzZSk7XHJcbiAgICAgIHRoaXMub25DaGFuZ2UobnVsbCk7XHJcblxyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fc3RvcmUuZGlzcGF0Y2goXHJcbiAgICAgIHRoaXMuX3RpbWVwaWNrZXJBY3Rpb25zLnNldFRpbWUoe1xyXG4gICAgICAgIGhvdXI6IHRoaXMuaG91cnMsXHJcbiAgICAgICAgbWludXRlOiB0aGlzLm1pbnV0ZXMsXHJcbiAgICAgICAgc2Vjb25kczogdGhpcy5zZWNvbmRzLFxyXG4gICAgICAgIGlzUE06IHRoaXMuaXNQTSgpXHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlTWVyaWRpYW4oKTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMuc2hvd01lcmlkaWFuIHx8ICF0aGlzLmlzRWRpdGFibGUpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IF9ob3Vyc1BlckRheUhhbGYgPSAxMjtcclxuICAgIHRoaXMuX3N0b3JlLmRpc3BhdGNoKFxyXG4gICAgICB0aGlzLl90aW1lcGlja2VyQWN0aW9ucy5jaGFuZ2VIb3Vycyh7XHJcbiAgICAgICAgc3RlcDogX2hvdXJzUGVyRGF5SGFsZixcclxuICAgICAgICBzb3VyY2U6ICcnXHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV3JpdGUgYSBuZXcgdmFsdWUgdG8gdGhlIGVsZW1lbnQuXHJcbiAgICovXHJcbiAgd3JpdGVWYWx1ZShvYmo/OiBzdHJpbmcgfCBEYXRlKTogdm9pZCB7XHJcbiAgICBpZiAoaXNWYWxpZERhdGUob2JqKSkge1xyXG4gICAgICB0aGlzLnJlc2V0VmFsaWRhdGlvbigpO1xyXG4gICAgICB0aGlzLl9zdG9yZS5kaXNwYXRjaCh0aGlzLl90aW1lcGlja2VyQWN0aW9ucy53cml0ZVZhbHVlKHBhcnNlVGltZShvYmopKSk7XHJcbiAgICB9IGVsc2UgaWYgKG9iaiA9PSBudWxsKSB7XHJcbiAgICAgIHRoaXMuX3N0b3JlLmRpc3BhdGNoKHRoaXMuX3RpbWVwaWNrZXJBY3Rpb25zLndyaXRlVmFsdWUoKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXQgdGhlIGZ1bmN0aW9uIHRvIGJlIGNhbGxlZCB3aGVuIHRoZSBjb250cm9sIHJlY2VpdmVzIGEgY2hhbmdlIGV2ZW50LlxyXG4gICAqL1xyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XHJcbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKF86IGFueSkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0IHRoZSBmdW5jdGlvbiB0byBiZSBjYWxsZWQgd2hlbiB0aGUgY29udHJvbCByZWNlaXZlcyBhIHRvdWNoIGV2ZW50LlxyXG4gICAqL1xyXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBmdW5jdGlvbiBpcyBjYWxsZWQgd2hlbiB0aGUgY29udHJvbCBzdGF0dXMgY2hhbmdlcyB0byBvciBmcm9tIFwiZGlzYWJsZWRcIi5cclxuICAgKiBEZXBlbmRpbmcgb24gdGhlIHZhbHVlLCBpdCB3aWxsIGVuYWJsZSBvciBkaXNhYmxlIHRoZSBhcHByb3ByaWF0ZSBET00gZWxlbWVudC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBpc0Rpc2FibGVkXHJcbiAgICovXHJcbiAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcclxuICAgIHRoaXMuX2NkLm1hcmtGb3JDaGVjaygpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICB0aGlzLnRpbWVwaWNrZXJTdWI/LnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9yZW5kZXJUaW1lKHZhbHVlPzogc3RyaW5nIHwgRGF0ZSk6IHZvaWQge1xyXG4gICAgaWYgKCF2YWx1ZSB8fCAhaXNWYWxpZERhdGUodmFsdWUpKSB7XHJcbiAgICAgIHRoaXMuaG91cnMgPSAnJztcclxuICAgICAgdGhpcy5taW51dGVzID0gJyc7XHJcbiAgICAgIHRoaXMuc2Vjb25kcyA9ICcnO1xyXG4gICAgICB0aGlzLm1lcmlkaWFuID0gdGhpcy5tZXJpZGlhbnNbMF07XHJcbiAgICAgIHRoaXMubWVyaWRpYW5DaGFuZ2UuZW1pdCh0aGlzLm1lcmlkaWFuKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IF92YWx1ZSA9IHBhcnNlVGltZSh2YWx1ZSk7XHJcbiAgICBpZiAoIV92YWx1ZSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgX2hvdXJzUGVyRGF5SGFsZiA9IDEyO1xyXG4gICAgbGV0IF9ob3VycyA9IF92YWx1ZS5nZXRIb3VycygpO1xyXG5cclxuICAgIGlmICh0aGlzLnNob3dNZXJpZGlhbikge1xyXG4gICAgICB0aGlzLm1lcmlkaWFuID0gdGhpcy5tZXJpZGlhbnNbX2hvdXJzID49IF9ob3Vyc1BlckRheUhhbGYgPyAxIDogMF07XHJcbiAgICAgIHRoaXMubWVyaWRpYW5DaGFuZ2UuZW1pdCh0aGlzLm1lcmlkaWFuKTtcclxuICAgICAgX2hvdXJzID0gX2hvdXJzICUgX2hvdXJzUGVyRGF5SGFsZjtcclxuICAgICAgLy8gc2hvdWxkIGJlIDEyIFBNLCBub3QgMDAgUE1cclxuICAgICAgaWYgKF9ob3VycyA9PT0gMCkge1xyXG4gICAgICAgIF9ob3VycyA9IF9ob3Vyc1BlckRheUhhbGY7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmhvdXJzID0gcGFkTnVtYmVyKF9ob3Vycyk7XHJcbiAgICB0aGlzLm1pbnV0ZXMgPSBwYWROdW1iZXIoX3ZhbHVlLmdldE1pbnV0ZXMoKSk7XHJcbiAgICB0aGlzLnNlY29uZHMgPSBwYWROdW1iZXIoX3ZhbHVlLmdldFVUQ1NlY29uZHMoKSk7XHJcbiAgfVxyXG59XHJcbiIsIjx0YWJsZT5cclxuICA8dGJvZHk+XHJcbiAgPHRyIGNsYXNzPVwidGV4dC1jZW50ZXJcIiBbaGlkZGVuXT1cIiFzaG93U3Bpbm5lcnNcIj5cclxuICAgIDwhLS0gaW5jcmVtZW50IGhvdXJzIGJ1dHRvbi0tPlxyXG4gICAgPHRkPlxyXG4gICAgICA8YSBjbGFzcz1cImJ0biBidG4tbGlua1wiIFtjbGFzcy5kaXNhYmxlZF09XCIhY2FuSW5jcmVtZW50SG91cnMgfHwgIWlzRWRpdGFibGVcIlxyXG4gICAgICAgICAoY2xpY2spPVwiY2hhbmdlSG91cnMoaG91clN0ZXApXCJcclxuICAgICAgPjxzcGFuIGNsYXNzPVwiYnMtY2hldnJvbiBicy1jaGV2cm9uLXVwXCI+PC9zcGFuPjwvYT5cclxuICAgIDwvdGQ+XHJcbiAgICA8IS0tIGRpdmlkZXIgLS0+XHJcbiAgICA8dGQgKm5nSWY9XCJzaG93TWludXRlc1wiPiZuYnNwOyZuYnNwOyZuYnNwOzwvdGQ+XHJcbiAgICA8IS0tIGluY3JlbWVudCBtaW51dGVzIGJ1dHRvbiAtLT5cclxuICAgIDx0ZCAqbmdJZj1cInNob3dNaW51dGVzXCI+XHJcbiAgICAgIDxhIGNsYXNzPVwiYnRuIGJ0bi1saW5rXCIgW2NsYXNzLmRpc2FibGVkXT1cIiFjYW5JbmNyZW1lbnRNaW51dGVzIHx8ICFpc0VkaXRhYmxlXCJcclxuICAgICAgICAgKGNsaWNrKT1cImNoYW5nZU1pbnV0ZXMobWludXRlU3RlcClcIlxyXG4gICAgICA+PHNwYW4gY2xhc3M9XCJicy1jaGV2cm9uIGJzLWNoZXZyb24tdXBcIj48L3NwYW4+PC9hPlxyXG4gICAgPC90ZD5cclxuICAgIDwhLS0gZGl2aWRlciAtLT5cclxuICAgIDx0ZCAqbmdJZj1cInNob3dTZWNvbmRzXCI+Jm5ic3A7PC90ZD5cclxuICAgIDwhLS0gaW5jcmVtZW50IHNlY29uZHMgYnV0dG9uIC0tPlxyXG4gICAgPHRkICpuZ0lmPVwic2hvd1NlY29uZHNcIj5cclxuICAgICAgPGEgY2xhc3M9XCJidG4gYnRuLWxpbmtcIiBbY2xhc3MuZGlzYWJsZWRdPVwiIWNhbkluY3JlbWVudFNlY29uZHMgfHwgIWlzRWRpdGFibGVcIlxyXG4gICAgICAgICAoY2xpY2spPVwiY2hhbmdlU2Vjb25kcyhzZWNvbmRzU3RlcClcIj5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cImJzLWNoZXZyb24gYnMtY2hldnJvbi11cFwiPjwvc3Bhbj5cclxuICAgICAgPC9hPlxyXG4gICAgPC90ZD5cclxuICAgIDwhLS0gc3BhY2UgYmV0d2VlbiAtLT5cclxuICAgIDx0ZCAqbmdJZj1cInNob3dNZXJpZGlhblwiPiZuYnNwOyZuYnNwOyZuYnNwOzwvdGQ+XHJcbiAgICA8IS0tIG1lcmlkaWFuIHBsYWNlaG9sZGVyLS0+XHJcbiAgICA8dGQgKm5nSWY9XCJzaG93TWVyaWRpYW5cIj48L3RkPlxyXG4gIDwvdHI+XHJcbiAgPHRyPlxyXG4gICAgPCEtLSBob3VycyAtLT5cclxuICAgIDx0ZCBjbGFzcz1cImZvcm0tZ3JvdXAgbWItM1wiIFtjbGFzcy5oYXMtZXJyb3JdPVwiaW52YWxpZEhvdXJzXCI+XHJcbiAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIFtjbGFzcy5pcy1pbnZhbGlkXT1cImludmFsaWRIb3Vyc1wiXHJcbiAgICAgICAgICAgICBjbGFzcz1cImZvcm0tY29udHJvbCB0ZXh0LWNlbnRlciBicy10aW1lcGlja2VyLWZpZWxkXCJcclxuICAgICAgICAgICAgIFtwbGFjZWhvbGRlcl09XCJob3Vyc1BsYWNlaG9sZGVyXCJcclxuICAgICAgICAgICAgIG1heGxlbmd0aD1cIjJcIlxyXG4gICAgICAgICAgICAgW3JlYWRvbmx5XT1cInJlYWRvbmx5SW5wdXRcIlxyXG4gICAgICAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcclxuICAgICAgICAgICAgIFt2YWx1ZV09XCJob3Vyc1wiXHJcbiAgICAgICAgICAgICAod2hlZWwpPVwicHJldkRlZigkZXZlbnQpO2NoYW5nZUhvdXJzKGhvdXJTdGVwICogd2hlZWxTaWduKCRldmVudCksICd3aGVlbCcpXCJcclxuICAgICAgICAgICAgIChrZXlkb3duLkFycm93VXApPVwiY2hhbmdlSG91cnMoaG91clN0ZXAsICdrZXknKVwiXHJcbiAgICAgICAgICAgICAoa2V5ZG93bi5BcnJvd0Rvd24pPVwiY2hhbmdlSG91cnMoLWhvdXJTdGVwLCAna2V5JylcIlxyXG4gICAgICAgICAgICAgKGNoYW5nZSk9XCJ1cGRhdGVIb3VycygkZXZlbnQudGFyZ2V0KVwiIFthdHRyLmFyaWEtbGFiZWxdPVwibGFiZWxIb3Vyc1wiPjwvdGQ+XHJcbiAgICA8IS0tIGRpdmlkZXIgLS0+XHJcbiAgICA8dGQgKm5nSWY9XCJzaG93TWludXRlc1wiPiZuYnNwOzombmJzcDs8L3RkPlxyXG4gICAgPCEtLSBtaW51dGVzIC0tPlxyXG4gICAgPHRkIGNsYXNzPVwiZm9ybS1ncm91cCBtYi0zXCIgKm5nSWY9XCJzaG93TWludXRlc1wiIFtjbGFzcy5oYXMtZXJyb3JdPVwiaW52YWxpZE1pbnV0ZXNcIj5cclxuICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgW2NsYXNzLmlzLWludmFsaWRdPVwiaW52YWxpZE1pbnV0ZXNcIlxyXG4gICAgICAgICAgICAgY2xhc3M9XCJmb3JtLWNvbnRyb2wgdGV4dC1jZW50ZXIgYnMtdGltZXBpY2tlci1maWVsZFwiXHJcbiAgICAgICAgICAgICBbcGxhY2Vob2xkZXJdPVwibWludXRlc1BsYWNlaG9sZGVyXCJcclxuICAgICAgICAgICAgIG1heGxlbmd0aD1cIjJcIlxyXG4gICAgICAgICAgICAgW3JlYWRvbmx5XT1cInJlYWRvbmx5SW5wdXRcIlxyXG4gICAgICAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcclxuICAgICAgICAgICAgIFt2YWx1ZV09XCJtaW51dGVzXCJcclxuICAgICAgICAgICAgICh3aGVlbCk9XCJwcmV2RGVmKCRldmVudCk7Y2hhbmdlTWludXRlcyhtaW51dGVTdGVwICogd2hlZWxTaWduKCRldmVudCksICd3aGVlbCcpXCJcclxuICAgICAgICAgICAgIChrZXlkb3duLkFycm93VXApPVwiY2hhbmdlTWludXRlcyhtaW51dGVTdGVwLCAna2V5JylcIlxyXG4gICAgICAgICAgICAgKGtleWRvd24uQXJyb3dEb3duKT1cImNoYW5nZU1pbnV0ZXMoLW1pbnV0ZVN0ZXAsICdrZXknKVwiXHJcbiAgICAgICAgICAgICAoY2hhbmdlKT1cInVwZGF0ZU1pbnV0ZXMoJGV2ZW50LnRhcmdldClcIiBbYXR0ci5hcmlhLWxhYmVsXT1cImxhYmVsTWludXRlc1wiPlxyXG4gICAgPC90ZD5cclxuICAgIDwhLS0gZGl2aWRlciAtLT5cclxuICAgIDx0ZCAqbmdJZj1cInNob3dTZWNvbmRzXCI+Jm5ic3A7OiZuYnNwOzwvdGQ+XHJcbiAgICA8IS0tIHNlY29uZHMgLS0+XHJcbiAgICA8dGQgY2xhc3M9XCJmb3JtLWdyb3VwIG1iLTNcIiAqbmdJZj1cInNob3dTZWNvbmRzXCIgW2NsYXNzLmhhcy1lcnJvcl09XCJpbnZhbGlkU2Vjb25kc1wiPlxyXG4gICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBbY2xhc3MuaXMtaW52YWxpZF09XCJpbnZhbGlkU2Vjb25kc1wiXHJcbiAgICAgICAgICAgICBjbGFzcz1cImZvcm0tY29udHJvbCB0ZXh0LWNlbnRlciBicy10aW1lcGlja2VyLWZpZWxkXCJcclxuICAgICAgICAgICAgIFtwbGFjZWhvbGRlcl09XCJzZWNvbmRzUGxhY2Vob2xkZXJcIlxyXG4gICAgICAgICAgICAgbWF4bGVuZ3RoPVwiMlwiXHJcbiAgICAgICAgICAgICBbcmVhZG9ubHldPVwicmVhZG9ubHlJbnB1dFwiXHJcbiAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxyXG4gICAgICAgICAgICAgW3ZhbHVlXT1cInNlY29uZHNcIlxyXG4gICAgICAgICAgICAgKHdoZWVsKT1cInByZXZEZWYoJGV2ZW50KTtjaGFuZ2VTZWNvbmRzKHNlY29uZHNTdGVwICogd2hlZWxTaWduKCRldmVudCksICd3aGVlbCcpXCJcclxuICAgICAgICAgICAgIChrZXlkb3duLkFycm93VXApPVwiY2hhbmdlU2Vjb25kcyhzZWNvbmRzU3RlcCwgJ2tleScpXCJcclxuICAgICAgICAgICAgIChrZXlkb3duLkFycm93RG93bik9XCJjaGFuZ2VTZWNvbmRzKC1zZWNvbmRzU3RlcCwgJ2tleScpXCJcclxuICAgICAgICAgICAgIChjaGFuZ2UpPVwidXBkYXRlU2Vjb25kcygkZXZlbnQudGFyZ2V0KVwiIFthdHRyLmFyaWEtbGFiZWxdPVwibGFiZWxTZWNvbmRzXCI+XHJcbiAgICA8L3RkPlxyXG4gICAgPCEtLSBzcGFjZSBiZXR3ZWVuIC0tPlxyXG4gICAgPHRkICpuZ0lmPVwic2hvd01lcmlkaWFuXCI+Jm5ic3A7Jm5ic3A7Jm5ic3A7PC90ZD5cclxuICAgIDwhLS0gbWVyaWRpYW4gLS0+XHJcbiAgICA8dGQgKm5nSWY9XCJzaG93TWVyaWRpYW5cIj5cclxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgdGV4dC1jZW50ZXJcIlxyXG4gICAgICAgICAgICAgIFtkaXNhYmxlZF09XCIhaXNFZGl0YWJsZSB8fCAhY2FuVG9nZ2xlTWVyaWRpYW5cIlxyXG4gICAgICAgICAgICAgIFtjbGFzcy5kaXNhYmxlZF09XCIhaXNFZGl0YWJsZSB8fCAhY2FuVG9nZ2xlTWVyaWRpYW5cIlxyXG4gICAgICAgICAgICAgIChjbGljayk9XCJ0b2dnbGVNZXJpZGlhbigpXCJcclxuICAgICAgPnt7IG1lcmlkaWFuIH19XHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgPC90ZD5cclxuICA8L3RyPlxyXG4gIDx0ciBjbGFzcz1cInRleHQtY2VudGVyXCIgW2hpZGRlbl09XCIhc2hvd1NwaW5uZXJzXCI+XHJcbiAgICA8IS0tIGRlY3JlbWVudCBob3VycyBidXR0b24tLT5cclxuICAgIDx0ZD5cclxuICAgICAgPGEgY2xhc3M9XCJidG4gYnRuLWxpbmtcIiBbY2xhc3MuZGlzYWJsZWRdPVwiIWNhbkRlY3JlbWVudEhvdXJzIHx8ICFpc0VkaXRhYmxlXCJcclxuICAgICAgICAgKGNsaWNrKT1cImNoYW5nZUhvdXJzKC1ob3VyU3RlcClcIj5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cImJzLWNoZXZyb24gYnMtY2hldnJvbi1kb3duXCI+PC9zcGFuPlxyXG4gICAgICA8L2E+XHJcbiAgICA8L3RkPlxyXG4gICAgPCEtLSBkaXZpZGVyIC0tPlxyXG4gICAgPHRkICpuZ0lmPVwic2hvd01pbnV0ZXNcIj4mbmJzcDsmbmJzcDsmbmJzcDs8L3RkPlxyXG4gICAgPCEtLSBkZWNyZW1lbnQgbWludXRlcyBidXR0b24tLT5cclxuICAgIDx0ZCAqbmdJZj1cInNob3dNaW51dGVzXCI+XHJcbiAgICAgIDxhIGNsYXNzPVwiYnRuIGJ0bi1saW5rXCIgW2NsYXNzLmRpc2FibGVkXT1cIiFjYW5EZWNyZW1lbnRNaW51dGVzIHx8ICFpc0VkaXRhYmxlXCJcclxuICAgICAgICAgKGNsaWNrKT1cImNoYW5nZU1pbnV0ZXMoLW1pbnV0ZVN0ZXApXCI+XHJcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJicy1jaGV2cm9uIGJzLWNoZXZyb24tZG93blwiPjwvc3Bhbj5cclxuICAgICAgPC9hPlxyXG4gICAgPC90ZD5cclxuICAgIDwhLS0gZGl2aWRlciAtLT5cclxuICAgIDx0ZCAqbmdJZj1cInNob3dTZWNvbmRzXCI+Jm5ic3A7PC90ZD5cclxuICAgIDwhLS0gZGVjcmVtZW50IHNlY29uZHMgYnV0dG9uLS0+XHJcbiAgICA8dGQgKm5nSWY9XCJzaG93U2Vjb25kc1wiPlxyXG4gICAgICA8YSBjbGFzcz1cImJ0biBidG4tbGlua1wiIFtjbGFzcy5kaXNhYmxlZF09XCIhY2FuRGVjcmVtZW50U2Vjb25kcyB8fCAhaXNFZGl0YWJsZVwiXHJcbiAgICAgICAgIChjbGljayk9XCJjaGFuZ2VTZWNvbmRzKC1zZWNvbmRzU3RlcClcIj5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cImJzLWNoZXZyb24gYnMtY2hldnJvbi1kb3duXCI+PC9zcGFuPlxyXG4gICAgICA8L2E+XHJcbiAgICA8L3RkPlxyXG4gICAgPCEtLSBzcGFjZSBiZXR3ZWVuIC0tPlxyXG4gICAgPHRkICpuZ0lmPVwic2hvd01lcmlkaWFuXCI+Jm5ic3A7Jm5ic3A7Jm5ic3A7PC90ZD5cclxuICAgIDwhLS0gbWVyaWRpYW4gcGxhY2Vob2xkZXItLT5cclxuICAgIDx0ZCAqbmdJZj1cInNob3dNZXJpZGlhblwiPjwvdGQ+XHJcbiAgPC90cj5cclxuICA8L3Rib2R5PlxyXG48L3RhYmxlPlxyXG4iXX0=