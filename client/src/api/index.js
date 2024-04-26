import axios from 'axios'

const API = axios.create({ baseURL: "https://localhost:7186" })



export const signIn = (formData) => API.post('/api/User/signin', formData);
export const signUp = (formData) => API.post('/api/User/signup', formData);