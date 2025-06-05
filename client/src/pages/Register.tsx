import { Link } from "react-router-dom";
import styled from "styled-components";

import { FormRaw, Logo } from "../components";

const Register = () => {
  return (
    <Wrapper>
      <form className="form">
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
        <button type="submit" className="btn btn-block">
          Submit
        </button>
        <p>
          already a user?{" "}
          <Link className="member-btn" to="/login">
            Login Page
          </Link>
        </p>
      </form>
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
