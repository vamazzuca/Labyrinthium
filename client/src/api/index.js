import axios from 'axios'

const API = axios.create({ baseURL: "https://labserver.vittoriomazzuca.ca/" })

export const signIn = (formData) => API.post('/api/User/signin', formData);
export const signUp = (formData) => API.post('/api/User/signup', formData);

export const fetchRoomsBySearch = (searchQuery) => API.get(`api/Room/search?latitude=${searchQuery.latitude}&longitude=${searchQuery.longitude}&query=${searchQuery.search}`)
export const fetchRoom = (id) => API.get(`/api/Room/${id}`)

export const markCompleted = (ids) => API.post(`/api/Room/markCompleted/${ids.userId}/${ids.roomId}`)
export const unmarkCompleted = (ids) => API.post(`/api/Room/unmarkCompleted/${ids.userId}/${ids.roomId}`)
export const isCompleted = (ids) => API.get(`/api/Room/isCompleted/${ids.userId}/${ids.roomId}`)
export const completedRooms = (userId) => API.get(`/api/Room/completedRooms/${userId}`)

export const getUser = (username) => API.get(`/api/User/getUser?username=${username}`)
export const updateUser = (user) => API.post(`/api/User/updateUser`, user)