import {
  Card,
  Row,
  Col,
  CardTitle,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import {insertSystemAdmin} from "../../api/System/SystemAdminApi";

const AdminForms = () => {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const systemId = searchParams.get('param');
  const userId = localStorage.getItem('userId');

  const [formData, setFormData] = useState({
    systemId: systemId,
    systemAdminId: "",
    systemAdminName: "",
    systemAdminPassword:"",
    userId: userId
  });
console.log(formData);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const response = insertSystemAdmin(formData);
      alert('정상적으로 등록되었습니다.');

      console.log(response.data); // 서버로부터 받은 응답 확인

      // 글쓰기가 성공하면 리다이렉션 또는 다른 작업 수행
    } catch (error) {
      if (error.response && error.response.status === 500) {
        // 서버에서 오류 응답을 받은 경우
        alert(error.response.data);
        console.error(error.response.data.toString());
      } else {
        // 요청 자체에 오류가 있는 경우
        alert('게시물 등록에 실패했습니다. 다시 시도해주세요.');

        console.error('Error creating post:', error.message);
      }
    }

    console.log(formData);

  };

  return (

      <Row>
        <CardTitle tag="h6" className="border-bottom p-3 mb-0">
          <span style={{fontSize:23}}>시스템 관리자 등록</span>
          <span style={{float:"right"}}>
            <span style={{textDecorationLine:'none',color:'black'}}>
            </span>
            </span>
        </CardTitle>
        <Col>
          {/* --------------------------------------------------------------------------------*/}
          {/* Card-1*/}
          {/* --------------------------------------------------------------------------------*/}
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              <i className="bi bi-bell me-2"> </i>
            </CardTitle>
            <CardBody>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="systemId">System ID</Label>
                  <Input
                      id="systemId"
                      name="systemId"
                      placeholder="System ID"
                      type="text"
                      value={systemId}
                      required
                  />
                  <FormGroup>
                    <Label for="userId">USER ID</Label>
                    <Input
                        id="userId"
                        name="userId"
                        placeholder="User ID"
                        type="text"
                        value={userId}
                        required
                    />


                </FormGroup>
                <FormGroup>
                  <Label for="systemAdminName">System Admin Name</Label>
                  <Input
                      id="systemAdminName"
                      name="systemAdminName"
                      placeholder="System Admin Name"
                      type="text"
                      value={formData.systemAdminName}
                      onChange={handleChange}
                  />
                  <a
                      className="btn"
                      outline color="secondary"
                      style={{float:"right",marginTop:"5px"}}
                  >
                    ID Check
                  </a>
                </FormGroup>
                <FormGroup>
                  <Label for="systemAdminId">System Admin Id</Label>
                  <Input
                      id="systemAdminId"
                      name="systemAdminId"
                      placeholder="systemAdminId"
                      type="text"
                      value={formData.systemAdminId}
                      onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="systemAdminPassword">System Admin Password</Label>
                  <Input
                      id="systemAdminPassword"
                      name="systemAdminPassword"
                      placeholder="systemAdminPassword"
                      type="password"
                      value={formData.systemAdminPassword}
                      onChange={handleChange}
                  />
                </FormGroup>
                <Button
                    type="submit"
                    style={{float:"right"}}>
                  Submit
                </Button>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
  );
};
export default AdminForms;
