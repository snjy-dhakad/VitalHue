import { Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Form } from 'antd';
import React from "react";
import { getAntdInputValidation } from "../../utils/helper";
function OrgHospitalForm(props) {
    return (
        <>
            <Form.Item
                name={props.userType === 'hospital' ? 'hospitalName' : 'organizationName'}
                label={props.userType === 'hospital' ? 'Hospital Name' : 'Organization Name'}
                rules={getAntdInputValidation()}

            >
                <Input />
            </Form.Item>
            <Form.Item name='owner' label='Owner' rules={getAntdInputValidation()}>
                <Input />
            </Form.Item>
            <Form.Item name='email' label='Email' rules={getAntdInputValidation()}>
                <Input />
            </Form.Item>
            <Form.Item name='phone' label='Phone' rules={getAntdInputValidation()}>
                <Input />
            </Form.Item>
            <Form.Item name='website' label='Website' rules={getAntdInputValidation()}>
                <Input />
            </Form.Item>
            <Form.Item name='password' label='Password' rules={getAntdInputValidation()}>
                <Input type="password" />
            </Form.Item>
            <Form.Item name='address' label='Address'
                className="col-span-2" rules={getAntdInputValidation()}>
                <TextArea />
            </Form.Item>

        </>
    );
}
export default OrgHospitalForm;