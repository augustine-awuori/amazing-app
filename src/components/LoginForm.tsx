import { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

import { DataError, processResponse, ResponseError } from "../services/client";
import { ErrorMessage, Form, FormField, SubmitButton } from "./form";
import auth from "../services/auth";
import service from "../services/users";

const schema = Yup.object().shape({
  email: Yup.string().email().min(7).max(70).required().label("Email"),
  password: Yup.string().min(1).max(150).required().label("Password"),
});

export type LoginInfo = Yup.InferType<typeof schema>;

interface Props {
  onSignUpRequest: () => void;
}

const LoginForm = ({ onSignUpRequest }: Props) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (info: LoginInfo) => {
    try {
      if (error) setError("");
      setLoading(true);
      const res = await service.login(info);
      setLoading(false);

      const { data, ok } = processResponse(res);
      if (ok) {
        auth.loginWithJwt(res.data);
        window.location.href = "/";
      } else {
        setError((data as DataError).error || "Unknown error");
        toast.error("Login failed");
      }
    } catch (error) {
      setLoading(false);
      setError((error as ResponseError).response.data.error || "Unknown error");
    }
  };

  return (
    <Form
      initialValues={{ email: "", password: "" }}
      onSubmit={handleSubmit}
      validationSchema={schema}
    >
      <ErrorMessage error={error} visible={!!error} />
      <FormField name="email" placeholder="Email address" />
      <p className="text-sm">
        If you've an account without a password, set your new password here
      </p>
      <FormField name="password" type="password" />
      <SubmitButton title={loading ? "Signing you in..." : "Sign In"} />
      <p
        className="text-center mt-2 cursor-pointer text-primary"
        onClick={onSignUpRequest}
      >
        Don't have an account? Sign Up
      </p>
    </Form>
  );
};

export default LoginForm;
