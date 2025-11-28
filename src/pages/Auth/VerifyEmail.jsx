import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";

export default function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyNow = async () => {
      try {
        const res = await api.get(`/verify-email/${token}`);
        alert(res.data.message);
        navigate("/signin");
      } catch (error) {
        alert("Invalid or expired verification link");
      }
    };

    verifyNow();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h2 className="text-3xl font-bold">Verifying email...</h2>
    </div>
  );
}
