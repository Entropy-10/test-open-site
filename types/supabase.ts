export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      'looking-for-team-panel': {
        Row: {
          created_at: string
          guild_id: string
          message_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          guild_id: string
          message_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          guild_id?: string
          message_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      'looking-for-team-post': {
        Row: {
          created_at: string
          message_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          message_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          message_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      players: {
        Row: {
          created_at: string
          joined_at: string
          role: Database['public']['Enums']['player_role']
          team_id: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          joined_at: string
          role: Database['public']['Enums']['player_role']
          team_id: number
          updated_at: string
          user_id: string
        }
        Update: {
          created_at?: string
          joined_at?: string
          role?: Database['public']['Enums']['player_role']
          team_id?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'players_team_id_fkey'
            columns: ['team_id']
            isOneToOne: false
            referencedRelation: 'teams'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'players_user_id_fkey'
            columns: ['user_id']
            isOneToOne: true
            referencedRelation: 'users'
            referencedColumns: ['osu_id']
          }
        ]
      }
      teams: {
        Row: {
          acronym: string
          created_at: string
          flag: string
          id: number
          name: string
          timezone: string
          updated_at: string
        }
        Insert: {
          acronym: string
          created_at?: string
          flag: string
          id?: number
          name: string
          timezone: string
          updated_at: string
        }
        Update: {
          acronym?: string
          created_at?: string
          flag?: string
          id?: number
          name?: string
          timezone?: string
          updated_at?: string
        }
        Relationships: []
      }
      tokens: {
        Row: {
          created_at: string
          discord_access_token: string
          discord_refresh_token: string
          osu_access_token: string
          osu_id: string
          osu_refresh_token: string
        }
        Insert: {
          created_at?: string
          discord_access_token: string
          discord_refresh_token: string
          osu_access_token: string
          osu_id: string
          osu_refresh_token: string
        }
        Update: {
          created_at?: string
          discord_access_token?: string
          discord_refresh_token?: string
          osu_access_token?: string
          osu_id?: string
          osu_refresh_token?: string
        }
        Relationships: [
          {
            foreignKeyName: 'tokens_osu_id_fkey'
            columns: ['osu_id']
            isOneToOne: true
            referencedRelation: 'users'
            referencedColumns: ['osu_id']
          }
        ]
      }
      users: {
        Row: {
          country: string
          country_code: string
          created_at: string
          discord_avatar: string | null
          discord_id: string
          discord_name: string | null
          discord_tag: string
          osu_avatar: string
          osu_id: string
          osu_name: string
          rank: number | null
          restricted: boolean
        }
        Insert: {
          country: string
          country_code: string
          created_at?: string
          discord_avatar?: string | null
          discord_id: string
          discord_name?: string | null
          discord_tag: string
          osu_avatar: string
          osu_id: string
          osu_name: string
          rank?: number | null
          restricted: boolean
        }
        Update: {
          country?: string
          country_code?: string
          created_at?: string
          discord_avatar?: string | null
          discord_id?: string
          discord_name?: string | null
          discord_tag?: string
          osu_avatar?: string
          osu_id?: string
          osu_name?: string
          rank?: number | null
          restricted?: boolean
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      request_user_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      player_role: 'captain' | 'player'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database['public']['Tables'] & Database['public']['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database['public']['Tables'] &
        Database['public']['Views'])
    ? (Database['public']['Tables'] &
        Database['public']['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database['public']['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database['public']['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database['public']['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof Database['public']['Enums']
    ? Database['public']['Enums'][PublicEnumNameOrOptions]
    : never
