import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { markSessionCompleted, getSessionId } from "../utils/storage"

const ConfirmationScreen = () => {
    const navigate = useNavigate();
    const [confirmed, setConfirmed] = useState(false);

    useEffect(() => {
        if (confirmed === true) {
            const sessionId = getSessionId();
            markSessionCompleted(sessionId);
            const timer = setTimeout(() => navigate("/"), 5000);
            return () => clearTimeout(timer);
        } 
    }, [confirmed]);

    return (
        <div className="confirmation">
            {confirmed ? (
                <>
                    <h1>Thank You!</h1>
                    <p>Your responses have been recorded.</p>
                </>
            ) : (
                <>
                    <h1>Do you want to Submit?</h1>
                    <div className="d-flex">
                        <button className="btn btn-primary btn-sm" onClick={() => setConfirmed(true)}>YES</button>
                        <button className="btn btn-primary btn-sm" onClick={() => navigate("/")}>NO</button> {/* Navigate back on "NO" */}
                    </div>
                </>
            )
            }
        </div >
    )
}

export default ConfirmationScreen
