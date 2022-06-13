import { findCommonOffsetParent } from './findCommonOffsetParent';
import { getFixedPositionOffsetParent } from './getFixedPositionOffsetParent';
import { getOffsetRectRelativeToArbitraryNode } from './getOffsetRectRelativeToArbitraryNode';
import { getParentNode } from './getParentNode';
import { getScrollParent } from './getScrollParent';
import { getViewportOffsetRectRelativeToArtbitraryNode } from './getViewportOffsetRectRelativeToArtbitraryNode';
import { getWindowSizes } from './getWindowSizes';
import { isFixed } from './isFixed';
import { isNumber } from './isNumeric';
export function getBoundaries(target, host, padding = 0, boundariesElement, fixedPosition = false) {
    // NOTE: 1 DOM access here
    let boundaries = { top: 0, left: 0 };
    const offsetParent = fixedPosition ? getFixedPositionOffsetParent(target) : findCommonOffsetParent(target, host);
    // Handle viewport case
    if (boundariesElement === 'viewport') {
        boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent, fixedPosition);
    }
    else {
        // Handle other cases based on DOM element used as boundaries
        let boundariesNode;
        if (boundariesElement === 'scrollParent') {
            boundariesNode = getScrollParent(getParentNode(host));
            if (boundariesNode.nodeName === 'BODY') {
                boundariesNode = target.ownerDocument.documentElement;
            }
        }
        else if (boundariesElement === 'window') {
            boundariesNode = target.ownerDocument.documentElement;
        }
        else {
            boundariesNode = boundariesElement;
        }
        const offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent, fixedPosition);
        // In case of HTML, we need a different computation
        if (offsets && boundariesNode.nodeName === 'HTML' && !isFixed(offsetParent)) {
            const { height, width } = getWindowSizes(target.ownerDocument);
            if (isNumber(boundaries.top) && isNumber(offsets.top) && isNumber(offsets.marginTop)) {
                boundaries.top += offsets.top - offsets.marginTop;
            }
            if (isNumber(boundaries.top)) {
                boundaries.bottom = Number(height) + Number(offsets.top);
            }
            if (isNumber(boundaries.left) && isNumber(offsets.left) && isNumber(offsets.marginLeft)) {
                boundaries.left += offsets.left - offsets.marginLeft;
            }
            if (isNumber(boundaries.top)) {
                boundaries.right = Number(width) + Number(offsets.left);
            }
        }
        else if (offsets) {
            // for all the other DOM elements, this one is good
            boundaries = offsets;
        }
    }
    // Add paddings
    if (isNumber(boundaries.left)) {
        boundaries.left += padding;
    }
    if (isNumber(boundaries.top)) {
        boundaries.top += padding;
    }
    if (isNumber(boundaries.right)) {
        boundaries.right -= padding;
    }
    if (isNumber(boundaries.bottom)) {
        boundaries.bottom -= padding;
    }
    return boundaries;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0Qm91bmRhcmllcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9wb3NpdGlvbmluZy91dGlscy9nZXRCb3VuZGFyaWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUlBLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzlFLE9BQU8sRUFBRSxvQ0FBb0MsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQzlGLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNoRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDcEQsT0FBTyxFQUFFLDZDQUE2QyxFQUFFLE1BQU0saURBQWlELENBQUM7QUFDaEgsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDcEMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUV2QyxNQUFNLFVBQVUsYUFBYSxDQUMzQixNQUFtQixFQUNuQixJQUFpQixFQUNqQixPQUFPLEdBQUcsQ0FBQyxFQUNYLGlCQUF5QixFQUN6QixhQUFhLEdBQUcsS0FBSztJQUVyQiwwQkFBMEI7SUFFMUIsSUFBSSxVQUFVLEdBQXFCLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDdkQsTUFBTSxZQUFZLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyw0QkFBNEIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsc0JBQXNCLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBRWpILHVCQUF1QjtJQUN2QixJQUFJLGlCQUFpQixLQUFLLFVBQVUsRUFBRTtRQUNwQyxVQUFVLEdBQUcsNkNB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dHMgYW5kIHJldHVybiB0aGVtXHJcbiAqL1xyXG5pbXBvcnQgeyBPZmZzZXRzIH0gZnJvbSAnLi4vbW9kZWxzJztcclxuaW1wb3J0IHsgZmluZENvbW1vbk9mZnNldFBhcmVudCB9IGZyb20gJy4vZmluZENvbW1vbk9mZnNldFBhcmVudCc7XHJcbmltcG9ydCB7IGdldEZpeGVkUG9zaXRpb25PZmZzZXRQYXJlbnQgfSBmcm9tICcuL2dldEZpeGVkUG9zaXRpb25PZmZzZXRQYXJlbnQnO1xyXG5pbXBvcnQgeyBnZXRPZmZzZXRSZWN0UmVsYXRpdmVUb0FyYml0cmFyeU5vZGUgfSBmcm9tICcuL2dldE9mZnNldFJlY3RSZWxhdGl2ZVRvQXJiaXRyYXJ5Tm9kZSc7XHJcbmltcG9ydCB7IGdldFBhcmVudE5vZGUgfSBmcm9tICcuL2dldFBhcmVudE5vZGUnO1xyXG5pbXBvcnQgeyBnZXRTY3JvbGxQYXJlbnQgfSBmcm9tICcuL2dldFNjcm9sbFBhcmVudCc7XHJcbmltcG9ydCB7IGdldFZpZXdwb3J0T2Zmc2V0UmVjdFJlbGF0aXZlVG9BcnRiaXRyYXJ5Tm9kZSB9IGZyb20gJy4vZ2V0Vmlld3BvcnRPZmZzZXRSZWN0UmVsYXRpdmVUb0FydGJpdHJhcnlOb2RlJztcclxuaW1wb3J0IHsgZ2V0V2luZG93U2l6ZXMgfSBmcm9tICcuL2dldFdpbmRvd1NpemVzJztcclxuaW1wb3J0IHsgaXNGaXhlZCB9IGZyb20gJy4vaXNGaXhlZCc7XHJcbmltcG9ydCB7IGlzTnVtYmVyIH0gZnJvbSAnLi9pc051bWVyaWMnO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEJvdW5kYXJpZXMoXHJcbiAgdGFyZ2V0OiBIVE1MRWxlbWVudCxcclxuICBob3N0OiBIVE1MRWxlbWVudCxcclxuICBwYWRkaW5nID0gMCxcclxuICBib3VuZGFyaWVzRWxlbWVudDogc3RyaW5nLFxyXG4gIGZpeGVkUG9zaXRpb24gPSBmYWxzZVxyXG4pOiBQYXJ0aWFsPE9mZnNldHM+IHtcclxuICAvLyBOT1RFOiAxIERPTSBhY2Nlc3MgaGVyZVxyXG5cclxuICBsZXQgYm91bmRhcmllczogUGFydGlhbDxPZmZzZXRzPiA9IHsgdG9wOiAwLCBsZWZ0OiAwIH07XHJcbiAgY29uc3Qgb2Zmc2V0UGFyZW50ID0gZml4ZWRQb3NpdGlvbiA/IGdldEZpeGVkUG9zaXRpb25PZmZzZXRQYXJlbnQodGFyZ2V0KSA6IGZpbmRDb21tb25PZmZzZXRQYXJlbnQodGFyZ2V0LCBob3N0KTtcclxuXHJcbiAgLy8gSGFuZGxlIHZpZXdwb3J0IGNhc2VcclxuICBpZiAoYm91bmRhcmllc0VsZW1lbnQgPT09ICd2aWV3cG9ydCcpIHtcclxuICAgIGJvdW5kYXJpZXMgPSBnZXRWaWV3cG9ydE9mZnNldFJlY3RSZWxhdGl2ZVRvQXJ0Yml0cmFyeU5vZGUob2Zmc2V0UGFyZW50LCBmaXhlZFBvc2l0aW9uKTtcclxuICB9IGVsc2Uge1xyXG4gICAgLy8gSGFuZGxlIG90aGVyIGNhc2VzIGJhc2VkIG9uIERPTSBlbGVtZW50IHVzZWQgYXMgYm91bmRhcmllc1xyXG4gICAgbGV0IGJvdW5kYXJpZXNOb2RlO1xyXG4gICAgaWYgKGJvdW5kYXJpZXNFbGVtZW50ID09PSAnc2Nyb2xsUGFyZW50Jykge1xyXG4gICAgICBib3VuZGFyaWVzTm9kZSA9IGdldFNjcm9sbFBhcmVudChnZXRQYXJlbnROb2RlKGhvc3QpKTtcclxuICAgICAgaWYgKGJvdW5kYXJpZXNOb2RlLm5vZGVOYW1lID09PSAnQk9EWScpIHtcclxuICAgICAgICBib3VuZGFyaWVzTm9kZSA9IHRhcmdldC5vd25lckRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChib3VuZGFyaWVzRWxlbWVudCA9PT0gJ3dpbmRvdycpIHtcclxuICAgICAgYm91bmRhcmllc05vZGUgPSB0YXJnZXQub3duZXJEb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBib3VuZGFyaWVzTm9kZSA9IGJvdW5kYXJpZXNFbGVtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG9mZnNldHMgPSBnZXRPZmZzZXRSZWN0UmVsYXRpdmVUb0FyYml0cmFyeU5vZGUoXHJcbiAgICAgIGJvdW5kYXJpZXNOb2RlLFxyXG4gICAgICBvZmZzZXRQYXJlbnQsXHJcbiAgICAgIGZpeGVkUG9zaXRpb25cclxuICAgICk7XHJcblxyXG4gICAgLy8gSW4gY2FzZSBvZiBIVE1MLCB3ZSBuZWVkIGEgZGlmZmVyZW50IGNvbXB1dGF0aW9uXHJcbiAgICBpZiAob2Zmc2V0cyAmJiBib3VuZGFyaWVzTm9kZS5ub2RlTmFtZSA9PT0gJ0hUTUwnICYmICFpc0ZpeGVkKG9mZnNldFBhcmVudCkpIHtcclxuICAgICAgY29uc3QgeyBoZWlnaHQsIHdpZHRoIH0gPSBnZXRXaW5kb3dTaXplcyh0YXJnZXQub3duZXJEb2N1bWVudCk7XHJcbiAgICAgIGlmIChpc051bWJlcihib3VuZGFyaWVzLnRvcCkgJiYgaXNOdW1iZXIob2Zmc2V0cy50b3ApICYmIGlzTnVtYmVyKG9mZnNldHMubWFyZ2luVG9wKSkge1xyXG4gICAgICAgIGJvdW5kYXJpZXMudG9wICs9IG9mZnNldHMudG9wIC0gb2Zmc2V0cy5tYXJnaW5Ub3A7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGlzTnVtYmVyKGJvdW5kYXJpZXMudG9wKSkge1xyXG4gICAgICAgIGJvdW5kYXJpZXMuYm90dG9tID0gTnVtYmVyKGhlaWdodCkgKyBOdW1iZXIob2Zmc2V0cy50b3ApO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChpc051bWJlcihib3VuZGFyaWVzLmxlZnQpICYmIGlzTnVtYmVyKG9mZnNldHMubGVmdCkgJiYgaXNOdW1iZXIob2Zmc2V0cy5tYXJnaW5MZWZ0KSkge1xyXG4gICAgICAgIGJvdW5kYXJpZXMubGVmdCArPSBvZmZzZXRzLmxlZnQgLSBvZmZzZXRzLm1hcmdpbkxlZnQ7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGlzTnVtYmVyKGJvdW5kYXJpZXMudG9wKSkge1xyXG4gICAgICAgIGJvdW5kYXJpZXMucmlnaHQgPSBOdW1iZXIod2lkdGgpICsgTnVtYmVyKG9mZnNldHMubGVmdCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAob2Zmc2V0cykge1xyXG4gICAgICAvLyBmb3IgYWxsIHRoZSBvdGhlciBET00gZWxlbWVudHMsIHRoaXMgb25lIGlzIGdvb2RcclxuICAgICAgYm91bmRhcmllcyA9IG9mZnNldHM7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBBZGQgcGFkZGluZ3NcclxuICBpZiAoaXNOdW1iZXIoYm91bmRhcmllcy5sZWZ0KSkge1xyXG4gICAgYm91bmRhcmllcy5sZWZ0ICs9IHBhZGRpbmc7XHJcbiAgfVxyXG4gIGlmIChpc051bWJlcihib3VuZGFyaWVzLnRvcCkpIHtcclxuICAgIGJvdW5kYXJpZXMudG9wICs9IHBhZGRpbmc7XHJcbiAgfVxyXG4gIGlmIChpc051bWJlcihib3VuZGFyaWVzLnJpZ2h0KSkge1xyXG4gICAgYm91bmRhcmllcy5yaWdodCAtPSBwYWRkaW5nO1xyXG4gIH1cclxuICBpZiAoaXNOdW1iZXIoYm91bmRhcmllcy5ib3R0b20pKSB7XHJcbiAgICBib3VuZGFyaWVzLmJvdHRvbSAtPSBwYWRkaW5nO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGJvdW5kYXJpZXM7XHJcbn1cclxuIl19