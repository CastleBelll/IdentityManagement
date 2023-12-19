import axios from 'axios';
import {insertSystemAdmin, SystemAdminApi} from "./SystemAdminApi";


const TOKEN_TYPE = localStorage.getItem("tokenType");
let ACCESS_TOKEN = localStorage.getItem("accessToken");
let REFRESH_TOKEN = localStorage.getItem("refreshToken");

export const SystemApi = axios.create({
    baseURL: 'http://localhost:8080/api/v1', // 백엔드 API 엔드포인트
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `${TOKEN_TYPE} ${ACCESS_TOKEN}`,
        'REFRESH_TOKEN': REFRESH_TOKEN,
    },
});

// API 호출
export const getUserList = async () => {
    try {
        const response = await SystemApi.get('/userList',{});
        console.log('백엔드 응답:', response.data);
        return response.data;
    } catch (error) {
        console.error('에러 발생:', error);
        return []; // 에러 발생 시 빈 배열 반환
    }
};