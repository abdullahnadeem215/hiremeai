from groq import Groq
from dotenv import load_dotenv
from pathlib import Path
import os
from backend.BaseModels.structured import Resume
from pypdf import PdfReader


resume_schema = Resume.model_json_schema()
load_dotenv()

MODEL = "openai/gpt-oss-120b"
system_prompt = f"""
    You are an HR Assistant AI that is an expert in analyzing resumes. 
    You will be provided with a resume in JSON format, 
    and your task is to analyze the resume and provide a structured summary 
    of the candidate's qualifications, skills, and experience. 
    The summary should be concise and highlight the most relevant information f
    or a potential employer. Please ensure that your analysis is accurate and 
    based solely on the information provided in the resume. 
    your output must-be in this format  {resume_schema} and must be valid JSON.
    Don't give the extra information.
"""
RESUME_PATH = (
    Path(__file__).resolve().parent.parent / "Resume" / "my-resume.pdf"
)

response_format = {
    "type": "json_object"
}

def _get_client():
    api_key = os.getenv("GROQ_API_KEY")
    if not api_key:
        raise RuntimeError("GROQ_API_KEY is not configured.")
    return Groq(api_key=api_key)


def resume_analyzer(resume: Path = RESUME_PATH) -> str:
    if not resume.exists():
        raise FileNotFoundError(f"Resume file not found: {resume}")
    resume = Path(resume)
    

    if not resume.exists():
        raise FileNotFoundError(
            f"Resume file not found: {resume}"
        )

    reader = PdfReader(str(resume))

    text_parts = ""

    for page_number, page in enumerate(reader.pages, start=1):
        text = page.extract_text()

        if text:
            text_parts +=text


    user_prompt = f""""
        THis is the Abdullah Sheikh's Resume {text_parts}
    """
    client = _get_client()
    messages = [
        {
            "role": "system",
            "content": system_prompt
        },
        {
            "role": "user",
            "content": user_prompt
        }
    ]

    response = client.chat.completions.create(model=MODEL, messages=messages, response_format={'type':'json_object'},temperature=0)
    print (response.choices[0].message.content)
    return response.choices[0].message.content
