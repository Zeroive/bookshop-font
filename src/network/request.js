import axios from "axios";

const request = axios.create({
  baseURL: 'http://192.168.2.31:9090',
  timeout: 5000
})


// 前置拦截器
request.interceptors.request.use(config => {
  config.headers['Content-Type'] = 'application/json;charset=utf-8';
  // config.headers['token'] = user.token; // 设置请求头
  return config
},error => {
  return Promise.reject(error)
})

// 后置拦截器
request.interceptors.response.use(
  response => {
    let res = response.data;

    // 如果返回的是文件
    if(response.config.responseType === 'blob'){
      return res
    }

    //兼容字符串数据
    if(typeof res === 'string'){
      res = res ? JSON.parse(res) : res
    }

    return res;
  },
  error => {
    console.log('error' + error)
  }
)

export default request
