import { formatDate, getLocale } from 'ngx-bootstrap/chronos';
export function formatDaysCalendar(daysCalendar, formatOptions, monthIndex) {
    return {
        month: daysCalendar.month,
        monthTitle: formatDate(daysCalendar.month, formatOptions.monthTitle, formatOptions.locale),
        yearTitle: formatDate(daysCalendar.month, formatOptions.yearTitle, formatOptions.locale),
        weekNumbers: getWeekNumbers(daysCalendar.daysMatrix, formatOptions.weekNumbers, formatOptions.locale),
        weekdays: getShiftedWeekdays(formatOptions.locale),
        weeks: daysCalendar.daysMatrix.map((week, weekIndex) => ({
            days: week.map((date, dayIndex) => ({
                date,
                label: formatDate(date, formatOptions.dayLabel, formatOptions.locale),
                monthIndex,
                weekIndex,
                dayIndex
            }))
        })),
        hideLeftArrow: false,
        hideRightArrow: false,
        disableLeftArrow: false,
        disableRightArrow: false
    };
}
export function getWeekNumbers(daysMatrix, format, locale) {
    return daysMatrix.map((days) => (days[0] ? formatDate(days[0], format, locale) : ''));
}
export function getShiftedWeekdays(locale) {
    const _locale = getLocale(locale);
    const weekdays = _locale.weekdaysShort();
    const firstDayOfWeek = _locale.firstDayOfWeek();
    return [...weekdays.slice(firstDayOfWeek), ...weekdays.slice(0, firstDayOfWeek)];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWF0LWRheXMtY2FsZW5kYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvZGF0ZXBpY2tlci9lbmdpbmUvZm9ybWF0LWRheXMtY2FsZW5kYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBS0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUU5RCxNQUFNLFVBQVUsa0JBQWtCLENBQUMsWUFBK0IsRUFDL0IsYUFBc0MsRUFDdEMsVUFBa0I7SUFDbkQsT0FBTztRQUNMLEtBQUssRUFBRSxZQUFZLENBQUMsS0FBSztRQUN6QixVQUFVLEVBQUUsVUFBVSxDQUNwQixZQUFZLENBQUMsS0FBSyxFQUNsQixhQUFhLENBQUMsVUFBVSxFQUN4QixhQUFhLENBQUMsTUFBTSxDQUNyQjtRQUNELFNBQVMsRUFBRSxVQUFVLENBQ25CLFlBQVksQ0FBQyxLQUFLLEVBQ2xCLGFBQWEsQ0FBQyxTQUFTLEVBQ3ZCLGFBQWEsQ0FBQyxNQUFNLENBQ3JCO1FBQ0QsV0FBVyxFQUFFLGNBQWMsQ0FDekIsWUFBWSxDQUFDLFVBQVUsRUFDdkIsYUFBYSxDQUFDLFdBQVcsRUFDekIsYUFBYSxDQUFDLE1BQU0sQ0FDckI7UUFDRCxRQUFRLEVBQUUsa0JBQWtCLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQztRQUNsRCxLQUFLLEVBQUUsWUFBWSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFZLEVBQUUsU0FBaUIsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUN2RSxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQVUsRUFBRSxRQUFnQixFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUNoRCxJQUFJO2dCQUNKLEtBQUssRUFBRSxVQUFVLENBQUMsSUFBSSxFQUFFLGFBQWEsQ0FBQyxRQUFRLEVBQUUsYUFBYSxDQUFDLE1BQU0sQ0FBQztnQkFDckUsVUFBVTtnQkFDVixTQUFTO2dCQUNULFFBQVE7YUFDVCxDQUFDLENBQUM7U0FDSixDQUFDLENBQUM7UUFDSCxhQUFhLEVBQUUsS0FBSztRQUNwQixjQUFjLEVBQUUsS0FBSztRQUNyQixnQkFBZ0IsRUFBRSxLQUFLO1FBQ3ZCLGlCQUFpQixFQUFFLEtBQUs7S0FDekIsQ0FBQztBQUNKLENBQUM7QUFFRCxNQUFNLFVBQVUsY0FBYyxDQUFDLFVBQW9CLEVBQ3BCLE1BQWUsRUFDZixNQUFlO0lBQzVDLE9BQU8sVUFBVSxDQUFDLEdBQUcsQ0FDbkIsQ0FBQyxJQUFZLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQ3ZFLENBQUM7QUFDSixDQUFDO0FBRUQsTUFBTSxVQUFVLGtCQUFrQixDQUFDLE1BQWU7SUFDaEQsTUFBTSxPQUFPLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2xDLE1BQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxhQUFhLEVBQWMsQ0FBQztJQUNyRCxNQUFNLGNBQWMsR0FBRyxPQUFPLENBQUMsY0FBYyxFQUFFLENBQUM7SUFFaEQsT0FBTyxDQUFDLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsRUFBRSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLGNBQWMsQ0FBQyxDQUFDLENBQUM7QUFDbkYsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgRGF0ZXBpY2tlckZvcm1hdE9wdGlvbnMsXHJcbiAgRGF5c0NhbGVuZGFyTW9kZWwsXHJcbiAgRGF5c0NhbGVuZGFyVmlld01vZGVsXHJcbn0gZnJvbSAnLi4vbW9kZWxzJztcclxuaW1wb3J0IHsgZm9ybWF0RGF0ZSwgZ2V0TG9jYWxlIH0gZnJvbSAnbmd4LWJvb3RzdHJhcC9jaHJvbm9zJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXREYXlzQ2FsZW5kYXIoZGF5c0NhbGVuZGFyOiBEYXlzQ2FsZW5kYXJNb2RlbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXRPcHRpb25zOiBEYXRlcGlja2VyRm9ybWF0T3B0aW9ucyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb250aEluZGV4OiBudW1iZXIpOiBEYXlzQ2FsZW5kYXJWaWV3TW9kZWwge1xyXG4gIHJldHVybiB7XHJcbiAgICBtb250aDogZGF5c0NhbGVuZGFyLm1vbnRoLFxyXG4gICAgbW9udGhUaXRsZTogZm9ybWF0RGF0ZShcclxuICAgICAgZGF5c0NhbGVuZGFyLm1vbnRoLFxyXG4gICAgICBmb3JtYXRPcHRpb25zLm1vbnRoVGl0bGUsXHJcbiAgICAgIGZvcm1hdE9wdGlvbnMubG9jYWxlXHJcbiAgICApLFxyXG4gICAgeWVhclRpdGxlOiBmb3JtYXREYXRlKFxyXG4gICAgICBkYXlzQ2FsZW5kYXIubW9udGgsXHJcbiAgICAgIGZvcm1hdE9wdGlvbnMueWVhclRpdGxlLFxyXG4gICAgICBmb3JtYXRPcHRpb25zLmxvY2FsZVxyXG4gICAgKSxcclxuICAgIHdlZWtOdW1iZXJzOiBnZXRXZWVrTnVtYmVycyhcclxuICAgICAgZGF5c0NhbGVuZGFyLmRheXNNYXRyaXgsXHJcbiAgICAgIGZvcm1hdE9wdGlvbnMud2Vla051bWJlcnMsXHJcbiAgICAgIGZvcm1hdE9wdGlvbnMubG9jYWxlXHJcbiAgICApLFxyXG4gICAgd2Vla2RheXM6IGdldFNoaWZ0ZWRXZWVrZGF5cyhmb3JtYXRPcHRpb25zLmxvY2FsZSksXHJcbiAgICB3ZWVrczogZGF5c0NhbGVuZGFyLmRheXNNYXRyaXgubWFwKCh3ZWVrOiBEYXRlW10sIHdlZWtJbmRleDogbnVtYmVyKSA9PiAoe1xyXG4gICAgICBkYXlzOiB3ZWVrLm1hcCgoZGF0ZTogRGF0ZSwgZGF5SW5kZXg6IG51bWJlcikgPT4gKHtcclxuICAgICAgICBkYXRlLFxyXG4gICAgICAgIGxhYmVsOiBmb3JtYXREYXRlKGRhdGUsIGZvcm1hdE9wdGlvbnMuZGF5TGFiZWwsIGZvcm1hdE9wdGlvbnMubG9jYWxlKSxcclxuICAgICAgICBtb250aEluZGV4LFxyXG4gICAgICAgIHdlZWtJbmRleCxcclxuICAgICAgICBkYXlJbmRleFxyXG4gICAgICB9KSlcclxuICAgIH0pKSxcclxuICAgIGhpZGVMZWZ0QXJyb3c6IGZhbHNlLFxyXG4gICAgaGlkZVJpZ2h0QXJyb3c6IGZhbHNlLFxyXG4gICAgZGlzYWJsZUxlZnRBcnJvdzogZmFsc2UsXHJcbiAgICBkaXNhYmxlUmlnaHRBcnJvdzogZmFsc2VcclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0V2Vla051bWJlcnMoZGF5c01hdHJpeDogRGF0ZVtdW10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXQ/OiBzdHJpbmcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NhbGU/OiBzdHJpbmcpOiBzdHJpbmdbXSB7XHJcbiAgcmV0dXJuIGRheXNNYXRyaXgubWFwKFxyXG4gICAgKGRheXM6IERhdGVbXSkgPT4gKGRheXNbMF0gPyBmb3JtYXREYXRlKGRheXNbMF0sIGZvcm1hdCwgbG9jYWxlKSA6ICcnKVxyXG4gICk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRTaGlmdGVkV2Vla2RheXMobG9jYWxlPzogc3RyaW5nKTogc3RyaW5nW10ge1xyXG4gIGNvbnN0IF9sb2NhbGUgPSBnZXRMb2NhbGUobG9jYWxlKTtcclxuICBjb25zdCB3ZWVrZGF5cyA9IF9sb2NhbGUud2Vla2RheXNTaG9ydCgpIGFzIHN0cmluZ1tdO1xyXG4gIGNvbnN0IGZpcnN0RGF5T2ZXZWVrID0gX2xvY2FsZS5maXJzdERheU9mV2VlaygpO1xyXG5cclxuICByZXR1cm4gWy4uLndlZWtkYXlzLnNsaWNlKGZpcnN0RGF5T2ZXZWVrKSwgLi4ud2Vla2RheXMuc2xpY2UoMCwgZmlyc3REYXlPZldlZWspXTtcclxufVxyXG4iXX0=