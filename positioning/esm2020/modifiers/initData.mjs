import { computeAutoPlacement, getReferenceOffsets, getTargetOffsets } from '../utils';
export function initData(targetElement, hostElement, position, options) {
    if (!targetElement || !hostElement) {
        return;
    }
    const hostElPosition = getReferenceOffsets(targetElement, hostElement);
    if (!position.match(/^(auto)*\s*(left|right|top|bottom|start|end)*$/)
        && !position.match(/^(left|right|top|bottom|start|end)*(?: (left|right|top|bottom|start|end))*$/)) {
        position = 'auto';
    }
    const placementAuto = !!position.match(/auto/g);
    // support old placements 'auto left|right|top|bottom'
    let placement = position.match(/auto\s(left|right|top|bottom|start|end)/)
        ? position.split(' ')[1] || 'auto'
        : position;
    // Normalize placements that have identical main placement and variation ("right right" => "right").
    const matches = placement.match(/^(left|right|top|bottom|start|end)* ?(?!\1)(left|right|top|bottom|start|end)?/);
    if (matches) {
        placement = matches[1] + (matches[2] ? ` ${matches[2]}` : '');
    }
    // "left right", "top bottom" etc. placements also considered incorrect.
    if (['left right', 'right left', 'top bottom', 'bottom top'].indexOf(placement) !== -1) {
        placement = 'auto';
    }
    placement = computeAutoPlacement(placement, hostElPosition, targetElement, hostElement, options ? options.allowedPositions : undefined);
    const targetOffset = getTargetOffsets(targetElement, hostElPosition, placement);
    return {
        options: options || { modifiers: {} },
        instance: {
            target: targetElement,
            host: hostElement,
            arrow: void 0
        },
        offsets: {
            target: targetOffset,
            host: hostElPosition,
            arrow: void 0
        },
        positionFixed: false,
        placement,
        placementAuto
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pdERhdGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvcG9zaXRpb25pbmcvbW9kaWZpZXJzL2luaXREYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxvQkFBb0IsRUFDcEIsbUJBQW1CLEVBQ25CLGdCQUFnQixFQUNqQixNQUFNLFVBQVUsQ0FBQztBQUlsQixNQUFNLFVBQVUsUUFBUSxDQUN0QixhQUErQixFQUFFLFdBQTZCLEVBQUUsUUFBZ0IsRUFBRSxPQUFpQjtJQUduRyxJQUFJLENBQUMsYUFBYSxJQUFJLENBQUMsV0FBVyxFQUFFO1FBQ2xDLE9BQVE7S0FDVDtJQUVELE1BQU0sY0FBYyxHQUFHLG1CQUFtQixDQUFDLGFBQWEsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUV2RSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxnREFBZ0QsQ0FBQztXQUNoRSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsNkVBQTZFLENBQUMsRUFBRTtRQUMzRixRQUFRLEdBQUcsTUFBTSxDQUFDO0tBQ3pCO0lBRUgsTUFBTSxhQUFhLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFaEQsc0RBQXNEO0lBQ3RELElBQUksU0FBUyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMseUNBQXlDLENBQUM7UUFDdkUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksTUFBTTtRQUNsQyxDQUFDLENBQUMsUUFBUSxDQUFDO0lBRWIsb0dBQW9HO0lBQ3BHLE1BQU0sT0FBTyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsK0VBQStFLENBQUMsQ0FBQztJQUNqSCxJQUFJLE9BQU8sRUFBRTtRQUNYLFNBQVMsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQy9EO0lBRUQsd0VBQXdFO0lBQ3hFLElBQUksQ0FBQyxZQUFZLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDdEYsU0FBUyxHQUFHLE1BQU0sQ0FBQztLQUNwQjtJQUVELFNBQVMsR0FBRyxvQkFBb0IsQ0FDOUIsU0FBUyxFQUNULGNBQWMsRUFDZCxhQUFhLEVBQ2IsV0FBVyxFQUNYLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxTQUFTLENBQy9DLENBQUM7SUFFRixNQUFNLFlBQVksR0FBRyxnQkFBZ0IsQ0FBQyxhQUFhLEVBQUUsY0FBYyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBRWhGLE9BQU87UUFDTCxPQUFPLEVBQUUsT0FBTyxJQUFJLEVBQUMsU0FBUyxFQUFFLEVBQUUsRUFBQztRQUNuQyxRQUFRLEVBQUU7WUFDUixNQUFNLEVBQUUsYUFBYTtZQUNyQixJQUFJLEVBQUUsV0FBVztZQUNqQixLQUFLLEVBQUUsS0FBSyxDQUFDO1NBQ2Q7UUFDRCxPQUFPLEVBQUU7WUFDUCxNQUFNLEVBQUUsWUFBWTtZQUNwQixJQUFJLEVBQUUsY0FBYztZQUNwQixLQUFLLEVBQUUsS0FBSyxDQUFDO1NBQ2Q7UUFDRCxhQUFhLEVBQUUsS0FBSztRQUNwQixTQUFTO1FBQ1QsYUFBYTtLQUNkLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBjb21wdXRlQXV0b1BsYWNlbWVudCxcclxuICBnZXRSZWZlcmVuY2VPZmZzZXRzLFxyXG4gIGdldFRhcmdldE9mZnNldHNcclxufSBmcm9tICcuLi91dGlscyc7XHJcblxyXG5pbXBvcnQgeyBEYXRhLCBPcHRpb25zIH0gZnJvbSAnLi4vbW9kZWxzJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpbml0RGF0YShcclxuICB0YXJnZXRFbGVtZW50OiBIVE1MRWxlbWVudHxudWxsLCBob3N0RWxlbWVudDogSFRNTEVsZW1lbnR8bnVsbCwgcG9zaXRpb246IHN0cmluZywgb3B0aW9ucz86IE9wdGlvbnNcclxuKTogRGF0YXx1bmRlZmluZWQge1xyXG5cclxuICBpZiAoIXRhcmdldEVsZW1lbnQgfHwgIWhvc3RFbGVtZW50KSB7XHJcbiAgICByZXR1cm4gO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgaG9zdEVsUG9zaXRpb24gPSBnZXRSZWZlcmVuY2VPZmZzZXRzKHRhcmdldEVsZW1lbnQsIGhvc3RFbGVtZW50KTtcclxuXHJcbiAgaWYgKCFwb3NpdGlvbi5tYXRjaCgvXihhdXRvKSpcXHMqKGxlZnR8cmlnaHR8dG9wfGJvdHRvbXxzdGFydHxlbmQpKiQvKVxyXG4gICAgJiYgIXBvc2l0aW9uLm1hdGNoKC9eKGxlZnR8cmlnaHR8dG9wfGJvdHRvbXxzdGFydHxlbmQpKig/OiAobGVmdHxyaWdodHx0b3B8Ym90dG9tfHN0YXJ0fGVuZCkpKiQvKSkge1xyXG4gICAgICAgICAgICBwb3NpdGlvbiA9ICdhdXRvJztcclxuICAgIH1cclxuXHJcbiAgY29uc3QgcGxhY2VtZW50QXV0byA9ICEhcG9zaXRpb24ubWF0Y2goL2F1dG8vZyk7XHJcblxyXG4gIC8vIHN1cHBvcnQgb2xkIHBsYWNlbWVudHMgJ2F1dG8gbGVmdHxyaWdodHx0b3B8Ym90dG9tJ1xyXG4gIGxldCBwbGFjZW1lbnQgPSBwb3NpdGlvbi5tYXRjaCgvYXV0b1xccyhsZWZ0fHJpZ2h0fHRvcHxib3R0b218c3RhcnR8ZW5kKS8pXHJcbiAgICA/IHBvc2l0aW9uLnNwbGl0KCcgJylbMV0gfHwgJ2F1dG8nXHJcbiAgICA6IHBvc2l0aW9uO1xyXG5cclxuICAvLyBOb3JtYWxpemUgcGxhY2VtZW50cyB0aGF0IGhhdmUgaWRlbnRpY2FsIG1haW4gcGxhY2VtZW50IGFuZCB2YXJpYXRpb24gKFwicmlnaHQgcmlnaHRcIiA9PiBcInJpZ2h0XCIpLlxyXG4gIGNvbnN0IG1hdGNoZXMgPSBwbGFjZW1lbnQubWF0Y2goL14obGVmdHxyaWdodHx0b3B8Ym90dG9tfHN0YXJ0fGVuZCkqID8oPyFcXDEpKGxlZnR8cmlnaHR8dG9wfGJvdHRvbXxzdGFydHxlbmQpPy8pO1xyXG4gIGlmIChtYXRjaGVzKSB7XHJcbiAgICBwbGFjZW1lbnQgPSBtYXRjaGVzWzFdICsgKG1hdGNoZXNbMl0gPyBgICR7bWF0Y2hlc1syXX1gIDogJycpO1xyXG4gIH1cclxuXHJcbiAgLy8gXCJsZWZ0IHJpZ2h0XCIsIFwidG9wIGJvdHRvbVwiIGV0Yy4gcGxhY2VtZW50cyBhbHNvIGNvbnNpZGVyZWQgaW5jb3JyZWN0LlxyXG4gIGlmIChbJ2xlZnQgcmlnaHQnLCAncmlnaHQgbGVmdCcsICd0b3AgYm90dG9tJywgJ2JvdHRvbSB0b3AnXS5pbmRleE9mKHBsYWNlbWVudCkgIT09IC0xKSB7XHJcbiAgICBwbGFjZW1lbnQgPSAnYXV0byc7XHJcbiAgfVxyXG5cclxuICBwbGFjZW1lbnQgPSBjb21wdXRlQXV0b1BsYWNlbWVudChcclxuICAgIHBsYWNlbWVudCxcclxuICAgIGhvc3RFbFBvc2l0aW9uLFxyXG4gICAgdGFyZ2V0RWxlbWVudCxcclxuICAgIGhvc3RFbGVtZW50LFxyXG4gICAgb3B0aW9ucyA/IG9wdGlvbnMuYWxsb3dlZFBvc2l0aW9ucyA6IHVuZGVmaW5lZFxyXG4gICk7XHJcblxyXG4gIGNvbnN0IHRhcmdldE9mZnNldCA9IGdldFRhcmdldE9mZnNldHModGFyZ2V0RWxlbWVudCwgaG9zdEVsUG9zaXRpb24sIHBsYWNlbWVudCk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBvcHRpb25zOiBvcHRpb25zIHx8IHttb2RpZmllcnM6IHt9fSxcclxuICAgIGluc3RhbmNlOiB7XHJcbiAgICAgIHRhcmdldDogdGFyZ2V0RWxlbWVudCxcclxuICAgICAgaG9zdDogaG9zdEVsZW1lbnQsXHJcbiAgICAgIGFycm93OiB2b2lkIDBcclxuICAgIH0sXHJcbiAgICBvZmZzZXRzOiB7XHJcbiAgICAgIHRhcmdldDogdGFyZ2V0T2Zmc2V0LFxyXG4gICAgICBob3N0OiBob3N0RWxQb3NpdGlvbixcclxuICAgICAgYXJyb3c6IHZvaWQgMFxyXG4gICAgfSxcclxuICAgIHBvc2l0aW9uRml4ZWQ6IGZhbHNlLFxyXG4gICAgcGxhY2VtZW50LFxyXG4gICAgcGxhY2VtZW50QXV0b1xyXG4gIH07XHJcbn1cclxuIl19