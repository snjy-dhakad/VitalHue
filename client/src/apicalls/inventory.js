import { axiosInstance } from ".";

export const AddInventory=(data)=>{
    return axiosInstance('post','/api/inventory/add',data);
};

export const GetInventory=()=>{
    return axiosInstance('get','/api/inventory/get');
};

export const GetInventoryWithFilters=(filters,limit)=>{
    //console.log("Instance",data);
return axiosInstance("post","/api/inventory/filter",{filters,limit})//if fails in future then pass object as {filters:data}
}

