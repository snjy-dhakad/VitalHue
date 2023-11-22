import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getDateFormat } from '../utils/helper';
import { GetInventory, GetInventoryWithFilters } from '../apicalls/inventory';
import { setLoading } from '../redux/loaderSlice';
import { Table, message } from 'antd';

function InventoryTable({ filters, userType, limit }) {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const columns = [
    {
      title: "Inventory Type",
      dataIndex: "inventoryType",
      render: (text) => (text ? text.toUpperCase() : "N/A")
    },
    {
      title: "Blood Group",
      dataIndex: "bloodGroup",
      render: (text) => text.toUpperCase()
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      render: (text) => text + " ML"
    },
    {
      title: "Reference",
      dataIndex: "reference",
      render: (text, record) => {
        if (userType === 'organization') {
          return record.inventoryType==='in'?record.donor?.name:record.hospital?.hospitalName;
        } else {
          return record.organization.organizationName
        }
      }
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      render: (text) => getDateFormat(text),
      sorter: (a, b) => new Date(b.createdAt) - new Date(a.createdAt), // Custom sorting function
      //defaultSortOrder: "descend", // Set the default sorting order to descending
    }
  ];

  //change column for hospital
  if (userType !== 'organization') {
    columns.splice(0, 1);
    columns[2].title = "Organization Name";
    columns[3].title = (userType === 'hospital' ? "Consumed On" : "Donated On");
  }

  const getData = async () => {
    try {
      dispatch(setLoading(true));
      const response = await GetInventoryWithFilters(filters, limit);
      dispatch(setLoading(false));
      if (response.success) {
        setData(response.data);
      } else {
        throw new Error(response.message);
      }
    }
    catch (err) {
      message.error(err.message);
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <Table columns={columns} dataSource={data} className='mt-3' />
    </div>
  )
}

export default InventoryTable