import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/loaderSlice";
import { getAllBloodGroupsInventory } from "../../apicalls/dashboard";
import InventoryTable from "../../components/InventoryTable";
function Home() {
    const { currentUser } = useSelector((state) => state.users);
    const [bloodGroupData, setBloodGroupData] = useState([]);
    const dispatch = useDispatch();
    const getData = async () => {
        try {
            dispatch(setLoading(true));
            const response = await getAllBloodGroupsInventory();
            dispatch(setLoading(false));
            if (response.success) {
                setBloodGroupData(response.data);
            }
            else {
                throw new Error(response.message);
            }
        }
        catch (err) {
            message.error(err.message);
            dispatch(setLoading(false));
        }
    }
    useEffect(() => {
        getData();
    }, []);
    const colors = [
        "#CE5959",
        "#1A5F7A",
        "#886218",
        "#245953",
        "#2C3333",
        "#4E6E81",
        "#A84448",
        "#635985"
    ];

    return (
        <div>
            
            {currentUser.userType === 'organization' &&
                <div>
                    <div className="grid grid-cols-4 gap-5 mt-2">
                        {bloodGroupData.map((bloodGroup, index) => {
                            const color = colors[index];
                            return (
                                <div className={`p-5 felx justify-between text-white rounded`}
                                    style={{ backgroundColor: color }}
                                >
                                    <h1 className="text-4xl uppercase">{bloodGroup.bloodGroup}</h1>
                                    <div className="flex flex-col justify-between gap-2">
                                        <div className="flex justify-end gap-5">
                                            <span>Total In: </span>
                                            <span>{bloodGroup.totalIn} ML</span>

                                        </div>
                                        <div className="flex justify-end gap-5">
                                            <span>Total Out: </span>
                                            <span> {bloodGroup.totalOut} ML</span>

                                        </div>
                                        <div className="flex justify-end gap-5">
                                            <span>Available: </span>
                                            <span>{bloodGroup.available} ML</span>

                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                    </div>
                    <span className="text-xl text-gray-700 font-semibold"> Your Recent Inventory</span>
                    <InventoryTable filters={{
                        organization: currentUser._id
                    }}
                        limit={5}
                        userType={currentUser.userType}
                    />
                </div>
            }
            {currentUser.userType === "donar" &&
                <>
                    <span className="text-xl text-gray-700 font-semibold"> Your Recent Donations</span>
                    <InventoryTable filters={{
                        donar: currentUser._id
                    }}
                        limit={5}
                        userType={currentUser.userType}
                    />
                </>
            }
            {currentUser.userType === "hospital" &&
                <>
                    <span className="text-xl text-gray-700 font-semibold"> Your Recent Consumptions</span>
                    <InventoryTable filters={{
                        hospital: currentUser._id
                    }}
                        limit={5}
                        userType={currentUser.userType}
                    />
                </>
            }
        </div>
    );
}
export default Home;