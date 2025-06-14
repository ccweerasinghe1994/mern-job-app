import type { ActionFunctionArgs } from "react-router-dom";
import { Form, Link, redirect, useNavigation } from "react-router-dom";
import styled from "styled-components";

import { API } from "@/api/api";
import { API_ENDPOINTS, type ApiError } from "@/types";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { FormRaw, Logo } from "../components";
export async function registerFormAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const name = formData.get("name");
  const lastName = formData.get("lastName");
  const location = formData.get("location");
  const email = formData.get("email");
  const password = formData.get("password");

  const registerObject = {
    name: name?.toString() || "",
    lastName: lastName?.toString() || "",
    location: location?.toString() || "",
    email: email?.toString() || "",
    password: password?.toString() || "",
  };

  try {
    await API.post(API_ENDPOINTS.REGISTER, registerObject);
    toast.success("Registration successful! Please log in.");
    return redirect("/login");
  } catch (error) {
    const errorObject: ApiError = {
      message: "Registration failed",
      status: 500,
      statusText: "Internal Server Error",
    };
    if (error instanceof AxiosError) {
      errorObject.message = error.response?.data?.msg || "An error occurred";
      errorObject.status = error.response?.status;
      errorObject.statusText = error.response?.statusText;
    }
    toast.error(errorObject.message);
    console.error("Registration error:", error);
    return error;
  }
}

const Register = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>register</h4>
        <FormRaw label="Name" defaultValue="chamara" name="name" type="text" />
        <FormRaw
          label="Last Name"
          defaultValue="weerasinghe"
          name="lastName"
          type="text"
        />
        <FormRaw
          label="Location"
          defaultValue="kelaniya"
          name="location"
          type="text"
        />
        <FormRaw
          label="Email"
          defaultValue="chamara@gmail.com"
          name="email"
          type="email"
        />
        <FormRaw
          label="Password"
          defaultValue="password"
          name="password"
          type="password"
        />
        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? "Registering..." : "Register"}
        </button>
        <p>
          already a user?{" "}
          <Link className="member-btn" to="/login">
            Login Page
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Register;

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  align-items: center;

  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }
  .form {
    max-width: 400px;
    border-top: 5px solid var(--primary-500);
  }
  h4 {
    text-align: center;
    margin-bottom: 1.38rem;
  }
  p {
    text-align: center;
    margin-top: 1rem;
    line-height: 1.5;
  }
  .btn {
    margin-top: 1rem;
  }
  .member-btn {
    color: var(--primary-500);
    letter-spacing: var(--letter-spacing);
    margin-left: 0.25rem;
  }
`;
