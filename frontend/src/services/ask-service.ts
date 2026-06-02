import { api } from "./api";

export async function askQuestion(
  documentId: string,
  question: string
) {
  const formData = new FormData();

  formData.append("document_id", documentId);
  formData.append("question", question);

  const response = await api.post(
    "/ask",
    formData
  );

  return response.data;
}