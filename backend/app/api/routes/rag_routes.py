import os
import uuid

from fastapi import APIRouter, UploadFile, File, Form

from app.rag.document_loader import DocumentLoader
from app.rag.text_splitter import TextSplitter
from app.rag.qa_chain import QAChain
from app.rag.summary_chain import SummaryChain
from app.rag.investment_memo_chain import InvestmentMemoChain
from app.rag.retriever import RetrieverService

from app.services.vector_store_service import VectorStoreService
from app.services.document_registry import DocumentRegistry
from app.services.chat_service import ChatService
from app.services.financial_intelligence_service import (
    FinancialIntelligenceService
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
        "message": "PDF uploaded and indexed successfully",
        "document_id": document_id,
        "filename": file.filename,
        "chunks": len(chunks)
    }


@router.post("/ask")
async def ask_question(
    document_id: str = Form(...),
    question: str = Form(...)
):

    ChatService.save_message(
        document_id=document_id,
        role="user",
        content=question
    )

    response = QAChain.ask(
        question=question,
        document_id=document_id
    )

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


@router.get("/chat-history/{document_id}")
async def get_chat_history(
    document_id: str
):

    return (
        ChatService.get_messages(
            document_id
        )
    )


@router.post("/generate-summary")
async def generate_summary(
    document_id: str = Form(...)
):

    return (
        SummaryChain.generate_summary(
            document_id
        )
    )


@router.post("/financial-analysis")
async def financial_analysis(
    document_id: str = Form(...)
):

    retriever = (
        RetrieverService.get_retriever(
            document_id
        )
    )

    docs = retriever.invoke(
        "Provide complete financial information"
    )

    context = "\n\n".join(
        [
            doc.page_content
            for doc in docs
        ]
    )

    analysis = (
        FinancialIntelligenceService
        .analyze(context)
    )

    return {
        "analysis": analysis
    }


@router.post("/generate-investment-memo")
async def generate_investment_memo(
    document_id: str = Form(...)
):

    return (
        InvestmentMemoChain.generate(
            document_id=document_id
        )
    )