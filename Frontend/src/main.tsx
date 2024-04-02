import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./Redux/store.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeSection from "./Components/Home/HomePage.tsx";
import Navbar from "./Components/Global/Navbar.tsx";
import ChartsPage from "./Components/Chart/ChartsPage.tsx";
import NotFound from "./Components/Global/NotFound.tsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: [<Navbar />, <HomeSection />],
    errorElement:<NotFound/>
  },
  {
    
    path: "/charts",
    element: [<Navbar />, <ChartsPage />],
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}  />
    </Provider>
  </React.StrictMode>
);
