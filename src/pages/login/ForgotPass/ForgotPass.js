import React from 'react';
import LoginCss from "../Login.module.css";
import logo from "../../../images/__.png";

const ForgotPass = () => {
    return (
        <div className={LoginCss.flex_login}>
            <div className={LoginCss.logo}>
                <div className={LoginCss.cube}>
                    <div>
                        <img src={logo} className={LoginCss.logoImg}/>
                    </div>
                </div>
            </div>
            <div className={LoginCss.auth}>
                <div className={LoginCss.authForm}>
                <h1>Забыли <br/>
                    пароль?</h1>
                    <form action="" className={LoginCss.formLogin}>
                        <div>
                            <label form="exampleInputEmail1"><b>email</b></label><br/>
                            <input required type="email1" id="exampleInputEmail1"/>
                        </div>
                        <div className={LoginCss.button}>
                            <input type="submit" value="Отправить"/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPass;