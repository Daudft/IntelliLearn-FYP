import React, { useState } from "react";
import AuthForm from "../../components/auth/AuthForm";
import InputField from "../../components/auth/InputField";
import PasswordInput from "../../components/auth/PasswordInput";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log("Sign Up Data:", name, email, password);
  };

  return (
    <AuthForm title="Create Account">
      <form onSubmit={handleSignUp}>
        <InputField
          label="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />

        <InputField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />

        <PasswordInput
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Create a password"
        />

        <button type="submit">Sign Up</button>
      </form>
    </AuthForm>
  );
}
