import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaPhone, FaWhatsapp, FaInstagram, FaYoutube } from "react-icons/fa";

import { ChatButtons, Grid, ShopProfile } from "../components";
import {
  useProfileUser,
  useShops,
  useTimestamp,
  useUser,
  useWhatsAppRedirect,
} from "../hooks";
import funcs, { randomImage } from "../utils/funcs";

const ProfilePage: React.FC = () => {
  const { getDate } = useTimestamp();
  const { profileUser, isLoading } = useProfileUser();
  const { aboutMe, avatar, name, otherAccounts, timestamp } = profileUser;
  const { url } = useWhatsAppRedirect(otherAccounts?.whatsapp, avatar);
  const { shops } = useShops();
  const { userId } = useParams();
  const { user } = useUser();
  const navigate = useNavigate();

  const startWhatsAppChat = () => funcs.navTo(url);

  const userShops = shops.filter((shop) => shop.author._id === userId);
  const currentUserIsTheOwner = user?._id === profileUser._id;

  return (
    <section>
      <section className="min-h-screen flex justify-center p-4 sm:pt-0">
        <article className="rounded-lg shadow-lg overflow-hidden max-w-md md:max-w-2xl w-full">
          <article className="relative">
            <figure>
              <img
                src={randomImage}
                alt="Cover"
                className="w-full h-40 object-cover"
              />
            </figure>

            {currentUserIsTheOwner && (
              <article className="absolute bottom-3 right-3">
                <button
                  className="btn btn-success"
                  onClick={() => navigate("orders")}
                >
                  My Orders
                </button>
              </article>
            )}

            <figure className="absolute top-20 left-1/2 transform -translate-x-1/2">
              <img
                src={avatar || randomImage}
                alt="Avatar"
                className="rounded-full border-4 border-white w-32 h-32 object-cover"
              />
            </figure>
          </article>

          <ChatButtons seller={profileUser} />

          <article className="p-6 mt-10 items-center">
            {isLoading ? (
              <span className="loading loading-dots loading-md" />
            ) : (
              <div>
                <h2 className="text-2xl font-bold text-center">{name}</h2>
                {aboutMe && <p className="text-gray-600 mt-4">{aboutMe}</p>}
                <article className="mt-6 flex flex-col space-y-2">
                  {otherAccounts?.whatsapp && (
                    <article className="flex items-center">
                      <FaPhone className="mr-2 text-gray-600" />
                      <span>
                        {funcs.formatPhoneNumber(otherAccounts.whatsapp)}
                      </span>
                    </article>
                  )}
                </article>
                <article className="mt-6 flex justify-center space-x-4">
                  {otherAccounts?.instagram && (
                    <a
                      href="#"
                      className="text-gray-600 hover:text-gray-900 cursor-pointer"
                    >
                      <FaInstagram className="w-6 h-6" />
                    </a>
                  )}
                  {otherAccounts?.youtube && (
                    <a
                      href="#"
                      className="text-gray-600 hover:text-gray-900 cursor-pointer"
                    >
                      <FaYoutube className="w-6 h-6" />
                    </a>
                  )}
                  {otherAccounts?.whatsapp && (
                    <a
                      className="text-gray-600 hover:text-gray-900 cursor-pointer"
                      onClick={startWhatsAppChat}
                    >
                      <FaWhatsapp className="w-6 h-6" />
                    </a>
                  )}
                </article>
                <p className="text-center text-gray-500 text-sm mt-4">
                  Joined on {getDate(timestamp || 0)}
                </p>
              </div>
            )}
          </article>
        </article>
      </section>

      {!!userShops.length && (
        <section className="px-10 py-5 ">
          <h1 className="text-center text-xl mb-3">
            Shops ({userShops.length})
          </h1>
          <Grid>
            {userShops.map((shop) => (
              <ShopProfile {...shop} key={shop._id} />
            ))}
          </Grid>
        </section>
      )}
    </section>
  );
};

export default ProfilePage;
