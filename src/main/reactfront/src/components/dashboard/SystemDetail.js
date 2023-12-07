// PostDetail.js
import React, { useEffect, useState, useCallback} from 'react';

import {getSystemDetail, updateSystem} from "../../api/System/SystemApi";
import {useNavigate} from "react-router-dom";
import {ButtonGroup, Button, Form, FormGroup, Input, Label} from "reactstrap";

const SystemDetail = ({systemId,onClose}) => {
    const [formData, setFormData] = useState({
        systemId: "",
        systemName: "",
        systemDesc: "",
        ipAddr: "",
    });
    const [formkeywordData, setFormKeywordData] = useState({
        loginId: "",
        loginPasswd: "",
        loginPort: "",
        loginProtocol:"",
        loginDriverUrl: "",
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
                setFormData(data);

                console.log(data);
                // ...데이터를 처리하는 로직 작성
            };

            fetchData();
        }

    }, [systemId]); //

    if (!formData) {
        return <div>Loading...</div>;
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleClose = () => {
        // 부모 컴포넌트에 닫기 이벤트를 전달
        onClose();
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            console.log(formData)
            console.log(systemId)
            const response = updateSystem(systemId, formData);
            console.log(response.data); // 서버로부터 받은 응답 확인
            // 글쓰기가 성공하면 리다이렉션 또는 다른 작업 수행
            window.alert('수정 완료.');
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
            <div>
            <h5>시스템 정보 수정</h5>
            <hr/>
            </div>
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
                        value={formData.systemId}
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
                        value={formData.systemName}
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
                        value={formData.systemDesc}
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
                        value={formData.ipAddr}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
            </Form>
            </div>
            <div>
                <br/>
            <h5>시스템 접속 정보 수정</h5>
                <hr/>
            </div>
            <div>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="loginPort">접속 포트</Label>
                        <Input
                            id="loginPort"
                            name="loginPort"
                            placeholder="Login Port"
                            type="text"
                            value={formkeywordData.loginPort}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="loginId">접속 계정</Label>
                        <Input
                            id="loginId"
                            name="loginId"
                            placeholder="Login ID"
                            type="text"
                            value={formkeywordData.loginId}
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="loginPasswd">접속 패스워드</Label>
                        <Input
                            id="loginPasswd"
                            name="loginPasswd"
                            placeholder="Login Passwd"
                            type="text"
                            value={formkeywordData.loginPasswd}
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="loginDriverUrl">접속 URL(DB)</Label>
                        <Input
                            id="loginDriverUrl"
                            name="loginDriverUrl"
                            placeholder="Login Driver URL"
                            type="text"
                            value={formkeywordData.loginDriverUrl}
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="loginProtocol">접속 프로토콜</Label>
                        <Input
                            id="loginProtocol"
                            name="loginProtocol"
                            placeholder="Login Protocol"
                            type="text"
                            value={formkeywordData.loginProtocol}
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>
                </Form>
            </div>
            <div>
                <div className="button-group" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button className="btn" outline color="primary" onClick={handleSubmit}>Save</Button>
                    <Button className="btn" color="primary" onClick={handleClose}>Close</Button>
                </div>
            </div>
        </div>
    );
};

export default SystemDetail;