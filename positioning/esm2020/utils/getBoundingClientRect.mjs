/**
 * Get bounding client rect of given element
 */
import { getStyleComputedProperty } from './getStyleComputedProperty';
import { getBordersSize } from './getBordersSize';
import { getWindowSizes } from './getWindowSizes';
import { getClientRect } from './getClientRect';
import { isNumber } from './isNumeric';
export function getBoundingClientRect(element) {
    const rect = element.getBoundingClientRect();
    // IE10 10 FIX: Please, don't ask, the element isn't
    // considered in DOM in some circumstances...
    // This isn't reproducible in IE10 compatibility mode of IE11
    // try {
    //   if (isIE(10)) {
    //     const scrollTop = getScroll(element, 'top');
    //     const scrollLeft = getScroll(element, 'left');
    //     if (rect && isNumber(rect.top) && isNumber(rect.left) && isNumber(rect.bottom) && isNumber(rect.right)) {
    //       rect.top += scrollTop;
    //       rect.left += scrollLeft;
    //       rect.bottom += scrollTop;
    //       rect.right += scrollLeft;
    //     }
    //   }
    // } catch (e) {
    //   return rect;
    // }
    if (!(rect && isNumber(rect.top) && isNumber(rect.left) && isNumber(rect.bottom) && isNumber(rect.right))) {
        return rect;
    }
    const result = {
        left: rect.left,
        top: rect.top,
        width: rect.right - rect.left,
        height: rect.bottom - rect.top
    };
    // subtract scrollbar size from sizes
    const sizes = element.nodeName === 'HTML' ? getWindowSizes(element.ownerDocument) : undefined;
    const width = sizes?.width || element.clientWidth
        || isNumber(rect.right) && isNumber(result.left) && rect.right - result.left || 0;
    const height = sizes?.height || element.clientHeight
        || isNumber(rect.bottom) && isNumber(result.top) && rect.bottom - result.top || 0;
    let horizScrollbar = element.offsetWidth - width;
    let vertScrollbar = element.offsetHeight - height;
    // if an hypothetical scrollbar is detected, we must be sure it's not a `border`
    // we make this check conditional for performance reasons
    if (horizScrollbar || vertScrollbar) {
        const styles = getStyleComputedProperty(element);
        horizScrollbar -= getBordersSize(styles, 'x');
        vertScrollbar -= getBordersSize(styles, 'y');
        result.width -= horizScrollbar;
        result.height -= vertScrollbar;
    }
    return getClientRect(result);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0Qm91bmRpbmdDbGllbnRSZWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3Bvc2l0aW9uaW5nL3V0aWxzL2dldEJvdW5kaW5nQ2xpZW50UmVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7R0FFRztBQUNILE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3RFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDbEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRWhELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFdkMsTUFBTSxVQUFVLHFCQUFxQixDQUFDLE9BQW9CO0lBQ3hELE1BQU0sSUFBSSxHQUFZLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO0lBRXRELG9EQUFvRDtJQUNwRCw2Q0FBNkM7SUFDN0MsNkRBQTZEO0lBQzdELFFBQVE7SUFDUixvQkFBb0I7SUFDcEIsbURBQW1EO0lBQ25ELHFEQUFxRDtJQUNyRCxnSEFBZ0g7SUFDaEgsK0JBQStCO0lBQy9CLGlDQUFpQztJQUNqQyxrQ0FBa0M7SUFDbEMsa0NBQWtDO0lBQ2xDLFFBQVE7SUFDUixNQUFNO0lBQ04sZ0JBQWdCO0lBQ2hCLGlCQUFpQjtJQUNqQixJQUFJO0lBRUosSUFBSSxDQUFDLENBQUMsSUFBSSxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUN6RyxPQUFPLElBQUksQ0FBQztLQUNiO0lBRUQsTUFBTSxNQUFNLEdBQVk7UUFDdEIsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1FBQ2YsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHO1FBQ2IsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUk7UUFDN0IsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUc7S0FDL0IsQ0FBQztJQUVGLHFDQUFxQztJQUNyQyxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsUUFBUSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0lBQzlGLE1BQU0sS0FBSyxHQUFHLEtBQUssRUFBRSxLQUFLLElBQUksT0FBTyxDQUFDLFdBQVc7V0FDNUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUM7SUFDcEYsTUFBTSxNQUFNLEdBQUcsS0FBSyxFQUFFLE1BQU0sSUFBSSxPQUFPLENBQUMsWUFBWTtXQUMvQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztJQUVwRixJQUFJLGNBQWMsR0FBRyxPQUFPLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztJQUNqRCxJQUFJLGFBQWEsR0FBRyxPQUFPLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQztJQUVsRCxnRkFBZ0Y7SUFDaEYseURBQXlEO0lBQ3pELElBQUksY0FBYyxJQUFJLGFBQWEsRUFBRTtRQUNuQyxNQUFNLE1BQU0sR0FBRyx3QkFBd0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNqRCxjQUFjLElBQUksY0FBYyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztRQUM5QyxhQUFhLElBQUksY0FBYyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztRQUU3QyxNQUFNLENBQUMsS0FBSyxJQUFJLGNBQWMsQ0FBQztRQUMvQixNQUFNLENBQUMsTUFBTSxJQUFJLGFBQWEsQ0FBQztLQUNoQztJQUVELE9BQU8sYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQy9CLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogR2V0IGJvdW5kaW5nIGNsaWVudCByZWN0IG9mIGdpdmVuIGVsZW1lbnRcclxuICovXHJcbmltcG9ydCB7IGdldFN0eWxlQ29tcHV0ZWRQcm9wZXJ0eSB9IGZyb20gJy4vZ2V0U3R5bGVDb21wdXRlZFByb3BlcnR5JztcclxuaW1wb3J0IHsgZ2V0Qm9yZGVyc1NpemUgfSBmcm9tICcuL2dldEJvcmRlcnNTaXplJztcclxuaW1wb3J0IHsgZ2V0V2luZG93U2l6ZXMgfSBmcm9tICcuL2dldFdpbmRvd1NpemVzJztcclxuaW1wb3J0IHsgZ2V0Q2xpZW50UmVjdCB9IGZyb20gJy4vZ2V0Q2xpZW50UmVjdCc7XHJcbmltcG9ydCB7IE9mZnNldHMgfSBmcm9tICcuLi9tb2RlbHMnO1xyXG5pbXBvcnQgeyBpc051bWJlciB9IGZyb20gJy4vaXNOdW1lcmljJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRCb3VuZGluZ0NsaWVudFJlY3QoZWxlbWVudDogSFRNTEVsZW1lbnQpOiBPZmZzZXRzIHtcclxuICBjb25zdCByZWN0OiBPZmZzZXRzID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHJcbiAgLy8gSUUxMCAxMCBGSVg6IFBsZWFzZSwgZG9uJ3QgYXNrLCB0aGUgZWxlbWVudCBpc24ndFxyXG4gIC8vIGNvbnNpZGVyZWQgaW4gRE9NIGluIHNvbWUgY2lyY3Vtc3RhbmNlcy4uLlxyXG4gIC8vIFRoaXMgaXNuJ3QgcmVwcm9kdWNpYmxlIGluIElFMTAgY29tcGF0aWJpbGl0eSBtb2RlIG9mIElFMTFcclxuICAvLyB0cnkge1xyXG4gIC8vICAgaWYgKGlzSUUoMTApKSB7XHJcbiAgLy8gICAgIGNvbnN0IHNjcm9sbFRvcCA9IGdldFNjcm9sbChlbGVtZW50LCAndG9wJyk7XHJcbiAgLy8gICAgIGNvbnN0IHNjcm9sbExlZnQgPSBnZXRTY3JvbGwoZWxlbWVudCwgJ2xlZnQnKTtcclxuICAvLyAgICAgaWYgKHJlY3QgJiYgaXNOdW1iZXIocmVjdC50b3ApICYmIGlzTnVtYmVyKHJlY3QubGVmdCkgJiYgaXNOdW1iZXIocmVjdC5ib3R0b20pICYmIGlzTnVtYmVyKHJlY3QucmlnaHQpKSB7XHJcbiAgLy8gICAgICAgcmVjdC50b3AgKz0gc2Nyb2xsVG9wO1xyXG4gIC8vICAgICAgIHJlY3QubGVmdCArPSBzY3JvbGxMZWZ0O1xyXG4gIC8vICAgICAgIHJlY3QuYm90dG9tICs9IHNjcm9sbFRvcDtcclxuICAvLyAgICAgICByZWN0LnJpZ2h0ICs9IHNjcm9sbExlZnQ7XHJcbiAgLy8gICAgIH1cclxuICAvLyAgIH1cclxuICAvLyB9IGNhdGNoIChlKSB7XHJcbiAgLy8gICByZXR1cm4gcmVjdDtcclxuICAvLyB9XHJcblxyXG4gIGlmICghKHJlY3QgJiYgaXNOdW1iZXIocmVjdC50b3ApICYmIGlzTnVtYmVyKHJlY3QubGVmdCkgJiYgaXNOdW1iZXIocmVjdC5ib3R0b20pICYmIGlzTnVtYmVyKHJlY3QucmlnaHQpKSkge1xyXG4gICAgcmV0dXJuIHJlY3Q7XHJcbiAgfVxyXG5cclxuICBjb25zdCByZXN1bHQ6IE9mZnNldHMgPSB7XHJcbiAgICBsZWZ0OiByZWN0LmxlZnQsXHJcbiAgICB0b3A6IHJlY3QudG9wLFxyXG4gICAgd2lkdGg6IHJlY3QucmlnaHQgLSByZWN0LmxlZnQsXHJcbiAgICBoZWlnaHQ6IHJlY3QuYm90dG9tIC0gcmVjdC50b3BcclxuICB9O1xyXG5cclxuICAvLyBzdWJ0cmFjdCBzY3JvbGxiYXIgc2l6ZSBmcm9tIHNpemVzXHJcbiAgY29uc3Qgc2l6ZXMgPSBlbGVtZW50Lm5vZGVOYW1lID09PSAnSFRNTCcgPyBnZXRXaW5kb3dTaXplcyhlbGVtZW50Lm93bmVyRG9jdW1lbnQpIDogdW5kZWZpbmVkO1xyXG4gIGNvbnN0IHdpZHRoID0gc2l6ZXM/LndpZHRoIHx8IGVsZW1lbnQuY2xpZW50V2lkdGhcclxuICAgIHx8IGlzTnVtYmVyKHJlY3QucmlnaHQpICYmIGlzTnVtYmVyKHJlc3VsdC5sZWZ0KSAmJiByZWN0LnJpZ2h0IC0gcmVzdWx0LmxlZnQgfHwgMDtcclxuICBjb25zdCBoZWlnaHQgPSBzaXplcz8uaGVpZ2h0IHx8IGVsZW1lbnQuY2xpZW50SGVpZ2h0XHJcbiAgICB8fCBpc051bWJlcihyZWN0LmJvdHRvbSkgJiYgaXNOdW1iZXIocmVzdWx0LnRvcCkgJiYgcmVjdC5ib3R0b20gLSByZXN1bHQudG9wIHx8IDA7XHJcblxyXG4gIGxldCBob3JpelNjcm9sbGJhciA9IGVsZW1lbnQub2Zmc2V0V2lkdGggLSB3aWR0aDtcclxuICBsZXQgdmVydFNjcm9sbGJhciA9IGVsZW1lbnQub2Zmc2V0SGVpZ2h0IC0gaGVpZ2h0O1xyXG5cclxuICAvLyBpZiBhbiBoeXBvdGhldGljYWwgc2Nyb2xsYmFyIGlzIGRldGVjdGVkLCB3ZSBtdXN0IGJlIHN1cmUgaXQncyBub3QgYSBgYm9yZGVyYFxyXG4gIC8vIHdlIG1ha2UgdGhpcyBjaGVjayBjb25kaXRpb25hbCBmb3IgcGVyZm9ybWFuY2UgcmVhc29uc1xyXG4gIGlmIChob3JpelNjcm9sbGJhciB8fCB2ZXJ0U2Nyb2xsYmFyKSB7XHJcbiAgICBjb25zdCBzdHlsZXMgPSBnZXRTdHlsZUNvbXB1dGVkUHJvcGVydHkoZWxlbWVudCk7XHJcbiAgICBob3JpelNjcm9sbGJhciAtPSBnZXRCb3JkZXJzU2l6ZShzdHlsZXMsICd4Jyk7XHJcbiAgICB2ZXJ0U2Nyb2xsYmFyIC09IGdldEJvcmRlcnNTaXplKHN0eWxlcywgJ3knKTtcclxuXHJcbiAgICByZXN1bHQud2lkdGggLT0gaG9yaXpTY3JvbGxiYXI7XHJcbiAgICByZXN1bHQuaGVpZ2h0IC09IHZlcnRTY3JvbGxiYXI7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gZ2V0Q2xpZW50UmVjdChyZXN1bHQpO1xyXG59XHJcbiJdfQ==