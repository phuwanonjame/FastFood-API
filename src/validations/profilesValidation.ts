import * as yup from "yup";

export const createProfileSchema = yup.object().shape({
  org_id: yup.string().uuid("org_id ต้องเป็น UUID").required("org_id จำเป็นต้องกรอก"),
  profile_name: yup.string().required("profile_name จำเป็นต้องกรอก"),
  location: yup.string().optional(),
  phone: yup.string().optional(),
  email: yup.string().email("ต้องเป็น email").optional(),
  address: yup.string().optional(),
});

export const updateProfileSchema = createProfileSchema.optional();
