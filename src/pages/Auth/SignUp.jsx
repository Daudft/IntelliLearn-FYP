import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/authService";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [lang, setLang] = useState("python");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const codeSamples = {
    python: `
# PYTHON
user = {
    "name": "${name || "Guest"}",
    "skills": ["Python", "AI", "Backend"]
}

def start_learning():
    return "Welcome to IntelliLearn"

print(start_learning())
`,
    java: `
/* JAVA */
class User {
    String name = "${name || "Guest"}";
    String[] skills = {"Java", "OOP", "Spring"};

    void startLearning() {
        System.out.println("Welcome to IntelliLearn");
    }
}
`,
    c: `
/* C LANGUAGE */
#include <stdio.h>

int main() {
    char name[] = "${name || "Guest"}";
    printf("Welcome to IntelliLearn, %s!\\n", name);
    return 0;
}
`,
  };

  // ---------------------------------------
  // ✅ UPDATED SIGNUP FUNCTION
  // ---------------------------------------
  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await authService.signup({
        name,
        email,
        password,
        passwordConfirm,
      });

      alert(response.message || "Signup successful! Please check your email to verify your account.");

      // Redirect to signin page
      navigate("/signin");
      
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Signup failed. Please try again.";
      setError(errorMessage);
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F1F2F4] px-4">
      <div className="bg-white w-full max-w-6xl rounded-3xl shadow-xl flex flex-col md:flex-row overflow-hidden">

        {/* LEFT FORM */}
        <div className="w-full md:w-1/2 p-10 md:p-14">
          <h2 className="text-4xl font-bold text-gray-900">Create Account</h2>
          <p className="text-gray-600 mt-3 mb-10">
            Join IntelliLearn and start improving your skills.
          </p>

          {/* ERROR MESSAGE */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSignUp}>
            {/* NAME */}
            <div>
              <label className="block font-medium text-gray-800 mb-1">Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="
                  w-full px-4 py-3 rounded-xl
                  border border-black/20
                  bg-white text-gray-900 shadow-sm
                  hover:border-black/40
                  focus:border-black focus:ring-2 focus:ring-black/10
                  focus:outline-none transition-all
                "
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="block font-medium text-gray-800 mb-1">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="
                  w-full px-4 py-3 rounded-xl
                  border border-black/20 bg-white text-gray-900 shadow-sm
                  hover:border-black/40
                  focus:border-black focus:ring-2 focus:ring-black/10
                  focus:outline-none transition-all
                "
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block font-medium text-gray-800 mb-1">Password</label>
              <input
                type="password"
                placeholder="Create a strong password (min 6 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="
                  w-full px-4 py-3 rounded-xl
                  border border-black/20 bg-white text-gray-900 shadow-sm
                  hover:border-black/40
                  focus:border-black focus:ring-2 focus:ring-black/10
                  focus:outline-none transition-all
                "
              />
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <label className="block font-medium text-gray-800 mb-1">Confirm Password</label>
              <input
                type="password"
                placeholder="Re-enter your password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                required
                minLength={6}
                className="
                  w-full px-4 py-3 rounded-xl
                  border border-black/20 bg-white text-gray-900 shadow-sm
                  hover:border-black/40
                  focus:border-black focus:ring-2 focus:ring-black/10
                  focus:outline-none transition-all
                "
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#E6FF03] text-black font-semibold text-lg py-3 rounded-xl 
              hover:bg-[#d7ee00] transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="text-center mt-8 text-gray-700">
            Already have an account?{" "}
            <Link to="/signin" className="text-blue-600 font-semibold hover:underline">
              Sign In
            </Link>
          </p>
        </div>

        {/* RIGHT BLUEPRINT */}
        <div className="hidden md:flex w-1/2 bg-[#0A0A0A] relative overflow-hidden text-white p-14">
          <div className="absolute inset-0 opacity-[0.07]
              bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),
              linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)]
              bg-[size:40px_40px] z-0" />

          <div className="absolute top-10 left-10 w-20 h-20 border border-gray-600 rounded-lg opacity-20"></div>
          <div className="absolute bottom-10 right-12 w-28 h-28 border border-gray-600 rounded-full opacity-20"></div>
          <div className="absolute top-1/2 right-20 w-16 h-16 border border-gray-600 rotate-45 opacity-20"></div>

          <div className="relative z-10 w-full">
            <h3 className="text-3xl font-semibold mb-8">Learn. Build. Innovate.</h3>

            <div className="flex gap-4 mb-6">
              {["python", "java", "c"].map((language) => (
                <button
                  key={language}
                  onClick={() => setLang(language)}
                  className={`px-4 py-1 rounded-lg text-sm font-semibold transition ${
                    lang === language
                      ? "bg-[#E6FF03] text-black"
                      : "bg-white/10 border border-gray-700 text-gray-300 hover:bg-white/20"
                  }`}
                >
                  {language.toUpperCase()}
                </button>
              ))}
            </div>

            <div
              className="bg-black/40 rounded-xl p-6 shadow-lg w-[90%]
              font-mono text-sm leading-relaxed text-[#E6FF03] whitespace-pre-wrap"
              style={{ height: "340px", overflow: "hidden" }}
            >
              {codeSamples[lang]}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}