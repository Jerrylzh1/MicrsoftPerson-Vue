import axios from "axios"
import {Message} from 'element-ui';
import router from '../router'

//axios.defaults.baseURL='http://localhost:8081/'
//进行地址访问的卡控 服务器返回的数据信息进行展示
axios.interceptors.response.use(success => {

    if (success.status && success.status === 200 && success.data.code === 500) {
        Message.error({message: success.data.msg})
        return;
    }
    if (success.data.msg){
        Message.success({message:success.data.msg})
    }
    return success.data;
}, error => {
    if (error.response.status === 504 || error.response.status === 404) {
        Message.error({message: '服务器挂了！'})
    } else if (error.response.status === 403) {
        Message.error({message: '权限不足！'})
    } else if (error.response.status === 401) {
        Message.error({message: '尚未登录，请登录！'})
        router.replace('/');
    } else {
        if (error.data.response.msg) {
            Message.error({message: error.response.data.msg})
        } else {
            Message.error({message: "未知错误！"})
        }

    }
    return;
})

//定义请求路径地址
// export const postValueRequest=(url,params)=>{
//     return axios({
//         method:'post',
//         url,
//         data:params
//     });
// }
let base='';
export const postValueRequest=(url,params)=> {
    return  axios({
        method: 'post',
        url: `${base}${url}`,
        data: {
            username: params.username,
            password: params.password
        },
        transformRequest: [
            function (data) {
                let ret = ''
                for (let it in data) {
                    ret +=
                        encodeURIComponent(it) +
                        '=' +
                        encodeURIComponent(data[it]) +
                        '&'
                }
                return ret
            }
        ],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    })

}

export const postRequest=(url,params)=>{
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data:params
    })

}
export const putRequest=(url,params)=>{
    return axios({
        method: 'put',
        url:url,
        data:params
    })

}
export const getRequest=(url,params)=>{
    return axios({
        method: 'get',
        url: `${base}${url}`,
        data:params
    })

}
export const deleteRequest=(url,params)=>{
    return axios({
        method: 'delete',
        url: `${base}${url}`,
        data:params
    })

}


