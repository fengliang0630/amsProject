import axios from 'axios';

let base = '';

// 登录接口
export const login = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

// 获取用户列表（分页）
export const getUserListPage = (params, pageSize, pageNum) => {
    const p = pckParam(params, {reqpageSize: pageSize, reqpageIndex: pageNum});
    return axios.post(`${base}/ams/getUserByname`, p).then(res => res.data); 
};

// 删除用户
export const removeUser = params => { 
    const p = pckParam(params, {});
     return axios.post(`${base}/ams/deleteUser`, p).then(res => res.data); 
};

// 编辑用户
export const editUser = params => { return axios.post(`${base}/user/edit`, params).then(res => res.data); };

// 新增用户
export const addUser = params => { 
    const p = pckParam(params, {});
    return axios.post(`${base}/ams/addUser`, p).then(res => res.data); 
};

// 获取角色列表（无分页）
export const getRoleList = params => { return axios.post(`${base}/role/list`, params).then(res => res.data); };

// 通过userId查询已经配置的角色id
export const getHasRoleIdsByUserId = params => { return axios.post(`${base}/role/hasRolesByUserId`, params).then(res => res.data); };

// 这只某个用户的角色id
export const setRoleIdsByUserId = params => { return axios.post(`${base}/role/setRolesByUserId`, params).then(res => res.data); };

// 获取角色列表（分页）
export const getRoleListPage = (params, pageSize, pageNum) => { 
    const p = pckParam(params, {reqpageSize: pageSize, reqpageIndex: pageNum});
    return axios.post(`${base}/ams/getRoleByRolename`, p).then(res => res.data); 
};

// 删除角色
export const removeRole = params => { 
    const p = pckParam(params, {});
    return axios.post(`${base}/ams/deleteRole`, p).then(res => res.data); 
};

// 编辑角色
export const editRole = params => { 
    const p = pckParam(params, {});
    return axios.post(`${base}/ams/updateRole`, p).then(res => res.data); 
};

// 新增角色
export const addRole = params => { 
    const p = pckParam(params, {});
    return axios.post(`${base}/ams/addRole`, p).then(res => res.data); 
};

// 获取菜单列表（分页）
export const getMenuListPage = params => { return axios.post(`${base}/menu/listPage`, params).then(res => res.data); };

// 获取菜单树
export const getMenuTree = params => { return axios.post(`${base}/menu/tree`, params).then(res => res.data); };

// 获取该角色已经选中的菜单id
export const getMenuIdsByRoleId = params => { return axios.post(`${base}/menu/getMenuIdsByRoleId`, params).then(res => res.data); };

// 设置已经选中的菜单id
export const setMenuIdsByRoleId = params => { return axios.post(`${base}/menu/setMenuIdsByRoleId`, params).then(res => res.data); };

// 删除菜单
export const removeMenu = params => { return axios.post(`${base}/menu/remove`, params).then(res => res.data); };

// 批量删除菜单
export const batchRemoveMenu = params => { return axios.post(`${base}/menu/batchremove`, params).then(res => res.data); };

// 修改菜单
export const editMenu = params => { return axios.post(`${base}/menu/edit`, params).then(res => res.data); };

// 新增菜单
export const addMenu = params => { return axios.post(`${base}/menu/add`, params).then(res => res.data); };

// 获取地图区域点
export const getPoints = params => { return axios.post(`${base}/map/getPoints`, params).then(res => res.data); };



const pckParam = (params, headerParam) => {
    const userInfo = JSON.parse(sessionStorage.getItem('user'));
    const p = Object.assign({}, params);
    let header = {
        reqUserId: userInfo['id'],
		rspReturnCode: "",
		rspReturnMsg:"",
		reqpageSize: "",
		reqpageIndex: "",
		rspPageCount: ""
    };
    header = Object.assign(header, headerParam);
    p['header'] = header;
    return p;
}