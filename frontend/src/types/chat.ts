export interface Source {
    page: number;
    source: string;
    preview: string;
  }
  
  export interface ChatMessage {
    role: "user" | "assistant";
    content: string;
    sources?: Source[];
  }