// PostDetail.js
import React, { useEffect, useState } from 'react';

import {getSystemDetail, updateSystem} from "../../api/System/SystemApi";
import {useNavigate} from "react-router-dom";
import {Form, FormGroup, Input, Label} from "reactstrap";

const SystemDetail = ({ systemId }) => {
    const [system, setSystem] = useState([]);
    const [formData, setFormData] = useState({
        systemId: "",
        systemName: "",
        systemDesc: "",
        ipAddr: "",
    });
    const navigate = useNavigate();
    const accessToken = localStorage.getItem("accessToken");
    const username = localStorage.getItem("userId");
    console.log("토큰 : " + accessToken +"\n"
        +"username : " + username);
    useEffect(() => {
        if( accessToken == null){
            alert("로그인하세요");
            navigate('/About');
        }else{
            const fetchData = async () => {
                const data = await getSystemDetail(systemId);
                setSystem(data);

                console.log(data);
                // ...데이터를 처리하는 로직 작성
            };

            fetchData();
        }

    }, [systemId]); //

    if (!system) {
        return <div>Loading...</div>;
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            const response = updateSystem(formData);
            alert('정상적으로 등록되었습니다.');

            console.log(response.data); // 서버로부터 받은 응답 확인

            // 글쓰기가 성공하면 리다이렉션 또는 다른 작업 수행
        } catch (error) {
            if (error.response && error.response.status === 500) {
                // 서버에서 오류 응답을 받은 경우
                alert(error.response.data);
                console.error(error.response.data.toString());
            } else {
                // 요청 자체에 오류가 있는 경우
                alert('게시물 등록에 실패했습니다. 다시 시도해주세요.');

                console.error('Error creating post:', error.message);
            }
        }

        console.log(formData);

    };

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="systemId">시스템 ID</Label>
                    <Input
                        id="systemId"
                        name="systemId"
                        placeholder="System ID"
                        type="text"
                        readOnly
                        value={system.systemId}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="systemName">시스템명</Label>
                    <Input
                        id="systemName"
                        name="systemName"
                        placeholder="System Name"
                        type="text"
                        value={system.systemName}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="systemDesc">시스템 용도</Label>
                    <Input
                        id="systemDesc"
                        name="systemDesc"
                        placeholder="System Desc"
                        type="text"
                        value={system.systemDesc}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="ipAddr">IP</Label>
                    <Input
                        id="ipAddr"
                        name="ipAddr"
                        placeholder="IP"
                        type="text"
                        value={system.ipAddr}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
            </Form>
        </div>
    );
};

export default SystemDetail;