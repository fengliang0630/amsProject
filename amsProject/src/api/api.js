import axios from 'axios';

let base = '';

// 登录接口
export const login = params => { 
    const p = pckParam(params, {});
    return axios.post(`${base}/ams/amsLogin`, p).then(res => res.data); 
};

// 登出接口
export const logout = params => { 
    const p = pckParam(params, {});
    return axios.post(`${base}/ams/amsLogout`, p).then(res => res.data); 
};

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
export const editUser = params => {
    const p = pckParam(params, {});
    return axios.post(`${base}/ams/updateUser`, p).then(res => res.data); 
};

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

// 获取项目基本信息列表
export const getJbxxListPage = params => { return axios.post(`${base}/ams/api/xmjbxx/query`, params).then(res => res.data); };

// 删除项目基本信息
export const removeJbxx = params => { return axios.post(`${base}/ams/api/xmjbxx/del`, params).then(res => res.data); };

// 新增/修改 项目基本信息
export const createOrUpdateJbxx = params => { return axios.post(`${base}/ams/api/xmjbxx/createOrUpdate`, params).then(res => res.data); };

// 获取项目明细列表
export const getXmmxListPage = params => { return axios.post(`${base}/ams/api/xmmx/query`, params).then(res => res.data); };

// 删除项目明细
export const removeXmmx = params => { return axios.post(`${base}/ams/api/xmmx/del`, params).then(res => res.data); };

// 新增/修改 项目明细
export const createOrUpdateXmmx = params => { return axios.post(`${base}/ams/api/xmmx/createOrUpdate`, params).then(res => res.data); };

// 获取项目属性列表
export const getXmsxListPage = params => { return axios.post(`${base}/ams/api/xmsx/query`, params).then(res => res.data); };

// 删除项目属性
export const removeXmmx = params => { return axios.post(`${base}/ams/api/xmsx/del`, params).then(res => res.data); };

// 新增/修改 项目属性
export const createOrUpdateXmsx = params => { return axios.post(`${base}/ams/api/xmsx/createOrUpdate`, params).then(res => res.data); };

// 获取地图区域点
export const getPoints = params => { return axios.post(`${base}/map/getPoints`, params).then(res => res.data); };


const pckParam = (params, headerParam) => {
    const userInfo = JSON.parse(sessionStorage.getItem('user'));
    const p = Object.assign({}, params);
    let header = {
        reqUserId: '1' || userInfo['id'],
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