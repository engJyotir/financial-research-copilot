import { api } from "./api";

export async function generateInvestmentMemo(
  documentId: string
) {
  const formData = new FormData();

  formData.append(
    "document_id",
    documentId
  );

  const response =
    await api.post(
      "/generate-investment-memo",
      formData
    );

  return response.data;
}