const roomReducer = (state = { isLoading: false, rooms: [], room: [], error: false}, action) => {
    switch (action.type) {
        case 'START_LOADING':
            return { ...state, isLoading: true }
        case 'END_LOADING':
            return {...state, isLoading: false}
        case 'FETCH_ROOM':
            
            return { ...state, room: action.payload, error: false };
        case 'FETCH_ROOM_BY_SEARCH':
            return { ...state, rooms: action.payload, error: false };
        case 'ERROR':
            return { ...state, error: true, loading: false };
        case 'RESET':
            return { ...state, rooms: [], room: [], error: false };
    
        default:
            return state;
    }
}

export default roomReducer;