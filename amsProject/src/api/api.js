import axios from 'axios';

let base = '';

// 登录接口
export const login = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

// 获取用户列表（分页）
export const getUserListPage = params => { return axios.post(`${base}/user/listPage`, params).then(res => res.data); };

// 删除用户
export const removeUser = params => { return axios.post(`${base}/user/remove`, params).then(res => res.data); };

// 批量删除用户
export const batchRemoveUser = params => { return axios.post(`${base}/user/batchremove`, params).then(res => res.data); };

// 编辑用户
export const editUser = params => { return axios.post(`${base}/user/edit`, params).then(res => res.data); };

// 新增用户
export const addUser = params => { return axios.post(`${base}/user/add`, params).then(res => res.data); };


// 获取角色列表（无分页）
export const getRoleList = params => { return axios.post(`${base}/role/list`, params).then(res => res.data); };

// 通过userId查询已经配置的角色id
export const getHasRoleIdsByUserId = params => { return axios.post(`${base}/role/hasRolesByUserId`, params).then(res => res.data); };

// 这只某个用户的角色id
export const setRoleIdsByUserId = params => { return axios.post(`${base}/role/setRolesByUserId`, params).then(res => res.data); };

// 获取角色列表（分页）
export const getRoleListPage = params => { return axios.post(`${base}/role/listPage`, params).then(res => res.data); };

// 删除角色
export const removeRole = params => { return axios.post(`${base}/role/remove`, params).then(res => res.data); };

// 批量删除角色
export const batchRemoveRole = params => { return axios.post(`${base}/role/batchremove`, params).then(res => res.data); };

// 编辑角色
export const editRole = params => { return axios.post(`${base}/role/edit`, params).then(res => res.data); };

// 新增角色
export const addRole = params => { return axios.post(`${base}/role/add`, params).then(res => res.data); };

// 获取菜单列表（分页）
export const getMenuListPage = params => { return axios.post(`${base}/menu/listPage`, params).then(res => res.data); };

// 删除菜单
export const removeMenu = params => { return axios.post(`${base}/menu/remove`, params).then(res => res.data); };

// 批量删除菜单
export const batchRemoveMenu = params => { return axios.post(`${base}/menu/batchremove`, params).then(res => res.data); };

// 修改菜单
export const editMenu = params => { return axios.post(`${base}/menu/edit`, params).then(res => res.data); };

// 新增菜单
export const addMenu = params => { return axios.post(`${base}/menu/add`, params).then(res => res.data); };

