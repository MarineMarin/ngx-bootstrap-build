import { DATE, HOUR, MILLISECOND, MINUTE, MONTH, SECOND, YEAR } from '../units/constants';
import { daysInYear } from '../units/year';
import { getParsingFlags } from './parsing-flags';
import { createUTCDate } from './date-from-array';
import { createDate } from './date-from-array';
import { dayOfYearFromWeeks, weekOfYear, weeksInYear } from '../units/week-calendar-utils';
import { defaults } from '../utils/defaults';
function currentDateArray(config) {
    const nowValue = new Date();
    if (config._useUTC) {
        return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
    }
    return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
}
// convert an array to a date.
// the array should mirror the parameters below
// note: all values past the year are optional and will default to the lowest possible value.
// [year, month, day , hour, minute, second, millisecond]
export function configFromArray(config) {
    const input = [];
    let i;
    let date;
    let yearToUse;
    if (config._d) {
        return config;
    }
    const currentDate = currentDateArray(config);
    // compute day of the year from weeks and weekdays
    if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
        dayOfYearFromWeekInfo(config);
    }
    // if the day of the year is set, figure out what it is
    if (config._dayOfYear != null) {
        yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);
        if (config._dayOfYear > daysInYear(yearToUse) || config._dayOfYear === 0) {
            getParsingFlags(config)._overflowDayOfYear = true;
        }
        date = new Date(Date.UTC(yearToUse, 0, config._dayOfYear));
        config._a[MONTH] = date.getUTCMonth();
        config._a[DATE] = date.getUTCDate();
    }
    // Default to current date.
    // * if no year, month, day of month are given, default to today
    // * if day of month is given, default month and year
    // * if month is given, default only year
    // * if year is given, don't default anything
    for (i = 0; i < 3 && config._a[i] == null; ++i) {
        config._a[i] = input[i] = currentDate[i];
    }
    // Zero out whatever was not defaulted, including time
    for (; i < 7; i++) {
        config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
    }
    // Check for 24:00:00.000
    if (config._a[HOUR] === 24 &&
        config._a[MINUTE] === 0 &&
        config._a[SECOND] === 0 &&
        config._a[MILLISECOND] === 0) {
        config._nextDay = true;
        config._a[HOUR] = 0;
    }
    // eslint-disable-next-line prefer-spread
    config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
    const expectedWeekday = config._useUTC ? config._d.getUTCDay() : config._d.getDay();
    // Apply timezone offset from input. The actual utcOffset can be changed
    // with parseZone.
    if (config._tzm != null) {
        config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
    }
    if (config._nextDay) {
        config._a[HOUR] = 24;
    }
    // check for mismatching day of week
    if (config._w && typeof config._w["d"] !== 'undefined' && config._w["d"] !== expectedWeekday) {
        getParsingFlags(config).weekdayMismatch = true;
    }
    return config;
}
function dayOfYearFromWeekInfo(config) {
    let weekYear, week, weekday, dow, doy, temp, weekdayOverflow;
    const w = config._w;
    if (w["GG"] != null || w["W"] != null || w["E"] != null) {
        dow = 1;
        doy = 4;
        // TODO: We need to take the current isoWeekYear, but that depends on
        // how we interpret now (local, utc, fixed offset). So create
        // a now version of current config (take local/utc/offset flags, and
        // create now).
        weekYear = defaults(w["GG"], config._a[YEAR], weekOfYear(new Date(), 1, 4).year);
        week = defaults(w["W"], 1);
        weekday = defaults(w["E"], 1);
        if (weekday < 1 || weekday > 7) {
            weekdayOverflow = true;
        }
    }
    else {
        dow = config._locale._week.dow;
        doy = config._locale._week.doy;
        const curWeek = weekOfYear(new Date(), dow, doy);
        weekYear = defaults(w["gg"], config._a[YEAR], curWeek.year);
        // Default to current week.
        week = defaults(w["w"], curWeek.week);
        if (w["d"] != null) {
            // weekday -- low day numbers are considered next week
            weekday = w["d"];
            if (weekday < 0 || weekday > 6) {
                weekdayOverflow = true;
            }
        }
        else if (w["e"] != null) {
            // local weekday -- counting starts from beginning of week
            weekday = w["e"] + dow;
            if (w["e"] < 0 || w["e"] > 6) {
                weekdayOverflow = true;
            }
        }
        else {
            // default to beginning of week
            weekday = dow;
        }
    }
    if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
        getParsingFlags(config)._overflowWeeks = true;
    }
    else if (weekdayOverflow != null) {
        getParsingFlags(config)._overflowWeekday = true;
    }
    else {
        temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
        config._a[YEAR] = temp.year;
        config._dayOfYear = temp.dayOfYear;
    }
    return config;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbS1hcnJheS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jaHJvbm9zL2NyZWF0ZS9mcm9tLWFycmF5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUMxRixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDM0YsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRTdDLFNBQVMsZ0JBQWdCLENBQUMsTUFBeUI7SUFDakQsTUFBTSxRQUFRLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztJQUU1QixJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUU7UUFDbEIsT0FBTyxDQUFDLFFBQVEsQ0FBQyxjQUFjLEVBQUUsRUFBRSxRQUFRLENBQUMsV0FBVyxFQUFFLEVBQUUsUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7S0FDbkY7SUFFRCxPQUFPLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxFQUFFLFFBQVEsQ0FBQyxRQUFRLEVBQUUsRUFBRSxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztBQUMzRSxDQUFDO0FBRUQsOEJBQThCO0FBQzlCLCtDQUErQztBQUMvQyw2RkFBNkY7QUFDN0YseURBQXlEO0FBQ3pELE1BQU0sVUFBVSxlQUFlLENB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RyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQzVCLE1BQU0sQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztLQUNwQztJQUVELE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEYXRlUGFyc2luZ0NvbmZpZyB9IGZyb20gJy4vcGFyc2luZy50eXBlcyc7XHJcbmltcG9ydCB7IERhdGVBcnJheSB9IGZyb20gJy4uL3R5cGVzJztcclxuaW1wb3J0IHsgREFURSwgSE9VUiwgTUlMTElTRUNPTkQsIE1JTlVURSwgTU9OVEgsIFNFQ09ORCwgWUVBUiB9IGZyb20gJy4uL3VuaXRzL2NvbnN0YW50cyc7XHJcbmltcG9ydCB7IGRheXNJblllYXIgfSBmcm9tICcuLi91bml0cy95ZWFyJztcclxuaW1wb3J0IHsgZ2V0UGFyc2luZ0ZsYWdzIH0gZnJvbSAnLi9wYXJzaW5nLWZsYWdzJztcclxuaW1wb3J0IHsgY3JlYXRlVVRDRGF0ZSB9IGZyb20gJy4vZGF0ZS1mcm9tLWFycmF5JztcclxuaW1wb3J0IHsgY3JlYXRlRGF0ZSB9IGZyb20gJy4vZGF0ZS1mcm9tLWFycmF5JztcclxuaW1wb3J0IHsgZGF5T2ZZZWFyRnJvbVdlZWtzLCB3ZWVrT2ZZZWFyLCB3ZWVrc0luWWVhciB9IGZyb20gJy4uL3VuaXRzL3dlZWstY2FsZW5kYXItdXRpbHMnO1xyXG5pbXBvcnQgeyBkZWZhdWx0cyB9IGZyb20gJy4uL3V0aWxzL2RlZmF1bHRzJztcclxuXHJcbmZ1bmN0aW9uIGN1cnJlbnREYXRlQXJyYXkoY29uZmlnOiBEYXRlUGFyc2luZ0NvbmZpZyk6IERhdGVBcnJheSB7XHJcbiAgY29uc3Qgbm93VmFsdWUgPSBuZXcgRGF0ZSgpO1xyXG5cclxuICBpZiAoY29uZmlnLl91c2VVVEMpIHtcclxuICAgIHJldHVybiBbbm93VmFsdWUuZ2V0VVRDRnVsbFllYXIoKSwgbm93VmFsdWUuZ2V0VVRDTW9udGgoKSwgbm93VmFsdWUuZ2V0VVRDRGF0ZSgpXTtcclxuICB9XHJcblxyXG4gIHJldHVybiBbbm93VmFsdWUuZ2V0RnVsbFllYXIoKSwgbm93VmFsdWUuZ2V0TW9udGgoKSwgbm93VmFsdWUuZ2V0RGF0ZSgpXTtcclxufVxyXG5cclxuLy8gY29udmVydCBhbiBhcnJheSB0byBhIGRhdGUuXHJcbi8vIHRoZSBhcnJheSBzaG91bGQgbWlycm9yIHRoZSBwYXJhbWV0ZXJzIGJlbG93XHJcbi8vIG5vdGU6IGFsbCB2YWx1ZXMgcGFzdCB0aGUgeWVhciBhcmUgb3B0aW9uYWwgYW5kIHdpbGwgZGVmYXVsdCB0byB0aGUgbG93ZXN0IHBvc3NpYmxlIHZhbHVlLlxyXG4vLyBbeWVhciwgbW9udGgsIGRheSAsIGhvdXIsIG1pbnV0ZSwgc2Vjb25kLCBtaWxsaXNlY29uZF1cclxuZXhwb3J0IGZ1bmN0aW9uIGNvbmZpZ0Zyb21BcnJheShjb25maWc6IERhdGVQYXJzaW5nQ29uZmlnKTogRGF0ZVBhcnNpbmdDb25maWcge1xyXG4gIGNvbnN0IGlucHV0ID0gW107XHJcbiAgbGV0IGk7XHJcbiAgbGV0IGRhdGU7XHJcbiAgbGV0IHllYXJUb1VzZTtcclxuXHJcbiAgaWYgKGNvbmZpZy5fZCkge1xyXG4gICAgcmV0dXJuIGNvbmZpZztcclxuICB9XHJcblxyXG4gIGNvbnN0IGN1cnJlbnREYXRlID0gY3VycmVudERhdGVBcnJheShjb25maWcpO1xyXG5cclxuICAvLyBjb21wdXRlIGRheSBvZiB0aGUgeWVhciBmcm9tIHdlZWtzIGFuZCB3ZWVrZGF5c1xyXG4gIGlmIChjb25maWcuX3cgJiYgY29uZmlnLl9hW0RBVEVdID09IG51bGwgJiYgY29uZmlnLl9hW01PTlRIXSA9PSBudWxsKSB7XHJcbiAgICBkYXlPZlllYXJGcm9tV2Vla0luZm8oY29uZmlnKTtcclxuICB9XHJcblxyXG4gIC8vIGlmIHRoZSBkYXkgb2YgdGhlIHllYXIgaXMgc2V0LCBmaWd1cmUgb3V0IHdoYXQgaXQgaXNcclxuICBpZiAoY29uZmlnLl9kYXlPZlllYXIgIT0gbnVsbCkge1xyXG4gICAgeWVhclRvVXNlID0gZGVmYXVsdHMoY29uZmlnLl9hW1lFQVJdLCBjdXJyZW50RGF0ZVtZRUFSXSk7XHJcblxyXG4gICAgaWYgKGNvbmZpZy5fZGF5T2ZZZWFyID4gZGF5c0luWWVhcih5ZWFyVG9Vc2UpIHx8IGNvbmZpZy5fZGF5T2ZZZWFyID09PSAwKSB7XHJcbiAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLl9vdmVyZmxvd0RheU9mWWVhciA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgZGF0ZSA9IG5ldyBEYXRlKERhdGUuVVRDKHllYXJUb1VzZSwgMCwgY29uZmlnLl9kYXlPZlllYXIpKTtcclxuICAgIGNvbmZpZy5fYVtNT05USF0gPSBkYXRlLmdldFVUQ01vbnRoKCk7XHJcbiAgICBjb25maWcuX2FbREFURV0gPSBkYXRlLmdldFVUQ0RhdGUoKTtcclxuICB9XHJcblxyXG4gIC8vIERlZmF1bHQgdG8gY3VycmVudCBkYXRlLlxyXG4gIC8vICogaWYgbm8geWVhciwgbW9udGgsIGRheSBvZiBtb250aCBhcmUgZ2l2ZW4sIGRlZmF1bHQgdG8gdG9kYXlcclxuICAvLyAqIGlmIGRheSBvZiBtb250aCBpcyBnaXZlbiwgZGVmYXVsdCBtb250aCBhbmQgeWVhclxyXG4gIC8vICogaWYgbW9udGggaXMgZ2l2ZW4sIGRlZmF1bHQgb25seSB5ZWFyXHJcbiAgLy8gKiBpZiB5ZWFyIGlzIGdpdmVuLCBkb24ndCBkZWZhdWx0IGFueXRoaW5nXHJcbiAgZm9yIChpID0gMDsgaSA8IDMgJiYgY29uZmlnLl9hW2ldID09IG51bGw7ICsraSkge1xyXG4gICAgY29uZmlnLl9hW2ldID0gaW5wdXRbaV0gPSBjdXJyZW50RGF0ZVtpXTtcclxuICB9XHJcblxyXG4gIC8vIFplcm8gb3V0IHdoYXRldmVyIHdhcyBub3QgZGVmYXVsdGVkLCBpbmNsdWRpbmcgdGltZVxyXG4gIGZvciAoOyBpIDwgNzsgaSsrKSB7XHJcbiAgICBjb25maWcuX2FbaV0gPSBpbnB1dFtpXSA9IChjb25maWcuX2FbaV0gPT0gbnVsbCkgPyAoaSA9PT0gMiA/IDEgOiAwKSA6IGNvbmZpZy5fYVtpXTtcclxuICB9XHJcblxyXG4gIC8vIENoZWNrIGZvciAyNDowMDowMC4wMDBcclxuICBpZiAoY29uZmlnLl9hW0hPVVJdID09PSAyNCAmJlxyXG4gICAgY29uZmlnLl9hW01JTlVURV0gPT09IDAgJiZcclxuICAgIGNvbmZpZy5fYVtTRUNPTkRdID09PSAwICYmXHJcbiAgICBjb25maWcuX2FbTUlMTElTRUNPTkRdID09PSAwKSB7XHJcbiAgICBjb25maWcuX25leHREYXkgPSB0cnVlO1xyXG4gICAgY29uZmlnLl9hW0hPVVJdID0gMDtcclxuICB9XHJcblxyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcmVmZXItc3ByZWFkXHJcbiAgY29uZmlnLl9kID0gKGNvbmZpZy5fdXNlVVRDID8gY3JlYXRlVVRDRGF0ZSA6IGNyZWF0ZURhdGUpLmFwcGx5KG51bGwsIGlucHV0KTtcclxuICBjb25zdCBleHBlY3RlZFdlZWtkYXkgPSBjb25maWcuX3VzZVVUQyA/IGNvbmZpZy5fZC5nZXRVVENEYXkoKSA6IGNvbmZpZy5fZC5nZXREYXkoKTtcclxuXHJcbiAgLy8gQXBwbHkgdGltZXpvbmUgb2Zmc2V0IGZyb20gaW5wdXQuIFRoZSBhY3R1YWwgdXRjT2Zmc2V0IGNhbiBiZSBjaGFuZ2VkXHJcbiAgLy8gd2l0aCBwYXJzZVpvbmUuXHJcbiAgaWYgKGNvbmZpZy5fdHptICE9IG51bGwpIHtcclxuICAgIGNvbmZpZy5fZC5zZXRVVENNaW51dGVzKGNvbmZpZy5fZC5nZXRVVENNaW51dGVzKCkgLSBjb25maWcuX3R6bSk7XHJcbiAgfVxyXG5cclxuICBpZiAoY29uZmlnLl9uZXh0RGF5KSB7XHJcbiAgICBjb25maWcuX2FbSE9VUl0gPSAyNDtcclxuICB9XHJcblxyXG4gIC8vIGNoZWNrIGZvciBtaXNtYXRjaGluZyBkYXkgb2Ygd2Vla1xyXG4gIGlmIChjb25maWcuX3cgJiYgdHlwZW9mIGNvbmZpZy5fd1tcImRcIl0gIT09ICd1bmRlZmluZWQnICYmIGNvbmZpZy5fd1tcImRcIl0gIT09IGV4cGVjdGVkV2Vla2RheSkge1xyXG4gICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykud2Vla2RheU1pc21hdGNoID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIHJldHVybiBjb25maWc7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRheU9mWWVhckZyb21XZWVrSW5mbyhjb25maWc6IERhdGVQYXJzaW5nQ29uZmlnKTogRGF0ZVBhcnNpbmdDb25maWcge1xyXG4gIGxldCB3ZWVrWWVhciwgd2Vlaywgd2Vla2RheSwgZG93LCBkb3ksIHRlbXAsIHdlZWtkYXlPdmVyZmxvdztcclxuXHJcbiAgY29uc3QgdyA9IGNvbmZpZy5fdztcclxuICBpZiAod1tcIkdHXCJdICE9IG51bGwgfHwgd1tcIldcIl0gIT0gbnVsbCB8fCB3W1wiRVwiXSAhPSBudWxsKSB7XHJcbiAgICBkb3cgPSAxO1xyXG4gICAgZG95ID0gNDtcclxuXHJcbiAgICAvLyBUT0RPOiBXZSBuZWVkIHRvIHRha2UgdGhlIGN1cnJlbnQgaXNvV2Vla1llYXIsIGJ1dCB0aGF0IGRlcGVuZHMgb25cclxuICAgIC8vIGhvdyB3ZSBpbnRlcnByZXQgbm93IChsb2NhbCwgdXRjLCBmaXhlZCBvZmZzZXQpLiBTbyBjcmVhdGVcclxuICAgIC8vIGEgbm93IHZlcnNpb24gb2YgY3VycmVudCBjb25maWcgKHRha2UgbG9jYWwvdXRjL29mZnNldCBmbGFncywgYW5kXHJcbiAgICAvLyBjcmVhdGUgbm93KS5cclxuICAgIHdlZWtZZWFyID0gZGVmYXVsdHMod1tcIkdHXCJdLCBjb25maWcuX2FbWUVBUl0sIHdlZWtPZlllYXIobmV3IERhdGUoKSwgMSwgNCkueWVhcik7XHJcbiAgICB3ZWVrID0gZGVmYXVsdHMod1tcIldcIl0sIDEpO1xyXG4gICAgd2Vla2RheSA9IGRlZmF1bHRzKHdbXCJFXCJdLCAxKTtcclxuICAgIGlmICh3ZWVrZGF5IDwgMSB8fCB3ZWVrZGF5ID4gNykge1xyXG4gICAgICB3ZWVrZGF5T3ZlcmZsb3cgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICBkb3cgPSBjb25maWcuX2xvY2FsZS5fd2Vlay5kb3c7XHJcbiAgICBkb3kgPSBjb25maWcuX2xvY2FsZS5fd2Vlay5kb3k7XHJcblxyXG4gICAgY29uc3QgY3VyV2VlayA9IHdlZWtPZlllYXIobmV3IERhdGUoKSwgZG93LCBkb3kpO1xyXG5cclxuICAgIHdlZWtZZWFyID0gZGVmYXVsdHMod1tcImdnXCJdLCBjb25maWcuX2FbWUVBUl0sIGN1cldlZWsueWVhcik7XHJcblxyXG4gICAgLy8gRGVmYXVsdCB0byBjdXJyZW50IHdlZWsuXHJcbiAgICB3ZWVrID0gZGVmYXVsdHMod1tcIndcIl0sIGN1cldlZWsud2Vlayk7XHJcblxyXG4gICAgaWYgKHdbXCJkXCJdICE9IG51bGwpIHtcclxuICAgICAgLy8gd2Vla2RheSAtLSBsb3cgZGF5IG51bWJlcnMgYXJlIGNvbnNpZGVyZWQgbmV4dCB3ZWVrXHJcbiAgICAgIHdlZWtkYXkgPSB3W1wiZFwiXTtcclxuICAgICAgaWYgKHdlZWtkYXkgPCAwIHx8IHdlZWtkYXkgPiA2KSB7XHJcbiAgICAgICAgd2Vla2RheU92ZXJmbG93ID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh3W1wiZVwiXSAhPSBudWxsKSB7XHJcbiAgICAgIC8vIGxvY2FsIHdlZWtkYXkgLS0gY291bnRpbmcgc3RhcnRzIGZyb20gYmVnaW5uaW5nIG9mIHdlZWtcclxuICAgICAgd2Vla2RheSA9IHdbXCJlXCJdICsgZG93O1xyXG4gICAgICBpZiAod1tcImVcIl0gPCAwIHx8IHdbXCJlXCJdID4gNikge1xyXG4gICAgICAgIHdlZWtkYXlPdmVyZmxvdyA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIGRlZmF1bHQgdG8gYmVnaW5uaW5nIG9mIHdlZWtcclxuICAgICAgd2Vla2RheSA9IGRvdztcclxuICAgIH1cclxuICB9XHJcbiAgaWYgKHdlZWsgPCAxIHx8IHdlZWsgPiB3ZWVrc0luWWVhcih3ZWVrWWVhciwgZG93LCBkb3kpKSB7XHJcbiAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5fb3ZlcmZsb3dXZWVrcyA9IHRydWU7XHJcbiAgfSBlbHNlIGlmICh3ZWVrZGF5T3ZlcmZsb3cgIT0gbnVsbCkge1xyXG4gICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuX292ZXJmbG93V2Vla2RheSA9IHRydWU7XHJcbiAgfSBlbHNlIHtcclxuICAgIHRlbXAgPSBkYXlPZlllYXJGcm9tV2Vla3Mod2Vla1llYXIsIHdlZWssIHdlZWtkYXksIGRvdywgZG95KTtcclxuICAgIGNvbmZpZy5fYVtZRUFSXSA9IHRlbXAueWVhcjtcclxuICAgIGNvbmZpZy5fZGF5T2ZZZWFyID0gdGVtcC5kYXlPZlllYXI7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gY29uZmlnO1xyXG59XHJcbiJdfQ==