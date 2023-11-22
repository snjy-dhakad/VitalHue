import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./usersSlice";
import loaderReducer from "./loaderSlice";

const store=configureStore({
    reducer:{
        users:usersReducer,
        loaders:loaderReducer
    }
});
export default store;