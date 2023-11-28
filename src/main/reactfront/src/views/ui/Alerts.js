import { Col, Row } from "reactstrap";
import ProjectTables from "../../components/dashboard/ProjectTable";

import { CardTitle } from "reactstrap";

const Alerts = () => {
  return (
    <div>
      {/***Table ***/}
      <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <div style={{fontSize:23}}>사용자 관리</div>
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

export default Alerts;
