import { latinMap } from './latin-map';
export function latinize(str) {
    if (!str) {
        return '';
    }
    return str.replace(/[^A-Za-z0-9[\] ]/g, function (a) {
        return latinMap[a] || a;
    });
}
export function escapeRegexp(queryToEscape) {
    // Regex: capture the whole query string and replace it with the string
    // that will be used to match the results, for example if the capture is
    // 'a' the result will be \a
    return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
}
export function tokenize(str, wordRegexDelimiters = ' ', phraseRegexDelimiters = '', delimitersForMultipleSearch) {
    let result = [];
    if (!delimitersForMultipleSearch) {
        result = tokenizeWordsAndPhrases(str, wordRegexDelimiters, phraseRegexDelimiters);
    }
    else {
        const multipleSearchRegexStr = `([${delimitersForMultipleSearch}]+)`;
        const delimitedTokens = str.split(new RegExp(multipleSearchRegexStr, 'g'));
        const lastToken = delimitedTokens[delimitedTokens.length - 1];
        if (lastToken > '') {
            if (wordRegexDelimiters && phraseRegexDelimiters) {
                result = tokenizeWordsAndPhrases(lastToken, wordRegexDelimiters, phraseRegexDelimiters);
            }
            else {
                result.push(lastToken);
            }
        }
    }
    return result;
}
function tokenizeWordsAndPhrases(str, wordRegexDelimiters, phraseRegexDelimiters) {
    const result = [];
    const regexStr = `(?:[${phraseRegexDelimiters}])([^${phraseRegexDelimiters}]+)` +
        `(?:[${phraseRegexDelimiters}])|([^${wordRegexDelimiters}]+)`;
    const preTokenized = str.split(new RegExp(regexStr, 'g'));
    const preTokenizedLength = preTokenized.length;
    let token;
    const replacePhraseDelimiters = new RegExp(`[${phraseRegexDelimiters}]+`, 'g');
    for (let i = 0; i < preTokenizedLength; i += 1) {
        token = preTokenized[i];
        if (token && token.length && token !== wordRegexDelimiters) {
            result.push(token.replace(replacePhraseDelimiters, ''));
        }
    }
    return result;
}
// eslint-disable-next-line
export function getValueFromObject(object, option) {
    if (!option || typeof object !== 'object') {
        return object.toString();
    }
    if (option.endsWith('()')) {
        const functionName = option.slice(0, option.length - 2);
        return object[functionName]().toString();
    }
    const properties = option
        .replace(/\[(\w+)\]/g, '.$1')
        .replace(/^\./, '');
    const propertiesArray = properties.split('.');
    for (const property of propertiesArray) {
        if (property in object) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            object = object[property];
        }
    }
    if (!object) {
        return '';
    }
    return object.toString();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZWFoZWFkLXV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3R5cGVhaGVhZC90eXBlYWhlYWQtdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUV2QyxNQUFNLFVBQVUsUUFBUSxDQUFDLEdBQVc7SUFDbEMsSUFBSSxDQUFDLEdBQUcsRUFBRTtRQUNSLE9BQU8sRUFBRSxDQUFDO0tBQ1g7SUFFRCxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsbUJBQW1CLEVBQUUsVUFBUyxDQUFTO1FBQ3hELE9BQU8sUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxQixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFFRCxNQUFNLFVBQVUsWUFBWSxDQUFDLGFBQXFCO0lBQ2hELHVFQUF1RTtJQUN2RSx3RUFBd0U7SUFDeEUsNEJBQTRCO0lBQzVCLE9BQU8sYUFBYSxDQUFDLE9BQU8sQ0FBQyx3QkFBd0IsRUFBRSxNQUFNLENBQUMsQ0FBQztBQUNqRSxDQUFDO0FBRUQsTUFBTSxVQUFVLFFBQVEsQ0FBQyxHQUFXLEVBQ1gsbUJBQW1CLEdBQUcsR0FBRyxFQUN6QixxQkFBcUIsR0FBRyxFQUFFLEVBQUUsMkJBQW9DO0lBRXZGLElBQUksTUFBTSxHQUFhLEVBQUUsQ0FBQztJQUMxQixJQUFJLENBQUMsMkJBQTJCLEVBQUU7UUFDaEMsTUFBTSxHQUFHLHVCQUF1QixDQUFDLEdBQUcsRUFBRSxtQkFBbUIsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO0tBQ25GO1NBQU07UUFDTCxNQUFNLHNCQUFzQixHQUFHLEtBQUssMkJBQTJCLEtBQUssQ0FBQztRQUNyRSxNQUFNLGVBQWUsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLHNCQUFzQixFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDM0UsTUFBTSxTQUFTLEdBQUcsZUFBZSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDOUQsSUFBSSxTQUFTLEdBQUcsRUFBRSxFQUFFO1lBQ2xCLElBQUksbUJBQW1CLElBQUkscUJBQXFCLEVBQUU7Z0JBQ2hELE1BQU0sR0FBRyx1QkFBdUIsQ0FBQyxTQUFTLEVBQUUsbUJBQW1CLEVBQUUscUJBQXFCLENBQUMsQ0FBQzthQUN6RjtpQkFBTTtnQkFDTCxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQ3hCO1NBQ0Y7S0FDRjtJQUVELE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUFFRCxTQUFTLHVCQUF1QixDQUFDLEdBQVcsRUFBRSxtQkFBMkIsRUFBRSxxQkFBNkI7SUFDdEcsTUFBTSxNQUFNLEdBQWEsRUFBRSxDQUFDO0lBQzVCLE1BQU0sUUFBUSxHQUFHLE9BQU8scUJBQXFCLFFBQVEscUJBQXFCLEtBQUs7UUFDN0UsT0FBTyxxQkFBcUIsU0FBUyxtQkFBbUIsS0FBSyxDQUFDO0lBQ2hFLE1BQU0sWUFBWSxHQUFhLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDcEUsTUFBTSxrQkFBa0IsR0FBVyxZQUFZLENBQUMsTUFBTSxDQUFDO0lBQ3ZELElBQUksS0FBYSxDQUFDO0lBQ2xCLE1BQU0sdUJBQXVCLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxxQkFBcUIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBRS9FLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxrQkFBa0IsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQzlDLEtBQUssR0FBRyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEIsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLE1BQU0sSUFBSSxLQUFLLEtBQUssbUJBQW1CLEVBQUU7WUFDMUQsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLHVCQUF1QixFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDekQ7S0FDRjtJQUVELE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUFFRCwyQkFBMkI7QUFDM0IsTUFBTSxVQUFVLGtCQUFrQixDQUFDLE1BQTZDLEVBQUUsTUFBZTtJQUMvRixJQUFJLENBQUMsTUFBTSxJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsRUFBRTtRQUN6QyxPQUFPLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUMxQjtJQUVELElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUN6QixNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBRXhELE9BQVEsTUFBTSxDQUFDLFlBQVksQ0FBa0IsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQzVEO0lBRUQsTUFBTSxVQUFVLEdBQVcsTUFBTTtTQUM5QixPQUFPLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQztTQUM1QixPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3RCLE1BQU0sZUFBZSxHQUFhLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFeEQsS0FBSyxNQUFNLFFBQVEsSUFBSSxlQUFlLEVBQUU7UUFDdEMsSUFBSSxRQUFRLElBQUssTUFBa0MsRUFBRTtZQUNuRCw2REFBNkQ7WUFDN0QsYUFBYTtZQUNiLE1BQU0sR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDM0I7S0FDRjtJQUNELElBQUksQ0FBQyxNQUFNLEVBQUU7UUFDWCxPQUFPLEVBQUUsQ0FBQztLQUNYO0lBRUQsT0FBTyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDM0IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGxhdGluTWFwIH0gZnJvbSAnLi9sYXRpbi1tYXAnO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGxhdGluaXplKHN0cjogc3RyaW5nKTogc3RyaW5nIHtcclxuICBpZiAoIXN0cikge1xyXG4gICAgcmV0dXJuICcnO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9bXkEtWmEtejAtOVtcXF0gXS9nLCBmdW5jdGlvbihhOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIGxhdGluTWFwW2FdIHx8IGE7XHJcbiAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBlc2NhcGVSZWdleHAocXVlcnlUb0VzY2FwZTogc3RyaW5nKTogc3RyaW5nIHtcclxuICAvLyBSZWdleDogY2FwdHVyZSB0aGUgd2hvbGUgcXVlcnkgc3RyaW5nIGFuZCByZXBsYWNlIGl0IHdpdGggdGhlIHN0cmluZ1xyXG4gIC8vIHRoYXQgd2lsbCBiZSB1c2VkIHRvIG1hdGNoIHRoZSByZXN1bHRzLCBmb3IgZXhhbXBsZSBpZiB0aGUgY2FwdHVyZSBpc1xyXG4gIC8vICdhJyB0aGUgcmVzdWx0IHdpbGwgYmUgXFxhXHJcbiAgcmV0dXJuIHF1ZXJ5VG9Fc2NhcGUucmVwbGFjZSgvKFsuPyorXiRbXFxdXFxcXCgpe318LV0pL2csICdcXFxcJDEnKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHRva2VuaXplKHN0cjogc3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgd29yZFJlZ2V4RGVsaW1pdGVycyA9ICcgJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgIHBocmFzZVJlZ2V4RGVsaW1pdGVycyA9ICcnLCBkZWxpbWl0ZXJzRm9yTXVsdGlwbGVTZWFyY2g/OiBzdHJpbmcpOiBBcnJheTxzdHJpbmc+IHtcclxuXHJcbiAgbGV0IHJlc3VsdDogc3RyaW5nW10gPSBbXTtcclxuICBpZiAoIWRlbGltaXRlcnNGb3JNdWx0aXBsZVNlYXJjaCkge1xyXG4gICAgcmVzdWx0ID0gdG9rZW5pemVXb3Jkc0FuZFBocmFzZXMoc3RyLCB3b3JkUmVnZXhEZWxpbWl0ZXJzLCBwaHJhc2VSZWdleERlbGltaXRlcnMpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBjb25zdCBtdWx0aXBsZVNlYXJjaFJlZ2V4U3RyID0gYChbJHtkZWxpbWl0ZXJzRm9yTXVsdGlwbGVTZWFyY2h9XSspYDtcclxuICAgIGNvbnN0IGRlbGltaXRlZFRva2VucyA9IHN0ci5zcGxpdChuZXcgUmVnRXhwKG11bHRpcGxlU2VhcmNoUmVnZXhTdHIsICdnJykpO1xyXG4gICAgY29uc3QgbGFzdFRva2VuID0gZGVsaW1pdGVkVG9rZW5zW2RlbGltaXRlZFRva2Vucy5sZW5ndGggLSAxXTtcclxuICAgIGlmIChsYXN0VG9rZW4gPiAnJykge1xyXG4gICAgICBpZiAod29yZFJlZ2V4RGVsaW1pdGVycyAmJiBwaHJhc2VSZWdleERlbGltaXRlcnMpIHtcclxuICAgICAgICByZXN1bHQgPSB0b2tlbml6ZVdvcmRzQW5kUGhyYXNlcyhsYXN0VG9rZW4sIHdvcmRSZWdleERlbGltaXRlcnMsIHBocmFzZVJlZ2V4RGVsaW1pdGVycyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVzdWx0LnB1c2gobGFzdFRva2VuKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZnVuY3Rpb24gdG9rZW5pemVXb3Jkc0FuZFBocmFzZXMoc3RyOiBzdHJpbmcsIHdvcmRSZWdleERlbGltaXRlcnM6IHN0cmluZywgcGhyYXNlUmVnZXhEZWxpbWl0ZXJzOiBzdHJpbmcpOiBBcnJheTxzdHJpbmc+IHtcclxuICBjb25zdCByZXN1bHQ6IHN0cmluZ1tdID0gW107XHJcbiAgY29uc3QgcmVnZXhTdHIgPSBgKD86WyR7cGhyYXNlUmVnZXhEZWxpbWl0ZXJzfV0pKFteJHtwaHJhc2VSZWdleERlbGltaXRlcnN9XSspYCArXHJcbiAgICBgKD86WyR7cGhyYXNlUmVnZXhEZWxpbWl0ZXJzfV0pfChbXiR7d29yZFJlZ2V4RGVsaW1pdGVyc31dKylgO1xyXG4gIGNvbnN0IHByZVRva2VuaXplZDogc3RyaW5nW10gPSBzdHIuc3BsaXQobmV3IFJlZ0V4cChyZWdleFN0ciwgJ2cnKSk7XHJcbiAgY29uc3QgcHJlVG9rZW5pemVkTGVuZ3RoOiBudW1iZXIgPSBwcmVUb2tlbml6ZWQubGVuZ3RoO1xyXG4gIGxldCB0b2tlbjogc3RyaW5nO1xyXG4gIGNvbnN0IHJlcGxhY2VQaHJhc2VEZWxpbWl0ZXJzID0gbmV3IFJlZ0V4cChgWyR7cGhyYXNlUmVnZXhEZWxpbWl0ZXJzfV0rYCwgJ2cnKTtcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcmVUb2tlbml6ZWRMZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgdG9rZW4gPSBwcmVUb2tlbml6ZWRbaV07XHJcbiAgICBpZiAodG9rZW4gJiYgdG9rZW4ubGVuZ3RoICYmIHRva2VuICE9PSB3b3JkUmVnZXhEZWxpbWl0ZXJzKSB7XHJcbiAgICAgIHJlc3VsdC5wdXNoKHRva2VuLnJlcGxhY2UocmVwbGFjZVBocmFzZURlbGltaXRlcnMsICcnKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcclxuZXhwb3J0IGZ1bmN0aW9uIGdldFZhbHVlRnJvbU9iamVjdChvYmplY3Q6IHN0cmluZyB8IFJlY29yZDxzdHJpbmcgfCBudW1iZXIsIGFueT4sIG9wdGlvbj86IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgaWYgKCFvcHRpb24gfHwgdHlwZW9mIG9iamVjdCAhPT0gJ29iamVjdCcpIHtcclxuICAgIHJldHVybiBvYmplY3QudG9TdHJpbmcoKTtcclxuICB9XHJcblxyXG4gIGlmIChvcHRpb24uZW5kc1dpdGgoJygpJykpIHtcclxuICAgIGNvbnN0IGZ1bmN0aW9uTmFtZSA9IG9wdGlvbi5zbGljZSgwLCBvcHRpb24ubGVuZ3RoIC0gMik7XHJcblxyXG4gICAgcmV0dXJuIChvYmplY3RbZnVuY3Rpb25OYW1lXSBhcyAoKSA9PiBzdHJpbmcpKCkudG9TdHJpbmcoKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHByb3BlcnRpZXM6IHN0cmluZyA9IG9wdGlvblxyXG4gICAgLnJlcGxhY2UoL1xcWyhcXHcrKVxcXS9nLCAnLiQxJylcclxuICAgIC5yZXBsYWNlKC9eXFwuLywgJycpO1xyXG4gIGNvbnN0IHByb3BlcnRpZXNBcnJheTogc3RyaW5nW10gPSBwcm9wZXJ0aWVzLnNwbGl0KCcuJyk7XHJcblxyXG4gIGZvciAoY29uc3QgcHJvcGVydHkgb2YgcHJvcGVydGllc0FycmF5KSB7XHJcbiAgICBpZiAocHJvcGVydHkgaW4gKG9iamVjdCBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPikpIHtcclxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9iYW4tdHMtY29tbWVudFxyXG4gICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgIG9iamVjdCA9IG9iamVjdFtwcm9wZXJ0eV07XHJcbiAgICB9XHJcbiAgfVxyXG4gIGlmICghb2JqZWN0KSB7XHJcbiAgICByZXR1cm4gJyc7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gb2JqZWN0LnRvU3RyaW5nKCk7XHJcbn1cclxuIl19