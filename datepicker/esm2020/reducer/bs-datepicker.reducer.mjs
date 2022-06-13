import { initialDatepickerState } from './bs-datepicker.state';
import { BsDatepickerActions } from './bs-datepicker.actions';
import { calcDaysCalendar } from '../engine/calc-days-calendar';
import { formatDaysCalendar } from '../engine/format-days-calendar';
import { flagDaysCalendar } from '../engine/flag-days-calendar';
import { setFullDate, shiftDate, isArray, isDateValid, startOf, getLocale, isAfter, isBefore, isSame } from 'ngx-bootstrap/chronos';
import { canSwitchMode } from '../engine/view-mode';
import { formatMonthsCalendar } from '../engine/format-months-calendar';
import { flagMonthsCalendar } from '../engine/flag-months-calendar';
import { formatYearsCalendar, initialYearShift, yearsPerCalendar } from '../engine/format-years-calendar';
import { flagYearsCalendar } from '../engine/flag-years-calendar';
import { getYearsCalendarInitialDate } from '../utils/bs-calendar-utils';
import { copyTime } from '../utils/copy-time-utils';
export function bsDatepickerReducer(state = initialDatepickerState, action) {
    switch (action.type) {
        case BsDatepickerActions.CALCULATE: {
            return calculateReducer(state);
        }
        case BsDatepickerActions.FORMAT: {
            return formatReducer(state);
        }
        case BsDatepickerActions.FLAG: {
            return flagReducer(state);
        }
        case BsDatepickerActions.NAVIGATE_OFFSET: {
            return navigateOffsetReducer(state, action);
        }
        case BsDatepickerActions.NAVIGATE_TO: {
            const payload = action.payload;
            if (!state.view || !payload.unit) {
                return state;
            }
            const date = setFullDate(state.view.date, payload.unit);
            let newState;
            let mode;
            if (canSwitchMode(payload.viewMode, state.minMode)) {
                mode = payload.viewMode;
                newState = { view: { date, mode } };
            }
            else {
                mode = state.view.mode;
                newState = { selectedDate: date, view: { date, mode } };
            }
            return Object.assign({}, state, newState);
        }
        case BsDatepickerActions.CHANGE_VIEWMODE: {
            if (!canSwitchMode(action.payload, state.minMode) || !state.view) {
                return state;
            }
            const date = state.view.date;
            const mode = action.payload;
            const newState = { view: { date, mode } };
            return Object.assign({}, state, newState);
        }
        case BsDatepickerActions.HOVER: {
            return Object.assign({}, state, { hoveredDate: action.payload });
        }
        case BsDatepickerActions.SELECT: {
            if (!state.view) {
                return state;
            }
            const newState = {
                selectedDate: action.payload,
                view: state.view
            };
            if (Array.isArray(state.selectedTime)) {
                const _time = state.selectedTime[0];
                if (newState.selectedDate && _time) {
                    copyTime(newState.selectedDate, _time);
                }
            }
            const mode = state.view.mode;
            const _date = action.payload || state.view.date;
            const date = getViewDate(_date, state.minDate, state.maxDate);
            newState.view = { mode, date };
            return Object.assign({}, state, newState);
        }
        case BsDatepickerActions.SELECT_TIME: {
            const { date, index } = action.payload;
            const selectedTime = state.selectedTime ? [...state.selectedTime] : [];
            selectedTime[index] = date;
            return Object.assign({}, state, { selectedTime });
        }
        case BsDatepickerActions.SET_OPTIONS: {
            if (!state.view) {
                return state;
            }
            const newState = action.payload;
            // preserve view mode
            const mode = newState.minMode ? newState.minMode : state.view.mode;
            const _viewDate = isDateValid(newState.value) && newState.value
                || isArray(newState.value) && isDateValid(newState.value[0]) && newState.value[0]
                || state.view.date;
            const date = getViewDate(_viewDate, newState.minDate, newState.maxDate);
            newState.view = { mode, date };
            // update selected value
            if (newState.value) {
                // if new value is array we work with date range
                if (isArray(newState.value)) {
                    newState.selectedRange = newState.value;
                    newState.selectedTime = newState.value.map((i) => i);
                }
                // if new value is a date -> datepicker
                if (newState.value instanceof Date) {
                    newState.selectedDate = newState.value;
                    newState.selectedTime = [newState.value];
                }
                // provided value is not supported :)
                // need to report it somehow
            }
            return Object.assign({}, state, newState);
        }
        // date range picker
        case BsDatepickerActions.SELECT_RANGE: {
            if (!state.view) {
                return state;
            }
            const newState = {
                selectedRange: action.payload,
                view: state.view
            };
            newState.selectedRange?.forEach((dte, index) => {
                if (Array.isArray(state.selectedTime)) {
                    const _time = state.selectedTime[index];
                    if (_time) {
                        copyTime(dte, _time);
                    }
                }
            });
            const mode = state.view.mode;
            const _date = action.payload && action.payload[0] || state.view.date;
            const date = getViewDate(_date, state.minDate, state.maxDate);
            newState.view = { mode, date };
            return Object.assign({}, state, newState);
        }
        case BsDatepickerActions.SET_MIN_DATE: {
            return Object.assign({}, state, {
                minDate: action.payload
            });
        }
        case BsDatepickerActions.SET_MAX_DATE: {
            return Object.assign({}, state, {
                maxDate: action.payload
            });
        }
        case BsDatepickerActions.SET_IS_DISABLED: {
            return Object.assign({}, state, {
                isDisabled: action.payload
            });
        }
        case BsDatepickerActions.SET_DATE_CUSTOM_CLASSES: {
            return Object.assign({}, state, {
                dateCustomClasses: action.payload
            });
        }
        case BsDatepickerActions.SET_DATE_TOOLTIP_TEXTS: {
            return Object.assign({}, state, {
                dateTooltipTexts: action.payload
            });
        }
        default:
            return state;
    }
}
function calculateReducer(state) {
    if (!state.view) {
        return state;
    }
    // how many calendars
    let displayMonths;
    if (state.displayOneMonthRange &&
        isDisplayOneMonth(state.view.date, state.minDate, state.maxDate)) {
        displayMonths = 1;
    }
    else {
        displayMonths = state.displayMonths || 1;
    }
    // use selected date on initial rendering if set
    let viewDate = state.view.date;
    if (state.view.mode === 'day' && state.monthViewOptions) {
        if (state.showPreviousMonth && state.selectedRange && state.selectedRange.length === 0) {
            viewDate = shiftDate(viewDate, { month: -1 });
        }
        state.monthViewOptions.firstDayOfWeek = getLocale(state.locale).firstDayOfWeek();
        let monthsModel = new Array(displayMonths);
        for (let monthIndex = 0; monthIndex < displayMonths; monthIndex++) {
            // todo: for unlinked calendars it will be harder
            monthsModel[monthIndex] = calcDaysCalendar(viewDate, state.monthViewOptions);
            viewDate = shiftDate(viewDate, { month: 1 });
        }
        // Check if parameter enabled and check if it's not months navigation event
        if (state.preventChangeToNextMonth && state.flaggedMonths && state.hoveredDate) {
            const viewMonth = calcDaysCalendar(state.view.date, state.monthViewOptions);
            // Check if viewed right month same as in flaggedMonths state, then override months model with flaggedMonths
            if (state.flaggedMonths.length && state.flaggedMonths[1].month.getMonth() === viewMonth.month.getMonth()) {
                monthsModel = state.flaggedMonths
                    .map(item => {
                    if (state.monthViewOptions) {
                        return calcDaysCalendar(item.month, state.monthViewOptions);
                    }
                    return null;
                })
                    .filter(item => item !== null);
            }
        }
        return Object.assign({}, state, { monthsModel });
    }
    if (state.view.mode === 'month') {
        const monthsCalendar = new Array(displayMonths);
        for (let calendarIndex = 0; calendarIndex < displayMonths; calendarIndex++) {
            // todo: for unlinked calendars it will be harder
            monthsCalendar[calendarIndex] = formatMonthsCalendar(viewDate, getFormatOptions(state));
            viewDate = shiftDate(viewDate, { year: 1 });
        }
        return Object.assign({}, state, { monthsCalendar });
    }
    if (state.view.mode === 'year') {
        const yearsCalendarModel = new Array(displayMonths);
        for (let calendarIndex = 0; calendarIndex < displayMonths; calendarIndex++) {
            // todo: for unlinked calendars it will be harder
            yearsCalendarModel[calendarIndex] = formatYearsCalendar(viewDate, getFormatOptions(state), state.minMode === 'year' ? getYearsCalendarInitialDate(state, calendarIndex) : undefined);
            viewDate = shiftDate(viewDate, { year: yearsPerCalendar });
        }
        return Object.assign({}, state, { yearsCalendarModel });
    }
    return state;
}
function formatReducer(state) {
    if (!state.view) {
        return state;
    }
    if (state.view.mode === 'day' && state.monthsModel) {
        const formattedMonths = state.monthsModel.map((month, monthIndex) => formatDaysCalendar(month, getFormatOptions(state), monthIndex));
        return Object.assign({}, state, { formattedMonths });
    }
    // how many calendars
    const displayMonths = state.displayMonths || 1;
    // check initial rendering
    // use selected date on initial rendering if set
    let viewDate = state.view.date;
    if (state.view.mode === 'month') {
        const monthsCalendar = new Array(displayMonths);
        for (let calendarIndex = 0; calendarIndex < displayMonths; calendarIndex++) {
            // todo: for unlinked calendars it will be harder
            monthsCalendar[calendarIndex] = formatMonthsCalendar(viewDate, getFormatOptions(state));
            viewDate = shiftDate(viewDate, { year: 1 });
        }
        return Object.assign({}, state, { monthsCalendar });
    }
    if (state.view.mode === 'year') {
        const yearsCalendarModel = new Array(displayMonths);
        for (let calendarIndex = 0; calendarIndex < displayMonths; calendarIndex++) {
            // todo: for unlinked calendars it will be harder
            yearsCalendarModel[calendarIndex] = formatYearsCalendar(viewDate, getFormatOptions(state));
            viewDate = shiftDate(viewDate, { year: 16 });
        }
        return Object.assign({}, state, { yearsCalendarModel });
    }
    return state;
}
function flagReducer(state) {
    if (!state.view) {
        return state;
    }
    const displayMonths = isDisplayOneMonth(state.view.date, state.minDate, state.maxDate) ? 1 : state.displayMonths;
    if (state.formattedMonths && state.view.mode === 'day') {
        const flaggedMonths = state.formattedMonths.map((formattedMonth, monthIndex) => flagDaysCalendar(formattedMonth, {
            isDisabled: state.isDisabled,
            minDate: state.minDate,
            maxDate: state.maxDate,
            daysDisabled: state.daysDisabled,
            datesDisabled: state.datesDisabled,
            datesEnabled: state.datesEnabled,
            hoveredDate: state.hoveredDate,
            selectedDate: state.selectedDate,
            selectedRange: state.selectedRange,
            displayMonths,
            dateCustomClasses: state.dateCustomClasses,
            dateTooltipTexts: state.dateTooltipTexts,
            monthIndex
        }));
        return Object.assign({}, state, { flaggedMonths });
    }
    if (state.view.mode === 'month' && state.monthsCalendar) {
        const flaggedMonthsCalendar = state.monthsCalendar.map((formattedMonth, monthIndex) => flagMonthsCalendar(formattedMonth, {
            isDisabled: state.isDisabled,
            minDate: state.minDate,
            maxDate: state.maxDate,
            hoveredMonth: state.hoveredMonth,
            selectedDate: state.selectedDate,
            datesDisabled: state.datesDisabled,
            datesEnabled: state.datesEnabled,
            selectedRange: state.selectedRange,
            displayMonths,
            monthIndex
        }));
        return Object.assign({}, state, { flaggedMonthsCalendar });
    }
    if (state.view.mode === 'year' && state.yearsCalendarModel) {
        const yearsCalendarFlagged = state.yearsCalendarModel.map((formattedMonth, yearIndex) => flagYearsCalendar(formattedMonth, {
            isDisabled: state.isDisabled,
            minDate: state.minDate,
            maxDate: state.maxDate,
            hoveredYear: state.hoveredYear,
            selectedDate: state.selectedDate,
            datesDisabled: state.datesDisabled,
            datesEnabled: state.datesEnabled,
            selectedRange: state.selectedRange,
            displayMonths,
            yearIndex
        }));
        return Object.assign({}, state, { yearsCalendarFlagged });
    }
    return state;
}
function navigateOffsetReducer(state, action) {
    if (!state.view) {
        return state;
    }
    const date = shiftViewDate(state, action);
    if (!date) {
        return state;
    }
    const newState = {
        view: {
            mode: state.view.mode,
            date
        }
    };
    return Object.assign({}, state, newState);
}
function shiftViewDate(state, action) {
    if (!state.view) {
        return undefined;
    }
    if (state.view.mode === 'year' && state.minMode === 'year') {
        const initialDate = getYearsCalendarInitialDate(state, 0);
        if (initialDate) {
            const middleDate = shiftDate(initialDate, { year: -initialYearShift });
            return shiftDate(middleDate, action.payload);
        }
    }
    return shiftDate(startOf(state.view.date, 'month'), action.payload);
}
function getFormatOptions(state) {
    return {
        locale: state.locale,
        monthTitle: state.monthTitle,
        yearTitle: state.yearTitle,
        dayLabel: state.dayLabel,
        monthLabel: state.monthLabel,
        yearLabel: state.yearLabel,
        weekNumbers: state.weekNumbers
    };
}
/**
 * if view date is provided (bsValue|ngModel) it should be shown
 * if view date is not provider:
 * if minDate>currentDate (default view value), show minDate
 * if maxDate<currentDate(default view value) show maxDate
 */
function getViewDate(viewDate, minDate, maxDate) {
    const _date = Array.isArray(viewDate) ? viewDate[0] : viewDate;
    if (minDate && isAfter(minDate, _date, 'day')) {
        return minDate;
    }
    if (maxDate && isBefore(maxDate, _date, 'day')) {
        return maxDate;
    }
    return _date;
}
function isDisplayOneMonth(viewDate, minDate, maxDate) {
    if (maxDate && isSame(maxDate, viewDate, 'day')) {
        return true;
    }
    return minDate && maxDate && minDate.getMonth() === maxDate.getMonth();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnMtZGF0ZXBpY2tlci5yZWR1Y2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2RhdGVwaWNrZXIvcmVkdWNlci9icy1kYXRlcGlja2VyLnJlZHVjZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUE0QyxzQkFBc0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRXpHLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzlELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2hFLE9BQU8sRUFDTCxXQUFXLEVBQ1gsU0FBUyxFQUNULE9BQU8sRUFDUCxXQUFXLEVBQ1gsT0FBTyxFQUNQLFNBQVMsRUFDVCxPQUFPLEVBQ1AsUUFBUSxFQUNSLE1BQU0sRUFDUCxNQUFNLHVCQUF1QixDQUFDO0FBQy9CLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN4RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNwRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUMxRyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUVsRSxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFHcEQsTUFBTSxVQUFVLG1CQUFtQixDQUFDLFFBQTJCLHNCQUFzQixFQUNqRCxNQUFjO0lB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QzVCLFNBQVMsRUFBRSxLQUFLLENBQUMsU0FBUztRQUUxQixRQUFRLEVBQUUsS0FBSyxDQUFDLFFBQVE7UUFDeEIsVUFBVSxFQUFFLEtBQUssQ0FBQyxVQUFVO1FBQzVCLFNBQVMsRUFBRSxLQUFLLENBQUMsU0FBUztRQUUxQixXQUFXLEVBQUUsS0FBSyxDQUFDLFdBQVc7S0FDL0IsQ0FBQztBQUNKLENBQUM7QUFFRDs7Ozs7R0FLRztBQUNILFNBQVMsV0FBVyxDQUFDLFFBQXVCLEVBQUUsT0FBYyxFQUFFLE9BQWM7SUFDMUUsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7SUFFL0QsSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLEVBQUU7UUFDN0MsT0FBTyxPQUFPLENBQUM7S0FDaEI7SUFFRCxJQUFJLE9BQU8sSUFBSSxRQUFRLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsRUFBRTtRQUM5QyxPQUFPLE9BQU8sQ0FBQztLQUNoQjtJQUVELE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQztBQUVELFNBQVMsaUJBQWlCLENBQUMsUUFBYyxFQUFFLE9BQWMsRUFBRSxPQUFjO0lBQ3ZFLElBQUksT0FBTyxJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQyxFQUFFO1FBQy9DLE9BQU8sSUFBSSxDQUFDO0tBQ2I7SUFFRCxPQUFPLE9BQU8sSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLFFBQVEsRUFBRSxLQUFLLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUN6RSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQnNEYXRlcGlja2VyU3RhdGUsIEJzRGF0ZXBpY2tlclZpZXdTdGF0ZSwgaW5pdGlhbERhdGVwaWNrZXJTdGF0ZSB9IGZyb20gJy4vYnMtZGF0ZXBpY2tlci5zdGF0ZSc7XHJcbmltcG9ydCB7IEFjdGlvbiB9IGZyb20gJ25neC1ib290c3RyYXAvbWluaS1uZ3J4JztcclxuaW1wb3J0IHsgQnNEYXRlcGlja2VyQWN0aW9ucyB9IGZyb20gJy4vYnMtZGF0ZXBpY2tlci5hY3Rpb25zJztcclxuaW1wb3J0IHsgY2FsY0RheXNDYWxlbmRhciB9IGZyb20gJy4uL2VuZ2luZS9jYWxjLWRheXMtY2FsZW5kYXInO1xyXG5pbXBvcnQgeyBmb3JtYXREYXlzQ2FsZW5kYXIgfSBmcm9tICcuLi9lbmdpbmUvZm9ybWF0LWRheXMtY2FsZW5kYXInO1xyXG5pbXBvcnQgeyBmbGFnRGF5c0NhbGVuZGFyIH0gZnJvbSAnLi4vZW5naW5lL2ZsYWctZGF5cy1jYWxlbmRhcic7XHJcbmltcG9ydCB7XHJcbiAgc2V0RnVsbERhdGUsXHJcbiAgc2hpZnREYXRlLFxyXG4gIGlzQXJyYXksXHJcbiAgaXNEYXRlVmFsaWQsXHJcbiAgc3RhcnRPZixcclxuICBnZXRMb2NhbGUsXHJcbiAgaXNBZnRlcixcclxuICBpc0JlZm9yZSxcclxuICBpc1NhbWVcclxufSBmcm9tICduZ3gtYm9vdHN0cmFwL2Nocm9ub3MnO1xyXG5pbXBvcnQgeyBjYW5Td2l0Y2hNb2RlIH0gZnJvbSAnLi4vZW5naW5lL3ZpZXctbW9kZSc7XHJcbmltcG9ydCB7IGZvcm1hdE1vbnRoc0NhbGVuZGFyIH0gZnJvbSAnLi4vZW5naW5lL2Zvcm1hdC1tb250aHMtY2FsZW5kYXInO1xyXG5pbXBvcnQgeyBmbGFnTW9udGhzQ2FsZW5kYXIgfSBmcm9tICcuLi9lbmdpbmUvZmxhZy1tb250aHMtY2FsZW5kYXInO1xyXG5pbXBvcnQgeyBmb3JtYXRZZWFyc0NhbGVuZGFyLCBpbml0aWFsWWVhclNoaWZ0LCB5ZWFyc1BlckNhbGVuZGFyIH0gZnJvbSAnLi4vZW5naW5lL2Zvcm1hdC15ZWFycy1jYWxlbmRhcic7XHJcbmltcG9ydCB7IGZsYWdZZWFyc0NhbGVuZGFyIH0gZnJvbSAnLi4vZW5naW5lL2ZsYWcteWVhcnMtY2FsZW5kYXInO1xyXG5pbXBvcnQgeyBCc1ZpZXdOYXZpZ2F0aW9uRXZlbnQsIERhdGVwaWNrZXJGb3JtYXRPcHRpb25zLCBCc0RhdGVwaWNrZXJWaWV3TW9kZSB9IGZyb20gJy4uL21vZGVscyc7XHJcbmltcG9ydCB7IGdldFllYXJzQ2FsZW5kYXJJbml0aWFsRGF0ZSB9IGZyb20gJy4uL3V0aWxzL2JzLWNhbGVuZGFyLXV0aWxzJztcclxuaW1wb3J0IHsgY29weVRpbWUgfSBmcm9tICcuLi91dGlscy9jb3B5LXRpbWUtdXRpbHMnO1xyXG5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBic0RhdGVwaWNrZXJSZWR1Y2VyKHN0YXRlOiBCc0RhdGVwaWNrZXJTdGF0ZSA9IGluaXRpYWxEYXRlcGlja2VyU3RhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogQWN0aW9uKTogQnNEYXRlcGlja2VyU3RhdGUge1xyXG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcclxuICAgIGNhc2UgQnNEYXRlcGlja2VyQWN0aW9ucy5DQUxDVUxBVEU6IHtcclxuICAgICAgcmV0dXJuIGNhbGN1bGF0ZVJlZHVjZXIoc3RhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIGNhc2UgQnNEYXRlcGlja2VyQWN0aW9ucy5GT1JNQVQ6IHtcclxuICAgICAgcmV0dXJuIGZvcm1hdFJlZHVjZXIoc3RhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIGNhc2UgQnNEYXRlcGlja2VyQWN0aW9ucy5GTEFHOiB7XHJcbiAgICAgIHJldHVybiBmbGFnUmVkdWNlcihzdGF0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgY2FzZSBCc0RhdGVwaWNrZXJBY3Rpb25zLk5BVklHQVRFX09GRlNFVDoge1xyXG4gICAgICByZXR1cm4gbmF2aWdhdGVPZmZzZXRSZWR1Y2VyKHN0YXRlLCBhY3Rpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIGNhc2UgQnNEYXRlcGlja2VyQWN0aW9ucy5OQVZJR0FURV9UTzoge1xyXG4gICAgICBjb25zdCBwYXlsb2FkOiBCc1ZpZXdOYXZpZ2F0aW9uRXZlbnQgPSBhY3Rpb24ucGF5bG9hZDtcclxuICAgICAgaWYgKCFzdGF0ZS52aWV3IHx8ICFwYXlsb2FkLnVuaXQpIHtcclxuICAgICAgICByZXR1cm4gc3RhdGU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGRhdGUgPSBzZXRGdWxsRGF0ZShzdGF0ZS52aWV3LmRhdGUsIHBheWxvYWQudW5pdCk7XHJcbiAgICAgIGxldCBuZXdTdGF0ZTtcclxuICAgICAgbGV0IG1vZGU6IEJzRGF0ZXBpY2tlclZpZXdNb2RlO1xyXG4gICAgICBpZiAoY2FuU3dpdGNoTW9kZShwYXlsb2FkLnZpZXdNb2RlLCBzdGF0ZS5taW5Nb2RlKSkge1xyXG4gICAgICAgIG1vZGUgPSBwYXlsb2FkLnZpZXdNb2RlO1xyXG4gICAgICAgIG5ld1N0YXRlID0geyB2aWV3OiB7IGRhdGUsIG1vZGUgfSB9O1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIG1vZGUgPSBzdGF0ZS52aWV3Lm1vZGU7XHJcbiAgICAgICAgbmV3U3RhdGUgPSB7IHNlbGVjdGVkRGF0ZTogZGF0ZSwgdmlldzogeyBkYXRlLCBtb2RlIH0gfTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCBuZXdTdGF0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgY2FzZSBCc0RhdGVwaWNrZXJBY3Rpb25zLkNIQU5HRV9WSUVXTU9ERToge1xyXG4gICAgICBpZiAoIWNhblN3aXRjaE1vZGUoYWN0aW9uLnBheWxvYWQsIHN0YXRlLm1pbk1vZGUpIHx8ICFzdGF0ZS52aWV3KSB7XHJcbiAgICAgICAgcmV0dXJuIHN0YXRlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBkYXRlID0gc3RhdGUudmlldy5kYXRlO1xyXG4gICAgICBjb25zdCBtb2RlID0gYWN0aW9uLnBheWxvYWQ7XHJcbiAgICAgIGNvbnN0IG5ld1N0YXRlID0geyB2aWV3OiB7IGRhdGUsIG1vZGUgfSB9O1xyXG5cclxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCBuZXdTdGF0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgY2FzZSBCc0RhdGVwaWNrZXJBY3Rpb25zLkhPVkVSOiB7XHJcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgeyBob3ZlcmVkRGF0ZTogYWN0aW9uLnBheWxvYWQgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY2FzZSBCc0RhdGVwaWNrZXJBY3Rpb25zLlNFTEVDVDoge1xyXG4gICAgICBpZiAoIXN0YXRlLnZpZXcpIHtcclxuICAgICAgICByZXR1cm4gc3RhdGU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IG5ld1N0YXRlID0ge1xyXG4gICAgICAgIHNlbGVjdGVkRGF0ZTogYWN0aW9uLnBheWxvYWQsXHJcbiAgICAgICAgdmlldzogc3RhdGUudmlld1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoc3RhdGUuc2VsZWN0ZWRUaW1lKSkge1xyXG4gICAgICAgIGNvbnN0IF90aW1lID0gc3RhdGUuc2VsZWN0ZWRUaW1lWzBdO1xyXG4gICAgICAgIGlmIChuZXdTdGF0ZS5zZWxlY3RlZERhdGUgJiYgX3RpbWUpIHtcclxuICAgICAgICAgIGNvcHlUaW1lKG5ld1N0YXRlLnNlbGVjdGVkRGF0ZSwgX3RpbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgbW9kZSA9IHN0YXRlLnZpZXcubW9kZTtcclxuICAgICAgY29uc3QgX2RhdGUgPSBhY3Rpb24ucGF5bG9hZCB8fCBzdGF0ZS52aWV3LmRhdGU7XHJcbiAgICAgIGNvbnN0IGRhdGUgPSBnZXRWaWV3RGF0ZShfZGF0ZSwgc3RhdGUubWluRGF0ZSwgc3RhdGUubWF4RGF0ZSk7XHJcbiAgICAgIG5ld1N0YXRlLnZpZXcgPSB7IG1vZGUsIGRhdGUgfTtcclxuXHJcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgbmV3U3RhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIGNhc2UgQnNEYXRlcGlja2VyQWN0aW9ucy5TRUxFQ1RfVElNRToge1xyXG4gICAgICBjb25zdCB7ZGF0ZSwgaW5kZXh9ID0gYWN0aW9uLnBheWxvYWQ7XHJcbiAgICAgIGNvbnN0IHNlbGVjdGVkVGltZSA9IHN0YXRlLnNlbGVjdGVkVGltZSA/IFsuLi5zdGF0ZS5zZWxlY3RlZFRpbWVdIDogW107XHJcbiAgICAgIHNlbGVjdGVkVGltZVtpbmRleF0gPSBkYXRlO1xyXG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgc2VsZWN0ZWRUaW1lIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNhc2UgQnNEYXRlcGlja2VyQWN0aW9ucy5TRVRfT1BUSU9OUzoge1xyXG4gICAgICBpZiAoIXN0YXRlLnZpZXcpIHtcclxuICAgICAgICByZXR1cm4gc3RhdGU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IG5ld1N0YXRlID0gYWN0aW9uLnBheWxvYWQ7XHJcbiAgICAgIC8vIHByZXNlcnZlIHZpZXcgbW9kZVxyXG4gICAgICBjb25zdCBtb2RlID0gbmV3U3RhdGUubWluTW9kZSA/IG5ld1N0YXRlLm1pbk1vZGUgOiBzdGF0ZS52aWV3Lm1vZGU7XHJcbiAgICAgIGNvbnN0IF92aWV3RGF0ZSA9IGlzRGF0ZVZhbGlkKG5ld1N0YXRlLnZhbHVlKSAmJiBuZXdTdGF0ZS52YWx1ZVxyXG4gICAgICAgIHx8IGlzQXJyYXkobmV3U3RhdGUudmFsdWUpICYmIGlzRGF0ZVZhbGlkKG5ld1N0YXRlLnZhbHVlWzBdKSAmJiBuZXdTdGF0ZS52YWx1ZVswXVxyXG4gICAgICAgIHx8IHN0YXRlLnZpZXcuZGF0ZTtcclxuICAgICAgY29uc3QgZGF0ZSA9IGdldFZpZXdEYXRlKF92aWV3RGF0ZSwgbmV3U3RhdGUubWluRGF0ZSwgbmV3U3RhdGUubWF4RGF0ZSk7XHJcbiAgICAgIG5ld1N0YXRlLnZpZXcgPSB7IG1vZGUsIGRhdGUgfTtcclxuICAgICAgLy8gdXBkYXRlIHNlbGVjdGVkIHZhbHVlXHJcbiAgICAgIGlmIChuZXdTdGF0ZS52YWx1ZSkge1xyXG4gICAgICAgIC8vIGlmIG5ldyB2YWx1ZSBpcyBhcnJheSB3ZSB3b3JrIHdpdGggZGF0ZSByYW5nZVxyXG4gICAgICAgIGlmIChpc0FycmF5KG5ld1N0YXRlLnZhbHVlKSkge1xyXG4gICAgICAgICAgbmV3U3RhdGUuc2VsZWN0ZWRSYW5nZSA9IG5ld1N0YXRlLnZhbHVlO1xyXG4gICAgICAgICAgbmV3U3RhdGUuc2VsZWN0ZWRUaW1lID0gbmV3U3RhdGUudmFsdWUubWFwKChpOiBEYXRlKSA9PiBpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGlmIG5ldyB2YWx1ZSBpcyBhIGRhdGUgLT4gZGF0ZXBpY2tlclxyXG4gICAgICAgIGlmIChuZXdTdGF0ZS52YWx1ZSBpbnN0YW5jZW9mIERhdGUpIHtcclxuICAgICAgICAgIG5ld1N0YXRlLnNlbGVjdGVkRGF0ZSA9IG5ld1N0YXRlLnZhbHVlO1xyXG4gICAgICAgICAgbmV3U3RhdGUuc2VsZWN0ZWRUaW1lID0gW25ld1N0YXRlLnZhbHVlXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHByb3ZpZGVkIHZhbHVlIGlzIG5vdCBzdXBwb3J0ZWQgOilcclxuICAgICAgICAvLyBuZWVkIHRvIHJlcG9ydCBpdCBzb21laG93XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgbmV3U3RhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGRhdGUgcmFuZ2UgcGlja2VyXHJcbiAgICBjYXNlIEJzRGF0ZXBpY2tlckFjdGlvbnMuU0VMRUNUX1JBTkdFOiB7XHJcbiAgICAgIGlmICghc3RhdGUudmlldykge1xyXG4gICAgICAgIHJldHVybiBzdGF0ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgbmV3U3RhdGUgPSB7XHJcbiAgICAgICAgc2VsZWN0ZWRSYW5nZTogYWN0aW9uLnBheWxvYWQsXHJcbiAgICAgICAgdmlldzogc3RhdGUudmlld1xyXG4gICAgICB9O1xyXG4gICAgICBuZXdTdGF0ZS5zZWxlY3RlZFJhbmdlPy5mb3JFYWNoKChkdGU6IERhdGUsIGluZGV4OiBudW1iZXIpID0+IHtcclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShzdGF0ZS5zZWxlY3RlZFRpbWUpKSB7XHJcbiAgICAgICAgICBjb25zdCBfdGltZSA9IHN0YXRlLnNlbGVjdGVkVGltZVtpbmRleF07XHJcbiAgICAgICAgICBpZiAoX3RpbWUpIHtcclxuICAgICAgICAgICAgY29weVRpbWUoZHRlLCBfdGltZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGNvbnN0IG1vZGUgPSBzdGF0ZS52aWV3Lm1vZGU7XHJcbiAgICAgIGNvbnN0IF9kYXRlID0gYWN0aW9uLnBheWxvYWQgJiYgYWN0aW9uLnBheWxvYWRbMF0gfHwgc3RhdGUudmlldy5kYXRlO1xyXG4gICAgICBjb25zdCBkYXRlID0gZ2V0Vmlld0RhdGUoX2RhdGUsIHN0YXRlLm1pbkRhdGUsIHN0YXRlLm1heERhdGUpO1xyXG4gICAgICBuZXdTdGF0ZS52aWV3ID0geyBtb2RlLCBkYXRlIH07XHJcblxyXG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIG5ld1N0YXRlKTtcclxuICAgIH1cclxuXHJcbiAgICBjYXNlIEJzRGF0ZXBpY2tlckFjdGlvbnMuU0VUX01JTl9EQVRFOiB7XHJcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xyXG4gICAgICAgIG1pbkRhdGU6IGFjdGlvbi5wYXlsb2FkXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgY2FzZSBCc0RhdGVwaWNrZXJBY3Rpb25zLlNFVF9NQVhfREFURToge1xyXG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcclxuICAgICAgICBtYXhEYXRlOiBhY3Rpb24ucGF5bG9hZFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIGNhc2UgQnNEYXRlcGlja2VyQWN0aW9ucy5TRVRfSVNfRElTQUJMRUQ6IHtcclxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XHJcbiAgICAgICAgaXNEaXNhYmxlZDogYWN0aW9uLnBheWxvYWRcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBjYXNlIEJzRGF0ZXBpY2tlckFjdGlvbnMuU0VUX0RBVEVfQ1VTVE9NX0NMQVNTRVM6IHtcclxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XHJcbiAgICAgICAgZGF0ZUN1c3RvbUNsYXNzZXM6IGFjdGlvbi5wYXlsb2FkXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgY2FzZSBCc0RhdGVwaWNrZXJBY3Rpb25zLlNFVF9EQVRFX1RPT0xUSVBfVEVYVFM6IHtcclxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XHJcbiAgICAgICAgZGF0ZVRvb2x0aXBUZXh0czogYWN0aW9uLnBheWxvYWRcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVmYXVsdDpcclxuICAgICAgcmV0dXJuIHN0YXRlO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY2FsY3VsYXRlUmVkdWNlcihzdGF0ZTogQnNEYXRlcGlja2VyU3RhdGUpOiBCc0RhdGVwaWNrZXJTdGF0ZSB7XHJcbiAgaWYgKCFzdGF0ZS52aWV3KSB7XHJcbiAgICByZXR1cm4gc3RhdGU7XHJcbiAgfVxyXG5cclxuICAvLyBob3cgbWFueSBjYWxlbmRhcnNcclxuICBsZXQgZGlzcGxheU1vbnRoczogbnVtYmVyIHwgdW5kZWZpbmVkO1xyXG4gIGlmIChzdGF0ZS5kaXNwbGF5T25lTW9udGhSYW5nZSAmJlxyXG4gICAgaXNEaXNwbGF5T25lTW9udGgoc3RhdGUudmlldy5kYXRlLCBzdGF0ZS5taW5EYXRlLCBzdGF0ZS5tYXhEYXRlKSkge1xyXG4gICAgZGlzcGxheU1vbnRocyA9IDE7XHJcbiAgfSBlbHNlIHtcclxuICAgIGRpc3BsYXlNb250aHMgPSBzdGF0ZS5kaXNwbGF5TW9udGhzIHx8IDE7XHJcbiAgfVxyXG5cclxuICAvLyB1c2Ugc2VsZWN0ZWQgZGF0ZSBvbiBpbml0aWFsIHJlbmRlcmluZyBpZiBzZXRcclxuICBsZXQgdmlld0RhdGUgPSBzdGF0ZS52aWV3LmRhdGU7XHJcblxyXG4gIGlmIChzdGF0ZS52aWV3Lm1vZGUgPT09ICdkYXknICYmIHN0YXRlLm1vbnRoVmlld09wdGlvbnMpIHtcclxuICAgIGlmIChzdGF0ZS5zaG93UHJldmlvdXNNb250aCAmJiBzdGF0ZS5zZWxlY3RlZFJhbmdlICYmIHN0YXRlLnNlbGVjdGVkUmFuZ2UubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHZpZXdEYXRlID0gc2hpZnREYXRlKHZpZXdEYXRlLCB7IG1vbnRoOiAtMSB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0ZS5tb250aFZpZXdPcHRpb25zLmZpcnN0RGF5T2ZXZWVrID0gZ2V0TG9jYWxlKHN0YXRlLmxvY2FsZSkuZmlyc3REYXlPZldlZWsoKTtcclxuICAgIGxldCBtb250aHNNb2RlbCA9IG5ldyBBcnJheShkaXNwbGF5TW9udGhzKTtcclxuICAgIGZvciAobGV0IG1vbnRoSW5kZXggPSAwOyBtb250aEluZGV4IDwgZGlzcGxheU1vbnRoczsgbW9udGhJbmRleCsrKSB7XHJcbiAgICAgIC8vIHRvZG86IGZvciB1bmxpbmtlZCBjYWxlbmRhcnMgaXQgd2lsbCBiZSBoYXJkZXJcclxuICAgICAgbW9udGhzTW9kZWxbbW9udGhJbmRleF0gPSBjYWxjRGF5c0NhbGVuZGFyKFxyXG4gICAgICAgIHZpZXdEYXRlLFxyXG4gICAgICAgIHN0YXRlLm1vbnRoVmlld09wdGlvbnNcclxuICAgICAgKTtcclxuICAgICAgdmlld0RhdGUgPSBzaGlmdERhdGUodmlld0RhdGUsIHsgbW9udGg6IDEgfSk7XHJcbiAgICB9XHJcbiAgICAvLyBDaGVjayBpZiBwYXJhbWV0ZXIgZW5hYmxlZCBhbmQgY2hlY2sgaWYgaXQncyBub3QgbW9udGhzIG5hdmlnYXRpb24gZXZlbnRcclxuICAgIGlmIChzdGF0ZS5wcmV2ZW50Q2hhbmdlVG9OZXh0TW9udGggJiYgc3RhdGUuZmxhZ2dlZE1vbnRocyAmJiBzdGF0ZS5ob3ZlcmVkRGF0ZSkge1xyXG4gICAgICBjb25zdCB2aWV3TW9udGggPSBjYWxjRGF5c0NhbGVuZGFyKHN0YXRlLnZpZXcuZGF0ZSwgc3RhdGUubW9udGhWaWV3T3B0aW9ucyk7XHJcbiAgICAgIC8vIENoZWNrIGlmIHZpZXdlZCByaWdodCBtb250aCBzYW1lIGFzIGluIGZsYWdnZWRNb250aHMgc3RhdGUsIHRoZW4gb3ZlcnJpZGUgbW9udGhzIG1vZGVsIHdpdGggZmxhZ2dlZE1vbnRoc1xyXG4gICAgICBpZiAoc3RhdGUuZmxhZ2dlZE1vbnRocy5sZW5ndGggJiYgc3RhdGUuZmxhZ2dlZE1vbnRoc1sxXS5tb250aC5nZXRNb250aCgpID09PSB2aWV3TW9udGgubW9udGguZ2V0TW9udGgoKSkge1xyXG4gICAgICAgIG1vbnRoc01vZGVsID0gc3RhdGUuZmxhZ2dlZE1vbnRoc1xyXG4gICAgICAgICAgLm1hcChpdGVtID0+IHtcclxuICAgICAgICAgICAgaWYgKHN0YXRlLm1vbnRoVmlld09wdGlvbnMpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gY2FsY0RheXNDYWxlbmRhcihcclxuICAgICAgICAgICAgICAgIGl0ZW0ubW9udGgsXHJcbiAgICAgICAgICAgICAgICBzdGF0ZS5tb250aFZpZXdPcHRpb25zXHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuZmlsdGVyKGl0ZW0gPT4gaXRlbSAhPT0gbnVsbCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgbW9udGhzTW9kZWwgfSk7XHJcbiAgfVxyXG5cclxuICBpZiAoc3RhdGUudmlldy5tb2RlID09PSAnbW9udGgnKSB7XHJcbiAgICBjb25zdCBtb250aHNDYWxlbmRhciA9IG5ldyBBcnJheShkaXNwbGF5TW9udGhzKTtcclxuICAgIGZvciAoXHJcbiAgICAgIGxldCBjYWxlbmRhckluZGV4ID0gMDtcclxuICAgICAgY2FsZW5kYXJJbmRleCA8IGRpc3BsYXlNb250aHM7XHJcbiAgICAgIGNhbGVuZGFySW5kZXgrK1xyXG4gICAgKSB7XHJcbiAgICAgIC8vIHRvZG86IGZvciB1bmxpbmtlZCBjYWxlbmRhcnMgaXQgd2lsbCBiZSBoYXJkZXJcclxuICAgICAgbW9udGhzQ2FsZW5kYXJbY2FsZW5kYXJJbmRleF0gPSBmb3JtYXRNb250aHNDYWxlbmRhcihcclxuICAgICAgICB2aWV3RGF0ZSxcclxuICAgICAgICBnZXRGb3JtYXRPcHRpb25zKHN0YXRlKVxyXG4gICAgICApO1xyXG4gICAgICB2aWV3RGF0ZSA9IHNoaWZ0RGF0ZSh2aWV3RGF0ZSwgeyB5ZWFyOiAxIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgeyBtb250aHNDYWxlbmRhciB9KTtcclxuICB9XHJcblxyXG4gIGlmIChzdGF0ZS52aWV3Lm1vZGUgPT09ICd5ZWFyJykge1xyXG4gICAgY29uc3QgeWVhcnNDYWxlbmRhck1vZGVsID0gbmV3IEFycmF5KGRpc3BsYXlNb250aHMpO1xyXG5cclxuICAgIGZvciAoXHJcbiAgICAgIGxldCBjYWxlbmRhckluZGV4ID0gMDtcclxuICAgICAgY2FsZW5kYXJJbmRleCA8IGRpc3BsYXlNb250aHM7XHJcbiAgICAgIGNhbGVuZGFySW5kZXgrK1xyXG4gICAgKSB7XHJcbiAgICAgIC8vIHRvZG86IGZvciB1bmxpbmtlZCBjYWxlbmRhcnMgaXQgd2lsbCBiZSBoYXJkZXJcclxuICAgICAgeWVhcnNDYWxlbmRhck1vZGVsW2NhbGVuZGFySW5kZXhdID0gZm9ybWF0WWVhcnNDYWxlbmRhcihcclxuICAgICAgICB2aWV3RGF0ZSxcclxuICAgICAgICBnZXRGb3JtYXRPcHRpb25zKHN0YXRlKSxcclxuICAgICAgICBzdGF0ZS5taW5Nb2RlID09PSAneWVhcicgPyBnZXRZZWFyc0NhbGVuZGFySW5pdGlhbERhdGUoc3RhdGUsIGNhbGVuZGFySW5kZXgpIDogdW5kZWZpbmVkXHJcbiAgICAgICk7XHJcbiAgICAgIHZpZXdEYXRlID0gc2hpZnREYXRlKHZpZXdEYXRlLCB7IHllYXI6IHllYXJzUGVyQ2FsZW5kYXIgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IHllYXJzQ2FsZW5kYXJNb2RlbCB9KTtcclxuICB9XHJcblxyXG4gIHJldHVybiBzdGF0ZTtcclxufVxyXG5cclxuZnVuY3Rpb24gZm9ybWF0UmVkdWNlcihzdGF0ZTogQnNEYXRlcGlja2VyU3RhdGUpOiBCc0RhdGVwaWNrZXJTdGF0ZSB7XHJcbiAgaWYgKCFzdGF0ZS52aWV3KSB7XHJcbiAgICByZXR1cm4gc3RhdGU7XHJcbiAgfVxyXG5cclxuICBpZiAoc3RhdGUudmlldy5tb2RlID09PSAnZGF5JyAmJiBzdGF0ZS5tb250aHNNb2RlbCkge1xyXG4gICAgY29uc3QgZm9ybWF0dGVkTW9udGhzID0gc3RhdGUubW9udGhzTW9kZWwubWFwKChtb250aCwgbW9udGhJbmRleCkgPT5cclxuICAgICAgZm9ybWF0RGF5c0NhbGVuZGFyKG1vbnRoLCBnZXRGb3JtYXRPcHRpb25zKHN0YXRlKSwgbW9udGhJbmRleClcclxuICAgICk7XHJcblxyXG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IGZvcm1hdHRlZE1vbnRocyB9KTtcclxuICB9XHJcblxyXG4gIC8vIGhvdyBtYW55IGNhbGVuZGFyc1xyXG4gIGNvbnN0IGRpc3BsYXlNb250aHMgPSBzdGF0ZS5kaXNwbGF5TW9udGhzIHx8IDE7XHJcbiAgLy8gY2hlY2sgaW5pdGlhbCByZW5kZXJpbmdcclxuICAvLyB1c2Ugc2VsZWN0ZWQgZGF0ZSBvbiBpbml0aWFsIHJlbmRlcmluZyBpZiBzZXRcclxuICBsZXQgdmlld0RhdGUgPSBzdGF0ZS52aWV3LmRhdGU7XHJcblxyXG4gIGlmIChzdGF0ZS52aWV3Lm1vZGUgPT09ICdtb250aCcpIHtcclxuICAgIGNvbnN0IG1vbnRoc0NhbGVuZGFyID0gbmV3IEFycmF5KGRpc3BsYXlNb250aHMpO1xyXG4gICAgZm9yIChcclxuICAgICAgbGV0IGNhbGVuZGFySW5kZXggPSAwO1xyXG4gICAgICBjYWxlbmRhckluZGV4IDwgZGlzcGxheU1vbnRocztcclxuICAgICAgY2FsZW5kYXJJbmRleCsrXHJcbiAgICApIHtcclxuICAgICAgLy8gdG9kbzogZm9yIHVubGlua2VkIGNhbGVuZGFycyBpdCB3aWxsIGJlIGhhcmRlclxyXG4gICAgICBtb250aHNDYWxlbmRhcltjYWxlbmRhckluZGV4XSA9IGZvcm1hdE1vbnRoc0NhbGVuZGFyKFxyXG4gICAgICAgIHZpZXdEYXRlLFxyXG4gICAgICAgIGdldEZvcm1hdE9wdGlvbnMoc3RhdGUpXHJcbiAgICAgICk7XHJcbiAgICAgIHZpZXdEYXRlID0gc2hpZnREYXRlKHZpZXdEYXRlLCB7IHllYXI6IDEgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IG1vbnRoc0NhbGVuZGFyIH0pO1xyXG4gIH1cclxuXHJcbiAgaWYgKHN0YXRlLnZpZXcubW9kZSA9PT0gJ3llYXInKSB7XHJcbiAgICBjb25zdCB5ZWFyc0NhbGVuZGFyTW9kZWwgPSBuZXcgQXJyYXkoZGlzcGxheU1vbnRocyk7XHJcbiAgICBmb3IgKFxyXG4gICAgICBsZXQgY2FsZW5kYXJJbmRleCA9IDA7XHJcbiAgICAgIGNhbGVuZGFySW5kZXggPCBkaXNwbGF5TW9udGhzO1xyXG4gICAgICBjYWxlbmRhckluZGV4KytcclxuICAgICkge1xyXG4gICAgICAvLyB0b2RvOiBmb3IgdW5saW5rZWQgY2FsZW5kYXJzIGl0IHdpbGwgYmUgaGFyZGVyXHJcbiAgICAgIHllYXJzQ2FsZW5kYXJNb2RlbFtjYWxlbmRhckluZGV4XSA9IGZvcm1hdFllYXJzQ2FsZW5kYXIoXHJcbiAgICAgICAgdmlld0RhdGUsXHJcbiAgICAgICAgZ2V0Rm9ybWF0T3B0aW9ucyhzdGF0ZSlcclxuICAgICAgKTtcclxuICAgICAgdmlld0RhdGUgPSBzaGlmdERhdGUodmlld0RhdGUsIHsgeWVhcjogMTYgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IHllYXJzQ2FsZW5kYXJNb2RlbCB9KTtcclxuICB9XHJcblxyXG4gIHJldHVybiBzdGF0ZTtcclxufVxyXG5cclxuZnVuY3Rpb24gZmxhZ1JlZHVjZXIoc3RhdGU6IEJzRGF0ZXBpY2tlclN0YXRlKTogQnNEYXRlcGlja2VyU3RhdGUge1xyXG4gIGlmICghc3RhdGUudmlldykge1xyXG4gICAgcmV0dXJuIHN0YXRlO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgZGlzcGxheU1vbnRocyA9IGlzRGlzcGxheU9uZU1vbnRoKHN0YXRlLnZpZXcuZGF0ZSwgc3RhdGUubWluRGF0ZSwgc3RhdGUubWF4RGF0ZSkgPyAxIDogc3RhdGUuZGlzcGxheU1vbnRocztcclxuICBpZiAoc3RhdGUuZm9ybWF0dGVkTW9udGhzICYmIHN0YXRlLnZpZXcubW9kZSA9PT0gJ2RheScpIHtcclxuICAgIGNvbnN0IGZsYWdnZWRNb250aHMgPSBzdGF0ZS5mb3JtYXR0ZWRNb250aHMubWFwKFxyXG4gICAgICAoZm9ybWF0dGVkTW9udGgsIG1vbnRoSW5kZXgpID0+XHJcbiAgICAgICAgZmxhZ0RheXNDYWxlbmRhcihmb3JtYXR0ZWRNb250aCwge1xyXG4gICAgICAgICAgaXNEaXNhYmxlZDogc3RhdGUuaXNEaXNhYmxlZCxcclxuICAgICAgICAgIG1pbkRhdGU6IHN0YXRlLm1pbkRhdGUsXHJcbiAgICAgICAgICBtYXhEYXRlOiBzdGF0ZS5tYXhEYXRlLFxyXG4gICAgICAgICAgZGF5c0Rpc2FibGVkOiBzdGF0ZS5kYXlzRGlzYWJsZWQsXHJcbiAgICAgICAgICBkYXRlc0Rpc2FibGVkOiBzdGF0ZS5kYXRlc0Rpc2FibGVkLFxyXG4gICAgICAgICAgZGF0ZXNFbmFibGVkOiBzdGF0ZS5kYXRlc0VuYWJsZWQsXHJcbiAgICAgICAgICBob3ZlcmVkRGF0ZTogc3RhdGUuaG92ZXJlZERhdGUsXHJcbiAgICAgICAgICBzZWxlY3RlZERhdGU6IHN0YXRlLnNlbGVjdGVkRGF0ZSxcclxuICAgICAgICAgIHNlbGVjdGVkUmFuZ2U6IHN0YXRlLnNlbGVjdGVkUmFuZ2UsXHJcbiAgICAgICAgICBkaXNwbGF5TW9udGhzLFxyXG4gICAgICAgICAgZGF0ZUN1c3RvbUNsYXNzZXM6IHN0YXRlLmRhdGVDdXN0b21DbGFzc2VzLFxyXG4gICAgICAgICAgZGF0ZVRvb2x0aXBUZXh0czogc3RhdGUuZGF0ZVRvb2x0aXBUZXh0cyxcclxuICAgICAgICAgIG1vbnRoSW5kZXhcclxuICAgICAgICB9KVxyXG4gICAgKTtcclxuXHJcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgZmxhZ2dlZE1vbnRocyB9KTtcclxuICB9XHJcblxyXG4gIGlmIChzdGF0ZS52aWV3Lm1vZGUgPT09ICdtb250aCcgJiYgc3RhdGUubW9udGhzQ2FsZW5kYXIpIHtcclxuICAgIGNvbnN0IGZsYWdnZWRNb250aHNDYWxlbmRhciA9IHN0YXRlLm1vbnRoc0NhbGVuZGFyLm1hcChcclxuICAgICAgKGZvcm1hdHRlZE1vbnRoLCBtb250aEluZGV4KSA9PlxyXG4gICAgICAgIGZsYWdNb250aHNDYWxlbmRhcihmb3JtYXR0ZWRNb250aCwge1xyXG4gICAgICAgICAgaXNEaXNhYmxlZDogc3RhdGUuaXNEaXNhYmxlZCxcclxuICAgICAgICAgIG1pbkRhdGU6IHN0YXRlLm1pbkRhdGUsXHJcbiAgICAgICAgICBtYXhEYXRlOiBzdGF0ZS5tYXhEYXRlLFxyXG4gICAgICAgICAgaG92ZXJlZE1vbnRoOiBzdGF0ZS5ob3ZlcmVkTW9udGgsXHJcbiAgICAgICAgICBzZWxlY3RlZERhdGU6IHN0YXRlLnNlbGVjdGVkRGF0ZSxcclxuICAgICAgICAgIGRhdGVzRGlzYWJsZWQ6IHN0YXRlLmRhdGVzRGlzYWJsZWQsXHJcbiAgICAgICAgICBkYXRlc0VuYWJsZWQ6IHN0YXRlLmRhdGVzRW5hYmxlZCxcclxuICAgICAgICAgIHNlbGVjdGVkUmFuZ2U6IHN0YXRlLnNlbGVjdGVkUmFuZ2UsXHJcbiAgICAgICAgICBkaXNwbGF5TW9udGhzLFxyXG4gICAgICAgICAgbW9udGhJbmRleFxyXG4gICAgICAgIH0pXHJcbiAgICApO1xyXG5cclxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgeyBmbGFnZ2VkTW9udGhzQ2FsZW5kYXIgfSk7XHJcbiAgfVxyXG5cclxuICBpZiAoc3RhdGUudmlldy5tb2RlID09PSAneWVhcicgJiYgc3RhdGUueWVhcnNDYWxlbmRhck1vZGVsKSB7XHJcbiAgICBjb25zdCB5ZWFyc0NhbGVuZGFyRmxhZ2dlZCA9IHN0YXRlLnllYXJzQ2FsZW5kYXJNb2RlbC5tYXAoXHJcbiAgICAgIChmb3JtYXR0ZWRNb250aCwgeWVhckluZGV4KSA9PlxyXG4gICAgICAgIGZsYWdZZWFyc0NhbGVuZGFyKGZvcm1hdHRlZE1vbnRoLCB7XHJcbiAgICAgICAgICBpc0Rpc2FibGVkOiBzdGF0ZS5pc0Rpc2FibGVkLFxyXG4gICAgICAgICAgbWluRGF0ZTogc3RhdGUubWluRGF0ZSxcclxuICAgICAgICAgIG1heERhdGU6IHN0YXRlLm1heERhdGUsXHJcbiAgICAgICAgICBob3ZlcmVkWWVhcjogc3RhdGUuaG92ZXJlZFllYXIsXHJcbiAgICAgICAgICBzZWxlY3RlZERhdGU6IHN0YXRlLnNlbGVjdGVkRGF0ZSxcclxuICAgICAgICAgIGRhdGVzRGlzYWJsZWQ6IHN0YXRlLmRhdGVzRGlzYWJsZWQsXHJcbiAgICAgICAgICBkYXRlc0VuYWJsZWQ6IHN0YXRlLmRhdGVzRW5hYmxlZCxcclxuICAgICAgICAgIHNlbGVjdGVkUmFuZ2U6IHN0YXRlLnNlbGVjdGVkUmFuZ2UsXHJcbiAgICAgICAgICBkaXNwbGF5TW9udGhzLFxyXG4gICAgICAgICAgeWVhckluZGV4XHJcbiAgICAgICAgfSlcclxuICAgICk7XHJcblxyXG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IHllYXJzQ2FsZW5kYXJGbGFnZ2VkIH0pO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHN0YXRlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBuYXZpZ2F0ZU9mZnNldFJlZHVjZXIoc3RhdGU6IEJzRGF0ZXBpY2tlclN0YXRlLCBhY3Rpb246IEFjdGlvbik6IEJzRGF0ZXBpY2tlclN0YXRlIHtcclxuICBpZiAoIXN0YXRlLnZpZXcpIHtcclxuICAgIHJldHVybiBzdGF0ZTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGRhdGUgPSBzaGlmdFZpZXdEYXRlKHN0YXRlLCBhY3Rpb24pO1xyXG4gIGlmICghZGF0ZSkge1xyXG4gICAgcmV0dXJuIHN0YXRlO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgbmV3U3RhdGU6IHt2aWV3OiBCc0RhdGVwaWNrZXJWaWV3U3RhdGV9ID0ge1xyXG4gICAgdmlldzoge1xyXG4gICAgICBtb2RlOiBzdGF0ZS52aWV3Lm1vZGUsXHJcbiAgICAgIGRhdGVcclxuICAgIH1cclxuICB9O1xyXG5cclxuICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIG5ld1N0YXRlKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2hpZnRWaWV3RGF0ZShzdGF0ZTogQnNEYXRlcGlja2VyU3RhdGUsIGFjdGlvbjogQWN0aW9uKTogRGF0ZSB8IHVuZGVmaW5lZCB7XHJcbiAgaWYgKCFzdGF0ZS52aWV3KSB7XHJcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgaWYgKHN0YXRlLnZpZXcubW9kZSA9PT0gJ3llYXInICYmIHN0YXRlLm1pbk1vZGUgPT09ICd5ZWFyJykge1xyXG4gICAgY29uc3QgaW5pdGlhbERhdGUgPSBnZXRZZWFyc0NhbGVuZGFySW5pdGlhbERhdGUoc3RhdGUsIDApO1xyXG4gICAgaWYgKGluaXRpYWxEYXRlKSB7XHJcbiAgICAgIGNvbnN0IG1pZGRsZURhdGUgPSBzaGlmdERhdGUoaW5pdGlhbERhdGUsIHsgeWVhcjogLWluaXRpYWxZZWFyU2hpZnQgfSk7XHJcbiAgICAgIHJldHVybiBzaGlmdERhdGUobWlkZGxlRGF0ZSwgYWN0aW9uLnBheWxvYWQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHNoaWZ0RGF0ZShzdGFydE9mKHN0YXRlLnZpZXcuZGF0ZSwgJ21vbnRoJyksIGFjdGlvbi5wYXlsb2FkKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0Rm9ybWF0T3B0aW9ucyhzdGF0ZTogQnNEYXRlcGlja2VyU3RhdGUpOiBEYXRlcGlja2VyRm9ybWF0T3B0aW9ucyB7XHJcbiAgcmV0dXJuIHtcclxuICAgIGxvY2FsZTogc3RhdGUubG9jYWxlLFxyXG5cclxuICAgIG1vbnRoVGl0bGU6IHN0YXRlLm1vbnRoVGl0bGUsXHJcbiAgICB5ZWFyVGl0bGU6IHN0YXRlLnllYXJUaXRsZSxcclxuXHJcbiAgICBkYXlMYWJlbDogc3RhdGUuZGF5TGFiZWwsXHJcbiAgICBtb250aExhYmVsOiBzdGF0ZS5tb250aExhYmVsLFxyXG4gICAgeWVhckxhYmVsOiBzdGF0ZS55ZWFyTGFiZWwsXHJcblxyXG4gICAgd2Vla051bWJlcnM6IHN0YXRlLndlZWtOdW1iZXJzXHJcbiAgfTtcclxufVxyXG5cclxuLyoqXHJcbiAqIGlmIHZpZXcgZGF0ZSBpcyBwcm92aWRlZCAoYnNWYWx1ZXxuZ01vZGVsKSBpdCBzaG91bGQgYmUgc2hvd25cclxuICogaWYgdmlldyBkYXRlIGlzIG5vdCBwcm92aWRlcjpcclxuICogaWYgbWluRGF0ZT5jdXJyZW50RGF0ZSAoZGVmYXVsdCB2aWV3IHZhbHVlKSwgc2hvdyBtaW5EYXRlXHJcbiAqIGlmIG1heERhdGU8Y3VycmVudERhdGUoZGVmYXVsdCB2aWV3IHZhbHVlKSBzaG93IG1heERhdGVcclxuICovXHJcbmZ1bmN0aW9uIGdldFZpZXdEYXRlKHZpZXdEYXRlOiBEYXRlIHwgRGF0ZVtdLCBtaW5EYXRlPzogRGF0ZSwgbWF4RGF0ZT86IERhdGUpIHtcclxuICBjb25zdCBfZGF0ZSA9IEFycmF5LmlzQXJyYXkodmlld0RhdGUpID8gdmlld0RhdGVbMF0gOiB2aWV3RGF0ZTtcclxuXHJcbiAgaWYgKG1pbkRhdGUgJiYgaXNBZnRlcihtaW5EYXRlLCBfZGF0ZSwgJ2RheScpKSB7XHJcbiAgICByZXR1cm4gbWluRGF0ZTtcclxuICB9XHJcblxyXG4gIGlmIChtYXhEYXRlICYmIGlzQmVmb3JlKG1heERhdGUsIF9kYXRlLCAnZGF5JykpIHtcclxuICAgIHJldHVybiBtYXhEYXRlO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIF9kYXRlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpc0Rpc3BsYXlPbmVNb250aCh2aWV3RGF0ZTogRGF0ZSwgbWluRGF0ZT86IERhdGUsIG1heERhdGU/OiBEYXRlKSB7XHJcbiAgaWYgKG1heERhdGUgJiYgaXNTYW1lKG1heERhdGUsIHZpZXdEYXRlLCAnZGF5JykpIHtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG1pbkRhdGUgJiYgbWF4RGF0ZSAmJiBtaW5EYXRlLmdldE1vbnRoKCkgPT09IG1heERhdGUuZ2V0TW9udGgoKTtcclxufVxyXG4iXX0=