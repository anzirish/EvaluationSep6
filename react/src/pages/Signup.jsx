import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate()

  const authHandler = async () => {
    if (!email.trim() || !password.trim()) {
      setError("Email or password is not correct");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      localStorage.setItem("user", userCredential.user.uid);
      setEmail("");
      setPassword("");
      navigate('/gallery')
    } catch (error) {
      setError("Signup error:", error);
    }
  };

  useEffect(() => {
    setError("");
  }, [email, password]);

  return (
    <>
      <h3>SignUp</h3>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          maxWidth : '500px',
          marginBottom : '20px',
          maxHeight : '100vh'
        }}
      >
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={authHandler}>SignUp</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
};

export default Signup;
