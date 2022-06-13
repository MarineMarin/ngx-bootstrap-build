import { changeTime } from './timepicker.utils';
export function canChangeValue(state, event) {
    if (state.readonlyInput || state.disabled) {
        return false;
    }
    if (event) {
        if (event.source === 'wheel' && !state.mousewheel) {
            return false;
        }
        if (event.source === 'key' && !state.arrowkeys) {
            return false;
        }
    }
    return true;
}
export function canChangeHours(event, controls) {
    if (!event.step) {
        return false;
    }
    if (event.step > 0 && !controls.canIncrementHours) {
        return false;
    }
    if (event.step < 0 && !controls.canDecrementHours) {
        return false;
    }
    return true;
}
export function canChangeMinutes(event, controls) {
    if (!event.step) {
        return false;
    }
    if (event.step > 0 && !controls.canIncrementMinutes) {
        return false;
    }
    if (event.step < 0 && !controls.canDecrementMinutes) {
        return false;
    }
    return true;
}
export function canChangeSeconds(event, controls) {
    if (!event.step) {
        return false;
    }
    if (event.step > 0 && !controls.canIncrementSeconds) {
        return false;
    }
    if (event.step < 0 && !controls.canDecrementSeconds) {
        return false;
    }
    return true;
}
export function getControlsValue(state) {
    const { hourStep, minuteStep, secondsStep, readonlyInput, disabled, mousewheel, arrowkeys, showSpinners, showMeridian, showSeconds, meridians, min, max } = state;
    return {
        hourStep,
        minuteStep,
        secondsStep,
        readonlyInput,
        disabled,
        mousewheel,
        arrowkeys,
        showSpinners,
        showMeridian,
        showSeconds,
        meridians,
        min,
        max
    };
}
export function timepickerControls(value, state) {
    const hoursPerDay = 24;
    const hoursPerDayHalf = 12;
    const { min, max, hourStep, minuteStep, secondsStep, showSeconds } = state;
    const res = {
        canIncrementHours: true,
        canIncrementMinutes: true,
        canIncrementSeconds: true,
        canDecrementHours: true,
        canDecrementMinutes: true,
        canDecrementSeconds: true,
        canToggleMeridian: true
    };
    if (!value) {
        return res;
    }
    // compare dates
    if (max) {
        const _newHour = changeTime(value, { hour: hourStep });
        res.canIncrementHours = max > _newHour && (value.getHours() + hourStep) < hoursPerDay;
        if (!res.canIncrementHours) {
            const _newMinutes = changeTime(value, { minute: minuteStep });
            res.canIncrementMinutes = showSeconds
                ? max > _newMinutes
                : max >= _newMinutes;
        }
        if (!res.canIncrementMinutes) {
            const _newSeconds = changeTime(value, { seconds: secondsStep });
            res.canIncrementSeconds = max >= _newSeconds;
        }
        if (value.getHours() < hoursPerDayHalf) {
            res.canToggleMeridian = changeTime(value, { hour: hoursPerDayHalf }) < max;
        }
    }
    if (min) {
        const _newHour = changeTime(value, { hour: -hourStep });
        res.canDecrementHours = min < _newHour;
        if (!res.canDecrementHours) {
            const _newMinutes = changeTime(value, { minute: -minuteStep });
            res.canDecrementMinutes = showSeconds
                ? min < _newMinutes
                : min <= _newMinutes;
        }
        if (!res.canDecrementMinutes) {
            const _newSeconds = changeTime(value, { seconds: -secondsStep });
            res.canDecrementSeconds = min <= _newSeconds;
        }
        if (value.getHours() >= hoursPerDayHalf) {
            res.canToggleMeridian = changeTime(value, { hour: -hoursPerDayHalf }) > min;
        }
    }
    return res;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXBpY2tlci1jb250cm9scy51dGlsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3RpbWVwaWNrZXIvdGltZXBpY2tlci1jb250cm9scy51dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQU9oRCxNQUFNLFVBQVUsY0FBYyxDQUM1QixLQUErQixFQUMvQixLQUF1QjtJQUV2QixJQUFJLEtBQUssQ0FBQyxhQUFhLElBQUksS0FBSyxDQUFDLFFBQVEsRUFBRTtRQUN6QyxPQUFPLEtBQUssQ0FBQztLQUNkO0lBRUQsSUFBSSxLQUFLLEVBQUU7UUFDVCxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRTtZQUNqRCxPQUFPLEtBQUssQ0FBQztTQUNkO1FBRUQsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUU7WUFDOUMsT0FBTyxLQUFLLENBQUM7U0FDZDtLQUNGO0lBRUQsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDO0FBRUQsTUFBTSxVQUFVLGNBQWMsQ0FDNUIsS0FBc0IsRUFDdEIsUUFBNEI7SUFFNUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUU7UUFDZixPQUFPLEtBQUssQ0FBQztLQUNkO0lBRUQsSUFBSSxLQUFLLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRTtRQUNqRCxPQUFPLEtBQUssQ0FBQztLQUNkO0lBRUQsSUFBSSxLQUFLLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRTtRQUNqRCxPQUFPLEtBQUssQ0FBQztLQUNkO0lBRUQsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDO0FBRUQsTUFBTSxVQUFVLGdCQUFn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SSxXQUFXLENBQUM7U0FDOUM7UUFFRCxJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUUsSUFBSSxlQUFlLEVBQUU7WUFDdkMsR0FBRyxDQUFDLGlCQUFpQixHQUFHLFVBQVUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQztTQUM3RTtLQUNGO0lBRUQsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY2hhbmdlVGltZSB9IGZyb20gJy4vdGltZXBpY2tlci51dGlscyc7XHJcbmltcG9ydCB7XHJcbiAgVGltZUNoYW5nZUV2ZW50LFxyXG4gIFRpbWVwaWNrZXJDb21wb25lbnRTdGF0ZSxcclxuICBUaW1lcGlja2VyQ29udHJvbHNcclxufSBmcm9tICcuL3RpbWVwaWNrZXIubW9kZWxzJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjYW5DaGFuZ2VWYWx1ZShcclxuICBzdGF0ZTogVGltZXBpY2tlckNvbXBvbmVudFN0YXRlLFxyXG4gIGV2ZW50PzogVGltZUNoYW5nZUV2ZW50XHJcbik6IGJvb2xlYW4ge1xyXG4gIGlmIChzdGF0ZS5yZWFkb25seUlucHV0IHx8IHN0YXRlLmRpc2FibGVkKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBpZiAoZXZlbnQpIHtcclxuICAgIGlmIChldmVudC5zb3VyY2UgPT09ICd3aGVlbCcgJiYgIXN0YXRlLm1vdXNld2hlZWwpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChldmVudC5zb3VyY2UgPT09ICdrZXknICYmICFzdGF0ZS5hcnJvd2tleXMpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHRydWU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjYW5DaGFuZ2VIb3VycyhcclxuICBldmVudDogVGltZUNoYW5nZUV2ZW50LFxyXG4gIGNvbnRyb2xzOiBUaW1lcGlja2VyQ29udHJvbHNcclxuKTogYm9vbGVhbiB7XHJcbiAgaWYgKCFldmVudC5zdGVwKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBpZiAoZXZlbnQuc3RlcCA+IDAgJiYgIWNvbnRyb2xzLmNhbkluY3JlbWVudEhvdXJzKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBpZiAoZXZlbnQuc3RlcCA8IDAgJiYgIWNvbnRyb2xzLmNhbkRlY3JlbWVudEhvdXJzKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gdHJ1ZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNhbkNoYW5nZU1pbnV0ZXMoXHJcbiAgZXZlbnQ6IFRpbWVDaGFuZ2VFdmVudCxcclxuICBjb250cm9sczogVGltZXBpY2tlckNvbnRyb2xzXHJcbik6IGJvb2xlYW4ge1xyXG4gIGlmICghZXZlbnQuc3RlcCkge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuICBpZiAoZXZlbnQuc3RlcCA+IDAgJiYgIWNvbnRyb2xzLmNhbkluY3JlbWVudE1pbnV0ZXMpIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbiAgaWYgKGV2ZW50LnN0ZXAgPCAwICYmICFjb250cm9scy5jYW5EZWNyZW1lbnRNaW51dGVzKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gdHJ1ZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNhbkNoYW5nZVNlY29uZHMoXHJcbiAgZXZlbnQ6IFRpbWVDaGFuZ2VFdmVudCxcclxuICBjb250cm9sczogVGltZXBpY2tlckNvbnRyb2xzXHJcbik6IGJvb2xlYW4ge1xyXG4gIGlmICghZXZlbnQuc3RlcCkge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuICBpZiAoZXZlbnQuc3RlcCA+IDAgJiYgIWNvbnRyb2xzLmNhbkluY3JlbWVudFNlY29uZHMpIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbiAgaWYgKGV2ZW50LnN0ZXAgPCAwICYmICFjb250cm9scy5jYW5EZWNyZW1lbnRTZWNvbmRzKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gdHJ1ZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldENvbnRyb2xzVmFsdWUoXHJcbiAgc3RhdGU6IFRpbWVwaWNrZXJDb21wb25lbnRTdGF0ZVxyXG4pOiBUaW1lcGlja2VyQ29tcG9uZW50U3RhdGUge1xyXG4gIGNvbnN0IHtcclxuICAgIGhvdXJTdGVwLFxyXG4gICAgbWludXRlU3RlcCxcclxuICAgIHNlY29uZHNTdGVwLFxyXG4gICAgcmVhZG9ubHlJbnB1dCxcclxuICAgIGRpc2FibGVkLFxyXG4gICAgbW91c2V3aGVlbCxcclxuICAgIGFycm93a2V5cyxcclxuICAgIHNob3dTcGlubmVycyxcclxuICAgIHNob3dNZXJpZGlhbixcclxuICAgIHNob3dTZWNvbmRzLFxyXG4gICAgbWVyaWRpYW5zLFxyXG4gICAgbWluLFxyXG4gICAgbWF4XHJcbiAgfSA9IHN0YXRlO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgaG91clN0ZXAsXHJcbiAgICBtaW51dGVTdGVwLFxyXG4gICAgc2Vjb25kc1N0ZXAsXHJcbiAgICByZWFkb25seUlucHV0LFxyXG4gICAgZGlzYWJsZWQsXHJcbiAgICBtb3VzZXdoZWVsLFxyXG4gICAgYXJyb3drZXlzLFxyXG4gICAgc2hvd1NwaW5uZXJzLFxyXG4gICAgc2hvd01lcmlkaWFuLFxyXG4gICAgc2hvd1NlY29uZHMsXHJcbiAgICBtZXJpZGlhbnMsXHJcbiAgICBtaW4sXHJcbiAgICBtYXhcclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdGltZXBpY2tlckNvbnRyb2xzKHZhbHVlOiBEYXRlIHwgdW5kZWZpbmVkLCBzdGF0ZTogVGltZXBpY2tlckNvbXBvbmVudFN0YXRlKTogVGltZXBpY2tlckNvbnRyb2xzIHtcclxuICBjb25zdCBob3Vyc1BlckRheSA9IDI0O1xyXG4gIGNvbnN0IGhvdXJzUGVyRGF5SGFsZiA9IDEyO1xyXG4gIGNvbnN0IHsgbWluLCBtYXgsIGhvdXJTdGVwLCBtaW51dGVTdGVwLCBzZWNvbmRzU3RlcCwgc2hvd1NlY29uZHMgfSA9IHN0YXRlO1xyXG4gIGNvbnN0IHJlczogVGltZXBpY2tlckNvbnRyb2xzID0ge1xyXG4gICAgY2FuSW5jcmVtZW50SG91cnM6IHRydWUsXHJcbiAgICBjYW5JbmNyZW1lbnRNaW51dGVzOiB0cnVlLFxyXG4gICAgY2FuSW5jcmVtZW50U2Vjb25kczogdHJ1ZSxcclxuXHJcbiAgICBjYW5EZWNyZW1lbnRIb3VyczogdHJ1ZSxcclxuICAgIGNhbkRlY3JlbWVudE1pbnV0ZXM6IHRydWUsXHJcbiAgICBjYW5EZWNyZW1lbnRTZWNvbmRzOiB0cnVlLFxyXG5cclxuICAgIGNhblRvZ2dsZU1lcmlkaWFuOiB0cnVlXHJcbiAgfTtcclxuXHJcbiAgaWYgKCF2YWx1ZSkge1xyXG4gICAgcmV0dXJuIHJlcztcclxuICB9XHJcblxyXG4gIC8vIGNvbXBhcmUgZGF0ZXNcclxuICBpZiAobWF4KSB7XHJcbiAgICBjb25zdCBfbmV3SG91ciA9IGNoYW5nZVRpbWUodmFsdWUsIHsgaG91cjogaG91clN0ZXAgfSk7XHJcbiAgICByZXMuY2FuSW5jcmVtZW50SG91cnMgPSBtYXggPiBfbmV3SG91ciAmJiAodmFsdWUuZ2V0SG91cnMoKSArIGhvdXJTdGVwKSA8IGhvdXJzUGVyRGF5O1xyXG5cclxuICAgIGlmICghcmVzLmNhbkluY3JlbWVudEhvdXJzKSB7XHJcbiAgICAgIGNvbnN0IF9uZXdNaW51dGVzID0gY2hhbmdlVGltZSh2YWx1ZSwgeyBtaW51dGU6IG1pbnV0ZVN0ZXAgfSk7XHJcbiAgICAgIHJlcy5jYW5JbmNyZW1lbnRNaW51dGVzID0gc2hvd1NlY29uZHNcclxuICAgICAgICA/IG1heCA+IF9uZXdNaW51dGVzXHJcbiAgICAgICAgOiBtYXggPj0gX25ld01pbnV0ZXM7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFyZXMuY2FuSW5jcmVtZW50TWludXRlcykge1xyXG4gICAgICBjb25zdCBfbmV3U2Vjb25kcyA9IGNoYW5nZVRpbWUodmFsdWUsIHsgc2Vjb25kczogc2Vjb25kc1N0ZXAgfSk7XHJcbiAgICAgIHJlcy5jYW5JbmNyZW1lbnRTZWNvbmRzID0gbWF4ID49IF9uZXdTZWNvbmRzO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh2YWx1ZS5nZXRIb3VycygpIDwgaG91cnNQZXJEYXlIYWxmKSB7XHJcbiAgICAgIHJlcy5jYW5Ub2dnbGVNZXJpZGlhbiA9IGNoYW5nZVRpbWUodmFsdWUsIHsgaG91cjogaG91cnNQZXJEYXlIYWxmIH0pIDwgbWF4O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaWYgKG1pbikge1xyXG4gICAgY29uc3QgX25ld0hvdXIgPSBjaGFuZ2VUaW1lKHZhbHVlLCB7IGhvdXI6IC1ob3VyU3RlcCB9KTtcclxuICAgIHJlcy5jYW5EZWNyZW1lbnRIb3VycyA9IG1pbiA8IF9uZXdIb3VyO1xyXG5cclxuICAgIGlmICghcmVzLmNhbkRlY3JlbWVudEhvdXJzKSB7XHJcbiAgICAgIGNvbnN0IF9uZXdNaW51dGVzID0gY2hhbmdlVGltZSh2YWx1ZSwgeyBtaW51dGU6IC1taW51dGVTdGVwIH0pO1xyXG4gICAgICByZXMuY2FuRGVjcmVtZW50TWludXRlcyA9IHNob3dTZWNvbmRzXHJcbiAgICAgICAgPyBtaW4gPCBfbmV3TWludXRlc1xyXG4gICAgICAgIDogbWluIDw9IF9uZXdNaW51dGVzO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghcmVzLmNhbkRlY3JlbWVudE1pbnV0ZXMpIHtcclxuICAgICAgY29uc3QgX25ld1NlY29uZHMgPSBjaGFuZ2VUaW1lKHZhbHVlLCB7IHNlY29uZHM6IC1zZWNvbmRzU3RlcCB9KTtcclxuICAgICAgcmVzLmNhbkRlY3JlbWVudFNlY29uZHMgPSBtaW4gPD0gX25ld1NlY29uZHM7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHZhbHVlLmdldEhvdXJzKCkgPj0gaG91cnNQZXJEYXlIYWxmKSB7XHJcbiAgICAgIHJlcy5jYW5Ub2dnbGVNZXJpZGlhbiA9IGNoYW5nZVRpbWUodmFsdWUsIHsgaG91cjogLWhvdXJzUGVyRGF5SGFsZiB9KSA+IG1pbjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiByZXM7XHJcbn1cclxuIl19