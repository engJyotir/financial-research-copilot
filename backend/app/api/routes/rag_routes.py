import os
import uuid

from fastapi import APIRouter
from fastapi import UploadFile
from fastapi import File
from fastapi import Form

from app.rag.document_loader import DocumentLoader
from app.rag.text_splitter import TextSplitter
from app.services.vector_store_service import VectorStoreService
from app.rag.qa_chain import QAChain

from app.services.document_registry import (
    DocumentRegistry
)

from app.services.chat_service import (
    ChatService
)

router = APIRouter()


@router.post("/upload-pdf")
async def upload_pdf(
    file: UploadFile = File(...)
):

    document_id = str(uuid.uuid4())

    upload_dir = "data/uploads"

    os.makedirs(
        upload_dir,
        exist_ok=True
    )

    file_path = (
        f"{upload_dir}/"
        f"{document_id}_{file.filename}"
    )

    with open(file_path, "wb") as f:
        f.write(
            await file.read()
        )

    documents = (
        DocumentLoader
        .load_pdf(file_path)
    )

    chunks = (
        TextSplitter
        .split_documents(documents)
    )

    VectorStoreService.create_vector_store(
        chunks=chunks,
        document_id=document_id
    )

    DocumentRegistry.add_document(
        document_id=document_id,
        filename=file.filename
    )

    return {
        "message":
            "PDF uploaded and indexed successfully",
        "document_id":
            document_id,
        "filename":
            file.filename,
        "chunks":
            len(chunks)
    }


@router.post("/ask")
async def ask_question(
    document_id: str = Form(...),
    question: str = Form(...)
):

    # Save User Message
    ChatService.save_message(
        document_id=document_id,
        role="user",
        content=question
    )

    # Get LLM Response
    response = QAChain.ask(
        question=question,
        document_id=document_id
    )

    # Save Assistant Message
    ChatService.save_message(
        document_id=document_id,
        role="assistant",
        content=response["answer"]
    )

    return response


@router.get("/documents")
async def get_documents():

    return (
        DocumentRegistry
        .get_documents()
    )


@router.get(
    "/chat-history/{document_id}"
)
async def get_chat_history(
    document_id: str
):

    return (
        ChatService
        .get_messages(
            document_id
        )
    )