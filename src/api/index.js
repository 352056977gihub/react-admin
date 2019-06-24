import ajax from './ajax'

export const reqLogin = (username,password)=> ajax('/login',{username,password},'POST')
export const reqValidateUser = (id) => ajax('/validate/user',{id},'POST')