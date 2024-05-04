import * as api from '../api';



export const getRoomBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: 'START_LOADING' })
        const { data } = await api.fetchRoomsBySearch(searchQuery)
        dispatch({ type: 'FETCH_ROOM_BY_SEARCH', payload: data })
        dispatch({type: 'END_LOADING'})
    } catch (error) {
        console.log(error)
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
    }
    
}