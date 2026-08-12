from fastapi import FastAPI, Query
from fastapi.responses import StreamingResponse
from backend.Agents.chatbot import  stream_agent

app = FastAPI()

# Allow local frontend development to connect via EventSource/fetch
from fastapi.middleware.cors import CORSMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {
            "message": "Welcome to the Resume Analyzer API!"
        }




@app.get("/chat/stream")
def chat_stream(
    message: str = Query(...)
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