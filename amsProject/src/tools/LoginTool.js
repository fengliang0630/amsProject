
import StorageTool from './StorageTool.js';

var LoginTool = {
    isLogin() {
        return !!StorageTool.getItem('currentUser');
    },

    login(userInfo) {
        StorageTool.setItem('currentUser', userInfo);
    },

    logout() {
        StorageTool.removeItem('currentUser');
    },

    getCurrentUser() {
        return StorageTool.getItem('currentUser');
    }
};

export default LoginTool;