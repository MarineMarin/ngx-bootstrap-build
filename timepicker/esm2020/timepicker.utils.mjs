const dex = 10;
const hoursPerDay = 24;
const hoursPerDayHalf = 12;
const minutesPerHour = 60;
const secondsPerMinute = 60;
export function isValidDate(value) {
    if (!value) {
        return false;
    }
    if (value instanceof Date && isNaN(value.getHours())) {
        return false;
    }
    if (typeof value === 'string') {
        return isValidDate(new Date(value));
    }
    return true;
}
export function isValidLimit(controls, newDate) {
    if (controls.min && newDate < controls.min) {
        return false;
    }
    if (controls.max && newDate > controls.max) {
        return false;
    }
    return true;
}
export function toNumber(value) {
    if (typeof value === 'undefined') {
        return NaN;
    }
    if (typeof value === 'number') {
        return value;
    }
    return parseInt(value, dex);
}
export function isNumber(value) {
    return !isNaN(toNumber(value));
}
export function parseHours(value, isPM = false) {
    const hour = toNumber(value);
    if (isNaN(hour) ||
        hour < 0 ||
        hour > (isPM ? hoursPerDayHalf : hoursPerDay)) {
        return NaN;
    }
    return hour;
}
export function parseMinutes(value) {
    const minute = toNumber(value);
    if (isNaN(minute) || minute < 0 || minute > minutesPerHour) {
        return NaN;
    }
    return minute;
}
export function parseSeconds(value) {
    const seconds = toNumber(value);
    if (isNaN(seconds) || seconds < 0 || seconds > secondsPerMinute) {
        return NaN;
    }
    return seconds;
}
export function parseTime(value) {
    if (typeof value === 'string') {
        return new Date(value);
    }
    return value;
}
export function changeTime(value, diff) {
    if (!value) {
        return changeTime(createDate(new Date(), 0, 0, 0), diff);
    }
    if (!diff) {
        return value;
    }
    let hour = value.getHours();
    let minutes = value.getMinutes();
    let seconds = value.getSeconds();
    if (diff.hour) {
        hour = hour + toNumber(diff.hour);
    }
    if (diff.minute) {
        minutes = minutes + toNumber(diff.minute);
    }
    if (diff.seconds) {
        seconds = seconds + toNumber(diff.seconds);
    }
    return createDate(value, hour, minutes, seconds);
}
export function setTime(value, opts) {
    let hour = parseHours(opts.hour);
    const minute = parseMinutes(opts.minute);
    const seconds = parseSeconds(opts.seconds) || 0;
    if (opts.isPM && hour !== 12) {
        hour += hoursPerDayHalf;
    }
    if (!value) {
        if (!isNaN(hour) && !isNaN(minute)) {
            return createDate(new Date(), hour, minute, seconds);
        }
        return value;
    }
    if (isNaN(hour) || isNaN(minute)) {
        return value;
    }
    return createDate(value, hour, minute, seconds);
}
export function createDate(value, hours, minutes, seconds) {
    const newValue = new Date(value.getFullYear(), value.getMonth(), value.getDate(), hours, minutes, seconds, value.getMilliseconds());
    // #3139 ensure date part remains unchanged
    newValue.setFullYear(value.getFullYear());
    newValue.setMonth(value.getMonth());
    newValue.setDate(value.getDate());
    return newValue;
}
export function padNumber(value) {
    const _value = value.toString();
    if (_value.length > 1) {
        return _value;
    }
    return `0${_value}`;
}
export function isHourInputValid(hours, isPM) {
    return !isNaN(parseHours(hours, isPM));
}
export function isMinuteInputValid(minutes) {
    return !isNaN(parseMinutes(minutes));
}
export function isSecondInputValid(seconds) {
    return !isNaN(parseSeconds(seconds));
}
export function isInputLimitValid(diff, max, min) {
    const newDate = setTime(new Date(), diff);
    if (!newDate) {
        return false;
    }
    if (max && newDate > max) {
        return false;
    }
    if (min && newDate < min) {
        return false;
    }
    return true;
}
export function isOneOfDatesEmpty(hours, minutes, seconds) {
    return hours.length === 0 || minutes.length === 0 || seconds.length === 0;
}
export function isInputValid(hours, minutes = '0', seconds = '0', isPM) {
    return isHourInputValid(hours, isPM)
        && isMinuteInputValid(minutes)
        && isSecondInputValid(seconds);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXBpY2tlci51dGlscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy90aW1lcGlja2VyL3RpbWVwaWNrZXIudXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsTUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDO0FBQ2YsTUFBTSxXQUFXLEdBQUcsRUFBRSxDQUFDO0FBQ3ZCLE1BQU0sZUFBZSxHQUFHLEVBQUUsQ0FBQztBQUMzQixNQUFNLGNBQWMsR0FBRyxFQUFFLENBQUM7QUFDMUIsTUFBTSxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7QUFFNUIsTUFBTSxVQUFVLFdBQVcsQ0FBQyxLQUFxQjtJQUMvQyxJQUFJLENBQUMsS0FBSyxFQUFFO1FBQ1YsT0FBTyxLQUFLLENBQUM7S0FDZDtJQUVELElBQUksS0FBSyxZQUFZLElBQUksSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUU7UUFDcEQsT0FBTyxLQUFLLENBQUM7S0FDZDtJQUVELElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1FBQzdCLE9BQU8sV0FBVyxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7S0FDckM7SUFFRCxPQUFPLElBQUksQ0FBQztBQUNkLENBQUM7QUFFRCxNQUFNLFVBQVUsWUFBWSxDQUFDLFFBQWtDLEVBQUUsT0FBYTtJQUM1RSxJQUFJLFFBQVEsQ0FBQyxHQUFHLElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxHQUFHLEVBQUU7UUFDMUMsT0FBTyxLQUFLLENBQUM7S0FDZDtJQUVELElBQUksUUFBUSxDQUFDLEdBQUcsSUFBSSxPQUFPLEdBQUcsUUFBUSxDQUFDLEdBQUcsRUFBRTtRQUMxQyxPQUFPLEtBQUssQ0FBQztLQUNkO0lBRUQsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDO0FBRUQsTUFBTSxVQUFVLFFBQVEsQ0FBQyxLQUF1QjtJQUM5QyxJQUFJLE9BQU8sS0FBSyxL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QUFDO0tBQ2Q7SUFFRCxJQUFJLEdBQUcsSUFBSSxPQUFPLEdBQUcsR0FBRyxFQUFFO1FBQ3hCLE9BQU8sS0FBSyxDQUFDO0tBQ2Q7SUFFRCxJQUFJLEdBQUcsSUFBSSxPQUFPLEdBQUcsR0FBRyxFQUFFO1FBQ3hCLE9BQU8sS0FBSyxDQUFDO0tBQ2Q7SUFFRCxPQUFPLElBQUksQ0FBQztBQUNkLENBQUM7QUFFRCxNQUFNLFVBQVUsaUJBQWlCLENBQUMsS0FBYSxFQUFFLE9BQWUsRUFBRSxPQUFlO0lBQy9FLE9BQU8sS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksT0FBTyxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksT0FBTyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUM7QUFDNUUsQ0FBQztBQUVELE1BQU0sVUFBVSxZQUFZLENBQzFCLEtBQWEsRUFDYixPQUFPLEdBQUcsR0FBRyxFQUNiLE9BQU8sR0FBRyxHQUFHLEVBQ2IsSUFBYTtJQUViLE9BQU8sZ0JBQWdCLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQztXQUMvQixrQkFBa0IsQ0FBQyxPQUFPLENBQUM7V0FDM0Isa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDbkMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRpbWUsIFRpbWVwaWNrZXJDb21wb25lbnRTdGF0ZSB9IGZyb20gJy4vdGltZXBpY2tlci5tb2RlbHMnO1xyXG5cclxuY29uc3QgZGV4ID0gMTA7XHJcbmNvbnN0IGhvdXJzUGVyRGF5ID0gMjQ7XHJcbmNvbnN0IGhvdXJzUGVyRGF5SGFsZiA9IDEyO1xyXG5jb25zdCBtaW51dGVzUGVySG91ciA9IDYwO1xyXG5jb25zdCBzZWNvbmRzUGVyTWludXRlID0gNjA7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNWYWxpZERhdGUodmFsdWU/OiBzdHJpbmcgfCBEYXRlKTogYm9vbGVhbiB7XHJcbiAgaWYgKCF2YWx1ZSkge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgaWYgKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSAmJiBpc05hTih2YWx1ZS5nZXRIb3VycygpKSkge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcclxuICAgIHJldHVybiBpc1ZhbGlkRGF0ZShuZXcgRGF0ZSh2YWx1ZSkpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHRydWU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc1ZhbGlkTGltaXQoY29udHJvbHM6IFRpbWVwaWNrZXJDb21wb25lbnRTdGF0ZSwgbmV3RGF0ZTogRGF0ZSk6IGJvb2xlYW4ge1xyXG4gIGlmIChjb250cm9scy5taW4gJiYgbmV3RGF0ZSA8IGNvbnRyb2xzLm1pbikge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgaWYgKGNvbnRyb2xzLm1heCAmJiBuZXdEYXRlID4gY29udHJvbHMubWF4KSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gdHJ1ZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHRvTnVtYmVyKHZhbHVlPzogc3RyaW5nIHwgbnVtYmVyKTogbnVtYmVyIHtcclxuICBpZiAodHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgcmV0dXJuIE5hTjtcclxuICB9XHJcblxyXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gcGFyc2VJbnQodmFsdWUsIGRleCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc051bWJlcih2YWx1ZTogc3RyaW5nIHwgbnVtYmVyKTogdmFsdWUgaXMgbnVtYmVyIHtcclxuICByZXR1cm4gIWlzTmFOKHRvTnVtYmVyKHZhbHVlKSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUhvdXJzKFxyXG4gIHZhbHVlPzogc3RyaW5nIHwgbnVtYmVyLFxyXG4gIGlzUE0gPSBmYWxzZVxyXG4pOiBudW1iZXIge1xyXG4gIGNvbnN0IGhvdXIgPSB0b051bWJlcih2YWx1ZSk7XHJcbiAgaWYgKFxyXG4gICAgaXNOYU4oaG91cikgfHxcclxuICAgIGhvdXIgPCAwIHx8XHJcbiAgICBob3VyID4gKGlzUE0gPyBob3Vyc1BlckRheUhhbGYgOiBob3Vyc1BlckRheSlcclxuICApIHtcclxuICAgIHJldHVybiBOYU47XHJcbiAgfVxyXG5cclxuICByZXR1cm4gaG91cjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlTWludXRlcyh2YWx1ZT86IHN0cmluZyB8IG51bWJlcik6IG51bWJlciB7XHJcbiAgY29uc3QgbWludXRlID0gdG9OdW1iZXIodmFsdWUpO1xyXG4gIGlmIChpc05hTihtaW51dGUpIHx8IG1pbnV0ZSA8IDAgfHwgbWludXRlID4gbWludXRlc1BlckhvdXIpIHtcclxuICAgIHJldHVybiBOYU47XHJcbiAgfVxyXG5cclxuICByZXR1cm4gbWludXRlO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VTZWNvbmRzKHZhbHVlPzogc3RyaW5nIHwgbnVtYmVyKTogbnVtYmVyIHtcclxuICBjb25zdCBzZWNvbmRzID0gdG9OdW1iZXIodmFsdWUpO1xyXG4gIGlmIChpc05hTihzZWNvbmRzKSB8fCBzZWNvbmRzIDwgMCB8fCBzZWNvbmRzID4gc2Vjb25kc1Blck1pbnV0ZSkge1xyXG4gICAgcmV0dXJuIE5hTjtcclxuICB9XHJcblxyXG4gIHJldHVybiBzZWNvbmRzO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VUaW1lKHZhbHVlPzogc3RyaW5nIHwgRGF0ZSk6IERhdGUgfCB1bmRlZmluZWQge1xyXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICByZXR1cm4gbmV3IERhdGUodmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHZhbHVlO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY2hhbmdlVGltZSh2YWx1ZT86IERhdGUsIGRpZmY/OiBUaW1lKTogRGF0ZSB7XHJcbiAgaWYgKCF2YWx1ZSkge1xyXG4gICAgcmV0dXJuIGNoYW5nZVRpbWUoY3JlYXRlRGF0ZShuZXcgRGF0ZSgpLCAwLCAwLCAwKSwgZGlmZik7XHJcbiAgfVxyXG5cclxuICBpZiAoIWRpZmYpIHtcclxuICAgIHJldHVybiB2YWx1ZTtcclxuICB9XHJcblxyXG4gIGxldCBob3VyID0gdmFsdWUuZ2V0SG91cnMoKTtcclxuICBsZXQgbWludXRlcyA9IHZhbHVlLmdldE1pbnV0ZXMoKTtcclxuICBsZXQgc2Vjb25kcyA9IHZhbHVlLmdldFNlY29uZHMoKTtcclxuXHJcbiAgaWYgKGRpZmYuaG91cikge1xyXG4gICAgaG91ciA9IGhvdXIgKyB0b051bWJlcihkaWZmLmhvdXIpO1xyXG4gIH1cclxuXHJcbiAgaWYgKGRpZmYubWludXRlKSB7XHJcbiAgICBtaW51dGVzID0gbWludXRlcyArIHRvTnVtYmVyKGRpZmYubWludXRlKTtcclxuICB9XHJcblxyXG4gIGlmIChkaWZmLnNlY29uZHMpIHtcclxuICAgIHNlY29uZHMgPSBzZWNvbmRzICsgdG9OdW1iZXIoZGlmZi5zZWNvbmRzKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBjcmVhdGVEYXRlKHZhbHVlLCBob3VyLCBtaW51dGVzLCBzZWNvbmRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNldFRpbWUodmFsdWU6IERhdGUgfCB1bmRlZmluZWQsIG9wdHM6IFRpbWUpOiBEYXRlIHwgdW5kZWZpbmVkIHtcclxuICBsZXQgaG91ciA9IHBhcnNlSG91cnMob3B0cy5ob3VyKTtcclxuICBjb25zdCBtaW51dGUgPSBwYXJzZU1pbnV0ZXMob3B0cy5taW51dGUpO1xyXG4gIGNvbnN0IHNlY29uZHMgPSBwYXJzZVNlY29uZHMob3B0cy5zZWNvbmRzKSB8fCAwO1xyXG5cclxuICBpZiAob3B0cy5pc1BNICYmIGhvdXIgIT09IDEyKSB7XHJcbiAgICBob3VyICs9IGhvdXJzUGVyRGF5SGFsZjtcclxuICB9XHJcblxyXG4gIGlmICghdmFsdWUpIHtcclxuICAgIGlmICghaXNOYU4oaG91cikgJiYgIWlzTmFOKG1pbnV0ZSkpIHtcclxuICAgICAgcmV0dXJuIGNyZWF0ZURhdGUobmV3IERhdGUoKSwgaG91ciwgbWludXRlLCBzZWNvbmRzKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbiAgfVxyXG5cclxuICBpZiAoaXNOYU4oaG91cikgfHwgaXNOYU4obWludXRlKSkge1xyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGNyZWF0ZURhdGUodmFsdWUsIGhvdXIsIG1pbnV0ZSwgc2Vjb25kcyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVEYXRlKFxyXG4gIHZhbHVlOiBEYXRlLFxyXG4gIGhvdXJzOiBudW1iZXIsXHJcbiAgbWludXRlczogbnVtYmVyLFxyXG4gIHNlY29uZHM6IG51bWJlclxyXG4pOiBEYXRlIHtcclxuICBjb25zdCBuZXdWYWx1ZSA9IG5ldyBEYXRlKFxyXG4gICAgdmFsdWUuZ2V0RnVsbFllYXIoKSxcclxuICAgIHZhbHVlLmdldE1vbnRoKCksXHJcbiAgICB2YWx1ZS5nZXREYXRlKCksXHJcbiAgICBob3VycyxcclxuICAgIG1pbnV0ZXMsXHJcbiAgICBzZWNvbmRzLFxyXG4gICAgdmFsdWUuZ2V0TWlsbGlzZWNvbmRzKClcclxuICApO1xyXG4gIC8vICMzMTM5IGVuc3VyZSBkYXRlIHBhcnQgcmVtYWlucyB1bmNoYW5nZWRcclxuICBuZXdWYWx1ZS5zZXRGdWxsWWVhcih2YWx1ZS5nZXRGdWxsWWVhcigpKTtcclxuICBuZXdWYWx1ZS5zZXRNb250aCh2YWx1ZS5nZXRNb250aCgpKTtcclxuICBuZXdWYWx1ZS5zZXREYXRlKHZhbHVlLmdldERhdGUoKSk7XHJcblxyXG4gIHJldHVybiBuZXdWYWx1ZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHBhZE51bWJlcih2YWx1ZTogbnVtYmVyKTogc3RyaW5nIHtcclxuICBjb25zdCBfdmFsdWUgPSB2YWx1ZS50b1N0cmluZygpO1xyXG4gIGlmIChfdmFsdWUubGVuZ3RoID4gMSkge1xyXG4gICAgcmV0dXJuIF92YWx1ZTtcclxuICB9XHJcblxyXG4gIHJldHVybiBgMCR7X3ZhbHVlfWA7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0hvdXJJbnB1dFZhbGlkKGhvdXJzOiBzdHJpbmcsIGlzUE06IGJvb2xlYW4pOiBib29sZWFuIHtcclxuICByZXR1cm4gIWlzTmFOKHBhcnNlSG91cnMoaG91cnMsIGlzUE0pKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzTWludXRlSW5wdXRWYWxpZChtaW51dGVzOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICByZXR1cm4gIWlzTmFOKHBhcnNlTWludXRlcyhtaW51dGVzKSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc1NlY29uZElucHV0VmFsaWQoc2Vjb25kczogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgcmV0dXJuICFpc05hTihwYXJzZVNlY29uZHMoc2Vjb25kcykpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNJbnB1dExpbWl0VmFsaWQoZGlmZjogVGltZSwgbWF4PzogRGF0ZSwgbWluPzogRGF0ZSk6IGJvb2xlYW4ge1xyXG4gIGNvbnN0IG5ld0RhdGUgPSBzZXRUaW1lKG5ldyBEYXRlKCksIGRpZmYpO1xyXG5cclxuICBpZiAoIW5ld0RhdGUpIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIGlmIChtYXggJiYgbmV3RGF0ZSA+IG1heCkge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgaWYgKG1pbiAmJiBuZXdEYXRlIDwgbWluKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gdHJ1ZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzT25lT2ZEYXRlc0VtcHR5KGhvdXJzOiBzdHJpbmcsIG1pbnV0ZXM6IHN0cmluZywgc2Vjb25kczogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgcmV0dXJuIGhvdXJzLmxlbmd0aCA9PT0gMCB8fCBtaW51dGVzLmxlbmd0aCA9PT0gMCB8fCBzZWNvbmRzLmxlbmd0aCA9PT0gMDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzSW5wdXRWYWxpZChcclxuICBob3Vyczogc3RyaW5nLFxyXG4gIG1pbnV0ZXMgPSAnMCcsXHJcbiAgc2Vjb25kcyA9ICcwJyxcclxuICBpc1BNOiBib29sZWFuXHJcbik6IGJvb2xlYW4ge1xyXG4gIHJldHVybiBpc0hvdXJJbnB1dFZhbGlkKGhvdXJzLCBpc1BNKVxyXG4gICAgJiYgaXNNaW51dGVJbnB1dFZhbGlkKG1pbnV0ZXMpXHJcbiAgICAmJiBpc1NlY29uZElucHV0VmFsaWQoc2Vjb25kcyk7XHJcbn1cclxuIl19