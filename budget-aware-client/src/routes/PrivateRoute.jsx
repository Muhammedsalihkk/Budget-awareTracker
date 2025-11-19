import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { getProfile } from "../redux/services/authApi";

const PrivateRoute = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.auth);

  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const check = async () => {
      try {
        await dispatch(getProfile());
      } finally {
        setCheckingAuth(false);
      }
    };

    check();
  }, [dispatch]);

  if (checkingAuth) {
    return <div className="p-4">authenticationChecking</div>;
  }

  if (!profile) {
    return <Navigate to="/" replace />;
  }


  return <Outlet />;
};

export default PrivateRoute;
