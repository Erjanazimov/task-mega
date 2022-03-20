import React, {useEffect} from 'react';
import LoginCss from "./Login.module.css";
import logo from "../../images/__.png"
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchLogin, loginHandler, tokenLocal} from "../../redux/authorizationSlice";

const Login = () => {
    const loginState = useSelector(state => state.authorization.login);
    const dispatch = useDispatch();
    const navigation = useNavigate();
    const data = localStorage.getItem("token");
    const parse = JSON.parse(data);
    const loginChange = (name, e) => {
        dispatch(loginHandler({[name]:e}))
    }

    const btnEnter = (e) => {
        dispatch(fetchLogin({
            loginState,
            navigation }));
        e.preventDefault();
    }

    useEffect(() => {
        if (parse){
            if (parse[1].role === 1){
                navigation("/mentor")
            } else if (parse[1].role === 2){
                navigation("/taskList")
            }
        }
    }, [parse])

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
                <div className="dBlock">
                <div className={LoginCss.authForm}>
                    <h1>IT-School <br/> Task Manager</h1>
                    <form onSubmit={btnEnter} action="" className={LoginCss.formLogin}>
                        <div>
                            <label form="exampleInputEmail1"><b>Логин</b></label><br/>
                            <input onChange={(e) => loginChange("username",e.target.value)}
                                   required type="email1" id="exampleInputEmail1"
                                   value={loginState.username}
                            />
                        </div>
                        <div className={LoginCss.pass}>
                            <label form="pass"><b>Пароль</b></label><br/>
                            <input onChange={(e) => loginChange("password",e.target.value)} required type="password" id="pass"
                            value={loginState.password}
                            />
                        </div>
                        <div className={LoginCss.authPass}>
                            <Link to="/forgotPassword"> Забыли пароль?</Link>
                        </div>

                            <div className={LoginCss.button}>
                            <input type="submit" value="Войти"/>
                            </div>

                    </form>
                </div>
                </div>

            </div>
        </div>
    );
};

export default Login;