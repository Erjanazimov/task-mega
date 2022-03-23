import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const fetchStudentsTask = createAsyncThunk(
    "groups/fetchStudentsTask",
    async function(token, {rejectWithValue, dispatch}){
        try {
            let options = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `token ${token.tokenState[0].auth_token}`
                }
            }

            const response = await fetch("https://app1.megacom.kg:9090/task-manager/api/v1/tasks/student-task/", options);
            const data = await response.json();

            if (response.ok){
                dispatch(addStudentTask({data}))
            }
        } catch (error){
            return rejectWithValue(error.message)
        }
    }
)

export const fetchTaskPut = createAsyncThunk(
    "studentsTask/fetchTaskPut",
    async function(result, {rejectWithValue, dispatch}){
        try {
            let options = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `token ${result.token[0].auth_token}`
                },
                body: JSON.stringify({solution: result.code})
            }

            const response = await fetch(`https://app1.megacom.kg:9090/task-manager/api/v1/tasks/submit-task/${result.id}/`, options);
            const data = await response.json();

            if (response.ok) {
                dispatch(resultTaskBtn({data}))
            }

            if (data.status === 1){
                dispatch(success({id: result.id}))
            }
        } catch (error){
            return rejectWithValue(error.message)
        }
    }
)



const studentsTaskSlice = createSlice({
    name: "studentsTask",
    initialState: {
        tasksStudent: [],
        navigator: [],
        execution: null,
        sample_text: "",
        desc: "",
        status: 0,
        id: 0,
        pass_count: 0,
        nav: [],
        resultTask: {
            status: 0
        }
    },
    reducers: {
        addStudentTask(state, action){
            state.tasksStudent = action.payload.data;
        },
        addExecution(state, action){
            state.execution = action.payload.task;
            state.sample_text = action.payload.task.task.sample_text;
            state.status = action.payload.task.status;
            state.id = action.payload.task.id;
            state.pass_count = action.payload.task.pass_count;
        },
        codeHandler(state, action){
            state.sample_text = action.payload.code
        },
        resultTaskBtn(state, action){
            state.resultTask.status = action.payload.data.status;

        },
        reset(state, action){
            state.sample_text = action.payload.code
        },
        success(state, action){
            const res = state.tasksStudent.find(id => id.id === action.payload.id);
            res.status = 1
        },
        taskResult(state, action){
            state.desc = action.payload.task.task.description
        },
        countTask(state, action){
           state.pass_count = state.pass_count + 1
        },
        code2Handler(state, action){
            state.sample_text = action.payload.task.solution
        }
    }
})

export const {addStudentTask, addExecution, codeHandler, resultTaskBtn, reset, success, taskResult, countTask, code2Handler} = studentsTaskSlice.actions

export default studentsTaskSlice.reducer