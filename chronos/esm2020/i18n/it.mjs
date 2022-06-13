import { getDayOfWeek } from '../units/day-of-week';
//! moment.js locale configuration
//! locale : Italian [it]
//! author : Lorenzo : https://github.com/aliem
//! author: Mattia Larentis: https://github.com/nostalgiaz
export const itLocale = {
    abbr: 'it',
    months: 'gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre'.split('_'),
    monthsShort: 'gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic'.split('_'),
    weekdays: 'domenica_lunedì_martedì_mercoledì_giovedì_venerdì_sabato'.split('_'),
    weekdaysShort: 'dom_lun_mar_mer_gio_ven_sab'.split('_'),
    weekdaysMin: 'do_lu_ma_me_gi_ve_sa'.split('_'),
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY HH:mm',
        LLLL: 'dddd D MMMM YYYY HH:mm'
    },
    calendar: {
        sameDay: '[Oggi alle] LT',
        nextDay: '[Domani alle] LT',
        nextWeek: 'dddd [alle] LT',
        lastDay: '[Ieri alle] LT',
        lastWeek(date) {
            switch (getDayOfWeek(date)) {
                case 0:
                    return '[la scorsa] dddd [alle] LT';
                default:
                    return '[lo scorso] dddd [alle] LT';
            }
        },
        sameElse: 'L'
    },
    relativeTime: {
        future(num) {
            return ((/^[0-9].+$/).test(num.toString(10)) ? 'tra' : 'in') + ' ' + num;
        },
        past: '%s fa',
        s: 'alcuni secondi',
        ss: '%d secondi',
        m: 'un minuto',
        mm: '%d minuti',
        h: 'un\'ora',
        hh: '%d ore',
        d: 'un giorno',
        dd: '%d giorni',
        M: 'un mese',
        MM: '%d mesi',
        y: 'un anno',
        yy: '%d anni'
    },
    dayOfMonthOrdinalParse: /\d{1,2}º/,
    ordinal: '%dº',
    week: {
        dow: 1,
        doy: 4 // The week that contains Jan 4th is the first week of the year.
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvY2hyb25vcy9pMThuL2l0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUVwRCxrQ0FBa0M7QUFDbEMseUJBQXlCO0FBQ3pCLCtDQUErQztBQUMvQywwREFBMEQ7QUFFMUQsTUFBTSxDQUFDLE1BQU0sUUFBUSxHQUFlO0lBQ2xDLElBQUksRUFBRSxJQUFJO0lBQ1YsTUFBTSxFQUFFLCtGQUErRixDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7SUFDbEgsV0FBVyxFQUFFLGlEQUFpRCxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7SUFDekUsUUFBUSxFQUFFLDBEQUEwRCxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7SUFDL0UsYUFBYSxFQUFFLDZCQUE2QixDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7SUFDdkQsV0FBVyxFQUFFLHNCQUFzQixDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7SUFDOUMsY0FBYyxFQUFFO1FBQ2QsRUFBRSxFQUFFLE9BQU87UUFDWCxHQUFHLEVBQUUsVUFBVTtRQUNmLENBQUMsRUFBRSxZQUFZO1FBQ2YsRUFBRSxFQUFFLGFBQWE7UUFDakIsR0FBRyxFQUFFLG1CQUFtQjtRQUN4QixJQUFJLEVBQUUsd0JBQXdCO0tBQy9CO0lBQ0QsUUFBUSxFQUFFO1FBQ1IsT0FBTyxFQUFFLGdCQUFnQjtRQUN6QixPQUFPLEVBQUUsa0JBQWtCO1FBQzNCLFFBQVEsRUFBRSxnQkFBZ0I7UUFDMUIsT0FBTyxFQUFFLGdCQUFnQjtRQUN6QixRQUFRLENBQUMsSUFBVTtZQUNqQixRQUFRLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDMUIsS0FBSyxDQUFDO29CQUNKLE9BQU8sNEJBQTRCLENBQUM7Z0JBQ3RDO29CQUNFLE9BQU8sNEJBQTRCLENBQUM7YUFDdkM7UUFDSCxDQUFDO1FBQ0QsUUFBUSxFQUFFLEdBQUc7S0FDZDtJQUNELFlBQVksRUFBRTtRQUNaLE1BQU0sQ0FBQyxHQUFXO1lBQ2hCLE9BQU8sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUMzRSxDQUFDO1FBQ0QsSUFBSSxFQUFFLE9BQU87UUFDYixDQUFDLEVBQUUsZ0JBQWdCO1FBQ25CLEVBQUUsRUFBRSxZQUFZO1FBQ2hCLENBQUMsRUFBRSxXQUFXO1FBQ2QsRUFBRSxFQUFFLFdBQVc7UUFDZixDQUFDLEVBQUUsU0FBUztRQUNaLEVBQUUsRUFBRSxRQUFRO1FBQ1osQ0FBQyxFQUFFLFdBQVc7UUFDZCxFQUFFLEVBQUUsV0FBVztRQUNmLENBQUMsRUFBRSxTQUFTO1FBQ1osRUFBRSxFQUFFLFNBQVM7UUFDYixDQUFDLEVBQUUsU0FBUztRQUNaLEVBQUUsRUFBRSxTQUFTO0tBQ2Q7SUFDRCxzQkFBc0IsRUFBRSxVQUFVO0lBQ2xDLE9BQU8sRUFBRSxLQUFLO0lBQ2QsSUFBSSxFQUFFO1FBQ0osR0FBRyxFQUFFLENBQUM7UUFDTixHQUFHLEVBQUUsQ0FBQyxDQUFFLGdFQUFnRTtLQUN6RTtDQUNGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2NhbGVEYXRhIH0gZnJvbSAnLi4vbG9jYWxlL2xvY2FsZS5jbGFzcyc7XHJcbmltcG9ydCB7IGdldERheU9mV2VlayB9IGZyb20gJy4uL3VuaXRzL2RheS1vZi13ZWVrJztcclxuXHJcbi8vISBtb21lbnQuanMgbG9jYWxlIGNvbmZpZ3VyYXRpb25cclxuLy8hIGxvY2FsZSA6IEl0YWxpYW4gW2l0XVxyXG4vLyEgYXV0aG9yIDogTG9yZW56byA6IGh0dHBzOi8vZ2l0aHViLmNvbS9hbGllbVxyXG4vLyEgYXV0aG9yOiBNYXR0aWEgTGFyZW50aXM6IGh0dHBzOi8vZ2l0aHViLmNvbS9ub3N0YWxnaWF6XHJcblxyXG5leHBvcnQgY29uc3QgaXRMb2NhbGU6IExvY2FsZURhdGEgPSB7XHJcbiAgYWJicjogJ2l0JyxcclxuICBtb250aHM6ICdnZW5uYWlvX2ZlYmJyYWlvX21hcnpvX2FwcmlsZV9tYWdnaW9fZ2l1Z25vX2x1Z2xpb19hZ29zdG9fc2V0dGVtYnJlX290dG9icmVfbm92ZW1icmVfZGljZW1icmUnLnNwbGl0KCdfJyksXHJcbiAgbW9udGhzU2hvcnQ6ICdnZW5fZmViX21hcl9hcHJfbWFnX2dpdV9sdWdfYWdvX3NldF9vdHRfbm92X2RpYycuc3BsaXQoJ18nKSxcclxuICB3ZWVrZGF5czogJ2RvbWVuaWNhX2x1bmVkw6xfbWFydGVkw6xfbWVyY29sZWTDrF9naW92ZWTDrF92ZW5lcmTDrF9zYWJhdG8nLnNwbGl0KCdfJyksXHJcbiAgd2Vla2RheXNTaG9ydDogJ2RvbV9sdW5fbWFyX21lcl9naW9fdmVuX3NhYicuc3BsaXQoJ18nKSxcclxuICB3ZWVrZGF5c01pbjogJ2RvX2x1X21hX21lX2dpX3ZlX3NhJy5zcGxpdCgnXycpLFxyXG4gIGxvbmdEYXRlRm9ybWF0OiB7XHJcbiAgICBMVDogJ0hIOm1tJyxcclxuICAgIExUUzogJ0hIOm1tOnNzJyxcclxuICAgIEw6ICdERC9NTS9ZWVlZJyxcclxuICAgIExMOiAnRCBNTU1NIFlZWVknLFxyXG4gICAgTExMOiAnRCBNTU1NIFlZWVkgSEg6bW0nLFxyXG4gICAgTExMTDogJ2RkZGQgRCBNTU1NIFlZWVkgSEg6bW0nXHJcbiAgfSxcclxuICBjYWxlbmRhcjoge1xyXG4gICAgc2FtZURheTogJ1tPZ2dpIGFsbGVdIExUJyxcclxuICAgIG5leHREYXk6ICdbRG9tYW5pIGFsbGVdIExUJyxcclxuICAgIG5leHRXZWVrOiAnZGRkZCBbYWxsZV0gTFQnLFxyXG4gICAgbGFzdERheTogJ1tJZXJpIGFsbGVdIExUJyxcclxuICAgIGxhc3RXZWVrKGRhdGU6IERhdGUpIHtcclxuICAgICAgc3dpdGNoIChnZXREYXlPZldlZWsoZGF0ZSkpIHtcclxuICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICByZXR1cm4gJ1tsYSBzY29yc2FdIGRkZGQgW2FsbGVdIExUJztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgcmV0dXJuICdbbG8gc2NvcnNvXSBkZGRkIFthbGxlXSBMVCc7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBzYW1lRWxzZTogJ0wnXHJcbiAgfSxcclxuICByZWxhdGl2ZVRpbWU6IHtcclxuICAgIGZ1dHVyZShudW06IG51bWJlcik6IHN0cmluZyB7XHJcbiAgICAgIHJldHVybiAoKC9eWzAtOV0uKyQvKS50ZXN0KG51bS50b1N0cmluZygxMCkpID8gJ3RyYScgOiAnaW4nKSArICcgJyArIG51bTtcclxuICAgIH0sXHJcbiAgICBwYXN0OiAnJXMgZmEnLFxyXG4gICAgczogJ2FsY3VuaSBzZWNvbmRpJyxcclxuICAgIHNzOiAnJWQgc2Vjb25kaScsXHJcbiAgICBtOiAndW4gbWludXRvJyxcclxuICAgIG1tOiAnJWQgbWludXRpJyxcclxuICAgIGg6ICd1blxcJ29yYScsXHJcbiAgICBoaDogJyVkIG9yZScsXHJcbiAgICBkOiAndW4gZ2lvcm5vJyxcclxuICAgIGRkOiAnJWQgZ2lvcm5pJyxcclxuICAgIE06ICd1biBtZXNlJyxcclxuICAgIE1NOiAnJWQgbWVzaScsXHJcbiAgICB5OiAndW4gYW5ubycsXHJcbiAgICB5eTogJyVkIGFubmknXHJcbiAgfSxcclxuICBkYXlPZk1vbnRoT3JkaW5hbFBhcnNlOiAvXFxkezEsMn3Cui8sXHJcbiAgb3JkaW5hbDogJyVkwronLFxyXG4gIHdlZWs6IHtcclxuICAgIGRvdzogMSwgLy8gTW9uZGF5IGlzIHRoZSBmaXJzdCBkYXkgb2YgdGhlIHdlZWsuXHJcbiAgICBkb3k6IDQgIC8vIFRoZSB3ZWVrIHRoYXQgY29udGFpbnMgSmFuIDR0aCBpcyB0aGUgZmlyc3Qgd2VlayBvZiB0aGUgeWVhci5cclxuICB9XHJcbn07XHJcbiJdfQ==