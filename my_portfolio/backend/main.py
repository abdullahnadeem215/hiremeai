from contextlib import asynccontextmanager

from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse

from backend.Agents.chatbot import stream_agent
from backend.Agents.resumeanalyzer import resume_analyzer


@asynccontextmanager
async def lifespan(app: FastAPI):

    print("🚀 Starting HireMe AI...")

    try:
        # Run ONCE when the application starts
        resume_analyzer()

        print("✅ Resume knowledge updated.")

    except Exception as exc:

        print(
            f"❌ Resume analyzer failed: {exc}"
        )

    yield

    print("🛑 HireMe AI shutting down...")


app = FastAPI(
    title="HireMe AI",
    description="AI Portfolio Assistant for Abdullah Sheikh",
    version="1.0.0",
    lifespan=lifespan,
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():

    return {
        "message": "HireMe AI API is running."
    }


@app.get("/chat/stream")
def chat_stream(
    message: str = Query(
        ...,
        min_length=1,
        max_length=1000,
    )
):

    return StreamingResponse(
        stream_agent(message),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",
        },
    )