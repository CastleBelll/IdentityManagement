import {useState, useEffect} from "react";
import {Button, Card, CardBody, Table} from "reactstrap";
import {getUserList} from "../../api/System/UserApi";
import {Link, useNavigate} from 'react-router-dom';
function WebUserList() {
    const navigate = useNavigate();
    const [selectedSystemId, setSelectedSystemId] = useState(null);
    const [users, setUsers] = useState([]);
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
                const data = await getUserList();
                setUsers(data);
                // ...데이터를 처리하는 로직 작성
            };

            fetchData();
        }

    }, []); //
    const [checkedItems, setCheckedItems] = useState([]);

    const handleCheckboxChange = (event, systemId) => {

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
                    {/*<CardTitle tag="h5">Project Listing</CardTitle>*/}
                    {/*<CardSubtitle className="mb-2 text-muted" tag="h6">*/}
                    {/*  Overview of the projects*/}
                    {/*</CardSubtitle>*/}
                    <Table className="no-wrap mt-3 align-middle text-center" Table bordered hover >
                        <thead>
                        <tr>
                            <th><input type="checkbox"/></th>
                            <th>사용자 ID</th>
                            <th>사용자 이름</th>
                            <th>생성일자</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((user,index) => (
                            <tr key={index} className="border-top">
                                <td>
                                    <input type="checkbox"/>
                                </td>
                                <td>{user.userId}</td>
                                <td> {user.userName}</td>
                                <td> {formatDateString(user.createDate)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>

        </div>
    );
}

export default WebUserList;
