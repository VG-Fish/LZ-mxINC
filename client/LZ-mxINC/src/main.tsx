import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Store from "./components/Store.tsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  // placeholder
  { path: "/store", element: <Store /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="944494727715-ep7hfqopf3f1lb4an6ndkehc59kn7fkh.apps.googleusercontent.com">
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </StrictMode>
);
