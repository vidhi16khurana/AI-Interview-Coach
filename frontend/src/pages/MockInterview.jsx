import { useState } from "react";
import {
  Mic,
  Briefcase,
  Code2,
  Users,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./MockInterview.css";

const MockInterview = () => {
  const [selectedRole, setSelectedRole] = useState("Software Developer");
  const [experience, setExperience] = useState("Fresher");
  const [interviewType, setInterviewType] = useState("Technical");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleStartInterview = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        "http://127.0.0.1:8000/generate-questions",
        {
          role: selectedRole,
          experience: experience,
          interview_type: interviewType,
        }
      );

      const generatedQuestions = response.data.questions;

      if (!generatedQuestions || generatedQuestions.length === 0) {
        throw new Error("No questions received from the AI.");
      }

      navigate("/interview-session", {
        state: {
          selectedRole,
          experience,
          interviewType,
          questions: generatedQuestions,
        },
      });
    } catch (error) {
  console.error("Full Error:", error);
  console.log("Response Data:", error.response?.data);

  alert(
    error.response?.data?.detail
      ? JSON.stringify(error.response.data.detail)
      : "Unable to generate interview questions"
  );
}
  };

  return (
    <div className="mock-page">
      <div className="mock-header">
        <div>
          <p className="mock-tag">AI-POWERED PRACTICE</p>

          <h1>Mock Interview</h1>

          <p>
            Practice real interview questions and get instant AI-powered
            feedback.
          </p>
        </div>

        <div className="mock-header-badge">
          <Sparkles size={18} />
          <span>Personalized Questions</span>
        </div>
      </div>

      <div className="mock-layout">
        {/* Interview Setup */}
        <div className="mock-setup-card">
          <div className="setup-title">
            <div className="setup-icon">
              <Mic size={22} />
            </div>

            <div>
              <h2>Set up your interview</h2>
              <p>Customize your mock interview experience.</p>
            </div>
          </div>

          {/* Target Role */}
          <div className="form-group">
            <label>Target Role</label>

            <div className="role-options">
              <button
                className={
                  selectedRole === "Software Developer" ? "selected" : ""
                }
                onClick={() => setSelectedRole("Software Developer")}
                disabled={loading}
              >
                <Code2 size={18} />
                Software Developer
              </button>

              <button
                className={
                  selectedRole === "Product Manager" ? "selected" : ""
                }
                onClick={() => setSelectedRole("Product Manager")}
                disabled={loading}
              >
                <Briefcase size={18} />
                Product Manager
              </button>

              <button
                className={
                  selectedRole === "HR Interview" ? "selected" : ""
                }
                onClick={() => setSelectedRole("HR Interview")}
                disabled={loading}
              >
                <Users size={18} />
                HR Interview
              </button>
            </div>
          </div>

          {/* Experience */}
          <div className="form-group">
            <label>Experience Level</label>

            <div className="choice-row">
              {["Fresher", "1–3 Years", "3+ Years"].map((level) => (
                <button
                  key={level}
                  className={experience === level ? "selected" : ""}
                  onClick={() => setExperience(level)}
                  disabled={loading}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Interview Type */}
          <div className="form-group">
            <label>Interview Type</label>

            <div className="choice-row">
              {["Technical", "Behavioral", "Mixed"].map((type) => (
                <button
                  key={type}
                  className={interviewType === type ? "selected" : ""}
                  onClick={() => setInterviewType(type)}
                  disabled={loading}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="mock-actions">
            <button
              className="start-interview-btn"
              onClick={handleStartInterview}
              disabled={loading}
            >
              {loading ? "Generating Questions..." : "Start Interview"}
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Preview */}
        <div className="mock-preview-column">
          <div className="interview-preview-card">
            <div className="preview-top">
              <div className="preview-icon">
                <Sparkles size={22} />
              </div>

              <span>AI INTERVIEWER</span>
            </div>

            <h2>Your interview is ready</h2>

            <p>
              Our AI will generate questions based on your selected role,
              experience level and interview type.
            </p>

            <div className="preview-features">
              <div>
                <CheckCircle2 size={17} />
                Personalized questions
              </div>

              <div>
                <CheckCircle2 size={17} />
                Real-time feedback
              </div>

              <div>
                <CheckCircle2 size={17} />
                Performance analysis
              </div>
            </div>
          </div>

          <div className="interview-info-card">
            <div>
              <Clock size={20} />

              <div>
                <span>Estimated duration</span>
                <strong>15–20 minutes</strong>
              </div>
            </div>

            <div>
              <Mic size={20} />

              <div>
                <span>Questions</span>
                <strong>2-5 questions</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockInterview;