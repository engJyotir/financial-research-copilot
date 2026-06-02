import os
from langchain_community.vectorstores import FAISS
from app.services.embedding_service import EmbeddingService


class VectorStoreService:

    @staticmethod
    def create_vector_store(chunks, document_id: str):
        embeddings = EmbeddingService.get_embeddings()

        vector_store = FAISS.from_documents(
            chunks,
            embeddings
        )

        index_path = f"data/vector_indexes/{document_id}"
        os.makedirs(index_path, exist_ok=True)

        vector_store.save_local(index_path)

        return vector_store

    @staticmethod
    def load_vector_store(document_id: str):
        embeddings = EmbeddingService.get_embeddings()

        index_path = f"data/vector_indexes/{document_id}"

        return FAISS.load_local(
            index_path,
            embeddings,
            allow_dangerous_deserialization=True
        )