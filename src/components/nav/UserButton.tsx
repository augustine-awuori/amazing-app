import { useNavigate } from "react-router-dom";
import { AiOutlineLogin } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import { signInWithRedirect, GoogleAuthProvider, signOut } from "firebase/auth";

import { useUser } from "../../hooks";
import auth, { googleAuth } from "../../services/auth";
import Tooltip from "../Tooltip";
import { randomImage } from "../../utils/funcs";

const userSignOut = () => signOut(googleAuth);

const userSignIn = () =>
  signInWithRedirect(googleAuth, new GoogleAuthProvider());

interface Props {
  onEmergencyLogin: (state: boolean) => void;
}

const UserButton = ({ onEmergencyLogin }: Props) => {
  const { googleUser, user } = useUser();
  const navigate = useNavigate();

  const logIn = async () => {
    await userSignIn();
    window.location.href = "/";
  };

  const logOut = async () => {
    await userSignOut();
    auth.logout();
    window.location.href = "/";
  };

  const navigateToProfile = () => {
    if (user?._id) navigate(`/mart/profile/${user?._id}`);
    else toast.info("Loading your profile");
  };

  const Avatar = () => {
    if (!user) return <span className="loading loading-ring loading-lg" />;

    return googleUser?.photoURL ? (
      <div className="w-9 h-9 rounded-full flex items-center justify-center bg-gray-200">
        <img
          alt={googleUser?.displayName || "avatar"}
          src={googleUser?.photoURL || randomImage}
          className="rounded-full w-full h-full"
        />
      </div>
    ) : (
      <FaUser />
    );
  };

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar"
      >
        {googleUser || user ? <Avatar /> : <AiOutlineLogin />}
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
      >
        {user ? (
          <>
            <li onClick={navigateToProfile}>
              <a className="text-lg">Profile</a>
            </li>
            <li>
              <a className="text-lg" onClick={logOut}>
                Logout
              </a>
            </li>
          </>
        ) : (
          <>
            <li className="text-lg" onClick={logIn}>
              <p>Quick Login</p>
            </li>
            <Tooltip message="For registered users only">
              <li className="text-lg" onClick={() => onEmergencyLogin(true)}>
                <p>Emergency Login</p>
              </li>
            </Tooltip>
          </>
        )}
      </ul>
    </div>
  );
};

export default UserButton;
