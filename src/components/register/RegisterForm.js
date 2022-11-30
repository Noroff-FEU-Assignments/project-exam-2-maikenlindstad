import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../common/FormError";
import { API, REGISTER_PATH } from "../../constants/api";

const url = API + REGISTER_PATH;

const schema = yup.object().shape({
  name: yup.string().required("Please enter your name").matches(/^[a-zA-Z0-9_]+$/, "Only _ (underscore) is allowed"),
  email: yup.string().required("Please enter an email address").matches(/^[a-zA-Z]+[a-zA-Z0-9_.]+@+(\bstud.noroff.no|noroff.no)$/, "Please enter your provided Noroff email"),
  password: yup.string().required("Please select a password").min(8, "Enter at least 8 characters"),
});

export default function RegisterForm() {
  const [submitting, setSubmitting] = useState(false);
  const [registerError, setRegisterError] = useState(null);

  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, } = useForm({
    resolver: yupResolver(schema),
  });


  async function onSubmit(data) {
    setSubmitting(true);
    setRegisterError(null);

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
      <form className="beforeLoginForm" onSubmit={handleSubmit(onSubmit)}>
        {registerError && <FormError>{registerError}</FormError>}
        <fieldset>

          <div>
            <input {...register("name")} id="name" placeholder="Enter a username" />
            {errors.name && <FormError>{errors.name.message}</FormError>}
          </div>

          <div>
            <input {...register("email")} id="email" placeholder="Email" />
            {errors.email && <FormError>{errors.email.message}</FormError>}
          </div>

          <div>
            <input {...register("password")} id="password" placeholder="Password" type="password" />
            {errors.password && <FormError>{errors.password.message}</FormError>}
          </div>

          <button className="cta-btn marginTop10">{submitting ? "Signing up..." : "Sign up"}</button>
          <p>(Redirects to login page)</p>

        </fieldset>
      </form>
    </>
  );
}