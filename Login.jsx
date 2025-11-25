import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return alert("Please enter email & password");

    // Save session
    sessionStorage.setItem(
      "nelo_user",
      JSON.stringify({ email, token: "fake_jwt_token" })
    );

    navigate("/dashboard");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form className="bg-white p-6 rounded shadow w-full max-w-sm" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

        <input
          type="email"
          className="border w-full p-2 mb-3 rounded"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="border w-full p-2 mb-3 rounded"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700">
          Login
        </button>
      </form>
    </div>
  );
}