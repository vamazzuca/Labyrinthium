import axios from 'axios'

const API = axios.create({ baseURL: "https://localhost:7186" })

export const signIn = (formData) => API.post('/api/User/signin', formData);
export const signUp = (formData) => API.post('/api/User/signup', formData);

export const fetchRoomsBySearch = (searchQuery) => API.get(`api/Room/search?latitude=${searchQuery.latitude}&longitude=${searchQuery.longitude}&query=${searchQuery.search}`)
export const fetchRoom = (id) => API.get(`api/Room/${id}`)