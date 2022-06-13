import { getMonth } from '../utils/date-getters';
//! moment.js locale configuration
//! locale : Dutch (Belgium) [nl-be]
//! author : Joris Röling : https://github.com/jorisroling
//! author : Jacob Middag : https://github.com/middagj
let monthsShortWithDots = 'jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.'.split('_');
let monthsShortWithoutDots = 'jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec'.split('_');
let monthsParse = [/^jan/i, /^feb/i, /^maart|mrt.?$/i, /^apr/i, /^mei$/i, /^jun[i.]?$/i, /^jul[i.]?$/i, /^aug/i, /^sep/i, /^okt/i, /^nov/i, /^dec/i];
let monthsRegex = /^(januari|februari|maart|april|mei|april|ju[nl]i|augustus|september|oktober|november|december|jan\.?|feb\.?|mrt\.?|apr\.?|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i;
export const nlBeLocale = {
    abbr: 'nl-be',
    months: 'januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december'.split('_'),
    monthsShort(date, format, isUTC) {
        if (!date) {
            return monthsShortWithDots;
        }
        else if (/-MMM-/.test(format)) {
            return monthsShortWithoutDots[getMonth(date, isUTC)];
        }
        else {
            return monthsShortWithDots[getMonth(date, isUTC)];
        }
    },
    monthsRegex,
    monthsShortRegex: monthsRegex,
    monthsStrictRegex: /^(januari|februari|maart|mei|ju[nl]i|april|augustus|september|oktober|november|december)/i,
    monthsShortStrictRegex: /^(jan\.?|feb\.?|mrt\.?|apr\.?|mei|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i,
    monthsParse,
    longMonthsParse: monthsParse,
    shortMonthsParse: monthsParse,
    weekdays: 'zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag'.split('_'),
    weekdaysShort: 'zo._ma._di._wo._do._vr._za.'.split('_'),
    weekdaysMin: 'zo_ma_di_wo_do_vr_za'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY HH:mm',
        LLLL: 'dddd D MMMM YYYY HH:mm'
    },
    calendar: {
        sameDay: '[vandaag om] LT',
        nextDay: '[morgen om] LT',
        nextWeek: 'dddd [om] LT',
        lastDay: '[gisteren om] LT',
        lastWeek: '[afgelopen] dddd [om] LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: 'over %s',
        past: '%s geleden',
        s: 'een paar seconden',
        ss: '%d seconden',
        m: 'één minuut',
        mm: '%d minuten',
        h: 'één uur',
        hh: '%d uur',
        d: 'één dag',
        dd: '%d dagen',
        M: 'één maand',
        MM: '%d maanden',
        y: 'één jaar',
        yy: '%d jaar'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(ste|de)/,
    ordinal(_num) {
        const num = Number(_num);
        return num + ((num === 1 || num === 8 || num >= 20) ? 'ste' : 'de');
    },
    week: {
        dow: 1,
        doy: 4 // The week that contains Jan 4th is the first week of the year.
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmwtYmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvY2hyb25vcy9pMThuL25sLWJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUVqRCxrQ0FBa0M7QUFDbEMsb0NBQW9DO0FBQ3BDLDBEQUEwRDtBQUMxRCxzREFBc0Q7QUFFdEQsSUFBSSxtQkFBbUIsR0FBRyw0REFBNEQsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDbEcsSUFBSSxzQkFBc0IsR0FBRyxpREFBaUQsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7QUFFMUYsSUFBSSxXQUFXLEdBQUcsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsYUFBYSxFQUFFLGFBQWEsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDckosSUFBSSxXQUFXLEdBQUcsMEtBQTBLLENBQUM7QUFFN0wsTUFBTSxDQUFDLE1BQU0sVUFBVSxHQUFlO0lBQ3BDLElBQUksRUFBRSxPQUFPO0lBQ2IsTUFBTSxFQUFFLHlGQUF5RixDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7SUFDNUcsV0FBVyxDQUFDLElBQVUsRUFBRSxNQUFjLEVBQUUsS0FBZTtRQUNyRCxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1QsT0FBTyxtQkFBbUIsQ0FBQztTQUM1QjthQUFNLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUMvQixPQUFPLHNCQUFzQixDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUN0RDthQUFNO1lBQ0wsT0FBTyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDbkQ7SUFDSCxDQUFDO0lBRUQsV0FBVztJQUNYLGdCQUFnQixFQUFFLFdBQVc7SUFDN0IsaUJBQWlCLEVBQUUsMkZBQTJGO0lBQzlHLHNCQUFzQixFQUFFLGtGQUFrRjtJQUUxRyxXQUFXO0lBQ1gsZUFBZSxFQUFFLFdBQVc7SUFDNUIsZ0JBQWdCLEVBQUUsV0FBVztJQUU3QixRQUFRLEVBQUUsNERBQTRELENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztJQUNqRixhQUFhLEVBQUUsNkJBQTZCLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztJQUN2RCxXQUFXLEVBQUUsc0JBQXNCLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztJQUM5QyxrQkFBa0IsRUFBRSxJQUFJO0lBQ3hCLGNBQWMsRUFBRTtRQUNkLEVBQUUsRUFBRSxPQUFPO1FBQ1gsR0FBRyxFQUFFLFVBQVU7UUFDZixDQUFDLEVBQUUsWUFBWTtRQUNmLEVBQUUsRUFBRSxhQUFhO1FBQ2pCLEdBQUcsRUFBRSxtQkFBbUI7UUFDeEIsSUFBSSxFQUFFLHdCQUF3QjtLQUMvQjtJQUNELFFBQVEsRUFBRTtRQUNSLE9BQU8sRUFBRSxpQkFBaUI7UUFDMUIsT0FBTyxFQUFFLGdCQUFnQjtRQUN6QixRQUFRLEVBQUUsY0FBYztRQUN4QixPQUFPLEVBQUUsa0JBQWtCO1FBQzNCLFFBQVEsRUFBRSwwQkFBMEI7UUFDcEMsUUFBUSxFQUFFLEdBQUc7S0FDZDtJQUNELFlBQVksRUFBRTtRQUNaLE1BQU0sRUFBRSxTQUFTO1FBQ2pCLElBQUksRUFBRSxZQUFZO1FBQ2xCLENBQUMsRUFBRSxtQkFBbUI7UUFDdEIsRUFBRSxFQUFFLGFBQWE7UUFDakIsQ0FBQyxFQUFFLFlBQVk7UUFDZixFQUFFLEVBQUUsWUFBWTtRQUNoQixDQUFDLEVBQUUsU0FBUztRQUNaLEVBQUUsRUFBRSxRQUFRO1FBQ1osQ0FBQyxFQUFFLFNBQVM7UUFDWixFQUFFLEVBQUUsVUFBVTtRQUNkLENBQUMsRUFBRSxXQUFXO1FBQ2QsRUFBRSxFQUFFLFlBQVk7UUFDaEIsQ0FBQyxFQUFFLFVBQVU7UUFDYixFQUFFLEVBQUUsU0FBUztLQUNkO0lBQ0Qsc0JBQXNCLEVBQUUsaUJBQWlCO0lBQ3pDLE9BQU8sQ0FBQyxJQUFZO1FBQ2xCLE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QixPQUFPLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0RSxDQUFDO0lBQ0QsSUFBSSxFQUFFO1FBQ0osR0FBRyxFQUFFLENBQUM7UUFDTixHQUFHLEVBQUUsQ0FBQyxDQUFFLGdFQUFnRTtLQUN6RTtDQUNGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2NhbGVEYXRhIH0gZnJvbSAnLi4vbG9jYWxlL2xvY2FsZS5jbGFzcyc7XHJcbmltcG9ydCB7IGdldE1vbnRoIH0gZnJvbSAnLi4vdXRpbHMvZGF0ZS1nZXR0ZXJzJztcclxuXHJcbi8vISBtb21lbnQuanMgbG9jYWxlIGNvbmZpZ3VyYXRpb25cclxuLy8hIGxvY2FsZSA6IER1dGNoIChCZWxnaXVtKSBbbmwtYmVdXHJcbi8vISBhdXRob3IgOiBKb3JpcyBSw7ZsaW5nIDogaHR0cHM6Ly9naXRodWIuY29tL2pvcmlzcm9saW5nXHJcbi8vISBhdXRob3IgOiBKYWNvYiBNaWRkYWcgOiBodHRwczovL2dpdGh1Yi5jb20vbWlkZGFnalxyXG5cclxubGV0IG1vbnRoc1Nob3J0V2l0aERvdHMgPSAnamFuLl9mZWIuX21ydC5fYXByLl9tZWlfanVuLl9qdWwuX2F1Zy5fc2VwLl9va3QuX25vdi5fZGVjLicuc3BsaXQoJ18nKTtcclxubGV0IG1vbnRoc1Nob3J0V2l0aG91dERvdHMgPSAnamFuX2ZlYl9tcnRfYXByX21laV9qdW5fanVsX2F1Z19zZXBfb2t0X25vdl9kZWMnLnNwbGl0KCdfJyk7XHJcblxyXG5sZXQgbW9udGhzUGFyc2UgPSBbL15qYW4vaSwgL15mZWIvaSwgL15tYWFydHxtcnQuPyQvaSwgL15hcHIvaSwgL15tZWkkL2ksIC9eanVuW2kuXT8kL2ksIC9eanVsW2kuXT8kL2ksIC9eYXVnL2ksIC9ec2VwL2ksIC9eb2t0L2ksIC9ebm92L2ksIC9eZGVjL2ldO1xyXG5sZXQgbW9udGhzUmVnZXggPSAvXihqYW51YXJpfGZlYnJ1YXJpfG1hYXJ0fGFwcmlsfG1laXxhcHJpbHxqdVtubF1pfGF1Z3VzdHVzfHNlcHRlbWJlcnxva3RvYmVyfG5vdmVtYmVyfGRlY2VtYmVyfGphblxcLj98ZmViXFwuP3xtcnRcXC4/fGFwclxcLj98anVbbmxdXFwuP3xhdWdcXC4/fHNlcFxcLj98b2t0XFwuP3xub3ZcXC4/fGRlY1xcLj8pL2k7XHJcblxyXG5leHBvcnQgY29uc3QgbmxCZUxvY2FsZTogTG9jYWxlRGF0YSA9IHtcclxuICBhYmJyOiAnbmwtYmUnLFxyXG4gIG1vbnRoczogJ2phbnVhcmlfZmVicnVhcmlfbWFhcnRfYXByaWxfbWVpX2p1bmlfanVsaV9hdWd1c3R1c19zZXB0ZW1iZXJfb2t0b2Jlcl9ub3ZlbWJlcl9kZWNlbWJlcicuc3BsaXQoJ18nKSxcclxuICBtb250aHNTaG9ydChkYXRlOiBEYXRlLCBmb3JtYXQ6IHN0cmluZywgaXNVVEM/OiBib29sZWFuKTogc3RyaW5nIHwgc3RyaW5nW10ge1xyXG4gICAgaWYgKCFkYXRlKSB7XHJcbiAgICAgIHJldHVybiBtb250aHNTaG9ydFdpdGhEb3RzO1xyXG4gICAgfSBlbHNlIGlmICgvLU1NTS0vLnRlc3QoZm9ybWF0KSkge1xyXG4gICAgICByZXR1cm4gbW9udGhzU2hvcnRXaXRob3V0RG90c1tnZXRNb250aChkYXRlLCBpc1VUQyldO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIG1vbnRoc1Nob3J0V2l0aERvdHNbZ2V0TW9udGgoZGF0ZSwgaXNVVEMpXTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBtb250aHNSZWdleCxcclxuICBtb250aHNTaG9ydFJlZ2V4OiBtb250aHNSZWdleCxcclxuICBtb250aHNTdHJpY3RSZWdleDogL14oamFudWFyaXxmZWJydWFyaXxtYWFydHxtZWl8anVbbmxdaXxhcHJpbHxhdWd1c3R1c3xzZXB0ZW1iZXJ8b2t0b2Jlcnxub3ZlbWJlcnxkZWNlbWJlcikvaSxcclxuICBtb250aHNTaG9ydFN0cmljdFJlZ2V4OiAvXihqYW5cXC4/fGZlYlxcLj98bXJ0XFwuP3xhcHJcXC4/fG1laXxqdVtubF1cXC4/fGF1Z1xcLj98c2VwXFwuP3xva3RcXC4/fG5vdlxcLj98ZGVjXFwuPykvaSxcclxuXHJcbiAgbW9udGhzUGFyc2UsXHJcbiAgbG9uZ01vbnRoc1BhcnNlOiBtb250aHNQYXJzZSxcclxuICBzaG9ydE1vbnRoc1BhcnNlOiBtb250aHNQYXJzZSxcclxuXHJcbiAgd2Vla2RheXM6ICd6b25kYWdfbWFhbmRhZ19kaW5zZGFnX3dvZW5zZGFnX2RvbmRlcmRhZ192cmlqZGFnX3phdGVyZGFnJy5zcGxpdCgnXycpLFxyXG4gIHdlZWtkYXlzU2hvcnQ6ICd6by5fbWEuX2RpLl93by5fZG8uX3ZyLl96YS4nLnNwbGl0KCdfJyksXHJcbiAgd2Vla2RheXNNaW46ICd6b19tYV9kaV93b19kb192cl96YScuc3BsaXQoJ18nKSxcclxuICB3ZWVrZGF5c1BhcnNlRXhhY3Q6IHRydWUsXHJcbiAgbG9uZ0RhdGVGb3JtYXQ6IHtcclxuICAgIExUOiAnSEg6bW0nLFxyXG4gICAgTFRTOiAnSEg6bW06c3MnLFxyXG4gICAgTDogJ0REL01NL1lZWVknLFxyXG4gICAgTEw6ICdEIE1NTU0gWVlZWScsXHJcbiAgICBMTEw6ICdEIE1NTU0gWVlZWSBISDptbScsXHJcbiAgICBMTExMOiAnZGRkZCBEIE1NTU0gWVlZWSBISDptbSdcclxuICB9LFxyXG4gIGNhbGVuZGFyOiB7XHJcbiAgICBzYW1lRGF5OiAnW3ZhbmRhYWcgb21dIExUJyxcclxuICAgIG5leHREYXk6ICdbbW9yZ2VuIG9tXSBMVCcsXHJcbiAgICBuZXh0V2VlazogJ2RkZGQgW29tXSBMVCcsXHJcbiAgICBsYXN0RGF5OiAnW2dpc3RlcmVuIG9tXSBMVCcsXHJcbiAgICBsYXN0V2VlazogJ1thZmdlbG9wZW5dIGRkZGQgW29tXSBMVCcsXHJcbiAgICBzYW1lRWxzZTogJ0wnXHJcbiAgfSxcclxuICByZWxhdGl2ZVRpbWU6IHtcclxuICAgIGZ1dHVyZTogJ292ZXIgJXMnLFxyXG4gICAgcGFzdDogJyVzIGdlbGVkZW4nLFxyXG4gICAgczogJ2VlbiBwYWFyIHNlY29uZGVuJyxcclxuICAgIHNzOiAnJWQgc2Vjb25kZW4nLFxyXG4gICAgbTogJ8Opw6luIG1pbnV1dCcsXHJcbiAgICBtbTogJyVkIG1pbnV0ZW4nLFxyXG4gICAgaDogJ8Opw6luIHV1cicsXHJcbiAgICBoaDogJyVkIHV1cicsXHJcbiAgICBkOiAnw6nDqW4gZGFnJyxcclxuICAgIGRkOiAnJWQgZGFnZW4nLFxyXG4gICAgTTogJ8Opw6luIG1hYW5kJyxcclxuICAgIE1NOiAnJWQgbWFhbmRlbicsXHJcbiAgICB5OiAnw6nDqW4gamFhcicsXHJcbiAgICB5eTogJyVkIGphYXInXHJcbiAgfSxcclxuICBkYXlPZk1vbnRoT3JkaW5hbFBhcnNlOiAvXFxkezEsMn0oc3RlfGRlKS8sXHJcbiAgb3JkaW5hbChfbnVtOiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgY29uc3QgbnVtID0gTnVtYmVyKF9udW0pO1xyXG4gICAgcmV0dXJuIG51bSArICgobnVtID09PSAxIHx8IG51bSA9PT0gOCB8fCBudW0gPj0gMjApID8gJ3N0ZScgOiAnZGUnKTtcclxuICB9LFxyXG4gIHdlZWs6IHtcclxuICAgIGRvdzogMSwgLy8gTW9uZGF5IGlzIHRoZSBmaXJzdCBkYXkgb2YgdGhlIHdlZWsuXHJcbiAgICBkb3k6IDQgIC8vIFRoZSB3ZWVrIHRoYXQgY29udGFpbnMgSmFuIDR0aCBpcyB0aGUgZmlyc3Qgd2VlayBvZiB0aGUgeWVhci5cclxuICB9XHJcbn07XHJcbiJdfQ==