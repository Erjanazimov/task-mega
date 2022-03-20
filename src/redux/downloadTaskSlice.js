import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

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
            test_file: ""
        }
    },
    reducers:{
        addLanguages(state, action){
            state.languages = action.payload.data
        },
        taskHandler(state, action){
            let keys = Object.keys(action.payload);
            let text = action.payload[keys[0]];
            state.downloadText[keys[0]] = text;
        }
    }
})

export const {addLanguages, taskHandler} = downloadTaskSlice.actions;

export default downloadTaskSlice.reducer;