const USER_KEY = 'USER_KEY';
const USER_TIME = 'USER_TIME'
const EXPIRE_TIME = 1000*3600*24*7

export const setItem = (data)=>{
    localStorage.setItem(USER_KEY,JSON.stringify(data));
    localStorage.setItem(USER_TIME,Date.now());}

export const getItem = ()=>{
    if(Date.now()-localStorage.getItem(USER_TIME)>EXPIRE_TIME){
        removeItem();
        return {};
    }
    return JSON.parse(localStorage.getItem(USER_KEY));
}

export const removeItem = ()=>{localStorage.removeItem(USER_KEY);localStorage.removeItem(USER_TIME)}