import { Link } from "react-router-dom";
import styled from "styled-components";
import main from "../assets/images/main.svg";
import Logo from "../components/Logo";
const Landing = () => {
  return (
    <StyledWrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1 className="">
            job <span>tracking</span> app
          </h1>
          <p>
            I'm baby portland four dollar toast, banh mi kale chips sustainable.
            Poutine shoreditch etsy, 3 wolf moon bicycle rights occupy. Chambray
            leggings selfies, four loko butcher banh mi sustainable. Poutine
            shoreditch etsy, 3 wolf moon bicycle rights occupy.
          </p>
          <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/login" className="btn ">
            Login
          </Link>
        </div>
        <img src={main} alt="jobify" className="img main-image" />
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.section`
  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: var(--nav-height);
    display: flex;
    align-items: center;
  }

  .page {
    min-height: calc(100vh - var(--nav-height));
    display: grid;
    align-items: center;
    margin-top: -3rem;
  }
  h1 {
    font-weight: 700;
    span {
      color: var(--primary-500);
    }
    margin-bottom: 1.5rem;
  }
  p {
    line-height: 2;
    color: var(--text-secondary-color);
    margin-bottom: 1.5rem;
    max-width: 35em;
  }
  .register-link {
    margin-right: 1rem;
  }
  .btn {
    padding: 0.75rem 1rem;
  }
  .main-image {
    display: none;
  }
  @media (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 400px;
      column-gap: 3rem;
    }
    .main-image {
      display: block;
    }
  }
`;

export default Landing;
