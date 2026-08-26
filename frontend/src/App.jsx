import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Dashboard from "./pages/Dashboard";
import ResumeAnalysis from "./pages/ResumeAnalysis";
import MockInterview from "./pages/MockInterview";
import InterviewSession from "./pages/InterviewSession";
import InterviewReport from "./pages/InterviewReport";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Sidebar />

        <main className="app-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route
              path="/resume-analysis"
              element={<ResumeAnalysis />}
            />
            <Route
              path="/mock-interview"
              element={<MockInterview />}
            />
            <Route
              path="/interview-session"
              element={<InterviewSession />}
            />
            <Route
              path="/interview-report"
              element={<InterviewReport />}
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;