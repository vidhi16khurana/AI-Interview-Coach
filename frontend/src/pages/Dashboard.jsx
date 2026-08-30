import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

import {
  Bell,
  ChevronDown,
  Mic,
  FileText,
  Play,
  ArrowRight,
  Brain,
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

  const userEmail = user?.email || "";

  const initials = userName
    .split(" ")
    .map((name) => name.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="main-content">
      {/* TOP HEADER */}
      <header className="top-header">
        <div></div>

        <div className="header-right">
          <Bell size={19} />

          <div className="profile">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt={userName}
                className="avatar"
              />
            ) : (
              <div className="avatar">{initials}</div>
            )}

            <div>
              <strong>{userName}</strong>
              <span>{userEmail}</span>
            </div>

            <ChevronDown size={16} />
          </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="content">
        {/* WELCOME */}
        <section className="welcome-section">
          <h1>Hello, {userName}! 👋</h1>
          <p>Ready to improve your interview skills today?</p>
        </section>

        {/* TOP CARDS */}
        <section className="top-cards">
          <div className="action-card">
            <div className="card-icon">
              <Mic size={24} />
            </div>

            <div className="card-info">
              <h3>Mock Interview</h3>
              <p>
                Practice with AI-generated interview questions and get instant feedback.
              </p>
              <button>Start Interview</button>
            </div>
          </div>

          <div className="action-card">
            <div className="card-icon">
              <FileText size={24} />
            </div>

            <div className="card-info">
              <h3>Resume Analysis</h3>
              <p>
                Upload your resume and get personalized AI suggestions.
              </p>
              <button className="outline-btn">Analyze Resume</button>
            </div>
          </div>

          <div className="action-card">
            <div className="card-icon">
              <Play size={24} />
            </div>

            <div className="card-info">
              <h3>Continue Practice</h3>
              <p>
                Continue your previous interview preparation session.
              </p>
              <button className="outline-btn">View Sessions</button>
            </div>
          </div>
        </section>

        {/* DASHBOARD GRID */}
        <section className="dashboard-grid">
          {/* LEFT COLUMN */}
          <div className="left-column">
            {/* RECENT SESSIONS */}
            <div className="panel sessions-panel">
              <h2>Recent Sessions</h2>

              <div className="sessions-table">
                <div className="table-header">
                  <span>POSITION</span>
                  <span>DATE</span>
                  <span>SCORE</span>
                  <span>STATUS</span>
                </div>

                <div className="table-row">
                  <span>Frontend Developer</span>
                  <span>Recently</span>
                  <span>
                    <span className="score-circle">0%</span>
                  </span>
                  <span>No sessions yet</span>
                </div>
              </div>

              <div className="view-all">
                View All Sessions
                <ArrowRight size={14} />
              </div>
            </div>

            {/* RECOMMENDATIONS */}
            <div className="panel recommendations-panel">
              <h2>Recommended For You</h2>

              <div className="recommendation-item">
                <div className="recommendation-icon">
                  <Mic size={16} />
                </div>

                <div>
                  <h4>Practice Technical Questions</h4>
                  <p>Improve your technical interview confidence.</p>
                </div>

                <ArrowRight size={16} />
              </div>

              <div className="recommendation-item">
                <div className="recommendation-icon">
                  <FileText size={16} />
                </div>

                <div>
                  <h4>Analyze Your Resume</h4>
                  <p>Get personalized suggestions for improvement.</p>
                </div>

                <ArrowRight size={16} />
              </div>

              <div className="recommendation-item">
                <div className="recommendation-icon">
                  <Brain size={16} />
                </div>

                <div>
                  <h4>AI Interview Practice</h4>
                  <p>Prepare with personalized interview questions.</p>
                </div>

                <ArrowRight size={16} />
              </div>

              <div className="explore">
                Explore Resources
                <ArrowRight size={14} />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="right-column">
            {/* PROGRESS */}
            <div className="panel progress-panel">
              <h2>Your Progress</h2>

              <div className="progress-circle">
                <div className="progress-inner">
                  <strong>0%</strong>
                </div>
              </div>

              <h3>Interview Readiness</h3>

              <div className="progress-stats">
                <div>
                  <span>Sessions</span>
                  <strong>0</strong>
                </div>

                <div>
                  <span>Avg. Score</span>
                  <strong>0%</strong>
                </div>

                <div className="improvement">
                  <span>Improvement</span>
                  <strong>+0%</strong>
                </div>
              </div>
            </div>

            {/* TIPS */}
            <div className="panel tips-panel">
              <h2>Interview Tips</h2>

              <ul>
                <li>Practice answering questions clearly and confidently.</li>
                <li>Use the STAR method for behavioral questions.</li>
                <li>Research the company before your interview.</li>
                <li>Review your feedback after every practice session.</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;