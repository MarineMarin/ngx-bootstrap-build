//! moment.js locale configuration
//! locale : Latvian [lv]
//! author : Matiss Janis Aboltins : https://github.com/matissjanis
export const lvLocale = {
    abbr: 'lv',
    months: 'Janvāris_Februāris_Marts_Aprīlis_Maijs_Jūnijs_Jūlijs_Augusts_Septembris_Oktobris_Novembris_Decembris'.split('_'),
    monthsShort: 'Jan_Feb_Mar_Apr_Mai_Jūn_Jūl_Aug_Sep_Okt_Nov_Dec'.split('_'),
    weekdays: 'Svētdiena_Pirmdiena_Otrdiena_Trešdiena_Ceturtdiena_Piektdiena_Sestdiena'.split('_'),
    weekdaysShort: 'Svētd_Pirmd_Otrd_Trešd_Ceturtd_Piektd_Sestd'.split('_'),
    weekdaysMin: 'Sv_Pi_Ot_Tr_Ce_Pk_Se'.split('_'),
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY HH:mm',
        LLLL: 'dddd, D MMMM YYYY HH:mm'
    },
    calendar: {
        sameDay: '[Today at] LT',
        nextDay: '[Tomorrow at] LT',
        nextWeek: 'dddd [at] LT',
        lastDay: '[Yesterday at] LT',
        lastWeek: '[Last] dddd [at] LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: 'pēc %s',
        past: 'pirms %s',
        s: 'dažām sekundēm',
        ss: '%d sekundēm',
        m: 'minūtes',
        mm: '%d minūtēm',
        h: 'stundas',
        hh: '%d stundām',
        d: 'dienas',
        dd: '%d dienām',
        M: 'mēneša',
        MM: '%d mēnešiem',
        y: 'gada',
        yy: '%d gadiem'
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal(num) {
        return num + '.';
    },
    week: {
        dow: 1,
        doy: 4 // The week that contains Jan 4th is the first week of the year.
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibHYuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvY2hyb25vcy9pMThuL2x2LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLGtDQUFrQztBQUNsQyx5QkFBeUI7QUFDekIsbUVBQW1FO0FBRW5FLE1BQU0sQ0FBQyxNQUFNLFFBQVEsR0FBZTtJQUNsQyxJQUFJLEVBQUUsSUFBSTtJQUNWLE1BQU0sRUFBRyxzR0FBc0csQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQzFILFdBQVcsRUFBRyxpREFBaUQsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQzFFLFFBQVEsRUFBRyx5RUFBeUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQy9GLGFBQWEsRUFBRyw2Q0FBNkMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQ3hFLFdBQVcsRUFBRyxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQy9DLGNBQWMsRUFBRztRQUNmLEVBQUUsRUFBRyxPQUFPO1FBQ1osR0FBRyxFQUFHLFVBQVU7UUFDaEIsQ0FBQyxFQUFHLFlBQVk7UUFDaEIsRUFBRSxFQUFHLGFBQWE7UUFDbEIsR0FBRyxFQUFHLG1CQUFtQjtRQUN6QixJQUFJLEVBQUcseUJBQXlCO0tBQ2pDO0lBQ0QsUUFBUSxFQUFHO1FBQ1QsT0FBTyxFQUFHLGVBQWU7UUFDekIsT0FBTyxFQUFHLGtCQUFrQjtRQUM1QixRQUFRLEVBQUcsY0FBYztRQUN6QixPQUFPLEVBQUcsbUJBQW1CO1FBQzdCLFFBQVEsRUFBRyxxQkFBcUI7UUFDaEMsUUFBUSxFQUFHLEdBQUc7S0FDZjtJQUNELFlBQVksRUFBRztRQUNiLE1BQU0sRUFBRyxRQUFRO1FBQ2pCLElBQUksRUFBRyxVQUFVO1FBQ2pCLENBQUMsRUFBRyxnQkFBZ0I7UUFDcEIsRUFBRSxFQUFHLGFBQWE7UUFDbEIsQ0FBQyxFQUFHLFNBQVM7UUFDYixFQUFFLEVBQUcsWUFBWTtRQUNqQixDQUFDLEVBQUcsU0FBUztRQUNiLEVBQUUsRUFBRyxZQUFZO1FBQ2pCLENBQUMsRUFBRyxRQUFRO1FBQ1osRUFBRSxFQUFHLFdBQVc7UUFDaEIsQ0FBQyxFQUFHLFFBQVE7UUFDWixFQUFFLEVBQUcsYUFBYTtRQUNsQixDQUFDLEVBQUcsTUFBTTtRQUNWLEVBQUUsRUFBRyxXQUFXO0tBQ2pCO0lBQ0Qsc0JBQXNCLEVBQUUsV0FBVztJQUNuQyxPQUFPLENBQUMsR0FBRztRQUNQLE9BQU8sR0FBRyxHQUFHLEdBQUcsQ0FBQztJQUNyQixDQUFDO0lBQ0QsSUFBSSxFQUFHO1FBQ0wsR0FBRyxFQUFHLENBQUM7UUFDUCxHQUFHLEVBQUcsQ0FBQyxDQUFFLGdFQUFnRTtLQUMxRTtDQUNGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2NhbGVEYXRhIH0gZnJvbSAnLi4vbG9jYWxlL2xvY2FsZS5jbGFzcyc7XHJcblxyXG4vLyEgbW9tZW50LmpzIGxvY2FsZSBjb25maWd1cmF0aW9uXHJcbi8vISBsb2NhbGUgOiBMYXR2aWFuIFtsdl1cclxuLy8hIGF1dGhvciA6IE1hdGlzcyBKYW5pcyBBYm9sdGlucyA6IGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRpc3NqYW5pc1xyXG5cclxuZXhwb3J0IGNvbnN0IGx2TG9jYWxlOiBMb2NhbGVEYXRhID0ge1xyXG4gIGFiYnI6ICdsdicsXHJcbiAgbW9udGhzIDogJ0phbnbEgXJpc19GZWJydcSBcmlzX01hcnRzX0FwcsSrbGlzX01haWpzX0rFq25panNfSsWrbGlqc19BdWd1c3RzX1NlcHRlbWJyaXNfT2t0b2JyaXNfTm92ZW1icmlzX0RlY2VtYnJpcycuc3BsaXQoJ18nKSxcclxuICBtb250aHNTaG9ydCA6ICdKYW5fRmViX01hcl9BcHJfTWFpX0rFq25fSsWrbF9BdWdfU2VwX09rdF9Ob3ZfRGVjJy5zcGxpdCgnXycpLFxyXG4gIHdlZWtkYXlzIDogJ1N2xJN0ZGllbmFfUGlybWRpZW5hX090cmRpZW5hX1RyZcWhZGllbmFfQ2V0dXJ0ZGllbmFfUGlla3RkaWVuYV9TZXN0ZGllbmEnLnNwbGl0KCdfJyksXHJcbiAgd2Vla2RheXNTaG9ydCA6ICdTdsSTdGRfUGlybWRfT3RyZF9UcmXFoWRfQ2V0dXJ0ZF9QaWVrdGRfU2VzdGQnLnNwbGl0KCdfJyksXHJcbiAgd2Vla2RheXNNaW4gOiAnU3ZfUGlfT3RfVHJfQ2VfUGtfU2UnLnNwbGl0KCdfJyksXHJcbiAgbG9uZ0RhdGVGb3JtYXQgOiB7XHJcbiAgICBMVCA6ICdISDptbScsXHJcbiAgICBMVFMgOiAnSEg6bW06c3MnLFxyXG4gICAgTCA6ICdERC9NTS9ZWVlZJyxcclxuICAgIExMIDogJ0QgTU1NTSBZWVlZJyxcclxuICAgIExMTCA6ICdEIE1NTU0gWVlZWSBISDptbScsXHJcbiAgICBMTExMIDogJ2RkZGQsIEQgTU1NTSBZWVlZIEhIOm1tJ1xyXG4gIH0sXHJcbiAgY2FsZW5kYXIgOiB7XHJcbiAgICBzYW1lRGF5IDogJ1tUb2RheSBhdF0gTFQnLFxyXG4gICAgbmV4dERheSA6ICdbVG9tb3Jyb3cgYXRdIExUJyxcclxuICAgIG5leHRXZWVrIDogJ2RkZGQgW2F0XSBMVCcsXHJcbiAgICBsYXN0RGF5IDogJ1tZZXN0ZXJkYXkgYXRdIExUJyxcclxuICAgIGxhc3RXZWVrIDogJ1tMYXN0XSBkZGRkIFthdF0gTFQnLFxyXG4gICAgc2FtZUVsc2UgOiAnTCdcclxuICB9LFxyXG4gIHJlbGF0aXZlVGltZSA6IHtcclxuICAgIGZ1dHVyZSA6ICdwxJNjICVzJyxcclxuICAgIHBhc3QgOiAncGlybXMgJXMnLFxyXG4gICAgcyA6ICdkYcW+xIFtIHNla3VuZMSTbScsXHJcbiAgICBzcyA6ICclZCBzZWt1bmTEk20nLFxyXG4gICAgbSA6ICdtaW7Fq3RlcycsXHJcbiAgICBtbSA6ICclZCBtaW7Fq3TEk20nLFxyXG4gICAgaCA6ICdzdHVuZGFzJyxcclxuICAgIGhoIDogJyVkIHN0dW5kxIFtJyxcclxuICAgIGQgOiAnZGllbmFzJyxcclxuICAgIGRkIDogJyVkIGRpZW7EgW0nLFxyXG4gICAgTSA6ICdtxJNuZcWhYScsXHJcbiAgICBNTSA6ICclZCBtxJNuZcWhaWVtJyxcclxuICAgIHkgOiAnZ2FkYScsXHJcbiAgICB5eSA6ICclZCBnYWRpZW0nXHJcbiAgfSxcclxuICBkYXlPZk1vbnRoT3JkaW5hbFBhcnNlOiAvXFxkezEsMn1cXC4vLFxyXG4gIG9yZGluYWwobnVtKSB7XHJcbiAgICAgIHJldHVybiBudW0gKyAnLic7XHJcbiAgfSxcclxuICB3ZWVrIDoge1xyXG4gICAgZG93IDogMSwgLy8gTW9uZGF5IGlzIHRoZSBmaXJzdCBkYXkgb2YgdGhlIHdlZWsuXHJcbiAgICBkb3kgOiA0ICAvLyBUaGUgd2VlayB0aGF0IGNvbnRhaW5zIEphbiA0dGggaXMgdGhlIGZpcnN0IHdlZWsgb2YgdGhlIHllYXIuXHJcbiAgfVxyXG59O1xyXG4iXX0=