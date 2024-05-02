import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useDispatch } from "react-redux";
import {
  setLoginStatus,
  setAdminStatus,
  setUserDetails,
} from "../actions/actions";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [file, setFile] = useState({
    email: "",
    password: "",
    error: null,
    loading: false,
  });
  const { email, password, error, loading } = file;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFile({ ...file, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFile({ ...file, loading: true });

    if (!email || !password) {
      setFile({ ...file, loading: false, error: "All fields are required" });
      toast.warning("All fields are required");
      return;
    }

    const res = await fetch("http://localhost:5000/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();

    if (data.success === false) {
      setFile({
        ...file,
        error: data.message,
        loading: false,
      });
      toast.error(data.message);
      return;
    }
    setFile({
      username: "",
      email: "",
      password: "",
      error: null,
      loading: false,
    });

    localStorage.setItem("userInfo", JSON.stringify(data.user));
    toast.success("Logging successful");

    if (data.user.isAdmin === true) {
      navigate("/admin");

      dispatch(setAdminStatus(true));
      dispatch(setLoginStatus(true));
      dispatch(setUserDetails(data.user));
    } else {
      navigate("/user");
      dispatch(setAdminStatus(false));
      dispatch(setLoginStatus(true));
      dispatch(setUserDetails(data.user));
    }
  };
  return (
    <div className="background_container_login">
      <section>
        <h3>Log into your account</h3>
        <form className="form" onSubmit={handleSubmit}>
          <div className="input_container">
            <label style={{ color: "#fff" }}>Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
            />
          </div>
          <div className="input_container">
            <label style={{ color: "#fff" }}>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleChange}
            />
            {showPassword ? (
              <AiFillEyeInvisible
                className="show_password"
                onClick={() => setShowPassword((prevState) => !prevState)}
              />
            ) : (
              <AiFillEye
                className="show_password"
                onClick={() => setShowPassword((prevState) => !prevState)}
              />
            )}
          </div>
          {error && <p className="error">{error}</p>}
          <div className="btn_container">
            <button className="btn" disabled={loading} onClick={handleSubmit}>
              {loading ? "Logging in ..." : "Login"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Login;
