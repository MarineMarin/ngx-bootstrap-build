export function getClientRect(offsets) {
    return {
        ...offsets,
        right: (offsets.left || 0) + offsets.width,
        bottom: (offsets.top || 0) + offsets.height
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0Q2xpZW50UmVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9wb3NpdGlvbmluZy91dGlscy9nZXRDbGllbnRSZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUtBLE1BQU0sVUFBVSxhQUFhLENBQUMsT0FBZ0I7SUFDNUMsT0FBTztRQUNMLEdBQUcsT0FBTztRQUNWLEtBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLEtBQUs7UUFDMUMsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTTtLQUM1QyxDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBHaXZlbiBlbGVtZW50IG9mZnNldHMsIGdlbmVyYXRlIGFuIG91dHB1dCBzaW1pbGFyIHRvIGdldEJvdW5kaW5nQ2xpZW50UmVjdFxyXG4gKi9cclxuaW1wb3J0IHsgT2Zmc2V0cyB9IGZyb20gJy4uL21vZGVscyc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q2xpZW50UmVjdChvZmZzZXRzOiBPZmZzZXRzKTogT2Zmc2V0cyB7XHJcbiAgcmV0dXJuIHtcclxuICAgIC4uLm9mZnNldHMsXHJcbiAgICByaWdodDogKG9mZnNldHMubGVmdCB8fCAwKSArIG9mZnNldHMud2lkdGgsXHJcbiAgICBib3R0b206IChvZmZzZXRzLnRvcCB8fCAwKSArIG9mZnNldHMuaGVpZ2h0XHJcbiAgfTtcclxufVxyXG4iXX0=