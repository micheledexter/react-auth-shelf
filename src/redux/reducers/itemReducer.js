const items = (state = [], action) => {
    if (action.type === 'ITEMS') {
        return action.payload;
    }
    return state;
}