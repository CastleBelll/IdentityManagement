// PostDetail.js
import React, { useEffect, useState, useCallback} from 'react';

import {getSystemAccounts} from "../../api/System/SystemUserApi";
import {useNavigate} from "react-router-dom";
import {ButtonGroup, Button, Form, FormGroup, Input, Label, Card, CardBody, Table} from "reactstrap";
import Modal from "react-modal";
import modalStyles from "../../layout/ModalStyles";

const SystemAccountList = ({systemId,onClose}) => {
    const [systemsAccounts, setSystemAccounts] = useState([]);
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
                const data = await getSystemAccounts(systemId);
                setSystemAccounts(data);
                console.log(data);
                // ...데이터를 처리하는 로직 작성
            };

            fetchData();
        }

    }, [systemId]); //
    const [checkedItems, setCheckedItems] = useState([]);
    const handleCheckboxChange = (event, systemId) => {
        const { checked } = event.target;
        if (checked) {
            setCheckedItems([...checkedItems, systemId]);
            console.log(checkedItems)
        } else {
            const updatedItems = checkedItems.filter((item) => item !== systemId);
            setCheckedItems(updatedItems);
        }
    };
    const handleClose = () => {
        // 부모 컴포넌트에 닫기 이벤트를 전달
        onClose();
    };

    return (
        <div>
            <Card>
                <CardBody>
                    <h3>{systemId}의 계정 리스트</h3>


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
                        </tr>
                        </thead>
                        <tbody>
                        {systemsAccounts.map((systemAccount,index) => (
                            <tr key={index} className="border-top">
                                <td>
                                    <input type="checkbox"  onChange={(e) => handleCheckboxChange(e, systemAccount.systemUserId)}/>
                                </td>
                                <td>
                                    {systemAccount.systemUserId}
                                </td>
                                <td>{systemAccount.systemUserGroup}</td>
                                <td>{systemAccount.createDt}</td>
                                <td>관리자</td>
                                <td>
                                    {systemAccount.systemUserPasswdSync === "Y" ? (
                                        <span className="p-2 bg-success rounded-circle d-inline-block"></span>
                                    ) : (
                                        <span className="p-2 bg-danger rounded-circle d-inline-block"></span>
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>

        </div>
    );
};

export default SystemAccountList;