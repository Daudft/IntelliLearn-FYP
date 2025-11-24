import React, { useState } from "react";
import AuthForm from "../../components/auth/AuthForm";

export default function VerifyEmail() {
  const [code, setCode] = useState("");

  const handleVerify = (e) => {
    e.preventDefault();
    console.log("Verification Code:", code);
  };

  return (
    <AuthForm title="Verify Email">
      <form onSubmit={handleVerify}>
        <input
          type="text"
          placeholder="Enter verification code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <button type="submit">Verify</button>
      </form>
    </AuthForm>
  );
}
