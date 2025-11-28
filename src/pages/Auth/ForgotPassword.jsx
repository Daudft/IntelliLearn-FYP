import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios"; // Backend API

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [lang, setLang] = useState("python");

  const codeSamples = {
    python: `
# PYTHON RESET
email = "${email || "example@mail.com"}"

def send_reset(email):
    return "Reset link sent!"

print(send_reset(email))
`,
    java: `
/* JAVA RESET */
class Reset {
    static String email = "${email || "user@mail.com"}";

    static void sendReset() {
        System.out.println("Reset link sent!");
    }
}

public class Main {
    public static void main(String[] args) {
        Reset.sendReset();
    }
}
`,
    c: `
/* C RESET */
#include <stdio.h>

int main() {
    char email[] = "${email || "user@mail.com"}";
    printf("Reset link sent!\\n");
    return 0;
}
`,
  };

  // ------------------------------------
  // ✅ CONNECT TO BACKEND (FORGOT PASSWORD)
  // ------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/forgot-password", { email });

      alert(response.data.message || "Reset link sent to your email");

    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F1F2F4] px-4">
      <div className="bg-white w-full max-w-6xl rounded-3xl shadow-xl flex flex-col md:flex-row overflow-hidden">

        {/* LEFT PANEL */}
        <div className="w-full md:w-1/2 p-10 md:p-14">
          <h2 className="text-4xl font-bold text-gray-900">Forgot Password</h2>
          <p className="text-gray-600 mt-3 mb-10">
            Enter your email and we'll send you a reset link.
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>

            {/* EMAIL INPUT */}
            <div>
              <label className="block font-medium text-gray-800 mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="
                  w-full px-4 py-3 rounded-xl
                  border border-black/20 bg-white text-gray-900 shadow-sm
                  hover:border-black/40
                  focus:border-black focus:ring-2 focus:ring-black/10
                  focus:outline-none transition-all duration-200
                "
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-[#E6FF03] text-black font-semibold text-lg py-3 rounded-xl 
              hover:bg-[#d7ee00] transition-all shadow-md"
            >
              Send Reset Link
            </button>
          </form>

          <p className="text-center mt-8 text-gray-700">
            Remember your password?{" "}
            <Link to="/signin" className="text-blue-600 font-semibold hover:underline">
              Sign In
            </Link>
          </p>
        </div>

        {/* RIGHT BLUEPRINT PANEL */}
        <div className="hidden md:flex w-1/2 bg-[#0A0A0A] relative overflow-hidden text-white p-14">

          {/* GRID */}
          <div
            className="absolute inset-0 opacity-[0.07] 
            bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),
            linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)]
            bg-[size:40px_40px] z-0"
          >
          </div>

          {/* SHAPES */}
          <div className="absolute top-10 left-10 w-20 h-20 border border-gray-600 rounded-lg opacity-20 z-10"></div>
          <div className="absolute bottom-10 right-12 w-28 h-28 border border-gray-600 rounded-full opacity-20 z-10"></div>
          <div className="absolute top-1/2 right-20 w-16 h-16 border border-gray-600 rotate-45 opacity-20 z-10"></div>

          {/* CONTENT */}
          <div className="relative z-20 w-full">
            <h3 className="text-3xl font-semibold mb-8">Learn. Build. Innovate.</h3>

            {/* TABS */}
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

            {/* CODE BOX */}
            <div
              className="bg-black/40 rounded-xl p-6 shadow-lg w-[90%]
              font-mono text-sm md:text-[13px] lg:text-[14px]
              leading-relaxed text-[#E6FF03] whitespace-pre-wrap"
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
