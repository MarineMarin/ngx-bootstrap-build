import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class TimepickerActions {
    writeValue(value) {
        return {
            type: TimepickerActions.WRITE_VALUE,
            payload: value
        };
    }
    changeHours(event) {
        return {
            type: TimepickerActions.CHANGE_HOURS,
            payload: event
        };
    }
    changeMinutes(event) {
        return {
            type: TimepickerActions.CHANGE_MINUTES,
            payload: event
        };
    }
    changeSeconds(event) {
        return {
            type: TimepickerActions.CHANGE_SECONDS,
            payload: event
        };
    }
    setTime(value) {
        return {
            type: TimepickerActions.SET_TIME_UNIT,
            payload: value
        };
    }
    updateControls(value) {
        return {
            type: TimepickerActions.UPDATE_CONTROLS,
            payload: value
        };
    }
}
TimepickerActions.WRITE_VALUE = '[timepicker] write value from ng model';
TimepickerActions.CHANGE_HOURS = '[timepicker] change hours';
TimepickerActions.CHANGE_MINUTES = '[timepicker] change minutes';
TimepickerActions.CHANGE_SECONDS = '[timepicker] change seconds';
TimepickerActions.SET_TIME_UNIT = '[timepicker] set time unit';
TimepickerActions.UPDATE_CONTROLS = '[timepicker] update controls';
TimepickerActions.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: TimepickerActions, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
TimepickerActions.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: TimepickerActions, providedIn: 'platform' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: TimepickerActions, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'platform' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXBpY2tlci5hY3Rpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3RpbWVwaWNrZXIvcmVkdWNlci90aW1lcGlja2VyLmFjdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFTM0MsTUFBTSxPQUFPLGlCQUFpQjtJQVE1QixVQUFVLENBQUMsS0FBcUI7UUFDOUIsT0FBTztZQUNMLElBQUksRUFBRSxpQkFBaUIsQ0FBQyxXQUFXO1lBQ25DLE9BQU8sRUFBRSxLQUFLO1NBQ2YsQ0FBQztJQUNKLENBQUM7SUFFRCxXQUFXLENBQUMsS0FBc0I7UUFDaEMsT0FBTztZQUNMLElBQUksRUFBRSxpQkFBaUIsQ0FBQyxZQUFZO1lBQ3BDLE9BQU8sRUFBRSxLQUFLO1NBQ2YsQ0FBQztJQUNKLENBQUM7SUFFRCxhQUFhLENBQUMsS0FBc0I7UUFDbEMsT0FBTztZQUNMLElBQUksRUFBRSxpQkFBaUIsQ0FBQyxjQUFjO1lBQ3RDLE9BQU8sRUFBRSxLQUFLO1NBQ2YsQ0FBQztJQUNKLENBQUM7SUFFRCxhQUFhLENBQUMsS0FBc0I7UUFDbEMsT0FBTztZQUNMLElBQUksRUFBRSxpQkFBaUIsQ0FBQyxjQUFjO1lBQ3RDLE9BQU8sRUFBRSxLQUFLO1NBQ2YsQ0FBQztJQUNKLENBQUM7SUFFRCxPQUFPLENBQUMsS0FBVztRQUNqQixPQUFPO1lBQ0wsSUFBSSxFQUFFLGlCQUFpQixDQUFDLGFBQWE7WUFDckMsT0FBTyxFQUFFLEtBQUs7U0FDZixDQUFDO0lBQ0osQ0FBQztJQUVELGNBQWMsQ0FBQyxLQUErQjtRQUM1QyxPQUFPO1lBQ0wsSUFBSSxFQUFFLGlCQUFpQixDQUFDLGVBQWU7WUFDdkMsT0FBTyxFQUFFLEtBQUs7U0FDZixDQUFDO0lBQ0osQ0FBQzs7QUEvQ2UsNkJBQVcsR0FBRyx3Q0FBeUMsQ0FBQTtBQUN2RCw4QkFBWSxHQUFHLDJCQUE0QixDQUFBO0FBQzNDLGdDQUFjLEdBQUcsNkJBQThCLENBQUE7QUFDL0MsZ0NBQWMsR0FBRyw2QkFBOEIsQ0FBQTtBQUMvQywrQkFBYSxHQUFHLDRCQUE2QixDQUFBO0FBQzdDLGlDQUFlLEdBQUcsOEJBQStCLENBQUE7OEdBTnRELGlCQUFpQjtrSEFBakIsaUJBQWlCLGNBREwsVUFBVTsyRkFDdEIsaUJBQWlCO2tCQUQ3QixVQUFVO21CQUFDLEVBQUMsVUFBVSxFQUFFLFVBQVUsRUFBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAnbmd4LWJvb3RzdHJhcC9taW5pLW5ncngnO1xyXG5pbXBvcnQge1xyXG4gIFRpbWVDaGFuZ2VFdmVudCxcclxuICBUaW1lcGlja2VyQ29tcG9uZW50U3RhdGUsXHJcbiAgVGltZVxyXG59IGZyb20gJy4uL3RpbWVwaWNrZXIubW9kZWxzJztcclxuXHJcbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncGxhdGZvcm0nfSlcclxuZXhwb3J0IGNsYXNzIFRpbWVwaWNrZXJBY3Rpb25zIHtcclxuICBzdGF0aWMgcmVhZG9ubHkgV1JJVEVfVkFMVUUgPSAnW3RpbWVwaWNrZXJdIHdyaXRlIHZhbHVlIGZyb20gbmcgbW9kZWwnO1xyXG4gIHN0YXRpYyByZWFkb25seSBDSEFOR0VfSE9VUlMgPSAnW3RpbWVwaWNrZXJdIGNoYW5nZSBob3Vycyc7XHJcbiAgc3RhdGljIHJlYWRvbmx5IENIQU5HRV9NSU5VVEVTID0gJ1t0aW1lcGlja2VyXSBjaGFuZ2UgbWludXRlcyc7XHJcbiAgc3RhdGljIHJlYWRvbmx5IENIQU5HRV9TRUNPTkRTID0gJ1t0aW1lcGlja2VyXSBjaGFuZ2Ugc2Vjb25kcyc7XHJcbiAgc3RhdGljIHJlYWRvbmx5IFNFVF9USU1FX1VOSVQgPSAnW3RpbWVwaWNrZXJdIHNldCB0aW1lIHVuaXQnO1xyXG4gIHN0YXRpYyByZWFkb25seSBVUERBVEVfQ09OVFJPTFMgPSAnW3RpbWVwaWNrZXJdIHVwZGF0ZSBjb250cm9scyc7XHJcblxyXG4gIHdyaXRlVmFsdWUodmFsdWU/OiBEYXRlIHwgc3RyaW5nKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB0eXBlOiBUaW1lcGlja2VyQWN0aW9ucy5XUklURV9WQUxVRSxcclxuICAgICAgcGF5bG9hZDogdmFsdWVcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBjaGFuZ2VIb3VycyhldmVudDogVGltZUNoYW5nZUV2ZW50KSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB0eXBlOiBUaW1lcGlja2VyQWN0aW9ucy5DSEFOR0VfSE9VUlMsXHJcbiAgICAgIHBheWxvYWQ6IGV2ZW50XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgY2hhbmdlTWludXRlcyhldmVudDogVGltZUNoYW5nZUV2ZW50KSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB0eXBlOiBUaW1lcGlja2VyQWN0aW9ucy5DSEFOR0VfTUlOVVRFUyxcclxuICAgICAgcGF5bG9hZDogZXZlbnRcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBjaGFuZ2VTZWNvbmRzKGV2ZW50OiBUaW1lQ2hhbmdlRXZlbnQpOiBBY3Rpb24ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdHlwZTogVGltZXBpY2tlckFjdGlvbnMuQ0hBTkdFX1NFQ09ORFMsXHJcbiAgICAgIHBheWxvYWQ6IGV2ZW50XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgc2V0VGltZSh2YWx1ZTogVGltZSk6IEFjdGlvbiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB0eXBlOiBUaW1lcGlja2VyQWN0aW9ucy5TRVRfVElNRV9VTklULFxyXG4gICAgICBwYXlsb2FkOiB2YWx1ZVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZUNvbnRyb2xzKHZhbHVlOiBUaW1lcGlja2VyQ29tcG9uZW50U3RhdGUpOiBBY3Rpb24ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdHlwZTogVGltZXBpY2tlckFjdGlvbnMuVVBEQVRFX0NPTlRST0xTLFxyXG4gICAgICBwYXlsb2FkOiB2YWx1ZVxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19