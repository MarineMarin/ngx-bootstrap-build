//! moment.js locale configuration
//! locale : Swedish [sv]
//! author : Jens Alm : https://github.com/ulmus
export const svLocale = {
    abbr: 'sv',
    months: 'januari_februari_mars_april_maj_juni_juli_augusti_september_oktober_november_december'.split('_'),
    monthsShort: 'jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec'.split('_'),
    weekdays: 'söndag_måndag_tisdag_onsdag_torsdag_fredag_lördag'.split('_'),
    weekdaysShort: 'sön_mån_tis_ons_tor_fre_lör'.split('_'),
    weekdaysMin: 'sö_må_ti_on_to_fr_lö'.split('_'),
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'YYYY-MM-DD',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY [kl.] HH:mm',
        LLLL: 'dddd D MMMM YYYY [kl.] HH:mm',
        lll: 'D MMM YYYY HH:mm',
        llll: 'ddd D MMM YYYY HH:mm'
    },
    calendar: {
        sameDay: '[Idag] LT',
        nextDay: '[Imorgon] LT',
        lastDay: '[Igår] LT',
        nextWeek: '[På] dddd LT',
        lastWeek: '[I] dddd[s] LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: 'om %s',
        past: 'för %s sedan',
        s: 'några sekunder',
        ss: '%d sekunder',
        m: 'en minut',
        mm: '%d minuter',
        h: 'en timme',
        hh: '%d timmar',
        d: 'en dag',
        dd: '%d dagar',
        M: 'en månad',
        MM: '%d månader',
        y: 'ett år',
        yy: '%d år'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(e|a)/,
    ordinal(_num) {
        const num = Number(_num);
        let b = num % 10, output = (~~(num % 100 / 10) === 1) ? 'e' :
            (b === 1) ? 'a' :
                (b === 2) ? 'a' :
                    (b === 3) ? 'e' : 'e';
        return num + output;
    },
    week: {
        dow: 1,
        doy: 4 // The week that contains Jan 4th is the first week of the year.
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3YuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvY2hyb25vcy9pMThuL3N2LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLGtDQUFrQztBQUNsQyx5QkFBeUI7QUFDekIsZ0RBQWdEO0FBRWhELE1BQU0sQ0FBQyxNQUFNLFFBQVEsR0FBZTtJQUNsQyxJQUFJLEVBQUUsSUFBSTtJQUNWLE1BQU0sRUFBRSx1RkFBdUYsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQzFHLFdBQVcsRUFBRSxpREFBaUQsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQ3pFLFFBQVEsRUFBRSxtREFBbUQsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQ3hFLGFBQWEsRUFBRSw2QkFBNkIsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQ3ZELFdBQVcsRUFBRSxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQzlDLGNBQWMsRUFBRTtRQUNkLEVBQUUsRUFBRSxPQUFPO1FBQ1gsR0FBRyxFQUFFLFVBQVU7UUFDZixDQUFDLEVBQUUsWUFBWTtRQUNmLEVBQUUsRUFBRSxhQUFhO1FBQ2pCLEdBQUcsRUFBRSx5QkFBeUI7UUFDOUIsSUFBSSxFQUFFLDhCQUE4QjtRQUNwQyxHQUFHLEVBQUUsa0JBQWtCO1FBQ3ZCLElBQUksRUFBRSxzQkFBc0I7S0FDN0I7SUFDRCxRQUFRLEVBQUU7UUFDUixPQUFPLEVBQUUsV0FBVztRQUNwQixPQUFPLEVBQUUsY0FBYztRQUN2QixPQUFPLEVBQUUsV0FBVztRQUNwQixRQUFRLEVBQUUsY0FBYztRQUN4QixRQUFRLEVBQUUsZ0JBQWdCO1FBQzFCLFFBQVEsRUFBRSxHQUFHO0tBQ2Q7SUFDRCxZQUFZLEVBQUU7UUFDWixNQUFNLEVBQUUsT0FBTztRQUNmLElBQUksRUFBRSxjQUFjO1FBQ3BCLENBQUMsRUFBRSxnQkFBZ0I7UUFDbkIsRUFBRSxFQUFFLGFBQWE7UUFDakIsQ0FBQyxFQUFFLFVBQVU7UUFDYixFQUFFLEVBQUUsWUFBWTtRQUNoQixDQUFDLEVBQUUsVUFBVTtRQUNiLEVBQUUsRUFBRSxXQUFXO1FBQ2YsQ0FBQyxFQUFFLFFBQVE7UUFDWCxFQUFFLEVBQUUsVUFBVTtRQUNkLENBQUMsRUFBRSxVQUFVO1FBQ2IsRUFBRSxFQUFFLFlBQVk7UUFDaEIsQ0FBQyxFQUFFLFFBQVE7UUFDWCxFQUFFLEVBQUUsT0FBTztLQUNaO0lBQ0Qsc0JBQXNCLEVBQUUsY0FBYztJQUN0QyxPQUFPLENBQUMsSUFBWTtRQUNsQixNQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLEVBQUUsRUFDZCxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN6QyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2YsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNmLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUM5QixPQUFPLEdBQUcsR0FBRyxNQUFNLENBQUM7SUFDdEIsQ0FBQztJQUNELElBQUksRUFBRTtRQUNKLEdBQUcsRUFBRSxDQUFDO1FBQ04sR0FBRyxFQUFFLENBQUMsQ0FBRSxnRUFBZ0U7S0FDekU7Q0FDRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9jYWxlRGF0YSB9IGZyb20gJy4uL2xvY2FsZS9sb2NhbGUuY2xhc3MnO1xyXG5cclxuLy8hIG1vbWVudC5qcyBsb2NhbGUgY29uZmlndXJhdGlvblxyXG4vLyEgbG9jYWxlIDogU3dlZGlzaCBbc3ZdXHJcbi8vISBhdXRob3IgOiBKZW5zIEFsbSA6IGh0dHBzOi8vZ2l0aHViLmNvbS91bG11c1xyXG5cclxuZXhwb3J0IGNvbnN0IHN2TG9jYWxlOiBMb2NhbGVEYXRhID0ge1xyXG4gIGFiYnI6ICdzdicsXHJcbiAgbW9udGhzOiAnamFudWFyaV9mZWJydWFyaV9tYXJzX2FwcmlsX21hal9qdW5pX2p1bGlfYXVndXN0aV9zZXB0ZW1iZXJfb2t0b2Jlcl9ub3ZlbWJlcl9kZWNlbWJlcicuc3BsaXQoJ18nKSxcclxuICBtb250aHNTaG9ydDogJ2phbl9mZWJfbWFyX2Fwcl9tYWpfanVuX2p1bF9hdWdfc2VwX29rdF9ub3ZfZGVjJy5zcGxpdCgnXycpLFxyXG4gIHdlZWtkYXlzOiAnc8O2bmRhZ19tw6VuZGFnX3Rpc2RhZ19vbnNkYWdfdG9yc2RhZ19mcmVkYWdfbMO2cmRhZycuc3BsaXQoJ18nKSxcclxuICB3ZWVrZGF5c1Nob3J0OiAnc8O2bl9tw6VuX3Rpc19vbnNfdG9yX2ZyZV9sw7ZyJy5zcGxpdCgnXycpLFxyXG4gIHdlZWtkYXlzTWluOiAnc8O2X23DpV90aV9vbl90b19mcl9sw7YnLnNwbGl0KCdfJyksXHJcbiAgbG9uZ0RhdGVGb3JtYXQ6IHtcclxuICAgIExUOiAnSEg6bW0nLFxyXG4gICAgTFRTOiAnSEg6bW06c3MnLFxyXG4gICAgTDogJ1lZWVktTU0tREQnLFxyXG4gICAgTEw6ICdEIE1NTU0gWVlZWScsXHJcbiAgICBMTEw6ICdEIE1NTU0gWVlZWSBba2wuXSBISDptbScsXHJcbiAgICBMTExMOiAnZGRkZCBEIE1NTU0gWVlZWSBba2wuXSBISDptbScsXHJcbiAgICBsbGw6ICdEIE1NTSBZWVlZIEhIOm1tJyxcclxuICAgIGxsbGw6ICdkZGQgRCBNTU0gWVlZWSBISDptbSdcclxuICB9LFxyXG4gIGNhbGVuZGFyOiB7XHJcbiAgICBzYW1lRGF5OiAnW0lkYWddIExUJyxcclxuICAgIG5leHREYXk6ICdbSW1vcmdvbl0gTFQnLFxyXG4gICAgbGFzdERheTogJ1tJZ8Olcl0gTFQnLFxyXG4gICAgbmV4dFdlZWs6ICdbUMOlXSBkZGRkIExUJyxcclxuICAgIGxhc3RXZWVrOiAnW0ldIGRkZGRbc10gTFQnLFxyXG4gICAgc2FtZUVsc2U6ICdMJ1xyXG4gIH0sXHJcbiAgcmVsYXRpdmVUaW1lOiB7XHJcbiAgICBmdXR1cmU6ICdvbSAlcycsXHJcbiAgICBwYXN0OiAnZsO2ciAlcyBzZWRhbicsXHJcbiAgICBzOiAnbsOlZ3JhIHNla3VuZGVyJyxcclxuICAgIHNzOiAnJWQgc2VrdW5kZXInLFxyXG4gICAgbTogJ2VuIG1pbnV0JyxcclxuICAgIG1tOiAnJWQgbWludXRlcicsXHJcbiAgICBoOiAnZW4gdGltbWUnLFxyXG4gICAgaGg6ICclZCB0aW1tYXInLFxyXG4gICAgZDogJ2VuIGRhZycsXHJcbiAgICBkZDogJyVkIGRhZ2FyJyxcclxuICAgIE06ICdlbiBtw6VuYWQnLFxyXG4gICAgTU06ICclZCBtw6VuYWRlcicsXHJcbiAgICB5OiAnZXR0IMOlcicsXHJcbiAgICB5eTogJyVkIMOlcidcclxuICB9LFxyXG4gIGRheU9mTW9udGhPcmRpbmFsUGFyc2U6IC9cXGR7MSwyfShlfGEpLyxcclxuICBvcmRpbmFsKF9udW06IG51bWJlcik6IHN0cmluZyB7XHJcbiAgICBjb25zdCBudW0gPSBOdW1iZXIoX251bSk7XHJcbiAgICBsZXQgYiA9IG51bSAlIDEwLFxyXG4gICAgICBvdXRwdXQgPSAofn4obnVtICUgMTAwIC8gMTApID09PSAxKSA/ICdlJyA6XHJcbiAgICAgICAgKGIgPT09IDEpID8gJ2EnIDpcclxuICAgICAgICAgIChiID09PSAyKSA/ICdhJyA6XHJcbiAgICAgICAgICAgIChiID09PSAzKSA/ICdlJyA6ICdlJztcclxuICAgIHJldHVybiBudW0gKyBvdXRwdXQ7XHJcbiAgfSxcclxuICB3ZWVrOiB7XHJcbiAgICBkb3c6IDEsIC8vIE1vbmRheSBpcyB0aGUgZmlyc3QgZGF5IG9mIHRoZSB3ZWVrLlxyXG4gICAgZG95OiA0ICAvLyBUaGUgd2VlayB0aGF0IGNvbnRhaW5zIEphbiA0dGggaXMgdGhlIGZpcnN0IHdlZWsgb2YgdGhlIHllYXIuXHJcbiAgfVxyXG59O1xyXG4iXX0=