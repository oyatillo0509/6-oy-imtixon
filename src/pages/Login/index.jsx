import React, { useRef } from "react";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const emailRef = useRef("");
  const passwordRef = useRef();
  const navigate = useNavigate();

  async function validate(email, password) {
    if (email.current.value.length < 3 || !email.current.value.includes("@")) {
      alert("Email noto'g'ri");
      email.current.style.outlineColor = "red";
      email.current.focus();
      return false;
    }
    if (password.current.value.length < 3) {
      alert("Parol noto'g'ri");
      password.current.style.outlineColor = "red";
      password.current.focus();
      return false;
    }
    return true;
  }

  async function handleLogin(event) {
    event.preventDefault();

    const isValid = await validate(emailRef, passwordRef);
    if (!isValid) {
      return;
    }

    try {
      const response = await fetch("https://api.escuelajs.co/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailRef.current.value,
          password: passwordRef.current.value,
        }),
      });

      if (!response.ok) {
        throw new Error("Login xato");
      }

      const data = await response.json();
      const { access_token } = data;

      localStorage.setItem("accessToken", access_token);
      navigate("/home");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Parol yoki login xato");
      navigate("/register");
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.imageSection}>
        <img src="./images/bac.svg" alt="Lighthouse" className={styles.image} />
        <p className={styles.photoCredit}>Photo by Alexandr Popadin</p>
      </div>
      <div className={styles.formSection}>
        <form autoComplete="off" className={styles.form} onSubmit={handleLogin}>
          <h1>Nice to see you again</h1>
          <input
            type="email"
            name="email"
            id="email"
            ref={emailRef}
            placeholder="Email or phone number"
          />
          <input
            autoComplete="off"
            type="password"
            name="password"
            id="password"
            ref={passwordRef}
            placeholder="Enter password"
          />
          <div className={styles.options}>
            <label>
              <input type="checkbox" />
              Remember
            </label>
            <a href="/forgot-password" className={styles.forgotPassword}>
              Forgot password?
            </a>
          </div>
          <button type="submit" className={styles.signInButton}>
            Sign in
          </button>
          <button type="button" className={styles.googleButton}>
            Or sign in with Google
          </button>
          <div className={styles.footer}>
            <p>
              Don't have an account? <a href="/register">Sign up now</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
