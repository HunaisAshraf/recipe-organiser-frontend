import React, { useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function Header() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-white py-3 shadow-md">
      <nav className="flex justify-between items-center w-[92%]  mx-auto">
        <Link to="/">
          <h1 className="text-3xl font-semibold text-gray-700">Recipe</h1>
        </Link>
        <div>
          {!user ? (
            <>
              <button
                onClick={() => navigate("/login")}
                className="bg-blue-700 text-white font-semibold py-2 px-3 rounded-md mx-2"
              >
                SignIn
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="bg-blue-700 text-white font-semibold py-2 px-3 rounded-md mx-2"
              >
                SignUp
              </button>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <h1 className="text-2xl text-gray-600">{user.name}</h1>
              <button
                onClick={handleLogout}
                className="bg-blue-700 text-white font-semibold py-2 px-3 rounded-md mx-2"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
