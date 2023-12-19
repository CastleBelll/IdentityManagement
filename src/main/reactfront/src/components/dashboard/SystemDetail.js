// PostDetail.js
import React, { useEffect, useState, useCallback} from 'react';

import {getSystemDetail, updateSystem} from "../../api/System/SystemApi";
import {syncLinux} from "../../api/System/SystemUserApi";

import {useNavigate} from "react-router-dom";
import {ButtonGroup, Button, Form, FormGroup, Input, Label} from "reactstrap";

const SystemDetail = ({systemId,onClose}) => {
    const [formData, setFormData] = useState({
        systemDB: {} ,
        systemKeyword : {}
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
            systemDB: {
                ...formData.systemDB,
                [e.target.name]: e.target.value,
            },
            systemKeyword: {
                ...formData.systemKeyword,
                [e.target.name]: e.target.value,
            },
        });
        console.log("여기 : " +formData);

    };
    const handleClose = () => {
        // 부모 컴포넌트에 닫기 이벤트를 전달
        onClose();
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            console.log("시작");
            console.log(formData);
            const response = updateSystem(systemId, formData);
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



    };

    const syncSubmit = (e) => {
        e.preventDefault();
        try {
            console.log(formData);
            const response = syncLinux(systemId, formData.systemDB.ipAddr, formData.systemKeyword.loginId, formData.systemKeyword.loginPasswd, formData.systemKeyword.loginPort);
            // 글쓰기가 성공하면 리다이렉션 또는 다른 작업 수행
        } catch (error) {
            if (error.response || error.response.status === 500 || error.response.status === 400) {
                // 서버에서 오류 응답을 받은 경우
                console.error(error.response.data.toString());
            } else {
                // 요청 자체에 오류가 있는 경우
                console.error('Error creating post:', error.message);
            }
        }
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
                        value={formData.systemDB.systemId}
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
                        value={formData.systemDB.systemName}
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
                        value={formData.systemDB.systemDesc}
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
                        value={formData.systemDB.ipAddr}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="systemType">시스템 타입</Label>
                    <Input
                        id="systemType"
                        name="systemType"
                        placeholder="시스템 타입"
                        type="text"
                        readOnly
                        value={formData.systemDB.systemType}
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
                    {formData.systemDB.systemType === 'Linux' || formData.systemDB.systemType === 'Windows' ? (
                    <FormGroup>
                        <Label for="loginPort">접속 포트</Label>
                        <Input
                            id="loginPort"
                            name="loginPort"
                            placeholder="Login Port"
                            type="text"
                            value={formData.systemKeyword.loginPort}
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>
                    ) : null}
                    <FormGroup>
                        <Label for="loginId">접속 계정</Label>
                        <Input
                            id="loginId"
                            name="loginId"
                            placeholder="Login ID"
                            type="text"
                            value={formData.systemKeyword.loginId}
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
                            type="password"
                            value={formData.systemKeyword.loginPasswd}
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>
                    {formData.systemDB.systemType === 'Linux' || formData.systemDB.systemType === 'Windows' ? null : (
                    <FormGroup>
                        <Label for="loginDriverUrl">접속 URL(DB)</Label>
                        <Input
                            id="loginDriverUrl"
                            name="loginDriverUrl"
                            placeholder="Login Driver URL"
                            type="text"
                            value={formData.systemKeyword.loginDriverUrl}
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>
                    )}
                </Form>
            </div>
            <div>
                <div className="button-group" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button className="btn" color="secondary" onClick={syncSubmit}>Sync</Button>
                    <Button className="btn" outline color="primary" onClick={handleSubmit}>Save</Button>
                    <Button className="btn" color="primary" onClick={handleClose}>Close</Button>
                </div>
            </div>
        </div>
    );
};

export default SystemDetail;