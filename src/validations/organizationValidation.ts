import * as yup from "yup";

export const createOrgSchema = yup.object({
  name: yup.string().required("Name is required"),
  type_id: yup.number().integer().required("Type ID is required"),
  plan_id: yup.number().integer().required("Plan ID is required"),
  user_id: yup.string().required("User ID is required"), // เพิ่ม user_id
});

export type CreateOrgInput = yup.InferType<typeof createOrgSchema>;
