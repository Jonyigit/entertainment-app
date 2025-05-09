import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
    const isAuth = false;
    return isAuth ? <Outlet /> : <Navigate to="/sign" replace />;
};
