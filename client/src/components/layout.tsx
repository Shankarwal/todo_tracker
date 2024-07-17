import { Stack } from "react-bootstrap";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Stack
      gap={3}
      // style={{ maxWidth: "80vw", minWidth: "680px", margin: "0 auto" }}
      id="formContainer"
    >
      <Outlet />
    </Stack>
  );
};

export default Layout;
