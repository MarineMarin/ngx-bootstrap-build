import { daysInMonth } from '../units/month';
import { isNumber } from './type-checks';
import { getDate, getFullYear, getMonth } from './date-getters';
import { isLeapYear } from '../units/year';
import { createDate } from '../create/date-from-array';
const defaultTimeUnit = {
    year: 0,
    month: 0,
    day: 0,
    hour: 0,
    minute: 0,
    seconds: 0
};
export function shiftDate(date, unit) {
    const _unit = Object.assign({}, defaultTimeUnit, unit);
    const year = date.getFullYear() + (_unit.year || 0);
    const month = date.getMonth() + (_unit.month || 0);
    let day = date.getDate() + (_unit.day || 0);
    if (_unit.month && !_unit.day) {
        day = Math.min(day, daysInMonth(year, month));
    }
    return createDate(year, month, day, date.getHours() + (_unit.hour || 0), date.getMinutes() + (_unit.minute || 0), date.getSeconds() + (_unit.seconds || 0));
}
export function setFullDate(date, unit) {
    return createDate(getNum(date.getFullYear(), unit.year), getNum(date.getMonth(), unit.month), 1, // day, to avoid issue with wrong months selection at the end of current month (#5371)
    getNum(date.getHours(), unit.hour), getNum(date.getMinutes(), unit.minute), getNum(date.getSeconds(), unit.seconds), getNum(date.getMilliseconds(), unit.milliseconds));
}
function getNum(def, num) {
    return isNumber(num) ? num : def;
}
export function setFullYear(date, value, isUTC) {
    const _month = getMonth(date, isUTC);
    const _date = getDate(date, isUTC);
    const _year = getFullYear(date, isUTC);
    if (isLeapYear(_year) && _month === 1 && _date === 29) {
        const _daysInMonth = daysInMonth(value, _month);
        isUTC ? date.setUTCFullYear(value, _month, _daysInMonth) : date.setFullYear(value, _month, _daysInMonth);
    }
    isUTC ? date.setUTCFullYear(value) : date.setFullYear(value);
    return date;
}
export function setMonth(date, value, isUTC) {
    const dayOfMonth = Math.min(getDate(date), daysInMonth(getFullYear(date), value));
    isUTC ? date.setUTCMonth(value, dayOfMonth) : date.setMonth(value, dayOfMonth);
    return date;
}
export function setDay(date, value, isUTC) {
    isUTC ? date.setUTCDate(value) : date.setDate(value);
    return date;
}
export function setHours(date, value, isUTC) {
    isUTC ? date.setUTCHours(value) : date.setHours(value);
    return date;
}
export function setMinutes(date, value, isUTC) {
    isUTC ? date.setUTCMinutes(value) : date.setMinutes(value);
    return date;
}
export function setSeconds(date, value, isUTC) {
    isUTC ? date.setUTCSeconds(value) : date.setSeconds(value);
    return date;
}
export function setMilliseconds(date, value, isUTC) {
    isUTC ? date.setUTCMilliseconds(value) : date.setMilliseconds(value);
    return date;
}
export function setDate(date, value, isUTC) {
    isUTC ? date.setUTCDate(value) : date.setDate(value);
    return date;
}
export function setTime(date, value) {
    date.setTime(value);
    return date;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1zZXR0ZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2Nocm9ub3MvdXRpbHMvZGF0ZS1zZXR0ZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRXZELE1BQU0sZUFBZSxHQUFhO0lBQ2hDLElBQUksRUFBRSxDQUFDO0lBQ1AsS0FBSyxFQUFFLENBQUM7SUFDUixHQUFHLEVBQUUsQ0FBQztJQUNOLElBQUksRUFBRSxDQUFDO0lBQ1AsTUFBTSxFQUFFLENBQUM7SUFDVCxPQUFPLEVBQUUsQ0FBQztDQUNYLENBQUM7QUFFRixNQUFNLFVBQVUsU0FBUyxDQUFDLElBQVUsRUFBRSxJQUFjO0lBQ2xELE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLGVBQWUsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN2RCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3BELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDbkQsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUM1QyxJQUFJLEtBQUssQ0FBQyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFO1FBQzdCLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxXQUFXLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7S0FDL0M7SUFFRCxPQUFPLFVBQVUsQ0FDZixJQUFJLEVBQ0osS0FBSyxFQUNMLEdBQUcsRUFDSCxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUNuQyxJQUFJLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxFQUN2QyxJQUFJLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUN6QyxDQUFDO0FBQ0osQ0FBQztBQUVELE1BQU0sVUFBVSxXQUFXLENBQUMsSUFBVSxFQUFFLElBQWM7SUFDcEQsT0FBTyxVQUFVLENBQ2YsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQ3JDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUNuQyxDQUFDLEVBQUUsc0ZBQXNGO0lBQ3pGLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUNsQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsRUFDdEMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQ3ZDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUNsRCxDQUFDO0FBQ0osQ0FBQztBQUVELFNBQVMsTUFBTSxDQUFDLEdBQVcsRUFBRSxHQUFZO0lBQ3ZDLE9BQU8sUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztBQUNuQyxDQUFDO0FBRUQsTUFBTSxVQUFVLFdBQVcsQ0FBQyxJQUFVLEVBQUUsS0FBYSxFQUFFLEtBQWU7SUFDcEUsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNyQyxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ25DLE1BQU0sS0FBSyxHQUFHLFdBQVcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDdkMsSUFBSSxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksTUFBTSxLQUFLLENBQUMsSUFBSSxLQUFLLEtBQUssRUFBRSxFQUFFO1FBQ3JELE1BQU0sWUFBWSxHQUFHLFdBQVcsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDaEQsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLENBQUMsQ0FBQztLQUMxRztJQUVELEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUU3RCxPQUFPLElBQUksQ0FBQztBQUNkLENBQUM7QUFFRCxNQUFNLFVBQVUsUUFBUSxDQUFDLElBQVUsRUFBRSxLQUFhLEVBQUUsS0FBZTtJQUNqRSxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxXQUFXLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDbEYsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFFL0UsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDO0FBRUQsTUFBTSxVQUFVLE1BQU0sQ0FBQyxJQUFVLEVBQUUsS0FBYSxFQUFFLEtBQWU7SUFDL0QsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRXJELE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQztBQUVELE1BQU0sVUFBVSxRQUFRLENBQUMsSUFBVSxFQUFFLEtBQWEsRUFBRSxLQUFlO0lBQ2pFLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUV2RCxPQUFPLElBQUksQ0FBQztBQUNkLENBQUM7QUFFRCxNQUFNLFVBQVUsVUFBVSxDQUFDLElBQVUsRUFBRSxLQUFhLEVBQUUsS0FBZTtJQUNuRSxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFM0QsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDO0FBRUQsTUFBTSxVQUFVLFVBQVUsQ0FBQyxJQUFVLEVBQUUsS0FBYSxFQUFFLEtBQWU7SUFDbkUsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRTNELE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQztBQUVELE1BQU0sVUFBVSxlQUFlLENBQUMsSUFBVSxFQUFFLEtBQWEsRUFBRSxLQUFlO0lBQ3hFLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRXJFLE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQztBQUVELE1BQU0sVUFBVSxPQUFPLENBQUMsSUFBVSxFQUFFLEtBQWEsRUFBRSxLQUFlO0lBQ2hFLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUVyRCxPQUFPLElBQUksQ0FBQztBQUNkLENBQUM7QUFFRCxNQUFNLFVBQVUsT0FBTyxDQUFDLElBQVUsRUFBRSxLQUFhO0lBQy9DLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFcEIsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVGltZVVuaXQgfSBmcm9tICcuLi90eXBlcyc7XHJcbmltcG9ydCB7IGRheXNJbk1vbnRoIH0gZnJvbSAnLi4vdW5pdHMvbW9udGgnO1xyXG5pbXBvcnQgeyBpc051bWJlciB9IGZyb20gJy4vdHlwZS1jaGVja3MnO1xyXG5pbXBvcnQgeyBnZXREYXRlLCBnZXRGdWxsWWVhciwgZ2V0TW9udGggfSBmcm9tICcuL2RhdGUtZ2V0dGVycyc7XHJcbmltcG9ydCB7IGlzTGVhcFllYXIgfSBmcm9tICcuLi91bml0cy95ZWFyJztcclxuaW1wb3J0IHsgY3JlYXRlRGF0ZSB9IGZyb20gJy4uL2NyZWF0ZS9kYXRlLWZyb20tYXJyYXknO1xyXG5cclxuY29uc3QgZGVmYXVsdFRpbWVVbml0OiBUaW1lVW5pdCA9IHtcclxuICB5ZWFyOiAwLFxyXG4gIG1vbnRoOiAwLFxyXG4gIGRheTogMCxcclxuICBob3VyOiAwLFxyXG4gIG1pbnV0ZTogMCxcclxuICBzZWNvbmRzOiAwXHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2hpZnREYXRlKGRhdGU6IERhdGUsIHVuaXQ6IFRpbWVVbml0KTogRGF0ZSB7XHJcbiAgY29uc3QgX3VuaXQgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0VGltZVVuaXQsIHVuaXQpO1xyXG4gIGNvbnN0IHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCkgKyAoX3VuaXQueWVhciB8fCAwKTtcclxuICBjb25zdCBtb250aCA9IGRhdGUuZ2V0TW9udGgoKSArIChfdW5pdC5tb250aCB8fCAwKTtcclxuICBsZXQgZGF5ID0gZGF0ZS5nZXREYXRlKCkgKyAoX3VuaXQuZGF5IHx8IDApO1xyXG4gIGlmIChfdW5pdC5tb250aCAmJiAhX3VuaXQuZGF5KSB7XHJcbiAgICBkYXkgPSBNYXRoLm1pbihkYXksIGRheXNJbk1vbnRoKHllYXIsIG1vbnRoKSk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gY3JlYXRlRGF0ZShcclxuICAgIHllYXIsXHJcbiAgICBtb250aCxcclxuICAgIGRheSxcclxuICAgIGRhdGUuZ2V0SG91cnMoKSArIChfdW5pdC5ob3VyIHx8IDApLFxyXG4gICAgZGF0ZS5nZXRNaW51dGVzKCkgKyAoX3VuaXQubWludXRlIHx8IDApLFxyXG4gICAgZGF0ZS5nZXRTZWNvbmRzKCkgKyAoX3VuaXQuc2Vjb25kcyB8fCAwKVxyXG4gICk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRGdWxsRGF0ZShkYXRlOiBEYXRlLCB1bml0OiBUaW1lVW5pdCk6IERhdGUge1xyXG4gIHJldHVybiBjcmVhdGVEYXRlKFxyXG4gICAgZ2V0TnVtKGRhdGUuZ2V0RnVsbFllYXIoKSwgdW5pdC55ZWFyKSxcclxuICAgIGdldE51bShkYXRlLmdldE1vbnRoKCksIHVuaXQubW9udGgpLFxyXG4gICAgMSwgLy8gZGF5LCB0byBhdm9pZCBpc3N1ZSB3aXRoIHdyb25nIG1vbnRocyBzZWxlY3Rpb24gYXQgdGhlIGVuZCBvZiBjdXJyZW50IG1vbnRoICgjNTM3MSlcclxuICAgIGdldE51bShkYXRlLmdldEhvdXJzKCksIHVuaXQuaG91ciksXHJcbiAgICBnZXROdW0oZGF0ZS5nZXRNaW51dGVzKCksIHVuaXQubWludXRlKSxcclxuICAgIGdldE51bShkYXRlLmdldFNlY29uZHMoKSwgdW5pdC5zZWNvbmRzKSxcclxuICAgIGdldE51bShkYXRlLmdldE1pbGxpc2Vjb25kcygpLCB1bml0Lm1pbGxpc2Vjb25kcylcclxuICApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXROdW0oZGVmOiBudW1iZXIsIG51bT86IG51bWJlcik6IG51bWJlciB7XHJcbiAgcmV0dXJuIGlzTnVtYmVyKG51bSkgPyBudW0gOiBkZWY7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRGdWxsWWVhcihkYXRlOiBEYXRlLCB2YWx1ZTogbnVtYmVyLCBpc1VUQz86IGJvb2xlYW4pOiBEYXRlIHtcclxuICBjb25zdCBfbW9udGggPSBnZXRNb250aChkYXRlLCBpc1VUQyk7XHJcbiAgY29uc3QgX2RhdGUgPSBnZXREYXRlKGRhdGUsIGlzVVRDKTtcclxuICBjb25zdCBfeWVhciA9IGdldEZ1bGxZZWFyKGRhdGUsIGlzVVRDKTtcclxuICBpZiAoaXNMZWFwWWVhcihfeWVhcikgJiYgX21vbnRoID09PSAxICYmIF9kYXRlID09PSAyOSkge1xyXG4gICAgY29uc3QgX2RheXNJbk1vbnRoID0gZGF5c0luTW9udGgodmFsdWUsIF9tb250aCk7XHJcbiAgICBpc1VUQyA/IGRhdGUuc2V0VVRDRnVsbFllYXIodmFsdWUsIF9tb250aCwgX2RheXNJbk1vbnRoKSA6IGRhdGUuc2V0RnVsbFllYXIodmFsdWUsIF9tb250aCwgX2RheXNJbk1vbnRoKTtcclxuICB9XHJcblxyXG4gIGlzVVRDID8gZGF0ZS5zZXRVVENGdWxsWWVhcih2YWx1ZSkgOiBkYXRlLnNldEZ1bGxZZWFyKHZhbHVlKTtcclxuXHJcbiAgcmV0dXJuIGRhdGU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRNb250aChkYXRlOiBEYXRlLCB2YWx1ZTogbnVtYmVyLCBpc1VUQz86IGJvb2xlYW4pOiBEYXRlIHtcclxuICBjb25zdCBkYXlPZk1vbnRoID0gTWF0aC5taW4oZ2V0RGF0ZShkYXRlKSwgZGF5c0luTW9udGgoZ2V0RnVsbFllYXIoZGF0ZSksIHZhbHVlKSk7XHJcbiAgaXNVVEMgPyBkYXRlLnNldFVUQ01vbnRoKHZhbHVlLCBkYXlPZk1vbnRoKSA6IGRhdGUuc2V0TW9udGgodmFsdWUsIGRheU9mTW9udGgpO1xyXG5cclxuICByZXR1cm4gZGF0ZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNldERheShkYXRlOiBEYXRlLCB2YWx1ZTogbnVtYmVyLCBpc1VUQz86IGJvb2xlYW4pOiBEYXRlIHtcclxuICBpc1VUQyA/IGRhdGUuc2V0VVRDRGF0ZSh2YWx1ZSkgOiBkYXRlLnNldERhdGUodmFsdWUpO1xyXG5cclxuICByZXR1cm4gZGF0ZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNldEhvdXJzKGRhdGU6IERhdGUsIHZhbHVlOiBudW1iZXIsIGlzVVRDPzogYm9vbGVhbik6IERhdGUge1xyXG4gIGlzVVRDID8gZGF0ZS5zZXRVVENIb3Vycyh2YWx1ZSkgOiBkYXRlLnNldEhvdXJzKHZhbHVlKTtcclxuXHJcbiAgcmV0dXJuIGRhdGU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRNaW51dGVzKGRhdGU6IERhdGUsIHZhbHVlOiBudW1iZXIsIGlzVVRDPzogYm9vbGVhbik6IERhdGUge1xyXG4gIGlzVVRDID8gZGF0ZS5zZXRVVENNaW51dGVzKHZhbHVlKSA6IGRhdGUuc2V0TWludXRlcyh2YWx1ZSk7XHJcblxyXG4gIHJldHVybiBkYXRlO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0U2Vjb25kcyhkYXRlOiBEYXRlLCB2YWx1ZTogbnVtYmVyLCBpc1VUQz86IGJvb2xlYW4pOiBEYXRlIHtcclxuICBpc1VUQyA/IGRhdGUuc2V0VVRDU2Vjb25kcyh2YWx1ZSkgOiBkYXRlLnNldFNlY29uZHModmFsdWUpO1xyXG5cclxuICByZXR1cm4gZGF0ZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNldE1pbGxpc2Vjb25kcyhkYXRlOiBEYXRlLCB2YWx1ZTogbnVtYmVyLCBpc1VUQz86IGJvb2xlYW4pOiBEYXRlIHtcclxuICBpc1VUQyA/IGRhdGUuc2V0VVRDTWlsbGlzZWNvbmRzKHZhbHVlKSA6IGRhdGUuc2V0TWlsbGlzZWNvbmRzKHZhbHVlKTtcclxuXHJcbiAgcmV0dXJuIGRhdGU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXREYXRlKGRhdGU6IERhdGUsIHZhbHVlOiBudW1iZXIsIGlzVVRDPzogYm9vbGVhbik6IERhdGUge1xyXG4gIGlzVVRDID8gZGF0ZS5zZXRVVENEYXRlKHZhbHVlKSA6IGRhdGUuc2V0RGF0ZSh2YWx1ZSk7XHJcblxyXG4gIHJldHVybiBkYXRlO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0VGltZShkYXRlOiBEYXRlLCB2YWx1ZTogbnVtYmVyKTogRGF0ZSB7XHJcbiAgZGF0ZS5zZXRUaW1lKHZhbHVlKTtcclxuXHJcbiAgcmV0dXJuIGRhdGU7XHJcbn1cclxuIl19