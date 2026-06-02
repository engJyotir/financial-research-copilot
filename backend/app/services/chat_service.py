from app.services.supabase_service import (
    SupabaseService
)


class ChatService:

    @staticmethod
    def save_message(
        document_id: str,
        role: str,
        content: str
    ):

        supabase = (
            SupabaseService
            .get_client()
        )

        supabase.table(
            "messages"
        ).insert({
            "document_id": document_id,
            "role": role,
            "content": content
        }).execute()

    @staticmethod
    def get_messages(
        document_id: str
    ):

        supabase = (
            SupabaseService
            .get_client()
        )

        result = (
            supabase
            .table("messages")
            .select("*")
            .eq(
                "document_id",
                document_id
            )
            .order(
                "created_at"
            )
            .execute()
        )

        return result.data