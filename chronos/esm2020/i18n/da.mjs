//! moment.js locale configuration
//! locale : Danish (Denmark) [da]
//! author : Per Hansen : https://github.com/perhp
export const daLocale = {
    abbr: 'da',
    months: 'Januar_Februar_Marts_April_Maj_Juni_Juli_August_September_Oktober_November_December'.split('_'),
    monthsShort: 'Jan_Feb_Mar_Apr_Maj_Jun_Jul_Aug_Sep_Okt_Nov_Dec'.split('_'),
    weekdays: 'Søndag_Mandag_Tirsdag_Onsdag_Torsdag_Fredag_Lørdag'.split('_'),
    weekdaysShort: 'Søn_Man_Tir_Ons_Tor_Fre_Lør'.split('_'),
    weekdaysMin: 'Sø_Ma_Ti_On_To_Fr_Lø'.split('_'),
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D. MMMM YYYY',
        LLL: 'D. MMMM YYYY HH:mm',
        LLLL: 'dddd [d.] D. MMMM YYYY [kl.] HH:mm'
    },
    calendar: {
        sameDay: '[i dag kl.] LT',
        nextDay: '[i morgen kl.] LT',
        nextWeek: 'på dddd [kl.] LT',
        lastDay: '[i går kl.] LT',
        lastWeek: '[i] dddd[s kl.] LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: 'om %s',
        past: '%s siden',
        s: 'få sekunder',
        m: 'et minut',
        mm: '%d minutter',
        h: 'en time',
        hh: '%d timer',
        d: 'en dag',
        dd: '%d dage',
        M: 'en måned',
        MM: '%d måneder',
        y: 'et år',
        yy: '%d år'
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: '%d.',
    week: {
        dow: 1,
        doy: 4 // The week that contains Jan 4th is the first week of the year.
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvY2hyb25vcy9pMThuL2RhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLGtDQUFrQztBQUNsQyxrQ0FBa0M7QUFDbEMsa0RBQWtEO0FBRWxELE1BQU0sQ0FBQyxNQUFNLFFBQVEsR0FBZTtJQUNsQyxJQUFJLEVBQUUsSUFBSTtJQUNWLE1BQU0sRUFBRyxxRkFBcUYsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQ3pHLFdBQVcsRUFBRyxpREFBaUQsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQzFFLFFBQVEsRUFBRyxvREFBb0QsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQzFFLGFBQWEsRUFBRyw2QkFBNkIsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQ3hELFdBQVcsRUFBRyxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQy9DLGNBQWMsRUFBRztRQUNiLEVBQUUsRUFBRyxPQUFPO1FBQ1osR0FBRyxFQUFHLFVBQVU7UUFDaEIsQ0FBQyxFQUFHLFlBQVk7UUFDaEIsRUFBRSxFQUFHLGNBQWM7UUFDbkIsR0FBRyxFQUFHLG9CQUFvQjtRQUMxQixJQUFJLEVBQUcsb0NBQW9DO0tBQzlDO0lBQ0QsUUFBUSxFQUFHO1FBQ1AsT0FBTyxFQUFHLGdCQUFnQjtRQUMxQixPQUFPLEVBQUcsbUJBQW1CO1FBQzdCLFFBQVEsRUFBRyxrQkFBa0I7UUFDN0IsT0FBTyxFQUFHLGdCQUFnQjtRQUMxQixRQUFRLEVBQUcsb0JBQW9CO1FBQy9CLFFBQVEsRUFBRyxHQUFHO0tBQ2pCO0lBQ0QsWUFBWSxFQUFHO1FBQ1gsTUFBTSxFQUFHLE9BQU87UUFDaEIsSUFBSSxFQUFHLFVBQVU7UUFDakIsQ0FBQyxFQUFHLGFBQWE7UUFDakIsQ0FBQyxFQUFHLFVBQVU7UUFDZCxFQUFFLEVBQUcsYUFBYTtRQUNsQixDQUFDLEVBQUcsU0FBUztRQUNiLEVBQUUsRUFBRyxVQUFVO1FBQ2YsQ0FBQyxFQUFHLFFBQVE7UUFDWixFQUFFLEVBQUcsU0FBUztRQUNkLENBQUMsRUFBRyxVQUFVO1FBQ2QsRUFBRSxFQUFHLFlBQVk7UUFDakIsQ0FBQyxFQUFHLE9BQU87UUFDWCxFQUFFLEVBQUcsT0FBTztLQUNmO0lBQ0Qsc0JBQXNCLEVBQUUsV0FBVztJQUNuQyxPQUFPLEVBQUcsS0FBSztJQUNmLElBQUksRUFBRztRQUNILEdBQUcsRUFBRyxDQUFDO1FBQ1AsR0FBRyxFQUFHLENBQUMsQ0FBRSxnRUFBZ0U7S0FDNUU7Q0FDRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9jYWxlRGF0YSB9IGZyb20gJy4uL2xvY2FsZS9sb2NhbGUuY2xhc3MnO1xyXG5cclxuLy8hIG1vbWVudC5qcyBsb2NhbGUgY29uZmlndXJhdGlvblxyXG4vLyEgbG9jYWxlIDogRGFuaXNoIChEZW5tYXJrKSBbZGFdXHJcbi8vISBhdXRob3IgOiBQZXIgSGFuc2VuIDogaHR0cHM6Ly9naXRodWIuY29tL3BlcmhwXHJcblxyXG5leHBvcnQgY29uc3QgZGFMb2NhbGU6IExvY2FsZURhdGEgPSB7XHJcbiAgYWJicjogJ2RhJyxcclxuICBtb250aHMgOiAnSmFudWFyX0ZlYnJ1YXJfTWFydHNfQXByaWxfTWFqX0p1bmlfSnVsaV9BdWd1c3RfU2VwdGVtYmVyX09rdG9iZXJfTm92ZW1iZXJfRGVjZW1iZXInLnNwbGl0KCdfJyksXHJcbiAgbW9udGhzU2hvcnQgOiAnSmFuX0ZlYl9NYXJfQXByX01hal9KdW5fSnVsX0F1Z19TZXBfT2t0X05vdl9EZWMnLnNwbGl0KCdfJyksXHJcbiAgd2Vla2RheXMgOiAnU8O4bmRhZ19NYW5kYWdfVGlyc2RhZ19PbnNkYWdfVG9yc2RhZ19GcmVkYWdfTMO4cmRhZycuc3BsaXQoJ18nKSxcclxuICB3ZWVrZGF5c1Nob3J0IDogJ1PDuG5fTWFuX1Rpcl9PbnNfVG9yX0ZyZV9Mw7hyJy5zcGxpdCgnXycpLFxyXG4gIHdlZWtkYXlzTWluIDogJ1PDuF9NYV9UaV9Pbl9Ub19Gcl9Mw7gnLnNwbGl0KCdfJyksXHJcbiAgbG9uZ0RhdGVGb3JtYXQgOiB7XHJcbiAgICAgIExUIDogJ0hIOm1tJyxcclxuICAgICAgTFRTIDogJ0hIOm1tOnNzJyxcclxuICAgICAgTCA6ICdERC9NTS9ZWVlZJyxcclxuICAgICAgTEwgOiAnRC4gTU1NTSBZWVlZJyxcclxuICAgICAgTExMIDogJ0QuIE1NTU0gWVlZWSBISDptbScsXHJcbiAgICAgIExMTEwgOiAnZGRkZCBbZC5dIEQuIE1NTU0gWVlZWSBba2wuXSBISDptbSdcclxuICB9LFxyXG4gIGNhbGVuZGFyIDoge1xyXG4gICAgICBzYW1lRGF5IDogJ1tpIGRhZyBrbC5dIExUJyxcclxuICAgICAgbmV4dERheSA6ICdbaSBtb3JnZW4ga2wuXSBMVCcsXHJcbiAgICAgIG5leHRXZWVrIDogJ3DDpSBkZGRkIFtrbC5dIExUJyxcclxuICAgICAgbGFzdERheSA6ICdbaSBnw6VyIGtsLl0gTFQnLFxyXG4gICAgICBsYXN0V2VlayA6ICdbaV0gZGRkZFtzIGtsLl0gTFQnLFxyXG4gICAgICBzYW1lRWxzZSA6ICdMJ1xyXG4gIH0sXHJcbiAgcmVsYXRpdmVUaW1lIDoge1xyXG4gICAgICBmdXR1cmUgOiAnb20gJXMnLFxyXG4gICAgICBwYXN0IDogJyVzIHNpZGVuJyxcclxuICAgICAgcyA6ICdmw6Ugc2VrdW5kZXInLFxyXG4gICAgICBtIDogJ2V0IG1pbnV0JyxcclxuICAgICAgbW0gOiAnJWQgbWludXR0ZXInLFxyXG4gICAgICBoIDogJ2VuIHRpbWUnLFxyXG4gICAgICBoaCA6ICclZCB0aW1lcicsXHJcbiAgICAgIGQgOiAnZW4gZGFnJyxcclxuICAgICAgZGQgOiAnJWQgZGFnZScsXHJcbiAgICAgIE0gOiAnZW4gbcOlbmVkJyxcclxuICAgICAgTU0gOiAnJWQgbcOlbmVkZXInLFxyXG4gICAgICB5IDogJ2V0IMOlcicsXHJcbiAgICAgIHl5IDogJyVkIMOlcidcclxuICB9LFxyXG4gIGRheU9mTW9udGhPcmRpbmFsUGFyc2U6IC9cXGR7MSwyfVxcLi8sXHJcbiAgb3JkaW5hbCA6ICclZC4nLFxyXG4gIHdlZWsgOiB7XHJcbiAgICAgIGRvdyA6IDEsIC8vIE1vbmRheSBpcyB0aGUgZmlyc3QgZGF5IG9mIHRoZSB3ZWVrLlxyXG4gICAgICBkb3kgOiA0ICAvLyBUaGUgd2VlayB0aGF0IGNvbnRhaW5zIEphbiA0dGggaXMgdGhlIGZpcnN0IHdlZWsgb2YgdGhlIHllYXIuXHJcbiAgfVxyXG59O1xyXG5cclxuIl19