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
        
        if (!data) {
            dispatch({ type: 'ERROR' });
        } else {
            dispatch({ type: 'FETCH_ROOM', payload: data })
        }
        
        dispatch({type: 'END_LOADING'})
    } catch (error) {
        console.log(error.message)
        dispatch({ type: 'ERROR' });
        dispatch({type: 'END_LOADING'})
    }
    
}

export const markComplete = (ids) => async (dispatch) => {
    try {
        
        const { data } = await api.markCompleted(ids)
        dispatch({ type: 'MARK_COMPLETED', payload: data })
       
    } catch (error) {
        console.log(error.message)
       
    }
    
}


export const unmarkCompleted = (ids) => async (dispatch) => {
    try {
        
        const { data } = await api.unmarkCompleted(ids)
        dispatch({ type: 'UNMARK_COMPLETED', payload: data })
       
    } catch (error) {
        console.log(error.message)
       
    }
    
}


export const isCompleted = (ids) => async (dispatch) => {
    try {
        
        const { data } = await api.isCompleted(ids)
        dispatch({ type: 'IS_COMPLETED', payload: data })
       
       
    } catch (error) {
        console.log(error.message)
       
    }
    
}


export const getCompleted = (userId) => async (dispatch) => {
    try {
        
        const { data } = await api.completedRooms(userId)
        dispatch({ type: 'GET_COMPLETED', payload: data })
       
    } catch (error) {
        console.log(error.message)
       
    }
    
}

export const reset = () => (dispatch) => {
    try {
        dispatch({ type: 'RESET'})
    } catch (error) {
        console.log(error)
    }
}