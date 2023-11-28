import axios from 'axios';


const TOKEN_TYPE = localStorage.getItem("tokenType");
let ACCESS_TOKEN = localStorage.getItem("accessToken");
let REFRESH_TOKEN = localStorage.getItem("refreshToken");

export const SystemApi = axios.create({
    baseURL: 'http://localhost:8080/system', // 백엔드 API 엔드포인트
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `${TOKEN_TYPE} ${ACCESS_TOKEN}`,
        'REFRESH_TOKEN': REFRESH_TOKEN,
    },
});

// API 호출
export const getSystemList = async () => {
    try {
        const response = await SystemApi.get('/select');
        console.log('백엔드 응답:', response.data);
        return response.data;
    } catch (error) {
        console.error('에러 발생:', error);
        return []; // 에러 발생 시 빈 배열 반환
    }
};

export const insertSystem =
    async ({ systemId, systemName, systemDesc, ipAddr, systemType, systemCategory
    }) => {
    try {
        const data = { systemId, systemName, systemDesc, ipAddr, systemType, systemCategory
        };
        const response = await SystemApi.post('/save', data
             // 다른 헤더도 필요하다면 추가 가능
        );

        return response.data;
    } catch (error) {
        console.error('에러 발생:', error);
        return []; // 에러 발생 시 빈 배열 반환
    }
};

export const updateSystem = async () => {
    try {
        const response = await SystemApi.get('/update');
        console.log('백엔드 응답:', response.data);
        return response.data;
    } catch (error) {
        console.error('에러 발생:', error);
        return []; // 에러 발생 시 빈 배열 반환
    }
};

export const deleteSystem = async () => {
    try {
        const response = await SystemApi.get('/delete');
        console.log('백엔드 응답:', response.data);
        return response.data;
    } catch (error) {
        console.error('에러 발생:', error);
        return []; // 에러 발생 시 빈 배열 반환
    }
};
