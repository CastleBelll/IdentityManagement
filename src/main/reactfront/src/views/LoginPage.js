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
  Input,
  // FormText
} from "reactstrap";
import { useState } from "react";

import { Link } from 'react-router-dom'; // React Router의 Link 컴포넌트 불러오기

import { login } from "../api/auth/AuthAPI";

export default function LoginPage() {


  const [values, setValues] = useState({
    username: "",
    password: "",
  });


  const handleChange = async (e) => {
    setValues({...values,
      [e.target.id]: e.target.value,
    });
  }


  const handleSubmit = async (e) => {
    login(values)
        .then((response) => {
          localStorage.clear();
          localStorage.setItem('tokenType', response.tokenType);
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken);
          localStorage.setItem('userId', values.username);
          window.location.href = '/';
        }).catch((error) => {
      console.log(error);
    });
  }
    return (
        <div style={{margin:'150px',paddingLeft:'300px',paddingRight:'300px'}}>
          <Row>
            <Col>
              <Card>
                <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                  <i className="bi bi-bell me-2"> </i>
                  IM 로그인페이지
                </CardTitle>
                <CardBody>
                  <Form>
                    <FormGroup>
                      <Label for="exampleId">ID</Label>
                      <Input
                          id="username" onChange={handleChange} value={values.username}
                          name="id"
                          placeholder="아이디"
                          type="text"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="examplePassword">PW</Label>
                      <Input
                          id="password" onChange={handleChange} value={values.password}
                          name="password"
                          placeholder="비밀번호"
                          type="password"
                      />
                    </FormGroup>
                    <div className="button-group">
                      <Button className="btn" color="info" size="lg" block onClick={handleSubmit}>로그인</Button>
                      <Link to="/signup">
                      <Button className="btn" outline color="success" size="sm">회원가입</Button>
                      </Link>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>

    );
}



