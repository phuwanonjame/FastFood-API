export interface ProfileDTO {
  org_id: string;
  profile_name: string;
  location?: string;
  phone?: string;
  email?: string;
  address?: string;
  lat?: number;   // ✅ Latitude
  lng?: number;   // ✅ Longitude
  pin?: string;   // ✅ เพิ่ม PIN สำหรับล็อค login
}
