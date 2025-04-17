import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { registrationSchema } from "../validations/validationSchema";
import InputField from "../components/InputField";

interface RegistrationFormInputs {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const Registration: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormInputs>({
    resolver: yupResolver(registrationSchema),
  });

  const onSubmit: SubmitHandler<RegistrationFormInputs> = (data) => {
    console.log("Form submitted: ", data);
  };

  return (
    <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
      <div>
        <a href="/">
          <h3 className="text-4xl font-bold text-purple-600">Logo</h3>
        </a>
      </div>
      <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            label="Name"
            name="name"
            register={register}
            error={errors.name}
          />
          <InputField
            label="Email"
            name="email"
            register={register}
            error={errors.email}
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            register={register}
            error={errors.password}
          />
          <InputField
            label="Confirm password"
            name="password_confirmation"
            type="password"
            register={register}
            error={errors.password_confirmation}
          />
          <div className="flex items-center justify-end mt-4">
            <a
              className="text-sm text-gray-600 underline hover:text-gray-900"
              href="#"
            >
              Already registered?
            </a>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
