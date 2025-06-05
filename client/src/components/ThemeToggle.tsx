import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";

import styled from "styled-components";
import { useDashBoardContext } from "../hooks/useDashboardContext";

const ThemeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useDashBoardContext();
  return (
    <Wrapper onClick={toggleDarkMode}>
      {!isDarkMode ? (
        <BsFillSunFill className="toggle-icon" />
      ) : (
        <BsFillMoonFill className="toggle-icon" />
      )}
    </Wrapper>
  );
};

export default ThemeToggle;
const Wrapper = styled.button`
  background: transparent;
  border-color: transparent;
  width: 3.5rem;
  height: 2rem;
  display: grid;
  place-items: center;
  cursor: pointer;
  .toggle-icon {
    font-size: 1.15rem;
    color: var(--text-color);
  }
`;
