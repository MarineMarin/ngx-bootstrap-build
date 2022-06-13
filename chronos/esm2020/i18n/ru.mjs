import { getWeek } from '../units/week';
import { getDayOfWeek } from '../units/day-of-week';
//! moment.js locale configuration
//! locale : Russian [ru]
//! author : Viktorminator : https://github.com/Viktorminator
//! Author : Menelion Elensúle : https://github.com/Oire
//! author : Коренберг Марк : https://github.com/socketpair
function plural(word, num) {
    let forms = word.split('_');
    return num % 10 === 1 && num % 100 !== 11 ? forms[0] : (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? forms[1] : forms[2]);
}
function relativeTimeWithPlural(num, withoutSuffix, key) {
    let format = {
        ss: withoutSuffix ? 'секунда_секунды_секунд' : 'секунду_секунды_секунд',
        mm: withoutSuffix ? 'минута_минуты_минут' : 'минуту_минуты_минут',
        hh: 'час_часа_часов',
        dd: 'день_дня_дней',
        MM: 'месяц_месяца_месяцев',
        yy: 'год_года_лет'
    };
    if (key === 'm') {
        return withoutSuffix ? 'минута' : 'минуту';
    }
    return num + ' ' + plural(format[key], +num);
}
let monthsParse = [/^янв/i, /^фев/i, /^мар/i, /^апр/i, /^ма[йя]/i, /^июн/i, /^июл/i, /^авг/i, /^сен/i, /^окт/i, /^ноя/i, /^дек/i];
// http://new.gramota.ru/spravka/rules/139-prop : § 103
// Сокращения месяцев: http://new.gramota.ru/spravka/buro/search-answer?s=242637
// CLDR data:          http://www.unicode.org/cldr/charts/28/summary/ru.html#1753
export const ruLocale = {
    abbr: 'ru',
    months: {
        format: 'января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря'.split('_'),
        standalone: 'январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь'.split('_')
    },
    monthsShort: {
        // по CLDR именно "июл." и "июн.", но какой смысл менять букву на точку ?
        format: 'янв._февр._мар._апр._мая_июня_июля_авг._сент._окт._нояб._дек.'.split('_'),
        standalone: 'янв._февр._март_апр._май_июнь_июль_авг._сент._окт._нояб._дек.'.split('_')
    },
    weekdays: {
        standalone: 'воскресенье_понедельник_вторник_среда_четверг_пятница_суббота'.split('_'),
        format: 'воскресенье_понедельник_вторник_среду_четверг_пятницу_субботу'.split('_'),
        isFormat: /\[ ?[Вв] ?(?:прошлую|следующую|эту)? ?\] ?dddd/
    },
    weekdaysShort: 'вс_пн_вт_ср_чт_пт_сб'.split('_'),
    weekdaysMin: 'вс_пн_вт_ср_чт_пт_сб'.split('_'),
    monthsParse,
    longMonthsParse: monthsParse,
    shortMonthsParse: monthsParse,
    // полные названия с падежами, по три буквы, для некоторых, по 4 буквы, сокращения с точкой и без точки
    monthsRegex: /^(январ[ья]|янв\.?|феврал[ья]|февр?\.?|марта?|мар\.?|апрел[ья]|апр\.?|ма[йя]|июн[ья]|июн\.?|июл[ья]|июл\.?|августа?|авг\.?|сентябр[ья]|сент?\.?|октябр[ья]|окт\.?|ноябр[ья]|нояб?\.?|декабр[ья]|дек\.?)/i,
    // копия предыдущего
    monthsShortRegex: /^(январ[ья]|янв\.?|феврал[ья]|февр?\.?|марта?|мар\.?|апрел[ья]|апр\.?|ма[йя]|июн[ья]|июн\.?|июл[ья]|июл\.?|августа?|авг\.?|сентябр[ья]|сент?\.?|октябр[ья]|окт\.?|ноябр[ья]|нояб?\.?|декабр[ья]|дек\.?)/i,
    // полные названия с падежами
    monthsStrictRegex: /^(январ[яь]|феврал[яь]|марта?|апрел[яь]|ма[яй]|июн[яь]|июл[яь]|августа?|сентябр[яь]|октябр[яь]|ноябр[яь]|декабр[яь])/i,
    // Выражение, которое соотвествует только сокращённым формам
    monthsShortStrictRegex: /^(янв\.|февр?\.|мар[т.]|апр\.|ма[яй]|июн[ья.]|июл[ья.]|авг\.|сент?\.|окт\.|нояб?\.|дек\.)/i,
    longDateFormat: {
        LT: 'H:mm',
        LTS: 'H:mm:ss',
        L: 'DD.MM.YYYY',
        LL: 'D MMMM YYYY г.',
        LLL: 'D MMMM YYYY г., H:mm',
        LLLL: 'dddd, D MMMM YYYY г., H:mm'
    },
    calendar: {
        sameDay: '[Сегодня в] LT',
        nextDay: '[Завтра в] LT',
        lastDay: '[Вчера в] LT',
        nextWeek(date, now) {
            if (getWeek(now) !== getWeek(date)) {
                switch (getDayOfWeek(date)) {
                    case 0:
                        return '[В следующее] dddd [в] LT';
                    case 1:
                    case 2:
                    case 4:
                        return '[В следующий] dddd [в] LT';
                    case 3:
                    case 5:
                    case 6:
                        return '[В следующую] dddd [в] LT';
                }
            }
            else {
                if (getDayOfWeek(date) === 2) {
                    return '[Во] dddd [в] LT';
                }
                else {
                    return '[В] dddd [в] LT';
                }
            }
        },
        lastWeek(date, now) {
            if (getWeek(now) !== getWeek(date)) {
                switch (getDayOfWeek(date)) {
                    case 0:
                        return '[В прошлое] dddd [в] LT';
                    case 1:
                    case 2:
                    case 4:
                        return '[В прошлый] dddd [в] LT';
                    case 3:
                    case 5:
                    case 6:
                        return '[В прошлую] dddd [в] LT';
                }
            }
            else {
                if (getDayOfWeek(date) === 2) {
                    return '[Во] dddd [в] LT';
                }
                else {
                    return '[В] dddd [в] LT';
                }
            }
        },
        sameElse: 'L'
    },
    relativeTime: {
        future: 'через %s',
        past: '%s назад',
        s: 'несколько секунд',
        ss: relativeTimeWithPlural,
        m: relativeTimeWithPlural,
        mm: relativeTimeWithPlural,
        h: 'час',
        hh: relativeTimeWithPlural,
        d: 'день',
        dd: relativeTimeWithPlural,
        M: 'месяц',
        MM: relativeTimeWithPlural,
        y: 'год',
        yy: relativeTimeWithPlural
    },
    meridiemParse: /ночи|утра|дня|вечера/i,
    isPM(input) {
        return /^(дня|вечера)$/.test(input);
    },
    meridiem(hour, minute, isLower) {
        if (hour < 4) {
            return 'ночи';
        }
        else if (hour < 12) {
            return 'утра';
        }
        else if (hour < 17) {
            return 'дня';
        }
        else {
            return 'вечера';
        }
    },
    dayOfMonthOrdinalParse: /\d{1,2}-(й|го|я)/,
    ordinal(_num, period) {
        const num = Number(_num);
        switch (period) {
            case 'M':
            case 'd':
            case 'DDD':
                return num + '-й';
            case 'D':
                return num + '-го';
            case 'w':
            case 'W':
                return num + '-я';
            default:
                return num.toString(10);
        }
    },
    week: {
        dow: 1,
        doy: 4 // The week that contains Jan 4th is the first week of the year.
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvY2hyb25vcy9pMThuL3J1LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDeEMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXBELGtDQUFrQztBQUNsQyx5QkFBeUI7QUFDekIsNkRBQTZEO0FBQzdELHdEQUF3RDtBQUN4RCwyREFBMkQ7QUFFM0QsU0FBUyxNQUFNLENBQUMsSUFBWSxFQUFFLEdBQVc7SUFDdkMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM1QixPQUFPLEdBQUcsR0FBRyxFQUFFLEtBQUssQ0FBQyxJQUFJLEdBQUcsR0FBRyxHQUFHLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUUsSUFBSSxHQUFHLEdBQUcsR0FBRyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3ZKLENBQUM7QUFFRCxTQUFTLHNCQUFzQixDQUFDLEdBQVcsRUFBRSxhQUFzQixFQUFFLEdBQVc7SUFDOUUsSUFBSSxNQUFNLEdBQTRCO1FBQ3BDLEVBQUUsRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQyx3QkFBd0I7UUFDdkUsRUFBRSxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLHFCQUFxQjtRQUNq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TG9jYWxlRGF0YSB9IGZyb20gJy4uL2xvY2FsZS9sb2NhbGUuY2xhc3MnO1xyXG5pbXBvcnQgeyBnZXRXZWVrIH0gZnJvbSAnLi4vdW5pdHMvd2Vlayc7XHJcbmltcG9ydCB7IGdldERheU9mV2VlayB9IGZyb20gJy4uL3VuaXRzL2RheS1vZi13ZWVrJztcclxuXHJcbi8vISBtb21lbnQuanMgbG9jYWxlIGNvbmZpZ3VyYXRpb25cclxuLy8hIGxvY2FsZSA6IFJ1c3NpYW4gW3J1XVxyXG4vLyEgYXV0aG9yIDogVmlrdG9ybWluYXRvciA6IGh0dHBzOi8vZ2l0aHViLmNvbS9WaWt0b3JtaW5hdG9yXHJcbi8vISBBdXRob3IgOiBNZW5lbGlvbiBFbGVuc8O6bGUgOiBodHRwczovL2dpdGh1Yi5jb20vT2lyZVxyXG4vLyEgYXV0aG9yIDog0JrQvtGA0LXQvdCx0LXRgNCzINCc0LDRgNC6IDogaHR0cHM6Ly9naXRodWIuY29tL3NvY2tldHBhaXJcclxuXHJcbmZ1bmN0aW9uIHBsdXJhbCh3b3JkOiBzdHJpbmcsIG51bTogbnVtYmVyKTogc3RyaW5nIHtcclxuICBsZXQgZm9ybXMgPSB3b3JkLnNwbGl0KCdfJyk7XHJcbiAgcmV0dXJuIG51bSAlIDEwID09PSAxICYmIG51bSAlIDEwMCAhPT0gMTEgPyBmb3Jtc1swXSA6IChudW0gJSAxMCA+PSAyICYmIG51bSAlIDEwIDw9IDQgJiYgKG51bSAlIDEwMCA8IDEwIHx8IG51bSAlIDEwMCA+PSAyMCkgPyBmb3Jtc1sxXSA6IGZvcm1zWzJdKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVsYXRpdmVUaW1lV2l0aFBsdXJhbChudW06IG51bWJlciwgd2l0aG91dFN1ZmZpeDogYm9vbGVhbiwga2V5OiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gIGxldCBmb3JtYXQ6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9ID0ge1xyXG4gICAgc3M6IHdpdGhvdXRTdWZmaXggPyAn0YHQtdC60YPQvdC00LBf0YHQtdC60YPQvdC00Ytf0YHQtdC60YPQvdC0JyA6ICfRgdC10LrRg9C90LTRg1/RgdC10LrRg9C90LTRi1/RgdC10LrRg9C90LQnLFxyXG4gICAgbW06IHdpdGhvdXRTdWZmaXggPyAn0LzQuNC90YPRgtCwX9C80LjQvdGD0YLRi1/QvNC40L3Rg9GCJyA6ICfQvNC40L3Rg9GC0YNf0LzQuNC90YPRgtGLX9C80LjQvdGD0YInLFxyXG4gICAgaGg6ICfRh9Cw0YFf0YfQsNGB0LBf0YfQsNGB0L7QsicsXHJcbiAgICBkZDogJ9C00LXQvdGMX9C00L3Rj1/QtNC90LXQuScsXHJcbiAgICBNTTogJ9C80LXRgdGP0YZf0LzQtdGB0Y/RhtCwX9C80LXRgdGP0YbQtdCyJyxcclxuICAgIHl5OiAn0LPQvtC0X9Cz0L7QtNCwX9C70LXRgidcclxuICB9O1xyXG4gIGlmIChrZXkgPT09ICdtJykge1xyXG4gICAgcmV0dXJuIHdpdGhvdXRTdWZmaXggPyAn0LzQuNC90YPRgtCwJyA6ICfQvNC40L3Rg9GC0YMnO1xyXG4gIH1cclxuICByZXR1cm4gbnVtICsgJyAnICsgcGx1cmFsKGZvcm1hdFtrZXldLCArbnVtKTtcclxufVxyXG5cclxubGV0IG1vbnRoc1BhcnNlID0gWy9e0Y/QvdCyL2ksIC9e0YTQtdCyL2ksIC9e0LzQsNGAL2ksIC9e0LDQv9GAL2ksIC9e0LzQsFvQudGPXS9pLCAvXtC40Y7QvS9pLCAvXtC40Y7Quy9pLCAvXtCw0LLQsy9pLCAvXtGB0LXQvS9pLCAvXtC+0LrRgi9pLCAvXtC90L7Rjy9pLCAvXtC00LXQui9pXTtcclxuXHJcbi8vIGh0dHA6Ly9uZXcuZ3JhbW90YS5ydS9zcHJhdmthL3J1bGVzLzEzOS1wcm9wIDogwqcgMTAzXHJcbi8vINCh0L7QutGA0LDRidC10L3QuNGPINC80LXRgdGP0YbQtdCyOiBodHRwOi8vbmV3LmdyYW1vdGEucnUvc3ByYXZrYS9idXJvL3NlYXJjaC1hbnN3ZXI/cz0yNDI2MzdcclxuLy8gQ0xEUiBkYXRhOiAgICAgICAgICBodHRwOi8vd3d3LnVuaWNvZGUub3JnL2NsZHIvY2hhcnRzLzI4L3N1bW1hcnkvcnUuaHRtbCMxNzUzXHJcbmV4cG9ydCBjb25zdCBydUxvY2FsZTogTG9jYWxlRGF0YSA9IHtcclxuICBhYmJyOiAncnUnLFxyXG4gIG1vbnRoczoge1xyXG4gICAgZm9ybWF0OiAn0Y/QvdCy0LDRgNGPX9GE0LXQstGA0LDQu9GPX9C80LDRgNGC0LBf0LDQv9GA0LXQu9GPX9C80LDRj1/QuNGO0L3Rj1/QuNGO0LvRj1/QsNCy0LPRg9GB0YLQsF/RgdC10L3RgtGP0LHRgNGPX9C+0LrRgtGP0LHRgNGPX9C90L7Rj9Cx0YDRj1/QtNC10LrQsNCx0YDRjycuc3BsaXQoJ18nKSxcclxuICAgIHN0YW5kYWxvbmU6ICfRj9C90LLQsNGA0Yxf0YTQtdCy0YDQsNC70Yxf0LzQsNGA0YJf0LDQv9GA0LXQu9GMX9C80LDQuV/QuNGO0L3RjF/QuNGO0LvRjF/QsNCy0LPRg9GB0YJf0YHQtdC90YLRj9Cx0YDRjF/QvtC60YLRj9Cx0YDRjF/QvdC+0Y/QsdGA0Yxf0LTQtdC60LDQsdGA0YwnLnNwbGl0KCdfJylcclxuICB9LFxyXG4gIG1vbnRoc1Nob3J0OiB7XHJcbiAgICAvLyDQv9C+IENMRFIg0LjQvNC10L3QvdC+IFwi0LjRjtC7LlwiINC4IFwi0LjRjtC9LlwiLCDQvdC+INC60LDQutC+0Lkg0YHQvNGL0YHQuyDQvNC10L3Rj9GC0Ywg0LHRg9C60LLRgyDQvdCwINGC0L7Rh9C60YMgP1xyXG4gICAgZm9ybWF0OiAn0Y/QvdCyLl/RhNC10LLRgC5f0LzQsNGALl/QsNC/0YAuX9C80LDRj1/QuNGO0L3Rj1/QuNGO0LvRj1/QsNCy0LMuX9GB0LXQvdGCLl/QvtC60YIuX9C90L7Rj9CxLl/QtNC10LouJy5zcGxpdCgnXycpLFxyXG4gICAgc3RhbmRhbG9uZTogJ9GP0L3Qsi5f0YTQtdCy0YAuX9C80LDRgNGCX9Cw0L/RgC5f0LzQsNC5X9C40Y7QvdGMX9C40Y7Qu9GMX9Cw0LLQsy5f0YHQtdC90YIuX9C+0LrRgi5f0L3QvtGP0LEuX9C00LXQui4nLnNwbGl0KCdfJylcclxuICB9LFxyXG4gIHdlZWtkYXlzOiB7XHJcbiAgICBzdGFuZGFsb25lOiAn0LLQvtGB0LrRgNC10YHQtdC90YzQtV/Qv9C+0L3QtdC00LXQu9GM0L3QuNC6X9Cy0YLQvtGA0L3QuNC6X9GB0YDQtdC00LBf0YfQtdGC0LLQtdGA0LNf0L/Rj9GC0L3QuNGG0LBf0YHRg9Cx0LHQvtGC0LAnLnNwbGl0KCdfJyksXHJcbiAgICBmb3JtYXQ6ICfQstC+0YHQutGA0LXRgdC10L3RjNC1X9C/0L7QvdC10LTQtdC70YzQvdC40Lpf0LLRgtC+0YDQvdC40Lpf0YHRgNC10LTRg1/Rh9C10YLQstC10YDQs1/Qv9GP0YLQvdC40YbRg1/RgdGD0LHQsdC+0YLRgycuc3BsaXQoJ18nKSxcclxuICAgIGlzRm9ybWF0OiAvXFxbID9b0JLQsl0gPyg/OtC/0YDQvtGI0LvRg9GOfNGB0LvQtdC00YPRjtGJ0YPRjnzRjdGC0YMpPyA/XFxdID9kZGRkL1xyXG4gIH0sXHJcbiAgd2Vla2RheXNTaG9ydDogJ9Cy0YFf0L/QvV/QstGCX9GB0YBf0YfRgl/Qv9GCX9GB0LEnLnNwbGl0KCdfJyksXHJcbiAgd2Vla2RheXNNaW46ICfQstGBX9C/0L1f0LLRgl/RgdGAX9GH0YJf0L/Rgl/RgdCxJy5zcGxpdCgnXycpLFxyXG4gIG1vbnRoc1BhcnNlLFxyXG4gIGxvbmdNb250aHNQYXJzZTogbW9udGhzUGFyc2UsXHJcbiAgc2hvcnRNb250aHNQYXJzZTogbW9udGhzUGFyc2UsXHJcblxyXG4gIC8vINC/0L7Qu9C90YvQtSDQvdCw0LfQstCw0L3QuNGPINGBINC/0LDQtNC10LbQsNC80LgsINC/0L4g0YLRgNC4INCx0YPQutCy0YssINC00LvRjyDQvdC10LrQvtGC0L7RgNGL0YUsINC/0L4gNCDQsdGD0LrQstGLLCDRgdC+0LrRgNCw0YnQtdC90LjRjyDRgSDRgtC+0YfQutC+0Lkg0Lgg0LHQtdC3INGC0L7Rh9C60LhcclxuICBtb250aHNSZWdleDogL14o0Y/QvdCy0LDRgFvRjNGPXXzRj9C90LJcXC4/fNGE0LXQstGA0LDQu1vRjNGPXXzRhNC10LLRgD9cXC4/fNC80LDRgNGC0LA/fNC80LDRgFxcLj980LDQv9GA0LXQu1vRjNGPXXzQsNC/0YBcXC4/fNC80LBb0LnRj1180LjRjtC9W9GM0Y9dfNC40Y7QvVxcLj980LjRjtC7W9GM0Y9dfNC40Y7Qu1xcLj980LDQstCz0YPRgdGC0LA/fNCw0LLQs1xcLj980YHQtdC90YLRj9Cx0YBb0YzRj1180YHQtdC90YI/XFwuP3zQvtC60YLRj9Cx0YBb0YzRj1180L7QutGCXFwuP3zQvdC+0Y/QsdGAW9GM0Y9dfNC90L7Rj9CxP1xcLj980LTQtdC60LDQsdGAW9GM0Y9dfNC00LXQulxcLj8pL2ksXHJcblxyXG4gIC8vINC60L7Qv9C40Y8g0L/RgNC10LTRi9C00YPRidC10LPQvlxyXG4gIG1vbnRoc1Nob3J0UmVnZXg6IC9eKNGP0L3QstCw0YBb0YzRj1180Y/QvdCyXFwuP3zRhNC10LLRgNCw0Ltb0YzRj1180YTQtdCy0YA/XFwuP3zQvNCw0YDRgtCwP3zQvNCw0YBcXC4/fNCw0L/RgNC10Ltb0YzRj1180LDQv9GAXFwuP3zQvNCwW9C50Y9dfNC40Y7QvVvRjNGPXXzQuNGO0L1cXC4/fNC40Y7Qu1vRjNGPXXzQuNGO0LtcXC4/fNCw0LLQs9GD0YHRgtCwP3zQsNCy0LNcXC4/fNGB0LXQvdGC0Y/QsdGAW9GM0Y9dfNGB0LXQvdGCP1xcLj980L7QutGC0Y/QsdGAW9GM0Y9dfNC+0LrRglxcLj980L3QvtGP0LHRgFvRjNGPXXzQvdC+0Y/QsT9cXC4/fNC00LXQutCw0LHRgFvRjNGPXXzQtNC10LpcXC4/KS9pLFxyXG5cclxuICAvLyDQv9C+0LvQvdGL0LUg0L3QsNC30LLQsNC90LjRjyDRgSDQv9Cw0LTQtdC20LDQvNC4XHJcbiAgbW9udGhzU3RyaWN0UmVnZXg6IC9eKNGP0L3QstCw0YBb0Y/RjF180YTQtdCy0YDQsNC7W9GP0YxdfNC80LDRgNGC0LA/fNCw0L/RgNC10Ltb0Y/RjF180LzQsFvRj9C5XXzQuNGO0L1b0Y/RjF180LjRjtC7W9GP0YxdfNCw0LLQs9GD0YHRgtCwP3zRgdC10L3RgtGP0LHRgFvRj9GMXXzQvtC60YLRj9Cx0YBb0Y/RjF180L3QvtGP0LHRgFvRj9GMXXzQtNC10LrQsNCx0YBb0Y/RjF0pL2ksXHJcblxyXG4gIC8vINCS0YvRgNCw0LbQtdC90LjQtSwg0LrQvtGC0L7RgNC+0LUg0YHQvtC+0YLQstC10YHRgtCy0YPQtdGCINGC0L7Qu9GM0LrQviDRgdC+0LrRgNCw0YnRkdC90L3Ri9C8INGE0L7RgNC80LDQvFxyXG4gIG1vbnRoc1Nob3J0U3RyaWN0UmVnZXg6IC9eKNGP0L3QslxcLnzRhNC10LLRgD9cXC580LzQsNGAW9GCLl180LDQv9GAXFwufNC80LBb0Y/QuV180LjRjtC9W9GM0Y8uXXzQuNGO0Ltb0YzRjy5dfNCw0LLQs1xcLnzRgdC10L3Rgj9cXC580L7QutGCXFwufNC90L7Rj9CxP1xcLnzQtNC10LpcXC4pL2ksXHJcbiAgbG9uZ0RhdGVGb3JtYXQ6IHtcclxuICAgIExUOiAnSDptbScsXHJcbiAgICBMVFM6ICdIOm1tOnNzJyxcclxuICAgIEw6ICdERC5NTS5ZWVlZJyxcclxuICAgIExMOiAnRCBNTU1NIFlZWVkg0LMuJyxcclxuICAgIExMTDogJ0QgTU1NTSBZWVlZINCzLiwgSDptbScsXHJcbiAgICBMTExMOiAnZGRkZCwgRCBNTU1NIFlZWVkg0LMuLCBIOm1tJ1xyXG4gIH0sXHJcbiAgY2FsZW5kYXI6IHtcclxuICAgIHNhbWVEYXk6ICdb0KHQtdCz0L7QtNC90Y8g0LJdIExUJyxcclxuICAgIG5leHREYXk6ICdb0JfQsNCy0YLRgNCwINCyXSBMVCcsXHJcbiAgICBsYXN0RGF5OiAnW9CS0YfQtdGA0LAg0LJdIExUJyxcclxuICAgIG5leHRXZWVrKGRhdGU6IERhdGUsIG5vdzogRGF0ZSkge1xyXG4gICAgICBpZiAoZ2V0V2Vlayhub3cpICE9PSBnZXRXZWVrKGRhdGUpKSB7XHJcbiAgICAgICAgc3dpdGNoIChnZXREYXlPZldlZWsoZGF0ZSkpIHtcclxuICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgcmV0dXJuICdb0JIg0YHQu9C10LTRg9GO0YnQtdC1XSBkZGRkIFvQsl0gTFQnO1xyXG4gICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICByZXR1cm4gJ1vQkiDRgdC70LXQtNGD0Y7RidC40LldIGRkZGQgW9CyXSBMVCc7XHJcbiAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICBjYXNlIDY6XHJcbiAgICAgICAgICAgIHJldHVybiAnW9CSINGB0LvQtdC00YPRjtGJ0YPRjl0gZGRkZCBb0LJdIExUJztcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKGdldERheU9mV2VlayhkYXRlKSA9PT0gMikge1xyXG4gICAgICAgICAgcmV0dXJuICdb0JLQvl0gZGRkZCBb0LJdIExUJztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmV0dXJuICdb0JJdIGRkZGQgW9CyXSBMVCc7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgbGFzdFdlZWsoZGF0ZTogRGF0ZSwgbm93OiBEYXRlKSB7XHJcbiAgICAgIGlmIChnZXRXZWVrKG5vdykgIT09IGdldFdlZWsoZGF0ZSkpIHtcclxuICAgICAgICBzd2l0Y2ggKGdldERheU9mV2VlayhkYXRlKSkge1xyXG4gICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICByZXR1cm4gJ1vQkiDQv9GA0L7RiNC70L7QtV0gZGRkZCBb0LJdIExUJztcclxuICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgcmV0dXJuICdb0JIg0L/RgNC+0YjQu9GL0LldIGRkZGQgW9CyXSBMVCc7XHJcbiAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICBjYXNlIDY6XHJcbiAgICAgICAgICAgIHJldHVybiAnW9CSINC/0YDQvtGI0LvRg9GOXSBkZGRkIFvQsl0gTFQnO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoZ2V0RGF5T2ZXZWVrKGRhdGUpID09PSAyKSB7XHJcbiAgICAgICAgICByZXR1cm4gJ1vQktC+XSBkZGRkIFvQsl0gTFQnO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZXR1cm4gJ1vQkl0gZGRkZCBb0LJdIExUJztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBzYW1lRWxzZTogJ0wnXHJcbiAgfSxcclxuICByZWxhdGl2ZVRpbWU6IHtcclxuICAgIGZ1dHVyZTogJ9GH0LXRgNC10LcgJXMnLFxyXG4gICAgcGFzdDogJyVzINC90LDQt9Cw0LQnLFxyXG4gICAgczogJ9C90LXRgdC60L7Qu9GM0LrQviDRgdC10LrRg9C90LQnLFxyXG4gICAgc3M6IHJlbGF0aXZlVGltZVdpdGhQbHVyYWwsXHJcbiAgICBtOiByZWxhdGl2ZVRpbWVXaXRoUGx1cmFsLFxyXG4gICAgbW06IHJlbGF0aXZlVGltZVdpdGhQbHVyYWwsXHJcbiAgICBoOiAn0YfQsNGBJyxcclxuICAgIGhoOiByZWxhdGl2ZVRpbWVXaXRoUGx1cmFsLFxyXG4gICAgZDogJ9C00LXQvdGMJyxcclxuICAgIGRkOiByZWxhdGl2ZVRpbWVXaXRoUGx1cmFsLFxyXG4gICAgTTogJ9C80LXRgdGP0YYnLFxyXG4gICAgTU06IHJlbGF0aXZlVGltZVdpdGhQbHVyYWwsXHJcbiAgICB5OiAn0LPQvtC0JyxcclxuICAgIHl5OiByZWxhdGl2ZVRpbWVXaXRoUGx1cmFsXHJcbiAgfSxcclxuICBtZXJpZGllbVBhcnNlOiAv0L3QvtGH0Lh80YPRgtGA0LB80LTQvdGPfNCy0LXRh9C10YDQsC9pLFxyXG4gIGlzUE0oaW5wdXQpIHtcclxuICAgIHJldHVybiAvXijQtNC90Y980LLQtdGH0LXRgNCwKSQvLnRlc3QoaW5wdXQpO1xyXG4gIH0sXHJcbiAgbWVyaWRpZW0oaG91ciwgbWludXRlLCBpc0xvd2VyKSB7XHJcbiAgICBpZiAoaG91ciA8IDQpIHtcclxuICAgICAgcmV0dXJuICfQvdC+0YfQuCc7XHJcbiAgICB9IGVsc2UgaWYgKGhvdXIgPCAxMikge1xyXG4gICAgICByZXR1cm4gJ9GD0YLRgNCwJztcclxuICAgIH0gZWxzZSBpZiAoaG91ciA8IDE3KSB7XHJcbiAgICAgIHJldHVybiAn0LTQvdGPJztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiAn0LLQtdGH0LXRgNCwJztcclxuICAgIH1cclxuICB9LFxyXG4gIGRheU9mTW9udGhPcmRpbmFsUGFyc2U6IC9cXGR7MSwyfS0o0Ll80LPQvnzRjykvLFxyXG4gIG9yZGluYWwoX251bTogbnVtYmVyLCBwZXJpb2Q6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICBjb25zdCBudW0gPSBOdW1iZXIoX251bSk7XHJcbiAgICBzd2l0Y2ggKHBlcmlvZCkge1xyXG4gICAgICBjYXNlICdNJzpcclxuICAgICAgY2FzZSAnZCc6XHJcbiAgICAgIGNhc2UgJ0RERCc6XHJcbiAgICAgICAgcmV0dXJuIG51bSArICct0LknO1xyXG4gICAgICBjYXNlICdEJzpcclxuICAgICAgICByZXR1cm4gbnVtICsgJy3Qs9C+JztcclxuICAgICAgY2FzZSAndyc6XHJcbiAgICAgIGNhc2UgJ1cnOlxyXG4gICAgICAgIHJldHVybiBudW0gKyAnLdGPJztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICByZXR1cm4gbnVtLnRvU3RyaW5nKDEwKTtcclxuICAgIH1cclxuICB9LFxyXG4gIHdlZWs6IHtcclxuICAgIGRvdzogMSwgLy8gTW9uZGF5IGlzIHRoZSBmaXJzdCBkYXkgb2YgdGhlIHdlZWsuXHJcbiAgICBkb3k6IDQgIC8vIFRoZSB3ZWVrIHRoYXQgY29udGFpbnMgSmFuIDR0aCBpcyB0aGUgZmlyc3Qgd2VlayBvZiB0aGUgeWVhci5cclxuICB9XHJcbn07XHJcbiJdfQ==