import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const fetchGroups = createAsyncThunk(
    "groups/fetchLogin",
    async function(token, {rejectWithValue, dispatch}){
        try {
            let options = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `token ${token.tokenState[0].auth_token}`
                }
            }

            const response = await fetch("https://app1.megacom.kg:9090/task-manager/api/v1/group/create/", options);
            const data = await response.json();
            if (response.ok) {
                dispatch(addGroups({data}))
            }
        } catch (error){
            return rejectWithValue(error.message)
        }
    }
)

export const fetchGroup = createAsyncThunk(
    "groups/fetchGroup",
    async function(group, {rejectWithValue, dispatch}){
        try {
            let options = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `token ${group.tokenState[0].auth_token}`
                }
            }

            const response = await fetch(`https://app1.megacom.kg:9090/task-manager/api/v1/group/update/${group.id}`, options);
            const data = await response.json();

            if (response.ok) {
                localStorage.setItem(`group`, JSON.stringify(data));
                dispatch(editGroupAdd({data}))
            }
        } catch (error){
            return rejectWithValue(error.message)
        }
    }
)



const groupSlice = createSlice({
    name: "groups",
    initialState: {
        groups: [],
        editGroup: null,
        nameGroup: {
            title: "",
            language: "",
            mentor: "",
            end_date: "",
            id: null
        }
    },
    reducers: {
        addGroups(state, action){
            state.groups = action.payload.data.results;
        },
        editGroupAdd(state, action){
            state.nameGroup.title = action.payload.data.title;
            state.nameGroup.language = action.payload.data.language;
            state.nameGroup.mentor = action.payload.data.mentor;
            state.nameGroup.end_date = action.payload.data.end_date;
            state.nameGroup.id = action.payload.data.id;
        },
        editGroupChange(state, action){
            let keys = Object.keys(action.payload);
            let text = action.payload[keys[0]];
            state.nameGroup[keys[0]] = text;
        },
        editDate(state, action){
            state.nameGroup.end_date = action.payload.myDateString
        }

    }
})

export const {addGroups, editGroupAdd, editGroupChange, editDate} = groupSlice.actions

export default groupSlice.reducer