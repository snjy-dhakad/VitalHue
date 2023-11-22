import React, { useEffect, useState } from "react";
import { Button, Form, Input, Radio, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../../apicalls/users";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/loaderSlice";
import { getAntdInputValidation } from "../../utils/helper";
function Login() {
    const [type, setType] = useState('donar');
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const onFinish=async(values)=>{
        try{
            dispatch(setLoading(true));
            const response=await LoginUser({...values,userType:type});
            dispatch(setLoading(false));
            if(response.success){
                message.success(response.message);
                localStorage.setItem("token",response.data);
                navigate("/");
            }
            else
                throw new Error(response.message);
        }
        catch(err){
            dispatch(setLoading(false));
            message.error(err.message);
        }
    }
    useEffect(()=>{
        if(localStorage.getItem("token"))
            navigate("/")
    },[]);
    return (
        <div className="flex h-screen items-center justify-center bg-slate-100 ">
            <Form layout="vertical" className="bg-white rounded shadow grid  p-5 gap-x-5 w-1/3"
            onFinish={onFinish}>
                <h1 className="uppercase text-2xl">
                    <span className="text-primary">{type.toUpperCase()}-Login</span>
                    <hr />
                </h1>
                <Radio.Group onChange={(e) => setType(e.target.value)} value={type} >
                    <Radio value='donar'>Donar</Radio>
                    <Radio value='hospital'>Hospital</Radio>
                    <Radio value='organization'>Organization</Radio>
                </Radio.Group>
                        
                        <Form.Item label='Email' name='email' rules={getAntdInputValidation()}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Password" name='password' rules={getAntdInputValidation()} >
                            <Input type='password'/>
                        </Form.Item>
                 
                <Button type="primary"  htmlType="submit">Login</Button>
                <Link to="/register" className=" text-center text-gray-700 underline">
                    Don't have an account? Register
                </Link>
            </Form>

        </div>
    );
}
export default Login;