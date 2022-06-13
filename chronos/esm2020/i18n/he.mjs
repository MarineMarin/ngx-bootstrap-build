//! moment.js locale configuration
//! locale : Hebrew [he]
//! author : Tomer Cohen : https://github.com/tomer
//! author : Moshe Simantov : https://github.com/DevelopmentIL
//! author : Tal Ater : https://github.com/TalAter
export const heLocale = {
    abbr: 'he',
    months: 'ינואר_פברואר_מרץ_אפריל_מאי_יוני_יולי_אוגוסט_ספטמבר_אוקטובר_נובמבר_דצמבר'.split('_'),
    monthsShort: 'ינו׳_פבר׳_מרץ_אפר׳_מאי_יוני_יולי_אוג׳_ספט׳_אוק׳_נוב׳_דצמ׳'.split('_'),
    weekdays: 'ראשון_שני_שלישי_רביעי_חמישי_שישי_שבת'.split('_'),
    weekdaysShort: 'א׳_ב׳_ג׳_ד׳_ה׳_ו׳_ש׳'.split('_'),
    weekdaysMin: 'א_ב_ג_ד_ה_ו_ש'.split('_'),
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D [ב]MMMM YYYY',
        LLL: 'D [ב]MMMM YYYY HH:mm',
        LLLL: 'dddd, D [ב]MMMM YYYY HH:mm',
        l: 'D/M/YYYY',
        ll: 'D MMM YYYY',
        lll: 'D MMM YYYY HH:mm',
        llll: 'ddd, D MMM YYYY HH:mm'
    },
    calendar: {
        sameDay: '[היום ב־]LT',
        nextDay: '[מחר ב־]LT',
        nextWeek: 'dddd [בשעה] LT',
        lastDay: '[אתמול ב־]LT',
        lastWeek: '[ביום] dddd [האחרון בשעה] LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: 'בעוד %s',
        past: 'לפני %s',
        s: 'מספר שניות',
        ss: '%d שניות',
        m: 'דקה',
        mm: '%d דקות',
        h: 'שעה',
        hh(num) {
            if (num === 2) {
                return 'שעתיים';
            }
            return num + ' שעות';
        },
        d: 'יום',
        dd(num) {
            if (num === 2) {
                return 'יומיים';
            }
            return num + ' ימים';
        },
        M: 'חודש',
        MM(num) {
            if (num === 2) {
                return 'חודשיים';
            }
            return num + ' חודשים';
        },
        y: 'שנה',
        yy(num) {
            if (num === 2) {
                return 'שנתיים';
            }
            else if (num % 10 === 0 && num !== 10) {
                return num + ' שנה';
            }
            return num + ' שנים';
        }
    },
    meridiemParse: /אחה"צ|לפנה"צ|אחרי הצהריים|לפני הצהריים|לפנות בוקר|בבוקר|בערב/i,
    isPM(input) {
        return /^(אחה"צ|אחרי הצהריים|בערב)$/.test(input);
    },
    meridiem(hour, minute, isLower) {
        if (hour < 5) {
            return 'לפנות בוקר';
        }
        else if (hour < 10) {
            return 'בבוקר';
        }
        else if (hour < 12) {
            return isLower ? 'לפנה"צ' : 'לפני הצהריים';
        }
        else if (hour < 18) {
            return isLower ? 'אחה"צ' : 'אחרי הצהריים';
        }
        else {
            return 'בערב';
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvY2hyb25vcy9pMThuL2hlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLGtDQUFrQztBQUNsQyx3QkFBd0I7QUFDeEIsbURBQW1EO0FBQ25ELDhEQUE4RDtBQUM5RCxrREFBa0Q7QUFFbEQsTUFBTSxDQUFDLE1BQU0sUUFBUSxHQUFlO0lBQ2xDLElBQUksRUFBRSxJQUFJO0lBQ1YsTUFBTSxFQUFFLHlFQUF5RSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7SUFDNUYsV0FBVyxFQUFFLDJEQUEyRCxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7SUFDbkYsUUFBUSxFQUFFLHNDQUFzQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7SUFDM0QsYUFBYSxFQUFFLHNCQUFzQixDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7SUFDaEQsV0FBVyxFQUFFLGVBQWUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQ3ZDLGNBQWMsRUFBRTtRQUNkLEVBQUUsRUFBRSxPQUFPO1FBQ1gsR0FBRyxFQUFFLFVBQVU7UUFDZixDQUFDLEVBQUUsWUFBWTtRQUNmLEVBQUUsRUFBRSxnQkFBZ0I7UUFDcEIsR0FBRyxFQUFFLHNCQUFzQjtRQUMzQixJQUFJLEVBQUUsNEJBQTRCO1FBQ2xDLENBQUMsRUFBRSxVQUFVO1FBQ2IsRUFBRSxFQUFFLFlBQVk7UUFDaEIsR0FBRyxFQUFFLGtCQUFrQjtRQUN2QixJQUFJLEVBQUUsdUJBQXVCO0tBQzlCO0lBQ0QsUUFBUSxFQUFFO1FBQ1IsT0FBTyxFQUFFLGFBQWE7UUFDdEIsT0FBTyxFQUFFLFlBQVk7UUFDckIsUUFBUSxFQUFFLGdCQUFnQjtRQUMxQixPQUFPLEVBQUUsY0FBYztRQUN2QixRQUFRLEVBQUUsOEJBQThCO1FBQ3hDLFFBQVEsRUFBRSxHQUFHO0tBQ2Q7SUFDRCxZQUFZLEVBQUU7UUFDWixNQUFNLEVBQUUsU0FBUztRQUNqQixJQUFJLEVBQUUsU0FBUztRQUNmLENBQUMsRUFBRSxZQUFZO1FBQ2YsRUFBRSxFQUFFLFVBQVU7UUFDZCxDQUFDLEVBQUUsS0FBSztRQUNSLEVBQUUsRUFBRSxTQUFTO1FBQ2IsQ0FBQyxFQUFFLEtBQUs7UUFDUixFQUFFLENBQUMsR0FBVztZQUNaLElBQUksR0FBRyxLQUFLLENBQUMsRUFBRTtnQkFDYixPQUFPLFFBQVEsQ0FBQzthQUNqQjtZQUNELE9BQU8sR0FBRyxHQUFHLE9BQU8sQ0FBQztRQUN2QixDQUFDO1FBQ0QsQ0FBQyxFQUFFLEtBQUs7UUFDUixFQUFFLENBQUMsR0FBVztZQUNaLElBQUksR0FBRyxLQUFLLENBQUMsRUFBRTtnQkFDYixPQUFPLFFBQVEsQ0FBQzthQUNqQjtZQUNELE9BQU8sR0FBRyxHQUFHLE9BQU8sQ0FBQztRQUN2QixDQUFDO1FBQ0QsQ0FBQyxFQUFFLE1BQU07UUFDVCxFQUFFLENBQUMsR0FBVztZQUNaLElBQUksR0FBRyxLQUFLLENBQUMsRUFBRTtnQkFDYixPQUFPLFNBQVMsQ0FBQzthQUNsQjtZQUNELE9BQU8sR0FBRyxHQUFHLFNBQVMsQ0FBQztRQUN6QixDQUFDO1FBQ0QsQ0FBQyxFQUFFLEtBQUs7UUFDUixFQUFFLENBQUMsR0FBVztZQUNaLElBQUksR0FBRyxLQUFLLENBQUMsRUFBRTtnQkFDYixPQUFPLFFBQVEsQ0FBQzthQUNqQjtpQkFBTSxJQUFJLEdBQUcsR0FBRyxFQUFFLEtBQUssQ0FBQyxJQUFJLEdBQUcsS0FBSyxFQUFFLEVBQUU7Z0JBQ3ZDLE9BQU8sR0FBRyxHQUFHLE1BQU0sQ0FBQzthQUNyQjtZQUNELE9BQU8sR0FBRyxHQUFHLE9BQU8sQ0FBQztRQUN2QixDQUFDO0tBQ0Y7SUFDRCxhQUFhLEVBQUUsK0RBQStEO0lBQzlFLElBQUksQ0FBQyxLQUFLO1FBQ1IsT0FBTyw2QkFBNkIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUNELFFBQVEsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU87UUFDNUIsSUFBSSxJQUFJLEdBQUcsQ0FBQyxFQUFFO1lBQ1osT0FBTyxZQUFZLENBQUM7U0FDckI7YUFBTSxJQUFJLElBQUksR0FBRyxFQUFFLEVBQUU7WUFDcEIsT0FBTyxPQUFPLENBQUM7U0FDaEI7YUFBTSxJQUFJLElBQUksR0FBRyxFQUFFLEVBQUU7WUFDcEIsT0FBTyxPQUFPLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDO1NBQzVDO2FBQU0sSUFBSSxJQUFJLEdBQUcsRUFBRSxFQUFFO1lBQ3BCLE9BQU8sT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQztTQUMzQzthQUFNO1lBQ0wsT0FBTyxNQUFNLENBQUM7U0FDZjtJQUNILENBQUM7Q0FDRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9jYWxlRGF0YSB9IGZyb20gJy4uL2xvY2FsZS9sb2NhbGUuY2xhc3MnO1xyXG5cclxuLy8hIG1vbWVudC5qcyBsb2NhbGUgY29uZmlndXJhdGlvblxyXG4vLyEgbG9jYWxlIDogSGVicmV3IFtoZV1cclxuLy8hIGF1dGhvciA6IFRvbWVyIENvaGVuIDogaHR0cHM6Ly9naXRodWIuY29tL3RvbWVyXHJcbi8vISBhdXRob3IgOiBNb3NoZSBTaW1hbnRvdiA6IGh0dHBzOi8vZ2l0aHViLmNvbS9EZXZlbG9wbWVudElMXHJcbi8vISBhdXRob3IgOiBUYWwgQXRlciA6IGh0dHBzOi8vZ2l0aHViLmNvbS9UYWxBdGVyXHJcblxyXG5leHBvcnQgY29uc3QgaGVMb2NhbGU6IExvY2FsZURhdGEgPSB7XHJcbiAgYWJicjogJ2hlJyxcclxuICBtb250aHM6ICfXmdeg15XXkNeoX9ek15HXqNeV15DXqF/Xnteo16Vf15DXpNeo15nXnF/XnteQ15lf15nXldeg15lf15nXldec15lf15DXldeS15XXodeYX9eh16TXmNee15HXqF/XkNeV16fXmNeV15HXqF/XoNeV15HXnteR16hf15PXptee15HXqCcuc3BsaXQoJ18nKSxcclxuICBtb250aHNTaG9ydDogJ9eZ16DXldezX9ek15HXqNezX9ee16jXpV/XkNek16jXs1/XnteQ15lf15nXldeg15lf15nXldec15lf15DXldeS17Nf16HXpNeY17Nf15DXlden17Nf16DXldeR17Nf15PXptee17MnLnNwbGl0KCdfJyksXHJcbiAgd2Vla2RheXM6ICfXqNeQ16nXldefX9ep16DXmV/Xqdec15nXqdeZX9eo15HXmdei15lf15fXnteZ16nXmV/XqdeZ16nXmV/XqdeR16onLnNwbGl0KCdfJyksXHJcbiAgd2Vla2RheXNTaG9ydDogJ9eQ17Nf15HXs1/XktezX9eT17Nf15TXs1/XldezX9ep17MnLnNwbGl0KCdfJyksXHJcbiAgd2Vla2RheXNNaW46ICfXkF/XkV/Xkl/Xk1/XlF/XlV/XqScuc3BsaXQoJ18nKSxcclxuICBsb25nRGF0ZUZvcm1hdDoge1xyXG4gICAgTFQ6ICdISDptbScsXHJcbiAgICBMVFM6ICdISDptbTpzcycsXHJcbiAgICBMOiAnREQvTU0vWVlZWScsXHJcbiAgICBMTDogJ0QgW9eRXU1NTU0gWVlZWScsXHJcbiAgICBMTEw6ICdEIFvXkV1NTU1NIFlZWVkgSEg6bW0nLFxyXG4gICAgTExMTDogJ2RkZGQsIEQgW9eRXU1NTU0gWVlZWSBISDptbScsXHJcbiAgICBsOiAnRC9NL1lZWVknLFxyXG4gICAgbGw6ICdEIE1NTSBZWVlZJyxcclxuICAgIGxsbDogJ0QgTU1NIFlZWVkgSEg6bW0nLFxyXG4gICAgbGxsbDogJ2RkZCwgRCBNTU0gWVlZWSBISDptbSdcclxuICB9LFxyXG4gIGNhbGVuZGFyOiB7XHJcbiAgICBzYW1lRGF5OiAnW9eU15nXldedINeR1r5dTFQnLFxyXG4gICAgbmV4dERheTogJ1vXnteX16gg15HWvl1MVCcsXHJcbiAgICBuZXh0V2VlazogJ2RkZGQgW9eR16nXoteUXSBMVCcsXHJcbiAgICBsYXN0RGF5OiAnW9eQ16rXnteV15wg15HWvl1MVCcsXHJcbiAgICBsYXN0V2VlazogJ1vXkdeZ15XXnV0gZGRkZCBb15TXkNeX16jXldefINeR16nXoteUXSBMVCcsXHJcbiAgICBzYW1lRWxzZTogJ0wnXHJcbiAgfSxcclxuICByZWxhdGl2ZVRpbWU6IHtcclxuICAgIGZ1dHVyZTogJ9eR16LXldeTICVzJyxcclxuICAgIHBhc3Q6ICfXnNek16DXmSAlcycsXHJcbiAgICBzOiAn157Xodek16gg16nXoNeZ15XXqicsXHJcbiAgICBzczogJyVkINep16DXmdeV16onLFxyXG4gICAgbTogJ9eT16fXlCcsXHJcbiAgICBtbTogJyVkINeT16fXldeqJyxcclxuICAgIGg6ICfXqdei15QnLFxyXG4gICAgaGgobnVtOiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgICBpZiAobnVtID09PSAyKSB7XHJcbiAgICAgICAgcmV0dXJuICfXqdei16rXmdeZ150nO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBudW0gKyAnINep16LXldeqJztcclxuICAgIH0sXHJcbiAgICBkOiAn15nXldedJyxcclxuICAgIGRkKG51bTogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgICAgaWYgKG51bSA9PT0gMikge1xyXG4gICAgICAgIHJldHVybiAn15nXldee15nXmdedJztcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gbnVtICsgJyDXmdee15nXnSc7XHJcbiAgICB9LFxyXG4gICAgTTogJ9eX15XXk9epJyxcclxuICAgIE1NKG51bTogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgICAgaWYgKG51bSA9PT0gMikge1xyXG4gICAgICAgIHJldHVybiAn15fXldeT16nXmdeZ150nO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBudW0gKyAnINeX15XXk9ep15nXnSc7XHJcbiAgICB9LFxyXG4gICAgeTogJ9ep16DXlCcsXHJcbiAgICB5eShudW06IG51bWJlcik6IHN0cmluZyB7XHJcbiAgICAgIGlmIChudW0gPT09IDIpIHtcclxuICAgICAgICByZXR1cm4gJ9ep16DXqteZ15nXnSc7XHJcbiAgICAgIH0gZWxzZSBpZiAobnVtICUgMTAgPT09IDAgJiYgbnVtICE9PSAxMCkge1xyXG4gICAgICAgIHJldHVybiBudW0gKyAnINep16DXlCc7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG51bSArICcg16nXoNeZ150nO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgbWVyaWRpZW1QYXJzZTogL9eQ15fXlFwi16Z815zXpNeg15RcItemfNeQ15fXqNeZINeU16bXlNeo15nXmdedfNec16TXoNeZINeU16bXlNeo15nXmdedfNec16TXoNeV16og15HXlden16h815HXkdeV16fXqHzXkdei16jXkS9pLFxyXG4gIGlzUE0oaW5wdXQpIHtcclxuICAgIHJldHVybiAvXijXkNeX15RcItemfNeQ15fXqNeZINeU16bXlNeo15nXmdedfNeR16LXqNeRKSQvLnRlc3QoaW5wdXQpO1xyXG4gIH0sXHJcbiAgbWVyaWRpZW0oaG91ciwgbWludXRlLCBpc0xvd2VyKSB7XHJcbiAgICBpZiAoaG91ciA8IDUpIHtcclxuICAgICAgcmV0dXJuICfXnNek16DXldeqINeR15XXp9eoJztcclxuICAgIH0gZWxzZSBpZiAoaG91ciA8IDEwKSB7XHJcbiAgICAgIHJldHVybiAn15HXkdeV16fXqCc7XHJcbiAgICB9IGVsc2UgaWYgKGhvdXIgPCAxMikge1xyXG4gICAgICByZXR1cm4gaXNMb3dlciA/ICfXnNek16DXlFwi16YnIDogJ9ec16TXoNeZINeU16bXlNeo15nXmdedJztcclxuICAgIH0gZWxzZSBpZiAoaG91ciA8IDE4KSB7XHJcbiAgICAgIHJldHVybiBpc0xvd2VyID8gJ9eQ15fXlFwi16YnIDogJ9eQ15fXqNeZINeU16bXlNeo15nXmdedJztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiAn15HXoteo15EnO1xyXG4gICAgfVxyXG4gIH1cclxufTtcclxuIl19