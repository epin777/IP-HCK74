import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios({
        method: "post",
        url: "http://localhost:3000/login",
        data: { email, password },
      });

      localStorage.setItem("token", data.access_token);
      navigate("/");
    } catch (error) {
      console.log(error.response);
    }
  };
  const fetchGoogleLogin = async (response) => {
    try {
      const { data } = await axios({
        method: "POST",
        url: "http://localhost:3000/google-login",
        headers: {
          google_token: response.credential,
        },
      });

      localStorage.setItem("token", data.access_token);

      navigate("/");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleLogin = async (response) => {
    fetchGoogleLogin(response);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Handle login logic here
  //   console.log("Login:", email, password);
  // };

  return (
    <div className="login-container flex flex-col items-center justify-center h-screen">
      <div className="login-card max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <form onSubmit={handleLogin} className="flex flex-col space-y-4 w-full">
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full border rounded-lg px-4 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full  
border rounded-lg px-4 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 px-4  
rounded hover:bg-blue-700"
          >
            Login
          </button>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              handleGoogleLogin(credentialResponse);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
