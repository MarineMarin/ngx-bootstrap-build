/**
 *
 * @param {number} year
 * @param {number} dow - start-of-first-week
 * @param {number} doy - start-of-year
 * @returns {number}
 */
import { createUTCDate } from '../create/date-from-array';
import { daysInYear } from './year';
import { getDayOfYear } from './day-of-year';
import { getFullYear } from '../utils/date-getters';
function firstWeekOffset(year, dow, doy) {
    // first-week day -- which january is always in the first week (4 for iso, 1 for other)
    const fwd = dow - doy + 7;
    // first-week day local weekday -- which local weekday is fwd
    const fwdlw = (createUTCDate(year, 0, fwd).getUTCDay() - dow + 7) % 7;
    return -fwdlw + fwd - 1;
}
// https://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
export function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
    const localWeekday = (7 + weekday - dow) % 7;
    const weekOffset = firstWeekOffset(year, dow, doy);
    const dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset;
    let resYear;
    let resDayOfYear;
    if (dayOfYear <= 0) {
        resYear = year - 1;
        resDayOfYear = daysInYear(resYear) + dayOfYear;
    }
    else if (dayOfYear > daysInYear(year)) {
        resYear = year + 1;
        resDayOfYear = dayOfYear - daysInYear(year);
    }
    else {
        resYear = year;
        resDayOfYear = dayOfYear;
    }
    return {
        year: resYear,
        dayOfYear: resDayOfYear
    };
}
export function weekOfYear(date, dow, doy, isUTC) {
    const weekOffset = firstWeekOffset(getFullYear(date, isUTC), dow, doy);
    const week = Math.floor((getDayOfYear(date, isUTC) - weekOffset - 1) / 7) + 1;
    let resWeek;
    let resYear;
    if (week < 1) {
        resYear = getFullYear(date, isUTC) - 1;
        resWeek = week + weeksInYear(resYear, dow, doy);
    }
    else if (week > weeksInYear(getFullYear(date, isUTC), dow, doy)) {
        resWeek = week - weeksInYear(getFullYear(date, isUTC), dow, doy);
        resYear = getFullYear(date, isUTC) + 1;
    }
    else {
        resYear = getFullYear(date, isUTC);
        resWeek = week;
    }
    return {
        week: resWeek,
        year: resYear
    };
}
export function weeksInYear(year, dow, doy) {
    const weekOffset = firstWeekOffset(year, dow, doy);
    const weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
    return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2Vlay1jYWxlbmRhci11dGlscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jaHJvbm9zL3VuaXRzL3dlZWstY2FsZW5kYXItdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBQ0gsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzFELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFDcEMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFcEQsU0FBUyxlQUFlLENBQUMsSUFBWSxFQUFFLEdBQVcsRUFBRSxHQUFXO0lBQzdELHVGQUF1RjtJQUN2RixNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQztJQUMxQiw2REFBNkQ7SUFDN0QsTUFBTSxLQUFLLEdBQUcsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRXRFLE9BQU8sQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQztBQUMxQixDQUFDO0FBRUQsMkdBQTJHO0FBQzNHLE1BQU0sVUFBVSxrQkFBa0IsQ0FDaEMsSUFBWSxFQUNaLElBQVksRUFDWixPQUFlLEVBQ2YsR0FBVyxFQUNYLEdBQVc7SUFFWCxNQUFNLFlBQVksR0FBRyxDQUFDLENBQUMsR0FBRyxPQUFPLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzdDLE1BQU0sVUFBVSxHQUFHLGVBQWUsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ25ELE1BQU0sU0FBUyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsWUFBWSxHQUFHLFVBQVUsQ0FBQztJQUNqRSxJQUFJLE9BQWUsQ0FBQztJQUNwQixJQUFJLFlBQW9CLENBQUM7SUFFekIsSUFBSSxTQUFTLElBQUksQ0FBQyxFQUFFO1FBQ2xCLE9BQU8sR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLFlBQVksR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLEdBQUcsU0FBUyxDQUFDO0tBQ2hEO1NBQU0sSUFBSSxTQUFTLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ3ZDLE9BQU8sR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLFlBQVksR0FBRyxTQUFTLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzdDO1NBQU07UUFDTCxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ2YsWUFBWSxHQUFHLFNBQVMsQ0FBQztLQUMxQjtJQUVELE9BQU87UUFDTCxJQUFJLEVBQUUsT0FBTztRQUNiLFNBQVMsRUFBRSxZQUFZO0tBQ3hCLENBQUM7QUFDSixDQUFDO0FBRUQsTUFBTSxVQUFVLFVBQVUsQ0FBQyxJQUFVLEVBQUUsR0FBVyxFQUFFLEdBQVcsRUFBRSxLQUFlO0lBQzlFLE1BQU0sVUFBVSxHQUFHLGVBQWUsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUN2RSxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsR0FBRyxVQUFVLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzlFLElBQUksT0FBZSxDQUFDO0lBQ3BCLElBQUksT0FBZSxDQUFDO0lBRXBCLElBQUksSUFBSSxHQUFHLENBQUMsRUFBRTtRQUNaLE9BQU8sR0FBRyxXQUFXLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN2QyxPQUFPLEdBQUcsSUFBSSxHQUFHLFdBQVcsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0tBQ2pEO1NBQU0sSUFBSSxJQUFJLEdBQUcsV0FBVyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFO1FBQ2pFLE9BQU8sR0FBRyxJQUFJLEdBQUcsV0FBVyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ2pFLE9BQU8sR0FBRyxXQUFXLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUN4QztTQUFNO1FBQ0wsT0FBTyxHQUFHLFdBQVcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDbkMsT0FBTyxHQUFHLElBQUksQ0FBQztLQUNoQjtJQUVELE9BQU87UUFDTCxJQUFJLEVBQUUsT0FBTztRQUNiLElBQUksRUFBRSxPQUFPO0tBQ2QsQ0FBQztBQUNKLENBQUM7QUFFRCxNQUFNLFVBQVUsV0FBVyxDQUFDLElBQVksRUFBRSxHQUFXLEVBQUUsR0FBVztJQUNoRSxNQUFNLFVBQVUsR0FBRyxlQUFlLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNuRCxNQUFNLGNBQWMsR0FBRyxlQUFlLENBQUMsSUFBSSxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFFM0QsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxVQUFVLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzlELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICpcclxuICogQHBhcmFtIHtudW1iZXJ9IHllYXJcclxuICogQHBhcmFtIHtudW1iZXJ9IGRvdyAtIHN0YXJ0LW9mLWZpcnN0LXdlZWtcclxuICogQHBhcmFtIHtudW1iZXJ9IGRveSAtIHN0YXJ0LW9mLXllYXJcclxuICogQHJldHVybnMge251bWJlcn1cclxuICovXHJcbmltcG9ydCB7IGNyZWF0ZVVUQ0RhdGUgfSBmcm9tICcuLi9jcmVhdGUvZGF0ZS1mcm9tLWFycmF5JztcclxuaW1wb3J0IHsgZGF5c0luWWVhciB9IGZyb20gJy4veWVhcic7XHJcbmltcG9ydCB7IGdldERheU9mWWVhciB9IGZyb20gJy4vZGF5LW9mLXllYXInO1xyXG5pbXBvcnQgeyBnZXRGdWxsWWVhciB9IGZyb20gJy4uL3V0aWxzL2RhdGUtZ2V0dGVycyc7XHJcblxyXG5mdW5jdGlvbiBmaXJzdFdlZWtPZmZzZXQoeWVhcjogbnVtYmVyLCBkb3c6IG51bWJlciwgZG95OiBudW1iZXIpOiBudW1iZXIge1xyXG4gIC8vIGZpcnN0LXdlZWsgZGF5IC0tIHdoaWNoIGphbnVhcnkgaXMgYWx3YXlzIGluIHRoZSBmaXJzdCB3ZWVrICg0IGZvciBpc28sIDEgZm9yIG90aGVyKVxyXG4gIGNvbnN0IGZ3ZCA9IGRvdyAtIGRveSArIDc7XHJcbiAgLy8gZmlyc3Qtd2VlayBkYXkgbG9jYWwgd2Vla2RheSAtLSB3aGljaCBsb2NhbCB3ZWVrZGF5IGlzIGZ3ZFxyXG4gIGNvbnN0IGZ3ZGx3ID0gKGNyZWF0ZVVUQ0RhdGUoeWVhciwgMCwgZndkKS5nZXRVVENEYXkoKSAtIGRvdyArIDcpICUgNztcclxuXHJcbiAgcmV0dXJuIC1md2RsdyArIGZ3ZCAtIDE7XHJcbn1cclxuXHJcbi8vIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0lTT193ZWVrX2RhdGUjQ2FsY3VsYXRpbmdfYV9kYXRlX2dpdmVuX3RoZV95ZWFyLjJDX3dlZWtfbnVtYmVyX2FuZF93ZWVrZGF5XHJcbmV4cG9ydCBmdW5jdGlvbiBkYXlPZlllYXJGcm9tV2Vla3MoXHJcbiAgeWVhcjogbnVtYmVyLFxyXG4gIHdlZWs6IG51bWJlcixcclxuICB3ZWVrZGF5OiBudW1iZXIsXHJcbiAgZG93OiBudW1iZXIsXHJcbiAgZG95OiBudW1iZXJcclxuKTogeyB5ZWFyOiBudW1iZXI7IGRheU9mWWVhcjogbnVtYmVyIH0ge1xyXG4gIGNvbnN0IGxvY2FsV2Vla2RheSA9ICg3ICsgd2Vla2RheSAtIGRvdykgJSA3O1xyXG4gIGNvbnN0IHdlZWtPZmZzZXQgPSBmaXJzdFdlZWtPZmZzZXQoeWVhciwgZG93LCBkb3kpO1xyXG4gIGNvbnN0IGRheU9mWWVhciA9IDEgKyA3ICogKHdlZWsgLSAxKSArIGxvY2FsV2Vla2RheSArIHdlZWtPZmZzZXQ7XHJcbiAgbGV0IHJlc1llYXI6IG51bWJlcjtcclxuICBsZXQgcmVzRGF5T2ZZZWFyOiBudW1iZXI7XHJcblxyXG4gIGlmIChkYXlPZlllYXIgPD0gMCkge1xyXG4gICAgcmVzWWVhciA9IHllYXIgLSAxO1xyXG4gICAgcmVzRGF5T2ZZZWFyID0gZGF5c0luWWVhcihyZXNZZWFyKSArIGRheU9mWWVhcjtcclxuICB9IGVsc2UgaWYgKGRheU9mWWVhciA+IGRheXNJblllYXIoeWVhcikpIHtcclxuICAgIHJlc1llYXIgPSB5ZWFyICsgMTtcclxuICAgIHJlc0RheU9mWWVhciA9IGRheU9mWWVhciAtIGRheXNJblllYXIoeWVhcik7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJlc1llYXIgPSB5ZWFyO1xyXG4gICAgcmVzRGF5T2ZZZWFyID0gZGF5T2ZZZWFyO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHllYXI6IHJlc1llYXIsXHJcbiAgICBkYXlPZlllYXI6IHJlc0RheU9mWWVhclxyXG4gIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB3ZWVrT2ZZZWFyKGRhdGU6IERhdGUsIGRvdzogbnVtYmVyLCBkb3k6IG51bWJlciwgaXNVVEM/OiBib29sZWFuKTogeyB3ZWVrOiBudW1iZXI7IHllYXI6IG51bWJlciB9IHtcclxuICBjb25zdCB3ZWVrT2Zmc2V0ID0gZmlyc3RXZWVrT2Zmc2V0KGdldEZ1bGxZZWFyKGRhdGUsIGlzVVRDKSwgZG93LCBkb3kpO1xyXG4gIGNvbnN0IHdlZWsgPSBNYXRoLmZsb29yKChnZXREYXlPZlllYXIoZGF0ZSwgaXNVVEMpIC0gd2Vla09mZnNldCAtIDEpIC8gNykgKyAxO1xyXG4gIGxldCByZXNXZWVrOiBudW1iZXI7XHJcbiAgbGV0IHJlc1llYXI6IG51bWJlcjtcclxuXHJcbiAgaWYgKHdlZWsgPCAxKSB7XHJcbiAgICByZXNZZWFyID0gZ2V0RnVsbFllYXIoZGF0ZSwgaXNVVEMpIC0gMTtcclxuICAgIHJlc1dlZWsgPSB3ZWVrICsgd2Vla3NJblllYXIocmVzWWVhciwgZG93LCBkb3kpO1xyXG4gIH0gZWxzZSBpZiAod2VlayA+IHdlZWtzSW5ZZWFyKGdldEZ1bGxZZWFyKGRhdGUsIGlzVVRDKSwgZG93LCBkb3kpKSB7XHJcbiAgICByZXNXZWVrID0gd2VlayAtIHdlZWtzSW5ZZWFyKGdldEZ1bGxZZWFyKGRhdGUsIGlzVVRDKSwgZG93LCBkb3kpO1xyXG4gICAgcmVzWWVhciA9IGdldEZ1bGxZZWFyKGRhdGUsIGlzVVRDKSArIDE7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJlc1llYXIgPSBnZXRGdWxsWWVhcihkYXRlLCBpc1VUQyk7XHJcbiAgICByZXNXZWVrID0gd2VlaztcclxuICB9XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICB3ZWVrOiByZXNXZWVrLFxyXG4gICAgeWVhcjogcmVzWWVhclxyXG4gIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB3ZWVrc0luWWVhcih5ZWFyOiBudW1iZXIsIGRvdzogbnVtYmVyLCBkb3k6IG51bWJlcik6IG51bWJlciB7XHJcbiAgY29uc3Qgd2Vla09mZnNldCA9IGZpcnN0V2Vla09mZnNldCh5ZWFyLCBkb3csIGRveSk7XHJcbiAgY29uc3Qgd2Vla09mZnNldE5leHQgPSBmaXJzdFdlZWtPZmZzZXQoeWVhciArIDEsIGRvdywgZG95KTtcclxuXHJcbiAgcmV0dXJuIChkYXlzSW5ZZWFyKHllYXIpIC0gd2Vla09mZnNldCArIHdlZWtPZmZzZXROZXh0KSAvIDc7XHJcbn1cclxuIl19