import React, {useEffect} from 'react';
import taskCss from "./TaskList.module.css";
import { Link } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchStudentsTask} from "../../redux/studentsTaskSlice";

const TaskList = () => {
    const taskStudent = useSelector(state => state.studentTasks.tasksStudent);
    const tokenState = useSelector(state => state.authorization.token2);
    const dispatch = useDispatch();

    useEffect(() => {
        if (tokenState.length){
            dispatch(fetchStudentsTask({tokenState}))
        }
    }, [tokenState])
    return (
        <div className="container">
            <div className={taskCss.containerTask}>
                <div className={taskCss.title}>
                <h1 className="mt-3">Список заданий </h1>
                    <h1 className="mt-3">Тема</h1>
                </div>
                <div className={taskCss.taskHr}></div>
                <div className={taskCss.taskList}>
                    <div className={taskCss.flexList}>
                    <div className={taskCss.taskTitle}>Этап 1</div>
                        <ul className={taskCss.taskLink}>
                            {taskStudent.length ?
                                taskStudent.map((item, index) => {
                                    return <Link key={item.id} to={item.status === 1 ? "/taskList"  :`/taskExecution/${item.id}`}>
                                        <li className={taskCss.listPost}>
                                            <div><span>{index}. </span>{item.task.title}</div>
                                            <div className={taskCss.completed}>
                                                {item.status === 1 ? "Выполнено" : <span className="text-danger">Не выполнено</span> }
                                            </div>
                                        </li>
                                    </Link>
                                })
                              : <h2>Загрузка</h2>
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskList;