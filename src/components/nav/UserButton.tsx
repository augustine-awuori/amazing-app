import { useUser } from "../../hooks";
import { userSignIn, userSignOut } from "../../hooks/useUser";
import logo from "../../assets/logo.png";

const UserButton = () => {
  const { user } = useUser();

  const logOut = () => {
    userSignOut();
    window.location.href = "/";
  };

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar"
      >
        <div className="w-9 h-9 rounded-full flex items-center justify-center bg-gray-200">
          <img
            alt={user?.name}
            src={user?.avatar || logo}
            className="rounded-full w-full h-full"
          />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
      >
        {user?._id ? (
          <>
            <li>
              <a className="text-lg">Profile</a>
            </li>
            <li>
              <a className="text-lg" onClick={logOut}>
                Logout
              </a>
            </li>
          </>
        ) : (
          <li className="text-lg" onClick={userSignIn}>
            <p>Google in</p>
          </li>
        )}
      </ul>
    </div>
  );
};

export default UserButton;
