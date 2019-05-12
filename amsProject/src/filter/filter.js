import Vue from 'vue';
import filterConfig from './filterConfig.js';

var filter = {
 init() {
    for (let key in filterConfig) {
        Vue.filter(key, filterConfig[key]);
    }
 }
}

export default filter;
