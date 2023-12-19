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

import React, { useState } from 'react';
import {insertSystem} from "../../api/System/SystemApi";
import {insertSystemAdmin} from "../../api/System/SystemAdminApi";

const Forms = () => {

  const [formData, setFormData] = useState({
    systemId: "",
    systemName: "",
    systemDesc: "",
    ipAddr: "",
    systemType: "",
    systemCategory: ""
  });



  const handleFirstDropdownChange = (e) => {
    const selectedCategory = e.target.value;
    // 선택된 카테고리에 따라 두 번째 드롭다운의 옵션을 동적으로 설정
    const updatedOptions = getSystemTypeOptions(selectedCategory);

    setFormData({
      ...formData,
      systemCategory: selectedCategory,
      systemType: '', // 선택된 카테고리 변경 시 두 번째 드롭다운 초기화
    });

    setSecondDropdownOptions(updatedOptions);
  };
  const handleSecondDropdownChange = (e) => {
    setFormData({
      ...formData,
      systemType: e.target.value,
    });
  };

  const getSystemTypeOptions = (selectedCategory) => {
    // 선택된 카테고리에 따라 동적으로 옵션을 설정
    switch (selectedCategory) {
      case 'OS':
        return ['','Windows', 'Linux'];
      case 'DBMS':
        return ['','Oracle', 'MsSQL', 'MySQL'];
      default:
        return [''];
    }
  };

  const [secondDropdownOptions, setSecondDropdownOptions] = useState([]);
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const response1 = insertSystem(formData);
      alert('정상적으로 등록되었습니다.');
      const response2 = insertSystemAdmin(formData.systemId, localStorage.getItem("userId"))
      console.log(response2.data); // 서버로부터 받은 응답 확인
      window.location.href = '/';

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
          <span style={{fontSize:23}}>시스템 등록</span>
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
                      value={formData.systemId}
                      onChange={handleChange}
                      required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="systemName">System Name</Label>
                  <Input
                      id="systemName"
                      name="systemName"
                      placeholder="System Name"
                      type="text"
                      value={formData.systemName}
                      onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="systemDesc">System Desc</Label>
                  <Input
                      id="systemDesc"
                      name="systemDesc"
                      placeholder="System Desc"
                      type="text"
                      value={formData.systemDesc}
                      onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="systemCategorySelect">System Category</Label>
                  <Input id="systemCategorySelect"
                         name="select"
                         type="select"
                         value={formData.systemCategory}
                         onChange={handleFirstDropdownChange}
                         placeholder="-"
                         required
                  >
                    <option></option>
                    <option value="OS">OS</option>
                    <option value="DBMS">DBMS</option>
                  </Input>
                </FormGroup>

                <FormGroup>
                  <Label for="systemTypeSelect">System Type</Label>
                  <Input id="systemTypeSelect"
                         name="systemType"
                         type="select"
                         required
                         placeholder="-"
                         value={formData.systemType}
                         onChange={handleSecondDropdownChange}
                  >

                    {secondDropdownOptions.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                    ))}
                  </Input>

                </FormGroup>
                <FormGroup>
                  <Label for="ipAddr">IP</Label>
                  <Input
                      id="ipAddr"
                      name="ipAddr"
                      placeholder="000.000.000.000"
                      type="text"
                      value={formData.ipAddr}
                      onChange={handleChange}
                  />
                </FormGroup>
                <Button
                    type="submit"
                    style={{float:"right"}}>
                  Submit
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
  );
};
export default Forms;
