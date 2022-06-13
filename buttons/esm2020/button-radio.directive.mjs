import { ChangeDetectorRef, Directive, ElementRef, forwardRef, HostBinding, HostListener, Inject, Input, Optional, Renderer2 } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ButtonRadioGroupDirective } from './button-radio-group.directive';
import * as i0 from "@angular/core";
import * as i1 from "./button-radio-group.directive";
export const RADIO_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ButtonRadioDirective),
    multi: true
};
/**
 * Create radio buttons or groups of buttons.
 * A value of a selected button is bound to a variable specified via ngModel.
 */
export class ButtonRadioDirective {
    constructor(el, cdr, renderer, group) {
        this.el = el;
        this.cdr = cdr;
        this.renderer = renderer;
        this.group = group;
        this.onChange = Function.prototype;
        this.onTouched = Function.prototype;
        /** If `true` — radio button can be unchecked */
        this.uncheckable = false;
        this.role = 'radio';
        this._disabled = false;
        this._hasFocus = false;
    }
    /** Current value of radio component or group */
    get value() {
        return this.group ? this.group.value : this._value;
    }
    set value(value) {
        if (this.group) {
            this.group.value = value;
            return;
        }
        this._value = value;
        this._onChange(value);
    }
    /** If `true` — radio button is disabled */
    get disabled() {
        return this._disabled;
    }
    set disabled(disabled) {
        this.setDisabledState(disabled);
    }
    get controlOrGroupDisabled() {
        return this.disabled || (this.group && this.group.disabled) ? true : undefined;
    }
    get hasDisabledClass() {
        // Although the radio is disabled the active radio should still stand out.
        // The disabled class will prevent this so don't add it on the active radio
        return this.controlOrGroupDisabled && !this.isActive;
    }
    get isActive() {
        return this.btnRadio === this.value;
    }
    get tabindex() {
        if (this.controlOrGroupDisabled) {
            // Disabled radio buttons should not receive focus
            return undefined;
        }
        else if (this.isActive || this.group == null) {
            return 0;
        }
        else {
            return -1;
        }
    }
    get hasFocus() {
        return this._hasFocus;
    }
    toggleIfAllowed() {
        if (!this.canToggle()) {
            return;
        }
        if (this.uncheckable && this.btnRadio === this.value) {
            this.value = undefined;
        }
        else {
            this.value = this.btnRadio;
        }
    }
    onSpacePressed(event) {
        this.toggleIfAllowed();
        event.preventDefault();
    }
    focus() {
        this.el.nativeElement.focus();
    }
    onFocus() {
        this._hasFocus = true;
    }
    onBlur() {
        this._hasFocus = false;
        this.onTouched();
    }
    canToggle() {
        return !this.controlOrGroupDisabled && (this.uncheckable || this.btnRadio !== this.value);
    }
    ngOnChanges(changes) {
        if ('uncheckable' in changes) {
            this.uncheckable = this.uncheckable !== false && typeof this.uncheckable !== 'undefined';
        }
    }
    _onChange(value) {
        if (this.group) {
            this.group.value = value;
            return;
        }
        this.onTouched();
        this.onChange(value);
    }
    // ControlValueAccessor
    // model -> view
    writeValue(value) {
        this.value = value;
        this.cdr.markForCheck();
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(disabled) {
        this._disabled = disabled;
        if (disabled) {
            this.renderer.setAttribute(this.el.nativeElement, 'disabled', 'disabled');
            return;
        }
        this.renderer.removeAttribute(this.el.nativeElement, 'disabled');
    }
}
ButtonRadioDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: ButtonRadioDirective, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i0.Renderer2 }, { token: forwardRef(() => ButtonRadioGroupDirective), optional: true }], target: i0.ɵɵFactoryTarget.Directive });
ButtonRadioDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.1", type: ButtonRadioDirective, selector: "[btnRadio]", inputs: { btnRadio: "btnRadio", uncheckable: "uncheckable", value: "value", disabled: "disabled" }, host: { listeners: { "click": "toggleIfAllowed()", "keydown.space": "onSpacePressed($event)", "focus": "onFocus()", "blur": "onBlur()" }, properties: { "attr.aria-disabled": "this.controlOrGroupDisabled", "class.disabled": "this.hasDisabledClass", "class.active": "this.isActive", "attr.aria-checked": "this.isActive", "attr.role": "this.role", "attr.tabindex": "this.tabindex" } }, providers: [RADIO_CONTROL_VALUE_ACCESSOR], usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: ButtonRadioDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[btnRadio]',
                    providers: [RADIO_CONTROL_VALUE_ACCESSOR]
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i0.Renderer2 }, { type: i1.ButtonRadioGroupDirective, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [forwardRef(() => ButtonRadioGroupDirective)]
                }] }]; }, propDecorators: { btnRadio: [{
                type: Input
            }], uncheckable: [{
                type: Input
            }], value: [{
                type: Input
            }], disabled: [{
                type: Input
            }], controlOrGroupDisabled: [{
                type: HostBinding,
                args: ['attr.aria-disabled']
            }], hasDisabledClass: [{
                type: HostBinding,
                args: ['class.disabled']
            }], isActive: [{
                type: HostBinding,
                args: ['class.active']
            }, {
                type: HostBinding,
                args: ['attr.aria-checked']
            }], role: [{
                type: HostBinding,
                args: ['attr.role']
            }], tabindex: [{
                type: HostBinding,
                args: ['attr.tabindex']
            }], toggleIfAllowed: [{
                type: HostListener,
                args: ['click']
            }], onSpacePressed: [{
                type: HostListener,
                args: ['keydown.space', ['$event']]
            }], onFocus: [{
                type: HostListener,
                args: ['focus']
            }], onBlur: [{
                type: HostListener,
                args: ['blur']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLXJhZGlvLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9idXR0b25zL2J1dHRvbi1yYWRpby5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUNWLFVBQVUsRUFDVixXQUFXLEVBQ1gsWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBRUwsUUFBUSxFQUVSLFNBQVMsRUFFVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7OztBQUUzRSxNQUFNLENBQUMsTUFBTSw0QkFBNEIsR0FBYTtJQUNwRCxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsb0JBQW9CLENBQUM7SUFDbkQsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBRUY7OztHQUdHO0FBS0gsTUFBTSxPQUFPLG9CQUFvQjtJQXlFL0IsWUFDVSxFQUFjLEVBQ2QsR0FBc0IsRUFDdEIsUUFBbUIsRUFHbkIsS0FBZ0M7UUFMaEMsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUNkLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBQ3RCLGFBQVEsR0FBUixRQUFRLENBQVc7UUFHbkIsVUFBSyxHQUFMLEtBQUssQ0FBMkI7UUE5RTFDLGFBQVEsR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDO1FBQzlCLGNBQVMsR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDO1FBSS9CLGdEQUFnRDtRQUN2QyxnQkFBVyxHQUFHLEtBQUssQ0FBQztRQTRDTSxTQUFJLEdBQVcsT0FBTyxDQUFDO1FBbUJsRCxjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLGNBQVMsR0FBRyxLQUFLLENBQUM7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Q25FLENBQUM7O2lIQS9KVSxvQkFBb0Isc0dBOEVyQixVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMseUJBQXlCLENBQUM7cUdBOUUxQyxvQkFBb0Isd2dCQUZwQixDQUFDLDRCQUE0QixDQUFDOzJGQUU5QixvQkFBb0I7a0JBSmhDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLFlBQVk7b0JBQ3RCLFNBQVMsRUFBRSxDQUFDLDRCQUE0QixDQUFDO2lCQUMxQzs7MEJBOEVJLFFBQVE7OzBCQUNSLE1BQU07MkJBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLHlCQUF5QixDQUFDOzRDQXpFNUMsUUFBUTtzQkFBaEIsS0FBSztnQkFFRyxXQUFXO3NCQUFuQixLQUFLO2dCQUdGLEtBQUs7c0JBRFIsS0FBSztnQkFnQkYsUUFBUTtzQkFEWCxLQUFLO2dCQVVGLHNCQUFzQjtzQkFEekIsV0FBVzt1QkFBQyxvQkFBb0I7Z0JBTTdCLGdCQUFnQjtzQkFEbkIsV0FBVzt1QkFBQyxnQkFBZ0I7Z0JBU3pCLFFBQVE7c0JBRlgsV0FBVzt1QkFBQyxjQUFjOztzQkFDMUIsV0FBVzt1QkFBQyxtQkFBbUI7Z0JBS0csSUFBSTtzQkFBdEMsV0FBVzt1QkFBQyxXQUFXO2dCQUdwQixRQUFRO3NCQURYLFdBQVc7dUJBQUMsZUFBZTtnQkE4QjVCLGVBQWU7c0JBRGQsWUFBWTt1QkFBQyxPQUFPO2dCQWNyQixjQUFjO3NCQURiLFlBQVk7dUJBQUMsZUFBZSxFQUFFLENBQUMsUUFBUSxDQUFDO2dCQVd6QyxPQUFPO3NCQUROLFlBQVk7dUJBQUMsT0FBTztnQkFNckIsTUFBTTtzQkFETCxZQUFZO3VCQUFDLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENoYW5nZURldGVjdG9yUmVmLFxyXG4gIERpcmVjdGl2ZSxcclxuICBFbGVtZW50UmVmLFxyXG4gIGZvcndhcmRSZWYsXHJcbiAgSG9zdEJpbmRpbmcsXHJcbiAgSG9zdExpc3RlbmVyLFxyXG4gIEluamVjdCxcclxuICBJbnB1dCxcclxuICBPbkNoYW5nZXMsXHJcbiAgT3B0aW9uYWwsXHJcbiAgUHJvdmlkZXIsXHJcbiAgUmVuZGVyZXIyLFxyXG4gIFNpbXBsZUNoYW5nZXNcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBCdXR0b25SYWRpb0dyb3VwRGlyZWN0aXZlIH0gZnJvbSAnLi9idXR0b24tcmFkaW8tZ3JvdXAuZGlyZWN0aXZlJztcclxuXHJcbmV4cG9ydCBjb25zdCBSQURJT19DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBQcm92aWRlciA9IHtcclxuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBCdXR0b25SYWRpb0RpcmVjdGl2ZSksXHJcbiAgbXVsdGk6IHRydWVcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgcmFkaW8gYnV0dG9ucyBvciBncm91cHMgb2YgYnV0dG9ucy5cclxuICogQSB2YWx1ZSBvZiBhIHNlbGVjdGVkIGJ1dHRvbiBpcyBib3VuZCB0byBhIHZhcmlhYmxlIHNwZWNpZmllZCB2aWEgbmdNb2RlbC5cclxuICovXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW2J0blJhZGlvXScsXHJcbiAgcHJvdmlkZXJzOiBbUkFESU9fQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUl1cclxufSlcclxuZXhwb3J0IGNsYXNzIEJ1dHRvblJhZGlvRGlyZWN0aXZlIGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uQ2hhbmdlcyB7XHJcbiAgb25DaGFuZ2UgPSBGdW5jdGlvbi5wcm90b3R5cGU7XHJcbiAgb25Ub3VjaGVkID0gRnVuY3Rpb24ucHJvdG90eXBlO1xyXG5cclxuICAvKiogUmFkaW8gYnV0dG9uIHZhbHVlLCB3aWxsIGJlIHNldCB0byBgbmdNb2RlbGAgKi9cclxuICBASW5wdXQoKSBidG5SYWRpbz86IHN0cmluZztcclxuICAvKiogSWYgYHRydWVgIOKAlCByYWRpbyBidXR0b24gY2FuIGJlIHVuY2hlY2tlZCAqL1xyXG4gIEBJbnB1dCgpIHVuY2hlY2thYmxlID0gZmFsc2U7XHJcbiAgLyoqIEN1cnJlbnQgdmFsdWUgb2YgcmFkaW8gY29tcG9uZW50IG9yIGdyb3VwICovXHJcbiAgQElucHV0KClcclxuICBnZXQgdmFsdWUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5ncm91cCA/IHRoaXMuZ3JvdXAudmFsdWUgOiB0aGlzLl92YWx1ZTtcclxuICB9XHJcblxyXG4gIHNldCB2YWx1ZSh2YWx1ZTogc3RyaW5nIHwgdW5kZWZpbmVkKSB7XHJcbiAgICBpZiAodGhpcy5ncm91cCkge1xyXG4gICAgICB0aGlzLmdyb3VwLnZhbHVlID0gdmFsdWU7XHJcblxyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xyXG4gICAgdGhpcy5fb25DaGFuZ2UodmFsdWUpO1xyXG4gIH1cclxuICAvKiogSWYgYHRydWVgIOKAlCByYWRpbyBidXR0b24gaXMgZGlzYWJsZWQgKi9cclxuICBASW5wdXQoKVxyXG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcclxuICB9XHJcblxyXG4gIHNldCBkaXNhYmxlZChkaXNhYmxlZDogYm9vbGVhbikge1xyXG4gICAgdGhpcy5zZXREaXNhYmxlZFN0YXRlKGRpc2FibGVkKTtcclxuICB9XHJcblxyXG4gIEBIb3N0QmluZGluZygnYXR0ci5hcmlhLWRpc2FibGVkJylcclxuICBnZXQgY29udHJvbE9yR3JvdXBEaXNhYmxlZCgpIHtcclxuICAgIHJldHVybiB0aGlzLmRpc2FibGVkIHx8ICh0aGlzLmdyb3VwICYmIHRoaXMuZ3JvdXAuZGlzYWJsZWQpID8gdHJ1ZSA6IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIEBIb3N0QmluZGluZygnY2xhc3MuZGlzYWJsZWQnKVxyXG4gIGdldCBoYXNEaXNhYmxlZENsYXNzKCkge1xyXG4gICAgLy8gQWx0aG91Z2ggdGhlIHJhZGlvIGlzIGRpc2FibGVkIHRoZSBhY3RpdmUgcmFkaW8gc2hvdWxkIHN0aWxsIHN0YW5kIG91dC5cclxuICAgIC8vIFRoZSBkaXNhYmxlZCBjbGFzcyB3aWxsIHByZXZlbnQgdGhpcyBzbyBkb24ndCBhZGQgaXQgb24gdGhlIGFjdGl2ZSByYWRpb1xyXG4gICAgcmV0dXJuIHRoaXMuY29udHJvbE9yR3JvdXBEaXNhYmxlZCAmJiAhdGhpcy5pc0FjdGl2ZTtcclxuICB9XHJcblxyXG4gIEBIb3N0QmluZGluZygnY2xhc3MuYWN0aXZlJylcclxuICBASG9zdEJpbmRpbmcoJ2F0dHIuYXJpYS1jaGVja2VkJylcclxuICBnZXQgaXNBY3RpdmUoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5idG5SYWRpbyA9PT0gdGhpcy52YWx1ZTtcclxuICB9XHJcblxyXG4gIEBIb3N0QmluZGluZygnYXR0ci5yb2xlJykgcmVhZG9ubHkgcm9sZTogc3RyaW5nID0gJ3JhZGlvJztcclxuXHJcbiAgQEhvc3RCaW5kaW5nKCdhdHRyLnRhYmluZGV4JylcclxuICBnZXQgdGFiaW5kZXgoKTogdW5kZWZpbmVkIHwgbnVtYmVyIHtcclxuICAgIGlmICh0aGlzLmNvbnRyb2xPckdyb3VwRGlzYWJsZWQpIHtcclxuICAgICAgLy8gRGlzYWJsZWQgcmFkaW8gYnV0dG9ucyBzaG91bGQgbm90IHJlY2VpdmUgZm9jdXNcclxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5pc0FjdGl2ZSB8fCB0aGlzLmdyb3VwID09IG51bGwpIHtcclxuICAgICAgcmV0dXJuIDA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gLTE7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXQgaGFzRm9jdXMoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5faGFzRm9jdXM7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF92YWx1ZT86IHN0cmluZztcclxuICBwcml2YXRlIF9kaXNhYmxlZCA9IGZhbHNlO1xyXG4gIHByaXZhdGUgX2hhc0ZvY3VzID0gZmFsc2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBlbDogRWxlbWVudFJlZixcclxuICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcclxuICAgIEBPcHRpb25hbCgpXHJcbiAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gQnV0dG9uUmFkaW9Hcm91cERpcmVjdGl2ZSkpXHJcbiAgICBwcml2YXRlIGdyb3VwOiBCdXR0b25SYWRpb0dyb3VwRGlyZWN0aXZlXHJcbiAgKSB7fVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdjbGljaycpXHJcbiAgdG9nZ2xlSWZBbGxvd2VkKCk6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzLmNhblRvZ2dsZSgpKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy51bmNoZWNrYWJsZSAmJiB0aGlzLmJ0blJhZGlvID09PSB0aGlzLnZhbHVlKSB7XHJcbiAgICAgIHRoaXMudmFsdWUgPSB1bmRlZmluZWQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnZhbHVlID0gdGhpcy5idG5SYWRpbztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24uc3BhY2UnLCBbJyRldmVudCddKVxyXG4gIG9uU3BhY2VQcmVzc2VkKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XHJcbiAgICB0aGlzLnRvZ2dsZUlmQWxsb3dlZCgpO1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICB9XHJcblxyXG4gIGZvY3VzKCkge1xyXG4gICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdmb2N1cycpXHJcbiAgb25Gb2N1cygpIHtcclxuICAgIHRoaXMuX2hhc0ZvY3VzID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2JsdXInKVxyXG4gIG9uQmx1cigpIHtcclxuICAgIHRoaXMuX2hhc0ZvY3VzID0gZmFsc2U7XHJcbiAgICB0aGlzLm9uVG91Y2hlZCgpO1xyXG4gIH1cclxuXHJcbiAgY2FuVG9nZ2xlKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuICF0aGlzLmNvbnRyb2xPckdyb3VwRGlzYWJsZWQgJiYgKHRoaXMudW5jaGVja2FibGUgfHwgdGhpcy5idG5SYWRpbyAhPT0gdGhpcy52YWx1ZSk7XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XHJcbiAgICBpZiAoJ3VuY2hlY2thYmxlJyBpbiBjaGFuZ2VzKSB7XHJcbiAgICAgIHRoaXMudW5jaGVja2FibGUgPSB0aGlzLnVuY2hlY2thYmxlICE9PSBmYWxzZSAmJiB0eXBlb2YgdGhpcy51bmNoZWNrYWJsZSAhPT0gJ3VuZGVmaW5lZCc7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBfb25DaGFuZ2UodmFsdWU/OiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmdyb3VwKSB7XHJcbiAgICAgIHRoaXMuZ3JvdXAudmFsdWUgPSB2YWx1ZTtcclxuXHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMub25Ub3VjaGVkKCk7XHJcbiAgICB0aGlzLm9uQ2hhbmdlKHZhbHVlKTtcclxuICB9XHJcblxyXG4gIC8vIENvbnRyb2xWYWx1ZUFjY2Vzc29yXHJcbiAgLy8gbW9kZWwgLT4gdmlld1xyXG4gIHdyaXRlVmFsdWUodmFsdWU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xyXG4gICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XHJcbiAgfVxyXG5cclxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAoKSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICB0aGlzLm9uQ2hhbmdlID0gZm47XHJcbiAgfVxyXG5cclxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcclxuICB9XHJcblxyXG4gIHNldERpc2FibGVkU3RhdGUoZGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgIHRoaXMuX2Rpc2FibGVkID0gZGlzYWJsZWQ7XHJcbiAgICBpZiAoZGlzYWJsZWQpIHtcclxuICAgICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcclxuXHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQXR0cmlidXRlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2Rpc2FibGVkJyk7XHJcbiAgfVxyXG59XHJcbiJdfQ==