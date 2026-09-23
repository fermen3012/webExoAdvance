export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string
          created_at: string
          full_name: string
          company: string | null
          email: string
          phone: string | null
          service: string
          message: string
          source: string
          status: string
          notes: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          full_name: string
          company?: string | null
          email: string
          phone?: string | null
          service: string
          message: string
          source?: string
          status?: string
          notes?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          full_name?: string
          company?: string | null
          email?: string
          phone?: string | null
          service?: string
          message?: string
          source?: string
          status?: string
          notes?: string | null
        }
        Relationships: []
      }
      interactions: {
        Row: {
          id: string
          lead_id: string | null
          created_at: string
          type: string
          content: string
          metadata: Json
          sentiment: string | null
          ai_score: number | null
        }
        Insert: {
          id?: string
          lead_id?: string | null
          created_at?: string
          type?: string
          content: string
          metadata?: Json
          sentiment?: string | null
          ai_score?: number | null
        }
        Update: {
          id?: string
          lead_id?: string | null
          created_at?: string
          type?: string
          content?: string
          metadata?: Json
          sentiment?: string | null
          ai_score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "interactions_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
