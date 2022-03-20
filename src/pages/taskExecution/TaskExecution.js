import React, {useEffect, useState} from 'react';
import executionCss from "./TaskExecution.module.css";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    addExecution,
    codeHandler,
    fetchStudentsTask,
    fetchTaskPut,
    reset,
    resultTaskBtn
} from "../../redux/studentsTaskSlice";
import {toast} from "react-toastify";



const TaskExecution = ({id}) => {
    const stateExecution = useSelector(state => state.studentTasks.tasksStudent);
    const executionStateTask = useSelector(state => state.studentTasks.execution);
    const textCode = useSelector(state => state.studentTasks);
    const tokenState = useSelector(state => state.authorization.token2);
    const dispatch = useDispatch();
    const [numNext, setNumNext] = useState(0);
    const navigation = useNavigate();
    function onChange(newValue) {
        dispatch(codeHandler({code: newValue}))
    }

    useEffect(() => {
        const task = stateExecution.find(item => item.id === id)
        dispatch(addExecution({task}))
    }, [id])

    useEffect(() => {
        if (tokenState.length){
            dispatch(fetchStudentsTask({tokenState}))
        }
    }, [tokenState])

    if (!executionStateTask){
        return <h2>Нету такого задачи</h2>
    }

    const btnTask = () => {
        let result = {
            code: textCode.sample_text,
            token: tokenState,
            id
        }

        if (textCode.sample_text === textCode.execution.task.sample_text){
            toast.error("Перед отправкой решите задачу")
        } else {
            dispatch(fetchTaskPut(result))
            dispatch(resultTaskBtn({data:{ status: 3}}))
        }


    }

    const resetBtn = () => {
        dispatch(reset({code: textCode.execution.task.sample_text}))
    }

    const nextBtn = () => {
        const next = stateExecution.filter(item => item.status === 2)
        setNumNext(prev => prev + 1)

        if (numNext <= next.length - 1){
            navigation(`/taskExecution/${next[numNext].id}`)
        } else {
            setNumNext(0)
        }
    }



    if (executionStateTask.status === 1){
        return  <div className={executionCss.TaskExecution}>
            <div className={executionCss.taskfons}>
                <Link to="/taskList">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor"
                             className="bi bi-arrow-left" viewBox="0 0 16 16">
                            <path fillRule="evenodd"
                                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                        </svg>
                    </div>
                </Link>
            </div>
            <div className={executionCss.TaskExecution}>
                <h2 className='p-5'>Эту задачу уже решили</h2>
            </div>
        </div>
    }
    return (
        <div className={executionCss.TaskExecution}>
            <div className={executionCss.taskfons}>
                <Link to="/taskList">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor"
                         className="bi bi-arrow-left" viewBox="0 0 16 16">
                        <path fillRule="evenodd"
                              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                    </svg>
                </div>
                </Link>
            </div>
            <div className={executionCss.TaskExecution}>
                <div className={executionCss.taskInfo}>
                    <h2>Инструкции</h2>
                    <div className={executionCss.widthTaskInfo}>
                        {executionStateTask.task.description}
                    </div>


                    <div className={executionCss.taskFlex}>
                        <div className={executionCss.taskNumber}>
                            <input type="text"/>
                        </div>
                        <div className={executionCss.btntaskNumber}>
                            <button>{executionStateTask.task.theme.map(item => item.title)}</button>
                        </div>
                        <div className={executionCss.btntaskNumber}>
                            <button>Numbers</button>
                        </div>
                    </div>
                </div>
                <div className={executionCss.taskCode}>
                    <h2>Решение</h2>
                    <div className={executionCss.taskCodeFlex}>
                    <div  className={executionCss.taskCode}>
                        <AceEditor
                            mode="java"
                            theme="github"
                            onChange={onChange}
                            value={textCode.sample_text}
                            width="600px"
                            height="436px"
                            fontSize="16px"
                            name="UNIQUE_ID_OF_DIV"
                        />
                    </div>
                    </div>

                    <div className={executionCss.textComp}>
                        <h2>Результат</h2>

                        {function (){
                            if (textCode.resultTask.status === 3){
                                return <div className="spinner-grow load" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            }

                            if (textCode.resultTask.status === 1){
                                return <p>Выполнено!</p>
                            }

                            if (textCode.resultTask.status === 2){
                                return <p className='text-danger'>Не выполнено!</p>
                            }


                            return <p>Нажмите отправить на проверку</p>
                        }()}

                    </div>
                    <div className={executionCss.panelCode}>
                        <div className={executionCss.btnDrop}>
                            <button onClick={resetBtn}>Сбросить</button>
                        </div>
                        <div onClick={nextBtn} className={executionCss.nextTask}>
                            <p className="pt-3">Следующее задание </p>
                            <div className={executionCss.errov}> > </div>
                        </div>
                        <div className={executionCss.send}>
                            {function (){
                              if (textCode.resultTask.status === 3){
                                  return <div className="spinner-grow load" role="status">
                                      <span className="visually-hidden">Loading...</span>
                                  </div>
                              }

                              if (textCode.resultTask.status === 1){
                                  return <button>Правильный ответ</button>
                              }

                                if (textCode.resultTask.status === 2){
                                    return <button onClick={btnTask}>Отправить</button>
                                }


                              return <button onClick={btnTask}>Отправить</button>
                            }()}

                        </div>
                    </div>
                    <div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskExecution;