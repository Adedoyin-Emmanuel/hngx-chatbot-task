
import React from "react";
import "./HomeStyle.css";
import {Link, useNavigate} from "react-router-dom";

const Home = () => {
    const navigateTo = useNavigate();
    return (
        <React.Fragment>
            <h1>Home works!</h1>
        </React.Fragment>
    );  
}

export default Home;
    