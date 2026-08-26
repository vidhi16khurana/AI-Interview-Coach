import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Mic,
  ArrowRight,
  Clock,
  Sparkles,
  Briefcase,
  CheckCircle2,
} from "lucide-react";

import "./InterviewSession.css";

const InterviewSession = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    selectedRole = "Software Developer",
    experience = "Fresher",
    interviewType = "Technical",
    questions = [],
  } = location.state || {};

  const generatedQuestions = Array.isArray(questions)
    ? questions
    : typeof questions === "string"
    ? questions
        .split("\n")
        .map((question) =>
          question.replace(/^\d+[\).\s-]*/, "").trim()
        )
        .filter((question) => question.length > 0)
    : [];

  const [questionNumber, setQuestionNumber] = useState(1);
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState([]);

  const handleNextQuestion = () => {
    if (!answer.trim()) {
      alert("Please provide an answer before continuing.");
      return;
    }

    const currentQuestion =
      generatedQuestions[questionNumber - 1];

    const updatedAnswers = [
      ...answers,
      {
        question: currentQuestion,
        answer: answer.trim(),
      },
    ];

    setAnswers(updatedAnswers);

    if (questionNumber < generatedQuestions.length) {
      setQuestionNumber(questionNumber + 1);
      setAnswer("");
    } else {
      navigate("/interview-report", {
        state: {
          selectedRole,
          experience,
          interviewType,
          answers: updatedAnswers,
        },
      });
    }
  };

  const progress =
    generatedQuestions.length > 0
      ? Math.round(
          (questionNumber / generatedQuestions.length) * 100
        )
      : 0;

  if (generatedQuestions.length === 0) {
    return (
      <div className="interview-session-page">
        <div className="interview-session-card">
          <div className="ai-interviewer">
            <div className="ai-avatar">
              <Sparkles size={24} />
            </div>

            <div>
              <span>AI INTERVIEWER</span>
              <h2>No interview questions were generated.</h2>
              <p>Please go back and try again.</p>
            </div>
          </div>

          <button
            className="next-question-btn"
            onClick={() => navigate("/mock-interview")}
          >
            Go Back
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="interview-session-page">
      <div className="interview-session-header">
        <div className="session-title">
          <div className="session-icon">
            <Sparkles size={20} />
          </div>

          <div>
            <span>AI INTERVIEW SESSION</span>
            <h1>Mock Interview</h1>
          </div>
        </div>

        <div className="session-timer">
          <Clock size={18} />
          <span>00:00</span>
        </div>
      </div>

      <div className="session-details">
        <div>
          <Briefcase size={16} />
          <span>{selectedRole}</span>
        </div>

        <div>
          <CheckCircle2 size={16} />
          <span>{experience}</span>
        </div>

        <div>
          <Mic size={16} />
          <span>{interviewType}</span>
        </div>
      </div>

      <div className="session-progress">
        <div className="progress-text">
          <span>
            Question {questionNumber} of {generatedQuestions.length}
          </span>

          <strong>{progress}%</strong>
        </div>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>

      <div className="interview-session-card">
        <div className="ai-interviewer">
          <div className="ai-avatar">
            <Sparkles size={24} />
          </div>

          <div>
            <span>AI INTERVIEWER</span>

            <h2>
              {generatedQuestions[questionNumber - 1]}
            </h2>
          </div>
        </div>

        <div className="answer-section">
          <label>Your Answer</label>

          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your answer here..."
          />

          <div className="answer-actions">
            <button className="mic-button">
              <Mic size={20} />
              Speak Answer
            </button>

            <button
              className="next-question-btn"
              onClick={handleNextQuestion}
            >
              {questionNumber === generatedQuestions.length
                ? "Finish Interview"
                : "Next Question"}

              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="session-tip">
        💡 <strong>Tip:</strong> Take your time and structure your answers
        clearly. Focus on your role and selected interview type.
      </div>
    </div>
  );
};

export default InterviewSession;