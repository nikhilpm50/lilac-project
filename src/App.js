import "./App.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import HomePage from "./pages/HomePage/HomePage";
import NavBar from "./components/NavBar/NavBar";
import CourseCreationPage from "./pages/CourseCreationPage/CourseCreationPage";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/course" element={<CourseCreationPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
