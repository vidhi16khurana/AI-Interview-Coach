import ReactMarkdown from "react-markdown";
import { useState } from "react";
import {
  Upload,
  FileText,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  BarChart3,
} from "lucide-react";
import "./ResumeAnalysis.css";

const ResumeAnalysis = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedFile(file);
      setError("");
      setAnalysis("");
    }
  };

  const handleAnalyzeResume = async () => {
    if (!selectedFile) {
      setError("Please select a resume first.");
      return;
    }

    setLoading(true);
    setError("");
    setAnalysis("");

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch(
        "http://127.0.0.1:8000/upload-resume",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to analyze resume");
      }

      const data = await response.json();

      setAnalysis(data.analysis);
    } catch (err) {
      console.error("Error:", err);
      setError(
        "Something went wrong while analyzing your resume. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="resume-page">
      <div className="page-header">
        <div>
          <p className="page-tag">AI POWERED ANALYSIS</p>

          <h1>Resume Analysis</h1>

          <p>
            Upload your resume and get detailed AI-powered feedback to improve
            your chances of landing your dream job.
          </p>
        </div>

        <div className="header-badge">
          <Sparkles size={18} />
          <span>AI Career Insights</span>
        </div>
      </div>

      {/* Upload Section */}
      <section className="resume-upload-card">
        {/* <div className="upload-icon">
          <Upload size={30} />
        </div> */}

        <h2>Upload your resume</h2>
        <p>Get an instant AI-powered analysis of your resume.</p>

        <label className="upload-area">
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
          />

          <Upload size={22} />
          <span>Click to upload your resume</span>
          <small>PDF only (Max 10MB)</small>
        </label>

        {selectedFile && (
          <div className="selected-file">
            <FileText size={20} />

            <div>
              <strong>{selectedFile.name}</strong>

              <span>
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </span>
            </div>

            <CheckCircle2 size={20} />
          </div>
        )}

        <button
          className="analyze-resume-btn"
          onClick={handleAnalyzeResume}
          disabled={loading}
        >
          <Sparkles size={18} />

          {loading ? "Analyzing..." : "Analyze My Resume"}

          <ArrowRight size={18} />
        </button>

        {error && (
          <div className="analysis-error">
            {error}
          </div>
        )}
      </section>

      {/* Analysis Result */}
      {analysis && (
        <section className="analysis-result">
          <div className="result-header">
            <Sparkles size={24} />
            <h2>Your AI Resume Analysis</h2>
          </div>

          <div className="result-content">
  <ReactMarkdown>{analysis}</ReactMarkdown>
</div>
        </section>
      )}

      {/* What AI Checks */}
      <section className="analysis-info">
        <h2>What will AI analyze?</h2>

        <div className="analysis-grid">
          <div className="analysis-card">
            <div className="analysis-icon purple">
              <FileText size={22} />
            </div>

            <h3>Resume Quality</h3>

            <p>
              Check clarity, structure, formatting, and overall presentation.
            </p>
          </div>

          <div className="analysis-card">
            <div className="analysis-icon blue">
              <BarChart3 size={22} />
            </div>

            <h3>Skills & Keywords</h3>

            <p>
              Identify important skills and keywords from your professional
              profile.
            </p>
          </div>

          <div className="analysis-card">
            <div className="analysis-icon green">
              <ShieldCheck size={22} />
            </div>

            <h3>Strengths</h3>

            <p>
              Discover the strongest aspects of your profile and experience.
            </p>
          </div>

          <div className="analysis-card">
            <div className="analysis-icon pink">
              <XCircle size={22} />
            </div>

            <h3>Areas to Improve</h3>

            <p>
              Get actionable feedback on areas that can be improved.
            </p>
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="resume-tip-card">
        <div className="tip-icon">
          <Sparkles size={22} />
        </div>

        <div>
          <h3>Get the best analysis</h3>

          <p>
            Upload your latest resume with complete information about your
            skills, education, projects, and experience.
          </p>
        </div>
      </section>
    </div>
  );
};

export default ResumeAnalysis;