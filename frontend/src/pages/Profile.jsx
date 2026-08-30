import { useState } from "react";
import {
  User,
  Mail,
  GraduationCap,
  Save,
} from "lucide-react";

import "./ExtraPages.css";

const Profile = () => {
  const savedProfile =
    JSON.parse(localStorage.getItem("userProfile")) || {};

  const [profile, setProfile] = useState({
    name: savedProfile.name || "Vidhi Khurana",
    email: savedProfile.email || "",
    education:
      savedProfile.education ||
      "Bachelor of Engineering",
    experience: savedProfile.experience || "Fresher",
    bio:
      savedProfile.bio ||
      "Aspiring software developer preparing for technical interviews.",
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });

    setSaved(false);
  };

  const handleSave = (e) => {
    e.preventDefault();

    localStorage.setItem(
      "userProfile",
      JSON.stringify(profile)
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  return (
    <div className="extra-page">
      <div className="page-header">
        <div>
          <span className="page-tag">
            <User size={16} />
            ACCOUNT
          </span>

          <h1>My Profile</h1>

          <p>
            Manage your personal information and interview preferences.
          </p>
        </div>
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