import ajax from './ajax';
import jsonp from 'jsonp';
import {message} from 'antd'

export const reqLogin = (username,password)=> ajax('/login',{username,password},'POST')
export const reqValidateUser = (id) => ajax('/validate/user',{id},'POST')
export const reqWeather = ()=>{
    return new Promise((resolve,reject)=>{
        jsonp('http://api.map.baidu.com/telematics/v3/weather?location=深圳&output=json&ak=3p49MVra6urFRGOT9s8UBWr2',{},(err,data)=> {
            if(!err){
                const {dayPictureUrl,weather} = data.results[0].weather_data[0];
                resolve({dayPictureUrl,weather});
            }else{
                message.error('天气信息请求失败');
                reject();
            }
        })
    })
}
export const reqCategory = (parentId)=> ajax('/manage/category/list',{parentId})
export const reqAddCategory = (parentId,categoryName)=>ajax('/manage/category/add',{parentId,categoryName},'POST')
export const reqUpdateCategory = (categoryId,categoryName)=>ajax('/manage/category/update',{categoryId,categoryName},'POST')