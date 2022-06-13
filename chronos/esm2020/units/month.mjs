import { addFormatToken } from '../format/format';
import { isLeapYear } from './year';
import { mod } from '../utils';
import { getMonth } from '../utils/date-getters';
import { addRegexToken, match1to2, match2 } from '../parse/regex';
import { addParseToken } from '../parse/token';
import { MONTH } from './constants';
import { toInt } from '../utils/type-checks';
import { addUnitPriority } from './priorities';
import { addUnitAlias } from './aliases';
import { getParsingFlags } from '../create/parsing-flags';
// todo: this is duplicate, source in date-getters.ts
export function daysInMonth(year, month) {
    if (isNaN(year) || isNaN(month)) {
        return NaN;
    }
    const modMonth = mod(month, 12);
    const _year = year + (month - modMonth) / 12;
    return modMonth === 1
        ? isLeapYear(_year) ? 29 : 28
        : (31 - modMonth % 7 % 2);
}
export function initMonth() {
    // FORMATTING
    addFormatToken('M', ['MM', 2, false], 'Mo', function (date, opts) {
        return (getMonth(date, opts.isUTC) + 1).toString(10);
    });
    addFormatToken('MMM', null, null, function (date, opts) {
        return opts.locale.monthsShort(date, opts.format, opts.isUTC);
    });
    addFormatToken('MMMM', null, null, function (date, opts) {
        return opts.locale.months(date, opts.format, opts.isUTC);
    });
    // ALIASES
    addUnitAlias('month', 'M');
    // PRIORITY
    addUnitPriority('month', 8);
    // PARSING
    addRegexToken('M', match1to2);
    addRegexToken('MM', match1to2, match2);
    addRegexToken('MMM', function (isStrict, locale) {
        return locale.monthsShortRegex(isStrict);
    });
    addRegexToken('MMMM', function (isStrict, locale) {
        return locale.monthsRegex(isStrict);
    });
    addParseToken(['M', 'MM'], function (input, array, config) {
        array[MONTH] = toInt(input) - 1;
        return config;
    });
    addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
        const month = config._locale.monthsParse(input, token, config._strict);
        // if we didn't find a month name, mark the date as invalid.
        if (month != null) {
            array[MONTH] = month;
        }
        else {
            getParsingFlags(config).invalidMonth = !!input;
        }
        return config;
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9udGguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvY2hyb25vcy91bml0cy9tb250aC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDbEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUNwQyxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsYUFBYSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNsRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDL0MsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNwQyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDN0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUMvQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUkxRCxxREFBcUQ7QUFDckQsTUFBTSxVQUFVLFdBQVcsQ0FBQyxJQUFZLEVBQUUsS0FBYTtJQUNyRCxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDL0IsT0FBTyxHQUFHLENBQUM7S0FDWjtJQUNELE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDaEMsTUFBTSxLQUFLLEdBQUcsSUFBSSxHQUFHLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUU3QyxPQUFPLFFBQVEsS0FBSyxDQUFD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OlsiaW1wb3J0IHsgYWRkRm9ybWF0VG9rZW4gfSBmcm9tICcuLi9mb3JtYXQvZm9ybWF0JztcclxuaW1wb3J0IHsgaXNMZWFwWWVhciB9IGZyb20gJy4veWVhcic7XHJcbmltcG9ydCB7IG1vZCB9IGZyb20gJy4uL3V0aWxzJztcclxuaW1wb3J0IHsgZ2V0TW9udGggfSBmcm9tICcuLi91dGlscy9kYXRlLWdldHRlcnMnO1xyXG5pbXBvcnQgeyBhZGRSZWdleFRva2VuLCBtYXRjaDF0bzIsIG1hdGNoMiB9IGZyb20gJy4uL3BhcnNlL3JlZ2V4JztcclxuaW1wb3J0IHsgYWRkUGFyc2VUb2tlbiB9IGZyb20gJy4uL3BhcnNlL3Rva2VuJztcclxuaW1wb3J0IHsgTU9OVEggfSBmcm9tICcuL2NvbnN0YW50cyc7XHJcbmltcG9ydCB7IHRvSW50IH0gZnJvbSAnLi4vdXRpbHMvdHlwZS1jaGVja3MnO1xyXG5pbXBvcnQgeyBhZGRVbml0UHJpb3JpdHkgfSBmcm9tICcuL3ByaW9yaXRpZXMnO1xyXG5pbXBvcnQgeyBhZGRVbml0QWxpYXMgfSBmcm9tICcuL2FsaWFzZXMnO1xyXG5pbXBvcnQgeyBnZXRQYXJzaW5nRmxhZ3MgfSBmcm9tICcuLi9jcmVhdGUvcGFyc2luZy1mbGFncyc7XHJcbmltcG9ydCB7IERhdGVQYXJzaW5nQ29uZmlnIH0gZnJvbSAnLi4vY3JlYXRlL3BhcnNpbmcudHlwZXMnO1xyXG5pbXBvcnQgeyBEYXRlQXJyYXksIERhdGVGb3JtYXR0ZXJPcHRpb25zIH0gZnJvbSAnLi4vdHlwZXMnO1xyXG5cclxuLy8gdG9kbzogdGhpcyBpcyBkdXBsaWNhdGUsIHNvdXJjZSBpbiBkYXRlLWdldHRlcnMudHNcclxuZXhwb3J0IGZ1bmN0aW9uIGRheXNJbk1vbnRoKHllYXI6IG51bWJlciwgbW9udGg6IG51bWJlcik6IG51bWJlciB7XHJcbiAgaWYgKGlzTmFOKHllYXIpIHx8IGlzTmFOKG1vbnRoKSkge1xyXG4gICAgcmV0dXJuIE5hTjtcclxuICB9XHJcbiAgY29uc3QgbW9kTW9udGggPSBtb2QobW9udGgsIDEyKTtcclxuICBjb25zdCBfeWVhciA9IHllYXIgKyAobW9udGggLSBtb2RNb250aCkgLyAxMjtcclxuXHJcbiAgcmV0dXJuIG1vZE1vbnRoID09PSAxXHJcbiAgICA/IGlzTGVhcFllYXIoX3llYXIpID8gMjkgOiAyOFxyXG4gICAgOiAoMzEgLSBtb2RNb250aCAlIDcgJSAyKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGluaXRNb250aCgpIHtcclxuLy8gRk9STUFUVElOR1xyXG5cclxuICBhZGRGb3JtYXRUb2tlbignTScsIFsnTU0nLCAyLCBmYWxzZV0sICdNbycsXHJcbiAgICBmdW5jdGlvbihkYXRlOiBEYXRlLCBvcHRzOiBEYXRlRm9ybWF0dGVyT3B0aW9ucyk6IHN0cmluZyB7XHJcbiAgICAgIHJldHVybiAoZ2V0TW9udGgoZGF0ZSwgb3B0cy5pc1VUQykgKyAxKS50b1N0cmluZygxMCk7XHJcbiAgICB9XHJcbiAgKTtcclxuXHJcbiAgYWRkRm9ybWF0VG9rZW4oJ01NTScsIG51bGwsIG51bGwsXHJcbiAgICBmdW5jdGlvbihkYXRlOiBEYXRlLCBvcHRzOiBEYXRlRm9ybWF0dGVyT3B0aW9ucyk6IHN0cmluZyB7XHJcbiAgICAgIHJldHVybiBvcHRzLmxvY2FsZS5tb250aHNTaG9ydChkYXRlLCBvcHRzLmZvcm1hdCwgb3B0cy5pc1VUQyk7XHJcbiAgICB9XHJcbiAgKTtcclxuXHJcbiAgYWRkRm9ybWF0VG9rZW4oJ01NTU0nLCBudWxsLCBudWxsLFxyXG4gICAgZnVuY3Rpb24oZGF0ZTogRGF0ZSwgb3B0czogRGF0ZUZvcm1hdHRlck9wdGlvbnMpOiBzdHJpbmcge1xyXG4gICAgICByZXR1cm4gb3B0cy5sb2NhbGUubW9udGhzKGRhdGUsIG9wdHMuZm9ybWF0LCBvcHRzLmlzVVRDKTtcclxuICAgIH1cclxuICApO1xyXG5cclxuXHJcbi8vIEFMSUFTRVNcclxuXHJcbiAgYWRkVW5pdEFsaWFzKCdtb250aCcsICdNJyk7XHJcblxyXG4vLyBQUklPUklUWVxyXG5cclxuICBhZGRVbml0UHJpb3JpdHkoJ21vbnRoJywgOCk7XHJcblxyXG4vLyBQQVJTSU5HXHJcblxyXG4gIGFkZFJlZ2V4VG9rZW4oJ00nLCBtYXRjaDF0bzIpO1xyXG4gIGFkZFJlZ2V4VG9rZW4oJ01NJywgbWF0Y2gxdG8yLCBtYXRjaDIpO1xyXG4gIGFkZFJlZ2V4VG9rZW4oJ01NTScsIGZ1bmN0aW9uKGlzU3RyaWN0LCBsb2NhbGUpIHtcclxuICAgIHJldHVybiBsb2NhbGUubW9udGhzU2hvcnRSZWdleChpc1N0cmljdCk7XHJcbiAgfSk7XHJcbiAgYWRkUmVnZXhUb2tlbignTU1NTScsIGZ1bmN0aW9uKGlzU3RyaWN0LCBsb2NhbGUpIHtcclxuICAgIHJldHVybiBsb2NhbGUubW9udGhzUmVnZXgoaXNTdHJpY3QpO1xyXG4gIH0pO1xyXG5cclxuICBhZGRQYXJzZVRva2VuKFsnTScsICdNTSddLCBmdW5jdGlvbihpbnB1dDogc3RyaW5nLCBhcnJheTogRGF0ZUFycmF5LCBjb25maWc6IERhdGVQYXJzaW5nQ29uZmlnKTogRGF0ZVBhcnNpbmdDb25maWcge1xyXG4gICAgYXJyYXlbTU9OVEhdID0gdG9JbnQoaW5wdXQpIC0gMTtcclxuXHJcbiAgICByZXR1cm4gY29uZmlnO1xyXG4gIH0pO1xyXG5cclxuICBhZGRQYXJzZVRva2VuKFxyXG4gICAgWydNTU0nLCAnTU1NTSddLFxyXG4gICAgZnVuY3Rpb24oaW5wdXQ6IHN0cmluZywgYXJyYXk6IERhdGVBcnJheSwgY29uZmlnOiBEYXRlUGFyc2luZ0NvbmZpZywgdG9rZW46IHN0cmluZyk6IERhdGVQYXJzaW5nQ29uZmlnIHtcclxuICAgICAgY29uc3QgbW9udGggPSBjb25maWcuX2xvY2FsZS5tb250aHNQYXJzZShpbnB1dCwgdG9rZW4sIGNvbmZpZy5fc3RyaWN0KTtcclxuICAgICAgLy8gaWYgd2UgZGlkbid0IGZpbmQgYSBtb250aCBuYW1lLCBtYXJrIHRoZSBkYXRlIGFzIGludmFsaWQuXHJcbiAgICAgIGlmIChtb250aCAhPSBudWxsKSB7XHJcbiAgICAgICAgYXJyYXlbTU9OVEhdID0gbW9udGg7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuaW52YWxpZE1vbnRoID0gISFpbnB1dDtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIGNvbmZpZztcclxuICAgIH1cclxuICApO1xyXG59XHJcbiJdfQ==