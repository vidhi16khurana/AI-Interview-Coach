import { useEffect, useState } from "react";
import {
  Settings as SettingsIcon,
  Moon,
  Sun,
  Trash2,
  RotateCcw,
} from "lucide-react";

import "./ExtraPages.css";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    document.body.classList.toggle("dark-app", darkMode);

    localStorage.setItem(
      "darkMode",
      darkMode
    );
  }, [darkMode]);

  const clearSessions = () => {
    const confirmClear = window.confirm(
      "Are you sure you want to delete all interview sessions?"
    );

    if (confirmClear) {
      localStorage.removeItem("interviewSessions");
      alert("Interview sessions cleared successfully.");
    }
  };

  const resetProfile = () => {
    const confirmReset = window.confirm(
      "Are you sure you want to reset your profile?"
    );

    if (confirmReset) {
      localStorage.removeItem("userProfile");
      alert("Profile reset successfully.");
    }
  };

  return (
    <div className="extra-page">
      <div className="page-header">
        <div>
          <span className="page-tag">
            <SettingsIcon size={16} />
            PREFERENCES
          </span>

          <h1>Settings</h1>

          <p>
            Customize your AI Interview Coach experience.
          </p>
        </div>
      </div>

      <div className="settings-list">
        <div className="setting-card">
          <div className="setting-info">
            {darkMode ? <Moon /> : <Sun />}

            <div>
              <h3>Dark Mode</h3>

              <p>
                Change the appearance of your application.
              </p>
            </div>
          </div>

          <button
            className={`toggle-switch ${
              darkMode ? "enabled" : ""
            }`}
            onClick={() => setDarkMode(!darkMode)}
          >
            <span></span>
          </button>
        </div>

        <div className="setting-card">
          <div className="setting-info">
            <Trash2 />

            <div>
              <h3>Clear Interview History</h3>

              <p>
                Permanently remove all saved interview sessions.
              </p>
            </div>
          </div>

          <button
            className="danger-btn"
            onClick={clearSessions}
          >
            Clear Data
          </button>
        </div>

        <div className="setting-card">
          <div className="setting-info">
            <RotateCcw />

            <div>
              <h3>Reset Profile</h3>

              <p>
                Restore your profile information to default.
              </p>
            </div>
          </div>

          <button
            className="secondary-btn"
            onClick={resetProfile}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;