from pathlib import Path
import json
import os

from dotenv import load_dotenv
from groq import Groq
from pypdf import PdfReader

from backend.BaseModels.structured import Resume


load_dotenv()

MODEL = "llama-3.1-8b-instant"

BASE_DIR = Path(__file__).resolve().parent.parent

RESUME_PATH = BASE_DIR / "Resume" / "my-resume.pdf"
RESUME_JSON_PATH = BASE_DIR / "Resume" / "resume.json"


RESUME_SCHEMA = Resume.model_json_schema()


SYSTEM_PROMPT = f"""
You are a resume extraction engine.

Your task is to extract structured information from Abdullah Sheikh's resume.

IMPORTANT RULES:

1. Use ONLY information explicitly present in the resume.
2. Never invent information.
3. Never infer missing information.
4. Do not add commentary.
5. Do not summarize outside the requested JSON structure.
6. If a field is not available, use null or an empty list where appropriate.
7. Preserve project names, technologies, education, experience and links accurately.
8. Return ONLY valid JSON.
9. The JSON must follow this schema:

{json.dumps(RESUME_SCHEMA, indent=2)}
"""


def _get_client() -> Groq:
    api_key = os.getenv("GROQ_API_KEY")

    if not api_key:
        raise RuntimeError(
            "GROQ_API_KEY is not configured."
        )

    return Groq(api_key=api_key)


def extract_resume_text(pdf_path: Path) -> str:
    reader = PdfReader(str(pdf_path))

    pages = []

    for page in reader.pages:
        text = page.extract_text()

        if text:
            pages.append(text.strip())

    resume_text = "\n\n".join(pages)

    if not resume_text.strip():
        raise ValueError(
            "No text could be extracted from the resume PDF."
        )

    return resume_text


def resume_analyzer(
    resume_path: Path = RESUME_PATH,
) -> str:

    resume_path = Path(resume_path)

    if not resume_path.exists():
        raise FileNotFoundError(
            f"Resume file not found: {resume_path}"
        )

    print("📄 Extracting resume text...")

    resume_text = extract_resume_text(resume_path)

    print("🤖 Analyzing resume with Groq...")

    client = _get_client()

    response = client.chat.completions.create(
        model=MODEL,
        messages=[
            {
                "role": "system",
                "content": SYSTEM_PROMPT,
            },
            {
                "role": "user",
                "content": (
                    "Extract structured information from "
                    "the following resume:\n\n"
                    f"{resume_text}"
                ),
            },
        ],
        response_format={
            "type": "json_object"
        },
        temperature=0,
    )

    result = response.choices[0].message.content

    if not result:
        raise RuntimeError(
            "Resume analyzer returned an empty response."
        )

    # Validate LLM output before saving it
    parsed = json.loads(result)

    Resume(**parsed)

    RESUME_JSON_PATH.parent.mkdir(
        parents=True,
        exist_ok=True,
    )

    with open(
        RESUME_JSON_PATH,
        "w",
        encoding="utf-8",
    ) as file:
        json.dump(
            parsed,
            file,
            indent=2,
            ensure_ascii=False,
        )

    print(
        f"✅ Resume knowledge saved to: {RESUME_JSON_PATH}"
    )

    return json.dumps(
        parsed,
        ensure_ascii=False,
    )