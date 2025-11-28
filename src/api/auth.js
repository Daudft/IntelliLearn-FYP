import api from "./axios";

// ---------------------- SIGN UP ----------------------
export const signupUser = async (name, email, password) => {
  return await api.post("/signup", { name, email, password });
};

// ---------------------- SIGN IN ----------------------
export const loginUser = async (email, password) => {
  return await api.post("/login", { email, password });
};

// ---------------------- FORGOT PASSWORD ----------------------
export const forgotPassword = async (email) => {
  return await api.post("/forgot-password", { email });
};

// ---------------------- RESET PASSWORD ----------------------
export const resetPassword = async (token, password) => {
  return await api.post(`/reset-password/${token}`, { password });
};
