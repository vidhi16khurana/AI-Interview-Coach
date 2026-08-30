import { useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

import {
  User,
  Mail,
  LogOut,
  Settings as SettingsIcon,
} from "lucide-react";

import "./Settings.css";

const Settings = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
      }
    );

    return () => unsubscribe();
  }, []);

  const userName =
    user?.displayName ||
    user?.email?.split("@")[0] ||
    "User";

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="settings-page">
      <div className="settings-container">

        <div className="settings-header">
          <div className="settings-title-icon">
            <SettingsIcon size={28} />
          </div>

          <div>
            <h1>Settings</h1>
            <p>Manage your account information</p>
          </div>
        </div>

        <div className="settings-card">

          <h2>Profile Information</h2>

          <div className="profile-section">

            <div className="profile-avatar">
              {userName.charAt(0).toUpperCase()}
            </div>

            <div className="profile-info">
              <h3>{userName}</h3>

              <p>
                {user?.email || "No email available"}
              </p>

              {user?.providerData?.[0]?.providerId ===
                "google.com" && (
                <span className="google-user">
                  Signed in with Google
                </span>
              )}
            </div>

          </div>

          <div className="settings-info-row">
            <div className="info-icon">
              <User size={20} />
            </div>

            <div>
              <span>Name</span>
              <p>{userName}</p>
            </div>
          </div>

          <div className="settings-info-row">
            <div className="info-icon">
              <Mail size={20} />
            </div>

            <div>
              <span>Email Address</span>
              <p>
                {user?.email || "No email available"}
              </p>
            </div>
          </div>

        </div>

        <div className="settings-card logout-card">

          <div>
            <h2>Logout</h2>

            <p>
              Sign out from your AI Interview Coach account.
            </p>
          </div>

          <button
            className="settings-logout-btn"
            onClick={handleLogout}
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>

      </div>
    </div>
  );
};

export default Settings;