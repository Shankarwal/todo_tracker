import "./App.css";
import { RouterProvider } from "react-router-dom";
import Router from "./components/routes";
import { Stack } from "react-bootstrap";
import { IoPersonCircleOutline } from "react-icons/io5";
import { getLocalUser, removeLocalUser, removeTokens } from "./utils/constants";
import { useState } from "react";

function App() {
  const [user] = useState(getLocalUser());
  const logout = () => {
    removeLocalUser();
    removeTokens();
    window.location.href = "/";
    return;
  };

  return (
    <>
      <header className="header">
        <Stack direction="horizontal" className="justify-content-between w-100">
          <Stack direction="horizontal" className="justify-content-between">
            <IoPersonCircleOutline size={56} className="pe-2"/>
            <span className="profile">
              Hi,{"  "}
              {user && user?.username ? user?.username : "There"}
            </span>
          </Stack>
          <Stack direction="horizontal" className="justify-content-between">
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={logout}
            >
              Logout
            </button>
          </Stack>
        </Stack>
      </header>
      <RouterProvider router={Router} />
    </>
  );
}

export default App;
