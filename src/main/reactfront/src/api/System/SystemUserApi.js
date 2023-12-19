import axios from 'axios';


const TOKEN_TYPE = localStorage.getItem("tokenType");
let ACCESS_TOKEN = localStorage.getItem("accessToken");
let REFRESH_TOKEN = localStorage.getItem("refreshToken");

export const SystemApi = axios.create({
    baseURL: 'http://localhost:8080', // 백엔드 API 엔드포인트
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `${TOKEN_TYPE} ${ACCESS_TOKEN}`,
        'REFRESH_TOKEN': REFRESH_TOKEN,
    },
});

// API 호출
export const syncLinux = async (systemId, ipAddr, loginId, loginPasswd, loginPort) => {
    try {
        const response = await SystemApi.get(`/getLinuxAccounts`, {
            params: {
                systemId: `${systemId}`,
                ipAddr: `${ipAddr}`,
                loginId: `${loginId}`,
                loginPasswd: `${loginPasswd}`,
                loginPort:`${loginPort}`
            },
        });
        alert(response.data);
        console.log('백엔드 응답:', response.data);
        return response.data;
    } catch (error) {
        console.error('에러 발생:', error);
        return []; // 에러 발생 시 빈 배열 반환
    }
};

export const getSystemAccounts = async (systemId) => {
    try {
        const response = await SystemApi.get(`/getAccounts`, {
            params: {
                systemId: `${systemId}`,
            },
        });
        console.log('백엔드 응답:', response.data);
        return response.data;
    } catch (error) {
        console.error('에러 발생:', error);
        return []; // 에러 발생 시 빈 배열 반환
    }
};

export const getAccountPassword = async (systemId, systemUserId) => {
    try {
        const response = await SystemApi.get('/getAccountPassword', {
            params:{
                systemId: `${systemId}`,
                systemUserId: `${systemUserId}`,
            },
        });
        console.log('백엔드 응답222 : ', response.data);
        return response.data;
    } catch (error){
        console.error('에러 발생 : ', error);
        return [];
    }
};

export const setAccountPassword = async (systemId, systemUserId) => {
    try {
        const response = await SystemApi.get('/getAccountPassword', {
            params:{
                systemId: `${systemId}`,
                systemUserId: `${systemUserId}`,
            },
        });
        console.log('백엔드 응답222 : ', response.data);
        return response.data;
    } catch (error){
        console.error('에러 발생 : ', error);
        return [];
    }
};
