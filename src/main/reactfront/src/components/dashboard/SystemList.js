import {useState, useEffect, useCallback} from "react";
import {Button, Card, CardBody, Table} from "reactstrap";
import {getSystemList} from "../../api/System/SystemApi";
import { useNavigate } from 'react-router-dom';
import SystemDetail from './SystemDetail'
import Modal from 'react-modal';
import modalStyles from '../../layout/ModalStyles'; // Import the styles

function SystemList() {
    const navigate = useNavigate();
    const [selectedSystemId, setSelectedSystemId] = useState(null);
    const [systems, setSystems] = useState([]);
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
                const data = await getSystemList();
                setSystems(data);
                // ...데이터를 처리하는 로직 작성
            };

            fetchData();
        }

    }, []); //
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

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = (SystemId) => {
        setSelectedSystemId(SystemId);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setSelectedSystemId(null);
        setModalIsOpen(false);
    };

    return (
        <div>
            <Card>
                <CardBody>
                    <button className="btn" color="secondary" >웹 사용자에게 권한 부여</button>


                    {/*<CardTitle tag="h5">Project Listing</CardTitle>*/}
                    {/*<CardSubtitle className="mb-2 text-muted" tag="h6">*/}
                    {/*  Overview of the projects*/}
                    {/*</CardSubtitle>*/}

                    <Table className="no-wrap mt-3 align-middle text-center" Table bordered hover >
                        <thead>
                        <tr>
                            <th><input type="checkbox"/></th>
                            <th>시스템 ID</th>
                            <th>시스템명</th>
                            <th>시스템유형</th>
                            <th>IP</th>
                            <th>계정수</th>
                            <th>관리자</th>
                            <th>생성일자</th>
                            <th>동기화일자</th>
                            <th>동기화여부</th>
                        </tr>
                        </thead>
                        <tbody>
                        {systems.map((system,index) => (
                            <tr key={index} className="border-top">
                                <td>
                                    <input type="checkbox"  onChange={(e) => handleCheckboxChange(e, system.systemId)}/>
                                </td>
                                <td>
                                    {/*<img*/}
                                    {/*  src={tdata.avatar}*/}
                                    {/*  className="rounded-circle"*/}
                                    {/*  alt="avatar"*/}
                                    {/*  width="45"*/}
                                    {/*  height="45"*/}
                                    {/*/>*/}
                                    <a onClick={() => openModal(system.systemId)}>
                                    {system.systemId}
                                    </a>
                                    <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={modalStyles}>
                                        {selectedSystemId && <SystemDetail systemId={selectedSystemId} />}
                                        <button onClick={closeModal}>닫기</button>
                                    </Modal>
                                    {/*<Link to={{ pathname: '../../AdminForms', search: `?param=${system.systemId}` }}*/}
                                    {/*      style={{textDecorationLine:'none',color:'black'}}>*/}
                                    {/*    <Button className="btn" outline color="secondary">*/}
                                    {/*        관리자등록*/}
                                    {/*    </Button>*/}
                                    {/*</Link>*/}
                                </td>
                                <td>{system.systemName}</td>
                                <td>{system.systemType}</td>
                                <td>{system.ipAddr}</td>
                                <td>3</td>
                                <td>1</td>
                                <td>{system.createDt}</td>
                                <td>{system.syncDt}</td>
                                <td>
                                    {system.syncYn === "N" ? (
                                        <span className="p-2 bg-danger rounded-circle d-inline-block"></span>
                                    ) : (
                                        <span className="p-2 bg-success rounded-circle d-inline-block"></span>
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
}

export default SystemList;





// const tableData = [
//   {
//    // avatar: user1,
//     id: "System1",
//     email: "CentOS",
//     project: "192.168.10.1",
//     weeks: "35",
//     admin: "-",
//     budget: "2023-11-01",
//     status: "N",
//     checked:false
//   },
//   {
//    // avatar: user2,
//     id: "System2",
//     email: "RedHat",
//     project: "192.168.10.2",
//     weeks: "35",
//     admin: "-",
//     budget: "2023-11-02",
//     status: "Y",
//     checked:false
//   },
//   {
//   //  avatar: user3,
//     id: "System3",
//     email: "Windows",
//     project: "192.168.10.3",
//     weeks: "4",
//     admin: "3",
//     budget: "2023-11-06",
//     status: "Y",
//     checked:false
//   },
//   {
//   //  avatar: user4,
//     id: "System4",
//     email: "MSSQL",
//     project: "192.168.10.4",
//     weeks: "352",
//     admin: "4",
//     budget: "2023-11-06",
//     status: "N",
//     checked:false
//   },
//   {
//   //  avatar: user5,
//     id: "System5",
//     email: "Oracle",
//     project: "192.168.10.5",
//     weeks: "2",
//     admin: "2",
//     budget: "2023-11-06",
//     status: "N",
//     checked:false
//   },
//   {
//     //  avatar: user5,
//     id: "System5",
//     email: "Oracle",
//     project: "192.168.10.5",
//     weeks: "6",
//     admin: "1",
//     budget: "2023-11-06",
//     status: "N",
//     checked:false
//   },
//   {
//     //  avatar: user5,
//     id: "System5",
//     email: "Oracle",
//     project: "192.168.10.5",
//     weeks: "7",
//     admin: "5",
//     budget: "2023-11-06",
//     status: "N",
//     checked:false
//   },
//   {
//     //  avatar: user5,
//     id: "System5",
//     email: "Oracle",
//     project: "192.168.10.5",
//     weeks: "127",
//     admin: "3",
//     budget: "2023-11-07",
//     status: "N",
//     checked:false
//   },
//   {
//     //  avatar: user5,
//     id: "System5",
//     email: "Oracle",
//     project: "192.168.10.5",
//     weeks: "53",
//     admin: "-",
//     budget: "2023-11-06",
//     status: "N",
//     checked:false
//   },
//   {
//     //  avatar: user5,
//     id: "System5",
//     email: "Oracle",
//     project: "192.168.10.5",
//     weeks: "42",
//     admin: "-",
//     budget: "2023-11-08",
//     status: "N",
//     checked:false
//   },
//   {
//     //  avatar: user5,
//     id: "System5",
//     email: "Oracle",
//     project: "192.168.10.5",
//     weeks: "35",
//     admin: "-",
//     budget: "2023-11-06",
//     status: "N",
//     checked:false
//   },
// ];
// const [checkboxes, setCheckboxes] = useState(tableData);
//
// const handleSelectAll = () => {
//   const updatedCheckboxes = checkboxes.map(checkbox => ({
//     ...checkbox,
//     checked: !checkboxes.every(cb => cb.checked)
//   }));
//   setCheckboxes(updatedCheckboxes);
// };
//
// const handleCheckboxChange = (id) => {
//   const updatedCheckboxes = checkboxes.map(checkbox =>
//       checkbox.id === id ? { ...checkbox, checked: !checkbox.checked } : checkbox
//   );
//   setCheckboxes(updatedCheckboxes);
// };


