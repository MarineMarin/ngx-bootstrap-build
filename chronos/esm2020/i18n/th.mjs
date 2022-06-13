// moment.js locale configuration
// locale : Thai [th]
// author : Watcharapol Sanitwong : https://github.com/tumit
export const thLocale = {
    abbr: 'th',
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
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvY2hyb25vcy9pMThuL3RoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGlDQUFpQztBQUNqQyxxQkFBcUI7QUFDckIsNERBQTREO0FBSTVELE1BQU0sQ0FBQyxNQUFNLFFBQVEsR0FBZTtJQUNsQyxJQUFJLEVBQUUsSUFBSTtJQUNWLE1BQU0sRUFBRSxtR0FBbUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQ3RILFdBQVcsRUFBRSxnRUFBZ0UsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQ3hGLGdCQUFnQixFQUFFLElBQUk7SUFDdEIsUUFBUSxFQUFFLGdEQUFnRCxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7SUFDckUsYUFBYSxFQUFFLHdCQUF3QixDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7SUFDbEQsV0FBVyxFQUFFLHdCQUF3QixDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7SUFDaEQsa0JBQWtCLEVBQUUsSUFBSTtJQUN4QixjQUFjLEVBQUU7UUFDZCxFQUFFLEVBQUUsTUFBTTtRQUNWLEdBQUcsRUFBRSxTQUFTO1FBQ2QsQ0FBQyxFQUFFLFlBQVk7UUFDZixFQUFFLEVBQUUsYUFBYTtRQUNqQixHQUFHLEVBQUUsdUJBQXVCO1FBQzVCLElBQUksRUFBRSxrQ0FBa0M7S0FDekM7SUFDRCxhQUFhLEVBQUUsdUJBQXVCO0lBQ3RDLElBQUksQ0FBQyxLQUFLO1FBQ1IsT0FBTyxLQUFLLEtBQUssWUFBWSxDQUFDO0lBQ2hDLENBQUM7SUFDRCxRQUFRLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPO1FBQzVCLElBQUksSUFBSSxHQUFHLEVBQUUsRUFBRTtZQUNiLE9BQU8sWUFBWSxDQUFDO1NBQ3JCO2FBQU07WUFDTCxPQUFPLFlBQVksQ0FBQztTQUNyQjtJQUNILENBQUM7SUFDRCxRQUFRLEVBQUU7UUFDUixPQUFPLEVBQUUsa0JBQWtCO1FBQzNCLE9BQU8sRUFBRSxvQkFBb0I7UUFDN0IsUUFBUSxFQUFFLG9CQUFvQjtRQUM5QixPQUFPLEVBQUUsdUJBQXVCO1FBQ2hDLFFBQVEsRUFBRSw0QkFBNEI7UUFDdEMsUUFBUSxFQUFFLEdBQUc7S0FDZDtJQUNELFlBQVksRUFBRTtRQUNaLE1BQU0sRUFBRSxRQUFRO1FBQ2hCLElBQUksRUFBRSxXQUFXO1FBQ2pCLENBQUMsRUFBRSxjQUFjO1FBQ2pCLEVBQUUsRUFBRSxXQUFXO1FBQ2YsQ0FBQyxFQUFFLFFBQVE7UUFDWCxFQUFFLEVBQUUsU0FBUztRQUNiLENBQUMsRUFBRSxXQUFXO1FBQ2QsRUFBRSxFQUFFLFlBQVk7UUFDaEIsQ0FBQyxFQUFFLE9BQU87UUFDVixFQUFFLEVBQUUsUUFBUTtRQUNaLENBQUMsRUFBRSxTQUFTO1FBQ1osRUFBRSxFQUFFLFVBQVU7UUFDZCxDQUFDLEVBQUUsTUFBTTtRQUNULEVBQUUsRUFBRSxPQUFPO0tBQ1o7Q0FDRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gbW9tZW50LmpzIGxvY2FsZSBjb25maWd1cmF0aW9uXHJcbi8vIGxvY2FsZSA6IFRoYWkgW3RoXVxyXG4vLyBhdXRob3IgOiBXYXRjaGFyYXBvbCBTYW5pdHdvbmcgOiBodHRwczovL2dpdGh1Yi5jb20vdHVtaXRcclxuXHJcbmltcG9ydCB7IExvY2FsZURhdGEgfSBmcm9tICcuLi9sb2NhbGUvbG9jYWxlLmNsYXNzJztcclxuXHJcbmV4cG9ydCBjb25zdCB0aExvY2FsZTogTG9jYWxlRGF0YSA9IHtcclxuICBhYmJyOiAndGgnLFxyXG4gIG1vbnRoczogJ+C4oeC4geC4o+C4suC4hOC4oV/guIHguLjguKHguKDguLLguJ7guLHguJnguJjguYxf4Lih4Li14LiZ4Liy4LiE4LihX+C5gOC4oeC4qeC4suC4ouC4mV/guJ7guKTguKnguKDguLLguITguKFf4Lih4Li04LiW4Li44LiZ4Liy4Lii4LiZX+C4geC4o+C4geC4juC4suC4hOC4oV/guKrguLTguIfguKvguLLguITguKFf4LiB4Lix4LiZ4Lii4Liy4Lii4LiZX+C4leC4uOC4peC4suC4hOC4oV/guJ7guKTguKjguIjguLTguIHguLLguKLguJlf4LiY4Lix4LiZ4Lin4Liy4LiE4LihJy5zcGxpdCgnXycpLFxyXG4gIG1vbnRoc1Nob3J0OiAn4LihLuC4hC5f4LiBLuC4ni5f4Lih4Li1LuC4hC5f4LmA4LihLuC4oi5f4LieLuC4hC5f4Lih4Li0LuC4oi5f4LiBLuC4hC5f4LiqLuC4hC5f4LiBLuC4oi5f4LiVLuC4hC5f4LieLuC4oi5f4LiYLuC4hC4nLnNwbGl0KCdfJyksXHJcbiAgbW9udGhzUGFyc2VFeGFjdDogdHJ1ZSxcclxuICB3ZWVrZGF5czogJ+C4reC4suC4l+C4tOC4leC4ouC5jF/guIjguLHguJnguJfguKPguYxf4Lit4Lix4LiH4LiE4Liy4LijX+C4nuC4uOC4mF/guJ7guKTguKvguLHguKrguJrguJTguLVf4Lio4Li44LiB4Lij4LmMX+C5gOC4quC4suC4o+C5jCcuc3BsaXQoJ18nKSxcclxuICB3ZWVrZGF5c1Nob3J0OiAn4Lit4LiyLl/guIguX+C4rS5f4LieLl/guJ7guKQuX+C4qC5f4LiqLicuc3BsaXQoJ18nKSwgLy8geWVzLCB0aHJlZSBjaGFyYWN0ZXJzIGRpZmZlcmVuY2VcclxuICB3ZWVrZGF5c01pbjogJ+C4reC4si5f4LiILl/guK0uX+C4ni5f4Lie4LikLl/guKguX+C4qi4nLnNwbGl0KCdfJyksXHJcbiAgd2Vla2RheXNQYXJzZUV4YWN0OiB0cnVlLFxyXG4gIGxvbmdEYXRlRm9ybWF0OiB7XHJcbiAgICBMVDogJ0g6bW0nLFxyXG4gICAgTFRTOiAnSDptbTpzcycsXHJcbiAgICBMOiAnREQvTU0vWVlZWScsXHJcbiAgICBMTDogJ0QgTU1NTSBZWVlZJyxcclxuICAgIExMTDogJ0QgTU1NTSBZWVlZIOC5gOC4p+C4peC4siBIOm1tJyxcclxuICAgIExMTEw6ICfguKfguLHguJlkZGRk4LiX4Li14LmIIEQgTU1NTSBZWVlZIOC5gOC4p+C4peC4siBIOm1tJ1xyXG4gIH0sXHJcbiAgbWVyaWRpZW1QYXJzZTogL+C4geC5iOC4reC4meC5gOC4l+C4teC5iOC4ouC4h3zguKvguKXguLHguIfguYDguJfguLXguYjguKLguIcvLFxyXG4gIGlzUE0oaW5wdXQpIHtcclxuICAgIHJldHVybiBpbnB1dCA9PT0gJ+C4q+C4peC4seC4h+C5gOC4l+C4teC5iOC4ouC4hyc7XHJcbiAgfSxcclxuICBtZXJpZGllbShob3VyLCBtaW51dGUsIGlzTG93ZXIpIHtcclxuICAgIGlmIChob3VyIDwgMTIpIHtcclxuICAgICAgcmV0dXJuICfguIHguYjguK3guJnguYDguJfguLXguYjguKLguIcnO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuICfguKvguKXguLHguIfguYDguJfguLXguYjguKLguIcnO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgY2FsZW5kYXI6IHtcclxuICAgIHNhbWVEYXk6ICdb4Lin4Lix4LiZ4LiZ4Li14LmJIOC5gOC4p+C4peC4sl0gTFQnLFxyXG4gICAgbmV4dERheTogJ1vguJ7guKPguLjguYjguIfguJnguLXguYkg4LmA4Lin4Lil4LiyXSBMVCcsXHJcbiAgICBuZXh0V2VlazogJ2RkZGRb4Lir4LiZ4LmJ4LiyIOC5gOC4p+C4peC4sl0gTFQnLFxyXG4gICAgbGFzdERheTogJ1vguYDguKHguLfguYjguK3guKfguLLguJnguJnguLXguYkg4LmA4Lin4Lil4LiyXSBMVCcsXHJcbiAgICBsYXN0V2VlazogJ1vguKfguLHguJldZGRkZFvguJfguLXguYjguYHguKXguYnguKcg4LmA4Lin4Lil4LiyXSBMVCcsXHJcbiAgICBzYW1lRWxzZTogJ0wnXHJcbiAgfSxcclxuICByZWxhdGl2ZVRpbWU6IHtcclxuICAgIGZ1dHVyZTogJ+C4reC4teC4gSAlcycsXHJcbiAgICBwYXN0OiAnJXPguJfguLXguYjguYHguKXguYnguKcnLFxyXG4gICAgczogJ+C5hOC4oeC5iOC4geC4teC5iOC4p+C4tOC4meC4suC4l+C4tScsXHJcbiAgICBzczogJyVkIOC4p+C4tOC4meC4suC4l+C4tScsXHJcbiAgICBtOiAnMSDguJnguLLguJfguLUnLFxyXG4gICAgbW06ICclZCDguJnguLLguJfguLUnLFxyXG4gICAgaDogJzEg4LiK4Lix4LmI4Lin4LmC4Lih4LiHJyxcclxuICAgIGhoOiAnJWQg4LiK4Lix4LmI4Lin4LmC4Lih4LiHJyxcclxuICAgIGQ6ICcxIOC4p+C4seC4mScsXHJcbiAgICBkZDogJyVkIOC4p+C4seC4mScsXHJcbiAgICBNOiAnMSDguYDguJTguLfguK3guJknLFxyXG4gICAgTU06ICclZCDguYDguJTguLfguK3guJknLFxyXG4gICAgeTogJzEg4Lib4Li1JyxcclxuICAgIHl5OiAnJWQg4Lib4Li1J1xyXG4gIH1cclxufTtcclxuIl19