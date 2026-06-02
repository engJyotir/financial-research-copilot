from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

from app.rag.retriever import RetrieverService
from app.services.llm_service import LLMService


class QAChain:

    @staticmethod
    def ask(question: str, document_id: str):

        retriever = RetrieverService.get_retriever(document_id)

        docs = retriever.invoke(question)

        context = "\n\n".join([doc.page_content for doc in docs])

        prompt = ChatPromptTemplate.from_messages([
            (
                "system",
                """
                You are a helpful financial research assistant.

                Answer using only the provided context.
                If the answer is not present in the context, say:
                "I could not find this information in the uploaded document."

                Keep the answer clear, concise, and structured.
                """
            ),
            (
                "human",
                """
                Context:
                {context}

                Question:
                {question}
                """
            )
        ])

        llm = LLMService.get_llm()

        chain = prompt | llm | StrOutputParser()

        answer = chain.invoke({
            "context": context,
            "question": question
        })

        return {
            "answer": answer,
            "sources": [
                {
                    "page": doc.metadata.get("page"),
                    "source": doc.metadata.get("source"),
                    "preview": doc.page_content[:300]
                }
                for doc in docs
            ]
        }