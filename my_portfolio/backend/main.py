from contextlib import asynccontextmanager

from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse

from backend.Agents.chatbot import stream_agent
from backend.Agents.resumeanalyzer import resume_analyzer


# ============================================================
# APPLICATION LIFESPAN
# ============================================================

@asynccontextmanager
async def lifespan(app: FastAPI):

    print("🚀 Starting HireMe AI...")

    try:
        # Analyze the resume when the backend starts.
        # This updates backend/Resume/resume.json
        resume_analyzer()

        print("✅ Resume knowledge updated.")

    except Exception as exc:
        # Do not prevent FastAPI from starting if resume
        # analysis fails.
        print(f"❌ Resume analyzer failed: {exc}")

    yield

    print("🛑 HireMe AI shutting down...")


# ============================================================
# FASTAPI APP
# ============================================================

app = FastAPI(
    title="HireMe AI",
    description="AI Portfolio Assistant for Abdullah Sheikh",
    version="1.0.0",
    lifespan=lifespan,
)


# ============================================================
# CORS
# ============================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",

        # Vercel frontend
        "https://hire-abdullah-three.vercel.app",
    ],
    allow_credentials=False,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)


# ============================================================
# HEALTH CHECK
# ============================================================

@app.get("/")
async def read_root():

    return {
        "status": "online",
        "service": "HireMe AI",
        "version": "1.0.0",
    }


# ============================================================
# CHAT STREAM
# ============================================================

@app.get("/chat/stream")
def chat_stream(
    message: str = Query(
        ...,
        min_length=1,
        max_length=2000,
        description="Message sent to HireMe AI",
    )
):

    return StreamingResponse(
        stream_agent(message),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache, no-transform",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",
        },
    )