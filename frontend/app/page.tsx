"use client";

import { useEffect, useState } from "react";

import DocumentsSidebar from "@/components/documents/DocumentsSidebar";
import ChatPanel from "@/components/chat/ChatPanel";

import { Document } from "@/types/document";

import { getDocuments } from "@/services/document-service";

export default function Home() {
  const [documents, setDocuments] =
    useState<Document[]>([]);

  const [selectedDocument,
    setSelectedDocument] =
    useState<Document | null>(null);

  useEffect(() => {
    loadDocuments();
  }, []);

  async function loadDocuments() {
    const docs =
      await getDocuments();

    setDocuments(docs);

    if (docs.length > 0) {
      setSelectedDocument(
        docs[docs.length - 1]
      );
    }
  }

  return (
    <div className="grid grid-cols-4 h-screen">
      <DocumentsSidebar
        documents={documents}
        selectedDocument={
          selectedDocument
        }
        onSelect={
          setSelectedDocument
        }
        onUploadSuccess={
          loadDocuments
        }
      />

      <div className="col-span-3">
        <ChatPanel
          selectedDocument={
            selectedDocument
          }
        />
      </div>
    </div>
  );
}