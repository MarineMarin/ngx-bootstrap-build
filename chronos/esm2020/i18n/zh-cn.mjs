//! moment.js locale configuration
//! locale : Chinese (China) [zh-cn]
//! author : suupic : https://github.com/suupic
//! author : Zeno Zeng : https://github.com/zenozeng
export const zhCnLocale = {
    abbr: 'zh-cn',
    months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
    monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
    weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
    weekdaysShort: '周日_周一_周二_周三_周四_周五_周六'.split('_'),
    weekdaysMin: '日_一_二_三_四_五_六'.split('_'),
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'YYYY/MM/DD',
        LL: 'YYYY年M月D日',
        LLL: 'YYYY年M月D日Ah点mm分',
        LLLL: 'YYYY年M月D日ddddAh点mm分',
        l: 'YYYY/M/D',
        ll: 'YYYY年M月D日',
        lll: 'YYYY年M月D日 HH:mm',
        llll: 'YYYY年M月D日dddd HH:mm'
    },
    meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
    meridiemHour(hour, meridiem) {
        if (hour === 12) {
            hour = 0;
        }
        if (meridiem === '凌晨' || meridiem === '早上' ||
            meridiem === '上午') {
            return hour;
        }
        else if (meridiem === '下午' || meridiem === '晚上') {
            return hour + 12;
        }
        else {
            // '中午'
            return hour >= 11 ? hour : hour + 12;
        }
    },
    meridiem(hour, minute, isLower) {
        let hm = hour * 100 + minute;
        if (hm < 600) {
            return '凌晨';
        }
        else if (hm < 900) {
            return '早上';
        }
        else if (hm < 1130) {
            return '上午';
        }
        else if (hm < 1230) {
            return '中午';
        }
        else if (hm < 1800) {
            return '下午';
        }
        else {
            return '晚上';
        }
    },
    calendar: {
        sameDay: '[今天]LT',
        nextDay: '[明天]LT',
        nextWeek: '[下]ddddLT',
        lastDay: '[昨天]LT',
        lastWeek: '[上]ddddLT',
        sameElse: 'L'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(日|月|周)/,
    ordinal(_num, period) {
        const num = Number(_num);
        switch (period) {
            case 'd':
            case 'D':
            case 'DDD':
                return num + '日';
            case 'M':
                return num + '月';
            case 'w':
            case 'W':
                return num + '周';
            default:
                return num.toString();
        }
    },
    relativeTime: {
        future: '%s内',
        past: '%s前',
        s: '几秒',
        ss: '%d 秒',
        m: '1 分钟',
        mm: '%d 分钟',
        h: '1 小时',
        hh: '%d 小时',
        d: '1 天',
        dd: '%d 天',
        M: '1 个月',
        MM: '%d 个月',
        y: '1 年',
        yy: '%d 年'
    },
    week: {
        // GB/T 7408-1994《数据元和交换格式·信息交换·日期和时间表示法》与ISO 8601:1988等效
        dow: 1,
        doy: 4 // The week that contains Jan 4th is the first week of the year.
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiemgtY24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvY2hyb25vcy9pMThuL3poLWNuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLGtDQUFrQztBQUNsQyxvQ0FBb0M7QUFDcEMsK0NBQStDO0FBQy9DLG9EQUFvRDtBQUVwRCxNQUFNLENBQUMsTUFBTSxVQUFVLEdBQWU7SUFDcEMsSUFBSSxFQUFFLE9BQU87SUFDYixNQUFNLEVBQUUsdUNBQXVDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztJQUMxRCxXQUFXLEVBQUUsd0NBQXdDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztJQUNoRSxRQUFRLEVBQUUsNkJBQTZCLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztJQUNsRCxhQUFhLEVBQUUsc0JBQXNCLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztJQUNoRCxXQUFXLEVBQUUsZUFBZSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7SUFDdkMsY0FBYyxFQUFFO1FBQ2QsRUFBRSxFQUFFLE9BQU87UUFDWCxHQUFHLEVBQUUsVUFBVTtRQUNmLENBQUMsRUFBRSxZQUFZO1FBQ2YsRUFBRSxFQUFFLFdBQVc7UUFDZixHQUFHLEVBQUUsaUJBQWlCO1FBQ3RCLElBQUksRUFBRSxxQkFBcUI7UUFDM0IsQ0FBQyxFQUFFLFVBQVU7UUFDYixFQUFFLEVBQUUsV0FBVztRQUNmLEdBQUcsRUFBRSxpQkFBaUI7UUFDdEIsSUFBSSxFQUFFLHFCQUFxQjtLQUM1QjtJQUNELGFBQWEsRUFBRSxtQkFBbUI7SUFDbEMsWUFBWSxDQUFDLElBQUksRUFBRSxRQUFRO1FBQ3pCLElBQUksSUFBSSxLQUFLLEVBQUUsRUFBRTtZQUNmLElBQUksR0FBRyxDQUFDLENBQUM7U0FDVjtRQUNELElBQUksUUFBUSxLQUFLLElBQUksSUFBSSxRQUFRLEtBQUssSUFBSTtZQUN4QyxRQUFRLEtBQUssSUFBSSxFQUFFO1lBQ25CLE9BQU8sSUFBSSxDQUFDO1NBQ2I7YUFBTSxJQUFJLFFBQVEsS0FBSyxJQUFJLElBQUksUUFBUSxLQUFLLElBQUksRUFBRTtZQUNqRCxPQUFPLElBQUksR0FBRyxFQUFFLENBQUM7U0FDbEI7YUFBTTtZQUNMLE9BQU87WUFDUCxPQUFPLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztTQUN0QztJQUNILENBQUM7SUFDRCxRQUFRLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPO1FBQzVCLElBQUksRUFBRSxHQUFHLElBQUksR0FBRyxHQUFHLEdBQUcsTUFBTSxDQUFDO1FBQzdCLElBQUksRUFBRSxHQUFHLEdBQUcsRUFBRTtZQUNaLE9BQU8sSUFBSSxDQUFDO1NBQ2I7YUFBTSxJQUFJLEVBQUUsR0FBRyxHQUFHLEVBQUU7WUFDbkIsT0FBTyxJQUFJLENBQUM7U0FDYjthQUFNLElBQUksRUFBRSxHQUFHLElBQUksRUFBRTtZQUNwQixPQUFPLElBQUksQ0FBQztTQUNiO2FBQU0sSUFBSSxFQUFFLEdBQUcsSUFBSSxFQUFFO1lBQ3BCLE9BQU8sSUFBSSxDQUFDO1NBQ2I7YUFBTSxJQUFJLEVBQUUsR0FBRyxJQUFJLEVBQUU7WUFDcEIsT0FBTyxJQUFJLENBQUM7U0FDYjthQUFNO1lBQ0wsT0FBTyxJQUFJLENBQUM7U0FDYjtJQUNILENBQUM7SUFDRCxRQUFRLEVBQUU7UUFDUixPQUFPLEVBQUUsUUFBUTtRQUNqQixPQUFPLEVBQUUsUUFBUTtRQUNqQixRQUFRLEVBQUUsV0FBVztRQUNyQixPQUFPLEVBQUUsUUFBUTtRQUNqQixRQUFRLEVBQUUsV0FBVztRQUNyQixRQUFRLEVBQUUsR0FBRztLQUNkO0lBQ0Qsc0JBQXNCLEVBQUUsZ0JBQWdCO0lBQ3hDLE9BQU8sQ0FBQyxJQUFZLEVBQUUsTUFBTTtRQUMxQixNQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekIsUUFBUSxNQUFNLEVBQUU7WUFDZCxLQUFLLEdBQUcsQ0FBQztZQUNULEtBQUssR0FBRyxDQUFDO1lBQ1QsS0FBSyxLQUFLO2dCQUNSLE9BQU8sR0FBRyxHQUFHLEdBQUcsQ0FBQztZQUNuQixLQUFLLEdBQUc7Z0JBQ04sT0FBTyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQ25CLEtBQUssR0FBRyxDQUFDO1lBQ1QsS0FBSyxHQUFHO2dCQUNOLE9BQU8sR0FBRyxHQUFHLEdBQUcsQ0FBQztZQUNuQjtnQkFDRSxPQUFPLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUN6QjtJQUNILENBQUM7SUFDRCxZQUFZLEVBQUU7UUFDWixNQUFNLEVBQUUsS0FBSztRQUNiLElBQUksRUFBRSxLQUFLO1FBQ1gsQ0FBQyxFQUFFLElBQUk7UUFDUCxFQUFFLEVBQUUsTUFBTTtRQUNWLENBQUMsRUFBRSxNQUFNO1FBQ1QsRUFBRSxFQUFFLE9BQU87UUFDWCxDQUFDLEVBQUUsTUFBTTtRQUNULEVBQUUsRUFBRSxPQUFPO1FBQ1gsQ0FBQyxFQUFFLEtBQUs7UUFDUixFQUFFLEVBQUUsTUFBTTtRQUNWLENBQUMsRUFBRSxNQUFNO1FBQ1QsRUFBRSxFQUFFLE9BQU87UUFDWCxDQUFDLEVBQUUsS0FBSztRQUNSLEVBQUUsRUFBRSxNQUFNO0tBQ1g7SUFDRCxJQUFJLEVBQUU7UUFDSix5REFBeUQ7UUFDekQsR0FBRyxFQUFFLENBQUM7UUFDTixHQUFHLEVBQUUsQ0FBQyxDQUFFLGdFQUFnRTtLQUN6RTtDQUNGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2NhbGVEYXRhIH0gZnJvbSAnLi4vbG9jYWxlL2xvY2FsZS5jbGFzcyc7XHJcblxyXG4vLyEgbW9tZW50LmpzIGxvY2FsZSBjb25maWd1cmF0aW9uXHJcbi8vISBsb2NhbGUgOiBDaGluZXNlIChDaGluYSkgW3poLWNuXVxyXG4vLyEgYXV0aG9yIDogc3V1cGljIDogaHR0cHM6Ly9naXRodWIuY29tL3N1dXBpY1xyXG4vLyEgYXV0aG9yIDogWmVubyBaZW5nIDogaHR0cHM6Ly9naXRodWIuY29tL3plbm96ZW5nXHJcblxyXG5leHBvcnQgY29uc3QgemhDbkxvY2FsZTogTG9jYWxlRGF0YSA9IHtcclxuICBhYmJyOiAnemgtY24nLFxyXG4gIG1vbnRoczogJ+S4gOaciF/kuozmnIhf5LiJ5pyIX+Wbm+aciF/kupTmnIhf5YWt5pyIX+S4g+aciF/lhavmnIhf5Lmd5pyIX+WNgeaciF/ljYHkuIDmnIhf5Y2B5LqM5pyIJy5zcGxpdCgnXycpLFxyXG4gIG1vbnRoc1Nob3J0OiAnMeaciF8y5pyIXzPmnIhfNOaciF815pyIXzbmnIhfN+aciF845pyIXznmnIhfMTDmnIhfMTHmnIhfMTLmnIgnLnNwbGl0KCdfJyksXHJcbiAgd2Vla2RheXM6ICfmmJ/mnJ/ml6Vf5pif5pyf5LiAX+aYn+acn+S6jF/mmJ/mnJ/kuIlf5pif5pyf5ZubX+aYn+acn+S6lF/mmJ/mnJ/lha0nLnNwbGl0KCdfJyksXHJcbiAgd2Vla2RheXNTaG9ydDogJ+WRqOaXpV/lkajkuIBf5ZGo5LqMX+WRqOS4iV/lkajlm5tf5ZGo5LqUX+WRqOWFrScuc3BsaXQoJ18nKSxcclxuICB3ZWVrZGF5c01pbjogJ+aXpV/kuIBf5LqMX+S4iV/lm5tf5LqUX+WFrScuc3BsaXQoJ18nKSxcclxuICBsb25nRGF0ZUZvcm1hdDoge1xyXG4gICAgTFQ6ICdISDptbScsXHJcbiAgICBMVFM6ICdISDptbTpzcycsXHJcbiAgICBMOiAnWVlZWS9NTS9ERCcsXHJcbiAgICBMTDogJ1lZWVnlubRN5pyIROaXpScsXHJcbiAgICBMTEw6ICdZWVlZ5bm0TeaciETml6VBaOeCuW1t5YiGJyxcclxuICAgIExMTEw6ICdZWVlZ5bm0TeaciETml6VkZGRkQWjngrltbeWIhicsXHJcbiAgICBsOiAnWVlZWS9NL0QnLFxyXG4gICAgbGw6ICdZWVlZ5bm0TeaciETml6UnLFxyXG4gICAgbGxsOiAnWVlZWeW5tE3mnIhE5pelIEhIOm1tJyxcclxuICAgIGxsbGw6ICdZWVlZ5bm0TeaciETml6VkZGRkIEhIOm1tJ1xyXG4gIH0sXHJcbiAgbWVyaWRpZW1QYXJzZTogL+WHjOaZqHzml6nkuIp85LiK5Y2IfOS4reWNiHzkuIvljYh85pma5LiKLyxcclxuICBtZXJpZGllbUhvdXIoaG91ciwgbWVyaWRpZW0pIHtcclxuICAgIGlmIChob3VyID09PSAxMikge1xyXG4gICAgICBob3VyID0gMDtcclxuICAgIH1cclxuICAgIGlmIChtZXJpZGllbSA9PT0gJ+WHjOaZqCcgfHwgbWVyaWRpZW0gPT09ICfml6nkuIonIHx8XHJcbiAgICAgIG1lcmlkaWVtID09PSAn5LiK5Y2IJykge1xyXG4gICAgICByZXR1cm4gaG91cjtcclxuICAgIH0gZWxzZSBpZiAobWVyaWRpZW0gPT09ICfkuIvljYgnIHx8IG1lcmlkaWVtID09PSAn5pma5LiKJykge1xyXG4gICAgICByZXR1cm4gaG91ciArIDEyO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gJ+S4reWNiCdcclxuICAgICAgcmV0dXJuIGhvdXIgPj0gMTEgPyBob3VyIDogaG91ciArIDEyO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgbWVyaWRpZW0oaG91ciwgbWludXRlLCBpc0xvd2VyKSB7XHJcbiAgICBsZXQgaG0gPSBob3VyICogMTAwICsgbWludXRlO1xyXG4gICAgaWYgKGhtIDwgNjAwKSB7XHJcbiAgICAgIHJldHVybiAn5YeM5pmoJztcclxuICAgIH0gZWxzZSBpZiAoaG0gPCA5MDApIHtcclxuICAgICAgcmV0dXJuICfml6nkuIonO1xyXG4gICAgfSBlbHNlIGlmIChobSA8IDExMzApIHtcclxuICAgICAgcmV0dXJuICfkuIrljYgnO1xyXG4gICAgfSBlbHNlIGlmIChobSA8IDEyMzApIHtcclxuICAgICAgcmV0dXJuICfkuK3ljYgnO1xyXG4gICAgfSBlbHNlIGlmIChobSA8IDE4MDApIHtcclxuICAgICAgcmV0dXJuICfkuIvljYgnO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuICfmmZrkuIonO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgY2FsZW5kYXI6IHtcclxuICAgIHNhbWVEYXk6ICdb5LuK5aSpXUxUJyxcclxuICAgIG5leHREYXk6ICdb5piO5aSpXUxUJyxcclxuICAgIG5leHRXZWVrOiAnW+S4i11kZGRkTFQnLFxyXG4gICAgbGFzdERheTogJ1vmmKjlpKldTFQnLFxyXG4gICAgbGFzdFdlZWs6ICdb5LiKXWRkZGRMVCcsXHJcbiAgICBzYW1lRWxzZTogJ0wnXHJcbiAgfSxcclxuICBkYXlPZk1vbnRoT3JkaW5hbFBhcnNlOiAvXFxkezEsMn0o5pelfOaciHzlkagpLyxcclxuICBvcmRpbmFsKF9udW06IG51bWJlciwgcGVyaW9kKSB7XHJcbiAgICBjb25zdCBudW0gPSBOdW1iZXIoX251bSk7XHJcbiAgICBzd2l0Y2ggKHBlcmlvZCkge1xyXG4gICAgICBjYXNlICdkJzpcclxuICAgICAgY2FzZSAnRCc6XHJcbiAgICAgIGNhc2UgJ0RERCc6XHJcbiAgICAgICAgcmV0dXJuIG51bSArICfml6UnO1xyXG4gICAgICBjYXNlICdNJzpcclxuICAgICAgICByZXR1cm4gbnVtICsgJ+aciCc7XHJcbiAgICAgIGNhc2UgJ3cnOlxyXG4gICAgICBjYXNlICdXJzpcclxuICAgICAgICByZXR1cm4gbnVtICsgJ+WRqCc7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgcmV0dXJuIG51bS50b1N0cmluZygpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgcmVsYXRpdmVUaW1lOiB7XHJcbiAgICBmdXR1cmU6ICclc+WGhScsXHJcbiAgICBwYXN0OiAnJXPliY0nLFxyXG4gICAgczogJ+WHoOenkicsXHJcbiAgICBzczogJyVkIOenkicsXHJcbiAgICBtOiAnMSDliIbpkp8nLFxyXG4gICAgbW06ICclZCDliIbpkp8nLFxyXG4gICAgaDogJzEg5bCP5pe2JyxcclxuICAgIGhoOiAnJWQg5bCP5pe2JyxcclxuICAgIGQ6ICcxIOWkqScsXHJcbiAgICBkZDogJyVkIOWkqScsXHJcbiAgICBNOiAnMSDkuKrmnIgnLFxyXG4gICAgTU06ICclZCDkuKrmnIgnLFxyXG4gICAgeTogJzEg5bm0JyxcclxuICAgIHl5OiAnJWQg5bm0J1xyXG4gIH0sXHJcbiAgd2Vlazoge1xyXG4gICAgLy8gR0IvVCA3NDA4LTE5OTTjgIrmlbDmja7lhYPlkozkuqTmjaLmoLzlvI/Ct+S/oeaBr+S6pOaNosK35pel5pyf5ZKM5pe26Ze06KGo56S65rOV44CL5LiOSVNPIDg2MDE6MTk4OOetieaViFxyXG4gICAgZG93OiAxLCAvLyBNb25kYXkgaXMgdGhlIGZpcnN0IGRheSBvZiB0aGUgd2Vlay5cclxuICAgIGRveTogNCAgLy8gVGhlIHdlZWsgdGhhdCBjb250YWlucyBKYW4gNHRoIGlzIHRoZSBmaXJzdCB3ZWVrIG9mIHRoZSB5ZWFyLlxyXG4gIH1cclxufTtcclxuIl19