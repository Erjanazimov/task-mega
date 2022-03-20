import React, {useState} from 'react';
import changeCss from "./LoadTask.module.css";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import Save from "../../../components/save/Save";
import {Link} from "react-router-dom";

const LoadTask = () => {
    const popoversRef = React.createRef();
    const [textCode, setTextCode] = useState("function reverse(data){\n" + "    \n" + "}\n" + "\n" + "reverse([1,2,4])");

    function onChange(newValue) {
        setTextCode(newValue)
    }

    const popoversBtn = () => {
        popoversRef.current.classList.toggle("dNone");
    }
    return (
        <div className="container">
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

            <form className={changeCss.width}>
                <h1 className={changeCss.text}>Загрузка задач</h1>
                <div>
                    <input type="text" placeholder="Название задачи"/>
                </div>
                <div>
                    <input type="text" placeholder="Номер задачи"/>
                    <select className={changeCss.changeSelect}>
                        <option value="volvo">Python</option>
                        <option value="saab">SQL</option>
                        <option value="vw">Oracle</option>
                        <option value="audi">Java</option>
                    </select>
                </div>
                <div className={changeCss.textPost}>
                    <h2>Описание задачи</h2>
                    <div className={changeCss.textArea}>
                        <textarea></textarea>
                    </div>
                </div>
                <div>
                    <h2>Шаблоны</h2>
                    <AceEditor
                        value={textCode}
                        mode="python"
                        theme="github"
                        onChange={onChange}
                        width="600px"
                        height="340px"
                        fontSize="16px"
                        name="UNIQUE_ID_OF_DIV"
                    />
                </div>
            </form>
                <div>
            <div className={changeCss.textH}>
                <p><input type="checkbox"/></p>
                <h1>Проект</h1>
            </div>
                    <div className={changeCss.teg}>
                        <div onClick={popoversBtn}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor"
                                 className="bi bi-blockquote-right" viewBox="0 0 16 16">
                                <path
                                    d="M2.5 3a.5.5 0 0 0 0 1h11a.5.5 0 0 0 0-1h-11zm0 3a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1h-6zm0 3a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1h-6zm0 3a.5.5 0 0 0 0 1h11a.5.5 0 0 0 0-1h-11zm10.113-5.373a6.59 6.59 0 0 0-.445-.275l.21-.352c.122.074.272.17.452.287.18.117.35.26.51.428.156.164.289.351.398.562.11.207.164.438.164.692 0 .36-.072.65-.216.873-.145.219-.385.328-.721.328-.215 0-.383-.07-.504-.211a.697.697 0 0 1-.188-.463c0-.23.07-.404.211-.521.137-.121.326-.182.569-.182h.281a1.686 1.686 0 0 0-.123-.498 1.379 1.379 0 0 0-.252-.37 1.94 1.94 0 0 0-.346-.298zm-2.168 0A6.59 6.59 0 0 0 10 6.352L10.21 6c.122.074.272.17.452.287.18.117.35.26.51.428.156.164.289.351.398.562.11.207.164.438.164.692 0 .36-.072.65-.216.873-.145.219-.385.328-.721.328-.215 0-.383-.07-.504-.211a.697.697 0 0 1-.188-.463c0-.23.07-.404.211-.521.137-.121.327-.182.569-.182h.281a1.749 1.749 0 0 0-.117-.492 1.402 1.402 0 0 0-.258-.375 1.94 1.94 0 0 0-.346-.3z"/>
                            </svg>Теги</div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor"
                                 className="bi bi-folder" viewBox="0 0 16 16">
                                <path
                                    d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4H2.19zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707z"/>
                            </svg>
                            Загрузить Unitest</div>
                    </div>
                    <div ref={popoversRef} className="dNone">
                       <Save/>
                    </div>
                    <div className={changeCss.btn}>
                        Сохранить
                    </div>
                </div>

            </div>
        </div>
    );
};

export default LoadTask;