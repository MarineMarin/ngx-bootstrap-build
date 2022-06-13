//! moment.js locale configuration
//! locale : Mongolian [mn]
//! author : Javkhlantugs Nyamdorj : https://github.com/javkhaanj7
function translate(num, withoutSuffix, key, isFuture) {
    switch (key) {
        case 's':
            return withoutSuffix ? 'хэдхэн секунд' : 'хэдхэн секундын';
        case 'ss':
            return num + (withoutSuffix ? ' секунд' : ' секундын');
        case 'm':
        case 'mm':
            return num + (withoutSuffix ? ' минут' : ' минутын');
        case 'h':
        case 'hh':
            return num + (withoutSuffix ? ' цаг' : ' цагийн');
        case 'd':
        case 'dd':
            return num + (withoutSuffix ? ' өдөр' : ' өдрийн');
        case 'M':
        case 'MM':
            return num + (withoutSuffix ? ' сар' : ' сарын');
        case 'y':
        case 'yy':
            return num + (withoutSuffix ? ' жил' : ' жилийн');
        default:
            return num.toString(10);
    }
}
export const mnLocale = {
    abbr: 'mn',
    months: 'Нэгдүгээр сар_Хоёрдугаар сар_Гуравдугаар сар_Дөрөвдүгээр сар_Тавдугаар сар_Зургадугаар сар_Долдугаар сар_Наймдугаар сар_Есдүгээр сар_Аравдугаар сар_Арван нэгдүгээр сар_Арван хоёрдугаар сар'.split('_'),
    monthsShort: '1 сар_2 сар_3 сар_4 сар_5 сар_6 сар_7 сар_8 сар_9 сар_10 сар_11 сар_12 сар'.split('_'),
    monthsParseExact: true,
    weekdays: 'Ням_Даваа_Мягмар_Лхагва_Пүрэв_Баасан_Бямба'.split('_'),
    weekdaysShort: 'Ням_Дав_Мяг_Лха_Пүр_Баа_Бям'.split('_'),
    weekdaysMin: 'Ня_Да_Мя_Лх_Пү_Ба_Бя'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'YYYY-MM-DD',
        LL: 'YYYY оны MMMMын D',
        LLL: 'YYYY оны MMMMын D HH:mm',
        LLLL: 'dddd, YYYY оны MMMMын D HH:mm'
    },
    meridiemParse: /ҮӨ|ҮХ/i,
    isPM: function (input) {
        return input === 'ҮХ';
    },
    meridiem: function (hour, minute, isLower) {
        if (hour < 12) {
            return 'ҮӨ';
        }
        else {
            return 'ҮХ';
        }
    },
    calendar: {
        sameDay: '[Өнөөдөр] LT',
        nextDay: '[Маргааш] LT',
        nextWeek: '[Ирэх] dddd LT',
        lastDay: '[Өчигдөр] LT',
        lastWeek: '[Өнгөрсөн] dddd LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: '%s дараа',
        past: '%s өмнө',
        s: translate,
        ss: translate,
        m: translate,
        mm: translate,
        h: translate,
        hh: translate,
        d: translate,
        dd: translate,
        M: translate,
        MM: translate,
        y: translate,
        yy: translate
    },
    dayOfMonthOrdinalParse: /\d{1,2} өдөр/,
    ordinal: function (num, period) {
        switch (period) {
            case 'd':
            case 'D':
            case 'DDD':
                return num + ' өдөр';
            default:
                return num.toString(10);
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvY2hyb25vcy9pMThuL21uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLGtDQUFrQztBQUNsQywyQkFBMkI7QUFDM0Isa0VBQWtFO0FBRWxFLFNBQVMsU0FBUyxDQUFDLEdBQVcsRUFBRSxhQUFzQixFQUFFLEdBQVcsRUFBRSxRQUFpQjtJQUNwRixRQUFRLEdBQUcsRUFBRTtRQUNYLEtBQUssR0FBRztZQUNOLE9BQU8sYUFBYSxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDO1FBQzdELEtBQUssSUFBSTtZQUNQLE9BQU8sR0FBRyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3pELEtBQUssR0FBRyxDQUFDO1FBQ1QsS0FBSyxJQUFJO1lBQ1AsT0FBTyxHQUFHLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDdkQsS0FBSyxHQUFHLENBQUM7UUFDVCxLQUFLLElBQUk7WUFDUCxPQUFPLEdBQUcsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNwRCxLQUFLLEdBQUcsQ0FBQztRQUNULEtBQUssSUFBSTtZQUNQLE9BQU8sR0FBRyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3JELEtBQUssR0FBRyxDQUFDO1FBQ1QsS0FBSyxJQUFJO1lBQ1AsT0FBTyxHQUFHLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbkQsS0FBSyxHQUFHLENBQUM7UUFDVCxLQUFLLElBQUk7WUFDUCxPQUFPLEdBQUcsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNwRDtZQUNFLE9BQU8sR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUMzQjtBQUNILENBQUM7QUFFRCxNQUFNLENBQUMsTUFBTSxRQUFRLEdBQWU7SUFDbEMsSUFBSSxFQUFFLElBQUk7SUFDVixNQUFNLEVBQUUsOExBQThMLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztJQUNqTixXQUFXLEVBQUUsNEVBQTRFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztJQUNwRyxnQkFBZ0IsRUFBRSxJQUFJO0lBQ3RCLFFBQVEsRUFBRSw0Q0FBNEMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQ2pFLGFBQWEsRUFBRSw2QkFBNkIsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQ3ZELFdBQVcsRUFBRSxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQzlDLGtCQUFrQixFQUFFLElBQUk7SUFDeEIsY0FBYyxFQUFFO1FBQ2QsRUFBRSxFQUFFLE9BQU87UUFDWCxHQUFHLEVBQUUsVUFBVTtRQUNmLENBQUMsRUFBRSxZQUFZO1FBQ2YsRUFBRSxFQUFFLG1CQUFtQjtRQUN2QixHQUFHLEVBQUUseUJBQXlCO1FBQzlCLElBQUksRUFBRSwrQkFBK0I7S0FDdEM7SUFDRCxhQUFhLEVBQUUsUUFBUTtJQUN2QixJQUFJLEVBQUUsVUFBVSxLQUFLO1FBQ25CLE9BQU8sS0FBSyxLQUFLLElBQUksQ0FBQztJQUN4QixDQUFDO0lBQ0QsUUFBUSxFQUFFLFVBQVUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPO1FBQ3ZDLElBQUksSUFBSSxHQUFHLEVBQUUsRUFBRTtZQUNiLE9BQU8sSUFBSSxDQUFDO1NBQ2I7YUFBTTtZQUNMLE9BQU8sSUFBSSxDQUFDO1NBQ2I7SUFDSCxDQUFDO0lBQ0QsUUFBUSxFQUFFO1FBQ1IsT0FBTyxFQUFFLGNBQWM7UUFDdkIsT0FBTyxFQUFFLGNBQWM7UUFDdkIsUUFBUSxFQUFFLGdCQUFnQjtRQUMxQixPQUFPLEVBQUUsY0FBYztRQUN2QixRQUFRLEVBQUUsb0JBQW9CO1FBQzlCLFFBQVEsRUFBRSxHQUFHO0tBQ2Q7SUFDRCxZQUFZLEVBQUU7UUFDWixNQUFNLEVBQUUsVUFBVTtRQUNsQixJQUFJLEVBQUUsU0FBUztRQUNmLENBQUMsRUFBRSxTQUFTO1FBQ1osRUFBRSxFQUFFLFNBQVM7UUFDYixDQUFDLEVBQUUsU0FBUztRQUNaLEVBQUUsRUFBRSxTQUFTO1FBQ2IsQ0FBQyxFQUFFLFNBQVM7UUFDWixFQUFFLEVBQUUsU0FBUztRQUNiLENBQUMsRUFBRSxTQUFTO1FBQ1osRUFBRSxFQUFFLFNBQVM7UUFDYixDQUFDLEVBQUUsU0FBUztRQUNaLEVBQUUsRUFBRSxTQUFTO1FBQ2IsQ0FBQyxFQUFFLFNBQVM7UUFDWixFQUFFLEVBQUUsU0FBUztLQUNkO0lBQ0Qsc0JBQXNCLEVBQUUsY0FBYztJQUN0QyxPQUFPLEVBQUUsVUFBVSxHQUFXLEVBQUUsTUFBYztRQUM1QyxRQUFRLE1BQU0sRUFBRTtZQUNkLEtBQUssR0FBRyxDQUFDO1lBQ1QsS0FBSyxHQUFHLENBQUM7WUFDVCxLQUFLLEtBQUs7Z0JBQ1IsT0FBTyxHQUFHLEdBQUcsT0FBTyxDQUFDO1lBQ3ZCO2dCQUNFLE9BQU8sR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUMzQjtJQUNILENBQUM7Q0FDRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9jYWxlRGF0YSB9IGZyb20gJy4uL2xvY2FsZS9sb2NhbGUuY2xhc3MnO1xyXG5cclxuLy8hIG1vbWVudC5qcyBsb2NhbGUgY29uZmlndXJhdGlvblxyXG4vLyEgbG9jYWxlIDogTW9uZ29saWFuIFttbl1cclxuLy8hIGF1dGhvciA6IEphdmtobGFudHVncyBOeWFtZG9yaiA6IGh0dHBzOi8vZ2l0aHViLmNvbS9qYXZraGFhbmo3XHJcblxyXG5mdW5jdGlvbiB0cmFuc2xhdGUobnVtOiBudW1iZXIsIHdpdGhvdXRTdWZmaXg6IGJvb2xlYW4sIGtleTogc3RyaW5nLCBpc0Z1dHVyZTogYm9vbGVhbikge1xyXG4gIHN3aXRjaCAoa2V5KSB7XHJcbiAgICBjYXNlICdzJzpcclxuICAgICAgcmV0dXJuIHdpdGhvdXRTdWZmaXggPyAn0YXRjdC00YXRjdC9INGB0LXQutGD0L3QtCcgOiAn0YXRjdC00YXRjdC9INGB0LXQutGD0L3QtNGL0L0nO1xyXG4gICAgY2FzZSAnc3MnOlxyXG4gICAgICByZXR1cm4gbnVtICsgKHdpdGhvdXRTdWZmaXggPyAnINGB0LXQutGD0L3QtCcgOiAnINGB0LXQutGD0L3QtNGL0L0nKTtcclxuICAgIGNhc2UgJ20nOlxyXG4gICAgY2FzZSAnbW0nOlxyXG4gICAgICByZXR1cm4gbnVtICsgKHdpdGhvdXRTdWZmaXggPyAnINC80LjQvdGD0YInIDogJyDQvNC40L3Rg9GC0YvQvScpO1xyXG4gICAgY2FzZSAnaCc6XHJcbiAgICBjYXNlICdoaCc6XHJcbiAgICAgIHJldHVybiBudW0gKyAod2l0aG91dFN1ZmZpeCA/ICcg0YbQsNCzJyA6ICcg0YbQsNCz0LjQudC9Jyk7XHJcbiAgICBjYXNlICdkJzpcclxuICAgIGNhc2UgJ2RkJzpcclxuICAgICAgcmV0dXJuIG51bSArICh3aXRob3V0U3VmZml4ID8gJyDTqdC006nRgCcgOiAnINOp0LTRgNC40LnQvScpO1xyXG4gICAgY2FzZSAnTSc6XHJcbiAgICBjYXNlICdNTSc6XHJcbiAgICAgIHJldHVybiBudW0gKyAod2l0aG91dFN1ZmZpeCA/ICcg0YHQsNGAJyA6ICcg0YHQsNGA0YvQvScpO1xyXG4gICAgY2FzZSAneSc6XHJcbiAgICBjYXNlICd5eSc6XHJcbiAgICAgIHJldHVybiBudW0gKyAod2l0aG91dFN1ZmZpeCA/ICcg0LbQuNC7JyA6ICcg0LbQuNC70LjQudC9Jyk7XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICByZXR1cm4gbnVtLnRvU3RyaW5nKDEwKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBtbkxvY2FsZTogTG9jYWxlRGF0YSA9IHtcclxuICBhYmJyOiAnbW4nLFxyXG4gIG1vbnRoczogJ9Cd0Y3Qs9C00q/Qs9GN0Y3RgCDRgdCw0YBf0KXQvtGR0YDQtNGD0LPQsNCw0YAg0YHQsNGAX9CT0YPRgNCw0LLQtNGD0LPQsNCw0YAg0YHQsNGAX9CU06nRgNOp0LLQtNKv0LPRjdGN0YAg0YHQsNGAX9Ci0LDQstC00YPQs9Cw0LDRgCDRgdCw0YBf0JfRg9GA0LPQsNC00YPQs9Cw0LDRgCDRgdCw0YBf0JTQvtC70LTRg9Cz0LDQsNGAINGB0LDRgF/QndCw0LnQvNC00YPQs9Cw0LDRgCDRgdCw0YBf0JXRgdC00q/Qs9GN0Y3RgCDRgdCw0YBf0JDRgNCw0LLQtNGD0LPQsNCw0YAg0YHQsNGAX9CQ0YDQstCw0L0g0L3RjdCz0LTSr9Cz0Y3RjdGAINGB0LDRgF/QkNGA0LLQsNC9INGF0L7RkdGA0LTRg9Cz0LDQsNGAINGB0LDRgCcuc3BsaXQoJ18nKSxcclxuICBtb250aHNTaG9ydDogJzEg0YHQsNGAXzIg0YHQsNGAXzMg0YHQsNGAXzQg0YHQsNGAXzUg0YHQsNGAXzYg0YHQsNGAXzcg0YHQsNGAXzgg0YHQsNGAXzkg0YHQsNGAXzEwINGB0LDRgF8xMSDRgdCw0YBfMTIg0YHQsNGAJy5zcGxpdCgnXycpLFxyXG4gIG1vbnRoc1BhcnNlRXhhY3Q6IHRydWUsXHJcbiAgd2Vla2RheXM6ICfQndGP0Lxf0JTQsNCy0LDQsF/QnNGP0LPQvNCw0YBf0JvRhdCw0LPQstCwX9Cf0q/RgNGN0LJf0JHQsNCw0YHQsNC9X9CR0Y/QvNCx0LAnLnNwbGl0KCdfJyksXHJcbiAgd2Vla2RheXNTaG9ydDogJ9Cd0Y/QvF/QlNCw0LJf0JzRj9CzX9Cb0YXQsF/Qn9Kv0YBf0JHQsNCwX9CR0Y/QvCcuc3BsaXQoJ18nKSxcclxuICB3ZWVrZGF5c01pbjogJ9Cd0Y9f0JTQsF/QnNGPX9Cb0YVf0J/Sr1/QkdCwX9CR0Y8nLnNwbGl0KCdfJyksXHJcbiAgd2Vla2RheXNQYXJzZUV4YWN0OiB0cnVlLFxyXG4gIGxvbmdEYXRlRm9ybWF0OiB7XHJcbiAgICBMVDogJ0hIOm1tJyxcclxuICAgIExUUzogJ0hIOm1tOnNzJyxcclxuICAgIEw6ICdZWVlZLU1NLUREJyxcclxuICAgIExMOiAnWVlZWSDQvtC90YsgTU1NTdGL0L0gRCcsXHJcbiAgICBMTEw6ICdZWVlZINC+0L3RiyBNTU1N0YvQvSBEIEhIOm1tJyxcclxuICAgIExMTEw6ICdkZGRkLCBZWVlZINC+0L3RiyBNTU1N0YvQvSBEIEhIOm1tJ1xyXG4gIH0sXHJcbiAgbWVyaWRpZW1QYXJzZTogL9Ku06h80q7QpS9pLFxyXG4gIGlzUE06IGZ1bmN0aW9uIChpbnB1dCkge1xyXG4gICAgcmV0dXJuIGlucHV0ID09PSAn0q7QpSc7XHJcbiAgfSxcclxuICBtZXJpZGllbTogZnVuY3Rpb24gKGhvdXIsIG1pbnV0ZSwgaXNMb3dlcikge1xyXG4gICAgaWYgKGhvdXIgPCAxMikge1xyXG4gICAgICByZXR1cm4gJ9Ku06gnO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuICfSrtClJztcclxuICAgIH1cclxuICB9LFxyXG4gIGNhbGVuZGFyOiB7XHJcbiAgICBzYW1lRGF5OiAnW9Oo0L3TqdOp0LTTqdGAXSBMVCcsXHJcbiAgICBuZXh0RGF5OiAnW9Cc0LDRgNCz0LDQsNGIXSBMVCcsXHJcbiAgICBuZXh0V2VlazogJ1vQmNGA0Y3RhV0gZGRkZCBMVCcsXHJcbiAgICBsYXN0RGF5OiAnW9Oo0YfQuNCz0LTTqdGAXSBMVCcsXHJcbiAgICBsYXN0V2VlazogJ1vTqNC90LPTqdGA0YHTqdC9XSBkZGRkIExUJyxcclxuICAgIHNhbWVFbHNlOiAnTCdcclxuICB9LFxyXG4gIHJlbGF0aXZlVGltZToge1xyXG4gICAgZnV0dXJlOiAnJXMg0LTQsNGA0LDQsCcsXHJcbiAgICBwYXN0OiAnJXMg06nQvNC906knLFxyXG4gICAgczogdHJhbnNsYXRlLFxyXG4gICAgc3M6IHRyYW5zbGF0ZSxcclxuICAgIG06IHRyYW5zbGF0ZSxcclxuICAgIG1tOiB0cmFuc2xhdGUsXHJcbiAgICBoOiB0cmFuc2xhdGUsXHJcbiAgICBoaDogdHJhbnNsYXRlLFxyXG4gICAgZDogdHJhbnNsYXRlLFxyXG4gICAgZGQ6IHRyYW5zbGF0ZSxcclxuICAgIE06IHRyYW5zbGF0ZSxcclxuICAgIE1NOiB0cmFuc2xhdGUsXHJcbiAgICB5OiB0cmFuc2xhdGUsXHJcbiAgICB5eTogdHJhbnNsYXRlXHJcbiAgfSxcclxuICBkYXlPZk1vbnRoT3JkaW5hbFBhcnNlOiAvXFxkezEsMn0g06nQtNOp0YAvLFxyXG4gIG9yZGluYWw6IGZ1bmN0aW9uIChudW06IG51bWJlciwgcGVyaW9kOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgc3dpdGNoIChwZXJpb2QpIHtcclxuICAgICAgY2FzZSAnZCc6XHJcbiAgICAgIGNhc2UgJ0QnOlxyXG4gICAgICBjYXNlICdEREQnOlxyXG4gICAgICAgIHJldHVybiBudW0gKyAnINOp0LTTqdGAJztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICByZXR1cm4gbnVtLnRvU3RyaW5nKDEwKTtcclxuICAgIH1cclxuICB9XHJcbn07XHJcbiJdfQ==