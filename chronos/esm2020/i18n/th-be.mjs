// moment.js locale configuration
// locale : Thai-Buddhist Era [th-be]
// author : Watcharapol Sanitwong : https://github.com/tumit
export const thBeLocale = {
    abbr: 'th-be',
    months: 'มกราคม_กุมภาพันธ์_มีนาคม_เมษายน_พฤษภาคม_มิถุนายน_กรกฎาคม_สิงหาคม_กันยายน_ตุลาคม_พฤศจิกายน_ธันวาคม'.split('_'),
    monthsShort: 'ม.ค._ก.พ._มี.ค._เม.ย._พ.ค._มิ.ย._ก.ค._ส.ค._ก.ย._ต.ค._พ.ย._ธ.ค.'.split('_'),
    monthsParseExact: true,
    weekdays: 'อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัสบดี_ศุกร์_เสาร์'.split('_'),
    weekdaysShort: 'อา._จ._อ._พ._พฤ._ศ._ส.'.split('_'),
    weekdaysMin: 'อา._จ._อ._พ._พฤ._ศ._ส.'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
        LT: 'H:mm',
        LTS: 'H:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY เวลา H:mm',
        LLLL: 'วันddddที่ D MMMM YYYY เวลา H:mm'
    },
    meridiemParse: /ก่อนเที่ยง|หลังเที่ยง/,
    isPM(input) {
        return input === 'หลังเที่ยง';
    },
    meridiem(hour, minute, isLower) {
        if (hour < 12) {
            return 'ก่อนเที่ยง';
        }
        else {
            return 'หลังเที่ยง';
        }
    },
    calendar: {
        sameDay: '[วันนี้ เวลา] LT',
        nextDay: '[พรุ่งนี้ เวลา] LT',
        nextWeek: 'dddd[หน้า เวลา] LT',
        lastDay: '[เมื่อวานนี้ เวลา] LT',
        lastWeek: '[วัน]dddd[ที่แล้ว เวลา] LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: 'อีก %s',
        past: '%sที่แล้ว',
        s: 'ไม่กี่วินาที',
        ss: '%d วินาที',
        m: '1 นาที',
        mm: '%d นาที',
        h: '1 ชั่วโมง',
        hh: '%d ชั่วโมง',
        d: '1 วัน',
        dd: '%d วัน',
        M: '1 เดือน',
        MM: '%d เดือน',
        y: '1 ปี',
        yy: '%d ปี'
    },
    preparse(str, format) {
        const _format = thBeLocale.longDateFormat[format]
            ? thBeLocale.longDateFormat[format]
            : format;
        // endsWith('YYYY')
        if (_format.indexOf('YYYY', _format.length - 'YYYY'.length) !== -1) {
            const ddMM = str.substr(0, str.length - 4);
            const yyyy = parseInt(str.substr(str.length - 4), 10) - 543;
            return ddMM + yyyy;
        }
        return str;
    },
    getFullYear(date, isUTC = false) {
        return 543 + (isUTC ? date.getUTCFullYear() : date.getFullYear());
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGgtYmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvY2hyb25vcy9pMThuL3RoLWJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGlDQUFpQztBQUNqQyxxQ0FBcUM7QUFDckMsNERBQTREO0FBSTVELE1BQU0sQ0FBQyxNQUFNLFVBQVUsR0FBZTtJQUNwQyxJQUFJLEVBQUUsT0FBTztJQUNiLE1BQU0sRUFBRSxtR0FBbUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQ3RILFdBQVcsRUFBRSxnRUFBZ0UsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQ3hGLGdCQUFnQixFQUFFLElBQUk7SUFDdEIsUUFBUSxFQUFFLGdEQUFnRCxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7SUFDckUsYUFBYSxFQUFFLHdCQUF3QixDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7SUFDbEQsV0FBVyxFQUFFLHdCQUF3QixDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7SUFDaEQsa0JBQWtCLEVBQUUsSUFBSTtJQUN4QixjQUFjLEVBQUU7UUFDZCxFQUFFLEVBQUUsTUFBTTtRQUNWLEdBQUcsRUFBRSxTQUFTO1FBQ2QsQ0FBQyxFQUFFLFlBQVk7UUFDZixFQUFFLEVBQUUsYUFBYTtRQUNqQixHQUFHLEVBQUUsdUJBQXVCO1FBQzVCLElBQUksRUFBRSxrQ0FBa0M7S0FDekM7SUFDRCxhQUFhLEVBQUUsdUJBQXVCO0lBQ3RDLElBQUksQ0FBQyxLQUFLO1FBQ1IsT0FBTyxLQUFLLEtBQUssWUFBWSxDQUFDO0lBQ2hDLENBQUM7SUFDRCxRQUFRLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPO1FBQzVCLElBQUksSUFBSSxHQUFHLEVBQUUsRUFBRTtZQUNiLE9BQU8sWUFBWSxDQUFDO1NBQ3JCO2FBQU07WUFDTCxPQUFPLFlBQVksQ0FBQztTQUNyQjtJQUNILENBQUM7SUFDRCxRQUFRLEVBQUU7UUFDUixPQUFPLEVBQUUsa0JBQWtCO1FBQzNCLE9BQU8sRUFBRSxvQkFBb0I7UUFDN0IsUUFBUSxFQUFFLG9CQUFvQjtRQUM5QixPQUFPLEVBQUUsdUJBQXVCO1FBQ2hDLFFBQVEsRUFBRSw0QkFBNEI7UUFDdEMsUUFBUSxFQUFFLEdBQUc7S0FDZDtJQUNELFlBQVksRUFBRTtRQUNaLE1BQU0sRUFBRSxRQUFRO1FBQ2hCLElBQUksRUFBRSxXQUFXO1FBQ2pCLENBQUMsRUFBRSxjQUFjO1FBQ2pCLEVBQUUsRUFBRSxXQUFXO1FBQ2YsQ0FBQyxFQUFFLFFBQVE7UUFDWCxFQUFFLEVBQUUsU0FBUztRQUNiLENBQUMsRUFBRSxXQUFXO1FBQ2QsRUFBRSxFQUFFLFlBQVk7UUFDaEIsQ0FBQyxFQUFFLE9BQU87UUFDVixFQUFFLEVBQUUsUUFBUTtRQUNaLENBQUMsRUFBRSxTQUFTO1FBQ1osRUFBRSxFQUFFLFVBQVU7UUFDZCxDQUFDLEVBQUUsTUFBTTtRQUNULEVBQUUsRUFBRSxPQUFPO0tBQ1o7SUFFRCxRQUFRLENBQUMsR0FBVyxFQUFFLE1BQWU7UUFFbkMsTUFBTSxPQUFPLEdBQUcsVUFBVSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUM7WUFDL0MsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDO1lBQ25DLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFFWCxtQkFBbUI7UUFDbkIsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRztZQUNuRSxNQUFNLElBQUksR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzNDLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQzVELE9BQU8sSUFBSSxHQUFHLElBQUksQ0FBQztTQUNwQjtRQUVELE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUVELFdBQVcsQ0FBQyxJQUFVLEVBQUUsS0FBSyxHQUFHLEtBQUs7UUFDbkMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7SUFDcEUsQ0FBQztDQUNGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBtb21lbnQuanMgbG9jYWxlIGNvbmZpZ3VyYXRpb25cclxuLy8gbG9jYWxlIDogVGhhaS1CdWRkaGlzdCBFcmEgW3RoLWJlXVxyXG4vLyBhdXRob3IgOiBXYXRjaGFyYXBvbCBTYW5pdHdvbmcgOiBodHRwczovL2dpdGh1Yi5jb20vdHVtaXRcclxuXHJcbmltcG9ydCB7IExvY2FsZURhdGEgfSBmcm9tICcuLi9sb2NhbGUvbG9jYWxlLmNsYXNzJztcclxuXHJcbmV4cG9ydCBjb25zdCB0aEJlTG9jYWxlOiBMb2NhbGVEYXRhID0ge1xyXG4gIGFiYnI6ICd0aC1iZScsXHJcbiAgbW9udGhzOiAn4Lih4LiB4Lij4Liy4LiE4LihX+C4geC4uOC4oeC4oOC4suC4nuC4seC4meC4mOC5jF/guKHguLXguJnguLLguITguKFf4LmA4Lih4Lip4Liy4Lii4LiZX+C4nuC4pOC4qeC4oOC4suC4hOC4oV/guKHguLTguJbguLjguJnguLLguKLguJlf4LiB4Lij4LiB4LiO4Liy4LiE4LihX+C4quC4tOC4h+C4q+C4suC4hOC4oV/guIHguLHguJnguKLguLLguKLguJlf4LiV4Li44Lil4Liy4LiE4LihX+C4nuC4pOC4qOC4iOC4tOC4geC4suC4ouC4mV/guJjguLHguJnguKfguLLguITguKEnLnNwbGl0KCdfJyksXHJcbiAgbW9udGhzU2hvcnQ6ICfguKEu4LiELl/guIEu4LieLl/guKHguLUu4LiELl/guYDguKEu4LiiLl/guJ4u4LiELl/guKHguLQu4LiiLl/guIEu4LiELl/guKou4LiELl/guIEu4LiiLl/guJUu4LiELl/guJ4u4LiiLl/guJgu4LiELicuc3BsaXQoJ18nKSxcclxuICBtb250aHNQYXJzZUV4YWN0OiB0cnVlLFxyXG4gIHdlZWtkYXlzOiAn4Lit4Liy4LiX4Li04LiV4Lii4LmMX+C4iOC4seC4meC4l+C4o+C5jF/guK3guLHguIfguITguLLguKNf4Lie4Li44LiYX+C4nuC4pOC4q+C4seC4quC4muC4lOC4tV/guKjguLjguIHguKPguYxf4LmA4Liq4Liy4Lij4LmMJy5zcGxpdCgnXycpLFxyXG4gIHdlZWtkYXlzU2hvcnQ6ICfguK3guLIuX+C4iC5f4LitLl/guJ4uX+C4nuC4pC5f4LioLl/guKouJy5zcGxpdCgnXycpLFxyXG4gIHdlZWtkYXlzTWluOiAn4Lit4LiyLl/guIguX+C4rS5f4LieLl/guJ7guKQuX+C4qC5f4LiqLicuc3BsaXQoJ18nKSxcclxuICB3ZWVrZGF5c1BhcnNlRXhhY3Q6IHRydWUsXHJcbiAgbG9uZ0RhdGVGb3JtYXQ6IHtcclxuICAgIExUOiAnSDptbScsXHJcbiAgICBMVFM6ICdIOm1tOnNzJyxcclxuICAgIEw6ICdERC9NTS9ZWVlZJyxcclxuICAgIExMOiAnRCBNTU1NIFlZWVknLFxyXG4gICAgTExMOiAnRCBNTU1NIFlZWVkg4LmA4Lin4Lil4LiyIEg6bW0nLFxyXG4gICAgTExMTDogJ+C4p+C4seC4mWRkZGTguJfguLXguYggRCBNTU1NIFlZWVkg4LmA4Lin4Lil4LiyIEg6bW0nXHJcbiAgfSxcclxuICBtZXJpZGllbVBhcnNlOiAv4LiB4LmI4Lit4LiZ4LmA4LiX4Li14LmI4Lii4LiHfOC4q+C4peC4seC4h+C5gOC4l+C4teC5iOC4ouC4hy8sXHJcbiAgaXNQTShpbnB1dCkge1xyXG4gICAgcmV0dXJuIGlucHV0ID09PSAn4Lir4Lil4Lix4LiH4LmA4LiX4Li14LmI4Lii4LiHJztcclxuICB9LFxyXG4gIG1lcmlkaWVtKGhvdXIsIG1pbnV0ZSwgaXNMb3dlcikge1xyXG4gICAgaWYgKGhvdXIgPCAxMikge1xyXG4gICAgICByZXR1cm4gJ+C4geC5iOC4reC4meC5gOC4l+C4teC5iOC4ouC4hyc7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gJ+C4q+C4peC4seC4h+C5gOC4l+C4teC5iOC4ouC4hyc7XHJcbiAgICB9XHJcbiAgfSxcclxuICBjYWxlbmRhcjoge1xyXG4gICAgc2FtZURheTogJ1vguKfguLHguJnguJnguLXguYkg4LmA4Lin4Lil4LiyXSBMVCcsXHJcbiAgICBuZXh0RGF5OiAnW+C4nuC4o+C4uOC5iOC4h+C4meC4teC5iSDguYDguKfguKXguLJdIExUJyxcclxuICAgIG5leHRXZWVrOiAnZGRkZFvguKvguJnguYnguLIg4LmA4Lin4Lil4LiyXSBMVCcsXHJcbiAgICBsYXN0RGF5OiAnW+C5gOC4oeC4t+C5iOC4reC4p+C4suC4meC4meC4teC5iSDguYDguKfguKXguLJdIExUJyxcclxuICAgIGxhc3RXZWVrOiAnW+C4p+C4seC4mV1kZGRkW+C4l+C4teC5iOC5geC4peC5ieC4pyDguYDguKfguKXguLJdIExUJyxcclxuICAgIHNhbWVFbHNlOiAnTCdcclxuICB9LFxyXG4gIHJlbGF0aXZlVGltZToge1xyXG4gICAgZnV0dXJlOiAn4Lit4Li14LiBICVzJyxcclxuICAgIHBhc3Q6ICclc+C4l+C4teC5iOC5geC4peC5ieC4pycsXHJcbiAgICBzOiAn4LmE4Lih4LmI4LiB4Li14LmI4Lin4Li04LiZ4Liy4LiX4Li1JyxcclxuICAgIHNzOiAnJWQg4Lin4Li04LiZ4Liy4LiX4Li1JyxcclxuICAgIG06ICcxIOC4meC4suC4l+C4tScsXHJcbiAgICBtbTogJyVkIOC4meC4suC4l+C4tScsXHJcbiAgICBoOiAnMSDguIrguLHguYjguKfguYLguKHguIcnLFxyXG4gICAgaGg6ICclZCDguIrguLHguYjguKfguYLguKHguIcnLFxyXG4gICAgZDogJzEg4Lin4Lix4LiZJyxcclxuICAgIGRkOiAnJWQg4Lin4Lix4LiZJyxcclxuICAgIE06ICcxIOC5gOC4lOC4t+C4reC4mScsXHJcbiAgICBNTTogJyVkIOC5gOC4lOC4t+C4reC4mScsXHJcbiAgICB5OiAnMSDguJvguLUnLFxyXG4gICAgeXk6ICclZCDguJvguLUnXHJcbiAgfSxcclxuXHJcbiAgcHJlcGFyc2Uoc3RyOiBzdHJpbmcsIGZvcm1hdD86IHN0cmluZyk6IHN0cmluZyB7XHJcblxyXG4gICAgY29uc3QgX2Zvcm1hdCA9IHRoQmVMb2NhbGUubG9uZ0RhdGVGb3JtYXRbZm9ybWF0XVxyXG4gICAgICA/IHRoQmVMb2NhbGUubG9uZ0RhdGVGb3JtYXRbZm9ybWF0XVxyXG4gICAgICA6IGZvcm1hdDtcclxuXHJcbiAgICAvLyBlbmRzV2l0aCgnWVlZWScpXHJcbiAgICBpZiAoX2Zvcm1hdC5pbmRleE9mKCdZWVlZJywgX2Zvcm1hdC5sZW5ndGggLSAnWVlZWScubGVuZ3RoKSAhPT0gLTEgKSB7XHJcbiAgICAgIGNvbnN0IGRkTU0gPSBzdHIuc3Vic3RyKDAsIHN0ci5sZW5ndGggLSA0KTtcclxuICAgICAgY29uc3QgeXl5eSA9IHBhcnNlSW50KHN0ci5zdWJzdHIoc3RyLmxlbmd0aCAtIDQpLCAxMCkgLSA1NDM7XHJcbiAgICAgIHJldHVybiBkZE1NICsgeXl5eTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gc3RyO1xyXG4gIH0sXHJcblxyXG4gIGdldEZ1bGxZZWFyKGRhdGU6IERhdGUsIGlzVVRDID0gZmFsc2UpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIDU0MyArIChpc1VUQyA/IGRhdGUuZ2V0VVRDRnVsbFllYXIoKSA6IGRhdGUuZ2V0RnVsbFllYXIoKSk7XHJcbiAgfVxyXG59O1xyXG4iXX0=