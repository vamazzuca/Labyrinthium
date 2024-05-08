import * as api from '../api';



export const getRoomBySearch = (searchQuery, setMessage) => async (dispatch) => {
    try {
        dispatch({ type: 'START_LOADING' })
        const { data } = await api.fetchRoomsBySearch(searchQuery)
        if (data.length === 0) {
            setMessage("No escape rooms at this location...")
        }
        dispatch({ type: 'FETCH_ROOM_BY_SEARCH', payload: data })
        dispatch({type: 'END_LOADING'})
    } catch (error) {
        console.log(error)
        dispatch({type: 'END_LOADING'})
    }
}

export const getRoom = (id) => async (dispatch) => {
    try {
        dispatch({type: 'START_LOADING'})
        const { data } = await api.fetchRoom(id)
        
        dispatch({ type: 'FETCH_ROOM', payload: data })
        dispatch({type: 'END_LOADING'})
    } catch (error) {
        console.log(error.message)
        dispatch({type: 'END_LOADING'})
    }
    
}

export const reset = () => (dispatch) => {
    try {
        dispatch({ type: 'RESET'})
    } catch (error) {
        console.log(error)
    }
}