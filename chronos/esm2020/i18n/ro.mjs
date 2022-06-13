// ! moment.js locale configuration
// ! locale : Romanian [ro]
//! author : Vlad Gurdiga : https://github.com/gurdiga
//! author : Valentin Agachi : https://github.com/avaly
// ! author : Earle white: https://github.com/5earle
function relativeTimeWithPlural(num, withoutSuffix, key) {
    let format = {
        ss: 'secunde',
        mm: 'minute',
        hh: 'ore',
        dd: 'zile',
        MM: 'luni',
        yy: 'ani'
    };
    let separator = ' ';
    if (num % 100 >= 20 || (num >= 100 && num % 100 === 0)) {
        separator = ' de ';
    }
    return num + separator + format[key];
}
export const roLocale = {
    abbr: 'ro',
    months: 'ianuarie_februarie_martie_aprilie_mai_iunie_iulie_august_septembrie_octombrie_noiembrie_decembrie'.split('_'),
    monthsShort: 'ian._febr._mart._apr._mai_iun._iul._aug._sept._oct._nov._dec.'.split('_'),
    monthsParseExact: true,
    weekdays: 'duminică_luni_marți_miercuri_joi_vineri_sâmbătă'.split('_'),
    weekdaysShort: 'Dum_Lun_Mar_Mie_Joi_Vin_Sâm'.split('_'),
    weekdaysMin: 'Du_Lu_Ma_Mi_Jo_Vi_Sâ'.split('_'),
    longDateFormat: {
        LT: 'H:mm',
        LTS: 'H:mm:ss',
        L: 'DD.MM.YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY H:mm',
        LLLL: 'dddd, D MMMM YYYY H:mm'
    },
    calendar: {
        sameDay: '[azi la] LT',
        nextDay: '[mâine la] LT',
        nextWeek: 'dddd [la] LT',
        lastDay: '[ieri la] LT',
        lastWeek: '[fosta] dddd [la] LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: 'peste %s',
        past: '%s în urmă',
        s: 'câteva secunde',
        ss: relativeTimeWithPlural,
        m: 'un minut',
        mm: relativeTimeWithPlural,
        h: 'o oră',
        hh: relativeTimeWithPlural,
        d: 'o zi',
        dd: relativeTimeWithPlural,
        M: 'o lună',
        MM: relativeTimeWithPlural,
        y: 'un an',
        yy: relativeTimeWithPlural
    },
    week: {
        dow: 1,
        doy: 7 // The week that contains Jan 1st is the first week of the year.
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvY2hyb25vcy9pMThuL3JvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLG1DQUFtQztBQUNuQywyQkFBMkI7QUFDM0Isc0RBQXNEO0FBQ3RELHVEQUF1RDtBQUN2RCxvREFBb0Q7QUFFcEQsU0FBUyxzQkFBc0IsQ0FBQyxHQUFXLEVBQUUsYUFBc0IsRUFBRSxHQUFXO0lBQzlFLElBQUksTUFBTSxHQUEyQjtRQUNuQyxFQUFFLEVBQUUsU0FBUztRQUNiLEVBQUUsRUFBRSxRQUFRO1FBQ1osRUFBRSxFQUFFLEtBQUs7UUFDVCxFQUFFLEVBQUUsTUFBTTtRQUNWLEVBQUUsRUFBRSxNQUFNO1FBQ1YsRUFBRSxFQUFFLEtBQUs7S0FDVixDQUFDO0lBRUYsSUFBSSxTQUFTLEdBQUcsR0FBRyxDQUFDO0lBQ3BCLElBQUksR0FBRyxHQUFHLEdBQUcsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLElBQUksR0FBRyxJQUFJLEdBQUcsR0FBRyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDdEQsU0FBUyxHQUFHLE1BQU0sQ0FBQztLQUNwQjtJQUNELE9BQU8sR0FBRyxHQUFHLFNBQVMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDdkMsQ0FBQztBQUdELE1BQU0sQ0FBQyxNQUFNLFFBQVEsR0FBZTtJQUNsQyxJQUFJLEVBQUUsSUFBSTtJQUNWLE1BQU0sRUFBRSxtR0FBbUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQ3RILFdBQVcsRUFBRSwrREFBK0QsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQ3ZGLGdCQUFnQixFQUFFLElBQUk7SUFDdEIsUUFBUSxFQUFFLGlEQUFpRCxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7SUFDdEUsYUFBYSxFQUFFLDZCQUE2QixDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7SUFDdkQsV0FBVyxFQUFFLHNCQUFzQixDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7SUFDOUMsY0FBYyxFQUFFO1FBQ2QsRUFBRSxFQUFFLE1BQU07UUFDVixHQUFHLEVBQUUsU0FBUztRQUNkLENBQUMsRUFBRSxZQUFZO1FBQ2YsRUFBRSxFQUFFLGFBQWE7UUFDakIsR0FBRyxFQUFFLGtCQUFrQjtRQUN2QixJQUFJLEVBQUUsd0JBQXdCO0tBQy9CO0lBQ0QsUUFBUSxFQUFFO1FBQ1IsT0FBTyxFQUFFLGFBQWE7UUFDdEIsT0FBTyxFQUFFLGVBQWU7UUFDeEIsUUFBUSxFQUFFLGNBQWM7UUFDeEIsT0FBTyxFQUFFLGNBQWM7UUFDdkIsUUFBUSxFQUFFLHNCQUFzQjtRQUNoQyxRQUFRLEVBQUUsR0FBRztLQUNkO0lBQ0QsWUFBWSxFQUFFO1FBQ1osTUFBTSxFQUFFLFVBQVU7UUFDbEIsSUFBSSxFQUFFLFlBQVk7UUFDbEIsQ0FBQyxFQUFFLGdCQUFnQjtRQUNuQixFQUFFLEVBQUUsc0JBQXNCO1FBQzFCLENBQUMsRUFBRSxVQUFVO1FBQ2IsRUFBRSxFQUFFLHNCQUFzQjtRQUMxQixDQUFDLEVBQUUsT0FBTztRQUNWLEVBQUUsRUFBRSxzQkFBc0I7UUFDMUIsQ0FBQyxFQUFFLE1BQU07UUFDVCxFQUFFLEVBQUUsc0JBQXNCO1FBQzFCLENBQUMsRUFBRSxRQUFRO1FBQ1gsRUFBRSxFQUFFLHNCQUFzQjtRQUMxQixDQUFDLEVBQUUsT0FBTztRQUNWLEVBQUUsRUFBRSxzQkFBc0I7S0FDM0I7SUFDRCxJQUFJLEVBQUU7UUFDSixHQUFHLEVBQUUsQ0FBQztRQUNOLEdBQUcsRUFBRSxDQUFDLENBQUUsZ0VBQWdFO0tBQ3pFO0NBQ0YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExvY2FsZURhdGEgfSBmcm9tICcuLi9sb2NhbGUvbG9jYWxlLmNsYXNzJztcclxuXHJcbi8vICEgbW9tZW50LmpzIGxvY2FsZSBjb25maWd1cmF0aW9uXHJcbi8vICEgbG9jYWxlIDogUm9tYW5pYW4gW3JvXVxyXG4vLyEgYXV0aG9yIDogVmxhZCBHdXJkaWdhIDogaHR0cHM6Ly9naXRodWIuY29tL2d1cmRpZ2FcclxuLy8hIGF1dGhvciA6IFZhbGVudGluIEFnYWNoaSA6IGh0dHBzOi8vZ2l0aHViLmNvbS9hdmFseVxyXG4vLyAhIGF1dGhvciA6IEVhcmxlIHdoaXRlOiBodHRwczovL2dpdGh1Yi5jb20vNWVhcmxlXHJcblxyXG5mdW5jdGlvbiByZWxhdGl2ZVRpbWVXaXRoUGx1cmFsKG51bTogbnVtYmVyLCB3aXRob3V0U3VmZml4OiBib29sZWFuLCBrZXk6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgbGV0IGZvcm1hdDoge1trZXk6c3RyaW5nXTogc3RyaW5nfSA9IHtcclxuICAgIHNzOiAnc2VjdW5kZScsXHJcbiAgICBtbTogJ21pbnV0ZScsXHJcbiAgICBoaDogJ29yZScsXHJcbiAgICBkZDogJ3ppbGUnLFxyXG4gICAgTU06ICdsdW5pJyxcclxuICAgIHl5OiAnYW5pJ1xyXG4gIH07XHJcblxyXG4gIGxldCBzZXBhcmF0b3IgPSAnICc7XHJcbiAgaWYgKG51bSAlIDEwMCA+PSAyMCB8fCAobnVtID49IDEwMCAmJiBudW0gJSAxMDAgPT09IDApKSB7XHJcbiAgICBzZXBhcmF0b3IgPSAnIGRlICc7XHJcbiAgfVxyXG4gIHJldHVybiBudW0gKyBzZXBhcmF0b3IgKyBmb3JtYXRba2V5XTtcclxufVxyXG5cclxuXHJcbmV4cG9ydCBjb25zdCByb0xvY2FsZTogTG9jYWxlRGF0YSA9IHtcclxuICBhYmJyOiAncm8nLFxyXG4gIG1vbnRoczogJ2lhbnVhcmllX2ZlYnJ1YXJpZV9tYXJ0aWVfYXByaWxpZV9tYWlfaXVuaWVfaXVsaWVfYXVndXN0X3NlcHRlbWJyaWVfb2N0b21icmllX25vaWVtYnJpZV9kZWNlbWJyaWUnLnNwbGl0KCdfJyksXHJcbiAgbW9udGhzU2hvcnQ6ICdpYW4uX2ZlYnIuX21hcnQuX2Fwci5fbWFpX2l1bi5faXVsLl9hdWcuX3NlcHQuX29jdC5fbm92Ll9kZWMuJy5zcGxpdCgnXycpLFxyXG4gIG1vbnRoc1BhcnNlRXhhY3Q6IHRydWUsXHJcbiAgd2Vla2RheXM6ICdkdW1pbmljxINfbHVuaV9tYXLIm2lfbWllcmN1cmlfam9pX3ZpbmVyaV9zw6JtYsSDdMSDJy5zcGxpdCgnXycpLFxyXG4gIHdlZWtkYXlzU2hvcnQ6ICdEdW1fTHVuX01hcl9NaWVfSm9pX1Zpbl9Tw6JtJy5zcGxpdCgnXycpLFxyXG4gIHdlZWtkYXlzTWluOiAnRHVfTHVfTWFfTWlfSm9fVmlfU8OiJy5zcGxpdCgnXycpLFxyXG4gIGxvbmdEYXRlRm9ybWF0OiB7XHJcbiAgICBMVDogJ0g6bW0nLFxyXG4gICAgTFRTOiAnSDptbTpzcycsXHJcbiAgICBMOiAnREQuTU0uWVlZWScsXHJcbiAgICBMTDogJ0QgTU1NTSBZWVlZJyxcclxuICAgIExMTDogJ0QgTU1NTSBZWVlZIEg6bW0nLFxyXG4gICAgTExMTDogJ2RkZGQsIEQgTU1NTSBZWVlZIEg6bW0nXHJcbiAgfSxcclxuICBjYWxlbmRhcjoge1xyXG4gICAgc2FtZURheTogJ1themkgbGFdIExUJyxcclxuICAgIG5leHREYXk6ICdbbcOiaW5lIGxhXSBMVCcsXHJcbiAgICBuZXh0V2VlazogJ2RkZGQgW2xhXSBMVCcsXHJcbiAgICBsYXN0RGF5OiAnW2llcmkgbGFdIExUJyxcclxuICAgIGxhc3RXZWVrOiAnW2Zvc3RhXSBkZGRkIFtsYV0gTFQnLFxyXG4gICAgc2FtZUVsc2U6ICdMJ1xyXG4gIH0sXHJcbiAgcmVsYXRpdmVUaW1lOiB7XHJcbiAgICBmdXR1cmU6ICdwZXN0ZSAlcycsXHJcbiAgICBwYXN0OiAnJXMgw65uIHVybcSDJyxcclxuICAgIHM6ICdjw6J0ZXZhIHNlY3VuZGUnLFxyXG4gICAgc3M6IHJlbGF0aXZlVGltZVdpdGhQbHVyYWwsXHJcbiAgICBtOiAndW4gbWludXQnLFxyXG4gICAgbW06IHJlbGF0aXZlVGltZVdpdGhQbHVyYWwsXHJcbiAgICBoOiAnbyBvcsSDJyxcclxuICAgIGhoOiByZWxhdGl2ZVRpbWVXaXRoUGx1cmFsLFxyXG4gICAgZDogJ28gemknLFxyXG4gICAgZGQ6IHJlbGF0aXZlVGltZVdpdGhQbHVyYWwsXHJcbiAgICBNOiAnbyBsdW7EgycsXHJcbiAgICBNTTogcmVsYXRpdmVUaW1lV2l0aFBsdXJhbCxcclxuICAgIHk6ICd1biBhbicsXHJcbiAgICB5eTogcmVsYXRpdmVUaW1lV2l0aFBsdXJhbFxyXG4gIH0sXHJcbiAgd2Vlazoge1xyXG4gICAgZG93OiAxLCAvLyBNb25kYXkgaXMgdGhlIGZpcnN0IGRheSBvZiB0aGUgd2Vlay5cclxuICAgIGRveTogNyAgLy8gVGhlIHdlZWsgdGhhdCBjb250YWlucyBKYW4gMXN0IGlzIHRoZSBmaXJzdCB3ZWVrIG9mIHRoZSB5ZWFyLlxyXG4gIH1cclxufTtcclxuIl19