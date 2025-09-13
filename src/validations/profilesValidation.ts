import * as yup from "yup";

export const createProfileSchema = yup.object().shape({
  org_id: yup.string().uuid().required(),
  profile_name: yup.string().required(),
  location: yup.string().nullable(),
  phone: yup.string().nullable(),
  email: yup.string().email().nullable(),
  address: yup.string().nullable(),
  lat: yup.number().nullable(),   
  lng: yup.number().nullable(),
  pin: yup.string()
    .min(4, "PIN ต้องมีอย่างน้อย 4 หลัก")
    .max(6, "PIN ต้องไม่เกิน 6 หลัก")
    .nullable(),   // ✅ เพิ่มฟิลด์ pin
});


export const updateProfileSchema = createProfileSchema.optional();
