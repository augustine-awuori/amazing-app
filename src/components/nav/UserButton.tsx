import { useNavigate } from "react-router-dom";
import { AiOutlineLogin } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";

import { useUser } from "../../hooks";
import { userSignIn, userSignOut } from "../../hooks/useUser";

const UserButton = () => {
  const navigate = useNavigate();
  const { googleUser, user } = useUser();

  const logIn = async () => {
    await userSignIn();
    window.location.href = "/";
  };

  const logOut = async () => {
    await userSignOut();
    window.location.href = "/";
  };

  const navigateToProfile = () => {
    if (googleUser && user?._id) navigate(`/profile/${user._id}`);
    else toast.info("Loading your profile");
  };

  const Avatar = () =>
    googleUser?.photoURL ? (
      <div className="w-9 h-9 rounded-full flex items-center justify-center bg-gray-200">
        <img
          alt={googleUser?.displayName || "avatar"}
          src={googleUser.photoURL}
          className="rounded-full w-full h-full"
        />
      </div>
    ) : (
      <FaUser />
    );

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar"
      >
        {googleUser ? <Avatar /> : <AiOutlineLogin />}
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
      >
        {googleUser ? (
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
          <li className="text-lg" onClick={logIn}>
            <p>Google in</p>
          </li>
        )}
      </ul>
    </div>
  );
};

export default UserButton;
