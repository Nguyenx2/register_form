import * as yup from "yup";

export const registrationSchema = yup.object().shape({
  name: yup.string().required("Tên không được để trống"),
  email: yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
  password: yup
    .string()
    .min(6, "Mật khẩu ít nhất 6 ký tự")
    .required("Bắt buộc"),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password")], "Mật khẩu xác nhận không khớp")
    .required("Bắt buộc xác nhận mật khẩu"),
});
