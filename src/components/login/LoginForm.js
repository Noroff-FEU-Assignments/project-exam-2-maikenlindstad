import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import FormError from "../common/FormError";
import { API, LOGIN_PATH } from "../../constants/api";
import AuthContext from "../../context/AuthContext";

const url = API + LOGIN_PATH;
console.log("URL:" + url);

const schema = yup.object().shape({
  email: yup.string().required("Please enter your email").email("Please enter your provided Noroff email"),
  password: yup.string().required("Please type password"),
});

export default function LoginForm() {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, } = useForm({
    resolver: yupResolver(schema),
  });

  const [auth, setAuth] = useContext(AuthContext);

  async function onSubmit(data) {
    setSubmitting(true);
    setLoginError(null);

    console.log(data);

    try {
      const response = await axios.post(url, data);
      console.log("response", response.data);
      setAuth(response.data);
      navigate("/posts");
    } catch (error) {
      console.log("Error: ", error);
      console.log(error.response)
      setLoginError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form class="beforeLoginForm" onSubmit={handleSubmit(onSubmit)}>

      {loginError && <FormError>Something went wrong. Try again.</FormError>}

      <fieldset>
        <div>
          <input {...register("email")} id="email" placeholder="Email" />
          {errors.email && <FormError>{errors.email.message}</FormError>}
        </div>

        <div>
          <input {...register("password")} id="password" placeholder="Password" type="password" />
          {errors.password && <FormError>{errors.password.message}</FormError>}
        </div>

        <button className="cta-btn marginTop10">{submitting ? "Loggin in..." : "Login"}</button>

      </fieldset>
    </form>
  );
}
