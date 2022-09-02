import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../actions/auth";

export default function Logout({ isAuthenticated }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(logout());
      navigate("/", { replace: true });
    } else {
      console.log("you cant logout since you didn't logged in yet");
      navigate("/", { replace: true });
    }
  }, []);

  return (
    <div>
      <h1>Logout</h1>
    </div>
  );
}
