import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { setLoading } from '../../../redux/loaderSlice';
import { Table, message } from 'antd';
import { GetAllDonarsOfAnOrganization } from '../../../apicalls/users';
import { getDateFormat } from '../../../utils/helper';

function Donars() {
    const [data, setData] = useState([]);
    const dispatch = useDispatch();

    const getData = async () => {
        try {
            dispatch(setLoading(true));
            const response = await GetAllDonarsOfAnOrganization();
            dispatch(setLoading(false));
            if (response.success) {
                setData(response.data);
                console.log("TB",response.data);
            } else {
                throw new Error(response.message);
            }
        }
        catch (err) {
            message.error(err.message);
            dispatch(setLoading(false));
        }
    };
    const columns=[
        {
            title:"Name",
            dataIndex:"name"
        },
        {
            title:"Email",
            dataIndex:"email"
        },
        {
            title:"Phone",
            dataIndex:"phone"
        },
        {
            title:"Created At",
            dataIndex:"createdAt",
            render:(text)=>getDateFormat(text)
        },

    ]
    useEffect(() => {
        getData();
        console.log("UE",data);
    }, []);
    return (
        <div>
            <Table columns={columns} dataSource={data}/>
        </div>
    )
}

export default Donars;