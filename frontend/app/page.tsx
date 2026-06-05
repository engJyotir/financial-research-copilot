"use client";

import { useEffect, useState } from "react";

import DocumentsSidebar from "@/components/documents/DocumentsSidebar";
import ChatPanel from "@/components/chat/ChatPanel";

import { Document } from "@/types/document";

import { getDocuments } from "@/services/document-service";
console.log("NEXT_PUBLIC_API_URL =", process.env.NEXT_PUBLIC_API_URL);
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
    <main className="h-screen overflow-hidden bg-[#09090b]">

      <div className="flex h-full">

        {/* Sidebar */}

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

        {/* Main Workspace */}

        <div className="flex-1 overflow-hidden">

          <ChatPanel
            selectedDocument={
              selectedDocument
            }
          />

        </div>

      </div>

    </main>
  );
}