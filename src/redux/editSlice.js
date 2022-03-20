import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify";


export const fetchEditBtn = createAsyncThunk(
    "edit/fetchEditBtn",
    async function(token, {rejectWithValue, dispatch}){
        try {
            let options = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `token ${token.tokenState[0].auth_token}`
                },
                body: JSON.stringify(token.editGroupState)
            }

            const response = await fetch(`https://app1.megacom.kg:9090/task-manager/api/v1/group/update/${token.editGroupState.id}`, options);
            const data = await response.json();
            if (response.ok) {
                toast.success("Успешно изменено")
            }else {
                for (let i in  data){
                    toast.error(data[i].toString())
                }
            }
        } catch (error){
            return rejectWithValue(error.message)
        }
    }
)

export const fetchStage = createAsyncThunk(
    "edit/fetchStage",
    async function(token, {rejectWithValue, dispatch}){
        try {
            let options = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `token ${token.tokenState[0].auth_token}`
                }
            }

            const response = await fetch(`https://app1.megacom.kg:9090/task-manager//api/v1/stage/group-stage/list/?group_id=${token.editGroupState.id}`, options);
            const data = await response.json();
            if (response.ok) {
                dispatch(addStage({data}))
            }else {




                for (let i in  data){
                    toast.error(data[i].toString())
                }
            }
        } catch (error){

            return rejectWithValue(error.message)
        }
    }
)

const editSlice = createSlice({
    name: "edit",
    initialState: {
        stage: [],
        editStage: {
            condition: "",
            date_after: "",
            duration: "",
            order_num: "",
            pass_grade: "",
            tasks: [],
            title: "",
        }
    },
    reducers: {
        addStage(state, action){
            state.stage = action.payload.data
        },
        nullStage(state, action){
            state.stage = []
        },
        editStage(state, action){
            state.editStage.condition = action.payload.stage.condition;
            state.editStage.date_after = action.payload.stage.date_after;
            state.editStage.duration = action.payload.stage.duration;
            state.editStage.order_num = action.payload.stage.order_num;
            state.editStage.pass_grade = action.payload.stage.condition;
            state.editStage.tasks = action.payload.stage.tasks;
            state.editStage.title = action.payload.stage.title;
        }
    }
})

export  const {addStage, nullStage, editStage} = editSlice.actions

export default editSlice.reducer;