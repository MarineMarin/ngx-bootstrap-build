function defaultParsingFlags() {
    // We need to deep clone this object.
    return {
        empty: false,
        unusedTokens: [],
        unusedInput: [],
        overflow: -2,
        charsLeftOver: 0,
        nullInput: false,
        invalidMonth: null,
        invalidFormat: false,
        userInvalidated: false,
        iso: false,
        parsedDateParts: [],
        meridiem: null,
        rfc2822: false,
        weekdayMismatch: false
    };
}
export function getParsingFlags(config) {
    if (config._pf == null) {
        config._pf = defaultParsingFlags();
    }
    return config._pf;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2luZy1mbGFncy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jaHJvbm9zL2NyZWF0ZS9wYXJzaW5nLWZsYWdzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLFNBQVMsbUJBQW1CO0lBQzFCLHFDQUFxQztJQUNyQyxPQUFPO1FBQ0wsS0FBSyxFQUFFLEtBQUs7UUFDWixZQUFZLEVBQUUsRUFBRTtRQUNoQixXQUFXLEVBQUUsRUFBRTtRQUNmLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDWixhQUFhLEVBQUUsQ0FBQztRQUNoQixTQUFTLEVBQUUsS0FBSztRQUNoQixZQUFZLEVBQUUsSUFBSTtRQUNsQixhQUFhLEVBQUUsS0FBSztRQUNwQixlQUFlLEVBQUUsS0FBSztRQUN0QixHQUFHLEVBQUUsS0FBSztRQUNWLGVBQWUsRUFBRSxFQUFFO1FBQ25CLFFBQVEsRUFBRSxJQUFJO1FBQ2QsT0FBTyxFQUFFLEtBQUs7UUFDZCxlQUFlLEVBQUUsS0FBSztLQUN2QixDQUFDO0FBQ0osQ0FBQztBQUVELE1BQU0sVUFBVSxlQUFlLENBQUMsTUFBeUI7SUFDdkQsSUFBSSxNQUFNLENBQUMsR0FBRyxJQUFJLElBQUksRUFBRTtRQUN0QixNQUFNLENBQUMsR0FBRyxHQUFHLG1CQUFtQixFQUFFLENBQUM7S0FDcEM7SUFFRCxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUM7QUFDcEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERhdGVQYXJzaW5nQ29uZmlnLCBEYXRlUGFyc2luZ0ZsYWdzIH0gZnJvbSAnLi9wYXJzaW5nLnR5cGVzJztcclxuXHJcbmZ1bmN0aW9uIGRlZmF1bHRQYXJzaW5nRmxhZ3MoKTogRGF0ZVBhcnNpbmdGbGFncyB7XHJcbiAgLy8gV2UgbmVlZCB0byBkZWVwIGNsb25lIHRoaXMgb2JqZWN0LlxyXG4gIHJldHVybiB7XHJcbiAgICBlbXB0eTogZmFsc2UsXHJcbiAgICB1bnVzZWRUb2tlbnM6IFtdLFxyXG4gICAgdW51c2VkSW5wdXQ6IFtdLFxyXG4gICAgb3ZlcmZsb3c6IC0yLFxyXG4gICAgY2hhcnNMZWZ0T3ZlcjogMCxcclxuICAgIG51bGxJbnB1dDogZmFsc2UsXHJcbiAgICBpbnZhbGlkTW9udGg6IG51bGwsXHJcbiAgICBpbnZhbGlkRm9ybWF0OiBmYWxzZSxcclxuICAgIHVzZXJJbnZhbGlkYXRlZDogZmFsc2UsXHJcbiAgICBpc286IGZhbHNlLFxyXG4gICAgcGFyc2VkRGF0ZVBhcnRzOiBbXSxcclxuICAgIG1lcmlkaWVtOiBudWxsLFxyXG4gICAgcmZjMjgyMjogZmFsc2UsXHJcbiAgICB3ZWVrZGF5TWlzbWF0Y2g6IGZhbHNlXHJcbiAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFBhcnNpbmdGbGFncyhjb25maWc6IERhdGVQYXJzaW5nQ29uZmlnKTogRGF0ZVBhcnNpbmdGbGFncyB7XHJcbiAgaWYgKGNvbmZpZy5fcGYgPT0gbnVsbCkge1xyXG4gICAgY29uZmlnLl9wZiA9IGRlZmF1bHRQYXJzaW5nRmxhZ3MoKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBjb25maWcuX3BmO1xyXG59XHJcbiJdfQ==