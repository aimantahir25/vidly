import React, { useContext } from "react";
import { SignInBtn } from "../../components";
import { UserContext } from "../../context/useUser";
import { Logout } from "../../services/auth";
import "./style.css";

const Navbar = () => {
  const { user } = useContext(UserContext).user;

  return (
    <div className="navbar">
      <div className="navbar__brand">
        <h1>Vidly</h1>
        <p>by Adrish</p>
      </div>

      {user ? (
        <div className="navbar__user">
          <button className="navbar__logout" onClick={Logout}>
            
            Logout
          </button>
          <img className="navbar__pic" src={user.photoURL} alt="user profile" />
        </div>
      ) : (
        <SignInBtn />
      )}
    </div>
  );
};

export default Navbar;
