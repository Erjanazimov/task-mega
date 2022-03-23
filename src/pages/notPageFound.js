import React from 'react';
import {Link} from "react-router-dom";

const NotPageFound = () => {
    return (
        <div className="container">
            <h2>Войдите в свой аккаунт сначала</h2>
            <Link to="/">
            <button type="button" className="btn btn-outline-primary form-control">Primary</button>
            </Link>
        </div>
    );
};

export default NotPageFound;