import { Button, Table, message } from 'antd';
import React, { useEffect, useState } from 'react';
import InventoryForm from './InventoryForm';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../../redux/loaderSlice';
import { GetInventory } from '../../../apicalls/inventory';
import { getDateFormat } from '../../../utils/helper';

function Inventory() {
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
        if (record.inventoryType === "in")
          return record.donar.name;
        else
          return record.hospital.hospitalName;
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

  const getData = async () => {
    try {
      dispatch(setLoading(true));
      const response = await GetInventory();
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
      <div className='flex justify-end'>
        <Button type='default' onClick={() => setOpen(true)}>Add Inventory</Button>
      </div>
      <Table columns={columns} dataSource={data} className='mt-3' />
      {open && <InventoryForm open={open} setOpen={setOpen} reloadData={getData} />}
    </div>
  );
}

export default Inventory;
