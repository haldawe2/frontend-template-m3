import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";

export default function Login() {
  const { storeToken, authenticateUser, isLoggedIn } = useAuth();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.login(user);
      if (response.authToken) {
        storeToken(response.authToken);
        authenticateUser();
        navigate("/dashboard");
        toast.success("Welcome back!");
      } else {
        setErrorMessage("Unable to authenticate user");
      }
    } catch (error) {
      setErrorMessage("Unable to authenticate user");
    }
  };

  useEffect(() => {
    // When the component first renders, check if user is already logged in and redirects
    if (isLoggedIn) {
      navigate("/dashboard");
    }
    // eslint-disable-next-line
  }, [isLoggedIn]);

  return (
    <div className="w-[100vw]">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center h-[94vh] bg-gradient-to-t from-[#25274D] to-[#076071] gap-y-6"
      >
        <div className="flex flex-col gap-y-4 text-center text-xl">
          <label>Email</label>
          <input
            required
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="rounded-lg p-2 w-[300px] focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-y-4 text-center text-xl">
          <label>Password</label>
          <input
            required
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            className="rounded-lg p-2 w-[300px] focus:outline-none"
          />
        </div>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <button
          type="submit"
          className="flex h-14 w-28 bg-white items-center justify-center rounded-lg text-2xl 
          text-black hover:bg-[#2E9CCA] hover:text-white duration-200"
        >
          Log in{" "}
        </button>
      </form>
    </div>
  );
}
