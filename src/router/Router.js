import React, {useEffect} from 'react';
import {Routes, Route} from "react-router-dom";
import Login from "../pages/login/Login";
import TaskList from "../pages/taskList/TaskList";
import TaskExecution from "../pages/taskExecution/TaskExecution";
import Mentor from "../pages/mentor/Mentor";
import Download from "../pages/download/Download";
import LoadTask from "../pages/download/loadTask/LoadTask";
import Change from "../pages/mentor/change/Change";
import ForgotPass from "../pages/login/ForgotPass/ForgotPass";
import {useDispatch, useSelector} from "react-redux";
import {fetchStudentsTask} from "../redux/studentsTaskSlice";
import NotPageFound from "../pages/notPageFound";

const Router = () => {
    const tokenState = useSelector(state => state.authorization.token2);
    const dispatch = useDispatch();
    const taskStudent = useSelector(state => state.studentTasks.tasksStudent);

    useEffect(() => {
        if (tokenState.length){
            dispatch(fetchStudentsTask({tokenState}))
        }
    }, [tokenState])
    return (
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="forgotPassword" element={<ForgotPass/>}/>
            <Route path="/taskList" element={<TaskList/>}/>
            {taskStudent.map(item => <Route key={item.id} path={`/taskExecution/${item.id}`} element={<TaskExecution id={item.id}/>}/>)}
            <Route path="/mentor" element={<Mentor/>}/>
            <Route path="/download" element={<Download/>}/>
            <Route path="/change" element={<Change/>}/>
            <Route path="/loadTask" element={<LoadTask/>}/>
            <Route exact path="*" element={<NotPageFound/>}/>
        </Routes>
    );
};

export default Router;