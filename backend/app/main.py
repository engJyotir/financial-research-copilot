from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.rag.retriever import RetrieverService
from app.api.routes.rag_routes import router as rag_router


app = FastAPI(
    title="Financial Research Copilot API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(rag_router, prefix="/api")


@app.get("/")
def root():
    return {
        "message": "Financial Research Copilot API is running"
    }