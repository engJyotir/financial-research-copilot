from app.rag.retriever import RetrieverService


retriever = RetrieverService.get_retriever()

docs = retriever.invoke(
    "What skills does Jyotiraditya have?"
)

print("\nRETRIEVED DOCUMENTS:\n")

for i, doc in enumerate(docs, start=1):

    print(f"\nDocument {i}")
    print("-" * 50)
    print(doc.page_content[:500])