import { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

import { authTokenKey, processResponse } from "../services/client";
import { Form, FormField, SubmitButton } from "./form";
import { randomImage } from "../utils/funcs";
import auth from "../services/auth";
import service from "../services/users";
import useUser, { User } from "../hooks/useUser";

const schema = Yup.object().shape({
  email: Yup.string().email().min(7).max(70).label("Email"),
  name: Yup.string().min(1).max(150).label("Name"),
});

export type LoginInfo = Yup.InferType<typeof schema>;

const EmergencyLoginForm = () => {
  const { setUser } = useUser();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (info: LoginInfo) => {
    setLoading(true);
    const res = await service.register({
      ...info,
      avatar: randomImage,
      isAccountVerified: false,
    });
    setLoading(false);

    const { data, ok } = processResponse(res);
    if (ok) {
      auth.loginWithJwt(res.headers[authTokenKey]);
      setUser(data as User);
      window.location.href = "/";
    } else toast.error("Login failed");
  };

  return (
    <Form
      initialValues={{ name: "", email: "" }}
      onSubmit={handleSubmit}
      validationSchema={schema}
    >
      <FormField name="email" />
      <FormField name="name" placeholder="Full Name" />
      <SubmitButton title={loading ? "Logging you in..." : "Login"} />
    </Form>
  );
};

export default EmergencyLoginForm;
