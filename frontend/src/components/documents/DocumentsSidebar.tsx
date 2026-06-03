"use client";

import { useRef, useState } from "react";
import {
  FileText,
  Upload,
  CheckCircle2,
  Loader2,
} from "lucide-react";

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

  const [uploading, setUploading] =
    useState(false);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setUploading(true);

      await uploadPdf(file);

      onUploadSuccess();

      e.target.value = "";
    } catch (error) {
      console.error(error);
      alert("Failed to upload PDF.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <aside className="flex h-screen w-[300px] flex-col border-r border-zinc-800 bg-[#0b0b0d]">
      <div className="border-b border-zinc-800 px-6 py-6">
        <p className="text-xs uppercase tracking-[0.28em] text-zinc-500">
          Research OS
        </p>

        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-white">
          Financial Copilot
        </h1>

        <p className="mt-2 text-sm leading-6 text-zinc-500">
          AI research workspace for filings, reports and investment memos.
        </p>
      </div>

      <div className="px-6 py-5">
        <button
          onClick={handleUploadClick}
          disabled={uploading}
          className="
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-zinc-700
            bg-zinc-900
            px-4
            py-3
            text-sm
            font-medium
            text-zinc-100
            transition
            hover:bg-zinc-800
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          {uploading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Uploading
            </>
          ) : (
            <>
              <Upload className="h-4 w-4" />
              Upload PDF
            </>
          )}
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-6">
        <div className="mb-3 px-2">
          <p className="text-xs uppercase tracking-[0.22em] text-zinc-600">
            Documents
          </p>
        </div>

        <div className="space-y-2">
          {documents.map((doc) => {
            const isSelected =
              selectedDocument?.document_id ===
              doc.document_id;

            return (
              <button
                key={doc.document_id}
                onClick={() => onSelect(doc)}
                className={`
                  group
                  w-full
                  rounded-xl
                  border
                  p-4
                  text-left
                  transition
                  ${
                    isSelected
                      ? "border-zinc-600 bg-zinc-800/80"
                      : "border-transparent bg-transparent hover:border-zinc-800 hover:bg-zinc-900"
                  }
                `}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`
                      mt-0.5
                      rounded-lg
                      border
                      p-2
                      ${
                        isSelected
                          ? "border-zinc-600 bg-zinc-900"
                          : "border-zinc-800 bg-zinc-950"
                      }
                    `}
                  >
                    <FileText className="h-4 w-4 text-zinc-400" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p
                      className={`
                        line-clamp-2
                        text-sm
                        font-medium
                        leading-5
                        ${
                          isSelected
                            ? "text-white"
                            : "text-zinc-300"
                        }
                      `}
                    >
                      {doc.filename}
                    </p>

                    <div className="mt-2 flex items-center gap-2 text-xs text-zinc-600">
                      {isSelected && (
                        <>
                          <CheckCircle2 className="h-3.5 w-3.5 text-zinc-400" />
                          <span>Active document</span>
                        </>
                      )}

                      {!isSelected && (
                        <span>Ready for analysis</span>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}

          {documents.length === 0 && (
            <div className="rounded-xl border border-dashed border-zinc-800 p-5 text-center">
              <p className="text-sm text-zinc-500">
                No documents uploaded yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}