// PostDetail.js
import React, { useEffect, useState, useCallback} from 'react';

import {getSystemAccounts, getAccountPassword} from "../../api/System/SystemUserApi";
import {useNavigate} from "react-router-dom";
import {ButtonGroup, Button, Form, FormGroup, Input, Label, Card, CardBody, Table, Row, Col} from "reactstrap";
import Modal from "react-modal";
import modalStyles2 from "../../layout/ModalStyles2";

const SystemAccountList = ({systemId,onClose}) => {
    const [systemsAccounts, setSystemAccounts] = useState([]);
    // 모달 관련 state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSystemId, setSelectedSystemId] = useState(null);
    const [selectedSystemUserId, setSelectedSystemUserId] = useState(null);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordData, setPasswordData] = useState(null);
    const navigate = useNavigate();
    const accessToken = localStorage.getItem("accessToken");
    const username = localStorage.getItem("userId");
    const [checkedItems, setCheckedItems] = useState([]);
    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };
    const handleChangePassword = () => {
        // Open the modal
        setIsModalOpen(true);
    };
    console.log("토큰 : " + accessToken +"\n"
        +"username : " + username);
    useEffect(() => {
        if( accessToken == null){
            alert("로그인하세요");
            navigate('/About');
        }else{
            const fetchData = async () => {
                const data = await getSystemAccounts(systemId);
                setSystemAccounts(data);
                console.log(data);
                // ...데이터를 처리하는 로직 작성
            };

            fetchData();
        }
    console.log(checkedItems);
    }, [systemId,checkedItems] ); //
    const handleCheckboxChange = (event, systemId, systemUserId) => {
        const { checked } = event.target;
        if (checked) {
            setCheckedItems((prevItems) => [...prevItems, { systemId, systemUserId }]);
            console.log(checkedItems)
        } else {
            setCheckedItems((prevItems) =>
                prevItems.filter((item) => !(item.systemId === systemId && item.systemUserId === systemUserId))
            );
        }
    };

    const handlePasswordCheck = (systemId, systemUserId) => {
        setSelectedSystemId(systemId);
        setSelectedSystemUserId(systemUserId);
        getAccountPassword(systemId, systemUserId)
            .then((data) => {
                // 받아온 데이터를 상태에 저장
                setPasswordData(data);
                // 모달 열기
                setIsModalOpen(true);
            })
            .catch((error) => {
                console.error('패스워드 확인 에러:', error);
            });
    };

    // Modal이 닫힐 때 state 초기화
    const handleCloseModal = () => {
        setSelectedSystemId(null);
        setSelectedSystemUserId(null);
        setIsModalOpen(false);
    };

    const handleClose = () => {
        // 부모 컴포넌트에 닫기 이벤트를 전달
        onClose();
    };

    const formatDateString = dateString => {
        const year = dateString.slice(0, 4);
        const month = dateString.slice(4, 6);
        const day = dateString.slice(6, 8);
        return `${year}-${month}-${day}`;
    };

    return (
        <div>
            <Card>
                <CardBody>
                    <Row xs="2">
                        <Col>
                    <h3>{systemId}의 계정 리스트</h3>
                        </Col>
                        <Col className="d-flex justify-content-end">
                        {/*<Button className="btn" color="primary">*/}
                        {/*    패스워드 변경*/}
                        {/*</Button>*/}
                        </Col>
                    </Row>
                    {/*<CardTitle tag="h5">Project Listing</CardTitle>*/}
                    {/*<CardSubtitle className="mb-2 text-muted" tag="h6">*/}
                    {/*  Overview of the projects*/}
                    {/*</CardSubtitle>*/}

                    <Table className="no-wrap mt-3 align-middle text-center" Table bordered hover >
                        <thead>
                        <tr>
                            <th><input type="checkbox"/></th>
                            <th>시스템 계정 ID</th>
                            <th>시스템 계정 그룹</th>
                            <th>생성일자</th>
                            <th>주 사용자</th>
                            <th>패스워드 동기화</th>
                            <th>패스워드 확인</th>
                        </tr>
                        </thead>
                        <tbody>
                        {systemsAccounts.map((systemAccount,index) => (
                            <tr key={index} className="border-top">
                                <td>
                                    <input type="checkbox" onChange={(e) => handleCheckboxChange(e, systemAccount.systemDB.systemId, systemAccount.systemUserId)}/>
                                </td>
                                <td>
                                    {systemAccount.systemUserId}
                                </td>
                                <td>{systemAccount.systemUserGroup}</td>
                                <td>{formatDateString(systemAccount.c_dt)}</td>
                                <td>관리자</td>
                                <td>
                                    {systemAccount.systemUserPasswdSync === "Y" ? (
                                        <span className="p-2 bg-success rounded-circle d-inline-block"></span>
                                    ) : (
                                        <span className="p-2 bg-danger rounded-circle d-inline-block"></span>
                                    )}
                                </td>
                                <td>
                                    {systemAccount.systemUserPasswdSync === "Y" ? (
                                        <Button className="btn" color="primary" onClick={() => handlePasswordCheck(systemAccount.systemDB.systemId, systemAccount.systemUserId)}>
                                            패스워드 확인
                                        </Button>
                                    ) : (
                                        null
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
            {/* 모달 */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={handleCloseModal}
                style={modalStyles2}
                contentLabel="Password Check Modal"
            >
                <div>
                    {/* Modal 내용에 원하는 작업 수행 */}
                    <p>System ID: {selectedSystemId}</p>
                    <p>System User ID: {selectedSystemUserId}</p>
                    <p>패스워드 : {passwordData}
                    </p>
                </div>
            </Modal>
        </div>
    );
};

export default SystemAccountList;