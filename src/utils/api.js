import Promise from "es6-promise";
import axios from 'axios';

Promise.polyfill();
const METHODS = {
    GET: 'get',
    POST: 'post',
    PUT: 'put',
    DELETE: 'delete'
};

const request = (url, params, method = METHODS.GET) => {
    return axios({
        url: url,
        method: method,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        params: params
    }).then(checkRespStatus);

    // return fetch(url, {
    //     method: method,
    //     headers: {
    //         'Content-Type': 'application/json;charset=UTF-8'
    //     }
    // }).then(checkRespStatus);
};

const checkRespStatus = respPromise => {
    return new Promise((resolve, reject) => {
        if (respPromise.status === 200) {
            resolve(respPromise.data);
        } else {
            reject(respPromise)
        }

    })
}

export default {
    getTxts: path => request(path)
}