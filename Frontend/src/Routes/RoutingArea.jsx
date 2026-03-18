import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";

import App from "../App";
import Login from "../TymntPage/Login.jsx";
import Register from "../TymntPage/Register/Register.jsx";
import LandingPage from "../TymntPage/LandingPage.jsx";
import store from "../Utility/store.js";
import { checkAuth } from "../Utility/AuthSlice.js";
import AdminLogin from "../AdminPage/AdminLogin.jsx";
import AdminProfile from "../AdminPage/AdminProfile.jsx";
import Dashboard from "../AdminPage/AdminComp/Dashboard.jsx";
import TymntUser from "../AdminPage/AdminComp/TymntUser.jsx";
import Services from "../AdminPage/AdminComp/Services.jsx";
import { checkAdminSession } from "../Utility/AdminSlice.js";
import ActiveRequest from "../TymntPage/FeedComponent/FeedComp/ActiveRequest.jsx";
import Feed from "../TymntPage/FeedComponent/FeedComp/Feed.jsx";
import FeedBody from "../TymntPage/FeedComponent/FeedComp/FeedBody.jsx";

//Router
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/Login", element: <Login /> },
      { path: "/Register", element: <Register /> },
      { path: "/feed", element: <Feed />,
        children: [
          {index:true, element:<FeedBody/>},
          {path:"requestBody", element:<FeedBody/>},
          {path:"activeRequest", element:<ActiveRequest/>},
        ]
      },
      { path: "/adminLogin", element: <AdminLogin /> },
      {
        path: "adminProfile",
        element: <AdminProfile/>,
        children: [
          { index: true, element: <Dashboard/>},
          { path:"users", element: <TymntUser/>},
          { path:"services", element: <Services/>},
        ]
      }
    ],
  },
]);

//  AUTH INITIALIZER
const AuthInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAdminSession());
    dispatch(checkAuth());
  }, [dispatch]);

  return <RouterProvider router={router} />;
};

const RoutingArea = () => {
  return (
    <Provider store={store}>
      <AuthInitializer />
    </Provider>
  );
};

export default RoutingArea;
