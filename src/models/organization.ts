export interface OrganizationDTO {
  name: string;
  type_id: number;
  plan_id: number;
  user_id?: string; 
}

export interface OrganizationResponse {
  org_id: string;
  name: string;
  type_id: number;
  plan_id: number;
  created_at: Date | null;   
}



export interface DeleteOrganizationResponse {
  message: string;
  data?: OrganizationResponse; 
}
