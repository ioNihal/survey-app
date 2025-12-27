import { useNavigate } from "react-router-dom"
import { getSessionId } from "../utils/storage"
import Layout from "./Layout"

const WelcomeScreen = () => {

    const navigate = useNavigate();
    const handleStart = () => {
        localStorage.removeItem("sessionId");
        localStorage.removeItem(`survey_${localStorage.getItem("sessionId")}`);
        getSessionId();
        navigate("/survey");
    };

    return (
        <Layout>
            <div className="welcome-content d-flex flex-column justify-content-center align-items-center text-center">
                <h1 className="mb-4">Welcome to our Survey!</h1>
                <p className="mb-5 text-secondary">We value your feedback. It will only take a minute.</p>
                <button
                    id="startBtn"
                    className="btn-primary-custom"
                    onClick={handleStart}
                >
                    START SURVEY
                </button>
            </div>
        </Layout>
    )
}

export default WelcomeScreen
