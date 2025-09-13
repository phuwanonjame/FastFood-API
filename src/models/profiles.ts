export interface ProfileDTO {
  org_id: string;
  profile_name: string;
  location?: string;
  phone?: string;
  email?: string;
  address?: string;
  lat?: number;   // ✅ เพิ่ม
  lng?: number;   // ✅ เพิ่ม
}