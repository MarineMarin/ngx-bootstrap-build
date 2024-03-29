/**
 * Helper to detect borders of a given element
 */
export function getBordersSize(styles, axis) {
    const sideA = axis === 'x' ? 'Left' : 'Top';
    const sideB = sideA === 'Left' ? 'Right' : 'Bottom';
    return (parseFloat(styles[`border${sideA}Width`]) +
        parseFloat(styles[`border${sideB}Width`]));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0Qm9yZGVyc1NpemUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvcG9zaXRpb25pbmcvdXRpbHMvZ2V0Qm9yZGVyc1NpemUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0dBRUc7QUFFSCxNQUFNLFVBQVUsY0FBYyxDQUFDLE1BQTJCLEVBQUUsSUFBWTtJQUN0RSxNQUFNLEtBQUssR0FBRyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUM1QyxNQUFNLEtBQUssR0FBRyxLQUFLLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztJQUVwRCxPQUFPLENBQ0wsVUFBVSxDQUFFLE1BQWdCLENBQUMsU0FBUyxLQUFLLE9BQU8sQ0FBQyxDQUFDO1FBQ3BELFVBQVUsQ0FBRSxNQUFnQixDQUFDLFNBQVMsS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUNyRCxDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBIZWxwZXIgdG8gZGV0ZWN0IGJvcmRlcnMgb2YgYSBnaXZlbiBlbGVtZW50XHJcbiAqL1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEJvcmRlcnNTaXplKHN0eWxlczogQ1NTU3R5bGVEZWNsYXJhdGlvbiwgYXhpczogc3RyaW5nKTogbnVtYmVyIHtcclxuICBjb25zdCBzaWRlQSA9IGF4aXMgPT09ICd4JyA/ICdMZWZ0JyA6ICdUb3AnO1xyXG4gIGNvbnN0IHNpZGVCID0gc2lkZUEgPT09ICdMZWZ0JyA/ICdSaWdodCcgOiAnQm90dG9tJztcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIHBhcnNlRmxvYXQoKHN0eWxlcyBhcyBuZXZlcilbYGJvcmRlciR7c2lkZUF9V2lkdGhgXSkgK1xyXG4gICAgcGFyc2VGbG9hdCgoc3R5bGVzIGFzIG5ldmVyKVtgYm9yZGVyJHtzaWRlQn1XaWR0aGBdKVxyXG4gICk7XHJcbn1cclxuIl19