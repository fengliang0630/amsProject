import CodeValues from '../codeValue/CodeValues.js';
import moment from 'moment';

var filterConfig = {
    codeValueFilter(value, arg1) {
        const codeValueArray = CodeValues[arg1];
        if (!codeValueArray) {
            return '';
        }

        for (let i = 0; i < codeValueArray.length; i++) {
            if (codeValueArray[i].value === value) {
                return codeValueArray[i].text;
            }
        }

        return '';
    },

    dateFormat(value, formatType) {
        const date = new Date(value);
        return moment()
            .year(date.getFullYear())
            .month(date.getMonth())
            .date(date.getDate())
            .hour(date.getHours())
            .minutes(date.getMinutes())
            .seconds(date.getSeconds()).format(formatType);
    }
};

export default filterConfig;