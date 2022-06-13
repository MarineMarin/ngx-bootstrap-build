import { toInt } from '../utils/type-checks';
const ordering = ['year', 'quarter', 'month', 'week', 'day', 'hours', 'minutes', 'seconds', 'milliseconds'];
const orderingHash = ordering.reduce((mem, order) => {
    mem[order] = true;
    return mem;
}, {});
export function isDurationValid(duration) {
    const durationKeys = Object.keys(duration);
    if (durationKeys
        .some((key) => {
        return (key in orderingHash)
            && duration[key] === null
            || isNaN(duration[key]);
    })) {
        return false;
    }
    // for (let key in duration) {
    //   if (!(indexOf.call(ordering, key) !== -1 && (duration[key] == null || !isNaN(duration[key])))) {
    //     return false;
    //   }
    // }
    let unitHasDecimal = false;
    for (let i = 0; i < ordering.length; ++i) {
        if (duration[ordering[i]]) {
            // only allow non-integers for smallest unit
            if (unitHasDecimal) {
                return false;
            }
            if (duration[ordering[i]] !== toInt(duration[ordering[i]])) {
                unitHasDecimal = true;
            }
        }
    }
    return true;
}
// export function isValid() {
//   return this._isValid;
// }
//
// export function createInvalid(): Duration {
//   return createDuration(NaN);
// }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvY2hyb25vcy9kdXJhdGlvbi92YWxpZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFLN0MsTUFBTSxRQUFRLEdBQXlCLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxjQUFjLENBQUMsQ0FBQztBQUNsSSxNQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBK0IsRUFBRSxLQUFLLEVBQUUsRUFBRTtJQUM5RSxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDO0lBRWxCLE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBRVAsTUFBTSxVQUFVLGVBQWUsQ0FBQyxRQUE2QjtJQUMzRCxNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzNDLElBQUksWUFBWTtTQUNYLElBQUksQ0FBQyxDQUFDLEdBQXFCLEVBQUUsRUFBRTtRQUM5QixPQUFPLENBQUMsR0FBRyxJQUFJLFlBQVksQ0FBQztlQUN2QixRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssSUFBSTtlQUN0QixLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDNUIsQ0FBQyxDQUFDLEVBQUU7UUFDTixPQUFPLEtBQUssQ0FBQztLQUNkO0lBQ0QsOEJBQThCO0lBQzlCLHFHQUFxRztJQUNyRyxvQkFBb0I7SUFDcEIsTUFBTTtJQUNOLElBQUk7SUFFSixJQUFJLGNBQWMsR0FBRyxLQUFLLENBQUM7SUFDM0IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLEVBQUU7UUFDeEMsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDekIsNENBQTRDO1lBQzVDLElBQUksY0FBYyxFQUFFO2dCQUNsQixPQUFPLEtBQUssQ0FBQzthQUNkO1lBQ0QsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUMxRCxjQUFjLEdBQUcsSUFBSSxDQUFDO2FBQ3ZCO1NBQ0Y7S0FDRjtJQUVELE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQztBQUVELDhCQUE4QjtBQUM5QiwwQkFBMEI7QUFDMUIsSUFBSTtBQUNKLEVBQUU7QUFDRiw4Q0FBOEM7QUFDOUMsZ0NBQWdDO0FBQ2hDLElBQUkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB0b0ludCB9IGZyb20gJy4uL3V0aWxzL3R5cGUtY2hlY2tzJztcclxuaW1wb3J0IHsgY3JlYXRlRHVyYXRpb24gfSBmcm9tICcuL2NyZWF0ZSc7XHJcbmltcG9ydCB7IER1cmF0aW9uIH0gZnJvbSAnLi9jb25zdHJ1Y3Rvcic7XHJcbmltcG9ydCB7IERhdGVPYmplY3QgfSBmcm9tICcuLi90eXBlcyc7XHJcblxyXG5jb25zdCBvcmRlcmluZzogKGtleW9mIERhdGVPYmplY3QpW10gPSBbJ3llYXInLCAncXVhcnRlcicsICdtb250aCcsICd3ZWVrJywgJ2RheScsICdob3VycycsICdtaW51dGVzJywgJ3NlY29uZHMnLCAnbWlsbGlzZWNvbmRzJ107XHJcbmNvbnN0IG9yZGVyaW5nSGFzaCA9IG9yZGVyaW5nLnJlZHVjZSgobWVtOiB7IFtrZXk6IHN0cmluZ106IGJvb2xlYW4gfSwgb3JkZXIpID0+IHtcclxuICBtZW1bb3JkZXJdID0gdHJ1ZTtcclxuXHJcbiAgcmV0dXJuIG1lbTtcclxufSwge30pO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzRHVyYXRpb25WYWxpZChkdXJhdGlvbjogUGFydGlhbDxEYXRlT2JqZWN0Pik6IGJvb2xlYW4ge1xyXG4gIGNvbnN0IGR1cmF0aW9uS2V5cyA9IE9iamVjdC5rZXlzKGR1cmF0aW9uKTtcclxuICBpZiAoZHVyYXRpb25LZXlzXHJcbiAgICAgIC5zb21lKChrZXk6IGtleW9mIERhdGVPYmplY3QpID0+IHtcclxuICAgICAgICByZXR1cm4gKGtleSBpbiBvcmRlcmluZ0hhc2gpXHJcbiAgICAgICAgICAmJiBkdXJhdGlvbltrZXldID09PSBudWxsXHJcbiAgICAgICAgICB8fCBpc05hTihkdXJhdGlvbltrZXldKTtcclxuICAgICAgfSkpIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbiAgLy8gZm9yIChsZXQga2V5IGluIGR1cmF0aW9uKSB7XHJcbiAgLy8gICBpZiAoIShpbmRleE9mLmNhbGwob3JkZXJpbmcsIGtleSkgIT09IC0xICYmIChkdXJhdGlvbltrZXldID09IG51bGwgfHwgIWlzTmFOKGR1cmF0aW9uW2tleV0pKSkpIHtcclxuICAvLyAgICAgcmV0dXJuIGZhbHNlO1xyXG4gIC8vICAgfVxyXG4gIC8vIH1cclxuXHJcbiAgbGV0IHVuaXRIYXNEZWNpbWFsID0gZmFsc2U7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBvcmRlcmluZy5sZW5ndGg7ICsraSkge1xyXG4gICAgaWYgKGR1cmF0aW9uW29yZGVyaW5nW2ldXSkge1xyXG4gICAgICAvLyBvbmx5IGFsbG93IG5vbi1pbnRlZ2VycyBmb3Igc21hbGxlc3QgdW5pdFxyXG4gICAgICBpZiAodW5pdEhhc0RlY2ltYWwpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGR1cmF0aW9uW29yZGVyaW5nW2ldXSAhPT0gdG9JbnQoZHVyYXRpb25bb3JkZXJpbmdbaV1dKSkge1xyXG4gICAgICAgIHVuaXRIYXNEZWNpbWFsID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHRydWU7XHJcbn1cclxuXHJcbi8vIGV4cG9ydCBmdW5jdGlvbiBpc1ZhbGlkKCkge1xyXG4vLyAgIHJldHVybiB0aGlzLl9pc1ZhbGlkO1xyXG4vLyB9XHJcbi8vXHJcbi8vIGV4cG9ydCBmdW5jdGlvbiBjcmVhdGVJbnZhbGlkKCk6IER1cmF0aW9uIHtcclxuLy8gICByZXR1cm4gY3JlYXRlRHVyYXRpb24oTmFOKTtcclxuLy8gfVxyXG4iXX0=