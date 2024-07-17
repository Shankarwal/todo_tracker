import { Navigate } from "react-router-dom";
import React from "react";
import { getLocalUser } from "../utils/constants";

const WithProtected = (Component: any, location: string) => {
  const user = getLocalUser();
  const WithProtectionComponent: React.FC = (props) => {
    if (!user?.userId) {
      return <Navigate to="/login" replace state={{ from: location }} />;
    }
    return <Component {...props} />;
  };
  return WithProtectionComponent;
};

export default WithProtected;
