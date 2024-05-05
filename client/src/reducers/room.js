const roomReducer = (state = { isLoading: false, rooms: [], room: []}, action) => {
    switch (action.type) {
        case 'START_LOADING':
            return { ...state, isLoading: true }
        case 'END_LOADING':
            return {...state, isLoading: false}
        case 'FETCH_ROOM':
            
            return { ...state, room: action.payload };
        case 'FETCH_ROOM_BY_SEARCH':
            return { ...state, rooms: action.payload };
        case 'RESET':
            return { ...state, rooms: [], room: [] };
    
        default:
            return state;
    }
}

export default roomReducer;