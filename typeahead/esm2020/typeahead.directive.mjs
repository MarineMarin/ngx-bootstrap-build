import { ChangeDetectorRef, Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { EMPTY, from, isObservable } from 'rxjs';
import { debounceTime, filter, mergeMap, switchMap, tap, toArray } from 'rxjs/operators';
import { TypeaheadContainerComponent } from './typeahead-container.component';
import { TypeaheadMatch } from './typeahead-match.class';
import { getValueFromObject, latinize, tokenize } from './typeahead-utils';
import { TypeaheadConfig } from './typeahead.config';
import * as i0 from "@angular/core";
import * as i1 from "ngx-bootstrap/component-loader";
import * as i2 from "./typeahead.config";
import * as i3 from "@angular/forms";
export class TypeaheadDirective {
    constructor(cis, config, changeDetection, element, ngControl, renderer, viewContainerRef) {
        this.changeDetection = changeDetection;
        this.element = element;
        this.ngControl = ngControl;
        this.renderer = renderer;
        /** minimal no of characters that needs to be entered before
         * typeahead kicks-in. When set to 0, typeahead shows on focus with full
         * list of options (limited as normal by typeaheadOptionsLimit)
         */
        this.typeaheadMinLength = 1;
        /** sets use adaptive position */
        this.adaptivePosition = false;
        /** turn on/off animation */
        this.isAnimated = false;
        /** minimal wait time after last character typed before typeahead kicks-in */
        this.typeaheadWaitMs = 0;
        /** match latin symbols.
         * If true the word súper would match super and vice versa.
         */
        this.typeaheadLatinize = true;
        /** Can be use to search words by inserting a single white space between each characters
         *  for example 'C a l i f o r n i a' will match 'California'.
         */
        this.typeaheadSingleWords = true;
        /** should be used only in case typeaheadSingleWords attribute is true.
         * Sets the word delimiter to break words. Defaults to space.
         */
        this.typeaheadWordDelimiters = ' ';
        /** should be used only in case typeaheadMultipleSearch attribute is true.
         * Sets the multiple search delimiter to know when to start a new search. Defaults to comma.
         * If space needs to be used, then explicitly set typeaheadWordDelimiters to something else than space
         * because space is used by default OR set typeaheadSingleWords attribute to false if you don't need
         * to use it together with multiple search.
         */
        this.typeaheadMultipleSearchDelimiters = ',';
        /** should be used only in case typeaheadSingleWords attribute is true.
         * Sets the word delimiter to match exact phrase.
         * Defaults to simple and double quotes.
         */
        this.typeaheadPhraseDelimiters = '\'"';
        /** specifies if typeahead is scrollable  */
        this.typeaheadScrollable = false;
        /** specifies number of options to show in scroll view  */
        this.typeaheadOptionsInScrollableView = 5;
        /** fired when an options list was opened and the user clicked Tab
         * If a value equal true, it will be chosen first or active item in the list
         * If value equal false, it will be chosen an active item in the list or nothing
         */
        this.typeaheadSelectFirstItem = true;
        /** makes active first item in a list */
        this.typeaheadIsFirstItemActive = true;
        /** fired when 'busy' state of this component was changed,
         * fired on async mode only, returns boolean
         */
        this.typeaheadLoading = new EventEmitter();
        /** fired on every key event and returns true
         * in case of matches are not detected
         */
        this.typeaheadNoResults = new EventEmitter();
        /** fired when option was selected, return object with data of this option. */
        this.typeaheadOnSelect = new EventEmitter();
        /** fired when option was previewed, return object with data of this option. */
        this.typeaheadOnPreview = new EventEmitter();
        /** fired when blur event occurs. returns the active item */
        this.typeaheadOnBlur = new EventEmitter();
        /** This attribute indicates that the dropdown should be opened upwards */
        this.dropup = false;
        this.isOpen = false;
        this.list = 'list';
        this.isActiveItemChanged = false;
        this.isFocused = false;
        this.cancelRequestOnFocusLost = false;
        this.selectItemOnBlur = false;
        this.keyUpEventEmitter = new EventEmitter();
        this.placement = 'bottom left';
        this._matches = [];
        this._subscriptions = [];
        this._outsideClickListener = () => void 0;
        this._typeahead = cis.createLoader(element, viewContainerRef, renderer)
            .provide({ provide: TypeaheadConfig, useValue: config });
        Object.assign(this, {
            typeaheadHideResultsOnBlur: config.hideResultsOnBlur,
            cancelRequestOnFocusLost: config.cancelRequestOnFocusLost,
            typeaheadSelectFirstItem: config.selectFirstItem,
            typeaheadIsFirstItemActive: config.isFirstItemActive,
            typeaheadMinLength: config.minLength,
            adaptivePosition: config.adaptivePosition,
            isAnimated: config.isAnimated,
            selectItemOnBlur: config.selectItemOnBlur
        });
    }
    get matches() {
        return this._matches;
    }
    ngOnInit() {
        this.typeaheadOptionsLimit = this.typeaheadOptionsLimit || 20;
        this.typeaheadMinLength =
            this.typeaheadMinLength === void 0 ? 1 : this.typeaheadMinLength;
        // async should be false in case of array
        if (this.typeaheadAsync === undefined && !(isObservable(this.typeahead))) {
            this.typeaheadAsync = false;
        }
        if (isObservable(this.typeahead)) {
            this.typeaheadAsync = true;
        }
        if (this.typeaheadAsync) {
            this.asyncActions();
        }
        else {
            this.syncActions();
        }
        this.checkDelimitersConflict();
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onInput(e) {
        // For `<input>`s, use the `value` property. For others that don't have a
        // `value` (such as `<span contenteditable="true">`), use either
        // `textContent` or `innerText` (depending on which one is supported, i.e.
        // Firefox or IE).
        const value = e.target.value !== undefined
            ? e.target.value
            : e.target.textContent !== undefined
                ? e.target.textContent
                : e.target.innerText;
        if (value != null && value.trim().length >= this.typeaheadMinLength) {
            this.typeaheadLoading.emit(true);
            this.keyUpEventEmitter.emit(e.target.value);
        }
        else {
            this.typeaheadLoading.emit(false);
            this.typeaheadNoResults.emit(false);
            this.hide();
        }
    }
    onChange(event) {
        if (this._container) {
            // esc
            if (event.keyCode === 27 || event.key === 'Escape') {
                this.hide();
                return;
            }
            // up
            if (event.keyCode === 38 || event.key === 'ArrowUp') {
                this.isActiveItemChanged = true;
                this._container.prevActiveMatch();
                return;
            }
            // down
            if (event.keyCode === 40 || event.key === 'ArrowDown') {
                this.isActiveItemChanged = true;
                this._container.nextActiveMatch();
                return;
            }
            // enter
            if (event.keyCode === 13 || event.key === 'Enter') {
                this._container.selectActiveMatch();
                return;
            }
        }
    }
    onFocus() {
        this.isFocused = true;
        // add setTimeout to fix issue #5251
        // to get and emit updated value if it's changed on focus
        setTimeout(() => {
            if (this.typeaheadMinLength === 0) {
                this.typeaheadLoading.emit(true);
                this.keyUpEventEmitter.emit(this.element.nativeElement.value || '');
            }
        }, 0);
    }
    onBlur() {
        this.isFocused = false;
        if (this._container && !this._container.isFocused) {
            this.typeaheadOnBlur.emit(this._container.active);
        }
        if (!this.container && this._matches?.length === 0) {
            this.typeaheadOnBlur.emit(new TypeaheadMatch(this.element.nativeElement.value, this.element.nativeElement.value, false));
        }
    }
    onKeydown(event) {
        // no container - no problems
        if (!this._container) {
            return;
        }
        if (event.keyCode === 9 || event.key === 'Tab') {
            this.onBlur();
        }
        if (event.keyCode === 9 || event.key === 'Tab' || event.keyCode === 13 || event.key === 'Enter') {
            event.preventDefault();
            if (this.typeaheadSelectFirstItem) {
                this._container.selectActiveMatch();
                return;
            }
            if (!this.typeaheadSelectFirstItem) {
                this._container.selectActiveMatch(this.isActiveItemChanged);
                this.isActiveItemChanged = false;
                this.hide();
            }
        }
    }
    changeModel(match) {
        if (!match) {
            return;
        }
        let valueStr;
        if (this.typeaheadMultipleSearch && this._allEnteredValue) {
            const tokens = this._allEnteredValue.split(new RegExp(`([${this.typeaheadMultipleSearchDelimiters}]+)`));
            this._allEnteredValue = tokens.slice(0, tokens.length - 1).concat(match.value).join('');
            valueStr = this._allEnteredValue;
        }
        else {
            valueStr = match.value;
        }
        this.ngControl.viewToModelUpdate(valueStr);
        this.ngControl.control?.setValue(valueStr);
        this.changeDetection.markForCheck();
        this.hide();
    }
    show() {
        this._typeahead
            .attach(TypeaheadContainerComponent)
            .to(this.container)
            .position({ attachment: `${this.dropup ? 'top' : 'bottom'} left` })
            .show({
            typeaheadRef: this,
            placement: this.placement,
            animation: false,
            dropup: this.dropup
        });
        this._outsideClickListener = this.renderer
            .listen('document', 'click', (event) => {
            if (this.typeaheadMinLength === 0 && this.element.nativeElement.contains(event.target)) {
                return;
            }
            if (!this.typeaheadHideResultsOnBlur || this.element.nativeElement.contains(event.target)) {
                return;
            }
            this.onOutsideClick();
        });
        if (!this._typeahead.instance || !this.ngControl.control) {
            return;
        }
        this._container = this._typeahead.instance;
        this._container.parent = this;
        // This improves the speed as it won't have to be done for each list item
        const normalizedQuery = (this.typeaheadLatinize
            ? latinize(this.ngControl.control.value)
            : this.ngControl.control.value)
            .toString()
            .toLowerCase();
        this._container.query = this.tokenizeQuery(normalizedQuery);
        this._container.matches = this._matches;
        this.element.nativeElement.focus();
        this._container.activeChangeEvent.subscribe((activeId) => {
            this.activeDescendant = activeId;
            this.changeDetection.markForCheck();
        });
        this.isOpen = true;
    }
    hide() {
        if (this._typeahead.isShown) {
            this._typeahead.hide();
            this._outsideClickListener();
            this._container = void 0;
            this.isOpen = false;
            this.changeDetection.markForCheck();
        }
        this.typeaheadOnPreview.emit();
    }
    onOutsideClick() {
        if (this._container && !this._container.isFocused) {
            this.hide();
        }
    }
    ngOnDestroy() {
        // clean up subscriptions
        for (const sub of this._subscriptions) {
            sub.unsubscribe();
        }
        this._typeahead.dispose();
    }
    asyncActions() {
        this._subscriptions.push(this.keyUpEventEmitter
            .pipe(debounceTime(this.typeaheadWaitMs), tap(value => this._allEnteredValue = value), switchMap(() => {
            if (!this.typeahead) {
                return EMPTY;
            }
            return this.typeahead;
        }))
            .subscribe((matches) => {
            this.finalizeAsyncCall(matches);
        }));
    }
    syncActions() {
        this._subscriptions.push(this.keyUpEventEmitter
            .pipe(debounceTime(this.typeaheadWaitMs), mergeMap((value) => {
            this._allEnteredValue = value;
            const normalizedQuery = this.normalizeQuery(value);
            if (!this.typeahead) {
                return EMPTY;
            }
            const typeahead = isObservable(this.typeahead) ? this.typeahead : from(this.typeahead);
            return typeahead
                .pipe(filter((option) => {
                return !!option && this.testMatch(this.normalizeOption(option), normalizedQuery);
            }), toArray());
        }))
            .subscribe((matches) => {
            this.finalizeAsyncCall(matches);
        }));
    }
    normalizeOption(option) {
        const optionValue = getValueFromObject(option, this.typeaheadOptionField);
        const normalizedOption = this.typeaheadLatinize
            ? latinize(optionValue)
            : optionValue;
        return normalizedOption.toLowerCase();
    }
    tokenizeQuery(currentQuery) {
        let query = currentQuery;
        if (this.typeaheadMultipleSearch && this.typeaheadSingleWords) {
            if (!this.haveCommonCharacters(`${this.typeaheadPhraseDelimiters}${this.typeaheadWordDelimiters}`, this.typeaheadMultipleSearchDelimiters)) {
                // single words and multiple search delimiters are different, can be used together
                query = tokenize(query, this.typeaheadWordDelimiters, this.typeaheadPhraseDelimiters, this.typeaheadMultipleSearchDelimiters);
            }
        }
        else if (this.typeaheadSingleWords) {
            query = tokenize(query, this.typeaheadWordDelimiters, this.typeaheadPhraseDelimiters);
        }
        else {
            // multiple searches
            query = tokenize(query, void 0, void 0, this.typeaheadMultipleSearchDelimiters);
        }
        return query;
    }
    normalizeQuery(value) {
        // If singleWords, break model here to not be doing extra work on each iteration
        let normalizedQuery = (this.typeaheadLatinize
            ? latinize(value)
            : value)
            .toString()
            .toLowerCase();
        normalizedQuery = this.tokenizeQuery(normalizedQuery);
        return normalizedQuery;
    }
    testMatch(match, test) {
        let spaceLength;
        if (typeof test === 'object') {
            spaceLength = test.length;
            for (let i = 0; i < spaceLength; i += 1) {
                if (test[i].length > 0 && match.indexOf(test[i]) < 0) {
                    return false;
                }
            }
            return true;
        }
        return match.indexOf(test) >= 0;
    }
    finalizeAsyncCall(matches) {
        this.prepareMatches(matches || []);
        this.typeaheadLoading.emit(false);
        this.typeaheadNoResults.emit(!this.hasMatches());
        if (!this.hasMatches()) {
            this.hide();
            return;
        }
        if (!this.isFocused && this.cancelRequestOnFocusLost) {
            return;
        }
        if (this._container && this.ngControl.control) {
            // fix: remove usage of ngControl internals
            const _controlValue = (this.typeaheadLatinize
                ? latinize(this.ngControl.control.value)
                : this.ngControl.control.value) || '';
            // This improves the speed as it won't have to be done for each list item
            const normalizedQuery = _controlValue.toString().toLowerCase();
            this._container.query = this.tokenizeQuery(normalizedQuery);
            this._container.matches = this._matches;
        }
        else {
            this.show();
        }
    }
    prepareMatches(options) {
        const limited = options.slice(0, this.typeaheadOptionsLimit);
        const sorted = !this.typeaheadOrderBy ? limited : this.orderMatches(limited);
        if (this.typeaheadGroupField) {
            let matches = [];
            // extract all group names
            const groups = sorted
                .map((option) => getValueFromObject(option, this.typeaheadGroupField))
                .filter((v, i, a) => a.indexOf(v) === i);
            groups.forEach((group) => {
                // add group header to array of matches
                matches.push(new TypeaheadMatch(group, group, true));
                // add each item of group to array of matches
                matches = matches.concat(sorted
                    .filter((option) => getValueFromObject(option, this.typeaheadGroupField) === group)
                    .map((option) => new TypeaheadMatch(option, getValueFromObject(option, this.typeaheadOptionField))));
            });
            this._matches = matches;
        }
        else {
            this._matches = sorted.map(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (option) => new TypeaheadMatch(option, getValueFromObject(option, this.typeaheadOptionField)));
        }
    }
    orderMatches(options) {
        if (!options.length) {
            return options;
        }
        if (this.typeaheadOrderBy !== null
            && this.typeaheadOrderBy !== undefined
            && typeof this.typeaheadOrderBy === 'object'
            && Object.keys(this.typeaheadOrderBy).length === 0) {
            console.error('Field and direction properties for typeaheadOrderBy have to be set according to documentation!');
            return options;
        }
        const { field, direction } = (this.typeaheadOrderBy || {});
        if (!direction || !(direction === 'asc' || direction === 'desc')) {
            console.error('typeaheadOrderBy direction has to equal "asc" or "desc". Please follow the documentation.');
            return options;
        }
        if (typeof options[0] === 'string') {
            return direction === 'asc' ? options.sort() : options.sort().reverse();
        }
        if (!field || typeof field !== 'string') {
            console.error('typeaheadOrderBy field has to set according to the documentation.');
            return options;
        }
        return options.sort((a, b) => {
            const stringA = getValueFromObject(a, field);
            const stringB = getValueFromObject(b, field);
            if (stringA < stringB) {
                return direction === 'asc' ? -1 : 1;
            }
            if (stringA > stringB) {
                return direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
    }
    hasMatches() {
        return this._matches.length > 0;
    }
    checkDelimitersConflict() {
        if (this.typeaheadMultipleSearch && this.typeaheadSingleWords
            && (this.haveCommonCharacters(`${this.typeaheadPhraseDelimiters}${this.typeaheadWordDelimiters}`, this.typeaheadMultipleSearchDelimiters))) {
            throw new Error(`Delimiters used in typeaheadMultipleSearchDelimiters must be different
          from delimiters used in typeaheadWordDelimiters (current value: ${this.typeaheadWordDelimiters}) and
          typeaheadPhraseDelimiters (current value: ${this.typeaheadPhraseDelimiters}).
          Please refer to the documentation`);
        }
    }
    haveCommonCharacters(str1, str2) {
        for (let i = 0; i < str1.length; i++) {
            if (str1.charAt(i).indexOf(str2) > -1) {
                return true;
            }
        }
        return false;
    }
}
TypeaheadDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: TypeaheadDirective, deps: [{ token: i1.ComponentLoaderFactory }, { token: i2.TypeaheadConfig }, { token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i3.NgControl }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
TypeaheadDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.1", type: TypeaheadDirective, selector: "[typeahead]", inputs: { typeahead: "typeahead", typeaheadMinLength: "typeaheadMinLength", adaptivePosition: "adaptivePosition", isAnimated: "isAnimated", typeaheadWaitMs: "typeaheadWaitMs", typeaheadOptionsLimit: "typeaheadOptionsLimit", typeaheadOptionField: "typeaheadOptionField", typeaheadGroupField: "typeaheadGroupField", typeaheadOrderBy: "typeaheadOrderBy", typeaheadAsync: "typeaheadAsync", typeaheadLatinize: "typeaheadLatinize", typeaheadSingleWords: "typeaheadSingleWords", typeaheadWordDelimiters: "typeaheadWordDelimiters", typeaheadMultipleSearch: "typeaheadMultipleSearch", typeaheadMultipleSearchDelimiters: "typeaheadMultipleSearchDelimiters", typeaheadPhraseDelimiters: "typeaheadPhraseDelimiters", typeaheadItemTemplate: "typeaheadItemTemplate", optionsListTemplate: "optionsListTemplate", typeaheadScrollable: "typeaheadScrollable", typeaheadOptionsInScrollableView: "typeaheadOptionsInScrollableView", typeaheadHideResultsOnBlur: "typeaheadHideResultsOnBlur", typeaheadSelectFirstItem: "typeaheadSelectFirstItem", typeaheadIsFirstItemActive: "typeaheadIsFirstItemActive", container: "container", dropup: "dropup" }, outputs: { typeaheadLoading: "typeaheadLoading", typeaheadNoResults: "typeaheadNoResults", typeaheadOnSelect: "typeaheadOnSelect", typeaheadOnPreview: "typeaheadOnPreview", typeaheadOnBlur: "typeaheadOnBlur" }, host: { listeners: { "input": "onInput($event)", "keyup": "onChange($event)", "click": "onFocus()", "focus": "onFocus()", "blur": "onBlur()", "keydown": "onKeydown($event)" }, properties: { "attr.aria-activedescendant": "activeDescendant", "attr.aria-owns": "isOpen ? this._container.popupId : null", "attr.aria-expanded": "isOpen", "attr.aria-autocomplete": "list" } }, exportAs: ["bs-typeahead"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: TypeaheadDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[typeahead]',
                    exportAs: 'bs-typeahead',
                    // eslint-disable-next-line @angular-eslint/no-host-metadata-property
                    host: {
                        '[attr.aria-activedescendant]': 'activeDescendant',
                        '[attr.aria-owns]': 'isOpen ? this._container.popupId : null',
                        '[attr.aria-expanded]': 'isOpen',
                        '[attr.aria-autocomplete]': 'list'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i1.ComponentLoaderFactory }, { type: i2.TypeaheadConfig }, { type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i3.NgControl }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }]; }, propDecorators: { typeahead: [{
                type: Input
            }], typeaheadMinLength: [{
                type: Input
            }], adaptivePosition: [{
                type: Input
            }], isAnimated: [{
                type: Input
            }], typeaheadWaitMs: [{
                type: Input
            }], typeaheadOptionsLimit: [{
                type: Input
            }], typeaheadOptionField: [{
                type: Input
            }], typeaheadGroupField: [{
                type: Input
            }], typeaheadOrderBy: [{
                type: Input
            }], typeaheadAsync: [{
                type: Input
            }], typeaheadLatinize: [{
                type: Input
            }], typeaheadSingleWords: [{
                type: Input
            }], typeaheadWordDelimiters: [{
                type: Input
            }], typeaheadMultipleSearch: [{
                type: Input
            }], typeaheadMultipleSearchDelimiters: [{
                type: Input
            }], typeaheadPhraseDelimiters: [{
                type: Input
            }], typeaheadItemTemplate: [{
                type: Input
            }], optionsListTemplate: [{
                type: Input
            }], typeaheadScrollable: [{
                type: Input
            }], typeaheadOptionsInScrollableView: [{
                type: Input
            }], typeaheadHideResultsOnBlur: [{
                type: Input
            }], typeaheadSelectFirstItem: [{
                type: Input
            }], typeaheadIsFirstItemActive: [{
                type: Input
            }], typeaheadLoading: [{
                type: Output
            }], typeaheadNoResults: [{
                type: Output
            }], typeaheadOnSelect: [{
                type: Output
            }], typeaheadOnPreview: [{
                type: Output
            }], typeaheadOnBlur: [{
                type: Output
            }], container: [{
                type: Input
            }], dropup: [{
                type: Input
            }], 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onInput: [{
                type: HostListener,
                args: ['input', ['$event']]
            }], onChange: [{
                type: HostListener,
                args: ['keyup', ['$event']]
            }], onFocus: [{
                type: HostListener,
                args: ['click']
            }, {
                type: HostListener,
                args: ['focus']
            }], onBlur: [{
                type: HostListener,
                args: ['blur']
            }], onKeydown: [{
                type: HostListener,
                args: ['keydown', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZWFoZWFkLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy90eXBlYWhlYWQvdHlwZWFoZWFkLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFlBQVksRUFDWixLQUFLLEVBR0wsTUFBTSxFQUNOLFNBQVMsRUFDVCxXQUFXLEVBQ1gsZ0JBQWdCLEVBQ2pCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQW1CLHNCQUFzQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFFekYsT0FBTyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUE0QixNQUFNLE1BQU0sQ0FBQztBQUMzRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUd6RixPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUM5RSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFekQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUMzRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7Ozs7O0FBaUJyRCxNQUFNLE9BQU8sa0JBQWtCO0lBZ0o3QixZQUNFLEdBQTJCLEVBQzNCLE1BQXVCLEVBQ2YsZUFBa0MsRUFDbEMsT0FBbUIsRUFDbkIsU0FBb0IsRUFDcEIsUUFBbUIsRUFDM0IsZ0JBQWtDO1FBSjFCLG9CQUFlLEdBQWYsZUFBZSxDQUFtQjtRQUNsQyxZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQ25C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QUFLO2dCQUtHLHlCQUF5QjtzQkFBakMsS0FBSztnQkFJRyxxQkFBcUI7c0JBQTdCLEtBQUs7Z0JBSUcsbUJBQW1CO3NCQUEzQixLQUFLO2dCQUVHLG1CQUFtQjtzQkFBM0IsS0FBSztnQkFFRyxnQ0FBZ0M7c0JBQXhDLEtBQUs7Z0JBRUcsMEJBQTBCO3NCQUFsQyxLQUFLO2dCQUtHLHdCQUF3QjtzQkFBaEMsS0FBSztnQkFFRywwQkFBMEI7c0JBQWxDLEtBQUs7Z0JBSUksZ0JBQWdCO3NCQUF6QixNQUFNO2dCQUlHLGtCQUFrQjtzQkFBM0IsTUFBTTtnQkFFRyxpQkFBaUI7c0JBQTFCLE1BQU07Z0JBRUcsa0JBQWtCO3NCQUEzQixNQUFNO2dCQUVHLGVBQWU7c0JBQXhCLE1BQU07Z0JBS0UsU0FBUztzQkFBakIsS0FBSztnQkFHRyxNQUFNO3NCQUFkLEtBQUs7O1FBNkZOLDhEQUE4RDtRQUM5RCxPQUFPO3NCQUZOLFlBQVk7dUJBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDO2dCQXlCakMsUUFBUTtzQkFEUCxZQUFZO3VCQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQztnQkFxQ2pDLE9BQU87c0JBRk4sWUFBWTt1QkFBQyxPQUFPOztzQkFDcEIsWUFBWTt1QkFBQyxPQUFPO2dCQWNyQixNQUFNO3NCQURMLFlBQVk7dUJBQUMsTUFBTTtnQkFnQnBCLFNBQVM7c0JBRFIsWUFBWTt1QkFBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENoYW5nZURldGVjdG9yUmVmLFxyXG4gIERpcmVjdGl2ZSxcclxuICBFbGVtZW50UmVmLFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBIb3N0TGlzdGVuZXIsXHJcbiAgSW5wdXQsXHJcbiAgT25EZXN0cm95LFxyXG4gIE9uSW5pdCxcclxuICBPdXRwdXQsXHJcbiAgUmVuZGVyZXIyLFxyXG4gIFRlbXBsYXRlUmVmLFxyXG4gIFZpZXdDb250YWluZXJSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTmdDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBDb21wb25lbnRMb2FkZXIsIENvbXBvbmVudExvYWRlckZhY3RvcnkgfSBmcm9tICduZ3gtYm9vdHN0cmFwL2NvbXBvbmVudC1sb2FkZXInO1xyXG5cclxuaW1wb3J0IHsgRU1QVFksIGZyb20sIGlzT2JzZXJ2YWJsZSwgT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGRlYm91bmNlVGltZSwgZmlsdGVyLCBtZXJnZU1hcCwgc3dpdGNoTWFwLCB0YXAsIHRvQXJyYXkgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IFR5cGVhaGVhZE9wdGlvbkl0ZW1Db250ZXh0LCBUeXBlYWhlYWRPcHRpb25MaXN0Q29udGV4dCB9IGZyb20gJy4vbW9kZWxzJztcclxuXHJcbmltcG9ydCB7IFR5cGVhaGVhZENvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4vdHlwZWFoZWFkLWNvbnRhaW5lci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBUeXBlYWhlYWRNYXRjaCB9IGZyb20gJy4vdHlwZWFoZWFkLW1hdGNoLmNsYXNzJztcclxuaW1wb3J0IHsgVHlwZWFoZWFkT3JkZXIgfSBmcm9tICcuL3R5cGVhaGVhZC1vcmRlci5jbGFzcyc7XHJcbmltcG9ydCB7IGdldFZhbHVlRnJvbU9iamVjdCwgbGF0aW5pemUsIHRva2VuaXplIH0gZnJvbSAnLi90eXBlYWhlYWQtdXRpbHMnO1xyXG5pbXBvcnQgeyBUeXBlYWhlYWRDb25maWcgfSBmcm9tICcuL3R5cGVhaGVhZC5jb25maWcnO1xyXG5cclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXHJcbnR5cGUgVHlwZWFoZWFkT3B0aW9uID0gc3RyaW5nIHwgUmVjb3JkPHN0cmluZyB8IG51bWJlciwgYW55PjtcclxudHlwZSBUeXBlYWhlYWRPcHRpb25BcnIgPSBUeXBlYWhlYWRPcHRpb25bXSB8IE9ic2VydmFibGU8VHlwZWFoZWFkT3B0aW9uW10+O1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbdHlwZWFoZWFkXScsXHJcbiAgZXhwb3J0QXM6ICdicy10eXBlYWhlYWQnLFxyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvbm8taG9zdC1tZXRhZGF0YS1wcm9wZXJ0eVxyXG4gIGhvc3Q6IHtcclxuICAgICdbYXR0ci5hcmlhLWFjdGl2ZWRlc2NlbmRhbnRdJzogJ2FjdGl2ZURlc2NlbmRhbnQnLFxyXG4gICAgJ1thdHRyLmFyaWEtb3duc10nOiAnaXNPcGVuID8gdGhpcy5fY29udGFpbmVyLnBvcHVwSWQgOiBudWxsJyxcclxuICAgICdbYXR0ci5hcmlhLWV4cGFuZGVkXSc6ICdpc09wZW4nLFxyXG4gICAgJ1thdHRyLmFyaWEtYXV0b2NvbXBsZXRlXSc6ICdsaXN0J1xyXG4gIH1cclxufSlcclxuZXhwb3J0IGNsYXNzIFR5cGVhaGVhZERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICAvKiogb3B0aW9ucyBzb3VyY2UsIGNhbiBiZSBBcnJheSBvZiBzdHJpbmdzLCBvYmplY3RzIG9yXHJcbiAgICogYW4gT2JzZXJ2YWJsZSBmb3IgZXh0ZXJuYWwgbWF0Y2hpbmcgcHJvY2Vzc1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHR5cGVhaGVhZD86IFR5cGVhaGVhZE9wdGlvbkFycjtcclxuICAvKiogbWluaW1hbCBubyBvZiBjaGFyYWN0ZXJzIHRoYXQgbmVlZHMgdG8gYmUgZW50ZXJlZCBiZWZvcmVcclxuICAgKiB0eXBlYWhlYWQga2lja3MtaW4uIFdoZW4gc2V0IHRvIDAsIHR5cGVhaGVhZCBzaG93cyBvbiBmb2N1cyB3aXRoIGZ1bGxcclxuICAgKiBsaXN0IG9mIG9wdGlvbnMgKGxpbWl0ZWQgYXMgbm9ybWFsIGJ5IHR5cGVhaGVhZE9wdGlvbnNMaW1pdClcclxuICAgKi9cclxuICBASW5wdXQoKSB0eXBlYWhlYWRNaW5MZW5ndGggPSAxO1xyXG4gIC8qKiBzZXRzIHVzZSBhZGFwdGl2ZSBwb3NpdGlvbiAqL1xyXG4gIEBJbnB1dCgpIGFkYXB0aXZlUG9zaXRpb24gPSBmYWxzZTtcclxuICAvKiogdHVybiBvbi9vZmYgYW5pbWF0aW9uICovXHJcbiAgQElucHV0KCkgaXNBbmltYXRlZCA9IGZhbHNlO1xyXG4gIC8qKiBtaW5pbWFsIHdhaXQgdGltZSBhZnRlciBsYXN0IGNoYXJhY3RlciB0eXBlZCBiZWZvcmUgdHlwZWFoZWFkIGtpY2tzLWluICovXHJcbiAgQElucHV0KCkgdHlwZWFoZWFkV2FpdE1zID0gMDtcclxuICAvKiogbWF4aW11bSBsZW5ndGggb2Ygb3B0aW9ucyBpdGVtcyBsaXN0LiBUaGUgZGVmYXVsdCB2YWx1ZSBpcyAyMCAqL1xyXG4gIEBJbnB1dCgpIHR5cGVhaGVhZE9wdGlvbnNMaW1pdD86IG51bWJlcjtcclxuICAvKiogd2hlbiBvcHRpb25zIHNvdXJjZSBpcyBhbiBhcnJheSBvZiBvYmplY3RzLCB0aGUgbmFtZSBvZiBmaWVsZFxyXG4gICAqIHRoYXQgY29udGFpbnMgdGhlIG9wdGlvbnMgdmFsdWUsIHdlIHVzZSBhcnJheSBpdGVtIGFzIG9wdGlvbiBpbiBjYXNlXHJcbiAgICogb2YgdGhpcyBmaWVsZCBpcyBtaXNzaW5nLiBTdXBwb3J0cyBuZXN0ZWQgcHJvcGVydGllcyBhbmQgbWV0aG9kcy5cclxuICAgKi9cclxuICBASW5wdXQoKSB0eXBlYWhlYWRPcHRpb25GaWVsZD86IHN0cmluZztcclxuICAvKiogd2hlbiBvcHRpb25zIHNvdXJjZSBpcyBhbiBhcnJheSBvZiBvYmplY3RzLCB0aGUgbmFtZSBvZiBmaWVsZCB0aGF0XHJcbiAgICogY29udGFpbnMgdGhlIGdyb3VwIHZhbHVlLCBtYXRjaGVzIGFyZSBncm91cGVkIGJ5IHRoaXMgZmllbGQgd2hlbiBzZXQuXHJcbiAgICovXHJcbiAgQElucHV0KCkgdHlwZWFoZWFkR3JvdXBGaWVsZD86IHN0cmluZztcclxuICAvKiogVXNlZCB0byBzcGVjaWZ5IGEgY3VzdG9tIG9yZGVyIG9mIG1hdGNoZXMuIFdoZW4gb3B0aW9ucyBzb3VyY2UgaXMgYW4gYXJyYXkgb2Ygb2JqZWN0c1xyXG4gICAqIGEgZmllbGQgZm9yIHNvcnRpbmcgaGFzIHRvIGJlIHNldCB1cC4gSW4gY2FzZSBvZiBvcHRpb25zIHNvdXJjZSBpcyBhbiBhcnJheSBvZiBzdHJpbmcsXHJcbiAgICogYSBmaWVsZCBmb3Igc29ydGluZyBpcyBhYnNlbnQuIFRoZSBvcmRlcmluZyBkaXJlY3Rpb24gY291bGQgYmUgY2hhbmdlZCB0byBhc2NlbmRpbmcgb3IgZGVzY2VuZGluZy5cclxuICAgKi9cclxuICBASW5wdXQoKSB0eXBlYWhlYWRPcmRlckJ5PzogVHlwZWFoZWFkT3JkZXI7XHJcbiAgLyoqIHNob3VsZCBiZSB1c2VkIG9ubHkgaW4gY2FzZSBvZiB0eXBlYWhlYWQgYXR0cmlidXRlIGlzIE9ic2VydmFibGUgb2YgYXJyYXkuXHJcbiAgICogSWYgdHJ1ZSAtIGxvYWRpbmcgb2Ygb3B0aW9ucyB3aWxsIGJlIGFzeW5jLCBvdGhlcndpc2UgLSBzeW5jLlxyXG4gICAqIHRydWUgbWFrZSBzZW5zZSBpZiBvcHRpb25zIGFycmF5IGlzIGxhcmdlLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHR5cGVhaGVhZEFzeW5jPzogYm9vbGVhbjtcclxuICAvKiogbWF0Y2ggbGF0aW4gc3ltYm9scy5cclxuICAgKiBJZiB0cnVlIHRoZSB3b3JkIHPDunBlciB3b3VsZCBtYXRjaCBzdXBlciBhbmQgdmljZSB2ZXJzYS5cclxuICAgKi9cclxuICBASW5wdXQoKSB0eXBlYWhlYWRMYXRpbml6ZSA9IHRydWU7XHJcbiAgLyoqIENhbiBiZSB1c2UgdG8gc2VhcmNoIHdvcmRzIGJ5IGluc2VydGluZyBhIHNpbmdsZSB3aGl0ZSBzcGFjZSBiZXR3ZWVuIGVhY2ggY2hhcmFjdGVyc1xyXG4gICAqICBmb3IgZXhhbXBsZSAnQyBhIGwgaSBmIG8gciBuIGkgYScgd2lsbCBtYXRjaCAnQ2FsaWZvcm5pYScuXHJcbiAgICovXHJcbiAgQElucHV0KCkgdHlwZWFoZWFkU2luZ2xlV29yZHMgPSB0cnVlO1xyXG4gIC8qKiBzaG91bGQgYmUgdXNlZCBvbmx5IGluIGNhc2UgdHlwZWFoZWFkU2luZ2xlV29yZHMgYXR0cmlidXRlIGlzIHRydWUuXHJcbiAgICogU2V0cyB0aGUgd29yZCBkZWxpbWl0ZXIgdG8gYnJlYWsgd29yZHMuIERlZmF1bHRzIHRvIHNwYWNlLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHR5cGVhaGVhZFdvcmREZWxpbWl0ZXJzID0gJyAnO1xyXG4gIC8qKiBDYW4gYmUgdXNlZCB0byBjb25kdWN0IGEgc2VhcmNoIG9mIG11bHRpcGxlIGl0ZW1zIGFuZCBoYXZlIHN1Z2dlc3Rpb24gbm90IGZvciB0aGVcclxuICAgKiB3aG9sZSB2YWx1ZSBvZiB0aGUgaW5wdXQgYnV0IGZvciB0aGUgdmFsdWUgdGhhdCBjb21lcyBhZnRlciBhIGRlbGltaXRlciBwcm92aWRlZCB2aWFcclxuICAgKiB0eXBlYWhlYWRNdWx0aXBsZVNlYXJjaERlbGltaXRlcnMgYXR0cmlidXRlLiBUaGlzIG9wdGlvbiBjYW4gb25seSBiZSB1c2VkIHRvZ2V0aGVyIHdpdGhcclxuICAgKiB0eXBlYWhlYWRTaW5nbGVXb3JkcyBvcHRpb24gaWYgdHlwZWFoZWFkV29yZERlbGltaXRlcnMgYW5kIHR5cGVhaGVhZFBocmFzZURlbGltaXRlcnNcclxuICAgKiBhcmUgZGlmZmVyZW50IGZyb20gdHlwZWFoZWFkTXVsdGlwbGVTZWFyY2hEZWxpbWl0ZXJzIHRvIGF2b2lkIGNvbmZsaWN0IGluIGRldGVybWluaW5nXHJcbiAgICogd2hlbiB0byBkZWxpbWl0IG11bHRpcGxlIHNlYXJjaGVzIGFuZCB3aGVuIGEgc2luZ2xlIHdvcmQuXHJcbiAgICovXHJcbiAgQElucHV0KCkgdHlwZWFoZWFkTXVsdGlwbGVTZWFyY2g/OiBib29sZWFuO1xyXG4gIC8qKiBzaG91bGQgYmUgdXNlZCBvbmx5IGluIGNhc2UgdHlwZWFoZWFkTXVsdGlwbGVTZWFyY2ggYXR0cmlidXRlIGlzIHRydWUuXHJcbiAgICogU2V0cyB0aGUgbXVsdGlwbGUgc2VhcmNoIGRlbGltaXRlciB0byBrbm93IHdoZW4gdG8gc3RhcnQgYSBuZXcgc2VhcmNoLiBEZWZhdWx0cyB0byBjb21tYS5cclxuICAgKiBJZiBzcGFjZSBuZWVkcyB0byBiZSB1c2VkLCB0aGVuIGV4cGxpY2l0bHkgc2V0IHR5cGVhaGVhZFdvcmREZWxpbWl0ZXJzIHRvIHNvbWV0aGluZyBlbHNlIHRoYW4gc3BhY2VcclxuICAgKiBiZWNhdXNlIHNwYWNlIGlzIHVzZWQgYnkgZGVmYXVsdCBPUiBzZXQgdHlwZWFoZWFkU2luZ2xlV29yZHMgYXR0cmlidXRlIHRvIGZhbHNlIGlmIHlvdSBkb24ndCBuZWVkXHJcbiAgICogdG8gdXNlIGl0IHRvZ2V0aGVyIHdpdGggbXVsdGlwbGUgc2VhcmNoLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHR5cGVhaGVhZE11bHRpcGxlU2VhcmNoRGVsaW1pdGVycyA9ICcsJztcclxuICAvKiogc2hvdWxkIGJlIHVzZWQgb25seSBpbiBjYXNlIHR5cGVhaGVhZFNpbmdsZVdvcmRzIGF0dHJpYnV0ZSBpcyB0cnVlLlxyXG4gICAqIFNldHMgdGhlIHdvcmQgZGVsaW1pdGVyIHRvIG1hdGNoIGV4YWN0IHBocmFzZS5cclxuICAgKiBEZWZhdWx0cyB0byBzaW1wbGUgYW5kIGRvdWJsZSBxdW90ZXMuXHJcbiAgICovXHJcbiAgQElucHV0KCkgdHlwZWFoZWFkUGhyYXNlRGVsaW1pdGVycyA9ICdcXCdcIic7XHJcbiAgLyoqIHVzZWQgdG8gc3BlY2lmeSBhIGN1c3RvbSBpdGVtIHRlbXBsYXRlLlxyXG4gICAqIFRlbXBsYXRlIHZhcmlhYmxlcyBleHBvc2VkIGFyZSBjYWxsZWQgaXRlbSBhbmQgaW5kZXg7XHJcbiAgICovXHJcbiAgQElucHV0KCkgdHlwZWFoZWFkSXRlbVRlbXBsYXRlPzogVGVtcGxhdGVSZWY8VHlwZWFoZWFkT3B0aW9uSXRlbUNvbnRleHQ+O1xyXG4gIC8qKiB1c2VkIHRvIHNwZWNpZnkgYSBjdXN0b20gb3B0aW9ucyBsaXN0IHRlbXBsYXRlLlxyXG4gICAqIFRlbXBsYXRlIHZhcmlhYmxlczogbWF0Y2hlcywgaXRlbVRlbXBsYXRlLCBxdWVyeVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIG9wdGlvbnNMaXN0VGVtcGxhdGU/OiBUZW1wbGF0ZVJlZjxUeXBlYWhlYWRPcHRpb25MaXN0Q29udGV4dD47XHJcbiAgLyoqIHNwZWNpZmllcyBpZiB0eXBlYWhlYWQgaXMgc2Nyb2xsYWJsZSAgKi9cclxuICBASW5wdXQoKSB0eXBlYWhlYWRTY3JvbGxhYmxlID0gZmFsc2U7XHJcbiAgLyoqIHNwZWNpZmllcyBudW1iZXIgb2Ygb3B0aW9ucyB0byBzaG93IGluIHNjcm9sbCB2aWV3ICAqL1xyXG4gIEBJbnB1dCgpIHR5cGVhaGVhZE9wdGlvbnNJblNjcm9sbGFibGVWaWV3ID0gNTtcclxuICAvKiogdXNlZCB0byBoaWRlIHJlc3VsdCBvbiBibHVyICovXHJcbiAgQElucHV0KCkgdHlwZWFoZWFkSGlkZVJlc3VsdHNPbkJsdXI/OiBib29sZWFuO1xyXG4gIC8qKiBmaXJlZCB3aGVuIGFuIG9wdGlvbnMgbGlzdCB3YXMgb3BlbmVkIGFuZCB0aGUgdXNlciBjbGlja2VkIFRhYlxyXG4gICAqIElmIGEgdmFsdWUgZXF1YWwgdHJ1ZSwgaXQgd2lsbCBiZSBjaG9zZW4gZmlyc3Qgb3IgYWN0aXZlIGl0ZW0gaW4gdGhlIGxpc3RcclxuICAgKiBJZiB2YWx1ZSBlcXVhbCBmYWxzZSwgaXQgd2lsbCBiZSBjaG9zZW4gYW4gYWN0aXZlIGl0ZW0gaW4gdGhlIGxpc3Qgb3Igbm90aGluZ1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHR5cGVhaGVhZFNlbGVjdEZpcnN0SXRlbSA9IHRydWU7XHJcbiAgLyoqIG1ha2VzIGFjdGl2ZSBmaXJzdCBpdGVtIGluIGEgbGlzdCAqL1xyXG4gIEBJbnB1dCgpIHR5cGVhaGVhZElzRmlyc3RJdGVtQWN0aXZlID0gdHJ1ZTtcclxuICAvKiogZmlyZWQgd2hlbiAnYnVzeScgc3RhdGUgb2YgdGhpcyBjb21wb25lbnQgd2FzIGNoYW5nZWQsXHJcbiAgICogZmlyZWQgb24gYXN5bmMgbW9kZSBvbmx5LCByZXR1cm5zIGJvb2xlYW5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgdHlwZWFoZWFkTG9hZGluZyA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcclxuICAvKiogZmlyZWQgb24gZXZlcnkga2V5IGV2ZW50IGFuZCByZXR1cm5zIHRydWVcclxuICAgKiBpbiBjYXNlIG9mIG1hdGNoZXMgYXJlIG5vdCBkZXRlY3RlZFxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSB0eXBlYWhlYWROb1Jlc3VsdHMgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XHJcbiAgLyoqIGZpcmVkIHdoZW4gb3B0aW9uIHdhcyBzZWxlY3RlZCwgcmV0dXJuIG9iamVjdCB3aXRoIGRhdGEgb2YgdGhpcyBvcHRpb24uICovXHJcbiAgQE91dHB1dCgpIHR5cGVhaGVhZE9uU2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcjxUeXBlYWhlYWRNYXRjaD4oKTtcclxuICAvKiogZmlyZWQgd2hlbiBvcHRpb24gd2FzIHByZXZpZXdlZCwgcmV0dXJuIG9iamVjdCB3aXRoIGRhdGEgb2YgdGhpcyBvcHRpb24uICovXHJcbiAgQE91dHB1dCgpIHR5cGVhaGVhZE9uUHJldmlldyA9IG5ldyBFdmVudEVtaXR0ZXI8VHlwZWFoZWFkTWF0Y2g+KCk7XHJcbiAgLyoqIGZpcmVkIHdoZW4gYmx1ciBldmVudCBvY2N1cnMuIHJldHVybnMgdGhlIGFjdGl2ZSBpdGVtICovXHJcbiAgQE91dHB1dCgpIHR5cGVhaGVhZE9uQmx1ciA9IG5ldyBFdmVudEVtaXR0ZXI8VHlwZWFoZWFkTWF0Y2g+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgc2VsZWN0b3Igc3BlY2lmeWluZyB0aGUgZWxlbWVudCB0aGUgdHlwZWFoZWFkIHNob3VsZCBiZSBhcHBlbmRlZCB0by5cclxuICAgKi9cclxuICBASW5wdXQoKSBjb250YWluZXI/OiBzdHJpbmc7XHJcblxyXG4gIC8qKiBUaGlzIGF0dHJpYnV0ZSBpbmRpY2F0ZXMgdGhhdCB0aGUgZHJvcGRvd24gc2hvdWxkIGJlIG9wZW5lZCB1cHdhcmRzICovXHJcbiAgQElucHV0KCkgZHJvcHVwID0gZmFsc2U7XHJcblxyXG4gIC8vIG5vdCB5ZXQgaW1wbGVtZW50ZWRcclxuICAvKiogaWYgZmFsc2UgcmVzdHJpY3QgbW9kZWwgdmFsdWVzIHRvIHRoZSBvbmVzIHNlbGVjdGVkIGZyb20gdGhlIHBvcHVwIG9ubHkgd2lsbCBiZSBwcm92aWRlZCAqL1xyXG4gIC8vIEBJbnB1dCgpIHByb3RlY3RlZCB0eXBlYWhlYWRFZGl0YWJsZTpib29sZWFuO1xyXG4gIC8qKiBpZiBmYWxzZSB0aGUgZmlyc3QgbWF0Y2ggYXV0b21hdGljYWxseSB3aWxsIG5vdCBiZSBmb2N1c2VkIGFzIHlvdSB0eXBlICovXHJcbiAgLy8gQElucHV0KCkgcHJvdGVjdGVkIHR5cGVhaGVhZEZvY3VzRmlyc3Q6Ym9vbGVhbjtcclxuICAvKiogZm9ybWF0IHRoZSBuZy1tb2RlbCByZXN1bHQgYWZ0ZXIgc2VsZWN0aW9uICovXHJcbiAgLy8gQElucHV0KCkgcHJvdGVjdGVkIHR5cGVhaGVhZElucHV0Rm9ybWF0dGVyOmFueTtcclxuICAvKiogaWYgdHJ1ZSBhdXRvbWF0aWNhbGx5IHNlbGVjdCBhbiBpdGVtIHdoZW4gdGhlcmUgaXMgb25lIG9wdGlvbiB0aGF0IGV4YWN0bHkgbWF0Y2hlcyB0aGUgdXNlciBpbnB1dCAqL1xyXG4gIC8vIEBJbnB1dCgpIHByb3RlY3RlZCB0eXBlYWhlYWRTZWxlY3RPbkV4YWN0OmJvb2xlYW47XHJcbiAgLyoqICBpZiB0cnVlIHNlbGVjdCB0aGUgY3VycmVudGx5IGhpZ2hsaWdodGVkIG1hdGNoIG9uIGJsdXIgKi9cclxuICAvLyBASW5wdXQoKSBwcm90ZWN0ZWQgdHlwZWFoZWFkU2VsZWN0T25CbHVyOmJvb2xlYW47XHJcbiAgLyoqICBpZiBmYWxzZSBkb24ndCBmb2N1cyB0aGUgaW5wdXQgZWxlbWVudCB0aGUgdHlwZWFoZWFkIGRpcmVjdGl2ZSBpcyBhc3NvY2lhdGVkIHdpdGggb24gc2VsZWN0aW9uICovXHJcbiAgICAvLyBASW5wdXQoKSBwcm90ZWN0ZWQgdHlwZWFoZWFkRm9jdXNPblNlbGVjdDpib29sZWFuO1xyXG5cclxuICBhY3RpdmVEZXNjZW5kYW50Pzogc3RyaW5nO1xyXG4gIGlzT3BlbiA9IGZhbHNlO1xyXG4gIGxpc3QgPSAnbGlzdCc7XHJcbiAgX2NvbnRhaW5lcj86IFR5cGVhaGVhZENvbnRhaW5lckNvbXBvbmVudDtcclxuICBpc0FjdGl2ZUl0ZW1DaGFuZ2VkID0gZmFsc2U7XHJcbiAgaXNGb2N1c2VkID0gZmFsc2U7XHJcbiAgY2FuY2VsUmVxdWVzdE9uRm9jdXNMb3N0ID0gZmFsc2U7XHJcbiAgc2VsZWN0SXRlbU9uQmx1ciA9IGZhbHNlO1xyXG4gIHByb3RlY3RlZCBrZXlVcEV2ZW50RW1pdHRlciA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xyXG4gIHByb3RlY3RlZCBwbGFjZW1lbnQgPSAnYm90dG9tIGxlZnQnO1xyXG4gIHByb3RlY3RlZCBfbWF0Y2hlczogVHlwZWFoZWFkTWF0Y2hbXSA9IFtdO1xyXG5cclxuICBwcml2YXRlIF90eXBlYWhlYWQ6IENvbXBvbmVudExvYWRlcjxUeXBlYWhlYWRDb250YWluZXJDb21wb25lbnQ+O1xyXG4gIHByaXZhdGUgX3N1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XHJcbiAgcHJpdmF0ZSBfYWxsRW50ZXJlZFZhbHVlPzogc3RyaW5nO1xyXG4gIHByaXZhdGUgX291dHNpZGVDbGlja0xpc3RlbmVyOiAoKSA9PiB2b2lkID0gKCkgPT4gdm9pZCAwO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIGNpczogQ29tcG9uZW50TG9hZGVyRmFjdG9yeSxcclxuICAgIGNvbmZpZzogVHlwZWFoZWFkQ29uZmlnLFxyXG4gICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdG9yUmVmLFxyXG4gICAgcHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmLFxyXG4gICAgcHJpdmF0ZSBuZ0NvbnRyb2w6IE5nQ29udHJvbCxcclxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcclxuICAgIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWZcclxuICApIHtcclxuXHJcbiAgICB0aGlzLl90eXBlYWhlYWQgPSBjaXMuY3JlYXRlTG9hZGVyPFR5cGVhaGVhZENvbnRhaW5lckNvbXBvbmVudD4oXHJcbiAgICAgIGVsZW1lbnQsXHJcbiAgICAgIHZpZXdDb250YWluZXJSZWYsXHJcbiAgICAgIHJlbmRlcmVyXHJcbiAgICApXHJcbiAgICAgIC5wcm92aWRlKHsgcHJvdmlkZTogVHlwZWFoZWFkQ29uZmlnLCB1c2VWYWx1ZTogY29uZmlnIH0pO1xyXG5cclxuICAgIE9iamVjdC5hc3NpZ24odGhpcyxcclxuICAgICAge1xyXG4gICAgICAgIHR5cGVhaGVhZEhpZGVSZXN1bHRzT25CbHVyOiBjb25maWcuaGlkZVJlc3VsdHNPbkJsdXIsXHJcbiAgICAgICAgY2FuY2VsUmVxdWVzdE9uRm9jdXNMb3N0OiBjb25maWcuY2FuY2VsUmVxdWVzdE9uRm9jdXNMb3N0LFxyXG4gICAgICAgIHR5cGVhaGVhZFNlbGVjdEZpcnN0SXRlbTogY29uZmlnLnNlbGVjdEZpcnN0SXRlbSxcclxuICAgICAgICB0eXBlYWhlYWRJc0ZpcnN0SXRlbUFjdGl2ZTogY29uZmlnLmlzRmlyc3RJdGVtQWN0aXZlLFxyXG4gICAgICAgIHR5cGVhaGVhZE1pbkxlbmd0aDogY29uZmlnLm1pbkxlbmd0aCxcclxuICAgICAgICBhZGFwdGl2ZVBvc2l0aW9uOiBjb25maWcuYWRhcHRpdmVQb3NpdGlvbixcclxuICAgICAgICBpc0FuaW1hdGVkOiBjb25maWcuaXNBbmltYXRlZCxcclxuICAgICAgICBzZWxlY3RJdGVtT25CbHVyOiBjb25maWcuc2VsZWN0SXRlbU9uQmx1clxyXG4gICAgICB9XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgZ2V0IG1hdGNoZXMoKTogVHlwZWFoZWFkTWF0Y2hbXSB7XHJcbiAgICByZXR1cm4gdGhpcy5fbWF0Y2hlcztcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy50eXBlYWhlYWRPcHRpb25zTGltaXQgPSB0aGlzLnR5cGVhaGVhZE9wdGlvbnNMaW1pdCB8fCAyMDtcclxuXHJcbiAgICB0aGlzLnR5cGVhaGVhZE1pbkxlbmd0aCA9XHJcbiAgICAgIHRoaXMudHlwZWFoZWFkTWluTGVuZ3RoID09PSB2b2lkIDAgPyAxIDogdGhpcy50eXBlYWhlYWRNaW5MZW5ndGg7XHJcblxyXG4gICAgLy8gYXN5bmMgc2hvdWxkIGJlIGZhbHNlIGluIGNhc2Ugb2YgYXJyYXlcclxuICAgIGlmICh0aGlzLnR5cGVhaGVhZEFzeW5jID09PSB1bmRlZmluZWQgJiYgIShpc09ic2VydmFibGUodGhpcy50eXBlYWhlYWQpKSkge1xyXG4gICAgICB0aGlzLnR5cGVhaGVhZEFzeW5jID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGlzT2JzZXJ2YWJsZSh0aGlzLnR5cGVhaGVhZCkpIHtcclxuICAgICAgdGhpcy50eXBlYWhlYWRBc3luYyA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMudHlwZWFoZWFkQXN5bmMpIHtcclxuICAgICAgdGhpcy5hc3luY0FjdGlvbnMoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuc3luY0FjdGlvbnMoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmNoZWNrRGVsaW1pdGVyc0NvbmZsaWN0KCk7XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdpbnB1dCcsIFsnJGV2ZW50J10pXHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuICBvbklucHV0KGU6IGFueSk6IHZvaWQge1xyXG4gICAgLy8gRm9yIGA8aW5wdXQ+YHMsIHVzZSB0aGUgYHZhbHVlYCBwcm9wZXJ0eS4gRm9yIG90aGVycyB0aGF0IGRvbid0IGhhdmUgYVxyXG4gICAgLy8gYHZhbHVlYCAoc3VjaCBhcyBgPHNwYW4gY29udGVudGVkaXRhYmxlPVwidHJ1ZVwiPmApLCB1c2UgZWl0aGVyXHJcbiAgICAvLyBgdGV4dENvbnRlbnRgIG9yIGBpbm5lclRleHRgIChkZXBlbmRpbmcgb24gd2hpY2ggb25lIGlzIHN1cHBvcnRlZCwgaS5lLlxyXG4gICAgLy8gRmlyZWZveCBvciBJRSkuXHJcbiAgICBjb25zdCB2YWx1ZSA9XHJcbiAgICAgIGUudGFyZ2V0LnZhbHVlICE9PSB1bmRlZmluZWRcclxuICAgICAgICA/IGUudGFyZ2V0LnZhbHVlXHJcbiAgICAgICAgOiBlLnRhcmdldC50ZXh0Q29udGVudCAhPT0gdW5kZWZpbmVkXHJcbiAgICAgICAgPyBlLnRhcmdldC50ZXh0Q29udGVudFxyXG4gICAgICAgIDogZS50YXJnZXQuaW5uZXJUZXh0O1xyXG5cclxuICAgIGlmICh2YWx1ZSAhPSBudWxsICYmIHZhbHVlLnRyaW0oKS5sZW5ndGggPj0gdGhpcy50eXBlYWhlYWRNaW5MZW5ndGgpIHtcclxuICAgICAgdGhpcy50eXBlYWhlYWRMb2FkaW5nLmVtaXQodHJ1ZSk7XHJcbiAgICAgIHRoaXMua2V5VXBFdmVudEVtaXR0ZXIuZW1pdChlLnRhcmdldC52YWx1ZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnR5cGVhaGVhZExvYWRpbmcuZW1pdChmYWxzZSk7XHJcbiAgICAgIHRoaXMudHlwZWFoZWFkTm9SZXN1bHRzLmVtaXQoZmFsc2UpO1xyXG4gICAgICB0aGlzLmhpZGUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2tleXVwJywgWyckZXZlbnQnXSlcclxuICBvbkNoYW5nZShldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuX2NvbnRhaW5lcikge1xyXG4gICAgICAvLyBlc2NcclxuICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDI3IHx8IGV2ZW50LmtleSA9PT0gJ0VzY2FwZScpIHtcclxuICAgICAgICB0aGlzLmhpZGUoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyB1cFxyXG4gICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzggfHwgZXZlbnQua2V5ID09PSAnQXJyb3dVcCcpIHtcclxuICAgICAgICB0aGlzLmlzQWN0aXZlSXRlbUNoYW5nZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX2NvbnRhaW5lci5wcmV2QWN0aXZlTWF0Y2goKTtcclxuXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBkb3duXHJcbiAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSA0MCB8fCBldmVudC5rZXkgPT09ICdBcnJvd0Rvd24nKSB7XHJcbiAgICAgICAgdGhpcy5pc0FjdGl2ZUl0ZW1DaGFuZ2VkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9jb250YWluZXIubmV4dEFjdGl2ZU1hdGNoKCk7XHJcblxyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gZW50ZXJcclxuICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDEzIHx8IGV2ZW50LmtleSA9PT0gJ0VudGVyJykge1xyXG4gICAgICAgIHRoaXMuX2NvbnRhaW5lci5zZWxlY3RBY3RpdmVNYXRjaCgpO1xyXG5cclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcclxuICBASG9zdExpc3RlbmVyKCdmb2N1cycpXHJcbiAgb25Gb2N1cygpOiB2b2lkIHtcclxuICAgIHRoaXMuaXNGb2N1c2VkID0gdHJ1ZTtcclxuICAgIC8vIGFkZCBzZXRUaW1lb3V0IHRvIGZpeCBpc3N1ZSAjNTI1MVxyXG4gICAgLy8gdG8gZ2V0IGFuZCBlbWl0IHVwZGF0ZWQgdmFsdWUgaWYgaXQncyBjaGFuZ2VkIG9uIGZvY3VzXHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgaWYgKHRoaXMudHlwZWFoZWFkTWluTGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgdGhpcy50eXBlYWhlYWRMb2FkaW5nLmVtaXQodHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5rZXlVcEV2ZW50RW1pdHRlci5lbWl0KHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnZhbHVlIHx8ICcnKTtcclxuICAgICAgfVxyXG4gICAgfSwgMCk7XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdibHVyJylcclxuICBvbkJsdXIoKTogdm9pZCB7XHJcbiAgICB0aGlzLmlzRm9jdXNlZCA9IGZhbHNlO1xyXG4gICAgaWYgKHRoaXMuX2NvbnRhaW5lciAmJiAhdGhpcy5fY29udGFpbmVyLmlzRm9jdXNlZCkge1xyXG4gICAgICB0aGlzLnR5cGVhaGVhZE9uQmx1ci5lbWl0KHRoaXMuX2NvbnRhaW5lci5hY3RpdmUpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghdGhpcy5jb250YWluZXIgJiYgdGhpcy5fbWF0Y2hlcz8ubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHRoaXMudHlwZWFoZWFkT25CbHVyLmVtaXQobmV3IFR5cGVhaGVhZE1hdGNoKFxyXG4gICAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnZhbHVlLFxyXG4gICAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnZhbHVlLFxyXG4gICAgICAgIGZhbHNlKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdrZXlkb3duJywgWyckZXZlbnQnXSlcclxuICBvbktleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcclxuICAgIC8vIG5vIGNvbnRhaW5lciAtIG5vIHByb2JsZW1zXHJcbiAgICBpZiAoIXRoaXMuX2NvbnRhaW5lcikge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDkgfHwgZXZlbnQua2V5ID09PSAnVGFiJykge1xyXG4gICAgICB0aGlzLm9uQmx1cigpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChldmVudC5rZXlDb2RlID09PSA5IHx8IGV2ZW50LmtleSA9PT0gJ1RhYicgfHwgZXZlbnQua2V5Q29kZSA9PT0gMTMgfHwgZXZlbnQua2V5ID09PSAnRW50ZXInKSB7XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGlmICh0aGlzLnR5cGVhaGVhZFNlbGVjdEZpcnN0SXRlbSkge1xyXG4gICAgICAgIHRoaXMuX2NvbnRhaW5lci5zZWxlY3RBY3RpdmVNYXRjaCgpO1xyXG5cclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICghdGhpcy50eXBlYWhlYWRTZWxlY3RGaXJzdEl0ZW0pIHtcclxuICAgICAgICB0aGlzLl9jb250YWluZXIuc2VsZWN0QWN0aXZlTWF0Y2godGhpcy5pc0FjdGl2ZUl0ZW1DaGFuZ2VkKTtcclxuICAgICAgICB0aGlzLmlzQWN0aXZlSXRlbUNoYW5nZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmhpZGUoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY2hhbmdlTW9kZWwobWF0Y2g/OiBUeXBlYWhlYWRNYXRjaCk6IHZvaWQge1xyXG4gICAgaWYgKCFtYXRjaCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBsZXQgdmFsdWVTdHI6IHN0cmluZztcclxuICAgIGlmICh0aGlzLnR5cGVhaGVhZE11bHRpcGxlU2VhcmNoICYmIHRoaXMuX2FsbEVudGVyZWRWYWx1ZSkge1xyXG4gICAgICBjb25zdCB0b2tlbnMgPSB0aGlzLl9hbGxFbnRlcmVkVmFsdWUuc3BsaXQobmV3IFJlZ0V4cChgKFske3RoaXMudHlwZWFoZWFkTXVsdGlwbGVTZWFyY2hEZWxpbWl0ZXJzfV0rKWApKTtcclxuICAgICAgdGhpcy5fYWxsRW50ZXJlZFZhbHVlID0gdG9rZW5zLnNsaWNlKDAsIHRva2Vucy5sZW5ndGggLSAxKS5jb25jYXQobWF0Y2gudmFsdWUpLmpvaW4oJycpO1xyXG4gICAgICB2YWx1ZVN0ciA9IHRoaXMuX2FsbEVudGVyZWRWYWx1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhbHVlU3RyID0gbWF0Y2gudmFsdWU7XHJcbiAgICB9XHJcbiAgICB0aGlzLm5nQ29udHJvbC52aWV3VG9Nb2RlbFVwZGF0ZSh2YWx1ZVN0cik7XHJcbiAgICB0aGlzLm5nQ29udHJvbC5jb250cm9sPy5zZXRWYWx1ZSh2YWx1ZVN0cik7XHJcbiAgICB0aGlzLmNoYW5nZURldGVjdGlvbi5tYXJrRm9yQ2hlY2soKTtcclxuICAgIHRoaXMuaGlkZSgpO1xyXG4gIH1cclxuXHJcbiAgc2hvdygpOiB2b2lkIHtcclxuICAgIHRoaXMuX3R5cGVhaGVhZFxyXG4gICAgICAuYXR0YWNoKFR5cGVhaGVhZENvbnRhaW5lckNvbXBvbmVudClcclxuICAgICAgLnRvKHRoaXMuY29udGFpbmVyKVxyXG4gICAgICAucG9zaXRpb24oeyBhdHRhY2htZW50OiBgJHt0aGlzLmRyb3B1cCA/ICd0b3AnIDogJ2JvdHRvbSd9IGxlZnRgIH0pXHJcbiAgICAgIC5zaG93KHtcclxuICAgICAgICB0eXBlYWhlYWRSZWY6IHRoaXMsXHJcbiAgICAgICAgcGxhY2VtZW50OiB0aGlzLnBsYWNlbWVudCxcclxuICAgICAgICBhbmltYXRpb246IGZhbHNlLFxyXG4gICAgICAgIGRyb3B1cDogdGhpcy5kcm9wdXBcclxuICAgICAgfSk7XHJcblxyXG4gICAgdGhpcy5fb3V0c2lkZUNsaWNrTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyXHJcbiAgICAgIC5saXN0ZW4oJ2RvY3VtZW50JywgJ2NsaWNrJywgKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMudHlwZWFoZWFkTWluTGVuZ3RoID09PSAwICYmIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIHtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0aGlzLnR5cGVhaGVhZEhpZGVSZXN1bHRzT25CbHVyIHx8IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIHtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5vbk91dHNpZGVDbGljaygpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICBpZiAoIXRoaXMuX3R5cGVhaGVhZC5pbnN0YW5jZSB8fCAhdGhpcy5uZ0NvbnRyb2wuY29udHJvbCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fY29udGFpbmVyID0gdGhpcy5fdHlwZWFoZWFkLmluc3RhbmNlO1xyXG4gICAgdGhpcy5fY29udGFpbmVyLnBhcmVudCA9IHRoaXM7XHJcbiAgICAvLyBUaGlzIGltcHJvdmVzIHRoZSBzcGVlZCBhcyBpdCB3b24ndCBoYXZlIHRvIGJlIGRvbmUgZm9yIGVhY2ggbGlzdCBpdGVtXHJcblxyXG4gICAgY29uc3Qgbm9ybWFsaXplZFF1ZXJ5ID0gKHRoaXMudHlwZWFoZWFkTGF0aW5pemVcclxuICAgICAgPyBsYXRpbml6ZSh0aGlzLm5nQ29udHJvbC5jb250cm9sLnZhbHVlKVxyXG4gICAgICA6IHRoaXMubmdDb250cm9sLmNvbnRyb2wudmFsdWUpXHJcbiAgICAgIC50b1N0cmluZygpXHJcbiAgICAgIC50b0xvd2VyQ2FzZSgpO1xyXG5cclxuICAgIHRoaXMuX2NvbnRhaW5lci5xdWVyeSA9IHRoaXMudG9rZW5pemVRdWVyeShub3JtYWxpemVkUXVlcnkpO1xyXG5cclxuICAgIHRoaXMuX2NvbnRhaW5lci5tYXRjaGVzID0gdGhpcy5fbWF0Y2hlcztcclxuICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XHJcblxyXG4gICAgdGhpcy5fY29udGFpbmVyLmFjdGl2ZUNoYW5nZUV2ZW50LnN1YnNjcmliZSgoYWN0aXZlSWQ6IHN0cmluZykgPT4ge1xyXG4gICAgICB0aGlzLmFjdGl2ZURlc2NlbmRhbnQgPSBhY3RpdmVJZDtcclxuICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rpb24ubWFya0ZvckNoZWNrKCk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuaXNPcGVuID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIGhpZGUoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5fdHlwZWFoZWFkLmlzU2hvd24pIHtcclxuICAgICAgdGhpcy5fdHlwZWFoZWFkLmhpZGUoKTtcclxuICAgICAgdGhpcy5fb3V0c2lkZUNsaWNrTGlzdGVuZXIoKTtcclxuICAgICAgdGhpcy5fY29udGFpbmVyID0gdm9pZCAwO1xyXG4gICAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xyXG4gICAgICB0aGlzLmNoYW5nZURldGVjdGlvbi5tYXJrRm9yQ2hlY2soKTtcclxuICAgIH1cclxuICAgIHRoaXMudHlwZWFoZWFkT25QcmV2aWV3LmVtaXQoKTtcclxuICB9XHJcblxyXG4gIG9uT3V0c2lkZUNsaWNrKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuX2NvbnRhaW5lciAmJiAhdGhpcy5fY29udGFpbmVyLmlzRm9jdXNlZCkge1xyXG4gICAgICB0aGlzLmhpZGUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgLy8gY2xlYW4gdXAgc3Vic2NyaXB0aW9uc1xyXG4gICAgZm9yIChjb25zdCBzdWIgb2YgdGhpcy5fc3Vic2NyaXB0aW9ucykge1xyXG4gICAgICBzdWIudW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuICAgIHRoaXMuX3R5cGVhaGVhZC5kaXNwb3NlKCk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgYXN5bmNBY3Rpb25zKCk6IHZvaWQge1xyXG4gICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5wdXNoKFxyXG4gICAgICB0aGlzLmtleVVwRXZlbnRFbWl0dGVyXHJcbiAgICAgICAgLnBpcGUoXHJcbiAgICAgICAgICBkZWJvdW5jZVRpbWU8c3RyaW5nPih0aGlzLnR5cGVhaGVhZFdhaXRNcyksXHJcbiAgICAgICAgICB0YXAodmFsdWUgPT4gdGhpcy5fYWxsRW50ZXJlZFZhbHVlID0gdmFsdWUpLFxyXG4gICAgICAgICAgc3dpdGNoTWFwKCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnR5cGVhaGVhZCkge1xyXG4gICAgICAgICAgICAgIHJldHVybiBFTVBUWTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy50eXBlYWhlYWQ7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIClcclxuICAgICAgICAuc3Vic2NyaWJlKChtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmZpbmFsaXplQXN5bmNDYWxsKG1hdGNoZXMpO1xyXG4gICAgICAgIH0pXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIHN5bmNBY3Rpb25zKCk6IHZvaWQge1xyXG4gICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5wdXNoKFxyXG4gICAgICB0aGlzLmtleVVwRXZlbnRFbWl0dGVyXHJcbiAgICAgICAgLnBpcGUoXHJcbiAgICAgICAgICBkZWJvdW5jZVRpbWU8c3RyaW5nPih0aGlzLnR5cGVhaGVhZFdhaXRNcyksXHJcbiAgICAgICAgICBtZXJnZU1hcCgodmFsdWU6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9hbGxFbnRlcmVkVmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgY29uc3Qgbm9ybWFsaXplZFF1ZXJ5ID0gdGhpcy5ub3JtYWxpemVRdWVyeSh2YWx1ZSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXRoaXMudHlwZWFoZWFkKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIEVNUFRZO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCB0eXBlYWhlYWQgPSBpc09ic2VydmFibGUodGhpcy50eXBlYWhlYWQpID8gdGhpcy50eXBlYWhlYWQgOiBmcm9tKHRoaXMudHlwZWFoZWFkKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0eXBlYWhlYWRcclxuICAgICAgICAgICAgICAucGlwZShcclxuICAgICAgICAgICAgICAgIGZpbHRlcigob3B0aW9uOiBUeXBlYWhlYWRPcHRpb24pID0+IHtcclxuICAgICAgICAgICAgICAgICAgcmV0dXJuICEhb3B0aW9uICYmIHRoaXMudGVzdE1hdGNoKHRoaXMubm9ybWFsaXplT3B0aW9uKG9wdGlvbiksIG5vcm1hbGl6ZWRRdWVyeSk7XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIHRvQXJyYXkoKVxyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIClcclxuICAgICAgICAuc3Vic2NyaWJlKChtYXRjaGVzOiBUeXBlYWhlYWRPcHRpb25bXSkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5maW5hbGl6ZUFzeW5jQ2FsbChtYXRjaGVzKTtcclxuICAgICAgICB9KVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBub3JtYWxpemVPcHRpb24ob3B0aW9uOiBUeXBlYWhlYWRPcHRpb24pOiBzdHJpbmcge1xyXG4gICAgY29uc3Qgb3B0aW9uVmFsdWU6IHN0cmluZyA9IGdldFZhbHVlRnJvbU9iamVjdChcclxuICAgICAgb3B0aW9uLFxyXG4gICAgICB0aGlzLnR5cGVhaGVhZE9wdGlvbkZpZWxkXHJcbiAgICApO1xyXG4gICAgY29uc3Qgbm9ybWFsaXplZE9wdGlvbiA9IHRoaXMudHlwZWFoZWFkTGF0aW5pemVcclxuICAgICAgPyBsYXRpbml6ZShvcHRpb25WYWx1ZSlcclxuICAgICAgOiBvcHRpb25WYWx1ZTtcclxuXHJcbiAgICByZXR1cm4gbm9ybWFsaXplZE9wdGlvbi50b0xvd2VyQ2FzZSgpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIHRva2VuaXplUXVlcnkoY3VycmVudFF1ZXJ5OiBzdHJpbmcgfCBzdHJpbmdbXSk6IHN0cmluZyB8IHN0cmluZ1tdIHtcclxuXHJcbiAgICBsZXQgcXVlcnkgPSBjdXJyZW50UXVlcnk7XHJcbiAgICBpZiAodGhpcy50eXBlYWhlYWRNdWx0aXBsZVNlYXJjaCAmJiB0aGlzLnR5cGVhaGVhZFNpbmdsZVdvcmRzKSB7XHJcbiAgICAgIGlmICghdGhpcy5oYXZlQ29tbW9uQ2hhcmFjdGVycyhgJHt0aGlzLnR5cGVhaGVhZFBocmFzZURlbGltaXRlcnN9JHt0aGlzLnR5cGVhaGVhZFdvcmREZWxpbWl0ZXJzfWAsXHJcbiAgICAgICAgdGhpcy50eXBlYWhlYWRNdWx0aXBsZVNlYXJjaERlbGltaXRlcnMpKSB7XHJcbiAgICAgICAgLy8gc2luZ2xlIHdvcmRzIGFuZCBtdWx0aXBsZSBzZWFyY2ggZGVsaW1pdGVycyBhcmUgZGlmZmVyZW50LCBjYW4gYmUgdXNlZCB0b2dldGhlclxyXG4gICAgICAgIHF1ZXJ5ID0gdG9rZW5pemUoXHJcbiAgICAgICAgICBxdWVyeSBhcyBzdHJpbmcsXHJcbiAgICAgICAgICB0aGlzLnR5cGVhaGVhZFdvcmREZWxpbWl0ZXJzLFxyXG4gICAgICAgICAgdGhpcy50eXBlYWhlYWRQaHJhc2VEZWxpbWl0ZXJzLFxyXG4gICAgICAgICAgdGhpcy50eXBlYWhlYWRNdWx0aXBsZVNlYXJjaERlbGltaXRlcnNcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMudHlwZWFoZWFkU2luZ2xlV29yZHMpIHtcclxuICAgICAgcXVlcnkgPSB0b2tlbml6ZShcclxuICAgICAgICBxdWVyeSBhcyBzdHJpbmcsXHJcbiAgICAgICAgdGhpcy50eXBlYWhlYWRXb3JkRGVsaW1pdGVycyxcclxuICAgICAgICB0aGlzLnR5cGVhaGVhZFBocmFzZURlbGltaXRlcnNcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIG11bHRpcGxlIHNlYXJjaGVzXHJcbiAgICAgIHF1ZXJ5ID0gdG9rZW5pemUoXHJcbiAgICAgICAgcXVlcnkgYXMgc3RyaW5nLFxyXG4gICAgICAgIHZvaWQgMCxcclxuICAgICAgICB2b2lkIDAsXHJcbiAgICAgICAgdGhpcy50eXBlYWhlYWRNdWx0aXBsZVNlYXJjaERlbGltaXRlcnNcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcXVlcnk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgbm9ybWFsaXplUXVlcnkodmFsdWU6IHN0cmluZyk6IHN0cmluZyB8IHN0cmluZ1tdIHtcclxuICAgIC8vIElmIHNpbmdsZVdvcmRzLCBicmVhayBtb2RlbCBoZXJlIHRvIG5vdCBiZSBkb2luZyBleHRyYSB3b3JrIG9uIGVhY2ggaXRlcmF0aW9uXHJcbiAgICBsZXQgbm9ybWFsaXplZFF1ZXJ5OiBzdHJpbmcgfCBzdHJpbmdbXSA9ICh0aGlzLnR5cGVhaGVhZExhdGluaXplXHJcbiAgICAgID8gbGF0aW5pemUodmFsdWUpXHJcbiAgICAgIDogdmFsdWUpXHJcbiAgICAgIC50b1N0cmluZygpXHJcbiAgICAgIC50b0xvd2VyQ2FzZSgpO1xyXG5cclxuICAgIG5vcm1hbGl6ZWRRdWVyeSA9IHRoaXMudG9rZW5pemVRdWVyeShub3JtYWxpemVkUXVlcnkpO1xyXG5cclxuICAgIHJldHVybiBub3JtYWxpemVkUXVlcnk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgdGVzdE1hdGNoKG1hdGNoOiBzdHJpbmcsIHRlc3Q6IHN0cmluZ1tdIHwgc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICBsZXQgc3BhY2VMZW5ndGg6IG51bWJlcjtcclxuXHJcbiAgICBpZiAodHlwZW9mIHRlc3QgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgIHNwYWNlTGVuZ3RoID0gdGVzdC5sZW5ndGg7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3BhY2VMZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgICAgIGlmICh0ZXN0W2ldLmxlbmd0aCA+IDAgJiYgbWF0Y2guaW5kZXhPZih0ZXN0W2ldKSA8IDApIHtcclxuICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBtYXRjaC5pbmRleE9mKHRlc3QpID49IDA7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgZmluYWxpemVBc3luY0NhbGwobWF0Y2hlcz86IFR5cGVhaGVhZE9wdGlvbiB8IFR5cGVhaGVhZE9wdGlvbltdKTogdm9pZCB7XHJcbiAgICB0aGlzLnByZXBhcmVNYXRjaGVzKG1hdGNoZXMgfHwgW10pO1xyXG5cclxuICAgIHRoaXMudHlwZWFoZWFkTG9hZGluZy5lbWl0KGZhbHNlKTtcclxuICAgIHRoaXMudHlwZWFoZWFkTm9SZXN1bHRzLmVtaXQoIXRoaXMuaGFzTWF0Y2hlcygpKTtcclxuXHJcbiAgICBpZiAoIXRoaXMuaGFzTWF0Y2hlcygpKSB7XHJcbiAgICAgIHRoaXMuaGlkZSgpO1xyXG5cclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghdGhpcy5pc0ZvY3VzZWQgJiYgdGhpcy5jYW5jZWxSZXF1ZXN0T25Gb2N1c0xvc3QpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLl9jb250YWluZXIgJiYgdGhpcy5uZ0NvbnRyb2wuY29udHJvbCkge1xyXG4gICAgICAvLyBmaXg6IHJlbW92ZSB1c2FnZSBvZiBuZ0NvbnRyb2wgaW50ZXJuYWxzXHJcbiAgICAgIGNvbnN0IF9jb250cm9sVmFsdWUgPSAodGhpcy50eXBlYWhlYWRMYXRpbml6ZVxyXG4gICAgICAgID8gbGF0aW5pemUodGhpcy5uZ0NvbnRyb2wuY29udHJvbC52YWx1ZSlcclxuICAgICAgICA6IHRoaXMubmdDb250cm9sLmNvbnRyb2wudmFsdWUpIHx8ICcnO1xyXG5cclxuICAgICAgLy8gVGhpcyBpbXByb3ZlcyB0aGUgc3BlZWQgYXMgaXQgd29uJ3QgaGF2ZSB0byBiZSBkb25lIGZvciBlYWNoIGxpc3QgaXRlbVxyXG4gICAgICBjb25zdCBub3JtYWxpemVkUXVlcnkgPSBfY29udHJvbFZhbHVlLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKTtcclxuXHJcbiAgICAgIHRoaXMuX2NvbnRhaW5lci5xdWVyeSA9IHRoaXMudG9rZW5pemVRdWVyeShub3JtYWxpemVkUXVlcnkpO1xyXG4gICAgICB0aGlzLl9jb250YWluZXIubWF0Y2hlcyA9IHRoaXMuX21hdGNoZXM7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnNob3coKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBwcmVwYXJlTWF0Y2hlcyhvcHRpb25zOiBUeXBlYWhlYWRPcHRpb24gfCBUeXBlYWhlYWRPcHRpb25bXSk6IHZvaWQge1xyXG4gICAgY29uc3QgbGltaXRlZCA9IG9wdGlvbnMuc2xpY2UoMCwgdGhpcy50eXBlYWhlYWRPcHRpb25zTGltaXQpO1xyXG4gICAgY29uc3Qgc29ydGVkID0gIXRoaXMudHlwZWFoZWFkT3JkZXJCeSA/IGxpbWl0ZWQgOiB0aGlzLm9yZGVyTWF0Y2hlcyhsaW1pdGVkKTtcclxuXHJcbiAgICBpZiAodGhpcy50eXBlYWhlYWRHcm91cEZpZWxkKSB7XHJcbiAgICAgIGxldCBtYXRjaGVzOiBUeXBlYWhlYWRNYXRjaFtdID0gW107XHJcblxyXG4gICAgICAvLyBleHRyYWN0IGFsbCBncm91cCBuYW1lc1xyXG4gICAgICBjb25zdCBncm91cHMgPSBzb3J0ZWRcclxuICAgICAgICAubWFwKChvcHRpb246IFR5cGVhaGVhZE9wdGlvbikgPT5cclxuICAgICAgICAgIGdldFZhbHVlRnJvbU9iamVjdChvcHRpb24sIHRoaXMudHlwZWFoZWFkR3JvdXBGaWVsZClcclxuICAgICAgICApXHJcbiAgICAgICAgLmZpbHRlcigodjogc3RyaW5nLCBpOiBudW1iZXIsIGE6IHN0cmluZ1tdKSA9PiBhLmluZGV4T2YodikgPT09IGkpO1xyXG5cclxuICAgICAgZ3JvdXBzLmZvckVhY2goKGdyb3VwOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAvLyBhZGQgZ3JvdXAgaGVhZGVyIHRvIGFycmF5IG9mIG1hdGNoZXNcclxuICAgICAgICBtYXRjaGVzLnB1c2gobmV3IFR5cGVhaGVhZE1hdGNoKGdyb3VwLCBncm91cCwgdHJ1ZSkpO1xyXG5cclxuICAgICAgICAvLyBhZGQgZWFjaCBpdGVtIG9mIGdyb3VwIHRvIGFycmF5IG9mIG1hdGNoZXNcclxuICAgICAgICBtYXRjaGVzID0gbWF0Y2hlcy5jb25jYXQoXHJcbiAgICAgICAgICBzb3J0ZWRcclxuICAgICAgICAgICAgLmZpbHRlcigob3B0aW9uOiBUeXBlYWhlYWRPcHRpb24pID0+XHJcbiAgICAgICAgICAgICAgZ2V0VmFsdWVGcm9tT2JqZWN0KG9wdGlvbiwgdGhpcy50eXBlYWhlYWRHcm91cEZpZWxkKSA9PT0gZ3JvdXBcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAubWFwKChvcHRpb246IFR5cGVhaGVhZE9wdGlvbikgPT5cclxuICAgICAgICAgICAgICBuZXcgVHlwZWFoZWFkTWF0Y2goXHJcbiAgICAgICAgICAgICAgICBvcHRpb24sXHJcbiAgICAgICAgICAgICAgICBnZXRWYWx1ZUZyb21PYmplY3Qob3B0aW9uLCB0aGlzLnR5cGVhaGVhZE9wdGlvbkZpZWxkKVxyXG4gICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgdGhpcy5fbWF0Y2hlcyA9IG1hdGNoZXM7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLl9tYXRjaGVzID0gc29ydGVkLm1hcChcclxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxyXG4gICAgICAgIChvcHRpb246IGFueSkgPT5cclxuICAgICAgICAgIG5ldyBUeXBlYWhlYWRNYXRjaChcclxuICAgICAgICAgICAgb3B0aW9uLFxyXG4gICAgICAgICAgICBnZXRWYWx1ZUZyb21PYmplY3Qob3B0aW9uLCB0aGlzLnR5cGVhaGVhZE9wdGlvbkZpZWxkKVxyXG4gICAgICAgICAgKVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIG9yZGVyTWF0Y2hlcyhvcHRpb25zOiBUeXBlYWhlYWRPcHRpb25bXSk6IFR5cGVhaGVhZE9wdGlvbltdIHtcclxuICAgIGlmICghb3B0aW9ucy5sZW5ndGgpIHtcclxuICAgICAgcmV0dXJuIG9wdGlvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMudHlwZWFoZWFkT3JkZXJCeSAhPT0gbnVsbFxyXG4gICAgICAmJiB0aGlzLnR5cGVhaGVhZE9yZGVyQnkgIT09IHVuZGVmaW5lZFxyXG4gICAgICAmJiB0eXBlb2YgdGhpcy50eXBlYWhlYWRPcmRlckJ5ID09PSAnb2JqZWN0J1xyXG4gICAgICAmJiBPYmplY3Qua2V5cyh0aGlzLnR5cGVhaGVhZE9yZGVyQnkpLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICBjb25zb2xlLmVycm9yKCdGaWVsZCBhbmQgZGlyZWN0aW9uIHByb3BlcnRpZXMgZm9yIHR5cGVhaGVhZE9yZGVyQnkgaGF2ZSB0byBiZSBzZXQgYWNjb3JkaW5nIHRvIGRvY3VtZW50YXRpb24hJyk7XHJcblxyXG4gICAgICByZXR1cm4gb3B0aW9ucztcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB7IGZpZWxkLCBkaXJlY3Rpb24gfSA9ICh0aGlzLnR5cGVhaGVhZE9yZGVyQnkgfHwge30pO1xyXG5cclxuICAgIGlmICghZGlyZWN0aW9uIHx8ICEoZGlyZWN0aW9uID09PSAnYXNjJyB8fCBkaXJlY3Rpb24gPT09ICdkZXNjJykpIHtcclxuICAgICAgY29uc29sZS5lcnJvcigndHlwZWFoZWFkT3JkZXJCeSBkaXJlY3Rpb24gaGFzIHRvIGVxdWFsIFwiYXNjXCIgb3IgXCJkZXNjXCIuIFBsZWFzZSBmb2xsb3cgdGhlIGRvY3VtZW50YXRpb24uJyk7XHJcblxyXG4gICAgICByZXR1cm4gb3B0aW9ucztcclxuICAgIH1cclxuXHJcbiAgICBpZiAodHlwZW9mIG9wdGlvbnNbMF0gPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHJldHVybiBkaXJlY3Rpb24gPT09ICdhc2MnID8gb3B0aW9ucy5zb3J0KCkgOiBvcHRpb25zLnNvcnQoKS5yZXZlcnNlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFmaWVsZCB8fCB0eXBlb2YgZmllbGQgIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ3R5cGVhaGVhZE9yZGVyQnkgZmllbGQgaGFzIHRvIHNldCBhY2NvcmRpbmcgdG8gdGhlIGRvY3VtZW50YXRpb24uJyk7XHJcblxyXG4gICAgICByZXR1cm4gb3B0aW9ucztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gb3B0aW9ucy5zb3J0KChhOiBUeXBlYWhlYWRPcHRpb24sIGI6IFR5cGVhaGVhZE9wdGlvbikgPT4ge1xyXG4gICAgICBjb25zdCBzdHJpbmdBID0gZ2V0VmFsdWVGcm9tT2JqZWN0KGEsIGZpZWxkKTtcclxuICAgICAgY29uc3Qgc3RyaW5nQiA9IGdldFZhbHVlRnJvbU9iamVjdChiLCBmaWVsZCk7XHJcblxyXG4gICAgICBpZiAoc3RyaW5nQSA8IHN0cmluZ0IpIHtcclxuICAgICAgICByZXR1cm4gZGlyZWN0aW9uID09PSAnYXNjJyA/IC0xIDogMTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHN0cmluZ0EgPiBzdHJpbmdCKSB7XHJcbiAgICAgICAgcmV0dXJuIGRpcmVjdGlvbiA9PT0gJ2FzYycgPyAxIDogLTE7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiAwO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgaGFzTWF0Y2hlcygpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl9tYXRjaGVzLmxlbmd0aCA+IDA7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgY2hlY2tEZWxpbWl0ZXJzQ29uZmxpY3QoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy50eXBlYWhlYWRNdWx0aXBsZVNlYXJjaCAmJiB0aGlzLnR5cGVhaGVhZFNpbmdsZVdvcmRzXHJcbiAgICAgICYmICh0aGlzLmhhdmVDb21tb25DaGFyYWN0ZXJzKGAke3RoaXMudHlwZWFoZWFkUGhyYXNlRGVsaW1pdGVyc30ke3RoaXMudHlwZWFoZWFkV29yZERlbGltaXRlcnN9YCxcclxuICAgICAgICB0aGlzLnR5cGVhaGVhZE11bHRpcGxlU2VhcmNoRGVsaW1pdGVycykpKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgRGVsaW1pdGVycyB1c2VkIGluIHR5cGVhaGVhZE11bHRpcGxlU2VhcmNoRGVsaW1pdGVycyBtdXN0IGJlIGRpZmZlcmVudFxyXG4gICAgICAgICAgZnJvbSBkZWxpbWl0ZXJzIHVzZWQgaW4gdHlwZWFoZWFkV29yZERlbGltaXRlcnMgKGN1cnJlbnQgdmFsdWU6ICR7dGhpcy50eXBlYWhlYWRXb3JkRGVsaW1pdGVyc30pIGFuZFxyXG4gICAgICAgICAgdHlwZWFoZWFkUGhyYXNlRGVsaW1pdGVycyAoY3VycmVudCB2YWx1ZTogJHt0aGlzLnR5cGVhaGVhZFBocmFzZURlbGltaXRlcnN9KS5cclxuICAgICAgICAgIFBsZWFzZSByZWZlciB0byB0aGUgZG9jdW1lbnRhdGlvbmApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGhhdmVDb21tb25DaGFyYWN0ZXJzKHN0cjE6IHN0cmluZywgc3RyMjogc3RyaW5nKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0cjEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgaWYgKHN0cjEuY2hhckF0KGkpLmluZGV4T2Yoc3RyMikgPiAtMSkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxufVxyXG4iXX0=