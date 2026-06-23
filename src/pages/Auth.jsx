import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Auth() {
  const [mode, SetMode] = useState("signup");
  const [error, SetError] = useState(null);
  const navigate = useNavigate();

  const { user, signUp, logout, login } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubimit(data) {
    SetError(null);
    let result;
    if (mode === "signup") result = signUp(data.email, data.password);
    else result = login(data.email, data.password);

    if (result.success) navigate("/");
    else SetError(result.error);
  }

  return (
    <div className="page">
      <div className="container">
        <div className="auth-container">
          {user && <p>User logged in: {user.email}</p>}
          <button onClick={() => logout()}>Logout</button>
          <h1 className="page-title">{mode === "signup" ? "Sign Up" : "Login"}</h1>
          <form action="" className="auth-form" onSubmit={handleSubmit(onSubimit)}>
            {error && <div className="error-message">{error}</div>}
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-input"
                id="email"
                {...register("email", { required: "Email is required" })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-input"
                id="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Password must be at least 6 characters" },
                  maxLength: { value: 12, message: "Password must be less than 12 characters" },
                })}
              />
            </div>
            {errors.email && <span className="form-error">{errors.email.message}</span>}
            {errors.password && <span className="form-error">{errors.password.message}</span>}
            <button className="btn btn-primary btn-large">{mode === "signup" ? "Sign Up" : "Login"}</button>
          </form>

          <div className="auth-switch">
            {mode === "signup" ? (
              <p>
                Already have an account?{" "}
                <span className="auth-link" onClick={() => SetMode("login")}>
                  Login
                </span>
              </p>
            ) : (
              <p>
                Don't have an account?{" "}
                <span className="auth-link" onClick={() => SetMode("signup")}>
                  Sign Up
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
