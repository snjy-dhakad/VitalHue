import {axiosInstance} from ".";
export const LoginUser=async(payload)=>{
    const response= await axiosInstance("post","api/user/login",payload);
    return response;
};
export const RegisterUser=async(payload)=>{
    const response= await axiosInstance("post","api/user/register",payload);
    return response;
};
export const GetCurrentUser=async()=>{
    const response= await axiosInstance("get","api/user/get-current-user");
    return response;
};

export const GetAllDonarsOfAnOrganization=()=>{
    return axiosInstance('get','/api/user/get-all-donars');
};

export const GetAllHospitalsOfAnOrganization=()=>{
    return axiosInstance('get','/api/user/get-all-hospitals');
};
export const GetAllOrganizationsOfADonar=()=>{
    return axiosInstance('get','/api/user/get-all-organizations-of-a-donar');
};

export const GetAllOrganizationsOfAHospital=()=>{
    return axiosInstance('get','/api/user/get-all-organizations-of-a-hospital');
};