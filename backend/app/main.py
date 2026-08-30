from fastapi import FastAPI, UploadFile, File
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from app.ai_service import (
    analyze_resume,
    evaluate_answer,
    evaluate_all_answers,
    generate_questions
)

from app.pdf_service import extract_text_from_pdf


app = FastAPI()


# CORS Settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
        "https://interview-genie-delta.vercel.app",
        "https://ai-interview-coach-nine-flame.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================
# REQUEST MODELS
# ============================================================

# Request Model for AI Answer Evaluation
class AnswerRequest(BaseModel):
    question: str
    answer: str


# Request Model for Mock Interview
class InterviewRequest(BaseModel):
    role: str
    experience: str
    interview_type: str


# Request Model for Complete Interview Evaluation
class CompleteInterviewRequest(BaseModel):
    answers: list[AnswerRequest]


# ============================================================
# HOME
# ============================================================

@app.get("/")
def home():
    return {
        "message": "Interview Genie Backend Running"
    }


# ============================================================
# RESUME ANALYSIS
# ============================================================

@app.post("/upload-resume")
def upload_resume(file: UploadFile = File(...)):

    resume_text = extract_text_from_pdf(file.file)

    analysis = analyze_resume(resume_text)

    return {
        "analysis": analysis
    }


# ============================================================
# GENERATE MOCK INTERVIEW QUESTIONS
# ============================================================

@app.post("/generate-questions")
def generate_interview_questions(data: InterviewRequest):

    questions = generate_questions(
        data.role,
        data.experience,
        data.interview_type
    )

    return {
        "questions": questions
    }


# ============================================================
# EVALUATE SINGLE INTERVIEW ANSWER
# ============================================================

@app.post("/evaluate-answer")
def evaluate(data: AnswerRequest):

    result = evaluate_answer(
        data.question,
        data.answer
    )

    return {
        "evaluation": result
    }


@app.post("/evaluate-interview")
def evaluate_complete_interview(data: CompleteInterviewRequest):

    answers = [
        {
            "question": item.question,
            "answer": item.answer
        }
        for item in data.answers
    ]

    result = evaluate_all_answers(answers)

    return {
        "evaluations": result
    }