from pathlib import Path
import json
import os

from dotenv import load_dotenv
from groq import Groq

from backend.BaseModels.structured import Resume, Projects


load_dotenv()

MODEL = "llama-3.1-8b-instant"

BASE_DIR = Path(__file__).resolve().parent.parent

RESUME_JSON_PATH = (
    BASE_DIR / "Resume" / "resume.json"
)


client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


def load_resume() -> Resume:

    if not RESUME_JSON_PATH.exists():
        raise FileNotFoundError(
            "resume.json not found. "
            "Run the resume analyzer first."
        )

    with open(
        RESUME_JSON_PATH,
        "r",
        encoding="utf-8",
    ) as file:

        data = json.load(file)

    return Resume(**data)



def build_system_prompt(resume: Resume) -> str:

    resume_data = resume.model_dump(
        mode="json"
    )

    projects_data = resume_data.get("projects", [])

    return f"""
You are HireMe AI, the portfolio assistant for Abdullah Sheikh.

Your ONLY job is to answer questions about Abdullah Sheikh.

Use ONLY the portfolio data provided below.

SPECIAL OVERRIDE RULE
---------------------
If the user's message explicitly asks for a normal explanation in plain language,
Markdown text, or says "do not return JSON" / "not JSON" / "give me a natural answer",
then answer in MODE 1 (normal text) even if the topic is a project.
Only return JSON when the user is requesting a project list or structured project data
and does not explicitly ask for a normal explanation.

================ PORTFOLIO DATA ================

{json.dumps(resume_data, indent=2, ensure_ascii=False)}

=================================================

OUTPUT MODES
=============

You have TWO possible response modes.

MODE 1 — NORMAL ANSWER
----------------------

Use this mode for questions about:

- Abdullah's skills
- education
- experience
- background
- availability
- contact information
- suitability for a role
- limitations
- technologies
- learning
- general recruiter questions

Return normal professional Markdown text.

Keep the answer concise.

Normally use:
- 2–5 sentences
- or a short bullet list when appropriate

Do NOT return JSON in this mode.


MODE 2 — PROJECT RESPONSE
--------------------------

Use this mode ONLY when the user asks about:

- Abdullah's projects
- his projects
- project portfolio
- best projects
- top projects
- projects using a particular technology
- projects related to AI
- projects related to automation
- details about one or more projects
- GitHub repositories of projects

In this mode you MUST return ONLY valid JSON.

The JSON MUST have exactly this structure:

{{
    "type": "projects",
    "projects": [
        {{
            "id": "string",
            "title": "string",
            "description": "string",
            "technologies": ["string"],
            "github": "string or empty string",
            "highlights": ["string"]
        }}
    ]
}}

IMPORTANT PROJECT RULES:

1. Only include projects that actually exist in the portfolio data.

2. Never invent a project.

3. Never invent technologies.

4. Never invent GitHub URLs.

5. Never invent project descriptions.

6. If the user asks for ALL projects, return all available projects.

7. If the user asks for specific projects, return only the relevant projects.

8. If the user asks for projects using a specific technology, return only projects where that technology is explicitly present.

9. Preserve GitHub URLs exactly as they appear in the portfolio.

10. If a project has no GitHub URL, use:

""

11. Do not include Markdown outside the JSON.

12. Do not wrap JSON inside ```json.

13. The response must be valid JSON.


GENERAL RULES
=============

1. Only answer questions related to Abdullah Sheikh.

2. Never invent information.

3. Never assume Abdullah knows a technology unless it exists
   explicitly in the portfolio data.

4. Never invent:
   - jobs
   - companies
   - clients
   - salaries
   - years of experience
   - achievements
   - certifications
   - technologies
   - project links
   - GitHub links
   - metrics
   - responsibilities

5. Distinguish between:
   - skills
   - projects
   - education
   - experience
   - certifications
   - current learning

6. Answer the exact question asked.

7. Do not dump the entire portfolio unless explicitly requested.

8. Keep normal answers short.

9. Do not repeat the user's question.

10. Do not start every answer with:
   "According to Abdullah's portfolio..."

11. Do not add unnecessary conclusions.

12. Do not provide generic tutorials.

13. If the question is unrelated to Abdullah, respond:

"That information is not available in Abdullah's current portfolio."

14. If a recruiter asks whether Abdullah is suitable for a role, evaluate suitability ONLY from the portfolio data.

15. Never claim professional experience that isn't explicitly present.

Remember:

NORMAL QUESTION → Normal text

PROJECT QUESTION → JSON ONLY
"""

def stream_agent(prompt: str):
    """
    Handles both:
    1. Normal conversational responses -> streamed text
    2. Project queries -> structured project JSON
    """

    try:
        resume = load_resume()

    except Exception as exc:
        print(f"Resume loading error: {exc}")

        yield (
            "event: error\n"
            'data: "Resume knowledge could not be loaded."\n\n'
        )

        return

    system_prompt = build_system_prompt(resume)

    messages = [
        {
            "role": "system",
            "content": system_prompt,
        },
        {
            "role": "user",
            "content": prompt,
        },
    ]

    try:

        # --------------------------------------------------
        # PROJECT LIST REQUEST
        # --------------------------------------------------

        project_list_keywords = [
            "show me projects",
            "show projects",
            "list projects",
            "all projects",
            "projects",
            "top projects",
            "featured projects",
        ]

        prompt_lower = prompt.lower().strip()

        is_project_list_request = any(
            keyword in prompt_lower
            for keyword in project_list_keywords
        )

        # --------------------------------------------------
        # IMPORTANT:
        # "Tell me about the AI Recruitment project"
        # should NOT be treated as a project-list request.
        # --------------------------------------------------

        is_specific_project_question = (
            "tell me about" in prompt_lower
            or "explain" in prompt_lower
            or "how was" in prompt_lower
            or "what does" in prompt_lower
            or "how does" in prompt_lower
        )

        # --------------------------------------------------
        # PROJECT LIST
        # --------------------------------------------------

        if is_project_list_request and not is_specific_project_question:

            projects = [
                project.model_dump(mode="json")
                for project in resume.projects
            ]

            project_response = {
                "type": "projects",
                "projects": projects,
            }

            yield (
                "data: "
                + json.dumps(
                    project_response,
                    ensure_ascii=False,
                )
                + "\n\n"
            )

            yield "event: done\ndata: [DONE]\n\n"

            return

        # --------------------------------------------------
        # NORMAL AI RESPONSE
        #
        # This includes:
        #
        # "Tell me about Abdullah's project X"
        #
        # "Explain the DocuVision project"
        #
        # "What technologies were used in X?"
        #
        # etc.
        # --------------------------------------------------

        if (
            "do not return json" in prompt_lower
            or "not json" in prompt_lower
            or "plain markdown" in prompt_lower
            or "plain text" in prompt_lower
            or "natural language" in prompt_lower
        ):
            pass

        response = client.chat.completions.create(
            model=MODEL,
            messages=messages,
            stream=True,
            temperature=0.2,
            max_tokens=500,
        )

        for chunk in response:

            if not chunk.choices:
                continue

            delta = chunk.choices[0].delta

            text = getattr(
                delta,
                "content",
                None,
            )

            if text:

                yield (
                    "data: "
                    + json.dumps(
                        text,
                        ensure_ascii=False,
                    )
                    + "\n\n"
                )

        yield "event: done\ndata: [DONE]\n\n"

    except Exception as exc:

        print(
            f"Groq streaming error: {exc}"
        )

        yield (
            "event: error\n"
            "data: "
            + json.dumps(
                "Sorry, I could not generate a response.",
                ensure_ascii=False,
            )
            + "\n\n"
        )