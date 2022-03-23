import React, {useEffect} from 'react';
import taskCss from "./TaskList.module.css";
import {useDispatch, useSelector} from "react-redux";
import {fetchStudentsTask} from "../../redux/studentsTaskSlice";
import {Link, useNavigate} from "react-router-dom";

const TaskList = () => {
    const taskStudent = useSelector(state => state.studentTasks.tasksStudent);
    const tokenState = useSelector(state => state.authorization.token2);
    const dispatch = useDispatch();
    const navigation = useNavigate();


    useEffect(() => {
        if (tokenState.length){
            dispatch(fetchStudentsTask({tokenState}))
        }
    }, [tokenState])

    const exitBtn = () => {
        localStorage.clear();
        navigation("/")
    }


    return (
        <div className="container">
            <div className={taskCss.containerTask}>
                <div className={taskCss.title}>
                <h1 className="mt-3">Список заданий </h1>
                    <h1 className={`mt-3 ${taskCss.mop}`}>Тема</h1>
                    <h4 onClick={exitBtn} className={taskCss.exit}>Выйти</h4>
                </div>
                <div className={taskCss.taskHr}></div>
                <div className={taskCss.taskList}>
                    <div className={taskCss.flexList}>
                    <div className={taskCss.taskTitle}>Этап 1</div>
                        <ul className={taskCss.taskLink}>
                            {taskStudent.length ? taskStudent.map((item, i ) => {

                                if (item.status === 1) {
                                    return <Link key={item.id} to={`/taskExecution/${item.id}`}> <span>
                                        <li className={`${taskCss.listPost} ${taskCss.yes}`}>
                                            <div><span>{i}. </span>{item.task.title}</div>
                                            <div className={taskCss.completed}>
                                                Выполнено
                                            </div>
                                        </li>
                                    </span>
                                    </Link>
                                }

                                return <Link key={item.id} to={`/taskExecution/${item.id}`}>
                                    <li className={`${taskCss.listPost} ${taskCss.nov}`}>
                                        <div><span>{i}. </span>{item.task.title}</div>
                                        <div className={taskCss.completed2}>
                                            Не выполнено
                                        </div>
                                    </li>
                                </Link>

                            })  : <div className="d-flex justify-content-center">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div> }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskList;


//


