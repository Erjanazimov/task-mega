import {configureStore} from "@reduxjs/toolkit";
import authorizationReducer from "./authorizationSlice";
import groupReducer from "./groupSlice";
import editReducer from "./editSlice";
import studentsTaskReducer from "./studentsTaskSlice";
import downloadTaskReducer from "./downloadTaskSlice";

export default configureStore({
    reducer:{
        authorization: authorizationReducer,
        groups: groupReducer,
        edit: editReducer,
        studentTasks: studentsTaskReducer,
        downloadTask: downloadTaskReducer
    }
})