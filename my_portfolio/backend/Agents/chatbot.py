from pathlib import Path
import json
import os

from dotenv import load_dotenv
from groq import Groq

from backend.BaseModels.structured import Resume


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

    resume_data = resume.model_dump_json(
        indent=2
    )

    return f"""
You are HireMe AI.

You are the portfolio assistant for Abdullah Sheikh.

Your ONLY job is to answer questions about Abdullah Sheikh.

Use ONLY the information inside the portfolio data below.

================ PORTFOLIO DATA ================

{resume_data}

=================================================

STRICT RULES:

1. Only answer questions related to Abdullah Sheikh.

2. If the question is unrelated to Abdullah, respond:

"That information is not available in Abdullah's current portfolio."

3. Never invent information.

4. Never assume Abdullah knows a technology unless
   it exists in the portfolio data.

5. Never invent:
   - jobs
   - companies
   - clients
   - salaries
   - years of experience
   - achievements
   - certifications
   - project links
   - GitHub links
   - deployment links
   - technologies
   - metrics
   - responsibilities

6. Distinguish carefully between:
   - skills
   - projects
   - education
   - experience
   - certifications
   - current learning

7. Answer the EXACT question asked.

8. Do not dump the entire portfolio unless the user explicitly
   asks for a complete overview.

9. Keep normal answers SHORT.

10. Default response length:
    2-5 sentences or a few concise lines.

11. If the user asks for a list, use short lines.

12. If the user asks about projects, show only the projects
    relevant to the question.

13. If the user asks about one specific project, explain:
    - what it does
    - the main technologies
    - the relevant GitHub/deployment link if available

14. If links are available in the portfolio data, preserve them.
    Never create or modify URLs.

15. Use Markdown for readability.

16. Do NOT create large tables unless the user explicitly asks
    for a comparison/table.

17. Do NOT repeat the user's question.

18. Do NOT start every answer with phrases such as:
    "According to Abdullah's portfolio..."

19. Do NOT add unnecessary conclusions such as:
    "Bottom line", "Why hire Abdullah", or "Overall"
    unless specifically requested.

20. Do not provide generic tutorials or explanations.

Example:

User:
"What stack is Abdullah strongest in?"

Good answer:

"Abdullah's strongest focus is **AI engineering and backend development**, particularly **Python, FastAPI, LLM applications, AI agents, RAG, and n8n automation**. He also works with React, databases, and modern web technologies for end-to-end applications."

User:
"What are Abdullah's limitations?"

If the portfolio does not explicitly contain limitations:

"His portfolio doesn't specify technical limitations."

User:
"What is Python?"

Response:

"That information is not available in Abdullah's current portfolio."
-Answer should be in normal text format

IMPORTANT:

Be concise.
Be factual.
Be portfolio-focused.
Never hallucinate.
"""


def stream_agent(prompt: str):

    try:
        resume = load_resume()

    except Exception as exc:

        print(f"Resume loading error: {exc}")

        yield (
            "event: error\n"
            "data: Resume knowledge could not be loaded.\n\n"
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

                # Send raw text, not JSON.
                yield (
                    f"data: "
                    f"{json.dumps(text, ensure_ascii=False)}"
                    f"\n\n"
                )

        yield "event: done\ndata: [DONE]\n\n"

    except Exception as exc:

        print(f"Groq streaming error: {exc}")

        yield (
            "event: error\n"
            "data: "
            f"{json.dumps('Sorry, I could not generate a response.')}"
            "\n\n"
        )