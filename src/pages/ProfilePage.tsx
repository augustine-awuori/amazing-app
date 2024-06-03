import React from "react";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaWhatsapp,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

import { funcs } from "../utils";
import { useTimestamp, useUser } from "../hooks";

const ProfilePage: React.FC = () => {
  const { user } = useUser();
  const { getDate } = useTimestamp();

  return (
    <section className=" min-h-screen flex items-center justify-center p-4">
      <article className="bg-white rounded-lg shadow-lg overflow-hidden max-w-md md:max-w-2xl w-full">
        <article className="relative">
          <img
            src="https://source.unsplash.com/random/800x200"
            alt="Cover"
            className="w-full h-40 object-cover"
          />
          <article className="absolute top-20 left-1/2 transform -translate-x-1/2">
            <img
              src={user?.avatar}
              alt="Avatar"
              className="rounded-full border-4 border-white w-32 h-32"
            />
          </article>
        </article>
        <article className="p-6 mt-16">
          <h2 className="text-2xl font-bold text-center">{user?.name}</h2>
          <p className="text-center text-gray-600">Online Shopper</p>
          <article className="flex items-center justify-center mt-4 text-gray-600">
            <FaMapMarkerAlt className="mr-2" />
            <span>Not available</span>
          </article>
          <p className="text-gray-600 mt-4">
            {user?.aboutMe || "I love online shopping"}
          </p>
          <article className="mt-6 flex flex-col space-y-2">
            <article className="flex items-center">
              <FaEnvelope className="mr-2 text-gray-600" />
              <span>{user?.email}</span>
            </article>
            <article className="flex items-center">
              <FaPhone className="mr-2 text-gray-600" />
              <span>
                {funcs.formatPhoneNumber(user?.otherAccounts.whatsapp)}
              </span>
            </article>
          </article>
          <article className="mt-6 flex justify-center space-x-4">
            <a href="#" className="text-gray-600 hover:text-gray-900">
              <FaInstagram className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              <FaYoutube className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              <FaWhatsapp className="w-6 h-6" />
            </a>
          </article>
          <p className="text-center text-gray-500 text-sm mt-4">
            Joined on {getDate(user?.timestamp || 0)}
          </p>
        </article>
      </article>
    </section>
  );
};

export default ProfilePage;
