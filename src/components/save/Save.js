import React, {useEffect} from 'react';
import saveCss from "./Save.module.css";
import {useDispatch, useSelector} from "react-redux";
import {addFile, checkBool, fetchThemes, nullTheme} from "../../redux/downloadTaskSlice";

const Save = () => {
    const tokenState = useSelector(state => state.authorization.token);
    const dispatch = useDispatch();
    const themesState = useSelector(state => state.downloadTask.saveThemes);

    useEffect(() => {
        if (tokenState.length) {
            dispatch(fetchThemes({tokenState}))
        }
    }, [tokenState])

    const CheckBtn = (id) => {
        dispatch(checkBool({id}));
    }

    const btnSaveThemes = () => {
        const res = themesState.filter(item => item.bool === true);

        if (res.length){
            dispatch(addFile(res))
        }else{
            dispatch(nullTheme())
        }
    }

    return (
        <div className={saveCss.fons}>
            <div>
                <div className={saveCss.flexSave}>
                    {themesState.length ? themesState.map(item => {
                        return <div key={item.id} className={saveCss.checkboxBtn}>
                            <input onChange={() => CheckBtn(item.id)} id={item.id}
                                   type="checkbox" className="mx-2" checked={item.bool}/>
                            <label htmlFor={item.id}>{item.title}</label>
                        </div>
                    }) : <h3>Загрузка</h3>}

                </div>
            </div>
            <div className="d-flex">
            <div onClick={btnSaveThemes} className={saveCss.btn}>
                Применить
            </div>
            <div className={saveCss.btn}>
                Добавить
            </div>
            </div>
        </div>
    );
};

export default Save;