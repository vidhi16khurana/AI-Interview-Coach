import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

import {
  Sparkles,
  ArrowLeft,
  RotateCcw,
  Briefcase,
  CheckCircle2,
  Mic,
} from "lucide-react";

import "./InterviewReport.css";

const API_URL = "http://127.0.0.1:8000";

const InterviewReport = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [evaluations, setEvaluations] = useState([]);
  const [loading, setLoading] = useState(true);

  const {
    selectedRole = "Software Developer",
    experience = "Fresher",
    interviewType = "Technical",
    answers = [],
  } = location.state || {};

  // ============================================================
  // EXTRACT SCORE FROM AI RESPONSE
  // ============================================================

  const extractScore = (evaluation) => {
    if (!evaluation || typeof evaluation !== "string") {
      return null;
    }

    // Matches:
    // Score: 8/10
    // Score: 8.5/10
    // Score: 8 out of 10
    const scoreMatch = evaluation.match(
      /score\s*:\s*(\d+(?:\.\d+)?)\s*(?:\/\s*10|out of 10)/i
    );

    if (scoreMatch) {
      const score = parseFloat(scoreMatch[1]);

      if (score >= 0 && score <= 10) {
        return score;
      }
    }

    // Backup for simple 8/10 pattern
    const slashMatch = evaluation.match(
      /(\d+(?:\.\d+)?)\s*\/\s*10/
    );

    if (slashMatch) {
      const score = parseFloat(slashMatch[1]);

      if (score >= 0 && score <= 10) {
        return score;
      }
    }

    return null;
  };

  // ============================================================
  // EVALUATE COMPLETE INTERVIEW
  // ============================================================

  useEffect(() => {
    const evaluateAnswers = async () => {
      if (answers.length === 0) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        console.log("Sending answers for evaluation:", answers);

        const response = await axios.post(
          `${API_URL}/evaluate-interview`,
          {
            answers: answers.map((item) => ({
              question: item.question,
              answer: item.answer,
            })),
          }
        );

        console.log("Evaluation response:", response.data);

        const results = response.data.evaluations;

        if (Array.isArray(results)) {
          setEvaluations(results);
        } else {
          console.error("Invalid evaluation response:", response.data);

          setEvaluations(
            answers.map(
              () =>
                "Unable to generate the interview evaluation. Please try again."
            )
          );
        }
      } catch (error) {
        console.error("Complete evaluation error:", error);

        setEvaluations(
          answers.map(
            () =>
              "Unable to generate the interview evaluation. Please try again."
          )
        );
      } finally {
        setLoading(false);
      }
    };

    evaluateAnswers();
  }, []);

  // ============================================================
  // CALCULATE OVERALL SCORE
  // ============================================================

  const validScores = evaluations
    .map((evaluation) => extractScore(evaluation))
    .filter((score) => score !== null);

  const overallScore =
    validScores.length > 0
      ? (
          validScores.reduce((sum, score) => sum + score, 0) /
          validScores.length
        ).toFixed(1)
      : "--";

  // ============================================================
  // EMPTY REPORT
  // ============================================================

  if (answers.length === 0) {
    return (
      <div className="report-page">
        <div className="report-empty">
          <Sparkles size={32} />

          <h2>No interview report available</h2>

          <p>Please complete a mock interview first.</p>

          <button
            onClick={() => navigate("/mock-interview")}
            className="retry-btn"
          >
            Start Mock Interview
          </button>
        </div>
      </div>
    );
  }

  // ============================================================
  // MAIN REPORT
  // ============================================================

  return (
    <div className="report-page">

      {/* Header */}

      <div className="report-header">
        <div>
          <span className="report-tag">
            INTERVIEW COMPLETE
          </span>

          <h1>Interview Report</h1>

          <p>
            Here's a summary of your mock interview performance.
          </p>
        </div>

        <div className="report-header-icon">
          <Sparkles size={24} />
        </div>
      </div>


      {/* Interview Details */}

      <div className="report-details">

        <div>
          <Briefcase size={17} />
          <span>{selectedRole}</span>
        </div>

        <div>
          <CheckCircle2 size={17} />
          <span>{experience}</span>
        </div>

        <div>
          <Mic size={17} />
          <span>{interviewType}</span>
        </div>

      </div>


      {/* Overall Score */}

      <div className="overall-score-card">

        <div className="score-circle-large">
          <strong>
            {loading ? "..." : overallScore}
          </strong>

          <span>/10</span>
        </div>

        <div className="score-info">

          <h2>Your Performance</h2>

          <p>
            {loading
              ? "AI is analyzing your interview answers..."
              : overallScore !== "--"
              ? `Your average interview score is ${overallScore} out of 10.`
              : "Your interview evaluation has been generated successfully."}
          </p>

        </div>

      </div>


      {/* Answers */}

      <div className="answers-section">

        <h2>Your Interview Answers</h2>

        {answers.map((item, index) => (

          <div
            className="answer-report-card"
            key={index}
          >

            {/* Question */}

            <span className="question-number">
              Question {index + 1}
            </span>

            <h3>
              {item.question}
            </h3>


            {/* User Answer */}

            <div className="answer-report">

              <strong>Your Answer</strong>

              <p>
                {item.answer}
              </p>

            </div>


            {/* AI Evaluation */}

            <div className="evaluation-placeholder">

              <Sparkles size={17} />

              <div className="evaluation-box">

                <strong className="evaluation-title">
                  AI Evaluation
                </strong>

                <div className="evaluation-content">

                  {loading ? (

                    <p className="evaluation-loading">
                      AI is analyzing your answer...
                    </p>

                  ) : (

                    <ReactMarkdown>
                      {evaluations[index] ||
                        "Evaluation unavailable."}
                    </ReactMarkdown>

                  )}

                </div>

              </div>

            </div>

          </div>

        ))}

      </div>


      {/* Actions */}

      <div className="report-actions">

        <button
          className="back-btn"
          onClick={() => navigate("/mock-interview")}
        >
          <ArrowLeft size={18} />
          Back to Interview Setup
        </button>

        <button
          className="retry-btn"
          onClick={() => navigate("/mock-interview")}
        >
          <RotateCcw size={18} />
          Practice Again
        </button>

      </div>

    </div>
  );
};

export default InterviewReport;