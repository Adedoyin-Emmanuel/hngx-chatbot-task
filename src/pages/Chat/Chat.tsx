
import React from "react";
import "./ChatStyle.css";
import {Link, useNavigate} from "react-router-dom";

const Chat = () => {
    const navigateTo = useNavigate();
    return (
        <React.Fragment>
            <h1>Chat works!</h1>
        </React.Fragment>
    );  
}

export default Chat;
    