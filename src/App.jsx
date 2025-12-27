import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import WelcomeScreen from "./components/WelcomeScreen"
import QuestionScreen from "./components/QuestionScreen"
import ConfirmationScreen from "./components/ConfirmationScreen"

import "./App.css"


const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/survey" element={<QuestionScreen />} />
        <Route path="/confirmation" element={<ConfirmationScreen />} />
      </Routes>
    </Router>
  )
}
export default App;
