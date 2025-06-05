import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {
  AddJob,
  Admin,
  AllJobs,
  DashboardLayout,
  EditJob,
  Error,
  HomeLayout,
  Landing,
  Login,
  Profile,
  Register,
  Stats,
} from "./pages";
export function getDarkThemeFromLocalStorage(): boolean {
  const darkTheme = localStorage.getItem("darkTheme") == "true";
  document.documentElement.classList.toggle("dark-theme", darkTheme);
  return darkTheme;
}

getDarkThemeFromLocalStorage();

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <AddJob />,
          },
          {
            path: "stats",
            element: <Stats />,
          },
          {
            path: "all-jobs",
            element: <AllJobs />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "admin",
            element: <Admin />,
          },
          {
            path: "edit-job",
            element: <EditJob />,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
