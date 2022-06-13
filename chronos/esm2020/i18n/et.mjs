//! moment.js locale configuration
//! locale : Estonian [et]
//! author : Chris Gedrim : https://github.com/a90machado
const processRelativeTime = function (num, withoutSuffix, key, isFuture) {
    const format = {
        s: ['mõne sekundi', 'mõni sekund', 'paar sekundit'],
        ss: [num + 'sekundi', num + 'sekundit'],
        m: ['ühe minuti', 'üks minut'],
        mm: [num + ' minuti', num + ' minutit'],
        h: ['ühe tunni', 'tund aega', 'üks tund'],
        hh: [num + ' tunni', num + ' tundi'],
        d: ['ühe päeva', 'üks päev'],
        M: ['kuu aja', 'kuu aega', 'üks kuu'],
        MM: [num + ' kuu', num + ' kuud'],
        y: ['ühe aasta', 'aasta', 'üks aasta'],
        yy: [num + ' aasta', num + ' aastat']
    };
    if (withoutSuffix) {
        return format[key][2] ? format[key][2] : format[key][1];
    }
    return isFuture ? format[key][0] : format[key][1];
};
export const etLocale = {
    abbr: 'et',
    months: 'jaanuar_veebruar_märts_aprill_mai_juuni_juuli_august_september_oktoober_november_detsember'.split('_'),
    monthsShort: 'jaan_veebr_märts_apr_mai_juuni_juuli_aug_sept_okt_nov_dets'.split('_'),
    weekdays: 'pühapäev_esmaspäev_teisipäev_kolmapäev_neljapäev_reede_laupäev'.split('_'),
    weekdaysShort: 'P_E_T_K_N_R_L'.split('_'),
    weekdaysMin: 'P_E_T_K_N_R_L'.split('_'),
    longDateFormat: {
        LT: 'H:mm',
        LTS: 'H:mm:ss',
        L: 'DD.MM.YYYY',
        LL: 'D. MMMM YYYY',
        LLL: 'D. MMMM YYYY H:mm',
        LLLL: 'dddd, D. MMMM YYYY H:mm'
    },
    calendar: {
        sameDay: '[Täna,] LT',
        nextDay: '[Homme,] LT',
        nextWeek: '[Järgmine] dddd LT',
        lastDay: '[Eile,] LT',
        lastWeek: '[Eelmine] dddd LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: '%s pärast',
        past: '%s tagasi',
        s: processRelativeTime,
        ss: processRelativeTime,
        m: processRelativeTime,
        mm: processRelativeTime,
        h: processRelativeTime,
        hh: processRelativeTime,
        d: processRelativeTime,
        dd: '%d päeva',
        M: processRelativeTime,
        MM: processRelativeTime,
        y: processRelativeTime,
        yy: processRelativeTime
    },
    dayOfMonthOrdinalParse: /\d{1,2}./,
    ordinal: '%d.',
    week: {
        dow: 1,
        doy: 4 // The week that contains Jan 4th is the first week of the year.
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvY2hyb25vcy9pMThuL2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLGtDQUFrQztBQUNsQywwQkFBMEI7QUFDMUIseURBQXlEO0FBRXpELE1BQU0sbUJBQW1CLEdBQUcsVUFBVSxHQUFXLEVBQUUsYUFBc0IsRUFBRSxHQUFXLEVBQUUsUUFBaUI7SUFDdkcsTUFBTSxNQUFNLEdBQUc7UUFDWCxDQUFDLEVBQUcsQ0FBQyxjQUFjLEVBQUUsYUFBYSxFQUFFLGVBQWUsQ0FBQztRQUNwRCxFQUFFLEVBQUUsQ0FBQyxHQUFHLEdBQUcsU0FBUyxFQUFFLEdBQUcsR0FBRyxVQUFVLENBQUM7UUFDdkMsQ0FBQyxFQUFHLENBQUMsWUFBWSxFQUFFLFdBQVcsQ0FBQztRQUMvQixFQUFFLEVBQUUsQ0FBQyxHQUFHLEdBQUcsU0FBUyxFQUFFLEdBQUcsR0FBRyxVQUFVLENBQUM7UUFDdkMsQ0FBQyxFQUFHLENBQUMsV0FBVyxFQUFFLFdBQVcsRUFBRSxVQUFVLENBQUM7UUFDMUMsRUFBRSxFQUFFLENBQUMsR0FBRyxHQUFHLFFBQVEsRUFBRSxHQUFHLEdBQUcsUUFBUSxDQUFDO1FBQ3BDLENBQUMsRUFBRyxDQUFDLFdBQVcsRUFBRSxVQUFVLENBQUM7UUFDN0IsQ0FBQyxFQUFHLENBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxTQUFTLENBQUM7UUFDdEMsRUFBRSxFQUFFLENBQUMsR0FBRyxHQUFHLE1BQU0sRUFBRSxHQUFHLEdBQUcsT0FBTyxDQUFDO1FBQ2pDLENBQUMsRUFBRyxDQUFDLFdBQVcsRUFBRSxPQUFPLEVBQUUsV0FBVyxDQUFDO1FBQ3ZDLEVBQUUsRUFBRSxDQUFDLEdBQUcsR0FBRyxRQUFRLEVBQUUsR0FBRyxHQUFHLFNBQVMsQ0FBQztLQUN4QyxDQUFDO0lBQ0YsSUFBSSxhQUFhLEVBQUU7UUFDZixPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDM0Q7SUFDRCxPQUFPLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDcEQsQ0FBQyxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sUUFBUSxHQUFlO0lBQ2xDLElBQUksRUFBRSxJQUFJO0lBQ1YsTUFBTSxFQUFFLDRGQUE0RixDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7SUFDL0csV0FBVyxFQUFFLDREQUE0RCxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7SUFDcEYsUUFBUSxFQUFFLGdFQUFnRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7SUFDckYsYUFBYSxFQUFFLGVBQWUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQ3pDLFdBQVcsRUFBRSxlQUFlLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztJQUN2QyxjQUFjLEVBQUU7UUFDZCxFQUFFLEVBQUksTUFBTTtRQUNaLEdBQUcsRUFBRyxTQUFTO1FBQ2YsQ0FBQyxFQUFLLFlBQVk7UUFDbEIsRUFBRSxFQUFJLGNBQWM7UUFDcEIsR0FBRyxFQUFHLG1CQUFtQjtRQUN6QixJQUFJLEVBQUUseUJBQXlCO0tBQ2hDO0lBQ0QsUUFBUSxFQUFFO1FBQ1IsT0FBTyxFQUFHLFlBQVk7UUFDdEIsT0FBTyxFQUFHLGFBQWE7UUFDdkIsUUFBUSxFQUFFLG9CQUFvQjtRQUM5QixPQUFPLEVBQUcsWUFBWTtRQUN0QixRQUFRLEVBQUUsbUJBQW1CO1FBQzdCLFFBQVEsRUFBRSxHQUFHO0tBQ2Q7SUFDRCxZQUFZLEVBQUc7UUFDYixNQUFNLEVBQUcsV0FBVztRQUNwQixJQUFJLEVBQUssV0FBVztRQUNwQixDQUFDLEVBQVEsbUJBQW1CO1FBQzVCLEVBQUUsRUFBTyxtQkFBbUI7UUFDNUIsQ0FBQyxFQUFRLG1CQUFtQjtRQUM1QixFQUFFLEVBQU8sbUJBQW1CO1FBQzVCLENBQUMsRUFBUSxtQkFBbUI7UUFDNUIsRUFBRSxFQUFPLG1CQUFtQjtRQUM1QixDQUFDLEVBQVEsbUJBQW1CO1FBQzVCLEVBQUUsRUFBTyxVQUFVO1FBQ25CLENBQUMsRUFBUSxtQkFBbUI7UUFDNUIsRUFBRSxFQUFPLG1CQUFtQjtRQUM1QixDQUFDLEVBQVEsbUJBQW1CO1FBQzVCLEVBQUUsRUFBTyxtQkFBbUI7S0FDN0I7SUFDRCxzQkFBc0IsRUFBRyxVQUFVO0lBQ25DLE9BQU8sRUFBRyxLQUFLO0lBQ2YsSUFBSSxFQUFHO1FBQ0gsR0FBRyxFQUFHLENBQUM7UUFDUCxHQUFHLEVBQUcsQ0FBQyxDQUFFLGdFQUFnRTtLQUM1RTtDQUNGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2NhbGVEYXRhIH0gZnJvbSAnLi4vbG9jYWxlL2xvY2FsZS5jbGFzcyc7XHJcblxyXG4vLyEgbW9tZW50LmpzIGxvY2FsZSBjb25maWd1cmF0aW9uXHJcbi8vISBsb2NhbGUgOiBFc3RvbmlhbiBbZXRdXHJcbi8vISBhdXRob3IgOiBDaHJpcyBHZWRyaW0gOiBodHRwczovL2dpdGh1Yi5jb20vYTkwbWFjaGFkb1xyXG5cclxuY29uc3QgcHJvY2Vzc1JlbGF0aXZlVGltZSA9IGZ1bmN0aW9uIChudW06IG51bWJlciwgd2l0aG91dFN1ZmZpeDogYm9vbGVhbiwga2V5OiBzdHJpbmcsIGlzRnV0dXJlOiBib29sZWFuKSB7XHJcbiAgY29uc3QgZm9ybWF0ID0ge1xyXG4gICAgICBzIDogWydtw7VuZSBzZWt1bmRpJywgJ23DtW5pIHNla3VuZCcsICdwYWFyIHNla3VuZGl0J10sXHJcbiAgICAgIHNzOiBbbnVtICsgJ3Nla3VuZGknLCBudW0gKyAnc2VrdW5kaXQnXSxcclxuICAgICAgbSA6IFsnw7xoZSBtaW51dGknLCAnw7xrcyBtaW51dCddLFxyXG4gICAgICBtbTogW251bSArICcgbWludXRpJywgbnVtICsgJyBtaW51dGl0J10sXHJcbiAgICAgIGggOiBbJ8O8aGUgdHVubmknLCAndHVuZCBhZWdhJywgJ8O8a3MgdHVuZCddLFxyXG4gICAgICBoaDogW251bSArICcgdHVubmknLCBudW0gKyAnIHR1bmRpJ10sXHJcbiAgICAgIGQgOiBbJ8O8aGUgcMOkZXZhJywgJ8O8a3MgcMOkZXYnXSxcclxuICAgICAgTSA6IFsna3V1IGFqYScsICdrdXUgYWVnYScsICfDvGtzIGt1dSddLFxyXG4gICAgICBNTTogW251bSArICcga3V1JywgbnVtICsgJyBrdXVkJ10sXHJcbiAgICAgIHkgOiBbJ8O8aGUgYWFzdGEnLCAnYWFzdGEnLCAnw7xrcyBhYXN0YSddLFxyXG4gICAgICB5eTogW251bSArICcgYWFzdGEnLCBudW0gKyAnIGFhc3RhdCddXHJcbiAgfTtcclxuICBpZiAod2l0aG91dFN1ZmZpeCkge1xyXG4gICAgICByZXR1cm4gZm9ybWF0W2tleV1bMl0gPyBmb3JtYXRba2V5XVsyXSA6IGZvcm1hdFtrZXldWzFdO1xyXG4gIH1cclxuICByZXR1cm4gaXNGdXR1cmUgPyBmb3JtYXRba2V5XVswXSA6IGZvcm1hdFtrZXldWzFdO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGV0TG9jYWxlOiBMb2NhbGVEYXRhID0ge1xyXG4gIGFiYnI6ICdldCcsXHJcbiAgbW9udGhzOiAnamFhbnVhcl92ZWVicnVhcl9tw6RydHNfYXByaWxsX21haV9qdXVuaV9qdXVsaV9hdWd1c3Rfc2VwdGVtYmVyX29rdG9vYmVyX25vdmVtYmVyX2RldHNlbWJlcicuc3BsaXQoJ18nKSxcclxuICBtb250aHNTaG9ydDogJ2phYW5fdmVlYnJfbcOkcnRzX2Fwcl9tYWlfanV1bmlfanV1bGlfYXVnX3NlcHRfb2t0X25vdl9kZXRzJy5zcGxpdCgnXycpLFxyXG4gIHdlZWtkYXlzOiAncMO8aGFww6Rldl9lc21hc3DDpGV2X3RlaXNpcMOkZXZfa29sbWFww6Rldl9uZWxqYXDDpGV2X3JlZWRlX2xhdXDDpGV2Jy5zcGxpdCgnXycpLFxyXG4gIHdlZWtkYXlzU2hvcnQ6ICdQX0VfVF9LX05fUl9MJy5zcGxpdCgnXycpLFxyXG4gIHdlZWtkYXlzTWluOiAnUF9FX1RfS19OX1JfTCcuc3BsaXQoJ18nKSxcclxuICBsb25nRGF0ZUZvcm1hdDoge1xyXG4gICAgTFQ6ICAgJ0g6bW0nLFxyXG4gICAgTFRTOiAgJ0g6bW06c3MnLFxyXG4gICAgTDogICAgJ0RELk1NLllZWVknLFxyXG4gICAgTEw6ICAgJ0QuIE1NTU0gWVlZWScsXHJcbiAgICBMTEw6ICAnRC4gTU1NTSBZWVlZIEg6bW0nLFxyXG4gICAgTExMTDogJ2RkZGQsIEQuIE1NTU0gWVlZWSBIOm1tJ1xyXG4gIH0sXHJcbiAgY2FsZW5kYXI6IHtcclxuICAgIHNhbWVEYXk6ICAnW1TDpG5hLF0gTFQnLFxyXG4gICAgbmV4dERheTogICdbSG9tbWUsXSBMVCcsXHJcbiAgICBuZXh0V2VlazogJ1tKw6RyZ21pbmVdIGRkZGQgTFQnLFxyXG4gICAgbGFzdERheTogICdbRWlsZSxdIExUJyxcclxuICAgIGxhc3RXZWVrOiAnW0VlbG1pbmVdIGRkZGQgTFQnLFxyXG4gICAgc2FtZUVsc2U6ICdMJ1xyXG4gIH0sXHJcbiAgcmVsYXRpdmVUaW1lIDoge1xyXG4gICAgZnV0dXJlIDogJyVzIHDDpHJhc3QnLFxyXG4gICAgcGFzdCAgIDogJyVzIHRhZ2FzaScsXHJcbiAgICBzICAgICAgOiBwcm9jZXNzUmVsYXRpdmVUaW1lLFxyXG4gICAgc3MgICAgIDogcHJvY2Vzc1JlbGF0aXZlVGltZSxcclxuICAgIG0gICAgICA6IHByb2Nlc3NSZWxhdGl2ZVRpbWUsXHJcbiAgICBtbSAgICAgOiBwcm9jZXNzUmVsYXRpdmVUaW1lLFxyXG4gICAgaCAgICAgIDogcHJvY2Vzc1JlbGF0aXZlVGltZSxcclxuICAgIGhoICAgICA6IHByb2Nlc3NSZWxhdGl2ZVRpbWUsXHJcbiAgICBkICAgICAgOiBwcm9jZXNzUmVsYXRpdmVUaW1lLFxyXG4gICAgZGQgICAgIDogJyVkIHDDpGV2YScsXHJcbiAgICBNICAgICAgOiBwcm9jZXNzUmVsYXRpdmVUaW1lLFxyXG4gICAgTU0gICAgIDogcHJvY2Vzc1JlbGF0aXZlVGltZSxcclxuICAgIHkgICAgICA6IHByb2Nlc3NSZWxhdGl2ZVRpbWUsXHJcbiAgICB5eSAgICAgOiBwcm9jZXNzUmVsYXRpdmVUaW1lXHJcbiAgfSxcclxuICBkYXlPZk1vbnRoT3JkaW5hbFBhcnNlIDogL1xcZHsxLDJ9Li8sXHJcbiAgb3JkaW5hbCA6ICclZC4nLFxyXG4gIHdlZWsgOiB7XHJcbiAgICAgIGRvdyA6IDEsIC8vIE1vbmRheSBpcyB0aGUgZmlyc3QgZGF5IG9mIHRoZSB3ZWVrLlxyXG4gICAgICBkb3kgOiA0ICAvLyBUaGUgd2VlayB0aGF0IGNvbnRhaW5zIEphbiA0dGggaXMgdGhlIGZpcnN0IHdlZWsgb2YgdGhlIHllYXIuXHJcbiAgfVxyXG59O1xyXG4iXX0=