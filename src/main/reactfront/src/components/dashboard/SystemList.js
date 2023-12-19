import {useState, useEffect, useCallback} from "react";
import {Button, Card, CardBody, Table} from "reactstrap";
import {getSystemList} from "../../api/System/SystemApi";
import {Link, useNavigate} from 'react-router-dom';
import SystemDetail from './SystemDetail'
import Modal from 'react-modal';
import modalStyles from '../../layout/ModalStyles';
import SystemAccountList from "./SystemAccountList";
import UserList from "./UserList";
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
                if (data === 403) {
                    alert("로그인하세요");
                    navigate('/About');
                }
                else{
                    setSystems(data);
                }
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
    const [modalIsOpen2, setModalIsOpen2] = useState(false);
    const [modalIsOpen3, setModalIsOpen3] = useState(false);

    const openModal = (SystemId) => {
        setSelectedSystemId(SystemId);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setSelectedSystemId(null);
        setModalIsOpen(false);
    };

    const openModal2 = (SystemId) => {
        setSelectedSystemId(SystemId);
        setModalIsOpen2(true);
    };

    const closeModal2 = () => {
        setSelectedSystemId(null);
        setModalIsOpen2(false);
    };
    const openModal3 = (checkedItems) => {
        setModalIsOpen3(true);
    };

    const closeModal3 = () => {
        setModalIsOpen3(false);
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
            <span style={{textDecorationLine:'none',color:'black', float:"right"}}>
                <Button className="btn" outline color="secondary" onClick={()=> openModal3(checkedItems)}>웹 사용자에게 권한 부여</Button>
                <Modal isOpen={modalIsOpen3} onRequestClose={closeModal3}>
                    {checkedItems && <UserList onClose={closeModal3} checkedItems={checkedItems}/>}
                </Modal>

            </span>

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
                                    <a style={{ fontWeight: 'bold', color: 'blue' }}
                                       onMouseOver={(e) => e.target.style.cursor = 'pointer'}
                                       onMouseOut={(e) => e.target.style.cursor = 'default'}
                                        onClick={() => openModal(system.systemId)}>
                                    {system.systemId}
                                    </a>
                                    <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={modalStyles}>
                                        {selectedSystemId && <SystemDetail onClose={closeModal} systemId={selectedSystemId} />}
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
                                <td>
                                    <a style={{ fontWeight: 'bold', color: 'blue' }}
                                       onMouseOver={(e) => e.target.style.cursor = 'pointer'}
                                       onMouseOut={(e) => e.target.style.cursor = 'default'}
                                       onClick={()=> openModal2(system.systemId)}>
                                        {system.system_user_id_count}
                                    </a>
                                    <Modal isOpen={modalIsOpen2} onRequestClose={closeModal2} style={modalStyles}>
                                        {selectedSystemId && <SystemAccountList onClose={closeModal2} systemId={selectedSystemId}/>}
                                    </Modal>
                                </td>
                                <td>1</td>
                                <td>{formatDateString(system.createDt)}</td>
                                <td>{formatDateString(system.syncDt)}</td>
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