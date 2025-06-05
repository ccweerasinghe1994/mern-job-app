import { Outlet } from "react-router-dom";
import styled from "styled-components";
import BigSideBar from "../components/BigSideBar";
import NavBar from "../components/NavBar";
import SmallSideBar from "../components/SmallSideBar";
import DashBoardContextProvider from "../context/DashBoardContext";

export default function DashboardLayout() {
  return (
    <Wrapper>
      <DashBoardContextProvider>
        <main className="dashboard">
          <SmallSideBar />
          <BigSideBar />
          <div>
            <NavBar />
            <div className="dashboard-page">
              <Outlet />
            </div>
          </div>
        </main>
      </DashBoardContextProvider>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  .dashboard {
    display: grid;
    grid-template-columns: 1fr;
  }
  .dashboard-page {
    width: 90vw;
    margin: 0 auto;
    padding: 2rem 0;
  }

  @media (min-width: 992px) {
    .dashboard {
      grid-template-columns: auto 1fr;
    }
    .dashboard-page {
      width: 90%;
    }
  }
`;
// const Wrapper = styled.section`

//   @media (min-width: 992px) {
//     .dashboard {
//       grid-template-columns: auto 1fr;
//     }
//     .dashboard-page {
//       width: 90%;
//     }
//   }
// `;
