import { v4 as uuidv4 } from "uuid"

export const getSessionId = () => {
    let sessionId = localStorage.getItem("sessionId");
    if (!sessionId) {
        sessionId = uuidv4();
        localStorage.setItem("sessionId", sessionId);
    }
    return sessionId;
};

export const saveResponse = (sessionId, responses) => {
    localStorage.setItem(`survey_${sessionId}`, JSON.stringify(responses));
}

export const markSessionCompleted = (sessionId) => {
    const sessionKey = `survey_${sessionId}`;
    const sessionData = JSON.parse(localStorage.getItem(sessionKey)) || {};
    sessionData.completed = true;
    localStorage.setItem(sessionKey, JSON.stringify(sessionData));
}