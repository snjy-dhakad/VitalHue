import { message } from "antd";
import React, { useEffect, useState } from "react";
import { GetCurrentUser } from "../apicalls/users";
import { useNavigate } from 'react-router-dom';
import { getLoggedInUserName } from "../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../redux/usersSlice";
function ProtectedPage({ children }) {
    const { currentUser } = useSelector((state) => state.users);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const getCurrentUser = async () => {
        try {
            const response = await GetCurrentUser();
            if (response.success) {
                message.success(response.message);
                dispatch(setCurrentUser(response.data));
            }
            else
                throw new Error(response.message);


        }
        catch (err) {
            message.error(err.message);
        }
    };
    useEffect(() => {
        if (localStorage.getItem('token'))
            getCurrentUser();
        else
            navigate("/login");

    }, []);


    return (
        currentUser && (
            <div>
                {/* header*/}
                <div className="flex justify-between item-center bg-primary text-white px-5 py-3 gap-0 ">
                
                    <div onClick={()=>navigate("/")} className="cursor-pointer">
                        <h1 className="text-2xl leading-none">VitalHue</h1>
                        <span className="text-xs">{currentUser.userType.toUpperCase()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <i class="ri-shield-user-fill"> </i>
                        <div className="flex flex-col">
                            <span className="mr-5 text-md cursor-pointer " onClick={()=>navigate("/profile")}> {getLoggedInUserName(currentUser).toUpperCase()} </span>
                        </div>
                        <i className="ri-logout-circle-r-line ml-5 cursor-pointer"
                        onClick={()=>{
                            localStorage.removeItem("token");
                            navigate("/login");
                            }}
                            ></i>
                    </div>

                </div>
                {/*body*/}
                <div className="px-5 py-2">
                    {children}
                </div>

            </div>
        )
    );
}
export default ProtectedPage;