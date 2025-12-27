import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { questions } from "../data/questions"
import { getSessionId, saveResponse } from "../utils/storage"
import Layout from "./Layout"

const QuestionScreen = () => {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [responses, setResponses] = useState({});
    const sessionId = getSessionId();
    const currentQuestion = questions[currentIndex];

    // Calculate progress
    const progress = ((currentIndex + 1) / questions.length) * 100;

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
                <div className="rating-container my-4">
                    <div className="d-flex justify-content-center flex-wrap gap-2">
                        {[...Array(currentQuestion.scale)].map((_, index) => {
                            const value = index + 1;
                            const isSelected = responses[currentQuestion.id] === value;
                            return (
                                <button
                                    key={value}
                                    type="button"
                                    className={`rating-btn ${isSelected ? 'selected' : ''}`}
                                    onClick={() => handleAnswer(value)}
                                >
                                    {value}
                                </button>
                            );
                        })}
                    </div>
                    <div className="d-flex justify-content-between w-100 mt-2 text-secondary small">
                        <span>Not Likely</span>
                        <span>Very Likely</span>
                    </div>
                </div>
            );
        } else if (currentQuestion.type === "text") {
            return (
                <div className="my-4 w-100">
                    <textarea
                        className="form-control custom-textarea"
                        value={responses[currentQuestion.id] || ""}
                        onChange={(e) => handleAnswer(e.target.value)}
                        rows="4"
                        placeholder="Type your answer here..."
                    />
                </div>
            );
        }
    };

    return (
        <Layout>
            <div className="question-screen d-flex flex-column align-items-center w-100">

                {/* Progress Bar */}
                <div className="progress-container w-100 mb-4">
                    <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                </div>

                <div className="question-header text-center mb-3">
                    <span className="badge bg-light text-dark mb-2">
                        Question {currentIndex + 1} of {questions.length}
                    </span>
                    <h3 className="mt-2">{currentQuestion.question}</h3>
                </div>

                {renderInput()}

                <div className="navigation d-flex justify-content-between w-100 mt-auto">
                    <button
                        onClick={handlePrev}
                        disabled={currentIndex === 0}
                        className="btn-text"
                    >
                        ← Back
                    </button>
                    <button
                        className="btn-primary-custom"
                        onClick={handleNext}
                        disabled={!responses[currentQuestion.id] && currentQuestion.type === 'rating'}
                    >
                        {currentIndex === questions.length - 1 ? 'Finish' : 'Next'}
                    </button>
                </div>
            </div>
        </Layout>
    )
}

export default QuestionScreen
