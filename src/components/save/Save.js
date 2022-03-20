import React from 'react';
import saveCss from "./Save.module.css";

const Save = () => {
    return (
        <div className={saveCss.fons}>
            <div>
                <div className={saveCss.flexSave}>
                    <div className={saveCss.checkboxBtn}>
                        <input id="1" type="checkbox"/>
                        <label htmlFor="1">Python 2</label>
                    </div>
                    <div className={saveCss.checkboxBtn}>
                        <input id="2" type="checkbox"/>
                        <label htmlFor="2">Python 2</label>
                    </div>
                    <div className={saveCss.checkboxBtn}>
                        <input id="3" type="checkbox"/>
                        <label htmlFor="3">Python 2</label>
                    </div>
                    <div className={saveCss.checkboxBtn}>
                        <input id="4" type="checkbox"/>
                        <label htmlFor="4">Python 2</label>
                    </div>
                </div>
            </div>
            <div className={saveCss.btn}>
                Применить
            </div>
        </div>
    );
};

export default Save;