import React, { useState } from "react";
import AuthForm from "../../components/auth/AuthForm";
import InputField from "../../components/auth/InputField";
import PasswordInput from "../../components/auth/PasswordInput";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = (e) => {
    e.preventDefault();
    console.log("Sign In Data:", email, password);
  };

  return (
    <AuthForm title="Sign In">
      <form onSubmit={handleSignIn}>
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
          placeholder="Enter password"
        />

        <button type="submit">Sign In</button>
      </form>
    </AuthForm>
  );
}
