import { api } from "./api";

export async function getFinancialAnalysis(
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
      "/financial-analysis",
      formData
    );

  return response.data;
}