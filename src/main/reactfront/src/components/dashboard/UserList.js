// PostDetail.js
import React, { useEffect, useState, useCallback} from 'react';

import {getSystemAccounts} from "../../api/System/SystemUserApi";
import {useNavigate} from "react-router-dom";
import {ButtonGroup, Button, Form, FormGroup, Input, Label, Card, CardBody, Table} from "reactstrap";
import Modal from "react-modal";
import modalStyles from "../../layout/ModalStyles";
import {getSelectedSystemList} from "../../api/System/SystemApi";
import {getUserList} from "../../api/user/UserAPI";
import SystemDetail from "./SystemDetail";
import SystemAccountList from "./SystemAccountList";

const UserList = ({checkedItems,onClose}) => {
    const navigate = useNavigate();
    const accessToken = localStorage.getItem("accessToken");
    const username = localStorage.getItem("userId");
    const selectSystemIds = checkedItems;
    const [systems, setSystems] = useState([]);
    const [userList, setuserList] = useState([]);

    console.log("토큰 : " + accessToken +"\n"
        +"username : " + username);
    useEffect(() => {
        if( accessToken == null){
            alert("로그인하세요");
            navigate('/About');
        }else{
            const fetchData = async () => {
                try{
                    const systems = await getSelectedSystemList(selectSystemIds);
                    setSystems(systems);
                    const userList = await getUserList();
                    setuserList(userList);
                    console.log(systems);
                    console.log(userList);

                }

                catch (error) {
                    console.error('에러 발생:', error);
                    return []; // 에러 발생 시 빈 배열 반환
                }
            };

            fetchData();
        }

    }, []); //

    const handleClose = () => {
        // 부모 컴포넌트에 닫기 이벤트를 전달
        onClose();
    };

    return (
        <div>
            <Card>
                <CardBody>



                    {/*<CardTitle tag="h5">Project Listing</CardTitle>*/}
                    {/*<CardSubtitle className="mb-2 text-muted" tag="h6">*/}
                    {/*  Overview of the projects*/}
                    {/*</CardSubtitle>*/}

                    <Table className="no-wrap mt-3 align-middle text-center" Table bordered hover >
                        <thead>
                        <tr>
                            <th>시스템 계정 Name</th>
                            <th>시스템 계정 Category</th>
                            <th>시스템 계정 Type</th>
                            <th>IpAddr</th>
                        </tr>
                        </thead>
                        <tbody>
                        {systems.map((system,index) => (
                            <tr key={index} className="border-top">
                                <td>{system.systemName}</td>
                                <td>{system.systemCategory}</td>
                                <td>{system.systemType}</td>
                                <td>{system.ipAddr}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                    <Table className="no-wrap mt-3 align-middle text-center" Table bordered hover >
                        <thead>
                        <tr>
                            <th>사용자 ID</th>
                            <th>사용자 이름</th>
                            <th>시스템 권한</th>
                        </tr>
                        </thead>
                        <tbody>
                            {userList.map((user,index) => (
                                <tr key={index} className="border-top">
                                    <td>{user.userId}</td>
                                    <td>{user.userName}</td>
                                    <td>  {user.role === 'ROLE_USER' ? '일반 사용자' : user.role === 'ADMIN' ? '관리자' : ''}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
            <div>
                <div className="button-group" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button className="btn" color="primary" onClick={handleClose}>Close</Button>
                </div>
            </div>
        </div>
    );
};

export default UserList;