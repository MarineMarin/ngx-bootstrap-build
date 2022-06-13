export function copyTime(sourceDate, time) {
    if (!sourceDate || !isNaN(sourceDate.getTime())) {
        return;
    }
    sourceDate.setHours(time.getHours());
    sourceDate.setMinutes(time.getMinutes());
    sourceDate.setSeconds(time.getSeconds());
    sourceDate.setMilliseconds(time.getMilliseconds());
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29weS10aW1lLXV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2RhdGVwaWNrZXIvdXRpbHMvY29weS10aW1lLXV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sVUFBVSxRQUFRLENBQUMsVUFBZ0IsRUFBRSxJQUFVO0lBQ25ELElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUU7UUFDL0MsT0FBTztLQUNSO0lBRUQsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUNyQyxVQUFVLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO0lBQ3pDLFVBQVUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7SUFDekMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQztBQUNyRCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIGNvcHlUaW1lKHNvdXJjZURhdGU6IERhdGUsIHRpbWU6IERhdGUpIHtcclxuICBpZiAoIXNvdXJjZURhdGUgfHwgIWlzTmFOKHNvdXJjZURhdGUuZ2V0VGltZSgpKSkge1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgc291cmNlRGF0ZS5zZXRIb3Vycyh0aW1lLmdldEhvdXJzKCkpO1xyXG4gIHNvdXJjZURhdGUuc2V0TWludXRlcyh0aW1lLmdldE1pbnV0ZXMoKSk7XHJcbiAgc291cmNlRGF0ZS5zZXRTZWNvbmRzKHRpbWUuZ2V0U2Vjb25kcygpKTtcclxuICBzb3VyY2VEYXRlLnNldE1pbGxpc2Vjb25kcyh0aW1lLmdldE1pbGxpc2Vjb25kcygpKTtcclxufVxyXG4iXX0=