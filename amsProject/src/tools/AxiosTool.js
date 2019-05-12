import Axios from 'axios';

var AxiosTool = {
    get(url) {
        return Axios.get('url');
    },

    post(url, params) {
        return Axios.post(url, params);
    }
};

export default AxiosTool;