import * as yup from "yup";

export const createProfileSchema = yup.object().shape({
  org_id: yup.string().uuid().required(),
  profile_name: yup.string().required(),
  location: yup.string().nullable(),
  phone: yup.string().nullable(),
  email: yup.string().email().nullable(),
  address: yup.string().nullable(),
  lat: yup.number().nullable(),   // ✅ ต้องเพิ่ม
  lng: yup.number().nullable(),   // ✅ ต้องเพิ่ม
});


export const updateProfileSchema = createProfileSchema.optional();
