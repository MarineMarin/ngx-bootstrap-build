//! moment.js locale configuration
// https://github.com/moment/moment/blob/develop/locale/fi.js
var numbersPast = 'nolla yksi kaksi kolme neljä viisi kuusi seitsemän kahdeksan yhdeksän'.split(' '), numbersFuture = [
    'nolla', 'yhden', 'kahden', 'kolmen', 'neljän', 'viiden', 'kuuden',
    numbersPast[7], numbersPast[8], numbersPast[9]
];
function translate(num, withoutSuffix, key, isFuture) {
    var result = '';
    switch (key) {
        case 's':
            return isFuture ? 'muutaman sekunnin' : 'muutama sekunti';
        case 'ss':
            return isFuture ? 'sekunnin' : 'sekuntia';
        case 'm':
            return isFuture ? 'minuutin' : 'minuutti';
        case 'mm':
            result = isFuture ? 'minuutin' : 'minuuttia';
            break;
        case 'h':
            return isFuture ? 'tunnin' : 'tunti';
        case 'hh':
            result = isFuture ? 'tunnin' : 'tuntia';
            break;
        case 'd':
            return isFuture ? 'päivän' : 'päivä';
        case 'dd':
            result = isFuture ? 'päivän' : 'päivää';
            break;
        case 'M':
            return isFuture ? 'kuukauden' : 'kuukausi';
        case 'MM':
            result = isFuture ? 'kuukauden' : 'kuukautta';
            break;
        case 'y':
            return isFuture ? 'vuoden' : 'vuosi';
        case 'yy':
            result = isFuture ? 'vuoden' : 'vuotta';
            break;
    }
    result = verbalNumber(num, isFuture) + ' ' + result;
    return result;
}
function verbalNumber(num, isFuture) {
    return num < 10 ? (isFuture ? numbersFuture[num] : numbersPast[num]) : num;
}
export const fiLocale = {
    abbr: 'fi',
    months: 'tammikuu_helmikuu_maaliskuu_huhtikuu_toukokuu_kesäkuu_heinäkuu_elokuu_syyskuu_lokakuu_marraskuu_joulukuu'.split('_'),
    monthsShort: 'tammi_helmi_maalis_huhti_touko_kesä_heinä_elo_syys_loka_marras_joulu'.split('_'),
    weekdays: 'sunnuntai_maanantai_tiistai_keskiviikko_torstai_perjantai_lauantai'.split('_'),
    weekdaysShort: 'su_ma_ti_ke_to_pe_la'.split('_'),
    weekdaysMin: 'su_ma_ti_ke_to_pe_la'.split('_'),
    longDateFormat: {
        LT: 'HH.mm',
        LTS: 'HH.mm.ss',
        L: 'DD.MM.YYYY',
        LL: 'Do MMMM[ta] YYYY',
        LLL: 'Do MMMM[ta] YYYY, [klo] HH.mm',
        LLLL: 'dddd, Do MMMM[ta] YYYY, [klo] HH.mm',
        l: 'D.M.YYYY',
        ll: 'Do MMM YYYY',
        lll: 'Do MMM YYYY, [klo] HH.mm',
        llll: 'ddd, Do MMM YYYY, [klo] HH.mm'
    },
    calendar: {
        sameDay: '[tänään] [klo] LT',
        nextDay: '[huomenna] [klo] LT',
        nextWeek: 'dddd [klo] LT',
        lastDay: '[eilen] [klo] LT',
        lastWeek: '[viime] dddd[na] [klo] LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: '%s päästä',
        past: '%s sitten',
        s: translate,
        ss: translate,
        m: translate,
        mm: translate,
        h: translate,
        hh: translate,
        d: translate,
        dd: translate,
        M: translate,
        MM: translate,
        y: translate,
        yy: translate
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: '%d.',
    week: {
        dow: 1,
        doy: 4 // The week that contains Jan 4th is the first week of the year.
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvY2hyb25vcy9pMThuL2ZpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLGtDQUFrQztBQUNsQyw2REFBNkQ7QUFFN0QsSUFBSSxXQUFXLEdBQUcsdUVBQXVFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUNsRyxhQUFhLEdBQUc7SUFDZCxPQUFPLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRO0lBQ2xFLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQztDQUMvQyxDQUFDO0FBRUosU0FBUyxTQUFTLENBQUMsR0FBVyxFQUFFLGFBQXNCLEVBQUUsR0FBVyxFQUFFLFFBQWlCO0lBQ3BGLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUNoQixRQUFRLEdBQUcsRUFBRTtRQUNYLEtBQUssR0FBRztZQUNOLE9BQU8sUUFBUSxDQUFDLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUM7UUFDNUQsS0FBSyxJQUFJO1lBQ1AsT0FBTyxRQUFRLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDO1FBQzVDLEtBQUssR0FBRztZQUNOLE9BQU8sUUFBUSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQztRQUM1QyxLQUFLLElBQUk7WUFDUCxNQUFNLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQztZQUM3QyxNQUFNO1FBQ1IsS0FBSyxHQUFHO1lBQ04sT0FBTyxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO1FBQ3ZDLEtBQUssSUFBSTtZQUNQLE1BQU0sR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO1lBQ3hDLE1BQU07UUFDUixLQUFLLEdBQUc7WUFDTixPQUFPLFFBQVEsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7UUFDdkMsS0FBSyxJQUFJO1lBQ1AsTUFBTSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7WUFDeEMsTUFBTTtRQUNSLEtBQUssR0FBRztZQUNOLE9BQU8sUUFBUSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQztRQUM3QyxLQUFLLElBQUk7WUFDUCxNQUFNLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQztZQUM5QyxNQUFNO1FBQ1IsS0FBSyxHQUFHO1lBQ04sT0FBTyxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO1FBQ3ZDLEtBQUssSUFBSTtZQUNQLE1BQU0sR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO1lBQ3hDLE1BQU07S0FDVDtJQUNELE1BQU0sR0FBRyxZQUFZLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxHQUFHLEdBQUcsR0FBRyxNQUFNLENBQUM7SUFDcEQsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQUVELFNBQVMsWUFBWSxDQUFDLEdBQVcsRUFBRSxRQUFpQjtJQUNsRCxPQUFPLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7QUFDN0UsQ0FBQztBQUVELE1BQU0sQ0FBQyxNQUFNLFFBQVEsR0FBZTtJQUNsQyxJQUFJLEVBQUUsSUFBSTtJQUNWLE1BQU0sRUFBRSwwR0FBMEcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQzdILFdBQVcsRUFBRSxzRUFBc0UsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQzlGLFFBQVEsRUFBRSxvRUFBb0UsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQ3pGLGFBQWEsRUFBRSxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQ2hELFdBQVcsRUFBRSxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQzlDLGNBQWMsRUFBRTtRQUNkLEVBQUUsRUFBRSxPQUFPO1FBQ1gsR0FBRyxFQUFFLFVBQVU7UUFDZixDQUFDLEVBQUUsWUFBWTtRQUNmLEVBQUUsRUFBRSxrQkFBa0I7UUFDdEIsR0FBRyxFQUFFLCtCQUErQjtRQUNwQyxJQUFJLEVBQUUscUNBQXFDO1FBQzNDLENBQUMsRUFBRSxVQUFVO1FBQ2IsRUFBRSxFQUFFLGFBQWE7UUFDakIsR0FBRyxFQUFFLDBCQUEwQjtRQUMvQixJQUFJLEVBQUUsK0JBQStCO0tBQ3RDO0lBQ0QsUUFBUSxFQUFFO1FBQ1IsT0FBTyxFQUFFLG1CQUFtQjtRQUM1QixPQUFPLEVBQUUscUJBQXFCO1FBQzlCLFFBQVEsRUFBRSxlQUFlO1FBQ3pCLE9BQU8sRUFBRSxrQkFBa0I7UUFDM0IsUUFBUSxFQUFFLDJCQUEyQjtRQUNyQyxRQUFRLEVBQUUsR0FBRztLQUNkO0lBQ0QsWUFBWSxFQUFFO1FBQ1osTUFBTSxFQUFFLFdBQVc7UUFDbkIsSUFBSSxFQUFFLFdBQVc7UUFDakIsQ0FBQyxFQUFFLFNBQVM7UUFDWixFQUFFLEVBQUUsU0FBUztRQUNiLENBQUMsRUFBRSxTQUFTO1FBQ1osRUFBRSxFQUFFLFNBQVM7UUFDYixDQUFDLEVBQUUsU0FBUztRQUNaLEVBQUUsRUFBRSxTQUFTO1FBQ2IsQ0FBQyxFQUFFLFNBQVM7UUFDWixFQUFFLEVBQUUsU0FBUztRQUNiLENBQUMsRUFBRSxTQUFTO1FBQ1osRUFBRSxFQUFFLFNBQVM7UUFDYixDQUFDLEVBQUUsU0FBUztRQUNaLEVBQUUsRUFBRSxTQUFTO0tBQ2Q7SUFDRCxzQkFBc0IsRUFBRSxXQUFXO0lBQ25DLE9BQU8sRUFBRSxLQUFLO0lBQ2QsSUFBSSxFQUFFO1FBQ0osR0FBRyxFQUFFLENBQUM7UUFDTixHQUFHLEVBQUUsQ0FBQyxDQUFFLGdFQUFnRTtLQUN6RTtDQUNGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2NhbGVEYXRhIH0gZnJvbSAnLi4vbG9jYWxlL2xvY2FsZS5jbGFzcyc7XHJcblxyXG4vLyEgbW9tZW50LmpzIGxvY2FsZSBjb25maWd1cmF0aW9uXHJcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9tb21lbnQvbW9tZW50L2Jsb2IvZGV2ZWxvcC9sb2NhbGUvZmkuanNcclxuXHJcbnZhciBudW1iZXJzUGFzdCA9ICdub2xsYSB5a3NpIGtha3NpIGtvbG1lIG5lbGrDpCB2aWlzaSBrdXVzaSBzZWl0c2Vtw6RuIGthaGRla3NhbiB5aGRla3PDpG4nLnNwbGl0KCcgJyksXHJcbiAgbnVtYmVyc0Z1dHVyZSA9IFtcclxuICAgICdub2xsYScsICd5aGRlbicsICdrYWhkZW4nLCAna29sbWVuJywgJ25lbGrDpG4nLCAndmlpZGVuJywgJ2t1dWRlbicsXHJcbiAgICBudW1iZXJzUGFzdFs3XSwgbnVtYmVyc1Bhc3RbOF0sIG51bWJlcnNQYXN0WzldXHJcbiAgXTtcclxuXHJcbmZ1bmN0aW9uIHRyYW5zbGF0ZShudW06IG51bWJlciwgd2l0aG91dFN1ZmZpeDogYm9vbGVhbiwga2V5OiBzdHJpbmcsIGlzRnV0dXJlOiBib29sZWFuKTogc3RyaW5nIHtcclxuICB2YXIgcmVzdWx0ID0gJyc7XHJcbiAgc3dpdGNoIChrZXkpIHtcclxuICAgIGNhc2UgJ3MnOlxyXG4gICAgICByZXR1cm4gaXNGdXR1cmUgPyAnbXV1dGFtYW4gc2VrdW5uaW4nIDogJ211dXRhbWEgc2VrdW50aSc7XHJcbiAgICBjYXNlICdzcyc6XHJcbiAgICAgIHJldHVybiBpc0Z1dHVyZSA/ICdzZWt1bm5pbicgOiAnc2VrdW50aWEnO1xyXG4gICAgY2FzZSAnbSc6XHJcbiAgICAgIHJldHVybiBpc0Z1dHVyZSA/ICdtaW51dXRpbicgOiAnbWludXV0dGknO1xyXG4gICAgY2FzZSAnbW0nOlxyXG4gICAgICByZXN1bHQgPSBpc0Z1dHVyZSA/ICdtaW51dXRpbicgOiAnbWludXV0dGlhJztcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICdoJzpcclxuICAgICAgcmV0dXJuIGlzRnV0dXJlID8gJ3R1bm5pbicgOiAndHVudGknO1xyXG4gICAgY2FzZSAnaGgnOlxyXG4gICAgICByZXN1bHQgPSBpc0Z1dHVyZSA/ICd0dW5uaW4nIDogJ3R1bnRpYSc7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnZCc6XHJcbiAgICAgIHJldHVybiBpc0Z1dHVyZSA/ICdww6RpdsOkbicgOiAncMOkaXbDpCc7XHJcbiAgICBjYXNlICdkZCc6XHJcbiAgICAgIHJlc3VsdCA9IGlzRnV0dXJlID8gJ3DDpGl2w6RuJyA6ICdww6RpdsOkw6QnO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJ00nOlxyXG4gICAgICByZXR1cm4gaXNGdXR1cmUgPyAna3V1a2F1ZGVuJyA6ICdrdXVrYXVzaSc7XHJcbiAgICBjYXNlICdNTSc6XHJcbiAgICAgIHJlc3VsdCA9IGlzRnV0dXJlID8gJ2t1dWthdWRlbicgOiAna3V1a2F1dHRhJztcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICd5JzpcclxuICAgICAgcmV0dXJuIGlzRnV0dXJlID8gJ3Z1b2RlbicgOiAndnVvc2knO1xyXG4gICAgY2FzZSAneXknOlxyXG4gICAgICByZXN1bHQgPSBpc0Z1dHVyZSA/ICd2dW9kZW4nIDogJ3Z1b3R0YSc7XHJcbiAgICAgIGJyZWFrO1xyXG4gIH1cclxuICByZXN1bHQgPSB2ZXJiYWxOdW1iZXIobnVtLCBpc0Z1dHVyZSkgKyAnICcgKyByZXN1bHQ7XHJcbiAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZnVuY3Rpb24gdmVyYmFsTnVtYmVyKG51bTogbnVtYmVyLCBpc0Z1dHVyZTogYm9vbGVhbikge1xyXG4gIHJldHVybiBudW0gPCAxMCA/IChpc0Z1dHVyZSA/IG51bWJlcnNGdXR1cmVbbnVtXSA6IG51bWJlcnNQYXN0W251bV0pIDogbnVtO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgZmlMb2NhbGU6IExvY2FsZURhdGEgPSB7XHJcbiAgYWJicjogJ2ZpJyxcclxuICBtb250aHM6ICd0YW1taWt1dV9oZWxtaWt1dV9tYWFsaXNrdXVfaHVodGlrdXVfdG91a29rdXVfa2Vzw6RrdXVfaGVpbsOka3V1X2Vsb2t1dV9zeXlza3V1X2xva2FrdXVfbWFycmFza3V1X2pvdWx1a3V1Jy5zcGxpdCgnXycpLFxyXG4gIG1vbnRoc1Nob3J0OiAndGFtbWlfaGVsbWlfbWFhbGlzX2h1aHRpX3RvdWtvX2tlc8OkX2hlaW7DpF9lbG9fc3l5c19sb2thX21hcnJhc19qb3VsdScuc3BsaXQoJ18nKSxcclxuICB3ZWVrZGF5czogJ3N1bm51bnRhaV9tYWFuYW50YWlfdGlpc3RhaV9rZXNraXZpaWtrb190b3JzdGFpX3BlcmphbnRhaV9sYXVhbnRhaScuc3BsaXQoJ18nKSxcclxuICB3ZWVrZGF5c1Nob3J0OiAnc3VfbWFfdGlfa2VfdG9fcGVfbGEnLnNwbGl0KCdfJyksXHJcbiAgd2Vla2RheXNNaW46ICdzdV9tYV90aV9rZV90b19wZV9sYScuc3BsaXQoJ18nKSxcclxuICBsb25nRGF0ZUZvcm1hdDoge1xyXG4gICAgTFQ6ICdISC5tbScsXHJcbiAgICBMVFM6ICdISC5tbS5zcycsXHJcbiAgICBMOiAnREQuTU0uWVlZWScsXHJcbiAgICBMTDogJ0RvIE1NTU1bdGFdIFlZWVknLFxyXG4gICAgTExMOiAnRG8gTU1NTVt0YV0gWVlZWSwgW2tsb10gSEgubW0nLFxyXG4gICAgTExMTDogJ2RkZGQsIERvIE1NTU1bdGFdIFlZWVksIFtrbG9dIEhILm1tJyxcclxuICAgIGw6ICdELk0uWVlZWScsXHJcbiAgICBsbDogJ0RvIE1NTSBZWVlZJyxcclxuICAgIGxsbDogJ0RvIE1NTSBZWVlZLCBba2xvXSBISC5tbScsXHJcbiAgICBsbGxsOiAnZGRkLCBEbyBNTU0gWVlZWSwgW2tsb10gSEgubW0nXHJcbiAgfSxcclxuICBjYWxlbmRhcjoge1xyXG4gICAgc2FtZURheTogJ1t0w6Ruw6TDpG5dIFtrbG9dIExUJyxcclxuICAgIG5leHREYXk6ICdbaHVvbWVubmFdIFtrbG9dIExUJyxcclxuICAgIG5leHRXZWVrOiAnZGRkZCBba2xvXSBMVCcsXHJcbiAgICBsYXN0RGF5OiAnW2VpbGVuXSBba2xvXSBMVCcsXHJcbiAgICBsYXN0V2VlazogJ1t2aWltZV0gZGRkZFtuYV0gW2tsb10gTFQnLFxyXG4gICAgc2FtZUVsc2U6ICdMJ1xyXG4gIH0sXHJcbiAgcmVsYXRpdmVUaW1lOiB7XHJcbiAgICBmdXR1cmU6ICclcyBww6TDpHN0w6QnLFxyXG4gICAgcGFzdDogJyVzIHNpdHRlbicsXHJcbiAgICBzOiB0cmFuc2xhdGUsXHJcbiAgICBzczogdHJhbnNsYXRlLFxyXG4gICAgbTogdHJhbnNsYXRlLFxyXG4gICAgbW06IHRyYW5zbGF0ZSxcclxuICAgIGg6IHRyYW5zbGF0ZSxcclxuICAgIGhoOiB0cmFuc2xhdGUsXHJcbiAgICBkOiB0cmFuc2xhdGUsXHJcbiAgICBkZDogdHJhbnNsYXRlLFxyXG4gICAgTTogdHJhbnNsYXRlLFxyXG4gICAgTU06IHRyYW5zbGF0ZSxcclxuICAgIHk6IHRyYW5zbGF0ZSxcclxuICAgIHl5OiB0cmFuc2xhdGVcclxuICB9LFxyXG4gIGRheU9mTW9udGhPcmRpbmFsUGFyc2U6IC9cXGR7MSwyfVxcLi8sXHJcbiAgb3JkaW5hbDogJyVkLicsXHJcbiAgd2Vlazoge1xyXG4gICAgZG93OiAxLCAvLyBNb25kYXkgaXMgdGhlIGZpcnN0IGRheSBvZiB0aGUgd2Vlay5cclxuICAgIGRveTogNCAgLy8gVGhlIHdlZWsgdGhhdCBjb250YWlucyBKYW4gNHRoIGlzIHRoZSBmaXJzdCB3ZWVrIG9mIHRoZSB5ZWFyLlxyXG4gIH1cclxufTtcclxuIl19