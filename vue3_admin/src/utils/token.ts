// 封装本地化token的存储和读取方法//

// 存//
export const SET_TOKEN = (token: string) => {
    localStorage.setItem('TOKEN', token);
};
// 取//
export const GET_TOKEN = () => {
    return localStorage.getItem('TOKEN');
};
// 清除//
export const REMOVE_TOKE = () => {
    localStorage.removeItem('TOKEN');
}