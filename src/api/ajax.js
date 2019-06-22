import axios from 'axios';
import {message} from 'antd'

export default function ajax( url, data={}, method='GET') {
    let reqParams = data;
    if(method === 'GET'){
        reqParams={
            params: data
        }
    }
   return axios[method.toLowerCase()](url,reqParams)
       .then((res)=>{
           const data = res.data
           if(data.status===0){
               return data.data
           }else{
               message.error(data.msg,2)
           }
       })
       .catch(()=> {
           message.error('网络异常,请重试',2)
       })
}