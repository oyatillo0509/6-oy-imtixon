import React, { useRef } from "react";
import styles from "./Register.module.css";
import { useNavigate } from "react-router-dom";

function Register() {
  const nameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const navigate = useNavigate();

  function validate() {
    if (nameRef.current.value.length < 3) {
      alert("Ism xato");
      nameRef.current.style.outlineColor = "red";
      nameRef.current.focus();
      return false;
    }
    if (!emailRef.current.value.includes("@")) {
      alert("Email xato");
      emailRef.current.style.outlineColor = "red";
      emailRef.current.focus();
      return false;
    }
    if (passwordRef.current.value.length < 3) {
      alert("Password xato");
      passwordRef.current.style.outlineColor = "red";
      passwordRef.current.focus();
      return false;
    }
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      alert("Password mos emas");
      confirmPasswordRef.current.style.outlineColor = "red";
      confirmPasswordRef.current.focus();
      return false;
    }

    return true;
  }

  async function handleRegister(event) {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    const user = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      avatar: "https://api.lorem.space/image/face?w=640&h=480",
    };

    try {
      const response = await fetch("https://api.escuelajs.co/api/v1/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        localStorage.setItem(user.name, JSON.stringify(user));
        alert("Registration successful!");
        navigate("/login");
      } else {
        const errorData = await response.json();
        alert(`Registratsiya xatolik ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error registering user:", error);
      alert("Xatolik yuz berdi");
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.imageSection}>
        <img src="./images/bac.svg" alt="Lighthouse" className={styles.image} />
      </div>
      <div className={styles.formSection}>
        <form
          autoComplete="off"
          className={styles.form}
          onSubmit={handleRegister}
        >
          <h1>Register</h1>
          <input
            type="text"
            name="name"
            id="name"
            ref={nameRef}
            placeholder="Enter name..."
          />
          <input
            type="email"
            name="email"
            id="email"
            ref={emailRef}
            placeholder="Enter email..."
          />
          <input
            autoComplete="off"
            type="password"
            name="password"
            id="password"
            ref={passwordRef}
            placeholder="Enter password..."
          />
          <input
            autoComplete="off"
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            ref={confirmPasswordRef}
            placeholder="Confirm password..."
          />
          <button type="submit" className={styles.signInButton}>
            Register
          </button>
          <div className={styles.footer}>
            <p>
              Already have an account? <a href="/login">Sign in</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
