import React, {useEffect} from 'react';
import "./index.css";
import Router from "./router/Router";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useDispatch} from "react-redux";
import {tokenLocal, tokenLocal2} from "./redux/authorizationSlice";
const App = () => {
    const data = localStorage.getItem("token");
    const parse = JSON.parse(data);
    const dispatch = useDispatch();
    useEffect(() => {
        if (parse) {
            if (parse[1].role === 1) {
                dispatch(tokenLocal(parse))
            } else if (parse[1].role === 2) {
                dispatch(tokenLocal2(parse))
            }
        }
    }, [])
    return (
        <div>
            <Router/>
            <ToastContainer />
        </div>

    );
};

export default App;