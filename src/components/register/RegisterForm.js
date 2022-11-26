import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import FormError from "../common/FormError";
import { API, REGISTER_PATH } from "../../constants/api";
import AuthContext from "../../context/AuthContext";

const url = API + REGISTER_PATH;

const schema = yup.object().shape({
  name: yup.string().required("Please enter a username"),
  email: yup.string().required("Please enter your email"),
  password: yup.string().required("Please enter your password"),
});

export default function RegisterForm() {
  const [submitting, setSubmitting] = useState(false);
  const [registerError, setRegisterError] = useState(null);

  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, } = useForm({
    resolver: yupResolver(schema),
  });

  // const [auth, setAuth] = useContext(AuthContext);

  async function onSubmit(data) {
    setSubmitting(true);
    setRegisterError(null);

    // console.log(data);

    const formData = JSON.stringify(data);

    const options = {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "application/json"
      },
    }


    try {
      const response = await fetch(url, options);
      // const json = await response.json();
      console.log("response", response.json);
      // setAuth(response.data);
      navigate("/login");
    } catch (error) {
      console.log("Error: ", error);
      console.log(error.response)
      setRegisterError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {registerError && <FormError>{registerError}</FormError>}
        <fieldset disabled={submitting}>
          <div>
            <input {...register("name")} id="name" placeholder="Enter a username" />
            {errors.name && <FormError>{errors.name.message}</FormError>}
          </div>

          <div>
            <input {...register("email")} id="email" placeholder="email" />
            {errors.email && <FormError>{errors.email.message}</FormError>}
          </div>

          <div>
            <input {...register("password")} id="password" placeholder="Password" type="password" />
            {errors.password && <FormError>{errors.password.message}</FormError>}
          </div>

          <button>{submitting ? "Signing up..." : "Sign up"}</button>
        </fieldset>
      </form>
    </>
  );
}