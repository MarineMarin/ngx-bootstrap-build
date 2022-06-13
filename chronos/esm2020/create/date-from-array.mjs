// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function createUTCDate(y, m, d) {
    // eslint-disable-next-line prefer-rest-params
    const date = new Date(Date.UTC.apply(null, arguments));
    // the Date.UTC function remaps years 0-99 to 1900-1999
    if (y < 100 && y >= 0 && isFinite(date.getUTCFullYear())) {
        date.setUTCFullYear(y);
    }
    return date;
}
export function createDate(y, m = 0, d = 1, h = 0, M = 0, s = 0, ms = 0) {
    const date = new Date(y, m, d, h, M, s, ms);
    // the date constructor remaps years 0-99 to 1900-1999
    if (y < 100 && y >= 0 && isFinite(date.getFullYear())) {
        date.setFullYear(y);
    }
    return date;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1mcm9tLWFycmF5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2Nocm9ub3MvY3JlYXRlL2RhdGUtZnJvbS1hcnJheS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSw2REFBNkQ7QUFDN0QsTUFBTSxVQUFVLGFBQWEsQ0FBQyxDQUFVLEVBQUUsQ0FBVSxFQUFFLENBQVU7SUFDOUQsOENBQThDO0lBQzlDLE1BQU0sSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBRXZELHVEQUF1RDtJQUN2RCxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLEVBQUU7UUFDeEQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUN4QjtJQUVELE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQztBQUVELE1BQU0sVUFBVSxVQUFVLENBQUMsQ0FBVSxFQUNWLENBQUMsR0FBRyxDQUFDLEVBQ0wsQ0FBQyxHQUFHLENBQUMsRUFDTCxDQUFDLEdBQUcsQ0FBQyxFQUNMLENBQUMsR0FBRyxDQUFDLEVBQ0wsQ0FBQyxHQUFHLENBQUMsRUFDTCxFQUFFLEdBQUcsQ0FBQztJQUMvQixNQUFNLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUU1QyxzREFBc0Q7SUFDdEQsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxFQUFFO1FBQ3JELElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDckI7SUFFRCxPQUFPLElBQUksQ0FBQztBQUNkLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVVVENEYXRlKHk/OiBudW1iZXIsIG0/OiBudW1iZXIsIGQ/OiBudW1iZXIpOiBEYXRlIHtcclxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcHJlZmVyLXJlc3QtcGFyYW1zXHJcbiAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKERhdGUuVVRDLmFwcGx5KG51bGwsIGFyZ3VtZW50cykpO1xyXG5cclxuICAvLyB0aGUgRGF0ZS5VVEMgZnVuY3Rpb24gcmVtYXBzIHllYXJzIDAtOTkgdG8gMTkwMC0xOTk5XHJcbiAgaWYgKHkgPCAxMDAgJiYgeSA+PSAwICYmIGlzRmluaXRlKGRhdGUuZ2V0VVRDRnVsbFllYXIoKSkpIHtcclxuICAgIGRhdGUuc2V0VVRDRnVsbFllYXIoeSk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gZGF0ZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZURhdGUoeT86IG51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgbSA9IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGQgPSAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBoID0gMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgTSA9IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHMgPSAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBtcyA9IDApOiBEYXRlIHtcclxuICBjb25zdCBkYXRlID0gbmV3IERhdGUoeSwgbSwgZCwgaCwgTSwgcywgbXMpO1xyXG5cclxuICAvLyB0aGUgZGF0ZSBjb25zdHJ1Y3RvciByZW1hcHMgeWVhcnMgMC05OSB0byAxOTAwLTE5OTlcclxuICBpZiAoeSA8IDEwMCAmJiB5ID49IDAgJiYgaXNGaW5pdGUoZGF0ZS5nZXRGdWxsWWVhcigpKSkge1xyXG4gICAgZGF0ZS5zZXRGdWxsWWVhcih5KTtcclxuICB9XHJcblxyXG4gIHJldHVybiBkYXRlO1xyXG59XHJcbiJdfQ==