from app.services.vector_store_service import VectorStoreService


class RetrieverService:

    @staticmethod
    def get_retriever(document_id: str):
        vector_store = VectorStoreService.load_vector_store(document_id)

        return vector_store.as_retriever(
            search_kwargs={"k": 3}
        )