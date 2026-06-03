from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

from app.rag.retriever import RetrieverService
from app.services.llm_service import LLMService


class InvestmentMemoChain:

    @staticmethod
    def generate(document_id: str):

        retriever = RetrieverService.get_retriever(
            document_id
        )

        docs = retriever.invoke(
            "company business model revenue growth profitability risks strategy"
        )

        context = "\n\n".join(
            [
                doc.page_content
                for doc in docs
            ]
        )

        prompt = ChatPromptTemplate.from_messages(
            [
                (
                    "system",
                    """
You are a senior equity research analyst.

Generate a professional investment memo.

Return the response ONLY in markdown.

Use the following structure:

# Investment Memo

## Company Overview

## Business Model

## Growth Drivers

## Financial Highlights

## Key Risks

## Investment Thesis

## Recommendation

For recommendation choose only:

BUY
HOLD
SELL

Use only information available in the provided context.
Do not invent facts.
                    """
                ),
                (
                    "human",
                    """
Context:

{context}
                    """
                )
            ]
        )

        llm = LLMService.get_llm()

        chain = (
            prompt
            | llm
            | StrOutputParser()
        )

        memo = chain.invoke(
            {
                "context": context
            }
        )

        return {
            "memo": memo
        }