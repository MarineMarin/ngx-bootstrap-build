//! moment.js locale configuration
//! locale : French [fr]
//! author : John Fischer : https://github.com/jfroffice
export const frLocale = {
    abbr: 'fr',
    months: 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
    monthsShort: 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
    monthsParseExact: true,
    weekdays: 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
    weekdaysShort: 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
    weekdaysMin: 'di_lu_ma_me_je_ve_sa'.split('_'),
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
        sameDay: '[Aujourd’hui à] LT',
        nextDay: '[Demain à] LT',
        nextWeek: 'dddd [à] LT',
        lastDay: '[Hier à] LT',
        lastWeek: 'dddd [dernier à] LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: 'dans %s',
        past: 'il y a %s',
        s: 'quelques secondes',
        ss: '%d secondes',
        m: 'une minute',
        mm: '%d minutes',
        h: 'une heure',
        hh: '%d heures',
        d: 'un jour',
        dd: '%d jours',
        M: 'un mois',
        MM: '%d mois',
        y: 'un an',
        yy: '%d ans'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(er|)/,
    ordinal(_num, period) {
        const num = Number(_num);
        switch (period) {
            // TODO: Return 'e' when day of month > 1. Move this case inside
            // block for masculine words below.
            // See https://github.com/moment/moment/issues/3375
            case 'D':
                return num + (num === 1 ? 'er' : '');
            // Words with masculine grammatical gender: mois, trimestre, jour
            default:
            case 'M':
            case 'Q':
            case 'DDD':
            case 'd':
                return num + (num === 1 ? 'er' : 'e');
            // Words with feminine grammatical gender: semaine
            case 'w':
            case 'W':
                return num + (num === 1 ? 're' : 'e');
        }
    },
    week: {
        dow: 1,
        doy: 4 // The week that contains Jan 4th is the first week of the year.
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvY2hyb25vcy9pMThuL2ZyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLGtDQUFrQztBQUNsQyx3QkFBd0I7QUFDeEIsd0RBQXdEO0FBRXhELE1BQU0sQ0FBQyxNQUFNLFFBQVEsR0FBZTtJQUNsQyxJQUFJLEVBQUUsSUFBSTtJQUNWLE1BQU0sRUFBRSxzRkFBc0YsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQ3pHLFdBQVcsRUFBRSxnRUFBZ0UsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQ3hGLGdCQUFnQixFQUFFLElBQUk7SUFDdEIsUUFBUSxFQUFFLHFEQUFxRCxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7SUFDMUUsYUFBYSxFQUFFLG9DQUFvQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7SUFDOUQsV0FBVyxFQUFFLHNCQUFzQixDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7SUFDOUMsa0JBQWtCLEVBQUUsSUFBSTtJQUN4QixjQUFjLEVBQUU7UUFDZCxFQUFFLEVBQUUsT0FBTztRQUNYLEdBQUcsRUFBRSxVQUFVO1FBQ2YsQ0FBQyxFQUFFLFlBQVk7UUFDZixFQUFFLEVBQUUsYUFBYTtRQUNqQixHQUFHLEVBQUUsbUJBQW1CO1FBQ3hCLElBQUksRUFBRSx3QkFBd0I7S0FDL0I7SUFDRCxRQUFRLEVBQUU7UUFDUixPQUFPLEVBQUUsb0JBQW9CO1FBQzdCLE9BQU8sRUFBRSxlQUFlO1FBQ3hCLFFBQVEsRUFBRSxhQUFhO1FBQ3ZCLE9BQU8sRUFBRSxhQUFhO1FBQ3RCLFFBQVEsRUFBRSxxQkFBcUI7UUFDL0IsUUFBUSxFQUFFLEdBQUc7S0FDZDtJQUNELFlBQVksRUFBRTtRQUNaLE1BQU0sRUFBRSxTQUFTO1FBQ2pCLElBQUksRUFBRSxXQUFXO1FBQ2pCLENBQUMsRUFBRSxtQkFBbUI7UUFDdEIsRUFBRSxFQUFFLGFBQWE7UUFDakIsQ0FBQyxFQUFFLFlBQVk7UUFDZixFQUFFLEVBQUUsWUFBWTtRQUNoQixDQUFDLEVBQUUsV0FBVztRQUNkLEVBQUUsRUFBRSxXQUFXO1FBQ2YsQ0FBQyxFQUFFLFNBQVM7UUFDWixFQUFFLEVBQUUsVUFBVTtRQUNkLENBQUMsRUFBRSxTQUFTO1FBQ1osRUFBRSxFQUFFLFNBQVM7UUFDYixDQUFDLEVBQUUsT0FBTztRQUNWLEVBQUUsRUFBRSxRQUFRO0tBQ2I7SUFDRCxzQkFBc0IsRUFBRSxjQUFjO0lBQ3RDLE9BQU8sQ0FBQyxJQUFZLEVBQUUsTUFBYztRQUNsQyxNQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekIsUUFBUSxNQUFNLEVBQUU7WUFDZCxnRUFBZ0U7WUFDaEUsbUNBQW1DO1lBQ25DLG1EQUFtRDtZQUNuRCxLQUFLLEdBQUc7Z0JBQ04sT0FBTyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBRXZDLGlFQUFpRTtZQUNqRSxRQUFRO1lBQ1IsS0FBSyxHQUFHLENBQUM7WUFDVCxLQUFLLEdBQUcsQ0FBQztZQUNULEtBQUssS0FBSyxDQUFDO1lBQ1gsS0FBSyxHQUFHO2dCQUNOLE9BQU8sR0FBRyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUV4QyxrREFBa0Q7WUFDbEQsS0FBSyxHQUFHLENBQUM7WUFDVCxLQUFLLEdBQUc7Z0JBQ04sT0FBTyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3pDO0lBQ0gsQ0FBQztJQUNELElBQUksRUFBRTtRQUNKLEdBQUcsRUFBRSxDQUFDO1FBQ04sR0FBRyxFQUFFLENBQUMsQ0FBRSxnRUFBZ0U7S0FDekU7Q0FDRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9jYWxlRGF0YSB9IGZyb20gJy4uL2xvY2FsZS9sb2NhbGUuY2xhc3MnO1xyXG5cclxuLy8hIG1vbWVudC5qcyBsb2NhbGUgY29uZmlndXJhdGlvblxyXG4vLyEgbG9jYWxlIDogRnJlbmNoIFtmcl1cclxuLy8hIGF1dGhvciA6IEpvaG4gRmlzY2hlciA6IGh0dHBzOi8vZ2l0aHViLmNvbS9qZnJvZmZpY2VcclxuXHJcbmV4cG9ydCBjb25zdCBmckxvY2FsZTogTG9jYWxlRGF0YSA9IHtcclxuICBhYmJyOiAnZnInLFxyXG4gIG1vbnRoczogJ2phbnZpZXJfZsOpdnJpZXJfbWFyc19hdnJpbF9tYWlfanVpbl9qdWlsbGV0X2Fvw7t0X3NlcHRlbWJyZV9vY3RvYnJlX25vdmVtYnJlX2TDqWNlbWJyZScuc3BsaXQoJ18nKSxcclxuICBtb250aHNTaG9ydDogJ2phbnYuX2bDqXZyLl9tYXJzX2F2ci5fbWFpX2p1aW5fanVpbC5fYW/Du3Rfc2VwdC5fb2N0Ll9ub3YuX2TDqWMuJy5zcGxpdCgnXycpLFxyXG4gIG1vbnRoc1BhcnNlRXhhY3Q6IHRydWUsXHJcbiAgd2Vla2RheXM6ICdkaW1hbmNoZV9sdW5kaV9tYXJkaV9tZXJjcmVkaV9qZXVkaV92ZW5kcmVkaV9zYW1lZGknLnNwbGl0KCdfJyksXHJcbiAgd2Vla2RheXNTaG9ydDogJ2RpbS5fbHVuLl9tYXIuX21lci5famV1Ll92ZW4uX3NhbS4nLnNwbGl0KCdfJyksXHJcbiAgd2Vla2RheXNNaW46ICdkaV9sdV9tYV9tZV9qZV92ZV9zYScuc3BsaXQoJ18nKSxcclxuICB3ZWVrZGF5c1BhcnNlRXhhY3Q6IHRydWUsXHJcbiAgbG9uZ0RhdGVGb3JtYXQ6IHtcclxuICAgIExUOiAnSEg6bW0nLFxyXG4gICAgTFRTOiAnSEg6bW06c3MnLFxyXG4gICAgTDogJ0REL01NL1lZWVknLFxyXG4gICAgTEw6ICdEIE1NTU0gWVlZWScsXHJcbiAgICBMTEw6ICdEIE1NTU0gWVlZWSBISDptbScsXHJcbiAgICBMTExMOiAnZGRkZCBEIE1NTU0gWVlZWSBISDptbSdcclxuICB9LFxyXG4gIGNhbGVuZGFyOiB7XHJcbiAgICBzYW1lRGF5OiAnW0F1am91cmTigJlodWkgw6BdIExUJyxcclxuICAgIG5leHREYXk6ICdbRGVtYWluIMOgXSBMVCcsXHJcbiAgICBuZXh0V2VlazogJ2RkZGQgW8OgXSBMVCcsXHJcbiAgICBsYXN0RGF5OiAnW0hpZXIgw6BdIExUJyxcclxuICAgIGxhc3RXZWVrOiAnZGRkZCBbZGVybmllciDDoF0gTFQnLFxyXG4gICAgc2FtZUVsc2U6ICdMJ1xyXG4gIH0sXHJcbiAgcmVsYXRpdmVUaW1lOiB7XHJcbiAgICBmdXR1cmU6ICdkYW5zICVzJyxcclxuICAgIHBhc3Q6ICdpbCB5IGEgJXMnLFxyXG4gICAgczogJ3F1ZWxxdWVzIHNlY29uZGVzJyxcclxuICAgIHNzOiAnJWQgc2Vjb25kZXMnLFxyXG4gICAgbTogJ3VuZSBtaW51dGUnLFxyXG4gICAgbW06ICclZCBtaW51dGVzJyxcclxuICAgIGg6ICd1bmUgaGV1cmUnLFxyXG4gICAgaGg6ICclZCBoZXVyZXMnLFxyXG4gICAgZDogJ3VuIGpvdXInLFxyXG4gICAgZGQ6ICclZCBqb3VycycsXHJcbiAgICBNOiAndW4gbW9pcycsXHJcbiAgICBNTTogJyVkIG1vaXMnLFxyXG4gICAgeTogJ3VuIGFuJyxcclxuICAgIHl5OiAnJWQgYW5zJ1xyXG4gIH0sXHJcbiAgZGF5T2ZNb250aE9yZGluYWxQYXJzZTogL1xcZHsxLDJ9KGVyfCkvLFxyXG4gIG9yZGluYWwoX251bTogbnVtYmVyLCBwZXJpb2Q6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICBjb25zdCBudW0gPSBOdW1iZXIoX251bSk7XHJcbiAgICBzd2l0Y2ggKHBlcmlvZCkge1xyXG4gICAgICAvLyBUT0RPOiBSZXR1cm4gJ2UnIHdoZW4gZGF5IG9mIG1vbnRoID4gMS4gTW92ZSB0aGlzIGNhc2UgaW5zaWRlXHJcbiAgICAgIC8vIGJsb2NrIGZvciBtYXNjdWxpbmUgd29yZHMgYmVsb3cuXHJcbiAgICAgIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vbW9tZW50L21vbWVudC9pc3N1ZXMvMzM3NVxyXG4gICAgICBjYXNlICdEJzpcclxuICAgICAgICByZXR1cm4gbnVtICsgKG51bSA9PT0gMSA/ICdlcicgOiAnJyk7XHJcblxyXG4gICAgICAvLyBXb3JkcyB3aXRoIG1hc2N1bGluZSBncmFtbWF0aWNhbCBnZW5kZXI6IG1vaXMsIHRyaW1lc3RyZSwgam91clxyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICBjYXNlICdNJzpcclxuICAgICAgY2FzZSAnUSc6XHJcbiAgICAgIGNhc2UgJ0RERCc6XHJcbiAgICAgIGNhc2UgJ2QnOlxyXG4gICAgICAgIHJldHVybiBudW0gKyAobnVtID09PSAxID8gJ2VyJyA6ICdlJyk7XHJcblxyXG4gICAgICAvLyBXb3JkcyB3aXRoIGZlbWluaW5lIGdyYW1tYXRpY2FsIGdlbmRlcjogc2VtYWluZVxyXG4gICAgICBjYXNlICd3JzpcclxuICAgICAgY2FzZSAnVyc6XHJcbiAgICAgICAgcmV0dXJuIG51bSArIChudW0gPT09IDEgPyAncmUnIDogJ2UnKTtcclxuICAgIH1cclxuICB9LFxyXG4gIHdlZWs6IHtcclxuICAgIGRvdzogMSwgLy8gTW9uZGF5IGlzIHRoZSBmaXJzdCBkYXkgb2YgdGhlIHdlZWsuXHJcbiAgICBkb3k6IDQgIC8vIFRoZSB3ZWVrIHRoYXQgY29udGFpbnMgSmFuIDR0aCBpcyB0aGUgZmlyc3Qgd2VlayBvZiB0aGUgeWVhci5cclxuICB9XHJcbn07XHJcblxyXG4iXX0=