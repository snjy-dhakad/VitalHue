import React, { useState, useEffect } from "react";
import { Button, Form, Input, Radio, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import OrgHospitalForm from "./OrgHospitalForm";
import { RegisterUser } from "../../apicalls/users";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/loaderSlice";
import { getAntdInputValidation } from "../../utils/helper";
function Register() {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [userType, setuserType] = useState('donar');
    const onFinish = async (values) => {
        try {
            dispatch(setLoading(true));
            const response = await RegisterUser({...values,userType});
            dispatch(setLoading(false));
            if (response.success) {
                message.success(response.message);
                navigate("/login");
            }
            else {
                throw new Error(response.message);
            }

        } catch (err) {
            dispatch(setLoading(false));
            message.error(err.message);
        }
    };

    useEffect(()=>{
        if(localStorage.getItem("token"))
            navigate("/login")
    },[]);

    return (
        <div className="flex h-screen items-center justify-center bg-slate-100 ">
            <Form layout="vertical" className="bg-white rounded shadow-xl grid  grid-cols-2 p-5 gap-x-5 w-1/2 m-0"
                onFinish={onFinish}>
                <h1 className="col-span-2 uppercase">
                    <span className="text-primary">{userType.toUpperCase()}-Register</span>
                    <hr />
                </h1>
                <Radio.Group onChange={(e) => setuserType(e.target.value)} value={userType} className="col-span-2">
                    <Radio value='donar'>Donar</Radio>
                    <Radio value='hospital'>Hospital</Radio>
                    <Radio value='organization'>Organization</Radio>
                </Radio.Group>

                {userType === 'donar' && (
                    <>
                        <Form.Item label='Name' name='name' rules={getAntdInputValidation()}>
                            <Input />
                        </Form.Item>
                        <Form.Item label='Email' name='email'  rules={getAntdInputValidation()}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Phone" name='phone'  rules={getAntdInputValidation()} >
                            <Input />
                        </Form.Item>
                        <Form.Item label="Password" name='password'  rules={getAntdInputValidation()}>
                            <Input type='password' />
                        </Form.Item>
                    </>
                )}
                {userType !== 'donar' &&
                    <OrgHospitalForm userType={userType} />
                }
                <Button type="primary" className="col-span-2" htmlType="submit">Register</Button>
                <Link to="/login" className="col-span-2 text-center text-gray-700 underline">
                    Already have an account? Login
                </Link>
            </Form>

        </div>
    );
}
export default Register;