import axios from 'axios';

let base = '';

export const login = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

export const getUserList = params => { return axios.post(`${base}/user/list`, params).then(res => res.data); };

export const removeUser = params => { return axios.post(`${base}/user/remove`, params).then(res => res.data); };

export const batchRemoveUser = params => { return axios.post(`${base}/user/batchremove`, params).then(res => res.data); };

export const editUser = params => { return axios.post(`${base}/user/edit`, params).then(res => res.data); };

export const addUser = params => { return axios.post(`${base}/user/add`, params).then(res => res.data); };

export const getRoleList = params => { return axios.post(`${base}/role/list`, params).then(res => res.data); };

export const removeRole = params => { return axios.post(`${base}/role/remove`, params).then(res => res.data); };

export const batchRemoveRole = params => { return axios.post(`${base}/role/batchremove`, params).then(res => res.data); };

export const editRole = params => { return axios.post(`${base}/role/edit`, params).then(res => res.data); };

export const addRole = params => { return axios.post(`${base}/role/add`, params).then(res => res.data); };

export const getMenuList = params => { return axios.post(`${base}/menu/list`, params).then(res => res.data); };

export const removeMenu = params => { return axios.post(`${base}/menu/remove`, params).then(res => res.data); };

export const batchRemoveMenu = params => { return axios.post(`${base}/menu/batchremove`, params).then(res => res.data); };

export const editMenu = params => { return axios.post(`${base}/menu/edit`, params).then(res => res.data); };

export const addMenu = params => { return axios.post(`${base}/menu/add`, params).then(res => res.data); };

