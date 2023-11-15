import LayoutAdmin from "../Layout/LayoutAdmin";
import LayoutDefault from "../Layout/LayoutDefault";
import ContentLayout from "../Layout/LayoutDefault/contentLayout";
import PriveRouter from "../components/PriveRouter";
import Company from "../page/Company";
import CompanyDetall from "../page/CompanyDetall";
import Dashboard from "../page/Dashboard";
import InforCompany from "../page/InforCompany";
import Job from "../page/Job";
import DetallJob from "../page/Job/DetallJob";
import Login from "../page/Login";
import Logout from "../page/Logout";
import ManageCV from "../page/ManageCV";
import DetallCV from "../page/ManageCV/DetallCV";
import ManageJob from "../page/ManageJob";
import CreateJob from "../page/ManageJob/createJob";
import Register from "../page/Register";
import Search from "../page/Search";


export const router = [
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      {
        path: "/",
        element: <ContentLayout />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "logout",
        element: <Logout />
      },
      {
        path: "register",
        element: <Register />
      },
      {
        path: "search",
        element: <Search />
      },
      {
        path: "job/:id",
        element: <Job />
      },
      {
        path: "company",
        element: <Company />
      },
      {
        path: "company/:id",
        element: <CompanyDetall />
      },
    ]
  },
  {
    element: <PriveRouter />,
    children: [
      {
        element: <LayoutAdmin />,
        children: [
          {
            path: "admin",
            element: <Dashboard />
          },
          {
            path: "infor-company",
            element: <InforCompany />
          },
          {
            path: "manage-job",
            element: <ManageJob />,
          },
          {
            path: "create-job",
            element: <CreateJob />
          },
          {
            path: "detall-job/:id",
            element: <DetallJob />
          },
          {
            path: "manage-cv",
            element: <ManageCV />
          },
          {
            path: "detall-cv/:id",
            element: <DetallCV />
          }
        ]
      }
    ]
  }
] 