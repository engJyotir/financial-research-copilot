from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

from app.rag.retriever import RetrieverService
from app.services.llm_service import LLMService


class SummaryChain:

    @staticmethod
    def generate_summary(
        document_id: str
    ):

        retriever = (
            RetrieverService
            .get_retriever(document_id)
        )

        docs = retriever.invoke(
            "Provide a complete overview of this document"
        )

        context = "\n\n".join([
            doc.page_content
            for doc in docs
        ])

        prompt = (
            ChatPromptTemplate
            .from_messages([
                (
                    "system",
                    """
                    You are a senior financial analyst.

                    Analyze the provided document and create:

                    1. Executive Summary
                    2. Key Financial Highlights
                    3. Risk Factors
                    4. Growth Opportunities
                    5. Management Outlook
                    6. Investment Takeaways

                    Use bullet points.
                    Be concise and professional.
                    """
                ),
                (
                    "human",
                    """
                    Context:

                    {context}
                    """
                )
            ])
        )

        llm = (
            LLMService
            .get_llm()
        )

        chain = (
            prompt
            | llm
            | StrOutputParser()
        )

        summary = chain.invoke({
            "context": context
        })

        return {
            "summary": summary
        }