import { useState } from "react";
import "./userButton.css";
import Image from "../image/image";
import apiRequest from "../../utils/apiRequest";
import { useNavigate } from "react-router";
import useAuthStore from "../../utils/authStore";
import {Link} from "react-router";

const UserButton = () => {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();


  const {currentUser, removeCurrentUser} = useAuthStore()
  console.log(currentUser)
  const handleLogout = async () => {
    try {
      await apiRequest.post("/users/auth/logout",{});
      removeCurrentUser();
      navigate("/auth");
    } catch (err) {
      console.error(err);
    }
  }

  return currentUser ? (
    <div className="userButton">
      <Image path={currentUser.img || "./general/noAvatar.png"} alt="User" />
      <div onClick={() => setOpen((prev) => !prev)}>
        <Image path="./general/arrow.svg" alt="arrow" className="arrow" />
      </div>
      {open && (
        <div className="userOptions">
          <Link to={`/profile/${currentUser.username}`} className="userOption">Profile</Link>
          <div className="userOption">Setting</div>
          <div className="userOption" onClick={handleLogout}>Logout</div>
        </div>
      )}
    </div>
  ) : (
    <Link to="/auth" className="loginLink">
      Login/Sign Up
    </Link>
  );
};

export default UserButton;
