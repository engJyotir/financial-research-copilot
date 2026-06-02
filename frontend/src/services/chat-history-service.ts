import { api } from "./api";

export const getChatHistory =
  async (
    documentId: string
  ) => {

    const response =
      await api.get(
        `/chat-history/${documentId}`
      );

    return response.data;
  };