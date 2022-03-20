import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify";

export const fetchLogin = createAsyncThunk(
    "authorization/fetchLogin",
    async function(userLogin, {rejectWithValue, dispatch}){
        try {
            let options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",

                },
                body: JSON.stringify(userLogin.loginState)
            }

            const response = await fetch("https://app1.megacom.kg:9090/task-manager/api/v1/accounts/login/", options);
            if (response.ok) {
                const data = await response.json();

                if (data[1].role === null) {
                    dispatch(tokenLocal(data))
                    userLogin.navigation("/mentor");
                } else if (data[1].role === 2) {
                    dispatch(tokenLocal2(data))
                    userLogin.navigation("/taskList")
                }
            } else {
                toast.error("Неверно введено пароль или логин")
            }
        } catch (error){
            return rejectWithValue(error.message)
        }
    }
)

const authorizationSlice = createSlice({
    name: "authorization",
    initialState: {
        token: [],
        token2: [],
        login:{
            username: "",
            password: ""
        }
    },
    reducers: {
        loginHandler(state, action){
            let keys = Object.keys(action.payload);
            let text = action.payload[keys[0]];
            state.login[keys[0]] = text;
        },
        tokenLocal(state, action){
            state.token = action.payload;
            localStorage.setItem(`token`, JSON.stringify(action.payload));
        },
        tokenLocal2(state, action){
            state.token2 = action.payload;
            localStorage.setItem(`token`, JSON.stringify(action.payload));
        }
    }
})

export const {loginHandler, tokenLocal, tokenLocal2} = authorizationSlice.actions;

export default authorizationSlice.reducer;