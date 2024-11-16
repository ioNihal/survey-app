import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { questions } from "../data/questions"
import { getSessionId, saveResponse } from "../utils/storage"

const QuestionScreen = () => {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [responses, setResponses] = useState({});
    const sessionId = getSessionId();
    const currentQuestion = questions[currentIndex];

    const handleAnswer = (answer) => {
        setResponses((prev) => ({
            ...prev,
            [currentQuestion.id]: answer,
        }))
    }

    const handleNext = () => {
        saveResponse(sessionId, responses);
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            navigate("/confirmation");
        }
    }

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    }

    const renderInput = () => {
        if (currentQuestion.type === "rating") {
            return (
                <div className="text-center animate__animated animate__pulse">
                    <div className="btn-group m" role="group" aria-label="Rating scale">
                        {[...Array(currentQuestion.scale)].map((_, index) => {
                            const value = index + 1;
                            return (
                                <button
                                    key={value}
                                    type="button"
                                    className={`btn ${responses[currentQuestion.id] === value ? 'btn-danger' : 'btn-outline-secondary'}`}
                                    onClick={() => handleAnswer(value)}
                                    style={{marginLeft: "1px", marginRight: "1px", marginBottom: "1rem"}}
                                >
                                    {value}
                                </button>
                            );
                        })}
                    </div>
                </div>
            );
        } else if (currentQuestion.type === "text") {
            return (
                <textarea
                    className="form-control"
                    value={responses[currentQuestion.id] || ""}
                    onChange={(e) => handleAnswer(e.target.value)}
                    rows="4"
                    placeholder="Enter your response here"
                />
            );
        }
    };



    return (
        <div className="question-screen container-lg d-flex flex-column justify-content-center align-items-center animate__animated animate__pulse">
            <h2>
                Question {currentIndex + 1}/{questions.length}
            </h2>
            <p>{currentQuestion.question}</p>
            {renderInput()}
            <div className="navigation d-flex flex-row justify-content-around">
                <button
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    className="btn btn-primary btn-sm"
                >PREV</button>
                <button className="btn btn-primary btn-sm" onClick={handleNext}>NEXT</button>
            </div>
        </div>
    )
}

export default QuestionScreen