import axios from 'axios'

const instance = axios.create({
    baseURL:'http://localhost:4000',
    headers:{
        'Content-Type':'application/json'
    },
    withCredentials:true

})

// create end point

export const get=(url,params)=>instance.get(url,{params})
export const post=(url,data)=>instance.post(url,data)
export const put=(url,data)=>instance.put(url,data)
export const delet=(url)=>instance.delete(url)


// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    console.log("intercepert response", response)
    return response;
  }, function (error) {
    console.log("error", error)
    return Promise.reject(error);
  });