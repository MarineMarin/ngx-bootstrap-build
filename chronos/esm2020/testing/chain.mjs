import { add, subtract } from '../index';
import { getDate, getFullYear, getHours, getMilliseconds, getMinutes, getMonth, getSeconds } from '../utils/date-getters';
import { setDate, setFullYear, setHours, setMilliseconds, setMinutes, setMonth, setSeconds } from '../utils/date-setters';
import { cloneDate } from '../create/clone';
import { isArray, isBoolean, isDate, isDateValid, isFunction, isNumber, isObject, isString, isUndefined } from '../utils/type-checks';
import { formatDate } from '../format';
import { ISO_8601, RFC_2822 } from '../create/from-string-and-format';
import { getDateOffset, getUTCOffset, hasAlignedHourOffset, isDaylightSavingTime, setOffsetToParsedOffset, setUTCOffset } from '../units/offset';
import { isLeapYear, parseTwoDigitYear } from '../units/year';
import { isAfter, isBefore, isBetween, isSame, isSameOrAfter, isSameOrBefore } from '../utils/date-compare';
import { daysInMonth } from '../units/month';
import { getDayOfWeek, getISODayOfWeek, getLocaleDayOfWeek, parseWeekday, setDayOfWeek, setISODayOfWeek, setLocaleDayOfWeek } from '../units/day-of-week';
import { getISOWeek, getWeek, setISOWeek, setWeek } from '../units/week';
import { getISOWeeksInYear, getISOWeekYear, getSetISOWeekYear, getSetWeekYear, getWeeksInYear, getWeekYear } from '../units/week-year';
import { endOf, startOf } from '../utils/start-end-of';
import { getQuarter, setQuarter } from '../units/quarter';
import { getDayOfYear, setDayOfYear } from '../units/day-of-year';
import { getZoneAbbr, getZoneName } from '../units/timezone';
import { diff } from '../moment/diff';
import { calendar } from '../moment/calendar';
import { defineLocale, getLocale, getSetGlobalLocale, listLocales } from '../locale/locales';
import { max, min } from '../moment/min-max';
import { isDuration } from '../duration/constructor';
import { createLocalOrUTC } from '../create/from-anything';
import { createDuration } from '../duration/create';
export const moment = _moment;
function _moment(input, format, localeKey, strict, isUTC) {
    if (input instanceof Khronos) {
        const _date = input.clone();
        return isUTC ? _date.utc() : _date;
    }
    if (isBoolean(localeKey)) {
        return new Khronos(input, format, null, localeKey, isUTC);
    }
    return new Khronos(input, format, localeKey, strict, isUTC);
}
moment.utc = (input, format, localeKey, strict) => {
    return _moment(input, format, localeKey, strict, true);
};
moment.parseZone = (input, format, localeKey, strict) => {
    return _moment(input, format, localeKey, strict, true).parseZone();
};
moment.locale = getSetGlobalLocale;
moment.localeData = (key) => {
    if (key instanceof Khronos) {
        return key.localeData();
    }
    return getLocale(key);
};
// moment.utc = createUTC;
moment.unix = (inp) => new Khronos(inp * 1000);
moment.ISO_8601 = ISO_8601;
moment.RFC_2822 = RFC_2822;
moment.defineLocale = defineLocale;
moment.parseTwoDigitYear = parseTwoDigitYear;
moment.isDate = isDate;
moment.invalid = function _invalid() {
    return new Khronos(new Date(NaN));
};
// duration(inp?: Duration | DateInput | Khronos, unit?: MomentUnitOfTime): Duration;
moment.duration = (input, unit) => {
    const _unit = mapUnitOfTime(unit);
    if (isDate(input)) {
        throw new Error('todo implement');
    }
    if (input == null) {
        return createDuration();
    }
    if (isDuration(input)) {
        return createDuration(input, _unit, { _locale: input._locale });
    }
    if (isString(input) || isNumber(input) || isDuration(input) || isObject(input)) {
        return createDuration(input, _unit);
    }
    throw new Error('todo implement');
};
moment.min = function _min(...dates) {
    const _firstArg = dates[0];
    const _dates = (isArray(_firstArg) ? _firstArg : dates)
        .map((date) => _moment(date))
        .map(date => date.toDate());
    const _date = min(..._dates);
    return new Khronos(_date);
};
moment.max = function _max(...dates) {
    const _firstArg = dates[0];
    const _dates = (isArray(_firstArg) ? _firstArg : dates)
        .map((date) => _moment(date))
        .map(date => date.toDate());
    const _date = max(..._dates);
    return new Khronos(_date);
};
moment.locales = () => {
    return listLocales();
};
const _unitsPriority = {
    year: 1,
    month: 8,
    week: 5,
    isoWeek: 5,
    day: 11,
    weekday: 11,
    isoWeekday: 11,
    hours: 13,
    weekYear: 1,
    isoWeekYear: 1,
    quarter: 7,
    date: 9,
    dayOfYear: 4,
    minutes: 14,
    seconds: 15,
    milliseconds: 16
};
// todo: do I need 2 mappers?
const _timeHashMap = {
    y: 'year',
    years: 'year',
    year: 'year',
    M: 'month',
    months: 'month',
    month: 'month',
    w: 'week',
    weeks: 'week',
    week: 'week',
    d: 'day',
    days: 'day',
    day: 'day',
    date: 'date',
    dates: 'date',
    D: 'date',
    h: 'hours',
    hour: 'hours',
    hours: 'hours',
    m: 'minutes',
    minute: 'minutes',
    minutes: 'minutes',
    s: 'seconds',
    second: 'seconds',
    seconds: 'seconds',
    ms: 'milliseconds',
    millisecond: 'milliseconds',
    milliseconds: 'milliseconds',
    quarter: 'quarter',
    quarters: 'quarter',
    q: 'quarter',
    Q: 'quarter',
    isoWeek: 'isoWeek',
    isoWeeks: 'isoWeek',
    W: 'isoWeek',
    weekYear: 'weekYear',
    weekYears: 'weekYear',
    gg: 'weekYears',
    isoWeekYear: 'isoWeekYear',
    isoWeekYears: 'isoWeekYear',
    GG: 'isoWeekYear',
    dayOfYear: 'dayOfYear',
    dayOfYears: 'dayOfYear',
    DDD: 'dayOfYear',
    weekday: 'weekday',
    weekdays: 'weekday',
    e: 'weekday',
    isoWeekday: 'isoWeekday',
    isoWeekdays: 'isoWeekday',
    E: 'isoWeekday'
};
function mapUnitOfTime(period) {
    return _timeHashMap[period];
}
function mapMomentInputObject(obj) {
    const _res = {};
    return Object.keys(obj)
        .reduce((res, key) => {
        res[mapUnitOfTime(key)] = obj[key];
        return res;
    }, _res);
}
export class Khronos {
    constructor(input, format, localeKey, strict = false, isUTC = false, offset) {
        this._date = new Date();
        this._isUTC = false;
        // locale will be needed to format invalid date message
        this._locale = getLocale(localeKey);
        // parse invalid input
        if (input === '' || input === null || (isNumber(input) && isNaN(input))) {
            this._date = new Date(NaN);
            return this;
        }
        this._isUTC = isUTC;
        if (this._isUTC) {
            this._offset = 0;
        }
        if (offset || offset === 0) {
            this._offset = offset;
        }
        this._isStrict = strict;
        this._format = format;
        if (!input && input !== 0 && !format) {
            this._date = new Date();
            return this;
        }
        if (isDate(input)) {
            this._date = cloneDate(input);
            return this;
        }
        // this._date = parseDate(input, format, localeKey, strict, isUTC);
        const config = createLocalOrUTC(input, format, localeKey, strict, isUTC);
        this._date = config._d;
        this._offset = isNumber(config._offset) ? config._offset : this._offset;
        this._isUTC = config._isUTC;
        this._isStrict = config._strict;
        this._format = config._f;
        this._tzm = config._tzm;
    }
    _toConfig() {
        return { _isUTC: this._isUTC, _locale: this._locale, _offset: this._offset, _tzm: this._tzm };
    }
    locale(localeKey) {
        if (isUndefined(localeKey)) {
            return this._locale._abbr;
        }
        if (localeKey instanceof Khronos) {
            this._locale = localeKey._locale;
            return this;
        }
        const newLocaleData = getLocale(localeKey);
        if (newLocaleData != null) {
            this._locale = newLocaleData;
        }
        return this;
    }
    localeData() {
        return this._locale;
    }
    // Basic
    add(val, period) {
        if (isString(val)) {
            this._date = add(this._date, parseInt(val, 10), mapUnitOfTime(period));
        }
        if (isNumber(val)) {
            this._date = add(this._date, val, mapUnitOfTime(period));
        }
        if (isObject(val)) {
            const _mapped = mapMomentInputObject(val);
            Object.keys(_mapped)
                .forEach((key) => add(this._date, _mapped[key], key));
        }
        return this;
    }
    // fixme: for some reason here 'null' for time is fine
    calendar(time, formats) {
        const _time = time instanceof Khronos ? time : new Khronos(time || new Date());
        const _offset = (this._offset || 0) - (_time._offset || 0);
        const _config = Object.assign(this._toConfig(), { _offset });
        return calendar(this._date, _time._date, formats, this._locale, _config);
    }
    clone() {
        const localeKey = this._locale && this._locale._abbr || 'en';
        // return new Khronos(cloneDate(this._date), this._format, localeKey, this._isStrict, this._isUTC);
        // fails if isUTC and offset
        // return new Khronos(new Date(this.valueOf()),
        return new Khronos(this._date, this._format, localeKey, this._isStrict, this._isUTC, this._offset);
    }
    diff(b, unitOfTime, precise) {
        const unit = mapUnitOfTime(unitOfTime);
        const _b = b instanceof Khronos ? b : new Khronos(b);
        // const zoneDelta = (_b.utcOffset() - this.utcOffset());
        // const config = Object.assign(this._toConfig(), {
        //   _offset: 0,
        //   _isUTC: true,
        //   _zoneDelta: zoneDelta
        // });
        // return diff(new Date(this.valueOf()), new Date(_b.valueOf()), unit, precise, config);
        return diff(this._date, _b.toDate(), unit, precise, this._toConfig());
    }
    endOf(period) {
        const _per = mapUnitOfTime(period);
        this._date = endOf(this._date, _per, this._isUTC);
        return this;
    }
    format(format) {
        return formatDate(this._date, format, this._locale && this._locale._abbr, this._isUTC, this._offset);
    }
    // todo: implement
    from(time, withoutSuffix) {
        const _time = _moment(time);
        if (this.isValid() && _time.isValid()) {
            return createDuration({ to: this.toDate(), from: _time.toDate() })
                .locale(this.locale())
                .humanize(!withoutSuffix);
        }
        return this.localeData().invalidDate;
    }
    fromNow(withoutSuffix) {
        return this.from(new Date(), withoutSuffix);
    }
    to(inp, suffix) {
        throw new Error(`TODO: Implement`);
    }
    toNow(withoutPrefix) {
        throw new Error(`TODO: Implement`);
    }
    subtract(val, period) {
        if (isString(val)) {
            this._date = subtract(this._date, parseInt(val, 10), mapUnitOfTime(period));
            return this;
        }
        if (isNumber(val)) {
            this._date = subtract(this._date, val, mapUnitOfTime(period));
        }
        if (isObject(val)) {
            const _mapped = mapMomentInputObject(val);
            Object.keys(_mapped)
                .forEach((key) => subtract(this._date, _mapped[key], key));
        }
        return this;
    }
    get(period) {
        if (period === 'dayOfYear') {
            return this.dayOfYear();
        }
        const unit = mapUnitOfTime(period);
        switch (unit) {
            case 'year':
                return this.year();
            case 'month':
                return this.month();
            // | 'week'
            case 'date':
                return this.date();
            case 'day':
                return this.day();
            case 'hours':
                return this.hours();
            case 'minutes':
                return this.minutes();
            case 'seconds':
                return this.seconds();
            case 'milliseconds':
                return this.milliseconds();
            case 'week':
                return this.week();
            case 'isoWeek':
                return this.isoWeek();
            case 'weekYear':
                return this.weekYear();
            case 'isoWeekYear':
                return this.isoWeekYear();
            case 'weekday':
                return this.weekday();
            case 'isoWeekday':
                return this.isoWeekday();
            case 'quarter':
                return this.quarter();
            default:
                throw new Error(`Unknown moment.get('${period}')`);
        }
    }
    set(period, input) {
        if (isString(period)) {
            const unit = mapUnitOfTime(period);
            switch (unit) {
                case 'year':
                    return this.year(input);
                case 'month':
                    return this.month(input);
                // | 'week'
                case 'day':
                    return this.day(input);
                case 'date':
                    return this.date(input);
                case 'hours':
                    return this.hours(input);
                case 'minutes':
                    return this.minutes(input);
                case 'seconds':
                    return this.seconds(input);
                case 'milliseconds':
                    return this.milliseconds(input);
                case 'week':
                    return this.week(input);
                case 'isoWeek':
                    return this.isoWeek(input);
                case 'weekYear':
                    return this.weekYear(input);
                case 'isoWeekYear':
                    return this.isoWeekYear(input);
                case 'weekday':
                    return this.weekday(input);
                case 'isoWeekday':
                    return this.isoWeekday(input);
                case 'quarter':
                    return this.quarter(input);
                default:
                    throw new Error(`Unknown moment.get('${period}')`);
            }
        }
        if (isObject(period)) {
            const _mapped = mapMomentInputObject(period);
            Object.keys(_mapped)
                .sort(function (a, b) {
                return _unitsPriority[a] - _unitsPriority[b];
            })
                .forEach((key) => this.set(key, _mapped[key]));
        }
        return this;
    }
    toString() {
        return this.format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
    }
    toISOString() {
        if (!this.isValid()) {
            return null;
        }
        if (getFullYear(this._date, true) < 0 || getFullYear(this._date, true) > 9999) {
            return this.format('YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
        }
        if (isFunction(Date.prototype.toISOString)) {
            // native implementation is ~50x faster, use it when we can
            return this.toDate().toISOString();
        }
        return this.format('YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
    }
    inspect() {
        throw new Error('TODO: implement');
    }
    toJSON() {
        return this.toISOString();
    }
    toDate() {
        return new Date(this.valueOf());
    }
    toObject() {
        return {
            // years: getFullYear(this._date, this._isUTC),
            // months: getMonth(this._date, this._isUTC),
            year: getFullYear(this._date, this._isUTC),
            month: getMonth(this._date, this._isUTC),
            date: getDate(this._date, this._isUTC),
            hours: getHours(this._date, this._isUTC),
            minutes: getMinutes(this._date, this._isUTC),
            seconds: getSeconds(this._date, this._isUTC),
            milliseconds: getMilliseconds(this._date, this._isUTC)
        };
    }
    toArray() {
        return [this.year(), this.month(), this.date(), this.hour(), this.minute(), this.second(), this.millisecond()];
    }
    // Dates boolean algebra
    isAfter(date, unit) {
        const _unit = unit ? mapUnitOfTime(unit) : void 0;
        return isAfter(this._date, date.toDate(), _unit);
    }
    isBefore(date, unit) {
        const _unit = unit ? mapUnitOfTime(unit) : void 0;
        return isBefore(this.toDate(), date.toDate(), _unit);
    }
    isBetween(from, to, unit, inclusivity) {
        const _unit = unit ? mapUnitOfTime(unit) : void 0;
        return isBetween(this.toDate(), from.toDate(), to.toDate(), _unit, inclusivity);
    }
    isSame(date, unit) {
        const _unit = unit ? mapUnitOfTime(unit) : void 0;
        return isSame(this._date, date.toDate(), _unit);
    }
    isSameOrAfter(date, unit) {
        const _unit = unit ? mapUnitOfTime(unit) : void 0;
        return isSameOrAfter(this._date, date.toDate(), _unit);
    }
    isSameOrBefore(date, unit) {
        const _unit = unit ? mapUnitOfTime(unit) : void 0;
        return isSameOrBefore(this._date, date.toDate(), _unit);
    }
    isValid() {
        return isDateValid(this._date);
    }
    valueOf() {
        return this._date.valueOf() - ((this._offset || 0) * 60000);
    }
    unix() {
        // return getUnixTime(this._date);
        return Math.floor(this.valueOf() / 1000);
    }
    utcOffset(b, keepLocalTime) {
        const _config = this._toConfig();
        if (!b && b !== 0) {
            return getUTCOffset(this._date, _config);
        }
        this._date = setUTCOffset(this._date, b, keepLocalTime, false, _config);
        this._offset = _config._offset;
        this._isUTC = _config._isUTC;
        return this;
    }
    utc(keepLocalTime) {
        return this.utcOffset(0, keepLocalTime);
    }
    local(keepLocalTime) {
        if (this._isUTC) {
            this.utcOffset(0, keepLocalTime);
            this._isUTC = false;
            if (keepLocalTime) {
                this.subtract(getDateOffset(this._date), 'm');
            }
        }
        return this;
    }
    parseZone(input) {
        const _config = this._toConfig();
        this._date = setOffsetToParsedOffset(this._date, input, _config);
        this._offset = _config._offset;
        this._isUTC = _config._isUTC;
        return this;
    }
    hasAlignedHourOffset(input) {
        return hasAlignedHourOffset(this._date, input ? input._date : void 0);
    }
    isDST() {
        return isDaylightSavingTime(this._date);
    }
    isLocal() {
        return !this._isUTC;
    }
    isUtcOffset() {
        return this._isUTC;
    }
    isUTC() {
        return this.isUtc();
    }
    isUtc() {
        return this._isUTC && this._offset === 0;
    }
    // Timezone
    zoneAbbr() {
        return getZoneAbbr(this._isUTC);
    }
    zoneName() {
        return getZoneName(this._isUTC);
    }
    year(year) {
        if (!year && year !== 0) {
            return getFullYear(this._date, this._isUTC);
        }
        this._date = cloneDate(setFullYear(this._date, year));
        return this;
    }
    weekYear(val) {
        if (!val && val !== 0) {
            return getWeekYear(this._date, this._locale, this.isUTC());
        }
        const date = getSetWeekYear(this._date, val, this._locale, this.isUTC());
        if (isDate(date)) {
            this._date = date;
        }
        return this;
    }
    isoWeekYear(val) {
        if (!val && val !== 0) {
            return getISOWeekYear(this._date, this.isUTC());
        }
        const date = getSetISOWeekYear(this._date, val, this.isUtc());
        if (isDate(date)) {
            this._date = date;
        }
        return this;
    }
    isLeapYear() {
        return isLeapYear(getFullYear(this.toDate(), this.isUTC()));
    }
    month(month) {
        if (!month && month !== 0) {
            return getMonth(this._date, this._isUTC);
        }
        let _month = month;
        if (isString(month)) {
            const locale = this._locale || getLocale();
            _month = locale.monthsParse(month);
        }
        if (isNumber(_month)) {
            this._date = cloneDate(setMonth(this._date, _month, this._isUTC));
        }
        return this;
    }
    hour(hours) {
        return this.hours(hours);
    }
    hours(hours) {
        if (!hours && hours !== 0) {
            return getHours(this._date, this._isUTC);
        }
        this._date = cloneDate(setHours(this._date, hours, this._isUTC));
        return this;
    }
    minute(minutes) {
        return this.minutes(minutes);
    }
    minutes(minutes) {
        if (!minutes && minutes !== 0) {
            return getMinutes(this._date, this._isUTC);
        }
        this._date = cloneDate(setMinutes(this._date, minutes, this._isUTC));
        return this;
    }
    second(seconds) {
        return this.seconds(seconds);
    }
    seconds(seconds) {
        if (!seconds && seconds !== 0) {
            return getSeconds(this._date, this._isUTC);
        }
        this._date = cloneDate(setSeconds(this._date, seconds, this._isUTC));
        return this;
    }
    millisecond(ms) {
        return this.milliseconds(ms);
    }
    milliseconds(seconds) {
        if (!seconds && seconds !== 0) {
            return getMilliseconds(this._date, this._isUTC);
        }
        this._date = cloneDate(setMilliseconds(this._date, seconds, this._isUTC));
        return this;
    }
    date(date) {
        if (!date && date !== 0) {
            return getDate(this._date, this._isUTC);
        }
        this._date = cloneDate(setDate(this._date, date, this._isUTC));
        return this;
    }
    day(input) {
        if (!input && input !== 0) {
            return getDayOfWeek(this._date, this._isUTC);
        }
        let _input = input;
        if (isString(input)) {
            _input = parseWeekday(input, this._locale);
        }
        if (isNumber(_input)) {
            this._date = setDayOfWeek(this._date, _input, this._locale, this._isUTC);
        }
        return this;
    }
    weekday(val) {
        if (!val && val !== 0) {
            return getLocaleDayOfWeek(this._date, this._locale, this._isUTC);
        }
        this._date = setLocaleDayOfWeek(this._date, val, { locale: this._locale, isUTC: this._isUTC });
        return this;
    }
    isoWeekday(val) {
        if (!val && val !== 0) {
            return getISODayOfWeek(this._date);
        }
        this._date = setISODayOfWeek(this._date, val);
        return this;
    }
    dayOfYear(val) {
        if (!val && val !== 0) {
            return getDayOfYear(this._date);
        }
        this._date = setDayOfYear(this._date, val);
        return this;
    }
    week(input) {
        if (!input && input !== 0) {
            return getWeek(this._date, this._locale);
        }
        this._date = setWeek(this._date, input, this._locale);
        return this;
    }
    weeks(input) {
        return this.week(input);
    }
    isoWeek(val) {
        if (!val && val !== 0) {
            return getISOWeek(this._date);
        }
        this._date = setISOWeek(this._date, val);
        return this;
    }
    isoWeeks(val) {
        return this.isoWeek(val);
    }
    weeksInYear() {
        return getWeeksInYear(this._date, this._isUTC, this._locale);
    }
    isoWeeksInYear() {
        return getISOWeeksInYear(this._date, this._isUTC);
    }
    daysInMonth() {
        return daysInMonth(getFullYear(this._date, this._isUTC), getMonth(this._date, this._isUTC));
    }
    quarter(val) {
        if (!val && val !== 0) {
            return getQuarter(this._date, this._isUTC);
        }
        this._date = setQuarter(this._date, val, this._isUTC);
        return this;
    }
    quarters(val) {
        return this.quarter(val);
    }
    startOf(period) {
        const _per = mapUnitOfTime(period);
        this._date = startOf(this._date, _per, this._isUTC);
        return this;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhaW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvY2hyb25vcy90ZXN0aW5nL2NoYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxHQUFHLEVBQWEsUUFBUSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBRXBELE9BQU8sRUFDTCxPQUFPLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxlQUFlLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBRWxGLE1BQU0sdUJBQXVCLENBQUM7QUFDL0IsT0FBTyxFQUNMLE9BQU8sRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLGVBQWUsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUNyRSxVQUFVLEVBQ1gsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDNUMsT0FBTyxFQUNMLE9BQU8sRUFDUCxTQUFTLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQ3hFLFdBQVcsRUFDWixNQUFNLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDdkMsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUV0RSxPQUFPLEVBQ0wsYUFBYSxFQUNiLFlBQVksRUFBRSxvQkFBb0IsRUFBRSxvQkFBb0IsRUFBRSx1QkFBdUIsRUFDakYsWUFBWSxFQUNiLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFFLFVBQVUsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxjQUFjLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RyxP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RCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7Q0FFRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGFkZCwgcGFyc2VEYXRlLCBzdWJ0cmFjdCB9IGZyb20gJy4uL2luZGV4JztcclxuaW1wb3J0IHsgRGF0ZUFycmF5LCBEYXRlT2JqZWN0LCBVbml0T2ZUaW1lIH0gZnJvbSAnLi4vdHlwZXMnO1xyXG5pbXBvcnQge1xyXG4gIGdldERhdGUsIGdldEZ1bGxZZWFyLCBnZXRIb3VycywgZ2V0TWlsbGlzZWNvbmRzLCBnZXRNaW51dGVzLCBnZXRNb250aCwgZ2V0U2Vjb25kcyxcclxuICBnZXRVbml4VGltZVxyXG59IGZyb20gJy4uL3V0aWxzL2RhdGUtZ2V0dGVycyc7XHJcbmltcG9ydCB7XHJcbiAgc2V0RGF0ZSwgc2V0RnVsbFllYXIsIHNldEhvdXJzLCBzZXRNaWxsaXNlY29uZHMsIHNldE1pbnV0ZXMsIHNldE1vbnRoLFxyXG4gIHNldFNlY29uZHNcclxufSBmcm9tICcuLi91dGlscy9kYXRlLXNldHRlcnMnO1xyXG5pbXBvcnQgeyBjbG9uZURhdGUgfSBmcm9tICcuLi9jcmVhdGUvY2xvbmUnO1xyXG5pbXBvcnQge1xyXG4gIGlzQXJyYXksXHJcbiAgaXNCb29sZWFuLCBpc0RhdGUsIGlzRGF0ZVZhbGlkLCBpc0Z1bmN0aW9uLCBpc051bWJlciwgaXNPYmplY3QsIGlzU3RyaW5nLFxyXG4gIGlzVW5kZWZpbmVkXHJcbn0gZnJvbSAnLi4vdXRpbHMvdHlwZS1jaGVja3MnO1xyXG5pbXBvcnQgeyBmb3JtYXREYXRlIH0gZnJvbSAnLi4vZm9ybWF0JztcclxuaW1wb3J0IHsgSVNPXzg2MDEsIFJGQ18yODIyIH0gZnJvbSAnLi4vY3JlYXRlL2Zyb20tc3RyaW5nLWFuZC1mb3JtYXQnO1xyXG5pbXBvcnQgeyBMb2NhbGUsIExvY2FsZURhdGEgfSBmcm9tICcuLi9sb2NhbGUvbG9jYWxlLmNsYXNzJztcclxuaW1wb3J0IHtcclxuICBnZXREYXRlT2Zmc2V0LFxyXG4gIGdldFVUQ09mZnNldCwgaGFzQWxpZ25lZEhvdXJPZmZzZXQsIGlzRGF5bGlnaHRTYXZpbmdUaW1lLCBzZXRPZmZzZXRUb1BhcnNlZE9mZnNldCxcclxuICBzZXRVVENPZmZzZXRcclxufSBmcm9tICcuLi91bml0cy9vZmZzZXQnO1xyXG5pbXBvcnQgeyBpc0xlYXBZZWFyLCBwYXJzZVR3b0RpZ2l0WWVhciB9IGZyb20gJy4uL3VuaXRzL3llYXInO1xyXG5pbXBvcnQgeyBpc0FmdGVyLCBpc0JlZm9yZSwgaXNCZXR3ZWVuLCBpc1NhbWUsIGlzU2FtZU9yQWZ0ZXIsIGlzU2FtZU9yQmVmb3JlIH0gZnJvbSAnLi4vdXRpbHMvZGF0ZS1jb21wYXJlJztcclxuaW1wb3J0IHsgZGF5c0luTW9udGggfSBmcm9tICcuLi91bml0cy9tb250aCc7XHJcbmltcG9ydCB7XHJcbiAgZ2V0RGF5T2ZXZWVrLCBnZXRJU09EYXlPZldlZWssIGdldExvY2FsZURheU9mV2VlaywgcGFyc2VXZWVrZGF5LCBzZXREYXlPZldlZWssIHNldElTT0RheU9mV2VlayxcclxuICBzZXRMb2NhbGVEYXlPZldlZWtcclxufSBmcm9tICcuLi91bml0cy9kYXktb2Ytd2Vlayc7XHJcbmltcG9ydCB7IGdldElTT1dlZWssIGdldFdlZWssIHNldElTT1dlZWssIHNldFdlZWsgfSBmcm9tICcuLi91bml0cy93ZWVrJztcclxuaW1wb3J0IHtcclxuICBnZXRJU09XZWVrc0luWWVhciwgZ2V0SVNPV2Vla1llYXIsIGdldFNldElTT1dlZWtZZWFyLCBnZXRTZXRXZWVrWWVhciwgZ2V0V2Vla3NJblllYXIsXHJcbiAgZ2V0V2Vla1llYXJcclxufSBmcm9tICcuLi91bml0cy93ZWVrLXllYXInO1xyXG5pbXBvcnQgeyBlbmRPZiwgc3RhcnRPZiB9IGZyb20gJy4uL3V0aWxzL3N0YXJ0LWVuZC1vZic7XHJcbmltcG9ydCB7IGdldFF1YXJ0ZXIsIHNldFF1YXJ0ZXIgfSBmcm9tICcuLi91bml0cy9xdWFydGVyJztcclxuaW1wb3J0IHsgZ2V0RGF5T2ZZZWFyLCBzZXREYXlPZlllYXIgfSBmcm9tICcuLi91bml0cy9kYXktb2YteWVhcic7XHJcbmltcG9ydCB7IGdldFpvbmVBYmJyLCBnZXRab25lTmFtZSB9IGZyb20gJy4uL3VuaXRzL3RpbWV6b25lJztcclxuaW1wb3J0IHsgZGlmZiB9IGZyb20gJy4uL21vbWVudC9kaWZmJztcclxuaW1wb3J0IHsgRGF0ZVBhcnNpbmdDb25maWcgfSBmcm9tICcuLi9jcmVhdGUvcGFyc2luZy50eXBlcyc7XHJcbmltcG9ydCB7IGNhbGVuZGFyLCBDYWxlbmRhclNwZWMgfSBmcm9tICcuLi9tb21lbnQvY2FsZW5kYXInO1xyXG5pbXBvcnQgeyBkZWZpbmVMb2NhbGUsIGdldExvY2FsZSwgZ2V0U2V0R2xvYmFsTG9jYWxlLCBsaXN0TG9jYWxlcyB9IGZyb20gJy4uL2xvY2FsZS9sb2NhbGVzJztcclxuaW1wb3J0IHsgbWF4LCBtaW4gfSBmcm9tICcuLi9tb21lbnQvbWluLW1heCc7XHJcbmltcG9ydCB7IER1cmF0aW9uLCBpc0R1cmF0aW9uIH0gZnJvbSAnLi4vZHVyYXRpb24vY29uc3RydWN0b3InO1xyXG5pbXBvcnQgeyBjcmVhdGVMb2NhbE9yVVRDIH0gZnJvbSAnLi4vY3JlYXRlL2Zyb20tYW55dGhpbmcnO1xyXG5pbXBvcnQgeyBjcmVhdGVEdXJhdGlvbiB9IGZyb20gJy4uL2R1cmF0aW9uL2NyZWF0ZSc7XHJcblxyXG5leHBvcnQgdHlwZSBEYXRlSW5wdXQgPSBzdHJpbmcgfCBudW1iZXIgfCBEYXRlIHwgc3RyaW5nW10gfCBEYXRlQXJyYXkgfCBNb21lbnRJbnB1dE9iamVjdDtcclxuXHJcbmV4cG9ydCBjb25zdCBtb21lbnQ6IE1vbWVudEZuID0gKF9tb21lbnQgYXMgTW9tZW50Rm4pO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBNb21lbnRGbiB7XHJcbiAgKGlucHV0PzogRGF0ZUlucHV0IHwgS2hyb25vcywgZm9ybWF0Pzogc3RyaW5nIHwgc3RyaW5nW10sIGxvY2FsZUtleT86IHN0cmluZyB8IGJvb2xlYW4sIHN0cmljdD86IGJvb2xlYW4sIGlzVVRDPzogYm9vbGVhbik6IEtocm9ub3M7XHJcblxyXG4gIElTT184NjAxOiBzdHJpbmc7XHJcbiAgUkZDXzI4MjI6IHN0cmluZztcclxuXHJcbiAgdXRjKGlucHV0PzogRGF0ZUlucHV0IHwgS2hyb25vcywgZm9ybWF0Pzogc3RyaW5nIHwgc3RyaW5nW10sIGxvY2FsZUtleT86IHN0cmluZyB8IGJvb2xlYW4sIHN0cmljdD86IGJvb2xlYW4pOiBLaHJvbm9zO1xyXG5cclxuICBwYXJzZVpvbmUoaW5wdXQ/OiBEYXRlSW5wdXQgfCBLaHJvbm9zLCBmb3JtYXQ/OiBzdHJpbmcgfCBzdHJpbmdbXSwgbG9jYWxlS2V5Pzogc3RyaW5nIHwgYm9vbGVhbiwgc3RyaWN0PzogYm9vbGVhbik6IEtocm9ub3M7XHJcblxyXG4gIHVuaXgobnVtOiBudW1iZXIpOiBLaHJvbm9zO1xyXG5cclxuICBsb2NhbGUoa2V5Pzogc3RyaW5nIHwgc3RyaW5nW10sIHZhbHVlcz86IExvY2FsZURhdGEpOiBzdHJpbmc7XHJcblxyXG4gIGR1cmF0aW9uKGlucD86IER1cmF0aW9uIHwgRGF0ZUlucHV0IHwgS2hyb25vcywgdW5pdD86IE1vbWVudFVuaXRPZlRpbWUpOiBEdXJhdGlvbjtcclxuXHJcbiAgZGVmaW5lTG9jYWxlKG5hbWU6IHN0cmluZywgY29uZmlnPzogTG9jYWxlRGF0YSk6IExvY2FsZTtcclxuXHJcbiAgcGFyc2VUd29EaWdpdFllYXIoaW5wdXQ6IHN0cmluZyk6IG51bWJlcjtcclxuXHJcbiAgaXNEYXRlKGlucHV0PzogYW55KTogaW5wdXQgaXMgRGF0ZTtcclxuXHJcbiAgbW9udGhzKCk6IHN0cmluZ1tdO1xyXG5cclxuICBtb250aHMoaW5kZXg6IG51bWJlcik6IHN0cmluZztcclxuXHJcbiAgbW9udGhzKGZvcm1hdDogc3RyaW5nKTogc3RyaW5nW107XHJcblxyXG4gIG1vbnRocyhmb3JtYXQ6IHN0cmluZywgaW5kZXg6IG51bWJlcik6IHN0cmluZztcclxuXHJcbiAgbW9udGhzU2hvcnQoKTogc3RyaW5nW107XHJcblxyXG4gIG1vbnRoc1Nob3J0KGluZGV4OiBudW1iZXIpOiBzdHJpbmc7XHJcblxyXG4gIG1vbnRoc1Nob3J0KGZvcm1hdDogc3RyaW5nKTogc3RyaW5nW107XHJcblxyXG4gIG1vbnRoc1Nob3J0KGZvcm1hdDogc3RyaW5nLCBpbmRleDogbnVtYmVyKTogc3RyaW5nO1xyXG5cclxuICB3ZWVrZGF5cygpOiBzdHJpbmdbXTtcclxuXHJcbiAgd2Vla2RheXMoaW5kZXg6IG51bWJlcik6IHN0cmluZztcclxuXHJcbiAgd2Vla2RheXMoZm9ybWF0OiBzdHJpbmcpOiBzdHJpbmdbXTtcclxuXHJcbiAgd2Vla2RheXMoZm9ybWF0OiBzdHJpbmcsIGluZGV4OiBudW1iZXIpOiBzdHJpbmc7XHJcblxyXG4gIHdlZWtkYXlzKGxvY2FsZVNvcnRlZDogYm9vbGVhbik6IHN0cmluZ1tdO1xyXG5cclxuICB3ZWVrZGF5cyhsb2NhbGVTb3J0ZWQ6IGJvb2xlYW4sIGluZGV4OiBudW1iZXIpOiBzdHJpbmc7XHJcblxyXG4gIHdlZWtkYXlzKGxvY2FsZVNvcnRlZDogYm9vbGVhbiwgZm9ybWF0OiBzdHJpbmcpOiBzdHJpbmdbXTtcclxuXHJcbiAgd2Vla2RheXMobG9jYWxlU29ydGVkOiBib29sZWFuLCBmb3JtYXQ6IHN0cmluZywgaW5kZXg6IG51bWJlcik6IHN0cmluZztcclxuXHJcbiAgd2Vla2RheXNTaG9ydCgpOiBzdHJpbmdbXTtcclxuXHJcbiAgd2Vla2RheXNTaG9ydChpbmRleDogbnVtYmVyKTogc3RyaW5nO1xyXG5cclxuICB3ZWVrZGF5c1Nob3J0KGZvcm1hdDogc3RyaW5nKTogc3RyaW5nW107XHJcblxyXG4gIHdlZWtkYXlzU2hvcnQoZm9ybWF0OiBzdHJpbmcsIGluZGV4OiBudW1iZXIpOiBzdHJpbmc7XHJcblxyXG4gIHdlZWtkYXlzU2hvcnQobG9jYWxlU29ydGVkOiBib29sZWFuKTogc3RyaW5nW107XHJcblxyXG4gIHdlZWtkYXlzU2hvcnQobG9jYWxlU29ydGVkOiBib29sZWFuLCBpbmRleDogbnVtYmVyKTogc3RyaW5nO1xyXG5cclxuICB3ZWVrZGF5c1Nob3J0KGxvY2FsZVNvcnRlZDogYm9vbGVhbiwgZm9ybWF0OiBzdHJpbmcpOiBzdHJpbmdbXTtcclxuXHJcbiAgd2Vla2RheXNTaG9ydChsb2NhbGVTb3J0ZWQ6IGJvb2xlYW4sIGZvcm1hdDogc3RyaW5nLCBpbmRleDogbnVtYmVyKTogc3RyaW5nO1xyXG5cclxuICB3ZWVrZGF5c01pbigpOiBzdHJpbmdbXTtcclxuXHJcbiAgd2Vla2RheXNNaW4oaW5kZXg6IG51bWJlcik6IHN0cmluZztcclxuXHJcbiAgd2Vla2RheXNNaW4oZm9ybWF0OiBzdHJpbmcpOiBzdHJpbmdbXTtcclxuXHJcbiAgd2Vla2RheXNNaW4oZm9ybWF0OiBzdHJpbmcsIGluZGV4OiBudW1iZXIpOiBzdHJpbmc7XHJcblxyXG4gIHdlZWtkYXlzTWluKGxvY2FsZVNvcnRlZDogYm9vbGVhbik6IHN0cmluZ1tdO1xyXG5cclxuICB3ZWVrZGF5c01pbihsb2NhbGVTb3J0ZWQ6IGJvb2xlYW4sIGluZGV4OiBudW1iZXIpOiBzdHJpbmc7XHJcblxyXG4gIHdlZWtkYXlzTWluKGxvY2FsZVNvcnRlZDogYm9vbGVhbiwgZm9ybWF0OiBzdHJpbmcpOiBzdHJpbmdbXTtcclxuXHJcbiAgd2Vla2RheXNNaW4obG9jYWxlU29ydGVkOiBib29sZWFuLCBmb3JtYXQ6IHN0cmluZywgaW5kZXg6IG51bWJlcik6IHN0cmluZztcclxuXHJcbiAgcmVsYXRpdmVUaW1lVGhyZXNob2xkKHRocmVzaG9sZDogc3RyaW5nKTogbnVtYmVyIHwgYm9vbGVhbjtcclxuXHJcbiAgcmVsYXRpdmVUaW1lVGhyZXNob2xkKHRocmVzaG9sZDogc3RyaW5nLCBsaW1pdDogbnVtYmVyKTogYm9vbGVhbjtcclxuXHJcbiAgbWluKC4uLmRhdGVzOiAoKERhdGVJbnB1dCB8IEtocm9ub3MpW10gfCAoRGF0ZUlucHV0IHwgS2hyb25vcykpW10pOiBLaHJvbm9zO1xyXG5cclxuICBtYXgoLi4uZGF0ZXM6ICgoRGF0ZUlucHV0IHwgS2hyb25vcylbXSB8IChEYXRlSW5wdXQgfCBLaHJvbm9zKSlbXSk6IEtocm9ub3M7XHJcblxyXG4gIGxvY2FsZURhdGEoa2V5Pzogc3RyaW5nIHwgc3RyaW5nW10gfCBLaHJvbm9zKTogTG9jYWxlO1xyXG5cclxuICB1cGRhdGVMb2NhbGUobGFuZ3VhZ2U6IHN0cmluZywgbG9jYWxlU3BlYz86IExvY2FsZURhdGEpOiBMb2NhbGU7XHJcblxyXG4gIGNhbGVuZGFyRm9ybWF0KG06IERhdGUsIG5vdzogRGF0ZSk6IHN0cmluZztcclxuXHJcbiAgLy8gdG9kbzogcmVtb3ZlIHRoaXNcclxuICBjYWxlbmRhckZvcm1hdChtOiBLaHJvbm9zLCBub3c6IEtocm9ub3MpOiBzdHJpbmc7XHJcblxyXG4gIC8vIHRvZG86IGltcGxlbWVudFxyXG4gIGludmFsaWQoKTogS2hyb25vcztcclxuXHJcbiAgbG9jYWxlcygpOiBzdHJpbmdbXTtcclxuXHJcbiAgLy8gdG9kbzogaW1wbGVtZW50XHJcbiAgdXBkYXRlT2Zmc2V0KG06IEtocm9ub3MsIGtlZXBUaW1lPzogYm9vbGVhbik6IHZvaWQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIF9tb21lbnQoaW5wdXQ/OiBEYXRlSW5wdXQgfCBLaHJvbm9zLCBmb3JtYXQ/OiBzdHJpbmcgfCBzdHJpbmdbXSwgbG9jYWxlS2V5Pzogc3RyaW5nIHwgYm9vbGVhbiwgc3RyaWN0PzogYm9vbGVhbiwgaXNVVEM/OiBib29sZWFuKTogS2hyb25vcyB7XHJcbiAgaWYgKGlucHV0IGluc3RhbmNlb2YgS2hyb25vcykge1xyXG4gICAgY29uc3QgX2RhdGUgPSBpbnB1dC5jbG9uZSgpO1xyXG5cclxuICAgIHJldHVybiBpc1VUQyA/IF9kYXRlLnV0YygpIDogX2RhdGU7XHJcbiAgfVxyXG5cclxuICBpZiAoaXNCb29sZWFuKGxvY2FsZUtleSkpIHtcclxuICAgIHJldHVybiBuZXcgS2hyb25vcyhpbnB1dCwgZm9ybWF0LCBudWxsLCBsb2NhbGVLZXksIGlzVVRDKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBuZXcgS2hyb25vcyhpbnB1dCwgZm9ybWF0LCBsb2NhbGVLZXksIHN0cmljdCwgaXNVVEMpO1xyXG59XHJcblxyXG5tb21lbnQudXRjID0gKGlucHV0PzogRGF0ZUlucHV0IHwgS2hyb25vcywgZm9ybWF0Pzogc3RyaW5nLCBsb2NhbGVLZXk/OiBzdHJpbmcgfCBib29sZWFuLCBzdHJpY3Q/OiBib29sZWFuKTogS2hyb25vcyA9PiB7XHJcbiAgcmV0dXJuIF9tb21lbnQoaW5wdXQsIGZvcm1hdCwgbG9jYWxlS2V5LCBzdHJpY3QsIHRydWUpO1xyXG59O1xyXG5cclxubW9tZW50LnBhcnNlWm9uZSA9IChpbnB1dD86IERhdGVJbnB1dCB8IEtocm9ub3MsIGZvcm1hdD86IHN0cmluZywgbG9jYWxlS2V5Pzogc3RyaW5nIHwgYm9vbGVhbiwgc3RyaWN0PzogYm9vbGVhbik6IEtocm9ub3MgPT4ge1xyXG4gIHJldHVybiBfbW9tZW50KGlucHV0LCBmb3JtYXQsIGxvY2FsZUtleSwgc3RyaWN0LCB0cnVlKS5wYXJzZVpvbmUoKTtcclxufTtcclxuXHJcbm1vbWVudC5sb2NhbGUgPSBnZXRTZXRHbG9iYWxMb2NhbGU7XHJcbm1vbWVudC5sb2NhbGVEYXRhID0gKGtleT86IHN0cmluZyB8IHN0cmluZ1tdIHwgS2hyb25vcyk6IExvY2FsZSA9PiB7XHJcbiAgaWYgKGtleSBpbnN0YW5jZW9mIEtocm9ub3MpIHtcclxuICAgIHJldHVybiBrZXkubG9jYWxlRGF0YSgpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGdldExvY2FsZShrZXkpO1xyXG59O1xyXG5cclxuLy8gbW9tZW50LnV0YyA9IGNyZWF0ZVVUQztcclxubW9tZW50LnVuaXggPSAoaW5wOiBudW1iZXIpID0+IG5ldyBLaHJvbm9zKGlucCAqIDEwMDApO1xyXG5tb21lbnQuSVNPXzg2MDEgPSBJU09fODYwMTtcclxubW9tZW50LlJGQ18yODIyID0gUkZDXzI4MjI7XHJcbm1vbWVudC5kZWZpbmVMb2NhbGUgPSBkZWZpbmVMb2NhbGU7XHJcbm1vbWVudC5wYXJzZVR3b0RpZ2l0WWVhciA9IHBhcnNlVHdvRGlnaXRZZWFyO1xyXG5tb21lbnQuaXNEYXRlID0gaXNEYXRlO1xyXG5tb21lbnQuaW52YWxpZCA9IGZ1bmN0aW9uIF9pbnZhbGlkKCk6IEtocm9ub3Mge1xyXG4gIHJldHVybiBuZXcgS2hyb25vcyhuZXcgRGF0ZShOYU4pKTtcclxufTtcclxuXHJcbi8vIGR1cmF0aW9uKGlucD86IER1cmF0aW9uIHwgRGF0ZUlucHV0IHwgS2hyb25vcywgdW5pdD86IE1vbWVudFVuaXRPZlRpbWUpOiBEdXJhdGlvbjtcclxubW9tZW50LmR1cmF0aW9uID0gKGlucHV0PzogRHVyYXRpb24gfCBEYXRlSW5wdXQgfCBLaHJvbm9zLCB1bml0PzogTW9tZW50VW5pdE9mVGltZSk6IER1cmF0aW9uID0+IHtcclxuICBjb25zdCBfdW5pdCA9IG1hcFVuaXRPZlRpbWUodW5pdCk7XHJcbiAgaWYgKGlzRGF0ZShpbnB1dCkpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcigndG9kbyBpbXBsZW1lbnQnKTtcclxuICB9XHJcblxyXG4gIGlmIChpbnB1dCA9PSBudWxsKSB7XHJcbiAgICByZXR1cm4gY3JlYXRlRHVyYXRpb24oKTtcclxuICB9XHJcblxyXG4gIGlmIChpc0R1cmF0aW9uKGlucHV0KSkge1xyXG4gICAgcmV0dXJuIGNyZWF0ZUR1cmF0aW9uKGlucHV0LCBfdW5pdCwgeyBfbG9jYWxlOiBpbnB1dC5fbG9jYWxlIH0pO1xyXG4gIH1cclxuXHJcbiAgaWYgKGlzU3RyaW5nKGlucHV0KSB8fCBpc051bWJlcihpbnB1dCkgfHwgaXNEdXJhdGlvbihpbnB1dCkgfHwgaXNPYmplY3Q8RGF0ZU9iamVjdD4oaW5wdXQpKSB7XHJcbiAgICByZXR1cm4gY3JlYXRlRHVyYXRpb24oaW5wdXQsIF91bml0KTtcclxuICB9XHJcblxyXG4gIHRocm93IG5ldyBFcnJvcigndG9kbyBpbXBsZW1lbnQnKTtcclxufTtcclxuXHJcbm1vbWVudC5taW4gPSBmdW5jdGlvbiBfbWluKC4uLmRhdGVzOiAoKERhdGVJbnB1dCB8IEtocm9ub3MpW10gfCAoRGF0ZUlucHV0IHwgS2hyb25vcykpW10pOiBLaHJvbm9zIHtcclxuICBjb25zdCBfZmlyc3RBcmcgPSBkYXRlc1swXTtcclxuICBjb25zdCBfZGF0ZXMgPSAoaXNBcnJheShfZmlyc3RBcmcpID8gX2ZpcnN0QXJnIDogZGF0ZXMpXHJcbiAgICAubWFwKChkYXRlOiBLaHJvbm9zKSA9PiBfbW9tZW50KGRhdGUpKVxyXG4gICAgLm1hcChkYXRlID0+IGRhdGUudG9EYXRlKCkpO1xyXG5cclxuICBjb25zdCBfZGF0ZSA9IG1pbiguLi5fZGF0ZXMpO1xyXG5cclxuICByZXR1cm4gbmV3IEtocm9ub3MoX2RhdGUpO1xyXG59O1xyXG5cclxubW9tZW50Lm1heCA9IGZ1bmN0aW9uIF9tYXgoLi4uZGF0ZXM6ICgoRGF0ZUlucHV0IHwgS2hyb25vcylbXSB8IChEYXRlSW5wdXQgfCBLaHJvbm9zKSlbXSk6IEtocm9ub3Mge1xyXG4gIGNvbnN0IF9maXJzdEFyZyA9IGRhdGVzWzBdO1xyXG4gIGNvbnN0IF9kYXRlcyA9IChpc0FycmF5KF9maXJzdEFyZykgPyBfZmlyc3RBcmcgOiBkYXRlcylcclxuICAgIC5tYXAoKGRhdGU6IEtocm9ub3MpID0+IF9tb21lbnQoZGF0ZSkpXHJcbiAgICAubWFwKGRhdGUgPT4gZGF0ZS50b0RhdGUoKSk7XHJcblxyXG4gIGNvbnN0IF9kYXRlID0gbWF4KC4uLl9kYXRlcyk7XHJcblxyXG4gIHJldHVybiBuZXcgS2hyb25vcyhfZGF0ZSk7XHJcbn07XHJcblxyXG5tb21lbnQubG9jYWxlcyA9ICgpOiBzdHJpbmdbXSA9PiB7XHJcbiAgcmV0dXJuIGxpc3RMb2NhbGVzKCk7XHJcbn07XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE1vbWVudElucHV0T2JqZWN0IHtcclxuICB5ZWFycz86IG51bWJlcjtcclxuICB5ZWFyPzogbnVtYmVyO1xyXG4gIHk/OiBudW1iZXI7XHJcblxyXG4gIG1vbnRocz86IG51bWJlcjtcclxuICBtb250aD86IG51bWJlcjtcclxuICBNPzogbnVtYmVyO1xyXG5cclxuICBkYXlzPzogbnVtYmVyO1xyXG4gIGRheT86IG51bWJlcjtcclxuICBkPzogbnVtYmVyO1xyXG5cclxuICBkYXRlcz86IG51bWJlcjtcclxuICBkYXRlPzogbnVtYmVyO1xyXG4gIEQ/OiBudW1iZXI7XHJcblxyXG4gIGhvdXJzPzogbnVtYmVyO1xyXG4gIGhvdXI/OiBudW1iZXI7XHJcbiAgaD86IG51bWJlcjtcclxuXHJcbiAgbWludXRlcz86IG51bWJlcjtcclxuICBtaW51dGU/OiBudW1iZXI7XHJcbiAgbT86IG51bWJlcjtcclxuXHJcbiAgc2Vjb25kcz86IG51bWJlcjtcclxuICBzZWNvbmQ/OiBudW1iZXI7XHJcbiAgcz86IG51bWJlcjtcclxuXHJcbiAgbWlsbGlzZWNvbmRzPzogbnVtYmVyO1xyXG4gIG1pbGxpc2Vjb25kPzogbnVtYmVyO1xyXG4gIG1zPzogbnVtYmVyO1xyXG5cclxuICB3PzogbnVtYmVyO1xyXG4gIHdlZWs/OiBudW1iZXI7XHJcbiAgd2Vla3M/OiBudW1iZXI7XHJcblxyXG4gIFE/OiBudW1iZXI7XHJcbiAgcXVhcnRlcj86IG51bWJlcjtcclxuICBxdWFydGVycz86IG51bWJlcjtcclxuXHJcbiAgd2Vla1llYXI/OiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIE1vbWVudFVuaXRPZlRpbWUgPSAoXHJcbiAgJ3llYXInIHwgJ3llYXJzJyB8ICd5JyB8XHJcbiAgJ21vbnRoJyB8ICdtb250aHMnIHwgJ00nIHxcclxuICAnd2VlaycgfCAnd2Vla3MnIHwgJ3cnIHxcclxuICAnZGF5JyB8ICdkYXlzJyB8ICdkJyB8XHJcbiAgJ2hvdXInIHwgJ2hvdXJzJyB8ICdoJyB8XHJcbiAgJ21pbnV0ZScgfCAnbWludXRlcycgfCAnbScgfFxyXG4gICdzZWNvbmQnIHwgJ3NlY29uZHMnIHwgJ3MnIHxcclxuICAnbWlsbGlzZWNvbmQnIHwgJ21pbGxpc2Vjb25kcycgfCAnbXMnIHxcclxuICAncScgfCAncXVhcnRlcicgfCAncXVhcnRlcnMnIHwgJ1EnIHxcclxuICAnaXNvV2VlaycgfCAnaXNvV2Vla3MnIHwgJ1cnIHxcclxuICAnZGF0ZScgfCAnZGF0ZXMnIHwgJ0QnXHJcbiAgKTtcclxuXHJcbmV4cG9ydCB0eXBlIE1vbWVudEFsbCA9IE1vbWVudFVuaXRPZlRpbWUgfFxyXG4gICd3ZWVrWWVhcicgfCAnd2Vla1llYXJzJyB8ICdnZycgfFxyXG4gICdpc29XZWVrWWVhcicgfCAnaXNvV2Vla1llYXJzJyB8ICdHRycgfFxyXG4gICdkYXlPZlllYXInIHwgJ2RheU9mWWVhcnMnIHwgJ0RERCcgfFxyXG4gICd3ZWVrZGF5JyB8ICd3ZWVrZGF5cycgfCAnZScgfFxyXG4gICdpc29XZWVrZGF5JyB8ICdpc29XZWVrZGF5cycgfCAnRSc7XHJcblxyXG5jb25zdCBfdW5pdHNQcmlvcml0eToge1trZXkgaW4gVW5pdE9mVGltZV06IG51bWJlcn0gPSB7XHJcbiAgeWVhcjogMSxcclxuICBtb250aDogOCxcclxuICB3ZWVrOiA1LFxyXG4gIGlzb1dlZWs6IDUsXHJcbiAgZGF5OiAxMSxcclxuICB3ZWVrZGF5OiAxMSxcclxuICBpc29XZWVrZGF5OiAxMSxcclxuICBob3VyczogMTMsXHJcbiAgd2Vla1llYXI6IDEsXHJcbiAgaXNvV2Vla1llYXI6IDEsXHJcbiAgcXVhcnRlcjogNyxcclxuICBkYXRlOiA5LFxyXG4gIGRheU9mWWVhcjogNCxcclxuICBtaW51dGVzOiAxNCxcclxuICBzZWNvbmRzOiAxNSxcclxuICBtaWxsaXNlY29uZHM6IDE2XHJcbn07XHJcblxyXG4vLyB0b2RvOiBkbyBJIG5lZWQgMiBtYXBwZXJzP1xyXG5jb25zdCBfdGltZUhhc2hNYXA6IHsgW2tleSBpbiBNb21lbnRBbGxdOiBVbml0T2ZUaW1lIHwgc3RyaW5nIH0gPSB7XHJcbiAgeTogJ3llYXInLFxyXG4gIHllYXJzOiAneWVhcicsXHJcbiAgeWVhcjogJ3llYXInLFxyXG4gIE06ICdtb250aCcsXHJcbiAgbW9udGhzOiAnbW9udGgnLFxyXG4gIG1vbnRoOiAnbW9udGgnLFxyXG4gIHc6ICd3ZWVrJyxcclxuICB3ZWVrczogJ3dlZWsnLFxyXG4gIHdlZWs6ICd3ZWVrJyxcclxuXHJcbiAgZDogJ2RheScsXHJcbiAgZGF5czogJ2RheScsXHJcbiAgZGF5OiAnZGF5JyxcclxuXHJcbiAgZGF0ZTogJ2RhdGUnLFxyXG4gIGRhdGVzOiAnZGF0ZScsXHJcbiAgRDogJ2RhdGUnLFxyXG5cclxuICBoOiAnaG91cnMnLFxyXG4gIGhvdXI6ICdob3VycycsXHJcbiAgaG91cnM6ICdob3VycycsXHJcbiAgbTogJ21pbnV0ZXMnLFxyXG4gIG1pbnV0ZTogJ21pbnV0ZXMnLFxyXG4gIG1pbnV0ZXM6ICdtaW51dGVzJyxcclxuICBzOiAnc2Vjb25kcycsXHJcbiAgc2Vjb25kOiAnc2Vjb25kcycsXHJcbiAgc2Vjb25kczogJ3NlY29uZHMnLFxyXG4gIG1zOiAnbWlsbGlzZWNvbmRzJyxcclxuICBtaWxsaXNlY29uZDogJ21pbGxpc2Vjb25kcycsXHJcbiAgbWlsbGlzZWNvbmRzOiAnbWlsbGlzZWNvbmRzJyxcclxuICBxdWFydGVyOiAncXVhcnRlcicsXHJcbiAgcXVhcnRlcnM6ICdxdWFydGVyJyxcclxuICBxOiAncXVhcnRlcicsXHJcbiAgUTogJ3F1YXJ0ZXInLFxyXG4gIGlzb1dlZWs6ICdpc29XZWVrJyxcclxuICBpc29XZWVrczogJ2lzb1dlZWsnLFxyXG4gIFc6ICdpc29XZWVrJyxcclxuICB3ZWVrWWVhcjogJ3dlZWtZZWFyJyxcclxuICB3ZWVrWWVhcnM6ICd3ZWVrWWVhcicsXHJcbiAgZ2c6ICd3ZWVrWWVhcnMnLFxyXG4gIGlzb1dlZWtZZWFyOiAnaXNvV2Vla1llYXInLFxyXG4gIGlzb1dlZWtZZWFyczogJ2lzb1dlZWtZZWFyJyxcclxuICBHRzogJ2lzb1dlZWtZZWFyJyxcclxuICBkYXlPZlllYXI6ICdkYXlPZlllYXInLFxyXG4gIGRheU9mWWVhcnM6ICdkYXlPZlllYXInLFxyXG4gIERERDogJ2RheU9mWWVhcicsXHJcbiAgd2Vla2RheTogJ3dlZWtkYXknLFxyXG4gIHdlZWtkYXlzOiAnd2Vla2RheScsXHJcbiAgZTogJ3dlZWtkYXknLFxyXG4gIGlzb1dlZWtkYXk6ICdpc29XZWVrZGF5JyxcclxuICBpc29XZWVrZGF5czogJ2lzb1dlZWtkYXknLFxyXG4gIEU6ICdpc29XZWVrZGF5J1xyXG59O1xyXG5cclxuZnVuY3Rpb24gbWFwVW5pdE9mVGltZShwZXJpb2Q6IE1vbWVudEFsbCk6IFVuaXRPZlRpbWUge1xyXG4gIHJldHVybiBfdGltZUhhc2hNYXBbcGVyaW9kXSBhcyBVbml0T2ZUaW1lO1xyXG59XHJcblxyXG5mdW5jdGlvbiBtYXBNb21lbnRJbnB1dE9iamVjdChvYmo6IE1vbWVudElucHV0T2JqZWN0KToge1trZXkgaW4gVW5pdE9mVGltZV0/OiBudW1iZXJ9IHtcclxuICBjb25zdCBfcmVzOiB7W2tleSBpbiBVbml0T2ZUaW1lXT86IG51bWJlcn0gPSB7fTtcclxuXHJcbiAgcmV0dXJuIE9iamVjdC5rZXlzKG9iailcclxuICAgIC5yZWR1Y2UoKHJlcywga2V5OiBrZXlvZiBNb21lbnRJbnB1dE9iamVjdCkgPT4ge1xyXG4gICAgICByZXNbbWFwVW5pdE9mVGltZShrZXkpXSA9IG9ialtrZXldO1xyXG5cclxuICAgICAgcmV0dXJuIHJlcztcclxuICAgIH0sIF9yZXMpO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgS2hyb25vcyB7XHJcbiAgX2RhdGU6IERhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gIF9pc1VUQyA9IGZhbHNlO1xyXG4gIF9pc1N0cmljdDogYm9vbGVhbjtcclxuICBfbG9jYWxlOiBMb2NhbGU7XHJcbiAgX2Zvcm1hdDogc3RyaW5nIHwgc3RyaW5nW107XHJcbiAgX29mZnNldDogbnVtYmVyO1xyXG4gIF90em06IG51bWJlcjtcclxuXHJcbiAgY29uc3RydWN0b3IoaW5wdXQ/OiBEYXRlSW5wdXQsXHJcbiAgICAgICAgICAgICAgZm9ybWF0Pzogc3RyaW5nIHwgc3RyaW5nW10sXHJcbiAgICAgICAgICAgICAgbG9jYWxlS2V5Pzogc3RyaW5nLFxyXG4gICAgICAgICAgICAgIHN0cmljdCA9IGZhbHNlLFxyXG4gICAgICAgICAgICAgIGlzVVRDID0gZmFsc2UsXHJcbiAgICAgICAgICAgICAgb2Zmc2V0PzogbnVtYmVyKSB7XHJcbiAgICAvLyBsb2NhbGUgd2lsbCBiZSBuZWVkZWQgdG8gZm9ybWF0IGludmFsaWQgZGF0ZSBtZXNzYWdlXHJcbiAgICB0aGlzLl9sb2NhbGUgPSBnZXRMb2NhbGUobG9jYWxlS2V5KTtcclxuICAgIC8vIHBhcnNlIGludmFsaWQgaW5wdXRcclxuICAgIGlmIChpbnB1dCA9PT0gJycgfHwgaW5wdXQgPT09IG51bGwgfHwgKGlzTnVtYmVyKGlucHV0KSAmJiBpc05hTihpbnB1dCkpKSB7XHJcbiAgICAgIHRoaXMuX2RhdGUgPSBuZXcgRGF0ZShOYU4pO1xyXG5cclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5faXNVVEMgPSBpc1VUQztcclxuICAgIGlmICh0aGlzLl9pc1VUQykge1xyXG4gICAgICB0aGlzLl9vZmZzZXQgPSAwO1xyXG4gICAgfVxyXG4gICAgaWYgKG9mZnNldCB8fCBvZmZzZXQgPT09IDApIHtcclxuICAgICAgdGhpcy5fb2Zmc2V0ID0gb2Zmc2V0O1xyXG4gICAgfVxyXG4gICAgdGhpcy5faXNTdHJpY3QgPSBzdHJpY3Q7XHJcbiAgICB0aGlzLl9mb3JtYXQgPSBmb3JtYXQ7XHJcblxyXG4gICAgaWYgKCFpbnB1dCAmJiBpbnB1dCAhPT0gMCAmJiAhZm9ybWF0KSB7XHJcbiAgICAgIHRoaXMuX2RhdGUgPSBuZXcgRGF0ZSgpO1xyXG5cclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGlzRGF0ZShpbnB1dCkpIHtcclxuICAgICAgdGhpcy5fZGF0ZSA9IGNsb25lRGF0ZShpbnB1dCk7XHJcblxyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvLyB0aGlzLl9kYXRlID0gcGFyc2VEYXRlKGlucHV0LCBmb3JtYXQsIGxvY2FsZUtleSwgc3RyaWN0LCBpc1VUQyk7XHJcbiAgICBjb25zdCBjb25maWcgPSBjcmVhdGVMb2NhbE9yVVRDKGlucHV0LCBmb3JtYXQsIGxvY2FsZUtleSwgc3RyaWN0LCBpc1VUQyk7XHJcbiAgICB0aGlzLl9kYXRlID0gY29uZmlnLl9kO1xyXG4gICAgdGhpcy5fb2Zmc2V0ID0gaXNOdW1iZXIoY29uZmlnLl9vZmZzZXQpID8gY29uZmlnLl9vZmZzZXQgOiB0aGlzLl9vZmZzZXQ7XHJcbiAgICB0aGlzLl9pc1VUQyA9IGNvbmZpZy5faXNVVEM7XHJcbiAgICB0aGlzLl9pc1N0cmljdCA9IGNvbmZpZy5fc3RyaWN0O1xyXG4gICAgdGhpcy5fZm9ybWF0ID0gY29uZmlnLl9mO1xyXG4gICAgdGhpcy5fdHptID0gY29uZmlnLl90em07XHJcbiAgfVxyXG5cclxuICBfdG9Db25maWcoKTogRGF0ZVBhcnNpbmdDb25maWcge1xyXG4gICAgcmV0dXJuIHsgX2lzVVRDOiB0aGlzLl9pc1VUQywgX2xvY2FsZTogdGhpcy5fbG9jYWxlLCBfb2Zmc2V0OiB0aGlzLl9vZmZzZXQsIF90em06IHRoaXMuX3R6bSB9O1xyXG4gIH1cclxuXHJcbiAgLy8gTG9jYWxlXHJcbiAgbG9jYWxlKCk6IHN0cmluZztcclxuICBsb2NhbGUobG9jYWxlS2V5OiBzdHJpbmcgfCBzdHJpbmdbXSB8IEtocm9ub3MpOiBLaHJvbm9zO1xyXG4gIGxvY2FsZShsb2NhbGVLZXk/OiBzdHJpbmcgfCBzdHJpbmdbXSB8IEtocm9ub3MpOiBLaHJvbm9zIHwgc3RyaW5nIHtcclxuICAgIGlmIChpc1VuZGVmaW5lZChsb2NhbGVLZXkpKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9sb2NhbGUuX2FiYnI7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGxvY2FsZUtleSBpbnN0YW5jZW9mIEtocm9ub3MpIHtcclxuICAgICAgdGhpcy5fbG9jYWxlID0gbG9jYWxlS2V5Ll9sb2NhbGU7XHJcblxyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBuZXdMb2NhbGVEYXRhID0gZ2V0TG9jYWxlKGxvY2FsZUtleSk7XHJcbiAgICBpZiAobmV3TG9jYWxlRGF0YSAhPSBudWxsKSB7XHJcbiAgICAgIHRoaXMuX2xvY2FsZSA9IG5ld0xvY2FsZURhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBsb2NhbGVEYXRhKCk6IExvY2FsZSB7XHJcbiAgICByZXR1cm4gdGhpcy5fbG9jYWxlO1xyXG4gIH1cclxuXHJcbiAgLy8gQmFzaWNcclxuXHJcbiAgYWRkKHZhbDogbnVtYmVyIHwgc3RyaW5nIHwgTW9tZW50SW5wdXRPYmplY3QsIHBlcmlvZD86IFVuaXRPZlRpbWUgfCBNb21lbnRVbml0T2ZUaW1lKTogS2hyb25vcyB7XHJcbiAgICBpZiAoaXNTdHJpbmcodmFsKSkge1xyXG4gICAgICB0aGlzLl9kYXRlID0gYWRkKHRoaXMuX2RhdGUsIHBhcnNlSW50KHZhbCwgMTApLCBtYXBVbml0T2ZUaW1lKHBlcmlvZCkpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChpc051bWJlcih2YWwpKSB7XHJcbiAgICAgIHRoaXMuX2RhdGUgPSBhZGQodGhpcy5fZGF0ZSwgdmFsLCBtYXBVbml0T2ZUaW1lKHBlcmlvZCkpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChpc09iamVjdDxNb21lbnRJbnB1dE9iamVjdD4odmFsKSkge1xyXG4gICAgICBjb25zdCBfbWFwcGVkID0gbWFwTW9tZW50SW5wdXRPYmplY3QodmFsKTtcclxuICAgICAgT2JqZWN0LmtleXMoX21hcHBlZClcclxuICAgICAgICAuZm9yRWFjaCgoa2V5OiBVbml0T2ZUaW1lKSA9PiBhZGQodGhpcy5fZGF0ZSwgX21hcHBlZFtrZXldLCBrZXkpKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8vIGZpeG1lOiBmb3Igc29tZSByZWFzb24gaGVyZSAnbnVsbCcgZm9yIHRpbWUgaXMgZmluZVxyXG4gIGNhbGVuZGFyKHRpbWU/OiBEYXRlSW5wdXQgfCBLaHJvbm9zLCBmb3JtYXRzPzogQ2FsZW5kYXJTcGVjKTogc3RyaW5nIHtcclxuICAgIGNvbnN0IF90aW1lID0gdGltZSBpbnN0YW5jZW9mIEtocm9ub3MgPyB0aW1lIDogbmV3IEtocm9ub3ModGltZSB8fCBuZXcgRGF0ZSgpKTtcclxuICAgIGNvbnN0IF9vZmZzZXQgPSAodGhpcy5fb2Zmc2V0IHx8IDApIC0gKF90aW1lLl9vZmZzZXQgfHwgMCk7XHJcbiAgICBjb25zdCBfY29uZmlnID0gT2JqZWN0LmFzc2lnbih0aGlzLl90b0NvbmZpZygpLCB7IF9vZmZzZXQgfSk7XHJcblxyXG4gICAgcmV0dXJuIGNhbGVuZGFyKHRoaXMuX2RhdGUsIF90aW1lLl9kYXRlLFxyXG4gICAgICBmb3JtYXRzLCB0aGlzLl9sb2NhbGUsIF9jb25maWcpO1xyXG4gIH1cclxuXHJcbiAgY2xvbmUoKTogS2hyb25vcyB7XHJcbiAgICBjb25zdCBsb2NhbGVLZXkgPSB0aGlzLl9sb2NhbGUgJiYgdGhpcy5fbG9jYWxlLl9hYmJyIHx8ICdlbic7XHJcblxyXG4gICAgLy8gcmV0dXJuIG5ldyBLaHJvbm9zKGNsb25lRGF0ZSh0aGlzLl9kYXRlKSwgdGhpcy5fZm9ybWF0LCBsb2NhbGVLZXksIHRoaXMuX2lzU3RyaWN0LCB0aGlzLl9pc1VUQyk7XHJcbiAgICAvLyBmYWlscyBpZiBpc1VUQyBhbmQgb2Zmc2V0XHJcbiAgICAvLyByZXR1cm4gbmV3IEtocm9ub3MobmV3IERhdGUodGhpcy52YWx1ZU9mKCkpLFxyXG4gICAgcmV0dXJuIG5ldyBLaHJvbm9zKHRoaXMuX2RhdGUsXHJcbiAgICAgIHRoaXMuX2Zvcm1hdCxcclxuICAgICAgbG9jYWxlS2V5LFxyXG4gICAgICB0aGlzLl9pc1N0cmljdCxcclxuICAgICAgdGhpcy5faXNVVEMsXHJcbiAgICAgIHRoaXMuX29mZnNldCk7XHJcbiAgfVxyXG5cclxuICBkaWZmKGI6IERhdGVJbnB1dCB8IEtocm9ub3MsIHVuaXRPZlRpbWU/OiBNb21lbnRVbml0T2ZUaW1lLCBwcmVjaXNlPzogYm9vbGVhbik6IG51bWJlciB7XHJcbiAgICBjb25zdCB1bml0ID0gbWFwVW5pdE9mVGltZSh1bml0T2ZUaW1lKTtcclxuICAgIGNvbnN0IF9iID0gYiBpbnN0YW5jZW9mIEtocm9ub3MgPyBiIDogbmV3IEtocm9ub3MoYik7XHJcbiAgICAvLyBjb25zdCB6b25lRGVsdGEgPSAoX2IudXRjT2Zmc2V0KCkgLSB0aGlzLnV0Y09mZnNldCgpKTtcclxuICAgIC8vIGNvbnN0IGNvbmZpZyA9IE9iamVjdC5hc3NpZ24odGhpcy5fdG9Db25maWcoKSwge1xyXG4gICAgLy8gICBfb2Zmc2V0OiAwLFxyXG4gICAgLy8gICBfaXNVVEM6IHRydWUsXHJcbiAgICAvLyAgIF96b25lRGVsdGE6IHpvbmVEZWx0YVxyXG4gICAgLy8gfSk7XHJcbiAgICAvLyByZXR1cm4gZGlmZihuZXcgRGF0ZSh0aGlzLnZhbHVlT2YoKSksIG5ldyBEYXRlKF9iLnZhbHVlT2YoKSksIHVuaXQsIHByZWNpc2UsIGNvbmZpZyk7XHJcblxyXG4gICAgcmV0dXJuIGRpZmYodGhpcy5fZGF0ZSwgX2IudG9EYXRlKCksIHVuaXQsIHByZWNpc2UsIHRoaXMuX3RvQ29uZmlnKCkpO1xyXG4gIH1cclxuXHJcbiAgZW5kT2YocGVyaW9kPzogTW9tZW50VW5pdE9mVGltZSk6IEtocm9ub3Mge1xyXG4gICAgY29uc3QgX3BlciA9IG1hcFVuaXRPZlRpbWUocGVyaW9kKTtcclxuICAgIHRoaXMuX2RhdGUgPSBlbmRPZih0aGlzLl9kYXRlLCBfcGVyLCB0aGlzLl9pc1VUQyk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBmb3JtYXQoZm9ybWF0Pzogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBmb3JtYXREYXRlKHRoaXMuX2RhdGUsIGZvcm1hdCwgdGhpcy5fbG9jYWxlICYmIHRoaXMuX2xvY2FsZS5fYWJiciwgdGhpcy5faXNVVEMsIHRoaXMuX29mZnNldCk7XHJcbiAgfVxyXG5cclxuICAvLyB0b2RvOiBpbXBsZW1lbnRcclxuICBmcm9tKHRpbWU/OiBEYXRlSW5wdXQgfCBLaHJvbm9zLCB3aXRob3V0U3VmZml4PzogYm9vbGVhbik6IHN0cmluZyB7XHJcbiAgICBjb25zdCBfdGltZSA9IF9tb21lbnQodGltZSk7XHJcbiAgICBpZiAodGhpcy5pc1ZhbGlkKCkgJiYgX3RpbWUuaXNWYWxpZCgpKSB7XHJcbiAgICAgIHJldHVybiBjcmVhdGVEdXJhdGlvbih7IHRvOiB0aGlzLnRvRGF0ZSgpLCBmcm9tOiBfdGltZS50b0RhdGUoKSB9KVxyXG4gICAgICAgIC5sb2NhbGUodGhpcy5sb2NhbGUoKSlcclxuICAgICAgICAuaHVtYW5pemUoIXdpdGhvdXRTdWZmaXgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLmxvY2FsZURhdGEoKS5pbnZhbGlkRGF0ZTtcclxuICB9XHJcblxyXG4gIGZyb21Ob3cod2l0aG91dFN1ZmZpeD86IGJvb2xlYW4pOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuZnJvbShuZXcgRGF0ZSgpLCB3aXRob3V0U3VmZml4KTtcclxuICB9XHJcblxyXG4gIHRvKGlucDogRGF0ZUlucHV0IHwgS2hyb25vcywgc3VmZml4PzogYm9vbGVhbik6IHN0cmluZyB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFRPRE86IEltcGxlbWVudGApO1xyXG4gIH1cclxuXHJcbiAgdG9Ob3cod2l0aG91dFByZWZpeD86IGJvb2xlYW4pOiBzdHJpbmcge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKGBUT0RPOiBJbXBsZW1lbnRgKTtcclxuICB9XHJcblxyXG4gIHN1YnRyYWN0KHZhbDogbnVtYmVyIHwgc3RyaW5nIHwgTW9tZW50SW5wdXRPYmplY3QsIHBlcmlvZD86IFVuaXRPZlRpbWUgfCBNb21lbnRVbml0T2ZUaW1lKTogS2hyb25vcyB7XHJcbiAgICBpZiAoaXNTdHJpbmcodmFsKSkge1xyXG4gICAgICB0aGlzLl9kYXRlID0gc3VidHJhY3QodGhpcy5fZGF0ZSwgcGFyc2VJbnQodmFsLCAxMCksIG1hcFVuaXRPZlRpbWUocGVyaW9kKSk7XHJcblxyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBpZiAoaXNOdW1iZXIodmFsKSkge1xyXG4gICAgICB0aGlzLl9kYXRlID0gc3VidHJhY3QodGhpcy5fZGF0ZSwgdmFsLCBtYXBVbml0T2ZUaW1lKHBlcmlvZCkpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChpc09iamVjdDxNb21lbnRJbnB1dE9iamVjdD4odmFsKSkge1xyXG4gICAgICBjb25zdCBfbWFwcGVkID0gbWFwTW9tZW50SW5wdXRPYmplY3QodmFsKTtcclxuICAgICAgT2JqZWN0LmtleXMoX21hcHBlZClcclxuICAgICAgICAuZm9yRWFjaCgoa2V5OiBVbml0T2ZUaW1lKSA9PiBzdWJ0cmFjdCh0aGlzLl9kYXRlLCBfbWFwcGVkW2tleV0sIGtleSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgZ2V0KHBlcmlvZDogTW9tZW50QWxsKTogbnVtYmVyIHtcclxuICAgIGlmIChwZXJpb2QgPT09ICdkYXlPZlllYXInKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmRheU9mWWVhcigpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHVuaXQgPSBtYXBVbml0T2ZUaW1lKHBlcmlvZCk7XHJcbiAgICBzd2l0Y2ggKHVuaXQpIHtcclxuICAgICAgY2FzZSAneWVhcic6XHJcbiAgICAgICAgcmV0dXJuIHRoaXMueWVhcigpO1xyXG4gICAgICBjYXNlICdtb250aCc6XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubW9udGgoKTtcclxuICAgICAgLy8gfCAnd2VlaydcclxuICAgICAgY2FzZSAnZGF0ZSc6XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZSgpO1xyXG4gICAgICBjYXNlICdkYXknOlxyXG4gICAgICAgIHJldHVybiB0aGlzLmRheSgpO1xyXG4gICAgICBjYXNlICdob3Vycyc6XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaG91cnMoKTtcclxuICAgICAgY2FzZSAnbWludXRlcyc6XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWludXRlcygpO1xyXG4gICAgICBjYXNlICdzZWNvbmRzJzpcclxuICAgICAgICByZXR1cm4gdGhpcy5zZWNvbmRzKCk7XHJcbiAgICAgIGNhc2UgJ21pbGxpc2Vjb25kcyc6XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWlsbGlzZWNvbmRzKCk7XHJcbiAgICAgIGNhc2UgJ3dlZWsnOlxyXG4gICAgICAgIHJldHVybiB0aGlzLndlZWsoKTtcclxuICAgICAgY2FzZSAnaXNvV2Vlayc6XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNvV2VlaygpO1xyXG4gICAgICBjYXNlICd3ZWVrWWVhcic6XHJcbiAgICAgICAgcmV0dXJuIHRoaXMud2Vla1llYXIoKTtcclxuICAgICAgY2FzZSAnaXNvV2Vla1llYXInOlxyXG4gICAgICAgIHJldHVybiB0aGlzLmlzb1dlZWtZZWFyKCk7XHJcbiAgICAgIGNhc2UgJ3dlZWtkYXknOlxyXG4gICAgICAgIHJldHVybiB0aGlzLndlZWtkYXkoKTtcclxuICAgICAgY2FzZSAnaXNvV2Vla2RheSc6XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNvV2Vla2RheSgpO1xyXG4gICAgICBjYXNlICdxdWFydGVyJzpcclxuICAgICAgICByZXR1cm4gdGhpcy5xdWFydGVyKCk7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIG1vbWVudC5nZXQoJyR7cGVyaW9kfScpYCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZXQocGVyaW9kOiBNb21lbnRBbGwgfCBNb21lbnRJbnB1dE9iamVjdCwgaW5wdXQ/OiBudW1iZXIpOiBLaHJvbm9zIHtcclxuXHJcbiAgICBpZiAoaXNTdHJpbmcocGVyaW9kKSkge1xyXG4gICAgICBjb25zdCB1bml0ID0gbWFwVW5pdE9mVGltZShwZXJpb2QpO1xyXG4gICAgICBzd2l0Y2ggKHVuaXQpIHtcclxuICAgICAgICBjYXNlICd5ZWFyJzpcclxuICAgICAgICAgIHJldHVybiB0aGlzLnllYXIoaW5wdXQpO1xyXG4gICAgICAgIGNhc2UgJ21vbnRoJzpcclxuICAgICAgICAgIHJldHVybiB0aGlzLm1vbnRoKGlucHV0KTtcclxuICAgICAgICAvLyB8ICd3ZWVrJ1xyXG4gICAgICAgIGNhc2UgJ2RheSc6XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5kYXkoaW5wdXQpO1xyXG4gICAgICAgIGNhc2UgJ2RhdGUnOlxyXG4gICAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZShpbnB1dCk7XHJcbiAgICAgICAgY2FzZSAnaG91cnMnOlxyXG4gICAgICAgICAgcmV0dXJuIHRoaXMuaG91cnMoaW5wdXQpO1xyXG4gICAgICAgIGNhc2UgJ21pbnV0ZXMnOlxyXG4gICAgICAgICAgcmV0dXJuIHRoaXMubWludXRlcyhpbnB1dCk7XHJcbiAgICAgICAgY2FzZSAnc2Vjb25kcyc6XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5zZWNvbmRzKGlucHV0KTtcclxuICAgICAgICBjYXNlICdtaWxsaXNlY29uZHMnOlxyXG4gICAgICAgICAgcmV0dXJuIHRoaXMubWlsbGlzZWNvbmRzKGlucHV0KTtcclxuICAgICAgICBjYXNlICd3ZWVrJzpcclxuICAgICAgICAgIHJldHVybiB0aGlzLndlZWsoaW5wdXQpO1xyXG4gICAgICAgIGNhc2UgJ2lzb1dlZWsnOlxyXG4gICAgICAgICAgcmV0dXJuIHRoaXMuaXNvV2VlayhpbnB1dCk7XHJcbiAgICAgICAgY2FzZSAnd2Vla1llYXInOlxyXG4gICAgICAgICAgcmV0dXJuIHRoaXMud2Vla1llYXIoaW5wdXQpO1xyXG4gICAgICAgIGNhc2UgJ2lzb1dlZWtZZWFyJzpcclxuICAgICAgICAgIHJldHVybiB0aGlzLmlzb1dlZWtZZWFyKGlucHV0KTtcclxuICAgICAgICBjYXNlICd3ZWVrZGF5JzpcclxuICAgICAgICAgIHJldHVybiB0aGlzLndlZWtkYXkoaW5wdXQpO1xyXG4gICAgICAgIGNhc2UgJ2lzb1dlZWtkYXknOlxyXG4gICAgICAgICAgcmV0dXJuIHRoaXMuaXNvV2Vla2RheShpbnB1dCk7XHJcbiAgICAgICAgY2FzZSAncXVhcnRlcic6XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5xdWFydGVyKGlucHV0KTtcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIG1vbWVudC5nZXQoJyR7cGVyaW9kfScpYCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoaXNPYmplY3Q8TW9tZW50SW5wdXRPYmplY3Q+KHBlcmlvZCkpIHtcclxuICAgICAgY29uc3QgX21hcHBlZCA9IG1hcE1vbWVudElucHV0T2JqZWN0KHBlcmlvZCk7XHJcbiAgICAgIE9iamVjdC5rZXlzKF9tYXBwZWQpXHJcbiAgICAgICAgLnNvcnQoZnVuY3Rpb24oYTogVW5pdE9mVGltZSwgYjogVW5pdE9mVGltZSk6IG51bWJlciB7XHJcbiAgICAgICAgICByZXR1cm4gX3VuaXRzUHJpb3JpdHlbYV0gLSBfdW5pdHNQcmlvcml0eVtiXTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5mb3JFYWNoKChrZXk6IFVuaXRPZlRpbWUpID0+IHRoaXMuc2V0KGtleSwgX21hcHBlZFtrZXldKSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgdG9TdHJpbmcoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLmZvcm1hdCgnZGRkIE1NTSBERCBZWVlZIEhIOm1tOnNzIFtHTVRdWlonKTtcclxuICB9XHJcblxyXG4gIHRvSVNPU3RyaW5nKCk6IHN0cmluZyB7XHJcbiAgICBpZiAoIXRoaXMuaXNWYWxpZCgpKSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChnZXRGdWxsWWVhcih0aGlzLl9kYXRlLCB0cnVlKSA8IDAgfHwgZ2V0RnVsbFllYXIodGhpcy5fZGF0ZSwgdHJ1ZSkgPiA5OTk5KSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmZvcm1hdCgnWVlZWVlZLU1NLUREW1RdSEg6bW06c3MuU1NTW1pdJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGlzRnVuY3Rpb24oRGF0ZS5wcm90b3R5cGUudG9JU09TdHJpbmcpKSB7XHJcbiAgICAgIC8vIG5hdGl2ZSBpbXBsZW1lbnRhdGlvbiBpcyB+NTB4IGZhc3RlciwgdXNlIGl0IHdoZW4gd2UgY2FuXHJcbiAgICAgIHJldHVybiB0aGlzLnRvRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuZm9ybWF0KCdZWVlZLU1NLUREW1RdSEg6bW06c3MuU1NTW1pdJyk7XHJcbiAgfVxyXG5cclxuICBpbnNwZWN0KCk6IHN0cmluZyB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1RPRE86IGltcGxlbWVudCcpO1xyXG4gIH1cclxuXHJcbiAgdG9KU09OKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy50b0lTT1N0cmluZygpO1xyXG4gIH1cclxuXHJcbiAgdG9EYXRlKCk6IERhdGUge1xyXG4gICAgcmV0dXJuIG5ldyBEYXRlKHRoaXMudmFsdWVPZigpKTtcclxuICB9XHJcblxyXG4gIHRvT2JqZWN0KCk6IHtba2V5IGluIE1vbWVudFVuaXRPZlRpbWVdPzogbnVtYmVyfSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAvLyB5ZWFyczogZ2V0RnVsbFllYXIodGhpcy5fZGF0ZSwgdGhpcy5faXNVVEMpLFxyXG4gICAgICAvLyBtb250aHM6IGdldE1vbnRoKHRoaXMuX2RhdGUsIHRoaXMuX2lzVVRDKSxcclxuXHJcbiAgICAgIHllYXI6IGdldEZ1bGxZZWFyKHRoaXMuX2RhdGUsIHRoaXMuX2lzVVRDKSxcclxuICAgICAgbW9udGg6IGdldE1vbnRoKHRoaXMuX2RhdGUsIHRoaXMuX2lzVVRDKSxcclxuICAgICAgZGF0ZTogZ2V0RGF0ZSh0aGlzLl9kYXRlLCB0aGlzLl9pc1VUQyksXHJcbiAgICAgIGhvdXJzOiBnZXRIb3Vycyh0aGlzLl9kYXRlLCB0aGlzLl9pc1VUQyksXHJcbiAgICAgIG1pbnV0ZXM6IGdldE1pbnV0ZXModGhpcy5fZGF0ZSwgdGhpcy5faXNVVEMpLFxyXG4gICAgICBzZWNvbmRzOiBnZXRTZWNvbmRzKHRoaXMuX2RhdGUsIHRoaXMuX2lzVVRDKSxcclxuICAgICAgbWlsbGlzZWNvbmRzOiBnZXRNaWxsaXNlY29uZHModGhpcy5fZGF0ZSwgdGhpcy5faXNVVEMpXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgdG9BcnJheSgpOiBEYXRlQXJyYXkge1xyXG4gICAgcmV0dXJuIFt0aGlzLnllYXIoKSwgdGhpcy5tb250aCgpLCB0aGlzLmRhdGUoKSwgdGhpcy5ob3VyKCksIHRoaXMubWludXRlKCksIHRoaXMuc2Vjb25kKCksIHRoaXMubWlsbGlzZWNvbmQoKV07XHJcbiAgfVxyXG5cclxuXHJcbiAgLy8gRGF0ZXMgYm9vbGVhbiBhbGdlYnJhXHJcblxyXG4gIGlzQWZ0ZXIoZGF0ZTogS2hyb25vcywgdW5pdD86IE1vbWVudFVuaXRPZlRpbWUpOiBib29sZWFuIHtcclxuICAgIGNvbnN0IF91bml0ID0gdW5pdCA/IG1hcFVuaXRPZlRpbWUodW5pdCkgOiB2b2lkIDA7XHJcblxyXG4gICAgcmV0dXJuIGlzQWZ0ZXIodGhpcy5fZGF0ZSwgZGF0ZS50b0RhdGUoKSwgX3VuaXQpO1xyXG4gIH1cclxuXHJcbiAgaXNCZWZvcmUoZGF0ZTogS2hyb25vcywgdW5pdD86IE1vbWVudFVuaXRPZlRpbWUpOiBib29sZWFuIHtcclxuICAgIGNvbnN0IF91bml0ID0gdW5pdCA/IG1hcFVuaXRPZlRpbWUodW5pdCkgOiB2b2lkIDA7XHJcblxyXG4gICAgcmV0dXJuIGlzQmVmb3JlKHRoaXMudG9EYXRlKCksIGRhdGUudG9EYXRlKCksIF91bml0KTtcclxuICB9XHJcblxyXG4gIGlzQmV0d2Vlbihmcm9tOiBLaHJvbm9zLCB0bzogS2hyb25vcywgdW5pdD86IE1vbWVudFVuaXRPZlRpbWUsIGluY2x1c2l2aXR5Pzogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICBjb25zdCBfdW5pdCA9IHVuaXQgPyBtYXBVbml0T2ZUaW1lKHVuaXQpIDogdm9pZCAwO1xyXG5cclxuICAgIHJldHVybiBpc0JldHdlZW4odGhpcy50b0RhdGUoKSwgZnJvbS50b0RhdGUoKSwgdG8udG9EYXRlKCksIF91bml0LCBpbmNsdXNpdml0eSk7XHJcbiAgfVxyXG5cclxuICBpc1NhbWUoZGF0ZTogS2hyb25vcywgdW5pdD86IE1vbWVudFVuaXRPZlRpbWUpOiBib29sZWFuIHtcclxuICAgIGNvbnN0IF91bml0ID0gdW5pdCA/IG1hcFVuaXRPZlRpbWUodW5pdCkgOiB2b2lkIDA7XHJcblxyXG4gICAgcmV0dXJuIGlzU2FtZSh0aGlzLl9kYXRlLCBkYXRlLnRvRGF0ZSgpLCBfdW5pdCk7XHJcbiAgfVxyXG5cclxuICBpc1NhbWVPckFmdGVyKGRhdGU6IEtocm9ub3MsIHVuaXQ/OiBNb21lbnRVbml0T2ZUaW1lKTogYm9vbGVhbiB7XHJcbiAgICBjb25zdCBfdW5pdCA9IHVuaXQgPyBtYXBVbml0T2ZUaW1lKHVuaXQpIDogdm9pZCAwO1xyXG5cclxuICAgIHJldHVybiBpc1NhbWVPckFmdGVyKHRoaXMuX2RhdGUsIGRhdGUudG9EYXRlKCksIF91bml0KTtcclxuICB9XHJcblxyXG4gIGlzU2FtZU9yQmVmb3JlKGRhdGU6IEtocm9ub3MsIHVuaXQ/OiBNb21lbnRVbml0T2ZUaW1lKTogYm9vbGVhbiB7XHJcbiAgICBjb25zdCBfdW5pdCA9IHVuaXQgPyBtYXBVbml0T2ZUaW1lKHVuaXQpIDogdm9pZCAwO1xyXG5cclxuICAgIHJldHVybiBpc1NhbWVPckJlZm9yZSh0aGlzLl9kYXRlLCBkYXRlLnRvRGF0ZSgpLCBfdW5pdCk7XHJcbiAgfVxyXG5cclxuICBpc1ZhbGlkKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIGlzRGF0ZVZhbGlkKHRoaXMuX2RhdGUpO1xyXG4gIH1cclxuXHJcbiAgdmFsdWVPZigpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuX2RhdGUudmFsdWVPZigpIC0gKCh0aGlzLl9vZmZzZXQgfHwgMCkgKiA2MDAwMCk7XHJcbiAgfVxyXG5cclxuICB1bml4KCk6IG51bWJlciB7XHJcbiAgICAvLyByZXR1cm4gZ2V0VW5peFRpbWUodGhpcy5fZGF0ZSk7XHJcbiAgICByZXR1cm4gTWF0aC5mbG9vcih0aGlzLnZhbHVlT2YoKSAvIDEwMDApO1xyXG4gIH1cclxuXHJcblxyXG4gIC8vIE9mZnNldFxyXG5cclxuICB1dGNPZmZzZXQoKTogbnVtYmVyO1xyXG4gIHV0Y09mZnNldChiOiBudW1iZXIgfCBzdHJpbmcsIGtlZXBMb2NhbFRpbWU/OiBib29sZWFuKTogS2hyb25vcztcclxuICB1dGNPZmZzZXQoYj86IG51bWJlciB8IHN0cmluZywga2VlcExvY2FsVGltZT86IGJvb2xlYW4pOiBudW1iZXIgfCBLaHJvbm9zIHtcclxuICAgIGNvbnN0IF9jb25maWcgPSB0aGlzLl90b0NvbmZpZygpO1xyXG5cclxuICAgIGlmICghYiAmJiBiICE9PSAwKSB7XHJcbiAgICAgIHJldHVybiBnZXRVVENPZmZzZXQodGhpcy5fZGF0ZSwgX2NvbmZpZyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fZGF0ZSA9IHNldFVUQ09mZnNldCh0aGlzLl9kYXRlLCBiLCBrZWVwTG9jYWxUaW1lLCBmYWxzZSwgX2NvbmZpZyk7XHJcblxyXG4gICAgdGhpcy5fb2Zmc2V0ID0gX2NvbmZpZy5fb2Zmc2V0O1xyXG4gICAgdGhpcy5faXNVVEMgPSBfY29uZmlnLl9pc1VUQztcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIHV0YyhrZWVwTG9jYWxUaW1lPzogYm9vbGVhbik6IEtocm9ub3Mge1xyXG4gICAgcmV0dXJuIHRoaXMudXRjT2Zmc2V0KDAsIGtlZXBMb2NhbFRpbWUpO1xyXG4gIH1cclxuXHJcbiAgbG9jYWwoa2VlcExvY2FsVGltZT86IGJvb2xlYW4pOiBLaHJvbm9zIHtcclxuICAgIGlmICh0aGlzLl9pc1VUQykge1xyXG4gICAgICB0aGlzLnV0Y09mZnNldCgwLCBrZWVwTG9jYWxUaW1lKTtcclxuICAgICAgdGhpcy5faXNVVEMgPSBmYWxzZTtcclxuXHJcbiAgICAgIGlmIChrZWVwTG9jYWxUaW1lKSB7XHJcbiAgICAgICAgdGhpcy5zdWJ0cmFjdChnZXREYXRlT2Zmc2V0KHRoaXMuX2RhdGUpLCAnbScpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBwYXJzZVpvbmUoaW5wdXQ/OiBzdHJpbmcpOiBLaHJvbm9zIHtcclxuICAgIGNvbnN0IF9jb25maWcgPSB0aGlzLl90b0NvbmZpZygpO1xyXG4gICAgdGhpcy5fZGF0ZSA9IHNldE9mZnNldFRvUGFyc2VkT2Zmc2V0KHRoaXMuX2RhdGUsIGlucHV0LCBfY29uZmlnKTtcclxuXHJcbiAgICB0aGlzLl9vZmZzZXQgPSBfY29uZmlnLl9vZmZzZXQ7XHJcbiAgICB0aGlzLl9pc1VUQyA9IF9jb25maWcuX2lzVVRDO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgaGFzQWxpZ25lZEhvdXJPZmZzZXQoaW5wdXQ/OiBLaHJvbm9zKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gaGFzQWxpZ25lZEhvdXJPZmZzZXQodGhpcy5fZGF0ZSwgaW5wdXQgPyBpbnB1dC5fZGF0ZSA6IHZvaWQgMCk7XHJcbiAgfVxyXG5cclxuICBpc0RTVCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiBpc0RheWxpZ2h0U2F2aW5nVGltZSh0aGlzLl9kYXRlKTtcclxuICB9XHJcblxyXG4gIGlzTG9jYWwoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gIXRoaXMuX2lzVVRDO1xyXG4gIH1cclxuXHJcbiAgaXNVdGNPZmZzZXQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5faXNVVEM7XHJcbiAgfVxyXG5cclxuICBpc1VUQygpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLmlzVXRjKCk7XHJcbiAgfVxyXG5cclxuICBpc1V0YygpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl9pc1VUQyAmJiB0aGlzLl9vZmZzZXQgPT09IDA7XHJcbiAgfVxyXG5cclxuICAvLyBUaW1lem9uZVxyXG5cclxuICB6b25lQWJicigpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIGdldFpvbmVBYmJyKHRoaXMuX2lzVVRDKTtcclxuICB9XHJcblxyXG4gIHpvbmVOYW1lKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gZ2V0Wm9uZU5hbWUodGhpcy5faXNVVEMpO1xyXG4gIH1cclxuXHJcbiAgLy8gWWVhclxyXG5cclxuICB5ZWFyKCk6IG51bWJlcjtcclxuICB5ZWFyKHllYXI6IG51bWJlcik6IEtocm9ub3M7XHJcbiAgeWVhcih5ZWFyPzogbnVtYmVyKTogS2hyb25vcyB8IG51bWJlciB7XHJcbiAgICBpZiAoIXllYXIgJiYgeWVhciAhPT0gMCkge1xyXG4gICAgICByZXR1cm4gZ2V0RnVsbFllYXIodGhpcy5fZGF0ZSwgdGhpcy5faXNVVEMpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX2RhdGUgPSBjbG9uZURhdGUoc2V0RnVsbFllYXIodGhpcy5fZGF0ZSwgeWVhcikpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgd2Vla1llYXIoKTogbnVtYmVyO1xyXG4gIHdlZWtZZWFyKHZhbDogbnVtYmVyKTogS2hyb25vcztcclxuICB3ZWVrWWVhcih2YWw/OiBudW1iZXIpOiBLaHJvbm9zIHwgbnVtYmVyIHtcclxuICAgIGlmICghdmFsICYmIHZhbCAhPT0gMCkge1xyXG4gICAgICByZXR1cm4gZ2V0V2Vla1llYXIodGhpcy5fZGF0ZSwgdGhpcy5fbG9jYWxlLCB0aGlzLmlzVVRDKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGRhdGUgPSBnZXRTZXRXZWVrWWVhcih0aGlzLl9kYXRlLCB2YWwsIHRoaXMuX2xvY2FsZSwgdGhpcy5pc1VUQygpKTtcclxuICAgIGlmIChpc0RhdGUoZGF0ZSkpIHtcclxuICAgICAgdGhpcy5fZGF0ZSA9IGRhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBpc29XZWVrWWVhcigpOiBudW1iZXIgO1xyXG4gIGlzb1dlZWtZZWFyKHZhbDogbnVtYmVyKTogS2hyb25vcyA7XHJcbiAgaXNvV2Vla1llYXIodmFsPzogbnVtYmVyKTogS2hyb25vcyB8IG51bWJlciB7XHJcbiAgICBpZiAoIXZhbCAmJiB2YWwgIT09IDApIHtcclxuICAgICAgcmV0dXJuIGdldElTT1dlZWtZZWFyKHRoaXMuX2RhdGUsIHRoaXMuaXNVVEMoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZGF0ZSA9IGdldFNldElTT1dlZWtZZWFyKHRoaXMuX2RhdGUsIHZhbCwgdGhpcy5pc1V0YygpKTtcclxuXHJcbiAgICBpZiAoaXNEYXRlKGRhdGUpKSB7XHJcbiAgICAgIHRoaXMuX2RhdGUgPSBkYXRlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgaXNMZWFwWWVhcigpOiBib29sZWFuIHtcclxuICAgIHJldHVybiBpc0xlYXBZZWFyKGdldEZ1bGxZZWFyKHRoaXMudG9EYXRlKCksIHRoaXMuaXNVVEMoKSkpO1xyXG4gIH1cclxuXHJcbiAgLy8gTW9udGhcclxuXHJcbiAgbW9udGgoKTogbnVtYmVyO1xyXG4gIG1vbnRoKG1vbnRoOiBudW1iZXIgfCBzdHJpbmcpOiBLaHJvbm9zO1xyXG4gIG1vbnRoKG1vbnRoPzogbnVtYmVyIHwgc3RyaW5nKTogS2hyb25vcyB8IG51bWJlciB7XHJcbiAgICBpZiAoIW1vbnRoICYmIG1vbnRoICE9PSAwKSB7XHJcbiAgICAgIHJldHVybiBnZXRNb250aCh0aGlzLl9kYXRlLCB0aGlzLl9pc1VUQyk7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IF9tb250aCA9IG1vbnRoO1xyXG5cclxuICAgIGlmIChpc1N0cmluZyhtb250aCkpIHtcclxuICAgICAgY29uc3QgbG9jYWxlID0gdGhpcy5fbG9jYWxlIHx8IGdldExvY2FsZSgpO1xyXG4gICAgICBfbW9udGggPSBsb2NhbGUubW9udGhzUGFyc2UobW9udGgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChpc051bWJlcihfbW9udGgpKSB7XHJcbiAgICAgIHRoaXMuX2RhdGUgPSBjbG9uZURhdGUoc2V0TW9udGgodGhpcy5fZGF0ZSwgX21vbnRoLCB0aGlzLl9pc1VUQykpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqIEBkZXByZWNhdGVkICovXHJcbiAgaG91cigpOiBudW1iZXI7XHJcbiAgaG91cihob3VyczogbnVtYmVyKTogS2hyb25vcztcclxuICBob3VyKGhvdXJzPzogbnVtYmVyKTogS2hyb25vcyB8IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5ob3Vycyhob3Vycyk7XHJcbiAgfVxyXG5cclxuICBob3VycygpOiBudW1iZXI7XHJcbiAgaG91cnMoaG91cnM6IG51bWJlcik6IEtocm9ub3M7XHJcbiAgaG91cnMoaG91cnM/OiBudW1iZXIpOiBLaHJvbm9zIHwgbnVtYmVyIHtcclxuICAgIGlmICghaG91cnMgJiYgaG91cnMgIT09IDApIHtcclxuICAgICAgcmV0dXJuIGdldEhvdXJzKHRoaXMuX2RhdGUsIHRoaXMuX2lzVVRDKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9kYXRlID0gY2xvbmVEYXRlKHNldEhvdXJzKHRoaXMuX2RhdGUsIGhvdXJzLCB0aGlzLl9pc1VUQykpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqIEBkZXByZWNhdGVkICovXHJcbiAgbWludXRlKCk6IG51bWJlcjtcclxuICBtaW51dGUobWludXRlczogbnVtYmVyKTogS2hyb25vcztcclxuICBtaW51dGUobWludXRlcz86IG51bWJlcik6IEtocm9ub3MgfCBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMubWludXRlcyhtaW51dGVzKTtcclxuICB9XHJcblxyXG4gIG1pbnV0ZXMoKTogbnVtYmVyO1xyXG4gIG1pbnV0ZXMobWludXRlczogbnVtYmVyKTogS2hyb25vcztcclxuICBtaW51dGVzKG1pbnV0ZXM/OiBudW1iZXIpOiBLaHJvbm9zIHwgbnVtYmVyIHtcclxuICAgIGlmICghbWludXRlcyAmJiBtaW51dGVzICE9PSAwKSB7XHJcbiAgICAgIHJldHVybiBnZXRNaW51dGVzKHRoaXMuX2RhdGUsIHRoaXMuX2lzVVRDKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9kYXRlID0gY2xvbmVEYXRlKHNldE1pbnV0ZXModGhpcy5fZGF0ZSwgbWludXRlcywgdGhpcy5faXNVVEMpKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKiBAZGVwcmVjYXRlZCAqL1xyXG4gIHNlY29uZCgpOiBudW1iZXI7XHJcbiAgc2Vjb25kKHNlY29uZHM6IG51bWJlcik6IEtocm9ub3M7XHJcbiAgc2Vjb25kKHNlY29uZHM/OiBudW1iZXIpOiBLaHJvbm9zIHwgbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLnNlY29uZHMoc2Vjb25kcyk7XHJcbiAgfVxyXG5cclxuICBzZWNvbmRzKCk6IG51bWJlcjtcclxuICBzZWNvbmRzKHNlY29uZHM6IG51bWJlcik6IEtocm9ub3M7XHJcbiAgc2Vjb25kcyhzZWNvbmRzPzogbnVtYmVyKTogS2hyb25vcyB8IG51bWJlciB7XHJcbiAgICBpZiAoIXNlY29uZHMgJiYgc2Vjb25kcyAhPT0gMCkge1xyXG4gICAgICByZXR1cm4gZ2V0U2Vjb25kcyh0aGlzLl9kYXRlLCB0aGlzLl9pc1VUQyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fZGF0ZSA9IGNsb25lRGF0ZShzZXRTZWNvbmRzKHRoaXMuX2RhdGUsIHNlY29uZHMsIHRoaXMuX2lzVVRDKSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKiogQGRlcHJlY2F0ZWQgKi9cclxuICBtaWxsaXNlY29uZCgpOiBudW1iZXI7XHJcbiAgbWlsbGlzZWNvbmQobXM6IG51bWJlcik6IEtocm9ub3M7XHJcbiAgbWlsbGlzZWNvbmQobXM/OiBudW1iZXIpOiBLaHJvbm9zIHwgbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLm1pbGxpc2Vjb25kcyhtcyk7XHJcbiAgfVxyXG5cclxuICBtaWxsaXNlY29uZHMoKTogbnVtYmVyO1xyXG4gIG1pbGxpc2Vjb25kcyhzZWNvbmRzOiBudW1iZXIpOiBLaHJvbm9zO1xyXG4gIG1pbGxpc2Vjb25kcyhzZWNvbmRzPzogbnVtYmVyKTogS2hyb25vcyB8IG51bWJlciB7XHJcbiAgICBpZiAoIXNlY29uZHMgJiYgc2Vjb25kcyAhPT0gMCkge1xyXG4gICAgICByZXR1cm4gZ2V0TWlsbGlzZWNvbmRzKHRoaXMuX2RhdGUsIHRoaXMuX2lzVVRDKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9kYXRlID0gY2xvbmVEYXRlKHNldE1pbGxpc2Vjb25kcyh0aGlzLl9kYXRlLCBzZWNvbmRzLCB0aGlzLl9pc1VUQykpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLy8gRGF5XHJcblxyXG4gIGRhdGUoKTogbnVtYmVyO1xyXG4gIGRhdGUoZGF0ZTogbnVtYmVyKTogS2hyb25vcztcclxuICBkYXRlKGRhdGU/OiBudW1iZXIpOiBLaHJvbm9zIHwgbnVtYmVyIHtcclxuICAgIGlmICghZGF0ZSAmJiBkYXRlICE9PSAwKSB7XHJcbiAgICAgIHJldHVybiBnZXREYXRlKHRoaXMuX2RhdGUsIHRoaXMuX2lzVVRDKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9kYXRlID0gY2xvbmVEYXRlKHNldERhdGUodGhpcy5fZGF0ZSwgZGF0ZSwgdGhpcy5faXNVVEMpKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIGRheSgpOiBudW1iZXIgO1xyXG4gIGRheShpbnB1dDogbnVtYmVyIHwgc3RyaW5nKTogS2hyb25vcyA7XHJcbiAgZGF5KGlucHV0PzogbnVtYmVyIHwgc3RyaW5nKTogS2hyb25vcyB8IG51bWJlciB7XHJcbiAgICBpZiAoIWlucHV0ICYmIGlucHV0ICE9PSAwKSB7XHJcbiAgICAgIHJldHVybiBnZXREYXlPZldlZWsodGhpcy5fZGF0ZSwgdGhpcy5faXNVVEMpO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBfaW5wdXQgPSBpbnB1dDtcclxuXHJcbiAgICBpZiAoaXNTdHJpbmcoaW5wdXQpKSB7XHJcbiAgICAgIF9pbnB1dCA9IHBhcnNlV2Vla2RheShpbnB1dCwgdGhpcy5fbG9jYWxlKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoaXNOdW1iZXIoX2lucHV0KSkge1xyXG4gICAgICB0aGlzLl9kYXRlID0gc2V0RGF5T2ZXZWVrKHRoaXMuX2RhdGUsIF9pbnB1dCwgdGhpcy5fbG9jYWxlLCB0aGlzLl9pc1VUQyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICB3ZWVrZGF5KCk6IG51bWJlciA7XHJcbiAgd2Vla2RheSh2YWw6IG51bWJlcik6IEtocm9ub3MgO1xyXG4gIHdlZWtkYXkodmFsPzogbnVtYmVyKTogS2hyb25vcyB8IG51bWJlciB7XHJcbiAgICBpZiAoIXZhbCAmJiB2YWwgIT09IDApIHtcclxuICAgICAgcmV0dXJuIGdldExvY2FsZURheU9mV2Vlayh0aGlzLl9kYXRlLCB0aGlzLl9sb2NhbGUsIHRoaXMuX2lzVVRDKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9kYXRlID0gc2V0TG9jYWxlRGF5T2ZXZWVrKHRoaXMuX2RhdGUsIHZhbCwgeyBsb2NhbGU6IHRoaXMuX2xvY2FsZSwgaXNVVEM6IHRoaXMuX2lzVVRDIH0pO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgaXNvV2Vla2RheSgpOiBudW1iZXIgO1xyXG4gIGlzb1dlZWtkYXkodmFsOiBudW1iZXIgfCBzdHJpbmcpOiBLaHJvbm9zIDtcclxuICBpc29XZWVrZGF5KHZhbD86IG51bWJlciB8IHN0cmluZyk6IEtocm9ub3MgfCBudW1iZXIge1xyXG4gICAgaWYgKCF2YWwgJiYgdmFsICE9PSAwKSB7XHJcbiAgICAgIHJldHVybiBnZXRJU09EYXlPZldlZWsodGhpcy5fZGF0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fZGF0ZSA9IHNldElTT0RheU9mV2Vlayh0aGlzLl9kYXRlLCB2YWwpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgZGF5T2ZZZWFyKCk6IG51bWJlcjtcclxuICBkYXlPZlllYXIodmFsOiBudW1iZXIpOiBLaHJvbm9zO1xyXG4gIGRheU9mWWVhcih2YWw/OiBudW1iZXIpOiBLaHJvbm9zIHwgbnVtYmVyIHtcclxuICAgIGlmICghdmFsICYmIHZhbCAhPT0gMCkge1xyXG4gICAgICByZXR1cm4gZ2V0RGF5T2ZZZWFyKHRoaXMuX2RhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX2RhdGUgPSBzZXREYXlPZlllYXIodGhpcy5fZGF0ZSwgdmFsKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8vIFdlZWtcclxuXHJcbiAgd2VlaygpOiBudW1iZXI7XHJcbiAgd2VlayhpbnB1dDogbnVtYmVyKTogS2hyb25vcztcclxuICB3ZWVrKGlucHV0PzogbnVtYmVyKTogS2hyb25vcyB8IG51bWJlciB7XHJcbiAgICBpZiAoIWlucHV0ICYmIGlucHV0ICE9PSAwKSB7XHJcbiAgICAgIHJldHVybiBnZXRXZWVrKHRoaXMuX2RhdGUsIHRoaXMuX2xvY2FsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fZGF0ZSA9IHNldFdlZWsodGhpcy5fZGF0ZSwgaW5wdXQsIHRoaXMuX2xvY2FsZSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKiogQGRlcHJlY2F0ZWQgKi9cclxuICB3ZWVrcygpOiBudW1iZXI7XHJcbiAgd2Vla3MoaW5wdXQ6IG51bWJlcik6IEtocm9ub3M7XHJcbiAgd2Vla3MoaW5wdXQ/OiBudW1iZXIpOiBLaHJvbm9zIHwgbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLndlZWsoaW5wdXQpO1xyXG4gIH1cclxuXHJcbiAgaXNvV2VlaygpOiBudW1iZXIgO1xyXG4gIGlzb1dlZWsodmFsOiBudW1iZXIpOiBLaHJvbm9zIDtcclxuICBpc29XZWVrKHZhbD86IG51bWJlcik6IEtocm9ub3MgfCBudW1iZXIge1xyXG4gICAgaWYgKCF2YWwgJiYgdmFsICE9PSAwKSB7XHJcbiAgICAgIHJldHVybiBnZXRJU09XZWVrKHRoaXMuX2RhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX2RhdGUgPSBzZXRJU09XZWVrKHRoaXMuX2RhdGUsIHZhbCk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKiogQGRlcHJlY2F0ZWQgKi9cclxuICBpc29XZWVrcygpOiBudW1iZXIgO1xyXG4gIGlzb1dlZWtzKHZhbDogbnVtYmVyKTogS2hyb25vcyA7XHJcbiAgaXNvV2Vla3ModmFsPzogbnVtYmVyKTogS2hyb25vcyB8IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5pc29XZWVrKHZhbCk7XHJcbiAgfVxyXG5cclxuICB3ZWVrc0luWWVhcigpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIGdldFdlZWtzSW5ZZWFyKHRoaXMuX2RhdGUsIHRoaXMuX2lzVVRDLCB0aGlzLl9sb2NhbGUpO1xyXG4gIH1cclxuXHJcbiAgaXNvV2Vla3NJblllYXIoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiBnZXRJU09XZWVrc0luWWVhcih0aGlzLl9kYXRlLCB0aGlzLl9pc1VUQyk7XHJcbiAgfVxyXG5cclxuXHJcbiAgZGF5c0luTW9udGgoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiBkYXlzSW5Nb250aChnZXRGdWxsWWVhcih0aGlzLl9kYXRlLCB0aGlzLl9pc1VUQyksIGdldE1vbnRoKHRoaXMuX2RhdGUsIHRoaXMuX2lzVVRDKSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgcXVhcnRlcigpOiBudW1iZXI7XHJcbiAgcXVhcnRlcih2YWw6IG51bWJlcik6IEtocm9ub3M7XHJcbiAgcXVhcnRlcih2YWw/OiBudW1iZXIpOiBLaHJvbm9zIHwgbnVtYmVyIHtcclxuICAgIGlmICghdmFsICYmIHZhbCAhPT0gMCkge1xyXG4gICAgICByZXR1cm4gZ2V0UXVhcnRlcih0aGlzLl9kYXRlLCB0aGlzLl9pc1VUQyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fZGF0ZSA9IHNldFF1YXJ0ZXIodGhpcy5fZGF0ZSwgdmFsLCB0aGlzLl9pc1VUQyk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKiogQGRlcHJlY2F0ZWQgKi9cclxuICBxdWFydGVycygpOiBudW1iZXI7XHJcbiAgcXVhcnRlcnModmFsOiBudW1iZXIpOiBLaHJvbm9zO1xyXG4gIHF1YXJ0ZXJzKHZhbD86IG51bWJlcik6IEtocm9ub3MgfCBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMucXVhcnRlcih2YWwpO1xyXG4gIH1cclxuXHJcbiAgc3RhcnRPZihwZXJpb2Q/OiBNb21lbnRVbml0T2ZUaW1lKTogS2hyb25vcyB7XHJcbiAgICBjb25zdCBfcGVyID0gbWFwVW5pdE9mVGltZShwZXJpb2QpO1xyXG4gICAgdGhpcy5fZGF0ZSA9IHN0YXJ0T2YodGhpcy5fZGF0ZSwgX3BlciwgdGhpcy5faXNVVEMpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbn1cclxuIl19