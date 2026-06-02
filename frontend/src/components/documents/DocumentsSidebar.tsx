"use client";

import { useRef } from "react";

import { Document } from "@/types/document";
import { uploadPdf } from "@/services/upload-service";

interface Props {
  documents: Document[];
  selectedDocument: Document | null;
  onSelect: (doc: Document) => void;
  onUploadSuccess: () => void;
}

export default function DocumentsSidebar({
  documents,
  selectedDocument,
  onSelect,
  onUploadSuccess,
}: Props) {
  const fileInputRef =
    useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange =
    async (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      const file =
        e.target.files?.[0];

      if (!file) return;

      try {
        await uploadPdf(file);

        onUploadSuccess();
      } catch (error) {
        console.error(error);

        alert(
          "Failed to upload PDF."
        );
      }
    };

  return (
    <div className="flex h-screen flex-col border-r border-zinc-800 bg-black p-5">
      <div>
        <h1 className="text-4xl font-bold text-white">
          Financial Copilot
        </h1>

        <p className="mt-2 text-zinc-400">
          AI-powered document research
        </p>
      </div>

      <button
        onClick={handleUploadClick}
        className="
          mt-8
          rounded-xl
          bg-white
          px-4
          py-4
          font-medium
          text-black
          transition
          hover:bg-zinc-200
        "
      >
        + Upload PDF
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="mt-6 flex flex-col gap-3">
        {documents.map((doc) => {
          const isSelected =
            selectedDocument?.document_id ===
            doc.document_id;

          return (
            <button
              key={doc.document_id}
              onClick={() => onSelect(doc)}
              className={`
                rounded-xl
                border
                p-4
                text-left
                transition
                ${
                  isSelected
                    ? "bg-blue-600 border-blue-500 text-white"
                    : "border-zinc-800 bg-zinc-950 text-white hover:bg-zinc-900"
                }
              `}
            >
              {doc.filename}
            </button>
          );
        })}
      </div>
    </div>
  );
}