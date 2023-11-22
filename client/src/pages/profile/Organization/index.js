import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../../redux/loaderSlice';
import { Button, Modal, Table, message } from 'antd';
import { GetAllOrganizationsOfADonar, GetAllOrganizationsOfAHospital } from '../../../apicalls/users';
import { getDateFormat } from '../../../utils/helper';
import InventoryTable from '../../../components/InventoryTable';
function Organizations({ userType }) {
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const { currentUser } = useSelector((state) => state.users);
  const [selectedOrganization, setSelectedOrganization] = useState(null);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(setLoading(true));
      const response = await (userType === 'donar' ? GetAllOrganizationsOfADonar() : GetAllOrganizationsOfAHospital());
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
  const columns = [
    {
      title: "Name",
      dataIndex: "organizationName"
    },
    {
      title: "Email",
      dataIndex: "email"
    },
    {
      title: "Phone",
      dataIndex: "phone"
    },
    {
      title: "Address",
      dataIndex: "address"
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (text) => getDateFormat(text)
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <span className='underline text-md cursor-pointer' onClick={() => {
          setSelectedOrganization(record);
          setShowHistoryModal(true);
        }
        }>History</span>
      ),
    },


  ]
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <Table columns={columns} dataSource={data} />
      {showHistoryModal &&
        <Modal
          title={`${userType === 'donar' ? 'Donation History'
              : "Consumption History"
            } In ${selectedOrganization.organizationName}`
          }
          centered
          open={showHistoryModal}
          onClose={() => setShowHistoryModal(false)} // Fix typo here
          width={1000}
          onCancel={() => setShowHistoryModal(false)}
          onOk={() => setShowHistoryModal(false)} // Fix typo here
        >
          <InventoryTable filters={{ organization: selectedOrganization._id, [userType]: currentUser._id }} />
        </Modal>
      }
    </div>
  )
}

export default Organizations;