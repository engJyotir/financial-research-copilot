from app.rag.qa_chain import QAChain


response = QAChain.ask(
    "What skills does Jyotiraditya have?"
)

print("\nANSWER:\n")
print(response["answer"])

print("\nSOURCES:\n")
for source in response["sources"]:
    print(source)