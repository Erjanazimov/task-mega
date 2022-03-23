import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify";

export const fetchLanguages = createAsyncThunk(
    "downloadTask/fetchLanguages",
    async function(token, {rejectWithValue, dispatch}){
        try {
            let options = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `token ${token.tokenState[0].auth_token}`
                }
            }

            const response = await fetch("https://app1.megacom.kg:9090/task-manager/api/v1/tasks/languages/", options);
            const data = await response.json();

            dispatch(addLanguages({data}))
        } catch (error){
            return rejectWithValue(error.message)
        }
    }
)

export const fetchThemes = createAsyncThunk(
    "downloadTask/fetchThemes",
    async function(token, {rejectWithValue, dispatch}){
        try {
            let options = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `token ${token.tokenState[0].auth_token}`
                }
            }

            const response = await fetch("https://app1.megacom.kg:9090/task-manager/api/v1/tasks/themes/", options);
            const data = await response.json();

            const res = data.map(item => {
                return {
                    ...item,
                    bool: false
                }
            })

            if (response.ok){
                dispatch(addTheme({res}))
            }
        } catch (error){
            return rejectWithValue(error.message)
        }
    }
)

export const fetchTaskPost = createAsyncThunk(
    "downloadTask/fetchTaskPost",
    async function(token, {rejectWithValue, dispatch}){
        try {
            const newObj = {}



            let options = {
                method: "POST",
                headers: {
                    "Content-Type": "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
                    "Authorization": `token ${token.token[0].auth_token}`,
                    // 'content-type': 'multipart/form-data'
                },
                body: token.obj
            }

            const config = {
                headers: {  'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW', }
            }



            const response = await fetch("https://app1.megacom.kg:9090/task-manager/api/v1/tasks/task/", options);
            const data = await response.json();
            console.log(token)
            // console.log("post", token.obj)






            // if (response.ok) {
            //
            // }else {
            //     for (let i in  data){
            //         toast.error(data[i].toString())
            //     }
            // }
        } catch (error){
            return rejectWithValue(error.message)
        }
    }
)

const downloadTaskSlice = createSlice({
    name: "downloadTask",
    initialState: {
        languages: [],
        downloadText: {
            title: "",
            description: "",
            points: "",
            order_num: "",
            sample_text: "",
            language: "",
            theme: [],
            test_file: null
        },
        saveThemes: []
    },
    reducers:{
        addLanguages(state, action){
            state.languages = action.payload.data;
        },
        taskHandler(state, action){
            let keys = Object.keys(action.payload);
            let text = action.payload[keys[0]];
            state.downloadText[keys[0]] = text;
        },
        fileHandler(state, action){
            state.downloadText.test_file = action.payload.file
        },
        addTheme(state, action){
            state.saveThemes = action.payload.res;
        },
        checkBool(state, action){
            const res = state.saveThemes.find(item => item.id === action.payload.id);
            res.bool = !res.bool
        },
        selectLanguages(state, action){
            state.downloadText.language = action.payload.lan
        },
        nullTextSample(state){
            state.downloadText.sample_text = ""
        },
        addFile(state,action){
            state.downloadText.theme = action.payload.map(item => {
                    return item.id
                }
            )
        },
        nullTheme(state){
            state.downloadText.theme = []
        },
        fileSave(state, action){
            state.downloadText.test_file = action.payload.file
        }

    }
})

export const {addLanguages, taskHandler,
    fileHandler, addTheme, checkBool, selectLanguages,
    nullTextSample, addFile, nullTheme, fileSave} = downloadTaskSlice.actions;

export default downloadTaskSlice.reducer;