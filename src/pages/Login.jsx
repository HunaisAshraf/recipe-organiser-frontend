import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../utils/axiosInstance";
import AuthContext from "../context/AuthContext";
import Spinner from "../components/Spinner";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { user, login } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    try {
      event.preventDefault();

      setLoading(true);
      const user = {
        email,
        password,
      };

      const { data } = await axiosInstance.post("/api/user/login", user);

      if (data.success) {
        login(data.user, data.token);
        toast.success(data.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) {
      navigate("/");
    }
  }, []);
  return (
    <div className="min-h-[80vh] flex justify-center items-center">
      <Toaster />
      <form
        className="border-2 border-solid rounded p-3"
        onSubmit={handleLogin}
      >
        <h1 className="text-center text-3xl font-bold my-4">Login</h1>
        <div className="my-3">
          <input
            className="outline-none py-2 px-3 border rounded-md"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="my-3">
          <input
            className="outline-none py-2 px-3 border rounded-md"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="text-center py-3">
          {loading ? (
            <Spinner />
          ) : (
            <button
              type="submit"
              className="bg-blue-700 text-white font-semibold py-2 px-3 rounded"
            >
              Submit
            </button>
          )}
        </div>
        <Link to="/signup">
          <p className="text-center text-blue-700">Create new account</p>
        </Link>
      </form>
    </div>
  );
};

export default Login;
