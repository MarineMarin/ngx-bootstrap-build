import { getBoundaries, isModifierEnabled } from '../utils';
export function preventOverflow(data) {
    if (!isModifierEnabled(data.options, 'preventOverflow')) {
        return data;
    }
    // NOTE: DOM access here
    // resets the target Offsets's position so that the document size can be calculated excluding
    // the size of the targetOffsets element itself
    const transformProp = 'transform';
    const targetStyles = data.instance.target.style; // assignment to help minification
    const { top, left, [transformProp]: transform } = targetStyles;
    targetStyles.top = '';
    targetStyles.left = '';
    targetStyles[transformProp] = '';
    const boundaries = getBoundaries(data.instance.target, data.instance.host, 0, // padding
    data.options.modifiers.preventOverflow?.boundariesElement || 'scrollParent', false // positionFixed
    );
    // NOTE: DOM access here
    // restores the original style properties after the offsets have been computed
    targetStyles.top = top;
    targetStyles.left = left;
    targetStyles[transformProp] = transform;
    const order = ['left', 'right', 'top', 'bottom'];
    const check = {
        primary(placement) {
            let value = data.offsets.target[placement];
            // options.escapeWithReference
            if ((data.offsets.target[placement] ?? 0) < (boundaries[placement] ?? 0)) {
                value = Math.max(data.offsets.target[placement] ?? 0, boundaries[placement] ?? 0);
            }
            return { [placement]: value };
        },
        secondary(placement) {
            const isPlacementHorizontal = placement === 'right';
            const mainSide = isPlacementHorizontal ? 'left' : 'top';
            const measurement = isPlacementHorizontal ? 'width' : 'height';
            let value = data.offsets.target[mainSide];
            // escapeWithReference
            if ((data.offsets.target[placement] ?? 0) > (boundaries[placement] ?? 0)) {
                value = Math.min(data.offsets.target[mainSide] ?? 0, (boundaries[placement] ?? 0) - data.offsets.target[measurement]);
            }
            return { [mainSide]: value };
        }
    };
    order.forEach((placement) => {
        const side = ['left', 'top', 'start'].indexOf(placement) !== -1 ? check['primary'] : check['secondary'];
        data.offsets.target = {
            ...data.offsets.target,
            ...side(placement)
        };
    });
    return data;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJldmVudE92ZXJmbG93LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3Bvc2l0aW9uaW5nL21vZGlmaWVycy9wcmV2ZW50T3ZlcmZsb3cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGFBQWEsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUc1RCxNQUFNLFVBQVUsZUFBZSxDQUFDLElBQVU7SUFDeEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsaUJBQWlCLENBQUMsRUFBRTtRQUN2RCxPQUFPLElBQUksQ0FBQztLQUNiO0lBRUQsd0JBQXdCO0lBQ3hCLDZGQUE2RjtJQUM3RiwrQ0FBK0M7SUFDL0MsTUFBTSxhQUFhLEdBQUcsV0FBVyxDQUFDO0lBQ2xDLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLGtDQUFrQztJQUNuRixNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLGFBQWEsQ0FBQyxFQUFFLFNBQVMsRUFBRSxHQUFHLFlBQVksQ0FBQztJQUMvRCxZQUFZLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztJQUN0QixZQUFZLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztJQUN2QixZQUFZLENBQUMsYUFBYSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBRWpDLE1BQU0sVUFBVSxHQUFHLGFBQWEsQ0FDOUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQ3BCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUNsQixDQUFDLEVBQUUsVUFBVTtJQUNiLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLGVBQWUsRUFBRSxpQkFBaUIsSUFBSSxjQUFjLEVBQzNFLEtBQUssQ0FBQyxnQkFBZ0I7S0FDdkIsQ0FBQztJQUVGLHdCQUF3QjtJQUN4Qiw4RUFBOEU7SUFDOUUsWUFBWSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7SUFDdkIsWUFBWSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDekIsWUFBWSxDQUFDLGFBQWEsQ0FBQyxHQUFHLFNBQVMsQ0FBQztJQUV4QyxNQUFNLEtBQUssR0FBRyxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBRWpELE1BQU0sS0FBSyxHQUFHO1FBQ1osT0FBTyxDQUFDLFNBQXdCO1lBQzlCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzNDLDhCQUE4QjtZQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7Z0JBQ3hFLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7YUFDbkY7WUFFRCxPQUFPLEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQztRQUNoQyxDQUFDO1FBQ0QsU0FBUyxDQUFDLFNBQXdCO1lBQ2hDLE1BQU0scUJBQXFCLEdBQUcsU0FBUyxLQUFLLE9BQU8sQ0FBQztZQUNwRCxNQUFNLFFBQVEsR0FBRyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDeEQsTUFBTSxXQUFXLEdBQUcscUJBQXFCLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO1lBQy9ELElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRTFDLHNCQUFzQjtZQUN0QixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7Z0JBQ3hFLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUNkLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFDbEMsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQ2hFLENBQUM7YUFDSDtZQUVELE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDO1FBQy9CLENBQUM7S0FDRixDQUFDO0lBRUYsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1FBQzFCLE1BQU0sSUFBSSxHQUFHLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRXhHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHO1lBQ3BCLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNO1lBQ3RCLEdBQUcsSUFBSSxDQUFDLFNBQTBCLENBQUM7U0FDcEMsQ0FBQztJQUNKLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0Qm91bmRhcmllcywgaXNNb2RpZmllckVuYWJsZWQgfSBmcm9tICcuLi91dGlscyc7XHJcbmltcG9ydCB7IERhdGEsIE9mZnNldHMgfSBmcm9tICcuLi9tb2RlbHMnO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHByZXZlbnRPdmVyZmxvdyhkYXRhOiBEYXRhKSB7XHJcbiAgaWYgKCFpc01vZGlmaWVyRW5hYmxlZChkYXRhLm9wdGlvbnMsICdwcmV2ZW50T3ZlcmZsb3cnKSkge1xyXG4gICAgcmV0dXJuIGRhdGE7XHJcbiAgfVxyXG5cclxuICAvLyBOT1RFOiBET00gYWNjZXNzIGhlcmVcclxuICAvLyByZXNldHMgdGhlIHRhcmdldCBPZmZzZXRzJ3MgcG9zaXRpb24gc28gdGhhdCB0aGUgZG9jdW1lbnQgc2l6ZSBjYW4gYmUgY2FsY3VsYXRlZCBleGNsdWRpbmdcclxuICAvLyB0aGUgc2l6ZSBvZiB0aGUgdGFyZ2V0T2Zmc2V0cyBlbGVtZW50IGl0c2VsZlxyXG4gIGNvbnN0IHRyYW5zZm9ybVByb3AgPSAndHJhbnNmb3JtJztcclxuICBjb25zdCB0YXJnZXRTdHlsZXMgPSBkYXRhLmluc3RhbmNlLnRhcmdldC5zdHlsZTsgLy8gYXNzaWdubWVudCB0byBoZWxwIG1pbmlmaWNhdGlvblxyXG4gIGNvbnN0IHsgdG9wLCBsZWZ0LCBbdHJhbnNmb3JtUHJvcF06IHRyYW5zZm9ybSB9ID0gdGFyZ2V0U3R5bGVzO1xyXG4gIHRhcmdldFN0eWxlcy50b3AgPSAnJztcclxuICB0YXJnZXRTdHlsZXMubGVmdCA9ICcnO1xyXG4gIHRhcmdldFN0eWxlc1t0cmFuc2Zvcm1Qcm9wXSA9ICcnO1xyXG5cclxuICBjb25zdCBib3VuZGFyaWVzID0gZ2V0Qm91bmRhcmllcyhcclxuICAgIGRhdGEuaW5zdGFuY2UudGFyZ2V0LFxyXG4gICAgZGF0YS5pbnN0YW5jZS5ob3N0LFxyXG4gICAgMCwgLy8gcGFkZGluZ1xyXG4gICAgZGF0YS5vcHRpb25zLm1vZGlmaWVycy5wcmV2ZW50T3ZlcmZsb3c/LmJvdW5kYXJpZXNFbGVtZW50IHx8ICdzY3JvbGxQYXJlbnQnLFxyXG4gICAgZmFsc2UgLy8gcG9zaXRpb25GaXhlZFxyXG4gICk7XHJcblxyXG4gIC8vIE5PVEU6IERPTSBhY2Nlc3MgaGVyZVxyXG4gIC8vIHJlc3RvcmVzIHRoZSBvcmlnaW5hbCBzdHlsZSBwcm9wZXJ0aWVzIGFmdGVyIHRoZSBvZmZzZXRzIGhhdmUgYmVlbiBjb21wdXRlZFxyXG4gIHRhcmdldFN0eWxlcy50b3AgPSB0b3A7XHJcbiAgdGFyZ2V0U3R5bGVzLmxlZnQgPSBsZWZ0O1xyXG4gIHRhcmdldFN0eWxlc1t0cmFuc2Zvcm1Qcm9wXSA9IHRyYW5zZm9ybTtcclxuXHJcbiAgY29uc3Qgb3JkZXIgPSBbJ2xlZnQnLCAncmlnaHQnLCAndG9wJywgJ2JvdHRvbSddO1xyXG5cclxuICBjb25zdCBjaGVjayA9IHtcclxuICAgIHByaW1hcnkocGxhY2VtZW50OiBrZXlvZiBPZmZzZXRzKSB7XHJcbiAgICAgIGxldCB2YWx1ZSA9IGRhdGEub2Zmc2V0cy50YXJnZXRbcGxhY2VtZW50XTtcclxuICAgICAgLy8gb3B0aW9ucy5lc2NhcGVXaXRoUmVmZXJlbmNlXHJcbiAgICAgIGlmICgoZGF0YS5vZmZzZXRzLnRhcmdldFtwbGFjZW1lbnRdID8/IDApIDwgKGJvdW5kYXJpZXNbcGxhY2VtZW50XSA/PyAwKSkge1xyXG4gICAgICAgIHZhbHVlID0gTWF0aC5tYXgoZGF0YS5vZmZzZXRzLnRhcmdldFtwbGFjZW1lbnRdID8/IDAsIGJvdW5kYXJpZXNbcGxhY2VtZW50XSA/PyAwKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHsgW3BsYWNlbWVudF06IHZhbHVlIH07XHJcbiAgICB9LFxyXG4gICAgc2Vjb25kYXJ5KHBsYWNlbWVudDoga2V5b2YgT2Zmc2V0cykge1xyXG4gICAgICBjb25zdCBpc1BsYWNlbWVudEhvcml6b250YWwgPSBwbGFjZW1lbnQgPT09ICdyaWdodCc7XHJcbiAgICAgIGNvbnN0IG1haW5TaWRlID0gaXNQbGFjZW1lbnRIb3Jpem9udGFsID8gJ2xlZnQnIDogJ3RvcCc7XHJcbiAgICAgIGNvbnN0IG1lYXN1cmVtZW50ID0gaXNQbGFjZW1lbnRIb3Jpem9udGFsID8gJ3dpZHRoJyA6ICdoZWlnaHQnO1xyXG4gICAgICBsZXQgdmFsdWUgPSBkYXRhLm9mZnNldHMudGFyZ2V0W21haW5TaWRlXTtcclxuXHJcbiAgICAgIC8vIGVzY2FwZVdpdGhSZWZlcmVuY2VcclxuICAgICAgaWYgKChkYXRhLm9mZnNldHMudGFyZ2V0W3BsYWNlbWVudF0gPz8gMCkgPiAoYm91bmRhcmllc1twbGFjZW1lbnRdID8/IDApKSB7XHJcbiAgICAgICAgdmFsdWUgPSBNYXRoLm1pbihcclxuICAgICAgICAgIGRhdGEub2Zmc2V0cy50YXJnZXRbbWFpblNpZGVdID8/IDAsXHJcbiAgICAgICAgICAoYm91bmRhcmllc1twbGFjZW1lbnRdID8/IDApIC0gZGF0YS5vZmZzZXRzLnRhcmdldFttZWFzdXJlbWVudF1cclxuICAgICAgICApO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4geyBbbWFpblNpZGVdOiB2YWx1ZSB9O1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIG9yZGVyLmZvckVhY2goKHBsYWNlbWVudCkgPT4ge1xyXG4gICAgY29uc3Qgc2lkZSA9IFsnbGVmdCcsICd0b3AnLCAnc3RhcnQnXS5pbmRleE9mKHBsYWNlbWVudCkgIT09IC0xID8gY2hlY2tbJ3ByaW1hcnknXSA6IGNoZWNrWydzZWNvbmRhcnknXTtcclxuXHJcbiAgICBkYXRhLm9mZnNldHMudGFyZ2V0ID0ge1xyXG4gICAgICAuLi5kYXRhLm9mZnNldHMudGFyZ2V0LFxyXG4gICAgICAuLi5zaWRlKHBsYWNlbWVudCBhcyBrZXlvZiBPZmZzZXRzKVxyXG4gICAgfTtcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIGRhdGE7XHJcbn1cclxuIl19