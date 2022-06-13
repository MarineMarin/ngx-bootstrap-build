// internal storage for locale config files
import { Locale } from './locale.class';
import { baseConfig } from './locale.defaults';
import { hasOwnProp, isArray, isObject, isString, isUndefined, toInt } from '../utils/type-checks';
import { compareArrays } from '../utils/compare-arrays';
import { initWeek } from '../units/week';
import { initWeekYear } from '../units/week-year';
import { initYear } from '../units/year';
import { initTimezone } from '../units/timezone';
import { initTimestamp } from '../units/timestamp';
import { initSecond } from '../units/second';
import { initQuarter } from '../units/quarter';
import { initOffset } from '../units/offset';
import { initMinute } from '../units/minute';
import { initMillisecond } from '../units/millisecond';
import { initMonth } from '../units/month';
import { initHour } from '../units/hour';
import { initDayOfYear } from '../units/day-of-year';
import { initDayOfWeek } from '../units/day-of-week';
import { initDayOfMonth } from '../units/day-of-month';
const locales = {};
const localeFamilies = {};
let globalLocale;
function normalizeLocale(key) {
    return key ? key.toLowerCase().replace('_', '-') : key;
}
// pick the locale from the array
// try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
// substring from most specific to least,
// but move to the next array item if it's a more specific variant than the current root
function chooseLocale(names) {
    let next;
    let locale;
    let i = 0;
    while (i < names.length) {
        const split = normalizeLocale(names[i]).split('-');
        let j = split.length;
        next = normalizeLocale(names[i + 1]);
        next = next ? next.split('-') : null;
        while (j > 0) {
            locale = loadLocale(split.slice(0, j).join('-'));
            if (locale) {
                return locale;
            }
            if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                // the next array item is better than a shallower substring of this one
                break;
            }
            j--;
        }
        i++;
    }
    return null;
}
export function mergeConfigs(parentConfig, childConfig) {
    const res = Object.assign({}, parentConfig);
    for (const childProp in childConfig) {
        if (!hasOwnProp(childConfig, childProp)) {
            continue;
        }
        if (isObject(parentConfig[childProp]) && isObject(childConfig[childProp])) {
            res[childProp] = {};
            Object.assign(res[childProp], parentConfig[childProp]);
            Object.assign(res[childProp], childConfig[childProp]);
        }
        else if (childConfig[childProp] != null) {
            res[childProp] = childConfig[childProp];
        }
        else {
            delete res[childProp];
        }
    }
    for (const parentProp in parentConfig) {
        if (hasOwnProp(parentConfig, parentProp) &&
            !hasOwnProp(childConfig, parentProp) &&
            isObject(parentConfig[parentProp])) {
            // make sure changes to properties don't modify parent config
            res[parentProp] = Object.assign({}, res[parentProp]);
        }
    }
    return res;
}
function loadLocale(name) {
    // no way!
    /* var oldLocale = null;
     // TODO: Find a better way to register and load all the locales in Node
     if (!locales[name] && (typeof module !== 'undefined') &&
       module && module.exports) {
       try {
         oldLocale = globalLocale._abbr;
         var aliasedRequire = require;
         aliasedRequire('./locale/' + name);
         getSetGlobalLocale(oldLocale);
       } catch (e) {}
     }*/
    if (!locales[name]) {
        console.error(`Khronos locale error: please load locale "${name}" before using it`);
        // throw new Error(`Khronos locale error: please load locale "${name}" before using it`);
    }
    return locales[name];
}
// This function will load locale and then set the global locale.  If
// no arguments are passed in, it will simply return the current global
// locale key.
export function getSetGlobalLocale(key, values) {
    let data;
    if (key) {
        if (isUndefined(values)) {
            data = getLocale(key);
        }
        else if (isString(key)) {
            data = defineLocale(key, values);
        }
        if (data) {
            globalLocale = data;
        }
    }
    return globalLocale && globalLocale._abbr;
}
export function defineLocale(name, config) {
    if (config === null) {
        // useful for testing
        delete locales[name];
        globalLocale = getLocale('en');
        return null;
    }
    if (!config) {
        return;
    }
    let parentConfig = baseConfig;
    config.abbr = name;
    if (config.parentLocale != null) {
        if (locales[config.parentLocale] != null) {
            parentConfig = locales[config.parentLocale]._config;
        }
        else {
            if (!localeFamilies[config.parentLocale]) {
                localeFamilies[config.parentLocale] = [];
            }
            localeFamilies[config.parentLocale].push({ name, config });
            return null;
        }
    }
    locales[name] = new Locale(mergeConfigs(parentConfig, config));
    if (localeFamilies[name]) {
        localeFamilies[name].forEach(function (x) {
            defineLocale(x.name, x.config);
        });
    }
    // backwards compat for now: also set the locale
    // make sure we set the locale AFTER all child locales have been
    // created, so we won't end up with the child locale set.
    getSetGlobalLocale(name);
    return locales[name];
}
export function updateLocale(name, config) {
    let _config = config;
    if (_config != null) {
        let parentConfig = baseConfig;
        // MERGE
        const tmpLocale = loadLocale(name);
        if (tmpLocale != null) {
            parentConfig = tmpLocale._config;
        }
        _config = mergeConfigs(parentConfig, _config);
        const locale = new Locale(_config);
        locale.parentLocale = locales[name];
        locales[name] = locale;
        // backwards compat for now: also set the locale
        getSetGlobalLocale(name);
    }
    else {
        // pass null for config to unupdate, useful for tests
        if (locales[name] != null) {
            if (locales[name].parentLocale != null) {
                locales[name] = locales[name].parentLocale;
            }
            else if (locales[name] != null) {
                delete locales[name];
            }
        }
    }
    return locales[name];
}
// returns locale data
export function getLocale(key) {
    setDefaultLocale();
    if (!key) {
        return globalLocale;
    }
    // let locale;
    const _key = isArray(key) ? key : [key];
    return chooseLocale(_key);
}
export function listLocales() {
    return Object.keys(locales);
}
function setDefaultLocale() {
    if (locales[`en`]) {
        return undefined;
    }
    getSetGlobalLocale('en', {
        dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal(num) {
            const b = num % 10;
            const output = toInt((num % 100) / 10) === 1
                ? 'th'
                : b === 1 ? 'st' : b === 2 ? 'nd' : b === 3 ? 'rd' : 'th';
            return num + output;
        }
    });
    initWeek();
    initWeekYear();
    initYear();
    initTimezone();
    initTimestamp();
    initSecond();
    initQuarter();
    initOffset();
    initMonth();
    initMinute();
    initMillisecond();
    initHour();
    initDayOfYear();
    initDayOfWeek();
    initDayOfMonth();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jaHJvbm9zL2xvY2FsZS9sb2NhbGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDJDQUEyQztBQUMzQyxPQUFPLEVBQUUsTUFBTSxFQUFjLE1BQU0sZ0JBQWdCLENBQUM7QUFDcEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ25HLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUV4RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDbkQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsYUFBYSxFQUFF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Q0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBRTlELE9BQU8sR0FBRyxHQUFHLE1BQU0sQ0FBQztRQUN0QixDQUFDO0tBQ0YsQ0FBQyxDQUFDO0lBRUgsUUFBUSxFQUFFLENBQUM7SUFDWCxZQUFZLEVBQUUsQ0FBQztJQUNmLFFBQVEsRUFBRSxDQUFDO0lBQ1gsWUFBWSxFQUFFLENBQUM7SUFDZixhQUFhLEVBQUUsQ0FBQztJQUNoQixVQUFVLEVBQUUsQ0FBQztJQUNiLFdBQVcsRUFBRSxDQUFDO0lBQ2QsVUFBVSxFQUFFLENBQUM7SUFDYixTQUFTLEVBQUUsQ0FBQztJQUNaLFVBQVUsRUFBRSxDQUFDO0lBQ2IsZUFBZSxFQUFFLENBQUM7SUFDbEIsUUFBUSxFQUFFLENBQUM7SUFDWCxhQUFhLEVBQUUsQ0FBQztJQUNoQixhQUFhLEVBQUUsQ0FBQztJQUNoQixjQUFjLEVBQUUsQ0FBQztBQUNuQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaW50ZXJuYWwgc3RvcmFnZSBmb3IgbG9jYWxlIGNvbmZpZyBmaWxlc1xyXG5pbXBvcnQgeyBMb2NhbGUsIExvY2FsZURhdGEgfSBmcm9tICcuL2xvY2FsZS5jbGFzcyc7XHJcbmltcG9ydCB7IGJhc2VDb25maWcgfSBmcm9tICcuL2xvY2FsZS5kZWZhdWx0cyc7XHJcbmltcG9ydCB7IGhhc093blByb3AsIGlzQXJyYXksIGlzT2JqZWN0LCBpc1N0cmluZywgaXNVbmRlZmluZWQsIHRvSW50IH0gZnJvbSAnLi4vdXRpbHMvdHlwZS1jaGVja3MnO1xyXG5pbXBvcnQgeyBjb21wYXJlQXJyYXlzIH0gZnJvbSAnLi4vdXRpbHMvY29tcGFyZS1hcnJheXMnO1xyXG5cclxuaW1wb3J0IHsgaW5pdFdlZWsgfSBmcm9tICcuLi91bml0cy93ZWVrJztcclxuaW1wb3J0IHsgaW5pdFdlZWtZZWFyIH0gZnJvbSAnLi4vdW5pdHMvd2Vlay15ZWFyJztcclxuaW1wb3J0IHsgaW5pdFllYXIgfSBmcm9tICcuLi91bml0cy95ZWFyJztcclxuaW1wb3J0IHsgaW5pdFRpbWV6b25lIH0gZnJvbSAnLi4vdW5pdHMvdGltZXpvbmUnO1xyXG5pbXBvcnQgeyBpbml0VGltZXN0YW1wIH0gZnJvbSAnLi4vdW5pdHMvdGltZXN0YW1wJztcclxuaW1wb3J0IHsgaW5pdFNlY29uZCB9IGZyb20gJy4uL3VuaXRzL3NlY29uZCc7XHJcbmltcG9ydCB7IGluaXRRdWFydGVyIH0gZnJvbSAnLi4vdW5pdHMvcXVhcnRlcic7XHJcbmltcG9ydCB7IGluaXRPZmZzZXQgfSBmcm9tICcuLi91bml0cy9vZmZzZXQnO1xyXG5pbXBvcnQgeyBpbml0TWludXRlIH0gZnJvbSAnLi4vdW5pdHMvbWludXRlJztcclxuaW1wb3J0IHsgaW5pdE1pbGxpc2Vjb25kIH0gZnJvbSAnLi4vdW5pdHMvbWlsbGlzZWNvbmQnO1xyXG5pbXBvcnQgeyBpbml0TW9udGggfSBmcm9tICcuLi91bml0cy9tb250aCc7XHJcbmltcG9ydCB7IGluaXRIb3VyIH0gZnJvbSAnLi4vdW5pdHMvaG91cic7XHJcbmltcG9ydCB7IGluaXREYXlPZlllYXIgfSBmcm9tICcuLi91bml0cy9kYXktb2YteWVhcic7XHJcbmltcG9ydCB7IGluaXREYXlPZldlZWsgfSBmcm9tICcuLi91bml0cy9kYXktb2Ytd2Vlayc7XHJcbmltcG9ydCB7IGluaXREYXlPZk1vbnRoIH0gZnJvbSAnLi4vdW5pdHMvZGF5LW9mLW1vbnRoJztcclxuXHJcbmNvbnN0IGxvY2FsZXM6IHsgW2tleTogc3RyaW5nXTogTG9jYWxlIH0gPSB7fTtcclxuY29uc3QgbG9jYWxlRmFtaWxpZXM6IHsgW2tleTogc3RyaW5nXToge25hbWU6IHN0cmluZzsgY29uZmlnOiBMb2NhbGVEYXRhfVtdIH0gPSB7fTtcclxubGV0IGdsb2JhbExvY2FsZTogTG9jYWxlO1xyXG5cclxuZnVuY3Rpb24gbm9ybWFsaXplTG9jYWxlKGtleTogc3RyaW5nKTogc3RyaW5nIHtcclxuICByZXR1cm4ga2V5ID8ga2V5LnRvTG93ZXJDYXNlKCkucmVwbGFjZSgnXycsICctJykgOiBrZXk7XHJcbn1cclxuXHJcbi8vIHBpY2sgdGhlIGxvY2FsZSBmcm9tIHRoZSBhcnJheVxyXG4vLyB0cnkgWydlbi1hdScsICdlbi1nYiddIGFzICdlbi1hdScsICdlbi1nYicsICdlbicsIGFzIGluIG1vdmUgdGhyb3VnaCB0aGUgbGlzdCB0cnlpbmcgZWFjaFxyXG4vLyBzdWJzdHJpbmcgZnJvbSBtb3N0IHNwZWNpZmljIHRvIGxlYXN0LFxyXG4vLyBidXQgbW92ZSB0byB0aGUgbmV4dCBhcnJheSBpdGVtIGlmIGl0J3MgYSBtb3JlIHNwZWNpZmljIHZhcmlhbnQgdGhhbiB0aGUgY3VycmVudCByb290XHJcbmZ1bmN0aW9uIGNob29zZUxvY2FsZShuYW1lczogc3RyaW5nW10pOiBMb2NhbGUge1xyXG4gIGxldCBuZXh0O1xyXG4gIGxldCBsb2NhbGU7XHJcbiAgbGV0IGkgPSAwO1xyXG5cclxuICB3aGlsZSAoaSA8IG5hbWVzLmxlbmd0aCkge1xyXG4gICAgY29uc3Qgc3BsaXQgPSBub3JtYWxpemVMb2NhbGUobmFtZXNbaV0pLnNwbGl0KCctJyk7XHJcbiAgICBsZXQgaiA9IHNwbGl0Lmxlbmd0aDtcclxuICAgIG5leHQgPSBub3JtYWxpemVMb2NhbGUobmFtZXNbaSArIDFdKTtcclxuICAgIG5leHQgPSBuZXh0ID8gbmV4dC5zcGxpdCgnLScpIDogbnVsbDtcclxuICAgIHdoaWxlIChqID4gMCkge1xyXG4gICAgICBsb2NhbGUgPSBsb2FkTG9jYWxlKHNwbGl0LnNsaWNlKDAsIGopLmpvaW4oJy0nKSk7XHJcbiAgICAgIGlmIChsb2NhbGUpIHtcclxuICAgICAgICByZXR1cm4gbG9jYWxlO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChuZXh0ICYmIG5leHQubGVuZ3RoID49IGogJiYgY29tcGFyZUFycmF5cyhzcGxpdCwgbmV4dCwgdHJ1ZSkgPj0gaiAtIDEpIHtcclxuICAgICAgICAvLyB0aGUgbmV4dCBhcnJheSBpdGVtIGlzIGJldHRlciB0aGFuIGEgc2hhbGxvd2VyIHN1YnN0cmluZyBvZiB0aGlzIG9uZVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGotLTtcclxuICAgIH1cclxuICAgIGkrKztcclxuICB9XHJcblxyXG4gIHJldHVybiBudWxsO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VDb25maWdzKHBhcmVudENvbmZpZzogTG9jYWxlRGF0YSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZENvbmZpZzogTG9jYWxlRGF0YSkge1xyXG4gIGNvbnN0IHJlczogTG9jYWxlRGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIHBhcmVudENvbmZpZyk7XHJcblxyXG4gIGZvciAoY29uc3QgY2hpbGRQcm9wIGluIGNoaWxkQ29uZmlnKSB7XHJcbiAgICBpZiAoIWhhc093blByb3AoY2hpbGRDb25maWcsIGNoaWxkUHJvcCkpIHtcclxuICAgICAgY29udGludWU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGlzT2JqZWN0KHBhcmVudENvbmZpZ1tjaGlsZFByb3BdKSAmJiBpc09iamVjdChjaGlsZENvbmZpZ1tjaGlsZFByb3BdKSkge1xyXG4gICAgICByZXNbY2hpbGRQcm9wIGFzIGFueV0gPSB7fTtcclxuICAgICAgT2JqZWN0LmFzc2lnbihyZXNbY2hpbGRQcm9wXSwgcGFyZW50Q29uZmlnW2NoaWxkUHJvcF0pO1xyXG4gICAgICBPYmplY3QuYXNzaWduKHJlc1tjaGlsZFByb3BdLCBjaGlsZENvbmZpZ1tjaGlsZFByb3BdKTtcclxuICAgIH0gZWxzZSBpZiAoY2hpbGRDb25maWdbY2hpbGRQcm9wXSAhPSBudWxsKSB7XHJcbiAgICAgIHJlc1tjaGlsZFByb3AgYXMgYW55XSA9IGNoaWxkQ29uZmlnW2NoaWxkUHJvcF07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkZWxldGUgcmVzW2NoaWxkUHJvcCBhcyBhbnldO1xyXG4gICAgfVxyXG4gIH1cclxuICBmb3IgKGNvbnN0IHBhcmVudFByb3AgaW4gcGFyZW50Q29uZmlnKSB7XHJcbiAgICBpZiAoXHJcbiAgICAgIGhhc093blByb3AocGFyZW50Q29uZmlnLCBwYXJlbnRQcm9wKSAmJlxyXG4gICAgICAhaGFzT3duUHJvcChjaGlsZENvbmZpZywgcGFyZW50UHJvcCkgJiZcclxuICAgICAgaXNPYmplY3QocGFyZW50Q29uZmlnW3BhcmVudFByb3AgYXMga2V5b2YgTG9jYWxlRGF0YV0pXHJcbiAgICApIHtcclxuICAgICAgLy8gbWFrZSBzdXJlIGNoYW5nZXMgdG8gcHJvcGVydGllcyBkb24ndCBtb2RpZnkgcGFyZW50IGNvbmZpZ1xyXG4gICAgICByZXNbcGFyZW50UHJvcCBhcyBhbnldID0gT2JqZWN0LmFzc2lnbih7fSwgcmVzW3BhcmVudFByb3AgYXMga2V5b2YgTG9jYWxlRGF0YV0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHJlcztcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIGxvYWRMb2NhbGUobmFtZTogc3RyaW5nKTogTG9jYWxlIHtcclxuICAvLyBubyB3YXkhXHJcbiAgLyogdmFyIG9sZExvY2FsZSA9IG51bGw7XHJcbiAgIC8vIFRPRE86IEZpbmQgYSBiZXR0ZXIgd2F5IHRvIHJlZ2lzdGVyIGFuZCBsb2FkIGFsbCB0aGUgbG9jYWxlcyBpbiBOb2RlXHJcbiAgIGlmICghbG9jYWxlc1tuYW1lXSAmJiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcpICYmXHJcbiAgICAgbW9kdWxlICYmIG1vZHVsZS5leHBvcnRzKSB7XHJcbiAgICAgdHJ5IHtcclxuICAgICAgIG9sZExvY2FsZSA9IGdsb2JhbExvY2FsZS5fYWJicjtcclxuICAgICAgIHZhciBhbGlhc2VkUmVxdWlyZSA9IHJlcXVpcmU7XHJcbiAgICAgICBhbGlhc2VkUmVxdWlyZSgnLi9sb2NhbGUvJyArIG5hbWUpO1xyXG4gICAgICAgZ2V0U2V0R2xvYmFsTG9jYWxlKG9sZExvY2FsZSk7XHJcbiAgICAgfSBjYXRjaCAoZSkge31cclxuICAgfSovXHJcbiAgaWYgKCFsb2NhbGVzW25hbWVdKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKGBLaHJvbm9zIGxvY2FsZSBlcnJvcjogcGxlYXNlIGxvYWQgbG9jYWxlIFwiJHtuYW1lfVwiIGJlZm9yZSB1c2luZyBpdGApO1xyXG4gICAgLy8gdGhyb3cgbmV3IEVycm9yKGBLaHJvbm9zIGxvY2FsZSBlcnJvcjogcGxlYXNlIGxvYWQgbG9jYWxlIFwiJHtuYW1lfVwiIGJlZm9yZSB1c2luZyBpdGApO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGxvY2FsZXNbbmFtZV07XHJcbn1cclxuXHJcbi8vIFRoaXMgZnVuY3Rpb24gd2lsbCBsb2FkIGxvY2FsZSBhbmQgdGhlbiBzZXQgdGhlIGdsb2JhbCBsb2NhbGUuICBJZlxyXG4vLyBubyBhcmd1bWVudHMgYXJlIHBhc3NlZCBpbiwgaXQgd2lsbCBzaW1wbHkgcmV0dXJuIHRoZSBjdXJyZW50IGdsb2JhbFxyXG4vLyBsb2NhbGUga2V5LlxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2V0R2xvYmFsTG9jYWxlKGtleT86IHN0cmluZyB8IHN0cmluZ1tdLCB2YWx1ZXM/OiBMb2NhbGVEYXRhKTogc3RyaW5nIHtcclxuICBsZXQgZGF0YTogTG9jYWxlO1xyXG5cclxuICBpZiAoa2V5KSB7XHJcbiAgICBpZiAoaXNVbmRlZmluZWQodmFsdWVzKSkge1xyXG4gICAgICBkYXRhID0gZ2V0TG9jYWxlKGtleSk7XHJcbiAgICB9IGVsc2UgaWYgKGlzU3RyaW5nKGtleSkpIHtcclxuICAgICAgZGF0YSA9IGRlZmluZUxvY2FsZShrZXksIHZhbHVlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGRhdGEpIHtcclxuICAgICAgZ2xvYmFsTG9jYWxlID0gZGF0YTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiBnbG9iYWxMb2NhbGUgJiYgZ2xvYmFsTG9jYWxlLl9hYmJyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZGVmaW5lTG9jYWxlKG5hbWU6IHN0cmluZywgY29uZmlnPzogTG9jYWxlRGF0YSk6IExvY2FsZSB7XHJcbiAgaWYgKGNvbmZpZyA9PT0gbnVsbCkge1xyXG4gICAgLy8gdXNlZnVsIGZvciB0ZXN0aW5nXHJcbiAgICBkZWxldGUgbG9jYWxlc1tuYW1lXTtcclxuICAgIGdsb2JhbExvY2FsZSA9IGdldExvY2FsZSgnZW4nKTtcclxuXHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIGlmICghY29uZmlnKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICBsZXQgcGFyZW50Q29uZmlnID0gYmFzZUNvbmZpZztcclxuICBjb25maWcuYWJiciA9IG5hbWU7XHJcbiAgaWYgKGNvbmZpZy5wYXJlbnRMb2NhbGUgIT0gbnVsbCkge1xyXG4gICAgaWYgKGxvY2FsZXNbY29uZmlnLnBhcmVudExvY2FsZV0gIT0gbnVsbCkge1xyXG4gICAgICBwYXJlbnRDb25maWcgPSBsb2NhbGVzW2NvbmZpZy5wYXJlbnRMb2NhbGVdLl9jb25maWc7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoIWxvY2FsZUZhbWlsaWVzW2NvbmZpZy5wYXJlbnRMb2NhbGVdKSB7XHJcbiAgICAgICAgbG9jYWxlRmFtaWxpZXNbY29uZmlnLnBhcmVudExvY2FsZV0gPSBbXTtcclxuICAgICAgfVxyXG4gICAgICBsb2NhbGVGYW1pbGllc1tjb25maWcucGFyZW50TG9jYWxlXS5wdXNoKHsgbmFtZSwgY29uZmlnIH0pO1xyXG5cclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBsb2NhbGVzW25hbWVdID0gbmV3IExvY2FsZShtZXJnZUNvbmZpZ3MocGFyZW50Q29uZmlnLCBjb25maWcpKTtcclxuXHJcbiAgaWYgKGxvY2FsZUZhbWlsaWVzW25hbWVdKSB7XHJcbiAgICBsb2NhbGVGYW1pbGllc1tuYW1lXS5mb3JFYWNoKGZ1bmN0aW9uICh4KSB7XHJcbiAgICAgIGRlZmluZUxvY2FsZSh4Lm5hbWUsIHguY29uZmlnKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLy8gYmFja3dhcmRzIGNvbXBhdCBmb3Igbm93OiBhbHNvIHNldCB0aGUgbG9jYWxlXHJcbiAgLy8gbWFrZSBzdXJlIHdlIHNldCB0aGUgbG9jYWxlIEFGVEVSIGFsbCBjaGlsZCBsb2NhbGVzIGhhdmUgYmVlblxyXG4gIC8vIGNyZWF0ZWQsIHNvIHdlIHdvbid0IGVuZCB1cCB3aXRoIHRoZSBjaGlsZCBsb2NhbGUgc2V0LlxyXG4gIGdldFNldEdsb2JhbExvY2FsZShuYW1lKTtcclxuXHJcblxyXG4gIHJldHVybiBsb2NhbGVzW25hbWVdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlTG9jYWxlKG5hbWU6IHN0cmluZywgY29uZmlnPzogTG9jYWxlRGF0YSk6IExvY2FsZSB7XHJcbiAgbGV0IF9jb25maWcgPSBjb25maWc7XHJcblxyXG4gIGlmIChfY29uZmlnICE9IG51bGwpIHtcclxuICAgIGxldCBwYXJlbnRDb25maWcgPSBiYXNlQ29uZmlnO1xyXG4gICAgLy8gTUVSR0VcclxuICAgIGNvbnN0IHRtcExvY2FsZSA9IGxvYWRMb2NhbGUobmFtZSk7XHJcbiAgICBpZiAodG1wTG9jYWxlICE9IG51bGwpIHtcclxuICAgICAgcGFyZW50Q29uZmlnID0gdG1wTG9jYWxlLl9jb25maWc7XHJcbiAgICB9XHJcbiAgICBfY29uZmlnID0gbWVyZ2VDb25maWdzKHBhcmVudENvbmZpZywgX2NvbmZpZyk7XHJcbiAgICBjb25zdCBsb2NhbGUgPSBuZXcgTG9jYWxlKF9jb25maWcpO1xyXG4gICAgbG9jYWxlLnBhcmVudExvY2FsZSA9IGxvY2FsZXNbbmFtZV07XHJcbiAgICBsb2NhbGVzW25hbWVdID0gbG9jYWxlO1xyXG5cclxuICAgIC8vIGJhY2t3YXJkcyBjb21wYXQgZm9yIG5vdzogYWxzbyBzZXQgdGhlIGxvY2FsZVxyXG4gICAgZ2V0U2V0R2xvYmFsTG9jYWxlKG5hbWUpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICAvLyBwYXNzIG51bGwgZm9yIGNvbmZpZyB0byB1bnVwZGF0ZSwgdXNlZnVsIGZvciB0ZXN0c1xyXG4gICAgaWYgKGxvY2FsZXNbbmFtZV0gIT0gbnVsbCkge1xyXG4gICAgICBpZiAobG9jYWxlc1tuYW1lXS5wYXJlbnRMb2NhbGUgIT0gbnVsbCkge1xyXG4gICAgICAgIGxvY2FsZXNbbmFtZV0gPSBsb2NhbGVzW25hbWVdLnBhcmVudExvY2FsZTtcclxuICAgICAgfSBlbHNlIGlmIChsb2NhbGVzW25hbWVdICE9IG51bGwpIHtcclxuICAgICAgICBkZWxldGUgbG9jYWxlc1tuYW1lXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGxvY2FsZXNbbmFtZV07XHJcbn1cclxuXHJcbi8vIHJldHVybnMgbG9jYWxlIGRhdGFcclxuZXhwb3J0IGZ1bmN0aW9uIGdldExvY2FsZShrZXk/OiBzdHJpbmcgfCBzdHJpbmdbXSk6IExvY2FsZSB7XHJcbiAgc2V0RGVmYXVsdExvY2FsZSgpO1xyXG5cclxuICBpZiAoIWtleSkge1xyXG4gICAgcmV0dXJuIGdsb2JhbExvY2FsZTtcclxuICB9XHJcbiAgLy8gbGV0IGxvY2FsZTtcclxuICBjb25zdCBfa2V5ID0gaXNBcnJheShrZXkpID8ga2V5IDogW2tleV07XHJcblxyXG4gIHJldHVybiBjaG9vc2VMb2NhbGUoX2tleSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBsaXN0TG9jYWxlcygpOiBzdHJpbmdbXSB7XHJcbiAgcmV0dXJuIE9iamVjdC5rZXlzKGxvY2FsZXMpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZXREZWZhdWx0TG9jYWxlKCk6IHZvaWQge1xyXG4gIGlmIChsb2NhbGVzW2BlbmBdKSB7XHJcblxyXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIGdldFNldEdsb2JhbExvY2FsZSgnZW4nLCB7XHJcbiAgICBkYXlPZk1vbnRoT3JkaW5hbFBhcnNlOiAvXFxkezEsMn0odGh8c3R8bmR8cmQpLyxcclxuICAgIG9yZGluYWwobnVtOiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgICBjb25zdCBiID0gbnVtICUgMTA7XHJcbiAgICAgIGNvbnN0IG91dHB1dCA9XHJcbiAgICAgICAgdG9JbnQoKG51bSAlIDEwMCkgLyAxMCkgPT09IDFcclxuICAgICAgICAgID8gJ3RoJ1xyXG4gICAgICAgICAgOiBiID09PSAxID8gJ3N0JyA6IGIgPT09IDIgPyAnbmQnIDogYiA9PT0gMyA/ICdyZCcgOiAndGgnO1xyXG5cclxuICAgICAgcmV0dXJuIG51bSArIG91dHB1dDtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgaW5pdFdlZWsoKTtcclxuICBpbml0V2Vla1llYXIoKTtcclxuICBpbml0WWVhcigpO1xyXG4gIGluaXRUaW1lem9uZSgpO1xyXG4gIGluaXRUaW1lc3RhbXAoKTtcclxuICBpbml0U2Vjb25kKCk7XHJcbiAgaW5pdFF1YXJ0ZXIoKTtcclxuICBpbml0T2Zmc2V0KCk7XHJcbiAgaW5pdE1vbnRoKCk7XHJcbiAgaW5pdE1pbnV0ZSgpO1xyXG4gIGluaXRNaWxsaXNlY29uZCgpO1xyXG4gIGluaXRIb3VyKCk7XHJcbiAgaW5pdERheU9mWWVhcigpO1xyXG4gIGluaXREYXlPZldlZWsoKTtcclxuICBpbml0RGF5T2ZNb250aCgpO1xyXG59XHJcbiJdfQ==