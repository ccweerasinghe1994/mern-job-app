import { Link } from "react-router-dom";
import styled from "styled-components";
import { FormRaw, Logo } from "../components";

const Login = () => {
  return (
    <Wrapper>
      <form className="form">
        <Logo />
        <h4>Login</h4>
        <FormRaw label="Email" name="email" type="email" />
        <FormRaw label="Password" name="password" type="password" />
        <button type="submit" className="btn btn-block">
          Submit
        </button>
        <button type="button" className="btn btn-block">
          Explore the app
        </button>
        <p>
          not a member yet?{" "}
          <Link className="member-btn" to="/register">
            Register Page
          </Link>
        </p>
      </form>
    </Wrapper>
  );
};
export default Login;

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
