import { Col, Row } from "reactstrap";
import ProjectTables from "../components/dashboard/SystemList";

import { CardTitle,Button } from "reactstrap";
import { Link } from "react-router-dom";
const IManage = () => {
  return (
    <div>
      {/***Table ***/}
      <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <span style={{fontSize:23}}>시스템 관리</span>
            <span style={{float:"right"}}>
            <Link to="../Forms" style={{textDecorationLine:'none',color:'black'}}>
            <Button className="btn" outline color="secondary">
                  시스템 등록
                </Button>
            </Link>
            </span>
          </CardTitle>
          
      <Row>
        
        <Col lg="12">
          <ProjectTables/>
        </Col>
      </Row>
      <Row>
        <span>
          Starter 원본
        </span>
      </Row>
    </div>
  );
};

export default IManage;
