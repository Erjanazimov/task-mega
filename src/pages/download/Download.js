import React from 'react';
import {Link} from "react-router-dom";
import downloadCss from "./Download.module.css";
import plus from "../../images/Combined Shape.png";

const Download = () => {
    return (
        <div className="container">
            <div className={downloadCss.headerFlex}>
                <div className={downloadCss.page}>
                    <div>
                        <Link to="/mentor">
                        <div className={downloadCss.home}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                                 className="bi bi-house" viewBox="0 0 16 16">
                                <path fillRule="evenodd"
                                      d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
                                <path fillRule="evenodd"
                                      d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/>
                            </svg>
                        </div>
                        </Link>

                            <div className={downloadCss.save}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                                     className="bi bi-download" viewBox="0 0 16 16">
                                    <path
                                        d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                    <path
                                        d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                                </svg>
                            </div>
                    </div>
                </div>

                <div className={downloadCss.textHeader}>

                    <div className={downloadCss.cars}>
                        <Link to="/loadTask
                       ">
                        <div className={downloadCss.carHeader}>
                            <img src={plus}/>
                        </div>
                        </Link>
                        <p>
                            Загрузка задач
                        </p>
                    </div>
                </div>
            </div>
            <div className={downloadCss.borderBottom}></div>
            <div className={downloadCss.textDown}>
                <ol>
                    <li>
                        Lorem ipsum dolor sit amet
                    </li>
                    <li className={downloadCss.text}>
                        Lorem ipsum dolor sit amet
                    </li>
                    <li>
                        Lorem ipsum dolor sit amet
                    </li>
                    <li className={downloadCss.text}>
                        Lorem ipsum dolor sit amet
                    </li>
                    <li>
                        Lorem ipsum dolor sit amet
                    </li>
                    <li className={downloadCss.text}>
                        Lorem ipsum dolor sit amet
                    </li>
                </ol>
            </div>
        </div>
    );
};

export default Download;