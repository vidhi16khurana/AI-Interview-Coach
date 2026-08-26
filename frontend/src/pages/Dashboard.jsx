import {
  FileText,
  Mic,
  BarChart3,
  ArrowRight,
  ChevronRight,
  Lightbulb,
  BookOpen,
  CircleUserRound,
} from "lucide-react";

import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const sessions = [
    {
      type: "Mock Interview",
      date: "May 28, 2025",
      score: "7.5",
      feedback: "Good communication skills.",
    },
    {
      type: "Resume Analysis",
      date: "May 27, 2025",
      score: "8.5",
      feedback: "Strong skill match.",
    },
    {
      type: "Mock Interview",
      date: "May 25, 2025",
      score: "6.5",
      feedback: "Good start! Try to structure answers better.",
    },
  ];

  const recommendations = [
    {
      icon: <Lightbulb size={18} />,
      title: "Top 50 Interview Questions",
      description: "Practice the most commonly asked questions.",
      path: "/resources",
    },
    {
      icon: <BookOpen size={18} />,
      title: "How to Answer Behavioral Questions",
      description: "Learn the STAR method with examples.",
      path: "/resources",
    },
    {
      icon: <CircleUserRound size={18} />,
      title: "System Design Basics",
      description: "Understand the fundamentals of system design.",
      path: "/resources",
    },
  ];

  return (
    <div className="dashboard">
      <section className="content">
        <div className="welcome-section">
          <h1>Hello, Vidhi! 👋</h1>
          <p>Let's prepare you for your dream job.</p>
        </div>

        {/* Top Cards */}
        <div className="top-cards">

          {/* Resume Analysis */}
          <div className="action-card">
            <div className="card-icon">
              <FileText />
            </div>

            <div className="card-info">
              <h3>Resume Analysis</h3>
              <p>Upload your resume and get AI-powered feedback.</p>

              <button onClick={() => navigate("/resume-analysis")}>
                Analyze Resume
              </button>
            </div>
          </div>

          {/* Mock Interview */}
          <div className="action-card">
            <div className="card-icon">
              <Mic />
            </div>

            <div className="card-info">
              <h3>Mock Interview</h3>
              <p>Practice with AI-generated questions and improve.</p>

              <button onClick={() => navigate("/mock-interview")}>
                Start Mock Interview
              </button>
            </div>
          </div>

          {/* Performance */}
          <div className="action-card">
            <div className="card-icon">
              <BarChart3 />
            </div>

            <div className="card-info">
              <h3>Performance</h3>
              <p>
                Track your performance and see how much you've improved.
              </p>

              <button
                className="outline-btn"
                onClick={() => navigate("/performance")}
              >
                View Report
              </button>
            </div>
          </div>
        </div>

        <div className="dashboard-grid">

          {/* Left Column */}
          <div className="left-column">

            {/* Recent Sessions */}
            <div className="panel">
              <h2>Recent Sessions</h2>

              <div className="sessions-table">
                <div className="table-header">
                  <span>Session Type</span>
                  <span>Date</span>
                  <span>Score</span>
                  <span>Feedback</span>
                </div>

                {sessions.map((session, index) => (
                  <div className="table-row" key={index}>
                    <span>{session.type}</span>

                    <span>{session.date}</span>

                    <span>
                      <b className="score-circle">{session.score}</b>/10
                    </span>

                    <span>{session.feedback}</span>
                  </div>
                ))}
              </div>

              <button
                className="view-all"
                onClick={() => navigate("/sessions")}
              >
                View all sessions
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Recommended */}
            <div className="panel recommendations">
              <h2>Recommended for you</h2>

              {recommendations.map((item, index) => (
                <button
                  className="recommendation-item"
                  key={index}
                  onClick={() => navigate(item.path)}
                >
                  <div className="recommendation-icon">
                    {item.icon}
                  </div>

                  <div className="recommendation-content">
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </div>

                  <ChevronRight size={18} />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="right-column">

            {/* Progress */}
            <div className="panel progress-panel">
              <h2>Overall Progress</h2>

              <div className="progress-circle">
                <div className="progress-inner">
                  <strong>75%</strong>
                </div>
              </div>

              <h3>Great Progress!</h3>

              <div className="progress-stats">
                <div>
                  <span>Mocks Taken</span>
                  <strong>12</strong>
                </div>

                <div>
                  <span>Avg. Score</span>
                  <strong>7.3</strong>
                </div>

                <div className="improvement">
                  <span>Improvement</span>
                  <strong>↗ +18%</strong>
                </div>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="panel tips-panel">
              <h2>💡 Quick Tips</h2>

              <ul>
                <li>Be clear and concise in your answers.</li>
                <li>Structure your answers using the STAR method.</li>
                <li>Practice regularly to improve confidence.</li>
                <li>Review feedback and work on weak areas.</li>
              </ul>

              <button
                className="explore"
                onClick={() => navigate("/resources")}
              >
                Explore more resources
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;