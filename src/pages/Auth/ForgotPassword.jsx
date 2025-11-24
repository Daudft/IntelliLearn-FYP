import React, { useState } from "react";
import AuthForm from "../../components/auth/AuthForm";
import InputField from "../../components/auth/InputField";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    console.log("Reset link sent to:", email);
  };

  return (
    <AuthForm title="Forgot Password">
      <form onSubmit={handleSend}>
        <InputField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />

        <button type="submit">Send Reset Link</button>
      </form>
    </AuthForm>
  );
}
