import React from "react"
import { useNavigate } from "react-router-dom"
import { getSessionId } from "../utils/storage"

const WelcomeScreen = () => {

    const navigate = useNavigate();
    const handleStart = () => {
        getSessionId();
        navigate("/survey");
    };

    return (
        <div className="welcome container-md d-flex flex-column justify-content-center align-items-center">
            <h1 className="animate__animated animate__slideInDown">Welcome to our Survey!</h1>
            <button id="startBtn" className="btn btn-lg btn-primary animate__animated animate__fadeInUp" onClick={handleStart}>START SURVEY</button>
        </div>
    )
}

export default WelcomeScreen