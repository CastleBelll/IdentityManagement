import { Col, Row } from "reactstrap";
import ProjectTables from "../components/dashboard/SystemList";
import Modal from 'react-modal';
import { CardTitle,Button } from "reactstrap";
import { Link } from "react-router-dom";
import {useState} from "react";
import SystemDetail from "../components/dashboard/SystemDetail";
import modalStyles from "../layout/ModalStyles";
const IManage = () => {

  return (
    <div>
      {/***Table ***/}
      <CardTitle tag="h6" className="border-bottom p-3 mb-0">

          <span style={{fontSize:23}}>시스템 관리</span>

          </CardTitle>
          
      <Row>
        
        <Col lg="12">
          <ProjectTables/>
        </Col>
      </Row>
    </div>
  );
};

export default IManage;
