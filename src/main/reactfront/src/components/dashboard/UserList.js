// PostDetail.js
import React, { useEffect, useState, useCallback} from 'react';

import {useNavigate} from "react-router-dom";
import {Button ,Card, CardBody, Table} from "reactstrap";
import Modal from "react-modal";
import {getSelectedSystemList} from "../../api/System/SystemApi";
import {getUserList} from "../../api/user/UserAPI";
import {insertSystemAdmin} from "../../api/System/SystemAdminApi";

Modal.setAppElement('#root');

const UserList = ({checkedItems,onClose}) => {
    const navigate = useNavigate();
    const accessToken = localStorage.getItem("accessToken");
    const username = localStorage.getItem("userId");
    const selectSystemIds = checkedItems;
    const [systems, setSystems] = useState([]);
    const [userList, setUserList] = useState([]);
    const [selectUser, setSelectUser] = useState(null);
    const setSystemTable = async () => {
        try{
            const systems = await getSelectedSystemList(checkedItems);
            setSystems(systems);
            console.log(systems)
        }
        catch (error) {
            console.error('시스템 에러 발생:', error);
            return []; // 에러 발생 시 빈 배열 반환
        }

    }
    const setUserTable = async () => {
        try{
            const users = await getUserList();
            setUserList(users);
            console.log(users);
        }
        catch (error) {
            console.error('유저 에러 발생:', error);
            return []; // 에러 발생 시 빈 배열 반환
        }

    }
    useEffect(() => {
        if( accessToken == null){
            alert("로그인하세요");
            navigate('/About');
        }else{
            const fetchData = async () => {
                await setSystemTable();
                await setUserTable();
            };

            fetchData();
        }

    }, []); //
    const handleUserIdClicked = (userId) => {
        setSelectUser(userId);
        checkedItems.map(async function (systemId) {
            try{
                const response = await insertSystemAdmin(systemId, userId);
                console.log(response.data);
                alert('선택한 사용자 ${userId}에게 해당 시스템의 관리 권한을 부여했습니다');

            }
            catch (error) {
                console.log(error);
            }

        })

    }
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
                    <a>선택된 시스템</a>
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
                    <a>사용자를 선택하세요</a>
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
                                {user.userId != username ? (
                                    <Button onClick={() => handleUserIdClicked(user.userId)}>{user.userId}</Button>
                                ) : (
                                    <Button>{user.userId +"(사용자)"}</Button> // 조건이 맞지 않을 때 보여줄 내용
                                )}
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