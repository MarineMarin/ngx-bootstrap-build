import { getMonth } from '../utils/date-getters';
import { getDayOfWeek } from '../units/day-of-week';
//! moment.js locale configuration
//! locale : Polish [pl]
//! author : Rafal Hirsz : https://github.com/evoL
let monthsNominative = 'styczeń_luty_marzec_kwiecień_maj_czerwiec_lipiec_sierpień_wrzesień_październik_listopad_grudzień'.split('_');
let monthsSubjective = 'stycznia_lutego_marca_kwietnia_maja_czerwca_lipca_sierpnia_września_października_listopada_grudnia'.split('_');
function plural(num) {
    return (num % 10 < 5) && (num % 10 > 1) && ((~~(num / 10) % 10) !== 1);
}
function translate(num, withoutSuffix, key) {
    let result = num + ' ';
    switch (key) {
        case 'ss':
            return result + (plural(num) ? 'sekundy' : 'sekund');
        case 'm':
            return withoutSuffix ? 'minuta' : 'minutę';
        case 'mm':
            return result + (plural(num) ? 'minuty' : 'minut');
        case 'h':
            return withoutSuffix ? 'godzina' : 'godzinę';
        case 'hh':
            return result + (plural(num) ? 'godziny' : 'godzin');
        case 'MM':
            return result + (plural(num) ? 'miesiące' : 'miesięcy');
        case 'yy':
            return result + (plural(num) ? 'lata' : 'lat');
    }
}
export const plLocale = {
    abbr: 'pl',
    months(date, format, isUTC) {
        if (!date) {
            return monthsNominative;
        }
        else if (format === '') {
            // Hack: if format empty we know this is used to generate
            // RegExp by moment. Give then back both valid forms of months
            // in RegExp ready format.
            return '(' + monthsSubjective[getMonth(date, isUTC)] + '|' + monthsNominative[getMonth(date, isUTC)] + ')';
        }
        else if (/D MMMM/.test(format)) {
            return monthsSubjective[getMonth(date, isUTC)];
        }
        else {
            return monthsNominative[getMonth(date, isUTC)];
        }
    },
    monthsShort: 'sty_lut_mar_kwi_maj_cze_lip_sie_wrz_paź_lis_gru'.split('_'),
    weekdays: 'niedziela_poniedziałek_wtorek_środa_czwartek_piątek_sobota'.split('_'),
    weekdaysShort: 'ndz_pon_wt_śr_czw_pt_sob'.split('_'),
    weekdaysMin: 'Nd_Pn_Wt_Śr_Cz_Pt_So'.split('_'),
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD.MM.YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY HH:mm',
        LLLL: 'dddd, D MMMM YYYY HH:mm'
    },
    calendar: {
        sameDay: '[Dziś o] LT',
        nextDay: '[Jutro o] LT',
        nextWeek(date) {
            switch (getDayOfWeek(date)) {
                case 0:
                    return '[W niedzielę o] LT';
                case 2:
                    return '[We wtorek o] LT';
                case 3:
                    return '[W środę o] LT';
                case 5:
                    return '[W piątek o] LT';
                case 6:
                    return '[W sobotę o] LT';
                default:
                    return '[W] dddd [o] LT';
            }
        },
        lastDay: '[Wczoraj o] LT',
        lastWeek(date) {
            switch (getDayOfWeek(date)) {
                case 0:
                    return '[W zeszłą niedzielę o] LT';
                case 3:
                    return '[W zeszłą środę o] LT';
                case 4:
                    return '[W zeszłą czwartek o] LT';
                case 5:
                    return '[W zeszłą piątek o] LT';
                case 6:
                    return '[W zeszłą sobotę o] LT';
                default:
                    return '[W zeszły] dddd [o] LT';
            }
        },
        sameElse: 'L'
    },
    relativeTime: {
        future: 'za %s',
        past: '%s temu',
        s: 'kilka sekund',
        ss: translate,
        m: translate,
        mm: translate,
        h: translate,
        hh: translate,
        d: '1 dzień',
        dd: '%d dni',
        M: 'miesiąc',
        MM: translate,
        y: 'rok',
        yy: translate
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: '%d.',
    week: {
        dow: 1,
        doy: 4 // The week that contains Jan 4th is the first week of the year.
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvY2hyb25vcy9pMThuL3BsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFcEQsa0NBQWtDO0FBQ2xDLHdCQUF3QjtBQUN4QixrREFBa0Q7QUFFbEQsSUFBSSxnQkFBZ0IsR0FBRyxrR0FBa0csQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDckksSUFBSSxnQkFBZ0IsR0FBRyxvR0FBb0csQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7QUFFdkksU0FBUyxNQUFNLENBQUMsR0FBVztJQUN6QixPQUFPLENBQUMsR0FBRyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUN6RSxDQUFDO0FBRUQsU0FBUyxTQUFTLENBQUMsR0FBVyxFQUFFLGFBQXNCLEVBQUUsR0FBVztJQUNqRSxJQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQ3ZCLFFBQVEsR0FBRyxFQUFFO1FBQ1gsS0FBSyxJQUFJO1lBQ1AsT0FBTyxNQUFNLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdkQsS0FBSyxHQUFHO1lBQ04sT0FBTyxhQUFhLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO1FBQzdDLEtBQUssSUFBSTtZQUNQLE9BQU8sTUFBTSxHQUFH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QUFVO1lBQ2pCLFFBQVEsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUMxQixLQUFLLENBQUM7b0JBQ0osT0FBTywyQkFBMkIsQ0FBQztnQkFDckMsS0FBSyxDQUFDO29CQUNKLE9BQU8sdUJBQXVCLENBQUM7Z0JBQ2pDLEtBQUssQ0FBQztvQkFDSixPQUFPLDBCQUEwQixDQUFDO2dCQUNwQyxLQUFLLENBQUM7b0JBQ0osT0FBTyx3QkFBd0IsQ0FBQztnQkFDbEMsS0FBSyxDQUFDO29CQUNKLE9BQU8sd0JBQXdCLENBQUM7Z0JBQ2xDO29CQUNFLE9BQU8sd0JBQXdCLENBQUM7YUFDbkM7UUFDSCxDQUFDO1FBQ0QsUUFBUSxFQUFFLEdBQUc7S0FDZDtJQUNELFlBQVksRUFBRTtRQUNaLE1BQU0sRUFBRSxPQUFPO1FBQ2YsSUFBSSxFQUFFLFNBQVM7UUFDZixDQUFDLEVBQUUsY0FBYztRQUNqQixFQUFFLEVBQUUsU0FBUztRQUNiLENBQUMsRUFBRSxTQUFTO1FBQ1osRUFBRSxFQUFFLFNBQVM7UUFDYixDQUFDLEVBQUUsU0FBUztRQUNaLEVBQUUsRUFBRSxTQUFTO1FBQ2IsQ0FBQyxFQUFFLFNBQVM7UUFDWixFQUFFLEVBQUUsUUFBUTtRQUNaLENBQUMsRUFBRSxTQUFTO1FBQ1osRUFBRSxFQUFFLFNBQVM7UUFDYixDQUFDLEVBQUUsS0FBSztRQUNSLEVBQUUsRUFBRSxTQUFTO0tBQ2Q7SUFDRCxzQkFBc0IsRUFBRSxXQUFXO0lBQ25DLE9BQU8sRUFBRSxLQUFLO0lBQ2QsSUFBSSxFQUFFO1FBQ0osR0FBRyxFQUFFLENBQUM7UUFDTixHQUFHLEVBQUUsQ0FBQyxDQUFFLGdFQUFnRTtLQUN6RTtDQUNGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2NhbGVEYXRhIH0gZnJvbSAnLi4vbG9jYWxlL2xvY2FsZS5jbGFzcyc7XHJcbmltcG9ydCB7IGdldE1vbnRoIH0gZnJvbSAnLi4vdXRpbHMvZGF0ZS1nZXR0ZXJzJztcclxuaW1wb3J0IHsgZ2V0RGF5T2ZXZWVrIH0gZnJvbSAnLi4vdW5pdHMvZGF5LW9mLXdlZWsnO1xyXG5cclxuLy8hIG1vbWVudC5qcyBsb2NhbGUgY29uZmlndXJhdGlvblxyXG4vLyEgbG9jYWxlIDogUG9saXNoIFtwbF1cclxuLy8hIGF1dGhvciA6IFJhZmFsIEhpcnN6IDogaHR0cHM6Ly9naXRodWIuY29tL2V2b0xcclxuXHJcbmxldCBtb250aHNOb21pbmF0aXZlID0gJ3N0eWN6ZcWEX2x1dHlfbWFyemVjX2t3aWVjaWXFhF9tYWpfY3plcndpZWNfbGlwaWVjX3NpZXJwaWXFhF93cnplc2llxYRfcGHFumR6aWVybmlrX2xpc3RvcGFkX2dydWR6aWXFhCcuc3BsaXQoJ18nKTtcclxubGV0IG1vbnRoc1N1YmplY3RpdmUgPSAnc3R5Y3puaWFfbHV0ZWdvX21hcmNhX2t3aWV0bmlhX21hamFfY3plcndjYV9saXBjYV9zaWVycG5pYV93cnplxZtuaWFfcGHFumR6aWVybmlrYV9saXN0b3BhZGFfZ3J1ZG5pYScuc3BsaXQoJ18nKTtcclxuXHJcbmZ1bmN0aW9uIHBsdXJhbChudW06IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gIHJldHVybiAobnVtICUgMTAgPCA1KSAmJiAobnVtICUgMTAgPiAxKSAmJiAoKH5+KG51bSAvIDEwKSAlIDEwKSAhPT0gMSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRyYW5zbGF0ZShudW06IG51bWJlciwgd2l0aG91dFN1ZmZpeDogYm9vbGVhbiwga2V5OiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gIGxldCByZXN1bHQgPSBudW0gKyAnICc7XHJcbiAgc3dpdGNoIChrZXkpIHtcclxuICAgIGNhc2UgJ3NzJzpcclxuICAgICAgcmV0dXJuIHJlc3VsdCArIChwbHVyYWwobnVtKSA/ICdzZWt1bmR5JyA6ICdzZWt1bmQnKTtcclxuICAgIGNhc2UgJ20nOlxyXG4gICAgICByZXR1cm4gd2l0aG91dFN1ZmZpeCA/ICdtaW51dGEnIDogJ21pbnV0xJknO1xyXG4gICAgY2FzZSAnbW0nOlxyXG4gICAgICByZXR1cm4gcmVzdWx0ICsgKHBsdXJhbChudW0pID8gJ21pbnV0eScgOiAnbWludXQnKTtcclxuICAgIGNhc2UgJ2gnOlxyXG4gICAgICByZXR1cm4gd2l0aG91dFN1ZmZpeCA/ICdnb2R6aW5hJyA6ICdnb2R6aW7EmSc7XHJcbiAgICBjYXNlICdoaCc6XHJcbiAgICAgIHJldHVybiByZXN1bHQgKyAocGx1cmFsKG51bSkgPyAnZ29kemlueScgOiAnZ29kemluJyk7XHJcbiAgICBjYXNlICdNTSc6XHJcbiAgICAgIHJldHVybiByZXN1bHQgKyAocGx1cmFsKG51bSkgPyAnbWllc2nEhWNlJyA6ICdtaWVzacSZY3knKTtcclxuICAgIGNhc2UgJ3l5JzpcclxuICAgICAgcmV0dXJuIHJlc3VsdCArIChwbHVyYWwobnVtKSA/ICdsYXRhJyA6ICdsYXQnKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBwbExvY2FsZTogTG9jYWxlRGF0YSA9IHtcclxuICBhYmJyOiAncGwnLFxyXG4gIG1vbnRocyhkYXRlOiBEYXRlLCBmb3JtYXQ6IHN0cmluZywgaXNVVEM/OiBib29sZWFuKTogc3RyaW5nIHwgc3RyaW5nW10ge1xyXG4gICAgaWYgKCFkYXRlKSB7XHJcbiAgICAgIHJldHVybiBtb250aHNOb21pbmF0aXZlO1xyXG4gICAgfSBlbHNlIGlmIChmb3JtYXQgPT09ICcnKSB7XHJcbiAgICAgIC8vIEhhY2s6IGlmIGZvcm1hdCBlbXB0eSB3ZSBrbm93IHRoaXMgaXMgdXNlZCB0byBnZW5lcmF0ZVxyXG4gICAgICAvLyBSZWdFeHAgYnkgbW9tZW50LiBHaXZlIHRoZW4gYmFjayBib3RoIHZhbGlkIGZvcm1zIG9mIG1vbnRoc1xyXG4gICAgICAvLyBpbiBSZWdFeHAgcmVhZHkgZm9ybWF0LlxyXG4gICAgICByZXR1cm4gJygnICsgbW9udGhzU3ViamVjdGl2ZVtnZXRNb250aChkYXRlLCBpc1VUQyldICsgJ3wnICsgbW9udGhzTm9taW5hdGl2ZVtnZXRNb250aChkYXRlLCBpc1VUQyldICsgJyknO1xyXG4gICAgfSBlbHNlIGlmICgvRCBNTU1NLy50ZXN0KGZvcm1hdCkpIHtcclxuICAgICAgcmV0dXJuIG1vbnRoc1N1YmplY3RpdmVbZ2V0TW9udGgoZGF0ZSwgaXNVVEMpXTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBtb250aHNOb21pbmF0aXZlW2dldE1vbnRoKGRhdGUsIGlzVVRDKV07XHJcbiAgICB9XHJcbiAgfSxcclxuICBtb250aHNTaG9ydDogJ3N0eV9sdXRfbWFyX2t3aV9tYWpfY3plX2xpcF9zaWVfd3J6X3BhxbpfbGlzX2dydScuc3BsaXQoJ18nKSxcclxuICB3ZWVrZGF5czogJ25pZWR6aWVsYV9wb25pZWR6aWHFgmVrX3d0b3Jla1/Fm3JvZGFfY3p3YXJ0ZWtfcGnEhXRla19zb2JvdGEnLnNwbGl0KCdfJyksXHJcbiAgd2Vla2RheXNTaG9ydDogJ25kel9wb25fd3RfxZtyX2N6d19wdF9zb2InLnNwbGl0KCdfJyksXHJcbiAgd2Vla2RheXNNaW46ICdOZF9Qbl9XdF/FmnJfQ3pfUHRfU28nLnNwbGl0KCdfJyksXHJcbiAgbG9uZ0RhdGVGb3JtYXQ6IHtcclxuICAgIExUOiAnSEg6bW0nLFxyXG4gICAgTFRTOiAnSEg6bW06c3MnLFxyXG4gICAgTDogJ0RELk1NLllZWVknLFxyXG4gICAgTEw6ICdEIE1NTU0gWVlZWScsXHJcbiAgICBMTEw6ICdEIE1NTU0gWVlZWSBISDptbScsXHJcbiAgICBMTExMOiAnZGRkZCwgRCBNTU1NIFlZWVkgSEg6bW0nXHJcbiAgfSxcclxuICBjYWxlbmRhcjoge1xyXG4gICAgc2FtZURheTogJ1tEemnFmyBvXSBMVCcsXHJcbiAgICBuZXh0RGF5OiAnW0p1dHJvIG9dIExUJyxcclxuICAgIG5leHRXZWVrKGRhdGU6IERhdGUpOiBzdHJpbmcge1xyXG4gICAgICBzd2l0Y2ggKGdldERheU9mV2VlayhkYXRlKSkge1xyXG4gICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgIHJldHVybiAnW1cgbmllZHppZWzEmSBvXSBMVCc7XHJcblxyXG4gICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgIHJldHVybiAnW1dlIHd0b3JlayBvXSBMVCc7XHJcblxyXG4gICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgIHJldHVybiAnW1cgxZtyb2TEmSBvXSBMVCc7XHJcblxyXG4gICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgIHJldHVybiAnW1cgcGnEhXRlayBvXSBMVCc7XHJcblxyXG4gICAgICAgIGNhc2UgNjpcclxuICAgICAgICAgIHJldHVybiAnW1cgc29ib3TEmSBvXSBMVCc7XHJcblxyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICByZXR1cm4gJ1tXXSBkZGRkIFtvXSBMVCc7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBsYXN0RGF5OiAnW1djem9yYWogb10gTFQnLFxyXG4gICAgbGFzdFdlZWsoZGF0ZTogRGF0ZSk6IHN0cmluZyB7XHJcbiAgICAgIHN3aXRjaCAoZ2V0RGF5T2ZXZWVrKGRhdGUpKSB7XHJcbiAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgcmV0dXJuICdbVyB6ZXN6xYLEhSBuaWVkemllbMSZIG9dIExUJztcclxuICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICByZXR1cm4gJ1tXIHplc3rFgsSFIMWbcm9kxJkgb10gTFQnO1xyXG4gICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgIHJldHVybiAnW1cgemVzesWCxIUgY3p3YXJ0ZWsgb10gTFQnO1xyXG4gICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgIHJldHVybiAnW1cgemVzesWCxIUgcGnEhXRlayBvXSBMVCc7XHJcbiAgICAgICAgY2FzZSA2OlxyXG4gICAgICAgICAgcmV0dXJuICdbVyB6ZXN6xYLEhSBzb2JvdMSZIG9dIExUJztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgcmV0dXJuICdbVyB6ZXN6xYJ5XSBkZGRkIFtvXSBMVCc7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBzYW1lRWxzZTogJ0wnXHJcbiAgfSxcclxuICByZWxhdGl2ZVRpbWU6IHtcclxuICAgIGZ1dHVyZTogJ3phICVzJyxcclxuICAgIHBhc3Q6ICclcyB0ZW11JyxcclxuICAgIHM6ICdraWxrYSBzZWt1bmQnLFxyXG4gICAgc3M6IHRyYW5zbGF0ZSxcclxuICAgIG06IHRyYW5zbGF0ZSxcclxuICAgIG1tOiB0cmFuc2xhdGUsXHJcbiAgICBoOiB0cmFuc2xhdGUsXHJcbiAgICBoaDogdHJhbnNsYXRlLFxyXG4gICAgZDogJzEgZHppZcWEJyxcclxuICAgIGRkOiAnJWQgZG5pJyxcclxuICAgIE06ICdtaWVzacSFYycsXHJcbiAgICBNTTogdHJhbnNsYXRlLFxyXG4gICAgeTogJ3JvaycsXHJcbiAgICB5eTogdHJhbnNsYXRlXHJcbiAgfSxcclxuICBkYXlPZk1vbnRoT3JkaW5hbFBhcnNlOiAvXFxkezEsMn1cXC4vLFxyXG4gIG9yZGluYWw6ICclZC4nLFxyXG4gIHdlZWs6IHtcclxuICAgIGRvdzogMSwgLy8gTW9uZGF5IGlzIHRoZSBmaXJzdCBkYXkgb2YgdGhlIHdlZWsuXHJcbiAgICBkb3k6IDQgIC8vIFRoZSB3ZWVrIHRoYXQgY29udGFpbnMgSmFuIDR0aCBpcyB0aGUgZmlyc3Qgd2VlayBvZiB0aGUgeWVhci5cclxuICB9XHJcbn07XHJcbiJdfQ==