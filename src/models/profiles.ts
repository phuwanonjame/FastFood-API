// models/projects.ts
export interface ProjectDTO {
  org_id: string;
  user_id: string;         // ต้องมี
  projects_name: string;   // เปลี่ยนจาก profile_name → projects_name
  location?: string;
  phone?: string;
  email?: string;
  address?: string;
  lat?: number;
  lng?: number;
  pin?: string;
}
