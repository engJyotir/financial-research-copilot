import { api } from "./api";

export async function generateSummary(
  documentId: string
) {
  const formData =
    new FormData();

  formData.append(
    "document_id",
    documentId
  );

  const response =
    await api.post(
      "/generate-summary",
      formData
    );

  console.log(
    "RAW SUMMARY API:",
    response.data
  );

  return response.data;
}