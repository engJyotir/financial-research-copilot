import { api } from "./api";
import { Document } from "@/types/document";

export const getDocuments = async (): Promise<Document[]> => {
  const response = await api.get("/documents");
  return response.data;
};