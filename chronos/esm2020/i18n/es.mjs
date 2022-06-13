import { getHours, getMonth } from '../utils/date-getters';
//! moment.js locale configuration
//! locale : Spanish [es]
//! author : Julio Napurí : https://github.com/julionc
let monthsShortDot = 'ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.'.split('_'), monthsShort = 'ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic'.split('_');
let monthsParse = [/^ene/i, /^feb/i, /^mar/i, /^abr/i, /^may/i, /^jun/i, /^jul/i, /^ago/i, /^sep/i, /^oct/i, /^nov/i, /^dic/i];
let monthsRegex = /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre|ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i;
export const esLocale = {
    abbr: 'es',
    months: 'enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre'.split('_'),
    monthsShort(date, format, isUTC) {
        if (!date) {
            return monthsShortDot;
        }
        if (/-MMM-/.test(format)) {
            return monthsShort[getMonth(date, isUTC)];
        }
        return monthsShortDot[getMonth(date, isUTC)];
    },
    monthsRegex,
    monthsShortRegex: monthsRegex,
    monthsStrictRegex: /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i,
    monthsShortStrictRegex: /^(ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i,
    monthsParse,
    longMonthsParse: monthsParse,
    shortMonthsParse: monthsParse,
    weekdays: 'domingo_lunes_martes_miércoles_jueves_viernes_sábado'.split('_'),
    weekdaysShort: 'dom._lun._mar._mié._jue._vie._sáb.'.split('_'),
    weekdaysMin: 'do_lu_ma_mi_ju_vi_sá'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
        LT: 'H:mm',
        LTS: 'H:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D [de] MMMM [de] YYYY',
        LLL: 'D [de] MMMM [de] YYYY H:mm',
        LLLL: 'dddd, D [de] MMMM [de] YYYY H:mm'
    },
    calendar: {
        sameDay(date) {
            return '[hoy a la' + ((getHours(date) !== 1) ? 's' : '') + '] LT';
        },
        nextDay(date) {
            return '[mañana a la' + ((getHours(date) !== 1) ? 's' : '') + '] LT';
        },
        nextWeek(date) {
            return 'dddd [a la' + ((getHours(date) !== 1) ? 's' : '') + '] LT';
        },
        lastDay(date) {
            return '[ayer a la' + ((getHours(date) !== 1) ? 's' : '') + '] LT';
        },
        lastWeek(date) {
            return '[el] dddd [pasado a la' + ((getHours(date) !== 1) ? 's' : '') + '] LT';
        },
        sameElse: 'L'
    },
    relativeTime: {
        future: 'en %s',
        past: 'hace %s',
        s: 'unos segundos',
        ss: '%d segundos',
        m: 'un minuto',
        mm: '%d minutos',
        h: 'una hora',
        hh: '%d horas',
        d: 'un día',
        dd: '%d días',
        M: 'un mes',
        MM: '%d meses',
        y: 'un año',
        yy: '%d años'
    },
    dayOfMonthOrdinalParse: /\d{1,2}º/,
    ordinal: '%dº',
    week: {
        dow: 1,
        doy: 4 // The week that contains Jan 4th is the first week of the year.
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvY2hyb25vcy9pMThuL2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFM0Qsa0NBQWtDO0FBQ2xDLHlCQUF5QjtBQUN6QixzREFBc0Q7QUFFdEQsSUFBSSxjQUFjLEdBQUcsNkRBQTZELENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUMzRixXQUFXLEdBQUcsaURBQWlELENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBRTdFLElBQUksV0FBVyxHQUFHLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztBQUMvSCxJQUFJLFdBQVcsR0FBRyxrTEFBa0wsQ0FBQztBQUVyTSxNQUFNLENBQUMsTUFBTSxRQUFRLEdBQWU7SUFDbEMsSUFBSSxFQUFFLElBQUk7SUFDVixNQUFNLEVBQUUsMEZBQTBGLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztJQUM3RyxXQUFXLENBQUMsSUFBVSxFQUFFLE1BQWMsRUFBRSxLQUFlO1FBQ3JELElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDVCxPQUFPLGNBQWMsQ0FBQztTQUN2QjtRQUVELElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUN4QixPQUFPLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDM0M7UUFFRCxPQUFPLGNBQWMsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUNELFdBQVc7SUFDWCxnQkFBZ0IsRUFBRSxXQUFXO0lBQzdCLGlCQUFpQixFQUFFLDhGQUE4RjtJQUNqSCxzQkFBc0IsRUFBRSx5RkFBeUY7SUFDakgsV0FBVztJQUNYLGVBQWUsRUFBRSxXQUFXO0lBQzVCLGdCQUFnQixFQUFFLFdBQVc7SUFDN0IsUUFBUSxFQUFFLHNEQUFzRCxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7SUFDM0UsYUFBYSxFQUFFLG9DQUFvQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7SUFDOUQsV0FBVyxFQUFFLHNCQUFzQixDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7SUFDOUMsa0JBQWtCLEVBQUUsSUFBSTtJQUN4QixjQUFjLEVBQUU7UUFDZCxFQUFFLEVBQUUsTUFBTTtRQUNWLEdBQUcsRUFBRSxTQUFTO1FBQ2QsQ0FBQyxFQUFFLFlBQVk7UUFDZixFQUFFLEVBQUUsdUJBQXVCO1FBQzNCLEdBQUcsRUFBRSw0QkFBNEI7UUFDakMsSUFBSSxFQUFFLGtDQUFrQztLQUN6QztJQUNELFFBQVEsRUFBRTtRQUNSLE9BQU8sQ0FBQyxJQUFVO1lBQ2hCLE9BQU8sV0FBVyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDO1FBQ3BFLENBQUM7UUFDRCxPQUFPLENBQUMsSUFBVTtZQUNoQixPQUFPLGNBQWMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQztRQUN2RSxDQUFDO1FBQ0QsUUFBUSxDQUFDLElBQVU7WUFDakIsT0FBTyxZQUFZLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUM7UUFDckUsQ0FBQztRQUNELE9BQU8sQ0FBQyxJQUFVO1lBQ2hCLE9BQU8sWUFBWSxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDO1FBQ3JFLENBQUM7UUFDRCxRQUFRLENBQUMsSUFBVTtZQUNqQixPQUFPLHdCQUF3QixHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDO1FBQ2pGLENBQUM7UUFDRCxRQUFRLEVBQUUsR0FBRztLQUNkO0lBQ0QsWUFBWSxFQUFFO1FBQ1osTUFBTSxFQUFFLE9BQU87UUFDZixJQUFJLEVBQUUsU0FBUztRQUNmLENBQUMsRUFBRSxlQUFlO1FBQ2xCLEVBQUUsRUFBRSxhQUFhO1FBQ2pCLENBQUMsRUFBRSxXQUFXO1FBQ2QsRUFBRSxFQUFFLFlBQVk7UUFDaEIsQ0FBQyxFQUFFLFVBQVU7UUFDYixFQUFFLEVBQUUsVUFBVTtRQUNkLENBQUMsRUFBRSxRQUFRO1FBQ1gsRUFBRSxFQUFFLFNBQVM7UUFDYixDQUFDLEVBQUUsUUFBUTtRQUNYLEVBQUUsRUFBRSxVQUFVO1FBQ2QsQ0FBQyxFQUFFLFFBQVE7UUFDWCxFQUFFLEVBQUUsU0FBUztLQUNkO0lBQ0Qsc0JBQXNCLEVBQUUsVUFBVTtJQUNsQyxPQUFPLEVBQUUsS0FBSztJQUNkLElBQUksRUFBRTtRQUNKLEdBQUcsRUFBRSxDQUFDO1FBQ04sR0FBRyxFQUFFLENBQUMsQ0FBRSxnRUFBZ0U7S0FDekU7Q0FDRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9jYWxlRGF0YSB9IGZyb20gJy4uL2xvY2FsZS9sb2NhbGUuY2xhc3MnO1xyXG5pbXBvcnQgeyBnZXRIb3VycywgZ2V0TW9udGggfSBmcm9tICcuLi91dGlscy9kYXRlLWdldHRlcnMnO1xyXG5cclxuLy8hIG1vbWVudC5qcyBsb2NhbGUgY29uZmlndXJhdGlvblxyXG4vLyEgbG9jYWxlIDogU3BhbmlzaCBbZXNdXHJcbi8vISBhdXRob3IgOiBKdWxpbyBOYXB1csOtIDogaHR0cHM6Ly9naXRodWIuY29tL2p1bGlvbmNcclxuXHJcbmxldCBtb250aHNTaG9ydERvdCA9ICdlbmUuX2ZlYi5fbWFyLl9hYnIuX21heS5fanVuLl9qdWwuX2Fnby5fc2VwLl9vY3QuX25vdi5fZGljLicuc3BsaXQoJ18nKSxcclxuICBtb250aHNTaG9ydCA9ICdlbmVfZmViX21hcl9hYnJfbWF5X2p1bl9qdWxfYWdvX3NlcF9vY3Rfbm92X2RpYycuc3BsaXQoJ18nKTtcclxuXHJcbmxldCBtb250aHNQYXJzZSA9IFsvXmVuZS9pLCAvXmZlYi9pLCAvXm1hci9pLCAvXmFici9pLCAvXm1heS9pLCAvXmp1bi9pLCAvXmp1bC9pLCAvXmFnby9pLCAvXnNlcC9pLCAvXm9jdC9pLCAvXm5vdi9pLCAvXmRpYy9pXTtcclxubGV0IG1vbnRoc1JlZ2V4ID0gL14oZW5lcm98ZmVicmVyb3xtYXJ6b3xhYnJpbHxtYXlvfGp1bmlvfGp1bGlvfGFnb3N0b3xzZXB0aWVtYnJlfG9jdHVicmV8bm92aWVtYnJlfGRpY2llbWJyZXxlbmVcXC4/fGZlYlxcLj98bWFyXFwuP3xhYnJcXC4/fG1heVxcLj98anVuXFwuP3xqdWxcXC4/fGFnb1xcLj98c2VwXFwuP3xvY3RcXC4/fG5vdlxcLj98ZGljXFwuPykvaTtcclxuXHJcbmV4cG9ydCBjb25zdCBlc0xvY2FsZTogTG9jYWxlRGF0YSA9IHtcclxuICBhYmJyOiAnZXMnLFxyXG4gIG1vbnRoczogJ2VuZXJvX2ZlYnJlcm9fbWFyem9fYWJyaWxfbWF5b19qdW5pb19qdWxpb19hZ29zdG9fc2VwdGllbWJyZV9vY3R1YnJlX25vdmllbWJyZV9kaWNpZW1icmUnLnNwbGl0KCdfJyksXHJcbiAgbW9udGhzU2hvcnQoZGF0ZTogRGF0ZSwgZm9ybWF0OiBzdHJpbmcsIGlzVVRDPzogYm9vbGVhbik6IHN0cmluZyB8IHN0cmluZ1tdIHtcclxuICAgIGlmICghZGF0ZSkge1xyXG4gICAgICByZXR1cm4gbW9udGhzU2hvcnREb3Q7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKC8tTU1NLS8udGVzdChmb3JtYXQpKSB7XHJcbiAgICAgIHJldHVybiBtb250aHNTaG9ydFtnZXRNb250aChkYXRlLCBpc1VUQyldO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBtb250aHNTaG9ydERvdFtnZXRNb250aChkYXRlLCBpc1VUQyldO1xyXG4gIH0sXHJcbiAgbW9udGhzUmVnZXgsXHJcbiAgbW9udGhzU2hvcnRSZWdleDogbW9udGhzUmVnZXgsXHJcbiAgbW9udGhzU3RyaWN0UmVnZXg6IC9eKGVuZXJvfGZlYnJlcm98bWFyem98YWJyaWx8bWF5b3xqdW5pb3xqdWxpb3xhZ29zdG98c2VwdGllbWJyZXxvY3R1YnJlfG5vdmllbWJyZXxkaWNpZW1icmUpL2ksXHJcbiAgbW9udGhzU2hvcnRTdHJpY3RSZWdleDogL14oZW5lXFwuP3xmZWJcXC4/fG1hclxcLj98YWJyXFwuP3xtYXlcXC4/fGp1blxcLj98anVsXFwuP3xhZ29cXC4/fHNlcFxcLj98b2N0XFwuP3xub3ZcXC4/fGRpY1xcLj8pL2ksXHJcbiAgbW9udGhzUGFyc2UsXHJcbiAgbG9uZ01vbnRoc1BhcnNlOiBtb250aHNQYXJzZSxcclxuICBzaG9ydE1vbnRoc1BhcnNlOiBtb250aHNQYXJzZSxcclxuICB3ZWVrZGF5czogJ2RvbWluZ29fbHVuZXNfbWFydGVzX21pw6lyY29sZXNfanVldmVzX3ZpZXJuZXNfc8OhYmFkbycuc3BsaXQoJ18nKSxcclxuICB3ZWVrZGF5c1Nob3J0OiAnZG9tLl9sdW4uX21hci5fbWnDqS5fanVlLl92aWUuX3PDoWIuJy5zcGxpdCgnXycpLFxyXG4gIHdlZWtkYXlzTWluOiAnZG9fbHVfbWFfbWlfanVfdmlfc8OhJy5zcGxpdCgnXycpLFxyXG4gIHdlZWtkYXlzUGFyc2VFeGFjdDogdHJ1ZSxcclxuICBsb25nRGF0ZUZvcm1hdDoge1xyXG4gICAgTFQ6ICdIOm1tJyxcclxuICAgIExUUzogJ0g6bW06c3MnLFxyXG4gICAgTDogJ0REL01NL1lZWVknLFxyXG4gICAgTEw6ICdEIFtkZV0gTU1NTSBbZGVdIFlZWVknLFxyXG4gICAgTExMOiAnRCBbZGVdIE1NTU0gW2RlXSBZWVlZIEg6bW0nLFxyXG4gICAgTExMTDogJ2RkZGQsIEQgW2RlXSBNTU1NIFtkZV0gWVlZWSBIOm1tJ1xyXG4gIH0sXHJcbiAgY2FsZW5kYXI6IHtcclxuICAgIHNhbWVEYXkoZGF0ZTogRGF0ZSkge1xyXG4gICAgICByZXR1cm4gJ1tob3kgYSBsYScgKyAoKGdldEhvdXJzKGRhdGUpICE9PSAxKSA/ICdzJyA6ICcnKSArICddIExUJztcclxuICAgIH0sXHJcbiAgICBuZXh0RGF5KGRhdGU6IERhdGUpIHtcclxuICAgICAgcmV0dXJuICdbbWHDsWFuYSBhIGxhJyArICgoZ2V0SG91cnMoZGF0ZSkgIT09IDEpID8gJ3MnIDogJycpICsgJ10gTFQnO1xyXG4gICAgfSxcclxuICAgIG5leHRXZWVrKGRhdGU6IERhdGUpIHtcclxuICAgICAgcmV0dXJuICdkZGRkIFthIGxhJyArICgoZ2V0SG91cnMoZGF0ZSkgIT09IDEpID8gJ3MnIDogJycpICsgJ10gTFQnO1xyXG4gICAgfSxcclxuICAgIGxhc3REYXkoZGF0ZTogRGF0ZSkge1xyXG4gICAgICByZXR1cm4gJ1theWVyIGEgbGEnICsgKChnZXRIb3VycyhkYXRlKSAhPT0gMSkgPyAncycgOiAnJykgKyAnXSBMVCc7XHJcbiAgICB9LFxyXG4gICAgbGFzdFdlZWsoZGF0ZTogRGF0ZSkge1xyXG4gICAgICByZXR1cm4gJ1tlbF0gZGRkZCBbcGFzYWRvIGEgbGEnICsgKChnZXRIb3VycyhkYXRlKSAhPT0gMSkgPyAncycgOiAnJykgKyAnXSBMVCc7XHJcbiAgICB9LFxyXG4gICAgc2FtZUVsc2U6ICdMJ1xyXG4gIH0sXHJcbiAgcmVsYXRpdmVUaW1lOiB7XHJcbiAgICBmdXR1cmU6ICdlbiAlcycsXHJcbiAgICBwYXN0OiAnaGFjZSAlcycsXHJcbiAgICBzOiAndW5vcyBzZWd1bmRvcycsXHJcbiAgICBzczogJyVkIHNlZ3VuZG9zJyxcclxuICAgIG06ICd1biBtaW51dG8nLFxyXG4gICAgbW06ICclZCBtaW51dG9zJyxcclxuICAgIGg6ICd1bmEgaG9yYScsXHJcbiAgICBoaDogJyVkIGhvcmFzJyxcclxuICAgIGQ6ICd1biBkw61hJyxcclxuICAgIGRkOiAnJWQgZMOtYXMnLFxyXG4gICAgTTogJ3VuIG1lcycsXHJcbiAgICBNTTogJyVkIG1lc2VzJyxcclxuICAgIHk6ICd1biBhw7FvJyxcclxuICAgIHl5OiAnJWQgYcOxb3MnXHJcbiAgfSxcclxuICBkYXlPZk1vbnRoT3JkaW5hbFBhcnNlOiAvXFxkezEsMn3Cui8sXHJcbiAgb3JkaW5hbDogJyVkwronLFxyXG4gIHdlZWs6IHtcclxuICAgIGRvdzogMSwgLy8gTW9uZGF5IGlzIHRoZSBmaXJzdCBkYXkgb2YgdGhlIHdlZWsuXHJcbiAgICBkb3k6IDQgIC8vIFRoZSB3ZWVrIHRoYXQgY29udGFpbnMgSmFuIDR0aCBpcyB0aGUgZmlyc3Qgd2VlayBvZiB0aGUgeWVhci5cclxuICB9XHJcbn07XHJcbiJdfQ==