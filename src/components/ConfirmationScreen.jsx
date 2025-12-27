import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { markSessionCompleted, getSessionId } from "../utils/storage"
import Layout from "./Layout"

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
    }, [confirmed, navigate]);

    return (
        <Layout>
            <div className="confirmation-screen d-flex flex-column align-items-center text-center">
                {confirmed ? (
                    <div className="animate__animated animate__fadeIn">
                        <div className="success-icon mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="var(--success-color)" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                            </svg>
                        </div>
                        <h2 className="mb-3">Thank You!</h2>
                        <p className="text-secondary">Your feedback has been recorded successfully.</p>
                        <p className="small text-muted mt-4">Redirecting to home...</p>
                    </div>
                ) : (
                    <div className="animate__animated animate__fadeIn">
                         <h2 className="mb-4">Ready to Submit?</h2>
                         <p className="mb-4 text-secondary">You won&apos;t be able to change your answers after this.</p>
                        <div className="d-flex gap-3 justify-content-center">
                            <button className="btn-outline-custom" onClick={() => navigate("/")}>Cancel</button>
                            <button className="btn-primary-custom" onClick={() => setConfirmed(true)}>Submit Survey</button>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    )
}

export default ConfirmationScreen
