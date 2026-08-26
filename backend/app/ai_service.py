import os
import json

import google.generativeai as genai
from dotenv import load_dotenv
from google.api_core.exceptions import ResourceExhausted


# Load environment variables
load_dotenv()


# Configure Gemini API
genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)


# Create Gemini model
model = genai.GenerativeModel("gemini-2.5-flash-lite")


# ============================================================
# RESUME ANALYSIS
# ============================================================

def analyze_resume(resume_text):

    prompt = f"""
You are an expert technical interviewer.

Analyze the following resume and provide:

1. Technical Skills
2. Strengths
3. Weaknesses
4. Skill Gaps
5. 5 Technical Interview Questions
6. 5 HR Interview Questions

Resume:
{resume_text}
"""

    response = model.generate_content(prompt)

    return response.text


# ============================================================
# GENERATE MOCK INTERVIEW QUESTIONS
# ============================================================

def generate_questions(role, experience, interview_type):

    try:

        prompt = f"""
You are an expert AI interviewer.

Generate exactly 8 interview questions based on the following details:

Target Role: {role}
Experience Level: {experience}
Interview Type: {interview_type}

Instructions:
- Generate questions relevant to the selected role.
- Match the difficulty according to the experience level.
- If interview type is Technical, generate technical questions.
- If interview type is Behavioral, generate behavioral questions.
- If interview type is Mixed, generate a combination of technical and behavioral questions.
- Generate exactly 8 questions.
- Return only the questions.
- Write one question on each line.
- Do not include numbering.
"""

        response = model.generate_content(prompt)

        if not response.text:
            raise Exception("Gemini returned an empty response")

        questions = response.text.strip().split("\n")

        questions = [
            question.strip()
            for question in questions
            if question.strip()
        ]

        cleaned_questions = []

        for question in questions:
            question = question.lstrip("0123456789.-) ")

            if question:
                cleaned_questions.append(question)

        return cleaned_questions[:8]

    except ResourceExhausted:

        print("Gemini API quota exceeded")

        raise Exception(
            "AI quota exceeded. Please wait a few minutes and try again."
        )

    except Exception as error:

        print("\n========== QUESTION GENERATION ERROR ==========")
        print(error)
        print("===============================================\n")

        raise error

# ============================================================
# EVALUATE SINGLE INTERVIEW ANSWER
# ============================================================

def evaluate_answer(question, answer):

    prompt = f"""
You are an expert technical interviewer.

Evaluate the candidate's answer to the following interview question.

Question:
{question}

Candidate Answer:
{answer}

Give a concise and professional evaluation.

Provide exactly:

Score: X/10

Strengths:
- Mention the positive points.

Weaknesses:
- Mention areas that need improvement.

Suggested Improvement:
- Explain how the candidate can improve the answer.

Keep the response clear, professional, and concise.
"""

    try:

        response = model.generate_content(prompt)

        return response.text.strip()

    except Exception as error:

        print("Single answer evaluation error:", error)

        return "Unable to generate evaluation. Please try again."


# ============================================================
# EVALUATE COMPLETE INTERVIEW
# ============================================================

def evaluate_all_answers(answers):

    evaluations = []

    # Evaluate each question separately
    for index, item in enumerate(answers, start=1):

        prompt = f"""
You are an expert technical interviewer.

Evaluate the following interview answer.

Question Number: {index}

Question:
{item["question"]}

Candidate Answer:
{item["answer"]}

Provide the evaluation in exactly this format:

Score: X/10

Strengths:
- Write 1 or 2 strengths.

Weaknesses:
- Write 1 or 2 weaknesses.

Suggested Improvement:
- Give a practical suggestion.

Rules:
- Evaluate only this question and answer.
- Be concise and professional.
- Do not return JSON.
- Do not skip the score.
- Do not use markdown code blocks.
"""

        try:

            response = model.generate_content(prompt)

            evaluation = response.text.strip()

            if evaluation:
                evaluations.append(evaluation)

            else:
                evaluations.append(
                    "Evaluation could not be generated for this answer."
                )

        except Exception as error:

            print(
                f"Evaluation error for Question {index}:",
                error
            )

            evaluations.append(
                "Unable to generate evaluation. Please try again."
            )

    return evaluations