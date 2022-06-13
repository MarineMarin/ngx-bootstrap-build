import { getDay, isFirstDayOfWeek, isAfter, isBefore, shiftDate, endOf, startOf, isArray, isSame } from 'ngx-bootstrap/chronos';
export function getStartingDayOfCalendar(date, options) {
    if (isFirstDayOfWeek(date, options.firstDayOfWeek)) {
        return date;
    }
    const weekDay = getDay(date);
    const offset = calculateDateOffset(weekDay, options.firstDayOfWeek);
    return shiftDate(date, { day: -offset });
}
export function calculateDateOffset(weekday, startingDayOffset) {
    const _startingDayOffset = Number(startingDayOffset);
    if (isNaN(_startingDayOffset)) {
        return 0;
    }
    if (_startingDayOffset === 0) {
        return weekday;
    }
    const offset = weekday - _startingDayOffset % 7;
    return offset < 0 ? offset + 7 : offset;
}
export function isMonthDisabled(date, min, max) {
    const minBound = min && isBefore(endOf(date, 'month'), min, 'day');
    const maxBound = max && isAfter(startOf(date, 'month'), max, 'day');
    return minBound || maxBound || false;
}
export function isYearDisabled(date, min, max) {
    const minBound = min && isBefore(endOf(date, 'year'), min, 'day');
    const maxBound = max && isAfter(startOf(date, 'year'), max, 'day');
    return minBound || maxBound || false;
}
export function isDisabledDate(date, datesDisabled, unit) {
    if (!datesDisabled || !isArray(datesDisabled) || !datesDisabled.length) {
        return false;
    }
    if (unit && unit === 'year' && !datesDisabled[0].getDate()) {
        return datesDisabled.some((dateDisabled) => isSame(date, dateDisabled, 'year'));
    }
    return datesDisabled.some((dateDisabled) => isSame(date, dateDisabled, 'date'));
}
export function isEnabledDate(date, datesEnabled, unit) {
    if (!datesEnabled || !isArray(datesEnabled) || !datesEnabled.length) {
        return false;
    }
    return !datesEnabled.some((enabledDate) => isSame(date, enabledDate, unit || 'date'));
}
export function getYearsCalendarInitialDate(state, calendarIndex = 0) {
    const model = state && state.yearsCalendarModel && state.yearsCalendarModel[calendarIndex];
    return model?.years[0] && model.years[0][0] && model.years[0][0].date;
}
export function checkRangesWithMaxDate(ranges, maxDate) {
    if (!ranges)
        return ranges;
    if (!maxDate)
        return ranges;
    if (!ranges.length && !ranges[0].value)
        return ranges;
    ranges.forEach((item) => {
        if (!item || !item.value)
            return ranges;
        if (item.value instanceof Date)
            return ranges;
        if (!(item.value instanceof Array && item.value.length))
            return ranges;
        item.value = compareDateWithMaxDateHelper(item.value, maxDate);
        return ranges;
    });
    return ranges;
}
export function checkBsValue(date, maxDate) {
    if (!date)
        return date;
    if (!maxDate)
        return date;
    if (date instanceof Array && !date.length)
        return date;
    if (date instanceof Date)
        return date;
    return compareDateWithMaxDateHelper(date, maxDate);
}
function compareDateWithMaxDateHelper(date, maxDate) {
    if (date instanceof Array) {
        const editedValues = date.map(item => {
            if (!item)
                return item;
            if (isAfter(item, maxDate, 'date'))
                item = maxDate;
            return item;
        });
        return editedValues;
    }
    return date;
}
export function setCurrentTimeOnDateSelect(value) {
    if (!value)
        return value;
    return setCurrentTimeHelper(value);
}
export function setDateRangesCurrentTimeOnDateSelect(value) {
    if (!value?.length)
        return value;
    value.map((date) => {
        if (!date) {
            return date;
        }
        return setCurrentTimeHelper(date);
    });
    return value;
}
function setCurrentTimeHelper(date) {
    const now = new Date();
    date.setMilliseconds(now.getMilliseconds());
    date.setSeconds(now.getSeconds());
    date.setMinutes(now.getMinutes());
    date.setHours(now.getHours());
    return date;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnMtY2FsZW5kYXItdXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvZGF0ZXBpY2tlci91dGlscy9icy1jYWxlbmRhci11dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsTUFBTSxFQUNOLGdCQUFnQixFQUNoQixPQUFPLEVBQ1AsUUFBUSxFQUNSLFNBQVMsRUFDVCxLQUFLLEVBQ0wsT0FBTyxFQUNQLE9BQU8sRUFDUCxNQUFNLEVBQ1AsTUFBTSx1QkFBdUIsQ0FBQztBQUkvQixNQUFNLFVBQVUsd0JBQXdCLENBQUMsSUFBVSxFQUNWLE9BQW9DO0lBQzNFLElBQUksZ0JBQWdCLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxjQUFjLENBQUMsRUFBRTtRQUNsRCxPQUFPLElBQUksQ0FBQztLQUNiO0lBRUQsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdCLE1BQU0sTUFBTSxHQUFHLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7SUFFcEUsT0FBTyxTQUFTLENBQUMsSUFBSSxFQUFFLEVBQUMsR0FBRyxFQUFFLENBQUMsTUFBTSxFQUFDLENBQUMsQ0FBQztBQUN6QyxDQUFDO0FBRUQsTUFBTSxVQUFVLG1CQUFtQixDQUFDLE9BQWUsRUFBRSxpQkFBMEI7SUFDN0UsTUFBTSxrQkFBa0IsR0FBRyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUNyRCxJQUFJLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFO1FBQzdCLE9BQU8sQ0FBQyxDQUFDO0tBQ1Y7SUFFRCxJQUFJLGtCQUFrQixLQUFLLENBQUMsRUFBRTtRQUM1QixPQUFPLE9BQU8sQ0FBQztLQUNoQjtJQUVELE1BQU0sTUFBTSxHQUFHLE9BQU8sR0FBRyxrQkFBa0IsR0FBRyxDQUFDLENBQUM7SUFFaEQsT0FBTyxNQUFNLEdBQUcsQ0FBQyxDQUFD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QUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO0lBQ2xDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFDOUIsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBnZXREYXksXHJcbiAgaXNGaXJzdERheU9mV2VlayxcclxuICBpc0FmdGVyLFxyXG4gIGlzQmVmb3JlLFxyXG4gIHNoaWZ0RGF0ZSxcclxuICBlbmRPZixcclxuICBzdGFydE9mLFxyXG4gIGlzQXJyYXksXHJcbiAgaXNTYW1lXHJcbn0gZnJvbSAnbmd4LWJvb3RzdHJhcC9jaHJvbm9zJztcclxuaW1wb3J0IHsgQnNEYXRlcGlja2VyU3RhdGUgfSBmcm9tICcuLi9yZWR1Y2VyL2JzLWRhdGVwaWNrZXIuc3RhdGUnO1xyXG5pbXBvcnQgeyBCc0N1c3RvbURhdGVzIH0gZnJvbSAnLi4vdGhlbWVzL2JzL2JzLWN1c3RvbS1kYXRlcy12aWV3LmNvbXBvbmVudCc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3RhcnRpbmdEYXlPZkNhbGVuZGFyKGRhdGU6IERhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogeyBmaXJzdERheU9mV2Vlaz86IG51bWJlciB9KTogRGF0ZSB7XHJcbiAgaWYgKGlzRmlyc3REYXlPZldlZWsoZGF0ZSwgb3B0aW9ucy5maXJzdERheU9mV2VlaykpIHtcclxuICAgIHJldHVybiBkYXRlO1xyXG4gIH1cclxuXHJcbiAgY29uc3Qgd2Vla0RheSA9IGdldERheShkYXRlKTtcclxuICBjb25zdCBvZmZzZXQgPSBjYWxjdWxhdGVEYXRlT2Zmc2V0KHdlZWtEYXksIG9wdGlvbnMuZmlyc3REYXlPZldlZWspO1xyXG5cclxuICByZXR1cm4gc2hpZnREYXRlKGRhdGUsIHtkYXk6IC1vZmZzZXR9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNhbGN1bGF0ZURhdGVPZmZzZXQod2Vla2RheTogbnVtYmVyLCBzdGFydGluZ0RheU9mZnNldD86IG51bWJlcik6IG51bWJlciB7XHJcbiAgY29uc3QgX3N0YXJ0aW5nRGF5T2Zmc2V0ID0gTnVtYmVyKHN0YXJ0aW5nRGF5T2Zmc2V0KTtcclxuICBpZiAoaXNOYU4oX3N0YXJ0aW5nRGF5T2Zmc2V0KSkge1xyXG4gICAgcmV0dXJuIDA7XHJcbiAgfVxyXG5cclxuICBpZiAoX3N0YXJ0aW5nRGF5T2Zmc2V0ID09PSAwKSB7XHJcbiAgICByZXR1cm4gd2Vla2RheTtcclxuICB9XHJcblxyXG4gIGNvbnN0IG9mZnNldCA9IHdlZWtkYXkgLSBfc3RhcnRpbmdEYXlPZmZzZXQgJSA3O1xyXG5cclxuICByZXR1cm4gb2Zmc2V0IDwgMCA/IG9mZnNldCArIDcgOiBvZmZzZXQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc01vbnRoRGlzYWJsZWQoZGF0ZTogRGF0ZSwgbWluPzogRGF0ZSwgbWF4PzogRGF0ZSk6IGJvb2xlYW4ge1xyXG4gIGNvbnN0IG1pbkJvdW5kID0gbWluICYmIGlzQmVmb3JlKGVuZE9mKGRhdGUsICdtb250aCcpLCBtaW4sICdkYXknKTtcclxuICBjb25zdCBtYXhCb3VuZCA9IG1heCAmJiBpc0FmdGVyKHN0YXJ0T2YoZGF0ZSwgJ21vbnRoJyksIG1heCwgJ2RheScpO1xyXG5cclxuICByZXR1cm4gbWluQm91bmQgfHwgbWF4Qm91bmQgfHwgZmFsc2U7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc1llYXJEaXNhYmxlZChkYXRlOiBEYXRlLCBtaW4/OiBEYXRlLCBtYXg/OiBEYXRlKTogYm9vbGVhbiB7XHJcbiAgY29uc3QgbWluQm91bmQgPSBtaW4gJiYgaXNCZWZvcmUoZW5kT2YoZGF0ZSwgJ3llYXInKSwgbWluLCAnZGF5Jyk7XHJcbiAgY29uc3QgbWF4Qm91bmQgPSBtYXggJiYgaXNBZnRlcihzdGFydE9mKGRhdGUsICd5ZWFyJyksIG1heCwgJ2RheScpO1xyXG5cclxuICByZXR1cm4gbWluQm91bmQgfHwgbWF4Qm91bmQgfHwgZmFsc2U7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0Rpc2FibGVkRGF0ZShkYXRlPzogRGF0ZSwgZGF0ZXNEaXNhYmxlZD86IERhdGVbXSwgdW5pdD86ICd5ZWFyJyB8ICdkYXRlJyB8ICdtb250aCcpOiBib29sZWFuIHtcclxuICBpZiAoIWRhdGVzRGlzYWJsZWQgIHx8ICFpc0FycmF5KGRhdGVzRGlzYWJsZWQpIHx8ICFkYXRlc0Rpc2FibGVkLmxlbmd0aCkge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgaWYgKHVuaXQgJiYgdW5pdCA9PT0gJ3llYXInICYmICFkYXRlc0Rpc2FibGVkWzBdLmdldERhdGUoKSkge1xyXG4gICAgcmV0dXJuIGRhdGVzRGlzYWJsZWQuc29tZSgoZGF0ZURpc2FibGVkOiBEYXRlKSA9PiBpc1NhbWUoZGF0ZSwgZGF0ZURpc2FibGVkLCAneWVhcicpKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBkYXRlc0Rpc2FibGVkLnNvbWUoKGRhdGVEaXNhYmxlZDogRGF0ZSkgPT4gaXNTYW1lKGRhdGUsIGRhdGVEaXNhYmxlZCwgJ2RhdGUnKSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0VuYWJsZWREYXRlKGRhdGU/OiBEYXRlLCBkYXRlc0VuYWJsZWQ/OiBEYXRlW10sIHVuaXQ/OiAneWVhcicgfCAnZGF0ZScgfCAnbW9udGgnKTogYm9vbGVhbiB7XHJcbiAgaWYgKCFkYXRlc0VuYWJsZWQgfHwgIWlzQXJyYXkoZGF0ZXNFbmFibGVkKSB8fCAhZGF0ZXNFbmFibGVkLmxlbmd0aCkge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuICFkYXRlc0VuYWJsZWQuc29tZSgoZW5hYmxlZERhdGU6IERhdGUpID0+IGlzU2FtZShkYXRlLCBlbmFibGVkRGF0ZSwgdW5pdCB8fCAnZGF0ZScpKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFllYXJzQ2FsZW5kYXJJbml0aWFsRGF0ZShzdGF0ZTogQnNEYXRlcGlja2VyU3RhdGUsIGNhbGVuZGFySW5kZXggPSAwKTogRGF0ZSB8IHVuZGVmaW5lZCB7XHJcbiAgY29uc3QgbW9kZWwgPSBzdGF0ZSAmJiBzdGF0ZS55ZWFyc0NhbGVuZGFyTW9kZWwgJiYgc3RhdGUueWVhcnNDYWxlbmRhck1vZGVsW2NhbGVuZGFySW5kZXhdO1xyXG5cclxuICByZXR1cm4gbW9kZWw/LnllYXJzWzBdICYmIG1vZGVsLnllYXJzWzBdWzBdICYmIG1vZGVsLnllYXJzWzBdWzBdLmRhdGU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjaGVja1Jhbmdlc1dpdGhNYXhEYXRlKHJhbmdlcz86IEJzQ3VzdG9tRGF0ZXNbXSwgbWF4RGF0ZT86IERhdGUpOiBCc0N1c3RvbURhdGVzW10gfCB1bmRlZmluZWQge1xyXG4gIGlmICghcmFuZ2VzKSByZXR1cm4gcmFuZ2VzO1xyXG4gIGlmICghbWF4RGF0ZSkgcmV0dXJuIHJhbmdlcztcclxuICBpZiAoIXJhbmdlcy5sZW5ndGggJiYgIXJhbmdlc1swXS52YWx1ZSkgcmV0dXJuICByYW5nZXM7XHJcblxyXG4gIHJhbmdlcy5mb3JFYWNoKChpdGVtOiBCc0N1c3RvbURhdGVzKSA9PiB7XHJcbiAgICBpZiAoIWl0ZW0gfHwgIWl0ZW0udmFsdWUpIHJldHVybiByYW5nZXM7XHJcbiAgICBpZiAoaXRlbS52YWx1ZSBpbnN0YW5jZW9mIERhdGUpIHJldHVybiAgcmFuZ2VzO1xyXG4gICAgaWYgKCEoaXRlbS52YWx1ZSBpbnN0YW5jZW9mIEFycmF5ICYmIGl0ZW0udmFsdWUubGVuZ3RoKSApIHJldHVybiByYW5nZXM7XHJcbiAgICBpdGVtLnZhbHVlID0gY29tcGFyZURhdGVXaXRoTWF4RGF0ZUhlbHBlcihpdGVtLnZhbHVlLCBtYXhEYXRlKTtcclxuICAgIHJldHVybiByYW5nZXM7XHJcbiAgfSk7XHJcbiAgcmV0dXJuIHJhbmdlcztcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrQnNWYWx1ZShkYXRlPzogQXJyYXk8RGF0ZT4gfCBEYXRlIHwgKERhdGUgfCB1bmRlZmluZWQpW10sIG1heERhdGU/OiBEYXRlKTogQXJyYXk8RGF0ZT4gfCBEYXRlIHwgKERhdGV8dW5kZWZpbmVkKVtdIHwgdW5kZWZpbmVkIHtcclxuICBpZiAoIWRhdGUpIHJldHVybiBkYXRlO1xyXG4gIGlmICghbWF4RGF0ZSkgcmV0dXJuIGRhdGU7XHJcbiAgaWYgKGRhdGUgaW5zdGFuY2VvZiBBcnJheSAmJiAhZGF0ZS5sZW5ndGgpIHJldHVybiBkYXRlO1xyXG4gIGlmIChkYXRlIGluc3RhbmNlb2YgRGF0ZSkgcmV0dXJuICBkYXRlO1xyXG4gIHJldHVybiBjb21wYXJlRGF0ZVdpdGhNYXhEYXRlSGVscGVyKGRhdGUsIG1heERhdGUpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjb21wYXJlRGF0ZVdpdGhNYXhEYXRlSGVscGVyIDxUPihkYXRlOiBULCBtYXhEYXRlOiBEYXRlKTogVCB8IERhdGVbXSB7XHJcbiAgaWYgKGRhdGUgaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgY29uc3QgZWRpdGVkVmFsdWVzID0gZGF0ZS5tYXAoaXRlbSA9PiB7XHJcbiAgICAgIGlmICghaXRlbSkgcmV0dXJuICBpdGVtO1xyXG4gICAgICBpZiAoaXNBZnRlcihpdGVtLCBtYXhEYXRlLCAnZGF0ZScpKSBpdGVtID0gbWF4RGF0ZTtcclxuICAgICAgcmV0dXJuIGl0ZW07XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBlZGl0ZWRWYWx1ZXM7XHJcbiAgfVxyXG4gIHJldHVybiBkYXRlO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0Q3VycmVudFRpbWVPbkRhdGVTZWxlY3QodmFsdWU/OiBEYXRlKTogRGF0ZSB8IHVuZGVmaW5lZCB7XHJcbiAgaWYgKCF2YWx1ZSkgcmV0dXJuIHZhbHVlO1xyXG5cclxuICByZXR1cm4gc2V0Q3VycmVudFRpbWVIZWxwZXIodmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0RGF0ZVJhbmdlc0N1cnJlbnRUaW1lT25EYXRlU2VsZWN0KHZhbHVlPzogKERhdGV8dW5kZWZpbmVkKVtdKTogKERhdGV8dW5kZWZpbmVkKVtdIHwgdW5kZWZpbmVkIHtcclxuICBpZiAoIXZhbHVlPy5sZW5ndGgpIHJldHVybiB2YWx1ZTtcclxuXHJcbiAgdmFsdWUubWFwKChkYXRlKSA9PiB7XHJcbiAgICBpZiAoIWRhdGUpIHtcclxuICAgICAgcmV0dXJuIGRhdGU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc2V0Q3VycmVudFRpbWVIZWxwZXIoZGF0ZSk7XHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiB2YWx1ZTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2V0Q3VycmVudFRpbWVIZWxwZXIoZGF0ZTogRGF0ZSk6IERhdGUge1xyXG4gIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XHJcbiAgZGF0ZS5zZXRNaWxsaXNlY29uZHMobm93LmdldE1pbGxpc2Vjb25kcygpKTtcclxuICBkYXRlLnNldFNlY29uZHMobm93LmdldFNlY29uZHMoKSk7XHJcbiAgZGF0ZS5zZXRNaW51dGVzKG5vdy5nZXRNaW51dGVzKCkpO1xyXG4gIGRhdGUuc2V0SG91cnMobm93LmdldEhvdXJzKCkpO1xyXG4gIHJldHVybiBkYXRlO1xyXG59XHJcbiJdfQ==