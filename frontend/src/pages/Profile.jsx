import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import {
  User,
  Mail,
  GraduationCap,
  Save,
} from "lucide-react";

import "./ExtraPages.css";

const Profile = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [profile, setProfile] = useState({
    name: "Your Name",
    email: "",
    education: "Bachelor's Degree",
    experience: "Fresher",
    bio: "Aspiring software developer preparing for technical interviews.",
  });

  const [saved, setSaved] = useState(false);

  // Watch for login/logout and load the CORRECT user's profile
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);

      if (user) {
        const storageKey = `userProfile_${user.uid}`;
        const savedProfile = JSON.parse(localStorage.getItem(storageKey)) || {};

        setProfile({
          name: savedProfile.name || user.displayName || "Your Name",
          email: savedProfile.email || user.email || "",
          education: savedProfile.education || "Bachelor's Degree",
          experience: savedProfile.experience || "Fresher",
          bio:
            savedProfile.bio ||
            "Aspiring software developer preparing for technical interviews.",
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });

    setSaved(false);
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (!currentUser) return;

    const storageKey = `userProfile_${currentUser.uid}`;
    localStorage.setItem(storageKey, JSON.stringify(profile));

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  return (
    <div className="extra-page">
      <div className="page-header">
        <span className="page-tag">
          <User size={16} />
          ACCOUNT
        </span>

        <h1>My Profile</h1>

        <p>
          Manage your personal information and interview preferences.
        </p>
      </div>

      <div className="profile-layout">
        <div className="profile-card">
          <div className="profile-avatar">
            {profile.name
              .split(" ")
              .map((name) => name[0])
              .join("")
              .slice(0, 2)}
          </div>

          <h2>{profile.name}</h2>

          <p>{profile.experience}</p>

          <div className="profile-line">
            <Mail size={17} />
            {profile.email || "Email not added"}
          </div>

          <div className="profile-line">
            <GraduationCap size={17} />
            {profile.education}
          </div>
        </div>

        <form className="profile-form" onSubmit={handleSave}>
          <h2>Personal Information</h2>

          <div className="form-grid">
            <div className="form-group">
              <label>Full Name</label>

              <input
                name="name"
                value={profile.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Email</label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={profile.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Education</label>

              <input
                name="education"
                value={profile.education}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Experience Level</label>

              <select
                name="experience"
                value={profile.experience}
                onChange={handleChange}
              >
                <option>Fresher</option>
                <option>0-1 Years</option>
                <option>1-3 Years</option>
                <option>3+ Years</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>About Me</label>

            <textarea
              name="bio"
              rows="5"
              value={profile.bio}
              onChange={handleChange}
            />
          </div>

          <button className="save-btn" type="submit">
            <Save size={18} />
            Save Profile
          </button>

          {saved && (
            <p className="success-message">
              Profile saved successfully!
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Profile;
