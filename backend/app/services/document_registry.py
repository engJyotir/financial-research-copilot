from app.services.supabase_service import (
    SupabaseService
)


class DocumentRegistry:

    @staticmethod
    def add_document(
        document_id: str,
        filename: str
    ):

        supabase = (
            SupabaseService
            .get_client()
        )

        supabase.table(
            "documents"
        ).insert({
            "document_id": document_id,
            "filename": filename
        }).execute()

    @staticmethod
    def get_documents():

        supabase = (
            SupabaseService
            .get_client()
        )

        result = (
            supabase
            .table("documents")
            .select("*")
            .order(
                "created_at",
                desc=True
            )
            .execute()
        )

        return result.data