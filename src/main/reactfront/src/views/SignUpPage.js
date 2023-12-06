import { useState } from "react";
import { signUp } from "../api/user/UserAPI";
import { useNavigate } from 'react-router-dom';

export default function SignUpPage() {
    const [values, setValues] = useState({
        userId:"",
        userName: "",
        userPassword: "",
    });
    const navigate = useNavigate();
    const handleChange = async (e) => {
        setValues({...values,
            [e.target.id]: e.target.value,
        });
    }

    const handleSubmit = async (e) => {
        signUp(values)
            .then((response) => {
                navigate('/About');
            }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <div className="d-flex justify-content-center" style={{ minHeight: "100vh" }}>
            <div className="align-self-center">
                <form onSubmit={handleSubmit}>
                    <div className="form-group" style={{ minWidth: "25vw" }}>
                        <label htmlFor="userId">아이디</label>
                        <input type="text" className="form-control" id="userId" onChange={handleChange} value={values.userId} />
                    </div>
                    <div className="form-group" style={{ minWidth: "25vw" }}>
                        <label htmlFor="userPassword">비밀번호</label>
                        <input type="password" className="form-control" id="userPassword" onChange={handleChange} value={values.userPassword} />
                    </div>
                    <div className="form-group" style={{ minWidth: "25vw" }}>
                        <label htmlFor="userName">이름</label>
                        <input type="text" className="form-control" id="userName" onChange={handleChange} value={values.userName} />
                    </div>
                    <div className="form-group" style={{ minWidth: "25vw" }}>
                        <button type="submit" style={{ width: "100%"}}>회원가입</button>
                    </div>
                </form>
            </div>
        </div>
    );
}