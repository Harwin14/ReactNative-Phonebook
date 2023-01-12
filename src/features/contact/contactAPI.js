import axios from 'axios';

const request = axios.create({
  baseURL: 'http://192.168.1.66:3001/',
  timeout: 1000,
  headers: { 'Authorization': 'token' }
});

export const readContact = () => request.get('users') 

export const createContact = (name, phone) => request.post('users', { name, phone})

export const updateContact = (id, name, phone) => request.put(`users/${id}`,{name, phone})

export const deleteContact = (id) => request.delete(`users/${id}`) 



