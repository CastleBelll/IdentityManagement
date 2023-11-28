import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import './BoardList.css'
import SystemDbService from '../api/System/SystemApi.js';
class BoardListDB extends Component{
    constructor(props) {
        super(props)
        // # 1.
        this.state = {
            SystemDB: []
        }
    }
    // # 2.
    componentDidMount() {
        SystemDbService.getSystemDB().then((res) => {
            this.setState({ SystemDB: res.data});
        });
        console.log(this.state.SystemDB)
    }

    render() {
        return (
        <div className='board'>
            <Table style={{display:'block',marginLeft:'200px',marginTop:'100px'}}>
                <thead>
                <tr>
                    <th>번호</th>
                    <th>OS_ID</th>
                    <th>OS_NAME</th>
                    <th>Type</th>
                    <th>IP</th>
                    <th>계정수</th>
                    <th>관리자</th>
                    <th>생성일자</th>
                    <th>동기화일자</th>
                    <th>동기화여부</th>
                    <th>비고</th>
                </tr>
                </thead>
                <tbody>
                {
                    this.state.SystemDB.map(
                        SystemDB =>
                            <tr key = {SystemDB.systemId}>
                                <td> {SystemDB.systemNum} </td>
                                <td> {SystemDB.systemName} </td>
                                <td> {SystemDB.systemType} </td>
                                <td> {SystemDB.ipAddr} </td>
                                <td> {SystemDB.systemDesc} </td>
                                <td> {SystemDB.systemBy} </td>
                                <td> {SystemDB.systemDt} </td>
                                <td> {SystemDB.updateDt} </td>
                                <td> {SystemDB.updateBy} </td>
                                <td> {SystemDB.systemCategory} </td>
                                <td> {SystemDB.systemGroup} </td>

                            </tr>
                    )
                }
                </tbody>
            </Table>

        </div>
    );
    }


};

export default BoardListDB;