//! moment.js locale configuration
//! locale : German [de]
//! author : lluchs : https://github.com/lluchs
//! author: Menelion Elensúle: https://github.com/Oire
//! author : Mikolaj Dadela : https://github.com/mik01aj
function processRelativeTime(num, withoutSuffix, key, isFuture) {
    const format = {
        'm': ['eine Minute', 'einer Minute'],
        'h': ['eine Stunde', 'einer Stunde'],
        'd': ['ein Tag', 'einem Tag'],
        'dd': [num + ' Tage', num + ' Tagen'],
        'M': ['ein Monat', 'einem Monat'],
        'MM': [num + ' Monate', num + ' Monaten'],
        'y': ['ein Jahr', 'einem Jahr'],
        'yy': [num + ' Jahre', num + ' Jahren']
    };
    return withoutSuffix ? format[key][0] : format[key][1];
}
export const deLocale = {
    abbr: 'de',
    months: 'Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember'.split('_'),
    monthsShort: 'Jan._Feb._März_Apr._Mai_Juni_Juli_Aug._Sep._Okt._Nov._Dez.'.split('_'),
    monthsParseExact: true,
    weekdays: 'Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag'.split('_'),
    weekdaysShort: 'So._Mo._Di._Mi._Do._Fr._Sa.'.split('_'),
    weekdaysMin: 'So_Mo_Di_Mi_Do_Fr_Sa'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD.MM.YYYY',
        LL: 'D. MMMM YYYY',
        LLL: 'D. MMMM YYYY HH:mm',
        LLLL: 'dddd, D. MMMM YYYY HH:mm'
    },
    calendar: {
        sameDay: '[heute um] LT [Uhr]',
        sameElse: 'L',
        nextDay: '[morgen um] LT [Uhr]',
        nextWeek: 'dddd [um] LT [Uhr]',
        lastDay: '[gestern um] LT [Uhr]',
        lastWeek: '[letzten] dddd [um] LT [Uhr]'
    },
    relativeTime: {
        future: 'in %s',
        past: 'vor %s',
        s: 'ein paar Sekunden',
        ss: '%d Sekunden',
        m: processRelativeTime,
        mm: '%d Minuten',
        h: processRelativeTime,
        hh: '%d Stunden',
        d: processRelativeTime,
        dd: processRelativeTime,
        M: processRelativeTime,
        MM: processRelativeTime,
        y: processRelativeTime,
        yy: processRelativeTime
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: '%d.',
    week: {
        dow: 1,
        doy: 4 // The week that contains Jan 4th is the first week of the year.
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvY2hyb25vcy9pMThuL2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLGtDQUFrQztBQUNsQyx3QkFBd0I7QUFDeEIsK0NBQStDO0FBQy9DLHNEQUFzRDtBQUN0RCx3REFBd0Q7QUFFeEQsU0FBUyxtQkFBbUIsQ0FBQyxHQUFXLEVBQUUsYUFBc0IsRUFBRSxHQUFXLEVBQUUsUUFBaUI7SUFDOUYsTUFBTSxNQUFNLEdBQXdDO1FBQ2xELEdBQUcsRUFBRSxDQUFDLGFBQWEsRUFBRSxjQUFjLENBQUM7UUFDcEMsR0FBRyxFQUFFLENBQUMsYUFBYSxFQUFFLGNBQWMsQ0FBQztRQUNwQyxHQUFHLEVBQUUsQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDO1FBQzdCLElBQUksRUFBRSxDQUFDLEdBQUcsR0FBRyxPQUFPLEVBQUUsR0FBRyxHQUFHLFFBQVEsQ0FBQztRQUNyQyxHQUFHLEVBQUUsQ0FBQyxXQUFXLEVBQUUsYUFBYSxDQUFDO1FBQ2pDLElBQUksRUFBRSxDQUFDLEdBQUcsR0FBRyxTQUFTLEVBQUUsR0FBRyxHQUFHLFVBQVUsQ0FBQztRQUN6QyxHQUFHLEVBQUUsQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDO1FBQy9CLElBQUksRUFBRSxDQUFDLEdBQUcsR0FBRyxRQUFRLEVBQUUsR0FBRyxHQUFHLFNBQVMsQ0FBQztLQUN4QyxDQUFDO0lBQ0YsT0FBTyxhQUFhLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3pELENBQUM7QUFFRCxNQUFNLENBQUMsTUFBTSxRQUFRLEdBQWU7SUFDbEMsSUFBSSxFQUFFLElBQUk7SUFDVixNQUFNLEVBQUUsb0ZBQW9GLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztJQUN2RyxXQUFXLEVBQUUsNERBQTRELENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztJQUNwRixnQkFBZ0IsRUFBRSxJQUFJO0lBQ3RCLFFBQVEsRUFBRSw2REFBNkQsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQ2xGLGFBQWEsRUFBRSw2QkFBNkIsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQ3ZELFdBQVcsRUFBRSxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQzlDLGtCQUFrQixFQUFFLElBQUk7SUFDeEIsY0FBYyxFQUFFO1FBQ2QsRUFBRSxFQUFFLE9BQU87UUFDWCxHQUFHLEVBQUUsVUFBVTtRQUNmLENBQUMsRUFBRSxZQUFZO1FBQ2YsRUFBRSxFQUFFLGNBQWM7UUFDbEIsR0FBRyxFQUFFLG9CQUFvQjtRQUN6QixJQUFJLEVBQUUsMEJBQTBCO0tBQ2pDO0lBQ0QsUUFBUSxFQUFFO1FBQ1IsT0FBTyxFQUFFLHFCQUFxQjtRQUM5QixRQUFRLEVBQUUsR0FBRztRQUNiLE9BQU8sRUFBRSxzQkFBc0I7UUFDL0IsUUFBUSxFQUFFLG9CQUFvQjtRQUM5QixPQUFPLEVBQUUsdUJBQXVCO1FBQ2hDLFFBQVEsRUFBRSw4QkFBOEI7S0FDekM7SUFDRCxZQUFZLEVBQUU7UUFDWixNQUFNLEVBQUUsT0FBTztRQUNmLElBQUksRUFBRSxRQUFRO1FBQ2QsQ0FBQyxFQUFFLG1CQUFtQjtRQUN0QixFQUFFLEVBQUUsYUFBYTtRQUNqQixDQUFDLEVBQUUsbUJBQW1CO1FBQ3RCLEVBQUUsRUFBRSxZQUFZO1FBQ2hCLENBQUMsRUFBRSxtQkFBbUI7UUFDdEIsRUFBRSxFQUFFLFlBQVk7UUFDaEIsQ0FBQyxFQUFFLG1CQUFtQjtRQUN0QixFQUFFLEVBQUUsbUJBQW1CO1FBQ3ZCLENBQUMsRUFBRSxtQkFBbUI7UUFDdEIsRUFBRSxFQUFFLG1CQUFtQjtRQUN2QixDQUFDLEVBQUUsbUJBQW1CO1FBQ3RCLEVBQUUsRUFBRSxtQkFBbUI7S0FDeEI7SUFDRCxzQkFBc0IsRUFBRSxXQUFXO0lBQ25DLE9BQU8sRUFBRSxLQUFLO0lBQ2QsSUFBSSxFQUFFO1FBQ0osR0FBRyxFQUFFLENBQUM7UUFDTixHQUFHLEVBQUUsQ0FBQyxDQUFFLGdFQUFnRTtLQUN6RTtDQUNGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2NhbGVEYXRhIH0gZnJvbSAnLi4vbG9jYWxlL2xvY2FsZS5jbGFzcyc7XHJcblxyXG4vLyEgbW9tZW50LmpzIGxvY2FsZSBjb25maWd1cmF0aW9uXHJcbi8vISBsb2NhbGUgOiBHZXJtYW4gW2RlXVxyXG4vLyEgYXV0aG9yIDogbGx1Y2hzIDogaHR0cHM6Ly9naXRodWIuY29tL2xsdWNoc1xyXG4vLyEgYXV0aG9yOiBNZW5lbGlvbiBFbGVuc8O6bGU6IGh0dHBzOi8vZ2l0aHViLmNvbS9PaXJlXHJcbi8vISBhdXRob3IgOiBNaWtvbGFqIERhZGVsYSA6IGh0dHBzOi8vZ2l0aHViLmNvbS9taWswMWFqXHJcblxyXG5mdW5jdGlvbiBwcm9jZXNzUmVsYXRpdmVUaW1lKG51bTogbnVtYmVyLCB3aXRob3V0U3VmZml4OiBib29sZWFuLCBrZXk6IHN0cmluZywgaXNGdXR1cmU6IGJvb2xlYW4pOiBzdHJpbmcge1xyXG4gIGNvbnN0IGZvcm1hdDogeyBba2V5OiBzdHJpbmddOiBbc3RyaW5nLCBzdHJpbmddIH0gPSB7XHJcbiAgICAnbSc6IFsnZWluZSBNaW51dGUnLCAnZWluZXIgTWludXRlJ10sXHJcbiAgICAnaCc6IFsnZWluZSBTdHVuZGUnLCAnZWluZXIgU3R1bmRlJ10sXHJcbiAgICAnZCc6IFsnZWluIFRhZycsICdlaW5lbSBUYWcnXSxcclxuICAgICdkZCc6IFtudW0gKyAnIFRhZ2UnLCBudW0gKyAnIFRhZ2VuJ10sXHJcbiAgICAnTSc6IFsnZWluIE1vbmF0JywgJ2VpbmVtIE1vbmF0J10sXHJcbiAgICAnTU0nOiBbbnVtICsgJyBNb25hdGUnLCBudW0gKyAnIE1vbmF0ZW4nXSxcclxuICAgICd5JzogWydlaW4gSmFocicsICdlaW5lbSBKYWhyJ10sXHJcbiAgICAneXknOiBbbnVtICsgJyBKYWhyZScsIG51bSArICcgSmFocmVuJ11cclxuICB9O1xyXG4gIHJldHVybiB3aXRob3V0U3VmZml4ID8gZm9ybWF0W2tleV1bMF0gOiBmb3JtYXRba2V5XVsxXTtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGRlTG9jYWxlOiBMb2NhbGVEYXRhID0ge1xyXG4gIGFiYnI6ICdkZScsXHJcbiAgbW9udGhzOiAnSmFudWFyX0ZlYnJ1YXJfTcOkcnpfQXByaWxfTWFpX0p1bmlfSnVsaV9BdWd1c3RfU2VwdGVtYmVyX09rdG9iZXJfTm92ZW1iZXJfRGV6ZW1iZXInLnNwbGl0KCdfJyksXHJcbiAgbW9udGhzU2hvcnQ6ICdKYW4uX0ZlYi5fTcOkcnpfQXByLl9NYWlfSnVuaV9KdWxpX0F1Zy5fU2VwLl9Pa3QuX05vdi5fRGV6Licuc3BsaXQoJ18nKSxcclxuICBtb250aHNQYXJzZUV4YWN0OiB0cnVlLFxyXG4gIHdlZWtkYXlzOiAnU29ubnRhZ19Nb250YWdfRGllbnN0YWdfTWl0dHdvY2hfRG9ubmVyc3RhZ19GcmVpdGFnX1NhbXN0YWcnLnNwbGl0KCdfJyksXHJcbiAgd2Vla2RheXNTaG9ydDogJ1NvLl9Nby5fRGkuX01pLl9Eby5fRnIuX1NhLicuc3BsaXQoJ18nKSxcclxuICB3ZWVrZGF5c01pbjogJ1NvX01vX0RpX01pX0RvX0ZyX1NhJy5zcGxpdCgnXycpLFxyXG4gIHdlZWtkYXlzUGFyc2VFeGFjdDogdHJ1ZSxcclxuICBsb25nRGF0ZUZvcm1hdDoge1xyXG4gICAgTFQ6ICdISDptbScsXHJcbiAgICBMVFM6ICdISDptbTpzcycsXHJcbiAgICBMOiAnREQuTU0uWVlZWScsXHJcbiAgICBMTDogJ0QuIE1NTU0gWVlZWScsXHJcbiAgICBMTEw6ICdELiBNTU1NIFlZWVkgSEg6bW0nLFxyXG4gICAgTExMTDogJ2RkZGQsIEQuIE1NTU0gWVlZWSBISDptbSdcclxuICB9LFxyXG4gIGNhbGVuZGFyOiB7XHJcbiAgICBzYW1lRGF5OiAnW2hldXRlIHVtXSBMVCBbVWhyXScsXHJcbiAgICBzYW1lRWxzZTogJ0wnLFxyXG4gICAgbmV4dERheTogJ1ttb3JnZW4gdW1dIExUIFtVaHJdJyxcclxuICAgIG5leHRXZWVrOiAnZGRkZCBbdW1dIExUIFtVaHJdJyxcclxuICAgIGxhc3REYXk6ICdbZ2VzdGVybiB1bV0gTFQgW1Vocl0nLFxyXG4gICAgbGFzdFdlZWs6ICdbbGV0enRlbl0gZGRkZCBbdW1dIExUIFtVaHJdJ1xyXG4gIH0sXHJcbiAgcmVsYXRpdmVUaW1lOiB7XHJcbiAgICBmdXR1cmU6ICdpbiAlcycsXHJcbiAgICBwYXN0OiAndm9yICVzJyxcclxuICAgIHM6ICdlaW4gcGFhciBTZWt1bmRlbicsXHJcbiAgICBzczogJyVkIFNla3VuZGVuJyxcclxuICAgIG06IHByb2Nlc3NSZWxhdGl2ZVRpbWUsXHJcbiAgICBtbTogJyVkIE1pbnV0ZW4nLFxyXG4gICAgaDogcHJvY2Vzc1JlbGF0aXZlVGltZSxcclxuICAgIGhoOiAnJWQgU3R1bmRlbicsXHJcbiAgICBkOiBwcm9jZXNzUmVsYXRpdmVUaW1lLFxyXG4gICAgZGQ6IHByb2Nlc3NSZWxhdGl2ZVRpbWUsXHJcbiAgICBNOiBwcm9jZXNzUmVsYXRpdmVUaW1lLFxyXG4gICAgTU06IHByb2Nlc3NSZWxhdGl2ZVRpbWUsXHJcbiAgICB5OiBwcm9jZXNzUmVsYXRpdmVUaW1lLFxyXG4gICAgeXk6IHByb2Nlc3NSZWxhdGl2ZVRpbWVcclxuICB9LFxyXG4gIGRheU9mTW9udGhPcmRpbmFsUGFyc2U6IC9cXGR7MSwyfVxcLi8sXHJcbiAgb3JkaW5hbDogJyVkLicsXHJcbiAgd2Vlazoge1xyXG4gICAgZG93OiAxLCAvLyBNb25kYXkgaXMgdGhlIGZpcnN0IGRheSBvZiB0aGUgd2Vlay5cclxuICAgIGRveTogNCAgLy8gVGhlIHdlZWsgdGhhdCBjb250YWlucyBKYW4gNHRoIGlzIHRoZSBmaXJzdCB3ZWVrIG9mIHRoZSB5ZWFyLlxyXG4gIH1cclxufTtcclxuIl19