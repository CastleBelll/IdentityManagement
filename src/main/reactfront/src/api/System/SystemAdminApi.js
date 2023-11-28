import axios from 'axios';

const TOKEN_TYPE = localStorage.getItem("tokenType");
let ACCESS_TOKEN = localStorage.getItem("accessToken");
let REFRESH_TOKEN = localStorage.getItem("refreshToken");

export const SystemAdminApi = axios.create({
    baseURL: 'http://localhost:8080/system/admin', // 백엔드 API 엔드포인트
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `${TOKEN_TYPE} ${ACCESS_TOKEN}`,
        'REFRESH_TOKEN': REFRESH_TOKEN,
    },
});


export const insertSystemAdmin =
    async ({ systemId, systemAdminId, systemAdminName, systemAdminPassword, userId}) => {
        try {
            const data = { systemId, systemAdminId, systemAdminName, systemAdminPassword, userId
            };
            const response = await SystemAdminApi.post('/save', data
                // 다른 헤더도 필요하다면 추가 가능
            );

            return response.data;
        } catch (error) {
            console.error('에러 발생:', error);
            return []; // 에러 발생 시 빈 배열 반환
        }
    };
