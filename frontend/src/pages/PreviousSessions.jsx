import { useEffect, useState } from "react";
import {
  History,
  Calendar,
  Briefcase,
  Trash2,
  FileText,
  TrendingUp,
  Search,
} from "lucide-react";

import "./ExtraPages.css";

const demoSessions = [
  {
    id: 1,
    role: "Software Developer",
    type: "Technical Interview",
    experience: "Fresher",
    score: "8.0",
    date: "Today",
  },
  {
    id: 2,
    role: "Frontend Developer",
    type: "Technical Interview",
    experience: "Fresher",
    score: "7.5",
    date: "Yesterday",
  },
  {
    id: 3,
    role: "Software Engineer",
    type: "HR Interview",
    experience: "Fresher",
    score: "8.5",
    date: "Aug 28, 2026",
  },
];

const PreviousSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const savedSessions =
      JSON.parse(localStorage.getItem("interviewSessions")) || [];

    if (savedSessions.length > 0) {
      setSessions(savedSessions);
    } else {
      setSessions(demoSessions);
    }
  }, []);

  const deleteSession = (id) => {
    const updated = sessions.filter((session) => session.id !== id);

    setSessions(updated);
    localStorage.setItem(
      "interviewSessions",
      JSON.stringify(updated)
    );
  };

  const filteredSessions = sessions.filter((session) =>
    session.role.toLowerCase().includes(search.toLowerCase())
  );

  const averageScore =
    sessions.length > 0
      ? (
          sessions.reduce(
            (total, session) =>
              total + Number(session.score || 0),
            0
          ) / sessions.length
        ).toFixed(1)
      : "0.0";

  return (
    <div className="extra-page">
      <div className="page-header">
        <div>
          <span className="page-tag">
            <History size={16} />
            YOUR HISTORY
          </span>

          <h1>Previous Sessions</h1>

          <p>
            Review your past interview sessions and track your progress.
          </p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="mini-stat">
          <FileText size={25} />
          <div>
            <span>Total Sessions</span>
            <h3>{sessions.length}</h3>
          </div>
        </div>

        <div className="mini-stat">
          <TrendingUp size={25} />
          <div>
            <span>Average Score</span>
            <h3>{averageScore}/10</h3>
          </div>
        </div>
      </div>

      <div className="content-card">
        <div className="card-top">
          <h2>Interview History</h2>

          <div className="search-box">
            <Search size={18} />

            <input
              type="text"
              placeholder="Search by role..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {filteredSessions.length === 0 ? (
          <div className="empty-state">
            <History size={45} />
            <h3>No sessions found</h3>
            <p>Your completed interviews will appear here.</p>
          </div>
        ) : (
          <div className="session-list">
            {filteredSessions.map((session) => (
              <div className="session-card" key={session.id}>
                <div className="session-icon">
                  <Briefcase size={22} />
                </div>

                <div className="session-info">
                  <h3>{session.role}</h3>

                  <p>
                    {session.type} • {session.experience}
                  </p>

                  <span>
                    <Calendar size={14} />
                    {session.date}
                  </span>
                </div>

                <div className="session-score">
                  <span>Score</span>
                  <strong>{session.score}/10</strong>
                </div>

                <button
                  className="delete-btn"
                  onClick={() => deleteSession(session.id)}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviousSessions;