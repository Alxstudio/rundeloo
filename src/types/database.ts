export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      alerts: {
        Row: {
          alert_type: Database["public"]["Enums"]["alert_type"]
          application_id: string
          created_at: string
          due_at: string | null
          id: string
          message: string
          status: Database["public"]["Enums"]["alert_status"]
          updated_at: string
        }
        Insert: {
          alert_type: Database["public"]["Enums"]["alert_type"]
          application_id: string
          created_at?: string
          due_at?: string | null
          id?: string
          message: string
          status?: Database["public"]["Enums"]["alert_status"]
          updated_at?: string
        }
        Update: {
          alert_type?: Database["public"]["Enums"]["alert_type"]
          application_id?: string
          created_at?: string
          due_at?: string | null
          id?: string
          message?: string
          status?: Database["public"]["Enums"]["alert_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "alerts_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
        ]
      }
      applications: {
        Row: {
          applied_at: string | null
          company_id: string
          created_at: string
          first_response_at: string | null
          id: string
          job_url: string | null
          notes: string | null
          role_title: string
          status: Database["public"]["Enums"]["application_status"]
          status_changed_at: string | null
          updated_at: string
          work_mode: Database["public"]["Enums"]["work_mode"] | null
        }
        Insert: {
          applied_at?: string | null
          company_id: string
          created_at?: string
          first_response_at?: string | null
          id?: string
          job_url?: string | null
          notes?: string | null
          role_title: string
          status?: Database["public"]["Enums"]["application_status"]
          status_changed_at?: string | null
          updated_at?: string
          work_mode?: Database["public"]["Enums"]["work_mode"] | null
        }
        Update: {
          applied_at?: string | null
          company_id?: string
          created_at?: string
          first_response_at?: string | null
          id?: string
          job_url?: string | null
          notes?: string | null
          role_title?: string
          status?: Database["public"]["Enums"]["application_status"]
          status_changed_at?: string | null
          updated_at?: string
          work_mode?: Database["public"]["Enums"]["work_mode"] | null
        }
        Relationships: [
          {
            foreignKeyName: "applications_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      checklist_items: {
        Row: {
          created_at: string
          generated_by_ai: boolean
          id: string
          interview_id: string
          is_completed: boolean
          label: string
          position: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          generated_by_ai?: boolean
          id?: string
          interview_id: string
          is_completed?: boolean
          label: string
          position?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          generated_by_ai?: boolean
          id?: string
          interview_id?: string
          is_completed?: boolean
          label?: string
          position?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "checklist_items_interview_id_fkey"
            columns: ["interview_id"]
            isOneToOne: false
            referencedRelation: "interviews"
            referencedColumns: ["id"]
          },
        ]
      }
      companies: {
        Row: {
          created_at: string
          id: string
          industry: string | null
          location: string | null
          name: string
          notes: string | null
          updated_at: string
          user_id: string
          website: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          industry?: string | null
          location?: string | null
          name: string
          notes?: string | null
          updated_at?: string
          user_id: string
          website?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          industry?: string | null
          location?: string | null
          name?: string
          notes?: string | null
          updated_at?: string
          user_id?: string
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "companies_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_reminders: {
        Row: {
          contact_id: string
          created_at: string
          id: string
          message: string | null
          remind_at: string
          sent_at: string | null
          status: Database["public"]["Enums"]["reminder_status"]
          updated_at: string
        }
        Insert: {
          contact_id: string
          created_at?: string
          id?: string
          message?: string | null
          remind_at: string
          sent_at?: string | null
          status?: Database["public"]["Enums"]["reminder_status"]
          updated_at?: string
        }
        Update: {
          contact_id?: string
          created_at?: string
          id?: string
          message?: string | null
          remind_at?: string
          sent_at?: string | null
          status?: Database["public"]["Enums"]["reminder_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "contact_reminders_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      contacts: {
        Row: {
          company_id: string
          contact_role: Database["public"]["Enums"]["contact_role"] | null
          created_at: string
          email: string | null
          full_name: string
          id: string
          linkedin_url: string | null
          notes: string | null
          phone: string | null
          updated_at: string
        }
        Insert: {
          company_id: string
          contact_role?: Database["public"]["Enums"]["contact_role"] | null
          created_at?: string
          email?: string | null
          full_name: string
          id?: string
          linkedin_url?: string | null
          notes?: string | null
          phone?: string | null
          updated_at?: string
        }
        Update: {
          company_id?: string
          contact_role?: Database["public"]["Enums"]["contact_role"] | null
          created_at?: string
          email?: string | null
          full_name?: string
          id?: string
          linkedin_url?: string | null
          notes?: string | null
          phone?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "contacts_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      interview_simulations: {
        Row: {
          application_id: string | null
          created_at: string
          ended_at: string | null
          feedback_text: string | null
          id: string
          interview_type: Database["public"]["Enums"]["simulation_type"] | null
          score: number | null
          started_at: string | null
          target_role: string | null
          transcript: Json | null
          updated_at: string
          user_id: string
        }
        Insert: {
          application_id?: string | null
          created_at?: string
          ended_at?: string | null
          feedback_text?: string | null
          id?: string
          interview_type?: Database["public"]["Enums"]["simulation_type"] | null
          score?: number | null
          started_at?: string | null
          target_role?: string | null
          transcript?: Json | null
          updated_at?: string
          user_id: string
        }
        Update: {
          application_id?: string | null
          created_at?: string
          ended_at?: string | null
          feedback_text?: string | null
          id?: string
          interview_type?: Database["public"]["Enums"]["simulation_type"] | null
          score?: number | null
          started_at?: string | null
          target_role?: string | null
          transcript?: Json | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "interview_simulations_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interview_simulations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      interviews: {
        Row: {
          application_id: string
          created_at: string
          format: Database["public"]["Enums"]["interview_format"] | null
          id: string
          improvements: string | null
          interview_type: Database["public"]["Enums"]["interview_type"] | null
          interviewer_name: string | null
          my_answers: string | null
          questions_asked: string | null
          scheduled_at: string | null
          status: Database["public"]["Enums"]["interview_status"]
          updated_at: string
        }
        Insert: {
          application_id: string
          created_at?: string
          format?: Database["public"]["Enums"]["interview_format"] | null
          id?: string
          improvements?: string | null
          interview_type?: Database["public"]["Enums"]["interview_type"] | null
          interviewer_name?: string | null
          my_answers?: string | null
          questions_asked?: string | null
          scheduled_at?: string | null
          status?: Database["public"]["Enums"]["interview_status"]
          updated_at?: string
        }
        Update: {
          application_id?: string
          created_at?: string
          format?: Database["public"]["Enums"]["interview_format"] | null
          id?: string
          improvements?: string | null
          interview_type?: Database["public"]["Enums"]["interview_type"] | null
          interviewer_name?: string | null
          my_answers?: string | null
          questions_asked?: string | null
          scheduled_at?: string | null
          status?: Database["public"]["Enums"]["interview_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "interviews_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
        ]
      }
      note_links: {
        Row: {
          created_at: string
          id: string
          link_status: Database["public"]["Enums"]["link_status"]
          reason: string | null
          similarity_score: number | null
          source_note_id: string
          target_note_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          link_status?: Database["public"]["Enums"]["link_status"]
          reason?: string | null
          similarity_score?: number | null
          source_note_id: string
          target_note_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          link_status?: Database["public"]["Enums"]["link_status"]
          reason?: string | null
          similarity_score?: number | null
          source_note_id?: string
          target_note_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "note_links_source_note_id_fkey"
            columns: ["source_note_id"]
            isOneToOne: false
            referencedRelation: "notes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "note_links_target_note_id_fkey"
            columns: ["target_note_id"]
            isOneToOne: false
            referencedRelation: "notes"
            referencedColumns: ["id"]
          },
        ]
      }
      notes: {
        Row: {
          application_id: string | null
          company_id: string | null
          content: Json | null
          created_at: string
          embedding: string | null
          generated_by_ai: boolean
          id: string
          interview_id: string | null
          title: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          application_id?: string | null
          company_id?: string | null
          content?: Json | null
          created_at?: string
          embedding?: string | null
          generated_by_ai?: boolean
          id?: string
          interview_id?: string | null
          title?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          application_id?: string | null
          company_id?: string | null
          content?: Json | null
          created_at?: string
          embedding?: string | null
          generated_by_ai?: boolean
          id?: string
          interview_id?: string | null
          title?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notes_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notes_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notes_interview_id_fkey"
            columns: ["interview_id"]
            isOneToOne: false
            referencedRelation: "interviews"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          full_name: string | null
          id: string
          initial_active_processes: number | null
          language: string | null
          onboarding_completed: boolean
          prep_detail_level:
            | Database["public"]["Enums"]["prep_detail_level"]
            | null
          search_type: Database["public"]["Enums"]["search_type"] | null
          seniority: Database["public"]["Enums"]["seniority_level"] | null
          target_location: string | null
          target_role: string | null
          theme: Database["public"]["Enums"]["theme_mode"] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          full_name?: string | null
          id?: string
          initial_active_processes?: number | null
          language?: string | null
          onboarding_completed?: boolean
          prep_detail_level?:
            | Database["public"]["Enums"]["prep_detail_level"]
            | null
          search_type?: Database["public"]["Enums"]["search_type"] | null
          seniority?: Database["public"]["Enums"]["seniority_level"] | null
          target_location?: string | null
          target_role?: string | null
          theme?: Database["public"]["Enums"]["theme_mode"] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          full_name?: string | null
          id?: string
          initial_active_processes?: number | null
          language?: string | null
          onboarding_completed?: boolean
          prep_detail_level?:
            | Database["public"]["Enums"]["prep_detail_level"]
            | null
          search_type?: Database["public"]["Enums"]["search_type"] | null
          seniority?: Database["public"]["Enums"]["seniority_level"] | null
          target_location?: string | null
          target_role?: string | null
          theme?: Database["public"]["Enums"]["theme_mode"] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      question_bank: {
        Row: {
          answer_hint: string | null
          created_at: string
          difficulty: Database["public"]["Enums"]["difficulty_level"] | null
          id: string
          question: string
          question_type: Database["public"]["Enums"]["question_type"]
          topic: string | null
          updated_at: string
        }
        Insert: {
          answer_hint?: string | null
          created_at?: string
          difficulty?: Database["public"]["Enums"]["difficulty_level"] | null
          id?: string
          question: string
          question_type: Database["public"]["Enums"]["question_type"]
          topic?: string | null
          updated_at?: string
        }
        Update: {
          answer_hint?: string | null
          created_at?: string
          difficulty?: Database["public"]["Enums"]["difficulty_level"] | null
          id?: string
          question?: string
          question_type?: Database["public"]["Enums"]["question_type"]
          topic?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      study_paths: {
        Row: {
          application_id: string
          created_at: string
          generated_at: string | null
          id: string
          items: Json | null
          progress_percent: number
          title: string | null
          updated_at: string
        }
        Insert: {
          application_id: string
          created_at?: string
          generated_at?: string | null
          id?: string
          items?: Json | null
          progress_percent?: number
          title?: string | null
          updated_at?: string
        }
        Update: {
          application_id?: string
          created_at?: string
          generated_at?: string | null
          id?: string
          items?: Json | null
          progress_percent?: number
          title?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "study_paths_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
        ]
      }
      study_resources: {
        Row: {
          company_id: string
          created_at: string
          id: string
          notes: string | null
          resource_type: Database["public"]["Enums"]["resource_type"] | null
          study_status: Database["public"]["Enums"]["study_status"]
          title: string
          topic: string | null
          updated_at: string
          url: string | null
        }
        Insert: {
          company_id: string
          created_at?: string
          id?: string
          notes?: string | null
          resource_type?: Database["public"]["Enums"]["resource_type"] | null
          study_status?: Database["public"]["Enums"]["study_status"]
          title: string
          topic?: string | null
          updated_at?: string
          url?: string | null
        }
        Update: {
          company_id?: string
          created_at?: string
          id?: string
          notes?: string | null
          resource_type?: Database["public"]["Enums"]["resource_type"] | null
          study_status?: Database["public"]["Enums"]["study_status"]
          title?: string
          topic?: string | null
          updated_at?: string
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "study_resources_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          cancel_at_period_end: boolean
          created_at: string
          current_period_end: string | null
          id: string
          plan: Database["public"]["Enums"]["subscription_plan"]
          status: Database["public"]["Enums"]["subscription_status"]
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          cancel_at_period_end?: boolean
          created_at?: string
          current_period_end?: string | null
          id?: string
          plan?: Database["public"]["Enums"]["subscription_plan"]
          status?: Database["public"]["Enums"]["subscription_status"]
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          cancel_at_period_end?: boolean
          created_at?: string
          current_period_end?: string | null
          id?: string
          plan?: Database["public"]["Enums"]["subscription_plan"]
          status?: Database["public"]["Enums"]["subscription_status"]
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          auth_provider: string | null
          created_at: string
          email: string
          id: string
          last_login_at: string | null
          updated_at: string
        }
        Insert: {
          auth_provider?: string | null
          created_at?: string
          email: string
          id: string
          last_login_at?: string | null
          updated_at?: string
        }
        Update: {
          auth_provider?: string | null
          created_at?: string
          email?: string
          id?: string
          last_login_at?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      weekly_summaries: {
        Row: {
          created_at: string
          detected_patterns: Json | null
          id: string
          metrics_snapshot: Json | null
          suggested_next_step: string | null
          summary_text: string | null
          updated_at: string
          user_id: string
          week_end: string
          week_start: string
        }
        Insert: {
          created_at?: string
          detected_patterns?: Json | null
          id?: string
          metrics_snapshot?: Json | null
          suggested_next_step?: string | null
          summary_text?: string | null
          updated_at?: string
          user_id: string
          week_end: string
          week_start: string
        }
        Update: {
          created_at?: string
          detected_patterns?: Json | null
          id?: string
          metrics_snapshot?: Json | null
          suggested_next_step?: string | null
          summary_text?: string | null
          updated_at?: string
          user_id?: string
          week_end?: string
          week_start?: string
        }
        Relationships: [
          {
            foreignKeyName: "weekly_summaries_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
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
      alert_status: "pending" | "done" | "dismissed"
      alert_type: "follow_up" | "interview_reminder" | "custom"
      application_status:
        | "saved"
        | "applied"
        | "interview"
        | "offer"
        | "rejected"
        | "on_hold"
      contact_role: "recruiter" | "referral" | "interviewer" | "other"
      difficulty_level: "easy" | "medium" | "hard"
      interview_format: "video" | "onsite" | "phone"
      interview_status: "scheduled" | "done" | "cancelled"
      interview_type: "technical" | "behavioral" | "system_design" | "hr"
      link_status: "suggested" | "accepted" | "rejected"
      prep_detail_level: "basic" | "detailed"
      question_type: "technical" | "behavioral" | "system_design"
      reminder_status: "pending" | "sent" | "dismissed"
      resource_type: "article" | "video" | "course" | "docs" | "other"
      search_type: "local" | "remote" | "international"
      seniority_level: "junior" | "mid"
      simulation_type: "technical" | "behavioral" | "system_design"
      study_status: "pending" | "in_progress" | "done"
      subscription_plan: "free" | "premium"
      subscription_status: "active" | "past_due" | "canceled"
      theme_mode: "light" | "dark"
      work_mode: "remote" | "hybrid" | "onsite"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      alert_status: ["pending", "done", "dismissed"],
      alert_type: ["follow_up", "interview_reminder", "custom"],
      application_status: [
        "saved",
        "applied",
        "interview",
        "offer",
        "rejected",
        "on_hold",
      ],
      contact_role: ["recruiter", "referral", "interviewer", "other"],
      difficulty_level: ["easy", "medium", "hard"],
      interview_format: ["video", "onsite", "phone"],
      interview_status: ["scheduled", "done", "cancelled"],
      interview_type: ["technical", "behavioral", "system_design", "hr"],
      link_status: ["suggested", "accepted", "rejected"],
      prep_detail_level: ["basic", "detailed"],
      question_type: ["technical", "behavioral", "system_design"],
      reminder_status: ["pending", "sent", "dismissed"],
      resource_type: ["article", "video", "course", "docs", "other"],
      search_type: ["local", "remote", "international"],
      seniority_level: ["junior", "mid"],
      simulation_type: ["technical", "behavioral", "system_design"],
      study_status: ["pending", "in_progress", "done"],
      subscription_plan: ["free", "premium"],
      subscription_status: ["active", "past_due", "canceled"],
      theme_mode: ["light", "dark"],
      work_mode: ["remote", "hybrid", "onsite"],
    },
  },
} as const
