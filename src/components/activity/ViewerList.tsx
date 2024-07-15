import React from "react";
import { useNavigate } from "react-router-dom";

import { View } from "../../hooks/useProducts";
import { useUsers } from "../../hooks";
import { emptyAuthor } from "../../utils/empty";

interface Props {
  viewers: View[];
}

const ViewerList: React.FC<Props> = ({ viewers }) => {
  const navigate = useNavigate();
  const { users } = useUsers();

  return (
    <div className="p-4">
      <ul className="list-disc list-inside">
        {viewers.map(({ _id, viewer, timestamp }, index) => {
          const { avatar, name } =
            users.find((u) => u._id === viewer) || emptyAuthor;

          return (
            <li
              key={_id}
              className={`flex items-center justify-between py-2 px-1 cursor-pointer hover:bg-gray-800 ${
                index < viewers.length - 1 ? "border-b" : ""
              }`}
              onClick={() => navigate(`/mart/profile/${viewer}`)}
            >
              <figure className="flex items-center">
                <img
                  src={avatar}
                  alt="profile"
                  className="w-11 h-11 object-cover rounded-full mr-2"
                />
                <span>{name}</span>
              </figure>
              <span>{new Date(timestamp).toLocaleString()}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ViewerList;
