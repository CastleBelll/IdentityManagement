import axios from "axios";

const TOKEN_TYPE = localStorage.getItem("tokenType");
let ACCESS_TOKEN = localStorage.getItem("accessToken");
let REFRESH_TOKEN = localStorage.getItem("refreshToken");

/** CREATE CUSTOM AXIOS INSTANCE */
export const UserApi = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `${TOKEN_TYPE} ${ACCESS_TOKEN}`,
        'REFRESH_TOKEN': REFRESH_TOKEN,
    },
});
export const SignUpApi = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json'
    },
});
export const getUserList = async () =>{
    const response = await UserApi.get(`/api/v1/userList`);
    return response.data;
}

/** SIGNUP API */
export const signUp = async ({ userId,userName, userPassword }) => {
    const data = {userId, userName, userPassword };
    // const response = await SignUpApi.post(`/api/v1/user`, data);
    const response = await UserApi.post(`/api/v1/user`, data);

    return response.data;
}
/** 회원조회 API */
export const fetchUser = async () => {
    const response = await UserApi.get(`/api/v1/user`);
    return response.data;
}
/** 회원수정 API */
export const updateUser = async (data) => {
    const response = await UserApi.put(`/api/v1/user`, data);
    return response.data;
}
/** 회원탈퇴 API */
export const deleteUser = async () => {
    await UserApi.delete(`/api/v1/user`);
}
// 토큰 갱신
const refreshAccessToken = async () => {
    const response = await UserApi.get(`/api/v1/auth/refresh`);
    ACCESS_TOKEN = response.data;
    localStorage.setItem('accessToken', ACCESS_TOKEN);
    UserApi.defaults.headers.common['Authorization'] = `${TOKEN_TYPE} ${ACCESS_TOKEN}`;
}

// 토큰 유효성 검사
UserApi.interceptors.response.use((response) => {
    return response;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
        await refreshAccessToken();
        return UserApi(originalRequest);
    }
    return Promise.reject(error);
});