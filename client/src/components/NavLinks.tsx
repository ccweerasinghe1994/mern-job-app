import { NavLink } from "react-router-dom";
import { useDashBoardContext } from "../hooks/useDashboardContext";
import links from "../utils/links";

export default function NavLinks({ isBigSideBar }: { isBigSideBar?: boolean }) {
  const { toggleMenu } = useDashBoardContext();

  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, path, icon } = link;
        return (
          <NavLink
            onClick={isBigSideBar ? undefined : toggleMenu}
            to={path}
            key={text}
            className={"nav-link"}
            end
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
}
