import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
export class BsLocaleService {
    constructor() {
        this._defaultLocale = 'en';
        this._locale = new BehaviorSubject(this._defaultLocale);
        this._localeChange = this._locale.asObservable();
    }
    get locale() {
        return this._locale;
    }
    get localeChange() {
        return this._localeChange;
    }
    get currentLocale() {
        return this._locale.getValue();
    }
    use(locale) {
        if (locale === this.currentLocale) {
            return;
        }
        this._locale.next(locale);
    }
}
BsLocaleService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: BsLocaleService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
BsLocaleService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: BsLocaleService, providedIn: 'platform' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: BsLocaleService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'platform' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnMtbG9jYWxlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZGF0ZXBpY2tlci9icy1sb2NhbGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxlQUFlLEVBQWMsTUFBTSxNQUFNLENBQUM7O0FBR25ELE1BQU0sT0FBTyxlQUFlO0lBRDVCO1FBRVUsbUJBQWMsR0FBRyxJQUFJLENBQUM7UUFDdEIsWUFBTyxHQUFHLElBQUksZUFBZSxDQUFTLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUMzRCxrQkFBYSxHQUF1QixJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxDQUFDO0tBcUJ6RTtJQW5CQyxJQUFJLE1BQU07UUFDUixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQztJQUVELElBQUksWUFBWTtRQUNkLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztJQUM1QixDQUFDO0lBRUQsSUFBSSxhQUFhO1FBQ2YsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFFRCxHQUFHLENBQUMsTUFBYztRQUNoQixJQUFJLE1BQU0sS0FBSyxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ2pDLE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzVCLENBQUM7OzRHQXZCVSxlQUFlO2dIQUFmLGVBQWUsY0FESCxVQUFVOzJGQUN0QixlQUFlO2tCQUQzQixVQUFVO21CQUFDLEVBQUMsVUFBVSxFQUFFLFVBQVUsRUFBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcblxyXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3BsYXRmb3JtJ30pXHJcbmV4cG9ydCBjbGFzcyBCc0xvY2FsZVNlcnZpY2Uge1xyXG4gIHByaXZhdGUgX2RlZmF1bHRMb2NhbGUgPSAnZW4nO1xyXG4gIHByaXZhdGUgX2xvY2FsZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPih0aGlzLl9kZWZhdWx0TG9jYWxlKTtcclxuICBwcml2YXRlIF9sb2NhbGVDaGFuZ2U6IE9ic2VydmFibGU8c3RyaW5nPiA9IHRoaXMuX2xvY2FsZS5hc09ic2VydmFibGUoKTtcclxuXHJcbiAgZ2V0IGxvY2FsZSgpOiBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPiB7XHJcbiAgICByZXR1cm4gdGhpcy5fbG9jYWxlO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGxvY2FsZUNoYW5nZSgpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2xvY2FsZUNoYW5nZTtcclxuICB9XHJcblxyXG4gIGdldCBjdXJyZW50TG9jYWxlKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5fbG9jYWxlLmdldFZhbHVlKCk7XHJcbiAgfVxyXG5cclxuICB1c2UobG9jYWxlOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIGlmIChsb2NhbGUgPT09IHRoaXMuY3VycmVudExvY2FsZSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fbG9jYWxlLm5leHQobG9jYWxlKTtcclxuICB9XHJcbn1cclxuIl19