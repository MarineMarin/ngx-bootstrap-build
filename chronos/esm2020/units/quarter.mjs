import { addFormatToken } from '../format/format';
import { addRegexToken, match1 } from '../parse/regex';
import { addParseToken } from '../parse/token';
import { MONTH } from './constants';
import { toInt } from '../utils/type-checks';
import { getMonth } from '../utils/date-getters';
import { addUnitPriority } from './priorities';
import { addUnitAlias } from './aliases';
import { setMonth } from '../utils/date-setters';
export function initQuarter() {
    // FORMATTING
    addFormatToken('Q', null, 'Qo', function (date, opts) {
        return getQuarter(date, opts.isUTC)
            .toString(10);
    });
    // ALIASES
    addUnitAlias('quarter', 'Q');
    // PRIORITY
    addUnitPriority('quarter', 7);
    // PARSING
    addRegexToken('Q', match1);
    addParseToken('Q', function (input, array, config) {
        array[MONTH] = (toInt(input) - 1) * 3;
        return config;
    });
}
// MOMENTS
export function getQuarter(date, isUTC = false) {
    return Math.ceil((getMonth(date, isUTC) + 1) / 3);
}
export function setQuarter(date, quarter, isUTC) {
    return setMonth(date, (quarter - 1) * 3 + getMonth(date, isUTC) % 3, isUTC);
}
// export function getSetQuarter(input) {
//   return input == null
//     ? Math.ceil((this.month() + 1) / 3)
//     : this.month((input - 1) * 3 + this.month() % 3);
// }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVhcnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jaHJvbm9zL3VuaXRzL3F1YXJ0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDcEMsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUVqRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFFekMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBR2pELE1BQU0sVUFBVSxXQUFXO0lBQzNCLGFBQWE7SUFFWCxjQUFjLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQzVCLFVBQVMsSUFBVSxFQUFFLElBQTBCO1FBQzdDLE9BQU8sVUFBVSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDO2FBQ2hDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNsQixDQUFDLENBQ0YsQ0FBQztJQUVKLFVBQVU7SUFFUixZQUFZLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBRS9CLFdBQVc7SUFFVCxlQUFlLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRWhDLFVBQVU7SUFFUixhQUFhLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzNCLGFBQWEsQ0FBQyxHQUFHLEVBQUUsVUFBUyxLQUFhLEVBQUUsS0FBZ0IsRUFBRSxNQUF5QjtRQUNwRixLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRXRDLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUVELFVBQVU7QUFFVixNQUFNLFVBQVUsVUFBVSxDQUFDLElBQVUsRUFBRSxLQUFLLEdBQUcsS0FBSztJQUNsRCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ3BELENBQUM7QUFFRCxNQUFNLFVBQVUsVUFBVSxDQUFDLElBQVUsRUFBRSxPQUFlLEVBQUUsS0FBZTtJQUNyRSxPQUFPLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQzlFLENBQUM7QUFFRCx5Q0FBeUM7QUFDekMseUJBQXlCO0FBQ3pCLDBDQUEwQztBQUMxQyx3REFBd0Q7QUFDeEQsSUFBSSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGFkZEZvcm1hdFRva2VuIH0gZnJvbSAnLi4vZm9ybWF0L2Zvcm1hdCc7XHJcbmltcG9ydCB7IGFkZFJlZ2V4VG9rZW4sIG1hdGNoMSB9IGZyb20gJy4uL3BhcnNlL3JlZ2V4JztcclxuaW1wb3J0IHsgYWRkUGFyc2VUb2tlbiB9IGZyb20gJy4uL3BhcnNlL3Rva2VuJztcclxuaW1wb3J0IHsgTU9OVEggfSBmcm9tICcuL2NvbnN0YW50cyc7XHJcbmltcG9ydCB7IHRvSW50IH0gZnJvbSAnLi4vdXRpbHMvdHlwZS1jaGVja3MnO1xyXG5pbXBvcnQgeyBnZXRNb250aCB9IGZyb20gJy4uL3V0aWxzL2RhdGUtZ2V0dGVycyc7XHJcbmltcG9ydCB7IERhdGVBcnJheSwgRGF0ZUZvcm1hdHRlck9wdGlvbnMgfSBmcm9tICcuLi90eXBlcyc7XHJcbmltcG9ydCB7IGFkZFVuaXRQcmlvcml0eSB9IGZyb20gJy4vcHJpb3JpdGllcyc7XHJcbmltcG9ydCB7IGFkZFVuaXRBbGlhcyB9IGZyb20gJy4vYWxpYXNlcyc7XHJcbmltcG9ydCB7IERhdGVQYXJzaW5nQ29uZmlnIH0gZnJvbSAnLi4vY3JlYXRlL3BhcnNpbmcudHlwZXMnO1xyXG5pbXBvcnQgeyBzZXRNb250aCB9IGZyb20gJy4uL3V0aWxzL2RhdGUtc2V0dGVycyc7XHJcblxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGluaXRRdWFydGVyKCkge1xyXG4vLyBGT1JNQVRUSU5HXHJcblxyXG4gIGFkZEZvcm1hdFRva2VuKCdRJywgbnVsbCwgJ1FvJyxcclxuICAgIGZ1bmN0aW9uKGRhdGU6IERhdGUsIG9wdHM6IERhdGVGb3JtYXR0ZXJPcHRpb25zKTogc3RyaW5nIHtcclxuICAgICAgcmV0dXJuIGdldFF1YXJ0ZXIoZGF0ZSwgb3B0cy5pc1VUQylcclxuICAgICAgICAudG9TdHJpbmcoMTApO1xyXG4gICAgfVxyXG4gICk7XHJcblxyXG4vLyBBTElBU0VTXHJcblxyXG4gIGFkZFVuaXRBbGlhcygncXVhcnRlcicsICdRJyk7XHJcblxyXG4vLyBQUklPUklUWVxyXG5cclxuICBhZGRVbml0UHJpb3JpdHkoJ3F1YXJ0ZXInLCA3KTtcclxuXHJcbi8vIFBBUlNJTkdcclxuXHJcbiAgYWRkUmVnZXhUb2tlbignUScsIG1hdGNoMSk7XHJcbiAgYWRkUGFyc2VUb2tlbignUScsIGZ1bmN0aW9uKGlucHV0OiBzdHJpbmcsIGFycmF5OiBEYXRlQXJyYXksIGNvbmZpZzogRGF0ZVBhcnNpbmdDb25maWcpOiBEYXRlUGFyc2luZ0NvbmZpZyB7XHJcbiAgICBhcnJheVtNT05USF0gPSAodG9JbnQoaW5wdXQpIC0gMSkgKiAzO1xyXG5cclxuICAgIHJldHVybiBjb25maWc7XHJcbiAgfSk7XHJcbn1cclxuXHJcbi8vIE1PTUVOVFNcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRRdWFydGVyKGRhdGU6IERhdGUsIGlzVVRDID0gZmFsc2UpOiBudW1iZXIge1xyXG4gIHJldHVybiBNYXRoLmNlaWwoKGdldE1vbnRoKGRhdGUsIGlzVVRDKSArIDEpIC8gMyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRRdWFydGVyKGRhdGU6IERhdGUsIHF1YXJ0ZXI6IG51bWJlciwgaXNVVEM/OiBib29sZWFuKTogRGF0ZSB7XHJcbiAgcmV0dXJuIHNldE1vbnRoKGRhdGUsIChxdWFydGVyIC0gMSkgKiAzICsgZ2V0TW9udGgoZGF0ZSwgaXNVVEMpICUgMywgaXNVVEMpO1xyXG59XHJcblxyXG4vLyBleHBvcnQgZnVuY3Rpb24gZ2V0U2V0UXVhcnRlcihpbnB1dCkge1xyXG4vLyAgIHJldHVybiBpbnB1dCA9PSBudWxsXHJcbi8vICAgICA/IE1hdGguY2VpbCgodGhpcy5tb250aCgpICsgMSkgLyAzKVxyXG4vLyAgICAgOiB0aGlzLm1vbnRoKChpbnB1dCAtIDEpICogMyArIHRoaXMubW9udGgoKSAlIDMpO1xyXG4vLyB9XHJcbiJdfQ==