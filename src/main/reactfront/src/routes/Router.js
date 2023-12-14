import { lazy } from "react";
import { Navigate } from "react-router-dom";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/
const IManage = lazy(() => import("../views/IManage.js"));
const Starter = lazy(() => import("../views/Starter.js"));
const About = lazy(() => import("../views/LoginPage.js"));
const SignUp = lazy(() => import("../views/SignUpPage.js"));
const Alerts = lazy(() => import("../views/ui/Alerts"));
const Badges = lazy(() => import("../views/ui/Badges"));
const Buttons = lazy(() => import("../views/ui/Buttons"));
const Cards = lazy(() => import("../views/ui/Cards"));
const Grid = lazy(() => import("../views/ui/Grid"));
const Tables = lazy(() => import("../views/ui/Tables"));
const Forms = lazy(() => import("../views/ui/Forms"));
const AdminForms = lazy(() => import("../views/ui/AdminForms"));
const Breadcrumbs = lazy(() => import("../views/ui/Breadcrumbs"));

/*****Routes******/

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/imanage" /> },
      { path: "/imanage", exact: true, element: <IManage /> },
      { path: "/starter", exact: true, element: <Starter /> },
      { path: "/alerts", exact: true, element: <Alerts /> },
      { path: "/badges", exact: true, element: <Badges /> },
      { path: "/buttons", exact: true, element: <Buttons /> },
      { path: "/cards", exact: true, element: <Cards /> },
      { path: "/grid", exact: true, element: <Grid /> },
      { path: "/table", exact: true, element: <Tables /> },
      { path: "/forms", exact: true, element: <Forms /> },
      { path: "/adminForms", exact: true, element: <AdminForms /> },

      { path: "/breadcrumbs", exact: true, element: <Breadcrumbs /> },
    ],
    
  },
  { path: "/about", exact: true, element: <About /> },
  { path: "/signup", exact: true, element: <SignUp /> }
];

export default ThemeRoutes;
