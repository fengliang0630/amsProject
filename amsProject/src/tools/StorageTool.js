
var StorageTool = {
    setItem(key, value){
        sessionStorage.setItem(key, JSON.stringify(value));
    },

    getItem(key) {
        return JSON.parse(sessionStorage.getItem(key));
    },

    removeItem(key) {
        sessionStorage.removeItem(key);
    }
};


export default StorageTool;