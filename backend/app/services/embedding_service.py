from langchain_openai import OpenAIEmbeddings


class EmbeddingService:

    @staticmethod
    def get_embeddings():

        embeddings = OpenAIEmbeddings(
            model="text-embedding-3-small"
        )

        return embeddings