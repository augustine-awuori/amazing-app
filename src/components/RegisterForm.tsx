import { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

import {
  authTokenKey,
  DataError,
  processResponse,
  ResponseError,
} from "../services/client";
import { ErrorMessage, Form, FormField, SubmitButton } from "./form";
import auth from "../services/auth";
import service from "../services/users";
import useUser, { User } from "../hooks/useUser";

const schema = Yup.object().shape({
  email: Yup.string().email().min(7).max(70).required().label("Email"),
  name: Yup.string().min(3).max(70).required().label("Name"),
  password: Yup.string().min(6).max(25).required().label("Password"),
});

export type RegistrationInfo = Yup.InferType<typeof schema>;

interface Props {
  onLoginRequest: () => void;
}

const RegisterForm = ({ onLoginRequest }: Props) => {
  const [error, setError] = useState("");
  const { setUser } = useUser();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (info: RegistrationInfo) => {
    try {
      if (error) setError("");
      setLoading(true);
      const res = await service.register(info);
      setLoading(false);

      const { data, ok } = processResponse(res);
      if (ok) {
        auth.loginWithJwt(res.headers[authTokenKey]);
        setUser(data as User);
        window.location.href = "/";
      } else {
        setError((data as DataError).error);
        toast.error("Login failed");
      }
    } catch (error) {
      setLoading(false);
      setError((error as ResponseError).response.data.error);
    }
  };

  return (
    <Form
      initialValues={{ email: "", password: "", name: "" }}
      onSubmit={handleSubmit}
      validationSchema={schema}
    >
      <ErrorMessage error={error} visible={!!error} />
      <FormField name="email" placeholder="Email address" />
      <FormField name="name" placeholder="Full Name" />
      <FormField name="password" type="password" />
      <SubmitButton title={loading ? "Signing you up..." : "Sign Up"} />
      <p
        className="text-center mt-2 cursor-pointer text-primary"
        onClick={onLoginRequest}
      >
        Have an account? Sign In
      </p>
    </Form>
  );
};

export default RegisterForm;
