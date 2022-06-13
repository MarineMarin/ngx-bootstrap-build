import { PlacementForBs5 } from '../models';
import { checkMargins } from './checkMargin';
import { getBsVer } from 'ngx-bootstrap/utils';
export function updateContainerClass(data, renderer) {
    const target = data.instance.target;
    let containerClass = target.className;
    const dataPlacement = getBsVer().isBs5 ? PlacementForBs5[data.placement] : data.placement;
    if (data.placementAuto) {
        containerClass = containerClass.replace(/bs-popover-auto/g, `bs-popover-${dataPlacement}`);
        containerClass = containerClass.replace(/ms-2|me-2|mb-2|mt-2/g, '');
        containerClass = containerClass.replace(/bs-tooltip-auto/g, `bs-tooltip-${dataPlacement}`);
        containerClass = containerClass.replace(/\sauto/g, ` ${dataPlacement}`);
        if (containerClass.indexOf('popover') !== -1) {
            containerClass = containerClass + ' ' + checkMargins(dataPlacement);
        }
        if (containerClass.indexOf('popover') !== -1 && containerClass.indexOf('popover-auto') === -1) {
            containerClass += ' popover-auto';
        }
        if (containerClass.indexOf('tooltip') !== -1 && containerClass.indexOf('tooltip-auto') === -1) {
            containerClass += ' tooltip-auto';
        }
    }
    containerClass = containerClass.replace(/left|right|top|bottom|end|start/g, `${dataPlacement.split(' ')[0]}`);
    if (renderer) {
        renderer.setAttribute(target, 'class', containerClass);
        return;
    }
    target.className = containerClass;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlQ29udGFpbmVyQ2xhc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvcG9zaXRpb25pbmcvdXRpbHMvdXBkYXRlQ29udGFpbmVyQ2xhc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBSUEsT0FBTyxFQUFRLGVBQWUsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUNsRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUUvQyxNQUFNLFVBQVUsb0JBQW9CLENBQUMsSUFBVSxFQUFFLFFBQW9CO0lBQ25FLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO0lBRXBDLElBQUksY0FBYyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7SUFFdEMsTUFBTSxhQUFhLEdBQUcsUUFBUSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFNBQXlDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxSCxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7UUFDdEIsY0FBYyxHQUFHLGNBQWMsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLEVBQUUsY0FBYyxhQUFhLEVBQUUsQ0FBQyxDQUFDO1FBQzNGLGNBQWMsR0FBRyxjQUFjLENBQUMsT0FBTyxDQUFDLHNCQUFzQixFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3BFLGNBQWMsR0FBRyxjQUFjLENBQUMsT0FBTyxDQUFDLGtCQUFrQixFQUFFLGNBQWMsYUFBYSxFQUFFLENBQUMsQ0FBQztRQUMzRixjQUFjLEdBQUcsY0FBYyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsSUFBSSxhQUFhLEVBQUUsQ0FBQyxDQUFDO1FBRXhFLElBQUksY0FBYyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUM1QyxjQUFjLEdBQUcsY0FBYyxHQUFHLEdBQUcsR0FBRyxZQUFZLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDckU7UUFFRCxJQUFJLGNBQWMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksY0FBYyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUM3RixjQUFjLElBQUksZUFBZSxDQUFDO1NBQ25DO1FBRUQsSUFBSSxjQUFjLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFLLGNBQWMsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDOUYsY0FBYyxJQUFJLGVBQWUsQ0FBQztTQUNuQztLQUNGO0lBQ0QsY0FBYyxHQUFHLGNBQWMsQ0FBQyxPQUFPLENBQUMsa0NBQWtDLEVBQUUsR0FBRyxhQUFhLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUU5RyxJQUFJLFFBQVEsRUFBRTtRQUNaLFFBQVEsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxjQUFjLENBQUMsQ0FBQztRQUV2RCxPQUFPO0tBQ1I7SUFFRCxNQUFNLENBQUMsU0FBUyxHQUFHLGNBQWMsQ0FBQztBQUNwQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIFVwZGF0ZSBjbGFzcyBmb3IgdGhlIGdpdmVuIHBvcHBlclxyXG4gKi9cclxuaW1wb3J0IHsgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IERhdGEsIFBsYWNlbWVudEZvckJzNSB9IGZyb20gJy4uL21vZGVscyc7XHJcbmltcG9ydCB7IGNoZWNrTWFyZ2lucyB9IGZyb20gJy4vY2hlY2tNYXJnaW4nO1xyXG5pbXBvcnQgeyBnZXRCc1ZlciB9IGZyb20gJ25neC1ib290c3RyYXAvdXRpbHMnO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUNvbnRhaW5lckNsYXNzKGRhdGE6IERhdGEsIHJlbmRlcmVyPzogUmVuZGVyZXIyKTogdm9pZCB7XHJcbiAgY29uc3QgdGFyZ2V0ID0gZGF0YS5pbnN0YW5jZS50YXJnZXQ7XHJcblxyXG4gIGxldCBjb250YWluZXJDbGFzcyA9IHRhcmdldC5jbGFzc05hbWU7XHJcblxyXG4gIGNvbnN0IGRhdGFQbGFjZW1lbnQgPSBnZXRCc1ZlcigpLmlzQnM1ID8gUGxhY2VtZW50Rm9yQnM1W2RhdGEucGxhY2VtZW50IGFzIGtleW9mIHR5cGVvZiBQbGFjZW1lbnRGb3JCczVdIDogZGF0YS5wbGFjZW1lbnQ7XHJcbiAgaWYgKGRhdGEucGxhY2VtZW50QXV0bykge1xyXG4gICAgY29udGFpbmVyQ2xhc3MgPSBjb250YWluZXJDbGFzcy5yZXBsYWNlKC9icy1wb3BvdmVyLWF1dG8vZywgYGJzLXBvcG92ZXItJHtkYXRhUGxhY2VtZW50fWApO1xyXG4gICAgY29udGFpbmVyQ2xhc3MgPSBjb250YWluZXJDbGFzcy5yZXBsYWNlKC9tcy0yfG1lLTJ8bWItMnxtdC0yL2csICcnKTtcclxuICAgIGNvbnRhaW5lckNsYXNzID0gY29udGFpbmVyQ2xhc3MucmVwbGFjZSgvYnMtdG9vbHRpcC1hdXRvL2csIGBicy10b29sdGlwLSR7ZGF0YVBsYWNlbWVudH1gKTtcclxuICAgIGNvbnRhaW5lckNsYXNzID0gY29udGFpbmVyQ2xhc3MucmVwbGFjZSgvXFxzYXV0by9nLCBgICR7ZGF0YVBsYWNlbWVudH1gKTtcclxuXHJcbiAgICBpZiAoY29udGFpbmVyQ2xhc3MuaW5kZXhPZigncG9wb3ZlcicpICE9PSAtMSkge1xyXG4gICAgICBjb250YWluZXJDbGFzcyA9IGNvbnRhaW5lckNsYXNzICsgJyAnICsgY2hlY2tNYXJnaW5zKGRhdGFQbGFjZW1lbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChjb250YWluZXJDbGFzcy5pbmRleE9mKCdwb3BvdmVyJykgIT09IC0xICYmIGNvbnRhaW5lckNsYXNzLmluZGV4T2YoJ3BvcG92ZXItYXV0bycpID09PSAtMSkge1xyXG4gICAgICBjb250YWluZXJDbGFzcyArPSAnIHBvcG92ZXItYXV0byc7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNvbnRhaW5lckNsYXNzLmluZGV4T2YoJ3Rvb2x0aXAnKSAhPT0gLTEgICYmIGNvbnRhaW5lckNsYXNzLmluZGV4T2YoJ3Rvb2x0aXAtYXV0bycpID09PSAtMSkge1xyXG4gICAgICBjb250YWluZXJDbGFzcyArPSAnIHRvb2x0aXAtYXV0byc7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGNvbnRhaW5lckNsYXNzID0gY29udGFpbmVyQ2xhc3MucmVwbGFjZSgvbGVmdHxyaWdodHx0b3B8Ym90dG9tfGVuZHxzdGFydC9nLCBgJHtkYXRhUGxhY2VtZW50LnNwbGl0KCcgJylbMF19YCk7XHJcblxyXG4gIGlmIChyZW5kZXJlcikge1xyXG4gICAgcmVuZGVyZXIuc2V0QXR0cmlidXRlKHRhcmdldCwgJ2NsYXNzJywgY29udGFpbmVyQ2xhc3MpO1xyXG5cclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIHRhcmdldC5jbGFzc05hbWUgPSBjb250YWluZXJDbGFzcztcclxufVxyXG4iXX0=