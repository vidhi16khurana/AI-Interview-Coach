import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

import {
  Mic,
  FileText,
  ClipboardCheck,
  ChartNoAxesCombined,
  ArrowRight,
} from "lucide-react";

import "./Dashboard.css";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const userName =
    user?.displayName ||
    user?.email?.split("@")[0] ||
    "User";

  return (
    <div className="dashboard">
      <div className="dashboard-content">
        <div className="dashboard-welcome">
          <div>
            <p className="dashboard-tag">AI-POWERED INTERVIEW PREPARATION</p>

            <h1>Hello, {userName}! 👋</h1>

            <p className="welcome-text">
              Ready to improve your interview skills today?
            </p>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <Mic size={24} />
            </div>

            <div>
              <h3>Mock Interviews</h3>
              <p>Practice with AI</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FileText size={24} />
            </div>

            <div>
              <h3>Resume Analysis</h3>
              <p>Get AI suggestions</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <ClipboardCheck size={24} />
            </div>

            <div>
              <h3>Previous Sessions</h3>
              <p>Review your performance</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <ChartNoAxesCombined size={24} />
            </div>

            <div>
              <h3>Track Progress</h3>
              <p>Improve over time</p>
            </div>
          </div>
        </div>

        <div className="dashboard-main-grid">
          <div className="dashboard-section">
            <div className="section-header">
              <div>
                <h2>Continue Your Preparation</h2>
                <p>Choose where you want to start.</p>
              </div>
            </div>

            <div className="action-list">
              <div className="action-item">
                <div className="action-left">
                  <div className="action-icon">
                    <Mic size={22} />
                  </div>

                  <div>
                    <h3>Start Mock Interview</h3>
                    <p>Practice interview questions with AI.</p>
                  </div>
                </div>

                <ArrowRight size={20} />
              </div>

              <div className="action-item">
                <div className="action-left">
                  <div className="action-icon">
                    <FileText size={22} />
                  </div>

                  <div>
                    <h3>Analyze Your Resume</h3>
                    <p>Get personalized feedback on your resume.</p>
                  </div>
                </div>

                <ArrowRight size={20} />
              </div>
            </div>
          </div>

          <div className="dashboard-section progress-section">
            <h2>Your Progress</h2>

            <div className="progress-circle">
              <span>0%</span>
              <small>Interview Progress</small>
            </div>

            <p className="progress-text">
              Complete your first mock interview to start tracking your
              progress.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;