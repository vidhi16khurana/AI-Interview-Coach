import { useState } from "react";
import {
  BookOpen,
  ChevronDown,
  MessageSquare,
  Code2,
  Users,
  Lightbulb,
} from "lucide-react";

import "./ExtraPages.css";

const resources = [
  {
    id: 1,
    title: "Technical Interview Preparation",
    description:
      "Prepare for programming, frontend, backend, database and software engineering interviews.",
    icon: <Code2 size={25} />,
    topics: [
      "Data Structures and Algorithms",
      "React and JavaScript",
      "Python Fundamentals",
      "DBMS and SQL",
      "Operating Systems",
      "Computer Networks",
    ],
  },
  {
    id: 2,
    title: "HR Interview Preparation",
    description:
      "Prepare confident and structured answers for commonly asked HR questions.",
    icon: <Users size={25} />,
    topics: [
      "Tell me about yourself",
      "Why should we hire you?",
      "Strengths and weaknesses",
      "Why do you want this job?",
      "Where do you see yourself in 5 years?",
      "Handling difficult situations",
    ],
  },
  {
    id: 3,
    title: "Behavioral Interview Questions",
    description:
      "Use the STAR method to structure your answers with real examples.",
    icon: <MessageSquare size={25} />,
    topics: [
      "Situation",
      "Task",
      "Action",
      "Result",
      "Leadership examples",
      "Teamwork examples",
    ],
  },
];

const Resources = () => {
  const [openId, setOpenId] = useState(null);

  return (
    <div className="extra-page">
      <div className="page-header">
        <span className="page-tag">
          <BookOpen size={16} />
          LEARNING CENTER
        </span>

        <h1>Interview Resources</h1>

        <p>
          Explore important topics and prepare for your next interview.
        </p>
      </div>

      <div className="tips-banner">
        <div className="tip-icon">
          <Lightbulb size={28} />
        </div>

        <div>
          <h3>Quick Tip</h3>

          <p>
            Don't memorize answers word by word. Understand the concept
            and explain it naturally with relevant examples.
          </p>
        </div>
      </div>

      <div className="resources-list">
        {resources.map((resource) => (
          <div className="resource-card" key={resource.id}>
            <div className="resource-main">
              <div className="resource-icon">
                {resource.icon}
              </div>

              <div className="resource-content">
                <h2>{resource.title}</h2>

                <p>{resource.description}</p>
              </div>

              <button
                className="expand-btn"
                onClick={() =>
                  setOpenId(
                    openId === resource.id ? null : resource.id
                  )
                }
              >
                <ChevronDown
                  size={22}
                  className={
                    openId === resource.id ? "rotate-icon" : ""
                  }
                />
              </button>
            </div>

            {openId === resource.id && (
              <div className="resource-topics">
                <h4>Important Topics</h4>

                <div className="topic-grid">
                  {resource.topics.map((topic) => (
                    <div className="topic-chip" key={topic}>
                      {topic}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Resources;