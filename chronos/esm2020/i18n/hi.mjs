//! moment.js locale configuration
//! locale : Hindi [hi]
//! author : Mayank Singhal : https://github.com/mayanksinghal
let symbolMap = {
    1: '१',
    2: '२',
    3: '३',
    4: '४',
    5: '५',
    6: '६',
    7: '७',
    8: '८',
    9: '९',
    0: '०'
}, numberMap = {
    '१': '1',
    '२': '2',
    '३': '3',
    '४': '4',
    '५': '5',
    '६': '6',
    '७': '7',
    '८': '8',
    '९': '9',
    '०': '0'
};
export const hiLocale = {
    abbr: 'hi',
    months: 'जनवरी_फ़रवरी_मार्च_अप्रैल_मई_जून_जुलाई_अगस्त_सितम्बर_अक्टूबर_नवम्बर_दिसम्बर'.split('_'),
    monthsShort: 'जन._फ़र._मार्च_अप्रै._मई_जून_जुल._अग._सित._अक्टू._नव._दिस.'.split('_'),
    monthsParseExact: true,
    weekdays: 'रविवार_सोमवार_मंगलवार_बुधवार_गुरूवार_शुक्रवार_शनिवार'.split('_'),
    weekdaysShort: 'रवि_सोम_मंगल_बुध_गुरू_शुक्र_शनि'.split('_'),
    weekdaysMin: 'र_सो_मं_बु_गु_शु_श'.split('_'),
    longDateFormat: {
        LT: 'A h:mm बजे',
        LTS: 'A h:mm:ss बजे',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY, A h:mm बजे',
        LLLL: 'dddd, D MMMM YYYY, A h:mm बजे'
    },
    calendar: {
        sameDay: '[आज] LT',
        nextDay: '[कल] LT',
        nextWeek: 'dddd, LT',
        lastDay: '[कल] LT',
        lastWeek: '[पिछले] dddd, LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: '%s में',
        past: '%s पहले',
        s: 'कुछ ही क्षण',
        ss: '%d सेकंड',
        m: 'एक मिनट',
        mm: '%d मिनट',
        h: 'एक घंटा',
        hh: '%d घंटे',
        d: 'एक दिन',
        dd: '%d दिन',
        M: 'एक महीने',
        MM: '%d महीने',
        y: 'एक वर्ष',
        yy: '%d वर्ष'
    },
    preparse(str) {
        return str.replace(/[१२३४५६७८९०]/g, function (match) {
            return numberMap[match];
        });
    },
    postformat(str) {
        return str.replace(/\d/g, function (match) {
            return symbolMap[match];
        });
    },
    // Hindi notation for meridiems are quite fuzzy in practice. While there exists
    // a rigid notion of a 'Pahar' it is not used as rigidly in modern Hindi.
    meridiemParse: /रात|सुबह|दोपहर|शाम/,
    meridiemHour(hour, meridiem) {
        if (hour === 12) {
            hour = 0;
        }
        if (meridiem === 'रात') {
            return hour < 4 ? hour : hour + 12;
        }
        else if (meridiem === 'सुबह') {
            return hour;
        }
        else if (meridiem === 'दोपहर') {
            return hour >= 10 ? hour : hour + 12;
        }
        else if (meridiem === 'शाम') {
            return hour + 12;
        }
    },
    meridiem(hour, minute, isLower) {
        if (hour < 4) {
            return 'रात';
        }
        else if (hour < 10) {
            return 'सुबह';
        }
        else if (hour < 17) {
            return 'दोपहर';
        }
        else if (hour < 20) {
            return 'शाम';
        }
        else {
            return 'रात';
        }
    },
    week: {
        dow: 0,
        doy: 6 // The week that contains Jan 1st is the first week of the year.
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvY2hyb25vcy9pMThuL2hpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLGtDQUFrQztBQUNsQyx1QkFBdUI7QUFDdkIsOERBQThEO0FBRTlELElBQUksU0FBUyxHQUE0QjtJQUNyQyxDQUFDLEVBQUUsR0FBRztJQUNOLENBQUMsRUFBRSxHQUFHO0lBQ04sQ0FBQyxFQUFFLEdBQUc7SUFDTixDQUFDLEVBQUUsR0FBRztJQUNOLENBQUMsRUFBRSxHQUFHO0lBQ04sQ0FBQyxFQUFFLEdBQUc7SUFDTixDQUFDLEVBQUUsR0FBRztJQUNOLENBQUMsRUFBRSxHQUFHO0lBQ04sQ0FBQyxFQUFFLEdBQUc7SUFDTixDQUFDLEVBQUUsR0FBRztDQUNQLEVBQ0QsU0FBUyxHQUE0QjtJQUNuQyxHQUFHLEVBQUUsR0FBRztJQUNSLEdBQUcsRUFBRSxHQUFHO0lBQ1IsR0FBRyxFQUFFLEdBQUc7SUFDUixHQUFHLEVBQUUsR0FBRztJQUNSLEdBQUcsRUFBRSxHQUFHO0lBQ1IsR0FBRyxFQUFFLEdBQUc7SUFDUixHQUFHLEVBQUUsR0FBRztJQUNSLEdBQUcsRUFBRSxHQUFHO0lBQ1IsR0FBRyxFQUFFLEdBQUc7SUFDUixHQUFHLEVBQUUsR0FBRztDQUNULENBQUM7QUFFSixNQUFNLENBQUMsTUFBTSxRQUFRLEdBQWU7SUFDbEMsSUFBSSxFQUFFLElBQUk7SUFDVixNQUFNLEVBQUUsNkVBQTZFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztJQUNoRyxXQUFXLEVBQUUsNERBQTRELENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztJQUNwRixnQkFBZ0IsRUFBRSxJQUFJO0lBQ3RCLFFBQVEsRUFBRSxzREFBc0QsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQzNFLGFBQWEsRUFBRSxpQ0FBaUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQzNELFdBQVcsRUFBRSxvQkFBb0Is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cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9jYWxlRGF0YSB9IGZyb20gJy4uL2xvY2FsZS9sb2NhbGUuY2xhc3MnO1xyXG5cclxuLy8hIG1vbWVudC5qcyBsb2NhbGUgY29uZmlndXJhdGlvblxyXG4vLyEgbG9jYWxlIDogSGluZGkgW2hpXVxyXG4vLyEgYXV0aG9yIDogTWF5YW5rIFNpbmdoYWwgOiBodHRwczovL2dpdGh1Yi5jb20vbWF5YW5rc2luZ2hhbFxyXG5cclxubGV0IHN5bWJvbE1hcDoge1trZXk6IHN0cmluZ106IHN0cmluZ30gPSB7XHJcbiAgICAxOiAn4KWnJyxcclxuICAgIDI6ICfgpagnLFxyXG4gICAgMzogJ+ClqScsXHJcbiAgICA0OiAn4KWqJyxcclxuICAgIDU6ICfgpasnLFxyXG4gICAgNjogJ+ClrCcsXHJcbiAgICA3OiAn4KWtJyxcclxuICAgIDg6ICfgpa4nLFxyXG4gICAgOTogJ+ClrycsXHJcbiAgICAwOiAn4KWmJ1xyXG4gIH0sXHJcbiAgbnVtYmVyTWFwOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSA9IHtcclxuICAgICfgpacnOiAnMScsXHJcbiAgICAn4KWoJzogJzInLFxyXG4gICAgJ+ClqSc6ICczJyxcclxuICAgICfgpaonOiAnNCcsXHJcbiAgICAn4KWrJzogJzUnLFxyXG4gICAgJ+ClrCc6ICc2JyxcclxuICAgICfgpa0nOiAnNycsXHJcbiAgICAn4KWuJzogJzgnLFxyXG4gICAgJ+Clryc6ICc5JyxcclxuICAgICfgpaYnOiAnMCdcclxuICB9O1xyXG5cclxuZXhwb3J0IGNvbnN0IGhpTG9jYWxlOiBMb2NhbGVEYXRhID0ge1xyXG4gIGFiYnI6ICdoaScsXHJcbiAgbW9udGhzOiAn4KSc4KSo4KS14KSw4KWAX+Ckq+CkvOCksOCkteCksOClgF/gpK7gpL7gpLDgpY3gpJpf4KSF4KSq4KWN4KSw4KWI4KSyX+CkruCkiF/gpJzgpYLgpKhf4KSc4KWB4KSy4KS+4KSIX+CkheCkl+CkuOCljeCkpF/gpLjgpL/gpKTgpK7gpY3gpKzgpLBf4KSF4KSV4KWN4KSf4KWC4KSs4KSwX+CkqOCkteCkruCljeCkrOCksF/gpKbgpL/gpLjgpK7gpY3gpKzgpLAnLnNwbGl0KCdfJyksXHJcbiAgbW9udGhzU2hvcnQ6ICfgpJzgpKguX+Ckq+CkvOCksC5f4KSu4KS+4KSw4KWN4KSaX+CkheCkquCljeCksOCliC5f4KSu4KSIX+CknOClguCkqF/gpJzgpYHgpLIuX+CkheCkly5f4KS44KS/4KSkLl/gpIXgpJXgpY3gpJ/gpYIuX+CkqOCktS5f4KSm4KS/4KS4Licuc3BsaXQoJ18nKSxcclxuICBtb250aHNQYXJzZUV4YWN0OiB0cnVlLFxyXG4gIHdlZWtkYXlzOiAn4KSw4KS14KS/4KS14KS+4KSwX+CkuOCli+CkruCkteCkvuCksF/gpK7gpILgpJfgpLLgpLXgpL7gpLBf4KSs4KWB4KSn4KS14KS+4KSwX+Ckl+ClgeCksOClguCkteCkvuCksF/gpLbgpYHgpJXgpY3gpLDgpLXgpL7gpLBf4KS24KSo4KS/4KS14KS+4KSwJy5zcGxpdCgnXycpLFxyXG4gIHdlZWtkYXlzU2hvcnQ6ICfgpLDgpLXgpL9f4KS44KWL4KSuX+CkruCkguCkl+Cksl/gpKzgpYHgpKdf4KSX4KWB4KSw4KWCX+CktuClgeCkleCljeCksF/gpLbgpKjgpL8nLnNwbGl0KCdfJyksXHJcbiAgd2Vla2RheXNNaW46ICfgpLBf4KS44KWLX+CkruCkgl/gpKzgpYFf4KSX4KWBX+CktuClgV/gpLYnLnNwbGl0KCdfJyksXHJcbiAgbG9uZ0RhdGVGb3JtYXQ6IHtcclxuICAgIExUOiAnQSBoOm1tIOCkrOCknOClhycsXHJcbiAgICBMVFM6ICdBIGg6bW06c3Mg4KSs4KSc4KWHJyxcclxuICAgIEw6ICdERC9NTS9ZWVlZJyxcclxuICAgIExMOiAnRCBNTU1NIFlZWVknLFxyXG4gICAgTExMOiAnRCBNTU1NIFlZWVksIEEgaDptbSDgpKzgpJzgpYcnLFxyXG4gICAgTExMTDogJ2RkZGQsIEQgTU1NTSBZWVlZLCBBIGg6bW0g4KSs4KSc4KWHJ1xyXG4gIH0sXHJcbiAgY2FsZW5kYXI6IHtcclxuICAgIHNhbWVEYXk6ICdb4KSG4KScXSBMVCcsXHJcbiAgICBuZXh0RGF5OiAnW+CkleCksl0gTFQnLFxyXG4gICAgbmV4dFdlZWs6ICdkZGRkLCBMVCcsXHJcbiAgICBsYXN0RGF5OiAnW+CkleCksl0gTFQnLFxyXG4gICAgbGFzdFdlZWs6ICdb4KSq4KS/4KSb4KSy4KWHXSBkZGRkLCBMVCcsXHJcbiAgICBzYW1lRWxzZTogJ0wnXHJcbiAgfSxcclxuICByZWxhdGl2ZVRpbWU6IHtcclxuICAgIGZ1dHVyZTogJyVzIOCkruClh+CkgicsXHJcbiAgICBwYXN0OiAnJXMg4KSq4KS54KSy4KWHJyxcclxuICAgIHM6ICfgpJXgpYHgpJsg4KS54KWAIOCkleCljeCkt+CkoycsXHJcbiAgICBzczogJyVkIOCkuOClh+CkleCkguCkoScsXHJcbiAgICBtOiAn4KSP4KSVIOCkruCkv+CkqOCknycsXHJcbiAgICBtbTogJyVkIOCkruCkv+CkqOCknycsXHJcbiAgICBoOiAn4KSP4KSVIOCkmOCkguCkn+CkvicsXHJcbiAgICBoaDogJyVkIOCkmOCkguCkn+ClhycsXHJcbiAgICBkOiAn4KSP4KSVIOCkpuCkv+CkqCcsXHJcbiAgICBkZDogJyVkIOCkpuCkv+CkqCcsXHJcbiAgICBNOiAn4KSP4KSVIOCkruCkueClgOCkqOClhycsXHJcbiAgICBNTTogJyVkIOCkruCkueClgOCkqOClhycsXHJcbiAgICB5OiAn4KSP4KSVIOCkteCksOCljeCktycsXHJcbiAgICB5eTogJyVkIOCkteCksOCljeCktydcclxuICB9LFxyXG4gIHByZXBhcnNlKHN0cjogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBzdHIucmVwbGFjZSgvW+Clp+ClqOClqeClquClq+ClrOClreClruClr+Clpl0vZywgZnVuY3Rpb24gKG1hdGNoKSB7XHJcbiAgICAgIHJldHVybiBudW1iZXJNYXBbbWF0Y2hdO1xyXG4gICAgfSk7XHJcbiAgfSxcclxuICBwb3N0Zm9ybWF0KHN0cjogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBzdHIucmVwbGFjZSgvXFxkL2csIGZ1bmN0aW9uIChtYXRjaCkge1xyXG4gICAgICByZXR1cm4gc3ltYm9sTWFwW21hdGNoXTtcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgLy8gSGluZGkgbm90YXRpb24gZm9yIG1lcmlkaWVtcyBhcmUgcXVpdGUgZnV6enkgaW4gcHJhY3RpY2UuIFdoaWxlIHRoZXJlIGV4aXN0c1xyXG4gIC8vIGEgcmlnaWQgbm90aW9uIG9mIGEgJ1BhaGFyJyBpdCBpcyBub3QgdXNlZCBhcyByaWdpZGx5IGluIG1vZGVybiBIaW5kaS5cclxuICBtZXJpZGllbVBhcnNlOiAv4KSw4KS+4KSkfOCkuOClgeCkrOCkuXzgpKbgpYvgpKrgpLngpLB84KS24KS+4KSuLyxcclxuICBtZXJpZGllbUhvdXIoaG91ciwgbWVyaWRpZW0pIHtcclxuICAgIGlmIChob3VyID09PSAxMikge1xyXG4gICAgICBob3VyID0gMDtcclxuICAgIH1cclxuICAgIGlmIChtZXJpZGllbSA9PT0gJ+CksOCkvuCkpCcpIHtcclxuICAgICAgcmV0dXJuIGhvdXIgPCA0ID8gaG91ciA6IGhvdXIgKyAxMjtcclxuICAgIH0gZWxzZSBpZiAobWVyaWRpZW0gPT09ICfgpLjgpYHgpKzgpLknKSB7XHJcbiAgICAgIHJldHVybiBob3VyO1xyXG4gICAgfSBlbHNlIGlmIChtZXJpZGllbSA9PT0gJ+CkpuCli+CkquCkueCksCcpIHtcclxuICAgICAgcmV0dXJuIGhvdXIgPj0gMTAgPyBob3VyIDogaG91ciArIDEyO1xyXG4gICAgfSBlbHNlIGlmIChtZXJpZGllbSA9PT0gJ+CktuCkvuCkricpIHtcclxuICAgICAgcmV0dXJuIGhvdXIgKyAxMjtcclxuICAgIH1cclxuICB9LFxyXG4gIG1lcmlkaWVtKGhvdXIsIG1pbnV0ZSwgaXNMb3dlcikge1xyXG4gICAgaWYgKGhvdXIgPCA0KSB7XHJcbiAgICAgIHJldHVybiAn4KSw4KS+4KSkJztcclxuICAgIH0gZWxzZSBpZiAoaG91ciA8IDEwKSB7XHJcbiAgICAgIHJldHVybiAn4KS44KWB4KSs4KS5JztcclxuICAgIH0gZWxzZSBpZiAoaG91ciA8IDE3KSB7XHJcbiAgICAgIHJldHVybiAn4KSm4KWL4KSq4KS54KSwJztcclxuICAgIH0gZWxzZSBpZiAoaG91ciA8IDIwKSB7XHJcbiAgICAgIHJldHVybiAn4KS24KS+4KSuJztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiAn4KSw4KS+4KSkJztcclxuICAgIH1cclxuICB9LFxyXG4gIHdlZWs6IHtcclxuICAgIGRvdzogMCwgLy8gU3VuZGF5IGlzIHRoZSBmaXJzdCBkYXkgb2YgdGhlIHdlZWsuXHJcbiAgICBkb3k6IDYgIC8vIFRoZSB3ZWVrIHRoYXQgY29udGFpbnMgSmFuIDFzdCBpcyB0aGUgZmlyc3Qgd2VlayBvZiB0aGUgeWVhci5cclxuICB9XHJcbn07XHJcbiJdfQ==