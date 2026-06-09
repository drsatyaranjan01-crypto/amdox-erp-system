import { useState } from "react";

function Login({ setIsLoggedIn }) {
  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = () => {
    if (
      username === "Satya" &&
      password === "Satya123"
    ) {
      localStorage.setItem(
        "isLoggedIn",
        "true"
      );

      setIsLoggedIn(true);
    } else {
      alert(
        "Invalid Username or Password"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">

      <div className="bg-slate-800 p-8 rounded-xl w-96">

        <h1 className="text-4xl text-white font-bold mb-6 text-center">
          ERP Login
        </h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          className="w-full p-3 rounded bg-slate-700 text-white mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full p-3 rounded bg-slate-700 text-white mb-4"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 py-3 rounded hover:bg-blue-700"
        >
          Login
        </button>

      </div>

    </div>
  );
}

export default Login;