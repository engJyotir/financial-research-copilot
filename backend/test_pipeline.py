from app.rag.document_loader import DocumentLoader
from app.rag.text_splitter import TextSplitter
from app.services.vector_store_service import VectorStoreService


pdf_path = "data/uploads/Jyotiraditya__RESUME.pdf"

documents = DocumentLoader.load_pdf(pdf_path)

print(f"Documents Loaded: {len(documents)}")

chunks = TextSplitter.split_documents(documents)

print(f"Chunks Created: {len(chunks)}")

vector_store = VectorStoreService.create_vector_store(chunks)

print("FAISS Index Created Successfully")