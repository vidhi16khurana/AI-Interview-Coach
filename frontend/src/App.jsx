import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import {
  onAuthStateChanged,
} from "firebase/auth";

import {
  auth,
} from "./firebase";

import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import ResumeAnalysis from "./pages/ResumeAnalysis";
import MockInterview from "./pages/MockInterview";
import InterviewSession from "./pages/InterviewSession";
import InterviewReport from "./pages/InterviewReport";

import PreviousSessions from "./pages/PreviousSessions";
import Resources from "./pages/Resources";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Login from "./pages/Login";

import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="app-loader">
        Loading Interview Genie...
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/" />
            ) : (
              <Login />
            )
          }
        />

        {user ? (
          <Route
            path="*"
            element={
              <div className="app-layout">
                <Sidebar />

                <main className="app-content">
                  <Routes>
                    <Route
                      path="/"
                      element={<Dashboard />}
                    />

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

                    <Route
                      path="/sessions"
                      element={<PreviousSessions />}
                    />

                    <Route
                      path="/resources"
                      element={<Resources />}
                    />

                    <Route
                      path="/profile"
                      element={<Profile />}
                    />

                    <Route
                      path="/settings"
                      element={<Settings />}
                    />
                  </Routes>
                </main>
              </div>
            }
          />
        ) : (
          <Route
            path="*"
            element={<Navigate to="/login" />}
          />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;