import * as yup from "yup";

export const createProjectSchema = yup.object().shape({
  org_id: yup.string().uuid().required("Organization ID is required"),
  user_id: yup.string().required("User ID is required"), // ✅ ต้องมี
  projects_name: yup.string().required("Project name is required"), 
  location: yup.string().nullable(),
  phone: yup.string().nullable(),
  email: yup.string().email().nullable(),
  address: yup.string().nullable(),
  lat: yup.number().nullable(),
  lng: yup.number().nullable(),
  pin: yup
    .string()
    .min(4, "PIN ต้องมีอย่างน้อย 4 หลัก")
    .max(6, "PIN ต้องไม่เกิน 6 หลัก")
    .nullable(),
});

export const updateProjectSchema = createProjectSchema.optional();
