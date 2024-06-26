const roomReducer = (state = { isLoading: false, completed: false, rooms: [], room: [], completedRooms: [], error: false}, action) => {
    switch (action.type) {
        case 'START_LOADING':
            return { ...state, isLoading: true }
        case 'END_LOADING':
            return { ...state, isLoading: false }
        case 'FETCH_ROOM':   
            return { ...state, room: action.payload, error: false };
        case 'FETCH_ROOM_BY_SEARCH':
            return { ...state, rooms: action.payload, error: false };
        case 'MARK_COMPLETED':
            return { ...state, completed: true }
        case 'UNMARK_COMPLETED':
            return { ...state, completed: false }
        case 'IS_COMPLETED':
            return { ...state, completed: action.payload }
        case 'GET_COMPLETED':
            return {...state, completedRooms: action.payload}
        case 'ERROR':
            return { ...state, error: true, loading: false };
        case 'RESET':
            return { ...state, rooms: [], room: [], error: false };
    
        default:
            return state;
    }
}

export default roomReducer;