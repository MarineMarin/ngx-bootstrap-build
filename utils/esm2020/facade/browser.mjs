/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * JS version of browser APIs. This library can only run in the browser.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const win = (typeof window !== 'undefined' && window) || {};
export { win as window };
export const document = win.document;
export const location = win.location;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const gc = win.gc ? () => win.gc() : () => null;
export const performance = win.performance ? win.performance : null;
export const Event = win.Event;
export const MouseEvent = win.MouseEvent;
export const KeyboardEvent = win.KeyboardEvent;
export const EventTarget = win.EventTarget;
export const History = win.History;
export const Location = win.Location;
export const EventListener = win.EventListener;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy91dGlscy9mYWNhZGUvYnJvd3Nlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSDs7R0FFRztBQUNILDhEQUE4RDtBQUM5RCxNQUFNLEdBQUcsR0FBRyxDQUFDLE9BQU8sTUFBTSxLQUFLLFdBQVcsSUFBSSxNQUFNLENBQUMsSUFBSSxFQUFTLENBQUM7QUFFbkUsT0FBTyxFQUFFLEdBQUcsSUFBSSxNQUFNLEVBQUUsQ0FBQztBQUN6QixNQUFNLENBQUMsTUFBTSxRQUFRLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQztBQUNyQyxNQUFNLENBQUMsTUFBTSxRQUFRLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQztBQUNyQyw4REFBOEQ7QUFDOUQsTUFBTSxDQUFDLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBUSxFQUFFLENBQUMsSUFBSSxDQUFDO0FBQzVELE1BQU0sQ0FBQyxNQUFNLFdBQVcsR0FBRyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7QUFDcEUsTUFBTSxDQUFDLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUM7QUFDL0IsTUFBTSxDQUFDLE1BQU0sVUFBVSxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUM7QUFDekMsTUFBTSxDQUFDLE1BQU0sYUFBYSxHQUFHLEdBQUcsQ0FBQyxhQUFhLENBQUM7QUFDL0MsTUFBTSxDQUFDLE1BQU0sV0FBVyxHQUFHLEdBQUcsQ0FBQyxXQUFXLENBQUM7QUFDM0MsTUFBTSxDQUFDLE1BQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUM7QUFDbkMsTUFBTSxDQUFDLE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUM7QUFDckMsTUFBTSxDQUFDLE1BQU0sYUFBYSxHQUFHLEdBQUcsQ0FBQyxhQUFhLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGxpY2Vuc2VcclxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbiAqXHJcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXHJcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcclxuICovXHJcblxyXG4vKipcclxuICogSlMgdmVyc2lvbiBvZiBicm93c2VyIEFQSXMuIFRoaXMgbGlicmFyeSBjYW4gb25seSBydW4gaW4gdGhlIGJyb3dzZXIuXHJcbiAqL1xyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxyXG5jb25zdCB3aW4gPSAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93KSB8fCB7fSBhcyBhbnk7XHJcblxyXG5leHBvcnQgeyB3aW4gYXMgd2luZG93IH07XHJcbmV4cG9ydCBjb25zdCBkb2N1bWVudCA9IHdpbi5kb2N1bWVudDtcclxuZXhwb3J0IGNvbnN0IGxvY2F0aW9uID0gd2luLmxvY2F0aW9uO1xyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxyXG5leHBvcnQgY29uc3QgZ2MgPSB3aW4uZ2MgPyAoKSA9PiB3aW4uZ2MoKSA6ICgpOiBhbnkgPT4gbnVsbDtcclxuZXhwb3J0IGNvbnN0IHBlcmZvcm1hbmNlID0gd2luLnBlcmZvcm1hbmNlID8gd2luLnBlcmZvcm1hbmNlIDogbnVsbDtcclxuZXhwb3J0IGNvbnN0IEV2ZW50ID0gd2luLkV2ZW50O1xyXG5leHBvcnQgY29uc3QgTW91c2VFdmVudCA9IHdpbi5Nb3VzZUV2ZW50O1xyXG5leHBvcnQgY29uc3QgS2V5Ym9hcmRFdmVudCA9IHdpbi5LZXlib2FyZEV2ZW50O1xyXG5leHBvcnQgY29uc3QgRXZlbnRUYXJnZXQgPSB3aW4uRXZlbnRUYXJnZXQ7XHJcbmV4cG9ydCBjb25zdCBIaXN0b3J5ID0gd2luLkhpc3Rvcnk7XHJcbmV4cG9ydCBjb25zdCBMb2NhdGlvbiA9IHdpbi5Mb2NhdGlvbjtcclxuZXhwb3J0IGNvbnN0IEV2ZW50TGlzdGVuZXIgPSB3aW4uRXZlbnRMaXN0ZW5lcjtcclxuIl19