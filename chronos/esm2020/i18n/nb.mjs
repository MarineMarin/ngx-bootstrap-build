//! moment.js locale configuration
//! locale : Norwegian Bokmål [nb]
//! authors : Espen Hovlandsdal : https://github.com/rexxars
//!           Sigurd Gartmann : https://github.com/sigurdga
export const nbLocale = {
    abbr: 'nb',
    months: 'januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember'.split('_'),
    monthsShort: 'jan._feb._mars_april_mai_juni_juli_aug._sep._okt._nov._des.'.split('_'),
    monthsParseExact: true,
    weekdays: 'søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag'.split('_'),
    weekdaysShort: 'sø._ma._ti._on._to._fr._lø.'.split('_'),
    weekdaysMin: 'sø_ma_ti_on_to_fr_lø'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD.MM.YYYY',
        LL: 'D. MMMM YYYY',
        LLL: 'D. MMMM YYYY [kl.] HH:mm',
        LLLL: 'dddd D. MMMM YYYY [kl.] HH:mm'
    },
    calendar: {
        sameDay: '[i dag kl.] LT',
        nextDay: '[i morgen kl.] LT',
        nextWeek: 'dddd [kl.] LT',
        lastDay: '[i går kl.] LT',
        lastWeek: '[forrige] dddd [kl.] LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: 'om %s',
        past: '%s siden',
        s: 'noen sekunder',
        ss: '%d sekunder',
        m: 'ett minutt',
        mm: '%d minutter',
        h: 'en time',
        hh: '%d timer',
        d: 'en dag',
        dd: '%d dager',
        M: 'en måned',
        MM: '%d måneder',
        y: 'ett år',
        yy: '%d år'
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: '%d.',
    week: {
        dow: 1,
        doy: 4 // The week that contains Jan 4th is the first week of the year.
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvY2hyb25vcy9pMThuL25iLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLGtDQUFrQztBQUNsQyxrQ0FBa0M7QUFDbEMsNERBQTREO0FBQzVELDJEQUEyRDtBQUUzRCxNQUFNLENBQUMsTUFBTSxRQUFRLEdBQWU7SUFDbEMsSUFBSSxFQUFFLElBQUk7SUFDVixNQUFNLEVBQUUsb0ZBQW9GLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztJQUN2RyxXQUFXLEVBQUUsNkRBQTZELENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztJQUNyRixnQkFBZ0IsRUFBRSxJQUFJO0lBQ3RCLFFBQVEsRUFBRSxvREFBb0QsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQ3pFLGFBQWEsRUFBRSw2QkFBNkIsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQ3ZELFdBQVcsRUFBRSxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQzlDLGtCQUFrQixFQUFFLElBQUk7SUFDeEIsY0FBYyxFQUFFO1FBQ2QsRUFBRSxFQUFFLE9BQU87UUFDWCxHQUFHLEVBQUUsVUFBVTtRQUNmLENBQUMsRUFBRSxZQUFZO1FBQ2YsRUFBRSxFQUFFLGNBQWM7UUFDbEIsR0FBRyxFQUFFLDBCQUEwQjtRQUMvQixJQUFJLEVBQUUsK0JBQStCO0tBQ3RDO0lBQ0QsUUFBUSxFQUFFO1FBQ1IsT0FBTyxFQUFFLGdCQUFnQjtRQUN6QixPQUFPLEVBQUUsbUJBQW1CO1FBQzVCLFFBQVEsRUFBRSxlQUFlO1FBQ3pCLE9BQU8sRUFBRSxnQkFBZ0I7UUFDekIsUUFBUSxFQUFFLHlCQUF5QjtRQUNuQyxRQUFRLEVBQUUsR0FBRztLQUNkO0lBQ0QsWUFBWSxFQUFFO1FBQ1osTUFBTSxFQUFFLE9BQU87UUFDZixJQUFJLEVBQUUsVUFBVTtRQUNoQixDQUFDLEVBQUUsZUFBZTtRQUNsQixFQUFFLEVBQUUsYUFBYTtRQUNqQixDQUFDLEVBQUUsWUFBWTtRQUNmLEVBQUUsRUFBRSxhQUFhO1FBQ2pCLENBQUMsRUFBRSxTQUFTO1FBQ1osRUFBRSxFQUFFLFVBQVU7UUFDZCxDQUFDLEVBQUUsUUFBUTtRQUNYLEVBQUUsRUFBRSxVQUFVO1FBQ2QsQ0FBQyxFQUFFLFVBQVU7UUFDYixFQUFFLEVBQUUsWUFBWTtRQUNoQixDQUFDLEVBQUUsUUFBUTtRQUNYLEVBQUUsRUFBRSxPQUFPO0tBQ1o7SUFDRCxzQkFBc0IsRUFBRSxXQUFXO0lBQ25DLE9BQU8sRUFBRSxLQUFLO0lBQ2QsSUFBSSxFQUFFO1FBQ0osR0FBRyxFQUFFLENBQUM7UUFDTixHQUFHLEVBQUUsQ0FBQyxDQUFDLGdFQUFnRTtLQUN4RTtDQUNGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2NhbGVEYXRhIH0gZnJvbSAnLi4vbG9jYWxlL2xvY2FsZS5jbGFzcyc7XHJcblxyXG4vLyEgbW9tZW50LmpzIGxvY2FsZSBjb25maWd1cmF0aW9uXHJcbi8vISBsb2NhbGUgOiBOb3J3ZWdpYW4gQm9rbcOlbCBbbmJdXHJcbi8vISBhdXRob3JzIDogRXNwZW4gSG92bGFuZHNkYWwgOiBodHRwczovL2dpdGh1Yi5jb20vcmV4eGFyc1xyXG4vLyEgICAgICAgICAgIFNpZ3VyZCBHYXJ0bWFubiA6IGh0dHBzOi8vZ2l0aHViLmNvbS9zaWd1cmRnYVxyXG5cclxuZXhwb3J0IGNvbnN0IG5iTG9jYWxlOiBMb2NhbGVEYXRhID0ge1xyXG4gIGFiYnI6ICduYicsXHJcbiAgbW9udGhzOiAnamFudWFyX2ZlYnJ1YXJfbWFyc19hcHJpbF9tYWlfanVuaV9qdWxpX2F1Z3VzdF9zZXB0ZW1iZXJfb2t0b2Jlcl9ub3ZlbWJlcl9kZXNlbWJlcicuc3BsaXQoJ18nKSxcclxuICBtb250aHNTaG9ydDogJ2phbi5fZmViLl9tYXJzX2FwcmlsX21haV9qdW5pX2p1bGlfYXVnLl9zZXAuX29rdC5fbm92Ll9kZXMuJy5zcGxpdCgnXycpLFxyXG4gIG1vbnRoc1BhcnNlRXhhY3Q6IHRydWUsXHJcbiAgd2Vla2RheXM6ICdzw7huZGFnX21hbmRhZ190aXJzZGFnX29uc2RhZ190b3JzZGFnX2ZyZWRhZ19sw7hyZGFnJy5zcGxpdCgnXycpLFxyXG4gIHdlZWtkYXlzU2hvcnQ6ICdzw7guX21hLl90aS5fb24uX3RvLl9mci5fbMO4Licuc3BsaXQoJ18nKSxcclxuICB3ZWVrZGF5c01pbjogJ3PDuF9tYV90aV9vbl90b19mcl9sw7gnLnNwbGl0KCdfJyksXHJcbiAgd2Vla2RheXNQYXJzZUV4YWN0OiB0cnVlLFxyXG4gIGxvbmdEYXRlRm9ybWF0OiB7XHJcbiAgICBMVDogJ0hIOm1tJyxcclxuICAgIExUUzogJ0hIOm1tOnNzJyxcclxuICAgIEw6ICdERC5NTS5ZWVlZJyxcclxuICAgIExMOiAnRC4gTU1NTSBZWVlZJyxcclxuICAgIExMTDogJ0QuIE1NTU0gWVlZWSBba2wuXSBISDptbScsXHJcbiAgICBMTExMOiAnZGRkZCBELiBNTU1NIFlZWVkgW2tsLl0gSEg6bW0nXHJcbiAgfSxcclxuICBjYWxlbmRhcjoge1xyXG4gICAgc2FtZURheTogJ1tpIGRhZyBrbC5dIExUJyxcclxuICAgIG5leHREYXk6ICdbaSBtb3JnZW4ga2wuXSBMVCcsXHJcbiAgICBuZXh0V2VlazogJ2RkZGQgW2tsLl0gTFQnLFxyXG4gICAgbGFzdERheTogJ1tpIGfDpXIga2wuXSBMVCcsXHJcbiAgICBsYXN0V2VlazogJ1tmb3JyaWdlXSBkZGRkIFtrbC5dIExUJyxcclxuICAgIHNhbWVFbHNlOiAnTCdcclxuICB9LFxyXG4gIHJlbGF0aXZlVGltZToge1xyXG4gICAgZnV0dXJlOiAnb20gJXMnLFxyXG4gICAgcGFzdDogJyVzIHNpZGVuJyxcclxuICAgIHM6ICdub2VuIHNla3VuZGVyJyxcclxuICAgIHNzOiAnJWQgc2VrdW5kZXInLFxyXG4gICAgbTogJ2V0dCBtaW51dHQnLFxyXG4gICAgbW06ICclZCBtaW51dHRlcicsXHJcbiAgICBoOiAnZW4gdGltZScsXHJcbiAgICBoaDogJyVkIHRpbWVyJyxcclxuICAgIGQ6ICdlbiBkYWcnLFxyXG4gICAgZGQ6ICclZCBkYWdlcicsXHJcbiAgICBNOiAnZW4gbcOlbmVkJyxcclxuICAgIE1NOiAnJWQgbcOlbmVkZXInLFxyXG4gICAgeTogJ2V0dCDDpXInLFxyXG4gICAgeXk6ICclZCDDpXInXHJcbiAgfSxcclxuICBkYXlPZk1vbnRoT3JkaW5hbFBhcnNlOiAvXFxkezEsMn1cXC4vLFxyXG4gIG9yZGluYWw6ICclZC4nLFxyXG4gIHdlZWs6IHtcclxuICAgIGRvdzogMSwgLy8gTW9uZGF5IGlzIHRoZSBmaXJzdCBkYXkgb2YgdGhlIHdlZWsuXHJcbiAgICBkb3k6IDQgLy8gVGhlIHdlZWsgdGhhdCBjb250YWlucyBKYW4gNHRoIGlzIHRoZSBmaXJzdCB3ZWVrIG9mIHRoZSB5ZWFyLlxyXG4gIH1cclxufTtcclxuIl19