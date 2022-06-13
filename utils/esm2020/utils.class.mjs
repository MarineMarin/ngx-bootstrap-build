import { window } from './facade/browser';
import { currentBsVersion } from './theme-provider';
export class Utils {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static reflow(element) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ((bs) => bs)(element.offsetHeight);
    }
    // source: https://github.com/jquery/jquery/blob/master/src/css/var/getStyles.js
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static getStyles(elem) {
        // Support: IE <=11 only, Firefox <=30 (#15098, #14150)
        // IE throws on elements created in popups
        // FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
        let view = elem.ownerDocument.defaultView;
        if (!view || !view.opener) {
            view = window;
        }
        return view.getComputedStyle(elem);
    }
    static stackOverflowConfig() {
        const bsVer = currentBsVersion();
        return {
            crossorigin: bsVer !== 'bs3' ? "anonymous" : undefined,
            integrity: bsVer === 'bs5' ? 'sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We' : bsVer === 'bs4' ? 'sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2' : undefined,
            cdnLink: bsVer === 'bs5' ? 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css' : bsVer === 'bs4' ? 'https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css' : 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuY2xhc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdXRpbHMvdXRpbHMuY2xhc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQzFDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRXBELE1BQU0sT0FBTyxLQUFLO0lBQ2hCLDhEQUE4RDtJQUM5RCxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQVk7UUFDeEIsOERBQThEO1FBQzlELENBQUMsQ0FBQyxFQUFPLEVBQVEsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQsZ0ZBQWdGO0lBQ2hGLDhEQUE4RDtJQUM5RCxNQUFNLENBQUMsU0FBUyxDQUFDLElBQVM7UUFDeEIsdURBQXVEO1FBQ3ZELDBDQUEwQztRQUMxQywrRUFBK0U7UUFDL0UsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUM7UUFFMUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDekIsSUFBSSxHQUFHLE1BQU0sQ0FBQztTQUNmO1FBRUQsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVBLE1BQU0sQ0FBQyxtQkFBbUI7UUFDekIsTUFBTSxLQUFLLEdBQUcsZ0JBQWdCLEVBQUUsQ0FBQztRQUMvQixPQUFPO1lBQ1AsV0FBVyxFQUFFLEtBQUssS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsU0FBUztZQUN0RCxTQUFTLEVBQUUsS0FBSyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMseUVBQXlFLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLHlFQUF5RSxDQUFDLENBQUMsQ0FBQyxTQUFTO1lBQ2hOLE9BQU8sRUFBRSxLQUFLLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyx5RUFBeUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMseUVBQXlFLENBQUMsQ0FBQyxDQUFDLHVFQUF1RTtTQUM3USxDQUFDO0lBQ0gsQ0FBQztDQUNIIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgd2luZG93IH0gZnJvbSAnLi9mYWNhZGUvYnJvd3Nlcic7XHJcbmltcG9ydCB7IGN1cnJlbnRCc1ZlcnNpb24gfSBmcm9tICcuL3RoZW1lLXByb3ZpZGVyJztcclxuXHJcbmV4cG9ydCBjbGFzcyBVdGlscyB7XHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuICBzdGF0aWMgcmVmbG93KGVsZW1lbnQ6IGFueSk6IHZvaWQge1xyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuICAgICgoYnM6IGFueSk6IHZvaWQgPT4gYnMpKGVsZW1lbnQub2Zmc2V0SGVpZ2h0KTtcclxuICB9XHJcblxyXG4gIC8vIHNvdXJjZTogaHR0cHM6Ly9naXRodWIuY29tL2pxdWVyeS9qcXVlcnkvYmxvYi9tYXN0ZXIvc3JjL2Nzcy92YXIvZ2V0U3R5bGVzLmpzXHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuICBzdGF0aWMgZ2V0U3R5bGVzKGVsZW06IGFueSk6IGFueSB7XHJcbiAgICAvLyBTdXBwb3J0OiBJRSA8PTExIG9ubHksIEZpcmVmb3ggPD0zMCAoIzE1MDk4LCAjMTQxNTApXHJcbiAgICAvLyBJRSB0aHJvd3Mgb24gZWxlbWVudHMgY3JlYXRlZCBpbiBwb3B1cHNcclxuICAgIC8vIEZGIG1lYW53aGlsZSB0aHJvd3Mgb24gZnJhbWUgZWxlbWVudHMgdGhyb3VnaCBcImRlZmF1bHRWaWV3LmdldENvbXB1dGVkU3R5bGVcIlxyXG4gICAgbGV0IHZpZXcgPSBlbGVtLm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXc7XHJcblxyXG4gICAgaWYgKCF2aWV3IHx8ICF2aWV3Lm9wZW5lcikge1xyXG4gICAgICB2aWV3ID0gd2luZG93O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB2aWV3LmdldENvbXB1dGVkU3R5bGUoZWxlbSk7XHJcbiAgfVxyXG5cclxuICAgc3RhdGljIHN0YWNrT3ZlcmZsb3dDb25maWcoKTogeyBjcm9zc29yaWdpbj86IHN0cmluZywgaW50ZWdyaXR5Pzogc3RyaW5nLCBjZG5MaW5rOiBzdHJpbmcgfSB7XHJcbiAgICBjb25zdCBic1ZlciA9IGN1cnJlbnRCc1ZlcnNpb24oKTtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgY3Jvc3NvcmlnaW46IGJzVmVyICE9PSAnYnMzJyA/IFwiYW5vbnltb3VzXCIgOiB1bmRlZmluZWQsXHJcbiAgICAgIGludGVncml0eTogYnNWZXIgPT09ICdiczUnID8gJ3NoYTM4NC1LeVpYRUFnM1FocUxNcEc4cis4ZmhBWExSazJ2dm9DMmYzQjA5elZYbjhDQTVRSVZmWk9KM0JDc3cyUDBwL1dlJyA6IGJzVmVyID09PSAnYnM0JyA/ICdzaGEzODQtVFg4dDI3RWNSRTNlL2loVTd6bVF4Vm5jREF5NXVJS3o0ckVrZ0lYZU1lZDRNMGpsZklEUHZnNnVxS0kyeFhyMicgOiB1bmRlZmluZWQsXHJcbiAgICAgIGNkbkxpbms6IGJzVmVyID09PSAnYnM1JyA/ICdodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvbnBtL2Jvb3RzdHJhcEA1LjEuMC9kaXN0L2Nzcy9ib290c3RyYXAubWluLmNzcycgOiBic1ZlciA9PT0gJ2JzNCcgPyAnaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L25wbS9ib290c3RyYXBANC41LjMvZGlzdC9jc3MvYm9vdHN0cmFwLm1pbi5jc3MnIDogJ2h0dHBzOi8vbWF4Y2RuLmJvb3RzdHJhcGNkbi5jb20vYm9vdHN0cmFwLzMuMy43L2Nzcy9ib290c3RyYXAubWluLmNzcycsXHJcbiAgICB9O1xyXG4gICB9XHJcbn1cclxuIl19