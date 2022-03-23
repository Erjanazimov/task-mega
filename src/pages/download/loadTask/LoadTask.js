import React, {useEffect, useRef, useState} from 'react';
import changeCss from "./LoadTask.module.css";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import Save from "../../../components/save/Save";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    addFile,
    fetchLanguages, fetchTaskPost,
    fileSave,
    nullTextSample,
    selectLanguages,
    taskHandler
} from "../../../redux/downloadTaskSlice";
import {toast} from "react-toastify";
import Files from 'react-files'
import {logDOM} from "@testing-library/react";

const LoadTask = () => {
    const tokenState = useSelector(state => state.authorization.token);
    const [boolCheckBox, setBoolCheckBox] = useState(false)
    const dispatch = useDispatch();
    const stateDownload = useSelector(state => state.downloadTask)
    const inputEl = React.createRef();
    useEffect(() => {
        if (tokenState.length) {
        dispatch(fetchLanguages({tokenState}))
        }
    }, [tokenState])

    const btnDownload = (e) => {
        e.preventDefault()
        if (stateDownload.downloadText.sample_text === ""){
            toast.error("Не заполнили шаблон или ссылку на гит")
        } else if (stateDownload.downloadText.language === ""){
            toast.error('Выберите язык')
        } else if (!stateDownload.downloadText.theme.length){
            toast.error("Выберите теги")
        } else {
           dispatch(fetchTaskPost({token: tokenState,
               obj: stateDownload.downloadText
           }))
        }

    }

    const downloadHandler = (name, e) => {
        dispatch(taskHandler({[name]:e}))
    }

    const selectLan = (e) => {
        dispatch(selectLanguages({lan: e.target.value}))
    }

    const checkedBtn = (e) => {
        setBoolCheckBox(e.target.checked)
        dispatch(nullTextSample())
    }


    const filesHandler = (file) => {
        dispatch(fileSave({file: file[0]}))
        // console.log(inputEl.current.files)
    }





    return (
        <div className="container">
            <form onSubmit={btnDownload}>
            <div className={changeCss.flexChan}>
                <Link to="/download">
            <div className={changeCss.row}>
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor"
                     className="bi bi-arrow-left-short" viewBox="0 0 16 16">
                    <path fillRule="evenodd"
                          d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/>
                </svg>
            </div>
                </Link>
            <div className={changeCss.flexChange}>
            </div>
            <div className={changeCss.width}>
                <h1 className={changeCss.text}>Загрузка задач</h1>
                <div>
                    <input
                        required
                        onChange={(e) => downloadHandler("title", e.target.value)}
                        type="text" placeholder="Название задачи" value={stateDownload.downloadText.title}/>
                </div>
                <div>
                    <input
                        required
                        onChange={(e) => downloadHandler("order_num", e.target.value)}
                        type="number" placeholder="Номер задачи" value={stateDownload.downloadText.order_num}/>
                    <select
                        onChange={selectLan}
                            value={stateDownload.downloadText.language} className={changeCss.changeSelect}>
                        <option value="">Выбор языка...</option>
                        {stateDownload.languages.map(item => (
                                <option key={item.id} value={item.id}>{item.title}</option>
                        ))}

                    </select>
                </div>
                <div>
                    <input
                        required
                        onChange={(e) => downloadHandler("points", e.target.value)}
                        type="number" placeholder="Баллы на задачи" value={stateDownload.downloadText.points}/>
                </div>
                <div>
                    {boolCheckBox ? <input
                        onChange={(e) => downloadHandler("sample_text", e.target.value)}
                        type="text" placeholder="Ссылка на гит" value={stateDownload.downloadText.sample_text}/> : null}
                </div>
                <div className={changeCss.textPost}>
                    <h2>Описание задачи</h2>
                    <div className={changeCss.textArea} >
                        <textarea
                            required
                            onChange={(e) => downloadHandler("description", e.target.value)}
                            value={stateDownload.downloadText.description} />
                    </div>
                </div>
                { boolCheckBox ? null :
                    <div className="d-block">
                        <h2>Шаблоны</h2>
                        <AceEditor
                            value={stateDownload.downloadText.sample_text}
                            mode="java"
                            theme="github"
                            onChange={(newValue) => downloadHandler("sample_text", newValue)}
                            width="600px"
                            height="340px"
                            fontSize="16px"
                            name="UNIQUE_ID_OF_DIV"
                        />
                    </div>
                }
            </div>
                <div>
            <div className={changeCss.textH}>
                <p><input onChange={checkedBtn} type="checkbox" checked={boolCheckBox}/></p>
                <h1>Проект</h1>
            </div>
                    <div className={changeCss.teg}>
                        <div>
                        <div  role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor"
                                 className="bi bi-blockquote-right" viewBox="0 0 16 16">
                                <path
                                    d="M2.5 3a.5.5 0 0 0 0 1h11a.5.5 0 0 0 0-1h-11zm0 3a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1h-6zm0 3a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1h-6zm0 3a.5.5 0 0 0 0 1h11a.5.5 0 0 0 0-1h-11zm10.113-5.373a6.59 6.59 0 0 0-.445-.275l.21-.352c.122.074.272.17.452.287.18.117.35.26.51.428.156.164.289.351.398.562.11.207.164.438.164.692 0 .36-.072.65-.216.873-.145.219-.385.328-.721.328-.215 0-.383-.07-.504-.211a.697.697 0 0 1-.188-.463c0-.23.07-.404.211-.521.137-.121.326-.182.569-.182h.281a1.686 1.686 0 0 0-.123-.498 1.379 1.379 0 0 0-.252-.37 1.94 1.94 0 0 0-.346-.298zm-2.168 0A6.59 6.59 0 0 0 10 6.352L10.21 6c.122.074.272.17.452.287.18.117.35.26.51.428.156.164.289.351.398.562.11.207.164.438.164.692 0 .36-.072.65-.216.873-.145.219-.385.328-.721.328-.215 0-.383-.07-.504-.211a.697.697 0 0 1-.188-.463c0-.23.07-.404.211-.521.137-.121.327-.182.569-.182h.281a1.749 1.749 0 0 0-.117-.492 1.402 1.402 0 0 0-.258-.375 1.94 1.94 0 0 0-.346-.3z"/>
                            </svg><span className="px-2">Теги</span></div>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                <Save/>
                            </ul>
                        </div>



                        {boolCheckBox ? null :
                            <div className="p-2 files">
                                <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor"
                                     className="bi bi-folder" viewBox="0 0 16 16">
                                    <path
                                        d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4H2.19zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707z"/>
                                </svg>
                                <Files
                                    className='files-dropzone'
                                    onChange={filesHandler}
                                    accepts={['.py']}
                                    multiple
                                    maxFileSize={10000000}
                                    minFileSize={0}
                                    clickable
                                >
                                    Drop files here or click to upload
                                </Files>
                                {/*<input onChange={filesHandler} ref={inputEl} type="file"/>*/}
                            </div>
                        }
                    </div>

                    <input type="submit"  className={changeCss.btn} value="Сохранить"/>
                </div>
            </div>
        </form>
        </div>
    );
};

export default LoadTask;